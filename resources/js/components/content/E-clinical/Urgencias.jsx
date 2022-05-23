import Form from "react-bootstrap/Form";
import Icofont from "react-icofont";

import { useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./eclinical.css";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Urgencias() {
    const [t, i18n] = useTranslation("global");

    const [admisiones, setAdmisiones] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //mostrar o ucultar formulario
    const [tiempo, setTiempo] = useState(new Date()); //mostrar o ucultar formulario
    const [registro, setRegistro] = useState(null);
    //modales
    const [ventanaMedicamentos, setAbrirMedicamentos] = useState(false);
    const cerrarMedicamentos = () => setAbrirMedicamentos(false);
    const abrirMedicamentos = () => setAbrirMedicamentos(true);
    const [ventanaExamenes, setAbrirExamenes] = useState(false);
    const cerrarExamenes = () => setAbrirExamenes(false);
    const abrirExamenes = () => setAbrirExamenes(true);
    //PArte egreso
    const [ventanaEgreso, setAbrirEgreso] = useState(false);
    const cerrarEgreso = () => setAbrirEgreso(false);
    const abrirEgreso = () => setAbrirEgreso(true);
    const [idSalaAtencionMedica, setIdSalaAtencionMedica] = useState(null);
    const [salaEstadoAlta, setSalaEstadoAlta] = useState([]);
    const [salaAtencion, setSalaAtencion] = useState(null);
    //formulario
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [pacienteTemp, setPacienteTemp] = useState("");
    const [idPacienteTemp, setIdPacienteTemp] = useState("");
    const [abdomen, setAbdomen] = useState([]);
    const [boca, setBoca] = useState([]);
    const [cabeza, setCabeza] = useState([]);
    const [corazon, setCorazon] = useState([]);
    const [cuello, setCuello] = useState([]);
    const [extremidad, setExtremidad] = useState([]);
    const [general, setGeneral] = useState([]);
    const [genital, setGenital] = useState([]);
    const [neuro, setNeuro] = useState([]);
    const [ojos, setOjos] = useState([]);
    const [otorrino, setOtorrino] = useState([]);
    const [pelvis, setPelvis] = useState([]);
    const [piel, setPiel] = useState([]);
    const [pulmon, setPulmon] = useState([]);
    const [rectal, setRectal] = useState([]);
    const [torax, setTorax] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [examenes, setExamenes] = useState([]);
    const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState(
        []
    );
    const [medicamentosSeleccionado, setMedicamentosSeleccionado] =
        useState(null);
    const [dosisMedicamentoSeleccionado, setdosisMedicamentoSeleccionado] =
        useState("");
    const [examenesSeleccionado, setExamenesSeleccionado] = useState(null);
    const [examenesSeleccionados, setExamenesSeleccionados] = useState([]);
    const animatedComponents = makeAnimated();
    const [sesionActual, setSesionActual] = useState(null);
    const [form2, setForm2] = useState({
        id_atencionmedica: "",
        id_admision: "",
        general: [{ key: 1, value: 1, label: "Normal" }],
        cabeza: [{ key: 1, value: 1, label: "Normal" }],
        ojo: [{ key: 1, value: 1, label: "Normal" }],
        otorrino: [{ key: 1, value: 1, label: "Normal" }],
        boca: [{ key: 1, value: 1, label: "Normal" }],
        cuello: [{ key: 1, value: 1, label: "Normal" }],
        torax: [{ key: 1, value: 1, label: "Normal" }],
        corazon: [{ key: 1, value: 1, label: "Normal" }],
        pulmon: [{ key: 1, value: 1, label: "Normal" }],
        abdomen: [{ key: 1, value: 1, label: "Normal" }],
        pelvis: [{ key: 1, value: 1, label: "Normal" }],
        rectal: [{ key: 1, value: 1, label: "Normal" }],
        genital: [{ key: 1, value: 1, label: "Normal" }],
        extremidad: [{ key: 1, value: 1, label: "Normal" }],
        neuro: [{ key: 1, value: 1, label: "Normal" }],
        piel: [{ key: 1, value: 1, label: "Normal" }],
        sintomas: "",
        descripcion_diagnostico: "",
        cod_cie10: "",
        otros: "",
        id_estadoalta: "",
    });

    //Formulario egreso
    const [formEgreso, setFormEgreso] = useState({
        id_estadoalta: "",
    });

    //Formulario registrar medicamentos
    const [formRegistrarMedicamento, setFormRegistrarMedicamento] = useState({
        id_atencionmedica: "",
        id_medicamentos: "",
        dosis: "",
    });

    //Formulario registrar Examenes
    const [formRegistrarExamenes, setFormRegistrarExamenes] = useState({
        id_atencionmedica: "",
        id_examen: "",
    });

    const { SearchBar } = Search;

    //TABLA CIE10
    const columns = [
        {
            dataField: "codigo_cie",
            text: `${t("eclinical.emergencias.datos.codigo")}`,
            sort: true,
        },
        {
            dataField: "diagnostico",
            text: `${t("eclinical.emergencias.datos.diagnostico")}`,
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
        hideSelectColumn: false,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setPacienteTemp(row.diagnostico);
            setIdPacienteTemp(row.codigo_cie);
        },
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="codigo_cie"
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

    //TABLA PRINCIPAL
    const columns1 = [
        {
            dataField: "3",
            text: `${t("eclinical.emergencias.datos.clasificacion")}`,
            sort: true,
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Button
                            variant="secondary"
                            id={row.clasificacion_admision}
                            disabled
                        >
                            {row.clasificacion_admision}
                        </Button>
                    </div>
                );
            },
        },
        {
            dataField: "2",
            text: "Tiempo",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Icofont icon="ui-clock" className="mx-2 text-danger" />
                        <span className="text-danger">
                            {Math.floor(
                                Math.abs(
                                    Date.parse(row.fecha_admision) - extraData
                                ) /
                                    1000 /
                                    60
                            ) + " MIN"}
                        </span>
                    </div>
                );
            },
            formatExtraData: tiempo,
            sort: true,
        },
        {
            dataField: "fecha_clasificacion", //'nombre2','apellido1','apellido2',
            text: `${t("eclinical.emergencias.datos.fechaclasi")}`,
            sort: true,
        },
        {
            dataField: "expendiente",
            text: `${t("eclinical.emergencias.datos.hc")}`,
            sort: true,
        },
        {
            dataField: "nombre1",
            text: `${t("eclinical.emergencias.datos.paciente")}`,
            sort: true,
        },
        {
            dataField: "nombre_motivoatencion",
            text: `${t("eclinical.emergencias.datos.urgencia")}`,
            sort: true,
        },
        {
            dataField: "1",
            text: `${t("eclinical.emergencias.datos.alta")}`,
            sort: true,
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.id_atencionmedica && (
                            <Button variant="secondary" onClick={abrirEgreso}>
                                {t("eclinical.emergencias.datos.egreso")}
                            </Button>
                        )}
                    </div>
                );
            },
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
        selected: [1],
        hideSelectColumn: true,
        bgColor: "#00BFFF",
        onSelect: (row, isSelect, rowIndex, e) => {
            setRegistro(row);
            setForm2((prevState) => ({
                ...prevState,
                id_atencionmedica:
                    row.id_atencionmedica != null ? row.id_atencionmedica : "",
                id_admision: row.codigo != null ? row.codigo : "",
                general:
                    row.general != null &&
                    row.general[0] != null &&
                    row.general[0] != ""
                        ? convertir(row.general, general)
                        : [{ key: 1, value: 1, label: "Normal" }],
                cabeza:
                    row.cabeza != null &&
                    row.cabeza[0] != null &&
                    row.cabeza[0] != ""
                        ? convertir(row.cabeza, cabeza)
                        : [{ key: 1, value: 1, label: "Normal" }],
                ojo:
                    row.ojo != null && row.ojo[0] != null && row.ojo[0] != ""
                        ? convertir(row.ojo, ojos)
                        : [{ key: 1, value: 1, label: "Normal" }],
                otorrino:
                    row.otorrino != null &&
                    row.otorrino[0] != null &&
                    row.otorrino[0] != ""
                        ? convertir(row.otorrino, otorrino)
                        : [{ key: 1, value: 1, label: "Normal" }],
                boca:
                    row.boca != null && row.boca[0] != null && row.boca[0] != ""
                        ? convertir(row.boca, boca)
                        : [{ key: 1, value: 1, label: "Normal" }],
                cuello:
                    row.cuello != null &&
                    row.cuello[0] != null &&
                    row.cuello[0] != ""
                        ? convertir(row.cuello, cuello)
                        : [{ key: 1, value: 1, label: "Normal" }],
                torax:
                    row.torax != null &&
                    row.torax[0] != null &&
                    row.torax[0] != ""
                        ? convertir(row.torax, torax)
                        : [{ key: 1, value: 1, label: "Normal" }],
                corazon:
                    row.corazon &&
                    row.corazon[0] != null &&
                    row.corazon[0] != ""
                        ? convertir(row.corazon, corazon)
                        : [{ key: 1, value: 1, label: "Normal" }],
                pulmon:
                    row.pulmon && row.pulmon[0] != null && row.pulmon[0] != ""
                        ? convertir(row.pulmon, pulmon)
                        : [{ key: 1, value: 1, label: "Normal" }],
                abdomen:
                    row.abdomen &&
                    row.abdomen[0] != null &&
                    row.abdomen[0] != ""
                        ? convertir(row.abdomen, abdomen)
                        : [{ key: 1, value: 1, label: "Normal" }],
                pelvis:
                    row.pelvis != null &&
                    row.pelvis[0] != null &&
                    row.pelvis[0] != ""
                        ? convertir(row.pelvis, pelvis)
                        : [{ key: 1, value: 1, label: "Normal" }],
                rectal:
                    row.rectal != null &&
                    row.rectal[0] != null &&
                    row.rectal[0] != ""
                        ? convertir(row.rectal, rectal)
                        : [{ key: 1, value: 1, label: "Normal" }],
                genital:
                    row.genital != null &&
                    row.genital[0] != null &&
                    row.genital[0] != ""
                        ? convertir(row.genital, genital)
                        : [{ key: 1, value: 1, label: "Normal" }],
                extremidad:
                    row.extremidad != null &&
                    row.extremidad[0] != null &&
                    row.extremidad[0] != ""
                        ? convertir(row.extremidad, extremidad)
                        : [{ key: 1, value: 1, label: "Normal" }],
                neuro:
                    row.neuro != null &&
                    row.neuro[0] != null &&
                    row.neuro[0] != ""
                        ? convertir(row.neuro, neuro)
                        : [{ key: 1, value: 1, label: "Normal" }],
                piel:
                    row.piel != null && row.piel[0] != null && row.piel[0] != ""
                        ? convertir(row.piel, piel)
                        : [{ key: 1, value: 1, label: "Normal" }],
                sintomas: row.sintomas != null ? row.sintomas : "",
                descripcion_diagnostico:
                    row.descripcion_diagnostico != null
                        ? row.descripcion_diagnostico
                        : "",
                cod_cie10: row.cod_cie10 != null ? row.cod_cie10 : "",
                otros: row.otros != null ? row.otros : "",
                id_estadoalta:
                    row.id_estadoalta != null ? row.id_estadoalta : "",
            }));
            setExamenesSeleccionados(row.examenes);
            setMedicamentosSeleccionados(row.medicamentos);
            setIdSalaAtencionMedica(row.id_atencionmedica);

            if (!mostrarFormulario) setMostrarFormulario(true);
        },
    };

    const convertir = (arreglo, arregloDatos) => {
        let arregloNuevo = [];
        arreglo.forEach((elementoBuscado) => {
            arregloDatos.forEach((element) => {
                if (elementoBuscado == element.value) {
                    arregloNuevo.push({
                        value: element.value,
                        label: element.label,
                    });
                }
            });
        });
        return arregloNuevo;
    };

    const cambioSelect = (e) => {
        e.persist();
        setFormEgreso((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
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

    const GetAdmisiones = () => {
        axios
            .get("/api/sala_admision/urgencias")
            .then((response) => {
                setAdmisiones(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetPacientes = () => {
        axios
            .get("/api/cie10")
            .then((response) => {
                setPacientes(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const ObtenerSesion = () => {
        axios
            .get("/sesion-activa")
            .then((responser) => {
                setSesionActual(responser.data);

                return responser.data;
            })
            .catch((error) => {});
    };

    //TABLA MEDICAMENTOS
    const optionsMedicamentos = {
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
        totalSize: medicamentos.length,
    };

    const columnsMedicamentos = [
        {
            dataField: "nombre_medicamento",
            text: `${t("eclinical.emergencias.datos.nombremedicamento")}`,
            sort: true,
        },
    ];

    const selectRowMedicamentos = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setMedicamentosSeleccionado(row);
        },
    };

    let contentTableMedicamentos = ({
        paginationProps,
        paginationTableProps,
    }) => (
        <div>
            <ToolkitProvider
                keyField="id_medicamento"
                columns={columnsMedicamentos}
                data={medicamentos}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <SearchBar
                            placeholder={`${t("tabla.buscador")}`}
                            {...toolkitprops.searchProps}
                            className="mb-3"
                        />
                        <Form>
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>Dosis:</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Dosis"
                                    name="dosis"
                                    onChange={cambioDosis}
                                />
                            </Form.Group>
                        </Form>
                        <BootstrapTable
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t("tabla.sindatos")}`}
                            selectRow={selectRowMedicamentos}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    //TABLA EXAMENES
    const optionsExamenes = {
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
        totalSize: examenes.length,
    };

    const columnsExamenes = [
        {
            dataField: "nombre_examen",
            text: `${t("eclinical.emergencias.datos.examenes")}`,
            sort: true,
        },
    ];

    const selectRowExamenes = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setExamenesSeleccionado(row);
        },
    };

    const contentTableExamenes = ({
        paginationProps,
        paginationTableProps,
    }) => (
        <div>
            <ToolkitProvider
                keyField="id_examen"
                columns={columnsExamenes}
                data={examenes}
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
                            selectRow={selectRowExamenes}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    //TABLA MEDICAMENTOS Seleccionados
    const optionsMedicamentosSeleccionado = {
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
        totalSize: medicamentosSeleccionados.length,
    };

    const columnsMedicamentosSeleccionados = [
        {
            dataField: "nombre_medicamento",
            text: `${t("eclinical.emergencias.datos.medicamentos")}`,
            sort: true,
        },
        {
            dataField: "dosis",
            text: `${t("eclinical.emergencias.datos.dosis")}`,
            sort: true,
        },
        {
            text: `${t("eclinical.emergencias.datos.opcion")}`,
            sort: true,
            dataField: "11",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Button
                            variant="danger"
                            onClick={() => {
                                let filtredDataMedicamentos =
                                    medicamentosSeleccionados.filter(
                                        (item) =>
                                            item.nombre_medicamento !=
                                            row.nombre_medicamento
                                    );
                                EliminarMedicamento(row.id_medicamento);
                                setMedicamentosSeleccionados(
                                    filtredDataMedicamentos
                                );
                            }}
                        >
                            <Icofont icon="trash" className="mx-2" o />
                            Eliminar
                        </Button>
                    </div>
                );
            },
        },
    ];

    const selectRowMedicamentosSeleccionados = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {},
    };

    const contentTableMedicamentosSeleccionados = ({
        paginationProps,
        paginationTableProps,
    }) => (
        <div>
            <ToolkitProvider
                keyField="id_medicamento"
                columns={columnsMedicamentosSeleccionados}
                data={medicamentosSeleccionados}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <BootstrapTable
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t("tabla.sindatos")}`}
                            selectRow={selectRowMedicamentosSeleccionados}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    //Tabla examenes seleccionados
    const optionsExamenesSeleccionado = {
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
        totalSize: examenesSeleccionados.length,
    };

    const columnsExamenesSeleccionados = [
        {
            dataField: "nombre_examen",
            text: `${t("eclinical.emergencias.datos.examenes")}`,
            sort: true,
        },
        {
            text: `${t("eclinical.emergencias.datos.opcion")}`,
            sort: true,
            dataField: "123",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Button
                            variant="danger"
                            onClick={() => {
                                let filtredData = examenesSeleccionados.filter(
                                    (item) => item != row
                                );
                                EliminarExamen(row.id_examen);
                                setExamenesSeleccionados(filtredData);
                            }}
                        >
                            <Icofont icon="trash" className="mx-2" />
                            Eliminar
                        </Button>
                    </div>
                );
            },
        },
    ];

    const selectRowExamenesSeleccionados = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {},
    };

    const contentTableExamenesSeleccionados = ({
        paginationProps,
        paginationTableProps,
    }) => (
        <div>
            <ToolkitProvider
                keyField="id_examen"
                columns={columnsExamenesSeleccionados}
                data={examenesSeleccionados}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <BootstrapTable
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t("tabla.sindatos")}`}
                            selectRow={selectRowExamenesSeleccionados}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    const GetGeneral = () => {
        axios
            .get("/api/cuerpo_general")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_general,
                        label: element.nombre_general,
                    });
                });
                setGeneral(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetCabeza = () => {
        axios
            .get("/api/cuerpo_cabeza")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_cabeza,
                        label: element.nombre_cabeza,
                    });
                });
                setCabeza(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetOjos = () => {
        axios
            .get("/api/cuerpo_ojo")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_ojo,
                        label: element.nombre_ojo,
                    });
                });
                setOjos(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetBoca = () => {
        axios
            .get("/api/cuerpo_boca")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_boca,
                        label: element.nombre_boca,
                    });
                });
                setBoca(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetCuello = () => {
        axios
            .get("/api/cuerpo_cuello")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_cuello,
                        label: element.nombre_cuello,
                    });
                });
                setCuello(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTorax = () => {
        axios
            .get("/api/cuerpo_torax")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_torax,
                        label: element.nombre_torax,
                    });
                });
                setTorax(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetPulmon = () => {
        axios
            .get("/api/cuerpo_pulmon")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_pulmon,
                        label: element.nombre_pulmon,
                    });
                });
                setPulmon(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetAbdomen = () => {
        axios
            .get("/api/cuerpo_abdomen")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_abdomen,
                        label: element.nombre_abdomen,
                    });
                });
                setAbdomen(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetPelvis = () => {
        axios
            .get("/api/cuerpo_pelvis")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_pelvis,
                        label: element.nombre_pelvis,
                    });
                });
                setPelvis(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetGenital = () => {
        axios
            .get("/api/cuerpo_genital")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_genital,
                        label: element.nombre_genital,
                    });
                });
                setGenital(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetExtremidad = () => {
        axios
            .get("/api/cuerpo_extremidad")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_extremidad,
                        label: element.nombre_extremidad,
                    });
                });
                setExtremidad(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetNeuroo = () => {
        axios
            .get("/api/cuerpo_neuro")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_neuro,
                        label: element.nombre_neuro,
                    });
                });
                setNeuro(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetOtorrino = () => {
        axios
            .get("/api/cuerpo_otorrino")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_otorrino,
                        label: element.nombre_otorrino,
                    });
                });
                setOtorrino(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetCorazon = () => {
        axios
            .get("/api/cuerpo_corazon")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_corazon,
                        label: element.nombre_corazon,
                    });
                });
                setCorazon(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetRectal = () => {
        axios
            .get("/api/cuerpo_rectal")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_rectal,
                        label: element.nombre_rectal,
                    });
                });
                setRectal(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetPiel = () => {
        axios
            .get("/api/cuerpo_piel")
            .then((response) => {
                let datos = [];
                response.data.forEach((element) => {
                    datos.push({
                        value: element.id_piel,
                        label: element.nombre_piel,
                    });
                });
                setPiel(datos);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetMedicamentos = () => {
        axios
            .get("/api/medicamentos")
            .then((response) => {
                setMedicamentos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetExamenes = () => {
        axios
            .get("/api/sala_examen")
            .then((response) => {
                setExamenes(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetSalaEstadoAlta = () => {
        axios
            .get("/api/sala_estadoalta")
            .then((response) => {
                setSalaEstadoAlta(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const handleChange1 = (e) => {
        e.persist();
        setForm2((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const selecionOtorrino = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            otorrino: e,
        }));
    };

    const selecionPiel = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            piel: e,
        }));
    };

    const selecionNeuro = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            neuro: e,
        }));
    };

    const selecionExtremidad = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            extremidad: e,
        }));
    };

    const selecionGenital = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            genital: e,
        }));
    };

    const selecionRectal = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            rectal: e,
        }));
    };

    const selecionPelvis = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            pelvis: e,
        }));
    };

    const selecionAbdomen = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            abdomen: e,
        }));
    };

    const selecionPulmon = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            pulmon: e,
        }));
    };

    const selecionTorax = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            torax: e,
        }));
    };

    const selecionCorazon = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            corazon: e,
        }));
    };

    const selecionBoca = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            boca: e,
        }));
    };

    const selecionGeneral = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            general: e,
        }));
    };

    const selecionCabeza = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            cabeza: e,
        }));
    };

    const selecionCuello = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            cuello: e,
        }));
    };

    const selecionOjo = (e) => {
        setForm2((prevState) => ({
            ...prevState,
            ojo: e,
        }));
    };

    const cambioDosis = (e) => {
        e.persist();
        setdosisMedicamentoSeleccionado(e.target.value);
    };

    const PostEgreso = () => {
        if (idSalaAtencionMedica) {
            axios
                .put(
                    `/api/sala_atencionmedica/${idSalaAtencionMedica}`,
                    formEgreso
                )
                .then((response) => {
                    GetAdmisiones();
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        } else {
            alert("No se ha llenado el formulario de atencion medica");
        }
    };

    let cambio = (arreglo) => {
        let generals = "{";
        let primero = true;
        try {
            arreglo.forEach((element) => {
                if (primero) {
                    primero = false;
                    generals = generals + element.value;
                } else {
                    generals = generals + "," + element.value;
                }
            });
            return generals + "}";
        } catch {
            console.log("no hay arreglo");
            return "{1}";
        }
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

    const PostSala = () => {
        if (form2.id_admision != "") {
            if (form2.id_atencionmedica == "") {
                axios
                    .post(`/api/sala_atencionmedica/`, {
                        id_admision: form2.id_admision,
                        general: cambio(form2.general),
                        cabeza: cambio(form2.cabeza),
                        ojo: cambio(form2.ojo),
                        otorrino: cambio(form2.otorrino),
                        boca: cambio(form2.boca),
                        cuello: cambio(form2.cuello),
                        torax: cambio(form2.torax),
                        corazon: cambio(form2.corazon),
                        pulmon: cambio(form2.pulmon),
                        abdomen: cambio(form2.abdomen),
                        pelvis: cambio(form2.pelvis),
                        rectal: cambio(form2.rectal),
                        genital: cambio(form2.genital),
                        extremidad: cambio(form2.extremidad),
                        neuro: cambio(form2.neuro),
                        piel: cambio(form2.piel),
                        sintomas: form2.sintomas,
                        descripcion_diagnostico: form2.descripcion_diagnostico,
                        cod_cie10: form2.cod_cie10,
                        otros: form2.otros,
                        id_estadoalta: form2.id_estadoalta,
                    })
                    .then((response) => {
                        setForm2((prevState) => ({
                            ...prevState,
                            id_atencionmedica: response.data.id_atencionmedica,
                        }));
                        notificarExitoCaso(response.data.id_atencionmedica);
                        GetAdmisiones();
                        return response.data;
                    })
                    .catch((error) => {
                        notificarErrorCaso();
                        return error.response.data;
                    });
            } else {
                axios
                    .put(
                        `/api/sala_atencionmedica/${form2.id_atencionmedica}`,
                        {
                            id_admision: form2.id_admision,
                            general: cambio(form2.general),
                            cabeza: cambio(form2.cabeza),
                            ojo: cambio(form2.ojo),
                            otorrino: cambio(form2.otorrino),
                            boca: cambio(form2.boca),
                            cuello: cambio(form2.cuello),
                            torax: cambio(form2.torax),
                            corazon: cambio(form2.corazon),
                            pulmon: cambio(form2.pulmon),
                            abdomen: cambio(form2.abdomen),
                            pelvis: cambio(form2.pelvis),
                            rectal: cambio(form2.rectal),
                            genital: cambio(form2.genital),
                            extremidad: cambio(form2.extremidad),
                            neuro: cambio(form2.neuro),
                            piel: cambio(form2.piel),
                            sintomas: form2.sintomas,
                            descripcion_diagnostico:
                                form2.descripcion_diagnostico,
                            cod_cie10: form2.cod_cie10,
                            otros: form2.otros,
                            id_estadoalta: form2.id_estadoalta,
                        }
                    )
                    .then((response) => {
                        GetAdmisiones();
                        return response.data;
                    })
                    .catch((error) => {
                        return error.response.data;
                    });
            }
        }
    };

    const PostMedicamentos = () => {
        if (formRegistrarMedicamento.id_atencionmedica != "") {
            axios
                .post(
                    "/api/sala_atencionmedica_medicamentos",
                    formRegistrarMedicamento
                )
                .then((response) => {
                    notificarExitoCaso(
                        response.data.id_atencionmedica_medicamentos
                    );
                    return response.data;
                })
                .catch((error) => {
                    notificarErrorCaso();
                    return error.response.data;
                });
        }
    };

    const PostExamenes = () => {
        if (formRegistrarExamenes.id_atencionmedica != "") {
            axios
                .post("/api/sala_atencionmedica_examen", formRegistrarExamenes)
                .then((response) => {
                    notificarExitoCaso(response.data.id_atencionmedica_examen);
                    return response.data;
                })
                .catch((error) => {
                    notificarErrorCaso();
                    return error.response.data;
                });
        }
    };

    const EliminarMedicamento = (id) => {
        if (formRegistrarMedicamento.id_atencionmedica != "") {
            axios
                .post("/api/sala_atencionmedica_medicamentos/eliminar", {
                    id_atencionmedica: form2.id_atencionmedica,
                    id_medicamentos: id,
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
    };

    const EliminarExamen = (id) => {
        if (formRegistrarExamenes.id_atencionmedica != "") {
            axios
                .post("/api/sala_atencionmedica_examen/eliminar", {
                    id_atencionmedica: form2.id_atencionmedica,
                    id_examen: id,
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        }
    };

    //PDF
    const generatePDFMedicamentos = () => {
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica");
        //Tabla hospital
        let colHospital = ["Hospital", "Fecha emitida"];
        let rowsHospital = [];
        if (registro.hospital != null) {
            rowsHospital.push([registro.hospital.nombre_hospital, new Date()]);
        } else {
            rowsHospital.push(["Sin asignar hospital", new Date()]);
        }

        //Tabla Paciente
        let colPaciente = ["Paciente", "Documento", "Edad"];
        let rowsPaciente = [];
        rowsPaciente.push([
            registro.paciente.nombre1 +
                " " +
                registro.paciente.nombre2 +
                " " +
                registro.paciente.apellido1 +
                " " +
                registro.paciente.apellido2,
            registro.paciente.num_doc,
            registro.paciente.edad +
                " " +
                registro.paciente.codigo_edad.nombre_edad,
        ]);

        //Tabla medicamentos
        let colMedicamentos = ["Medicamento", "Dosis"];
        let rowsMedicamentos = [];
        let itemNew = medicamentosSeleccionados;
        itemNew.forEach((element) => {
            let temp1 = [element.nombre_medicamento, element.dosis];
            rowsMedicamentos.push(temp1);
        });
        //Tabla Doctor
        let colDoctor = ["Medico"];
        let rowsDoctor = [];
        rowsDoctor.push([sesionActual.nombres + " " + sesionActual.apellidos]);

        doc.autoTable(colHospital, rowsHospital, { startY: 70 });
        doc.autoTable(colPaciente, rowsPaciente, { startY: 120 });
        doc.autoTable(colMedicamentos, rowsMedicamentos, { startY: 220 });
        doc.autoTable(colDoctor, rowsDoctor, { startY: 170 });
        doc.save("orden_Medicamento.pdf");
    };

    const generatePDFExamenes = () => {
        let doc = new jsPDF("p", "pt");
        doc.setFont("helvetica");
        //Tabla hospital
        let colHospital = ["Hospital", "Fecha emitida"];
        let rowsHospital = [];
        if (registro.hospital != null) {
            rowsHospital.push([registro.hospital.nombre_hospital, new Date()]);
        } else {
            rowsHospital.push(["Sin asignar hospital", new Date()]);
        }

        //Tabla Paciente
        let colPaciente = ["Paciente", "Documento", "Edad"];
        let rowsPaciente = [];
        rowsPaciente.push([
            registro.paciente.nombre1 +
                " " +
                registro.paciente.nombre2 +
                " " +
                registro.paciente.apellido1 +
                " " +
                registro.paciente.apellido2,
            registro.paciente.num_doc,
            registro.paciente.edad +
                " " +
                registro.paciente.codigo_edad.nombre_edad,
        ]);

        //Tabla examenes
        let colExamenes = ["Examen"];
        let rowsExamenes = [];
        let itemNew = examenesSeleccionados;
        itemNew.forEach((element) => {
            let temp1 = [element.nombre_examen];
            rowsExamenes.push(temp1);
        });

        //Tabla Doctor
        let colDoctor = ["Medico"];
        let rowsDoctor = [];
        rowsDoctor.push([sesionActual.nombres + " " + sesionActual.apellidos]);

        doc.autoTable(colHospital, rowsHospital, { startY: 70 });
        doc.autoTable(colPaciente, rowsPaciente, { startY: 120 });
        doc.autoTable(colExamenes, rowsExamenes, { startY: 220 });
        doc.autoTable(colDoctor, rowsDoctor, { startY: 170 });
        doc.save("orden_Examenes.pdf");
    };

    useEffect(() => {
        PostSala();
    }, [form2]);

    useEffect(() => {
        PostExamenes();
    }, [formRegistrarExamenes]);

    useEffect(() => {
        PostMedicamentos();
    }, [formRegistrarMedicamento]);

    useEffect(() => {
        ObtenerSesion();
        GetAdmisiones();
        GetSalaEstadoAlta();
        GetPacientes();
        GetAbdomen();
        GetBoca();
        GetCabeza();
        GetCorazon();
        GetCuello();
        GetExtremidad();
        GetGeneral();
        GetGenital();
        GetNeuroo();
        GetOjos();
        GetOtorrino();
        GetPelvis();
        GetPiel();
        GetPulmon();
        GetRectal();
        GetTorax();
        GetExamenes();
        GetMedicamentos();
    }, []);

    useEffect(() => {
        setForm2((prevState) => ({
            ...prevState,
            cod_cie10: idPaciente,
        }));
    }, [paciente, idPaciente]);

    return (
        <div>
            <div>
                <h2>{t("eclinical.emergencias.datos.urgencia")}</h2>
            </div>
            <PaginationProvider pagination={paginationFactory(options1)}>
                {contentTable1}
            </PaginationProvider>
            <br></br>
            <div>
                <h3>
                    <Icofont icon="patient-file" className="mx-2" />
                    {t("eclinical.emergencias.formulario.formulario")}
                </h3>
            </div>
            <br></br>

            {mostrarFormulario && (
                <Form className={mostrarFormulario ? "show-element" : null}>
                    <Row className="mb-4">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.general"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.general}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                name="general"
                                onChange={selecionGeneral}
                                options={general}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.cabeza"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.cabeza}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                onChange={selecionCabeza}
                                isMulti
                                options={cabeza}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.emergencias.formulario.ojos")}
                                </strong>
                            </Form.Label>
                            <Select
                                closeMenuOnSelect={false}
                                value={form2.ojo}
                                onChange={selecionOjo}
                                components={animatedComponents}
                                isMulti
                                options={ojos}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.otorrino"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.otorrino}
                                closeMenuOnSelect={false}
                                onChange={selecionOtorrino}
                                components={animatedComponents}
                                isMulti
                                options={otorrino}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.emergencias.formulario.boca")}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.boca}
                                closeMenuOnSelect={false}
                                onChange={selecionBoca}
                                components={animatedComponents}
                                isMulti
                                options={boca}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.cuello"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.cuello}
                                closeMenuOnSelect={false}
                                onChange={selecionCuello}
                                components={animatedComponents}
                                isMulti
                                options={cuello}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.torax"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.torax}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                onChange={selecionTorax}
                                isMulti
                                options={torax}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.corazon"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.corazon}
                                closeMenuOnSelect={false}
                                onChange={selecionCorazon}
                                components={animatedComponents}
                                isMulti
                                options={corazon}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.pulmon"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.pulmon}
                                closeMenuOnSelect={false}
                                onChange={selecionPulmon}
                                components={animatedComponents}
                                isMulti
                                options={pulmon}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.abdomen"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.abdomen}
                                closeMenuOnSelect={false}
                                onChange={selecionAbdomen}
                                components={animatedComponents}
                                isMulti
                                options={abdomen}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.pelvis"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.pelvis}
                                closeMenuOnSelect={false}
                                onChange={selecionPelvis}
                                components={animatedComponents}
                                isMulti
                                options={pelvis}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.rectal"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.rectal}
                                closeMenuOnSelect={false}
                                onChange={selecionRectal}
                                components={animatedComponents}
                                isMulti
                                options={rectal}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.genital"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.genital}
                                closeMenuOnSelect={false}
                                onChange={selecionGenital}
                                components={animatedComponents}
                                isMulti
                                options={genital}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.extremidad"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.extremidad}
                                closeMenuOnSelect={false}
                                onChange={selecionExtremidad}
                                components={animatedComponents}
                                isMulti
                                options={extremidad}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.neuro"
                                    )}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.neuro}
                                closeMenuOnSelect={false}
                                onChange={selecionNeuro}
                                components={animatedComponents}
                                isMulti
                                options={neuro}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t("eclinical.emergencias.formulario.piel")}
                                </strong>
                            </Form.Label>
                            <Select
                                value={form2.piel}
                                closeMenuOnSelect={false}
                                onChange={selecionPiel}
                                components={animatedComponents}
                                isMulti
                                options={piel}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.sintomas"
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                value={form2.sintomas}
                                placeholder={`${t(
                                    "eclinical.emergencias.formulario.sintomas"
                                )}`}
                                name="sintomas"
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.descripcion"
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                value={form2.descripcion_diagnostico}
                                placeholder={`${t(
                                    "eclinical.emergencias.formulario.descripcion"
                                )}`}
                                name="descripcion_diagnostico"
                                onChange={handleChange1}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col}>
                            <Form.Label column sm={3}>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.cie10"
                                    )}
                                </strong>
                            </Form.Label>
                            <Col sm={9}>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        placeholder={`-- ${t(
                                            "etiquetas.seleccion"
                                        )} --`}
                                        disabled
                                        value={paciente}
                                        onChange={handleChange1}
                                        name="cie10"
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

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.otros"
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                value={form2.otros}
                                placeholder={`${t(
                                    "eclinical.emergencias.formulario.otros"
                                )}`}
                                name="otros"
                                onChange={handleChange1}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <Button
                                variant="primary"
                                onClick={abrirMedicamentos}
                            >
                                <Icofont icon="ui-add" className="mx-2" />
                                Medicamentos
                            </Button>
                            {medicamentosSeleccionados.length > 0 && (
                                <Button
                                    variant="primary"
                                    onClick={generatePDFMedicamentos}
                                >
                                    <Icofont icon="printer" className="mx-2" />
                                    {t(
                                        "eclinical.emergencias.formulario.ordenmedicamentos"
                                    )}
                                </Button>
                            )}
                        </Col>

                        <Col>
                            <Button variant="primary" onClick={abrirExamenes}>
                                <Icofont icon="ui-add" className="mx-2" />
                                {t("eclinical.emergencias.formulario.examenes")}
                            </Button>
                            {examenesSeleccionados.length > 0 && (
                                <Button
                                    variant="primary"
                                    onClick={generatePDFExamenes}
                                >
                                    <Icofont icon="printer" className="mx-2" />
                                    {t(
                                        "eclinical.emergencias.formulario.ordenexamenes"
                                    )}
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <PaginationProvider
                                pagination={paginationFactory(
                                    optionsMedicamentosSeleccionado
                                )}
                            >
                                {contentTableMedicamentosSeleccionados}
                            </PaginationProvider>
                        </Col>
                        <Col>
                            <PaginationProvider
                                pagination={paginationFactory(
                                    optionsExamenesSeleccionado
                                )}
                            >
                                {contentTableExamenesSeleccionados}
                            </PaginationProvider>
                        </Col>
                    </Row>
                </Form>
            )}
            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("eclinical.emergencias.formulario.seleccioncie10")}
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

            <Modal
                show={ventanaMedicamentos}
                onHide={cerrarMedicamentos}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("eclinical.emergencias.formulario.selecciondosis")}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PaginationProvider
                        pagination={paginationFactory(optionsMedicamentos)}
                    >
                        {contentTableMedicamentos}
                    </PaginationProvider>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            medicamentosSeleccionado.dosis =
                                dosisMedicamentoSeleccionado;
                            if (
                                medicamentosSeleccionados.indexOf(
                                    medicamentosSeleccionado
                                ) == -1
                            ) {
                                setMedicamentosSeleccionados([
                                    ...medicamentosSeleccionados,
                                    medicamentosSeleccionado,
                                ]);
                                setFormRegistrarMedicamento((prevState) => ({
                                    ...prevState,
                                    id_atencionmedica: form2.id_atencionmedica,
                                    id_medicamentos:
                                        medicamentosSeleccionado.id_medicamento,
                                    dosis: medicamentosSeleccionado.dosis,
                                }));
                            }
                            cerrarMedicamentos();
                        }}
                    >
                        {t("etiquetas.seleccionar")}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            cerrarMedicamentos();
                        }}
                    >
                        {t("etiquetas.cancelar")}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={ventanaExamenes} onHide={cerrarExamenes} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("eclinical.emergencias.formulario.seleccionexamen")}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PaginationProvider
                        pagination={paginationFactory(optionsExamenes)}
                    >
                        {contentTableExamenes}
                    </PaginationProvider>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (
                                examenesSeleccionados.indexOf(
                                    examenesSeleccionado
                                ) == -1
                            ) {
                                setExamenesSeleccionados([
                                    ...examenesSeleccionados,
                                    examenesSeleccionado,
                                ]);

                                setFormRegistrarExamenes((prevState) => ({
                                    ...prevState,
                                    id_atencionmedica: form2.id_atencionmedica,
                                    id_examen: examenesSeleccionado.id_examen,
                                }));
                            }
                            cerrarExamenes();
                        }}
                    >
                        {t("etiquetas.seleccionar")}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            cerrarExamenes();
                        }}
                    >
                        {t("etiquetas.cancelar")}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={ventanaEgreso} onHide={cerrarEgreso} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("eclinical.emergencias.formulario.seleccionexamen")}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group as={Col} controlId="id_estadoalta">
                            <Form.Label>
                                <strong>
                                    {t(
                                        "eclinical.emergencias.formulario.disposicion"
                                    )}
                                </strong>
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    value={formEgreso.id_estadoalta}
                                    onChange={cambioSelect}
                                    name="id_estadoalta"
                                >
                                    <option value="" id="defAcc">
                                        {`-- ${t("etiquetas.seleccion")} --`}
                                    </option>
                                    {salaEstadoAlta.map((tipo) => (
                                        <option
                                            key={tipo.id_estadoalta}
                                            value={tipo.id_estadoalta}
                                        >
                                            {tipo.estado_alta}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            PostEgreso();
                            GetAdmisiones();

                            cerrarEgreso();
                        }}
                    >
                        {t("etiquetas.aceptar")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Urgencias;
