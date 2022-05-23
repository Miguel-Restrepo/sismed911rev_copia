import React from 'react'
import Icofont from 'react-icofont';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from "axios";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//import 'react-phone-input-2/lib/style.css'
import InputGroup from 'react-bootstrap/InputGroup'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import 'react-phone-input-2/lib/style.css'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set } from 'lodash';
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Catalogo = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
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

    const [form, setForm] = useState({
        servicio_es: '',
        servicio_en: '',
        servicio_pr: '',
        servicio_fr: ''
    });

    const clearform = () => setForm({
        servicio_es: '',
        servicio_en: '',
        servicio_pr: '',
        servicio_fr: ''
    })

    const Get = () => {
        axios.get(`/api/catalogo_serv_taller`)
            .then(response => {

                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }
    const notificarExitoCaso = (idcaso) =>
    toast.success(`${t("mensajes.mscasoid")} ${idcaso} ${t("mensajes.msexito")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });;

const notificarErrorCaso = () =>
    toast.error(`${t("mensajes.mscreacionerror")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });;
    const handleChange = e => {
        e.persist();
        setForm(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )

    }

    const Post = () => {
        axios.post('/api/catalogo_serv_taller', form)
            .then(response => {
                notificarExitoCaso(response.data.id_catalogo);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/catalogo_serv_taller/${line.id_catalogo}`, form)
            .then(response => {

                Get()
                setLine('')
                return response.data;
            })
            .catch(error => {

                return error.response.data;
            })
    }

    useEffect(() => {
        Get()

    }, []);

    const Elimina = () => {
        axios.delete(`/api/catalogo_serv_taller/${line.id_catalogo}/delete`)
            .then(response => {
                Get()
                setLine('')
                return response.data;
            })
            .catch(error => {
                return error;
            });
        handleClose();
    }





    const { SearchBar } = Search;
    const columns = [{
        dataField: 'id_catalogo',
        text: `${t("ambulancias.catalogo.datos.servicio")}`,
        sort: true
    }, {
        dataField: `servicio_es`,
        text:`${t("ambulancias.catalogo.datos.servicio")} Es`,
        sort: true
    },
    {
        dataField: `servicio_en`,
        text:`${t("ambulancias.catalogo.datos.servicio")} En`,
        sort: true
    },
    {
        dataField: `servicio_fe`,
        text:`${t("ambulancias.catalogo.datos.servicio")} Fr`,
        sort: true
    },
    {
        dataField: `servicio_pt`,
        text:`${t("ambulancias.catalogo.datos.servicio")} Pt`,
        sort: true
    }, {
        text:'',
        dataField: '652',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        setForm({
                            servicio_es: row.servicio_es,
                            servicio_en: row.servicio_en,
                            servicio_fr: row.servicio_fr,
                            servicio_pt: row.servicio_pt
                        })
                        setLine({
                            id_catalogo: row.id_catalogo,
                            servicio_es: row.servicio_es,
                            servicio_en: row.servicio_en,
                            servicio_fr: row.servicio_fr,
                            servicio_pt: row.servicio_pt
                        })
                        handleShow();
                    }} />
                </div>
            );
        }
    }, {
        text: '',
        dataField: '546',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>

                    <Icofont icon="pencil-alt-2" className="mx-2" onClick={() => {
                        handleEdit()
                        setForm({
                            servicio_es: row.servicio_es,
                            servicio_en: row.servicio_en,
                            servicio_fr: row.servicio_fr,
                            servicio_pt: row.servicio_pt
                        })
                        setLine({
                            id_catalogo: row.id_catalogo,
                            servicio_es: row.servicio_es,
                            servicio_en: row.servicio_en,
                            servicio_fr: row.servicio_fr,
                            servicio_pt: row.servicio_pt
                        })
                        handleShowE()
                    }} />

                </div>
            );
        }
    }, {
        text: '',
        dataField: '321',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="trash" className="mx-2" onClick={() => {
                        handleDelet()
                        setForm({
                            servicio_es: row.servicio_es,
                            servicio_en: row.servicio_en,
                            servicio_fr: row.servicio_fr,
                            servicio_pt: row.servicio_pt
                        })
                        setLine({
                            id_catalogo: row.id_catalogo,
                            servicio_es: row.servicio_es,
                            servicio_en: row.servicio_en,
                            servicio_fr: row.servicio_fr,
                            servicio_pt: row.servicio_pt
                        })
                        handleShow();
                    }} />
                </div>
            );
        }
    }
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
        totalSize: tablas.length
    };
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        selected: [1],
        hideSelectColumn: true,
        classes: 'selection-row'
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_catalogo"
                columns={columns}
                data={tablas}
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <SearchBar placeholder={`${t("tabla.buscador")}`}  {...toolkitprops.searchProps} />
                            <BootstrapTable
                                striped
                                hover
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                                noDataIndication={`${t("tabla.sindatos")}`}
                                selectRow={selectRow}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );


    return (
        <div>
            <div>
                <h2>{t("ambulancias.catalogo.titulo")}</h2>
            </div>
            <div>
                <Button variant="outline-dark" onClick={() => {
                    handleAdd()
                    clearform()
                    handleShowE()
                }}>
                    <Icofont icon="ui-add" className="mx-2" />
                </Button>
                <PaginationProvider
                    pagination={
                        paginationFactory(options)
                    }
                >
                    {contentTable}
                </PaginationProvider>

                <Modal show={show} onHide={() => {
                    handleClose()
                    setLine('')
                }} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> <h1>{t("ambulancias.catalogo.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}</h1></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mb-5">
                            <Button variant="outline-dark" onClick={() => {
                                clearform()
                                handleClose()
                                handleAdd()
                                setLine('')
                                handleShowE()
                            }}>
                                <Icofont icon="ui-add" className="mx-2" />
                            </Button>

                            <Button variant="outline-dark" onClick={() => {
                                handleEdit()
                                handleClose()
                                handleShowE()
                            }}>
                                <Icofont icon="pencil-alt-2" className="mx-2" />
                            </Button>

                            <Button variant="outline-dark" disabled={!view} onClick={() => {
                                handleClose()
                                handleDelet()
                                handleShow()
                            }} >
                                <Icofont icon='trash' className="mx-2" />
                            </Button>
                        </div>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formid">
                                <Form.Label column sm="2">
                                    {t("ambulancias.catalogo.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.id_catalogo} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.catalogo.datos.servicio")} Es
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.servicio_es} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.catalogo.datos.servicio")} En
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.servicio_en} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.catalogo.datos.servicio")} Fr
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.servicio_fr} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.catalogo.datos.servicio")} Pt
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.servicio_pt} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant={view ? 'primary' : 'danger'} onClick={view ? () => {
                            handleClose()
                            setLine('')
                        }
                            : Elimina}>
                            {view ? t("etiquetas.hecho") : t("etiquetas.eliminar")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleClose()
                            setLine('')
                        }}>
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showe} onHide={() => {
                    handleCloseE()
                    setLine('')
                }} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("ambulancias.catalogo.titulo")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {editar ? <div className="mb-5">
                            <Button variant="outline-dark" onClick={() => {
                                handleCloseE()
                                clearform()
                                handleAdd()
                                setLine('')
                                handleShowE()

                            }}>
                                <Icofont icon="ui-add" className="mx-2" />
                            </Button>
                            <Button variant="outline-dark" onClick={() => {
                                handleCloseE()
                                handleDelet()
                                handleShow()
                            }}>
                                <Icofont icon='trash' className="mx-2" />
                            </Button>
                        </div> : ''}

                        <Form className='m-xxl-4'>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("ambulancias.catalogo.datos.servicio")} Es
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("ambulancias.catalogo.datos.servicio")} Es`} value={form.servicio_es} onChange={handleChange} name="servicio_es" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("ambulancias.catalogo.datos.servicio")} En
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("ambulancias.catalogo.datos.servicio")} En`} value={form.servicio_en} onChange={handleChange} name="servicio_en" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("ambulancias.catalogo.datos.servicio")} Fr
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("ambulancias.catalogo.datos.servicio")} Fr`} value={form.servicio_fr} onChange={handleChange} name="servicio_fr" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("ambulancias.catalogo.datos.servicio")} Pt
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("ambulancias.catalogo.datos.servicio")} Pt`} value={form.servicio_pt} onChange={handleChange} name="servicio_pt" />
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='primary' onClick={editar ? () => {
                            Edit()
                            handleCloseE()
                        } : () => {
                            Post()
                            handleCloseE()
                        }}>
                            {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleCloseE()
                            setLine('')
                            clearform()
                        }}>
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    )

}

export default Catalogo;
