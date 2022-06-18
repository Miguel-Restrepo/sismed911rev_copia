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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';

import DataTable from 'react-data-table-component';
import jsPDF from "jspdf";
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
    const [fechaInicio, setFechaInicio] = useState('2001-04-01');
    const [fechaFin, setFechaFin] = useState('2022-04-01');
    const [data, setData] = useState([]);

    const [filterText, setFilterText] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [showForms, setShowForms] = useState(null);
    const [paciente, setPaciente] = useState('');



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
            name: `${t('formularios.formpacientes.telefono')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.telefonointerh,
        },
        {
            name: `${t('interhospital.tabla.datos.tipo_servicio')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombre_tiposervicion_es,
        },
        {
            name: `${t('interhospital.interhospital.datos.nombreres')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nombrereportainterh,
        },
        {
            name: `${t('interhospital.tabla.formulario.nota')}`,
            wrap: true,
            sortable: true,
            minWidth: '200px',
            selector: (row) => row.nota,
        },

        {
            name: `${t('unificado.tabla.datos.acciones')}`,
            width: '150px',
            center: true,
            cell: (row) => {
                return (
                    <Stack direction="row">
                        <common.BootstrapTooltip title="Reporte Interhospitalario">
                            <IconButton color="inherit"
                                onClick={() => {
                                    generatePDFReporteInterhospital(row);
                                }}>
                                <ReceiptLongRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>

                    </Stack>
                );
            },
        },
    ]);


    const loadData = async () => {
        setOpenLoad(true);



        fetchData();
    };

    const fetchData = async () => {
        await axios
            .get('/api/interh_maestro/cerrados')
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







    const generatePDFReporteInterhospital = (row) => {
        let img = new Image();
        img.src = 'assets/image.jpg';
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        img.onload = function () {
            doc.addImage(img, 'JPEG', 35, 25, 109, 34);
            //doc.setFont("bold");
            doc.text(432, 35, 'Reporte Interhospitalario');
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            let fecha = new Date();

            doc.text(441, 45, 'Fecha de Reporte: ' + fecha.toLocaleDateString());
            doc.setLineWidth(15.0);
            doc.setDrawColor(12, 82, 119);
            doc.line(30, 70, 560, 70);
            doc.setLineWidth(1.0);
            doc.setDrawColor(0, 0, 0);
            doc.rect(30, 90, 530, 160); //     
            doc.rect(30, 260, 530, 160); //
            doc.rect(30, 430, 530, 220); // 
            doc.rect(30, 660, 530, 160); // 

            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");

            doc.text(45, 87, 'Solicitud');
            doc.text(45, 257, 'Paciente');
            doc.text(45, 427, 'Evaluación clinica');
            doc.text(45, 657, 'Informacion DX');

            //DATOS
            doc.setFontSize(9);
            //1°
            doc.setFont("helvetica", "bold");

            doc.setFont("helvetica", "normal");

            //2°
            doc.setFont("helvetica", "bold");

            doc.setFont("helvetica", "normal");



            //3°
            doc.setFont("helvetica", "bold");

            doc.setFont("helvetica", "normal");

            //4°

            doc.setFont("helvetica", "normal");



            doc.save('ReporteInterhospitalario.pdf');
        }
    };
    const handleChangeFormNuevoFechaInicio = (value) => {
        setFechaInicio(value.format('YYYY-MM-DD'));
    };
    const handleChangeFormNuevoFechaFin = (value) => {
        setFechaFin(value.format('YYYY-MM-DD'));
    };
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        const updatedData = data.filter(
            (item) =>
            (new Date(item.fechahorainterh).getTime()>= new Date(fechaInicio).getTime()) && (new Date(item.fechahorainterh).getTime()<= new Date(fechaFin).getTime()));
                console.log()
        setData(updatedData);
    }, [fechaInicio, fechaFin]);
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

            <Card style={{ border: "3px solid #176b82", borderRadius: "20px" }}>
                <CardContent>
                    <Grid
                        container
                        noValidate
                        spacing={2}
                        sx={{ my: 2 }}
                        component="form"
                        autoComplete="off"
                    >
                        <Grid item xs={6} md={3} lg={2}>
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                locale={common.locale}
                            >
                                <MobileDatePicker
                                    showTodayButton
                                    label={t("interhospital.trasladointerh.fechaini")}
                                    okText={t('etiquetas.aceptar')}
                                    cancelText={t('etiquetas.cancelar')}
                                    todayText={t('etiquetas.hoy')}
                                    value={moment(fechaInicio)}

                                    onChange={handleChangeFormNuevoFechaInicio}
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
                        <Grid item xs={6} md={3} lg={2}>
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                locale={common.locale}
                            >
                                <MobileDatePicker
                                    showTodayButton
                                    label={t("interhospital.trasladointerh.fechafin")}
                                    okText={t('etiquetas.aceptar')}
                                    cancelText={t('etiquetas.cancelar')}
                                    todayText={t('etiquetas.hoy')}
                                    value={moment(fechaFin)}

                                    onChange={handleChangeFormNuevoFechaFin}
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
                    </Grid>
                </CardContent>

            </Card>

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









        </>
    );
};
