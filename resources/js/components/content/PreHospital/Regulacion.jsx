import {
    AppBar,
    Autocomplete,
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';

import common from '../../../common';

import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import DomainRoundedIcon from '@mui/icons-material/DomainRounded';
import TaxiAlertRoundedIcon from '@mui/icons-material/TaxiAlertRounded';

import DataTable from 'react-data-table-component';
import PhoneInput from 'react-phone-input-2';

import FormularioPaciente from './FormularioPaciente';
import FormularioEvaluacion from './FormularioEvaluacion';
import FormularioHospital from './FormularioHospital';

toast.configure();

const moment = require('moment');

const dataPreh = {
    telefono_confirma: '',
    llamada_fallida: 0,
    fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
    quepasa: '',
    incidente: '',
    direccion: '',
    nombre_reporta: '',
    prioridad: '',
    accion: '',
    caso_multiple: '',
};

export default () => {
    const [t, i18n] = useTranslation('global');
    const [openLoad, setOpenLoad] = useState(false);
    const [textLoad, setTextLoad] = useState('Cargando ...');

    const [data, setData] = useState([]);
    const [dataHospitales, setDataHospitales] = useState([]);
    const [dataAcciones, setDataAcciones] = useState([]);
    const [dataLlamadas, setDataLlamadas] = useState([]);
    const [dataIncidentes, setDataIncidentes] = useState([]);
    const [dataPrioridades, setDataPrioridades] = useState([]);
    const [dataTipoCierre, setDataTipoCierre] = useState([]);
    const [dataCIE10, setDataCIE10] = useState([]);
    const [dataTipos, setDataTipos] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogSeg, setOpenDialogSeg] = useState(false);
    const [openDialogArch, setOpenDialogArch] = useState(false);
    const [openDialogDesp, setOpenDialogDesp] = useState(false);
    const [openDialogCC, setOpenDialogCC] = useState(false);

    const [filterText, setFilterText] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [showForms, setShowForms] = useState(null);
    const [value, setValue] = useState(0);
    const [paciente, setPaciente] = useState('');
    const [hospital, setHospital] = useState(null);
    const [contenidoIncidente, setContenidoIncidente] = useState('');

    const [archivos, setArchivos] = useState([]);
    const [archivosNC, setArchivosNC] = useState([]);

    const [seguimiento, setSeguimiento] = useState('');
    const [nombrecierre, setNombrecierre] = useState('');
    const [nota, setNota] = useState('');

    const [errorCierre, setErrorCierre] = useState(false);
    const [helpCierre, setHelpCierre] = useState('');

    const filteredItems = data.filter(
        (item) =>
            (item.codigo &&
                item.codigo
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.fecha &&
                item.fecha.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.nombres_pacientes &&
                item.nombres_pacientes
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.direccion_preh &&
                item.direccion_preh
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_es &&
                item.nombre_es
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_prioridad &&
                item.nombre_prioridad
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_hospital &&
                item.nombre_hospital
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_medico &&
                item.nombre_medico
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.telefono &&
                item.telefono.toLowerCase().includes(filterText.toLowerCase()))
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) setFilterText('');
        };

        return (
            <Grid container justifyContent="space-between">
                <Grid item xs="auto">
                    <Stack spacing={1} direction="row">
                        <Button
                            variant="outlined"
                            startIcon={<LocalHospitalRoundedIcon />}
                            onClick={() => setOpenDialog(true)}
                        >
                            {t('etiquetas.nuevocaso')}
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<MapRoundedIcon />}
                        >
                            {t('etiquetas.mapa')}
                        </Button>
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
            name: `${t('unificado.tabla.datos.ncaso')}`,
            width: '105px',
            sortable: true,
            center: true,
            selector: (row) => row.codigo,
        },
        {
            name: `${t('unificado.tabla.datos.fecha')}`,
            width: '165px',
            sortable: true,
            selector: (row) => row.fecha,
        },
        {
            name: `${t('unificado.tabla.datos.tiempo')}`,
            width: '160px',
            cell: (row) => (
                <Box
                    sx={{ color: '#d32f2f' }}
                    onClick={() => handleRowClicked(row)}
                >
                    <AccessTimeRoundedIcon />{' '}
                    {`${Math.floor(
                        Math.abs(Date.parse(row.fecha) - new Date()) / 1000 / 60
                    )} MIN`}
                </Box>
            ),
        },
        {
            name: `${t('unificado.unido.formulario.pacientes')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombres_pacientes,
        },
        {
            name: `${t('unificado.unido.formulario.direccion')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.direccion_preh,
        },
        {
            name: `${t('unificado.unido.formulario.incidente')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombre_es,
        },
        {
            name: `${t('interhospital.tabla.datos.prioridad')}`,
            wrap: true,
            sortable: true,
            width: '120px',
            selector: (row) => row.nombre_prioridad,
        },
        {
            name: `${t('unificado.tabla.datos.hptldestino')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombre_hospital,
        },
        {
            name: `${t('unificado.unido.formulario.nombremedico')}`,
            wrap: true,
            sortable: true,
            minWidth: '150px',
            selector: (row) => row.nombre_medico,
        },
        {
            name: `${t('unificado.unido.formulario.telmedico')}`,
            wrap: true,
            sortable: true,
            minWidth: '180px',
            selector: (row) => row.telefono,
        },
        {
            name: `${t('unificado.tabla.datos.acciones')}`,
            width: '200px',
            center: true,
            cell: (row) => {
                return (
                    <Stack direction="row">
                        <common.BootstrapTooltip
                            title={t('unificado.tabla.datos.seguimiento')}
                        >
                            <IconButton
                                color="success"
                                onClick={() => {
                                    handleRowClickedButton(row);
                                    setOpenDialogSeg(true);
                                }}
                            >
                                <ReceiptLongRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>

                        <common.BootstrapTooltip
                            title={t('unificado.tabla.formulario.archivos')}
                        >
                            <IconButton
                                color="inherit"
                                onClick={() => {
                                    handleRowClickedButton(row);
                                    setOpenDialogArch(true);
                                }}
                            >
                                <BadgeRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>

                        {row.accion != 1 && (
                            <common.BootstrapTooltip
                                title={t('unificado.tabla.datos.despacho')}
                            >
                                <IconButton
                                    color="warning"
                                    onClick={() => {
                                        handleRowClickedButton(row);
                                        setOpenDialogDesp(true);
                                    }}
                                >
                                    <TaxiAlertRoundedIcon />
                                </IconButton>
                            </common.BootstrapTooltip>
                        )}

                        <common.BootstrapTooltip
                            title={t('etiquetas.cerrarcaso')}
                        >
                            <IconButton
                                color="error"
                                onClick={() => {
                                    handleRowClickedButton(row);
                                    setOpenDialogCC(true);
                                }}
                            >
                                <CancelRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>
                    </Stack>
                );
            },
        },
    ]);

    const [form, setForm] = useState(dataPreh);

    const loadData = async () => {
        setOpenLoad(true);

        await axios
            .get('/api/hospitalesgeneral')
            .then((response) => setDataHospitales(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/interh_accion')
            .then((response) => setDataAcciones(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/tipo_llamada')
            .then((response) => setDataLlamadas(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/incidentes')
            .then((response) => setDataIncidentes(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/interh_prioridad')
            .then((response) => setDataPrioridades(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/tipo_cierrecaso')
            .then((response) => setDataTipoCierre(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/cie10')
            .then((response) => setDataCIE10(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/tipo_paciente')
            .then((response) => setDataTipos(response.data))
            .catch((error) => console.log(error.data));

        fetchData();
    };

    const fetchData = async () => {
        await axios
            .get('/api/preh_maestro/habilitados')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error.data));

        setOpenLoad(false);
    };

    const handleRowClicked = (row) => {
        let select = row;
        setPaciente('');
        if (!selectedData) {
            setSelectedData(row);
            const updatedData = data.map((item) => {
                if (row.codigo !== item.codigo) {
                    return item;
                }

                return {
                    ...item,
                    toggleSelected: true,
                };
            });

            setData(updatedData);
        } else {
            if (row.codigo === selectedData.codigo) {
                select = null;
                setSelectedData(null);
                const updatedData = data.map((item) => {
                    if (row.codigo !== item.codigo) {
                        return item;
                    }

                    return {
                        ...item,
                        toggleSelected: false,
                    };
                });
                setData(updatedData);
            } else {
                setSelectedData(row);
                const updatedData = data.map((item) => {
                    if (selectedData.codigo === item.codigo) {
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
                setData(updatedData);
            }
        }
        setShowForms(select !== null);
    };

    const handleRowClickedButton = (row) => {
        if (!selectedData) {
            setSelectedData(row);
            const updatedData = data.map((item) => {
                if (row.codigo !== item.codigo) {
                    return item;
                }

                return {
                    ...item,
                    toggleSelected: true,
                };
            });

            setData(updatedData);
            setShowForms(true);
        } else {
            if (row.codigo !== selectedData.codigo) {
                setPaciente('');
                setSelectedData(row);
                const updatedData = data.map((item) => {
                    if (selectedData.codigo === item.codigo) {
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
                setData(updatedData);
            }
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const actualizar = () => {
        setShowForms(false);
        setSelectedData(null);
        fetchData();
    };

    const Post = async () => {
        setOpenLoad(true);
        await axios
            .post('/api/preh_maestro', form)
            .then((response) => {
                if (archivosNC.length > 0) {
                    let formData = new FormData();
                    for (let i = 0; i < archivosNC.length; i++) {
                        formData = new FormData();
                        formData.append('id_archivo', 1);
                        formData.append('archivo', archivosNC[i]);
                        formData.append('nombre_original', archivosNC[i].name);
                        formData.append(
                            'cod_casopreh',
                            response.data.cod_casopreh
                        );

                        const subirArchivos = async () => {
                            await axios({
                                url: '/api/archivo',
                                method: 'POST',
                                data: formData,
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });
                        };
                        subirArchivos();
                    }
                }
                actualizar();
                setOpenLoad(false);
                setOpenDialog(false);
                clearform();
                notificarExitoCaso(response.data.cod_casopreh);
            })
            .catch((error) => {
                setOpenLoad(false);
                notificarErrorCaso();
            });
    };

    const PostSeguimiento = async () => {
        setOpenLoad(true);
        await axios
            .post('/api/preh_seguimiento', {
                seguimento: seguimiento,
                cod_casopreh: selectedData.codigo,
                fecha_seguimento: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then((response) => {
                actualizar();
                closeDialogSeg();
                mostarSuccess('Seguimientos actualizados exitosamente');
            })
            .catch((error) => {
                setOpenLoad(false);
                mostarError('Ha ocurrido un error');
            });
    };

    const PostDespacho = async () => {
        setOpenLoad(true);
        await axios
            .put(`/api/preh_maestro/${selectedData.codigo}`, {
                accion: 1,
            })
            .then((response) => {
                actualizar();
                setOpenDialogDesp(false);
                mostarSuccess('Caso enviado a despacho de ambulancia');
            })
            .catch((error) => {
                setOpenLoad(false);
                mostarError('Ha ocurrido un error');
            });
    };

    const PostArchivos = async () => {
        setOpenLoad(true);
        let formData = new FormData();
        for (let i = 0; i < archivos.length; i++) {
            formData = new FormData();
            formData.append('id_archivo', 1);
            formData.append('archivo', archivos[i]);
            formData.append('cod_casopreh', selectedData.codigo);
            formData.append('nombre_original', archivos[i].name);

            await axios({
                url: '/api/archivo',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        setOpenLoad(false);
        actualizar();
        mostarSuccess('Archivos actualizados exitosamente');
        closeDialogArch();
    };

    const PostCerrarCaso = async () => {
        if (nombrecierre === '') {
            setErrorCierre(true);
            setHelpCierre('Este campo es obligatorio');
        } else {
            setOpenLoad(true);
            await axios
                .post('/api/preh_cierre', {
                    nombrecierre: nombrecierre,
                    cod_casopreh: selectedData.codigo,
                    nota: nota,
                })
                .then((response) => {
                    actualizar();
                    closeDialogCC();
                    mostarSuccess('Caso cerrado exitosamente');
                })
                .catch((error) => {
                    setOpenLoad(false);
                    mostarError('Ha ocurrido un error');
                });
        }
    };

    const clearform = () => {
        setContenidoIncidente('');
        setForm(dataPreh);
    };

    const closeDialog = () => {
        clearform();
        setOpenDialog(false);
    };

    const closeDialogSeg = () => {
        setSeguimiento('');
        setOpenDialogSeg(false);
    };

    const closeDialogArch = () => {
        setArchivos([]);
        setOpenDialogArch(false);
    };

    const closeDialogCC = () => {
        setNombrecierre('');
        setNota('');
        setOpenDialogCC(false);
    };

    const notificarExitoCaso = (idcaso) =>
        toast.success(`Nuevo caso con id ${idcaso} creado con éxito!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

    const notificarErrorCaso = () =>
        toast.error('Ha ocurrido un error en la creación del nuevo caso', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        dataIncidentes.map((servicio) => {
            if (servicio.id_incidente == form.incidente) {
                const extractScriptRegex =
                    /<script\b[^>]*>([\s\S]*?)<\/script>/gim;
                let scriptsExtracted;
                let innerHtml = servicio.incidente_es;
                while (
                    (scriptsExtracted = extractScriptRegex.exec(
                        servicio.incidente_es
                    ))
                ) {
                    innerHtml = innerHtml.replace(scriptsExtracted[0], '');
                    window.eval(scriptsExtracted[1]);
                }
                setContenidoIncidente(innerHtml);
            }
        });
    }, [form.incidente]);

    return (
        <>
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

            <h2>{t('unificado.unido.titulo')}</h2>

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

            {showForms && (
                <Box
                    sx={{
                        my: 2,
                        width: '100%',
                        border: 'solid 1px rgba(0, 0, 0, .12)',
                    }}
                >
                    <Box
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: '46px',
                            },
                            '& .Mui-selected': {
                                color: '#fff !important',
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                borderBottom: 'solid 1px rgba(0, 0, 0, .12)',
                                '& span.span': {
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                },
                            }}
                        >
                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<ManRoundedIcon />}
                                iconPosition="start"
                                label={
                                    <span className="span">
                                        {t('formularios.pacientes')}
                                    </span>
                                }
                                {...common.a11yProps(0)}
                            />

                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<MonitorHeartRoundedIcon />}
                                iconPosition="start"
                                label={
                                    <span className="span">
                                        {t('formularios.evaluacion')}
                                    </span>
                                }
                                {...common.a11yProps(1)}
                            />

                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<DomainRoundedIcon />}
                                iconPosition="start"
                                label={
                                    <span className="span">
                                        {t('formularios.hospital')}
                                    </span>
                                }
                                {...common.a11yProps(2)}
                            />
                        </Tabs>
                    </Box>

                    <common.TabPanel value={value} index={0}>
                        <FormularioPaciente
                            caso={selectedData}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            actualizar={actualizar}
                        />
                    </common.TabPanel>

                    <common.TabPanel value={value} index={1}>
                        <FormularioEvaluacion
                            caso={selectedData}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            dataCIE10={dataCIE10}
                            dataTipos={dataTipos}
                            actualizar={actualizar}
                        />
                    </common.TabPanel>

                    <common.TabPanel value={value} index={2}>
                        <FormularioHospital
                            caso={selectedData}
                            dataHospitales={dataHospitales}
                            actualizar={actualizar}
                        />
                    </common.TabPanel>
                </Box>
            )}

            {/************************* Nuevo caso *************************/}
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
                            {t('etiquetas.nuevocaso')}
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
                        <Grid
                            item
                            xs={6}
                            md={4}
                            lg={3}
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
                                country={common.codgoPais}
                                value={form.telefono_confirma}
                                specialLabel={`${t(
                                    'unificado.unido.formulario.telefono'
                                )}:`}
                                onChange={(value) =>
                                    setForm((prevState) => ({
                                        ...prevState,
                                        telefono_confirma: value,
                                    }))
                                }
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="llamada_fallida">
                                    {t('unificado.unido.formulario.llamadano')}:
                                </InputLabel>

                                <Select
                                    labelId="llamada_fallida"
                                    label={`${t(
                                        'unificado.unido.formulario.llamadano'
                                    )}:`}
                                    name="llamada_fallida"
                                    value={form.llamada_fallida}
                                    onChange={handleChangeForm}
                                >
                                    <MenuItem value={0}>
                                        -- {t('etiquetas.seleccion')} --
                                    </MenuItem>

                                    {dataLlamadas.map((item) => (
                                        <MenuItem
                                            key={item.id_llamda_f}
                                            value={item.id_llamda_f}
                                        >
                                            {item.llamada_fallida}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'unificado.unido.formulario.nombrereporta'
                                )}:`}
                                variant="outlined"
                                name="nombre_reporta"
                                value={form.nombre_reporta}
                                onChange={handleChangeForm}
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="incidente">
                                    {t('unificado.unido.formulario.incidente')}:
                                </InputLabel>

                                <Select
                                    labelId="incidente"
                                    label={`${t(
                                        'unificado.unido.formulario.incidente'
                                    )}:`}
                                    name="incidente"
                                    value={form.incidente}
                                    onChange={handleChangeForm}
                                >
                                    {dataIncidentes.map((item) => (
                                        <MenuItem
                                            key={item.id_incidente}
                                            value={item.id_incidente}
                                        >
                                            {item.nombre_es}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'unificado.unido.formulario.motivo'
                                )}:`}
                                variant="outlined"
                                name="quepasa"
                                value={form.quepasa}
                                onChange={handleChangeForm}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label={`${t(
                                    'unificado.unido.formulario.direccion'
                                )}:`}
                                variant="outlined"
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChangeForm}
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="accion">
                                    {t('unificado.unido.formulario.accion')}:
                                </InputLabel>

                                <Select
                                    labelId="accion"
                                    label={`${t(
                                        'unificado.unido.formulario.accion'
                                    )}:`}
                                    name="accion"
                                    value={form.accion}
                                    onChange={handleChangeForm}
                                >
                                    {dataAcciones.map((item) => (
                                        <MenuItem
                                            key={item.id_accion}
                                            value={item.id_accion}
                                        >
                                            {item.nombre_accion_es}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="prioridad">
                                    {t('unificado.unido.formulario.prioridad')}:
                                </InputLabel>

                                <Select
                                    labelId="prioridad"
                                    label={`${t(
                                        'unificado.unido.formulario.prioridad'
                                    )}:`}
                                    name="prioridad"
                                    value={form.prioridad}
                                    onChange={handleChangeForm}
                                >
                                    {dataPrioridades.map((item) => (
                                        <MenuItem
                                            key={item.id_prioridad}
                                            value={item.id_prioridad}
                                        >
                                            {item.nombre_prioridad}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={3} lg={2}>
                            <FormControl>
                                <FormLabel id="motivo">
                                    {`${t(
                                        'unificado.unido.formulario.multiple'
                                    )}:`}
                                </FormLabel>

                                <RadioGroup
                                    row
                                    aria-labelledby="motivo"
                                    name="caso_multiple"
                                    value={form.caso_multiple}
                                    onChange={handleChangeForm}
                                >
                                    <FormControlLabel
                                        label="Sí"
                                        value={1}
                                        control={<Radio size="small" />}
                                    />

                                    <FormControlLabel
                                        label="No"
                                        value={0}
                                        control={<Radio size="small" />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                            md={4}
                            lg={3}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <input
                                multiple
                                type="file"
                                label={`${t('etiquetas.adjuntar')}:`}
                                name="archivos[]"
                                onChange={(event) =>
                                    setArchivosNC(event.target.files)
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: contenidoIncidente,
                                }}
                            ></div>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ mb: 1 }}>
                    <Button variant="contained" onClick={Post}>
                        {t('etiquetas.agregar')}
                    </Button>

                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={closeDialog}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/************************* Seguimiento *************************/}
            <Dialog fullWidth open={openDialogSeg} onClose={closeDialogSeg}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t('unificado.tabla.formulario.seguimiento')}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={closeDialogSeg}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent dividers>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label={`${t(
                            'unificado.tabla.formulario.escribanota'
                        )}:`}
                        variant="outlined"
                        value={seguimiento}
                        onChange={(event) => setSeguimiento(event.target.value)}
                    />

                    {selectedData && (
                        <List
                            dense
                            disablePadding
                            sx={{ mt: 2 }}
                            subheader={
                                <ListSubheader
                                    disableGutters
                                    sx={{ fontWeight: 'bold', lineHeight: 1 }}
                                >
                                    {t('unificado.tabla.formulario.nota')}:
                                </ListSubheader>
                            }
                        >
                            {selectedData.seguimientos.map((item) => (
                                <ListItem
                                    divider
                                    disablePadding
                                    key={item.id_seguimiento}
                                    sx={{
                                        '& > div': { display: 'inline-flex' },
                                    }}
                                >
                                    <ListItemText
                                        primary={`${item.seguimento} ${' - '}`}
                                        secondary={item.fecha_seguimento}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>

                <DialogActions sx={{ mb: 1 }}>
                    <Button variant="contained" onClick={PostSeguimiento}>
                        {t('etiquetas.guardar')}
                    </Button>

                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={closeDialogSeg}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/************************* Archivo *************************/}
            <Dialog fullWidth open={openDialogArch} onClose={closeDialogArch}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t('unificado.tabla.formulario.archivos')}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={closeDialogArch}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent dividers>
                    <input
                        multiple
                        type="file"
                        label={`${t('etiquetas.adjuntar')}:`}
                        name="archivos[]"
                        onChange={(event) => setArchivos(event.target.files)}
                    />

                    {selectedData && (
                        <List
                            dense
                            disablePadding
                            sx={{ mt: 2 }}
                            subheader={
                                <ListSubheader
                                    disableGutters
                                    sx={{ fontWeight: 'bold', lineHeight: 1 }}
                                >
                                    {t('unificado.tabla.formulario.archivos')}:
                                </ListSubheader>
                            }
                        >
                            {selectedData.archivos.map((item) => (
                                <ListItemButton
                                    divider
                                    component="a"
                                    disableGutters
                                    key={item.id_archivo}
                                    href={item.nombre_archivo}
                                    download={item.nombre_original}
                                    sx={{
                                        color: '#0d6efd !important',
                                        '& > div': { display: 'inline-flex' },
                                    }}
                                >
                                    <ListItemText
                                        primary={item.nombre_original}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    )}
                </DialogContent>

                <DialogActions sx={{ mb: 1 }}>
                    <Button variant="contained" onClick={PostArchivos}>
                        {t('etiquetas.subir')}
                    </Button>

                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={closeDialogArch}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/************************* Cerrar caso *************************/}
            <Dialog fullWidth open={openDialogCC} onClose={closeDialogCC}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t('unificado.tabla.formulario.cerrarcaso')}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={closeDialogCC}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent dividers>
                    <FormControl
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        error={errorCierre}
                    >
                        <InputLabel id="cierre">
                            {t('interhospital.tabla.formulario.tipocierre')}:
                        </InputLabel>

                        <Select
                            labelId="cierre"
                            label={`${t(
                                'unificado.tabla.formulario.tipocierre'
                            )}:`}
                            value={nombrecierre}
                            onChange={(event) => {
                                if (errorCierre) setErrorCierre(false);
                                setNombrecierre(event.target.value);
                            }}
                        >
                            {dataTipoCierre.map((item) => (
                                <MenuItem
                                    key={item.id_tranlado_fallido}
                                    value={item.id_tranlado_fallido}
                                >
                                    {item.tipo_cierrecaso_es}
                                </MenuItem>
                            ))}
                        </Select>

                        <FormHelperText>{helpCierre}</FormHelperText>
                    </FormControl>

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        label={`${t(
                            'unificado.tabla.formulario.razoncierre'
                        )}:`}
                        value={nota}
                        onChange={(event) => setNota(event.target.value)}
                    />
                </DialogContent>

                <DialogActions sx={{ mb: 1 }}>
                    <Button variant="contained" onClick={PostCerrarCaso}>
                        {t('etiquetas.aceptar')}
                    </Button>

                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={closeDialogCC}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/************************* Despacho ambulancia *************************/}
            <Dialog
                fullWidth
                open={openDialogDesp}
                onClose={() => setOpenDialogDesp(false)}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t('unificado.tabla.formulario.enviar')}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => setOpenDialogDesp(false)}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent dividers>
                    <DialogContentText sx={{ textAlign: 'center' }}>
                        {t('unificado.tabla.formulario.enviardespacho')}
                        <br />
                        <Typography
                            align="center"
                            component="span"
                            sx={{ fontWeight: 'bold', marginTop: 1 }}
                        >
                            {t('unificado.tabla.formulario.irreversible')}
                        </Typography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ mb: 1 }}>
                    <Button variant="contained" onClick={PostDespacho}>
                        {t('etiquetas.aceptar')}
                    </Button>

                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => setOpenDialogDesp(false)}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
