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
        console.log(row);
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
            //doc.text(45, 657, 'Informacion DX');

            //DATOS
            doc.setFontSize(9);
            //1°
            doc.setFont("helvetica", "bold");
            doc.text(65, 122, 'Teléfono');
            doc.text(195, 122, 'Tipo Servicio');
            doc.text(375, 122, 'Nombre quien reporta');
            doc.text(65, 162, 'Hospital de origen');
            doc.text(65, 202, 'Motivo de atención');
            doc.text(245, 202, 'Solicitud');
            doc.text(65, 242, 'Acción');
            doc.text(245, 242, 'Prioridad');
            doc.rect(50, 98, 130, 15); //     tell
            doc.rect(185, 98, 170, 15); //     tipo
            doc.rect(370, 98, 160, 15); //     no,mbre
            doc.rect(50, 138, 480, 15); //     hospi
            doc.rect(50, 178, 170, 15); //     motivo
            doc.rect(230, 178, 270, 15); //     soli
            doc.rect(50, 218, 170, 15); //     accin
            doc.rect(240, 218, 100, 15); //     prio
            doc.setFont("helvetica", "normal");
            doc.text(65, 110, (row.telefono + '').replace('null', ''));
            doc.text(195, 110, (row.tipo_serviciointerh + '').replace('null', ''));
            doc.text(375, 110, (row.nombrereportainterh + '').replace('null', ''));
            doc.text(65, 150, (row.nombre_hospital + '').replace('null', ''));
            doc.text(65, 190, (row.nombre_motivo_en + '').replace('null', ''));
            //doc.text(245, 202, 'Solicitud');
            doc.text(65, 230, (row.nombre_accion_es + '').replace('null', ''));
            doc.text(245, 230, (row.prioridadinterh + '').replace('null', ''));

            //2°
            doc.setFont("helvetica", "bold");
            doc.text(65, 292, 'Tipo Doc.');
            doc.text(165, 292, 'No Doc.');
            doc.text(270, 292, 'Fecha Nacimiento');
            doc.text(385, 292, 'Edad');
            doc.text(65, 322, 'Nombres');
            doc.text(270, 322, 'Apellidos');
            doc.text(65, 352, 'Genero');
            doc.text(165, 352, 'Nacionalidad');
            doc.text(270, 352, 'Teléfono');
            doc.text(65, 382, 'Seguro');
            doc.text(270, 382, 'Dirección');
            doc.text(65, 412, 'Observaciones');
            doc.rect(50, 268, 90, 15);//tipo
            doc.rect(150, 268, 90, 15);//no
            doc.rect(255, 268, 90, 15);//fecha
            doc.rect(360, 268, 130, 15);//edad
            doc.rect(50, 298, 200, 15);//nombre
            doc.rect(255, 298, 270, 15);//apellido
            doc.rect(50, 328, 90, 15);//genero
            doc.rect(150, 328, 90, 15);//naci
            doc.rect(255, 328, 270, 15);//telefono
            doc.rect(50, 358, 200, 15);//seguro
            doc.rect(255, 358, 270, 15);//direccion
            doc.rect(50, 388, 480, 15);//observaciones
            doc.setFont("helvetica", "normal");
            if (row.pacientes[0] != null) {
                doc.text(65, 280, (row.pacientes[0].descripcion + '').replace('null', ''));
                doc.text(165, 280, (row.pacientes[0].num_doc + '').replace('null', ''));
                doc.text(270, 280, (row.pacientes[0].fecha_nacido + '').replace('null', ''));
                doc.text(385, 280, (row.pacientes[0].edad + row.pacientes[0].nombre_edad + '').replace('null', ''));
                doc.text(65, 310, (row.pacientes[0].nombre1 + row.pacientes[0].nombre2 + '').replace('null', ''));
                doc.text(270, 310, (row.pacientes[0].apellido1 + row.pacientes[0].apellido2 + '').replace('null', ''));
                doc.text(65, 340, (row.pacientes[0].nombre_genero + '').replace('null', ''));
                doc.text(165, 340, (row.pacientes[0].nacionalidad + '').replace('null', ''));
                doc.text(270, 340, (row.pacientes[0].celular + '').replace('null', ''));
                doc.text(65, 370, (row.pacientes[0].nss + '').replace('null', ''));
                doc.text(270, 370, (row.pacientes[0].direccion + '').replace('null', ''));
                doc.text(65, 400, (row.pacientes[0].observacion + '').replace('null', ''));
            }




            //3°
            doc.setFont("helvetica", "bold");
            doc.text(80, 462, 'T.A');
            doc.text(159, 462, 'F.C');
            doc.text(223, 462, 'F.R');
            doc.text(277, 462, 'Glasgow');
            doc.text(351, 462, 'Sp02');
            doc.text(405, 462, 'Glicemia');
            doc.text(465, 462, 'Talla');
            doc.text(65, 492, 'Condicion Paciente');
            doc.text(255, 492, 'Tipo de Paciente');
            doc.text(65, 518, 'Cuadro Clínico');
            doc.text(65, 544, 'Examen Físico');
            doc.text(65, 570, 'Antecedentes');
            doc.text(65, 596, 'Paraclinicos');
            doc.text(65, 622, 'Tratamiento');
            doc.text(65, 647, 'Informacion DX');
            doc.rect(50, 438, 70, 15);//ta
            doc.rect(134, 438, 60, 15);//fc
            doc.rect(203, 438, 60, 15);//fr
            doc.rect(267, 438, 60, 15);//glasa
            doc.rect(336, 438, 55, 15);//sp
            doc.rect(400, 438, 60, 15);//gli
            doc.rect(465, 438, 60, 15);//takk
            doc.rect(50, 468, 170, 15);//cond
            doc.rect(250, 468, 250, 15);//tipo
            doc.rect(50, 494, 480, 15);//cuadro
            doc.rect(50, 520, 480, 15);//examen
            doc.rect(50, 546, 480, 15);//antece
            doc.rect(50, 572, 480, 15);//para
            doc.rect(50, 598, 480, 15);//tra
            doc.rect(50, 623, 480, 15);//dx
            doc.setFont("helvetica", "normal");
            if (row.evaluaciones_clinicas[0] != null) {
                doc.text(80, 450, (row.evaluaciones_clinicas[0].sv_temp + '').replace('null', ''));
                doc.text(159, 450, (row.evaluaciones_clinicas[0].sv_fc + '').replace('null', ''));
                doc.text(223, 450, (row.evaluaciones_clinicas[0].sv_fr + '').replace('null', ''));
                doc.text(277, 450, (row.evaluaciones_clinicas[0].sv_gl + '').replace('null', ''));
                doc.text(351, 450, (row.evaluaciones_clinicas[0].sv_sato2 + '').replace('null', ''));
                doc.text(405, 450, (row.evaluaciones_clinicas[0].sv_gli + '').replace('null', ''));
                doc.text(465, 450, (row.evaluaciones_clinicas[0].talla + '').replace('null', ''));
                doc.text(65, 480, (row.evaluaciones_clinicas[0].cod_paciente + '').replace('null', ''));
                doc.text(255, 480, (row.evaluaciones_clinicas[0].tipo_paciente + '').replace('null', ''));
                doc.text(65, 506, (row.evaluaciones_clinicas[0].c_clinico + '').replace('null', ''));
                doc.text(65, 532, (row.evaluaciones_clinicas[0].examen_fisico + '').replace('null', ''));
                doc.text(65, 558, (row.evaluaciones_clinicas[0].antecedentes + '').replace('null', ''));
                doc.text(65, 584, (row.evaluaciones_clinicas[0].paraclinicos + '').replace('null', ''));
                doc.text(65, 610, (row.evaluaciones_clinicas[0].tratamiento + '').replace('null', ''));
                doc.text(65, 635, (row.evaluaciones_clinicas[0].sv_tx + '').replace('null', ''));
            }

            //4°
            doc.setFont("helvetica", "bold");
            doc.text(65, 692, 'Hospital Destino');
            doc.text(65, 722, 'Hora');
            doc.text(195, 722, 'Nombre Médico');
            doc.text(375, 722, 'Teléfono');
            doc.text(65, 752, 'Ambulancias');
            doc.text(165, 752, 'H. Asignación');
            doc.text(270, 752, 'H. Llegada');
            doc.text(385, 752, 'H. Destino');
            doc.text(65, 782, 'H.Base.');
            doc.text(165, 782, 'Téc T.S');
            doc.text(270, 782, 'Médico');
            doc.text(385, 782, 'Téc. de emer');
            doc.text(65, 812, 'Notas');
            doc.rect(50, 668, 480, 15);//hos
            doc.rect(50, 698, 130, 15); //     hora
            doc.rect(185, 698, 170, 15); //     nombre
            doc.rect(370, 698, 160, 15); //     tele
            doc.rect(50, 728, 90, 15);//ambu
            doc.rect(150, 728, 90, 15);//asig
            doc.rect(255, 728, 90, 15);//llega
            doc.rect(360, 728, 130, 15);//destin
            doc.rect(50, 758, 90, 15);//base
            doc.rect(150, 758, 90, 15);//ts
            doc.rect(255, 758, 90, 15);//medico
            doc.rect(360, 758, 130, 15);//emer
            doc.rect(50, 788, 480, 15);//notas
            doc.setFont("helvetica", "normal");
            doc.text(65, 680, (row.destino_nombre_hospital + '').replace('null', ''));
            doc.text(65, 710, (row.soloHora + '').replace('null', ''));
            doc.text(195, 710, (row.destino_nombre_responsable + '').replace('null', ''));
            doc.text(375, 710, (row.destino_telefono + '').replace('null', ''));
            doc.text(65, 740, (row.cod_ambulancia + '').replace('null', ''));
            doc.text(165, 740, (row.hora_asigna + '').replace('null', ''));
            doc.text(270, 740, (row.hora_llegada + '').replace('null', ''));
            doc.text(385, 740, (row.hora_destino + '').replace('null', ''));
            doc.text(65, 770, (row.hora_preposicion + '').replace('null', ''));
            doc.text(165, 770, (row.conductor + '').replace('null', ''));
            doc.text(270, 770, (row.medico + '').replace('null', ''));
            doc.text(385, 770, (row.paramedico + '').replace('null', ''));
            doc.text(65, 800, (row.nota + '').replace('null', ''));




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
                (new Date(item.fechahorainterh).getTime() >= new Date(fechaInicio).getTime()) && (new Date(item.fechahorainterh).getTime() <= new Date(fechaFin).getTime()));
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
