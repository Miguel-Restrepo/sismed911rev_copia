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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Incidentes = () => {
    const [tablas, setTablas] = useState([]);
    const [line, setLine] = useState("");
    const [editor, setEditor] = useState("");
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
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [form, setForm] = useState({
        incidente_es: '',
        nombre_es: ''
    });

    const clearform = () => setForm({
        incidente_es: '',
        nombre_es: ''
    })

    const Get = () => {
        axios.get(`/api/incidentes`)
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
        axios.post('/api/incidentes', form)
            .then(response => {
                notificarExitoCaso(response.data.id_incidente);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/incidentes/${line.id_incidente}`, form)
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
        axios.delete(`/api/incidentes/${line.id_incidente}/delete`)
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


    const obtener = (coda) => {
        axios.get(`/api/incidentes/${coda}`)
            .then(response => {

                setForm(response.data)
                setLine(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            });
    }


    const { SearchBar } = Search;
    const columns = [{
        dataField: 'id_incidente',
        text: 'Id Incidente',
        sort: true
    }, {
        dataField: 'nombre_es',
        text: 'Nombre',
        sort: true
    }, {
        text: '',
        dataField: '12254',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        setForm({
                            incidente_es: row.incidente_es,
                            nombre_es: row.nombre_es
                        })
                        setLine({
                            id_incidente: row.id_incidente,
                            incidente_es: row.incidente_es,
                            nombre_es: row.nombre_es
                        })
                        handleShow();
                    }} />
                </div>
            );
        }
    }, {
        text: '',
        dataField: '785',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>

                    <Icofont icon="pencil-alt-2" className="mx-2" onClick={() => {
                        handleEdit()
                        setForm({
                            incidente_es: row.incidente_es,
                            nombre_es: row.nombre_es
                        })
                        setLine({
                            id_incidente: row.id_incidente,
                            incidente_es: row.incidente_es,
                            nombre_es: row.nombre_es
                        })
                        handleShowE()
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
                    <Icofont icon="trash" className="mx-2" onClick={() => {
                        handleDelet()
                        setForm({
                            incidente_es: row.incidente_es,
                            nombre_es: row.nombre_es
                        })
                        setLine({
                            id_incidente: row.id_incidente,
                            incidente_es: row.incidente_es,
                            nombre_es: row.nombre_es
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
        firstPageText: 'Primera',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Ultima',
        nextPageTitle: 'Siguiente pagina',
        prePageTitle: 'Anterior pagina',
        firstPageTitle: 'Primera pagina',
        lastPageTitle: 'Ultima pagina',
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
                keyField="id_incidente"
                columns={columns}
                data={tablas}
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <SearchBar placeholder="Buscar"  {...toolkitprops.searchProps} />
                            <BootstrapTable
                                striped
                                hover
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                                noDataIndication={'No hay datos que mostrar'}
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
                <h2>Incidentes</h2>
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
                        <Modal.Title> <h1>Incidentes - {view ? 'Ver' : 'Borrar'}</h1></Modal.Title>
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
                                    Id Incidentes
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.id_incidente} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                    Nombre
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre_es} />
                                </Col>
                            </Form.Group>
                        </Form>
                        <div
                        dangerouslySetInnerHTML={{ __html: line.incidente_es }}
                        >
                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant={view ? 'primary' : 'danger'} onClick={view ? () => {
                            handleClose()
                            setLine('')
                        }
                            : Elimina}>
                            {view ? 'Hecho' : 'Borrar'}
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
                        <Modal.Title>Incidentes - {editar ? 'Editar' : 'Agregar'}</Modal.Title>
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
                                <Form.Label sm="3">
                                    Nombre
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder="Nombre" value={form.nombre_es} onChange={handleChange} name="nombre_es" />
                                </Col>
                            </Form.Group>

                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbar-class"
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={setEditorState}
                                onContentStateChange={(data) => {
                                    setForm(
                                        prevState => ({
                                            ...prevState,
                                            incidente_es: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                                        })
                                    );
                                }
                                }
                            />;

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
                            {editar ? 'Editar' : 'Agregar'}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleCloseE()
                            setLine('')
                            clearform()
                        }}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    )

}

export default Incidentes;
