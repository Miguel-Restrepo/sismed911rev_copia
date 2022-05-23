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

const Recordatorio = () => {
    const [t, i18n] = useTranslation("global");

    const [tablas, setTablas] = useState([]);
    const [servicios, setServicios] = useState([]);
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
    const [ambulancias, setAmbulancias] = useState([]);
    const [ambulancia, setAmbulancia] = useState("");
    const [idAmbulancia, setIdAmbulancia] = useState("");
    const [ambulanciaTemp, setAmbulanciaTemp] = useState("");
    const [idAmbulanciaTemp, setIdAmbulanciaTemp] = useState("");

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [form, setForm] = useState({
        vehiculo: '',
        servicio: '',
        frecuencia_km: '',
        frecuencia_tiempo: '',
        anticipo_km: '',
        anticipo_tiempo: ''
    });

    const clearform = () => {
        setAmbulancia('');
        setIdAmbulancia('');
        setForm({
            vehiculo: '',
            servicio: '',
            frecuencia_km: '',
            frecuencia_tiempo: '',
            anticipo_km: '',
            anticipo_tiempo: ''
        })
    }

    const Get = () => {
        axios.get(`/api/recordatorio_taller`)
            .then(response => {

                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetServicios = () => {
        axios.get('/api/catalogo_serv_taller')
            .then(response => {

                setServicios(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const GetAmbulancias = () => {
        axios.get('/api/ambulancias')
            .then(response => {

                setAmbulancias(response.data);
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
        axios.post('/api/recordatorio_taller', form)
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
        axios.put(`/api/recordatorio_taller/${line.id}`, form)
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
        GetServicios()
        GetAmbulancias()
    }, []);

    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            vehiculo: idAmbulancia
        }));
    }, [ambulancia, idAmbulancia])

    const Elimina = () => {
        axios.delete(`/api/recordatorio_taller/${line.id}/delete`)
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
        dataField: 'id',
        text: `${t("ambulancias.recordatorio.datos.id")}`,
        sort: true
    }, {
        dataField: 'cod_ambulancias',
        text: `${t("ambulancias.recordatorio.datos.ambulancias")}`,
        sort: true
    }, {
        dataField: 'servicio_es',
        text: `${t("ambulancias.recordatorio.datos.mantenimiento")}`,
        sort: true
    }, {
        dataField: 'frecuencia_km',
        text: `${t("ambulancias.recordatorio.datos.frecuenciakm")}`,
        sort: true
    }, {
        dataField: 'frecuencia_tiempo',
        text: `${t("ambulancias.recordatorio.datos.frecuenciati")}`,
        sort: true
    }, {
        dataField: 'anticipo_km',
        text: `${t("ambulancias.recordatorio.datos.anticipokm")}`,
        sort: true
    }, {
        dataField: 'anticipo_tiempo',
        text: `${t("ambulancias.recordatorio.datos.anticipoti")}`,
        sort: true
    }, {
        text:'',
        dataField: '78',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        setForm({
                            vehiculo: row.vehiculo,
                            servicio: row.servicio,
                            frecuencia_km: row.frecuencia_km,
                            frecuencia_tiempo: row.frecuencia_tiempo,
                            anticipo_km: row.anticipo_km,
                            anticipo_tiempo: row.anticipo_tiempo
                        })
                        setLine({
                            id: row.id,
                            vehiculo: row.cod_ambulancias,
                            servicio: row.servicio_es,
                            frecuencia_km: row.frecuencia_km,
                            frecuencia_tiempo: row.frecuencia_tiempo,
                            anticipo_km: row.anticipo_km,
                            anticipo_tiempo: row.anticipo_tiempo
                        })
                        setAmbulancia(row.cod_ambulancias)
                        setIdAmbulancia(row.vehiculo);
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
                            vehiculo: row.vehiculo,
                            servicio: row.servicio,
                            frecuencia_km: row.frecuencia_km,
                            frecuencia_tiempo: row.frecuencia_tiempo,
                            anticipo_km: row.anticipo_km,
                            anticipo_tiempo: row.anticipo_tiempo
                        })
                        setLine({
                            id: row.id,
                            vehiculo: row.cod_ambulancias,
                            servicio: row.servicio_es,
                            frecuencia_km: row.frecuencia_km,
                            frecuencia_tiempo: row.frecuencia_tiempo,
                            anticipo_km: row.anticipo_km,
                            anticipo_tiempo: row.anticipo_tiempo
                        })
                        setAmbulancia(row.cod_ambulancias)
                        setIdAmbulancia(row.vehiculo);
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
                            vehiculo: row.vehiculo,
                            servicio: row.servicio,
                            frecuencia_km: row.frecuencia_km,
                            frecuencia_tiempo: row.frecuencia_tiempo,
                            anticipo_km: row.anticipo_km,
                            anticipo_tiempo: row.anticipo_tiempo
                        })
                        setLine({
                            id: row.id,
                            vehiculo: row.cod_ambulancias,
                            servicio: row.servicio_es,
                            frecuencia_km: row.frecuencia_km,
                            frecuencia_tiempo: row.frecuencia_tiempo,
                            anticipo_km: row.anticipo_km,
                            anticipo_tiempo: row.anticipo_tiempo
                        })
                        setAmbulancia(row.cod_ambulancias)
                        setIdAmbulancia(row.vehiculo);
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
                keyField="id"
                columns={columns}
                data={tablas}
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

    const columns1 =
        [{
            text:'',
            dataField: 'cod_ambulancias',
            sort: true
        }];
    const options1 = {
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
        totalSize: ambulancias.length
    };
    const selectRow1 = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: false,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setAmbulanciaTemp(row.cod_ambulancias);
            setIdAmbulanciaTemp(row.codigo);
        }
    };

    const contentTable1 = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="codigo"
                columns={columns1}
                data={ambulancias}
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <SearchBar placeholder={`${t("tabla.buscador")}`}   {...toolkitprops.searchProps} className="mb-3" />
                            <BootstrapTable
                                hover
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                                noDataIndication={`${t("tabla.sindatos")}`}
                                selectRow={selectRow1}
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
                <h2>{t("ambulancias.recordatorio.titulo")}</h2>
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
                        <Modal.Title> <h1>{t("ambulancias.recordatorio.titulo")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}</h1></Modal.Title>
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
                                {t("ambulancias.recordatorio.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.id} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    {t("ambulancias.recordatorio.datos.ambulancias")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.vehiculo} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.recordatorio.datos.mantenimiento")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.servicio} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.recordatorio.datos.frecuenciakm")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.frecuencia_km} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.recordatorio.datos.frecuenciati")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.frecuencia_tiempo} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.recordatorio.datos.anticipokm")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.anticipo_km} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("ambulancias.recordatorio.datos.anticipoti")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.anticipo_tiempo} />
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
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showe} onHide={() => {
                    handleCloseE()
                    setLine('')
                }} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("ambulancias.recordatorio.titulo")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}</Modal.Title>
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
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>
                                    <strong>{t("ambulancias.recordatorio.datos.ambulancias")}</strong>
                                </Form.Label>
                                <Col sm={5} >
                                    <InputGroup className="mb-2" >
                                        <Form.Control id="x"
                                            placeholder={`-- ${t("etiquetas.seleccion")} --`}
                                            disabled
                                            value={ambulancia}
                                            onChange={handleChange}
                                            name="vehiculo"
                                        />
                                        <Button variant="outline-secondary" id="button-search" onClick={handleShow2}>
                                            <Icofont icon="ui-search" className="mx-2" />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="mantenimiento">
                                <Form.Label column sm={3}>
                                    <strong>{t("ambulancias.recordatorio.datos.mantenimiento")}</strong>
                                </Form.Label>
                                <Col sm={5} >
                                    <Form.Control as="select" value={form.servicio} onChange={handleChange} name="servicio">
                                        <option value="" id="defServ">
                                        {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        {servicios.map(serv =>
                                            <option value={serv.id_catalogo} id={serv.id_catalogo} key={serv.id_catalogo}>
                                                {serv.servicio_es}
                                            </option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="formkmmantenimiento">
                                <Form.Label column sm="3" >
                                    <strong> {t("ambulancias.recordatorio.datos.frecuenciakm")}</strong>
                                </Form.Label>
                                <Col sm={2} >
                                    <Form.Control type="text" placeholder={`${t("ambulancias.recordatorio.datos.frecuenciakm")}`} value={form.frecuencia_km} onChange={handleChange} name="frecuencia_km" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formmesmantenimiento">
                                <Form.Label column sm="3">
                                    <strong>{t("ambulancias.recordatorio.datos.frecuenciati")}</strong>
                                </Form.Label>
                                <Col sm={2} >
                                    <Form.Control type="text" placeholder={`${t("ambulancias.recordatorio.datos.frecuenciati")}`} value={form.frecuencia_tiempo} onChange={handleChange} name="frecuencia_tiempo" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formrecordatoriokm">
                                <Form.Label column sm="3" >
                                    <strong>{t("ambulancias.recordatorio.datos.anticipokm")}</strong>
                                </Form.Label>
                                <Col sm={2} >
                                    <Form.Control type="text" placeholder={`${t("ambulancias.recordatorio.datos.anticipokm")}`} value={form.anticipo_km} onChange={handleChange} name="anticipo_km" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formrecordatoriotiempo">
                                <Form.Label column sm={3} >
                                    <strong>{t("ambulancias.recordatorio.datos.anticipoti")}</strong>
                                </Form.Label>
                                <Col sm={2} >
                                    <Form.Control type="text" placeholder={`${t("ambulancias.recordatorio.datos.anticipoti")}`} value={form.anticipo_tiempo}
                                        onChange={handleChange} name="anticipo_tiempo" />
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
                            {editar ?t("etiquetas.editar") : t("etiquetas.agregar")}
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
                <Modal show={show2} onHide={handleClose2} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("ambulancias.recordatorio.datos.ambulancias")} </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <PaginationProvider pagination={paginationFactory(options1)}>
                            {contentTable1}
                        </PaginationProvider>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            setAmbulancia(ambulanciaTemp);
                            setIdAmbulancia(idAmbulanciaTemp);
                            handleClose2();
                        }}>
                            {t("etiquetas.seleccionar")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleClose2();
                        }}>
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>



            </div>

        </div>
    )

}

export default Recordatorio;
