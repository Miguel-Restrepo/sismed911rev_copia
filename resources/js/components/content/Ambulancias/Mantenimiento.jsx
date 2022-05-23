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
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Mantenimiento = () => {
    const [t, i18n] = useTranslation("global");
    let url = useLocation().search
    const [searchParams] = useSearchParams();
    let cod = searchParams.get('cod')
    const [mans, setMans] = useState([]);
    const [datos, setDatos] = useState("");
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const [talleres, setTalleres] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);

    const [form, setForm] = useState({
        id_ambulancias: `${cod}`,
        fecha_inicio: '',
        fecha_fin: '',
        observaciones: '',
        taller: ''
    });

    const clearform = () => setForm({
        id_ambulancias: `${cod}`,
        fecha_inicio: '',
        fecha_fin: '',
        observaciones: '',
        taller: ''
    })

    const GetAmbulancias = () => {
        axios.get(`/api/ambulancias/${cod}`)
            .then(response => {

                setDatos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const GetTalleres = () => {
        axios.get('/api/ambulancia_taller')
            .then(response => {

                setTalleres(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const Get = () => {
        axios.get(`/api/ambulancias/${cod}/mantenimiento`)
            .then(response => {

                setMans(response.data);
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
    const Elimina = () => {
        axios.delete(`/api/mante_amb/${line.id}/delete`)
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
        axios.post('/api/mante_amb', form)
            .then(response => {
                notificarExitoCaso(response.data.id);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/mante_amb/${line.id}`, form)
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
        GetAmbulancias();
        Get();
        GetTalleres()
    }, []);


    const { SearchBar } = Search;
    const columns = [{
        dataField: 'id',
        text: `${t("ambulancias.mantenimiento.datos.id")}`,
        sort: true
    }, {
        dataField: 'id_ambulancias',
        text: `${t("ambulancias.mantenimiento.datos.codigo")}`,
        sort: true
    }, {
        dataField: 'fecha_inicio',
        text: `${t("ambulancias.mantenimiento.datos.fechaini")}`,
        sort: true
    }, {
        dataField: 'fecha_fin',
        text: `${t("ambulancias.mantenimiento.datos.fechafin")}`,
        sort: true
    }, {
        dataField: 'taller',
        text: `${t("ambulancias.mantenimiento.datos.taller")}`,
        sort: true
    }, {
        text:'',
        dataField: '69',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView();
                        setForm({
                            id_ambulancias: row.id_ambulancias,
                            fecha_inicio: row.fecha_inicio,
                            fecha_fin: row.fecha_fin,
                            observaciones: row.observaciones,
                            taller: row.taller
                        })
                        setLine({
                            id: row.id,
                            id_ambulancias: row.id_ambulancias,
                            fecha_inicio: row.fecha_inicio,
                            fecha_fin: row.fecha_fin,
                            observaciones: row.observaciones,
                            taller: row.taller
                        })
                        handleShow();
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
                    <Icofont icon="pencil-alt-2" className="mx-2" onClick={() => {
                        handleEdit()
                        setForm({
                            id_ambulancias: row.id_ambulancias,
                            fecha_inicio: row.fecha_inicio,
                            fecha_fin: row.fecha_fin,
                            observaciones: row.observaciones,
                            taller: row.taller
                        })
                        setLine({
                            id: row.id,
                            id_ambulancias: row.id_ambulancias,
                            fecha_inicio: row.fecha_inicio,
                            fecha_fin: row.fecha_fin,
                            observaciones: row.observaciones,
                            taller: row.taller
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
                        handleDelet();
                        setForm({
                            id_ambulancias: row.id_ambulancias,
                            fecha_inicio: row.fecha_inicio,
                            fecha_fin: row.fecha_fin,
                            observaciones: row.observaciones,
                            taller: row.taller
                        })
                        setLine({
                            id: row.id,
                            id_ambulancias: row.id_ambulancias,
                            fecha_inicio: row.fecha_inicio,
                            fecha_fin: row.fecha_fin,
                            observaciones: row.observaciones,
                            taller: row.taller
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
        totalSize: mans.length
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
                keyField="id"
                columns={columns}
                data={mans}
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <SearchBar placeholder={`${t("tabla.buscador")}`}   {...toolkitprops.searchProps} />
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
                <h2>{t("ambulancias.mantenimiento.titulo")}</h2>
            </div>
            <div>
                <Form>

                    <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.codigo")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.cod_ambulancias} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formplaca">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.placas")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.placas} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formchasis">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.chasis")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.chasis} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formmarca">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.marca")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.marca} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formmodelo">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.modelo")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.modelo} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formtipo">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.tipo")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.tipo_conbustible} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formestado">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.estado")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.estado} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formubicacion">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.ubicacion")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.ubicacion} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formservicioespecial">
                        <Form.Label column sm="2">
                        {t("ambulancias.ambulancias.datos.servicio")}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={datos.especial} />
                        </Col>
                    </Form.Group>

                </Form>
            </div>
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
                    <Modal.Title> <h1>{t("ambulancias.mantenimiento.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}</h1></Modal.Title>
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
                            {t("ambulancias.mantenimiento.datos.id")}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={line.id} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formname">
                            <Form.Label column sm="2">
                            {t("ambulancias.mantenimiento.datos.codigo")}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={line.id_ambulancias} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formkmm">
                            <Form.Label column sm="2">
                            {t("ambulancias.mantenimiento.datos.fechaini")}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={line.fecha_inicio} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formname">
                            <Form.Label column sm="2">
                            {t("ambulancias.mantenimiento.datos.fechafin")}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={line.fecha_fin} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formname">
                            <Form.Label column sm="2">
                            {t("ambulancias.mantenimiento.datos.observaciones")}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={line.observaciones} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formname">
                            <Form.Label column sm="2">
                            {t("ambulancias.mantenimiento.datos.taller")}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={line.taller} />
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
                    <Modal.Title>{t("ambulancias.mantenimiento.titulo")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}</Modal.Title>
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
                        <Form.Group as={Row} className="mb-3" controlId="formkmmantenimiento">
                            <Form.Label column sm="2" >
                                <strong> {t("ambulancias.mantenimiento.datos.codigo")}</strong>
                            </Form.Label>
                            <Col sm={7} >
                                <Form.Control plaintext readOnly value={form.id_ambulancias} name="id_ambulancias" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formkmmantenimiento">
                            <Form.Label column sm="2" >
                                <strong> {t("ambulancias.mantenimiento.datos.fechaini")}</strong>
                            </Form.Label>
                            <Col sm={5} >
                                <Form.Control type="date" value={form.fecha_inicio} onChange={handleChange} placeholder={`${t("ambulancias.mantenimiento.datos.fechaini")}`} name='fecha_inicio' />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formkmmantenimiento">
                            <Form.Label column sm="2" >
                                <strong> {t("ambulancias.mantenimiento.datos.fechafin")}</strong>
                            </Form.Label>
                            <Col sm={5} >
                                <Form.Control type="date"  value={form.fecha_fin} onChange={handleChange} placeholder={`${t("ambulancias.mantenimiento.datos.fechafin")}`} name='fecha_fin' />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formkmmantenimiento">
                            <Form.Label column sm="2" >
                                <strong> {t("ambulancias.mantenimiento.datos.observaciones")}</strong>
                            </Form.Label>
                            <Col sm={7} >
                                <Form.Control as="textarea" rows={3} placeholder={`${t("ambulancias.mantenimiento.datos.observaciones")}`}  value={form.observaciones} onChange={handleChange} name="observaciones" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="mantenimiento">
                            <Form.Label column sm={2}>
                                <strong>{t("ambulancias.mantenimiento.datos.taller")}</strong>
                            </Form.Label>
                            <Col sm={5} >
                                <Form.Control as="select" value={form.taller}  onChange={handleChange} name="taller">
                                    <option value="" id="defServ">
                                    {`-- ${t("etiquetas.seleccion")} --`}
                                    </option>
                                    {talleres.map(serv =>
                                        <option value={serv.id} id={serv.id} key={serv.id}>
                                            {serv.nombre_taller}
                                        </option>)}
                                </Form.Control>
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
    )
}


export default Mantenimiento;
