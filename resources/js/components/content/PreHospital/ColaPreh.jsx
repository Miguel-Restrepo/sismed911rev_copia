import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

//import 'react-phone-input-2/lib/style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import axios from 'axios';

const ColaPreh = () => {
    const [datos, setDatos] = useState([]);
    const [dato, setDato] = useState(null);
    const [estado, setEstado] = useState('0');
    const [SRS, setSRS] = useState(0);
    const [filtroSRS, setFiltroSRS] = useState([]);
    const [t, i18n] = useTranslation('global');

    const GetSRS = () => {
        axios
            .get('/api/distrito')
            .then((response) => {
                setFiltroSRS(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const Get = () => {
        axios
            .post('/api/estadisticas/preh/cola_pacientes', null, {
                params: {
                    estado: estado,
                    SRS: SRS,
                },
            })
            .then((response) => {
                setDatos(response.data);

                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    useEffect(() => {
        Get();
        GetSRS();
    }, []);

    useEffect(() => {
        Get();
    }, [estado, SRS]);

    const handleChange = (e) => {
        e.persist();
        setEstado(e.target.value);
    };

    const columns = [
        {
            dataField: 'fecha',
            text: `${t('interhospital.cola.datos.fecharegistro')}`,
            sort: true,
        },
        {
            text: `${t('interhospital.cola.datos.servicioregional')}`,
            sort: true,
            dataField: '22',
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.entidad != null && (
                            <div>{row.entidad.nombre_distrito}</div>
                        )}
                    </div>
                );
            },
        },
        {
            text: `${t('interhospital.cola.datos.nombreapellido')}`,
            sort: true,
            dataField: '11',
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {`
                ${row.apellido1 != null ? row.apellido1 : ''}
                ${row.apellido2 != null ? row.apellido2 : ''}
                ${row.nombre1 != null ? row.nombre1 : ''}
                ${row.nombre2 != null ? row.nombre2 : ''}`}
                    </div>
                );
            },
        },
    ];

    const options = {
        custom: true,
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: `${t('tabla.primera')}`,
        prePageText: `${t('tabla.anterior')}`,
        nextPageText: `${t('tabla.sgte')}`,
        lastPageText: `${t('tabla.ultima')}`,
        nextPageTitle: `${t('tabla.sgtepag')}`,
        prePageTitle: `${t('tabla.anteriorpag')}`,
        firstPageTitle: `${t('tabla.primerapag')}`,
        lastPageTitle: `${t('tabla.ultimapag')}`,
        showTotal: true,
        totalSize: datos.length,
    };

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: '#fff', background: '#0d6efd' },
        onSelect: (row, isSelect, rowIndex, e) => {
            setDato(row);
        },
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="codigo"
                columns={columns}
                data={datos}
                search
            >
                {(toolkitprops) => (
                    <Card className="h-100">
                        <BootstrapTable
                            striped
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t('tabla.sindatos')}`}
                            selectRow={selectRow}
                        />
                    </Card>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    return (
        <div>
            <Container fluid>
                <Row className="pb-4">
                    <Col xs={5}>
                        <Card
                            style={{
                                border: '3px solid #176b82',
                                borderRadius: '20px',
                                backgroundColor: '#073c53',
                            }}
                        >
                            <Card.Body>
                                <Form>
                                    {/**
                                    <Form.Group as={Col} >
                                        <Form.Label><strong>Fecha inicio:</strong></Form.Label>
                                        <Form.Control type="date" value={fechaInicio} name="fecha_inicio"
                                            onChange={e => {
                                                setFechaInicio(e.target.value);
                                                Get(fechaInicio, fechaFin)

                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label><strong>Fecha fin:</strong></Form.Label>
                                        <Form.Control type="date" value={fechaFin} name="fecha_fin"
                                            onChange={e => {
                                                setFechaFin(e.target.value);
                                                Get(fechaInicio, fechaFin)
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label><strong>Filtro SRS:</strong></Form.Label>
                                        <Form.Control type="text" name="filtro" />
                                    </Form.Group>
                                    */}

                                    <Row className="text-white">
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                <strong>
                                                    {t(
                                                        'interhospital.cola.datos.estatustraslado'
                                                    )}
                                                </strong>
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={estado}
                                                onChange={handleChange}
                                            >
                                                <option value="0" key="1">
                                                    {t(
                                                        'interhospital.cola.datos.todas'
                                                    )}
                                                </option>
                                                <option value="1" key="2">
                                                    {t(
                                                        'interhospital.cola.datos.completado'
                                                    )}
                                                </option>
                                                <option value="2" key="3">
                                                    {t(
                                                        'interhospital.cola.datos.espera'
                                                    )}
                                                </option>
                                                <option value="3" key="4">
                                                    {t(
                                                        'interhospital.cola.datos.proceso'
                                                    )}
                                                </option>
                                                <option value="4" key="5">
                                                    {t(
                                                        'interhospital.cola.datos.abortados'
                                                    )}
                                                </option>
                                                {/**tipos_documentos.map(elemento => (
                                                    <option key={elemento.id_ingreso} value={elemento.id_tipo}>{elemento.descripcion}</option>
                                                ))*/}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                <strong>
                                                    {t(
                                                        'interhospital.cola.datos.filtrosrs'
                                                    )}
                                                </strong>
                                            </Form.Label>

                                            <Form.Control
                                                as="select"
                                                onChange={(e) => {
                                                    setSRS(e.target.value);
                                                }}
                                            >
                                                <option value="">
                                                    {t(
                                                        'interhospital.trasladointerh.todas'
                                                    )}
                                                </option>
                                                {filtroSRS.map((elemento) => (
                                                    <option
                                                        key={
                                                            elemento.nombre_distrito
                                                        }
                                                        value={
                                                            elemento.cod_distrito
                                                        }
                                                    >
                                                        {
                                                            elemento.nombre_distrito
                                                        }
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={7}>
                        <Card className="h-100">
                            <Card.Body>
                                <h2
                                    className="d-flex justify-content-center py-4"
                                    style={{ color: '#073c53' }}
                                >
                                    {t('interhospital.cola.datos.trasladospre')}
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <div>
                            <PaginationProvider
                                pagination={paginationFactory(options)}
                            >
                                {contentTable}
                            </PaginationProvider>
                        </div>
                    </Col>
                    <Col>
                        <Card className="p-4 h-100">
                            {dato != null && (
                                <div>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.nombrepcte'
                                            )}
                                        </Col>
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.tipopcte'
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.nombre1 +
                                                    ' ' +
                                                    dato.nombre2 +
                                                    ' ' +
                                                    dato.apellido1 +
                                                    ' ' +
                                                    dato.apellido2}
                                            </h3>
                                        </Col>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.tipoPaciente != null ? (
                                                    <div>
                                                        {
                                                            dato.tipoPaciente
                                                                .nombre_tipopaciente
                                                        }
                                                    </div>
                                                ) : (
                                                    '(En blanco)'
                                                )}
                                            </h3>
                                        </Col>
                                    </Row>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.regionsalud'
                                            )}
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row>
                                        <h3 className="py-2">
                                            {dato.entidad != null ? (
                                                <div>
                                                    {
                                                        dato.entidad
                                                            .nombre_distrito
                                                    }
                                                </div>
                                            ) : (
                                                '(En blanco)'
                                            )}
                                        </h3>
                                    </Row>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.hospitalprocedencia'
                                            )}
                                        </Col>
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.edadpcte'
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.nombre_hospital}
                                            </h3>
                                        </Col>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.codigo_edad != null ? (
                                                    <div>
                                                        {dato.edad +
                                                            ' ' +
                                                            dato.codigo_edad
                                                                .nombre_edad}
                                                    </div>
                                                ) : (
                                                    '(En blanco)'
                                                )}
                                            </h3>
                                        </Col>
                                    </Row>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.nacionalidad'
                                            )}
                                        </Col>
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.ficha'
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.nacionalidad}
                                            </h3>
                                        </Col>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.ambulancia != null ? (
                                                    <div>
                                                        {
                                                            dato.ambulancia
                                                                .cod_ambulancia
                                                        }
                                                    </div>
                                                ) : (
                                                    '(En blanco)'
                                                )}
                                            </h3>
                                        </Col>
                                    </Row>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.cedula'
                                            )}
                                        </Col>
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.estatus'
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.num_doc}
                                            </h3>
                                        </Col>
                                        <Col>
                                            <div>
                                                <h3 className="py-2">
                                                    {dato.tipo_traslado != null
                                                        ? dato.tipo_traslado
                                                        : '(En blanco)'}
                                                </h3>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.nombrerecibe'
                                            )}
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.nombre_recibe != null
                                                    ? dato.nombre_recibe
                                                    : '(En blanco)'}
                                            </h3>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.hospitalrecibe'
                                            )}
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.destino_nombre_hospital !=
                                                null
                                                    ? dato.destino_nombre_hospital
                                                    : '(En blanco)'}
                                            </h3>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row
                                        className="text-white"
                                        style={{ backgroundColor: '#073c53' }}
                                    >
                                        <Col>
                                            {t(
                                                'interhospital.cola.datos.telrecibe'
                                            )}
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3 className="py-2">
                                                {dato.destino_telefono != null
                                                    ? dato.destino_telefono
                                                    : '(En blanco)'}
                                            </h3>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ColaPreh;
