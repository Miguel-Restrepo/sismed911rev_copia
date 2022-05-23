import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Icofont from "react-icofont";
import InputMask from "react-input-mask";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import { useEffect, useState } from "react";

import { DateTime } from "luxon";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import chroma from "chroma-js";

import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Clasificacion() {
    const [t, i18n] = useTranslation("global");

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    //DATOS SELECT COLORIDO
    const colourOptions = [
        { value: "Rojo", label: "Rojo", color: "#FF5630" },
        { value: "Naranja", label: "Naranja", color: "#FF8B00" },
        { value: "Amarillo", label: "Amarillo", color: "#FFC400" },
        { value: "Azul", label: "Azul", color: "#0052CC" },
        { value: "Verde", label: "Verde", color: "#36B37E" },
    ];

    const dot = (color = "transparent") => ({
        alignItems: "center",
        display: "flex",

        ":before": {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: "block",
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? data.color
                    : isFocused
                    ? color.alpha(0.1).css()
                    : undefined,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                    ? chroma.contrast(color, "white") > 2
                        ? "white"
                        : "black"
                    : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [pacienteTemp, setPacienteTemp] = useState("");
    const [idPacienteTemp, setIdPacienteTemp] = useState("");
    const [admisiones, setAdmisiones] = useState([]);
    const [mostrarSelect, setMostrarSelect] = useState(false); //mostrar o ucultar slect
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //mostrar o ucultar formulario
    const [motivos, setMotivos] = useState([]);
    const [localizaciones, setLocalizacion] = useState([]);
    const [causas, setCausa] = useState([]);
    const [sistemas, setsistemas] = useState([]);
    const [idAdmision, setIdAdmision] = useState(null);
    const [formAdmision, setFormAdmision] = useState({
        id_ingreso: "",
        id_paciente: "",
        acompañante: "",
        telefono_acompañante: "",
        fecha_admision: "",
        cod911: "",
        id_motivoatencion: "",
        id_localizaciontrauma: "",
        id_causatrauma: "",
        id_sistema: "",
        glasgow_admision: "",
        pas_admision: "",
        //pad_admision: "",
        fc_admision: "",
        so2_admision: "",
        fr_admision: "",
        temp_admision: "",
        clasificacion_admision: "Amarillo",
        dolor: "",
        id_signos: "",
        motivo_consulta: "",
        signos_sintomas: "",
        fecha_clasificacion: "",
        fecha_inicio_clasificacion: DateTime.now()
            .set({ milliseconds: 0 })
            .toISO({ suppressMilliseconds: true }),
    });

    //TABLA PRINCIPAL
    const columns1 = [
        {
            dataField: "codigo",
            text: `${t("eclinical.clasificacion.datos.id")}`,
            sort: true,
        },
        {
            dataField: "fecha_admision",
            text: `${t("eclinical.clasificacion.datos.fecha")}`,
            sort: true,
        },
        {
            dataField: "expediente",
            text: `${t("eclinical.clasificacion.datos.hc")}`,
            sort: true,
        },
        {
            dataField: "nombre1", //'nombre2','apellido1','apellido2',
            text: `${t("eclinical.clasificacion.datos.paciente")}`,
            sort: true,
        },
        {
            dataField: "nombre_ingreso",
            text: `${t("eclinical.clasificacion.datos.tipoingreso")}`,
            sort: true,
        },
        {
            dataField: "cod911",
            text: `${t("eclinical.clasificacion.datos.cod911")}`,
            sort: true,
        },
        {
            dataField: "nombre_genero",
            text: `${t("eclinical.clasificacion.datos.sexo")}`,
            sort: true,
        },
        {
            dataField: "acompañante",
            text: `${t("eclinical.clasificacion.datos.compa")}`,
            sort: true,
        },
    ];

    const options1 = {
        custom: true,
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: `${t("tabla.primera")}`,
        prePageText: `${t("tabla.anterior")}`,
        nextPageText: `${t("tabla.sgte")}`,
        lastPageText: `${t("tabla.ultima")}`,
        nextPageTitle: `${t("tabla.sgtepag")}`,
        prePageTitle: `${t("tabla.anteriorpag")}`,
        firstPageTitle: `${t("tabla.primerapag")}`,
        lastPageTitle: `${t("tabla.ultimapag")}`,
        showTotal: true,
        totalSize: admisiones.length,
    };

    const selectRow1 = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setIdAdmision(row.codigo);
            setFormAdmision((prevState) => ({
                ...prevState,
                id_ingreso: row.id_ingreso,
                id_paciente: row.id_paciente == null ? "" : row.id_paciente,
                acompañante: row.acompañante == null ? "" : row.acompañante,
                telefono_acompañante:
                    row.telefono_acompañante == null
                        ? ""
                        : row.telefono_acompañante,
                fecha_admision:
                    row.fecha_admision == null ? "" : row.fecha_admision,
                cod911: row.cod911 == null ? "" : row.cod911,
                id_motivoatencion:
                    row.id_motivoatencion == null ? "" : row.id_motivoatencion,
                id_localizaciontrauma:
                    row.id_localizaciontrauma == null
                        ? ""
                        : row.id_localizaciontrauma,
                id_causatrauma:
                    row.id_causatrauma == null ? "" : row.id_causatrauma,
                id_sistema: row.id_sistema == null ? "" : row.id_sistema,
                glasgow_admision:
                    row.glasgow_admision == null ? "" : row.glasgow_admision,
                pas_admision: row.pas_admision == null ? "" : row.pas_admision,
                //pad_admision: row.pad_admision == null ? "" : row.pad_admision,
                fc_admision: row.fc_admision == null ? "" : row.fc_admision,
                so2_admision: row.so2_admision == null ? "" : row.so2_admision,
                fr_admision: row.fr_admision == null ? "" : row.fr_admision,
                temp_admision:
                    row.temp_admision == null ? "" : row.temp_admision,
                clasificacion_admision:
                    row.clasificacion_admision == null
                        ? ""
                        : row.clasificacion_admision,
                dolor: row.dolor == null ? "" : row.dolor,
                id_signos: row.id_signos == null ? "" : row.id_signos,
                motivo_consulta:
                    row.motivo_consulta == null ? "" : row.motivo_consulta,
                signos_sintomas:
                    row.signos_sintomas == null ? "" : row.signos_sintomas,
                fecha_clasificacion:
                    row.fecha_clasificacion == null
                        ? DateTime.now()
                              .set({ milliseconds: 0 })
                              .toISO({ suppressMilliseconds: true })
                        : row.fecha_clasificacion,
                fecha_inicio_clasificacion:
                    row.fecha_inicio_clasificacion == null
                        ? DateTime.now()
                              .set({ milliseconds: 0 })
                              .toISO({ suppressMilliseconds: true })
                        : row.fecha_inicio_clasificacion,
            }));
            setMostrarFormulario(true);
        },
    };

    const contentTable1 = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="codigo"
                columns={columns1}
                data={admisiones}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <SearchBar
                            placeholder={`${t("tabla.buscador")}`}
                            {...toolkitprops.searchProps}
                        />
                        <BootstrapTable
                            striped
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t("tabla.sindatos")}`}
                            selectRow={selectRow1}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );
    //TABLA MODAL
    const { SearchBar } = Search;

    const columns = [
        {
            dataField: "sintomas_signos",
            text: `${t("eclinical.clasificacion.datos.signos")}`,
            sort: true,
        },
    ];

    const options = {
        custom: true,
        paginationSize: 3,
        pageStartIndex: 1,
        firstPageText: `${t("tabla.primera")}`,
        prePageText: `${t("tabla.anterior")}`,
        nextPageText: `${t("tabla.sgte")}`,
        lastPageText: `${t("tabla.ultima")}`,
        nextPageTitle: `${t("tabla.sgtepag")}`,
        prePageTitle: `${t("tabla.anteriorpag")}`,
        firstPageTitle: `${t("tabla.primerapag")}`,
        lastPageTitle: `${t("tabla.ultimapag")}`,
        showTotal: true,
        totalSize: pacientes.length,
    };

    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setPacienteTemp(row.sintomas_signos);
            setIdPacienteTemp(row.id_signos);
        },
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_signos"
                columns={columns}
                data={pacientes}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <SearchBar
                            placeholder={`${t("tabla.buscador")}`}
                            {...toolkitprops.searchProps}
                            className="mb-3"
                        />
                        <BootstrapTable
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t("tabla.sindatos")}`}
                            selectRow={selectRow}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    const GetPacientes = () => {
        axios
            .get("/api/sala_signos")
            .then((response) => {
                setPacientes(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetAdmisiones = () => {
        axios
            .get("/api/sala_admision/clasificacion")
            .then((response) => {
                setAdmisiones(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetMotivos = () => {
        axios
            .get("/api/sala_motivoatencion")
            .then((response) => {
                setMotivos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetLocalizacion = () => {
        axios
            .get("/api/sala_localizaciontrauma")
            .then((response) => {
                setLocalizacion(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetCausa = () => {
        axios
            .get("/api/sala_causatrauma")
            .then((response) => {
                setCausa(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetSistema = () => {
        axios
            .get("/api/sala_sistema")
            .then((response) => {
                setsistemas(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const seleccionColor = (e) => {
        setFormAdmision((prevState) => ({
            ...prevState,
            clasificacion_admision: e.value,
        }));
    };

    const handleChange = (e) => {
        e.persist();
        setFormAdmision((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const cambioSelect = (e) => {
        e.persist();
        if (e.target.value == 1) {
            setMostrarSelect(true);
        } else {
            setMostrarSelect(false);
        }
        setFormAdmision((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const notificarExitoCaso = (codigo) =>
        toast.success(
            `${t("mensajes.msccasoid")} ${codigo} ${t("mensajes.mscexito")}`,
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
        toast.error(`${t("mensajes.msclasificacionerror")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    const PostAdmision = () => {
        axios
            .put(`/api/sala_admision/${idAdmision}`, formAdmision)
            .then((response) => {
                GetAdmisiones();
                notificarExitoCaso(idAdmision);
                setMostrarFormulario(false);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    useEffect(() => {
        GetAdmisiones();
        GetPacientes();
        GetSistema();
        GetMotivos();
        GetLocalizacion();
        GetCausa();
    }, []);

    useEffect(() => {
        setFormAdmision((prevState) => ({
            ...prevState,
            id_signos: idPaciente,
        }));
    }, [paciente, idPaciente]);

    return (
        <div>
            <div>
                <h2>{t("eclinical.clasificacion.titulo")}</h2>
            </div>
            <PaginationProvider pagination={paginationFactory(options1)}>
                {contentTable1}
            </PaginationProvider>
            <br></br>
            <div>
                <h3>
                    <Icofont icon="patient-file" className="mx-2" />
                    {t("formularios.formulario")}
                </h3>
            </div>
            <br></br>

            {mostrarFormulario && (
                <Form className={mostrarFormulario ? "show-element" : null}>
                    <Row className="mb-4">
                        <Form.Group as={Col} controlId="id_ingreso">
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.motivo")}
                                </strong>
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    value={formAdmision.id_motivoatencion}
                                    onChange={cambioSelect}
                                    name="id_motivoatencion"
                                >
                                    <option value="" id="defAcc">
                                        {`-- ${t("etiquetas.seleccion")} --`}
                                    </option>

                                    {motivos.map((tipo) => (
                                        <option
                                            key={tipo.id_motivoatencion}
                                            value={tipo.id_motivoatencion}
                                        >
                                            {tipo.nombre_motivoatencion}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        {mostrarSelect && (
                            <div>
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        <strong>
                                            {t(
                                                "eclinical.clasificacion.datos.lugartrauma"
                                            )}
                                        </strong>
                                    </Form.Label>

                                    <Form.Control
                                        as="select"
                                        placeholder={`${t(
                                            "eclinical.clasificacion.datos.lugartrauma"
                                        )}`}
                                        name="id_localizaciontrauma"
                                        value={
                                            formAdmision.id_localizaciontrauma
                                        }
                                        onChange={handleChange}
                                    >
                                        {localizaciones.map((elemento) => (
                                            <option
                                                key={
                                                    elemento.id_localizaciontrauma
                                                }
                                                value={
                                                    elemento.id_localizaciontrauma
                                                }
                                            >
                                                {
                                                    elemento.nombre_localizaciontrauma
                                                }
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        <strong>
                                            {t(
                                                "eclinical.clasificacion.datos.causatrauma"
                                            )}
                                        </strong>
                                    </Form.Label>

                                    <Form.Control
                                        as="select"
                                        placeholder={`${t(
                                            "eclinical.clasificacion.datos.causatrauma"
                                        )}`}
                                        name="id_causatrauma"
                                        value={formAdmision.id_causatrauma}
                                        onChange={handleChange}
                                    >
                                        {causas.map((elemento) => (
                                            <option
                                                key={elemento.id_salaCausa}
                                                value={elemento.id_salaCausa}
                                            >
                                                {elemento.nombre_causaTrauma}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        )}

                        {!mostrarSelect && (
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "eclinical.clasificacion.datos.sistema"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    as="select"
                                    placeholder={`${t(
                                        "eclinical.clasificacion.datos.sistema"
                                    )}`}
                                    name="id_sistema"
                                    value={formAdmision.id_sistema}
                                    onChange={handleChange}
                                >
                                    {sistemas.map((elemento) => (
                                        <option
                                            key={elemento.id_sistema}
                                            value={elemento.id_sistema}
                                        >
                                            {elemento.nombre_sistema}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.glasgow")}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="number"
                                placeholder={`${t(
                                    "eclinical.clasificacion.datos.glasgow"
                                )}`}
                                name="glasgow_admision"
                                value={formAdmision.glasgow_admision}
                                onChange={handleChange}
                                onKeyUp={(e) => {
                                    if (e.target.value > 15) {
                                        e.target.value = 15;
                                    }
                                }}
                                onBlur={(e) => {
                                    if (
                                        e.target.value < 3 &&
                                        e.target.value != ""
                                    ) {
                                        e.target.value = 3;
                                    }
                                }}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.pa")}
                                </strong>
                            </Form.Label>

                            <InputMask
                                mask="(999)/(999) mmHg"
                                value={formAdmision.pas_admision}
                                onChange={handleChange}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={`${t(
                                        "eclinical.clasificacion.datos.pa"
                                    )}`}
                                    name="pas_admision"
                                />
                            </InputMask>
                        </Form.Group>

                        {/* <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.pad")}
                                </strong>
                            </Form.Label>

                            <InputMask
                                mask="(99)/(99) mmHg"
                                value={formAdmision.pad_admision}
                                onChange={handleChange}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={`${t(
                                        "eclinical.clasificacion.datos.pad"
                                    )}`}
                                    name="pad_admision"
                                />
                            </InputMask>
                        </Form.Group> */}

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.fc")}
                                </strong>
                            </Form.Label>

                            <InputMask
                                mask="999 bpm"
                                value={formAdmision.fc_admision}
                                onChange={handleChange}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={`${t(
                                        "eclinical.clasificacion.datos.fc"
                                    )}`}
                                    name="fc_admision"
                                />
                            </InputMask>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.so2")}
                                </strong>
                            </Form.Label>

                            <InputMask
                                mask="999 %"
                                value={formAdmision.so2_admision}
                                onChange={handleChange}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={`${t(
                                        "eclinical.clasificacion.datos.so2"
                                    )}`}
                                    name="so2_admision"
                                />
                            </InputMask>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.fr")}
                                </strong>
                            </Form.Label>

                            <InputMask
                                mask="99 rpm"
                                value={formAdmision.fr_admision}
                                onChange={handleChange}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={`${t(
                                        "eclinical.clasificacion.datos.fr"
                                    )}`}
                                    name="fr_admision"
                                />
                            </InputMask>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.clasificacion.datos.temperatura"
                                    )}
                                </strong>
                            </Form.Label>

                            <InputMask
                                mask="99 °C"
                                value={formAdmision.temp_admision}
                                onChange={handleChange}
                            >
                                <Form.Control
                                    type="text"
                                    name="temp_admision"
                                    value={formAdmision.temp_admision}
                                    placeholder={`${t(
                                        "eclinical.clasificacion.datos.temperatura"
                                    )}`}
                                />
                            </InputMask>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.titulo")}
                                </strong>
                            </Form.Label>
                            <Select
                                name="clasificacion_admision"
                                defaultValue={colourOptions[2]}
                                onChange={seleccionColor}
                                options={colourOptions}
                                styles={colourStyles}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.dolor")}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={formAdmision.dolor}
                                onChange={handleChange}
                                name="dolor"
                            >
                                <option value="">{`-- ${t(
                                    "etiquetas.seleccion"
                                )} --`}</option>
                                <option value="1">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 1`}</option>
                                <option value="2">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 2`}</option>
                                <option value="3">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 3`}</option>
                                <option value="4">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 4`}</option>
                                <option value="5">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 5`}</option>
                                <option value="6">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 6`}</option>
                                <option value="7">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 7`}</option>
                                <option value="8">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 8`}</option>
                                <option value="9">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 9`}</option>
                                <option value="10">{`${t(
                                    "eclinical.clasificacion.datos.escala"
                                )} 10`}</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column sm={3}>
                                <strong>
                                    {t("eclinical.clasificacion.datos.signos")}
                                </strong>
                            </Form.Label>
                            <Col sm={9}>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        id="x"
                                        placeholder={`-- ${t(
                                            "etiquetas.seleccionopcion"
                                        )} --`}
                                        disabled
                                        value={paciente}
                                        onChange={handleChange}
                                        name="id_signos"
                                    />

                                    <InputGroup.Text onClick={handleShow2}>
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.clasificacion.datos.motivo")}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder={`${t(
                                    "eclinical.clasificacion.datos.motivo"
                                )}`}
                                value={formAdmision.motivo_consulta}
                                onChange={handleChange}
                                name="motivo_consulta"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.clasificacion.datos.signodescrip"
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder={`${t(
                                    "eclinical.clasificacion.datos.signodescrip"
                                )}`}
                                value={formAdmision.signos_sintomas}
                                onChange={handleChange}
                                name="signos_sintomas"
                            />
                        </Form.Group>
                    </Row>

                    {formAdmision.id_motivoatencion != "" &&
                        formAdmision.dolor != "" &&
                        formAdmision.temp_admision != "" && (
                            <Button variant="primary" onClick={PostAdmision}>
                                {t("etiquetas.enviar")}
                            </Button>
                        )}
                </Form>
            )}
            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("eclinical.clasificacion.datos.signos")}
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
                            setPaciente(pacienteTemp);
                            setIdPaciente(idPacienteTemp);
                            handleClose2();
                        }}
                    >
                        {t("etiquetas.seleccionar")}
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
}

export default Clasificacion;
