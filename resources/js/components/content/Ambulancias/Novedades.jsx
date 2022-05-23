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
const { DateTime } = require("luxon");


const Novedades = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
    const [bases, setBases] = useState([]);
    const [ambulancias, setAmbulancias] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [motivos, setMotivos] = useState([]);
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
        //id_regamb: '',
        id_base: '',
        id_ambulancias: '',
        id_user: '',
        estado: '',
        motivo_salida: '',
        descripcion: '',
        fecha_reg: DateTime.now()
    });
    const [form1, setForm1] = useState({
        nombre_motsalida: ''
    });
    const clearform = () => setForm({
        // id_regamb: '',
        id_base: '',
        id_ambulancias: '',
        id_user: '',
        estado: '',
        motivo_salida: '',
        descripcion: '',
        fecha_reg: DateTime.now()
    })

    const Get = () => {
        axios.get(`/api/reg_ambulancias`)
            .then(response => {

                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/base_ambulancia`)
            .then(response => {

                setBases(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/ambulancias`)
            .then(response => {

                setAmbulancias(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/usuarios`)
            .then(response => {

                setUsuarios(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/motivo_salidaamb`)
            .then(response => {

                setMotivos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })


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
    const PostServicio = () => {
        axios.post(`/api/motivo_salidaamb`, form1)
            .then(response => {
                notificarExitoCaso(response.data.id_motivosalida);
                axios.get(`/api/motivo_salidaamb`)
                    .then(response => {

                        setMotivos(response.data);
                        return response.data;
                    })
                    .catch(error => {

                        return error;
                    })
                setForm(
                    prevState => ({
                        ...prevState,
                        motivo_salida: response.data.id_motivosalida
                    })

                )
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error;
            })
    }
    const Post = () => {
        axios.post('/api/reg_ambulancias', {
            id_base: form.id_base,
            id_ambulancias: form.id_ambulancias,
            id_user: form.id_user,
            estado: Number(form.estado),
            motivo_salida: form.motivo_salida,
            descripcion: form.descripcion
        })
            .then(response => {
                notificarExitoCaso(response.data.id_regamb);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/reg_ambulancias/${line.id_regamb}`, {
            id_base: form.id_base,
            id_ambulancias: form.id_ambulancias,
            id_user: form.id_user,
            estado: Number(form.estado),
            motivo_salida: form.motivo_salida,
            descripcion: form.descripcion
        })
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
        axios.delete(`/api/reg_ambulancias/${line.id_regamb}/delete`)
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


    const obtener = (code) => {
        tablas.forEach(element => {
            if (element.id_regamb == code) {
                setForm(element);
                setLine(element);
            }
        });

    }


    const { SearchBar } = Search;
    const columns = [{
        dataField: 'id_regamb',
        text: `${t("ambulancias.novedades.datos.id")}`,
        sort: true
    }, {
        dataField: 'nombre',
        text: `${t("ambulancias.novedades.datos.bases")}`,
        sort: true
    }, {
        dataField: 'cod_ambulancias',
        text: `${t("ambulancias.novedades.datos.ambulancias")}`,
        sort: true
    }, {
        dataField: 'nombre1',
        text: `${t("ambulancias.novedades.datos.usuario")}`,
        sort: true
    },
    {
        text: `${t("ambulancias.novedades.datos.estado")}`,
        sort: true,
        dataField: '7852',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    {row.estado == 1 ? t("ambulancias.novedades.datos.entrada") : t("ambulancias.novedades.datos.salida")}
                </div>

            );
        }
    }, {
        dataField: 'nombre_motsalida',
        text: `${t("ambulancias.novedades.datos.motivo")}`,
        sort: true
    }, {
        dataField: 'descripcion',
        text: `${t("ambulancias.novedades.datos.descripcion")}`,
        sort: true
    }, {
        text: '',
        dataField: '96',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        obtener(row.id_regamb)
                        handleShow();
                    }} />
                </div>
            );
        }
    }, {
        text: '',
        dataField: '12',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>

                    <Icofont icon="pencil-alt-2" className="mx-2" onClick={() => {
                        handleEdit()
                        obtener(row.id_regamb)
                        handleShowE()
                    }} />

                </div>
            );
        }
    }, {
        text: '',
        dataField: '78',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="trash" className="mx-2" onClick={() => {
                        handleDelet()
                        obtener(row.id_regamb)
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
                keyField="id_regamb"
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
                <h2>{t("ambulancias.novedades.titulo")}</h2>
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
                        <Modal.Title> <h1>{t("ambulancias.novedades.tran")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}</h1></Modal.Title>
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
                                    {t("ambulancias.novedades.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.id_regamb} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.novedades.datos.bases")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.novedades.datos.ambulancias")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.cod_ambulancias} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.novedades.datos.usuario")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre1} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.novedades.datos.estado")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.estado} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.novedades.datos.motivo")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre_motsalida} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.novedades.datos.descripcion")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.descripcion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.novedades.datos.fecha")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.fecha_reg} />
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
                        <Modal.Title>{t("ambulancias.novedades.tran")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}</Modal.Title>
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
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3"><strong>{t("ambulancias.novedades.datos.bases")}</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" name="id_base" onChange={handleChange} value={form.id_base}>
                                        <option  >
                                            {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        {bases.map(elemento => (
                                            <option key={elemento.id_base} value={elemento.id_base}>{elemento.nombre}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3"><strong>{t("ambulancias.novedades.datos.ambulancias")}</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" name="id_ambulancias" onChange={handleChange} value={form.id_ambulancias}>
                                        <option  >
                                            {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        {ambulancias.map(elemento => (
                                            <option key={elemento.codigo} value={elemento.codigo}>{elemento.cod_ambulancias}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3"><strong>{t("ambulancias.novedades.datos.usuario")}</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" name="id_user" onChange={handleChange} value={form.id_user}>
                                        <option  >
                                            {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        {usuarios.map(elemento => (
                                            <option key={elemento.id_user} value={elemento.id_user}>{elemento.nombre1} {elemento.nombre2} {elemento.apellido1} {elemento.apellido2}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3"><strong>{t("ambulancias.novedades.datos.estado")}</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" name="estado" onChange={handleChange} value={form.estado}>
                                        <option  >
                                            {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        <option key="1" value={1}>
                                            {t("ambulancias.novedades.datos.entrada")}
                                        </option>
                                        <option key="2" value={2} >
                                            {t("ambulancias.novedades.datos.salida")}
                                        </option>

                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3"><strong>{t("ambulancias.novedades.datos.motivo")}</strong></Form.Label>
                                <Col sm={7}>
                                    <InputGroup className="mb-2" >
                                        <Form.Control as="select" name="motivo_salida" onChange={handleChange} value={form.motivo_salida}>
                                            <option  >
                                                {`-- ${t("etiquetas.seleccion")} --`}
                                            </option>
                                            {motivos.map(elemento => (
                                                <option key={elemento.id_motivosalida} value={elemento.id_motivosalida}>{elemento.nombre_motsalida}</option>
                                            ))}

                                        </Form.Control>
                                        <InputGroup.Text>
                                            <Icofont icon="ui-add" className="mx-2" onClick={handleShow1} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3">
                                    {t("ambulancias.novedades.datos.descripcion")}
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type='text' as="textarea" placeholder={`${t("ambulancias.novedades.datos.descripcion")}`} value={form.descripcion} onChange={handleChange} name="descripcion" />
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
                <Modal show={show1} onHide={handleClose1} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("ambulancias.novedades.datos.motivo")}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formservicio">
                                <Form.Label column sm="2" >
                                    <strong> {t("ambulancias.novedades.datos.mot")}</strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" placeholder={`${t("ambulancias.novedades.datos.mot")}`} onChange={handleChange1} name="nombre_motsalida" value={form1.nombre_motsalida} />
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

export default Novedades;
