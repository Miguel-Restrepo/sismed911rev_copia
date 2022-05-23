import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useTranslation } from "react-i18next"
const { DateTime } = require("luxon");
import Icofont from 'react-icofont';
import chroma from "chroma-js";
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, FunnelChart, Funnel, LabelList, } from "recharts";


const PanelGestion = () => {
    const [t, i18n] = useTranslation("global");


    const [dataRegiones, setDataRegiones] = useState([]);
    const [dataTotales, setDataTotales] = useState([]);
    const [dataTabla, setDataTabla] = useState([]);
    const [dataTotalAsistencias, setDataTotalAsistencias] = useState([]);



    const [dataAmbuPorTipo, setDataAmbuPorTipo] = useState([]);
    const [dataFueraTaller, setDataFueraTaller] = useState([]);
    const [dataFueraDetalle, setDataFueraDetalle] = useState([]);
    const [dataEntradasSalidas, setDataEntradasSalidas] = useState([]);
    const [dataPromedioRespuesta, setDataPromedioRespuesta] = useState([]);

    const [fechaInicio, setFechaInicio] = useState('2001-04-01');
    const [fechaFin, setFechaFin] = useState('2022-04-01');

    //Paired, Set1, Dark2, Spectral
    const colors = chroma.scale('Spectral').colors(32);


    //4° PESTAÑA
    //Route::get('estadisticas/ambulancia/por_tipo','por_tipo');
    //Route::get('estadisticas/ambulancia/fuera_servicio_taller','fuera_servicio_taller');
    //Route::get('estadisticas/ambulancia/fuera_servicio_detalle','fuera_servicio_detalle');
    //Route::get('estadisticas/ambulancia/promedio_respuesta_taller','promedio_respuesta_taller');
    //Route::get('estadisticas/ambulancia/ent_sal_siete_dias','ent_sal_siete_dias');

    const GetAmbuPorTipo = () => {
        axios.get('/api/estadisticas/ambulancia/por_tipo')
            .then(response => {
                setDataAmbuPorTipo(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetFueraTaller = () => {
        axios.get('/api/estadisticas/ambulancia/fuera_servicio_taller')
            .then(response => {
                setDataFueraTaller(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetFueraDetalle = () => {
        axios.get('/api/estadisticas/ambulancia/fuera_servicio_detalle')
            .then(response => {
                setDataFueraDetalle(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const GetEntradasSalidas = () => {
        axios.get('/api/estadisticas/ambulancia/ent_sal_siete_dias')
            .then(response => {
                setDataEntradasSalidas(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    const GetPromedioRespuesta = () => {
        axios.get('/api/estadisticas/ambulancia/promedio_respuesta_taller')
            .then(response => {
                setDataPromedioRespuesta(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const columns = [{
        dataField: '789',
        text: `${t("interhospital.tablerointerh.datos.mes")}`,
        formatter: (cell, row) => {
            return (
                <div>{`${DateTime.fromISO(row.fecha_inicio.slice(0, 10)).setLocale('es').toLocaleString({ month: 'long' })}`}
                </div>);
        },
        sort: true
    }, {
        dataField: '8965',
        text: `${t("ambulancias.panelgestion.dia")}`,
        formatter: (cell, row) => {
            return (
                <div>{`${DateTime.fromISO(row.fecha_inicio.slice(0, 10)).setLocale('es').toLocaleString({ day: 'numeric' })}`}
                </div>);
        },
        sort: true
    }, {
        dataField: 'nombre_taller',
        text: `${t("ambulancias.taller.titulo")}`,
        sort: true
    }, {
        dataField: 'marca',
        text: `${t("ambulancias.panelgestion.marca")}`,
        formatter: (cell, row) => {
            return (
                <div>{`
            ${row.marca != null ? row.marca : ''}
            ${row.modelo != null ? row.modelo2 : ''}`}
                </div>);
        },
        sort: true
    }, {
        dataField: 'cod_ambulancias',
        text: `${t("ambulancias.ambulancias.datos.codigo")}`,
        sort: true
    }, {
        dataField: 'disponible',
        text: `${t("ambulancias.panelgestion.disponible")}`,
        sort: true
    }, {
        dataField: 'placas',
        text: `${t("ambulancias.ambulancias.datos.placas")}`,
        sort: true
    }, {
        dataField: 'tipo_conbustible',
        text: `${t("ambulancias.ambulancias.datos.tipo")}`,
        sort: true
    }, {
        dataField: 'observaciones',
        text: `${t("ambulancias.panelgestion.observacion")}`,
        sort: true
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
        totalSize: dataTabla.length
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="cod_ambulancias"
                columns={columns}
                data={dataFueraDetalle}
            >
                {
                    toolkitprops => (
                        <div>
                            <BootstrapTable
                                striped
                                hover
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                                noDataIndication={`${t("tabla.sindatos")}`}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );



    useEffect(() => {

        GetAmbuPorTipo();
        GetFueraTaller();
        GetFueraDetalle();
        GetEntradasSalidas();
        GetPromedioRespuesta();


    }, []);



    return (
        <Container fluid>

            <Row className='pb-4'>

                <Col>
                    <Card className='h-100'>
                        <Card.Body>
                            <h2 className='d-flex justify-content-center py-4' style={{ color: '#073c53' }}>{t("ambulancias.panelgestion.gestion")}</h2>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className='pb-4'>

                <Col xs={4}>
                    <Card className='mb-1 h-100'>
                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelgestion.unidadestipo")}</Card.Header>
                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                            <Container fluid>
                                <Row>
                                    {dataAmbuPorTipo.map(elemento => (
                                        <Col key={elemento.value} className='d-flex justify-content-center align-items-center' xs={6}>
                                            <div>
                                                <Icofont icon="icofont-ambulance-cross" className="mx-2" style={{ color: '#073c53', fontSize: '6em' }} />
                                                <h2 className='d-flex justify-content-center'>{`${elemento.name}: ${elemento.value}`}</h2>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={5}>
                    <Card className='mb-1 h-100'>
                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelgestion.total")}</Card.Header>
                        <Card.Body>
                            <ResponsiveContainer width="95%" height={400}>
                                <BarChart
                                    width='100%'
                                    height='100%'
                                    data={dataFueraTaller}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" >
                                        {
                                            dataFueraTaller.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index]} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card className='mb-1 h-100' style={{ border: "3px solid #176b82", borderRadius: "20px", backgroundColor: "#073c53" }}>
                        <Card.Body>
                            <Form>
                                <Row className='text-white'>
                                    <Form.Group as={Col} xs={12} >
                                        <Form.Label><strong>{t("ambulancias.panelcobertura.provincia")}</strong></Form.Label>
                                        <Form.Control as="select" >
                                            <option value="" key="9846518956">{t("ambulancias.panelcobertura.todas")}</option>

                                            {/**tipos_documentos.map(elemento => (
                                                    <option key={elemento.id_ingreso} value={elemento.id_tipo}>{elemento.descripcion}</option>
                                                ))*/}

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12}>
                                        <Form.Label><strong>{t("ambulancias.panelcobertura.codigo")}</strong></Form.Label>
                                        <Form.Control as="select" >
                                            <option value="" key="562841">{t("ambulancias.panelcobertura.todas")}</option>

                                            {/**tipos_documentos.map(elemento => (
                                                    <option key={elemento.id_ingreso} value={elemento.id_tipo}>{elemento.descripcion}</option>
                                                ))*/}

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12}>
                                        <Form.Label><strong>{t("ambulancias.panelgestion.marca")}</strong></Form.Label>
                                        <Form.Control as="select" >
                                            <option value="" key="3247485">{t("ambulancias.panelcobertura.todas")}</option>

                                            {/**tipos_documentos.map(elemento => (
                                                    <option key={elemento.id_ingreso} value={elemento.id_tipo}>{elemento.descripcion}</option>
                                                ))*/}

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12}>
                                        <Form.Label><strong>{t("ambulancias.taller.titulo")}</strong></Form.Label>
                                        <Form.Control as="select" >
                                            <option value="" key="789651">{t("ambulancias.panelcobertura.todas")}</option>

                                            {/**tipos_documentos.map(elemento => (
                                                    <option key={elemento.id_ingreso} value={elemento.id_tipo}>{elemento.descripcion}</option>
                                                ))*/}

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12}>
                                        <Form.Label><strong>{t("ambulancias.panelgestion.estatus")}</strong></Form.Label>
                                        <Form.Control as="select" >
                                            <option value="" key="465894">{t("ambulancias.panelcobertura.todas")}</option>

                                            {/**tipos_documentos.map(elemento => (
                                                    <option key={elemento.id_ingreso} value={elemento.id_tipo}>{elemento.descripcion}</option>
                                                ))*/}

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12}>
                                        <Form.Label><strong>{t("ambulancias.panelgestion.terminales")}</strong></Form.Label>
                                        <Form.Control as="select" >
                                            <option value="" key="69894165">{t("ambulancias.panelcobertura.todas")}</option>

                                            {/**tipos_documentos.map(elemento => (
                                                    <option key={elemento.id_ingreso} value={elemento.id_tipo}>{elemento.descripcion}</option>
                                                ))*/}

                                        </Form.Control>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            <Row className='pb-4'>


                <Col xs={4}>
                    <Card className='mb-1 h-100'>
                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelgestion.unidadesdetalle")}</Card.Header>
                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                            <Container fluid className="overflow-auto">
                                <PaginationProvider
                                    pagination={
                                        paginationFactory(options)
                                    }
                                >
                                    {contentTable}
                                </PaginationProvider>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card className='mb-1 h-100'>
                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelgestion.entradasalida")}</Card.Header>
                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                            <Container fluid>
                                <Row>
                                    <Col className='d-flex justify-content-center align-items-center' xs={6}>
                                        {dataEntradasSalidas.length > 0 &&
                                            <h2 className='d-flex justify-content-center'>
                                                {dataEntradasSalidas[0].ingresos}
                                            </h2>
                                        }
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center' xs={6}>
                                        <Icofont icon="arrow-up" className="mx-2" style={{ color: '#00c54c', fontSize: '6em' }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='d-flex justify-content-center align-items-center' xs={6}>
                                        <Icofont icon="arrow-down" className="mx-2" style={{ color: '#f68d8a', fontSize: '6em' }} />
                                    </Col>
                                    <Col className='d-flex justify-content-center align-items-center' xs={6}>
                                        {dataEntradasSalidas.length > 0 &&
                                            <h2 className='d-flex justify-content-center'>
                                                {dataEntradasSalidas[0].salidas}
                                            </h2>
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={5}>
                    <Card className='mb-1 h-100'>
                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelgestion.marca")}</Card.Header>
                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                            <Container fluid>
                                <Row>
                                    {dataPromedioRespuesta.map(elemento => (
                                        <Col key={elemento.value} className='d-flex justify-content-center align-items-center pb-4' xs={6}>
                                            <h2>{`${elemento.name}: ${elemento.value}`}</h2>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>


        </Container>
    );


}

export default PanelGestion;
