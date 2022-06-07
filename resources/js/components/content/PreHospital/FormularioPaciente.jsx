import {
    AppBar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';

import common from '../../../common';

import { DateTime } from 'luxon';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import PhoneInput from 'react-phone-input-2';

import 'moment/locale/es';

const moment = require('moment');

toast.configure();

const dataPaciente = {
    cod_casopreh: '',
    id_paciente: '',
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
    celular: '',
    aseguradro: 0,
    direccion: '',
    observacion: '',
    telefono: '',
    email: '',
    nss: '',
    usu_sede: '',
    prehospitalario: '',
    dpto_pte: '',
    provin_pte: '',
    distrito_pte: '',
    admision_hospital: '',
};

const dataPacienteNuevo = {
    cod_casopreh: '',
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
    genero: 1,
    apodo: '',
    nacionalidad: '',
    celular: '',
    aseguradro: 0,
    nss: '',
    direccion: '',
    observacion: '',
};

export default ({ caso, paciente, setPaciente, actualizar }) => {
    const [t, i18n] = useTranslation('global');

    const [openLoad, setOpenLoad] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [dataTipoDoc, setDataTipoDoc] = useState([]);
    const [dataTipoEdad, setDataTipoEdad] = useState([]);
    const [dataTipoGenero, setDataTipoGenero] = useState([]);
    const [dataSeguro, setDataSeguro] = useState([]);

    const [form, setForm] = useState(dataPaciente);
    const [formNuevo, setFormNuevo] = useState(dataPacienteNuevo);

    const handleChangePaciente = (event) => {
        setPaciente(event.target.value);
        const element = caso.pacientes[event.target.value];
        setForm((prevState) => ({
            ...prevState,
            cod_casopreh: element.cod_casopreh,
            id_paciente: element.id_paciente,
            tipo_doc: element.tipo_doc ? element.tipo_doc : '',
            num_doc: element.num_doc ? element.num_doc : '',
            expendiente: element.expendiente ? element.expendiente : '',
            fecha_nacido: element.fecha_nacido ? element.fecha_nacido : '',
            edad: element.edad ? element.edad : '',
            cod_edad: element.cod_edad ? element.cod_edad : '',
            nombre1: element.nombre1 ? element.nombre1 : '',
            nombre2: element.nombre2 ? element.nombre2 : '',
            apellido1: element.apellido1 ? element.apellido1 : '',
            apellido2: element.apellido2 ? element.apellido2 : '',
            genero: element.genero ? element.genero : 1,
            apodo: element.apodo ? element.apodo : '',
            nacionalidad: element.nacionalidad ? element.nacionalidad : '',
            celular: element.celular ? element.celular : '',
            aseguradro: element.aseguradro ? element.aseguradro : 0,
            direccion: element.direccion ? element.direccion : '',
            observacion: element.observacion ? element.observacion : '',
            telefono: element.telefono ? element.telefono : '',
            email: element.email ? element.email : '',
            nss: element.nss ? element.nss : '',
            usu_sede: element.usu_sede ? element.usu_sede : '',
            prehospitalario: element.prehospitalario
                ? element.prehospitalario
                : '',
            dpto_pte: element.dpto_pte ? element.dpto_pte : '',
            provin_pte: element.provin_pte ? element.provin_pte : '',
            distrito_pte: element.distrito_pte ? element.distrito_pte : '',
            admision_hospital: element.admision_hospital
                ? element.admision_hospital
                : '',
        }));
    };

    const handleChangeForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeFormNuevo = (e) => {
        setFormNuevo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeFormFechaNacido = (value) => {
        setForm((prevState) => ({
            ...prevState,
            fecha_nacido: value.format('YYYY-MM-DD'),
        }));
    };

    const handleChangeFormNuevoFechaNacido = (value) => {
        setFormNuevo((prevState) => ({
            ...prevState,
            fecha_nacido: value.format('YYYY-MM-DD'),
        }));
    };

    const calcularEdadForm = (value) => {
        let end = DateTime.fromISO(DateTime.now());
        let start = DateTime.fromISO(value.format('YYYY-MM-DD'));
        if (end.diff(start, 'years').years >= 1) {
            setForm((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'years').years | 0,
                cod_edad: 1,
            }));
        } else if (end.diff(start, 'months').months >= 1) {
            setForm((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'months').months | 0,
                cod_edad: 2,
            }));
        } else {
            setForm((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'days').days | 0,
                cod_edad: 3,
            }));
        }
    };

    const calcularEdadFormNuevo = (value) => {
        let end = DateTime.fromISO(DateTime.now());
        let start = DateTime.fromISO(value.format('YYYY-MM-DD'));
        if (end.diff(start, 'years').years >= 1) {
            setFormNuevo((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'years').years | 0,
                cod_edad: 1,
            }));
        } else if (end.diff(start, 'months').months >= 1) {
            setFormNuevo((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'months').months | 0,
                cod_edad: 2,
            }));
        } else {
            setFormNuevo((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'days').days | 0,
                cod_edad: 3,
            }));
        }
    };

    const buscarCedula = async (cedula, modal) => {
        if (common.number_validate(cedula)) {
            setOpenLoad(true);
            await axios
                .post('/api/pacientegeneral/get_token', { key: common.key })
                .then((response) => {
                    if (response.data.code && response.data.code === 403) {
                        setOpenLoad(false);
                        mostarError(response.data.mensaje);
                    } else {
                        const getDatos = async () => {
                            await axios
                                .post('/api/pacientegeneral/get_datos', {
                                    doc: cedula,
                                    token: response.data,
                                })
                                .then((response) => {
                                    console.log(response.data);
                                    if (response.data.valido) {
                                        let genero = 1;
                                        if (response.data.sexo === 'F')
                                            genero = 2;

                                        if (modal) {
                                            setFormNuevo((prevState) => ({
                                                ...prevState,
                                                fecha_nacido:
                                                    response.data
                                                        .fecha_nacimiento,
                                                nombre1:
                                                    response.data.nombres.split(
                                                        ' '
                                                    )[0],
                                                nombre2:
                                                    response.data.nombres.split(
                                                        ' '
                                                    ).length > 1
                                                        ? response.data.nombres.split(
                                                              ' '
                                                          )[1]
                                                        : '',
                                                apellido1:
                                                    response.data.apellido1,
                                                apellido2:
                                                    response.data.apellido2,
                                                genero: genero,
                                                nacionalidad:
                                                    response.data.nacionalidad,
                                            }));
                                            calcularEdadFormNuevo(
                                                moment(
                                                    response.data
                                                        .fecha_nacimiento
                                                )
                                            );
                                        } else {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                fecha_nacido:
                                                    response.data
                                                        .fecha_nacimiento,
                                                nombre1:
                                                    response.data.nombres.split(
                                                        ' '
                                                    )[0],
                                                nombre2:
                                                    response.data.nombres.split(
                                                        ' '
                                                    ).length > 1
                                                        ? response.data.nombres.split(
                                                              ' '
                                                          )[1]
                                                        : '',
                                                apellido1:
                                                    response.data.apellido1,
                                                apellido2:
                                                    response.data.apellido2,
                                                genero: genero,
                                                nacionalidad:
                                                    response.data.nacionalidad,
                                            }));
                                            calcularEdadForm(
                                                moment(
                                                    response.data
                                                        .fecha_nacimiento
                                                )
                                            );
                                            mostarSuccess(
                                                'Datos cargados exitosamente'
                                            );
                                        }
                                    } else {
                                        mostarError('Ha ocurrido un error');
                                    }
                                    setOpenLoad(false);
                                })
                                .catch(() => {
                                    setOpenLoad(false);
                                    mostarError('Ha ocurrido un error');
                                });
                        };

                        getDatos();
                    }
                })
                .catch(() => {
                    setOpenLoad(false);
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

    const PutPaciente = async () => {
        setOpenLoad(true);
        await axios
            .put(`/api/pacientegeneral/${form.id_paciente}`, form)
            .then((response) => {
                setPaciente('');
                mostarSuccess(t('mensajes.mspeexito'));
                actualizar();
            })
            .catch((error) => {
                setOpenLoad(false);
                mostarError(t('mensajes.mspeerror'));
            });
    };

    const PostPaciente = async () => {
        setOpenLoad(true);
        await axios
            .post('/api/pacientegeneral', formNuevo)
            .then((response) => {
                setFormNuevo(dataPacienteNuevo);
                mostarSuccess(t('mensajes.mspexito'));
                actualizar();
            })
            .catch((error) => mostarError(t('mensajes.msperror')));
    };

    const closeDialog = () => {
        setOpenDialog(false);
        setFormNuevo(dataPacienteNuevo);
    };

    const mostarSuccess = (texto) => {
        toast.success(texto, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

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

    useEffect(() => {
        setFormNuevo((prevState) => ({
            ...prevState,
            cod_casopreh: caso.codigo,
        }));

        const loadData = async () => {
            setOpenLoad(true);

            let response = await axios.get('/api/tipo_id');
            setDataTipoDoc(response.data);

            response = await axios.get('/api/tipo_edad');
            setDataTipoEdad(response.data);

            response = await axios.get('/api/tipo_genero');
            setDataTipoGenero(response.data);

            response = await axios.get('/api/aseguradores');
            setDataSeguro(response.data);

            setOpenLoad(false);
        };

        loadData();
    }, [caso]);

    useEffect(() => {
        if (paciente !== '') {
            const element = caso.pacientes[paciente];
            setForm((prevState) => ({
                ...prevState,
                cod_casopreh: element.cod_casopreh,
                id_paciente: element.id_paciente,
                num_doc: element.num_doc ? element.num_doc : '',
                expendiente: element.expendiente ? element.expendiente : '',
                fecha_nacido: element.fecha_nacido ? element.fecha_nacido : '',
                edad: element.edad ? element.edad : '',
                nombre1: element.nombre1 ? element.nombre1 : '',
                nombre2: element.nombre2 ? element.nombre2 : '',
                apellido1: element.apellido1 ? element.apellido1 : '',
                apellido2: element.apellido2 ? element.apellido2 : '',
                apodo: element.apodo ? element.apodo : '',
                nacionalidad: element.nacionalidad ? element.nacionalidad : '',
                celular: element.celular ? element.celular : '',
                aseguradro: element.aseguradro ? element.aseguradro : 0,
                direccion: element.direccion ? element.direccion : '',
                observacion: element.observacion ? element.observacion : '',
                telefono: element.telefono ? element.telefono : '',
                email: element.email ? element.email : '',
                nss: element.nss ? element.nss : '',
                usu_sede: element.usu_sede ? element.usu_sede : '',
                prehospitalario: element.prehospitalario
                    ? element.prehospitalario
                    : '',
                dpto_pte: element.dpto_pte ? element.dpto_pte : '',
                provin_pte: element.provin_pte ? element.provin_pte : '',
                distrito_pte: element.distrito_pte ? element.distrito_pte : '',
                admision_hospital: element.admision_hospital
                    ? element.admision_hospital
                    : '',
            }));
        }
    }, [paciente]);

    useEffect(() => {
        if (paciente !== '') {
            const element = caso.pacientes[paciente];

            if (dataTipoDoc.length > 0) {
                setForm((prevState) => ({
                    ...prevState,
                    tipo_doc: element.tipo_doc ? element.tipo_doc : '',
                }));
            }

            if (dataTipoEdad.length > 0) {
                setForm((prevState) => ({
                    ...prevState,
                    cod_edad: element.cod_edad ? element.cod_edad : '',
                }));
            }

            if (dataTipoGenero.length > 0) {
                setForm((prevState) => ({
                    ...prevState,
                    genero: element.genero ? element.genero : 1,
                }));
            }

            if (dataSeguro.length > 0) {
                setForm((prevState) => ({
                    ...prevState,
                    aseguradro: element.aseguradro ? element.aseguradro : 0,
                }));
            }
        }
    }, [dataTipoDoc, dataTipoEdad, dataTipoGenero, dataSeguro]);

    return (
        <Box sx={{ m: 2 }}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 101,
                }}
                open={openLoad}
            >
                <Stack spacing={1} alignItems="center">
                    <CircularProgress disableShrink color="inherit" />
                    <Typography>{t('etiquetas.cargando')}</Typography>
                </Stack>
            </Backdrop>

            <Stack direction="row">
                <FormControl fullWidth size="small">
                    <InputLabel id="paciente-label">
                        {t('formularios.formpacientes.selectpaciente')}:
                    </InputLabel>

                    <Select
                        labelId="paciente-label"
                        id="paciente"
                        label={`${t(
                            'formularios.formpacientes.selectpaciente'
                        )}:`}
                        value={paciente}
                        onChange={handleChangePaciente}
                    >
                        <MenuItem value="" disabled>
                            {t('formularios.formpacientes.selectpaciente')}
                        </MenuItem>

                        {caso.pacientes.map((item, index) => (
                            <MenuItem key={index} value={index}>
                                {item.nombre1} {item.nombre2} {item.apellido1}{' '}
                                {item.apellido2}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <common.BootstrapTooltip
                    title={t('formularios.formpacientes.crearpaciente')}
                >
                    <Button
                        variant="contained"
                        onClick={() => setOpenDialog(true)}
                        startIcon={<PersonAddAltRoundedIcon />}
                        sx={{
                            p: 0,
                            minWidth: '50px',
                            '& > span.MuiButton-startIcon': { m: 0 },
                        }}
                    />
                </common.BootstrapTooltip>
            </Stack>

            {paciente !== '' && (
                <>
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
                                    value={form.tipo_doc}
                                    onChange={handleChangeForm}
                                >
                                    {dataTipoDoc.map((item) => (
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
                                value={form.num_doc}
                                onChange={handleChangeForm}
                                sx={{
                                    '& > .MuiOutlinedInput-root': {
                                        pr: 0,
                                    },
                                }}
                                InputProps={{
                                    endAdornment:
                                        form.tipo_doc === 1 ? (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        buscarCedula(
                                                            form.num_doc,
                                                            false
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
                                value={form.expendiente}
                                onChange={handleChangeForm}
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
                                    value={moment(form.fecha_nacido)}
                                    onAccept={calcularEdadForm}
                                    onChange={handleChangeFormFechaNacido}
                                    maxDate={moment()}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            {...params}
                                            size="small"
                                        />
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
                                value={form.edad}
                                onChange={handleChangeForm}
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
                                    value={form.cod_edad}
                                    onChange={handleChangeForm}
                                >
                                    {dataTipoEdad.map((item) => (
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
                                value={form.nombre1}
                                onChange={handleChangeForm}
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
                                value={form.nombre2}
                                onChange={handleChangeForm}
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
                                value={form.apellido1}
                                onChange={handleChangeForm}
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
                                value={form.apellido2}
                                onChange={handleChangeForm}
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <FormControl
                                sx={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <FormLabel id="genero-label" sx={{ mr: 1 }}>
                                    {t('formularios.formpacientes.genero')}:
                                </FormLabel>

                                <RadioGroup
                                    row
                                    aria-labelledby="genero-label"
                                    name="genero"
                                    value={form.genero}
                                    onChange={handleChangeForm}
                                >
                                    {dataTipoGenero.map((item) => (
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
                                value={form.apodo}
                                onChange={handleChangeForm}
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
                                value={form.nacionalidad}
                                onChange={handleChangeForm}
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
                                specialLabel={`${t(
                                    'formularios.formpacientes.telefono'
                                )}:`}
                                value={form.celular}
                                country={common.codgoPais}
                                onChange={(value) =>
                                    setForm((prevState) => ({
                                        ...prevState,
                                        celular: value,
                                    }))
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={8} lg={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="seguro-label">
                                    {t('formularios.formpacientes.seguro')}:
                                </InputLabel>

                                <Select
                                    labelId="seguro-label"
                                    label={`${t(
                                        'formularios.formpacientes.seguro'
                                    )}:`}
                                    name="aseguradro"
                                    value={form.aseguradro}
                                    onChange={handleChangeForm}
                                >
                                    <MenuItem value={0}>
                                        -- {t('etiquetas.seleccion')} --
                                    </MenuItem>

                                    {dataSeguro.map((item) => (
                                        <MenuItem
                                            key={item.id_asegurador}
                                            value={item.id_asegurador}
                                        >
                                            {item.nombre_asegurador}
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
                                    'formularios.formpacientes.segurosocial'
                                )}:`}
                                variant="outlined"
                                name="nss"
                                value={form.nss}
                                onChange={handleChangeForm}
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
                                value={form.direccion}
                                onChange={handleChangeForm}
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
                                value={form.observacion}
                                onChange={handleChangeForm}
                            />
                        </Grid>
                    </Grid>

                    <Stack direction="row" justifyContent="end">
                        <Button
                            variant="contained"
                            sx={{ flexGrow: 0 }}
                            onClick={PutPaciente}
                        >
                            {t('etiquetas.guardar')}
                        </Button>
                    </Stack>
                </>
            )}

            <Dialog
                fullWidth
                maxWidth="lg"
                open={openDialog}
                onClose={closeDialog}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t('etiquetas.nuevopaciente')}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={closeDialog}
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
                                    value={formNuevo.tipo_doc}
                                    onChange={handleChangeFormNuevo}
                                >
                                    {dataTipoDoc.map((item) => (
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
                                value={formNuevo.num_doc}
                                onChange={handleChangeFormNuevo}
                                sx={{
                                    '& > .MuiOutlinedInput-root': {
                                        pr: 0,
                                    },
                                }}
                                InputProps={{
                                    endAdornment:
                                        formNuevo.tipo_doc === 1 ? (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        buscarCedula(
                                                            formNuevo.num_doc,
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
                                value={formNuevo.expendiente}
                                onChange={handleChangeFormNuevo}
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
                                    value={moment(formNuevo.fecha_nacido)}
                                    onAccept={calcularEdadFormNuevo}
                                    onChange={handleChangeFormNuevoFechaNacido}
                                    maxDate={moment()}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            {...params}
                                            size="small"
                                        />
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
                                value={formNuevo.edad}
                                onChange={handleChangeFormNuevo}
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
                                    value={formNuevo.cod_edad}
                                    onChange={handleChangeFormNuevo}
                                >
                                    {dataTipoEdad.map((item) => (
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
                                value={formNuevo.nombre1}
                                onChange={handleChangeFormNuevo}
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
                                value={formNuevo.nombre2}
                                onChange={handleChangeFormNuevo}
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
                                value={formNuevo.apellido1}
                                onChange={handleChangeFormNuevo}
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
                                value={formNuevo.apellido2}
                                onChange={handleChangeFormNuevo}
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <FormControl
                                sx={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <FormLabel id="genero-label" sx={{ mr: 1 }}>
                                    {t('formularios.formpacientes.genero')}:
                                </FormLabel>

                                <RadioGroup
                                    row
                                    aria-labelledby="genero-label"
                                    name="genero"
                                    value={formNuevo.genero}
                                    onChange={handleChangeFormNuevo}
                                >
                                    {dataTipoGenero.map((item) => (
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
                                value={formNuevo.apodo}
                                onChange={handleChangeFormNuevo}
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
                                value={formNuevo.nacionalidad}
                                onChange={handleChangeFormNuevo}
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
                                value={formNuevo.celular}
                                country={common.codgoPais}
                                onChange={(value) =>
                                    setFormNuevo((prevState) => ({
                                        ...prevState,
                                        celular: value,
                                    }))
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={8} lg={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="seguro-label">
                                    {t('formularios.formpacientes.seguro')}:
                                </InputLabel>

                                <Select
                                    labelId="seguro-label"
                                    label={`${t(
                                        'formularios.formpacientes.seguro'
                                    )}:`}
                                    name="aseguradro"
                                    value={formNuevo.aseguradro}
                                    onChange={handleChangeFormNuevo}
                                >
                                    <MenuItem value={0}>
                                        -- {t('etiquetas.seleccion')} --
                                    </MenuItem>

                                    {dataSeguro.map((item) => (
                                        <MenuItem
                                            key={item.id_asegurador}
                                            value={item.id_asegurador}
                                        >
                                            {item.nombre_asegurador}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label={`${t(
                                    'formularios.formpacientes.segurosocial'
                                )}:`}
                                name="nss"
                                value={formNuevo.nss}
                                onChange={handleChangeFormNuevo}
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
                                value={formNuevo.direccion}
                                onChange={handleChangeFormNuevo}
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
                                value={formNuevo.observacion}
                                onChange={handleChangeFormNuevo}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ mb: 1 }}>
                    <Button variant="contained" onClick={PostPaciente}>
                        Guardar
                    </Button>

                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={closeDialog}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
