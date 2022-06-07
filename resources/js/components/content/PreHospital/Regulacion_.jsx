import Tabla from './Tabla';
import Formularios from './Formularios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
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

import axios from 'axios';
import ServiceConfig from '../config/service';

//import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Regulacion = () => {
    const [t, i18n] = useTranslation('global');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showModalExito, setShowModalExito] = useState(false);
    const handleCloseModalExito = () => setShowModalExito(false);
    const handleShowModalExito = () => setShowModalExito(true);
    const [showModalError, setShowModalError] = useState(false);
    const handleCloseModalError = () => setShowModalError(false);
    const handleShowModalError = () => setShowModalError(true);
    const [acciones, setAcciones] = useState([]);
    const [incidentes, setIncidentes] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [archivo, setArchivo] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [llamadas, setLlamadas] = useState([]);
    const [contenido_Incidente, setContenido_Incidente] = useState('');
    const [ultimo, setUltimo] = useState('');
    const [datos, setDatos] = useState([]);

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

    window.Echo.private('actpreh').listen('ActualizarPreh', (e) => {
        setUltimo(e.mensaje);
    });

    const Get = () => {
        axios
            .get('/api/preh_maestro/habilitados')
            .then((response) => {
                setDatos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    //Formulario para archivos
    const [formularioArchivos, setFormularioArchivos] = useState({
        archivos: FileList,
    });
    const [formularioArchivo, setFormularioArchivo] = useState({
        archivo: File,
        cod_casopreh: '',
    });

    //estado modal crear nuevo caso
    const [form, setForm] = useState({
        telefono_confirma: '',
        llamada_fallida: '',
        fecha: DateTime.now()
            .set({ milliseconds: 0 })
            .toISO({ suppressMilliseconds: true }),
        quepasa: '',
        incidente: '',
        direccion: '',
        nombre_reporta: '',
        prioridad: '',
        accion: '',
        caso_multiple: '',
    });

    const clearform = () => {
        setForm({
            telefono_confirma: '',
            llamada_fallida: '',
            fecha: DateTime.now()
                .set({ milliseconds: 0 })
                .toISO({ suppressMilliseconds: true }),
            quepasa: '',
            incidente: '',
            direccion: '',
            nombre_reporta: '',
            prioridad: '',
            accion: '',
            caso_multiple: '',
        });
    };

    const [formPaciente, setFormPaciente] = useState({
        cod_casopreh: '',
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
        cod_casopreh: '',
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
        tiempo_enfermedad: '',
        tipo_enfermedad: '',
        ap_med_paciente: '',
        ap_diabetes: '',
        ap_cardiop: '',
        ap_convul: '',
        ap_asma: '',
        ap_acv: '',
        ap_has: '',
        ap_alergia: '',
        ap_otros: '',
        tipo_paciente: '',
    });

    const [formHospital, setFormHospital] = useState({
        cod_casopreh: '',
        hospital_destino: '',
        hora_seleccion_hospital: '',
        nombre_medico: '',
        telefono: '',
    });

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
            .get('/api/incidentes')
            .then((response) => {
                setIncidentes(response.data);
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
            .post('/api/preh_maestro', form)
            .then((response) => {
                Get();
                clearform();
                setContenido_Incidente('');
                let formData = new FormData();
                for (let i = 0; i < archivos.length; i++) {
                    formData = new FormData();
                    formData.append('id_archivo', 1);
                    formData.append('archivo', archivos[i]);
                    formData.append('cod_casopreh', response.data.cod_casopreh);

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
                notificarExitoCaso(response.data.cod_casopreh);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    useEffect(() => {
        setFormularioArchivo((prevState) => ({
            ...prevState,
            archivo: archivo,
        }));
    }, [archivo, archivos]);

    useEffect(() => {}, [datos]);

    useEffect(() => {
        Get();
    }, [ultimo]);

    useEffect(() => {
        incidentes.map((servicio) => {
            if (servicio.id_incidente == form.incidente) {
                const extractScriptRegex =
                    /<script\b[^>]*>([\s\S]*?)<\/script>/gim;
                let scriptsExtracted;
                let innerHtml = servicio.incidente_es;
                while (
                    (scriptsExtracted = extractScriptRegex.exec(
                        servicio.incidente_es
                    ))
                ) {
                    innerHtml = innerHtml.replace(scriptsExtracted[0], '');
                    window.eval(scriptsExtracted[1]);
                }
                setContenido_Incidente(innerHtml);
            }
        });
    }, [form.incidente]);

    useEffect(() => {
        GetAcciones();
        GetPrioridades();
    }, []);

    //hacer put al backend a la tabla pacientegeneral cuando se actualice el estado de formPaciente
    useEffect(() => {
        if (formPaciente.id_paciente) {
            axios
                .put(`/api/pacientegeneral/${formPaciente.id_paciente}`, {
                    cod_casopreh: formPaciente.cod_casopreh,
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
    }, [formPaciente]);

    //hacer put al backend a la tabla preh_evaluacionclinica cuando se actualice el estado de formEvaluacion
    useEffect(() => {
        if (formEvaluacion.id_evaluacionclinica) {
            axios
                .put(
                    `/api/preh_evaluacionclinica/${formEvaluacion.id_evaluacionclinica}`,
                    {
                        id_evaluacionclinica:
                            formEvaluacion.id_evaluacionclinica,
                        cod_casopreh: formEvaluacion.cod_casopreh,
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
                        tiempo_enfermedad: formEvaluacion.tiempo_enfermedad,
                        tipo_enfermedad: formEvaluacion.tipo_enfermedad,
                        ap_med_paciente: formEvaluacion.ap_med_paciente,
                        ap_diabetes: formEvaluacion.ap_diabetes,
                        ap_cardiop: formEvaluacion.ap_cardiop,
                        ap_convul: formEvaluacion.ap_convul,
                        ap_asma: formEvaluacion.ap_asma,
                        ap_acv: formEvaluacion.ap_acv,
                        ap_has: formEvaluacion.ap_has,
                        ap_alergia: formEvaluacion.ap_alergia,
                        ap_otros: formEvaluacion.ap_otros,
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

    //hacer put al backend a la tabla preh_maestro cuando se actualice el estado de formHospital
    useEffect(() => {
        if (
            formHospital.cod_casopreh != null &&
            formHospital.cod_casopreh != ''
        ) {
            axios
                .put(
                    `/api/preh_maestro/${formHospital.cod_casopreh}`,
                    formHospital
                )
                .then((response) => {
                    Get();
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
    }, [formHospital]);

    //hacer put al backend a la tabla preh_evaluacionclinica cuando se actualice el estado de formEvaluacion
    useEffect(() => {
        if (formHospital.cod_casopreh) {
            axios
                .put(
                    `/api/preh_maestro/${formHospital.cod_casopreh}`,
                    formHospital
                )
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
                <h2>{t('unificado.unido.titulo')}</h2>
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
            ></Tabla>

            <Formularios
                setFormPaciente={setFormPaciente}
                formPaciente={formPaciente}
                setFormEvaluacion={setFormEvaluacion}
                formEvaluacion={formEvaluacion}
                setFormHospital={setFormHospital}
                formHospital={formHospital}
            ></Formularios>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{t('etiquetas.nuevocaso')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-2">
                            <Col>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="Telefono"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.telefono'
                                            )}
                                        </strong>
                                    </Form.Label>

                                    <Col sm={9}>
                                        <PhoneInput
                                            containerClass="mx-0"
                                            inputClass="mx-0"
                                            country={ServiceConfig.codgoPais}
                                            value={form.telefono_confirma}
                                            onChange={(value) =>
                                                setForm((prevState) => ({
                                                    ...prevState,
                                                    telefono_confirma: value,
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
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.llamadano'
                                            )}
                                        </strong>
                                    </Form.Label>

                                    <Col sm={9}>
                                        <Form.Control
                                            as="select"
                                            value={form.llamada_fallida}
                                            onChange={handleChange}
                                            name="llamada_fallida"
                                        >
                                            <option
                                                value=""
                                                key="9651985"
                                                id="defServ"
                                            >
                                                {`-- ${t(
                                                    'etiquetas.seleccion'
                                                )} --`}
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
                                    controlId="nomRepor"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.motivo'
                                            )}
                                        </strong>
                                    </Form.Label>

                                    <Col sm={9}>
                                        <Form.Control
                                            value={form.quepasa}
                                            as="textarea"
                                            type="text"
                                            placeholder={`${t(
                                                'unificado.unido.formulario.motivo'
                                            )}`}
                                            onChange={handleChange}
                                            name="quepasa"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="tipoServicio"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.incidente'
                                            )}
                                        </strong>
                                    </Form.Label>

                                    <Col sm={9}>
                                        <Form.Control
                                            as="select"
                                            value={form.incidente}
                                            onChange={handleChange}
                                            name="incidente"
                                        >
                                            <option
                                                value=""
                                                key="23584165474"
                                                id="defServ"
                                            >
                                                {`-- ${t(
                                                    'etiquetas.seleccion'
                                                )} --`}
                                            </option>

                                            {incidentes.map((servicio) => (
                                                <option
                                                    key={servicio.id_incidente}
                                                    value={
                                                        servicio.id_incidente
                                                    }
                                                    id={servicio.id_incidente}
                                                >
                                                    {servicio.nombre_es}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="nomRepor"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.direccion'
                                            )}
                                        </strong>
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            value={form.direccion}
                                            type="text"
                                            placeholder={`${t(
                                                'unificado.unido.formulario.direccion'
                                            )}`}
                                            onChange={handleChange}
                                            name="direccion"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="nomRepor"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.nombrereporta'
                                            )}
                                        </strong>
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            value={form.nombre_reporta}
                                            type="text"
                                            placeholder={`${t(
                                                'unificado.unido.formulario.nombrereporta'
                                            )}`}
                                            onChange={handleChange}
                                            name="nombre_reporta"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="prio"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.prioridad'
                                            )}
                                        </strong>
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            as="select"
                                            value={form.prioridad}
                                            onChange={handleChange}
                                            name="prioridad"
                                        >
                                            <option
                                                value=""
                                                key="68415684965"
                                                id="defPrio"
                                            >
                                                {`-- ${t(
                                                    'etiquetas.seleccion'
                                                )} --`}
                                            </option>
                                            {prioridades.map((prioridad) => (
                                                <option
                                                    value={
                                                        prioridad.id_prioridad
                                                    }
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
                                    controlId="accion"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t(
                                                'unificado.unido.formulario.accion'
                                            )}
                                        </strong>
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            as="select"
                                            value={form.accion}
                                            onChange={handleChange}
                                            name="accion"
                                        >
                                            <option
                                                value=""
                                                key="25846589"
                                                id="defAcc"
                                            >
                                                {`-- ${t(
                                                    'etiquetas.seleccion'
                                                )} --`}
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
                                <fieldset value={form.motivo_atencioninteh}>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label as="legend" column sm={3}>
                                            <strong>
                                                {' '}
                                                {t(
                                                    'unificado.unido.formulario.multiple'
                                                )}
                                            </strong>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Check
                                                type="radio"
                                                checked={
                                                    form.caso_multiple == 1
                                                }
                                                label="Si."
                                                name="caso_multiple"
                                                id="1"
                                                value="1"
                                                onChange={handleChange}
                                            />

                                            <Form.Check
                                                type="radio"
                                                checked={
                                                    form.caso_multiple == 0
                                                }
                                                label="No."
                                                name="caso_multiple"
                                                id="0"
                                                value="0"
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </fieldset>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formFileMultiple"
                                >
                                    <Form.Label column sm={3}>
                                        <strong>
                                            {t('etiquetas.adjuntar')}
                                        </strong>
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
                            </Col>

                            <Col>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: contenido_Incidente,
                                    }}
                                ></div>
                            </Col>
                        </Row>
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

export default Regulacion;
