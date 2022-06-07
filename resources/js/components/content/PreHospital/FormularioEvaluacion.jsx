import {
    AppBar,
    Autocomplete,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';

import common from '../../../common';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';

import InputMask from 'react-input-mask';
import chroma from 'chroma-js';
import DataTable from 'react-data-table-component';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

toast.configure();

const moment = require('moment');

const dataEvaluacion = {
    cod_casopreh: '',
    id_paciente: '',
    id_evaluacionclinica: '',
    fecha_horaevaluacion: moment().format('YYYY-MM-DD HH:mm:ss'),
    cod_paciente: '',
    cod_diag_cie: '',
    diagnos_txt: '',
    triage: '',
    c_clinico: '',
    examen_fisico: '',
    tratamiento: '',
    antecedentes: '',
    paraclinicos: '',
    sv_tx: '',
    sv_fc: '',
    sv_fr: '',
    sv_temp: '',
    sv_gl: '',
    peso: '',
    talla: '',
    sv_fcf: '',
    sv_sato2: '',
    sv_apgar: '',
    sv_gli: '',
    usu_sede: '',
    tipo_paciente: '',
};

const colourOptions = [
    { value: 'Critico', label: 'Critico', color: '#FF5630' },
    { value: 'Severo', label: 'Severo', color: '#FF8B00' },
    { value: 'Moderado', label: 'Moderado', color: '#FFC400' },
    { value: 'Leve', label: 'Leve', color: '#36B37E' },
];

export default ({
    caso,
    paciente,
    setPaciente,
    dataCIE10,
    dataTipos,
    actualizar,
}) => {
    const [t, i18n] = useTranslation('global');

    const [openLoad, setOpenLoad] = useState(false);
    const [openDialogCIE10, setOpenDialogCIE10] = useState(false);
    const [nuevo, setNuevo] = useState(false);

    const [form, setForm] = useState(dataEvaluacion);
    const [filterTextCIE10, setFilterTextCIE10] = useState('');
    const [selectedCIE10, setSelectedCIE10] = useState(null);
    const [selectedTextCIE10, setSelectedTextCIE10] = useState('');

    const filteredItemsCIE10 = dataCIE10.filter(
        (item) =>
            (item.codigo &&
                item.codigo
                    .toLowerCase()
                    .includes(filterTextCIE10.toLowerCase())) ||
            (item.diagnostico &&
                item.diagnostico
                    .toLowerCase()
                    .includes(filterTextCIE10.toLowerCase()))
    );

    const subHeaderComponentCIE10 = useMemo(() => {
        const handleClear = () => {
            if (filterTextCIE10) setFilterTextCIE10('');
        };

        return (
            <Grid container justifyContent="end">
                <Grid item xs="auto">
                    <common.FilterComponent
                        onClear={handleClear}
                        filterText={filterTextCIE10}
                        onFilter={(e) => setFilterTextA(e.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }, [filterTextCIE10]);

    const columnsCIE10 = useMemo(() => [
        {
            name: `${t('formularios.formevaluacion.codigo')}`,
            width: '100px',
            sortable: true,
            selector: (row) => row.codigo_cie,
        },
        {
            name: `${t('formularios.formevaluacion.diagnostico')}`,
            minWidth: '150px',
            sortable: true,
            selector: (row) => row.diagnostico,
        },
    ]);

    const handleChangePaciente = (event) => {
        setPaciente(event.target.value);
        const index = caso.evaluaciones_clinicas.findIndex(
            (item) =>
                item.id_paciente ===
                caso.pacientes[event.target.value].id_paciente
        );
        if (index !== -1) {
            const element = caso.evaluaciones_clinicas[index];
            setNuevo(false);
            setForm((prevState) => ({
                ...prevState,
                id_evaluacionclinica: element.id_evaluacionclinica,
                id_paciente: element.id_paciente,
                fecha_horaevaluacion: element.fecha_horaevaluacion
                    ? element.fecha_horaevaluacion
                    : moment().format('YYYY-MM-DD HH:mm:ss'),
                cod_paciente: element.cod_paciente ? element.cod_paciente : '',
                cod_diag_cie: element.cod_diag_cie ? element.cod_diag_cie : '',
                diagnos_txt: element.diagnos_txt ? element.diagnos_txt : '',
                triage: element.triage ? element.triage : '',
                c_clinico: element.c_clinico ? element.c_clinico : '',
                examen_fisico: element.examen_fisico
                    ? element.examen_fisico
                    : '',
                tratamiento: element.tratamiento ? element.tratamiento : '',
                antecedentes: element.antecedentes ? element.antecedentes : '',
                paraclinicos: element.paraclinicos ? element.paraclinicos : '',
                sv_tx: element.sv_tx ? element.sv_tx : '',
                sv_fc: element.sv_fc ? element.sv_fc : '',
                sv_fr: element.sv_fr ? element.sv_fr : '',
                sv_temp: element.sv_temp ? element.sv_temp : '',
                sv_gl: element.sv_gl ? element.sv_gl : '',
                peso: element.peso ? element.peso : '',
                talla: element.talla ? element.talla : '',
                sv_fcf: element.sv_fcf ? element.sv_fcf : '',
                sv_sato2: element.sv_sato2 ? element.sv_sato2 : '',
                sv_apgar: element.sv_apgar ? element.sv_apgar : '',
                sv_gli: element.sv_gli ? element.sv_gli : '',
                usu_sede: element.usu_sede ? element.usu_sede : '',
                tipo_paciente: element.tipo_paciente
                    ? element.tipo_paciente
                    : '',
            }));

            if (element.cod_diag_cie) {
                const index = dataCIE10.findIndex(
                    (item) => item.codigo_cie === element.cod_diag_cie
                );
                if (index !== -1) {
                    setSelectedCIE10(dataCIE10[index]);
                    setSelectedTextCIE10(
                        `${dataCIE10[index].codigo_cie} - ${dataCIE10[index].diagnostico}`
                    );
                }
            }
        } else {
            setNuevo(true);
            setForm((prevState) => ({
                ...prevState,
                id_paciente: caso.pacientes[event.target.value].id_paciente,
                id_evaluacionclinica: '',
                fecha_horaevaluacion: moment().format('YYYY-MM-DD HH:mm:ss'),
                cod_paciente: '',
                cod_diag_cie: '',
                diagnos_txt: '',
                triage: '',
                c_clinico: '',
                examen_fisico: '',
                tratamiento: '',
                antecedentes: '',
                paraclinicos: '',
                sv_tx: '',
                sv_fc: '',
                sv_fr: '',
                sv_temp: '',
                sv_gl: '',
                peso: '',
                talla: '',
                sv_fcf: '',
                sv_sato2: '',
                sv_apgar: '',
                sv_gli: '',
                usu_sede: '',
                tipo_paciente: '',
            }));

            setSelectedCIE10(null);
            setSelectedTextCIE10('');
        }
    };

    const handleChangeForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const seleccionarCIE10 = ({ selectedRows }) => {
        setSelectedCIE10(selectedRows[0]);
    };

    const actualizarCIE10 = () => {
        setForm((prevState) => ({
            ...prevState,
            cod_diag_cie: selectedCIE10.codigo_cie,
        }));
        setSelectedTextCIE10(
            `${selectedCIE10.codigo_cie} - ${selectedCIE10.diagnostico}`
        );
        setOpenDialogCIE10(false);
    };

    const PutEvaluaciones = async () => {
        setOpenLoad(true);
        await axios
            .put(
                `/api/preh_evaluacionclinica/${form.id_evaluacionclinica}`,
                form
            )
            .then((response) => {
                setPaciente('');
                mostarSuccess(t('mensajes.mseeexito'));
                actualizar();
            })
            .catch((error) => {
                setOpenLoad(false);
                mostarError(t('mensajes.mseeerror'));
            });
    };

    const PostEvaluaciones = async () => {
        setOpenLoad(true);
        const formPost = {
            cod_casopreh: form.cod_casopreh,
            id_paciente: form.id_paciente,
            fecha_horaevaluacion: form.fecha_horaevaluacion,
            cod_paciente: form.cod_paciente,
            cod_diag_cie: form.cod_diag_cie,
            diagnos_txt: form.diagnos_txt,
            triage: form.triage,
            c_clinico: form.c_clinico,
            examen_fisico: form.examen_fisico,
            tratamiento: form.tratamiento,
            antecedentes: form.antecedentes,
            paraclinicos: form.paraclinicos,
            sv_tx: form.sv_tx,
            sv_fc: form.sv_fc,
            sv_fr: form.sv_fr,
            sv_temp: form.sv_temp,
            sv_gl: form.sv_gl,
            peso: form.peso,
            talla: form.talla,
            sv_fcf: form.sv_fcf,
            sv_sato2: form.sv_sato2,
            sv_apgar: form.sv_apgar,
            sv_gli: form.sv_gli,
            usu_sede: form.usu_sede,
            tipo_paciente: form.tipo_paciente,
        };

        await axios
            .post('/api/preh_evaluacionclinica', formPost)
            .then((response) => {
                setPaciente('');
                mostarSuccess(t('mensajes.mseexito'));
                actualizar();
            })
            .catch((error) => {
                setOpenLoad(false);
                mostarError(t('mensajes.mseerror'));
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
        setForm((prevState) => ({
            ...prevState,
            cod_casopreh: caso.codigo,
        }));
    }, [caso]);

    useEffect(() => {
        if (paciente !== '') {
            const index = caso.evaluaciones_clinicas.findIndex(
                (item) =>
                    item.id_paciente === caso.pacientes[paciente].id_paciente
            );
            if (index !== -1) {
                const element = caso.evaluaciones_clinicas[index];
                setNuevo(false);
                setForm((prevState) => ({
                    ...prevState,
                    id_evaluacionclinica: element.id_evaluacionclinica,
                    id_paciente: element.id_paciente,
                    fecha_horaevaluacion: element.fecha_horaevaluacion
                        ? element.fecha_horaevaluacion
                        : moment().format('YYYY-MM-DD HH:mm:ss'),
                    cod_paciente: element.cod_paciente
                        ? element.cod_paciente
                        : '',
                    cod_diag_cie: element.cod_diag_cie
                        ? element.cod_diag_cie
                        : '',
                    diagnos_txt: element.diagnos_txt ? element.diagnos_txt : '',
                    triage: element.triage ? element.triage : '',
                    c_clinico: element.c_clinico ? element.c_clinico : '',
                    examen_fisico: element.examen_fisico
                        ? element.examen_fisico
                        : '',
                    tratamiento: element.tratamiento ? element.tratamiento : '',
                    antecedentes: element.antecedentes
                        ? element.antecedentes
                        : '',
                    paraclinicos: element.paraclinicos
                        ? element.paraclinicos
                        : '',
                    sv_tx: element.sv_tx ? element.sv_tx : '',
                    sv_fc: element.sv_fc ? element.sv_fc : '',
                    sv_fr: element.sv_fr ? element.sv_fr : '',
                    sv_temp: element.sv_temp ? element.sv_temp : '',
                    sv_gl: element.sv_gl ? element.sv_gl : '',
                    peso: element.peso ? element.peso : '',
                    talla: element.talla ? element.talla : '',
                    sv_fcf: element.sv_fcf ? element.sv_fcf : '',
                    sv_sato2: element.sv_sato2 ? element.sv_sato2 : '',
                    sv_apgar: element.sv_apgar ? element.sv_apgar : '',
                    sv_gli: element.sv_gli ? element.sv_gli : '',
                    usu_sede: element.usu_sede ? element.usu_sede : '',
                    tipo_paciente: element.tipo_paciente
                        ? element.tipo_paciente
                        : '',
                }));

                if (element.cod_diag_cie) {
                    const index = dataCIE10.findIndex(
                        (item) => item.codigo_cie === element.cod_diag_cie
                    );
                    if (index !== -1) {
                        setSelectedCIE10(dataCIE10[index]);
                        setSelectedTextCIE10(
                            `${dataCIE10[index].codigo_cie} - ${dataCIE10[index].diagnostico}`
                        );
                    }
                }
            } else {
                setNuevo(true);
                setForm((prevState) => ({
                    ...prevState,
                    id_paciente: caso.pacientes[paciente].id_paciente,
                    id_evaluacionclinica: '',
                    fecha_horaevaluacion: moment().format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
                    cod_paciente: '',
                    cod_diag_cie: '',
                    diagnos_txt: '',
                    triage: '',
                    c_clinico: '',
                    examen_fisico: '',
                    tratamiento: '',
                    antecedentes: '',
                    paraclinicos: '',
                    sv_tx: '',
                    sv_fc: '',
                    sv_fr: '',
                    sv_temp: '',
                    sv_gl: '',
                    peso: '',
                    talla: '',
                    sv_fcf: '',
                    sv_sato2: '',
                    sv_apgar: '',
                    sv_gli: '',
                    usu_sede: '',
                    tipo_paciente: '',
                }));

                setSelectedCIE10(null);
                setSelectedTextCIE10('');
            }
        }
    }, [paciente]);

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

            <FormControl fullWidth size="small">
                <InputLabel id="paciente-label">
                    {t('etiquetas.seleccionpcte')}:
                </InputLabel>

                <Select
                    labelId="paciente-label"
                    id="paciente"
                    label={`${t('etiquetas.seleccionpcte')}:`}
                    value={paciente}
                    onChange={handleChangePaciente}
                >
                    <MenuItem value="" disabled>
                        {t('etiquetas.seleccionpcte')}
                    </MenuItem>

                    {caso.pacientes.map((item, index) => (
                        <MenuItem key={index} value={index}>
                            {item.nombre1} {item.nombre2} {item.apellido1}{' '}
                            {item.apellido2}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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
                            <InputMask
                                name="sv_tx"
                                value={form.sv_tx}
                                mask="(999)/(999) mmHg"
                                onChange={handleChangeForm}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="sv_tx"
                                    variant="outlined"
                                    label={`${t(
                                        'formularios.formevaluacion.ta'
                                    )}:`}
                                />
                            </InputMask>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <InputMask
                                name="sv_fc"
                                value={form.sv_fc}
                                mask="999 bpm"
                                onChange={handleChangeForm}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="sv_fc"
                                    variant="outlined"
                                    label={`${t(
                                        'formularios.formevaluacion.fc'
                                    )}:`}
                                />
                            </InputMask>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <InputMask
                                name="sv_fr"
                                value={form.sv_fr}
                                mask="99 rpm"
                                onChange={handleChangeForm}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="sv_fr"
                                    variant="outlined"
                                    label={`${t(
                                        'formularios.formevaluacion.fr'
                                    )}:`}
                                />
                            </InputMask>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                type="number"
                                variant="outlined"
                                name="sv_temp"
                                value={form.sv_temp}
                                onChange={handleChangeForm}
                                label={`${t('formularios.formevaluacion.to')}:`}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                type="number"
                                name="sv_gl"
                                variant="outlined"
                                value={form.sv_gl}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.glasgow'
                                )}:`}
                                onKeyUp={(e) => {
                                    if (e.target.value > 15) {
                                        e.target.value = 15;
                                    }
                                }}
                                onBlur={(e) => {
                                    if (
                                        e.target.value < 3 &&
                                        e.target.value != ''
                                    ) {
                                        e.target.value = 3;
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <InputMask
                                name="sv_sato2"
                                value={form.sv_sato2}
                                mask="999 %"
                                onChange={handleChangeForm}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="sv_sato2"
                                    variant="outlined"
                                    label={`${t(
                                        'formularios.formevaluacion.sp02'
                                    )}:`}
                                />
                            </InputMask>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <InputMask
                                name="sv_gli"
                                value={form.sv_gli}
                                mask="99 mg/dL"
                                onChange={handleChangeForm}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="sv_gli"
                                    variant="outlined"
                                    label={`${t(
                                        'formularios.formevaluacion.sp02'
                                    )}:`}
                                />
                            </InputMask>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="talla"
                                value={form.talla}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.talla'
                                )}:`}
                            />
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <TextField
                                fullWidth
                                size="small"
                                type="number"
                                variant="outlined"
                                name="peso"
                                value={form.peso}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.peso'
                                )}:`}
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="condicionpcte-label">
                                    {t(
                                        'formularios.formevaluacion.condicionpcte'
                                    )}
                                    :
                                </InputLabel>

                                <Select
                                    labelId="tipo_paciente-label"
                                    label={`${t(
                                        'formularios.formevaluacion.condicionpcte'
                                    )}:`}
                                    name="cod_paciente"
                                    value={form.cod_paciente}
                                    onChange={handleChangeForm}
                                    sx={{
                                        pl: 1,
                                        '&>div': { pl: 1 },
                                        '&::before': {
                                            backgroundColor:
                                                form.cod_paciente === ''
                                                    ? 'transparent'
                                                    : colourOptions[
                                                          colourOptions.findIndex(
                                                              (item) =>
                                                                  item.value ===
                                                                  form.cod_paciente
                                                          )
                                                      ].color,
                                            borderRadius: '10px',
                                            content: '" "',
                                            display: 'block',
                                            height: '10px',
                                            width: '13px',
                                        },
                                    }}
                                >
                                    {colourOptions.map((item) => (
                                        <MenuItem
                                            key={item.value}
                                            value={item.value}
                                            sx={{
                                                '&.Mui-selected': {
                                                    backgroundColor: item.color,
                                                    color:
                                                        chroma.contrast(
                                                            chroma(item.color),
                                                            'white'
                                                        ) > 2
                                                            ? 'white'
                                                            : 'black',
                                                },
                                                '&:hover': {
                                                    backgroundColor: chroma(
                                                        item.color
                                                    )
                                                        .alpha(0.3)
                                                        .css(),
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipo_paciente-label">
                                    {t('formularios.formevaluacion.tipopcte')}:
                                </InputLabel>

                                <Select
                                    labelId="tipo_paciente-label"
                                    label={`${t(
                                        'formularios.formevaluacion.tipopcte'
                                    )}:`}
                                    name="tipo_paciente"
                                    value={form.tipo_paciente}
                                    onChange={handleChangeForm}
                                >
                                    {dataTipos.map((item) => (
                                        <MenuItem
                                            key={item.id_tipopaciente}
                                            value={item.id_tipopaciente}
                                        >
                                            {item.nombre_tipopaciente}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack
                                direction="row"
                                sx={{ alignItems: 'flex-start' }}
                            >
                                <Autocomplete
                                    readOnly
                                    fullWidth
                                    size="small"
                                    open={false}
                                    value={selectedTextCIE10}
                                    options={[]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t(
                                                'formularios.formevaluacion.cie10'
                                            )}
                                        />
                                    )}
                                />

                                <common.BootstrapTooltip
                                    title={t('tabla.buscador')}
                                >
                                    <IconButton
                                        color="inherit"
                                        onClick={() => setOpenDialogCIE10(true)}
                                        sx={{
                                            borderRadius: '4px',
                                            backgroundColor: '#e0e0e0',
                                            '&:hover': {
                                                backgroundColor:
                                                    '#f5f5f5 !important',
                                            },
                                        }}
                                    >
                                        <SearchRoundedIcon />
                                    </IconButton>
                                </common.BootstrapTooltip>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                variant="outlined"
                                name="c_clinico"
                                value={form.c_clinico}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.cuadroclinico'
                                )}:`}
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                variant="outlined"
                                name="examen_fisico"
                                value={form.examen_fisico}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.examenfisico'
                                )}:`}
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                variant="outlined"
                                name="antecedentes"
                                value={form.antecedentes}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.antecedentes'
                                )}:`}
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                variant="outlined"
                                name="paraclinicos"
                                value={form.paraclinicos}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.paraclinicos'
                                )}:`}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                variant="outlined"
                                name="tratamiento"
                                value={form.tratamiento}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.tratamiento'
                                )}:`}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                variant="outlined"
                                name="diagnos_txt"
                                value={form.diagnos_txt}
                                onChange={handleChangeForm}
                                label={`${t(
                                    'formularios.formevaluacion.informaciondx'
                                )}:`}
                            />
                        </Grid>
                    </Grid>

                    <Stack direction="row" justifyContent="end">
                        <Button
                            variant="contained"
                            sx={{ flexGrow: 0 }}
                            color={nuevo ? 'success' : 'primary'}
                            onClick={nuevo ? PostEvaluaciones : PutEvaluaciones}
                        >
                            {t(nuevo ? 'etiquetas.crear' : 'etiquetas.guardar')}
                        </Button>
                    </Stack>
                </>
            )}

            <Dialog fullWidth open={openDialogCIE10}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t('formularios.formevaluacion.selectcie10')}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => setOpenDialogCIE10(false)}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent
                    dividers
                    sx={{
                        '.rdt_TableHeadRow > div': {
                            backgroundColor: '#40546a',
                        },
                    }}
                >
                    <DataTable
                        striped
                        columns={columnsCIE10}
                        data={filteredItemsCIE10}
                        pagination
                        paginationComponentOptions={
                            common.paginationComponentOptions
                        }
                        subHeader
                        subHeaderComponent={subHeaderComponentCIE10}
                        persistTableHead
                        fixedHeader
                        customStyles={common.customStyles}
                        highlightOnHover
                        selectableRows
                        selectableRowsSingle
                        onSelectedRowsChange={seleccionarCIE10}
                        noDataComponent={
                            <Typography sx={{ my: 2 }}>
                                {t('etiquetas.vacio')}
                            </Typography>
                        }
                    />
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        onClick={actualizarCIE10}
                        disabled={!selectedCIE10}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>

                    <Button
                        sx={{ mr: 1 }}
                        color="inherit"
                        variant="contained"
                        onClick={() => setOpenDialogCIE10(false)}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
