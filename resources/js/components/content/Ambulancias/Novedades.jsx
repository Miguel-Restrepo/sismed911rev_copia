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
const { DateTime } = require("luxon");


const Novedades = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
    const [bases, setBases] = useState([]);
    const [ambulancias, setAmbulancias] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [motivos, setMotivos] = useState([]);
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


    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');

    const [form, setForm] = useState({
        //id_regamb: '',
        id_base: '',
        id_ambulancias: '',
        id_user: '',
        estado: '',
        motivo_salida: '',
        descripcion: '',
        fecha_reg: DateTime.now()
    });
    const [form1, setForm1] = useState({
        nombre_motsalida: ''
    });
    const clearform = () => setForm({
        // id_regamb: '',
        id_base: '',
        id_ambulancias: '',
        id_user: '',
        estado: '',
        motivo_salida: '',
        descripcion: '',
        fecha_reg: DateTime.now()
    })

    const Get = () => {
        setOpenLoad(true);
        axios.get(`/api/reg_ambulancias`)
            .then(response => {
                setOpenLoad(false);
                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                setOpenLoad(false);
                return error;
            })
        axios.get(`/api/base_ambulancia`)
            .then(response => {

                setBases(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/ambulancias`)
            .then(response => {

                setAmbulancias(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/usuarios`)
            .then(response => {
                consoloe.log(response.data)
                setUsuarios(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/motivo_salidaamb`)
            .then(response => {

                setMotivos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })


    }

    const handleChange1 = e => {
        setForm1(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )
    }
    const handleChange = e => {
        setForm(
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
    const PostServicio = () => {
        axios.post(`/api/motivo_salidaamb`, form1)
            .then(response => {
                notificarExitoCaso(response.data.id_motivosalida);
                axios.get(`/api/motivo_salidaamb`)
                    .then(response => {

                        setMotivos(response.data);
                        return response.data;
                    })
                    .catch(error => {

                        return error;
                    })
                setForm(
                    prevState => ({
                        ...prevState,
                        motivo_salida: response.data.id_motivosalida
                    })

                )
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error;
            })
    }
    const Post = () => {
        axios.post('/api/reg_ambulancias', {
            id_base: form.id_base,
            id_ambulancias: form.id_ambulancias,
            id_user: form.id_user,
            estado: Number(form.estado),
            motivo_salida: form.motivo_salida,
            descripcion: form.descripcion
        })
            .then(response => {
                notificarExitoCaso(response.data.id_regamb);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/reg_ambulancias/${line.id_regamb}`, {
            id_base: form.id_base,
            id_ambulancias: form.id_ambulancias,
            id_user: form.id_user,
            estado: Number(form.estado),
            motivo_salida: form.motivo_salida,
            descripcion: form.descripcion
        })
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

    }, []);

    const Elimina = () => {
        axios.delete(`/api/reg_ambulancias/${line.id_regamb}/delete`)
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


    const obtener = (code) => {
        tablas.forEach(element => {
            if (element.id_regamb == code) {
                setForm(element);
                setLine(element);
            }
        });

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

    const filteredItems = tablas.filter(
        (item) =>
            (item.id_regamb &&
                item.id_regamb
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre &&
                item.nombre
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.cod_ambulancias &&
                item.cod_ambulancias
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre1 &&
                item.nombre1
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_motsalida &&
                item.nombre_motsalida
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.descripcion &&
                item.descripcion
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))

    );


    const columns = useMemo(() => [

        {
            name: `${t("ambulancias.novedades.datos.id")}`,
            sortable: true,
            selector: (row) => row.id_regamb,
        }, {
            name: `${t("ambulancias.novedades.datos.bases")}`,
            sortable: true,
            selector: (row) => row.nombre,
        }, {
            name: `${t("ambulancias.novedades.datos.ambulancias")}`,
            sortable: true,
            selector: (row) => row.cod_ambulancias,
        }, {
            name: `${t("ambulancias.novedades.datos.usuario")}`,
            sortable: true,
            selector: (row) => row.nombre1,
        }, {
            name: `${t("ambulancias.novedades.datos.estado")}`,
            cell: (row) => {
                return (
                    <div>
                        {row.estado == 1 ? t("ambulancias.novedades.datos.entrada") : t("ambulancias.novedades.datos.salida")}
                    </div>
                );
            },
        }, {
            name: `${t("ambulancias.novedades.datos.motivo")}`,
            sortable: true,
            selector: (row) => row.nombre_motsalida,
        }, {
            name: `${t("ambulancias.novedades.datos.descripcion")}`,
            sortable: true,
            selector: (row) => row.descripcion,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView()
                            obtener(row.id_regamb)
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
                            obtener(row.id_regamb)
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
                            obtener(row.id_regamb)
                            handleShow();

                        }} />

                    </div>
                );
            },
        },
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
            <h2>{t("ambulancias.novedades.titulo")}</h2>


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
                            {t("ambulancias.novedades.tran")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
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
                                {t("ambulancias.novedades.datos.id")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.id_regamb}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.novedades.datos.bases")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nombre}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.novedades.datos.ambulancias")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.cod_ambulancias}
                            </Typography>
                        </Grid>


                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.novedades.datos.usuario")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nombre1}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.novedades.datos.estado")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.estado}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.novedades.datos.motivo")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nombre_motsalida}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.novedades.datos.descripcion")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.descripcion}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.novedades.datos.fecha")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.fecha_reg}
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
                            {t("ambulancias.novedades.tran")}
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
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("ambulancias.novedades.datos.bases")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("ambulancias.novedades.datos.bases")}
                                    name="id_base"
                                    value={form.id_base}
                                    onChange={handleChange}
                                >
                                    {bases.map((item) => (
                                        <MenuItem
                                            key={item.id_base}
                                            value={item.id_base}
                                        >
                                            {item.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("ambulancias.novedades.datos.ambulancias")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("ambulancias.novedades.datos.ambulancias")}
                                    name="id_ambulancias"
                                    value={form.id_ambulancias}
                                    onChange={handleChange}
                                >
                                    {ambulancias.map((item) => (
                                        <MenuItem
                                            key={item.codigo}
                                            value={item.codigo}
                                        >
                                            {item.cod_ambulancias}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("ambulancias.novedades.datos.usuario")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("ambulancias.novedades.datos.usuario")}
                                    name="id_user"
                                    value={form.id_user}
                                    onChange={handleChange}
                                >
                                    {usuarios.map((item) => (
                                        <MenuItem
                                            key={item.id_user}
                                            value={item.id_user}
                                        >
                                            {item.nombre1} {item.nombre2} {item.apellido1} {item.apellido2}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("ambulancias.novedades.datos.estado")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("ambulancias.novedades.datos.estado")}
                                    name="estado"
                                    value={form.estado}
                                    onChange={handleChange}
                                >
                                    <MenuItem
                                        value={1}
                                    >
                                        {t("ambulancias.novedades.datos.entrada")}
                                    </MenuItem>

                                    <MenuItem
                                        value={2}
                                    >
                                        {t("ambulancias.novedades.datos.salida")}
                                    </MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} >
                            <Stack direction="row">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="tipodoc-label">
                                        {t("ambulancias.novedades.datos.motivo")}
                                    </InputLabel>

                                    <Select
                                        labelId="tipodoc-label"
                                        id="tipodoc"
                                        label={`${t("ambulancias.novedades.datos.motivo")}`}
                                        name="motivo_salida"
                                        value={form.motivo_salida}
                                        onChange={handleChange}
                                    >
                                        {motivos.map((item) => (
                                            <MenuItem
                                                key={item.id_motivosalida}
                                                value={item.id_motivosalida}
                                            >
                                                {item.nombre_motsalida}
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
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label={t("ambulancias.novedades.datos.descripcion")}
                            multiline
                            rows={4}
                            value={form.descripcion}
                            onChange={handleChange}
                            name="descripcion"
                        />
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
                            {t("ambulancias.novedades.datos.motivo")}
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
                                label={t("ambulancias.novedades.datos.mot")}
                                value={form1.nombre_motsalida}
                                onChange={handleChange1}
                                name="nombre_motsalida"
                            />

                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mb: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            PostServicio();
                            handleClose1();
                        }}
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
    )

}

export default Novedades;
