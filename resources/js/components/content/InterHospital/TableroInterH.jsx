import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const { DateTime } = require("luxon");

toast.configure();

const TableroInterH = () => {
    const [t, i18n] = useTranslation("global");

    const [dataRegiones, setDataRegiones] = useState([]);
    const [dataTotales, setDataTotales] = useState([]);
    const [dataTabla, setDataTabla] = useState([]);
    const [dataTotalAsistencias, setDataTotalAsistencias] = useState([]);

    const GetRegiones = () => {
        axios
            .get("/api/estadisticas/interh/regiones")
            .then((response) => {
                setDataRegiones(response.data);

                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTotales = () => {
        axios
            .get("/api/estadisticas/interh/totales")
            .then((response) => {
                setDataTotales(response.data);

                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTabla = () => {
        axios
            .get("/api/estadisticas/interh/tabla")
            .then((response) => {
                setDataTabla(response.data);

                return response.data;
            })
            .catch((error) => {
                return error;
            });
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

    const PostTotales = async () => {
        await axios
            .post("api/estadisticas/interh/totales", null, {
                params: {},
            })
            .then((response) => {
                setDataTotalAsistencias(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const columns = [
        {
            dataField: "fechahorainterh",
            text: `${t("interhospital.tablerointerh.datos.mes")}`,
            formatter: (cell, row) => {
                return (
                    <div>
                        {`${DateTime.fromISO(row.fechahorainterh.slice(0, 10))
                            .setLocale("es")
                            .toLocaleString({ month: "long" })}`}
                    </div>
                );
            },
            sort: true,
        },
        {
            dataField: "hospital_destinointerh",
            text: `${t("interhospital.tablerointerh.datos.hptlreporta")}`,
            sort: true,
        },
        {
            dataField: "apellido1",
            text: `${t("interhospital.tablerointerh.datos.paciente")}`,
            formatter: (cell, row) => {
                return (
                    <div>
                        {`
            ${row.apellido1 != null ? row.apellido1 : ""}
            ${row.apellido2 != null ? row.apellido2 : ""}
            ${row.nombre1 != null ? row.nombre1 : ""}
            ${row.nombre2 != null ? row.nombre2 : ""}`}
                    </div>
                );
            },
            sort: true,
        },
        {
            dataField: "cod_paciente",
            text: `${t("interhospital.tablerointerh.datos.condicion")}`,
            sort: true,
        },
        {
            dataField: "destino_nombre_hospital",
            text: `${t("interhospital.tablerointerh.datos.hptlrecibe")}`,
            sort: true,
        },
        {
            dataField: "cod_ambulancia",
            text: `${t("interhospital.tablerointerh.datos.unidad")}`,
            sort: true,
        },
        {
            dataField: "tipo_traslado",
            text: `${t("interhospital.tablerointerh.datos.estatus")}`,
            sort: true,
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
        totalSize: dataTabla.length,
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="cod_casointerh"
                columns={columns}
                data={dataTabla}
            >
                {(toolkitprops) => (
                    <div>
                        <BootstrapTable
                            striped
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t("tabla.sindatos")}`}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    useEffect(() => {
        GetRegiones();
        GetTotales();
        GetTabla();
        PostTotales();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card
                        style={{
                            height: "100vh",
                            border: "4px solid #176b82",
                            borderRadius: "20px",
                            backgroundColor: "#073c53",
                        }}
                        className="pt-5"
                    >
                        {dataRegiones.slice(0, 8).map((region, index) => (
                            <div
                                key={index}
                                style={{
                                    borderBottom:
                                        index < 7 ? "3px solid #FFFFFF" : "0px",
                                    color: "#FFFFFF",
                                }}
                                className="pt-2"
                            >
                                <h6 className="text-center">{region.name}</h6>
                                <h1 className="text-center">{region.value}</h1>
                            </div>
                        ))}
                    </Card>
                </Col>

                <Col xs={10}>
                    <Card style={{ height: "100vh" }}>
                        <Card.Header
                            as="h2"
                            style={{ height: "10%", color: "#073c53" }}
                            className="d-flex justify-content-center py-4"
                        >
                            {t(
                                "interhospital.tablerointerh.formulario.traslados"
                            )}
                        </Card.Header>

                        <ListGroup variant="flush" style={{ height: "100vh" }}>
                            <ListGroup.Item style={{ height: "30%" }}>
                                <Row className="h-100 py-4">
                                    <Col className="h-100">
                                        <Card className="h-100">
                                            <Card.Header as="h4">
                                                {t(
                                                    "interhospital.tablerointerh.formulario.completados"
                                                )}
                                            </Card.Header>
                                            <Card.Body
                                                className="d-flex justify-content-center"
                                                style={{
                                                    alignItems: "center",
                                                    backgroundColor: "#10e20b",
                                                }}
                                            >
                                                {dataTotales.length > 0 && (
                                                    <h1 className="text-center">
                                                        {
                                                            dataTotales[0]
                                                                .completos
                                                        }
                                                    </h1>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col className="h-100">
                                        <Card className="h-100">
                                            <Card.Header as="h4">
                                                {t(
                                                    "interhospital.tablerointerh.formulario.espera"
                                                )}
                                            </Card.Header>
                                            <Card.Body
                                                className="d-flex justify-content-center"
                                                style={{
                                                    alignItems: "center",
                                                    backgroundColor: "#edef0d",
                                                }}
                                            >
                                                {dataTotales.length > 0 && (
                                                    <h1 className="text-center">
                                                        {
                                                            dataTotales[0]
                                                                .en_espera
                                                        }
                                                    </h1>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col className="h-100">
                                        <Card className="h-100">
                                            <Card.Header as="h4">
                                                {t(
                                                    "interhospital.tablerointerh.formulario.proceso"
                                                )}
                                            </Card.Header>
                                            <Card.Body
                                                className="d-flex justify-content-center"
                                                style={{
                                                    alignItems: "center",
                                                    backgroundColor: "#f5a908",
                                                }}
                                            >
                                                {dataTotales.length > 0 && (
                                                    <h1 className="text-center">
                                                        {
                                                            dataTotales[0]
                                                                .en_proceso
                                                        }
                                                    </h1>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col className="h-100">
                                        <Card className="h-100">
                                            <Card.Header as="h4">
                                                {t(
                                                    "interhospital.tablerointerh.formulario.abortados"
                                                )}
                                            </Card.Header>
                                            <Card.Body
                                                className="d-flex justify-content-center"
                                                style={{
                                                    alignItems: "center",
                                                    backgroundColor: "#d40100",
                                                }}
                                            >
                                                {dataTotales.length > 0 && (
                                                    <h1 className="text-center">
                                                        {
                                                            dataTotales[0]
                                                                .abortados
                                                        }
                                                    </h1>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col className="h-100">
                                        <Card className="h-100">
                                            <Card.Header as="h4">
                                                {t(
                                                    "interhospital.tablerointerh.formulario.totalasistencias"
                                                )}
                                            </Card.Header>
                                            <Card.Body
                                                className="d-flex justify-content-center"
                                                style={{
                                                    alignItems: "center",
                                                    backgroundColor: "#073c53",
                                                }}
                                            >
                                                {dataTotalAsistencias.length >
                                                    0 && (
                                                    <h1
                                                        className="text-center"
                                                        style={{
                                                            color: "#FFFFFF",
                                                        }}
                                                    >
                                                        {
                                                            dataTotalAsistencias[0]
                                                                .total_asistencia
                                                        }
                                                    </h1>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ height: "fit-content" }}>
                                <PaginationProvider
                                    pagination={paginationFactory(options)}
                                >
                                    {contentTable}
                                </PaginationProvider>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TableroInterH;
