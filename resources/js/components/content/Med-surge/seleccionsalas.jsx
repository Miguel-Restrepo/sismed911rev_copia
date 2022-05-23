import React from "react";
import Icofont from "react-icofont";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-phone-input-2/lib/style.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-phone-input-2/lib/style.css";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { set } from "lodash";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";

const seleccionsalas = () => {
    const [t, i18n] = useTranslation("global");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [select, setSelect] = useState("");
    const [chose, setChose] = useState("");

    const [bloques, setBloques] = useState([]);
    const [divi, setDivi] = useState([]);
    const [servicios, setServicios] = useState([]);

    const Get = () => {
        axios
            .get(`/api/bloque_div`)
            .then((response) => {
                const ds = response.data.filter((e) => e.activo === true);
                setChose({
                    id: ds[0].id,
                    bloque: ds[0].bloque,
                    fecha_creacion: ds[0].fecha_creacion,
                    activo: false,
                });
                setBloques(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetDisvision = () => {
        axios
            .get("/api/division_hosp")
            .then((response) => {
                setDivi(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetServicios = () => {
        axios
            .get("/api/servicios_division")
            .then((response) => {
                setServicios(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const Post = () => {
        axios
            .put(`/api/bloque_div/${chose.id}`, chose)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
        axios
            .put(`/api/bloque_div/${select.id}`, select)
            .then((response) => {
                handleShow2();
                Get();
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
        handleClose();
    };

    useEffect(() => {
        Get();
        GetDisvision();
        GetServicios();
    }, []);
    return (
        <div>
            <div>
                <h2>{t("medsurge.seleccion.titulo")}</h2>
            </div>
            <div>
                <Form className="m-xxl-4">
                    <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formcodigo"
                    >
                        {bloques.map((item) => (
                            <Col key={item.id} className="opcionasd" sm="6">
                                <Row className="optitle">
                                    <Form.Label column sm="10">
                                        <h3>{item.bloque}</h3>
                                    </Form.Label>
                                    <Col>
                                        <Form.Check
                                            aria-label="option 1"
                                            name="editar"
                                            type="radio"
                                            value={item.bloque}
                                            checked={item.activo}
                                            onClick={
                                                chose.id != item.id
                                                    ? () => {
                                                          setSelect({
                                                              id: item.id,
                                                              bloque: item.bloque,
                                                              fecha_creacion:
                                                                  item.fecha_creacion,
                                                              activo: true,
                                                          });
                                                          handleShow();
                                                      }
                                                    : ""
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Label column sm="2">
                                        <h5>{t("medsurge.seleccion.fecha")}</h5>
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={item.fecha_creacion}
                                            name="fecha_reporte"
                                        />
                                    </Col>
                                </Row>
                                {servicios.map((serv) => (
                                    <Row
                                        className="mb-xxl-4"
                                        key={serv.id_servicio}
                                    >
                                        <Form.Label sm="3" className="mb-xxl-0">
                                            <h3>{serv.nombre_servicio}</h3>
                                        </Form.Label>
                                        <Col>
                                            {divi
                                                .filter(
                                                    (e) =>
                                                        e.bloque === item.id &&
                                                        e.id_servicio ===
                                                            serv.id_servicio
                                                )
                                                .map((it) => (
                                                    <Col key={it.id_division}>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={
                                                                it.descripcion
                                                            }
                                                            name="fecha_reporte"
                                                        />
                                                    </Col>
                                                ))}
                                        </Col>
                                    </Row>
                                ))}
                            </Col>
                        ))}
                    </Form.Group>
                </Form>

                <Modal
                    show={show}
                    onHide={handleClose}
                    className="mb-xxl-1 pb-xxl-1"
                >
                    <Alert variant="info" className="mb-xxl-1 pb-xxl-1">
                        <Alert.Heading>
                            {t("mensajes.confirmacion")}
                        </Alert.Heading>
                        <p>{t("mensajes.preguntabloque")}</p>
                        <hr />
                        <div className="d-flex justify-content-end mb-xxl-1 pb-xxl-1">
                            <Button
                                onClick={Post}
                                variant="primary"
                                className="me-xxl-3"
                            >
                                {t("etiquetas.aceptar")}
                            </Button>
                            <Button onClick={handleClose} variant="secondary">
                                {t("etiquetas.cancelar")}
                            </Button>
                        </div>
                    </Alert>
                </Modal>

                <Modal
                    show={show2}
                    onHide={handleClose2}
                    className="mb-xxl-1 pb-xxl-1"
                >
                    <Alert variant="success" className="mb-xxl-1 pb-xxl-1">
                        <Alert.Heading>{t("mensajes.exito")}</Alert.Heading>
                        <p>{t("mensajes.cambioexitoso")}</p>
                        <hr />
                        <div className="d-flex justify-content-end mb-xxl-1 pb-xxl-1">
                            <Button
                                onClick={handleClose2}
                                variant="primary"
                                className="me-xxl-3"
                            >
                                {t("etiquetas.hecho")}
                            </Button>
                        </div>
                    </Alert>
                </Modal>
            </div>
        </div>
    );
};

export default seleccionsalas;
