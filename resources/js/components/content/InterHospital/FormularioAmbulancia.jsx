import {
    Autocomplete,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import common from '../../../common';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

toast.configure();

const moment = require('moment');

export default ({ caso, actualizar }) => {
    const [t, i18n] = useTranslation('global');
    const [openLoad, setOpenLoad] = useState(false);
    const [ambulancia, setAmbulancia] = useState(null);
    const [dataAmbulancias, setDataAmbulancias] = useState([]);
    const [idAmbulancia, setIdAmbulancia] = useState(null);
    const [errorAmbulancia, setErrorAmbulancia] = useState(false);
    const [helpAmbulancia, setHelpAmbulancia] = useState('');

    const [form, setForm] = useState({
        cod_casointerh: '',
        cod_ambulancia: '',
        hora_asigna: '',
        hora_llegada: '',
        hora_inicio: '',
        hora_destino: '',
        hora_preposicion: '',
        conductor: '',
        medico: '',
        paramedico: '',
        observaciones: '',
    });

    const handleChangeForm = (event) => {
        setForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleChangeFormFechas = (name, value) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value ? value.format('YYYY/MM/DD HH:mm:ss') : '',
        }));
    };

    const PostAmbulancias = async () => {
        if (ambulancia) {
            setOpenLoad(true);
            await axios
                .post('/api/servicio_ambulancia', form)
                .then((response) => {
                    mostarSuccess(t('mensajes.msaexito'));
                    actualizar();
                })
                .catch((error) => {
                    setOpenLoad(false);
                    mostarError(t('mensajes.msaerror'));
                });
        } else {
            setErrorAmbulancia(true);
            setHelpAmbulancia('Este campo es obligatorio');
        }
    };

    const PutAmbulancias = async () => {
        if (ambulancia) {
            setOpenLoad(true);
            await axios
                .put(`/api/servicio_ambulancia/${idAmbulancia}`, form)
                .then((response) => {
                    mostarSuccess(t('mensajes.msaeexito'));
                    actualizar();
                })
                .catch((error) => {
                    setOpenLoad(false);
                    mostarError(t('mensajes.msaeerror'));
                });
        } else {
            setErrorAmbulancia(true);
            setHelpAmbulancia('Este campo es obligatorio');
        }
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
        setOpenLoad(true);
        const GetAmbulancias = async () => {
            await axios
                .get('/api/ambulancias/listaespecial')
                .then((response) => {
                    setOpenLoad(false);
                    setDataAmbulancias(response.data);
                })
                .catch((error) => {
                    setOpenLoad(false);
                    console.log(error);
                });
        };

        GetAmbulancias();
    }, []);

    useEffect(() => {
        if (dataAmbulancias.length > 0) {
            if (caso.cod_ambulancia) {
                const index = dataAmbulancias.findIndex(
                    (item) =>
                        item.cod_ambulancias.trim() ===
                        caso.cod_ambulancia.trim()
                );
                if (index !== -1) setAmbulancia(dataAmbulancias[index]);
                setIdAmbulancia(caso.id_servcioambulacia);
                setForm((prevState) => ({
                    ...prevState,
                    cod_ambulancia: caso.cod_ambulancia,
                }));
            } else {
                setAmbulancia(null);
                setIdAmbulancia(null);
                setForm((prevState) => ({
                    ...prevState,
                    cod_ambulancia: '',
                }));
            }
        }
        setForm((prevState) => ({
            ...prevState,
            cod_casointerh: caso.codigo,
            hora_asigna: caso.hora_asigna
                ? moment(caso.hora_asigna).format('YYYY/MM/DD HH:mm:ss')
                : '',
            hora_llegada: caso.hora_llegada
                ? moment(caso.hora_llegada).format('YYYY/MM/DD HH:mm:ss')
                : '',
            hora_inicio: caso.hora_inicio
                ? moment(caso.hora_inicio).format('YYYY/MM/DD HH:mm:ss')
                : '',
            hora_destino: caso.hora_destino
                ? moment(caso.hora_destino).format('YYYY/MM/DD HH:mm:ss')
                : '',
            hora_preposicion: caso.hora_preposicion
                ? moment(caso.hora_preposicion)
                : '',
            conductor: caso.conductor ? caso.conductor : '',
            medico: caso.medico ? caso.medico : '',
            paramedico: caso.paramedico ? caso.paramedico : '',
            observaciones: caso.observaciones ? caso.observaciones : '',
        }));
    }, [caso]);

    useEffect(() => {
        if (caso.cod_ambulancia) {
            const index = dataAmbulancias.findIndex(
                (item) =>
                    item.cod_ambulancias.trim() === caso.cod_ambulancia.trim()
            );
            if (index !== -1) setAmbulancia(dataAmbulancias[index]);
            setIdAmbulancia(caso.id_servcioambulacia);
            setForm((prevState) => ({
                ...prevState,
                cod_ambulancia: caso.cod_ambulancia,
            }));
        } else {
            setAmbulancia(null);
            setIdAmbulancia(null);
            setForm((prevState) => ({
                ...prevState,
                cod_ambulancia: '',
            }));
        }
    }, [dataAmbulancias]);

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

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start' }}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            value={ambulancia}
                            disableClearable
                            options={dataAmbulancias}
                            getOptionLabel={(option) =>
                                `${option.codigo} - ${option.cod_ambulancias}`
                            }
                            onChange={(event, newValue) => {
                                setAmbulancia(newValue);
                                setErrorAmbulancia(false);
                                setHelpAmbulancia('');
                                setForm((prevState) => ({
                                    ...prevState,
                                    cod_ambulancia: newValue.cod_ambulancias,
                                }));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={`${t(
                                        'formularios.formambulancias.ambulancia'
                                    )}:`}
                                    error={errorAmbulancia}
                                    helperText={helpAmbulancia}
                                />
                            )}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        locale={common.locale}
                    >
                        <MobileDateTimePicker
                            showTodayButton
                            value={form.hora_asigna}
                            todayText={t('etiquetas.hoy')}
                            okText={t('etiquetas.aceptar')}
                            cancelText={t('etiquetas.cancelar')}
                            label={t('formularios.formambulancias.hasignacion')}
                            onChange={(newValue) =>
                                handleChangeFormFechas('hora_asigna', newValue)
                            }
                            sx={{
                                '& .MuiPickersToolbar-penIconButton': {
                                    display: 'none',
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            cursor: 'pointer',
                                        },
                                        '& .MuiOutlinedInput-root input': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setForm(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                hora_asigna:
                                                                    moment().format(
                                                                        'YYYY/MM/DD HH:mm:ss'
                                                                    ),
                                                            })
                                                        )
                                                    }
                                                >
                                                    <AccessTimeRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        locale={common.locale}
                    >
                        <MobileDateTimePicker
                            showTodayButton
                            value={form.hora_llegada}
                            todayText={t('etiquetas.hoy')}
                            okText={t('etiquetas.aceptar')}
                            cancelText={t('etiquetas.cancelar')}
                            label={t('formularios.formambulancias.hllegada')}
                            onChange={(newValue) =>
                                handleChangeFormFechas('hora_llegada', newValue)
                            }
                            sx={{
                                '& .MuiPickersToolbar-penIconButton': {
                                    display: 'none',
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            cursor: 'pointer',
                                        },
                                        '& .MuiOutlinedInput-root input': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setForm(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                hora_llegada:
                                                                    moment().format(
                                                                        'YYYY/MM/DD HH:mm:ss'
                                                                    ),
                                                            })
                                                        )
                                                    }
                                                >
                                                    <AccessTimeRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        locale={common.locale}
                    >
                        <MobileDateTimePicker
                            showTodayButton
                            value={form.hora_inicio}
                            todayText={t('etiquetas.hoy')}
                            okText={t('etiquetas.aceptar')}
                            cancelText={t('etiquetas.cancelar')}
                            label={t('formularios.formambulancias.hinicia')}
                            onChange={(newValue) =>
                                handleChangeFormFechas('hora_inicio', newValue)
                            }
                            sx={{
                                '& .MuiPickersToolbar-penIconButton': {
                                    display: 'none',
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            cursor: 'pointer',
                                        },
                                        '& .MuiOutlinedInput-root input': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setForm(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                hora_inicio:
                                                                    moment().format(
                                                                        'YYYY/MM/DD HH:mm:ss'
                                                                    ),
                                                            })
                                                        )
                                                    }
                                                >
                                                    <AccessTimeRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        locale={common.locale}
                    >
                        <MobileDateTimePicker
                            showTodayButton
                            value={form.hora_destino}
                            todayText={t('etiquetas.hoy')}
                            okText={t('etiquetas.aceptar')}
                            cancelText={t('etiquetas.cancelar')}
                            label={t('formularios.formambulancias.hdestino')}
                            onChange={(newValue) =>
                                handleChangeFormFechas('hora_destino', newValue)
                            }
                            sx={{
                                '& .MuiPickersToolbar-penIconButton': {
                                    display: 'none',
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            cursor: 'pointer',
                                        },
                                        '& .MuiOutlinedInput-root input': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setForm(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                hora_destino:
                                                                    moment().format(
                                                                        'YYYY/MM/DD HH:mm:ss'
                                                                    ),
                                                            })
                                                        )
                                                    }
                                                >
                                                    <AccessTimeRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        locale={common.locale}
                    >
                        <MobileDateTimePicker
                            showTodayButton
                            value={form.hora_preposicion}
                            todayText={t('etiquetas.hoy')}
                            okText={t('etiquetas.aceptar')}
                            cancelText={t('etiquetas.cancelar')}
                            label={t('formularios.formambulancias.hbase')}
                            onChange={(newValue) =>
                                handleChangeFormFechas(
                                    'hora_preposicion',
                                    newValue
                                )
                            }
                            sx={{
                                '& .MuiPickersToolbar-penIconButton': {
                                    display: 'none',
                                },
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            cursor: 'pointer',
                                        },
                                        '& .MuiOutlinedInput-root input': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setForm(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                hora_preposicion:
                                                                    moment().format(
                                                                        'YYYY/MM/DD HH:mm:ss'
                                                                    ),
                                                            })
                                                        )
                                                    }
                                                >
                                                    <AccessTimeRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        label={`${t(
                            'formularios.formambulancias.tectranssanitario'
                        )}:`}
                        variant="outlined"
                        name="conductor"
                        value={form.conductor}
                        onChange={handleChangeForm}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        label={`${t(
                            'formularios.formambulancias.medgeneral'
                        )}:`}
                        variant="outlined"
                        name="medico"
                        value={form.medico}
                        onChange={handleChangeForm}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        label={`${t(
                            'formularios.formambulancias.tecmedicas'
                        )}:`}
                        variant="outlined"
                        name="paramedico"
                        value={form.paramedico}
                        onChange={handleChangeForm}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label={`${t(
                            'formularios.formambulancias.observaciones'
                        )}:`}
                        variant="outlined"
                        name="observaciones"
                        value={form.observaciones}
                        onChange={handleChangeForm}
                    />
                </Grid>
            </Grid>

            <Stack direction="row" justifyContent="end">
                <Button
                    variant="contained"
                    sx={{ flexGrow: 0 }}
                    color={idAmbulancia ? 'primary' : 'success'}
                    onClick={idAmbulancia ? PutAmbulancias : PostAmbulancias}
                >
                    {idAmbulancia
                        ? t('etiquetas.guardar')
                        : t('etiquetas.agregar')}
                </Button>
            </Stack>
        </Box>
    );
};
