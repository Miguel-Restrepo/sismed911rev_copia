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

class TablaDespacho extends React.Component {
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
    Get = () => {
        axios
            .get("/api/preh_maestro/despacho")
            .then((response) => {
                this.setState({ datos: response.data });
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
        this.Get();
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
                dataField: "nombre_es",
                text: `${t("unificado.unido.formulario.incidente")}`,
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
                dataField: "cod_ambulancia",
                text: `${t("formularios.formambulancias.ambulancia")}`,
                sort: true,
            },
            {
                dataField: "hora_asigna",
                text: `${t("formularios.formambulancias.hasignacion")}`,
                sort: true,
            },
            {
                dataField: "hora_llegada",
                text: `${t("formularios.formambulancias.hllegada")}`,
                sort: true,
            },
            {
                dataField: "hora_inicio",
                text: `${t("formularios.formambulancias.hinicia")}`,
                sort: true,
            },
            {
                dataField: "hora_destino",
                text: `${t("formularios.formambulancias.hdestino")}`,
                sort: true,
            },
            {
                text: `${t("unificado.tabla.formulario.seguimiento")}`,
                sort: true,
                dataField: "22",
                formatter: (cell, row, rowIndex, extraData) => {
                    return (
                        <div>
                            <Icofont
                                icon="paper"
                                className="mx-2"
                                onClick={this.abrirSeguimiento}
                            />
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
            totalSize: this.state.datos.length,
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
                });

                //cambiar estado de los campos de form evaluacion
                //nota setState con null no actualiza el estado, por lo que se comprueba si el estado es null para saber si mandar '' en lugar de null o el valor
                this.props.setFormAmbulancia((prevState) => ({
                    ...prevState,
                    cod_casopreh: row.codigo == null ? "" : row.codigo,
                    id_servcioambulacia:
                        row.id_servcioambulacia == null
                            ? ""
                            : row.id_servcioambulacia,
                    cod_casopreh: row.codigo == null ? "" : row.codigo,
                    cod_ambulancia:
                        row.cod_ambulancia == null ? "" : row.cod_ambulancia,
                    hora_asigna: row.hora_asigna == null ? "" : row.hora_asigna,
                    hora_llegada:
                        row.hora_llegada == null ? "" : row.hora_llegada,
                    hora_inicio: row.hora_inicio == null ? "" : row.hora_inicio,
                    hora_destino:
                        row.hora_destino == null ? "" : row.hora_destino,
                    hora_preposicion:
                        row.hora_preposicion == null
                            ? ""
                            : row.hora_preposicion,
                    observaciones:
                        row.observaciones == null ? "" : row.observaciones,
                    medico: row.medico == null ? "" : row.medico,
                    conductor: row.conductor == null ? "" : row.conductor,
                    paramedico: row.paramedico == null ? "" : row.paramedico,
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
                    data={this.state.datos}
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
        return (
            <div>
                <PaginationProvider pagination={paginationFactory(options)}>
                    {contentTable}
                </PaginationProvider>
                <Modal show={false} onHide={true} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("unificado.tabla.formulario.cerrarcaso")}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="tipoCierre"
                            >
                                <Form.Label column sm={3}>
                                    {t("unificado.tabla.formulario.tipocierre")}
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="select"
                                        name="tipo"
                                    ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.handleClose();
                            }}
                        >
                            {t("etiquetas.aceptar")}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.handleClose();
                            }}
                        >
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

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
                                                {elemento.seguimento}
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
            </div>
        );
    }
}

export default withTranslation("global")(TablaDespacho);
