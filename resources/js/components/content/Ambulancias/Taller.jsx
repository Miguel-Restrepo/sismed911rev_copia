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

const Taller = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
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
    const [form, setForm] = useState({
        nombre_taller: ''
    });

    const clearform = () => setForm({
        nombre_taller: ''
    })

    const Get = async () => {

        setOpenLoad(true);
        await axios.get(`/api/ambulancia_taller`)
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

    const handleChange = e => {
        setForm(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )


    }

    const Post = () => {
        axios.post('/api/ambulancia_taller', form)
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
        axios.put(`/api/ambulancia_taller/${line.id}`, form)
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
        axios.delete(`/api/ambulancia_taller/${line.id}/delete`)
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
            (item.id &&
                item.id
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_taller &&
                item.nombre_taller
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))

    );

    const columns = useMemo(() => [

        {
            name: `${t("ambulancias.taller.datos.id")}`,
            sortable: true,
            selector: (row) => row.id,
        }, {
            name: `${t("ambulancias.taller.datos.nombre")}`,
            sortable: true,
            selector: (row) => row.nombre_taller,
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView()
                            setForm({
                                nombre_taller: row.nombre_taller
                            })
                            setLine({
                                id: row.id,
                                nombre_taller: row.nombre_taller
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
                                nombre_taller: row.nombre_taller
                            })
                            setLine({
                                id: row.id,
                                nombre_taller: row.nombre_taller
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
                                nombre_taller: row.nombre_taller
                            })
                            setLine({
                                id: row.id,
                                nombre_taller: row.nombre_taller
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
            <h2>{t("ambulancias.taller.titulo")}</h2>
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
                            {t("ambulancias.taller.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
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
                                {t("ambulancias.taller.datos.id")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.id}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("ambulancias.taller.datos.nombre")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nombre_taller}
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
                            {t("ambulancias.taller.titulo")}
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
                                label={t("ambulancias.taller.datos.nombre")}
                                value={form.nombre_taller}
                                onChange={handleChange}
                                name="nombre_taller"
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

export default Taller;
