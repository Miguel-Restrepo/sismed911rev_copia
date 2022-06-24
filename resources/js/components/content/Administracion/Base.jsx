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
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set } from 'lodash';
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Base = () => {
    const [t, i18n] = useTranslation("global");
    const [tablas, setTablas] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
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
        nombre: '',
        dpto: '',
        provincia: '',
        distrito: '',
        longitud: '',
        latitud: '',
        direccion: ''
    });

    const clearform = () => setForm({
        nombre: '',
        dpto: '',
        provincia: '',
        distrito: '',
        direccion: '',
        longitud: '',
        latitud: ''
    })

    const Get = async () => {
        setOpenLoad(true);
        await axios.get(`/api/base_ambulancia`)
            .then(response => {
                setOpenLoad(false);
                console.log(response.data)
                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                setOpenLoad(false);
                return error;
            })

    }

    const GetLugares = () => {
        axios.get(`/api/departamento`)
            .then(response => {

                setDepartamentos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

        axios.get(`/api/distrito`)
            .then(response => {

                setDistritos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

        axios.get(`/api/provincias`)
            .then(response => {

                setProvincias(response.data);
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
        axios.post('/api/base_ambulancia', form)
            .then(response => {
                notificarExitoCaso(response.data.id_base);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/base_ambulancia/${line.id_base}`, form)
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
        GetLugares()
    }, []);

    const Elimina = () => {
        axios.delete(`/api/base_ambulancia/${line.id_base}/delete`)
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

    const filteredItems = tablas.filter(
        (item) =>
            (item.id_base &&
                item.id_base
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre &&
                item.nombre
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.dpto &&
                item.dpto
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.provincia &&
                item.provincia
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.distrito &&
                item.distrito
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.longitud &&
                item.longitud
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.latitud &&
                item.latitud
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.direccion &&
                item.direccion
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))

    );


    const columns = useMemo(() => [

        {
            name: `${t("administracion.base.datos.id")}`,
            sortable: true,
            selector: (row) => row.id_base,
        }, {
            name: `${t("administracion.base.datos.nombre")}`,
            sortable: true,
            selector: (row) => row.nombre,
        }, {
            name: `${t("administracion.base.datos.dpto")}`,
            sortable: true,
            selector: (row) => row.dpto ? row.departamento.nombre_dpto : '',
        }, {
            name: `${t("administracion.base.datos.provincia")}`,
            sortable: true,
            selector: (row) => row.provincia ? row.provincia.nombre_provincia : '',
        }, {
            name: `${t("administracion.base.datos.distrito")}`,
            sortable: true,
            selector: (row) => row.distrito ? row.distrito.nombre_distrito : '',
        }, {
            name: `${t("administracion.base.datos.longitud")}`,
            sortable: true,
            selector: (row) => row.longitud,
        }, {
            name: `${t("administracion.base.datos.latitud")}`,
            sortable: true,
            selector: (row) => row.latitud,
        }, {
            name: `Dirección`,
            sortable: true,
            selector: (row) => row.direccion,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView()
                            setForm({
                                nombre: row.nombre,
                                dpto: row.dpto,
                                direccion: row.direccion,
                                provincia: row.provincia,
                                distrito: row.distrito,
                                longitud: row.longitud,
                                latitud: row.latitud
                            })
                            setLine({
                                id_base: row.id_base,
                                nombre: row.nombre,
                                dpto: row.departamento,
                                direccion: row.direccion,
                                provincia: row.provincia,
                                distrito: row.distrito,
                                longitud: row.longitud,
                                latitud: row.latitud
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
                                nombre: row.nombre,
                                dpto: row.dpto,
                                direccion: row.direccion,
                                provincia: row.provincia,
                                distrito: row.distrito,
                                longitud: row.longitud,
                                latitud: row.latitud
                            })
                            setLine({
                                id_base: row.id_base,
                                nombre: row.nombre,
                                dpto: row.departamento,
                                direccion: row.direccion,
                                provincia: row.provincia,
                                distrito: row.distrito,
                                longitud: row.longitud,
                                latitud: row.latitud
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
                                nombre: row.nombre,
                                dpto: row.dpto,
                                direccion: row.direccion,
                                provincia: row.provincia,
                                distrito: row.distrito,
                                longitud: row.longitud,
                                latitud: row.latitud
                            })
                            setLine({
                                id_base: row.id_base,
                                nombre: row.nombre,
                                dpto: row.departamento,
                                direccion: row.direccion,
                                provincia: row.provincia,
                                distrito: row.distrito,
                                longitud: row.longitud,
                                latitud: row.latitud
                            })
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
            <h2>{t("administracion.base.titulo")}</h2>
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
                            {t("administracion.base.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
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
                                {t("administracion.base.datos.id")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.id_base}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.base.datos.nombre")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nombre}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.base.datos.dpto")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.dpto ? line.dpto.nombre_dpto : ''}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.base.datos.provincia")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.provincia ? line.provincia.nombre_provincia : ''}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.base.datos.distrito")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.distrito ? line.distrito.nombre_distrito : ''}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.base.datos.longitud")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.longitud}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.base.datos.latitud")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.latitud}
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
                            {t("administracion.base.titulo")}
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
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("administracion.base.datos.nombre")}
                                value={form.nombre}
                                onChange={handleChange}
                                name="nombre"
                            />

                        </Grid>


                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("administracion.base.datos.dpto")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("administracion.base.datos.dpto")}
                                    name="dpto"
                                    value={form.dpto}
                                    onChange={handleChange}
                                >
                                    {departamentos.map((item) => (
                                        <MenuItem
                                            key={item.cod_dpto}
                                            value={item.cod_dpto}
                                        >
                                            {item.nombre_dpto}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("administracion.base.datos.provincia")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("administracion.base.datos.provincia")}
                                    name="provincia"
                                    value={form.provincia}
                                    onChange={handleChange}
                                >
                                    {provincias.filter((e) => e.cod_departamento == form.dpto).map((item) => (
                                        <MenuItem
                                            key={item.cod_provincia}
                                            value={item.cod_provincia}
                                        >
                                            {item.nombre_provincia}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t("administracion.base.datos.distrito")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("administracion.base.datos.distrito")}
                                    name="distrito"
                                    value={form.distrito}
                                    onChange={handleChange}
                                >
                                    {distritos.filter((e) => e.cod_provincia == form.provincia).map((item) => (
                                        <MenuItem
                                            key={item.cod_distrito}
                                            value={item.cod_distrito}
                                        >
                                            {item.nombre_distrito}
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
                                label={t("administracion.base.datos.longitud")}
                                value={form.longitud}
                                onChange={handleChange}
                                name="longitud"
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("administracion.base.datos.latitud")}
                                value={form.latitud}
                                onChange={handleChange}
                                name="latitud"
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Dirección"
                                value={form.direccion}
                                onChange={handleChange}
                                name="direccion"
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
        </div>
    )

}

export default Base;
