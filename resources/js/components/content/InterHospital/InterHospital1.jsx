import Tabla from './Tabla';
import Formularios from './Formularios';

import Icofont from 'react-icofont';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import BootstrapTable from 'react-bootstrap-table-next';
import PhoneInput from 'react-phone-input-2';

import { DateTime } from 'luxon';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkedAlt,
    faClinicMedical,
} from '@fortawesome/free-solid-svg-icons';

import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';

import ToolkitProvider, {
    Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import ServiceConfig from '../config/service';

import 'react-toastify/dist/ReactToastify.css';
//import 'react-phone-input-2/lib/style.css';

toast.configure();

const InterHospital = () => {
    const [t, i18n] = useTranslation('global');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [servicios, setServicios] = useState([]);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [showModalExito, setShowModalExito] = useState(false);
    const handleCloseModalExito = () => setShowModalExito(false);
    const handleShowModalExito = () => setShowModalExito(true);
    const [showModalError, setShowModalError] = useState(false);
    const handleCloseModalError = () => setShowModalError(false);
    const handleShowModalError = () => setShowModalError(true);
    const [hospitales, setHospitales] = useState([]);
    const [hospital, setHospital] = useState('');
    const [idHospital, setIdHospital] = useState('');
    const [hospitalTemp, setHospitalTemp] = useState('');
    const [idHospitalTemp, setIdHospitalTemp] = useState('');
    const [motivos, setMotivos] = useState([]);
    const [datos, setDatos] = useState([]);
    const [acciones, setAcciones] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [archivo, setArchivo] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [ultimo, setUltimo] = useState('');
    const [llamadas, setLlamadas] = useState([]);
    const [imagenesdx, setImagenesdx] = useState([]);

    window.Echo.private('actinterh').listen('ActualizarInterh', (e) => {
        setUltimo(e.mensaje);
    });

    const Get = () => {
        axios
            .get('/api/interh_maestro/habilitados')
            .then((response) => {
                setDatos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
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

    //Formulario para archivos
    const [formularioArchivos, setFormularioArchivos] = useState({
        archivos: FileList,
    });
    const [formularioArchivo, setFormularioArchivo] = useState({
        archivo: File,
        cod_casointerh: '',
    });

    //estado modal crear nuevo caso
    const [form, setForm] = useState({
        telefonointerh: '',
        llamada_fallida: '',
        tipo_serviciointerh: '',
        hospital_origneinterh: '',
        nombrereportainterh: '',
        motivo_atencioninteh: '',
        accioninterh: '',
        prioridadinterh: '',
        direccion: '',
        motivo_traslado: '',
        id_imagendx: '',
        fechahorainterh: DateTime.now()
            .set({ milliseconds: 0 })
            .toISO({ suppressMilliseconds: true }),
    });

    const clearform = () => {
        setForm({
            telefonointerh: '',
            llamada_fallida: '',
            tipo_serviciointerh: '',
            hospital_origneinterh: '',
            nombrereportainterh: '',
            motivo_atencioninteh: '',
            accioninterh: '',
            direccion: '',
            prioridadinterh: '',
            id_imagendx: '',
            fechahorainterh: DateTime.now()
                .set({ milliseconds: 0 })
                .toISO({ suppressMilliseconds: true }),
        });
    };

    const [formPaciente, setFormPaciente] = useState({
        cod_casointerh: '',
        pacientes: [],
        id_paciente: '',
        tipo_doc: '',
        num_doc: '',
        expendiente: '',
        fecha_nacido: '',
        edad: '',
        cod_edad: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        genero: '',
        apodo: '',
        nacionalidad: '',
        celular: '',
        aseguradro: '',
        direccion: '',
        observacion: '',
    });

    const [formEvaluacion, setFormEvaluacion] = useState({
        pacientes: [],
        evaluaciones_clinicas: [],
        id_evaluacionclinica: '',
        cod_casointerh: '',
        fecha_horaevaluacion: '',
        cod_paciente: '',
        cod_diag_cie: '',
        diagnos_txt: '',
        triage: '',
        c_clinico: '',
        examen_fisico: '',
        tratamiento: '',
        antecedentes: '',
        paraclinicos: '',
        sv_tx: '',
        sv_fc: '',
        sv_fr: '',
        sv_temp: '',
        sv_gl: '',
        peso: '',
        talla: '',
        sv_fcf: '',
        sv_sato2: '',
        sv_apgar: '',
        sv_gli: '',
        usu_sede: '',
        tipo_paciente: '',
    });

    const [formHospital, setFormHospital] = useState({
        cod_casointerh: '',
        hospital_destinointerh: '',
        hora_seleccion_hospital: '',
        nombre_recibe: '',
        telefonointerh: '',
        hospitales: hospitales,
    });

    const [formAmbulancia, setFormAmbulancia] = useState({
        id_servcioambulacia: '',
        cod_casointerh: '',
        cod_ambulancia: '',
        hora_asigna: '',
        hora_llegada: '',
        hora_inicio: '',
        hora_destino: '',
        hora_preposicion: '',
        conductor: '',
        medico: '',
        paramedico: '',
        observaciones: '',
    });

    const { SearchBar } = Search;

    const columns = [
        {
            text: '',
            dataField: 'nombre_hospital',
            sort: true,
        },
    ];

    const options = {
        custom: true,
        paginationSize: 3,
        pageStartIndex: 1,
        firstPageText: `${t('tabla.primera')}`,
        prePageText: `${t('tabla.anterior')}`,
        nextPageText: `${t('tabla.sgte')}`,
        lastPageText: `${t('tabla.ultima')}`,
        nextPageTitle: `${t('tabla.sgtepag')}`,
        prePageTitle: `${t('tabla.anteriorpag')}`,
        firstPageTitle: `${t('tabla.primerapag')}`,
        lastPageTitle: `${t('tabla.ultimapag')}`,
        showTotal: true,
        totalSize: hospitales.length,
    };

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: false,
        style: { color: '#fff', background: '#0d6efd' },
        onSelect: (row, isSelect, rowIndex, e) => {
            setHospitalTemp(row.nombre_hospital);
            setIdHospitalTemp(row.id_hospital);
        },
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_hospital"
                columns={columns}
                data={hospitales}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <SearchBar
                            placeholder={`${t('tabla.buscador')}`}
                            {...toolkitprops.searchProps}
                            className="mb-3"
                        />
                        <BootstrapTable
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t('tabla.sindatos')}`}
                            selectRow={selectRow}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    const GetServicios = () => {
        axios
            .get('/api/interh_tiposervicio')
            .then((response) => {
                setServicios(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetHospitales = () => {
        axios
            .get('/api/hospitalesgeneral')
            .then((response) => {
                setHospitales(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetMotivos = () => {
        axios
            .get('/api/interh_motivoatencion')
            .then((response) => {
                setMotivos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetAcciones = () => {
        axios
            .get('/api/interh_accion')
            .then((response) => {
                setAcciones(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });

        axios
            .get('/api/tipo_llamada')
            .then((response) => {
                setLlamadas(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });

        axios
            .get('/api/imagendx')
            .then((response) => {
                setImagenesdx(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetPrioridades = () => {
        axios
            .get('/api/interh_prioridad')
            .then((response) => {
                setPrioridades(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const handleChange = (e) => {
        e.persist();
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const selectArchivos = (e) => {
        e.persist();

        setFormularioArchivos((prevState) => ({
            ...prevState,
            archivos: e.target.files,
        }));
        setFormularioArchivo((prevState) => ({
            ...prevState,
            archivo: e.target.files[0],
        }));
        setArchivos(e.target.files);
        setArchivo(e.target.files[0]);
    };

    const Post = () => {
        axios
            .post('/api/interh_maestro', form)
            .then((response) => {
                setHospital('');
                clearform();
                let formData = new FormData();
                for (let i = 0; i < archivos.length; i++) {
                    formData = new FormData();
                    formData.append('id_archivo', 1);
                    formData.append('archivo', archivos[i]);
                    formData.append(
                        'cod_casointerh',
                        response.data.cod_casointerh
                    );

                    axios({
                        url: '/api/archivo',
                        method: 'POST',
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then((respuesta) => {
                            Get();
                        })
                        .catch((err) => {});
                }
                Get();

                handleClose();
                notificarExitoCaso(response.data.cod_casointerh);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    useEffect(() => {}, [datos]);

    useEffect(() => {
        Get();
    }, [ultimo]);

    useEffect(() => {
        setFormularioArchivo((prevState) => ({
            ...prevState,
            archivo: archivo,
        }));
    }, [archivo, archivos]);

    useEffect(() => {
        GetServicios();
        GetHospitales();
        GetMotivos();
        GetAcciones();
        GetPrioridades();
    }, []);

    useEffect(() => {
        setForm((prevState) => ({
            ...prevState,
            hospital_origneinterh: idHospital,
        }));
    }, [hospital, idHospital]);

    //hacer put al backend a la tabla pacientegeneral cuando se actualice el estado de formPaciente
    useEffect(() => {
        if (formPaciente.id_paciente) {
            axios
                .put(`/api/pacientegeneral/${formPaciente.id_paciente}`, {
                    cod_casointerh: formPaciente.cod_casointerh,
                    id_paciente: formPaciente.id_paciente,
                    expendiente: formPaciente.expendiente,
                    num_doc: formPaciente.num_doc,
                    tipo_doc: formPaciente.tipo_doc,
                    nombre1: formPaciente.nombre1,
                    nombre2: formPaciente.nombre2,
                    apellido1: formPaciente.apellido1,
                    apellido2: formPaciente.apellido2,
                    genero: formPaciente.genero,
                    edad: formPaciente.edad,
                    fecha_nacido: formPaciente.fecha_nacido,
                    cod_edad: formPaciente.cod_edad,
                    telefono: formPaciente.telefono,
                    celular: formPaciente.celular,
                    direccion: formPaciente.direccion,
                    email: formPaciente.email,
                    aseguradro: formPaciente.aseguradro,
                    observacion: formPaciente.observacion,
                    nss: formPaciente.nss,
                    usu_sede: formPaciente.usu_sede,
                    prehospitalario: formPaciente.prehospitalario,
                    apodo: formPaciente.apodo,
                    nacionalidad: formPaciente.nacionalidad,
                    dpto_pte: formPaciente.dpto_pte,
                    provin_pte: formPaciente.provin_pte,
                    distrito_pte: formPaciente.distrito_pte,
                    admision_hospital: formPaciente.admision_hospital,
                })
                .then((response) => {
                    Get();
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
        Get();
    }, [formPaciente]);

    //hacer put al backend a la tabla interh_evaluacionclinica cuando se actualice el estado de formEvaluacion
    useEffect(() => {
        if (formEvaluacion.id_evaluacionclinica) {
            axios
                .put(
                    `/api/interh_evaluacionclinica/${formEvaluacion.id_evaluacionclinica}`,
                    {
                        fecha_horaevaluacion:
                            formEvaluacion.fecha_horaevaluacion,
                        cod_paciente: formEvaluacion.cod_paciente,
                        cod_diag_cie: formEvaluacion.cod_diag_cie,
                        diagnos_txt: formEvaluacion.diagnos_txt,
                        triage: formEvaluacion.triage,
                        c_clinico: formEvaluacion.c_clinico,
                        examen_fisico: formEvaluacion.examen_fisico,
                        tratamiento: formEvaluacion.tratamiento,
                        antecedentes: formEvaluacion.antecedentes,
                        paraclinicos: formEvaluacion.paraclinicos,
                        sv_tx: formEvaluacion.sv_tx,
                        sv_fc: formEvaluacion.sv_fc,
                        sv_fr: formEvaluacion.sv_fr,
                        sv_temp: formEvaluacion.sv_temp,
                        sv_gl: formEvaluacion.sv_gl,
                        peso: formEvaluacion.peso,
                        talla: formEvaluacion.talla,
                        sv_fcf: formEvaluacion.sv_fcf,
                        sv_sato2: formEvaluacion.sv_sato2,
                        sv_apgar: formEvaluacion.sv_apgar,
                        sv_gli: formEvaluacion.sv_gli,
                        usu_sede: formEvaluacion.usu_sede,
                        tipo_paciente: formEvaluacion.tipo_paciente,
                    }
                )
                .then((response) => {
                    Get();
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
    }, [formEvaluacion]);

    //hacer put al backend a la tabla interh_maestro cuando se actualice el estado de formHospital
    useEffect(() => {
        if (
            formHospital.cod_casointerh != null &&
            formHospital.cod_casointerh != ''
        ) {
            axios
                .put(`/api/interh_maestro/${formHospital.cod_casointerh}`, {
                    hospital_destinointerh: formHospital.hospital_destinointerh,
                    hora_seleccion_hospital:
                        formHospital.hora_seleccion_hospital,
                    nombre_recibe: formHospital.nombre_recibe,
                    telefonointerh: formHospital.telefonointerh,
                })
                .then((response) => {
                    Get();
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
    }, [formHospital]);

    return (
        <div>
            <div>
                <h2>{t('interhospital.interhospital.titulo')}</h2>
            </div>

            <div>
                <Button className="btnn" onClick={handleShow}>
                    <FontAwesomeIcon icon={faClinicMedical} className="mx-1" />
                    {t('etiquetas.nuevocaso')}
                </Button>

                <Button className="btnn" onClick={notificarErrorCaso}>
                    <FontAwesomeIcon icon={faMapMarkedAlt} className="mx-1" />
                    {t('etiquetas.mapa')}
                </Button>
            </div>

            <Tabla
                datos={datos}
                setDatos={setDatos}
                setFormPaciente={setFormPaciente}
                setFormEvaluacion={setFormEvaluacion}
                setFormHospital={setFormHospital}
                setFormAmbulancia={setFormAmbulancia}
            ></Tabla>

            <Formularios
                hospitales={hospitales}
                setFormPaciente={setFormPaciente}
                formPaciente={formPaciente}
                setFormEvaluacion={setFormEvaluacion}
                formEvaluacion={formEvaluacion}
                setFormHospital={setFormHospital}
                formHospital={formHospital}
                setFormAmbulancia={setFormAmbulancia}
                formAmbulancia={formAmbulancia}
            ></Formularios>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t('etiquetas.nuevocaso')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="Telefono"
                        >
                            <Form.Label column sm={3}>
                                {t(
                                    'interhospital.interhospital.datos.telefono'
                                )}
                            </Form.Label>

                            <Col sm={9}>
                                <PhoneInput
                                    containerClass="mx-0"
                                    inputClass="mx-0"
                                    country={ServiceConfig.codgoPais}
                                    value={form.telefonointerh}
                                    onChange={(value) =>
                                        setForm((prevState) => ({
                                            ...prevState,
                                            telefonointerh: value,
                                        }))
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="llamadaFallida"
                        >
                            <Form.Label column sm={3}>
                                {t('unificado.unido.formulario.llamadano')}
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    value={form.llamada_fallida}
                                    onChange={handleChange}
                                    name="llamada_fallida"
                                >
                                    <option value="" key="9651985" id="defServ">
                                        {`-- ${t('etiquetas.seleccion')} --`}
                                    </option>

                                    {llamadas.map((servicio) => (
                                        <option
                                            key={servicio.id_llamda_f}
                                            value={servicio.id_llamda_f}
                                            id={servicio.id_llamda_f}
                                        >
                                            {servicio.llamada_fallida}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="tipoServicio"
                        >
                            <Form.Label column sm={3}>
                                {t(
                                    'interhospital.interhospital.datos.tiposervicios'
                                )}
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    value={form.tipo_serviciointerh}
                                    onChange={handleChange}
                                    name="tipo_serviciointerh"
                                >
                                    <option value="" id="defServ">
                                        {`-- ${t('etiquetas.seleccion')} --`}
                                    </option>
                                    {servicios.map((servicio) => (
                                        <option
                                            key={servicio.id_tiposervicion}
                                            value={servicio.id_tiposervicion}
                                            id={servicio.id_tiposervicion}
                                        >
                                            {servicio.nombre_tiposervicion_es}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                {t(
                                    'interhospital.interhospital.datos.hptlorigen'
                                )}
                            </Form.Label>

                            <Col sm={9}>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        id="x"
                                        placeholder={`-- ${t(
                                            'etiquetas.seleccionhptl'
                                        )} --`}
                                        disabled
                                        value={hospital}
                                        onChange={handleChange}
                                        name="hospital_origneinterh"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        id="button-search"
                                        onClick={handleShow2}
                                    >
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="nomRepor"
                        >
                            <Form.Label column sm={3}>
                                {t(
                                    'interhospital.interhospital.datos.nombreres'
                                )}
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    value={form.nombrereportainterh}
                                    type="text"
                                    placeholder={`${t(
                                        'interhospital.interhospital.datos.nombreres'
                                    )}`}
                                    onChange={handleChange}
                                    name="nombrereportainterh"
                                />
                            </Col>
                        </Form.Group>

                        {form.tipo_serviciointerh == 2 ? (
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="direccion"
                            >
                                <Form.Label column sm={3}>
                                    {t(
                                        'interhospital.interhospital.datos.direccionorigen'
                                    )}
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        value={form.direccion}
                                        type="text"
                                        placeholder={`${t(
                                            'interhospital.interhospital.datos.direccionorigen'
                                        )}`}
                                        onChange={handleChange}
                                        name="direccion"
                                    />
                                </Col>
                            </Form.Group>
                        ) : (
                            <div>
                                <fieldset value={form.motivo_atencioninteh}>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label as="legend" column sm={3}>
                                            {t(
                                                'interhospital.interhospital.datos.motivoatencion'
                                            )}
                                        </Form.Label>

                                        <Col sm={9}>
                                            {motivos.map((motivo) => (
                                                <Form.Check
                                                    type="radio"
                                                    name="motivo_atencioninteh"
                                                    key={
                                                        motivo.id_motivoatencion
                                                    }
                                                    checked={
                                                        form.motivo_atencioninteh ==
                                                        motivo.id_motivoatencion
                                                    }
                                                    label={
                                                        motivo.nombre_motivo_es
                                                    }
                                                    id={
                                                        motivo.id_motivoatencion
                                                    }
                                                    value={
                                                        motivo.id_motivoatencion
                                                    }
                                                    onChange={handleChange}
                                                />
                                            ))}
                                        </Col>
                                    </Form.Group>
                                </fieldset>

                                {(form.motivo_atencioninteh == 1 ||
                                    form.motivo_atencioninteh == 2) && (
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="motivotraslado"
                                    >
                                        <Form.Label column sm={3}>
                                            {t(
                                                'interhospital.interhospital.datos.motivotraslado'
                                            )}
                                        </Form.Label>

                                        <Col sm={9}>
                                            <Form.Control
                                                as="select"
                                                value={form.motivo_traslado}
                                                onChange={handleChange}
                                                name="motivo_traslado"
                                            >
                                                <option value="">
                                                    {`-- ${t(
                                                        'etiquetas.seleccion'
                                                    )} --`}
                                                </option>
                                                <option value="Falta de UCI">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltauci'
                                                    )}
                                                </option>
                                                <option value="Falta de la especialidad requerida">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaespecial'
                                                    )}
                                                </option>

                                                <option value="Falta de espacio en hospitalzacion">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaespacio'
                                                    )}
                                                </option>

                                                <option value="Falta de estudios de imágenes requerido">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaestudios'
                                                    )}
                                                </option>

                                                <option value="Falta de UCIN">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaucin'
                                                    )}
                                                </option>

                                                <option value="Falta de unidad de quemados">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltaquemados'
                                                    )}
                                                </option>

                                                <option value="Traslado desde el Domicilio">
                                                    {t(
                                                        'interhospital.interhospital.datos.traslado'
                                                    )}
                                                </option>

                                                <option value="Falta de unidad COVID">
                                                    {t(
                                                        'interhospital.interhospital.datos.faltacovid'
                                                    )}
                                                </option>

                                                <option value="otro">
                                                    {t(
                                                        'interhospital.interhospital.datos.otro'
                                                    )}
                                                </option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                )}

                                {form.motivo_atencioninteh == 4 && (
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="imagenesdx"
                                    >
                                        <Form.Label column sm={3}>
                                            {t(
                                                'interhospital.interhospital.datos.imagenesdx'
                                            )}
                                        </Form.Label>

                                        <Col sm={9}>
                                            <Form.Control
                                                as="select"
                                                value={form.id_imagendx}
                                                onChange={handleChange}
                                                name="id_imagendx"
                                            >
                                                <option value="">
                                                    {`-- ${t(
                                                        'etiquetas.seleccion'
                                                    )} --`}
                                                </option>

                                                {imagenesdx.map((img) => (
                                                    <option
                                                        key={img.id_imagendx}
                                                        value={img.id_imagendx}
                                                    >
                                                        {img.nombre_imagendx_es}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                )}
                            </div>
                        )}

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="accion"
                        >
                            <Form.Label column sm={3}>
                                {t('interhospital.interhospital.datos.accion')}
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    value={form.accioninterh}
                                    onChange={handleChange}
                                    name="accioninterh"
                                >
                                    <option value="" id="defAcc">
                                        {`-- ${t('etiquetas.seleccion')} --`}
                                    </option>
                                    {acciones.map((accion) => (
                                        <option
                                            value={accion.id_accion}
                                            key={accion.id_accion}
                                            id={accion.id_accion}
                                        >
                                            {accion.nombre_accion_es}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="prio">
                            <Form.Label column sm={3}>
                                {t(
                                    'interhospital.interhospital.datos.prioridad'
                                )}
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    value={form.prioridadinterh}
                                    onChange={handleChange}
                                    name="prioridadinterh"
                                >
                                    <option value="" id="defPrio">
                                        {`-- ${t('etiquetas.seleccion')} --`}
                                    </option>
                                    {prioridades.map((prioridad) => (
                                        <option
                                            value={prioridad.id_prioridad}
                                            key={prioridad.id_prioridad}
                                            id={prioridad.id_prioridad}
                                        >
                                            {prioridad.nombre_prioridad}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formFileMultiple"
                        >
                            <Form.Label column sm={3}>
                                {t('etiquetas.adjuntar')}
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="file"
                                    name="archivos[]"
                                    multiple
                                    onChange={selectArchivos}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={Post}>
                        {t('etiquetas.agregar')}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('etiquetas.cancelar')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t('interhospital.interhospital.datos.hptlorigen')}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PaginationProvider pagination={paginationFactory(options)}>
                        {contentTable}
                    </PaginationProvider>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setHospital(hospitalTemp);
                            setIdHospital(idHospitalTemp);
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalExito} onHide={handleCloseModalExito}>
                <Alert variant="success" className="mb-0">
                    <Alert.Heading>{t('mensajes.exito')}</Alert.Heading>
                    <p>{t('mensajes.mscreacionexito')}</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => setShowModalExito(false)}
                            variant="outline-success"
                        >
                            {t('etiquetas.aceptar')}
                        </Button>
                    </div>
                </Alert>
            </Modal>

            <Modal show={showModalError} onHide={handleCloseModalError}>
                <Alert variant="danger" className="mb-0">
                    <Alert.Heading>{t('mensajes.error')}</Alert.Heading>
                    <p>{t('mensajes.mscreacionerror')}</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => setShowModalError(false)}
                            variant="outline-danger"
                        >
                            {t('etiquetas.aceptar')}
                        </Button>
                    </div>
                </Alert>
            </Modal>
        </div>
    );
};

export default InterHospital;
