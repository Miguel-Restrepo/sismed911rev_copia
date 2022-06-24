import React from 'react'
import Icofont from 'react-icofont';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from 'react-data-table-component';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
const moment = require('moment');
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
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Recordatorio = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);
    const [ambulancias, setAmbulancias] = useState([]);
    const [ambulancia, setAmbulancia] = useState("");
    const [idAmbulancia, setIdAmbulancia] = useState("");
    const [ambulanciaTemp, setAmbulanciaTemp] = useState("");
    const [idAmbulanciaTemp, setIdAmbulanciaTemp] = useState("");

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');


    const [form, setForm] = useState({
        vehiculo: '',
        servicio: '',
        frecuencia_km: '',
        frecuencia_tiempo: '',
        anticipo_km: '',
        anticipo_tiempo: ''
    });

    const clearform = () => {
        setAmbulancia('');
        setIdAmbulancia('');
        setForm({
            vehiculo: '',
            servicio: '',
            frecuencia_km: '',
            frecuencia_tiempo: '',
            anticipo_km: '',
            anticipo_tiempo: ''
        })
    }

    const Get = async () => {
        setOpenLoad(true);
        await axios.get(`/api/recordatorio_taller`)
            .then(response => {
                setOpenLoad(false);
                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                setOpenLoad(false);
                return error;
            })

    }

    const GetServicios = () => {
        axios.get('/api/catalogo_serv_taller')
            .then(response => {

                setServicios(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const GetAmbulancias = () => {
        axios.get('/api/ambulancias')
            .then(response => {

                setAmbulancias(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
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

    const handleChange = e => {
        setForm(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )


    }

    const Post = () => {
        axios.post('/api/recordatorio_taller', form)
            .then(response => {
                notificarExitoCaso(response.data.id);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/recordatorio_taller/${line.id}`, form)
            .then(response => {

                Get()
                setLine('')
                return response.data;
            })
            .catch(error => {

                return error.response.data;
            })
    }

    useEffect(() => {
        Get()
        GetServicios()
        GetAmbulancias()
    }, []);

    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            vehiculo: idAmbulancia
        }));
    }, [ambulancia, idAmbulancia])

    const Elimina = () => {
        axios.delete(`/api/recordatorio_taller/${line.id}/delete`)
            .then(response => {
                Get()
                setLine('')
                return response.data;
            })
            .catch(error => {
                return error;
            });
        handleClose();
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

    const subHeaderComponent1 = useMemo(() => {
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

    const filteredItems1 = ambulancias.filter(
        (item) =>
        (item.cod_ambulancias &&
            item.cod_ambulancias
                .toString()
                .toLowerCase()
                .includes(filterText1.toLowerCase()))

    );

    const filteredItems = tablas.filter(
        (item) =>
            (item.id &&
                item.id
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.cod_ambulancias &&
                item.cod_ambulancias
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.servicio_es &&
                item.servicio_es
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.frecuencia_km &&
                item.frecuencia_km
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.frecuencia_tiempo &&
                item.frecuencia_tiempo
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.anticipo_km &&
                item.anticipo_km
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.anticipo_tiempo &&
                item.anticipo_tiempo
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))

    );

    const columns1 = useMemo(() => [

        {
            name: '',
            sortable: true,
            selector: (row) => row.cod_ambulancias,
        }
    ])


    const columns = useMemo(() => [

        {
            name: `${t("ambulancias.recordatorio.datos.id")}`,
            sortable: true,
            selector: (row) => row.id,
        }, {
            name: `${t("ambulancias.recordatorio.datos.ambulancias")}`,
            sortable: true,
            selector: (row) => row.cod_ambulancias,
        }, {
            name: `${t("ambulancias.recordatorio.datos.mantenimiento")}`,
            sortable: true,
            selector: (row) => row.servicio_es,
        }, {
            name: `${t("ambulancias.recordatorio.datos.frecuenciakm")}`,
            sortable: true,
            selector: (row) => row.frecuencia_km,
        }, {
            name: `${t("ambulancias.recordatorio.datos.frecuenciati")}`,
            sortable: true,
            selector: (row) => row.frecuencia_tiempo,
        }, {
            name: `${t("ambulancias.recordatorio.datos.anticipokm")}`,
            sortable: true,
            selector: (row) => row.anticipo_km,
        }, {
            name: `${t("ambulancias.recordatorio.datos.anticipoti")}`,
            sortable: true,
            selector: (row) => row.anticipo_tiempo,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView()
                            setForm({
                                vehiculo: row.vehiculo,
                                servicio: row.servicio,
                                frecuencia_km: row.frecuencia_km,
                                frecuencia_tiempo: row.frecuencia_tiempo,
                                anticipo_km: row.anticipo_km,
                                anticipo_tiempo: row.anticipo_tiempo
                            })
                            setLine({
                                id: row.id,
                                vehiculo: row.cod_ambulancias,
                                servicio: row.servicio_es,
                                frecuencia_km: row.frecuencia_km,
                                frecuencia_tiempo: row.frecuencia_tiempo,
                                anticipo_km: row.anticipo_km,
                                anticipo_tiempo: row.anticipo_tiempo
                            })
                            setAmbulancia(row.cod_ambulancias)
                            setIdAmbulancia(row.vehiculo);
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
                                vehiculo: row.vehiculo,
                                servicio: row.servicio,
                                frecuencia_km: row.frecuencia_km,
                                frecuencia_tiempo: row.frecuencia_tiempo,
                                anticipo_km: row.anticipo_km,
                                anticipo_tiempo: row.anticipo_tiempo
                            })
                            setLine({
                                id: row.id,
                                vehiculo: row.cod_ambulancias,
                                servicio: row.servicio_es,
                                frecuencia_km: row.frecuencia_km,
                                frecuencia_tiempo: row.frecuencia_tiempo,
                                anticipo_km: row.anticipo_km,
                                anticipo_tiempo: row.anticipo_tiempo
                            })
                            setAmbulancia(row.cod_ambulancias)
                            setIdAmbulancia(row.vehiculo);
                            handleShowE()


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
                                vehiculo: row.vehiculo,
                                servicio: row.servicio,
                                frecuencia_km: row.frecuencia_km,
                                frecuencia_tiempo: row.frecuencia_tiempo,
                                anticipo_km: row.anticipo_km,
                                anticipo_tiempo: row.anticipo_tiempo
                            })
                            setLine({
                                id: row.id,
                                vehiculo: row.cod_ambulancias,
                                servicio: row.servicio_es,
                                frecuencia_km: row.frecuencia_km,
                                frecuencia_tiempo: row.frecuencia_tiempo,
                                anticipo_km: row.anticipo_km,
                                anticipo_tiempo: row.anticipo_tiempo
                            })
                            setAmbulancia(row.cod_ambulancias)
                            setIdAmbulancia(row.vehiculo);
                            handleShow();

                        }} />

                    </div>
                );
            },
        },
    ])

    const handleRowClicked = (row) => {
        setAmbulanciaTemp(row.cod_ambulancias);
        setIdAmbulanciaTemp(row.codigo);
        let select = row;
        if (!idAmbulanciaTemp) {
            setIdAmbulanciaTemp(row.codigo);
            const updatedData = ambulancias.map((item) => {
                if (row.codigo !== item.codigo) {
                    return item;
                }

                return {
                    ...item,
                    toggleSelected: true,
                };
            });

            setAmbulancias(updatedData);
        } else {
            if (row.codigo === idAmbulanciaTemp) {
                select = null;
                setIdAmbulanciaTemp(row.codigo);
                const updatedData = ambulancias.map((item) => {
                    if (row.codigo !== item.codigo) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: false,
                    };
                });
                setAmbulancias(updatedData);
            } else {
                setIdAmbulanciaTemp(row.codigo);
                const updatedData = ambulancias.map((item) => {
                    if (idAmbulanciaTemp === item.codigo) {
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
                setAmbulancias(updatedData);
            }
        }
    };
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
            <h2>{t("ambulancias.recordatorio.titulo")}</h2>
            <Button variant="contained" onClick={() => {
                handleAdd()
                clearform()
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
                            {t("ambulancias.recordatorio.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
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
                        spacing={2}
                        sx={{ my: 2 }}
                        component="form"
                        autoComplete="off"
                    >

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.recordatorio.datos.id")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.id}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.recordatorio.datos.ambulancias")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.vehiculo}
                            </Typography>
                        </Grid>


                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.recordatorio.datos.mantenimiento")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.servicio}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.recordatorio.datos.frecuenciakm")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.frecuencia_km}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.recordatorio.datos.frecuenciati")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.frecuencia_tiempo}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.recordatorio.datos.anticipokm")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.anticipo_km}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.recordatorio.datos.anticipoti")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.anticipo_tiempo}
                            </Typography>
                        </Grid>


                    </Grid>

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
                </DialogContent>
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
                            {t("ambulancias.recordatorio.titulo")}
                            - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}
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
                        spacing={2}
                        sx={{ my: 2 }}
                        component="form"
                        autoComplete="off"
                    >

                        <Grid item xs={12}>
                            <Stack direction="row">

                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={t("ambulancias.recordatorio.datos.ambulancias")}
                                    value={ambulancia}
                                    onChange={handleChange}
                                    name="vehiculo"
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


                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("ambulancias.recordatorio.datos.mantenimiento")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("ambulancias.recordatorio.datos.mantenimiento")}
                                    name="servicio"
                                    value={form.servicio}
                                    onChange={handleChange}
                                >
                                    {servicios.map((item) => (
                                        <MenuItem
                                            key={item.id_catalogo}
                                            value={item.id_catalogo}
                                        >
                                            {item.servicio_es}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("ambulancias.recordatorio.datos.frecuenciakm")}
                                value={form.frecuencia_km}
                                onChange={handleChange}
                                name="frecuencia_km"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("ambulancias.recordatorio.datos.frecuenciati")}
                                value={form.frecuencia_tiempo}
                                onChange={handleChange}
                                name="frecuencia_tiempo"
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("ambulancias.recordatorio.datos.anticipokm")}
                                value={form.anticipo_km}
                                onChange={handleChange}
                                name="anticipo_km"
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("ambulancias.recordatorio.datos.anticipoti")}
                                value={form.anticipo_tiempo}
                                onChange={handleChange}
                                name="anticipo_tiempo"
                            />

                        </Grid>


                    </Grid>
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
                </DialogContent>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth="sm"
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
                                columns={columns1}
                                data={filteredItems1}
                                onRowClicked={handleRowClicked}
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
                </DialogContent>
                <DialogActions sx={{ mb: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setAmbulancia(ambulanciaTemp);
                            setIdAmbulancia(idAmbulanciaTemp);
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
        </div>
    )

}

export default Recordatorio;
