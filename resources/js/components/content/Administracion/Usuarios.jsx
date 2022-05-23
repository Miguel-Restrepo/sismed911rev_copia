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
import PhoneInput from 'react-phone-input-2'
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceConfig from '../config/service';
toast.configure()

const Usuarios = () => {
    const [t, i18n] = useTranslation("global");
    const [tablas, setTablas] = useState([]);
    const [nivel, setNivel] = useState([]);
    const [sede, setSede] = useState([]);
    const [acode, setAcode] = useState([]);
    const [line, setLine] = useState("");
    const [passw, setPassw] = useState(false);
    const [show, setShow] = useState(false);
    const [showe, setShowE] = useState(false);
    const [view, setView] = useState(true);
    const [editar, setEditar] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleText = () => setPassw(true);
    const handlePassw = () => setPassw(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);
    const handleDelet = () => setView(false);
    const handleView = () => setView(true);
    const handleEdit = () => setEditar(true);
    const handleAdd = () => setEditar(false);
    const [hospitales, setHospitales] = useState([]);
    const [hospital, setHospital] = useState("");
    const [idHospital, setIdHospital] = useState("");
    const [hospitalTemp, setHospitalTemp] = useState("");
    const [idHospitalTemp, setIdHospitalTemp] = useState("");

    const [form, setForm] = useState({
        fecha_creacion: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        login: '',
        password: '',
        perfil: '',
        sede: '',
        acode: '',
        hospital: ''
    });

    const clearform = () => {
        setHospital('');
        setIdHospital('');
        setForm({
            fecha_creacion: '',
            nombres: '',
            apellidos: '',
            telefono: '',
            login: '',
            password: '',
            perfil: '',
            sede: '',
            acode: '',
            hospital: ''

        })
    }



    const Get = () => {
        axios.get(`/api/usuarios/DavidcomplicadoDeMiercoles`)
            .then(response => {

                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const GetNivel = () => {
        axios.get(`/api/userlevels`)
            .then(response => {

                setNivel(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }
    const GetSede = () => {
        axios.get(`/api/sede_sismed`)
            .then(response => {

                setSede(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }
    const GetAcode = () => {
        axios.get(`/api/code_planta`)
            .then(response => {

                setAcode(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }
    const GetHospital = () => {
        axios.get(`/api/hospitalesgeneral`)
            .then(response => {

                setHospitales(response.data);
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
        axios.post('/api/usuarios', form)
            .then(response => {
                notificarExitoCaso(response.data.id_user);
                Get()
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    const Edit = () => {
        axios.put(`/api/usuarios/${line.id_user}`, form)
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
        GetNivel()
        GetSede()
        GetAcode()
        GetHospital()
    }, []);

    useEffect(() => {
        setForm(prevState => ({
            ...prevState,
            hospital: idHospital
        }));
    }, [hospital, idHospital])

    const Elimina = () => {
        axios.delete(`/api/usuarios/${line.id_user}/delete`)
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
        axios.get(`/api/usuarios/${coda}`)
            .then(response => {

                setForm(response.data)
                return response.data;
            })
            .catch(error => {
                return error;
            });
    }


    const { SearchBar } = Search;
    const columns = [{
        dataField: 'id_user',
        text: `${t("administracion.usuarios.datos.id")}`,
        sort: true
    }, {
        dataField: 'nombres',
        text: `${t("administracion.usuarios.datos.nombres")}`,
        sort: true
    }, {
        dataField: 'apellidos',
        text: `${t("administracion.usuarios.datos.apellidos")}`,
        sort: true
    }, {
        dataField: 'telefono',
        text: `${t("administracion.usuarios.datos.telefono")}`,
        sort: true
    }, {
        dataField: 'login',
        text: `${t("administracion.usuarios.datos.usuario")}`,
        sort: true
    }, {
        dataField: 'userlevelname',
        text: `${t("administracion.usuarios.datos.perfil")}`,
        sort: true
    }, {
        dataField: 'sede',
        text: `${t("administracion.usuarios.datos.sede")}`,
        sort: true
    }, {
        dataField: 'acode',
        text: `${t("administracion.usuarios.datos.acode")}`,
        sort: true
    }, {
        dataField: 'hospital.nombre_hospital',
        text: `${t("administracion.usuarios.datos.hospital")}`,
        sort: true
    }, {
        text:'',
        dataField: '789',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2" onClick={() => {
                        handleView()
                        obtener(row.id_user)


                        if (!row.hospital) {
                            setIdHospital('');
                            setHospital('');
                        } else {
                            setIdHospital(row.hospital.id_hospital);
                            setHospital(row.hospital.nombre_hospital);
                        }
                        setLine({
                            id_user: row.id_user,
                            nombres: row.nombres,
                            apellidos: row.apellidos,
                            telefono: row.telefono,
                            login: row.login,
                            perfil: row.userlevelname,
                            sede: row.sede,
                            acode: row.acode
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
                        obtener(row.id_user)
                        if (!row.hospital) {
                            setIdHospital('');
                            setHospital('');
                        } else {
                            setIdHospital(row.hospital.id_hospital);
                            setHospital(row.hospital.nombre_hospital);
                        }

                        setLine({
                            id_user: row.id_user,
                            nombres: row.nombres,
                            apellidos: row.apellidos,
                            telefono: row.telefono,
                            login: row.login,
                            perfil: row.userlevelname,
                            sede: row.sede,
                            acode: row.acode
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
                        obtener(row.id_user)
                        if (!row.hospital) {
                            setIdHospital('');
                            setHospital('');
                        } else {
                            setIdHospital(row.hospital.id_hospital);
                            setHospital(row.hospital.nombre_hospital);
                        }

                        setLine({
                            id_user: row.id_user,
                            nombres: row.nombres,
                            apellidos: row.apellidos,
                            telefono: row.telefono,
                            login: row.login,
                            perfil: row.userlevelname,
                            sede: row.sede,
                            acode: row.acode
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
                keyField="id_user"
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


    const columns1 =
        [{
            text:'',
            dataField: 'nombre_hospital',
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
        totalSize: hospitales.length
    };
    const selectRow1 = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: false,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {
            setHospitalTemp(row.nombre_hospital);
            setIdHospitalTemp(row.id_hospital);
        }
    };

    const contentTable1 = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_hospital"
                columns={columns1}
                data={hospitales}
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <SearchBar placeholder={`${t("tabla.buscador")}`}  {...toolkitprops.searchProps} className="mb-3" />
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
                <h2>{t("administracion.usuarios.titulo")}</h2>
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
                        <Modal.Title> <h1>{t("administracion.usuarios.titulo")} - {view ?  t("etiquetas.ver") : t("etiquetas.eliminar")}</h1></Modal.Title>
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
                                {t("administracion.usuarios.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.id_user} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.nombres")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombres} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.apellidos")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.apellidos} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.telefono")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.telefono} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.usuario")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.login} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.perfil")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.perfil} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.sede")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.sede} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.acode")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.acode} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("administracion.usuarios.datos.hospital")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={hospital} />
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
                        <Modal.Title>{t("administracion.usuarios.titulo")} - {editar ? t("etiquetas.editar") :  t("etiquetas.agregar")}</Modal.Title>
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
                            <Form.Group as={Row} className="mb-3" controlId="formnombre">
                                <Form.Label column sm="3">
                                {t("administracion.usuarios.datos.nombres")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.usuarios.datos.nombres")}`} value={form.nombres} onChange={handleChange} name="nombres" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formapellido">
                                <Form.Label column sm="3">
                                {t("administracion.usuarios.datos.apellidos")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.usuarios.datos.apellidos")}`} value={form.apellidos} onChange={handleChange} name="apellidos" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="Telefono">
                                <Form.Label column sm={3}>{t("administracion.usuarios.datos.telefono")}</Form.Label>
                                <Col sm={6}>
                                    <PhoneInput
                                        containerClass="mx-0"
                                        inputClass="mx-0"
                                        country={ServiceConfig.codgoPais}
                                        value={form.telefono}
                                        onChange={value => setForm(prevState => ({
                                            ...prevState,
                                            telefono: value
                                        }))}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formlogin">
                                <Form.Label column sm="3">
                                {t("administracion.usuarios.datos.usuario")}
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("administracion.usuarios.datos.usuario")}`} value={form.login} onChange={handleChange} name="login" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formpw">
                                <Form.Label column sm="3">
                                {t("administracion.usuarios.datos.pw")}
                                </Form.Label>
                                <Col sm={4} >
                                    <InputGroup className="mb-2">
                                        <Form.Control type={passw ? 'text' : 'password'} placeholder={`${t("administracion.usuarios.datos.pw")}`} value={form.password} onChange={handleChange} name="password" />
                                        <Button variant="outline-secondary" onClick={passw ? handlePassw : handleText}>
                                            <Icofont icon={passw ? 'eye-blocked' : 'eye'} className="mx-2" />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formperfil">
                                <Form.Label column sm="3">
                                {t("administracion.usuarios.datos.perfil")}
                                </Form.Label>
                                <Col sm={7}>
                                    <InputGroup className="mb-2" >
                                        <Form.Control as="select" value={form.perfil} onChange={handleChange} name="perfil">
                                            <option value="" id="defespec">
                                                {`-- ${t("etiquetas.seleccion")} --`}
                                            </option>
                                            {nivel.map(serv =>
                                                <option key={serv.userlevelid} value={serv.userlevelid} >
                                                    {serv.userlevelname}
                                                </option>)}
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formsede">
                                <Form.Label column sm="3">
                                {t("administracion.usuarios.datos.sede")}
                                </Form.Label>
                                <Col sm={7}>
                                    <InputGroup className="mb-2" >
                                        <Form.Control as="select" value={form.sede} onChange={handleChange} name="sede">
                                            <option value="" id="defesede">
                                                {`-- ${t("etiquetas.seleccion")} --`}
                                            </option>
                                            {sede.map(serv =>
                                                <option key={serv.id_sede} value={serv.id_sede} >
                                                    {serv.nombre_sede}
                                                </option>)}
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formacode">
                                <Form.Label column sm="3">
                                {t("administracion.usuarios.datos.acode")}
                                </Form.Label>
                                <Col sm={7}>
                                    <InputGroup className="mb-2" >
                                        <Form.Control as="select" value={form.acode} onChange={handleChange} name="acode">
                                            <option value="" id="defeacode">
                                                {`-- ${t("etiquetas.seleccion")} --`}
                                            </option>
                                            {acode.map(serv =>
                                                <option key={serv.idacode} value={serv.nombreacode} >
                                                    {serv.nombreacode}
                                                </option>)}
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>
                                {t("administracion.usuarios.datos.hospital")}
                                </Form.Label>
                                <Col sm={7}>
                                    <InputGroup className="mb-2" >
                                        <Form.Control id="x"
                                            placeholder={`-- ${t("etiquetas.seleccionhptl")} --`}
                                            disabled
                                            value={hospital}
                                            onChange={handleChange}
                                            name="hospital"
                                        />
                                        <Button variant="outline-secondary" id="button-search" onClick={handleShow2}>
                                            <Icofont icon="ui-search" className="mx-2" />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='primary' onClick={editar ? () => {
                            Edit()
                            handleCloseE()
                        } : () => {
                            setForm(prevState => ({
                                ...prevState,
                                fecha_creacion: Date.now()
                            }));
                            Post()
                            handleCloseE()
                        }}>
                            {editar ? t("etiquetas.editar") :  t("etiquetas.agregar")}
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
                        <Modal.Title>{t("administracion.usuarios.datos.hospital")} </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <PaginationProvider pagination={paginationFactory(options1)}>
                            {contentTable1}
                        </PaginationProvider>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            setHospital(hospitalTemp);
                            setIdHospital(idHospitalTemp);
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

export default Usuarios;
