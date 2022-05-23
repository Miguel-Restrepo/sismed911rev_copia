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

import DataTable from 'react-data-table-component';
import FormularioPaciente from './FormularioPaciente';

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
            sortable: true,
            width: '100px',
            selector: (row) => row.codigo,
        },
        {
            name: `${t('interhospital.tabla.datos.fecha')}`,
            sortable: true,
            width: '160px',
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
            name: `${t('interhospital.tabla.datos.seguimiento')}`,
            cell: (row) => {
                return (
                    <Stack direction="row">
                        <common.BootstrapTooltip title="Seguimiento">
                            <IconButton color="inherit">
                                <ReceiptLongRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>

                        <common.BootstrapTooltip title="Archivos">
                            <IconButton color="inherit">
                                <BadgeRoundedIcon />
                            </IconButton>
                        </common.BootstrapTooltip>
                    </Stack>
                );
            },
        },
        {
            name: `${t('etiquetas.cerrarcaso')}`,
            cell: (row) => {
                return (
                    <common.BootstrapTooltip title="Cerrar caso">
                        <IconButton color="error">
                            <CancelRoundedIcon />
                        </IconButton>
                    </common.BootstrapTooltip>
                );
            },
        },
    ]);

    const fetchData = async () => {
        setOpenLoad(true);
        await axios
            .get('/api/interh_maestro/habilitados')
            .then((response) => {
                setData(response.data);
                setOpenLoad(false);
            })
            .catch((error) => {
                console.log(error.data);
                setOpenLoad(false);
            });
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const actualizar = () => {
        setShowForms(false);
        setSelectedData(null);
        fetchData();
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
                        Evaluación clínica
                    </common.TabPanel>

                    <common.TabPanel value={value} index={2}>
                        Hospital
                    </common.TabPanel>

                    <common.TabPanel value={value} index={3}>
                        Ambulancia
                    </common.TabPanel>
                </Box>
            )}

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
