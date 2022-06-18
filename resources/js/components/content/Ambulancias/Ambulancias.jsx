import React from 'react'
import Icofont from 'react-icofont';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from 'react-data-table-component';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
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

const Ambulancias = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [show1, setShow1] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);


    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');

    const [form, setForm] = useState({
        cod_ambulancias: '',
        placas: '',
        chasis: '',
        marca: '',
        modelo: '',
        tipo_conbustible: '',
        fecha_iniseguro: '',
        fecha_finseguro: '',
        especial: ''
    });

    const clearform = () => setForm({
        cod_ambulancias: '',
        placas: '',
        chasis: '',
        marca: '',
        modelo: '',
        tipo_conbustible: '',
        fecha_iniseguro: '',
        fecha_finseguro: '',
        especial: ''
    })


    const [form1, setForm1] = useState({
        especial_es: ''
    });



    const Get = async() => {
        setOpenLoad(true);

       await axios.get(`/api/ambulancias`)
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
        axios.get('/api/especial_ambulancia')
            .then(response => {
                setServicios(response.data)
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

    const handleChange1 = e => {
        setForm1(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )
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

    const Post = () => {
        axios.post('/api/ambulancias', form)
            .then(response => {
                notificarExitoCaso(response.data.codigo);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }

    const PostServicio = () => {
        axios.post('/api/especial_ambulancia', form1)
            .then(response => {
                notificarExitoCaso(response.data.id_especialambulancia);
                GetServicios()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }

    const Edit = () => {
        axios.put(`/api/ambulancias/${line.codigo}`, form)
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
        GetServicios();
        Get()

    }, []);

    const Elimina = () => {
        axios.delete(`/api/ambulancias/${line.codigo}/delete`)
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

    const columns = useMemo(() => [

        {
            name: `${t("ambulancias.ambulancias.datos.id")}`,
            sortable: true,
            selector: (row) => row.cod_ambulancias,
        }, {
            name: `${t("ambulancias.ambulancias.datos.placas")}`,
            sortable: true,
            selector: (row) => row.placas,
        }, {
            name: `${t("ambulancias.ambulancias.datos.chasis")}`,
            sortable: true,
            selector: (row) => row.chasis,
        }, {
            name: `${t("ambulancias.ambulancias.datos.marca")}`,
            sortable: true,
            selector: (row) => row.marca,
        }, {
            name: `${t("ambulancias.ambulancias.datos.modelo")}`,
            sortable: true,
            selector: (row) => row.modelo,
        }, {
            name: `${t("ambulancias.ambulancias.datos.tipo")}`,
            sortable: true,
            selector: (row) => row.tipo_conbustible,
        }, {
            name: `${t("ambulancias.ambulancias.datos.estado")}`,
            sortable: true,
            selector: (row) => row.estado,
        }, {
            name: `${t("ambulancias.ambulancias.datos.servicio")}`,
            sortable: true,
            selector: (row) => row.especial_es,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView()
                            setForm({
                                cod_ambulancias: row.cod_ambulancias,
                                placas: row.placas,
                                chasis: row.chasis,
                                marca: row.marca,
                                modelo: row.modelo,
                                tipo_conbustible: row.tipo_conbustible,
                                fecha_iniseguro: row.fecha_iniseguro,
                                fecha_finseguro: row.fecha_finseguro,
                                especial: row.especial
                            })
                            setLine({
                                codigo: row.codigo,
                                cod_ambulancias: row.cod_ambulancias,
                                placas: row.placas,
                                chasis: row.chasis,
                                marca: row.marca,
                                modelo: row.modelo,
                                tipo_conbustible: row.tipo_conbustible,
                                fecha_iniseguro: row.fecha_iniseguro,
                                fecha_finseguro: row.fecha_finseguro,
                                especial: row.especial_es
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
                                cod_ambulancias: row.cod_ambulancias,
                                placas: row.placas,
                                chasis: row.chasis,
                                marca: row.marca,
                                modelo: row.modelo,
                                tipo_conbustible: row.tipo_conbustible,
                                fecha_iniseguro: row.fecha_iniseguro,
                                fecha_finseguro: row.fecha_finseguro,
                                especial: row.especial
                            })
                            setLine({
                                codigo: row.codigo,
                                cod_ambulancias: row.cod_ambulancias,
                                placas: row.placas,
                                chasis: row.chasis,
                                marca: row.marca,
                                modelo: row.modelo,
                                tipo_conbustible: row.tipo_conbustible,
                                fecha_iniseguro: row.fecha_iniseguro,
                                fecha_finseguro: row.fecha_finseguro,
                                especial: row.especial_es
                            })
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
                                cod_ambulancias: row.cod_ambulancias,
                                placas: row.placas,
                                chasis: row.chasis,
                                marca: row.marca,
                                modelo: row.modelo,
                                tipo_conbustible: row.tipo_conbustible,
                                fecha_iniseguro: row.fecha_iniseguro,
                                fecha_finseguro: row.fecha_finseguro,
                                especial: row.especial
                            })
                            setLine({
                                codigo: row.codigo,
                                cod_ambulancias: row.cod_ambulancias,
                                placas: row.placas,
                                chasis: row.chasis,
                                marca: row.marca,
                                modelo: row.modelo,
                                tipo_conbustible: row.tipo_conbustible,
                                fecha_iniseguro: row.fecha_iniseguro,
                                fecha_finseguro: row.fecha_finseguro,
                                especial: row.especial_es
                            })
                            handleShow();
                        }} />

                    </div>
                );
            },
        }, {
            name: '',
            width: '190px',
            cell: (row) => {
                return (
                    <div>
                        <Link to={`/ambulancias/mantenimiento?cod=${row.codigo}`} >
                            <Button variant="outlined">
                                {t("ambulancias.ambulancias.datos.mantenimiento")}
                            </Button>
                        </Link>

                    </div>
                );
            },
        }
    ])



    const filteredItems = tablas.filter(
        (item) =>
            (item.cod_ambulancias &&
                item.cod_ambulancias
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.placas &&
                item.placas
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.chasis &&
                item.chasis
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.marca &&
                item.marca
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.modelo &&
                item.modelo
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.tipo_conbustible &&
                item.tipo_conbustible
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.estado &&
                item.estado
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.especial_es &&
                item.especial_es
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))

    );





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


            <h2>{t("ambulancias.ambulancias.titulo")}</h2>

            <div>
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
                            {t("ambulancias.ambulancias.titulo")}  - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
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
                                    {t("ambulancias.ambulancias.datos.id")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.codigo}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.codigo")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.cod_ambulancias}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.placas")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.placas}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.chasis")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.chasis}
                                </Typography>

                            </Grid><Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.marca")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.marca}
                                </Typography>
                            </Grid><Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.modelo")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.modelo}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.tipo")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.tipo_conbustible}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.fechaini")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.fecha_iniseguro}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.fechafin")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.fecha_finseguro}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {t("ambulancias.ambulancias.datos.servicio")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" gutterBottom>
                                    {line.especial}
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
                            {t("ambulancias.ambulancias.titulo")}  - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}
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
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("ambulancias.ambulancias.datos.codigo")}`}
                                    value={form.cod_ambulancias}
                                    onChange={handleChange}
                                    name="cod_ambulancias"
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("ambulancias.ambulancias.datos.placas")}`}
                                    value={form.placas}
                                    onChange={handleChange}
                                    name="placas"
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("ambulancias.ambulancias.datos.chasis")}`}
                                    value={form.chasis}
                                    onChange={handleChange}
                                    name="chasis"
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("ambulancias.ambulancias.datos.marca")}`}
                                    value={form.marca}
                                    onChange={handleChange}
                                    name="marca"
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("ambulancias.ambulancias.datos.modelo")}`}
                                    value={form.modelo}
                                    onChange={handleChange}
                                    name="modelo"
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={`${t("ambulancias.ambulancias.datos.tipo")}`}
                                    value={form.tipo_conbustible}
                                    onChange={handleChange}
                                    name="tipo_conbustible"
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                            <Stack direction="row">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="tipodoc-label">
                                        {t("ambulancias.ambulancias.datos.servicio")}
                                    </InputLabel>

                                    <Select
                                        labelId="tipodoc-label"
                                        id="tipodoc"
                                        label={`${t("ambulancias.ambulancias.datos.servicio")}`}
                                        name="especial"
                                        value={form.especial}
                                        onChange={handleChange}
                                    >
                                        {servicios.map((item) => (
                                            <MenuItem
                                                key={item.id_especialambulancia}
                                                value={item.id_especialambulancia}
                                            >
                                                {item.especial_es}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="outlined" onClick={handleShow1}
                                startIcon={< AddIcon />}
                                sx={{
                                    p: 0,
                                    minWidth: '40px',
                                    '& > span.MuiButton-startIcon': { m: 0 },
                                }} />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                    locale={common.locale}
                                >
                                    <MobileDatePicker
                                        showTodayButton
                                        label={t("ambulancias.ambulancias.datos.fechaini")}
                                        okText={t('etiquetas.aceptar')}
                                        cancelText={t('etiquetas.cancelar')}
                                        todayText={t('etiquetas.hoy')}
                                        name="fecha_iniseguro"
                                        value={moment(form.fecha_iniseguro)}
                                        onChange={(e)=>{
                                            setForm((prevState) => ({
                                            ...prevState,
                                            fecha_iniseguro: e.format('YYYY-MM-DD'),
                                        }))}}
                                        renderInput={(params) => (
                                            <TextField {...params} size="small" />
                                        )}
                                        sx={{
                                            '& button.PrivateDatePickerToolbar-penIcon':
                                            {
                                                display: 'none',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                    locale={common.locale}
                                >
                                    <MobileDatePicker
                                        showTodayButton
                                        label={t("ambulancias.ambulancias.datos.fechafin")}
                                        okText={t('etiquetas.aceptar')}
                                        cancelText={t('etiquetas.cancelar')}
                                        todayText={t('etiquetas.hoy')}
                                        name="fecha_finseguro"
                                        value={moment(form.fecha_finseguro)}
                                        onChange={(e)=>{
                                            setForm((prevState) => ({
                                            ...prevState,
                                            fecha_finseguro: e.format('YYYY-MM-DD'),
                                        }))}}
                                        renderInput={(params) => (
                                            <TextField {...params} size="small" />
                                        )}
                                        sx={{
                                            '& button.PrivateDatePickerToolbar-penIcon':
                                            {
                                                display: 'none',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
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
                    open={show1}
                    onClose={handleClose1}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar
                            variant="dense"
                            sx={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography sx={{ fontSize: '1.3rem' }}>
                                {t("ambulancias.ambulancias.datos.servicio")}
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleClose1}
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
                            spacing={2}
                            sx={{ my: 2 }}
                            component="form"
                            autoComplete="off"
                        >

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={t("ambulancias.ambulancias.datos.especial")}
                                    value={form1.especial_es}
                                    onChange={handleChange1}
                                    name="especial_es"
                                />

                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ mb: 1 }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                PostServicio();
                                handleClose1();}}
                        >
                            {t('etiquetas.agregar')}
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleClose1();
                            }}
                        >
                            {t('etiquetas.cancelar')}
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>

        </div>
    )

}

export default Ambulancias;
