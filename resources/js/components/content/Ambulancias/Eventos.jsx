import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DataTable from 'react-data-table-component';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { red, orange, yellow, blue, green } from '@mui/material/colors';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    InputLabel,
    MenuItem,
    FormControl,
    OutlinedInput,
    Box,
    Stack,
    Fab,
    Chip,
    Checkbox,
    FormGroup,
    Item,
    Grid,
    TextField,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    AppBar,
    NativeSelect,
    Toolbar,
    Card,
    CardContent,
    Radio,
    FormControlLabel,
    FormLabel,
    Backdrop,
    ButtonGroup,
    Button,
    CircularProgress,
    IconButton,
} from '@mui/material';
const moment = require('moment');
import common from '../../../common';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next"
const Eventos = () => {


    const [t, i18n] = useTranslation("global");
    const [tablas, setTablas] = useState([]);
    const [textLoad, setTextLoad] = useState('Cargando ...');
    const [openLoad, setOpenLoad] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterText1, setFilterText1] = useState('');


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

    const filteredItems = tablas.filter(
        (item) =>
            (item.id &&
                item.id
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.cod_ambulancias &&
                item.cod_ambulancias
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.placas &&
                item.placas
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.frecuencia_tiempo &&
                item.frecuencia_tiempo
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.servicio &&
                item.servicio
                    .toString()
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))

    );

    const columns = useMemo(() => [

        {
            name: `${t("ambulancias.eventos.datos.id")}`,
            sortable: true,
            selector: (row) => row.id,
        }, {
            name:`${t("ambulancias.eventos.datos.ambulancia")}` ,
            sortable: true,
            selector: (row) => row.cod_ambulancias,
        }, {
            name: `${t("ambulancias.eventos.datos.placas")}`,
            sortable: true,
            selector: (row) => row.placas,
        }, {
            name:  `${t("ambulancias.eventos.datos.frecuenciat")}`,
            sortable: true,
            selector: (row) => row.frecuencia_tiempo,
        }, {
            name:`${t("ambulancias.eventos.datos.servicios")}` ,
            sortable: true,
            selector: (row) => row.servicio,
        }, {
            name: `${t("ambulancias.eventos.datos.estadokm")}`,
            cell: (row) => {
                return (
                    <div>
            {row.anticipo_km > row.frecuencia_km ?
                <h4 className="text-center">
                    <Button variant="contained" color="success">
                    {t("ambulancias.eventos.datos.atiempo")}
                    </Button>
                </h4>:
                <h4 className="text-center">
                    <Button variant="contained" color="danger">
                    {t("ambulancias.eventos.datos.vencido")}
                    </Button>
                </h4>}
          </div>
                );
            },
        }, {
            name: `${t("ambulancias.eventos.datos.estadoseguro")}`,
            cell: (row) => {
                return (
                    <div>
                    {row.fecha_iniseguro > row.fecha_finseguro ?
                    <h4 className="text-center">
                        <Button variant="contained" color="success">
                        {t("ambulancias.eventos.datos.atiempo")}
                        </Button>
                    </h4>:
                    <h4 className="text-center">
                        <Button variant="contained" color="danger">
                        {t("ambulancias.eventos.datos.vencido")}
                        </Button>
                    </h4>}
                  </div>
                );
            },
        }, {
            name: `${t("ambulancias.eventos.datos.estadoti")}`,
            cell: (row) => {
                return (
                    <div>
                    {row.anticipo_tiempo > row.frecuencia_tiempo ?
                        <h4 className="text-center">
                        <Button variant="contained" color="success">
                        {t("ambulancias.eventos.datos.atiempo")}
                        </Button>
                    </h4>:
                    <h4 className="text-center">
                        <Button variant="contained" color="danger">
                        {t("ambulancias.eventos.datos.vencido")}
                        </Button>
                    </h4>}
                  </div>
                );
            },
        },
    ])

    const Get = async () => {

        setOpenLoad(true);
        await axios.get(`/api/ambulancias/eventos`)
            .then(response => {
                setOpenLoad(false);
                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                setOpenLoad(false);
                return error;
            })

    }

    useEffect(() => {
        Get()

    }, []);
    return (
        <div>
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
                <h2>{t("ambulancias.eventos.titulo")}</h2>
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


            
        </div>
    )

}

export default Eventos;
