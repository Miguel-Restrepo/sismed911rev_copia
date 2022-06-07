import {
    AppBar,
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
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    MenuItem,
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
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import TaxiAlertRoundedIcon from '@mui/icons-material/TaxiAlertRounded';

import DataTable from 'react-data-table-component';
import FormularioAmbulancia from './FormularioAmbulancia';

toast.configure();

const moment = require('moment');

export default () => {
    const [t, i18n] = useTranslation('global');
    const [openLoad, setOpenLoad] = useState(false);
    const [textLoad, setTextLoad] = useState('Cargando...');

    const [openDialogSeg, setOpenDialogSeg] = useState(false);
    const [openDialogCC, setOpenDialogCC] = useState(false);

    const [data, setData] = useState([]);
    const [dataTipoCierre, setDataTipoCierre] = useState([]);

    const [filterText, setFilterText] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [showForms, setShowForms] = useState(null);

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
            (item.nombre_es &&
                item.nombre_es
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.cod_ambulancia &&
                item.cod_ambulancia
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.hora_asigna &&
                item.hora_asigna
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.hllegada &&
                item.hllegada
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.hinicia &&
                item.hinicia
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.hdestino &&
                item.hdestino.toLowerCase().includes(filterText.toLowerCase()))
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) setFilterText('');
        };

        return (
            <Grid container justifyContent="end">
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
            width: '160px',
            sortable: true,
            selector: (row) => row.fecha,
        },
        {
            name: `${t('unificado.unido.formulario.incidente')}`,
            width: '200px',
            sortable: true,
            selector: (row) => row.nombre_es,
        },
        {
            name: `${t('unificado.tabla.datos.tiempo')}`,
            width: '130px',
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
            name: `${t('formularios.formambulancias.ambulancia')}`,
            wrap: true,
            sortable: true,
            minWidth: '125px',
            selector: (row) => row.cod_ambulancia,
        },
        {
            name: `${t('formularios.formambulancias.hasignacion')}`,
            wrap: true,
            sortable: true,
            minWidth: '160px',
            selector: (row) => row.hora_asigna,
        },
        {
            name: `${t('formularios.formambulancias.hllegada')}`,
            wrap: true,
            sortable: true,
            minWidth: '160px',
            selector: (row) => row.hora_llegada,
        },
        {
            name: `${t('formularios.formambulancias.hinicia')}`,
            wrap: true,
            sortable: true,
            minWidth: '160px',
            selector: (row) => row.hora_inicio,
        },
        {
            name: `${t('formularios.formambulancias.hdestino')}`,
            wrap: true,
            sortable: true,
            minWidth: '160px',
            selector: (row) => row.hora_destino,
        },
        {
            name: `${t('unificado.tabla.datos.acciones')}`,
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

    const fetchData = async () => {
        setTextLoad('Cargando...');
        await axios
            .get('/api/preh_maestro/despacho')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error.data));

        setOpenLoad(false);
    };

    const actualizar = () => {
        setShowForms(false);
        setSelectedData(null);
        fetchData();
    };

    const handleRowClicked = (row) => {
        let select = row;
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

    const PostSeguimiento = async () => {
        setTextLoad('Actualizando...');
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

    const closeDialogSeg = () => {
        setSeguimiento('');
        setOpenDialogSeg(false);
    };

    const closeDialogCC = () => {
        setNombrecierre('');
        setNota('');
        setOpenDialogCC(false);
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
        const loadData = async () => {
            setOpenLoad(true);

            await axios
                .get('/api/tipo_cierrecaso')
                .then((response) => setDataTipoCierre(response.data))
                .catch((error) => console.log(error.data));

            fetchData();
        };

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

            <h2>{t('interhospital.tabla.datos.despacho')}</h2>

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
                                No existen datos para mostrar
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
                            value={0}
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
                                icon={<TaxiAlertRoundedIcon />}
                                iconPosition="start"
                                label={
                                    <span className="span">
                                        {t('formularios.ambulancia')}
                                    </span>
                                }
                            />
                        </Tabs>
                    </Box>

                    <div role="tabpanel">
                        <FormularioAmbulancia
                            caso={selectedData}
                            actualizar={actualizar}
                        />
                    </div>
                </Box>
            )}

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
