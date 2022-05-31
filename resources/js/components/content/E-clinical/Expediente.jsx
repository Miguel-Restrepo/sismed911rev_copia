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
                                onClick={() => {
                                    generatePDFHistoriaMedica(row);
                                }}>
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
                
                setOpenLoad(false);
            });
    };

    const handleRowClicked = (row) => {//Aca se pone el evento click
        setSelectedData(row);
     
    };



    const closeDialog = () => {
        setOpenDialog(false);
    };

    //PDF
    const generatePDFEpicrisis = (row) => {
   
        let img = new Image();
        img.src = 'assets/image.jpg';
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        img.onload = function () {
            
            doc.addImage(img, 'JPEG', 35, 25, 109, 34);
            //doc.setFont("bold");
            doc.text(250, 35, 'SERVICIO NACIONAL DE SALUD');
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text(270, 45, (row.nombre_hospital + ' ').replace('null', ''));
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
            let nombre = row.nombre1 + ' ' + row.nombre2 + ' ' + row.apellido1 + ' ' + row.apellido2;
            nombre = nombre.replace('null', '');
            nombre = nombre.replace('null', '');
            nombre = nombre.replace('null', '');
            doc.text(84, 85, nombre);
            doc.text(312, 85, (row.nombre_genero + ' ').replace('null', ''));
            doc.text(442, 85, (row.fecha_nacido + ' ').replace('null', ''));
            doc.text(522, 85, (row.edad + ' ' + row.nombre_edad).replace('null', ''));
            doc.rect(30, 100, 540, 30); // 
            doc.rect(30, 100, 180, 30); //cedula/pasaporte
            doc.rect(210, 100, 180, 30); //aseguradora
            doc.rect(390, 100, 180, 30); //NSS
            doc.setFont("helvetica", "bold");
            doc.text(32, 115, 'Cedula/pasaporte:');
            doc.text(212, 115, 'Aseguradora:');
            doc.text(392, 115, 'NSS:');
            doc.setFont("helvetica", "normal");
            doc.text(112, 115, (row.num_doc + ' ').replace('null', ''));
            doc.text(282, 115, (row.aseguradro + ' ').replace('null', ''));
            doc.text(422, 115, (row.expendiente + ' ').replace('null', ''));
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
            doc.text(452, 145, (row.telefono + ' ').replace('null', ''));
            doc.rect(30, 160, 540, 30); //direccion 
            doc.rect(30, 160, 250, 30);//nacionalidad
            doc.setFont("helvetica", "bold");
            doc.text(282, 175, 'Dirección:');
            doc.text(32, 175, 'Nacionalidad:');
            doc.setFont("helvetica", "normal");
            doc.text(352, 175, (row.direccion + ' ').replace('null', ''));
            doc.text(112, 175, (row.nacionalidad + ' ').replace('null', ''));
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
            if (row.admision != null) { doc.text(32, 220, (row.admision.fecha_admision + ' ').replace('null', '')); }
            doc.text(122, 220, '');//NO se toma en ningun lado
            doc.text(212, 220, '');//Sin la fecha en que salio no es posible capturar
            if(row.monitoreo!=null){
                if (row.monitoreo.especialidad != null) { doc.text(302, 220, row.monitoreo.especialidad.nombre_especialidad + ' '); }
            }
            
            if (row.alta != null) {
                doc.text(392, 220, (row.alta.estado_alta + ' ').replace('null', ''));
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
            if (row.admision != null) { doc.text(137, 295, (row.admision.motivo_consulta + ' ').replace('null', '')); }
            doc.rect(30, 370, 90, 90); // 
            doc.setFont("helvetica", "bold");
            doc.text(42, 420, 'Historia de la');
            doc.text(37, 430, 'enfermedad Actual');
            doc.setFont("helvetica", "normal");
            let valory = 385;
            if (row.evoluciones != null) {
                row.evoluciones.forEach(element => {
                    doc.text(137, valory, (element.nota_evolucion + ' ').replace('null', ''));
                    valory = valory + 90;
                });
            }
            doc.rect(480, 280, 90, 90); // Código CIE
            doc.rect(480, 370, 90, 90); // 
            doc.setFont("helvetica", "bold");
            doc.text(482, 290, 'Código CIE:');
            doc.text(482, 380, 'Código CIE:');
            doc.setFont("helvetica", "normal");
            if (row.admision != null) {
                doc.text(482, 305, (row.admision.cod_cie10 + ' ').replace('null', ''));
                doc.text(482, 395, (row.admision.cod_cie10 + ' ').replace('null', ''));
            }
            doc.rect(30, 460, 90, 120); // 
            doc.setFont("helvetica", "bold");
            doc.text(52, 510, 'Estudios y');
            doc.text(42, 520, 'procedimientos');
            doc.setFont("helvetica", "normal");
            if (row.procedimiento != null) { doc.text(137, 475, (row.procedimiento.nombre_procedimiento + ' ').replace('null', '')); }
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
            doc.text(100, 68, row.codigo+' ');
            doc.setFont("helvetica", "normal");
            doc.save('Epicrisis.pdf');
        }


    }
    const generatePDFHistoriaMedica = (row) => {
        let img = new Image();
        img.src = 'assets/image.jpg';
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        img.onload = function () {
            doc.addImage(img, 'JPEG', 35, 25, 109, 34);
            //doc.setFont("bold");
            doc.text(412, 35, 'Historia Clínica Sala de Emergencia');
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text(448, 45, 'DEM-FOCEAS-001 Versión: 01');
            doc.text(441, 55, 'Fecha de aprobación: 30/11/2021');
            doc.setLineWidth(15.0);
            doc.setDrawColor(12, 82, 119);
            doc.line(30, 70, 560, 70);
            doc.setLineWidth(1.0);
            doc.setDrawColor(0, 0, 0);
            doc.rect(30, 90, 530, 77); //     
            doc.rect(30, 177, 530, 237); //
            doc.rect(30, 424, 530, 77); // 
            doc.rect(30, 511, 530, 77); // 
            doc.rect(30, 598, 530, 77); // 
            doc.rect(30, 685, 530, 57); // 
            doc.rect(30, 752, 530, 57); // 
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 85, 90, 10, 'F');
            doc.text(45, 93, 'Información General');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 172, 90, 10, 'F');
            doc.text(45, 180, 'Información Personal');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 419, 100, 10, 'F');
            doc.text(45, 427, 'Motivos de la Consulta');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 506, 135, 10, 'F');
            doc.text(45, 514, 'Historia de la Enfermedad Actual');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 594, 60, 10, 'F');
            doc.text(45, 602, 'Antecedentes');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 680, 110, 10, 'F');
            doc.text(45, 688, 'Origen de la Enfermedad');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 747, 65, 10, 'F');
            doc.text(45, 755, 'Signos Vitales');
            //DATOS
            doc.setFontSize(9);
            //1°
            doc.setFont("helvetica", "bold");
            doc.text(50, 113, 'No. de');
            doc.text(40, 123, 'Expediente');
            doc.text(48, 133, 'Clínico');
            doc.rect(100, 108, 70, 30);

            doc.text(230, 113, 'Fecha');
            doc.text(200, 133, 'Hora de llegada');
            doc.text(418, 113, 'Prioridad del triaje');
            doc.setFont("helvetica", "normal");
            doc.text(120, 120, (row.expendiente + ' ').replace('null', ''));
            if (row.admision != null) {
                let fecha = row.admision.fecha_admision.split(' ');
                doc.text(270, 113, (fecha[0] + ' ').replace('null', ''));
                doc.text(270, 133, (fecha[1] + ' ').replace('null', ''));


                switch (row.admision.clasificacion_admision) {
                    case 1:
                        doc.text(250, 113, 'I');//ROJO
                        break;
                    case 2:
                        doc.text(250, 113, 'II');//NARANJA
                        break;
                    case 3:
                        doc.text(250, 113, 'III');//AMARILLO
                        break;
                    case 4:
                        doc.text(250, 113, 'IV');//AZUL
                        break;
                    case 5:
                        doc.text(250, 113, 'V');//VERDE
                        break;

                    default:
                        break;
                }
            }
            //2°
            doc.setFont("helvetica", "bold");
            doc.text(40, 200, 'Nombre:');
            doc.text(390, 200, 'Apodo:');
            doc.text(40, 220, 'Sexo:');
            doc.text(130, 220, 'Edad:');
            doc.text(210, 220, 'Fecha de Nacimiento:');
            doc.text(390, 220, 'Cédula/Pasaporte/NUI:');
            doc.text(40, 240, 'Aseguradora:');
            doc.text(215, 240, 'NSS:');
            doc.text(390, 240, 'Grupo Sanguíneo:');
            doc.text(40, 260, 'Alérgico(a):');
            doc.text(40, 280, 'Dirección:');
            doc.text(40, 300, 'Nacionalidad:');
            doc.text(270, 300, 'Teléfono:');
            doc.text(50, 320, 'Via de llegada:');
            doc.text(70, 340, 'Medios propios');
            doc.text(70, 355, '9-1-1');
            doc.text(70, 370, 'CRUE');
            doc.text(70, 385, 'Privada');
            doc.text(70, 400, 'Ambulancia No._____');
            doc.text(270, 340, 'Paramédico:');
            doc.text(270, 355, 'Acompañante:');
            doc.text(270, 370, 'Parentesco:');
            doc.text(390, 370, 'Teléfono:');
            doc.text(270, 385, 'Dirección:');
            doc.rect(44, 330, 13, 13);
            doc.rect(44, 345, 13, 13);
            doc.rect(44, 360, 13, 13);
            doc.rect(44, 375, 13, 13);
            doc.rect(44, 390, 13, 13);
            doc.setFont("helvetica", "normal");
            let nombre = row.nombre1 + ' ' + row.nombre2 + ' ' + row.apellido1 + ' ' + row.apellido2;
            nombre = nombre.replace('null', '');
            nombre = nombre.replace('null', '');
            nombre = nombre.replace('null', '');
            doc.text(84, 200, (nombre + ' ').replace('null', ''));
            doc.text(430, 200, (row.apodo + ' ').replace('null', ''));
            doc.text(84, 220, (row.nombre_genero + ' ').replace('null', ''));
            doc.text(174, 220, (row.edad + ' ').replace('null', ''));
            doc.text(310, 220, (row.fecha_nacido + ' ').replace('null', ''));
            doc.text(500, 220, (row.num_doc + ' ').replace('null', ''));
            doc.text(100, 240, (row.aseguradro + ' ').replace('null', ''));
            doc.text(250, 240, (row.expendiente + ' ').replace('null', ''));
            //doc.text(250, 240, row.expendiente+'');//sin grupo
            //doc.text(250, 240, row.expendiente+'');//sin alergico
            doc.text(100, 280, (row.direccion + ' ').replace('null', ''));
            doc.text(100, 300, (row.nacionalidad + ' ').replace('null', ''));
            doc.text(430, 300, (row.telefono + ' ').replace('null', ''));
            if (row.admision != null) {
                switch (row.admision.nombre_ingreso) {
                    case "Otras ambulancias":
                        doc.text(46, 400, 'X');
                        doc.text(145, 400, (row.admision.cod911 + ' ').replace('null', ''));
                        break;
                    case "Propios medios":
                        doc.text(46, 340, 'X');
                        break;
                    case "Ambulancia 911":
                        doc.text(46, 355, 'X');
                        break;

                    default:
                        break;
                }
                doc.text(360, 355, (row.admision.acompañante + ' ').replace('null', ''));
                doc.text(440, 370, (row.admision.telefono_acompañante + ' ').replace('null', ''));
                doc.text(360, 385, (row.direccion + ' ').replace('null', ''));


            }



            //3°
            doc.setFont("helvetica", "bold");
            doc.text(50, 447, 'Cefalea');
            doc.text(50, 465, 'Mareos');
            doc.text(50, 483, 'Fiebre');
            doc.text(98, 447, 'Tos');
            doc.text(98, 465, 'Epistaxis');
            doc.text(98, 483, 'Disnea');
            doc.text(160, 447, 'Palpitaciones');
            doc.text(160, 465, 'Nauseas');
            doc.text(160, 483, 'Vomitos');
            doc.text(245, 447, 'Hematemesis');
            doc.text(245, 465, 'Dolor torácico');
            doc.text(245, 483, 'Dolor abdominal');
            doc.text(320, 447, 'Disuria');
            doc.text(322, 465, 'Hematuria');
            doc.text(332, 483, 'Diarrea');
            doc.text(395, 447, 'Melena');
            doc.text(395, 465, 'Heridad arma blanca o arma de fuego');
            doc.text(395, 483, 'otro:_________________________');
            doc.rect(35, 437, 13, 13);
            doc.rect(35, 455, 13, 13);
            doc.rect(35, 473, 13, 13);
            doc.rect(83, 437, 13, 13);
            doc.rect(83, 455, 13, 13);
            doc.rect(83, 473, 13, 13);
            doc.rect(145, 437, 13, 13);
            doc.rect(145, 455, 13, 13);
            doc.rect(145, 473, 13, 13);
            doc.rect(230, 437, 13, 13);
            doc.rect(230, 455, 13, 13);
            doc.rect(230, 473, 13, 13);
            doc.rect(305, 435, 13, 13);
            doc.rect(307, 453, 13, 13);
            doc.rect(317, 475, 13, 13);
            doc.rect(380, 437, 13, 13);
            doc.rect(380, 455, 13, 13);
            doc.setFont("helvetica", "normal");
            if (row.admision != null) {
                switch (row.admision.nombre_motivoatencion) {
                    case value:

                        break;

                    default:
                        break;
                }
            }
            //4°
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1.0);
            doc.line(50, 535, 540, 535);
            doc.line(50, 555, 540, 555);
            doc.line(50, 575, 540, 575);
            doc.setFont("helvetica", "normal");
            let valory = 530;
            if (row.evoluciones != null) {
                row.evoluciones.forEach(element => {
                    doc.text(60, valory, (element.nota_evolucion + ' ').replace('null', ''));
                    valory = valory + 20;
                });
            }
            //5°
            doc.line(50, 618, 540, 618);
            doc.line(50, 638, 540, 638);
            doc.line(50, 658, 540, 658);
            doc.setFont("helvetica", "normal");
            if (row.procedimiento != null) { doc.text(420, 483, (row.procedimiento.nombre_procedimiento + ' ').replace('null', '')); }
            //6°
            doc.setFont("helvetica", "bold");
            doc.text(55, 708, 'Enfermedad general');
            doc.text(55, 728, 'Accidente de transito');
            doc.text(180, 708, 'Embarazo');
            doc.text(180, 728, 'Accidente Laboral');
            doc.text(285, 708, 'Enfermedad Profesional');
            doc.text(285, 728, 'otro:_________________________');
            doc.rect(40, 698, 13, 13);
            doc.rect(40, 718, 13, 13);
            doc.rect(165, 698, 13, 13);
            doc.rect(165, 718, 13, 13);
            doc.rect(260, 698, 13, 13);
            doc.setFont("helvetica", "normal");
            //
            if (row.admision != null) {
                switch (row.admision.nombre_causaTrauma) {
                    case "Enfermedad general":
                        doc.text(31, 700, 'X');
                        break;
                    case "Accidente de transito":
                        doc.text(31, 728, 'X');
                        break;
                    case "Embarazo":
                        doc.text(156, 700, 'X');
                        break;
                    case "Accidente Laboral":
                        doc.text(156, 728, 'X');
                        break;
                    case "Enfermedad Profesional":
                        doc.text(261, 700, 'X');
                        break;

                    default:
                        doc.text(310, 728, 'X');

                        break;
                }
            }
            //7°
            doc.setFont("helvetica", "bold");
            doc.text(40, 775, 'TA:');
            doc.text(40, 795, 'FR:');
            doc.text(180, 775, 'FC');
            doc.text(180, 795, 'Pulso');
            doc.text(285, 775, 'SaO2');
            doc.text(285, 795, 'Temp');
            doc.text(395, 775, 'Escala de Coma de Glasgow');
            doc.setFont("helvetica", "normal");
            if (row.admision != null) {

                //doc.text(40, 775, 'TA:');
                doc.text(90, 795, (row.admision.fr_admision + ' ').replace('null', ''));
                doc.text(230, 775, (row.admision.fc_admision + ' ').replace('null', ''));
                // doc.text(180, 795, 'Pulso');
                doc.text(335, 775, (row.admision.so2_admision + ' ').replace('null', ''));
                doc.text(335, 795, (row.admision.temp_admision + ' ').replace('null', ''));
                doc.text(395, 795, (row.admision.glasgow_admision + ' ').replace('null', ''));

            }
            doc.addPage("p", "pt");
            doc.rect(30, 40, 530, 120); // 
            doc.rect(30, 170, 530, 290); // 
            doc.rect(30, 470, 530, 170); // 
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1.0);
            doc.line(30, 685, 150, 685);
            doc.line(162, 685, 282, 685);
            doc.line(294, 685, 414, 685);
            doc.line(426, 685, 546, 685);
            //1°
            doc.setFont("helvetica", "bold");
            doc.text(45, 63, 'Aspecto General:');
            doc.text(45, 83, 'Cuello:');
            doc.text(45, 103, 'Pulmones:');
            doc.text(45, 123, 'Extremidades:');
            doc.text(45, 143, 'Tacto Rectal:');
            doc.text(220, 83, 'Tóraz:');
            doc.text(220, 103, 'Abdomen:');
            doc.text(220, 123, 'Ex. Neurológico');
            doc.text(395, 63, 'Cabeza:');
            doc.text(395, 83, 'Corazón:');
            doc.text(395, 103, 'Genitales:');
            doc.setFont("helvetica", "normal");
            if (row.admision != null) {
                doc.text(145, 63, (row.admision.general + ' ').replace('null', ''));
                doc.text(145, 83, (row.admision.cuello + ' ').replace('null', ''));
                doc.text(145, 103, (row.admision.pulmon + ' ').replace('null', ''));
                doc.text(145, 123, (row.admision.extremidad + ' ').replace('null', ''));
                doc.text(145, 143, (row.admision.rectal + ' ').replace('null', ''));
                doc.text(320, 83, (row.admision.torax + ' ').replace('null', ''));
                doc.text(320, 103, (row.admision.abdomen + ' ').replace('null', ''));
                doc.text(320, 123, (row.admision.neuro + ' ').replace('null', ''));
                doc.text(495, 63, (row.admision.cabeza + ' ').replace('null', ''));
                doc.text(495, 83, (row.admision.corazon + ' ').replace('null', ''));
                doc.text(495, 103, (row.admision.genital + ' ').replace('null', ''));
            }

            //2°
            doc.setFont("helvetica", "bold");
            doc.text(45, 193, 'Laboratorios');
            doc.text(65, 218, 'Hemograma');
            doc.text(65, 238, 'Troponinas');
            doc.text(65, 258, 'Sodio');
            doc.text(135, 218, 'Glicemia');
            doc.text(135, 238, 'CK');
            doc.text(135, 258, 'Potasio');
            doc.text(205, 218, 'Urea');
            doc.text(205, 238, 'CPK-MK');
            doc.text(205, 258, 'Cloro');
            doc.text(275, 218, 'Creatinina');
            doc.text(275, 238, 'TP');
            doc.text(275, 258, 'Otros:____________________');
            doc.text(345, 218, 'Ex Orina');
            doc.text(345, 238, 'TPT');
            doc.text(415, 218, 'TGO');
            doc.text(415, 238, 'INR');
            doc.text(485, 218, 'TGP');
            doc.text(485, 238, 'Gases arteriales');
            doc.text(45, 270, 'Imágenes');
            doc.text(65, 290, 'EKG');
            doc.text(65, 310, 'Otras:___________________________');
            doc.text(135, 290, 'Rayos X');
            doc.text(205, 290, 'Sonográfia');
            doc.text(275, 290, 'TAC');
            doc.text(345, 290, 'Indicar parte del cuerpo:_______________');
            doc.text(45, 330, 'Diagnósticos');
            doc.text(45, 400, 'Manejo y Medicación de Emergencia');
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1.0);
            doc.line(50, 350, 540, 350);
            doc.line(50, 370, 540, 370);
            doc.line(50, 390, 540, 390);
            doc.line(50, 410, 540, 410);
            doc.line(50, 430, 540, 430);
            doc.line(50, 450, 540, 450);
            doc.rect(40, 210, 13, 13);
            doc.rect(40, 230, 13, 13);
            doc.rect(40, 250, 13, 13);
            doc.rect(120, 210, 13, 13);
            doc.rect(120, 230, 13, 13);
            doc.rect(120, 250, 13, 13);
            doc.rect(190, 210, 13, 13);
            doc.rect(190, 230, 13, 13);
            doc.rect(190, 250, 13, 13);
            doc.rect(260, 210, 13, 13);
            doc.rect(260, 230, 13, 13);
            doc.rect(260, 250, 13, 13);
            doc.rect(330, 210, 13, 13);
            doc.rect(330, 230, 13, 13);
            doc.rect(400, 210, 13, 13);
            doc.rect(400, 230, 13, 13);
            doc.rect(470, 210, 13, 13);
            doc.rect(470, 230, 13, 13);
            doc.rect(40, 282, 13, 13);
            doc.rect(40, 302, 13, 13);
            doc.rect(120, 282, 13, 13);
            doc.rect(190, 282, 13, 13);
            doc.rect(260, 282, 13, 13);
            doc.setFont("helvetica", "normal");
            if (row.admision != null) {
                row.admision.examenes.forEach(element => {
                    switch (element.nombre_examen) {
                        case "Hemograma":
                            doc.text(51, 218, 'X');
                            break;
                        case "Glicemia":
                            doc.text(121, 218, 'X');
                            break;

                        case "Urea":
                            doc.text(191, 218, 'X');
                            break;

                        case "Creatinina":
                            doc.text(261, 218, 'X');
                            break;

                        case "Ex Orina":
                            doc.text(331, 218, 'X');
                            break;

                        case "TGO":
                            doc.text(401, 218, 'X');
                            break;

                        case "TGP":
                            doc.text(431, 218, 'X');
                            break;

                        case "Troponinas":
                            doc.text(51, 238, 'X');
                            break;

                        case "CK":
                            doc.text(121, 238, 'X');
                            break;

                        case "CPK-MK":
                            doc.text(191, 238, 'X');
                            break;

                        case "TP":
                            doc.text(261, 238, 'X');
                            break;

                        case "TPT":
                            doc.text(331, 238, 'X');
                            break;

                        case "INR":
                            doc.text(401, 238, 'X');
                            break;

                        case "Gases arteriales":
                            doc.text(471, 238, 'X');
                            break;

                        case "Sodio":
                            doc.text(51, 258, 'X');
                            break;

                        case "Potasio":
                            doc.text(121, 258, 'X');
                            break;
                        case "Cloro":
                            doc.text(191, 258, 'X');
                            break;

                        default:
                            doc.text(261, 258, 'X');
                            break;
                    }
                });
                let medicamentos = "";
                row.admision.medicamentos.forEach(element => {
                    medicamentos = medicamentos + " " + element.nombre_medicamento + ".";
                });
                doc.text(50, 407, (medicamentos + ' ').replace('null', ''));
                doc.text(50, 340, (row.admision.sintomas_signos + ' ').replace('null', ''));

            }
            //3°
            doc.setFont("helvetica", "bold");
            doc.text(65, 496, 'Sutura');
            doc.text(140, 496, 'Inmovilización');
            doc.text(250, 496, 'Reanimación');
            doc.text(360, 496, 'Nebulización');
            doc.text(470, 496, 'Otros:__________');
            doc.text(45, 516, 'Interconsulta');
            doc.text(65, 536, 'No');
            doc.text(65, 556, 'Especialista:_________________________');
            doc.text(140, 536, 'Si');
            doc.text(240, 536, 'Especialidad:_________________________');
            doc.text(45, 576, 'Destino');
            doc.text(65, 596, 'Admitido');
            doc.text(140, 596, 'Fallecido');
            doc.text(250, 596, 'Fuga');
            doc.text(360, 596, 'Alta');
            doc.text(470, 596, 'Alta a petición');
            doc.text(65, 616, 'Referido a:___________________________');
            doc.rect(40, 528, 13, 13);
            doc.rect(120, 528, 13, 13);
            doc.rect(40, 488, 13, 13);
            doc.rect(120, 488, 13, 13);
            doc.rect(450, 488, 13, 13);
            doc.rect(230, 488, 13, 13);
            doc.rect(340, 488, 13, 13);
            doc.rect(40, 588, 13, 13);
            doc.rect(125, 588, 13, 13);
            doc.rect(235, 588, 13, 13);
            doc.rect(345, 588, 13, 13);
            doc.rect(455, 588, 13, 13);
            doc.rect(40, 608, 13, 13);
            doc.setFont("helvetica", "normal");
            if (row.alta != null) {
                switch (row.alta.estado_alta) {
                    case "Admitido":
                        doc.text(42, 592, 'X');
                        break;
                    case "Fallecido":
                        doc.text(127, 592, 'X');
                        break;
                    case "Fuga":
                        doc.text(237, 592, 'X');
                        break;
                    case "Alta":
                        doc.text(347, 592, 'X');
                        break;
                    case "Alta a petición":
                        doc.text(457, 592, 'X');
                        break;
                    default:
                        doc.text(62, 610, 'X');
                        doc.text(90, 616, (row.alta.estado_alta+' ').replace('null', ''));
                        break;
                }
            }

            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.text(60, 695, 'Médico Tratante');
            doc.text(192, 695, 'Firma del Médico');
            doc.text(334, 695, 'Exequatur');
            doc.text(456, 695, 'Firma del Paciente o');
            doc.text(466, 705, 'Acompañante');


            doc.setFillColor(255, 255, 255);
            doc.rect(40, 35, 110, 10, 'F');
            doc.text(45, 43, 'Examen Físico Relevante');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 165, 160, 10, 'F');
            doc.text(45, 173, 'Examenes de Laboratorio e Imágenes');
            doc.setFillColor(255, 255, 255);
            doc.rect(40, 465, 80, 10, 'F');
            doc.text(45, 473, 'Procedimientos');
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
