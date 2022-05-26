import {
    AppBar,
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    Grid,
    IconButton,
    Stack,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from '@mui/material';

import common from '../../../common';

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
import jsPDF from "jspdf";
import "jspdf-autotable";
import DataTable from 'react-data-table-component';
//import FormularioPaciente from './FormularioPaciente';

export default () => {

    const [t, i18n] = useTranslation('global');
    const [openLoad, setOpenLoad] = useState(false);
    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [showForms, setShowForms] = useState(null);
    const [value, setValue] = useState(0);
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
            width: '100px',
            selector: (row) => row.codigo,
        },
        {
            name: `${t('eclinical.admision.datos.nombre1')}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.nombre1,
        },
        {
            name: `${t('eclinical.admision.datos.nombre2')}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.nombre2,
        },
        {
            name: `${t('eclinical.admision.datos.apellido1')}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.apellido1,
        },
        {
            name: `${t('eclinical.admision.datos.apellido2')}`,
            sortable: true,
            width: '160px',
            selector: (row) => row.apellido2,
        },
        {
            name: `${t('interhospital.tabla.datos.seguimiento')}`,
            cell: (row) => {
                return (
                    <Stack direction="row">
                        <common.BootstrapTooltip title="Historia clinica">
                            <IconButton color="inherit"
                                onClick={generatePDFHistoriaMedica}>
                                <ReceiptLongRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>

                        <common.BootstrapTooltip title="Epicrisis">
                            <IconButton color="inherit"
                                onClick={() => {
                                    generatePDFEpicrisis(row);
                                }}

                            >
                                <BadgeRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>
                    </Stack>
                );
            },
        },
    ]);

    const fetchData = async () => {
        setOpenLoad(true);
        await axios
            .get('/api/pacientegeneral')
            .then((response) => {
                setData(response.data);
                setOpenLoad(false);
            })
            .catch((error) => {
                console.log(error.data);
                setOpenLoad(false);
            });
    };

    const handleRowClicked = (row) => {//Aca se pone el evento click
        setSelectedData(row);
        console.log(row);
    };



    const closeDialog = () => {
        setOpenDialog(false);
    };

    //PDF
    const generatePDFEpicrisis = (row) => {
        console.log(row);
        let img = new Image();
        img.src = 'assets/image.jpg';
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        img.onload = function () {
            console.log(doc.getFontList());
            doc.addImage(img, 'JPEG', 35, 25, 109, 34);
            //doc.setFont("bold");
            doc.text(250, 35, 'SERVICIO NACIONAL DE SALUD');
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text(270, 45, 'HOSPITAL ...');
            doc.text(290, 55, 'EPICRISIS');
            doc.rect(30, 70, 540, 740); //     
            doc.rect(30, 70, 540, 30); // sexo fecha edad
            doc.rect(30, 70, 250, 30); // nombre
            doc.setFont("helvetica", "bold");
            doc.text(32, 85, 'Nombre:');
            doc.text(282, 85, 'Sexo:');
            doc.text(362, 85, 'Fecha nacimiento:');
            doc.text(492, 85, 'Edad:');
            doc.setFont("helvetica", "normal");
            doc.text(84, 85, row.nombre1 + ' ' + row.nombre2 + ' ' + row.apellido1 + ' ' + row.apellido2);
            doc.text(312, 85, row.nombre_genero + '');
            doc.text(442, 85, row.fecha_nacido + '');
            doc.text(522, 85, row.edad + ' ' + row.nombre_edad);
            doc.rect(30, 100, 540, 30); // 
            doc.rect(30, 100, 180, 30); //cedula/pasaporte
            doc.rect(210, 100, 180, 30); //aseguradora
            doc.rect(390, 100, 180, 30); //NSS
            doc.setFont("helvetica", "bold");
            doc.text(32, 115, 'Cedula/pasaporte:');
            doc.text(212, 115, 'Aseguradora:');
            doc.text(392, 115, 'NSS:');
            doc.setFont("helvetica", "normal");
            doc.text(112, 115, row.num_doc + '');
            doc.text(282, 115, row.aseguradro + '');
            doc.text(422, 115, row.expendiente+'');
            doc.rect(30, 130, 540, 30); // 
            doc.rect(30, 130, 180, 30); // grupo sanguineo
            doc.rect(210, 130, 180, 30); // alergico
            doc.rect(390, 130, 180, 30); // telefono
            doc.setFont("helvetica", "bold");
            doc.text(32, 145, 'Grupo sanguineo:');
            doc.text(212, 145, 'Alergico:');
            doc.text(392, 145, 'Teléfono:');
            doc.setFont("helvetica", "normal");
            doc.text(32, 145, '');//no se toma
            doc.text(212, 145, '');//no se toma
            doc.text(452, 145, row.telefono+'');
            doc.rect(30, 160, 540, 30); //direccion 
            doc.rect(30, 160, 250, 30);//nacionalidad
            doc.setFont("helvetica", "bold");
            doc.text(282, 175, 'Dirección:');
            doc.text(32, 175, 'Nacionalidad:');
            doc.setFont("helvetica", "normal");
            doc.text(352, 175, row.direccion+'');
            doc.text(112, 175, row.nacionalidad+'');
            doc.rect(30, 190, 540, 60); // 
            doc.rect(30, 190, 90, 60); //
            doc.rect(120, 190, 90, 60); //
            doc.rect(210, 190, 90, 60); //
            doc.rect(300, 190, 90, 60); //
            doc.rect(390, 190, 180, 60); //
            doc.rect(30, 250, 540, 30); // 
            doc.rect(30, 250, 90, 30); //
            doc.rect(120, 250, 90, 30); //
            doc.rect(210, 250, 90, 30); //
            doc.rect(300, 250, 90, 30); //
            doc.rect(390, 250, 180, 30); //
            doc.setFont("helvetica", "bold");
            doc.text(32, 265, 'Fecha ingreso');
            doc.text(122, 265, 'Fecha egreso');
            doc.text(212, 265, 'Días Estadía');
            doc.text(302, 265, 'Especialidad');
            doc.text(392, 265, 'Condiciones de egreso');
            doc.setFont("helvetica", "normal");
            doc.text(32, 220, row.admision.fecha_admision+'');
            doc.text(122, 220, '');//NO se toma en ningun lado
            doc.text(212, 220, '');//Sin la fecha en que salio no es posible capturar
            if(row.monitoreo.especialidad!=null)
            {doc.text(302, 220, row.monitoreo.especialidad.nombre_especialidad+'');}
            if(row.alta!=null)
            {
                doc.text(392, 220, row.alta.estado_alta+'');
            }
            doc.rect(120, 280, 450, 30); // 
            doc.rect(120, 310, 450, 30); // 
            doc.rect(120, 340, 450, 30); // 
            doc.rect(120, 370, 450, 30); // 
            doc.rect(120, 400, 450, 30); // 
            doc.rect(120, 430, 450, 30); // 
            doc.rect(120, 460, 450, 30); // 
            doc.rect(120, 490, 450, 30); // 
            doc.rect(120, 520, 450, 30); // 
            doc.rect(120, 550, 450, 30); // 
            doc.rect(120, 580, 450, 30); // 
            doc.rect(120, 610, 450, 30); // 
            doc.rect(120, 640, 450, 30); // 
            doc.rect(30, 280, 90, 90); // 
            doc.setFont("helvetica", "bold");
            doc.text(37, 325, 'Motivo de consulta');
            doc.setFont("helvetica", "normal");
            doc.text(137, 295, row.admision.motivo_consulta+'');
            doc.rect(30, 370, 90, 90); // 
            doc.setFont("helvetica", "bold");
            doc.text(42, 420, 'Historia de la');
            doc.text(37, 430, 'enfermedad Actual');
            doc.setFont("helvetica", "normal");
            let valory=385;
            row.evoluciones.forEach(element => {
                doc.text(137, valory, element.nota_evolucion+' ');
                valory=valory+90;
            });
            doc.rect(480, 280, 90, 90); // Código CIE
            doc.rect(480, 370, 90, 90); // 
            doc.setFont("helvetica", "bold");
            doc.text(482, 290, 'Código CIE:');
            doc.text(482, 380, 'Código CIE:');
            doc.setFont("helvetica", "normal");
            doc.text(482, 305, row.admision.cod_cie10+'');
            doc.text(482, 395, row.admision.cod_cie10+'');
            doc.rect(30, 460, 90, 120); // 
            doc.setFont("helvetica", "bold");
            doc.text(52, 510, 'Estudios y');
            doc.text(42, 520, 'procedimientos');
            doc.setFont("helvetica", "normal");
            doc.text(137, 475, row.procedimiento.nombre_procedimiento+'');
            doc.rect(30, 580, 90, 90); // 
            doc.setFont("helvetica", "bold");
            doc.text(42, 625, 'Nota de egreso');
            doc.setFont("helvetica", "normal");
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1.0);
            doc.line(330, 735, 550, 735);
            doc.line(50, 735, 270, 735);
            doc.setFont("helvetica", "bold");
            doc.text(60, 745, 'NOMBRE Y CÓDIGO DEL MEDICO TRATANTE');
            doc.text(340, 745, 'NOMBRE Y CÓDIGO DEL MEDICO RESIDENTE');
            doc.setFont("helvetica", "normal");

            //doc.text(10,10,'Hello world!');
            doc.setFont("helvetica", "bold");
            doc.text(30, 68, 'Num. Historia Clinica');
            doc.setFont("helvetica", "normal");
            doc.save('Epicrisis.pdf');
        }


    }
    const generatePDFHistoriaMedica = () => {
        let img = new Image();
        img.src = 'assets/image.jpg';
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        img.onload = function () {
            console.log(doc.getFontList());
            doc.addImage(img, 'JPEG', 35, 25, 109, 34);
            //doc.setFont("bold");
            doc.text(412, 35, 'Historia Clínica Sala de Emergencia');
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text(448, 45, 'DEM-FOCEAS-001 Versión: 01');
            doc.text(441, 55, 'Fecha de aprobación: 30/11/2021');
            doc.setDrawColor(9, 31, 146);
            doc.setLineWidth(15.0);
            doc.line(30, 70, 560, 70);
            doc.setFillColor(255, 255, 255);
            doc.rect(100, 200, 100, 100, 'F');
            //doc.text(10,10,'Hello world!');
            doc.save('HistoriaClinica.pdf');
        }
    };
    useEffect(() => {
        fetchData();
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
                                No existen pacientes para mostrar
                            </Typography>
                        }
                    />
                </CardContent>
            </Card>


            <Dialog
                fullWidth
                maxWidth="sm"
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
                            Nuevo caso
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
            </Dialog>
        </>
    );
};
