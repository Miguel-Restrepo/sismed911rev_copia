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
//import 'react-phone-input-2/lib/style.css'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set } from 'lodash';
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Ambulancias = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [show1, setShow1] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);

    const [form, setForm] = useState({
        cod_ambulancias: '',
        placas: '',
        chasis: '',
        marca: '',
        modelo: '',
        tipo_conbustible: '',
        fecha_iniseguro: '',
        fecha_finseguro: '',
        especial: ''
    });

    const clearform = () => setForm({
        cod_ambulancias: '',
        placas: '',
        chasis: '',
        marca: '',
        modelo: '',
        tipo_conbustible: '',
        fecha_iniseguro: '',
        fecha_finseguro: '',
        especial: ''
    })


    const [form1, setForm1] = useState({
        especial_es: ''
    });



    const Get = () => {
        axios.get(`/api/ambulancias`)
            .then(response => {

                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetServicios = () => {
        axios.get('/api/especial_ambulancia')
            .then(response => {

                setServicios(response.data)
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

    const handleChange1 = e => {
        e.persist();
        setForm1(
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
        axios.post('/api/ambulancias', form)
            .then(response => {
                notificarExitoCaso(response.data.codigo);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }

    const PostServicio = () => {
        axios.post('/api/especial_ambulancia', form1)
            .then(response => {
                notificarExitoCaso(response.data.id_especialambulancia);
                GetServicios()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }

    const Edit = () => {
        axios.put(`/api/ambulancias/${line.codigo}`, form)
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
        GetServicios();
        Get()

    }, []);

    const Elimina = () => {
        axios.delete(`/api/ambulancias/${line.codigo}/delete`)
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
        dataField: 'cod_ambulancias',
        text: `${t("ambulancias.ambulancias.datos.id")}`,
        sort: true
    }, {
        dataField: 'placas',
        text: `${t("ambulancias.ambulancias.datos.placas")}`,
        sort: true
    }, {
        dataField: 'chasis',
        text: `${t("ambulancias.ambulancias.datos.chasis")}`,
        sort: true
    }, {
        dataField: 'marca',
        text: `${t("ambulancias.ambulancias.datos.marca")}`,
        sort: true
    }, {
        dataField: 'modelo',
        text: `${t("ambulancias.ambulancias.datos.modelo")}`,
        sort: true
    }, {
        dataField: 'tipo_conbustible',
        text: `${t("ambulancias.ambulancias.datos.tipo")}`,
        sort: true
    }, {
        dataField: 'estado',
        text: `${t("ambulancias.ambulancias.datos.estado")}`,
        sort: true
    },  {
        dataField: 'especial_es',
        text: `${t("ambulancias.ambulancias.datos.servicio")}`,
        sort: true
    }, {
        text:'',
        dataField: '74',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        setForm({
                            cod_ambulancias: row.cod_ambulancias,
                            placas: row.placas,
                            chasis: row.chasis,
                            marca: row.marca,
                            modelo: row.modelo,
                            tipo_conbustible: row.tipo_conbustible,
                            fecha_iniseguro: row.fecha_iniseguro,
                            fecha_finseguro: row.fecha_finseguro,
                            especial: row.especial
                        })
                        setLine({
                            codigo: row.codigo,
                            cod_ambulancias: row.cod_ambulancias,
                            placas: row.placas,
                            chasis: row.chasis,
                            marca: row.marca,
                            modelo: row.modelo,
                            tipo_conbustible: row.tipo_conbustible,
                            fecha_iniseguro: row.fecha_iniseguro,
                            fecha_finseguro: row.fecha_finseguro,
                            especial: row.especial_es
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
                            cod_ambulancias: row.cod_ambulancias,
                            placas: row.placas,
                            chasis: row.chasis,
                            marca: row.marca,
                            modelo: row.modelo,
                            tipo_conbustible: row.tipo_conbustible,
                            fecha_iniseguro: row.fecha_iniseguro,
                            fecha_finseguro: row.fecha_finseguro,
                            especial: row.especial
                        })
                        setLine({
                            codigo: row.codigo,
                            cod_ambulancias: row.cod_ambulancias,
                            placas: row.placas,
                            chasis: row.chasis,
                            marca: row.marca,
                            modelo: row.modelo,
                            tipo_conbustible: row.tipo_conbustible,
                            fecha_iniseguro: row.fecha_iniseguro,
                            fecha_finseguro: row.fecha_finseguro,
                            especial: row.especial_es
                        })
                        handleShowE()
                    }} />

                </div>
            );
        }
    }, {
        text:'',
        dataField: '45',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="trash" className="mx-2" onClick={() => {
                        handleDelet()
                        setForm({
                            cod_ambulancias: row.cod_ambulancias,
                            placas: row.placas,
                            chasis: row.chasis,
                            marca: row.marca,
                            modelo: row.modelo,
                            tipo_conbustible: row.tipo_conbustible,
                            fecha_iniseguro: row.fecha_iniseguro,
                            fecha_finseguro: row.fecha_finseguro,
                            especial: row.especial
                        })
                        setLine({
                            codigo: row.codigo,
                            cod_ambulancias: row.cod_ambulancias,
                            placas: row.placas,
                            chasis: row.chasis,
                            marca: row.marca,
                            modelo: row.modelo,
                            tipo_conbustible: row.tipo_conbustible,
                            fecha_iniseguro: row.fecha_iniseguro,
                            fecha_finseguro: row.fecha_finseguro,
                            especial: row.especial_es
                        })
                        handleShow();
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
                    <Link to={`/ambulancias/mantenimiento?cod=${row.codigo}`} >
                        <Button variant="outline-dark">
                        {t("ambulancias.ambulancias.datos.mantenimiento")}
                        </Button>
                    </Link>
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
                keyField="cod_ambulancias"
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
                <h2>{t("ambulancias.ambulancias.titulo")}</h2>
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
                        <Modal.Title>{t("ambulancias.ambulancias.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}</Modal.Title>
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
                                {t("ambulancias.ambulancias.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.codigo} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.codigo")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.cod_ambulancias} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formkmm">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.placas")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.placas} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.chasis")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.chasis} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.marca")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.marca} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.modelo")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.modelo} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.tipo")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.tipo_conbustible} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.fechaini")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.fecha_iniseguro} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.fechafin")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.fecha_finseguro} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.ambulancias.datos.servicio")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.especial} />
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
                            {view ? t("etiquetas.hecho") : t("etiquetas.elminar")}
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
                        <Modal.Title>{t("ambulancias.ambulancias.titulo")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}</Modal.Title>
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
                            <Row>
                                <Col sm="5">
                                    <Form.Group as={Col} className="mb-3" controlId="formcodigo">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.codigo")}
                                        </Form.Label>
                                        <Form.Control type='text' placeholder={`${t("ambulancias.ambulancias.datos.codigo")}`} value={form.cod_ambulancias} onChange={handleChange} name="cod_ambulancias" />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formplaca">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.placas")}
                                        </Form.Label>
                                        <Form.Control type="text" placeholder={`${t("ambulancias.ambulancias.datos.placas")}`} value={form.placas} onChange={handleChange} name="placas" />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formchasis">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.chasis")}
                                        </Form.Label>
                                        <Form.Control type="text" placeholder={`${t("ambulancias.ambulancias.datos.chasis")}`} value={form.chasis} onChange={handleChange} name="chasis" />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formmarca">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.marca")}
                                        </Form.Label>
                                        <Form.Control type="text" placeholder={`${t("ambulancias.ambulancias.datos.marca")}`} value={form.marca} onChange={handleChange} name="marca" />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formmodelo">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.modelo")}
                                        </Form.Label>
                                        <Form.Control type="text" placeholder={`${t("ambulancias.ambulancias.datos.modelo")}`} value={form.modelo} onChange={handleChange} name="modelo" />
                                    </Form.Group>

                                </Col>

                                <Col sm="5">

                                    <Form.Group as={Col} className="mb-3" controlId="formcombustible">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.tipo")}
                                        </Form.Label>
                                        <Form.Control type="text" placeholder={`${t("ambulancias.ambulancias.datos.tipo")}`} value={form.tipo_conbustible} onChange={handleChange} name="tipo_conbustible" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formservicioespecial">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.servicio")}
                                        </Form.Label>
                                        <Col sm={13}>
                                            <InputGroup className="mb-2" >
                                                <Form.Control as="select" value={form.especial} onChange={handleChange} name="especial">
                                                    <option value="" id="defespec">
                                                    {`-- ${t("etiquetas.seleccion")} --`}
                                                    </option>
                                                    {servicios.map(serv =>
                                                        <option key={serv.id_especialambulancia} value={serv.id_especialambulancia} >
                                                            {serv.especial_es}
                                                        </option>)}
                                                </Form.Control>
                                                <InputGroup.Text>
                                                    <Icofont icon="ui-add" className="mx-2" onClick={handleShow1} />
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>



                                    <Form.Group as={Col} className="mb-3" controlId="formfechainicio">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.fechaini")}
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="date" value={form.fecha_iniseguro} onChange={handleChange} placeholder={`${t("ambulancias.ambulancias.datos.fechaini")}`} name='fecha_iniseguro' />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formfechafin">
                                        <Form.Label sm="3">
                                        {t("ambulancias.ambulancias.datos.fechafin")}
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="date" value={form.fecha_finseguro} onChange={handleChange} placeholder={`${t("ambulancias.ambulancias.datos.fechafin")}`} name='fecha_finseguro' />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>

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

                <Modal show={show1} onHide={handleClose1} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("ambulancias.ambulancias.datos.servicio")}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formservicio">
                                <Form.Label column sm="2" >
                                    <strong> {t("ambulancias.ambulancias.datos.especial")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type="text" placeholder={`${t("ambulancias.ambulancias.datos.especial")}`} onChange={handleChange1} name="especial_es" value={form1.especial_es} />
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            PostServicio();
                            handleClose1();
                        }}>
                            {t("etiquetas.agregar")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleClose1();
                        }}>
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    )

}

export default Ambulancias;
