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
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const nuevaseccion = () => {
    const [t, i18n] = useTranslation("global");
    const [tablas, setTablas] = useState([]);
    const [divisiones, setDivisiones] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [campos, setCampos] = useState([]);
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);
    const [line1, setLine1] = useState("");
    const [show1, setShow1] = useState(false);
    const [showe1, setShowE1] = useState(false);
    const [view1, setView1] = useState(true);
    const [editar1, setEditar1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleCloseE1 = () => setShowE1(false);
    const handleShowE1 = () => setShowE1(true);
    const handleDelet1 = () => setView1(false);
    const handleView1 = () => setView1(true);
    const handleEdit1 = () => setEditar1(true);
    const handleAdd1 = () => setEditar1(false);

    const [formbloques, setFormBloq] = useState({
        bloque: "",
        fecha_creacion: DateTime.now(),
        activo: false,
    });

    const [form, setForm] = useState({
        descripcion: "",
        id_servicio: "",
        bloque: "",
    });

    const clearform = () =>
        setForm({
            descripcion: "",
            id_servicio: "",
            bloque: "",
        });

    const clearbloques = () =>
        setFormBloq({
            bloque: "",
            fecha_creacion: "",
            activo: false,
        });

    const Get = () => {
        axios
            .get(`/api/bloque_div`)
            .then((response) => {
                setTablas(response.data);
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

    const handleChange = (e) => {
        e.persist();
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleBloq = (e) => {
        e.persist();
        setFormBloq((prevState) => ({
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
    const Post = () => {
        axios
            .post("/api/bloque_div", formbloques)
            .then((response) => {
                notificarExitoCaso(response.data.id);
                Get();
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    const Post1 = () => {
        axios
            .post("/api/division_hosp", form)
            .then((response) => {
                obtener(form.bloque);
                notificarExitoCaso(response.data.id_division);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    const Edit = () => {
        axios
            .put(`/api/bloque_div/${line.id}`, formbloques)
            .then((response) => {
                Get();
                setLine("");
                setDivisiones([]);
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    };

    const Edit1 = () => {
        axios
            .put(`/api/division_hosp/${line1.id_division}`, form)
            .then((response) => {
                obtener(form.bloque);
                setLine1("");
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    };

    useEffect(() => {
        Get();
        GetServicios();
    }, []);

    const Elimina = () => {
        axios
            .delete(`/api/bloque_div/${line.id}/delete`)
            .then((response) => {
                Get();
                setLine("");
                setDivisiones([]);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
        handleClose();
    };
    const Elimina1 = () => {
        axios
            .delete(`/api/division_hosp/${line1.id_division}/delete`)
            .then((response) => {
                obtener(line1.bloque);
                setLine1("");
                return response.data;
            })
            .catch((error) => {
                return error;
            });
        handleClose1();
    };

    const obtener = (code) => {
        axios
            .get(`/api/division_hosp`)
            .then((response) => {
                setDivisiones(response.data.filter((e) => e.bloque === code));
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const { SearchBar1 } = Search;
    const columns1 = [
        {
            dataField: "id_division",
            text: `${t("medsurge.nuevaseccion.id")}`,
            sort: true,
        },
        {
            dataField: "descripcion",
            text: `${t("medsurge.nuevaseccion.descripcion")}`,
            sort: true,
        },
        {
            text: "Servicio",
            dataField: "id_servicio",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.id_servicio === 1
                            ? t("medsurge.nuevaseccion.hospitalizacion")
                            : row.id_servicio === 2
                            ? t("medsurge.nuevaseccion.uci")
                            : row.id_servicio === 3
                            ? t("medsurge.nuevaseccion.pediatria")
                            : ""}
                    </div>
                );
            },
        },
        {
            text: "",
            dataField: "369854",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Icofont
                            icon="search-1"
                            className="mx-2"
                            onClick={() => {
                                handleView1();
                                setForm({
                                    descripcion: row.descripcion,
                                    id_servicio: row.id_servicio,
                                    bloque: row.bloque,
                                });
                                setLine1({
                                    id_division: row.id_division,
                                    descripcion: row.descripcion,
                                    id_servicio: row.id_servicio,
                                    bloque: row.bloque,
                                });
                                handleShow1();
                            }}
                        />
                    </div>
                );
            },
        },
        {
            text: "",
            dataField: "785",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Icofont
                            icon="pencil-alt-2"
                            className="mx-2"
                            onClick={() => {
                                handleEdit1();
                                setForm({
                                    descripcion: row.descripcion,
                                    id_servicio: row.id_servicio,
                                    bloque: row.bloque,
                                });
                                setLine1({
                                    id_division: row.id_division,
                                    descripcion: row.descripcion,
                                    id_servicio: row.id_servicio,
                                    bloque: row.bloque,
                                });
                                handleShowE1();
                            }}
                        />
                    </div>
                );
            },
        },
        {
            text: "",
            dataField: "45",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Icofont
                            icon="trash"
                            className="mx-2"
                            onClick={() => {
                                handleDelet1();
                                setForm({
                                    descripcion: row.descripcion,
                                    id_servicio: row.id_servicio,
                                    bloque: row.bloque,
                                });
                                setLine1({
                                    id_division: row.id_division,
                                    descripcion: row.descripcion,
                                    id_servicio: row.id_servicio,
                                    bloque: row.bloque,
                                });
                                handleShow1();
                            }}
                        />
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
        totalSize: divisiones.length,
    };
    const selectRow1 = {
        mode: "radio",
        clickToSelect: true,
        selected: [1],
        hideSelectColumn: true,
        classes: "selection-row",
    };
    const contentTable1 = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_division"
                columns={columns1}
                data={divisiones}
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

    const { SearchBar } = Search;
    const columns = [
        {
            dataField: "id",
            text: `${t("medsurge.nuevaseccion.idbloque")}`,
            sort: true,
        },
        {
            dataField: "bloque",
            text: `${t("medsurge.nuevaseccion.bloque")}`,
            sort: true,
        },
        {
            dataField: "fecha_creacion",
            text: `${t("medsurge.nuevaseccion.fecha")}`,
            sort: true,
        },
        {
            dataField: "activo",
            text: `${t("medsurge.nuevaseccion.activo")}`,
            sort: true,
        },
        {
            text: "",
            dataField: "333",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Icofont
                            icon="search-1"
                            className="mx-2"
                            onClick={() => {
                                handleView();
                                obtener(row.id);
                                setFormBloq({
                                    bloque: row.bloque,
                                    fecha_creacion: row.fecha_creacion,
                                    activo: row.activo,
                                });
                                setLine({
                                    id: row.id,
                                    bloque: row.bloque,
                                    fecha_creacion: row.fecha_creacion,
                                    activo: row.activo,
                                });
                                handleShow();
                            }}
                        />
                    </div>
                );
            },
        },
        {
            text: "",
            dataField: "22",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Icofont
                            icon="pencil-alt-2"
                            className="mx-2"
                            onClick={() => {
                                handleEdit();
                                obtener(row.id);
                                setFormBloq({
                                    bloque: row.bloque,
                                    fecha_creacion: row.fecha_creacion,
                                    activo: row.activo,
                                });
                                setLine({
                                    id: row.id,
                                    bloque: row.bloque,
                                    fecha_creacion: row.fecha_creacion,
                                    activo: row.activo,
                                });
                                handleShowE();
                            }}
                        />
                    </div>
                );
            },
        },
        {
            text: "",
            dataField: "11",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        <Icofont
                            icon="trash"
                            className="mx-2"
                            onClick={() => {
                                handleDelet();
                                obtener(row.id);
                                setFormBloq({
                                    bloque: row.bloque,
                                    fecha_creacion: row.fecha_creacion,
                                    activo: row.activo,
                                });
                                setLine({
                                    id: row.id,
                                    bloque: row.bloque,
                                    fecha_creacion: row.fecha_creacion,
                                    activo: row.activo,
                                });
                                handleShow();
                            }}
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
        totalSize: tablas.length,
    };
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        selected: [1],
        hideSelectColumn: true,
        classes: "selection-row",
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id"
                columns={columns}
                data={tablas}
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
                            selectRow={selectRow}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    return (
        <div>
            <div>
                <h2>{t("medsurge.nuevaseccion.nueva")}</h2>
            </div>
            <div>
                <Button
                    variant="outline-dark"
                    onClick={() => {
                        handleAdd();
                        clearform();
                        clearbloques();
                        handleShowE();
                    }}
                >
                    <Icofont icon="ui-add" className="mx-2" />
                </Button>
                <PaginationProvider pagination={paginationFactory(options)}>
                    {contentTable}
                </PaginationProvider>

                <Modal
                    show={show}
                    onHide={() => {
                        handleClose();
                        setLine("");
                    }}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {" "}
                            <h1>
                                {t("medsurge.nuevaseccion.bloque")} -{" "}
                                {view ? "Ver" : "Borrar"}
                            </h1>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mb-5">
                            <Button
                                variant="outline-dark"
                                onClick={() => {
                                    clearform();
                                    clearbloques();
                                    handleClose();
                                    handleAdd();
                                    setLine("");
                                    setDivisiones([]);
                                    handleShowE();
                                }}
                            >
                                <Icofont icon="ui-add" className="mx-2" />
                            </Button>

                            <Button
                                variant="outline-dark"
                                onClick={() => {
                                    handleEdit();
                                    handleClose();
                                    handleShowE();
                                }}
                            >
                                <Icofont icon="pencil-alt-2" className="mx-2" />
                            </Button>

                            <Button
                                variant="outline-dark"
                                disabled={!view}
                                onClick={() => {
                                    handleClose();
                                    handleDelet();
                                    handleShow();
                                }}
                            >
                                <Icofont icon="trash" className="mx-2" />
                            </Button>
                        </div>
                        <Form className="m-xxl-4">
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formid"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.idbloque")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={line.id}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formname"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.bloque")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={line.bloque}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formname"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.fecha")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={line.fecha_creacion}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-4"
                                controlId="formname"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.activo")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={line.activo}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button
                            variant="outline-dark"
                            onClick={() => {
                                handleAdd1();
                                clearform();
                                clearbloques();
                                handleShowE1();
                                setForm((prevState) => ({
                                    ...prevState,
                                    bloque: line.id,
                                }));
                            }}
                        >
                            <Icofont icon="ui-add" className="mx-2" />
                        </Button>
                        <PaginationProvider
                            pagination={paginationFactory(options1)}
                        >
                            {contentTable1}
                        </PaginationProvider>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant={view ? "primary" : "danger"}
                            onClick={
                                view
                                    ? () => {
                                          handleClose();
                                          setLine("");
                                          setDivisiones([]);
                                      }
                                    : Elimina
                            }
                        >
                            {view ? "Hecho" : "Borrar"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                handleClose();
                                setLine("");
                                setDivisiones([]);
                            }}
                        >
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showe}
                    onHide={() => {
                        handleCloseE();
                        setLine("");
                    }}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("medsurge.nuevaseccion.bloque")} -{" "}
                            {editar ? "Editar" : "Agregar"}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {editar ? (
                            <div className="mb-5">
                                <Button
                                    variant="outline-dark"
                                    onClick={() => {
                                        handleCloseE();
                                        clearform();
                                        clearbloques();
                                        handleAdd();
                                        setLine("");
                                        handleShowE();
                                    }}
                                >
                                    <Icofont icon="ui-add" className="mx-2" />
                                </Button>
                                <Button
                                    variant="outline-dark"
                                    onClick={() => {
                                        handleCloseE();
                                        handleDelet();
                                        handleShow();
                                    }}
                                >
                                    <Icofont icon="trash" className="mx-2" />
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}

                        <Form className="m-xxl-4">
                            <Form.Group
                                as={Row}
                                className="mb-4"
                                controlId="formcodigo"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.bloque")}
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`${t(
                                            "medsurge.nuevaseccion.bloque"
                                        )}`}
                                        value={formbloques.bloque}
                                        onChange={handleBloq}
                                        name="bloque"
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                        {editar ? (
                            <div>
                                <Button
                                    variant="outline-dark"
                                    onClick={() => {
                                        handleAdd1();
                                        clearform();
                                        clearbloques();
                                        handleShowE1();
                                    }}
                                >
                                    <Icofont icon="ui-add" className="mx-2" />
                                </Button>
                                <PaginationProvider
                                    pagination={paginationFactory(options1)}
                                >
                                    {contentTable1}
                                </PaginationProvider>
                            </div>
                        ) : (
                            ""
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={
                                editar
                                    ? () => {
                                          Edit();
                                          handleCloseE();
                                      }
                                    : () => {
                                          Post();
                                          handleCloseE();
                                      }
                            }
                        >
                            {editar ? "Editar" : "Agregar"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                handleCloseE();
                                setLine("");
                                setDivisiones([]);
                                clearform();
                            }}
                        >
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={show1}
                    onHide={() => {
                        handleClose1();
                        setLine1("");
                    }}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {" "}
                            <h1>
                                {t("medsurge.nuevaseccion.seccion")} -{" "}
                                {view1 ? "Ver" : "Borrar"}
                            </h1>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mb-5">
                            <Button
                                variant="outline-dark"
                                onClick={() => {
                                    clearform1();
                                    clearbloques();
                                    handleClose1();
                                    handleAdd1();
                                    setLine1("");
                                    handleShowE1();
                                }}
                            >
                                <Icofont icon="ui-add" className="mx-2" />
                            </Button>

                            <Button
                                variant="outline-dark"
                                onClick={() => {
                                    handleEdit1();
                                    handleClose1();
                                    handleShowE1();
                                }}
                            >
                                <Icofont icon="pencil-alt-2" className="mx-2" />
                            </Button>

                            <Button
                                variant="outline-dark"
                                disabled={!view1}
                                onClick={() => {
                                    handleClose1();
                                    handleDelet1();
                                    handleShow1();
                                }}
                            >
                                <Icofont icon="trash" className="mx-2" />
                            </Button>
                        </div>
                        <Form className="m-xxl-4">
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formid"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={line1.id_division}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formname"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.descripcion")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={line1.descripcion}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formname"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.servicio")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={
                                            line1 === 1
                                                ? t(
                                                      "medsurge.nuevaseccion.hospitalizacion"
                                                  )
                                                : line1 === 2
                                                ? t("medsurge.nuevaseccion.uci")
                                                : line1 === 3
                                                ? t(
                                                      "medsurge.nuevaseccion.pediatria"
                                                  )
                                                : ""
                                        }
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant={view1 ? "primary" : "danger"}
                            onClick={
                                view1
                                    ? () => {
                                          handleClose1();
                                          setLine1("");
                                      }
                                    : Elimina1
                            }
                        >
                            {view1 ? "Hecho" : "Borrar"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                handleClose1();
                                setLine1("");
                            }}
                        >
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showe1}
                    onHide={() => {
                        handleCloseE1();
                        setLine1("");
                    }}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t("medsurge.nuevaseccion.seccion")} -{" "}
                            {editar1 ? "Editar" : "Agregar"}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {editar1 ? (
                            <div className="mb-5">
                                <Button
                                    variant="outline-dark"
                                    onClick={() => {
                                        handleCloseE1();
                                        clearform1();
                                        handleAdd1();
                                        setLine1("");
                                        handleShowE1();
                                        setForm((prevState) => ({
                                            ...prevState,
                                            bloque: line.id,
                                        }));
                                    }}
                                >
                                    <Icofont icon="ui-add" className="mx-2" />
                                </Button>
                                <Button
                                    variant="outline-dark"
                                    onClick={() => {
                                        handleCloseE1();
                                        handleDelet1();
                                        handleShow1();
                                    }}
                                >
                                    <Icofont icon="trash" className="mx-2" />
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}

                        <Form className="m-xxl-4">
                            <Form.Group
                                as={Row}
                                className="mb-4"
                                controlId="formcodigo"
                            >
                                <Form.Label column sm="2">
                                    {t("medsurge.nuevaseccion.descripcion")}
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`${t(
                                            "medsurge.nuevaseccion.descripcion"
                                        )}`}
                                        value={form.descripcion}
                                        onChange={handleChange}
                                        name="descripcion"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="mantenimiento"
                            >
                                <Form.Label column sm={2}>
                                    <strong>
                                        {t("medsurge.nuevaseccion.servicion")}
                                    </strong>
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        as="select"
                                        value={form.id_servicio}
                                        onChange={handleChange}
                                        name="id_servicio"
                                    >
                                        <option
                                            value=""
                                            id="defServ"
                                            key="986518"
                                        >
                                            {`-- ${t(
                                                "etiquetas.seleccion"
                                            )} --`}
                                        </option>
                                        {servicios.map((serv) => (
                                            <option
                                                value={serv.id_servicio}
                                                id={serv.id_servicio}
                                                key={serv.id_servicio}
                                            >
                                                {serv.nombre_servicio}
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
                            onClick={
                                editar1
                                    ? () => {
                                          Edit1();
                                          handleCloseE1();
                                      }
                                    : () => {
                                          Post1();
                                          handleCloseE1();
                                      }
                            }
                        >
                            {editar1 ? "Editar" : "Agregar"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                handleCloseE1();
                                setLine1("");
                                clearform1();
                            }}
                        >
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default nuevaseccion;
