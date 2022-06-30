import React from "react";
import Form from "react-bootstrap/Form";
import Icofont from "react-icofont";

import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import DomainRoundedIcon from '@mui/icons-material/DomainRounded';
import TaxiAlertRoundedIcon from '@mui/icons-material/TaxiAlertRounded';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DataTable from 'react-data-table-component';
import { red } from '@mui/material/colors';
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
    Tab,
    Tabs,
} from '@mui/material';

import common from '../../../common';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { DateTime } from "luxon";
import "react-phone-input-2/lib/style.css";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import Formularios from "../InterHospital/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkedAlt,
    faClinicMedical,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormCheck from "react-bootstrap/FormCheck";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import PhoneInput from "react-phone-input-2";
import makeAnimated from "react-select/animated";
import "./eclinical.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FormularioKamban from "./FormularioKamban";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
toast.configure();
function Emergencias() {
    const [t, i18n] = useTranslation("global");

    const [admisiones, setAdmisiones] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //mostrar o ucultar formulario
    const [tiempo, setTiempo] = useState(new Date()); //mostrar o ucultar formulario
    const [registro, setRegistro] = useState(null);
    //modales
    const [ventanaMedicamentos, setAbrirMedicamentos] = useState(false);
    const cerrarMedicamentos = () => setAbrirMedicamentos(false);
    const abrirMedicamentos = () => setAbrirMedicamentos(true);
    const [ventanaExamenes, setAbrirExamenes] = useState(false);
    const cerrarExamenes = () => setAbrirExamenes(false);
    const abrirExamenes = () => setAbrirExamenes(true);
    //PArte egreso
    const [ventanaEgreso, setAbrirEgreso] = useState(false);
    const cerrarEgreso = () => setAbrirEgreso(false);
    const abrirEgreso = () => setAbrirEgreso(true);
    let [idSalaAtencionMedica, setIdSalaAtencionMedica] = useState("");
    const [salaEstadoAlta, setSalaEstadoAlta] = useState([]);
    const [salaAtencion, setSalaAtencion] = useState(null);
    //formulario
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [pacienteTemp, setPacienteTemp] = useState("");
    const [idPacienteTemp, setIdPacienteTemp] = useState("");
    const [abdomen, setAbdomen] = useState([]);
    const [boca, setBoca] = useState([]);
    const [cabeza, setCabeza] = useState([]);
    const [corazon, setCorazon] = useState([]);
    const [cuello, setCuello] = useState([]);
    const [extremidad, setExtremidad] = useState([]);
    const [general, setGeneral] = useState([]);
    const [genital, setGenital] = useState([]);
    const [neuro, setNeuro] = useState([]);
    const [ojos, setOjos] = useState([]);
    const [otorrino, setOtorrino] = useState([]);
    const [pelvis, setPelvis] = useState([]);
    const [piel, setPiel] = useState([]);
    const [pulmon, setPulmon] = useState([]);
    const [rectal, setRectal] = useState([]);
    const [torax, setTorax] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [examenes, setExamenes] = useState([]);
    const [temporalExamenesSeleccionados, setTemporalExamenesSeleccionados] =
        useState([]);
    const [
        temporalMedicamentosSeleccionados,
        setTemporalMedicamentosSeleccionados,
    ] = useState([]);
    const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState(
        []
    );
    const [medicamentosSeleccionado, setMedicamentosSeleccionado] =
        useState(null);
    const [dosisMedicamentoSeleccionado, setdosisMedicamentoSeleccionado] =
        useState("");
    const [examenesSeleccionado, setExamenesSeleccionado] = useState(null);
    const [examenesSeleccionados, setExamenesSeleccionados] = useState([]);
    const [monitoreo, setMonitoreo] = useState(null);
    const [sesionActual, setSesionActual] = useState(null);
    //const [mostrarFormulario, setMostrarFormulario] = useState(false);//mostrar o ucultar formulario
    const animatedComponents = makeAnimated();

    const [value, setValue] = useState(0);
    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');
    const [filterTextexamenes, setFilterTextexamenes] = useState('');
    const [filterTextmedicamentos, setFilterTextmedicamentos] = useState('');
    const [filterTextmediselect, setFilterTextmediselect] = useState('');
    const [filterTextexamselect, setFilterTextexamselect] = useState('');
    const handleform = () => setMostrarFormulario(true);

    const [form2, setForm2] = useState({
        id_atencionmedica: "",
        id_admision: "",
        general: [{ key: 1, value: 1, label: "Normal" }],
        cabeza: [{ key: 1, value: 1, label: "Normal" }],
        ojo: [{ key: 1, value: 1, label: "Normal" }],
        otorrino: [{ key: 1, value: 1, label: "Normal" }],
        boca: [{ key: 1, value: 1, label: "Normal" }],
        cuello: [{ key: 1, value: 1, label: "Normal" }],
        torax: [{ key: 1, value: 1, label: "Normal" }],
        corazon: [{ key: 1, value: 1, label: "Normal" }],
        pulmon: [{ key: 1, value: 1, label: "Normal" }],
        abdomen: [{ key: 1, value: 1, label: "Normal" }],
        pelvis: [{ key: 1, value: 1, label: "Normal" }],
        rectal: [{ key: 1, value: 1, label: "Normal" }],
        genital: [{ key: 1, value: 1, label: "Normal" }],
        extremidad: [{ key: 1, value: 1, label: "Normal" }],
        neuro: [{ key: 1, value: 1, label: "Normal" }],
        piel: [{ key: 1, value: 1, label: "Normal" }],
        sintomas: "",
        descripcion_diagnostico: "",
        cod_cie10: "",
        otros: "",
        id_estadoalta: "",
    });

    //Formulario egreso
    const [formEgreso, setFormEgreso] = useState({
        id_estadoalta: "",
    });
    //Formulario registrar medicamentos
    const [formRegistrarMedicamento, setFormRegistrarMedicamento] = useState({
        id_atencionmedica: "",
        id_medicamentos: "",
        dosis: "",
    });
    //Formulario registrar Examenes
    const [formRegistrarExamenes, setFormRegistrarExamenes] = useState({
        id_atencionmedica: "",
        id_examen: "",
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //TABLA CIE10

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



    //TABLA CIE10
    const columns = useMemo(() => [
        {
            name: `${t("eclinical.emergencias.datos.codigo")}`,
            sortable: true,
            width: '100px',
            selector: (row) => row.codigo_cie,
        },
        {
            name: `${t("eclinical.emergencias.datos.diagnostico")}`,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.diagnostico,
        }
    ])


    //TABLA PRINCIPAL
    const columns1 = useMemo(() => [
        {
            name: `${t("eclinical.emergencias.datos.clasificacion")}`,
            cell: (row) => {
                return (
                    <div>
                        <Button
                            variant="outlined"
                            id={row.clasificacion_admision}
                            disabled
                        >
                            {row.clasificacion_admision}
                        </Button>
                    </div>
                );
            },
        }, {
            name: `Tiempo`,
            cell: (row, extraData) => {
                return (
                    <div>
                        <AccessTimeIcon sx={{ color: red[500] }} />
                        <span className="text-danger">
                            {`${Math.floor(
                                Math.abs(Date.parse(row.fecha_admision) - new Date()) /
                                1000 /
                                60
                            )} MIN`}
                        </span>

                    </div >
                );
            },
        },
        {
            name: `${t("eclinical.emergencias.datos.fechaclasi")}`,
            sortable: true,
            width: '180px',
            selector: (row) => row.fecha_admision,
        },
        {
            name: `${t("eclinical.emergencias.datos.hc")}`,
            sortable: true,
            width: '80px',
            selector: (row) => row.expendiente,
        },
        {
            name: `${t("eclinical.emergencias.datos.paciente")}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.nombre1,
        },
        {
            name: `${t("eclinical.emergencias.datos.urgencia")}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.nombre_motivoatencion,
        },
        {
            name: `${t("eclinical.emergencias.datos.alta")}`,
            cell: (row) => {
                return (
                    <div>
                        {row.id_atencionmedica && (
                            <Button variant="contained" onClick={abrirEgreso}>
                                {t("eclinical.emergencias.datos.egreso")}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ])
    const filteredItemsmedicamentos = medicamentos.filter(
        (item) =>
            (item.id_medicamento &&
                item.id_medicamento
                    .toString()
                    .toLowerCase()
                    .includes(filterTextmedicamentos.toLowerCase())) ||
            (item.nombre_medicamento &&
                item.nombre_medicamento
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterTextmedicamentos.toLowerCase()))
    );

    const filteredItemsexamenes = examenes.filter(
        (item) =>
            (item.id_examen &&
                item.id_examen
                    .toString()
                    .toLowerCase()
                    .includes(filterTextexamenes.toLowerCase())) ||
            (item.nombre_examen &&
                item.nombre_examen
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterTextexamenes.toLowerCase()))
    );

    const filteredItems1 = admisiones.filter(
        (item) =>
            (item.codigo &&
                item.codigo
                    .toString()
                    .toLowerCase()
                    .includes(filterText1.toLowerCase())) ||
            (item.clasificacion_admision &&
                item.clasificacion_admision
                    .toString()
                    .toLowerCase()
                    .includes(filterText1.toLowerCase())) ||
            (item.fecha_admision &&
                item.fecha_admision
                    .toString()
                    .toLowerCase()
                    .includes(filterText1.toLowerCase())) ||
            (item.expendiente &&
                item.expendiente
                    .toString()
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(filterText1.toLowerCase())) ||
            (item.nombre_motivoatencion &&
                item.nombre_motivoatencion
                    .toString()
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(filterText1.toLowerCase())) ||
            (item.nombre1 &&
                item.nombre1
                    .toString()
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(filterText1.toLowerCase()))
    );

    const filteredItemsexamselect = examenesSeleccionados.filter(
        (item) =>
        (item.id_examen &&
            item.id_examen
                .toString()
                .toLowerCase()
                .includes(filterTextexamselect.toLowerCase()))
    );

    const filteredItemsmediselect = medicamentosSeleccionados.filter(
        (item) =>
        (item.id_medicamento &&
            item.id_medicamento
                .toString()
                .toLowerCase()
                .includes(filterTextmediselect.toLowerCase()))
    );

    const filteredItems = pacientes.filter(
        (item) =>
            (item.codigo_cie &&
                item.codigo_cie
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.diagnostico &&
                item.diagnostico
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
    );

    const subHeaderComponentexamenes = useMemo(() => {
        const handleClear1 = () => {
            if (filterTextexamenes) setFilterTextexamenes('');
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
                        filterText={filterTextexamenes}
                        onFilter={(e) => setFilterTextexamenes(e.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }, [filterTextexamenes]);

    const subHeaderComponentmedicamentos = useMemo(() => {
        const handleClear1 = () => {
            if (filterTextmedicamentos) setFilterTextmedicamentos('');
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
                        filterText={filterTextmedicamentos}
                        onFilter={(e) => setFilterTextmedicamentos(e.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }, [filterTextmedicamentos]);
    const subHeaderComponentmediselect = useMemo(() => {
        const handleClear1 = () => {
            if (filterTextmediselect) setFilterTextmediselect('');
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
                        filterText={filterTextmediselect}
                        onFilter={(e) => setFilterTextmediselect(e.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }, [filterTextmediselect]);

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
        setRegistro(row);
        setForm2((prevState) => ({
            ...prevState,
            id_atencionmedica:
                row.id_atencionmedica != null ? row.id_atencionmedica : "",
            id_admision: row.codigo != null ? row.codigo : "",
            general:
                row.general != null &&
                    row.general[0] != null &&
                    row.general[0] != ""
                    ? convertir(row.general, general)
                    : [{ key: 1, value: 1, label: "Normal" }],
            cabeza:
                row.cabeza != null &&
                    row.cabeza[0] != null &&
                    row.cabeza[0] != ""
                    ? convertir(row.cabeza, cabeza)
                    : [{ key: 1, value: 1, label: "Normal" }],
            ojo:
                row.ojo != null && row.ojo[0] != null && row.ojo[0] != ""
                    ? convertir(row.ojo, ojos)
                    : [{ key: 1, value: 1, label: "Normal" }],
            otorrino:
                row.otorrino != null &&
                    row.otorrino[0] != null &&
                    row.otorrino[0] != ""
                    ? convertir(row.otorrino, otorrino)
                    : [{ key: 1, value: 1, label: "Normal" }],
            boca:
                row.boca != null && row.boca[0] != null && row.boca[0] != ""
                    ? convertir(row.boca, boca)
                    : [{ key: 1, value: 1, label: "Normal" }],
            cuello:
                row.cuello != null &&
                    row.cuello[0] != null &&
                    row.cuello[0] != ""
                    ? convertir(row.cuello, cuello)
                    : [{ key: 1, value: 1, label: "Normal" }],
            torax:
                row.torax != null &&
                    row.torax[0] != null &&
                    row.torax[0] != ""
                    ? convertir(row.torax, torax)
                    : [{ key: 1, value: 1, label: "Normal" }],
            corazon:
                row.corazon &&
                    row.corazon[0] != null &&
                    row.corazon[0] != ""
                    ? convertir(row.corazon, corazon)
                    : [{ key: 1, value: 1, label: "Normal" }],
            pulmon:
                row.pulmon && row.pulmon[0] != null && row.pulmon[0] != ""
                    ? convertir(row.pulmon, pulmon)
                    : [{ key: 1, value: 1, label: "Normal" }],
            abdomen:
                row.abdomen &&
                    row.abdomen[0] != null &&
                    row.abdomen[0] != ""
                    ? convertir(row.abdomen, abdomen)
                    : [{ key: 1, value: 1, label: "Normal" }],
            pelvis:
                row.pelvis != null &&
                    row.pelvis[0] != null &&
                    row.pelvis[0] != ""
                    ? convertir(row.pelvis, pelvis)
                    : [{ key: 1, value: 1, label: "Normal" }],
            rectal:
                row.rectal != null &&
                    row.rectal[0] != null &&
                    row.rectal[0] != ""
                    ? convertir(row.rectal, rectal)
                    : [{ key: 1, value: 1, label: "Normal" }],
            genital:
                row.genital != null &&
                    row.genital[0] != null &&
                    row.genital[0] != ""
                    ? convertir(row.genital, genital)
                    : [{ key: 1, value: 1, label: "Normal" }],
            extremidad:
                row.extremidad != null &&
                    row.extremidad[0] != null &&
                    row.extremidad[0] != ""
                    ? convertir(row.extremidad, extremidad)
                    : [{ key: 1, value: 1, label: "Normal" }],
            neuro:
                row.neuro != null &&
                    row.neuro[0] != null &&
                    row.neuro[0] != ""
                    ? convertir(row.neuro, neuro)
                    : [{ key: 1, value: 1, label: "Normal" }],
            piel:
                row.piel != null && row.piel[0] != null && row.piel[0] != ""
                    ? convertir(row.piel, piel)
                    : [{ key: 1, value: 1, label: "Normal" }],
            sintomas: row.sintomas != null ? row.sintomas : "",
            descripcion_diagnostico:
                row.descripcion_diagnostico != null
                    ? row.descripcion_diagnostico
                    : "",
            cod_cie10: row.cod_cie10 != null ? row.cod_cie10 : "",
            otros: row.otros != null ? row.otros : "",
            id_estadoalta:
                row.id_estadoalta != null ? row.id_estadoalta : "",
        }));
        setExamenesSeleccionados(row.examenes);
        setMedicamentosSeleccionados(row.medicamentos);
        setIdSalaAtencionMedica(row.id_atencionmedica);
        handleform();

        let select = row;
        if (!registro) {
            setRegistro(row);
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
            if (row.codigo === registro.codigo) {
                select = null;
                setRegistro(row);
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
                setRegistro(row);
                const updatedData = admisiones.map((item) => {
                    if (registro.codigo === item.codigo) {
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
    }

    const convertir = (arreglo, arregloDatos) => {
        let arregloNuevo = [];
        arreglo.forEach((elementoBuscado) => {
            arregloDatos.forEach((element) => {
                if (elementoBuscado == element.value) {
                    arregloNuevo.push({
                        value: element.value,
                        label: element.label,
                    });
                }
            });
        });
        return arregloNuevo;
    };

    const cambioSelect = (e) => {
        setFormEgreso((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const GetAdmisiones = async () => {
        setOpenLoad(true);
        await axios
            .get("/api/sala_admision/emergencias")
            .then((response) => {
                setOpenLoad(false);
                setAdmisiones(response.data);
                return response.data;
            })
            .catch((error) => {
                setOpenLoad(false);
                return error;
            });
    };
    const GetPacientes = () => {
        axios
            .get("/api/cie10")
            .then((response) => {
                setPacientes(response.data);

                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const columnsMedicamentos = useMemo(() => [
        {
            name: `${t("eclinical.emergencias.datos.nombremedicamento")}`,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombre_medicamento,
        }
    ])





    //TABLA EXAMENES



    const columnsExamenes = useMemo(() => [
        {
            name: `${t("eclinical.emergencias.datos.examenes")}`,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombre_examen,
        }
    ])




    const columnsMedicamentosSeleccionados = useMemo(() => [
        {
            name: `${t("eclinical.emergencias.datos.medicamentos")}`,
            sortable: true,
            minWidth: '100px',
            selector: (row) => row.nombre_medicamento,
        }, {
            name: `${t("eclinical.emergencias.datos.dosis")}`,
            sortable: true,
            minWidth: '100px',
            selector: (row) => row.dosis,
        },
        {
            name: `${t("eclinical.emergencias.datos.opcion")}`,
            cell: (row) => {
                return (
                    <div>
                        <Button
                            variant="outlined" color="error"
                            onClick={() => {
                                let filtredDataMedicamentos =
                                    medicamentosSeleccionados.filter(
                                        (item) =>
                                            item.nombre_medicamento !=
                                            row.nombre_medicamento
                                    );
                                EliminarMedicamento(row.id_medicamento);
                                setMedicamentosSeleccionados(
                                    filtredDataMedicamentos
                                );
                            }}
                        >
                            <DeleteIcon />
                            Eliminar
                        </Button>
                    </div>
                );
            },
        }
    ])




    const columnsExamenesSeleccionados = useMemo(() => [
        {
            name: `${t("eclinical.emergencias.datos.examenes")}`,
            sortable: true,
            minWidth: '100px',
            selector: (row) => row.nombre_examen,
        },
        {
            name: `${t("eclinical.emergencias.datos.opcion")}`,
            cell: (row) => {
                return (
                    <div>
                        <Button
                            variant="outlined" color="error"
                            onClick={() => {
                                let filtredData = examenesSeleccionados.filter(
                                    (item) => item != row
                                );
                                EliminarExamen(row.id_examen);
                                setExamenesSeleccionados(filtredData);
                            }}
                        >
                            <DeleteIcon />
                            Eliminar
                        </Button>
                    </div>
                );
            },
        }
    ])

    const GetGeneral = () => {
        axios
            .get("/api/cuerpo_general")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_general,
                        label: element.nombre_general,
                    });
                });
                setGeneral(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetCabeza = () => {
        axios
            .get("/api/cuerpo_cabeza")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_cabeza,
                        label: element.nombre_cabeza,
                    });
                });
                setCabeza(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetOjos = () => {
        axios
            .get("/api/cuerpo_ojo")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_ojo,
                        label: element.nombre_ojo,
                    });
                });
                setOjos(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetBoca = () => {
        axios
            .get("/api/cuerpo_boca")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_boca,
                        label: element.nombre_boca,
                    });
                });
                setBoca(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetCuello = () => {
        axios
            .get("/api/cuerpo_cuello")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_cuello,
                        label: element.nombre_cuello,
                    });
                });
                setCuello(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetTorax = () => {
        axios
            .get("/api/cuerpo_torax")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_torax,
                        label: element.nombre_torax,
                    });
                });
                setTorax(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetPulmon = () => {
        axios
            .get("/api/cuerpo_pulmon")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_pulmon,
                        label: element.nombre_pulmon,
                    });
                });
                setPulmon(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetAbdomen = () => {
        axios
            .get("/api/cuerpo_abdomen")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_abdomen,
                        label: element.nombre_abdomen,
                    });
                });
                setAbdomen(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetPelvis = () => {
        axios
            .get("/api/cuerpo_pelvis")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_pelvis,
                        label: element.nombre_pelvis,
                    });
                });
                setPelvis(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetGenital = () => {
        axios
            .get("/api/cuerpo_genital")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_genital,
                        label: element.nombre_genital,
                    });
                });
                setGenital(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetExtremidad = () => {
        axios
            .get("/api/cuerpo_extremidad")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_extremidad,
                        label: element.nombre_extremidad,
                    });
                });
                setExtremidad(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetNeuroo = () => {
        axios
            .get("/api/cuerpo_neuro")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_neuro,
                        label: element.nombre_neuro,
                    });
                });
                setNeuro(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetOtorrino = () => {
        axios
            .get("/api/cuerpo_otorrino")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_otorrino,
                        label: element.nombre_otorrino,
                    });
                });
                setOtorrino(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetCorazon = () => {
        axios
            .get("/api/cuerpo_corazon")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_corazon,
                        label: element.nombre_corazon,
                    });
                });
                setCorazon(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetRectal = () => {
        axios
            .get("/api/cuerpo_rectal")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_rectal,
                        label: element.nombre_rectal,
                    });
                });
                setRectal(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetPiel = () => {
        axios
            .get("/api/cuerpo_piel")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_piel,
                        label: element.nombre_piel,
                    });
                });
                setPiel(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetMedicamentos = () => {
        axios
            .get("/api/medicamentos")
            .then((response) => {
                setMedicamentos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetExamenes = () => {
        axios
            .get("/api/sala_examen")
            .then((response) => {
                setExamenes(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    const GetSalaEstadoAlta = () => {
        axios
            .get("/api/sala_estadoalta")
            .then((response) => {
                setSalaEstadoAlta(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const handleChange1 = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const selecionOtorrino = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            otorrino: eliminarNormal(e.target.value)
        }));
    };
    const selecionPiel = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            piel: eliminarNormal(e.target.value)
        }));
    };
    const selecionNeuro = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            neuro: eliminarNormal(e.target.value)
        }));
    };
    const selecionExtremidad = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            extremidad: eliminarNormal(e.target.value)
        }));
    };
    const selecionGenital = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            genital: eliminarNormal(e.target.value)
        }));
    };
    const selecionRectal = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            rectal: eliminarNormal(e.target.value)
        }));
    };
    const selecionPelvis = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            pelvis: eliminarNormal(e.target.value)
        }));
    };
    const selecionAbdomen = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            abdomen: eliminarNormal(e.target.value)
        }));
    };
    const selecionPulmon = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            pulmon: eliminarNormal(e.target.value)
        }));
    };
    const selecionTorax = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            torax: eliminarNormal(e.target.value)
        }));
    };
    const selecionCorazon = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            corazon: eliminarNormal(e.target.value)
        }));
    };
    const selecionBoca = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            boca: eliminarNormal(e.target.value)
        }));
    };
    const selecionGeneral = (e) => {
        let bus = { key: 1, value: 1, label: "Normal" }
        setForm2((prevState) => ({
            ...prevState,
            general: eliminarNormal(e.target.value)
        }));
    };
    const selecionCabeza = (e) => {
        console.log(e.target.value);
        setForm2((prevState) => ({
            ...prevState,
            cabeza: eliminarNormal(e.target.value)
        }));
    };
    const selecionCuello = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            cuello: eliminarNormal(e.target.value)
        }));
    };

    const selecionOjo = (e) => {

        setForm2((prevState) => ({
            ...prevState,
            ojo: eliminarNormal(e.target.value)
        }));
    };
    const eliminarNormal = (arr) => {
        if (arr.length == 1) {
            return arr;
        } else {
            return arr.filter((_item, index) => _item.value != 1);
        }
    }

    const cambioDosis = (e) => {
        e.persist();
        setdosisMedicamentoSeleccionado(e.target.value);
    };
    const PostEgreso = () => {
        if (idSalaAtencionMedica) {
            axios
                .put(
                    `/api/sala_atencionmedica/${idSalaAtencionMedica}`,
                    formEgreso
                )
                .then((response) => {
                    GetAdmisiones();
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        } else {
            alert("No se ha llenado el formulario de atencion medica");
        }
    };
    let cambio = (arreglo) => {
        let generals = "{";
        let primero = true;
        try {
            arreglo.forEach((element) => {
                if (primero) {
                    primero = false;
                    generals = generals + element.value;
                } else {
                    generals = generals + "," + element.value;
                }
            });
            return generals + "}";
        } catch {
            console.log("no hay arreglo");
            return "{1}";
        }
    };

    const notificarExitoCaso = (idcaso) =>
        toast.success(
            `${t("mensajes.mscasoid")} ${idcaso} ${t("mensajes.msexito")}`,
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
        toast.error(`${t("mensajes.mscreacionerror")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    const PostSala = () => {
        if (form2.id_admision != "" && form2.id_admision != null) {
            if (form2.id_atencionmedica == "" || form2.id_atencionmedica == null) {
                axios
                    .post(`/api/sala_atencionmedica`, {
                        id_admision: form2.id_admision,
                        general: cambio(form2.general),
                        cabeza: cambio(form2.cabeza),
                        ojo: cambio(form2.ojo),
                        otorrino: cambio(form2.otorrino),
                        boca: cambio(form2.boca),
                        cuello: cambio(form2.cuello),
                        torax: cambio(form2.torax),
                        corazon: cambio(form2.corazon),
                        pulmon: cambio(form2.pulmon),
                        abdomen: cambio(form2.abdomen),
                        pelvis: cambio(form2.pelvis),
                        rectal: cambio(form2.rectal),
                        genital: cambio(form2.genital),
                        extremidad: cambio(form2.extremidad),
                        neuro: cambio(form2.neuro),
                        piel: cambio(form2.piel),
                        sintomas: form2.sintomas,
                        descripcion_diagnostico: form2.descripcion_diagnostico,
                        cod_cie10: form2.cod_cie10,
                        otros: form2.otros,
                        id_estadoalta: form2.id_estadoalta,
                    })
                    .then((response) => {
                        setForm2((prevState) => ({
                            ...prevState,
                            id_atencionmedica: response.data.id_atencionmedica,
                        }));
                        if (response.data.id_atencionmedica != null) {
                            notificarExitoCaso(response.data.id_atencionmedica);
                        } else {
                            notificarErrorCaso();
                        }

                        GetAdmisiones();
                        return response.data;
                    })
                    .catch((error) => {
                        notificarErrorCaso();
                        return error.response.data;
                    });
            } else {
                axios
                    .put(
                        `/api/sala_atencionmedica/${form2.id_atencionmedica}`,
                        {
                            id_admision: form2.id_admision,
                            general: cambio(form2.general),
                            cabeza: cambio(form2.cabeza),
                            ojo: cambio(form2.ojo),
                            otorrino: cambio(form2.otorrino),
                            boca: cambio(form2.boca),
                            cuello: cambio(form2.cuello),
                            torax: cambio(form2.torax),
                            corazon: cambio(form2.corazon),
                            pulmon: cambio(form2.pulmon),
                            abdomen: cambio(form2.abdomen),
                            pelvis: cambio(form2.pelvis),
                            rectal: cambio(form2.rectal),
                            genital: cambio(form2.genital),
                            extremidad: cambio(form2.extremidad),
                            neuro: cambio(form2.neuro),
                            piel: cambio(form2.piel),
                            sintomas: form2.sintomas,
                            descripcion_diagnostico:
                                form2.descripcion_diagnostico,
                            cod_cie10: form2.cod_cie10,
                            otros: form2.otros,
                            id_estadoalta: form2.id_estadoalta,
                        }
                    )
                    .then((response) => {
                        GetAdmisiones();
                        return response.data;
                    })
                    .catch((error) => {
                        return error.response.data;
                    });
            }
        }
    };

    const guardar = () => {
        PostMedicamentos();
        PostExamenes();
        PostSala();
    }
    const PostMedicamentos = () => {
        if (formRegistrarMedicamento.id_atencionmedica != "") {
            axios
                .post(
                    "/api/sala_atencionmedica_medicamentos",
                    formRegistrarMedicamento
                )
                .then((response) => {
                    notificarExitoCaso(
                        response.data.id_atencionmedica_medicamentos
                    );
                    return response.data;
                })
                .catch((error) => {
                    notificarErrorCaso();
                    return error.response.data;
                });
        }
    };
    const PostExamenes = () => {
        if (formRegistrarExamenes.id_atencionmedica != "") {
            axios
                .post("/api/sala_atencionmedica_examen", formRegistrarExamenes)
                .then((response) => {
                    notificarExitoCaso(response.data.id_atencionmedica_examen);
                    return response.data;
                })
                .catch((error) => {
                    notificarErrorCaso();
                    return error.response.data;
                });
        }
    };
    const EliminarMedicamento = (id) => {
        if (formRegistrarMedicamento.id_atencionmedica != "") {
            axios
                .post("/api/sala_atencionmedica_medicamentos/eliminar", {
                    id_atencionmedica: form2.id_atencionmedica,
                    id_medicamentos: id,
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
    };
    const EliminarExamen = (id) => {
        if (formRegistrarExamenes.id_atencionmedica != "") {
            axios
                .post("/api/sala_atencionmedica_examen/eliminar", {
                    id_atencionmedica: form2.id_atencionmedica,
                    id_examen: id,
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
    };
    const ObtenerSesion = () => {
        axios
            .get("/sesion-activa")
            .then((responser) => {
                setSesionActual(responser.data);

                return responser.data;
            })
            .catch((error) => { });
    };
    //PDF
    const generatePDFMedicamentos = () => {
        let img = new Image();
        img.src = 'assets/image.jpg';
        
        img.onload = function () {
            let doc = new jsPDF("p", "pt");
            
            doc.setFont("helvetica");
            //Tabla hospital
            let colHospital = ["Hospital", "Fecha emitida"];
            let rowsHospital = [];
            if (registro.hospital != null) {
                rowsHospital.push([registro.hospital.nombre_hospital, new Date()]);
            } else {
                rowsHospital.push(["Sin asignar hospital", new Date()]);
            }

            //Tabla Paciente
            let colPaciente = ["Paciente", "Documento", "Edad"];
            let rowsPaciente = [];
            rowsPaciente.push([
                registro.paciente.nombre1 +
                " " +
                registro.paciente.nombre2 +
                " " +
                registro.paciente.apellido1 +
                " " +
                registro.paciente.apellido2,
                registro.paciente.num_doc,
                registro.paciente.edad +
                " " +
                registro.paciente.codigo_edad.nombre_edad,
            ]);
            //Tabla medicamentos
            let colMedicamentos = ["Medicamento", "Dosis"];
            let rowsMedicamentos = [];
            let itemNew = medicamentosSeleccionados;
            itemNew.forEach((element) => {
                let temp1 = [element.nombre_medicamento, element.dosis];
                rowsMedicamentos.push(temp1);
            });
            //Tabla Doctor
            let colDoctor = ["Medico"];
            let rowsDoctor = [];
            rowsDoctor.push([sesionActual.nombres + " " + sesionActual.apellidos]);
            
            doc.addImage(img, 'JPEG', 35, 25, 109, 34);
            doc.autoTable(colHospital, rowsHospital, { startY: 70 });
            doc.autoTable(colPaciente, rowsPaciente, { startY: 120 });
            doc.autoTable(colMedicamentos, rowsMedicamentos, { startY: 220 });
            doc.autoTable(colDoctor, rowsDoctor, { startY: 170 });
           
            doc.save("orden_Medicamento.pdf");
        }

    };
    const generatePDFExamenes = () => {
        let img = new Image();
        img.src = 'assets/image.jpg';
        
        img.onload = function () {
            let doc = new jsPDF("p", "pt");
            
            doc.setFont("helvetica");
            doc.setFontSize(9);    

            doc.setFont("helvetica");
            //Tabla hospital
            let colHospital = ["Hospital", "Fecha emitida"];
            let rowsHospital = [];
            if (registro.hospital != null) {
                rowsHospital.push([registro.hospital.nombre_hospital, new Date()]);
            } else {
                rowsHospital.push(["Sin asignar hospital", new Date()]);
            }

            //Tabla Paciente
            let colPaciente = ["Paciente", "Documento", "Edad"];
            let rowsPaciente = [];
            rowsPaciente.push([
                registro.paciente.nombre1 +
                " " +
                registro.paciente.nombre2 +
                " " +
                registro.paciente.apellido1 +
                " " +
                registro.paciente.apellido2,
                registro.paciente.num_doc,
                registro.paciente.edad +
                " " +
                registro.paciente.codigo_edad.nombre_edad,
            ]);
            //Tabla examenes
            let colExamenes = ["Examen"];
            let rowsExamenes = [];
            let itemNew = examenesSeleccionados;
            itemNew.forEach((element) => {
                let temp1 = [element.nombre_examen];
                rowsExamenes.push(temp1);
            });
            //Tabla Doctor
            let colDoctor = ["Medico"];
            let rowsDoctor = [];
            rowsDoctor.push([sesionActual.nombres + " " + sesionActual.apellidos]);

            doc.addImage(img, 'JPEG', 35, 25, 109, 34);
            
            doc.autoTable(colHospital, rowsHospital, { startY: 70 });
            doc.autoTable(colPaciente, rowsPaciente, { startY: 120 });
            doc.autoTable(colExamenes, rowsExamenes, { startY: 220 });
            doc.autoTable(colDoctor, rowsDoctor, { startY: 170 });
            doc.save("orden_Examenes.pdf");
        }
    };

    useEffect(() => {
        ObtenerSesion();
        GetAdmisiones();
        GetSalaEstadoAlta();
        GetPacientes();
        GetAbdomen();
        GetBoca();
        GetCabeza();
        GetCorazon();
        GetCuello();
        GetExtremidad();
        GetGeneral();
        GetGenital();
        GetNeuroo();
        GetOjos();
        GetOtorrino();
        GetPelvis();
        GetPiel();
        GetPulmon();
        GetRectal();
        GetTorax();
        GetExamenes();
        GetMedicamentos();
    }, []);
    useEffect(() => {
        setForm2((prevState) => ({
            ...prevState,
            cod_cie10: idPaciente,
        }));
    }, [paciente, idPaciente]);


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
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

            <h2>{t("eclinical.emergencias.titulo")}</h2>

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
                                No existen datos para mostrar
                            </Typography>
                        }
                    />
                </CardContent>
            </Card>
            <br></br>
            <Typography variant="h5" gutterBottom component="div">
                <ArticleIcon />
                {t('formularios.formulario')}
            </Typography>
            <br></br>
            {mostrarFormulario && (
                <Box
                    sx={{
                        my: 2,
                        width: '100%',
                        border: 'solid 1px rgba(0, 0, 0, .12)',
                    }}
                >
                    <Box
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: '46px',
                            },
                            '& .Mui-selected': {
                                color: '#fff !important',
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                borderBottom: 'solid 1px rgba(0, 0, 0, .12)',
                                '& span.span': {
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                },
                            }}>

                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<ManRoundedIcon />}
                                iconPosition="start"
                                label={
                                    <span className="span">
                                        {t('eclinical.emergencias.titulo')}
                                    </span>
                                }
                                {...common.a11yProps(0)} />
                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<MonitorHeartRoundedIcon />}
                                iconPosition="start"
                                label={
                                    <span className="span">
                                        {t('formularios.formkamban.titulo')}
                                    </span>
                                } {...common.a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <common.TabPanel value={value} index={0}>
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
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.general"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.general}
                                        onChange={selecionGeneral}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.general"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {general.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>

                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.cabeza"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.cabeza}
                                        onChange={selecionCabeza}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.cabeza"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {cabeza.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.ojos"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.ojo}
                                        onChange={selecionOjo}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.ojos"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {ojos.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.otorrino"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.otorrino}
                                        onChange={selecionOtorrino}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.otorrino"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {otorrino.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.boca"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.boca}
                                        onChange={selecionBoca}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.boca"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {boca.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.cuello"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.cuello}
                                        onChange={selecionCuello}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.cuello"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {cuello.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>

                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.torax"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.torax}
                                        onChange={selecionTorax}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.torax"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {torax.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.corazon"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.corazon}
                                        onChange={selecionCorazon}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.corazon"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {corazon.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.pulmon"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.pulmon}
                                        onChange={selecionPulmon}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.pulmon"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {pulmon.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>


                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.abdomen"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.abdomen}
                                        onChange={selecionAbdomen}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.abdomen"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {abdomen.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.pelvis"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.pelvis}
                                        onChange={selecionPelvis}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.pelvis"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {pelvis.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.rectal"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.rectal}
                                        onChange={selecionRectal}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.rectal"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {rectal.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.genital"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.genital}
                                        onChange={selecionGenital}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.genital"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {genital.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.extremidad"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.extremidad}
                                        onChange={selecionExtremidad}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.extremidad"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {extremidad.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.neuro"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.neuro}
                                        onChange={selecionNeuro}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.neuro"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {neuro.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-multiple-chip-label">{t(
                                        "eclinical.emergencias.formulario.piel"
                                    )}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        multiple
                                        value={form2.piel}
                                        onChange={selecionPiel}
                                        input={<OutlinedInput id="select-multiple-chip" label={`${t(
                                            "eclinical.emergencias.formulario.piel"
                                        )}`} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.value} label={value.label} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {piel.map((name) => (
                                            <MenuItem
                                                key={name.value}
                                                value={name}
                                            >
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t(
                                        "eclinical.emergencias.formulario.sintomas"
                                    )}`}
                                    multiline
                                    rows={4}
                                    value={form2.sintomas}
                                    onChange={handleChange1}
                                    name="sintomas"
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t(
                                        "eclinical.emergencias.formulario.descripcion"
                                    )}`}
                                    multiline
                                    rows={4}
                                    value={form2.descripcion_diagnostico}
                                    onChange={handleChange1}
                                    name="descripcion_diagnostico"
                                />
                            </Grid>

                            <Grid item xs={6} md={5} lg={5}>
                                <Stack direction="row">

                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        label={`${t(
                                            "eclinical.emergencias.formulario.cie10"
                                        )}`}

                                        value={paciente}
                                        onChange={handleChange1}
                                        name="cie10"
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
                                    label={`${t(
                                        "eclinical.emergencias.formulario.otros"
                                    )}`}
                                    multiline
                                    rows={4}
                                    value={form2.otros}
                                    onChange={handleChange1}
                                    name="otros"
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={6}>
                                <Stack direction="column" spacing={2}>
                                    <Button
                                        variant="contained"
                                        onClick={abrirMedicamentos}
                                        sx={{
                                            p: 0,
                                            height: '40px',
                                            width: '200px',
                                            '& > span.MuiButton-startIcon': { m: 0 },
                                        }}
                                    >
                                        <AddIcon />
                                        Medicamentos
                                    </Button>
                                    {medicamentosSeleccionados.length > 0 && (
                                        <Button
                                            variant="contained"
                                            onClick={generatePDFMedicamentos}
                                            sx={{
                                                p: 0,
                                                height: '40px',
                                                width: '200px',
                                                '& > span.MuiButton-startIcon': { m: 0 },
                                            }}
                                        >
                                            <PrintIcon />
                                            {t(
                                                "eclinical.emergencias.formulario.ordenmedicamentos"
                                            )}
                                        </Button>
                                    )}
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
                                                columns={columnsMedicamentosSeleccionados}
                                                data={filteredItemsmediselect}
                                                conditionalRowStyles={common.conditionalRowStyles}
                                                pagination
                                                paginationComponentOptions={
                                                    common.paginationComponentOptions
                                                }
                                                subHeader
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
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                                <Stack direction="column" spacing={2}>
                                    <Button variant="contained" onClick={abrirExamenes} sx={{
                                        p: 0,
                                        height: '40px',
                                        width: '200px',
                                        '& > span.MuiButton-startIcon': { m: 0 },
                                    }}>
                                        <AddIcon />
                                        {t("eclinical.emergencias.formulario.examenes")}
                                    </Button>
                                    {examenesSeleccionados.length > 0 && (
                                        <Button
                                            variant="contained"
                                            onClick={generatePDFExamenes}
                                            sx={{
                                                p: 0,
                                                height: '40px',
                                                width: '200px',
                                                '& > span.MuiButton-startIcon': { m: 0 },
                                            }}
                                        >
                                            <PrintIcon />
                                            {t(
                                                "eclinical.emergencias.formulario.ordenexamenes"
                                            )}
                                        </Button>
                                    )}
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
                                                columns={columnsExamenesSeleccionados}
                                                data={filteredItemsexamselect}
                                                conditionalRowStyles={common.conditionalRowStyles}
                                                pagination
                                                paginationComponentOptions={
                                                    common.paginationComponentOptions
                                                }
                                                subHeader
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
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>

                                <Button variant="outlined" onClick={guardar}>
                                    {t("etiquetas.guardar")}
                                </Button>

                            </Grid>
                        </Grid>

                    </common.TabPanel>
                    <common.TabPanel value={value} index={1}>
                        <FormularioKamban
                            monitoreo={monitoreo}
                            codigo={registro.codigo}
                        ></FormularioKamban>
                    </common.TabPanel>
                </Box>
            )}

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
                            {t("eclinical.emergencias.formulario.seleccioncie10")}
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
                                data={filteredItems}
                                onRowClicked={(row) => {
                                    setPacienteTemp(row.diagnostico);
                                    setIdPacienteTemp(row.codigo_cie);
                                    let select = row;
                                    if (!idPacienteTemp) {
                                        setIdPacienteTemp(row.codigo_cie);
                                        const updatedData = pacientes.map((item) => {
                                            if (row.codigo_cie !== item.codigo_cie) {
                                                return item;
                                            }

                                            return {
                                                ...item,
                                                toggleSelected: true,
                                            };
                                        });

                                        setPacientes(updatedData);
                                    } else {
                                        if (row.codigo === idPacienteTemp) {
                                            select = null;
                                            setIdPacienteTemp(row.id_signos);
                                            const updatedData = pacientes.map((item) => {
                                                if (row.codigo_cie !== item.codigo_cie) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: false,
                                                };
                                            });
                                            setPacientes(updatedData);
                                        } else {
                                            setIdPacienteTemp(row.codigo_cie);
                                            const updatedData = pacientes.map((item) => {
                                                if (idPacienteTemp === item.codigo_cie) {
                                                    return {
                                                        ...item,
                                                        toggleSelected: false,
                                                    };
                                                } else if (row.codigo_cie !== item.codigo_cie) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: true,
                                                };
                                            });
                                            setPacientes(updatedData);
                                        }
                                    }
                                }}
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

            <Dialog
                fullWidth
                maxWidth="md"
                open={ventanaMedicamentos}
                onClose={cerrarMedicamentos}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t("eclinical.emergencias.formulario.selecciondosis")}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={cerrarMedicamentos}
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
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={`Dosis`}
                                value={dosisMedicamentoSeleccionado}
                                onChange={cambioDosis}
                                name="dosis"

                            />
                        </Grid>
                    </Grid>
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
                                columns={columnsMedicamentos}
                                data={filteredItemsmedicamentos}
                                onRowClicked={(row) => {
                                    setMedicamentosSeleccionado(row);
                                    if (!medicamentosSeleccionado) {
                                        const updatedData = medicamentos.map((item) => {
                                            if (row.id_medicamento !== item.id_medicamento) {
                                                return item;
                                            }

                                            return {
                                                ...item,
                                                toggleSelected: true,
                                            };
                                        });

                                        setMedicamentos(updatedData);
                                    } else {
                                        if (row.id_medicamento === medicamentosSeleccionado.id_medicamento) {

                                            const updatedData = medicamentos.map((item) => {
                                                if (row.id_medicamento !== item.id_medicamento) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: false,
                                                };
                                            });
                                            setMedicamentos(updatedData);
                                        } else {
                                            const updatedData = medicamentos.map((item) => {
                                                if (medicamentosSeleccionado.id_medicamento === item.id_medicamento) {
                                                    return {
                                                        ...item,
                                                        toggleSelected: false,
                                                    };
                                                } else if (row.id_medicamento !== item.id_medicamento) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: true,
                                                };
                                            });
                                            setMedicamentos(updatedData);
                                        }
                                    }
                                }}
                                conditionalRowStyles={common.conditionalRowStyles}
                                pagination
                                paginationComponentOptions={
                                    common.paginationComponentOptions
                                }
                                subHeader
                                subHeaderComponent={subHeaderComponentmedicamentos}
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
                            medicamentosSeleccionado.dosis =
                                dosisMedicamentoSeleccionado;
                            if (
                                medicamentosSeleccionados.indexOf(
                                    medicamentosSeleccionado
                                ) == -1
                            ) {
                                setMedicamentosSeleccionados([
                                    ...medicamentosSeleccionados,
                                    medicamentosSeleccionado,
                                ]);
                                setFormRegistrarMedicamento((prevState) => ({
                                    ...prevState,
                                    id_atencionmedica: form2.id_atencionmedica,
                                    id_medicamentos:
                                        medicamentosSeleccionado.id_medicamento,
                                    dosis: medicamentosSeleccionado.dosis,
                                }));
                            }
                            setFilterTextmedicamentos('');
                            setdosisMedicamentoSeleccionado("");
                            const updatedData = medicamentos.map((item) => {


                                return {
                                    ...item,
                                    toggleSelected: false,
                                };
                            });
                            setMedicamentos(updatedData);
                            cerrarMedicamentos();
                        }}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            cerrarMedicamentos();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth="lg"
                open={ventanaExamenes}
                onClose={cerrarExamenes}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t("eclinical.emergencias.formulario.seleccionexamen")}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={cerrarExamenes}
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
                                columns={columnsExamenes}
                                data={filteredItemsexamenes}
                                onRowClicked={(row) => {
                                    setExamenesSeleccionado(row);
                                    if (!examenesSeleccionado) {
                                        const updatedData = examenes.map((item) => {
                                            if (row.id_examen !== item.id_examen) {
                                                return item;
                                            }

                                            return {
                                                ...item,
                                                toggleSelected: true,
                                            };
                                        });

                                        setExamenes(updatedData);
                                    } else {
                                        if (row.id_examen === examenesSeleccionado.id_examen) {
                                            const updatedData = examenes.map((item) => {
                                                if (row.id_examen !== item.id_examen) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: false,
                                                };
                                            });
                                            setExamenes(updatedData);
                                        } else {
                                            const updatedData = examenes.map((item) => {
                                                if (examenesSeleccionado.id_examen === item.id_examen) {
                                                    return {
                                                        ...item,
                                                        toggleSelected: false,
                                                    };
                                                } else if (row.id_examen != item.id_examen) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: true,
                                                };
                                            });
                                            setExamenes(updatedData);
                                        }
                                    }
                                }}
                                conditionalRowStyles={common.conditionalRowStyles}
                                pagination
                                paginationComponentOptions={
                                    common.paginationComponentOptions
                                }
                                subHeader
                                subHeaderComponent={subHeaderComponentexamenes}
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
                            if (
                                examenesSeleccionados.indexOf(
                                    examenesSeleccionado
                                ) == -1
                            ) {
                                setExamenesSeleccionados([
                                    ...examenesSeleccionados,
                                    examenesSeleccionado,
                                ]);

                                setFormRegistrarExamenes((prevState) => ({
                                    ...prevState,
                                    id_atencionmedica: form2.id_atencionmedica,
                                    id_examen: examenesSeleccionado.id_examen,
                                }));
                            }
                            setFilterTextexamenes('');
                            const updatedData = examenes.map((item) => {


                                return {
                                    ...item,
                                    toggleSelected: false,
                                };
                            });
                            setExamenes(updatedData);

                            cerrarExamenes();
                        }}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            cerrarExamenes();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth="sm"
                open={ventanaEgreso}
                onClose={cerrarEgreso}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t("eclinical.emergencias.formulario.seleccionexamen")}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={cerrarEgreso}
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
                        <Grid item xs={12} >
                            <FormControl fullWidth size="small">
                                <InputLabel id="label_tipo3">{t(
                                    "eclinical.emergencias.formulario.disposicion"
                                )}</InputLabel>
                                <Select
                                    labelId="label_tipo3"
                                    value={formEgreso.id_estadoalta}
                                    onChange={cambioSelect}
                                    name="id_estadoalta"
                                    label={`${t(
                                        "eclinical.emergencias.formulario.disposicion"
                                    )}`}
                                >

                                    {salaEstadoAlta.map((tipo) => (
                                        <MenuItem value={tipo.id_estadoalta} key={tipo.id_estadoalta}>{tipo.estado_alta}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mb: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            PostEgreso();
                            GetAdmisiones();

                            cerrarEgreso();
                        }}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            cerrarEgreso();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}

export default Emergencias;
