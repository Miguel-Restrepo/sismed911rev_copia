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
                                onClick={generatePDFEpicrisis}
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



    const closeDialog = () => {
        setOpenDialog(false);
    };

    //PDF
    const generatePDFEpicrisis = () => {
     
        let img = new Image();
        img.src = 'assets/image.jpg'; 
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        img.onload = function () 
        {
            console.log(doc.getFontList());
            doc.addImage(img,'JPEG',35,25,109,34); 
            //doc.setFont("bold");
            doc.text(412,35, 'Historia Clínica Sala de Emergencia'); 
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text(448,45, 'DEM-FOCEAS-001 Versión: 01'); 
            doc.text(441,55, 'Fecha de aprobación: 30/11/2021'); 
            doc.setDrawColor(9, 31, 146);
            doc.setLineWidth(15.0); 
            doc.line(30, 70, 560, 70);
            doc.setFillColor(255,255,255);
            doc.rect(100, 200, 100, 100, 'F');
            //doc.text(10,10,'Hello world!');
            doc.save('Epicrisis.pdf');
        }
      

    }
    const generatePDFHistoriaMedica = () => {
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica");
        let colPaciente = ["Paciente", "Documento", "Edad"];
        let rowsPaciente = [];
        doc.autoTable(colPaciente, rowsPaciente, { startY: 120 });
        var logo = new Image();
        logo.src = 'image.jpg';
        doc.addImage(logo, 'JPEG', 15, 40, 148, 210);
        var logo1 = new Image();
        logo1.src = 'image.png';

        doc.addImage(logo1, 'PNG', 15, 40, 148, 210);
        //doc.addImage(extractImageFromDataUrl("image.png"));
        doc.save("orden_Medicamento.pdf");
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
