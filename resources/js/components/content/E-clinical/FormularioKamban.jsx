import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import Formularios from "../InterHospital/Formularios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icofont from 'react-icofont';
import { faMapMarkedAlt, faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DataTable from 'react-data-table-component';
import { green } from '@mui/material/colors';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    InputLabel,
    MenuItem,
    FormControl,
    OutlinedInput,
    Box,
    Stack,
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
    RadioGroup,
    Button,
    CircularProgress,
    IconButton,
} from '@mui/material';

import common from '../../../common';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormCheck from 'react-bootstrap/FormCheck'
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { DateTime } from "luxon"
import PhoneInput from 'react-phone-input-2'
//import 'react-phone-input-2/lib/style.css'
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function FormularioKamban(params) {

    const [t, i18n] = useTranslation("global");
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [ventanaCamas, setVentanaCamas] = useState(false);
    const cerrarVentanaCamas = () => setVentanaCamas(false);
    const abrirVentanaCamas = () => setVentanaCamas(true);
    const [EspecialidadTemp, setEspecialidadTemp] = useState("");
    const [Especialidad, setEspecialidad] = useState("");
    const [idEspecialidadTemp, setIdEspecialidadTemp] = useState("");
    const [procedimientos, setProcedimientos] = useState([]);
    const [camas, setCama] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const [filterText, setFilterText] = useState('');

    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);

    const [form2, setForm2] = useState({
        necesidad: '',
        hospitalizado_reciente: 2,
        id_riesgo: '',
        no_cama: '',
        procedimientos_sala: '',
        id_salaatencionmedica: '',
        especialidad: ''
    });




    const GetProcedimientos = () => {
        axios.get('/api/procedimientos')
            .then(response => {
                setProcedimientos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }
    const GetEspecialidades = () => {
        axios.get('/api/especialidad')
            .then(response => {
                setEspecialidades(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const GetCamas = () => {
        axios.get('/api/cama')
            .then(response => {
                setCama(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }



    const handleChange1 = e => {
        setForm2(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )
    }
    const handleInputChangeC1 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC1(value);
    }
    const handleInputChangeC2 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC2(value);
    }
    const handleInputChangeC3 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC3(value);
    }
    const handleInputChangeC4 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC4(value);
    }
    const handleInputChangeC5 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC5(value);
    }

    const notificarExitoCaso = (idcaso) =>
        toast.success(`${t("mensajes.mscasoid")} ${idcaso} ${t("mensajes.msexito")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });;

    const notificarErrorCaso = () =>
        toast.error(`${t("mensajes.mscreacionerror")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });;
    const PostKamban = () => {
        let necesidades = "{";
        if (c1) {
            necesidades = necesidades + "1,";
        }
        if (c2) {
            necesidades = necesidades + "2,";
        }
        if (c3) {
            necesidades = necesidades + "3,";
        }
        if (c4) {
            necesidades = necesidades + "4,";
        }
        if (c5) {
            necesidades = necesidades + "5,";
        }
        if (necesidades != "{") {
            necesidades = necesidades.substring(0, necesidades.length - 1);
        }
        necesidades = necesidades + "}";
        setForm2(
            prevState => ({
                ...prevState,
                id_riesgo: necesidades
            })
        );
        axios.post('/api/monitoreo', {
            necesidad: form2.necesidad,
            hospitalizado_reciente: form2.hospitalizado_reciente,
            id_riesgo: necesidades,
            no_cama: form2.no_cama,
            procedimientos_sala: form2.procedimientos_sala,
            id_salaatencionmedica: form2.id_salaatencionmedica,
            especialidad: form2.especialidad
        })
            .then(response => {
                notificarExitoCaso(response.data.id);
                /* setMostrarFormulario(true);
                 (
                     prevState => ({
                         ...prevState,
                         id_paciente: response.data.id_paciente
                     })
                 )*/
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    useEffect(() => {
        GetEspecialidades();
        GetProcedimientos();
        GetCamas();
    }, []);
    useEffect(() => {
        if (params.monitoreo != null) {
            if (params.monitoreo.id_riesgo != null) {
                let id_riesgo = params.monitoreo.id_riesgo.substring(1, params.monitoreo.id_riesgo.length - 1);
                let id_riesgos = id_riesgo.split(",");
                id_riesgos.forEach(element => {
                    if (element == "1") {
                        setC1(true);
                    } else if (element == "2") {
                        setC2(true);
                    } else if (element == "3") {
                        setC3(true);
                    } else if (element == "4") {
                        setC4(true);
                    } else if (element == "5") {
                        setC5(true);
                    }
                });
            }

            setForm2(
                prevState => ({
                    ...prevState,
                    necesidad: params.monitoreo.necesidad != null ? params.monitoreo.necesidad : "",
                    hospitalizado_reciente: params.monitoreo.hospitalizado_reciente != null ? params.monitoreo.hospitalizado_reciente : "",
                    id_riesgo: params.monitoreo.id_riesgo != null ? params.monitoreo.id_riesgo : "",
                    no_cama: params.monitoreo.no_cama != null ? params.monitoreo.no_cama : "",
                    procedimientos_sala: params.monitoreo.procedimientos_sala != null ? params.monitoreo.procedimientos_sala : "",
                    id_salaatencionmedica: params.monitoreo.id_salaatencionmedica,
                    especialidad: params.monitoreo.especialidad != null ? params.monitoreo.especialidad : ""
                })
            );
        } else {
            setC1(false);
            setC2(false);
            setC3(false);
            setC4(false);
            setC5(false);
            setForm2(
                prevState => ({
                    ...prevState,
                    necesidad: "",
                    hospitalizado_reciente: "",
                    id_riesgo: "",
                    no_cama: "",
                    procedimientos_sala: "",
                    id_salaatencionmedica: params.codigo,
                    especialidad: ""
                })
            );
        }


    }, [params.monitoreo]);

    const columns = useMemo(() => [
        {
            name: `${t("formularios.formkamban.codigo")}`,
            sortable: true,
            minWidth: '100px',
            selector: (row) => row.id_especialidad,
        }, {
            name: `${t("formularios.formkamban.necesidad")}`,
            sortable: true,
            minWidth: '300px',
            selector: (row) => row.nombre_especialidad,
        }
    ])
    //TABLA especialidades

    const filteredItems = especialidades.filter(
        (item) =>
        (item.id_especialidad &&
            item.id_especialidad
                .toString()
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

    return (
        <div>
            <div>
                

            </div>


            <Grid
                container
                noValidate
                direction="row"
                justifyContent="center"
                spacing={3}
                sx={{ my: 2 }}
                component="form"
                autoComplete="off"
            >
                <Grid item xs={12} md={12} lg={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="label_tipo1">{t("formularios.formkamban.necesidad")}</InputLabel>
                        <Select
                            labelId="label_tipo1"
                            value={form2.necesidad}
                            onChange={handleChange1}
                            name="necesidad"
                            label={`${t("formularios.formkamban.necesidad")}`}
                        >

                            <MenuItem key="Cuidado intermedio" value="Cuidado intermedio">
                                {t("formularios.formkamban.cuidadointer")}
                            </MenuItem>
                            <MenuItem key="Cuidado mínimo" value="Cuidado mínimo">
                                {t("formularios.formkamban.cuidadomin")}
                            </MenuItem>
                            <MenuItem key="Cuidado intensivo" value="Cuidado intensivo">
                                {t("formularios.formkamban.cuidadoten")}
                            </MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">{t("formularios.formkamban.hptlz30")}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="hospitalizado_reciente"
                        >
                            <FormControlLabel value="1" control={<Radio onChange={handleChange1} checked={form2.hospitalizado_reciente == 1} />} label="Si" />
                            <FormControlLabel value="2" control={<Radio onChange={handleChange1} checked={form2.hospitalizado_reciente == 2} />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox
                                checked={c1}
                                onChange={handleInputChangeC1} />}
                            label={`${t("formularios.formkamban.flebite")}`} />
                        <FormControlLabel control={
                            <Checkbox
                                checked={c2}
                                onChange={handleInputChangeC2} />}
                            label={`${t("formularios.formkamban.caida")}`} />
                        <FormControlLabel control={
                            <Checkbox
                                checked={c3}
                                onChange={handleInputChangeC3} />}
                            label={`${t("formularios.formkamban.exaccidente")}`} />
                        <FormControlLabel control={
                            <Checkbox
                                checked={c4}
                                onChange={handleInputChangeC4} />}
                            label={`${t("formularios.formkamban.ulcera")}`} />
                        <FormControlLabel control={
                            <Checkbox
                                checked={c5}
                                onChange={handleInputChangeC5} />}
                            label={`${t("formularios.formkamban.exsonda")}`} />

                    </FormGroup>
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                    <Stack direction="row">
                        <FormControl fullWidth size="small">
                            <InputLabel id="label_tipo1">{t("formularios.formkamban.nocama")}</InputLabel>
                            <Select
                                labelId="label_tipo1"
                                value={form2.no_cama}
                                onChange={handleChange1}
                                name="no_cama"
                                label={`${t("formularios.formkamban.nocama")}`}
                            >

                                {camas.map((tipo) => (
                                    <MenuItem value={tipo.id_sala_camas} key={tipo.id_sala_camas}>{tipo.id_sala_camas}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <Button variant="outlined" onClick={abrirVentanaCamas}
                            startIcon={< AddIcon />}
                            sx={{
                                p: 0,
                                minWidth: '40px',
                                '& > span.MuiButton-startIcon': { m: 0 },
                            }} />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <Stack direction="row">

                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label={`${t("eclinical.monitoreo.datos.especial")}`}

                            value={Especialidad || form2.especialidad}
                            name="especialidad"
                            onChange={handleChange1}
                            InputProps={{
                                readOnly: true,
                            }}

                        />
                        <Button variant="outlined" onClick={handleShow2}
                            startIcon={< SearchIcon />}
                            sx={{
                                p: 0,
                                minWidth: '40px',
                                '& > span.MuiButton-startIcon': { m: 0 },
                            }} />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="label_tipo1">{t("formularios.formkamban.procedimientos")}</InputLabel>
                        <Select
                            labelId="label_tipo1"
                            value={form2.procedimientos_sala}
                            onChange={handleChange1}
                            name="procedimientos_sala"
                            label={`${t("formularios.formkamban.procedimientos")}`}
                        >

                            {procedimientos.map((tipo) => (
                                <MenuItem value={tipo.id_sala_procedimiento} key={tipo.id_sala_procedimiento}>{tipo.nombre_procedimiento}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>

                    <Button variant="outlined" onClick={PostKamban}>
                        {t("etiquetas.guardar")}
                    </Button>

                </Grid>
            </Grid>
            <Dialog
                fullWidth
                maxWidth="md"
                open={show2}
                onClose={handleClose2}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontSize: '1.3rem' }}>
                            {t("formularios.formkamban.select")}
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose2}
                            aria-label="Cerrar"
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers>
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
                                onRowClicked={(row) => {
                                    setEspecialidadTemp(row.nombre_especialidad);
                                    setIdEspecialidadTemp(row.id_especialidad);
                                    let select = row;
                                    if (!idEspecialidadTemp) {
                                        setIdEspecialidadTemp(row.id_especialidad);
                                        const updatedData = especialidades.map((item) => {
                                            if (row.id_especialidad !== item.id_especialidad) {
                                                return item;
                                            }

                                            return {
                                                ...item,
                                                toggleSelected: true,
                                            };
                                        });

                                        setEspecialidades(updatedData);
                                    } else {
                                        if (row.id_especialidad === idAdmision) {
                                            select = null;
                                            setIdEspecialidadTemp(row.id_especialidad);
                                            const updatedData = especialidades.map((item) => {
                                                if (row.id_especialidad !== item.id_especialidad) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: false,
                                                };
                                            });
                                            setEspecialidades(updatedData);
                                        } else {
                                            setIdEspecialidadTemp(row.id_especialidad);
                                            const updatedData = especialidades.map((item) => {
                                                if (idEspecialidadTemp === item.id_especialidad) {
                                                    return {
                                                        ...item,
                                                        toggleSelected: false,
                                                    };
                                                } else if (row.id_especialidad !== item.id_especialidad) {
                                                    return item;
                                                }

                                                return {
                                                    ...item,
                                                    toggleSelected: true,
                                                };
                                            });
                                            setEspecialidades(updatedData);
                                        }
                                    }
                                }}
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
                </DialogContent>
                <DialogActions sx={{ mb: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setEspecialidad(EspecialidadTemp);
                            setForm2(
                                prevState => ({
                                    ...prevState,
                                    especialidad: idEspecialidadTemp
                                })
                            );
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default FormularioKamban;
