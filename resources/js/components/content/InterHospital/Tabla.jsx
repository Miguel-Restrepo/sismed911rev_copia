import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
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
            tiposCierre: [],
            registroSeleccionado: "",
            nombrecierre: "",
            cod_casointerh: "",
            nota: "",
            ventanaSeguimiento: false,
            seguimiento: [],
            archivosActuales: [],
            seguimientos: [],
            seguimento: "",
            ventanaArchivos: false,
            archivo: [],
            archivos: [],
        };
    }
    /*window.Echo.private('actinterh').listen('ActualizarInterh', (e) => {
    Get();
  });*/
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
    cerrarCerrarCaso = () => this.setState({ ventanaCerrarCaso: false });
    abrirCerrarCaso = () => this.setState({ ventanaCerrarCaso: true });
    cerrarSeguimiento = () => this.setState({ ventanaSeguimiento: false });
    abrirSeguimiento = () => this.setState({ ventanaSeguimiento: true });
    cerrarArchivos = () => this.setState({ ventanaArchivos: false });
    abrirArchivos = () => this.setState({ ventanaArchivos: true });
    clearform = () =>
        this.setState({
            nombrecierre: "",
            nota: "",
            seguimento: "",
        });

    Get = () => {
        axios
            .get("/api/interh_maestro/habilitados")
            .then((response) => {
                this.props.setDatos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    GetUnit = () => {
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
            .post("/api/interh_cierre", {
                nombrecierre: this.state.nombrecierre,
                cod_casointerh: this.state.cod_casointerh,
                nota: this.state.nota,
            })
            .then((response) => {
                clearform();
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
            formData.append("cod_casointerh", this.state.cod_casointerh);
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

    PostSeguimiento = async () => {
        if (this.state.seguimento != "") {
            await axios
                .post("/api/interh_seguimiento", {
                    seguimento: this.state.seguimento,
                    cod_casointerh: this.state.cod_casointerh,
                    fecha_seguimento: DateTime.now()
                        .set({ milliseconds: 0 })
                        .toISO({ suppressMilliseconds: true }),
                })
                .then((response) => {
                    this.setState({
                        seguimento: "",
                    });
                    clearform();
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
        this.GetUnit();
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
                text: `${t("interhospital.tabla.datos.ncaso")}`,
                sort: true,
            },
            {
                dataField: "fechahorainterh",
                text: `${t("interhospital.tabla.datos.fecha")}`,
                sort: true,
            },
            {
                text: `${t("interhospital.tabla.datos.tiempo")}`,
                dataField: "33",
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
                                        Date.parse(row.fechahorainterh) -
                                            extraData
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
                text: `${t("interhospital.tabla.datos.pacientes")}`,
                sort: true,
            },
            {
                dataField: "nombre_hospital",
                text: `${t("interhospital.tabla.datos.hptlorigen")}`,
                sort: true,
            },
            {
                dataField: "destino_nombre_hospital",
                text: `${t("interhospital.tabla.datos.hptldestino")}`,
                sort: true,
            },
            {
                dataField: "nombre_prioridad",
                text: `${t("interhospital.tabla.datos.prioridad")}`,
                sort: true,
            },
            {
                dataField: "nombre_accion_es",
                text: `${t("interhospital.tabla.datos.accion")}`,
                sort: true,
            },
            {
                text: `${t("interhospital.tabla.datos.seguimiento")}`,
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
                text: `${t("etiquetas.cerrarcaso")}`,
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
            classes: "selection-row",
            onSelect: (row, isSelect, rowIndex, e) => {
                //Inicio codigo cerrar caso
                this.setState({
                    cod_casointerh: row.codigo,
                    seguimiento: row.seguimientos,
                    archivosActuales: row.archivos,
                });

                //Fin codigo cerrar caso

                //cambiar estado de los campos de form paciente
                //nota setState con null no actualiza el estado, por lo que se comprueba si el estado es null para saber si mandar '' en lugar de null o el valor
                if (row.pacientes != null && row.pacientes[0] != null) {
                    this.props.setFormPaciente((prevState) => ({
                        ...prevState,
                        pacientes: row.pacientes == null ? [] : row.pacientes,
                        cod_casointerh: row.codigo == null ? "" : row.codigo,
                        id_paciente: "",
                    }));
                } else {
                    this.props.setFormPaciente((prevState) => ({
                        ...prevState,
                        pacientes: row.pacientes == null ? [] : row.pacientes,
                        cod_casointerh: row.codigo == null ? "" : row.codigo,
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
                        cod_casointerh: row.codigo == null ? "" : row.codigo,
                        fecha_horaevaluacion: "",
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
                        cod_casointerh: row.codigo == null ? "" : row.codigo,
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
                    cod_casointerh: row.codigo == null ? "" : row.codigo,
                    hospital_destinointerh:
                        row.hospital_destinointerh == null
                            ? ""
                            : row.hospital_destinointerh,
                    hora_seleccion_hospital:
                        row.hora_seleccion_hospital == null
                            ? new Date()
                            : row.hora_seleccion_hospital,
                    nombre_recibe:
                        row.nombre_recibe == null ? "" : row.nombre_recibe,
                    telefonointerh:
                        row.telefonointerh == null ? "" : row.telefonointerh,
                }));

                //cambiar estado de los campos de form ambulancia
                //nota setState con null no actualiza el estado, por lo que se comprueba si el estado es null para saber si mandar '' en lugar de null o el valor
                this.props.setFormAmbulancia((prevState) => ({
                    ...prevState,
                    cod_casointerh: row.codigo == null ? "" : row.codigo,
                    id_servcioambulacia:
                        row.id_servcioambulacia == null
                            ? ""
                            : row.id_servcioambulacia,
                    cod_casointerh: row.codigo == null ? "" : row.codigo,
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
                        <Modal.Title>{t("etiquetas.cerrarcaso")}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group as={Col} controlId="id_cierre">
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "interhospital.tabla.formulario.tipocierre"
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
                                            "interhospital.tabla.formulario.razoncierre"
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    placeholder={`${t(
                                        "interhospital.tabla.formulario.razon"
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
                            {t("interhospital.tabla.datos.seguimiento")}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group as={Col} controlId="id_cierre">
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "interhospital.tabla.formulario.escribanota"
                                        )}
                                    </strong>
                                </Form.Label>

                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        onChange={seguimientoNota}
                                        placeholder={`${t(
                                            "interhospital.tabla.formulario.nota"
                                        )}`}
                                        name="seguimento"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            "interhospital.tabla.formulario.nota"
                                        )}
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

                <Modal
                    show={this.state.ventanaArchivos}
                    onHide={this.cerrarArchivos}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("interhospital.tabla.formulario.archivos")}
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
                                            "interhospital.tabla.formulario.archivos"
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
