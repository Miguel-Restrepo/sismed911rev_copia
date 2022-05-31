import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Icofont from "react-icofont";
import InputMask from "react-input-mask";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import DataTable from 'react-data-table-component';
import Select1 from "react-select";
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { red, orange, yellow, blue, green } from '@mui/material/colors';
import CircleIcon from '@mui/icons-material/Circle';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Stack,
    Item,
    Grid,
    TextField,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    AppBar,
    NativeSelect,
    Toolbar,
    Card,
    CardContent,
    Radio,
    FormControlLabel,
    FormLabel,
    Backdrop,
    Button,
    CircularProgress,
    IconButton,
} from '@mui/material';

import common from '../../../common';
import ArticleIcon from '@mui/icons-material/Article';

import { useEffect, useMemo, useState } from 'react';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";



import { DateTime } from "luxon";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import chroma from "chroma-js";

import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Clasificacion() {
    const [t, i18n] = useTranslation("global");

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    //DATOS SELECT COLORIDO
    const colourOptions = [
        { value: "Rojo", label: "Rojo", color: "#FF5630" },
        { value: "Naranja", label: "Naranja", color: "#FF8B00" },
        { value: "Amarillo", label: "Amarillo", color: "#FFC400" },
        { value: "Azul", label: "Azul", color: "#0052CC" },
        { value: "Verde", label: "Verde", color: "#36B37E" },
    ];

    const dot = (color = "transparent") => ({
        alignItems: "center",
        display: "flex",

        ":before": {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: "block",
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                        ? chroma.contrast(color, "white") > 2
                            ? "white"
                            : "black"
                        : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [pacienteTemp, setPacienteTemp] = useState("");
    const [idPacienteTemp, setIdPacienteTemp] = useState("");
    const [admisiones, setAdmisiones] = useState([]);
    const [mostrarSelect, setMostrarSelect] = useState(false); //mostrar o ucultar slect
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //mostrar o ucultar formulario
    const [motivos, setMotivos] = useState([]);
    const [localizaciones, setLocalizacion] = useState([]);
    const [causas, setCausa] = useState([]);
    const [sistemas, setsistemas] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [idAdmision, setIdAdmision] = useState(null);
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');
    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [formAdmision, setFormAdmision] = useState({
        id_ingreso: "",
        id_paciente: "",
        acompañante: "",
        telefono_acompañante: "",
        fecha_admision: "",
        cod911: "",
        id_motivoatencion: "",
        id_localizaciontrauma: "",
        id_causatrauma: "",
        id_sistema: "",
        glasgow_admision: "",
        pas_admision: "",
        //pad_admision: "",
        fc_admision: "",
        so2_admision: "",
        fr_admision: "",
        temp_admision: "",
        clasificacion_admision: "Amarillo",
        dolor: "",
        id_signos: "",
        motivo_consulta: "",
        signos_sintomas: "",
        fecha_clasificacion: "",
        fecha_inicio_clasificacion: DateTime.now()
            .set({ milliseconds: 0 })
            .toISO({ suppressMilliseconds: true }),
    });

    const filteredItems = admisiones.filter(
        (item) =>
        (item.codigo &&
            item.codigo
                .toString()
                .toLowerCase()
                .includes(filterText.toLowerCase()))
    );

    const filteredItems1 = pacientes.filter(
        (item) =>
        (item.id_signos &&
            item.id_signos
                .toString()
                .toLowerCase()
                .includes(filterText1.toLowerCase()))
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) setFilterText('');
        };

        return (
            <Grid container justifyContent="space-between">
                <Grid item xs="auto">
                    <Stack spacing={1} direction="row">

                    </Stack>
                </Grid>

                <Grid item xs="auto">
                    <common.FilterComponent
                        onClear={handleClear}
                        filterText={filterText}
                        onFilter={(e) => setFilterText(e.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }, [filterText]);

    const subHeaderComponent1 = useMemo(() => {
        const handleClear1 = () => {
            if (filterText1) setFilterText1('');
        };

        return (
            <Grid container justifyContent="space-between">
                <Grid item xs="auto">
                    <Stack spacing={1} direction="row">

                    </Stack>
                </Grid>

                <Grid item xs="auto">
                    <common.FilterComponent
                        onClear={handleClear1}
                        filterText={filterText1}
                        onFilter={(e) => setFilterText1(e.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }, [filterText1]);

    const handleRowClicked1 = (row) => {
        setPacienteTemp(row.sintomas_signos);
        setIdPacienteTemp(row.id_signos);
    };


    const handleRowClicked = (row) => {
        let select = row;
        
        if (!selectedData) {
            setSelectedData(row);
            const updatedData = admisiones.map((item) => {
                if (row.codigo !== item.codigo) {
                    return item;
                }

                return {
                    ...item,
                    toggleSelected: true,
                };
            });

            setIdAdmision(row.codigo);
            setFormAdmision((prevState) => ({
                ...prevState,
                id_ingreso: row.id_ingreso,
                id_paciente: row.id_paciente == null ? "" : row.id_paciente,
                acompañante: row.acompañante == null ? "" : row.acompañante,
                telefono_acompañante:
                    row.telefono_acompañante == null
                        ? ""
                        : row.telefono_acompañante,
                fecha_admision:
                    row.fecha_admision == null ? "" : row.fecha_admision,
                cod911: row.cod911 == null ? "" : row.cod911,
                id_motivoatencion:
                    row.id_motivoatencion == null ? "" : row.id_motivoatencion,
                id_localizaciontrauma:
                    row.id_localizaciontrauma == null
                        ? ""
                        : row.id_localizaciontrauma,
                id_causatrauma:
                    row.id_causatrauma == null ? "" : row.id_causatrauma,
                id_sistema: row.id_sistema == null ? "" : row.id_sistema,
                glasgow_admision:
                    row.glasgow_admision == null ? "" : row.glasgow_admision,
                pas_admision: row.pas_admision == null ? "" : row.pas_admision,
                //pad_admision: row.pad_admision == null ? "" : row.pad_admision,
                fc_admision: row.fc_admision == null ? "" : row.fc_admision,
                so2_admision: row.so2_admision == null ? "" : row.so2_admision,
                fr_admision: row.fr_admision == null ? "" : row.fr_admision,
                temp_admision:
                    row.temp_admision == null ? "" : row.temp_admision,
                clasificacion_admision:
                    row.clasificacion_admision == null
                        ? ""
                        : row.clasificacion_admision,
                dolor: row.dolor == null ? "" : row.dolor,
                id_signos: row.id_signos == null ? "" : row.id_signos,
                motivo_consulta:
                    row.motivo_consulta == null ? "" : row.motivo_consulta,
                signos_sintomas:
                    row.signos_sintomas == null ? "" : row.signos_sintomas,
                fecha_clasificacion:
                    row.fecha_clasificacion == null
                        ? DateTime.now()
                            .set({ milliseconds: 0 })
                            .toISO({ suppressMilliseconds: true })
                        : row.fecha_clasificacion,
                fecha_inicio_clasificacion:
                    row.fecha_inicio_clasificacion == null
                        ? DateTime.now()
                            .set({ milliseconds: 0 })
                            .toISO({ suppressMilliseconds: true })
                        : row.fecha_inicio_clasificacion,
            }));
        } else {
            if (row.codigo === selectedData.codigo) {
                select = null;
                setSelectedData(null);
                const updatedData = admisiones.map((item) => {
                    if (row.codigo !== item.codigo) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: false,
                    };
                });
                setIdAdmision(row.codigo);
                setFormAdmision((prevState) => ({
                    ...prevState,
                    id_ingreso: row.id_ingreso,
                    id_paciente: row.id_paciente == null ? "" : row.id_paciente,
                    acompañante: row.acompañante == null ? "" : row.acompañante,
                    telefono_acompañante:
                        row.telefono_acompañante == null
                            ? ""
                            : row.telefono_acompañante,
                    fecha_admision:
                        row.fecha_admision == null ? "" : row.fecha_admision,
                    cod911: row.cod911 == null ? "" : row.cod911,
                    id_motivoatencion:
                        row.id_motivoatencion == null ? "" : row.id_motivoatencion,
                    id_localizaciontrauma:
                        row.id_localizaciontrauma == null
                            ? ""
                            : row.id_localizaciontrauma,
                    id_causatrauma:
                        row.id_causatrauma == null ? "" : row.id_causatrauma,
                    id_sistema: row.id_sistema == null ? "" : row.id_sistema,
                    glasgow_admision:
                        row.glasgow_admision == null ? "" : row.glasgow_admision,
                    pas_admision: row.pas_admision == null ? "" : row.pas_admision,
                    //pad_admision: row.pad_admision == null ? "" : row.pad_admision,
                    fc_admision: row.fc_admision == null ? "" : row.fc_admision,
                    so2_admision: row.so2_admision == null ? "" : row.so2_admision,
                    fr_admision: row.fr_admision == null ? "" : row.fr_admision,
                    temp_admision:
                        row.temp_admision == null ? "" : row.temp_admision,
                    clasificacion_admision:
                        row.clasificacion_admision == null
                            ? ""
                            : row.clasificacion_admision,
                    dolor: row.dolor == null ? "" : row.dolor,
                    id_signos: row.id_signos == null ? "" : row.id_signos,
                    motivo_consulta:
                        row.motivo_consulta == null ? "" : row.motivo_consulta,
                    signos_sintomas:
                        row.signos_sintomas == null ? "" : row.signos_sintomas,
                    fecha_clasificacion:
                        row.fecha_clasificacion == null
                            ? DateTime.now()
                                .set({ milliseconds: 0 })
                                .toISO({ suppressMilliseconds: true })
                            : row.fecha_clasificacion,
                    fecha_inicio_clasificacion:
                        row.fecha_inicio_clasificacion == null
                            ? DateTime.now()
                                .set({ milliseconds: 0 })
                                .toISO({ suppressMilliseconds: true })
                            : row.fecha_inicio_clasificacion,
                }));
            } else {
                setSelectedData(row);
                const updatedData = admisiones.map((item) => {
                    if (selectedData.codigo === item.codigo) {
                        return {
                            ...item,
                            toggleSelected: false,
                        };
                    } else if (row.codigo !== item.codigo) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: true,
                    };
                });
                setIdAdmision(row.codigo);
                setFormAdmision((prevState) => ({
                    ...prevState,
                    id_ingreso: row.id_ingreso,
                    id_paciente: row.id_paciente == null ? "" : row.id_paciente,
                    acompañante: row.acompañante == null ? "" : row.acompañante,
                    telefono_acompañante:
                        row.telefono_acompañante == null
                            ? ""
                            : row.telefono_acompañante,
                    fecha_admision:
                        row.fecha_admision == null ? "" : row.fecha_admision,
                    cod911: row.cod911 == null ? "" : row.cod911,
                    id_motivoatencion:
                        row.id_motivoatencion == null ? "" : row.id_motivoatencion,
                    id_localizaciontrauma:
                        row.id_localizaciontrauma == null
                            ? ""
                            : row.id_localizaciontrauma,
                    id_causatrauma:
                        row.id_causatrauma == null ? "" : row.id_causatrauma,
                    id_sistema: row.id_sistema == null ? "" : row.id_sistema,
                    glasgow_admision:
                        row.glasgow_admision == null ? "" : row.glasgow_admision,
                    pas_admision: row.pas_admision == null ? "" : row.pas_admision,
                    //pad_admision: row.pad_admision == null ? "" : row.pad_admision,
                    fc_admision: row.fc_admision == null ? "" : row.fc_admision,
                    so2_admision: row.so2_admision == null ? "" : row.so2_admision,
                    fr_admision: row.fr_admision == null ? "" : row.fr_admision,
                    temp_admision:
                        row.temp_admision == null ? "" : row.temp_admision,
                    clasificacion_admision:
                        row.clasificacion_admision == null
                            ? ""
                            : row.clasificacion_admision,
                    dolor: row.dolor == null ? "" : row.dolor,
                    id_signos: row.id_signos == null ? "" : row.id_signos,
                    motivo_consulta:
                        row.motivo_consulta == null ? "" : row.motivo_consulta,
                    signos_sintomas:
                        row.signos_sintomas == null ? "" : row.signos_sintomas,
                    fecha_clasificacion:
                        row.fecha_clasificacion == null
                            ? DateTime.now()
                                .set({ milliseconds: 0 })
                                .toISO({ suppressMilliseconds: true })
                            : row.fecha_clasificacion,
                    fecha_inicio_clasificacion:
                        row.fecha_inicio_clasificacion == null
                            ? DateTime.now()
                                .set({ milliseconds: 0 })
                                .toISO({ suppressMilliseconds: true })
                            : row.fecha_inicio_clasificacion,
                }));
            }
        }
        setMostrarFormulario(select !== null);
        if (!idAdmision) {
            setIdAdmision(row.codigo);
            const updatedData = admisiones.map((item) => {
                if (row.codigo !== item.codigo) {
                    return item;
                }

                return {
                    ...item,
                    toggleSelected: true,
                };
            });

            setAdmisiones(updatedData);
        } else {
            if (row.codigo === idAdmision) {
                select = null;
                setIdAdmision(row.codigo);
                const updatedData = admisiones.map((item) => {
                    if (row.codigo !== item.codigo) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: false,
                    };
                });
                setAdmisiones(updatedData);
            } else {
                setIdAdmision(row.codigo);
                const updatedData = admisiones.map((item) => {
                    if (idAdmision === item.codigo) {
                        return {
                            ...item,
                            toggleSelected: false,
                        };
                    } else if (row.codigo !== item.codigo) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: true,
                    };
                });
                setAdmisiones(updatedData);
            }
        }
    }; 

    

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const columns1 = useMemo(() => [
        {
            name: `${t("eclinical.clasificacion.datos.id")}`,
            sortable: true,
            width: '100px',
            selector: (row) => row.codigo,
        },
        {
            name: `${t("eclinical.clasificacion.datos.fecha")}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.fecha_admision,
        },
        {
            name: `${t("eclinical.clasificacion.datos.hc")}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.expediente,
        },
        {
            name: `${t("eclinical.clasificacion.datos.paciente")}`,
            sortable: true,
            minWidth: '160px',
            selector: (row) => row.nombre1,
        },
        {
            name: `${t("eclinical.clasificacion.datos.tipoingreso")}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.nombre_genero,
        }, {
            name: `${t("eclinical.clasificacion.datos.cod911")}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.cod911,
        }, {
            name: `${t("eclinical.clasificacion.datos.sexo")}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.nombre_genero,
        }, {
            name: `${t("eclinical.clasificacion.datos.compa")}`,
            sortable: true,
            minWidth: '160px',
            selector: (row) => row.acompañante,
        }
    ]);

    const columns = useMemo(() => [
        {
            name: `${t("eclinical.clasificacion.datos.signos")}`,
            sortable: true,
            minWidth: '400px',
            selector: (row) => row.sintomas_signos
        }
    ])

    //TABLA PRINCIPAL










    const GetPacientes = () => {
        axios
            .get("/api/sala_signos")
            .then((response) => {
                setPacientes(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetAdmisiones = async () => {
        setOpenLoad(true);
        await axios
            .get("/api/sala_admision/clasificacion")
            .then((response) => {
                setAdmisiones(response.data);
                setOpenLoad(false);
                return response.data;
            })
            .catch((error) => {
                setOpenLoad(false);
                return error;
            });
    };

    const GetMotivos = () => {
        axios
            .get("/api/sala_motivoatencion")
            .then((response) => {
                setMotivos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetLocalizacion = () => {
        axios
            .get("/api/sala_localizaciontrauma")
            .then((response) => {
                setLocalizacion(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetCausa = () => {
        axios
            .get("/api/sala_causatrauma")
            .then((response) => {
                setCausa(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetSistema = () => {
        axios
            .get("/api/sala_sistema")
            .then((response) => {
                setsistemas(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const seleccionColor = (e) => {
        setFormAdmision((prevState) => ({
            ...prevState,
            clasificacion_admision: e.target.value,
        }));
    };

    const handleChange = (e) => {
        setFormAdmision((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const cambioSelect = (e) => {
        if (e.target.value == 1) {
            setMostrarSelect(true);
        } else {
            setMostrarSelect(false);
        }
        setFormAdmision((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const notificarExitoCaso = (codigo, clasificacion_admision) =>
        toast.success(
            `${t("mensajes.msccasoid")} ${codigo} ${t("mensajes.mscexito")} ${t("eclinical.clasificacion.titulo")}: ${clasificacion_admision}`,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }
        );

    const notificarErrorCaso = () =>
        toast.error(`${t("mensajes.msclasificacionerror")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    const PostAdmision = () => {
        axios
            .put(`/api/sala_admision/${idAdmision}`, formAdmision)
            .then((response) => {
                GetAdmisiones();
                notificarExitoCaso(idAdmision, formAdmision.clasificacion_admision);
                setMostrarFormulario(false);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    useEffect(() => {
        GetAdmisiones();
        GetPacientes();
        GetSistema();
        GetMotivos();
        GetLocalizacion();
        GetCausa();
    }, []);

    useEffect(() => {
        setFormAdmision((prevState) => ({
            ...prevState,
            id_signos: idPaciente,
        }));
    }, [paciente, idPaciente]);

    return (
        <div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 101,
                }}
                open={openLoad}
            >
                <Stack spacing={1} alignItems="center">
                    <CircularProgress disableShrink color="inherit" />
                    <Typography>{textLoad}</Typography>
                </Stack>
            </Backdrop>

            <h2>{t("eclinical.clasificacion.titulo")}</h2>

            <Card>
                <CardContent
                    sx={{
                        pb: '0 !important',
                        '& > header': {
                            padding: 0,
                        },
                        '& .rdt_Table': {
                            border: 'solid 1px rgba(0, 0, 0, .12)',
                        },
                    }}
                >
                    <DataTable
                        striped
                        columns={columns1}
                        data={filteredItems}
                        onRowClicked={handleRowClicked}
                        conditionalRowStyles={common.conditionalRowStyles}
                        pagination
                        paginationComponentOptions={
                            common.paginationComponentOptions
                        }
                        subHeader
                        subHeaderComponent={subHeaderComponent}
                        fixedHeader
                        persistTableHead
                        fixedHeaderScrollHeight="calc(100vh - 317px)"
                        customStyles={common.customStyles}
                        highlightOnHover
                        noDataComponent={
                            <Typography sx={{ my: 2 }}>
                                No existen pacientes para mostrar
                            </Typography>
                        }
                    />
                </CardContent>
            </Card>
            <br></br>
            <div>
                <Typography variant="h5" gutterBottom component="div">
                    <ArticleIcon />
                    {t('formularios.formulario')}
                </Typography>
            </div>
            <br></br>

            {mostrarFormulario && (
                <Grid
                    container
                    noValidate
                    direction="row"
                    justifyContent="center"
                    spacing={3}
                    sx={{ my: 2 }}
                    component="form"
                    autoComplete="off"
                >


                    <Grid item xs={12} md={6} lg={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="label_tipo1">{t("eclinical.clasificacion.datos.motivo")}</InputLabel>
                            <Select
                                labelId="label_tipo1"
                                value={formAdmision.id_motivoatencion}
                                onChange={cambioSelect}
                                name="id_motivoatencion"
                                label={`${t("eclinical.clasificacion.datos.motivo")}`}
                            >

                                {motivos.map((tipo) => (
                                    <MenuItem value={tipo.id_motivoatencion} key={tipo.id_motivoatencion}>{tipo.nombre_motivoatencion}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {mostrarSelect && (
                        <Grid
                            container
                            noValidate
                            direction="row"
                            justifyContent="center"
                            spacing={3}
                            sx={{ my: 2 }}
                            component="form"
                            autoComplete="off"
                        >
                            <Grid item xs={12} md={6} lg={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="label_tipo2">{t(
                                        "eclinical.clasificacion.datos.lugartrauma"
                                    )}</InputLabel>
                                    <Select
                                        labelId="label_tipo2"
                                        value={formAdmision.id_localizaciontrauma}
                                        onChange={handleChange}
                                        name="id_localizaciontrauma"
                                        label={`${t(
                                            "eclinical.clasificacion.datos.lugartrauma"
                                        )}`}
                                    >

                                        {localizaciones.map((tipo) => (
                                            <MenuItem value={tipo.id_localizaciontrauma} key={tipo.id_localizaciontrauma}>{tipo.nombre_localizaciontrauma}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="label_tipo2">{t(
                                        "eclinical.clasificacion.datos.causatrauma"
                                    )}</InputLabel>
                                    <Select
                                        labelId="label_tipo2"
                                        value={formAdmision.id_salaCausa}
                                        onChange={handleChange}
                                        name="id_salaCausa"
                                        label={`${t(
                                            "eclinical.clasificacion.datos.causatrauma"
                                        )}`}
                                    >

                                        {sistemas.map((tipo) => (
                                            <MenuItem value={tipo.id_salaCausa} key={tipo.id_salaCausa}>{tipo.nombre_causaTrauma}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}

                    {!mostrarSelect && (
                        <Grid item xs={12} md={6} lg={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="label_tipo3">{t(
                                    "eclinical.clasificacion.datos.sistema"
                                )}</InputLabel>
                                <Select
                                    labelId="label_tipo3"
                                    value={formAdmision.id_sistema}
                                    onChange={handleChange}
                                    name="id_sistema"
                                    label={`${t(
                                        "eclinical.clasificacion.datos.sistema"
                                    )}`}
                                >

                                    {sistemas.map((tipo) => (
                                        <MenuItem value={tipo.id_sistema} key={tipo.id_sistema}>{tipo.nombre_sistema}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}

                    <Grid item xs={6} md={4} lg={4}>
                        <TextField

                            fullWidth
                            size="small"
                            type="number"
                            variant="outlined"
                            label={`${t(
                                "eclinical.clasificacion.datos.glasgow"
                            )}:`}
                            name="glasgow_admision"
                            value={formAdmision.glasgow_admision}
                            onChange={handleChange}
                            onKeyUp={(e) => {
                                if (e.target.value > 15) {
                                    e.target.value = 15;
                                }
                            }}
                            onBlur={(e) => {
                                if (
                                    e.target.value < 3 &&
                                    e.target.value != ""
                                ) {
                                    e.target.value = 3;
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={6} md={4} lg={4}>

                        <InputMask
                            mask="(999)/(999) mmHg"
                            value={formAdmision.pas_admision}
                            onChange={handleChange}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    "eclinical.clasificacion.datos.pa"
                                )}`}
                                variant="outlined"
                                name="pas_admision"
                            />
                        </InputMask>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>

                        <InputMask
                            mask="999 bpm"
                            value={formAdmision.fc_admision}
                            onChange={handleChange}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    "eclinical.clasificacion.datos.fc"
                                )}`}
                                variant="outlined"
                                name="fc_admision"
                            />
                        </InputMask>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>

                        <InputMask
                            mask="999 %"
                            value={formAdmision.so2_admision}
                            onChange={handleChange}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    "eclinical.clasificacion.datos.so2"
                                )}`}
                                variant="outlined"
                                name="so2_admision"
                            />
                        </InputMask>
                    </Grid>

                    <Grid item xs={6} md={4} lg={4}>

                        <InputMask
                            mask="99 rpm"
                            value={formAdmision.fr_admision}
                            onChange={handleChange}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    "eclinical.clasificacion.datos.fr"
                                )}`}
                                variant="outlined"
                                name="fr_admision"
                            />
                        </InputMask>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>

                        <InputMask
                            mask="99 °C"
                            value={formAdmision.temp_admision}
                            onChange={handleChange}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    "eclinical.clasificacion.datos.temperatura"
                                )}`}
                                variant="outlined"
                                name="temp_admision"
                            />
                        </InputMask>
                    </Grid>

                    <Grid item xs={6} md={4} lg={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="label_tipo8">{t("eclinical.clasificacion.titulo")}</InputLabel>
                            <Select
                                labelId="label_tipo8"
                                onChange={seleccionColor}
                                name="clasificacion_admision"
                                label={`${t("eclinical.clasificacion.titulo")}`}
                                defaultValue="Amarillo"
                            >


                                <MenuItem value="Rojo" ><CircleIcon sx={{ color: red[500] }} /> Rojo
                                </MenuItem>
                                <MenuItem value="Naranja" ><CircleIcon sx={{ color: orange[500] }} /> Naranja</MenuItem>
                                <MenuItem value="Amarillo" ><CircleIcon sx={{ color: yellow[500] }} /> Amarillo</MenuItem>
                                <MenuItem value="Azul" ><CircleIcon sx={{ color: blue[500] }} /> Azul</MenuItem>
                                <MenuItem value="Verde" ><CircleIcon sx={{ color: green[500] }} /> Verde</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="label_tipo5">{t("eclinical.clasificacion.datos.dolor")}</InputLabel>
                            <Select
                                labelId="label_tipo5"
                                value={formAdmision.dolor}
                                onChange={handleChange}
                                name="dolor"
                                label={`${t("eclinical.clasificacion.datos.dolor")}`}
                            >


                                <MenuItem value="" >{`-- ${t(
                                    "etiquetas.seleccion"
                                )} --`}</MenuItem>
                                <MenuItem value="1" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 1`}</MenuItem>
                                <MenuItem value="2" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 2`}</MenuItem>
                                <MenuItem value="3" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 3`}</MenuItem>
                                <MenuItem value="4" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 4`}</MenuItem>
                                <MenuItem value="5" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 5`}</MenuItem>
                                <MenuItem value="6" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 6`}</MenuItem>
                                <MenuItem value="7" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 7`}</MenuItem>
                                <MenuItem value="8" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 8`}</MenuItem>
                                <MenuItem value="9" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 9`}</MenuItem>
                                <MenuItem value="10" >{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 10`}</MenuItem>



                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>
                        <Stack direction="row">

                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={`${t("eclinical.clasificacion.datos.signos")}`}

                                value={paciente}
                                onChange={handleChange}
                                name="id_signos"
                                InputProps={{
                                    readOnly: true,
                                }}

                            />

                            <Button variant="outlined" onClick={handleShow2}
                                startIcon={< SearchIcon />}
                                sx={{
                                    p: 0,
                                    minWidth: '40px',
                                    '& > span.MuiButton-startIcon': { m: 0 },
                                }} />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label={`${t("eclinical.clasificacion.datos.motivo")}`}
                            multiline
                            rows={4}
                            value={formAdmision.motivo_consulta}
                            onChange={handleChange}
                            name="motivo_consulta"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label={`${t(
                                "eclinical.clasificacion.datos.signodescrip"
                            )}`}
                            multiline
                            rows={4}
                            value={formAdmision.signos_sintomas}
                            onChange={handleChange}
                            name="signos_sintomas"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {formAdmision.id_motivoatencion != "" &&
                            formAdmision.dolor != "" &&
                            formAdmision.temp_admision != "" && (
                                <Button variant="outlined" onClick={PostAdmision}>
                                    {t("etiquetas.enviar")}
                                </Button>
                            )}
                    </Grid>
                </Grid>


            )
            }

            <Dialog
                fullWidth
                maxWidth="lg"
                open={show2}
                onClose={handleClose2}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t('etiquetas.seleccionpcte')}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose2}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers>
                    <Card>
                        <CardContent
                            sx={{
                                pb: '0 !important',
                                '& > header': {
                                    padding: 0,
                                },
                                '& .rdt_Table': {
                                    border: 'solid 1px rgba(0, 0, 0, .12)',
                                },
                            }}
                        >
                            <DataTable
                                striped
                                columns={columns}
                                data={filteredItems1}
                                onRowClicked={handleRowClicked1}
                                conditionalRowStyles={common.conditionalRowStyles}
                                pagination
                                paginationComponentOptions={
                                    common.paginationComponentOptions
                                }
                                subHeader
                                subHeaderComponent={subHeaderComponent1}
                                fixedHeader
                                persistTableHead
                                fixedHeaderScrollHeight="calc(100vh - 317px)"
                                customStyles={common.customStyles}
                                highlightOnHover
                                noDataComponent={
                                    <Typography sx={{ my: 2 }}>
                                        No existen casos para mostrar
                                    </Typography>
                                }
                            />
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions sx={{ mb: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setPaciente(pacienteTemp);
                            setIdPaciente(idPacienteTemp);
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Clasificacion;
