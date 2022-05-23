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
import { useTranslation } from "react-i18next"
const { DateTime } = require("luxon");

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Evaluacion = () => {
    const [t, i18n] = useTranslation("global");
    let url = useLocation().search
    const [searchParams] = useSearchParams();
    var cod = searchParams.get('cod')
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
    const [showEsp, setShowEsp] = useState(false);
    const handleShowEsp = () => setShowEsp(true);
    const handleCloseEsp = () => setShowEsp(false);
    const [showDiag, setShowDiag] = useState(false);
    const handleShowDiag = () => setShowDiag(true);
    const handleCloseDiag = () => setShowDiag(false);


    const [diagnosticos, setDiagnosticos] = useState([]);
    const [diagnostico, setDiagnostico] = useState("");
    const [idDiagnostico, setIdDiagnostico] = useState("");
    const [diagnosticoTemp, setDiagnosticoTemp] = useState("");
    const [idDiagnosticoTemp, setIdDiagnosticoTemp] = useState("");
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidad, setEspecialidad] = useState("");
    const [idEspecialidad, setIdEspecialidad] = useState("");
    const [especialidadTemp, setEspecialidadTemp] = useState("");
    const [idEspecialidadTemp, setIdEspecialidadTemp] = useState("");

    const [evaluaciones, setEvaluaciones] = useState([]);
    const [procedimientos, setProcedimientos] = useState([]);
    const [examenes, setExamenes] = useState([]);
    const [disposicion, setDisposicion] = useState([]);


    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);


    const [form, setForm] = useState({
        fecha_creacion: DateTime.now().set({ milliseconds: 0 }).toISO({ suppressMilliseconds: true }),
        nota_evolucion: '',
        procedimiento: '',
        examen: '',
        nota_examen: '',
        complicacion: '',
        nota_complicacion: '',
        especialidad: '',
        diagnostico: '',
        motivo_estancia: '',
        disposicion: '',
        no_cama: '',
        id_monitoreo: `${cod}`
    });

    const clearform = () => {
        setC1(false)
        setC2(false)
        setC3(false)
        setC4(false)
        setC5(false)
        setIdEspecialidad("")
        setEspecialidad("")
        setForm({
            fecha_creacion: DateTime.now().set({ milliseconds: 0 }).toISO({ suppressMilliseconds: true }),
            nota_evolucion: '',
            procedimiento: '',
            examen: '',
            nota_examen: '',
            complicacion: '',
            nota_complicacion: '',
            especialidad: '',
            diagnostico: '',
            motivo_estancia: '',
            disposicion: '',
            no_cama: '',
            id_monitoreo: `${cod}`
        })
    }

    const GetDatos = () => {
        axios.get('/api/sala_examen')
            .then(response => {

                setExamenes(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

        axios.get('/api/especialidad')
            .then(response => {

                setEspecialidades(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

        axios.get(`/api/procedimientos`)
            .then(response => {
                setProcedimientos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }


    const Get = () => {
        axios.get(`/api/evolucion`)
            .then(response => {
                setEvaluaciones(response.data.filter(e => e.id_monitoreo == cod));
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    useEffect(() => {
        Get();
        GetDatos()
    }, []);



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

    const handleInputChangeC1 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC1(value);
    }
    const handleInputChangeC2 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC2(value);
    }
    const handleInputChangeC3 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC3(value);
    }
    const handleInputChangeC4 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC4(value);
    }
    const handleInputChangeC5 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setC5(value);
    }

    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            especialidad: idEspecialidad
        }));
    }, [especialidad, idEspecialidad])



    const Elimina = () => {
        axios.delete(`/api/evolucion/${line.id}/delete`)
            .then(response => {
                setLine('')
                Get()
                return response.data;
            })
            .catch(error => {
                return error;
            });
        handleClose();
    }


    const chekeo = () => {
        let necesidades = "{";
        if (c1) {
            necesidades = necesidades + "1,";
        }
        if (c2) {
            necesidades = necesidades + "2,";
        }
        if (c3) {
            necesidades = necesidades + "3,";
        }
        if (c4) {
            necesidades = necesidades + "4,";
        }
        if (c5) {
            necesidades = necesidades + "5,";
        }
        if (necesidades != "{") {
            necesidades = necesidades.substring(0, necesidades.length - 1);
        }
        necesidades = necesidades + "}";
        setForm(
            prevState => ({
                ...prevState,
                complicacion: necesidades
            })
        );
    }


    const Post = async () => {
        await chekeo()
        axios.post('/api/evolucion', form)
            .then(response => {
                Get()
                notificarExitoCaso(response.data.id);
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = async () => {
        await chekeo()
        axios.put(`/api/evolucion/${line.id}`, form)
            .then(response => {
                setLine('')
                Get()
                return response.data;
            })
            .catch(error => {
                return error.response.data;
            })
    }



    const { SearchBar } = Search;
    const columns = [{
        dataField: 'fecha_creacion',
        text: `${t("eclinical.monitoreo.datos.fechaeva")}`,
        sort: true
    }, {
        dataField: 'procedimiento',
        text: `${t("eclinical.monitoreo.datos.procedimientos")}`,
        sort: true
    }, {
        dataField: 'examen',
        text: `${t("eclinical.monitoreo.datos.examenes")}`,
        sort: true
    }, {
        dataField: 'nota_examen',
        text: `${t("eclinical.monitoreo.datos.notaexamemes")}`,
        sort: true
    }, {
        dataField: 'complicacion',
        text: `${t("eclinical.monitoreo.datos.complicacion")}`,
        sort: true
    }, {
        dataField: 'nota_complicacion',
        text: `${t("eclinical.monitoreo.datos.notacomplicacion")}`,
        sort: true
    }, {
        dataField: 'especialidad',
        text: `${t("eclinical.monitoreo.datos.especial")}`,
        sort: true
    }, {
        dataField: 'diagnostico',
        text: `${t("eclinical.monitoreo.datos.diagnostico")}`,
        sort: true
    }, {
        dataField: 'motivo_estancia',
        text: `${t("eclinical.monitoreo.datos.motivoestancia")}`,
        sort: true
    }, {
        dataField: 'no_cama',
        text: `${t("eclinical.monitoreo.datos.ncama")}`,
        sort: true
    }, {
        text:'',
        dataField: '78562',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        setForm({
                            fecha_creacion: row.fecha_creacion,
                            nota_evolucion: row.nota_evolucion,
                            procedimiento: row.procedimiento,
                            examen: row.examen,
                            nota_examen: row.nota_examen,
                            complicacion: row.complicacion,
                            nota_complicacion: row.nota_complicacion,
                            especialidad: row.especialidad,
                            diagnostico: row.diagnostico,
                            motivo_estancia: row.motivo_estancia,
                            disposicion: row.disposicion,
                            no_cama: row.no_cama,
                            id_monitoreo: row.id_monitoreo
                        })
                        setLine({
                            id: row.id,
                            fecha_creacion: row.fecha_creacion,
                            nota_evolucion: row.nota_evolucion,
                            procedimiento: row.procedimiento,
                            examen: row.examen,
                            nota_examen: row.nota_examen,
                            complicacion: row.complicacion,
                            nota_complicacion: row.nota_complicacion,
                            especialidad: row.especialidad,
                            diagnostico: row.diagnostico,
                            motivo_estancia: row.motivo_estancia,
                            disposicion: row.disposicion,
                            no_cama: row.no_cama,
                            id_monitoreo: row.id_monitoreo
                        })
                        handleShow();
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

                    <Icofont icon="pencil-alt-2" className="mx-2" onClick={() => {
                        handleEdit()
                        setForm({
                            nota_evolucion: row.nota_evolucion,
                            procedimiento: row.procedimiento,
                            examen: row.examen,
                            nota_examen: row.nota_examen,
                            complicacion: row.complicacion,
                            nota_complicacion: row.nota_complicacion,
                            especialidad: row.especialidad,
                            diagnostico: row.diagnostico,
                            motivo_estancia: row.motivo_estancia,
                            disposicion: row.disposicion,
                            no_cama: row.no_cama,
                            id_monitoreo: row.id_monitoreo
                        })
                        setLine({
                            id: row.id,
                            nota_evolucion: row.nota_evolucion,
                            procedimiento: row.procedimiento,
                            examen: row.examen,
                            nota_examen: row.nota_examen,
                            complicacion: row.complicacion,
                            nota_complicacion: row.nota_complicacion,
                            especialidad: row.especialidad,
                            diagnostico: row.diagnostico,
                            motivo_estancia: row.motivo_estancia,
                            disposicion: row.disposicion,
                            no_cama: row.no_cama,
                            id_monitoreo: row.id_monitoreo
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
                            nota_evolucion: row.nota_evolucion,
                            procedimiento: row.procedimiento,
                            examen: row.examen,
                            nota_examen: row.nota_examen,
                            complicacion: row.complicacion,
                            nota_complicacion: row.nota_complicacion,
                            especialidad: row.especialidad,
                            diagnostico: row.diagnostico,
                            motivo_estancia: row.motivo_estancia,
                            disposicion: row.disposicion,
                            no_cama: row.no_cama,
                            id_monitoreo: row.id_monitoreo
                        })
                        setLine({
                            id: row.id,
                            nota_evolucion: row.nota_evolucion,
                            procedimiento: row.procedimiento,
                            examen: row.examen,
                            nota_examen: row.nota_examen,
                            complicacion: row.complicacion,
                            nota_complicacion: row.nota_complicacion,
                            especialidad: row.especialidad,
                            diagnostico: row.diagnostico,
                            motivo_estancia: row.motivo_estancia,
                            disposicion: row.disposicion,
                            no_cama: row.no_cama,
                            id_monitoreo: row.id_monitoreo
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
        totalSize: evaluaciones.length
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
                data={evaluaciones}
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


    const columnsesp =
        [{
            text:'',
            dataField: 'nombre_especialidad',
            sort: true
        }];
    const optionsesp = {
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
        totalSize: especialidades.length
    };
    const selectRowesp = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: false,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setEspecialidadTemp(row.nombre_especialidad);
            setIdEspecialidadTemp(row.id_especialidad);
        }
    };

    const contentTableesp = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_especialidad"
                columns={columnsesp}
                data={especialidades}
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
                                selectRow={selectRowesp}
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
                <h2>{t("eclinical.monitoreo.datos.evolucion")}</h2>
            </div>
            <div>
                <Button variant="outline-dark" onClick={() => {
                    clearform()
                    handleClose()
                    handleAdd()
                    setLine('')
                    handleShowE()
                }}>
                    <Icofont icon="ui-add" className="mx-2" />
                </Button>

                <PaginationProvider pagination={paginationFactory(options)}>
                    {contentTable}
                </PaginationProvider>

                <Modal show={show} onHide={() => {
                    handleClose()
                    setLine('')
                }} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> <h1>{t("eclinical.monitoreo.datos.incidentes")} - {view ? t("etiquetas.ver") : t("etiquetas.eliminar")}</h1></Modal.Title>
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
                                {t("eclinical.monitoreo.datos.fechaeva")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.fecha_creacion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formid">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.notaevolucion")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nota_evolucion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.procedimiento")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.procedimiento} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.examenes")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.examen} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.notaexamenes")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nota_examen} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.complicacion")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.complicacion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.notacomplicacion")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nota_complicacion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.especial")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.especialidad} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.diagnostico")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.diagnostico} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.motivoestancia")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.motivo_estancia} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.disposicion")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.disposicion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("eclinical.monitoreo.datos.ncama")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.no_cama} />
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
                        <Modal.Title>{t("eclinical.monitoreo.datos.incidentes")} - {editar ? t("etiquetas.editar") : t("etiquetas.agregar")}</Modal.Title>
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
                                {t("eclinical.monitoreo.datos.notaevolucion")}
                                </Form.Label>
                                <Col sm={7} >
                                    <Form.Control as='textarea' placeholder={`${t("eclinical.monitoreo.datos.notaevolucion")}`} value={form.nota_evolucion} onChange={handleChange} name="nota_evolucion" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="mantenimiento">
                                <Form.Label column sm={3}>
                                {t("eclinical.monitoreo.datos.procedimientos")}
                                </Form.Label>
                                <Col sm={5} >
                                    <Form.Control as="select" value={form.procedimiento} onChange={handleChange} name="procedimiento">
                                        <option value="" id="defServ">
                                            {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        {procedimientos.map(serv =>
                                            <option value={serv.id_sala_procedimiento} id={serv.id_sala_procedimiento} key={serv.id_catalogo}>
                                                {serv.nombre_procedimiento}
                                            </option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="mantenimiento">
                                <Form.Label column sm={3}>
                                {t("eclinical.monitoreo.datos.examenes")}
                                </Form.Label>
                                <Col sm={5} >
                                    <Form.Control as="select" value={form.examen} onChange={handleChange} name="examen">
                                        <option value="" id="defServ">
                                            {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        {examenes.map(serv =>
                                            <option value={serv.id_examen} id={serv.id_examen} key={serv.id_examen}>
                                                {serv.nombre_examen}
                                            </option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("eclinical.monitoreo.datos.notaexamen")}
                                </Form.Label>
                                <Col sm={7} >
                                    <Form.Control as='textarea' placeholder={`${t("eclinical.monitoreo.datos.notaexamen")}`} value={form.nota_examen} onChange={handleChange} name="nota_examen" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Row>
                                    <Form.Label><strong>{t("eclinical.monitoreo.datos.complicacion")}</strong></Form.Label>
                                    <br></br>
                                    <Form.Label>
                                        <input
                                            name="isGoing"
                                            label="riesgo de febrite"
                                            type="checkbox"
                                            checked={c1}
                                            onChange={handleInputChangeC1} />
                                        {t("formularios.formkamban.flebite")}
                                    </Form.Label>
                                    <br></br>
                                    <Form.Label>
                                        <input
                                            name="isGoing"
                                            label="riesgo de febrite"
                                            type="checkbox"
                                            checked={c2}
                                            onChange={handleInputChangeC2} />
                                        {t("formularios.formkamban.caida")}
                                    </Form.Label>
                                    <br></br>
                                    <Form.Label>
                                        <input
                                            name="isGoing"
                                            label="riesgo de febrite"
                                            type="checkbox"
                                            checked={c3}
                                            onChange={handleInputChangeC3} />
                                        {t("formularios.formkamban.exaccidente")}
                                    </Form.Label>
                                    <br></br>
                                    <Form.Label>
                                        <input
                                            name="isGoing"
                                            label="riesgo de febrite"
                                            type="checkbox"
                                            checked={c4}
                                            onChange={handleInputChangeC4} />
                                        {t("formularios.formkamban.ulcera")}
                                    </Form.Label>
                                    <br></br>
                                    <Form.Label>
                                        <input
                                            name="isGoing"
                                            label="riesgo de febrite"
                                            type="checkbox"
                                            checked={c5}
                                            onChange={handleInputChangeC5} />
                                        {t("formularios.formkamban.exsonda")}
                                    </Form.Label>
                                </Row>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("eclinical.monitoreo.datos.notacomplicacion")}
                                </Form.Label>
                                <Col sm={7} >
                                    <Form.Control as='textarea' placeholder={`${t("eclinical.monitoreo.datos.notacomplicacion")}`} value={form.nota_complicacion} onChange={handleChange} name="nota_complicacion" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>
                                {t("eclinical.monitoreo.datos.especial")}
                                </Form.Label>
                                <Col sm={5} >
                                    <InputGroup className="mb-2" >
                                        <Form.Control id="x"
                                            placeholder={`-- ${t("etiquetas.seleccion")} --`}
                                            disabled
                                            value={especialidad}
                                            onChange={handleChange}
                                            name="especialidad"
                                        />
                                        <Button variant="outline-secondary" id="button-search" onClick={handleShowEsp}>
                                            <Icofont icon="ui-search" className="mx-2" />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("eclinical.monitoreo.datos.diagnostico")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("eclinical.monitoreo.datos.diagnostico")}`} value={form.diagnostico} onChange={handleChange} name="diagnostico" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("eclinical.monitoreo.datos.motivoestancia")}
                                </Form.Label>
                                <Col sm={7} >
                                    <Form.Control as='textarea' placeholder={`${t("eclinical.monitoreo.datos.motivoestancia")}`} value={form.motivo_estancia} onChange={handleChange} name="motivo_estancia" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="mantenimiento">
                                <Form.Label column sm={3}>
                                {t("eclinical.monitoreo.datos.disposicion")}
                                </Form.Label>
                                <Col sm={5} >
                                    <Form.Control as="select" value={form.disposicion} onChange={handleChange} name="disposicion">
                                        <option value="" id="defServ">
                                            {`-- ${t("etiquetas.seleccion")} --`}
                                        </option>
                                        {disposicion.map(serv =>
                                            <option value={serv.id_catalogo} id={serv.id_catalogo} key={serv.id_catalogo}>
                                                {serv.servicio_es}
                                            </option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label column sm="3">
                                {t("eclinical.monitoreo.datos.ncama")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("eclinical.monitoreo.datos.ncama")}`} value={form.no_cama} onChange={handleChange} name="no_cama" />
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


                <Modal show={showEsp} onHide={handleCloseEsp} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Especialidad</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <PaginationProvider pagination={paginationFactory(optionsesp)}>
                            {contentTableesp}
                        </PaginationProvider>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            setEspecialidad(especialidadTemp);
                            setIdEspecialidad(idEspecialidadTemp);
                            handleCloseEsp();
                        }}>
                            {t("etiquetas.seleccionar")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleCloseEsp();
                        }}>
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>


        </div >
    )

}

export default Evaluacion;
