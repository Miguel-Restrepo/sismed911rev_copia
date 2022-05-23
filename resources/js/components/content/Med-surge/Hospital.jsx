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
import ServiceConfig from '../config/service';
import PhoneInput from 'react-phone-input-2'
const Hospital = () => {
    const [t, i18n] = useTranslation("global");
    const [showCama, setShowCama] = useState(false);
    const handleCloseCama = () => setShowCama(false);
    const handleShowCama = () => setShowCama(true);
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
    const [listaDepartamentos, setListaDepartamentos] = useState([]);
    const [listaProvincias, setListaProvincias] = useState([]);
    const [listaDistritos, setListaDistritos] = useState([]);
    const [listaEspecialidades, setListaEspecialidades] = useState([]);
    const [form, setForm] = useState({
        nombre_hospital: '',
        provincia_hospital: '',
        municipio_hospital: '',
        depto_hospital: '',
        nivel_hospital: '',
        redservicions_hospital: '',
        sector_hospital: '',
        tipo_hospital: '',
        camashab_cali: '',
        latitud_hospital: '',
        longitud_hospital: '',
        especialidad: '',
        codpolitico: '',
        direccion: '',
        telefono: '',
        nombre_responsable: '',
        estado: false,
        emt: false
    });
    const [formCamas, setCamas] = useState({
        codigo:'',
        uci:'',
        pediatra:'',
        hospitalizacion:''
    });

    const clearform = () => setForm({
        nombre_hospital: '',
        provincia_hospital: '',
        municipio_hospital: '',
        depto_hospital: '',
        nivel_hospital: '',
        redservicions_hospital: '',
        sector_hospital: '',
        tipo_hospital: '',
        camashab_cali: '',
        latitud_hospital: '',
        longitud_hospital: '',
        especialidad: '',
        codpolitico: '',
        direccion: '',
        telefono: '',
        nombre_responsable: '',
        estado: false,
        emt: false
    })

    const Get = () => {
        axios.get(`/api/hospitalesgeneral`)
            .then(response => {

                setTablas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
        axios.get(`/api/departamento/anidados`)
            .then(response => {

                setListaDepartamentos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

        axios.get(`/api/especialidad_hospital`)
            .then(response => {

                setListaEspecialidades(response.data);
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
    const handleCamas = e => {
        e.persist();
        setCamas(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )


    }

    const handleChangeEstado = e => {
        e.persist();
        setForm(
            prevState => ({
                ...prevState,
                estado: !form.estado
            })
        )

    }
    const handleChangeEmt = e => {
        e.persist();
        setForm(
            prevState => ({
                ...prevState,
                emt: !form.emt
            })
        )
    }
    const Post = () => {
        axios.post('/api/hospitalesgeneral', form)
            .then(response => {

                Get()
                return response.data;
            })
            .catch(error => {

                return error.response.data;
            })
    }

    const PostCama = () => {
        /*
        axios.post('/api/hospitalesgeneral', form)
            .then(response => {
                console.log(response.data);
                Get()
                return response.data;
            })
            .catch(error => {
                console.log(error.response.data);
                return error.response.data;
            })*/
    }
    const Edit = () => {
        axios.put(`/api/hospitalesgeneral/${line.codigo}`, form)
            .then(response => {

                Get()
                setLine('')
                return response.data;
            })
            .catch(error => {
                console.log(error.response.data);
                return error.response.data;
            })
    }

    useEffect(() => {
        Get()

    }, []);
    useEffect(() => {
        if (form.depto_hospital != '' && listaDepartamentos != []) {
            listaDepartamentos.forEach(element => {
                if (element.cod_dpto == form.depto_hospital) {
                    setListaProvincias(element.provincias);
                }
            });

            //setListaProvincias(listaDepartamentos[listaDepartamentos.indexOf(form.depto_hospital)].provincias);

        }

    }, [form.depto_hospital]);
    useEffect(() => {
        if (form.provincia_hospital != '') {
            listaProvincias.forEach(element => {
                if (element.cod_provincia == form.provincia_hospital) {
                    setListaDistritos(element.distritos);
                }
            });

            //setListaProvincias(listaProvincias[listaProvincias.indexOf(form.provincia_hospital)].distritos);

        }

    }, [form.provincia_hospital]);
    const Elimina = () => {
        axios.delete(`/api/hospitalesgeneral/${line.codigo}/delete`)
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
        setCamas(
            prevState => ({
                ...prevState,
                codigo: code
            })
        )
        tablas.forEach(element => {
            if (element.codigo == code) {
                setForm(element);
                setLine(element);
            }
        });



    }


    const { SearchBar } = Search;
    const columns = [{
        dataField: 'nombre_hospital',
        text: `${t("medsurge.hospital.datos.nombre")}`,
        sort: true
    }, {
        dataField: 'nombre_dpto',
        text: `${t("medsurge.hospital.datos.dpto")}`,
        sort: true
    }, {
        dataField: 'nombre_provincia',//'nombre2','apellido1','apellido2',
        text: `${t("medsurge.hospital.datos.provincia")}`,
        sort: true
    }, {
        dataField: 'nombre_distrito',
        text: `${t("medsurge.hospital.datos.distrito")}`,
        sort: true
    }, {
        dataField: 'nivel_hospital',
        text: `${t("medsurge.hospital.datos.nivel")}`,
        sort: true
    }, {
        dataField: 'tipo_hospital',
        text: `${t("medsurge.hospital.datos.tipo")}`,
        sort: true
    }, {
        dataField: 'especialidad_es',
        text: `${t("medsurge.hospital.datos.especial")}`,
        sort: true
    }, {
        dataField: 'cod_politico',
        text: `${t("medsurge.hospital.datos.divpolitica")}`,
        sort: true
    }, {
        dataField: 'telefono',
        text: `${t("medsurge.hospital.datos.telefono")}`,
        sort: true
    }, {
        dataField: 'nombre_responsable',
        text: `${t("medsurge.hospital.datos.nombreres")}`,
        sort: true
    }, {
        text:'',
        dataField: '566',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="search-1" className="mx-2 text-danger" onClick={() => {
                        handleView()
                        obtener(row.codigo)
                        handleShow();
                    }} />
                </div>
            );
        }
    }, {
        text:'',
        dataField: '334',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>

                    <Icofont icon="pencil-alt-2" className="mx-2 text-danger" onClick={() => {
                        handleEdit()
                        obtener(row.codigo)
                        handleShowE()
                    }} />

                </div>
            );
        }
    }, {
        text:'',
        dataField: '22',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="trash" className="mx-2 text-danger" onClick={() => {
                        handleDelet()
                        obtener(row.codigo)
                        handleShow();
                    }} />
                </div>
            );
        }
    }, {
        text: '',
        sort: true,
        dataField: '11',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Icofont icon="patient-bed" className="mx-6 text-danger" onClick={() => {
                        handleShowCama()
                        obtener(row.codigo);
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
                keyField="codigo"
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
                <h2>{t("medsurge.hospital.titulo")}</h2>
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
                        <Modal.Title> <h1>{t("medsurge.hospital.titulo")} - {view ?  t("etiquetas.ver"): t("etiquetas.eliminar")}</h1></Modal.Title>
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
                                {t("medsurge.hospital.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.codigo} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formname">
                                <Form.Label column sm="2">
                                {t("medsurge.hospital.datos.nombre")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.nombre_hospital} />
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
                        <Modal.Title>{t("medsurge.hospital.titulo")} - {editar ? t("etiquetas.editar") :  t("etiquetas.agregar")}</Modal.Title>
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
                                    <strong>    {t("medsurge.hospital.datos.nombre")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.nombre")}`} value={form.nombre_hospital} onChange={handleChange} name="nombre_hospital" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>      {t("medsurge.hospital.datos.dpto")}:</strong>
                                </Form.Label>
                                <Form.Control as="select" value={form.depto_hospital} placeholder={`${t("medsurge.hospital.datos.dpto")}`} name="depto_hospital" onChange={handleChange}
                                >
                                    {listaDepartamentos.map(elemento => (
                                        <option key={elemento.cod_dpto} value={elemento.cod_dpto}>{elemento.nombre_dpto}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong> {t("medsurge.hospital.datos.provincia")}</strong>
                                </Form.Label>
                                <Form.Control as="select" value={form.provincia_hospital} placeholder={`${t("medsurge.hospital.datos.provincia")}`} name="provincia_hospital" onChange={handleChange}
                                >
                                    {listaProvincias.map(elemento => (
                                        <option key={elemento.cod_provincia} value={elemento.cod_provincia}>{elemento.nombre_provincia}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong> {t("medsurge.hospital.datos.distrito")}</strong>
                                </Form.Label>
                                <Form.Control as="select" value={form.municipio_hospital} placeholder={`${t("medsurge.hospital.datos.distrito")}`} name="municipio_hospital" onChange={handleChange}
                                >
                                    {listaDistritos.map(elemento => (
                                        <option key={elemento.cod_distrito} value={elemento.cod_distrito}>{elemento.nombre_distrito}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>  {t("medsurge.hospital.datos.nivel")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.nivel")}`} value={form.nivel_hospital} onChange={handleChange} name="nivel_hospital" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.camash")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.camash")}`} value={form.camashab_cali} onChange={handleChange} name="camashab_cali" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.especial")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control as="select" value={form.especialidad} placeholder={`${t("medsurge.hospital.datos.especial")}`} name="especialidad" onChange={handleChange}
                                    >
                                        {listaEspecialidades.map(elemento => (
                                            <option key={elemento.id_especialidad} value={elemento.id_especialidad}>{elemento.especialidad_es}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.latitud")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.latitud")}`} value={form.latitud_hospital} onChange={handleChange} name="latitud_hospital" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.longitud")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.longitud")}`} value={form.longitud_hospital} onChange={handleChange} name="longitud_hospital" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.divpolitica")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.divpolitica")}`} value={form.codpolitico} onChange={handleChange} name="codpolitico" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>   {t("medsurge.hospital.datos.direccion")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type="text" value={form.direccion} as="textarea" placeholder={`${t("medsurge.hospital.datos.direccion")}`} name="direccion" onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.telefono")}</strong>
                                </Form.Label>
                                <Col sm={4} >

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
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.nombreres")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.nombreres")}`} value={form.nombre_responsable} onChange={handleChange} name="nombre_responsable" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.estado")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Check
                                        type="radio"
                                        checked={form.estado == true}
                                        label=""
                                        name="estado"
                                        id="1"
                                        value={true}
                                        onChange={handleChangeEstado}
                                    />

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                                <Form.Label sm="3">
                                    <strong>    {t("medsurge.hospital.datos.emt")}</strong>
                                </Form.Label>
                                <Col sm={4} >
                                    <Form.Check
                                        type="radio"
                                        checked={form.emt == true}
                                        label=""
                                        name="emt"
                                        id="1"
                                        value={true}
                                        onChange={handleChangeEmt}
                                    />

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

            </div>
            <Modal show={showCama} onHide={handleCloseCama} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t("medsurge.hospital.datos.agregarcamas")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form >


                    <Form.Group as={Row} className="mb-3" controlId="formid">
                                <Form.Label column sm="2">
                                {t("medsurge.hospital.datos.id")}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={line.codigo} />
                                </Col>
                            </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                            <Form.Label sm="3">
                                <strong>   {t("medsurge.hospital.datos.camashptlz")}</strong>
                            </Form.Label>
                            <Col sm={4} >
                                <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.camashptlz")}`} value={formCamas.hospitalizacion} onChange={handleCamas} name="hospitalizacion" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                            <Form.Label sm="3">
                                <strong>    {t("medsurge.hospital.datos.camasuci")}</strong>
                            </Form.Label>
                            <Col sm={4} >
                                <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.camasuci")}`} value={formCamas.uci} onChange={handleCamas} name="uci" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formcodigo">
                            <Form.Label sm="3">
                                <strong>   {t("medsurge.hospital.datos.camasped")}</strong>
                            </Form.Label>
                            <Col sm={4} >
                                <Form.Control type='text' placeholder={`${t("medsurge.hospital.datos.camasped")}`} value={formCamas.pediatra} onChange={handleCamas} name="pediatra" />
                            </Col>
                        </Form.Group>
                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => {

                        PostCama();
                        handleCloseCama();
                    }}>
                        {t("etiquetas.crear")}
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        handleCloseCama();
                    }}>
                        {t("etiquetas.cancelar")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Hospital;
