import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, TimeSeriesScale, PointElement, LineElement, Title, ArcElement, Tooltip as Tooltip1, Legend as Legend1 } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from "react-i18next"
import 'chartjs-adapter-luxon';

import chroma from "chroma-js";

import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, FunnelChart, Funnel, LabelList, } from "recharts";
import { DateTime } from "luxon";
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    TimeSeriesScale,
    PointElement,
    LineElement,
    Title,
    Tooltip1,
    Legend1
);

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>

            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 5}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
                fontSize="smaller"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};




const TrasladoPreh = () => {

    const [t, i18n] = useTranslation("global");

    const [fechaInicio, setFechaInicio] = useState('2001-04-01');
    const [fechaFin, setFechaFin] = useState('2022-04-01');
    const [SRS, setSRS] = useState(0);
    const [filtroSRS, setFiltroSRS] = useState([]);
    const GetSRS = () => {
        axios.get('/api/distrito')
            .then(response => {
                setFiltroSRS(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    //Paired, Set1, Dark2, Spectral
    const colors = chroma.scale('Spectral').colors(50);


    //const [dataAsistenciaPrestada, setDataAsistenciaPrestada] = useState([]);
    const [dataMotivoTraslado, setDataMotivoTraslado] = useState([]);
    const [dataTipoPx, setDataTipoPx] = useState([]);
    const [dataNacionalidad, setDataNacionalidad] = useState([]);
    const [dataSegunCondicion, setDataSegunCondicion] = useState([]);
    const [dataTotales, setDataTotales] = useState(null);

    const [activeIndexMotivoTraslado, setActiveIndexMotivoTraslado] = useState([]);
    const [activeIndexTipoPx, setActiveIndexTipoPx] = useState([]);

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

    const PostAsistenciaPrestada = async (fechaInicio, fechaFin,SRS) => {

        await axios.post('api/estadisticas/preh/asistencia_prestada', null, {
            params: {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                SRS:SRS
            }
        })
            .then(response => {
                //setDataAsistenciaPrestada(response.data);


                setDataAsistenciaPrestada({
                    datasets: [
                        {
                            label: 'Casos',
                            data: response.data,
                            borderColor: colors[0],
                            backgroundColor: colors[0],
                            tension: 0.2
                        },
                    ],
                });


                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    const PostSegunCondicion = async (fechaInicio, fechaFin,SRS) => {

        await axios.post('api/estadisticas/preh/segun_incidente', null, {
            params: {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                SRS:SRS
            }
        })
            .then(response => {
                setDataSegunCondicion(response.data);

                return response.data;
            })
            .catch(error => {
                return error;
            })

    }

    const PostMotivoTraslado = async (fechaInicio, fechaFin,SRS) => {

        await axios.post('api/estadisticas/preh/motivo_traslado', null, {
            params: {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                SRS:SRS
            }
        })
            .then(response => {
                setActiveIndexMotivoTraslado([...Array(response.data.length).keys()]);
                setDataMotivoTraslado(response.data);

                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    const PostNacionalidad = async (fechaInicio, fechaFin,SRS) => {

        await axios.post('api/estadisticas/preh/nacionalidad', null, {
            params: {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                SRS:SRS
            }
        })
            .then(response => {
                setDataNacionalidad(response.data);

                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    const PostTipoPx = async (fechaInicio, fechaFin,SRS) => {

        await axios.post('api/estadisticas/preh/tipo_px', null, {
            params: {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                SRS:SRS
            }
        })
            .then(response => {
                setActiveIndexTipoPx([...Array(response.data.length).keys()]);
                setDataTipoPx(response.data);

                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    const PostTotales = async (fechaInicio, fechaFin,SRS) => {

        await axios.post('api/estadisticas/preh/totales', null, {
            params: {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                SRS:SRS
            }
        })
            .then(response => {
                setDataTotales(response.data);

                return response.data;
            })
            .catch(error => {
                return error;
            })

    }


    const [dataAsistenciaPrestada, setDataAsistenciaPrestada] = useState({
        datasets: [
            {
                label: 'Asistencias',
                data: [{ fecha: "2022-03-15", count: 1 }, { fecha: "2022-03-18", count: 23 }, { fecha: "2022-07-15", count: 26 }],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.3
            },
        ],
    })



    let optionsAsistenciaPrestada = {
        parsing: {
            xAxisKey: 'name',
            yAxisKey: 'value'
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            }
        }
    }


    useEffect(() => {
        GetSRS();
        //PostAsistenciaPrestada('2000-04-1', '2022-04-1');
        //PostSegunCondicion('2000-04-1', '2022-04-1');
        //PostMotivoTraslado('2000-04-1', '2022-04-1');
        //PostNacionalidad('2000-04-1', '2022-04-1');
        //PostTipoPx('2000-04-1', '2022-04-1');
        //PostTotales('2000-04-1', '2022-04-1');

    }, []);
    useEffect(() => {
        PostAsistenciaPrestada(fechaInicio, fechaFin,SRS);
        PostMotivoTraslado(fechaInicio, fechaFin,SRS);
        PostTipoPx(fechaInicio, fechaFin,SRS);
        PostNacionalidad(fechaInicio, fechaFin,SRS);
        PostSegunCondicion(fechaInicio, fechaFin,SRS);
        PostTotales(fechaInicio, fechaFin,SRS);

    }, [fechaInicio,fechaFin,SRS]);
    return (
        <Container fluid>
            <Row className='pb-4'>
                <Col xs={5}>
                    <Card style={{ border: "3px solid #176b82", borderRadius: "20px", backgroundColor: "#073c53" }}>
                        <Card.Body>
                            <Form>
                                <Row className='text-white'>
                                    <Form.Group as={Col} >
                                        <Form.Label><strong>{t("interhospital.trasladointerh.fechaini")}</strong></Form.Label>
                                        <Form.Control type="date" value={fechaInicio} name="fecha_inicio"
                                            onChange={e => {
                                                setFechaInicio(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label><strong>{t("interhospital.trasladointerh.fechafin")}</strong></Form.Label>
                                        <Form.Control type="date" value={fechaFin} name="fecha_fin"
                                            onChange={e => {
                                                setFechaFin(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label><strong>{t("interhospital.trasladointerh.filtrosrs")}</strong></Form.Label>
                                        <Form.Control as="select"  onChange={e => {
                                                setSRS(e.target.value);
                                            }}>
                                            <option value="">{t("interhospital.trasladointerh.todas")}</option>
                                            {filtroSRS.map(elemento => (
                                                <option key={elemento.nombre_distrito} value={elemento.cod_distrito}>{elemento.nombre_distrito}</option>
                                            ))}


                                        </Form.Control>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={7}>
                    <Card className='h-100'>
                        <Card.Body>
                            <h2 className='d-flex justify-content-center py-4' style={{ color: '#073c53' }}>Traslados-Pre-Hospital</h2>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className='pb-4'>

                <Col xs={5}>
                    <Card className="h-100">
                        <Card.Header>{t("interhospital.trasladointerh.trasladosincidente")}</Card.Header>
                        <Card.Body className="h-100">
                            <ResponsiveContainer width="90%" height={400}>
                                <FunnelChart >
                                    <Tooltip />
                                    <Funnel
                                        dataKey="value"
                                        data={dataSegunCondicion}
                                        isAnimationActive
                                    >
                                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                                        {
                                            dataSegunCondicion.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index]} />
                                            ))
                                        }
                                    </Funnel>
                                </FunnelChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={5}>
                    <Card className="h-100">
                        <Card.Header>{t("interhospital.trasladointerh.nacionalidad")}</Card.Header>
                        <Card.Body>
                            <ResponsiveContainer width="95%" height={400}>
                                <BarChart
                                    width='100%'
                                    height='100%'
                                    data={dataNacionalidad}
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
                                            dataNacionalidad.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index]} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={2}>
                    <Card>
                        <Card.Header>{t("interhospital.trasladointerh.totales")}</Card.Header>
                        <Card.Body>
                            {dataTotales!= null &&
                                <div>
                                    <Card className='mb-1'>
                                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53' }}>{t("interhospital.trasladointerh.totalasistencias")}</Card.Header>
                                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                            <h5 className='text-center'>{dataTotales.total_asistencia}</h5>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-1'>
                                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53' }}>Total {t("interhospital.trasladointerh.totaltraslados")}</Card.Header>
                                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                            <h5 className='text-center'>{dataTotales.completados}</h5>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-1'>
                                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53' }}>Llamada molestosa</Card.Header>
                                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                            <h5 className='text-center'>{dataTotales.llamadas}</h5>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-1'>
                                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53' }}>{t("interhospital.trasladointerh.fallecidos")}</Card.Header>
                                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                            <h5 className='text-center'>{dataTotales.fallecidos}</h5>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-1'>
                                        <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53' }}>{t("interhospital.trasladointerh.trasladopcte")}</Card.Header>
                                        <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                                            <h5 className='text-center'>{dataTotales.traslado_paciente}</h5>
                                        </Card.Body>
                                    </Card>
                                </div>
                            }
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className='pb-4'>

                <Col xs={6}>
                    <Card >
                        <Card.Header>{t("interhospital.trasladointerh.motivo")}</Card.Header>

                        <Card.Body className='p-1'>


                            <ResponsiveContainer width="95%" height={400}>

                                <PieChart>
                                    <Legend layout="vertical" verticalAlign="middle" align="left" />
                                    <Pie
                                        activeIndex={activeIndexMotivoTraslado}
                                        activeShape={renderActiveShape}
                                        data={dataMotivoTraslado}
                                        cx="52%"
                                        cy="50%"
                                        innerRadius={0}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {
                                            dataMotivoTraslado.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index]} />
                                            ))
                                        }
                                    </Pie>
                                </PieChart>

                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>


                <Col xs={6}>
                    <Card>
                        <Card.Header>{t("interhospital.trasladointerh.tipopx")}</Card.Header>
                        <Card.Body className='p-1'>

                            <ResponsiveContainer width="95%" height={400}>

                                <PieChart width='100%' height='100%'>
                                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                                    <Pie
                                        activeIndex={activeIndexTipoPx}
                                        activeShape={renderActiveShape}
                                        data={dataTipoPx}
                                        cx="52%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {
                                            dataTipoPx.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index]} />
                                            ))
                                        }
                                    </Pie>
                                </PieChart>

                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='pb-4 pr-0 mr-0' style={{ maxWidth: "101%" }}>
                <Col className='mr-0'>
                    <Card>
                        <Card.Header>{t("interhospital.trasladointerh.asistencias")}</Card.Header>
                        <Card.Body>
                            <Line data={dataAsistenciaPrestada} options={optionsAsistenciaPrestada} />
                        </Card.Body>
                    </Card>
                </Col>


            </Row>

        </Container>
    );

}


export default TrasladoPreh;
