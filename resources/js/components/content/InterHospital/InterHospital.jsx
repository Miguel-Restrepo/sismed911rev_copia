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
import FormularioAmbulancia from './FormularioAmbulancia';

toast.configure();

const moment = require('moment');

const dataInterH = {
    telefonointerh: '',
    llamada_fallida: 0,
    tipo_serviciointerh: '',
    nombrereportainterh: '',
    hospital_origneinterh: '',
    motivo_atencioninteh: '',
    motivo_traslado: '',
    id_imagendx: '',
    direccion: '',
    accioninterh: '',
    prioridadinterh: '',
    fechahorainterh: moment().format('YYYY-MM-DD HH:mm:ss'),
};

export default () => {
    const [t, i18n] = useTranslation('global');
    const [openLoad, setOpenLoad] = useState(false);
    const [textLoad, setTextLoad] = useState('Cargando ...');

    const [data, setData] = useState([]);
    const [dataServicios, setDataServicios] = useState([]);
    const [dataHospitales, setDataHospitales] = useState([]);
    const [dataMotivos, setDataMotivos] = useState([]);
    const [dataAcciones, setDataAcciones] = useState([]);
    const [dataLlamadas, setDataLlamadas] = useState([]);
    const [dataImagenesDX, setDataImagenesDX] = useState([]);
    const [dataPrioridades, setDataPrioridades] = useState([]);
    const [dataTipoCierre, setDataTipoCierre] = useState([]);
    const [dataCIE10, setDataCIE10] = useState([]);
    const [dataTipos, setDataTipos] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogSeg, setOpenDialogSeg] = useState(false);
    const [openDialogArch, setOpenDialogArch] = useState(false);
    const [openDialogCC, setOpenDialogCC] = useState(false);

    const [filterText, setFilterText] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [showForms, setShowForms] = useState(null);
    const [value, setValue] = useState(0);
    const [paciente, setPaciente] = useState('');
    const [hospital, setHospital] = useState(null);

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
            (item.fechahorainterh &&
                item.fechahorainterh
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombres_pacientes &&
                item.nombres_pacientes
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_hospital &&
                item.nombre_hospital
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.destino_nombre_hospital &&
                item.destino_nombre_hospital
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_prioridad &&
                item.nombre_prioridad
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.nombre_accion_es &&
                item.nombre_accion_es
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
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
            name: `${t('interhospital.tabla.datos.ncaso')}`,
            width: '105px',
            sortable: true,
            center: true,
            selector: (row) => row.codigo,
        },
        {
            name: `${t('interhospital.tabla.datos.fecha')}`,
            width: '165px',
            sortable: true,
            selector: (row) => row.fechahorainterh,
        },
        {
            name: `${t('interhospital.tabla.datos.tiempo')}`,
            width: '130px',
            cell: (row) => (
                <Box
                    sx={{ color: '#d32f2f' }}
                    onClick={() => handleRowClicked(row)}
                >
                    <AccessTimeRoundedIcon />{' '}
                    {`${Math.floor(
                        Math.abs(Date.parse(row.fechahorainterh) - new Date()) /
                            1000 /
                            60
                    )} MIN`}
                </Box>
            ),
        },
        {
            name: `${t('interhospital.tabla.datos.pacientes')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombres_pacientes,
        },
        {
            name: `${t('interhospital.tabla.datos.hptlorigen')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombre_hospital,
        },
        {
            name: `${t('interhospital.tabla.datos.hptldestino')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.destino_nombre_hospital,
        },
        {
            name: `${t('interhospital.tabla.datos.prioridad')}`,
            wrap: true,
            sortable: true,
            width: '120px',
            selector: (row) => row.nombre_prioridad,
        },
        {
            name: `${t('interhospital.tabla.datos.accion')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombre_accion_es,
        },
        {
            name: `${t('unificado.tabla.datos.acciones')}`,
            width: '150px',
            center: true,
            cell: (row) => {
                return (
                    <Stack direction="row">
                       
                        <common.BootstrapTooltip title="Seguimiento">
                            <IconButton
                                color="inherit"
                                onClick={() => {
                                    handleRowClickedButton(row);
                                    setOpenDialogSeg(true);
                                }}
                            >
                                <ReceiptLongRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>

                        <common.BootstrapTooltip title="Archivos">
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

                        <common.BootstrapTooltip title="Cerrar caso">
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

    const [form, setForm] = useState(dataInterH);

    const loadData = async () => {
        setOpenLoad(true);

        await axios
            .get('/api/interh_tiposervicio')
            .then((response) => setDataServicios(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/hospitalesgeneral')
            .then((response) => setDataHospitales(response.data))
            .catch((error) => console.log(error.data));

        await axios
            .get('/api/interh_motivoatencion')
            .then((response) => setDataMotivos(response.data))
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
            .get('/api/imagendx')
            .then((response) => setDataImagenesDX(response.data))
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
            .get('/api/interh_maestro/habilitados')
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
            .post('/api/interh_maestro', form)
            .then((response) => {
                if (archivosNC.length > 0) {
                    let formData = new FormData();
                    for (let i = 0; i < archivosNC.length; i++) {
                        formData = new FormData();
                        formData.append('id_archivo', 1);
                        formData.append('archivo', archivosNC[i]);
                        formData.append('nombre_original', archivosNC[i].name);
                        formData.append(
                            'cod_casointerh',
                            response.data.cod_casointerh
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
                notificarExitoCaso(response.data.cod_casointerh);
            })
            .catch((error) => {
                setOpenLoad(false);
                notificarErrorCaso();
            });
    };

    const PostSeguimiento = async () => {
        setOpenLoad(true);
        await axios
            .post('/api/interh_seguimiento', {
                seguimento: seguimiento,
                cod_casointerh: selectedData.codigo,
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

    const PostArchivos = async () => {
        setOpenLoad(true);
        let formData = new FormData();
        for (let i = 0; i < archivos.length; i++) {
            formData = new FormData();
            formData.append('id_archivo', 1);
            formData.append('archivo', archivos[i]);
            formData.append('cod_casointerh', selectedData.codigo);
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
                .post('/api/interh_cierre', {
                    nombrecierre: nombrecierre,
                    cod_casointerh: selectedData.codigo,
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
        setHospital(null);
        setForm(dataInterH);
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
        toast.success(` Nuevo caso con id ${idcaso} creado con éxito!`, {
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
        toast.error('  Ha ocurrido un error en la creación del nuevo caso', {
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

            <h2>{t('interhospital.interhospital.titulo')}</h2>

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

                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<TaxiAlertRoundedIcon />}
                                iconPosition="start"
                                label={
                                    <span className="span">
                                        {t('formularios.ambulancia')}
                                    </span>
                                }
                                {...common.a11yProps(3)}
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

                    <common.TabPanel value={value} index={3}>
                        <FormularioAmbulancia
                            caso={selectedData}
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
                                specialLabel={`${t(
                                    'formularios.formpacientes.telefono'
                                )}:`}
                                value={form.telefonointerh}
                                country={common.codgoPais}
                                onChange={(value) =>
                                    setForm((prevState) => ({
                                        ...prevState,
                                        telefonointerh: value,
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
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipo_serviciointerh">
                                    {t(
                                        'interhospital.interhospital.datos.tiposervicios'
                                    )}
                                    :
                                </InputLabel>

                                <Select
                                    labelId="tipo_serviciointerh"
                                    label={`${t(
                                        'interhospital.interhospital.datos.tiposervicios'
                                    )}:`}
                                    name="tipo_serviciointerh"
                                    value={form.tipo_serviciointerh}
                                    onChange={handleChangeForm}
                                >
                                    {dataServicios.map((item) => (
                                        <MenuItem
                                            key={item.id_tiposervicion}
                                            value={item.id_tiposervicion}
                                        >
                                            {item.nombre_tiposervicion_es}
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
                                    'interhospital.interhospital.datos.nombreres'
                                )}:`}
                                variant="outlined"
                                name="nombrereportainterh"
                                value={form.nombrereportainterh}
                                onChange={handleChangeForm}
                            />
                        </Grid>

                        <Grid item xs={12} md={8} lg={12}>
                            <Autocomplete
                                fullWidth
                                size="small"
                                value={hospital}
                                options={dataHospitales}
                                getOptionLabel={(option) =>
                                    `${option.nombre_hospital} - ${option.nombre_provincia}`
                                }
                                onChange={(event, newValue) => {
                                    setHospital(newValue);
                                    setForm((prevState) => ({
                                        ...prevState,
                                        hospital_origneinterh: newValue
                                            ? newValue.id_hospital
                                            : '',
                                    }));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={`${t(
                                            'interhospital.interhospital.datos.hptlorigen'
                                        )}:`}
                                    />
                                )}
                            />
                        </Grid>

                        {form.tipo_serviciointerh == 1 && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <FormControl>
                                        <FormLabel id="motivo">
                                            {`${t(
                                                'interhospital.interhospital.datos.motivoatencion'
                                            )}:`}
                                        </FormLabel>

                                        <RadioGroup
                                            row
                                            aria-labelledby="motivo"
                                            name="motivo_atencioninteh"
                                            value={form.motivo_atencioninteh}
                                            onChange={handleChangeForm}
                                        >
                                            {dataMotivos.map((item) => (
                                                <FormControlLabel
                                                    key={item.id_motivoatencion}
                                                    label={
                                                        item.nombre_motivo_es
                                                    }
                                                    value={
                                                        item.id_motivoatencion
                                                    }
                                                    control={
                                                        <Radio size="small" />
                                                    }
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    sx={{ mt: { xs: 0, md: 2 } }}
                                >
                                    {(form.motivo_atencioninteh == 1 ||
                                        form.motivo_atencioninteh == 2) && (
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="motivo_traslado">
                                                {t(
                                                    'unificado.unido.formulario.motivosolicitud'
                                                )}
                                                :
                                            </InputLabel>

                                            <Select
                                                labelId="motivo_traslado"
                                                label={`${t(
                                                    'unificado.unido.formulario.motivosolicitud'
                                                )}:`}
                                                name="motivo_traslado"
                                                value={form.motivo_traslado}
                                                onChange={handleChangeForm}
                                            >
                                                <MenuItem value="Falta de UCI">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltauci'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="Falta de la especialidad requerida">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaespecial'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="Falta de espacio en hospitalzacion">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaespacio'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="Falta de estudios de imágenes requerido">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaestudios'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="Falta de UCIN">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaucin'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="Falta de unidad de quemados">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaquemados'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="Traslado desde el Domicilio">
                                                    {t(
                                                        'interhospital.interhospital.datos.traslado'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="Falta de unidad COVID">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltacovid'
                                                    )}
                                                </MenuItem>

                                                <MenuItem value="otro">
                                                    {t(
                                                        'interhospital.interhospital.datos.otro'
                                                    )}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}

                                    {form.motivo_atencioninteh == 4 && (
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="id_imagendx">
                                                {t(
                                                    'interhospital.interhospital.datos.imagenesdx'
                                                )}
                                                :
                                            </InputLabel>

                                            <Select
                                                labelId="id_imagendx"
                                                label={`${t(
                                                    'interhospital.interhospital.datos.imagenesdx'
                                                )}:`}
                                                name="id_imagendx"
                                                value={form.id_imagendx}
                                                onChange={handleChangeForm}
                                            >
                                                {dataImagenesDX.map((item) => (
                                                    <MenuItem
                                                        key={item.id_imagendx}
                                                        value={item.id_imagendx}
                                                    >
                                                        {
                                                            item.nombre_imagendx_es
                                                        }
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Grid>
                            </>
                        )}

                        {form.tipo_serviciointerh == 2 && (
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label={`${t(
                                        'interhospital.interhospital.datos.direccionorigen'
                                    )}:`}
                                    variant="outlined"
                                    name="direccion"
                                    value={form.direccion}
                                    onChange={handleChangeForm}
                                />
                            </Grid>
                        )}

                        <Grid item xs={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="accioninterh">
                                    {t(
                                        'interhospital.interhospital.datos.accion'
                                    )}
                                    :
                                </InputLabel>

                                <Select
                                    labelId="accioninterh"
                                    label={`${t(
                                        'interhospital.interhospital.datos.accion'
                                    )}:`}
                                    name="accioninterh"
                                    value={form.accioninterh}
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

                        <Grid item xs={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="prioridadinterh">
                                    {t(
                                        'interhospital.interhospital.datos.prioridad'
                                    )}
                                    :
                                </InputLabel>

                                <Select
                                    labelId="prioridadinterh"
                                    label={`${t(
                                        'interhospital.interhospital.datos.prioridad'
                                    )}:`}
                                    name="prioridadinterh"
                                    value={form.prioridadinterh}
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
                            {t('interhospital.tabla.datos.seguimiento')}
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
                            'interhospital.tabla.formulario.escribanota'
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
                                    {t('interhospital.tabla.formulario.nota')}:
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
                            {t('interhospital.tabla.formulario.archivos')}
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
                                    {t(
                                        'interhospital.tabla.formulario.archivos'
                                    )}
                                    :
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
                            {t('etiquetas.cerrarcaso')}
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
                                'interhospital.tabla.formulario.tipocierre'
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
                        label={`${t('interhospital.tabla.formulario.razon')}:`}
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
        </>
    );
};
