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

//import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from "react-i18next"
const { DateTime } = require("luxon");
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Monitoreo = () => {
    const [t, i18n] = useTranslation("global");
    const [tablas, setTablas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [camas, setCamas] = useState([]);
    const [necesidades, setNecesidades] = useState([]);
    const [riesgos, setRiesgos] = useState([]);
    const [line, setLine] = useState("");
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);

    const [showPcte, setShoPcte] = useState(false);
    const handleShowPcte = () => setShoPcte(true);
    const handleClosePcte = () => setShoPcte(false);
    const [showEsp, setShowEsp] = useState(false);
    const handleShowEsp = () => setShowEsp(true);
    const handleCloseEsp = () => setShowEsp(false);
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidad, setEspecialidad] = useState("");
    const [idEspecialidad, setIdEspecialidad] = useState("");
    const [especialidadTemp, setEspecialidadTemp] = useState("");
    const [idEspecialidadTemp, setIdEspecialidadTemp] = useState("");

    const [evaluaciones, setEvaluaciones] = useState([]);
    const [procedimientos, setProcedimientos] = useState([]);
    const [examenes, setExamenes] = useState([]);
    const [disposicion, setDisposicion] = useState([]);
    const [tiempo, setTiempo] = useState(DateTime.now());


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
        id_monitoreo: '',
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
            id_monitoreo: ''
        })
    }


    const Get = () => {
        axios.get(`/api/monitoreo`)
            .then(response => {
                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetProcedimientos = () => {
        axios.get(`/api/procedimientos`)
            .then(response => {
                setProcedimientos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetPacientes = () => {
        axios.get(`/api/monitoreo/paciente`)
            .then(response => {
                setPacientes(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetCamas = () => {
        axios.get(`/api/monitoreo/censo_camas`)
            .then(response => {
                setCamas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }
    const GetNecesidades = () => {
        axios.get(`/api/monitoreo/necesidades`)
            .then(response => {
                setNecesidades(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }
    const GetRiesgos = () => {
        axios.get(`/api/monitoreo/riesgos`)
            .then(response => {
                setRiesgos(response.data);
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


    const Post = async () => {
        await chekeo()
        axios.post('/api/evolucion', form)
            .then(response => {
                Get()
                notificarExitoCaso(response.data.id);
                clearform()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                clearform()
                return error.response.data;
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

    useEffect(() => {
        Get();
        GetPacientes();
        GetCamas();
        GetProcedimientos();
        GetNecesidades();
        GetRiesgos();
        GetDatos()
    }, []);


    const { SearchBar } = Search;
    const columns = [{
        text: `${t("eclinical.monitoreo.datos.tiemposala")}`,
        dataField: '786218765',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="ui-clock" className="mx-2 text-success" />
                    <span className="text-success">
                        {Math.floor(((Math.abs(Date.parse(row.sala_admision.fecha_admision) - extraData)) / 1000) / 60) + " MIN"}
                    </span>
                </div>
            );
        },
        formatExtraData: tiempo,
        sort: true
    }, {
        dataField: 'no_cama',
        text: `${t("eclinical.monitoreo.datos.ncama")}`,
        sort: true
    },
    {
        text: `${t("eclinical.monitoreo.datos.hc")}`,
        sort: true,
        dataField: '123456',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    {row.paciente != null ? row.paciente.expendiente : "Sin expediente"}
                </div>
            );
        }

    }, {
        text: `${t("eclinical.monitoreo.datos.paciente")}`,
        sort: true,
        dataField: '7852368745',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    {row.paciente != null ? (row.paciente.nombre1 + " " + row.paciente.nombre2 + " " + row.paciente.apellido1 + " " + row.paciente.apellido2) : ""}
                </div>
            );
        }
    }, {
        dataField: 'necesidad',
        text: `${t("eclinical.monitoreo.datos.motivoestancia")}`,
        sort: true
    }, {

        text: `${t("eclinical.monitoreo.datos.prosala")}`,
        sort: true,
        dataField: '78452',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    {row.procedimiento != null ? row.procedimiento.nombre_procedimiento : "Sin procedimiento"}

                </div>
            );
        }
    }, {
        text: `${t("eclinical.monitoreo.datos.examenpendiente")}`,
        sort: true,
        dataField: '9625',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    {row.evoluciones.map(evo =>

                        <li key={evo.examen.id_examen}>{evo.examen.nombre_examen}</li>
                    )}
                </div>
            );
        }
    }, {
        dataField: 'riegos',
        text: `${t("eclinical.monitoreo.datos.riesfoadquirido")}`, //
        sort: true
    }, {
        text: '',
        dataField: '789',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        setLine({
                            nombre1: row.paciente.nombre1,
                            nombre2: row.paciente.nombre2,
                            apellido1: row.paciente.apellido1,
                            apellido2: row.paciente.apellido2,
                            apodo: row.paciente.apodo,
                            celular: row.paciente.celular,
                            direccion: row.paciente.direccion,
                            email: row.paciente.email,
                            edad: row.paciente.edad,
                            fecha_nacido: row.paciente.fecha_nacido,
                            nacionalidad: row.paciente.nacionalidad,
                            num_doc: row.paciente.num_doc,
                            telefono: row.paciente.telefono,
                            tipo_doc: row.paciente.tipo_doc
                        })
                        handleShowPcte();
                    }} />
                </div>
            );
        }
    }, {
        text: '',
        dataField: '45',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>

                    <Icofont icon="ui-folder" className="mx-2" onClick={() => {
                        setForm(
                            prevState => ({
                                ...prevState,
                                id_monitoreo: row.id
                            })
                        )
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
                    <Link to={`/evaluacion?cod=${row.id}`} >
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
                keyField="id"
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


    const columnsesp =
        [{
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
                <h2>{t("eclinical.monitoreo.titulo")}</h2>
            </div>
            <div>
                <div className='monit'>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.necesidad")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cuidadomin")} </p><p className='tarjetavalue'>{necesidades.minimo}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cuidadointer")}</p><p className='tarjetavalue'>{necesidades.intermedio}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cuidadointensivo")}</p><p className='tarjetavalue'>{necesidades.intensivo}</p>
                            </div>
                        </div>
                    </div>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.paciente")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.internados")} </p><p className='tarjetavalue'>{pacientes.internados}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.fb")}</p><p className='tarjetavalue'>{pacientes.fb}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("eclinical.monitoreo.datos.media")}</p><p className='tarjetavalue'>{pacientes.media}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.total")}</p><p className='tarjetavalue'>{pacientes.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.censocamas")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.cadisponibles")}</p><p className='tarjetavalue'>{camas.disponibles}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.caocupadas")}</p><p className='tarjetavalue'>{camas.ocupadas}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("eclinical.monitoreo.datos.caextras")}</p><p className='tarjetavalue'>{camas.disponibles + camas.ocupadas - camas.total}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("eclinical.monitoreo.datos.totalcamas")}</p><p className='tarjetavalue'>{camas.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className='tarjeta'>
                        <div className='encabezado'>
                            <h4 className='tarjetatitulo'>{t("eclinical.monitoreo.datos.riesgoadquirido")}</h4>
                        </div>
                        <div className='tarjetacontenido'>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.flebite")}: </p><p className='tarjetavalue'>{riesgos.r1}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.caida")}:</p><p className='tarjetavalue'>{riesgos.r2}</p>
                            </div>
                            <div className='tls'> <p className='tarjetainfo'>{t("formularios.formkamban.exsonda")}:</p><p className='tarjetavalue'>{riesgos.r3}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.ulcera")}:</p><p className='tarjetavalue'>{riesgos.r4}</p>
                            </div>
                            <div className='tls'><p className='tarjetainfo'>{t("formularios.formkamban.exaccidente")}:</p><p className='tarjetavalue'>{riesgos.r5}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <PaginationProvider
                    pagination={
                        paginationFactory(options)
                    }
                >
                    {contentTable}
                </PaginationProvider>

                <Modal show={showEsp} onHide={handleCloseEsp} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("eclinical.monitoreo.datos.especial")}</Modal.Title>
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

                <Modal show={showe} onHide={() => {
                    handleCloseE()
                }} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("eclinical.monitoreo.datos.evolucion")} - {t("etiquetas.agregar")}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

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
                        <Button variant='primary' onClick={() => {
                            Post()
                            handleCloseE()
                        }}>
                            {t("etiquetas.agregar")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            handleCloseE()
                            clearform()
                        }}>
                            {t("etiquetas.cancelar")}
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={showPcte} onHide={() => {
                    handleClosePcte()
                    setLine('')
                }} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> <h1>{t("eclinical.monitoreo.datos.incidentes")} </h1></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formid">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.nombre1")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre1} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.nombre2")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre2} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.apellido1")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.apellido1} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.apellido2")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.apellido2} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.apodo")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.apodo} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.docid")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.num_doc} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.edad")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.edad} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.fechanac")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.fecha_nacido} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.direccion")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.direccion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.telefono")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.telefono} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("formularios.formpacientes.nacionalidad")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nacionalidad} />
                                </Col>
                            </Form.Group>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='primary' onClick={() => {
                            handleClose()
                            setLine('')
                        }
                        }>
                            {t("etiquetas.hecho")}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )

}

export default Monitoreo;
