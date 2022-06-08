import React from 'react'
import Icofont from 'react-icofont';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DataTable from 'react-data-table-component';
import { green } from '@mui/material/colors';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    InputLabel,
    MenuItem,
    FormControl,
    OutlinedInput,
    Box,
    Stack,
    Chip,
    Checkbox,
    FormGroup,
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
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//import 'react-phone-input-2/lib/style.css'
import InputGroup from 'react-bootstrap/InputGroup'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

//import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from "react-i18next"
const { DateTime } = require("luxon");
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Co2Rounded } from '@mui/icons-material';

toast.configure()

const Monitoreo = () => {
    const [t, i18n] = useTranslation("global");
    const [tablas, setTablas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [camas, setCamas] = useState([]);
    const [necesidades, setNecesidades] = useState([]);
    const [riesgos, setRiesgos] = useState([]);
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);

    const [showPcte, setShoPcte] = useState(false);
    const handleShowPcte = () => setShoPcte(true);
    const handleClosePcte = () => setShoPcte(false);
    const [showEsp, setShowEsp] = useState(false);
    const handleShowEsp = () => setShowEsp(true);
    const handleCloseEsp = () => setShowEsp(false);
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidad, setEspecialidad] = useState("");
    const [idEspecialidad, setIdEspecialidad] = useState("");
    const [especialidadTemp, setEspecialidadTemp] = useState("");
    const [idEspecialidadTemp, setIdEspecialidadTemp] = useState("");

    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');

    const [evaluaciones, setEvaluaciones] = useState([]);
    const [procedimientos, setProcedimientos] = useState([]);
    const [examenes, setExamenes] = useState([]);
    const [disposicion, setDisposicion] = useState([]);
    const [tiempo, setTiempo] = useState(DateTime.now());


    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);


    const [form, setForm] = useState({
        fecha_creacion: DateTime.now().set({ milliseconds: 0 }).toISO({ suppressMilliseconds: true }),
        nota_evolucion: '',
        procedimiento: '',
        examen: '',
        nota_examen: '',
        complicacion: '',
        nota_complicacion: '',
        especialidad: '',
        diagnostico: '',
        motivo_estancia: '',
        disposicion: '',
        no_cama: '',
        id_monitoreo: '',
    });

    const clearform = () => {
        setC1(false)
        setC2(false)
        setC3(false)
        setC4(false)
        setC5(false)
        setIdEspecialidad("")
        setEspecialidad("")
        setForm({
            fecha_creacion: DateTime.now().set({ milliseconds: 0 }).toISO({ suppressMilliseconds: true }),
            nota_evolucion: '',
            procedimiento: '',
            examen: '',
            nota_examen: '',
            complicacion: '',
            nota_complicacion: '',
            especialidad: '',
            diagnostico: '',
            motivo_estancia: '',
            disposicion: '',
            no_cama: '',
            id_monitoreo: ''
        })
    }


    const Get = async () => {
        setOpenLoad(true);
        await axios.get(`/api/monitoreo`)
            .then(response => {
                setTablas(response.data);
                setOpenLoad(false);
                return response.data;
            })
            .catch(error => {
                setOpenLoad(false);
                return error;
            })

    }
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

    const subHeaderComponentesp = useMemo(() => {
        const handleClear = () => {
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
                        onClear={handleClear}
                        filterText={filterText1}
                        onFilter={(e) => setFilterText1(e.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }, [filterText1]);

    const GetProcedimientos = () => {
        axios.get(`/api/procedimientos`)
            .then(response => {
                setProcedimientos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetPacientes = () => {
        axios.get(`/api/monitoreo/paciente`)
            .then(response => {
                setPacientes(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetCamas = () => {
        axios.get(`/api/monitoreo/censo_camas`)
            .then(response => {
                setCamas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }
    const GetNecesidades = () => {
        axios.get(`/api/monitoreo/necesidades`)
            .then(response => {
                setNecesidades(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }
    const GetRiesgos = () => {
        axios.get(`/api/monitoreo/riesgos`)
            .then(response => {
                setRiesgos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    const handleChange = e => {
        setForm(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )


    }

    const handleInputChangeC1 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC1(value);
    }
    const handleInputChangeC2 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC2(value);
    }
    const handleInputChangeC3 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC3(value);
    }
    const handleInputChangeC4 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC4(value);
    }
    const handleInputChangeC5 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC5(value);
    }

    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            especialidad: idEspecialidad
        }));
    }, [especialidad, idEspecialidad])

    const chekeo = () => {
        let necesidades = "{";
        if (c1) {
            necesidades = necesidades + "1,";
        }
        if (c2) {
            necesidades = necesidades + "2,";
        }
        if (c3) {
            necesidades = necesidades + "3,";
        }
        if (c4) {
            necesidades = necesidades + "4,";
        }
        if (c5) {
            necesidades = necesidades + "5,";
        }
        if (necesidades != "{") {
            necesidades = necesidades.substring(0, necesidades.length - 1);
        }
        necesidades = necesidades + "}";
        setForm(
            prevState => ({
                ...prevState,
                complicacion: necesidades
            })
        );
    }

    const notificarExitoCaso = (idcaso) =>
        toast.success(`${t("mensajes.mscasoid")} ${idcaso} ${t("mensajes.msexito")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });;

    const notificarErrorCaso = () =>
        toast.error(`${t("mensajes.mscreacionerror")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });;


    const Post = async () => {
        await chekeo()
        axios.post('/api/evolucion', form)
            .then(response => {
                Get()
                notificarExitoCaso(response.data.id);
                clearform()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                clearform()
                return error.response.data;
            })
    }





    const GetDatos = () => {
        axios.get('/api/sala_examen')
            .then(response => {

                setExamenes(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

        axios.get('/api/especialidad')
            .then(response => {

                setEspecialidades(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

        axios.get(`/api/procedimientos`)
            .then(response => {
                setProcedimientos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    useEffect(() => {
        Get();
        GetPacientes();
        GetCamas();
        GetProcedimientos();
        GetNecesidades();
        GetRiesgos();
        GetDatos()
    }, []);


    const columns = useMemo(() => [

        {
            name: `${t("eclinical.monitoreo.datos.tiemposala")}`,
            cell: (row, extraData) => {
                return (
                    <div>
                        <AccessTimeIcon sx={{ color: green[500] }} />
                        <span className="text-success">
                            {Math.floor(((Math.abs(Date.parse(row.sala_admision.fecha_admision) - extraData)) / 1000) / 60) + " MIN"}
                        </span>
                    </div>
                );
            },
        }, {
            name: `${t("eclinical.monitoreo.datos.ncama")}`,
            sortable: true,
            selector: (row) => row.no_cama,
        }, {
            name: `${t("eclinical.monitoreo.datos.hc")}`,
            cell: (row) => {
                return (
                    <div>
                        {row.paciente != null ? row.paciente.expendiente : "Sin expediente"}
                    </div>
                );
            },
        }, {
            name: `${t("eclinical.monitoreo.datos.paciente")}`,
            cell: (row) => {
                return (
                    <div>
                        {row.paciente != null ? (row.paciente.nombre1 + " " + row.paciente.nombre2 + " " + row.paciente.apellido1 + " " + row.paciente.apellido2) : ""}
                    </div>
                );
            },
        }, {
            name: `${t("eclinical.monitoreo.datos.motivoestancia")}`,
            sortable: true,
            selector: (row) => row.necesidad,
        }, {
            name: `${t("eclinical.monitoreo.datos.prosala")}`,
            cell: (row) => {
                return (
                    <div>
                        {row.procedimiento != null ? row.procedimiento.nombre_procedimiento : "Sin procedimiento"}

                    </div>
                );
            },
        }, {
            name: `${t("eclinical.monitoreo.datos.examenpendiente")}`,
            cell: (row) => {
                return (
                    <div>
                        {row.evoluciones.map(evo =>
                        {evo.examen  ? <li key={evo.examen.id_examen}>{evo.examen.nombre_examen}</li>:''
                            }
                        )}
                    </div>
                );
            },
        }, {
            name: `${t("eclinical.monitoreo.datos.riesgoadquirido")}`,
            sortable: true,
            selector: (row) => row.riegos,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            setLine({
                                nombre1: row.paciente.nombre1,
                                nombre2: row.paciente.nombre2,
                                apellido1: row.paciente.apellido1,
                                apellido2: row.paciente.apellido2,
                                apodo: row.paciente.apodo,
                                celular: row.paciente.celular,
                                direccion: row.paciente.direccion,
                                email: row.paciente.email,
                                edad: row.paciente.edad,
                                fecha_nacido: row.paciente.fecha_nacido,
                                nacionalidad: row.paciente.nacionalidad,
                                num_doc: row.paciente.num_doc,
                                telefono: row.paciente.telefono,
                                tipo_doc: row.paciente.tipo_doc
                            })
                            handleShowPcte();
                        }} />
                    </div>
                );
            },
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>

                        <FolderIcon onClick={() => {
                            setForm(
                                prevState => ({
                                    ...prevState,
                                    id_monitoreo: row.id
                                })
                            )
                            handleShowE()
                        }} />

                    </div>
                );
            },
        }, {
            name: '',
            width: '160px',
            cell: (row) => {
                return (
                    <div>
                        <Link to={`/evaluacion?cod=${row.id}`} >
                            <Button variant="outlined">
                                Evaluación
                            </Button>
                        </Link>

                    </div>
                );
            },
        },
    ])


    const filteredItems = tablas.filter(
        (item) =>
            (item.id &&
                item.id
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.no_cama &&
                item.no_cama
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.paciente.expendiente &&
                item.paciente.expendiente
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.paciente.nombre1 &&
                item.paciente.nombre1
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.paciente.nombre2 &&
                item.paciente.nombre2
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.paciente.apellido1 &&
                item.paciente.apellido1
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.paciente.apellido2 &&
                item.paciente.apellido2
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.necesidad &&
                item.necesidad
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
    );

    const filteredItemsesp = especialidades.filter(
        (item) =>
            (item.id_especialidad &&
                item.id_especialidad
                    .toString()
                    .toLowerCase()
                    .includes(filterText1.toLowerCase())) ||
            (item.nombre_especialidad &&
                item.nombre_especialidad
                    .toString()
                    .toLowerCase()
                    .includes(filterText1.toLowerCase()))
    );




    const columnsesp = useMemo(() => [
        {
            name: `Especialidad`,
            sortable: true,
            minWidth: '300px',
            selector: (row) => row.nombre_especialidad,
        }
    ])




    return (
        <div>
            <div>
                <h2>{t("eclinical.monitoreo.titulo")}</h2>
            </div>
            <div>
                <div className='monit'>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.necesidad")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cuidadomin")} </p><p className='tarjetavalue'>{necesidades.minimo}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cuidadointer")}</p><p className='tarjetavalue'>{necesidades.intermedio}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cuidadointensivo")}</p><p className='tarjetavalue'>{necesidades.intensivo}</p>
                            </div>
                        </div>
                    </div>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.paciente")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.internados")} </p><p className='tarjetavalue'>{pacientes.internados}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.fb")}</p><p className='tarjetavalue'>{pacientes.fb}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("eclinical.monitoreo.datos.media")}</p><p className='tarjetavalue'>{pacientes.media}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.total")}</p><p className='tarjetavalue'>{pacientes.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.censocamas")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cadisponibles")}</p><p className='tarjetavalue'>{camas.disponibles}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.caocupadas")}</p><p className='tarjetavalue'>{camas.ocupadas}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("eclinical.monitoreo.datos.caextras")}</p><p className='tarjetavalue'>{camas.disponibles + camas.ocupadas - camas.total}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.totalcamas")}</p><p className='tarjetavalue'>{camas.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.riesgoadquirido")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.flebite")}: </p><p className='tarjetavalue'>{riesgos.r1}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.caida")}:</p><p className='tarjetavalue'>{riesgos.r2}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("formularios.formkamban.exsonda")}:</p><p className='tarjetavalue'>{riesgos.r3}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.ulcera")}:</p><p className='tarjetavalue'>{riesgos.r4}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.exaccidente")}:</p><p className='tarjetavalue'>{riesgos.r5}</p>
                            </div>
                        </div>
                    </div>
                </div>
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
                            data={filteredItems}
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
                                    No existen datos para mostrar
                                </Typography>
                            }
                        />
                    </CardContent>
                </Card>



                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={showEsp}
                    onClose={handleCloseEsp}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar
                            variant="dense"
                            sx={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography sx={{ fontSize: '1.3rem' }}>
                                {t("eclinical.monitoreo.datos.especial")}
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleCloseEsp}
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
                                    columns={columnsesp}
                                    data={filteredItemsesp}
                                    onRowClicked={(row) => {
                                        console.log(row);
                                        setEspecialidadTemp(row.nombre_especialidad);
                                        setIdEspecialidadTemp(row.id_especialidad);
                                        let select = row;
                                        if (!idEspecialidadTemp) {
                                            setIdEspecialidadTemp(row.id_especialidad);
                                            const updatedData = especialidades.map((item) => {
                                                if (row.id_especialidad !== item.id_especialidad) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: true,
                                                };
                                            });

                                            setEspecialidades(updatedData);
                                        } else {
                                            if (row.id_especialidad === idAdmision) {
                                                select = null;
                                                setIdEspecialidadTemp(row.id_especialidad);
                                                const updatedData = especialidades.map((item) => {
                                                    if (row.id_especialidad !== item.id_especialidad) {
                                                        return item;
                                                    }

                                                    return {
                                                        ...item,
                                                        toggleSelected: false,
                                                    };
                                                });
                                                setEspecialidades(updatedData);
                                            } else {
                                                setIdEspecialidadTemp(row.id_especialidad);
                                                const updatedData = especialidades.map((item) => {
                                                    if (idEspecialidadTemp === item.id_especialidad) {
                                                        return {
                                                            ...item,
                                                            toggleSelected: false,
                                                        };
                                                    } else if (row.id_especialidad !== item.id_especialidad) {
                                                        return item;
                                                    }

                                                    return {
                                                        ...item,
                                                        toggleSelected: true,
                                                    };
                                                });
                                                setEspecialidades(updatedData);
                                            }
                                        }
                                    }}
                                    conditionalRowStyles={common.conditionalRowStyles}
                                    pagination
                                    paginationComponentOptions={
                                        common.paginationComponentOptions
                                    }
                                    subHeader
                                    subHeaderComponent={subHeaderComponentesp}
                                    fixedHeader
                                    persistTableHead
                                    fixedHeaderScrollHeight="calc(100vh - 317px)"
                                    customStyles={common.customStyles}
                                    highlightOnHover
                                    noDataComponent={
                                        <Typography sx={{ my: 2 }}>
                                            No existen datos para mostrar
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
                                setEspecialidad(especialidadTemp);
                                setIdEspecialidad(idEspecialidadTemp);
                                handleCloseEsp();
                            }}
                        >
                            {t('etiquetas.seleccionar')}
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleCloseEsp();
                            }}
                        >
                            {t('etiquetas.cancelar')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={showe}
                    onClose={handleCloseE}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar
                            variant="dense"
                            sx={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography sx={{ fontSize: '1.3rem' }}>
                                {t("eclinical.monitoreo.datos.evolucion")} - {t("etiquetas.agregar")}
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleCloseE}
                                aria-label="Cerrar"
                            >
                                <CloseRoundedIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent dividers>
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
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("eclinical.monitoreo.datos.notaevolucion")}`}
                                    multiline
                                    rows={4}
                                    value={form.nota_evolucion}
                                    onChange={handleChange}
                                    name="nota_evolucion"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="label_tipo1">{t("eclinical.monitoreo.datos.procedimientos")}</InputLabel>
                                    <Select
                                        labelId="label_tipo1"
                                        value={form.procedimiento}
                                        onChange={handleChange}
                                        name="procedimiento"
                                        label={`${t("eclinical.monitoreo.datos.procedimientos")}`}
                                    >

                                        {procedimientos.map((tipo) => (
                                            <MenuItem value={tipo.id_sala_procedimiento} key={tipo.id_sala_procedimiento}>{tipo.nombre_procedimiento}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="label_tipo1">{t("eclinical.monitoreo.datos.examenes")}</InputLabel>
                                    <Select
                                        labelId="label_tipo1"
                                        value={form.examen}
                                        onChange={handleChange}
                                        name="examen"
                                        label={`${t("eclinical.monitoreo.datos.examenes")}`}
                                    >

                                        {examenes.map((tipo) => (
                                            <MenuItem value={tipo.id_examen} key={tipo.id_examen}>{tipo.nombre_examen}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("eclinical.monitoreo.datos.notaexamen")}`}
                                    multiline
                                    rows={4}
                                    value={form.nota_examen}
                                    onChange={handleChange}
                                    name="nota_examen"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={c1}
                                            onChange={handleInputChangeC1} />}
                                        label={`${t("formularios.formkamban.flebite")}`} />
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={c2}
                                            onChange={handleInputChangeC2} />}
                                        label={`${t("formularios.formkamban.caida")}`} />
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={c3}
                                            onChange={handleInputChangeC3} />}
                                        label={`${t("formularios.formkamban.exaccidente")}`} />
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={c4}
                                            onChange={handleInputChangeC4} />}
                                        label={`${t("formularios.formkamban.ulcera")}`} />
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={c5}
                                            onChange={handleInputChangeC5} />}
                                        label={`${t("formularios.formkamban.exsonda")}`} />


                                </FormGroup>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("eclinical.monitoreo.datos.notacomplicacion")}`}
                                    multiline
                                    rows={4}
                                    value={form.nota_complicacion}
                                    onChange={handleChange}
                                    name="nota_complicacion"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Stack direction="row">

                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        label={`${t("eclinical.monitoreo.datos.especial")}`}

                                        value={especialidad}
                                        onChange={handleChange}
                                        name="especialidad"
                                        InputProps={{
                                            readOnly: true,
                                        }}

                                    />

                                    <Button variant="outlined" onClick={handleShowEsp}
                                        startIcon={< SearchIcon />}
                                        sx={{
                                            p: 0,
                                            minWidth: '40px',
                                            '& > span.MuiButton-startIcon': { m: 0 },
                                        }} />
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("eclinical.monitoreo.datos.diagnostico")}`}
                                    value={form.diagnostico}
                                    onChange={handleChange}
                                    name="diagnostico"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("eclinical.monitoreo.datos.motivoestancia")}`}
                                    multiline
                                    rows={4}
                                    value={form.motivo_estancia}
                                    onChange={handleChange}
                                    name="motivo_estancia"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="label_tipo6">{t("eclinical.monitoreo.datos.disposicion")}</InputLabel>
                                    <Select
                                        labelId="label_tipo6"
                                        value={form.disposicion}
                                        onChange={handleChange}
                                        name="disposicion"
                                        label={`${t("eclinical.monitoreo.datos.disposicion")}`}
                                    >

                                        {disposicion.map((tipo) => (
                                            <MenuItem value={tipo.id_catalogo} key={tipo.id_catalogo}>{tipo.servicio_es}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("eclinical.monitoreo.datos.ncama")}`}
                                    value={form.no_cama}
                                    onChange={handleChange}
                                    name="no_cama"
                                />
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ mb: 1 }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                Post()
                                handleCloseE()
                            }}
                        >
                            {t('etiquetas.guardar')}
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleCloseE()
                                clearform()
                            }}
                        >
                            {t('etiquetas.cancelar')}
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={showPcte}
                    onClose={() => {
                        handleClosePcte()
                        setLine('')
                    }}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar
                            variant="dense"
                            sx={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography sx={{ fontSize: '1.3rem' }}>
                                {t("eclinical.monitoreo.datos.incidentes")}
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={() => {
                                    handleClosePcte()
                                    setLine('')
                                }}
                                aria-label="Cerrar"
                            >
                                <CloseRoundedIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent dividers>
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
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.nombre1")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.nombre1}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.nombre2")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.nombre2}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.apellido1")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.apellido1}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.apellido2")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.apellido2}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.apodo")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.apodo}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.docid")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.num_doc}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.edad")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.edad}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.fechanac")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.fecha_nacido}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.direccion")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.direccion}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.telefono")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.telefono}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("formularios.formpacientes.nacionalidad")} :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.nacionalidad}
                                </Typography>
                            </Grid>


                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ mb: 1 }}>

                        <Button
                            variant="contained"
                            onClick={() => {
                                handleClosePcte()
                                setLine('')
                            }
                            }>
                            {t("etiquetas.hecho")}
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </div>
    )

}

export default Monitoreo;
