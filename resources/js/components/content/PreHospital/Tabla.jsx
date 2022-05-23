import React from "react";
import classNames from "classnames";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Icofont from "react-icofont";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { withTranslation } from "react-i18next";
const { DateTime } = require("luxon");

class Tabla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            tiempo: DateTime.now(),
            show: false,
            //codigo cerrar caso
            ventanaCerrarCaso: false,
            ventanaDespacho: false,
            tiposCierre: [],
            registroSeleccionado: "",
            nombrecierre: "",
            cod_casopreh: "",
            nota: "",
            ventanaSeguimiento: false,
            seguimiento: [],
            seguimientos: [],
            seguimento: "",
            archivosActuales: [],
            ventanaArchivos: false,
            archivo: [],
            archivos: [],
        };
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
    cerrarCerrarCaso = () => this.setState({ ventanaCerrarCaso: false });
    abrirCerrarCaso = () => this.setState({ ventanaCerrarCaso: true });
    cerrarSeguimiento = () => this.setState({ ventanaSeguimiento: false });
    abrirSeguimiento = () => this.setState({ ventanaSeguimiento: true });
    cerrarDespacho = () => this.setState({ ventanaDespacho: false });
    abrirDespacho = () => this.setState({ ventanaDespacho: true });
    cerrarArchivos = () => this.setState({ ventanaArchivos: false });
    abrirArchivos = () => this.setState({ ventanaArchivos: true });
    Get = () => {
        axios
            .get("/api/preh_maestro/habilitados")
            .then((response) => {
                this.props.setDatos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
        axios
            .get("/api/tipo_cierrecaso")
            .then((response) => {
                this.setState({ tiposCierre: response.data });
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    PostDespacho = async () => {
        axios
            .put(`/api/preh_maestro/${this.state.cod_casopreh}`, {
                accion: 1,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    };

    PostCerrarCaso = async () => {
        await axios
            .post("/api/preh_cierre", {
                nombrecierre: this.state.nombrecierre,
                cod_casopreh: this.state.cod_casopreh,
                nota: this.state.nota,
            })
            .then((response) => {
                this.clearform();
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    PostArchivos = async () => {
        let formData = new FormData();
        for (let i = 0; i < this.state.archivos.length; i++) {
            formData = new FormData();
            formData.append("id_archivo", 1);
            formData.append("archivo", this.state.archivos[i]);
            formData.append("cod_casopreh", this.state.cod_casopreh);
            formData.append("nombre_original", this.state.archivos[i].name);

            axios({
                url: "/api/archivo",
                method: "POST",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((respuesta) => {})
                .catch((err) => {});
        }
    };
    clearform = () =>
        this.setState({
            nombrecierre: "",
            nota: "",
            seguimento: "",
            fecha_seguimento: "",
        });
    PostSeguimiento = async () => {
        if (this.state.seguimento != "") {
            await axios
                .post("/api/preh_seguimiento", {
                    seguimento: this.state.seguimento,
                    cod_casopreh: this.state.cod_casopreh,
                    fecha_seguimento: DateTime.now()
                        .set({ milliseconds: 0 })
                        .toISO({ suppressMilliseconds: true }),
                })
                .then((response) => {
                    this.clearform();
                    this.setState({
                        seguimento: "",
                    });
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        }
    };

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.Get();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            tiempo: new Date(),
        });
    }

    render() {
        const { t } = this.props;
        //Codigo cerrar caso

        //Fin codigo cerrar caso
        const { SearchBar } = Search;
        const columns = [
            {
                dataField: "codigo",
                text: `${t("unificado.tabla.datos.ncaso")}`,
                sort: true,
            },
            {
                dataField: "fecha",
                text: `${t("unificado.tabla.datos.fecha")}`,
                sort: true,
            },
            {
                text: `${t("unificado.tabla.datos.tiempo")}`,
                dataField: "555",
                formatter: (cell, row, rowIndex, extraData) => {
                    return (
                        <div>
                            <Icofont
                                icon="ui-clock"
                                className="mx-2 text-danger"
                            />
                            <span className="text-danger">
                                {Math.floor(
                                    Math.abs(
                                        Date.parse(row.fecha) - extraData
                                    ) /
                                        1000 /
                                        60
                                ) + " MIN"}
                            </span>
                        </div>
                    );
                },
                formatExtraData: this.state.tiempo,
                sort: true,
            },
            {
                dataField: "nombres_pacientes",
                text: `${t("unificado.unido.formulario.paciente")}`,
                sort: true,
            },
            {
                dataField: "direccion",
                text: `${t("unificado.unido.formulario.direccion")}`,
                sort: true,
            },
            {
                dataField: "nombre_es",
                text: `${t("unificado.unido.formulario.incidente")}`,
                sort: true,
            },
            {
                dataField: "prioridad",
                text: `${t("unificado.unido.formulario.prioridad")}`,
                sort: true,
            },
            {
                dataField: "nombre_hospital",
                text: `${t("unificado.tabla.datos.hptldestino")}`,
                sort: true,
            },
            {
                dataField: "nombre_medico",
                text: `${t("unificado.unido.formulario.nombremedico")}`,
                sort: true,
            },
            {
                dataField: "telefono",
                text: `${t("unificado.unido.formulario.telmedico")}`,
                sort: true,
            },
            {
                text: `${t("unificado.tabla.datos.seguimiento")}`,
                sort: true,
                dataField: "33",
                formatter: (cell, row, rowIndex, extraData) => {
                    return (
                        <div>
                            <Icofont
                                icon="paper"
                                className="mx-2"
                                onClick={this.abrirSeguimiento}
                            />
                            <Icofont
                                icon="patient-file"
                                className="mx-2"
                                onClick={this.abrirArchivos}
                            />
                        </div>
                    );
                },
            },
            {
                text: `${t("unificado.tabla.datos.despacho")}`,
                sort: true,
                dataField: "22",
                formatter: (cell, row, rowIndex, extraData) => {
                    return (
                        <div>
                            {row.accion != 1 ? (
                                <Icofont
                                    icon="ambulance-cross"
                                    className="mx-2"
                                    onClick={this.abrirDespacho}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    );
                },
            },
            {
                text: `${t("unificado.tabla.formulario.cerrarcaso")}`,
                sort: true,
                dataField: "11",
                formatter: (cell, row, rowIndex, extraData) => {
                    return (
                        <div>
                            <Icofont
                                icon="close-circled"
                                className="mx-2 text-danger"
                                onClick={this.abrirCerrarCaso}
                            />
                        </div>
                    );
                },
            },
        ];

        const options = {
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
            totalSize: this.props.datos.length,
        };
        const selectRow = {
            mode: "radio",
            clickToSelect: true,
            hideSelectColumn: true,
            style: { color: "#fff", background: "#0d6efd" },
            onSelect: (row, isSelect, rowIndex, e) => {
                //Inicio codigo cerrar caso
                this.setState({
                    cod_casopreh: row.codigo,
                    seguimiento: row.seguimientos,
                    archivosActuales: row.archivos,
                });

                //cambiar estado de los campos de form paciente
                //nota setState con null no actualiza el estado, por lo que se comprueba si el estado es null para saber si mandar '' en lugar de null o el valor
                if (row.pacientes != null && row.pacientes[0] != null) {
                    this.props.setFormPaciente((prevState) => ({
                        ...prevState,
                        pacientes: row.pacientes == null ? [] : row.pacientes,
                        cod_casopreh: row.codigo == null ? "" : row.codigo,
                        id_paciente: "",
                        /* "id_paciente": row.pacientes[0].id_paciente == null ? '' : row.pacientes[0].id_paciente,
              "tipo_doc": row.pacientes[0].tipo_doc == null ? '' : row.pacientes[0].tipo_doc,
              "num_doc": row.pacientes[0].num_doc == null ? '' : row.pacientes[0].num_doc,
              "expendiente": row.pacientes[0].expendiente == null ? '' : row.pacientes[0].expendiente,
              "fecha_nacido": row.pacientes[0].fecha_nacido == null ? '' : row.pacientes[0].fecha_nacido,
              "edad": row.pacientes[0].edad == null ? '' : row.pacientes[0].edad,
              "cod_edad": row.pacientes[0].cod_edad == null ? '' : row.pacientes[0].cod_edad,
              "nombre1": row.pacientes[0].nombre1 == null ? '' : row.pacientes[0].nombre1,
              "nombre2": row.pacientes[0].nombre2 == null ? '' : row.pacientes[0].nombre2,
              "apellido1": row.pacientes[0].apellido1 == null ? '' : row.pacientes[0].apellido1,
              "apellido2": row.pacientes[0].apellido2 == null ? '' : row.pacientes[0].apellido2,
              "genero": row.pacientes[0].genero == null ? '' : row.pacientes[0].genero,
              "apodo": row.pacientes[0].apodo == null ? '' : row.pacientes[0].apodo,
              "nacionalidad": row.pacientes[0].nacionalidad == null ? '' : row.pacientes[0].nacionalidad,
              "celular": row.pacientes[0].celular == null ? '' : row.pacientes[0].celular,
              "aseguradro": row.pacientes[0].aseguradro == null ? '' : row.pacientes[0].aseguradro,
              "direccion": row.pacientes[0].direccion == null ? '' : row.pacientes[0].direccion,
              "observacion": row.pacientes[0].observacion == null ? '' : row.pacientes[0].observacion*/
                    }));
                } else {
                    this.props.setFormPaciente((prevState) => ({
                        ...prevState,
                        pacientes: row.pacientes == null ? [] : row.pacientes,
                        cod_casopreh: row.codigo == null ? "" : row.codigo,
                        id_paciente: "",
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
                    }));
                }

                //cambiar estado de los campos de form evaluacion
                //nota setState con null no actualiza el estado, por lo que se comprueba si el estado es null para saber si mandar '' en lugar de null o el valor

                if (
                    row.evaluaciones_clinicas != null &&
                    row.evaluaciones_clinicas[0] != null
                ) {
                    this.props.setFormEvaluacion((prevState) => ({
                        ...prevState,
                        pacientes: row.pacientes == null ? [] : row.pacientes,
                        evaluaciones_clinicas:
                            row.evaluaciones_clinicas == null
                                ? []
                                : row.evaluaciones_clinicas,
                        id_evaluacionclinica:
                            row.id_evaluacionclinica == null
                                ? ""
                                : row.id_evaluacionclinica,
                        cod_casopreh: row.codigo == null ? "" : row.codigo,
                        fecha_horaevaluacion: "",
                        /*"fecha_horaevaluacion": row.evaluaciones_clinicas[0].fecha_horaevaluacion == null ? '' : row.evaluaciones_clinicas[0].fecha_horaevaluacion,
              "cod_paciente": row.evaluaciones_clinicas[0].cod_paciente == null ? '' : row.evaluaciones_clinicas[0].cod_paciente,
              "cod_diag_cie": row.evaluaciones_clinicas[0].cod_diag_cie == null ? '' : row.evaluaciones_clinicas[0].cod_diag_cie,
              "diagnos_txt": row.evaluaciones_clinicas[0].diagnos_txt == null ? '' : row.evaluaciones_clinicas[0].diagnos_txt,
              "triage": row.evaluaciones_clinicas[0].triage == null ? '' : row.evaluaciones_clinicas[0].triage,
              "c_clinico": row.evaluaciones_clinicas[0].c_clinico == null ? '' : row.evaluaciones_clinicas[0].c_clinico,
              "examen_fisico": row.evaluaciones_clinicas[0].examen_fisico == null ? '' : row.evaluaciones_clinicas[0].examen_fisico,
              "tratamiento": row.evaluaciones_clinicas[0].tratamiento == null ? '' : row.evaluaciones_clinicas[0].tratamiento,
              "antecedentes": row.evaluaciones_clinicas[0].antecedentes == null ? '' : row.evaluaciones_clinicas[0].antecedentes,
              "paraclinicos": row.evaluaciones_clinicas[0].paraclinicos == null ? '' : row.evaluaciones_clinicas[0].paraclinicos,
              "sv_tx": row.evaluaciones_clinicas[0].sv_tx == null ? '' : row.evaluaciones_clinicas[0].sv_tx,
              "sv_fc": row.evaluaciones_clinicas[0].sv_fc == null ? '' : row.evaluaciones_clinicas[0].sv_fc,
              "sv_fr": row.evaluaciones_clinicas[0].sv_fr == null ? '' : row.evaluaciones_clinicas[0].sv_fr,
              "sv_temp": row.evaluaciones_clinicas[0].sv_temp == null ? '' : row.evaluaciones_clinicas[0].sv_temp,
              "sv_gl": row.evaluaciones_clinicas[0].sv_gl == null ? '' : row.evaluaciones_clinicas[0].sv_gl,
              "peso": row.evaluaciones_clinicas[0].peso == null ? '' : row.evaluaciones_clinicas[0].peso,
              "talla": row.evaluaciones_clinicas[0].talla == null ? '' : row.evaluaciones_clinicas[0].talla,
              "sv_fcf": row.evaluaciones_clinicas[0].sv_fcf == null ? '' : row.evaluaciones_clinicas[0].sv_fcf,
              "sv_sato2": row.evaluaciones_clinicas[0].sv_sato2 == null ? '' : row.evaluaciones_clinicas[0].sv_sato2,
              "sv_apgar": row.evaluaciones_clinicas[0].sv_apgar == null ? '' : row.evaluaciones_clinicas[0].sv_apgar,
              "sv_gli": row.evaluaciones_clinicas[0].sv_gli == null ? '' : row.evaluaciones_clinicas[0].sv_gli,
              "usu_sede": row.evaluaciones_clinicas[0].usu_sede == null ? '' : row.evaluaciones_clinicas[0].usu_sede,
              "tipo_paciente": row.evaluaciones_clinicas[0].tipo_paciente == null ? '' : row.evaluaciones_clinicas[0].tipo_paciente*/
                    }));
                } else {
                    this.props.setFormEvaluacion((prevState) => ({
                        ...prevState,
                        pacientes: row.pacientes == null ? [] : row.pacientes,
                        evaluaciones_clinicas:
                            row.evaluaciones_clinicas == null
                                ? []
                                : row.evaluaciones_clinicas,
                        id_evaluacionclinica:
                            row.id_evaluacionclinica == null
                                ? ""
                                : row.id_evaluacionclinica,
                        cod_casopreh: row.codigo == null ? "" : row.codigo,
                        fecha_horaevaluacion: "",
                        cod_paciente: "",
                        cod_diag_cie: "",
                        diagnos_txt: "",
                        triage: "",
                        c_clinico: "",
                        examen_fisico: "",
                        tratamiento: "",
                        antecedentes: "",
                        paraclinicos: "",
                        sv_tx: "",
                        sv_fc: "",
                        sv_fr: "",
                        sv_temp: "",
                        sv_gl: "",
                        peso: "",
                        talla: "",
                        sv_fcf: "",
                        sv_sato2: "",
                        sv_apgar: "",
                        sv_gli: "",
                        usu_sede: "",
                        tipo_paciente: "",
                    }));
                }

                //cambiar estado de los campos de form hospital
                //nota setState con null no actualiza el estado, por lo que se comprueba si el estado es null para saber si mandar '' en lugar de null o el valor
                this.props.setFormHospital((prevState) => ({
                    ...prevState,
                    cod_casopreh: row.codigo == null ? "" : row.codigo,
                    hospital_destino:
                        row.hospital_destino == null
                            ? ""
                            : row.hospital_destino,
                    hora_seleccion_hospital:
                        row.hora_seleccion_hospital == null
                            ? new Date()
                            : row.hora_seleccion_hospital,
                    nombre_medico:
                        row.nombre_medico == null ? "" : row.nombre_medico,
                    telefono: row.telefono == null ? "" : row.telefono,
                }));

                //cambiar estado de los campos de form ambulancia
                //nota setState con null no actualiza el estado, por lo que se comprueba si el estado es null para saber si mandar '' en lugar de null o el valor
            },
        };
        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <ToolkitProvider
                    keyField="codigo"
                    columns={columns}
                    data={this.props.datos}
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
                                striped
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
        const razon = (e) => {
            e.persist();
            this.setState({
                nota: e.target.value,
            });
        };
        const tipo = (e) => {
            e.persist();
            this.setState({
                nombrecierre: e.target.value,
            });
        };
        const seguimientoNota = (e) => {
            e.persist();

            this.setState({
                seguimento: e.target.value,
            });
        };
        const selectArchivos = (e) => {
            e.persist();
            this.setState({
                archivo: e.target.files[0],
                archivos: e.target.files,
            });
        };
        return (
            <div>
                <PaginationProvider pagination={paginationFactory(options)}>
                    {contentTable}
                </PaginationProvider>

                <Modal
                    show={this.state.ventanaCerrarCaso}
                    onHide={this.cerrarCerrarCaso}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("unificado.tabla.formulario.cerrarcaso")}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group as={Col} controlId="id_cierre">
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "unificado.tabla.formulario.tipocierre"
                                        )}
                                    </strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="select"
                                        name="id_cierre"
                                        onChange={tipo}
                                    >
                                        <option value="" id="defAcc">
                                            {`-- ${t(
                                                "etiquetas.seleccion"
                                            )} --`}
                                        </option>
                                        {this.state.tiposCierre.map(
                                            (elemento) => (
                                                <option
                                                    key={
                                                        elemento.id_tranlado_fallido
                                                    }
                                                    value={
                                                        elemento.id_tranlado_fallido
                                                    }
                                                >
                                                    {
                                                        elemento.tipo_cierrecaso_es
                                                    }
                                                </option>
                                            )
                                        )}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "unificado.tabla.formulario.razoncierre"
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    placeholder={`${t(
                                        "unificado.tabla.formulario.razon"
                                    )}`}
                                    name="razon"
                                    onChange={razon}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.PostCerrarCaso();
                                this.Get();
                                this.cerrarCerrarCaso();
                            }}
                        >
                            {t("etiquetas.aceptar")}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.ventanaSeguimiento}
                    onHide={this.cerrarSeguimiento}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("unificado.tabla.formulario.seguimiento")}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group as={Col} controlId="id_cierre">
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "unificado.tabla.formulario.escribanota"
                                        )}
                                    </strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        onChange={seguimientoNota}
                                        placeholder={`${t(
                                            "unificado.tabla.formulario.nota"
                                        )}`}
                                        name="seguimento"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t("unificado.tabla.formulario.nota")}
                                    </strong>
                                </Form.Label>
                                <ol>
                                    {this.state.seguimiento.map((elemento) => (
                                        <div key={elemento.id_seguimiento}>
                                            <li>
                                                {elemento.fecha_seguimento}:{" "}
                                                {elemento.seguimento}{" "}
                                            </li>
                                            _____________________________________________________________________________
                                        </div>
                                    ))}
                                </ol>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.PostSeguimiento();
                                this.Get();
                                this.cerrarSeguimiento();
                            }}
                        >
                            {t("etiquetas.aceptar")}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.ventanaDespacho}
                    onHide={this.cerrarDespacho}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("unificado.tabla.formulario.enviar")}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>
                            {t("unificado.tabla.formulario.enviardespacho")}
                        </h4>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => {
                                this.cerrarDespacho();
                            }}
                        >
                            {t("etiquetas.cancelar")}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.PostDespacho();
                                this.Get();
                                this.cerrarDespacho();
                            }}
                        >
                            {t("etiquetas.aceptar")}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.ventanaArchivos}
                    onHide={this.cerrarArchivos}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("unificado.tabla.formulario.archivos")}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formFileMultiple"
                            >
                                <Form.Label column sm={3}>
                                    {t("etiquetas.adjuntar")}
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
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "unificado.tabla.formulario.archivos"
                                        )}
                                    </strong>
                                </Form.Label>
                                <ol>
                                    {this.state.archivosActuales.map(
                                        (elemento) => (
                                            <li key={elemento.id_archivo}>
                                                <a
                                                    download={
                                                        elemento.nombre_original
                                                    }
                                                    href={
                                                        elemento.nombre_archivo
                                                    }
                                                >
                                                    {elemento.nombre_original}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ol>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.PostArchivos();
                                this.Get();
                                this.cerrarArchivos();
                            }}
                        >
                            {t("etiquetas.subir")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withTranslation("global")(Tabla);
