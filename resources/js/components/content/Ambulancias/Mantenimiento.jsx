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
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Mantenimiento = () => {
    const [t, i18n] = useTranslation("global");
    let url = useLocation().search
    const [searchParams] = useSearchParams();
    let cod = searchParams.get('cod')
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


    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');

    const [form, setForm] = useState({
        id_ambulancias: `${cod}`,
        fecha_inicio: '',
        fecha_fin: '',
        observaciones: '',
        taller: ''
    });

    const clearform = () => setForm({
        id_ambulancias: `${cod}`,
        fecha_inicio: '',
        fecha_fin: '',
        observaciones: '',
        taller: ''
    })

    const GetAmbulancias = () => {
        axios.get(`/api/ambulancias/${cod}`)
            .then(response => {

                setDatos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const GetTalleres = () => {
        axios.get('/api/ambulancia_taller')
            .then(response => {

                setTalleres(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const Get = async () => {
        setOpenLoad(true);
        await axios.get(`/api/ambulancias/${cod}/mantenimiento`)
            .then(response => {
                setOpenLoad(false);
                setMans(response.data);
                return response.data;
            })
            .catch(error => {
                setOpenLoad(false);
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
    const Elimina = () => {
        axios.delete(`/api/mante_amb/${line.id}/delete`)
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
    const handleChange = e => {
        e.persist();
        setForm(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )


    }

    const Post = () => {
        axios.post('/api/mante_amb', form)
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
        axios.put(`/api/mante_amb/${line.id}`, form)
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
        GetAmbulancias();
        Get();
        GetTalleres()
    }, []);


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

    const filteredItems = mans.filter(
        (item) =>
            (item.id &&
                item.id
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.id_ambulancias &&
                item.id_ambulancias
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.fecha_inicio &&
                item.fecha_inicio
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.fecha_fin &&
                item.fecha_fin
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
            ||
            (item.taller &&
                item.taller
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))


    );

    const columns = useMemo(() => [

        {
            name: `${t("ambulancias.mantenimiento.datos.id")}`,
            sortable: true,
            selector: (row) => row.id,
        }, {
            name: `${t("ambulancias.mantenimiento.datos.codigo")}`,
            sortable: true,
            selector: (row) => row.id_ambulancias,
        }, {
            name: `${t("ambulancias.mantenimiento.datos.fechaini")}`,
            sortable: true,
            selector: (row) => row.fecha_inicio,
        }, {
            name: `${t("ambulancias.mantenimiento.datos.fechafin")}`,
            sortable: true,
            selector: (row) => row.fecha_fin,
        }, {
            name: `${t("ambulancias.mantenimiento.datos.taller")}`,
            sortable: true,
            selector: (row) => row.taller,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView();
                            setForm({
                                id_ambulancias: row.id_ambulancias,
                                fecha_inicio: row.fecha_inicio,
                                fecha_fin: row.fecha_fin,
                                observaciones: row.observaciones,
                                taller: row.taller
                            })
                            setLine({
                                id: row.id,
                                id_ambulancias: row.id_ambulancias,
                                fecha_inicio: row.fecha_inicio,
                                fecha_fin: row.fecha_fin,
                                observaciones: row.observaciones,
                                taller: row.taller
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
                                id_ambulancias: row.id_ambulancias,
                                fecha_inicio: row.fecha_inicio,
                                fecha_fin: row.fecha_fin,
                                observaciones: row.observaciones,
                                taller: row.taller
                            })
                            setLine({
                                id: row.id,
                                id_ambulancias: row.id_ambulancias,
                                fecha_inicio: row.fecha_inicio,
                                fecha_fin: row.fecha_fin,
                                observaciones: row.observaciones,
                                taller: row.taller
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

                            handleDelet();
                            setForm({
                                id_ambulancias: row.id_ambulancias,
                                fecha_inicio: row.fecha_inicio,
                                fecha_fin: row.fecha_fin,
                                observaciones: row.observaciones,
                                taller: row.taller
                            })
                            setLine({
                                id: row.id,
                                id_ambulancias: row.id_ambulancias,
                                fecha_inicio: row.fecha_inicio,
                                fecha_fin: row.fecha_fin,
                                observaciones: row.observaciones,
                                taller: row.taller
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
            <h2>{t("ambulancias.mantenimiento.titulo")}</h2>

            <div>
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
                            {t("ambulancias.ambulancias.datos.codigo")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.cod_ambulancias}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.placas")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.placas}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.chasis")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.chasis}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.marca")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.marca}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.modelo")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.modelo}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.tipo")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.tipo_conbustible}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.estado")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.estado}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.ubicacion")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.ubicacion}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {t("ambulancias.ambulancias.datos.servicio")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {datos.especial}
                        </Typography>
                    </Grid>


                </Grid>
            </div>

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
                            {t("ambulancias.mantenimiento.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
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
                                {t("ambulancias.mantenimiento.datos.id")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.id}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.mantenimiento.datos.codigo")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.id_ambulancias}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.mantenimiento.datos.fechaini")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.fecha_inicio}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.mantenimiento.datos.fechafin")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.fecha_fin}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.mantenimiento.datos.observaciones")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.observaciones}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.mantenimiento.datos.taller")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.taller}
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
                            {t("ambulancias.mantenimiento.titulo")}
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
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("ambulancias.mantenimiento.datos.codigo")}
                                value={form.id_ambulancias}
                                name="id_ambulancias"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                locale={common.locale}
                            >
                                <MobileDatePicker
                                    showTodayButton
                                    label={t("ambulancias.mantenimiento.datos.fechaini")}
                                    okText={t('etiquetas.aceptar')}
                                    cancelText={t('etiquetas.cancelar')}
                                    todayText={t('etiquetas.hoy')}
                                    value={moment(form.fecha_inicio)}
                                    name="fecha_inicio"
                                    onChange={(e) => {
                                        setForm((prevState) => ({
                                            ...prevState,
                                            fecha_inicio: e.format('YYYY-MM-DD'),
                                        }))
                                    }}
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

                        <Grid item xs={6} md={3} lg={2}>
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                locale={common.locale}
                            >
                                <MobileDatePicker
                                    showTodayButton
                                    label={t("ambulancias.mantenimiento.datos.fechafin")}
                                    okText={t('etiquetas.aceptar')}
                                    cancelText={t('etiquetas.cancelar')}
                                    todayText={t('etiquetas.hoy')}
                                    value={moment(form.fecha_fin)}
                                    name="fecha_fin"
                                    onChange={(e) => {
                                        setForm((prevState) => ({
                                            ...prevState,
                                            fecha_fin: e.format('YYYY-MM-DD'),
                                        }))
                                    }}
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
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("ambulancias.mantenimiento.datos.observaciones")}
                                multiline
                                rows={4}
                                value={form.observaciones}
                                onChange={handleChange}
                                name="observaciones"
                            />
                        </Grid>


                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">

                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("ambulancias.mantenimiento.datos.taller")}
                                    name="taller"
                                    value={form.taller}
                                    onChange={handleChange}
                                >
                                    {talleres.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.nombre_taller}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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


export default Mantenimiento;
