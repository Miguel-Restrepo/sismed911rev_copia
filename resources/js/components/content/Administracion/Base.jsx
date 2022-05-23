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
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set } from 'lodash';
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Base = () => {
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
        nombre: '',
        dpto: '',
        provincia: '',
        distrito: '',
        longitud: '',
        latitud: ''
    });

    const clearform = () => setForm({
        nombre: '',
        dpto: '',
        provincia: '',
        distrito: '',
        longitud: '',
        latitud: ''
    })

    const Get = () => {
        axios.get(`/api/base_ambulancia`)
            .then(response => {

                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const handleChange = e => {
        e.persist();
        setForm(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )


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
    const Post = () => {
        axios.post('/api/base_ambulancia', form)
            .then(response => {
                notificarExitoCaso(response.data.id_base);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/base_ambulancia/${line.id_base}`, form)
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
        axios.delete(`/api/base_ambulancia/${line.id_base}/delete`)
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
        dataField: 'id_base',
        text: `${t("administracion.base.datos.id")}`,
        sort: true
    }, {
        dataField: 'nombre',
        text: `${t("administracion.base.datos.nombre")}`,
        sort: true
    }, {
        dataField: 'dpto',
        text: `${t("administracion.base.datos.dpto")}`,
        sort: true
    }, {
        dataField: 'provincia',
        text: `${t("administracion.base.datos.provincia")}`,
        sort: true
    }, {
        dataField: 'distrito',
        text: `${t("administracion.base.datos.distrito")}`,
        sort: true
    }, {
        dataField: 'longitud',
        text: `${t("administracion.base.datos.longitud")}`,
        sort: true
    }, {
        dataField: 'latitud',
        text: `${t("administracion.base.datos.latitud")}`,
        sort: true
    }, {
        text:'',
        dataField: '453',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        setForm({
                            nombre: row.nombre,
                            dpto: row.dpto,
                            provincia: row.provincia,
                            distrito: row.distrito,
                            longitud: row.longitud,
                            latitud: row.latitud
                        })
                        setLine({
                            id_base:row.id_base,
                            nombre: row.nombre,
                            dpto: row.dpto,
                            provincia: row.provincia,
                            distrito: row.distrito,
                            longitud: row.longitud,
                            latitud: row.latitud
                        })
                        handleShow();
                    }} />
                </div>
            );
        }
    }, {
        text:'',
        dataField: '78',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>

                    <Icofont icon="pencil-alt-2" className="mx-2" onClick={() => {
                        handleEdit()
                        setForm({
                            nombre: row.nombre,
                            dpto: row.dpto,
                            provincia: row.provincia,
                            distrito: row.distrito,
                            longitud: row.longitud,
                            latitud: row.latitud
                        })
                        setLine({
                            id_base:row.id_base,
                            nombre: row.nombre,
                            dpto: row.dpto,
                            provincia: row.provincia,
                            distrito: row.distrito,
                            longitud: row.longitud,
                            latitud: row.latitud
                        })
                        handleShowE()
                    }} />

                </div>
            );
        }
    }, {
        text:'',
        dataField: '12',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="trash" className="mx-2" onClick={() => {
                        handleDelet()
                        setForm({
                            nombre: row.nombre,
                            dpto: row.dpto,
                            provincia: row.provincia,
                            distrito: row.distrito,
                            longitud: row.longitud,
                            latitud: row.latitud
                        })
                        setLine({
                            id_base:row.id_base,
                            nombre: row.nombre,
                            dpto: row.dpto,
                            provincia: row.provincia,
                            distrito: row.distrito,
                            longitud: row.longitud,
                            latitud: row.latitud
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
                keyField="id_base"
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
                <h2>{t("administracion.base.titulo")}</h2>
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
                        <Modal.Title> <h1>{t("administracion.base.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}</h1></Modal.Title>
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
                                {t("administracion.base.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.id_base} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.base.datos.nombre")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.base.datos.dpto")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.dpto} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.base.datos.provincia")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.provincia} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.base.datos.distrito")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.distrito} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.base.datos.longitud")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.longitud} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.base.datos.latitud")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.latitud} />
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
                        <Modal.Title>{t("administracion.base.titulo")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}</Modal.Title>
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
                                {t("administracion.base.datos.nombre")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.base.datos.nombre")}`} value={form.nombre} onChange={handleChange} name="nombre" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("administracion.base.datos.dpto")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.base.datos.dpto")}`} value={form.dpto} onChange={handleChange} name="dpto" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("administracion.base.datos.provincia")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.base.datos.provincia")}`} value={form.provincia} onChange={handleChange} name="provincia" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("administracion.base.datos.distrito")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.base.datos.distrito")}`} value={form.distrito} onChange={handleChange} name="distrito" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("administracion.base.datos.longitud")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.base.datos.longitud")}`} value={form.longitud} onChange={handleChange} name="longitud" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("administracion.base.datos.latitud")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.base.datos.latitud")}`} value={form.latitud} onChange={handleChange} name="latitud" />
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

export default Base;
