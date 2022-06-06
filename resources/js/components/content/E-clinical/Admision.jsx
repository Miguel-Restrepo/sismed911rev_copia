import Icofont from 'react-icofont';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
    Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { DateTime } from 'luxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import PhoneInput from 'react-phone-input-2';
//import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceConfig from '../config/service';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import common from '../../../common';
import DataTable from 'react-data-table-component';
import {
    InputLabel,
    MenuItem,
    Box,
    FormControl,
    Select,
    Stack,
    Item,
    Grid,
    Container,
    TextField,
    IconButton,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Radio,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    InputAdornment
} from '@mui/material';
const moment = require('moment');
toast.configure();

function Admision() {
    const [t, i18n] = useTranslation('global');
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState('');
    const [idPaciente, setIdPaciente] = useState('');
    const [pacienteTemp, setPacienteTemp] = useState('');
    const [idPacienteTemp, setIdPacienteTemp] = useState('');
    const [tipos, setTipos] = useState([]);
    const [tipos_documentos, setTipos_documentos] = useState([]);
    const [tipos_edad, setTipos_edad] = useState([]);
    const [tipos_genero, setTipos_genero] = useState([]);
    const [mostrarSelect, setMostrarSelect] = useState(false); //mostrar o ucultar slect
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //mostrar o ucultar formulario
    const [search, setSearch] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [openDialog, setOpenDialog] = useState(false);


    const [form, setForm] = useState({
        id_ingreso: '',
        cod911: '',
        id_paciente: '',
        acompañante: '',
        telefono_acompañante: '',
        fecha_admision: DateTime.now()
            .set({ milliseconds: 0 })
            .toISO({ suppressMilliseconds: true }),
    });

    const [form2, setForm2] = useState({
        cod_casointerh: 0,
        tipo_doc: '',
        num_doc: '',
        expendiente: '',
        fecha_nacido: '',
        edad: '',
        cod_edad: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        genero: '',
        apodo: '',
        nacionalidad: '',
        telefono: '',
        nss: '',
        direccion: '',
        observacion: '',
    });

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
            name: `${t('eclinical.admision.datos.id')}`,
            sortable: true,
            width: '80px',
            selector: (row) => row.codigo,
        },
        {
            name: `${t('formularios.formpacientes.docid')}`,
            sortable: true,
            minWidth: '180px',
            selector: (row) => row.descripcion,
        },
        {
            name: `${t('formularios.formpacientes.numero')}`,
            sortable: true,
            minWidth: '120px',
            selector: (row) => row.num_doc,
        },
        {
            name: `${t('formularios.formpacientes.expediente')}`,
            sortable: true,
            minWidth: '110px',
            selector: (row) => row.expendiente,
        },
        {
            name: `${t('formularios.formpacientes.fechanac')}`,
            sortable: true,
            minWidth: '180px',
            selector: (row) => row.fecha_nacido,
        },
        {
            name: `${t('formularios.formpacientes.nombre1')}`,
            sortable: true,
            width: '130px',
            selector: (row) => row.nombre1,
        },

        {
            name: `${t('formularios.formpacientes.apellido1')}`,
            wrap: true,
            sortable: true,
            minWidth: '130px',
            selector: (row) => row.apellido1,
        },
        {
            name: `${t('formularios.formpacientes.genero')}`,
            wrap: true,
            sortable: true,
            minWidth: '130px',
            selector: (row) => row.nombre_genero,
        },
        {
            name: `${t('formularios.formpacientes.nacionalidad')}`,
            sortable: true,
            minWidth: '150px',
            selector: (row) => row.nacionalidad,
        }
    ]);

    const handleRowClicked = (row) => {
        setPacienteTemp(row.descripcion + " " + row.num_doc + " " + row.nombre1 + " " + row.apellido1 + " " + row.nombre_genero + " " + row.fecha_nacido);
        setIdPacienteTemp(row.codigo);
        let select = row;
        if (!idPacienteTemp) {
            setIdPacienteTemp(row.codigo);
            const updatedData = pacientes.map((item) => {
                if (row.codigo !== item.codigo) {
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
                setIdPacienteTemp(row.codigo);
                const updatedData = pacientes.map((item) => {
                    if (row.codigo !== item.codigo) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: false,
                    };
                });
                setPacientes(updatedData);
            } else {
                setIdPacienteTemp(row.codigo);
                const updatedData = pacientes.map((item) => {
                    if (idPacienteTemp === item.codigo) {
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
                setPacientes(updatedData);
            }
        }
    };



    const GetPacientes = () => {
        axios
            .get('/api/pacientegeneral')
            .then((response) => {
                setPacientes(response.data);
                //console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipos = () => {
        axios
            .get('/api/tipo_ingreso')
            .then((response) => {
                setTipos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipoDocumento = () => {
        axios
            .get('/api/tipo_id')
            .then((response) => {
                setTipos_documentos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const handleChangeFormNuevoFechaNacido = (value) => {
        setForm2((prevState) => ({
            ...prevState,
            fecha_nacido: value.format('YYYY-MM-DD'),
        }));
    };

    const GetTipoEdad = () => {
        axios
            .get('/api/tipo_edad')
            .then((response) => {
                setTipos_edad(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipoGenero = () => {
        axios
            .get('/api/tipo_genero')
            .then((response) => {
                setTipos_genero(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const calcularEdadForm = (value) => {
        let end = DateTime.fromISO(DateTime.now());
        let start = DateTime.fromISO(value.format('YYYY-MM-DD'));
        if (end.diff(start, 'years').years >= 1) {
            setForm2((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'years').years | 0,
                cod_edad: 1,
            }));
        } else if (end.diff(start, 'months').months >= 1) {
            setForm2((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'months').months | 0,
                cod_edad: 2,
            }));
        } else {
            setForm2((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'days').days | 0,
                cod_edad: 3,
            }));
        }
    };

    const calcularEdad = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            fecha_nacido: e.format('YYYY-MM-DD'),
        }));
    };

    const handleChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChange1 = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeFormPacienteDoc = (e) => {
        setSearch(e.target.value == 1);
        handleChange1(e);
    };

    const cambioSelect = (e) => {
        if (e.target.value == 2) {
            setMostrarSelect(true);
        } else {
            setMostrarSelect(false);
        }
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const showForm = () => {
        setSearch(true);
        setMostrarFormulario(!mostrarFormulario);
    };

    const buscarCedula = async (cedula) => {
        if (ServiceConfig.number_validate(cedula)) {
            await axios({
                url: '/api/pacientegeneral/get_token',
                method: 'post',
                data: {
                    key: ServiceConfig.key,
                },
            })
                .then((response) => {
                    if (response.data.code && response.data.code === 403) {
                        mostarError(response.data.mensaje);
                    } else {
                        const getDatos = async () => {
                            await axios
                                .post('/api/pacientegeneral/get_datos', {
                                    doc: cedula,
                                    token: response.data,
                                })
                                .then((response) => {
                                    if (response.data.valido) {
                                        let genero = 1;
                                        if (response.data.sexo === 'F')
                                            genero = 2;

                                        setForm2((prevState) => ({
                                            ...prevState,
                                            ['fecha_nacido']:
                                                response.data.fecha_nacimiento,
                                            ['nombre1']:
                                                response.data.nombres.split(
                                                    ' '
                                                )[0],
                                            ['nombre2']:
                                                response.data.nombres.split(' ')
                                                    .length > 1
                                                    ? response.data.nombres.split(
                                                        ' '
                                                    )[1]
                                                    : '',
                                            ['apellido1']:
                                                response.data.apellido1,
                                            ['apellido2']:
                                                response.data.apellido2,
                                            ['genero']: genero,
                                            ['nacionalidad']:
                                                response.data.nacionalidad,
                                        }));
                                        calcularEdadForm(
                                            response.data.fecha_nacimiento
                                        );
                                    } else {
                                        mostarError('Ha ocurrido un error');
                                    }
                                })
                                .catch(() => {
                                    mostarError('Ha ocurrido un error');
                                });
                        };

                        getDatos();
                    }
                })
                .catch(() => {
                    mostarError('Ha ocurrido un error');
                });
        } else {
            toast.warning('Número de cédula no válido', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };

    const filteredItems = pacientes.filter(
        (item) =>
            (item.codigo &&
                item.codigo
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.descripcion &&
                item.descripcion
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.num_doc &&
                item.num_doc
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.expendiente &&
                item.expendiente
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.fecha_nacido &&
                item.fecha_nacido
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre1 &&
                item.nombre1
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.apellido1 &&
                item.apellido1
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
            ||
            (item.nombre_genero &&
                item.nombre_genero
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
            ||
            (item.nacionalidad &&
                item.nacionalidad
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
    );

    const mostarError = (texto) => {
        toast.error(texto, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    const notificarExitoCaso = (idcaso) =>
        toast.success(
            `${t('mensajes.mscasoid')} ${idcaso} ${t('mensajes.msexito')}`,
            {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            }
        );

    const notificarErrorCaso = () =>
        toast.error(`${t('mensajes.mscreacionerror')}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

    const Post = () => {
        axios
            .post('/api/sala_admision', form)
            .then((response) => {
                notificarExitoCaso(response.data.id_admision);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    const PostPaciente = () => {
        axios
            .post('/api/pacientegeneral', form2)
            .then((response) => {
                GetPacientes();
                setMostrarFormulario(false);
                setForm((prevState) => ({
                    ...prevState,
                    id_paciente: response.data.id_paciente,
                }));
                notificarExitoCaso(response.data.id_paciente);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    useEffect(() => {
        GetPacientes();
        GetTipos();
        GetTipoDocumento();
        GetTipoGenero();
        GetTipoEdad();
    }, []);

    useEffect(() => {
        setForm((prevState) => ({
            ...prevState,
            id_paciente: idPaciente,
        }));
    }, [paciente, idPaciente]);

    return (
        <div>

            <div>





                <Typography variant="h4" gutterBottom component="div">
                    {t('eclinical.admision.titulo')}
                </Typography>

                <Grid
                    container
                    noValidate
                    direction="row"
                    justifyContent="center"
                    spacing={5}
                    sx={{ my: 2 }}
                    component="form"
                    autoComplete="off"
                >


                    <Grid item xs={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="label_tipo">{t('eclinical.admision.datos.tipoingreso')}</InputLabel>
                            <Select
                                labelId="label_tipo"
                                value={form.id_ingreso}
                                onChange={cambioSelect}
                                name="id_ingreso"
                                label={`${t('eclinical.admision.datos.tipoingreso')}`}
                            >

                                {tipos.map((tipo) => (
                                    <MenuItem value={tipo.id_ingreso} key={tipo.id_ingreso}>{tipo.nombre_ingreso}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {mostrarSelect && (
                        <Grid item xs={6} md={4} lg={4}>

                            <FormControl fullWidth size="small">
                                <TextField
                                    id="outlined-textarea"
                                    label={`${t('eclinical.admision.datos.id')} 911`}
                                    placeholder={`${t('formularios.ambulancia')}`}
                                    value={form.cod911} onChange={handleChange}
                                    name="cod911"
                                    multiline
                                />
                            </FormControl>

                        </Grid>
                    )}
                    <Grid item xs={6}>
                        <Stack direction="row">

                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={`${t('formularios.formpacientes.paciente')}`}
                                value={paciente}
                                onChange={handleChange}
                                name="id_paciente"
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
                            <Button variant="outlined" onClick={showForm}
                                startIcon={< AddIcon />}
                                sx={{
                                    p: 0,
                                    minWidth: '40px',
                                    '& > span.MuiButton-startIcon': { m: 0 },
                                }} />
                        </Stack>
                    </Grid>
                    <Grid item xs={6} md={4} lg={3}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label={`${t(
                                'formularios.formpacientes.nombrecompa'
                            )}`}
                            value={form.acompañante}
                            onChange={handleChange}
                            name="acompañante"

                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        md={3}
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
                            label={`${t('formularios.formpacientes.telcompa')}`}
                            country={common.codgoPais}
                            value={form.telefono_acompañante}
                            onChange={(value) =>
                                setForm((prevState) => ({
                                    ...prevState,
                                    telefono_acompañante: value,
                                }))
                            }
                        />
                    </Grid>
                </Grid>

                {form.id_ingreso != '' && paciente != '' && (
                    <Button variant="outlined" onClick={Post}>
                        {t('etiquetas.guardar')}
                    </Button>
                )}

            </div >

            <br></br>


            <Typography variant="h5" gutterBottom component="div">
                <ArticleIcon />
                {t('formularios.formulario')}
            </Typography>


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
                            {t('etiquetas.seleccionpcte')}
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
                                onRowClicked={handleRowClicked}
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
                                        No existen casos para mostrar
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



            <br></br>

            {
                mostrarFormulario && (

                    <Grid
                        container
                        noValidate
                        spacing={2}
                        sx={{ my: 2 }}
                        component="form"
                        autoComplete="off"
                    >
                        <Grid item xs={6} md={3} lg={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipodoc-label">
                                    {t('formularios.formpacientes.docid')}:
                                </InputLabel>

                                <Select
                                    labelId="tipodoc-label"
                                    id="tipodoc"
                                    label={`${t(
                                        'formularios.formpacientes.docid'
                                    )}:`}
                                    name="tipo_doc"
                                    value={form2.tipo_doc}
                                    onChange={handleChangeFormPacienteDoc}
                                >
                                    {tipos_documentos.map((item) => (
                                        <MenuItem
                                            key={item.id_tipo}
                                            value={item.id_tipo}
                                        >
                                            {item.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.numero'
                                )}:`}
                                variant="outlined"
                                name="num_doc"
                                value={form2.num_doc}
                                onChange={handleChange1}
                                sx={{
                                    '& > .MuiOutlinedInput-root': {
                                        pr: 0,
                                    },
                                }}
                                InputProps={{
                                    endAdornment:
                                        form2.tipo_doc === 1 ? (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        buscarCedula(
                                                            form2.num_doc,
                                                            true
                                                        )
                                                    }
                                                >
                                                    <PersonSearchRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : (
                                            ''
                                        ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.expediente'
                                )}:`}
                                variant="outlined"
                                name="expendiente"
                                value={form2.expendiente}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                locale={common.locale}
                            >
                                <MobileDatePicker
                                    showTodayButton
                                    label={t(
                                        'formularios.formpacientes.fechanac'
                                    )}
                                    okText={t('etiquetas.aceptar')}
                                    cancelText={t('etiquetas.cancelar')}
                                    todayText={t('etiquetas.hoy')}
                                    value={moment(form2.fecha_nacido)}
                                    onAccept={calcularEdadForm}
                                    onChange={calcularEdad}
                                    maxDate={moment()}
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

                        <Grid item xs={6} md={2}>
                            <TextField
                                disabled
                                fullWidth
                                size="small"
                                type="number"
                                variant="outlined"
                                label={`${t(
                                    'formularios.formpacientes.edad'
                                )}:`}
                                name="edad"
                                value={form2.edad}
                                onChange={handleChange1}
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                        max: 200,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <FormControl disabled fullWidth size="small">
                                <InputLabel id="tipoedad-label">
                                    {t('formularios.formpacientes.tipoedad')}:
                                </InputLabel>

                                <Select
                                    labelId="tipoedad-label"
                                    id="tipoedad"
                                    label={`${t(
                                        'formularios.formpacientes.tipoedad'
                                    )}:`}
                                    name="cod_edad"
                                    value={form2.cod_edad}
                                    onChange={handleChange1}
                                >
                                    {tipos_edad.map((item) => (
                                        <MenuItem
                                            key={item.id_edad}
                                            value={item.id_edad}
                                        >
                                            {item.nombre_edad}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.nombre1'
                                )}:`}
                                variant="outlined"
                                name="nombre1"
                                value={form2.nombre1}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.nombre2'
                                )}:`}
                                variant="outlined"
                                name="nombre2"
                                value={form2.nombre2}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.apellido1'
                                )}:`}
                                variant="outlined"
                                name="apellido1"
                                value={form2.apellido1}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.apellido2'
                                )}:`}
                                variant="outlined"
                                name="apellido2"
                                value={form2.apellido2}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <FormControl>
                                <FormLabel id="genero-label">
                                    {t('formularios.formpacientes.genero')}
                                </FormLabel>

                                <RadioGroup
                                    row
                                    aria-labelledby="genero-label"
                                    defaultValue={1}
                                    name="genero"
                                    value={form2.genero}
                                    onChange={handleChange1}
                                >
                                    {tipos_genero.map((item) => (
                                        <FormControlLabel
                                            key={item.id_genero}
                                            value={item.id_genero}
                                            control={<Radio size="small" />}
                                            label={item.nombre_genero}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.apodo'
                                )}:`}
                                variant="outlined"
                                name="apodo"
                                value={form2.apodo}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.nacionalidad'
                                )}:`}
                                variant="outlined"
                                name="nacionalidad"
                                value={form2.nacionalidad}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={6}
                            md={3}
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
                                label="celular"
                                value={form2.celular}
                                country={common.codgoPais}
                                onChange={(value) =>
                                    setForm2((prevState) => ({
                                        ...prevState,
                                        telefono: value,
                                    }))
                                }
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.segurosocial'
                                )}:`}
                                variant="outlined"
                                name="nss"
                                value={form2.nss}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.direccion'
                                )}:`}
                                variant="outlined"
                                name="direccion"
                                value={form2.direccion}
                                onChange={handleChange1}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'formularios.formpacientes.observaciones'
                                )}:`}
                                variant="outlined"
                                name="observacion"
                                value={form2.observacion}
                                onChange={handleChange1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {form2.num_doc != '' && (
                                <Button variant="outlined" onClick={PostPaciente}>
                                    {t('etiquetas.guardar')}
                                </Button>
                            )}
                        </Grid>
                    </Grid>

                )
            }

        </div >
    );
}

export default Admision;
