import {
    Autocomplete,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

toast.configure();

const moment = require('moment');

export default ({ caso, dataHospitales, actualizar }) => {
    const [t, i18n] = useTranslation('global');
    const [openLoad, setOpenLoad] = useState(false);
    const [hospital, setHospital] = useState(null);

    const [form, setForm] = useState({
        hospital_destino: '',
        hora_seleccion_hospital: '',
        nombre_medico: '',
        telefono: '',
    });

    const handleChangeForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const PutHospitales = async () => {
        setOpenLoad(true);
        await axios
            .put(`/api/preh_maestro/${caso.codigo}`, form)
            .then((response) => {
                mostarSuccess(t('mensajes.mshexito'));
                actualizar();
            })
            .catch((error) => {
                setOpenLoad(false);
                mostarError(t('mensajes.mshrror'));
            });
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
        console.log(caso);
        console.log(dataHospitales);
        if (caso.hospital_destino) {
            const index = dataHospitales.findIndex(
                (item) => item.id_hospital === caso.hospital_destino
            );
            if (index !== -1) setHospital(dataHospitales[index]);
        }

        setForm((prevState) => ({
            ...prevState,
            hospital_destino: caso.hospital_destino
                ? caso.hospital_destino
                : '',
            hora_seleccion_hospital: caso.hora_seleccion_hospital
                ? caso.hora_seleccion_hospital
                : '',
            nombre_medico: caso.nombre_medico ? caso.nombre_medico : '',
            telefono: caso.telefono ? caso.telefono : '',
        }));
    }, [caso]);

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
                            value={hospital}
                            disableClearable
                            options={dataHospitales}
                            getOptionLabel={(option) => option.nombre_hospital}
                            onChange={(event, newValue) => {
                                setHospital(newValue);
                                setForm((prevState) => ({
                                    ...prevState,
                                    hospital_destino: newValue.id_hospital,
                                    hora_seleccion_hospital: moment().format(
                                        'YYYY/MM/DD HH:mm:ss'
                                    ),
                                }));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={`${t(
                                        'formularios.formhospital.hptldestino'
                                    )}:`}
                                />
                            )}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        disabled
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={form.hora_seleccion_hospital}
                        label={`${t('formularios.formhospital.hasignacion')}:`}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        name="nombre_medico"
                        value={form.nombre_medico}
                        onChange={handleChangeForm}
                        label={`${t('formularios.formhospital.nombremedico')}:`}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChangeForm}
                        label={`${t('formularios.formhospital.telmedico')}:`}
                    />
                </Grid>
            </Grid>

            <Stack direction="row" justifyContent="end">
                <Button
                    variant="contained"
                    sx={{ flexGrow: 0 }}
                    color={'primary'}
                    onClick={PutHospitales}
                >
                    {t('etiquetas.guardar')}
                </Button>
            </Stack>
        </Box>
    );
};
