import React from 'react'
import Icofont from 'react-icofont';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from 'react-data-table-component';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
import PhoneInput from 'react-phone-input-2'
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceConfig from '../config/service';
toast.configure()

const Usuarios = () => {
    const [t, i18n] = useTranslation("global");
    const [tablas, setTablas] = useState([]);
    const [nivel, setNivel] = useState([]);
    const [sede, setSede] = useState([]);
    const [acode, setAcode] = useState([]);
    const [line, setLine] = useState("");
    const [passw, setPassw] = useState(false);
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleText = () => setPassw(true);
    const handlePassw = () => setPassw(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);
    const [hospitales, setHospitales] = useState([]);
    const [hospital, setHospital] = useState("");
    const [idHospital, setIdHospital] = useState("");
    const [hospitalTemp, setHospitalTemp] = useState("");
    const [idHospitalTemp, setIdHospitalTemp] = useState("");

    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');



    const [form, setForm] = useState({
        fecha_creacion: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        login: '',
        password: '',
        perfil: '',
        sede: '',
        acode: '',
        hospital: ''
    });

    const clearform = () => {
        setHospital('');
        setIdHospital('');
        setForm({
            fecha_creacion: '',
            nombres: '',
            apellidos: '',
            telefono: '',
            login: '',
            password: '',
            perfil: '',
            sede: '',
            acode: '',
            hospital: ''

        })
    }



    const Get = async () => {
        setOpenLoad(true);
        await axios.get(`/api/usuarios/DavidcomplicadoDeMiercoles`)
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

    const GetNivel = () => {
        axios.get(`/api/userlevels`)
            .then(response => {

                setNivel(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }
    const GetSede = () => {
        axios.get(`/api/sede_sismed`)
            .then(response => {

                setSede(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }
    const GetAcode = () => {
        axios.get(`/api/code_planta`)
            .then(response => {

                setAcode(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }
    const GetHospital = () => {
        axios.get(`/api/hospitalesgeneral`)
            .then(response => {

                setHospitales(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
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
        axios.post('/api/usuarios', form)
            .then(response => {
                notificarExitoCaso(response.data.id_user);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/usuarios/${line.id_user}`, form)
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
        GetNivel()
        GetSede()
        GetAcode()
        GetHospital()
    }, []);

    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            hospital: idHospital
        }));
    }, [hospital, idHospital])

    const Elimina = () => {
        axios.delete(`/api/usuarios/${line.id_user}/delete`)
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


    const obtener = (coda) => {
        axios.get(`/api/usuarios/${coda}`)
            .then(response => {

                setForm(response.data)
                return response.data;
            })
            .catch(error => {
                return error;
            });
    }


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

    const filteredItems1 = hospitales.filter(
        (item) =>
        (item.nombre_hospital &&
            item.nombre_hospital
                .toString()
                .toLowerCase()
                .includes(filterText1.toLowerCase()))

    );

    const filteredItems = tablas.filter(
        (item) =>
            (item.id_user &&
                item.id_user
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombres &&
                item.nombres
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.apellidos &&
                item.apellidos
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.telefono &&
                item.telefono
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.login &&
                item.login
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.userlevelname &&
                item.userlevelname
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.sede &&
                item.sede
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.acode &&
                item.acode
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.hospital.nombre_hospital &&
                item.hospital.nombre_hospital
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))

    );

    const columns1 = useMemo(() => [

        {
            name: '',
            sortable: true,
            selector: (row) => row.nombre_hospital,
        }
    ])

    const columns = useMemo(() => [

        {
            name: `${t("administracion.usuarios.datos.id")}`,
            sortable: true,
            selector: (row) => row.id_user,
        }, {
            name: `${t("administracion.usuarios.datos.nombres")}`,
            sortable: true,
            selector: (row) => row.nombres,
        }, {
            name: `${t("administracion.usuarios.datos.apellidos")}`,
            sortable: true,
            selector: (row) => row.apellidos,
        }, {
            name: `${t("administracion.usuarios.datos.telefono")}`,
            sortable: true,
            selector: (row) => row.telefono,
        }, {
            name: `${t("administracion.usuarios.datos.usuario")}`,
            sortable: true,
            selector: (row) => row.login,
        }, {
            name: `${t("administracion.usuarios.datos.perfil")}`,
            sortable: true,
            selector: (row) => row.userlevelname,
        }, {
            name: `${t("administracion.usuarios.datos.sede")}`,
            sortable: true,
            selector: (row) => row.sede,
        }, {
            name: `${t("administracion.usuarios.datos.acode")}`,
            sortable: true,
            selector: (row) => row.acode,
        }, {
            name: `${t("administracion.usuarios.datos.hospital")}`,
            sortable: true,
            selector: (row) =>  row.hospital ? row.hospital.nombre_hospital : '' 
        }, {
            name: ``,
            width: '50px',
            cell: (row) => {
                return (
                    <div>
                        <SearchIcon onClick={() => {
                            handleView()
                            obtener(row.id_user)


                            if (!row.hospital) {
                                setIdHospital('');
                                setHospital('');
                            } else {
                                setIdHospital(row.hospital.id_hospital);
                                setHospital(row.hospital.nombre_hospital);
                            }
                            setLine({
                                id_user: row.id_user,
                                nombres: row.nombres,
                                apellidos: row.apellidos,
                                telefono: row.telefono,
                                login: row.login,
                                perfil: row.userlevelname,
                                sede: row.sede,
                                acode: row.acode
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
                            obtener(row.id_user)
                            if (!row.hospital) {
                                setIdHospital('');
                                setHospital('');
                            } else {
                                setIdHospital(row.hospital.id_hospital);
                                setHospital(row.hospital.nombre_hospital);
                            }

                            setLine({
                                id_user: row.id_user,
                                nombres: row.nombres,
                                apellidos: row.apellidos,
                                telefono: row.telefono,
                                login: row.login,
                                perfil: row.userlevelname,
                                sede: row.sede,
                                acode: row.acode
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
                            obtener(row.id_user)
                            if (!row.hospital) {
                                setIdHospital('');
                                setHospital('');
                            } else {
                                setIdHospital(row.hospital.id_hospital);
                                setHospital(row.hospital.nombre_hospital);
                            }

                            setLine({
                                id_user: row.id_user,
                                nombres: row.nombres,
                                apellidos: row.apellidos,
                                telefono: row.telefono,
                                login: row.login,
                                perfil: row.userlevelname,
                                sede: row.sede,
                                acode: row.acode
                            })

                            handleShow();

                        }} />

                    </div>
                );
            },
        },
    ])


    const handleRowClicked = (row) => {
        setHospitalTemp(row.nombre_hospital);
        setIdHospitalTemp(row.id_hospital);
        let select = row;
        if (!idHospitalTemp) {
            setIdHospitalTemp(row.id_hospital);
            const updatedData = hospitales.map((item) => {
                if (row.id_hospital !== item.id_hospital) {
                    return item;
                }

                return {
                    ...item,
                    toggleSelected: true,
                };
            });

            setHospitales(updatedData);
        } else {
            if (row.id_hospital === idHospitalTemp) {
                select = null;
                setIdHospitalTemp(row.id_hospital);
                const updatedData = hospitales.map((item) => {
                    if (row.id_hospital !== item.id_hospital) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: false,
                    };
                });
                setHospitales(updatedData);
            } else {
                setIdHospitalTemp(row.id_hospital);
                const updatedData = hospitales.map((item) => {
                    if (idHospitalTemp === item.id_hospital) {
                        return {
                            ...item,
                            toggleSelected: false,
                        };
                    } else if (row.id_hospital !== item.id_hospital) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: true,
                    };
                });
                setHospitales(updatedData);
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
            <h2>{t("administracion.usuarios.titulo")}</h2>

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
                            {t("administracion.usuarios.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}
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
                                {t("administracion.usuarios.datos.id")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.id_user}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.nombres")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.nombres}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.apellidos")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.apellidos}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.telefono")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.telefono}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.usuario")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.login}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.perfil")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.perfil}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.sede")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.sede}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.acode")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {line.acode}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                {t("administracion.usuarios.datos.hospital")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                {hospital}
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
                            {t("administracion.usuarios.titulo")}
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
                                label={t("administracion.usuarios.datos.nombres")}
                                value={form.nombres}
                                onChange={handleChange}
                                name="nombres"
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("administracion.usuarios.datos.apellidos")}
                                value={form.apellidos}
                                onChange={handleChange}
                                name="apellidos"
                            />

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                '& > .react-tel-input > .special-label': {
                                    display: 'block',
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    backgroundColor: 'transparent',
                                },
                                '& > .react-tel-input > input.form-control': {
                                    width: '100%',
                                    minHeight: '41px',
                                    backgroundColor: 'transparent',
                                },
                                '& > .react-tel-input ul.country-list': {
                                    width: '100%',
                                    minWidth: '300px',
                                },
                            }}
                        >
                            <PhoneInput
                                label={t("administracion.usuarios.datos.telefono")}
                                country={common.codgoPais}
                                value={form.telefono}
                                onChange={(value) =>
                                    setForm((prevState) => ({
                                        ...prevState,
                                        telefono: value,
                                    }))
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={t("administracion.usuarios.datos.usuario")}
                                value={form.login}
                                onChange={handleChange}
                                name="login"
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row">

                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={t("administracion.usuarios.datos.pw")}
                                    type={passw ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    name="password"

                                />

                                <Button variant="outlined" onClick={passw ? handlePassw : handleText}
                                    sx={{
                                        p: 0,
                                        minWidth: '40px',
                                        '& > span.MuiButton-startIcon': { m: 0 }
                                    }} >
                                    {passw ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </Button>
                            </Stack>
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                {t("administracion.usuarios.datos.perfil")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("administracion.usuarios.datos.perfil")}
                                    name="perfil"
                                    value={form.perfil}
                                    onChange={handleChange}
                                >
                                    {nivel.map((item) => (
                                        <MenuItem
                                            key={item.userlevelid}
                                            value={item.userlevelid}
                                        >
                                            {item.userlevelname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                {t("administracion.usuarios.datos.sede")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("administracion.usuarios.datos.sede")}
                                    name="sede"
                                    value={form.sede}
                                    onChange={handleChange}
                                >
                                    {sede.map((item) => (
                                        <MenuItem
                                            key={item.id_sede}
                                            value={item.id_sede}
                                        >
                                            {item.nombre_sede}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                {t("administracion.usuarios.datos.acode")}
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={t("administracion.usuarios.datos.acode")}
                                    name="acode"
                                    value={form.acode}
                                    onChange={handleChange}
                                >
                                    {acode.map((item) => (
                                        <MenuItem
                                            key={item.idacode}
                                            value={item.idacode}
                                        >
                                            {item.nombreacode}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row">

                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label={t("administracion.usuarios.datos.hospital")}
                                    value={hospital}
                                    onChange={handleChange}
                                    name="hospital"
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
                            {t("administracion.usuarios.datos.hospital")}
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
                            setHospital(hospitalTemp);
                            setIdHospital(idHospitalTemp);
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

export default Usuarios;
