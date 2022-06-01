import React from 'react'
import Icofont from 'react-icofont';
import EditIcon from '@mui/icons-material/Edit';
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
    ButtonGroup,
    Button,
    CircularProgress,
    IconButton,
} from '@mui/material';

import common from '../../../common';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import 'react-phone-input-2/lib/style.css'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set } from 'lodash';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from "react-i18next"
const { DateTime } = require("luxon");

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Evaluacion = () => {
    const [t, i18n] = useTranslation("global");
    let url = useLocation().search
    const [searchParams] = useSearchParams();
    var cod = searchParams.get('cod')
    const [mans, setMans] = useState([]);
    const [datos, setDatos] = useState("");
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const [talleres, setTalleres] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);
    const [showEsp, setShowEsp] = useState(false);
    const handleShowEsp = () => setShowEsp(true);
    const handleCloseEsp = () => setShowEsp(false);
    const [showDiag, setShowDiag] = useState(false);
    const handleShowDiag = () => setShowDiag(true);
    const handleCloseDiag = () => setShowDiag(false);


    const [diagnosticos, setDiagnosticos] = useState([]);
    const [diagnostico, setDiagnostico] = useState("");
    const [idDiagnostico, setIdDiagnostico] = useState("");
    const [diagnosticoTemp, setDiagnosticoTemp] = useState("");
    const [idDiagnosticoTemp, setIdDiagnosticoTemp] = useState("");
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidad, setEspecialidad] = useState("");
    const [idEspecialidad, setIdEspecialidad] = useState("");
    const [especialidadTemp, setEspecialidadTemp] = useState("");
    const [idEspecialidadTemp, setIdEspecialidadTemp] = useState("");

    const [evaluaciones, setEvaluaciones] = useState([]);
    const [procedimientos, setProcedimientos] = useState([]);
    const [examenes, setExamenes] = useState([]);
    const [disposicion, setDisposicion] = useState([]);


    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');

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
        id_monitoreo: `${cod}`
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
            id_monitoreo: `${cod}`
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


    const Get = async () => {
        setOpenLoad(true);
        await axios.get(`/api/evolucion`)
            .then(response => {
                setEvaluaciones(response.data.filter(e => e.id_monitoreo == cod));
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

    useEffect(() => {
        Get();
        GetDatos()
    }, []);



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

    const handleChange = e => {
        e.persist();
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



    const Elimina = () => {
        axios.delete(`/api/evolucion/${line.id}/delete`)
            .then(response => {
                setLine('')
                Get()
                return response.data;
            })
            .catch(error => {
                return error;
            });
        handleClose();
    }


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

    const columns = useMemo(() => [

        {
            name: `${t("eclinical.monitoreo.datos.fechaeva")}`,
            sortable: true,
            selector: (row) => row.fecha_creacion,
        }, {
            name: `${t("eclinical.monitoreo.datos.procedimientos")}`,
            sortable: true,
            wrap: true,
            selector: (row) => row.procedimiento,
        }, {
            name: `${t("eclinical.monitoreo.datos.examenes")}`,
            sortable: true,
            wrap: true,
            selector: (row) => row.examen,
        }, {
            name: `${t("eclinical.monitoreo.datos.notaexamenes")}`,
            wrap: true,
            sortable: true,
            selector: (row) => row.nota_examen,
        }, {
            name: `${t("eclinical.monitoreo.datos.complicacion")}`,
            sortable: true,
            wrap: true,
            selector: (row) => row.complicacion,
        }, {
            name: `${t("eclinical.monitoreo.datos.notacomplicacion")}`,
            wrap: true,
            sortable: true,
            selector: (row) => row.especialidad,
        }, {
            name: `${t("eclinical.monitoreo.datos.especial")}`,
            sortable: true,
            wrap: true,
            selector: (row) => row.especial,
        }, {
            name: `${t("eclinical.monitoreo.datos.diagnostico")}`,
            sortable: true,
            selector: (row) => row.diagnostico,
        }, {
            name: `${t("eclinical.monitoreo.datos.motivoestancia")}`,
            sortable: true,
            wrap: true,
            selector: (row) => row.motivo_estancia,
        }, {
            name: `${t("eclinical.monitoreo.datos.ncama")}`,
            sortable: true,
            selector: (row) => row.no_cama,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView()
                            setForm({
                                fecha_creacion: row.fecha_creacion,
                                nota_evolucion: row.nota_evolucion,
                                procedimiento: row.procedimiento,
                                examen: row.examen,
                                nota_examen: row.nota_examen,
                                complicacion: row.complicacion,
                                nota_complicacion: row.nota_complicacion,
                                especialidad: row.especialidad,
                                diagnostico: row.diagnostico,
                                motivo_estancia: row.motivo_estancia,
                                disposicion: row.disposicion,
                                no_cama: row.no_cama,
                                id_monitoreo: row.id_monitoreo
                            })
                            setLine({
                                id: row.id,
                                fecha_creacion: row.fecha_creacion,
                                nota_evolucion: row.nota_evolucion,
                                procedimiento: row.procedimiento,
                                examen: row.examen,
                                nota_examen: row.nota_examen,
                                complicacion: row.complicacion,
                                nota_complicacion: row.nota_complicacion,
                                especialidad: row.especialidad,
                                diagnostico: row.diagnostico,
                                motivo_estancia: row.motivo_estancia,
                                disposicion: row.disposicion,
                                no_cama: row.no_cama,
                                id_monitoreo: row.id_monitoreo
                            })
                            handleShow();
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

                        <EditIcon onClick={() => {
                            handleEdit()
                            setForm({
                                nota_evolucion: row.nota_evolucion,
                                procedimiento: row.procedimiento,
                                examen: row.examen,
                                nota_examen: row.nota_examen,
                                complicacion: row.complicacion,
                                nota_complicacion: row.nota_complicacion,
                                especialidad: row.especialidad,
                                diagnostico: row.diagnostico,
                                motivo_estancia: row.motivo_estancia,
                                disposicion: row.disposicion,
                                no_cama: row.no_cama,
                                id_monitoreo: row.id_monitoreo
                            })
                            setLine({
                                id: row.id,
                                nota_evolucion: row.nota_evolucion,
                                procedimiento: row.procedimiento,
                                examen: row.examen,
                                nota_examen: row.nota_examen,
                                complicacion: row.complicacion,
                                nota_complicacion: row.nota_complicacion,
                                especialidad: row.especialidad,
                                diagnostico: row.diagnostico,
                                motivo_estancia: row.motivo_estancia,
                                disposicion: row.disposicion,
                                no_cama: row.no_cama,
                                id_monitoreo: row.id_monitoreo
                            })
                            handleShowE()
                        }} />

                    </div>
                );
            },
        }, {
            name: '',
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <DeleteIcon onClick={() => {
                            handleDelet()
                            setForm({
                                nota_evolucion: row.nota_evolucion,
                                procedimiento: row.procedimiento,
                                examen: row.examen,
                                nota_examen: row.nota_examen,
                                complicacion: row.complicacion,
                                nota_complicacion: row.nota_complicacion,
                                especialidad: row.especialidad,
                                diagnostico: row.diagnostico,
                                motivo_estancia: row.motivo_estancia,
                                disposicion: row.disposicion,
                                no_cama: row.no_cama,
                                id_monitoreo: row.id_monitoreo
                            })
                            setLine({
                                id: row.id,
                                nota_evolucion: row.nota_evolucion,
                                procedimiento: row.procedimiento,
                                examen: row.examen,
                                nota_examen: row.nota_examen,
                                complicacion: row.complicacion,
                                nota_complicacion: row.nota_complicacion,
                                especialidad: row.especialidad,
                                diagnostico: row.diagnostico,
                                motivo_estancia: row.motivo_estancia,
                                disposicion: row.disposicion,
                                no_cama: row.no_cama,
                                id_monitoreo: row.id_monitoreo
                            })
                            handleShow();
                        }} />

                    </div>
                );
            },
        },
    ])

    const filteredItems = evaluaciones.filter(
        (item) =>
            (item.id &&
                item.id
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.fecha_creacion &&
                item.fecha_creacion
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.procedimiento &&
                item.procedimiento
                    .toString()
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(filterText.toLowerCase())) ||
            (item.examen &&
                item.examen
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nota_examen &&
                item.nota_examen
                    .toString()
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(filterText.toLowerCase())) ||
            (item.complicacion &&
                item.complicacion
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nota_complicacion &&
                item.nota_complicacion
                    .toString()
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(filterText.toLowerCase())) ||
            (item.especialidad &&
                item.especialidad
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.diagnostico &&
                item.diagnostico
                    .toString()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.motivo_estancia &&
                item.motivo_estancia
                    .toString()
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(filterText.toLowerCase())) ||
            (item.no_cama &&
                item.no_cama
                    .toString()
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

    const Post = async () => {
        await chekeo()
        axios.post('/api/evolucion', form)
            .then(response => {
                Get()
                notificarExitoCaso(response.data.id);
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = async () => {
        await chekeo()
        axios.put(`/api/evolucion/${line.id}`, form)
            .then(response => {
                setLine('')
                Get()
                return response.data;
            })
            .catch(error => {
                return error.response.data;
            })
    }

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

            <h2>{t("eclinical.monitoreo.datos.evolucion")}</h2>

            <br />
            <Button variant="contained" onClick={() => {
                clearform()
                handleClose()
                handleAdd()
                setLine('')
                handleShowE()
            }}>
                <AddIcon />
            </Button>

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
                open={show}
                onClose={() => {
                    handleClose()
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
                            {t("eclinical.monitoreo.datos.incidentes")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => {
                                handleClose()
                                setLine('')
                            }}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers>
                    <ButtonGroup variant="outlined">
                        <Button onClick={() => {
                            clearform()
                            handleClose()
                            handleAdd()
                            setLine('')
                            handleShowE()
                        }}>
                            <AddIcon />
                        </Button>

                        <Button onClick={() => {
                            handleEdit()
                            handleClose()
                            handleShowE()
                        }}>
                            <EditIcon />
                        </Button>

                        <Button disabled={!view} onClick={() => {
                            handleClose()
                            handleDelet()
                            handleShow()
                        }} >
                            <DeleteIcon />
                        </Button>
                    </ButtonGroup>
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
                                {t("eclinical.monitoreo.datos.fechaeva")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.fecha_creacion}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.notaevolucion")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nota_evolucion}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.procedimientos")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.procedimiento}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.examenes")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.examen}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.notaexamenes")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nota_examen}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.complicacion")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.complicacion}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.notacomplicacion")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nota_complicacion}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.especial")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.especialidad}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.diagnostico")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.diagnostico}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.motivoestancia")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.motivo_estancia}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.disposicion")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.disposicion}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("eclinical.monitoreo.datos.ncama")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.no_cama}
                            </Typography>
                        </Grid>


                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mb: 1 }}>

                    <Button variant='contained' color={view ? 'primary' : 'error'} onClick={view ? () => {
                        handleClose()
                        setLine('')
                    }
                        : Elimina}>
                        {view ? t("etiquetas.hecho") : t("etiquetas.eliminar")}
                    </Button>
                    <Button variant="outlined" onClick={() => {
                        handleClose()
                        setLine('')
                    }}>
                        {t("etiquetas.cancelar")}
                    </Button>

                </DialogActions>
            </Dialog>

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
                                    setEspecialidadTemp(row.nombre_especialidad);
                                    console.log(row)
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
                                        if (row.id_especialidad === idEspecialidadTemp) {
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
                onClose={() => {
                    handleCloseE()
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
                            {t("eclinical.monitoreo.datos.incidentes")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => {
                                handleCloseE()
                                setLine('')
                            }}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers>
                    {editar ?
                        <ButtonGroup variant="outlined">
                            <Button onClick={() => {
                                handleCloseE()
                                clearform()
                                handleAdd()
                                setLine('')
                                handleShowE()

                            }}>
                                <AddIcon />
                            </Button>
                            <Button onClick={() => {
                                handleCloseE()
                                handleDelet()
                                handleShow()
                            }}>
                                <DeleteIcon />
                            </Button>
                        </ButtonGroup>
                        : ''}
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
                    <Button variant='contained' onClick={editar ? () => {
                        Edit()
                        handleCloseE()
                    } : () => {
                        Post()
                        handleCloseE()
                    }}>
                        {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}
                    </Button>
                    <Button variant="outlined" onClick={() => {
                        handleCloseE()
                        setLine('')
                        clearform()
                    }}>
                        {t("etiquetas.cancelar")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )

}

export default Evaluacion;
