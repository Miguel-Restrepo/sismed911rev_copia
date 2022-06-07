import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Modal from "react-bootstrap/Modal";
import Icofont from "react-icofont";
import InputGroup from "react-bootstrap/InputGroup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceConfig from "../config/service";

toast.configure();

const FormularioPaciente = (params) => {
    const [t, i18n] = useTranslation("global");
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [tipos_documentos, setTipos_documentos] = useState([]);
    const [tipos_edad, setTipos_edad] = useState([]);
    const [tipos_genero, setTipos_genero] = useState([]);
    const [nuevoPaciente, setNuevoPaciente] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [search, setSearch] = useState(false);
    const [searchN, setSearchN] = useState(false);

    const [formPaciente, setFormPaciente] = useState({
        cod_casopreh: "",
        tipo_doc: "",
        num_doc: "",
        expendiente: "",
        fecha_nacido: "",
        edad: "",
        cod_edad: "",
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        genero: "",
        apodo: "",
        nacionalidad: "",
        celular: "",
        aseguradro: "",
        direccion: "",
        observacion: "",
    });

    const clearform = () => {
        setFormPaciente({
            tipo_doc: "",
            num_doc: "",
            expendiente: "",
            fecha_nacido: "",
            edad: "",
            cod_edad: "",
            nombre1: "",
            nombre2: "",
            apellido1: "",
            apellido2: "",
            genero: "",
            apodo: "",
            nacionalidad: "",
            celular: "",
            aseguradro: "",
            direccion: "",
            observacion: "",
        });
    };

    const GetTipoDocumento = () => {
        axios
            .get("/api/tipo_id")
            .then((response) => {
                setTipos_documentos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipoEdad = () => {
        axios
            .get("/api/tipo_edad")
            .then((response) => {
                setTipos_edad(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipoGenero = () => {
        axios
            .get("/api/tipo_genero")
            .then((response) => {
                setTipos_genero(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const calcularEdadForm = (value) => {
        let end = DateTime.fromISO(DateTime.now());
        let start = DateTime.fromISO(value);
        if (end.diff(start, "years").years >= 1) {
            params.setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "years").years | 0,
                cod_edad: 1,
            }));
        } else if (end.diff(start, "months").months >= 1) {
            params.setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "months").months | 0,
                cod_edad: 2,
            }));
        } else {
            params.setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "days").days | 0,
                cod_edad: 3,
            }));
        }
    };

    const calcularEdadFormNuevo = (value) => {
        let end = DateTime.fromISO(DateTime.now());
        let start = DateTime.fromISO(value);
        if (end.diff(start, "years").years >= 1) {
            setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "years").years | 0,
                cod_edad: 1,
            }));
        } else if (end.diff(start, "months").months >= 1) {
            setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "months").months | 0,
                cod_edad: 2,
            }));
        } else {
            setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "days").days | 0,
                cod_edad: 3,
            }));
        }
    };

    const calcularEdad = (e) => {
        e.persist();
        calcularEdadForm(e.target.value);
        params.setFormPaciente((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const calcularEdadNuevo = (e) => {
        e.persist();
        let end = DateTime.fromISO(DateTime.now());
        let start = DateTime.fromISO(e.target.value);
        if (end.diff(start, "years").years >= 1) {
            setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "years").years | 0,
                cod_edad: 1,
            }));
        } else if (end.diff(start, "months").months >= 1) {
            setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "months").months | 0,
                cod_edad: 2,
            }));
        } else {
            setFormPaciente((prevState) => ({
                ...prevState,
                edad: end.diff(start, "days").days | 0,
                cod_edad: 3,
            }));
        }
        setFormPaciente((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const notificarExitoCaso = (idcaso) =>
        toast.success(
            `${t("mensajes.mscasoid")} ${idcaso} ${t("mensajes.msexito")}`,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }
        );

    const notificarErrorCaso = () =>
        toast.error(`${t("mensajes.mscreacionerror")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    const PostPaciente = () => {
        setPacientes(params.formPaciente.pacientes);

        axios
            .post("/api/pacientegeneral", formPaciente)
            .then((response) => {
                clearform();
                setNuevoPaciente(response.data);
                notificarExitoCaso(response.data.id_paciente);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    const handleChangeFormPaciente = (e) => {
        e.persist();
        params.setFormPaciente((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const seleccionPaciente = (e) => {
        e.persist();
        if (e.target.value != "") {
            setSearch(
                params.formPaciente.pacientes[e.target.value].tipo_doc == 1
            );

            params.setFormPaciente((prevState) => ({
                ...prevState,
                id_paciente:
                    params.formPaciente.pacientes[e.target.value].id_paciente,
                tipo_doc:
                    params.formPaciente.pacientes[e.target.value].tipo_doc,
                num_doc: params.formPaciente.pacientes[e.target.value].num_doc,
                expendiente:
                    params.formPaciente.pacientes[e.target.value].expendiente,
                fecha_nacido:
                    params.formPaciente.pacientes[e.target.value].fecha_nacido,
                edad: params.formPaciente.pacientes[e.target.value].edad,
                cod_edad:
                    params.formPaciente.pacientes[e.target.value].cod_edad,
                nombre1: params.formPaciente.pacientes[e.target.value].nombre1,
                nombre2: params.formPaciente.pacientes[e.target.value].nombre2,
                apellido1:
                    params.formPaciente.pacientes[e.target.value].apellido1,
                apellido2:
                    params.formPaciente.pacientes[e.target.value].apellido2,
                genero: params.formPaciente.pacientes[e.target.value].genero,
                apodo: params.formPaciente.pacientes[e.target.value].apodo,
                nacionalidad:
                    params.formPaciente.pacientes[e.target.value].nacionalidad,
                celular: params.formPaciente.pacientes[e.target.value].celular,
                aseguradro:
                    params.formPaciente.pacientes[e.target.value].aseguradro,
                direccion:
                    params.formPaciente.pacientes[e.target.value].direccion,
                observacion:
                    params.formPaciente.pacientes[e.target.value]
                        .num_observaciondoc,
            }));
        }
    };

    const handleChangeFormPacienteNuevo = (e) => {
        e.persist();
        setFormPaciente((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeFormPacienteNuevoCedula = (e) => {
        e.persist();
        setSearchN(e.target.value == 1);
        setFormPaciente((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            cod_casopreh: params.formPaciente.cod_casopreh,
        }));
    };

    const buscarCedula = async (cedula, modal) => {
        if (ServiceConfig.number_validate(cedula)) {
            await axios({
                url: "/api/pacientegeneral/get_token",
                method: "post",
                data: {
                    key: ServiceConfig.key,
                },
            })
                .then((response) => {
                    if (response.data.code && response.data.code === 403) {
                        mostarError(response.data.mensaje);
                    } else {
                        const getDatos = async (cedula) => {
                            await axios
                                .post("/api/pacientegeneral/get_datos", {
                                    doc: cedula,
                                    token: response.data,
                                })
                                .then((response) => {
                                    console.log(response.data);
                                    if (response.data.valido) {
                                        let genero = 1;
                                        if (response.data.sexo === "F")
                                            genero = 2;

                                        if (modal) {
                                            setFormPaciente((prevState) => ({
                                                ...prevState,
                                                ["fecha_nacido"]:
                                                    response.data
                                                        .fecha_nacimiento,
                                                ["nombre1"]:
                                                    response.data.nombres.split(
                                                        " "
                                                    )[0],
                                                ["nombre2"]:
                                                    response.data.nombres.split(
                                                        " "
                                                    ).length > 1
                                                        ? response.data.nombres.split(
                                                              " "
                                                          )[1]
                                                        : "",
                                                ["apellido1"]:
                                                    response.data.apellido1,
                                                ["apellido2"]:
                                                    response.data.apellido2,
                                                ["genero"]: genero,
                                                ["nacionalidad"]:
                                                    response.data.nacionalidad,
                                            }));
                                            calcularEdadFormNuevo(
                                                response.data.fecha_nacimiento
                                            );
                                        } else {
                                            params.setFormPaciente(
                                                (prevState) => ({
                                                    ...prevState,
                                                    ["fecha_nacido"]:
                                                        response.data
                                                            .fecha_nacimiento,
                                                    ["nombre1"]:
                                                        response.data.nombres.split(
                                                            " "
                                                        )[0],
                                                    ["nombre2"]:
                                                        response.data.nombres.split(
                                                            " "
                                                        ).length > 1
                                                            ? response.data.nombres.split(
                                                                  " "
                                                              )[1]
                                                            : "",
                                                    ["apellido1"]:
                                                        response.data.apellido1,
                                                    ["apellido2"]:
                                                        response.data.apellido2,
                                                    ["genero"]: genero,
                                                    ["nacionalidad"]:
                                                        response.data
                                                            .nacionalidad,
                                                })
                                            );
                                            calcularEdadForm(
                                                response.data.fecha_nacimiento
                                            );
                                        }
                                    } else {
                                        mostarError("Ha ocurrido un error");
                                    }
                                })
                                .catch(() => {
                                    mostarError("Ha ocurrido un error");
                                });
                        };

                        getDatos(cedula);
                    }
                })
                .catch(() => {
                    mostarError("Ha ocurrido un error");
                });
        } else {
            toast.warning("Número de cédula no válido", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const mostarError = (texto) => {
        toast.error(texto, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const handleChangeFormPacienteDoc = (e) => {
        setSearch(e.target.value == 1);
        handleChangeFormPaciente(e);
    };

    useEffect(() => {
        GetTipoDocumento();
        GetTipoGenero();
        GetTipoEdad();
    }, []);

    useEffect(() => {
        if (nuevoPaciente != null) {
            pacientes.push(nuevoPaciente);
            params.setFormPaciente((prevState) => ({
                ...prevState,
                pacientes: pacientes,
            }));
        }
    }, [nuevoPaciente]);

    return (
        <div>
            <Form>
                <Form.Group as={Col}>
                    <Form.Label>
                        <strong>
                            {t("formularios.formpacientes.selectpaciente")}
                        </strong>
                    </Form.Label>

                    <InputGroup className="mb-2">
                        <Form.Control
                            as="select"
                            placeholder={t(
                                "formularios.formpacientes.paciente"
                            )}
                            name="tipo_doc"
                            onChange={seleccionPaciente}
                        >
                            <option value="" key="895454">{`-- ${t(
                                "etiquetas.seleccion"
                            )} --`}</option>

                            {params.formPaciente.pacientes.map((elemento) => (
                                <option
                                    key={elemento.id_paciente}
                                    value={params.formPaciente.pacientes.indexOf(
                                        elemento
                                    )}
                                >
                                    {elemento.nombre1} {elemento.nombre2}{" "}
                                    {elemento.apellido1} {elemento.apellido2}
                                </option>
                            ))}
                        </Form.Control>

                        <InputGroup.Text onClick={handleShow2}>
                            <Icofont icon="ui-add" className="mx-2" />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                {params.formPaciente.cod_casopreh != "" &&
                params.formPaciente.id_paciente != "" ? (
                    <div>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.docid")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    as="select"
                                    value={params.formPaciente.tipo_doc}
                                    placeholder={t(
                                        "formularios.formpacientes.pasaporte"
                                    )}
                                    name="tipo_doc"
                                    onChange={handleChangeFormPacienteDoc}
                                >
                                    {tipos_documentos.map((elemento) => (
                                        <option
                                            key={elemento.id_tipo}
                                            value={elemento.id_tipo}
                                        >
                                            {elemento.descripcion}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.numero")}
                                    </strong>
                                </Form.Label>

                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="number"
                                        value={params.formPaciente.num_doc}
                                        placeholder={`${t(
                                            "formularios.formpacientes.numero"
                                        )}`}
                                        name="num_doc"
                                        onChange={handleChangeFormPaciente}
                                    />

                                    <InputGroup.Text
                                        onClick={() =>
                                            buscarCedula(
                                                params.formPaciente.num_doc,
                                                false
                                            )
                                        }
                                        className={search ? "d-flex" : "d-none"}
                                    >
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.expediente"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.expendiente}
                                    placeholder={t(
                                        "formularios.formpacientes.expediente"
                                    )}
                                    name="expendiente"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.fechanac"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="date"
                                    value={params.formPaciente.fecha_nacido}
                                    name="fecha_nacido"
                                    onChange={calcularEdad}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.edad")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    value={params.formPaciente.edad}
                                    placeholder={t(
                                        "formularios.formpacientes.edad"
                                    )}
                                    name="edad"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.tipoedad"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    as="select"
                                    value={params.formPaciente.cod_edad}
                                    placeholder={t(
                                        "formularios.formpacientes.tipoedad"
                                    )}
                                    name="cod_edad"
                                    onChange={handleChangeFormPaciente}
                                >
                                    {tipos_edad.map((elemento) => (
                                        <option
                                            key={elemento.id_edad}
                                            value={elemento.id_edad}
                                        >
                                            {elemento.nombre_edad}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.nombre1")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.nombre1}
                                    placeholder={t(
                                        "formularios.formpacientes.nombre1"
                                    )}
                                    name="nombre1"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.nombre2")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.nombre2}
                                    placeholder={t(
                                        "formularios.formpacientes.nombre2"
                                    )}
                                    name="nombre2"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.apellido1"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.apellido1}
                                    placeholder={t(
                                        "formularios.formpacientes.apellido1"
                                    )}
                                    name="apellido1"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.apellido2"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.apellido2}
                                    placeholder={t(
                                        "formularios.formpacientes.apellido2"
                                    )}
                                    name="apellido2"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} xs={2}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.genero")}
                                    </strong>
                                </Form.Label>

                                <Col sm={9}>
                                    {tipos_genero.map((elemento) => (
                                        <Form.Check
                                            type="radio"
                                            name="genero"
                                            id={elemento.id_genero}
                                            key={elemento.id_genero}
                                            value={elemento.id_genero}
                                            label={elemento.nombre_genero}
                                            onChange={handleChangeFormPaciente}
                                            checked={
                                                params.formPaciente.genero ==
                                                elemento.id_genero
                                            }
                                        />
                                    ))}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.apodo")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.apodo}
                                    placeholder={t(
                                        "formularios.formpacientes.apodo"
                                    )}
                                    name="apodo"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.nacionalidad"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.nacionalidad}
                                    placeholder={t(
                                        "formularios.formpacientes.nacionalidad"
                                    )}
                                    name="nacionalidad"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.telefono"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Col sm={9} className="mx-0">
                                    <PhoneInput
                                        containerClass="mx-0"
                                        inputClass="mx-0"
                                        country={"co"}
                                        value={params.formPaciente.celular}
                                        onChange={(value) =>
                                            params.setFormPaciente(
                                                (prevState) => ({
                                                    ...prevState,
                                                    celular: value,
                                                })
                                            )
                                        }
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.segurosocial"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    value={params.formPaciente.aseguradro}
                                    placeholder={t(
                                        "formularios.formpacientes.segurosocial"
                                    )}
                                    name="aseguradro"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.direccion"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.direccion}
                                    placeholder={t(
                                        "formularios.formpacientes.direccion"
                                    )}
                                    name="direccion"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.observaciones"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={params.formPaciente.observacion}
                                    as="textarea"
                                    placeholder={t(
                                        "formularios.formpacientes.observaciones"
                                    )}
                                    name="observacion"
                                    onChange={handleChangeFormPaciente}
                                />
                            </Form.Group>
                        </Row>
                    </div>
                ) : (
                    ""
                )}
            </Form>

            <Modal show={show2} onHide={handleClose2} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("formularios.formpacientes.creapaciente")}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.docid")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    as="select"
                                    value={formPaciente.tipo_doc}
                                    placeholder={t(
                                        "formularios.formpacientes.pasaporte"
                                    )}
                                    name="tipo_doc"
                                    onChange={
                                        handleChangeFormPacienteNuevoCedula
                                    }
                                >
                                    <option value="" key="986518">{`-- ${t(
                                        "etiquetas.seleccion"
                                    )} --`}</option>
                                    {tipos_documentos.map((elemento) => (
                                        <option
                                            key={elemento.id_tipo}
                                            value={elemento.id_tipo}
                                        >
                                            {elemento.descripcion}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.numero")}
                                    </strong>
                                </Form.Label>

                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="number"
                                        value={formPaciente.num_doc}
                                        placeholder={`${t(
                                            "formularios.formpacientes.numero"
                                        )}`}
                                        name="num_doc"
                                        onChange={handleChangeFormPacienteNuevo}
                                    />

                                    <InputGroup.Text
                                        onClick={() =>
                                            buscarCedula(
                                                formPaciente.num_doc,
                                                true
                                            )
                                        }
                                        className={
                                            searchN ? "d-flex" : "d-none"
                                        }
                                    >
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.expediente"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.expendiente}
                                    placeholder={`${t(
                                        "formularios.formpacientes.expediente"
                                    )}`}
                                    name="expendiente"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.fechanac"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="date"
                                    value={formPaciente.fecha_nacido}
                                    name="fecha_nacido"
                                    onChange={calcularEdadNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.edad")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    value={formPaciente.edad}
                                    placeholder={`${t(
                                        "formularios.formpacientes.edad"
                                    )}`}
                                    name="edad"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.tipoedad"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    as="select"
                                    value={formPaciente.cod_edad}
                                    placeholder={`${t(
                                        "formularios.formpacientes.tipoedad"
                                    )}`}
                                    name="cod_edad"
                                    onChange={handleChangeFormPacienteNuevo}
                                >
                                    {tipos_edad.map((elemento) => (
                                        <option
                                            key={elemento.id_edad}
                                            value={elemento.id_edad}
                                        >
                                            {elemento.nombre_edad}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.nombre1")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.nombre1}
                                    placeholder={`${t(
                                        "formularios.formpacientes.nombre1"
                                    )}`}
                                    name="nombre1"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.nombre2")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.nombre2}
                                    placeholder={`${t(
                                        "formularios.formpacientes.nombre2"
                                    )}`}
                                    name="nombre2"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.apellido1"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.apellido1}
                                    placeholder={`${t(
                                        "formularios.formpacientes.apellido1"
                                    )}`}
                                    name="apellido1"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.apellido2"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.apellido2}
                                    placeholder={`${t(
                                        "formularios.formpacientes.apellido2"
                                    )}`}
                                    name="apellido2"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} xs={2}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.genero")}
                                    </strong>
                                </Form.Label>

                                <Col sm={9}>
                                    {tipos_genero.map((elemento) => (
                                        <Form.Check
                                            type="radio"
                                            name="genero"
                                            id={elemento.id_genero}
                                            key={elemento.id_genero}
                                            value={elemento.id_genero}
                                            label={elemento.nombre_genero}
                                            checked={
                                                formPaciente.genero ==
                                                elemento.id_genero
                                            }
                                            onChange={
                                                handleChangeFormPacienteNuevo
                                            }
                                        />
                                    ))}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("formularios.formpacientes.apodo")}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.apodo}
                                    placeholder={`${t(
                                        "formularios.formpacientes.apodo"
                                    )}`}
                                    name="apodo"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.nacionalidad"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.nacionalidad}
                                    placeholder={`${t(
                                        "formularios.formpacientes.nacionalidad"
                                    )}`}
                                    name="nacionalidad"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.telefono"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Col sm={9} className="mx-0">
                                    <PhoneInput
                                        containerClass="mx-0"
                                        inputClass="mx-0"
                                        country={"co"}
                                        value={formPaciente.celular}
                                        onChange={(value) =>
                                            setFormPaciente((prevState) => ({
                                                ...prevState,
                                                celular: value,
                                            }))
                                        }
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.segurosocial"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    value={formPaciente.aseguradro}
                                    placeholder={`${t(
                                        "formularios.formpacientes.segurosocial"
                                    )}`}
                                    name="aseguradro"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.direccion"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.direccion}
                                    placeholder={`${t(
                                        "formularios.formpacientes.direccion"
                                    )}`}
                                    name="direccion"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "formularios.formpacientes.observaciones"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={formPaciente.observacion}
                                    as="textarea"
                                    placeholder={`${t(
                                        "formularios.formpacientes.observaciones"
                                    )}`}
                                    name="observacion"
                                    onChange={handleChangeFormPacienteNuevo}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            PostPaciente();
                            handleClose2();
                        }}
                    >
                        {t("etiquetas.crear")}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose2();
                        }}
                    >
                        {t("etiquetas.cancelar")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FormularioPaciente;
