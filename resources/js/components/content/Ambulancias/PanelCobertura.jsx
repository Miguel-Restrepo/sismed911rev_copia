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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import chroma from "chroma-js";
import Mapa from "./Mapa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const PanelCobertura = () => {
  const [t, i18n] = useTranslation("global");


  const [dataRegiones, setDataRegiones] = useState([]);
  const [dataTotales, setDataTotales] = useState([]);
  const [dataTabla, setDataTabla] = useState([]);
  const [dataTotalAsistencias, setDataTotalAsistencias] = useState([]);

  const [fechaInicio, setFechaInicio] = useState('2001-04-01');
  const [fechaFin, setFechaFin] = useState('2022-04-01');
  const [dataPorcentajeCubierta, setDataPorcentajeCubierta] = useState([]);
  const [dataPreposicionesTabla, setDataPreposicionesTabla] = useState([]);
  //const [dataMotivoSalida, setDataMotivoSalida] = useState([]);
  const [dataUbicacionPreposiciones, setDataUbicacionPreposiciones] = useState([]);
  const colors = chroma.scale('Spectral').colors(32);
  const [SRS, setSRS] = useState(0);
  const [filtroSRS, setFiltroSRS] = useState([]);
  const [codigo, setCodigo] = useState(0);
  const [codigos, setCodigos] = useState([]);
  const GetSRS = () => {
    axios.get('/api/distrito')
      .then(response => {
        setFiltroSRS(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })
    axios.get('api/ambulancias/codigos')
      .then(response => {
        setCodigos(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })
  }


  const [dataMotivoSalida, setDataMotivoSalida] = useState({
    datasets: [
      {
        label: 'Motivo Salida',
        data: [],
        borderColor: colors,
        backgroundColor: colors,
      },
    ],
  })



  let optionsMotivoSalida = {
    parsing: {
      yAxisKey: 'name',
      xAxisKey: 'value'
    },
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };




  const PostPorcentajeCubierta = async (fechaInicio, fechaFin, SRS, codigo) => {

    await axios.post('api/estadisticas/interh/porcentaje_cubierta', null, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        SRS: SRS,
        codigo: codigo
      }
    })
      .then(response => {
        setDataPorcentajeCubierta(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })

  }

  const PostPreposicionesTabla = async (fechaInicio, fechaFin, SRS, codigo) => {

    await axios.post('api/estadisticas/interh/preposiciones_tabla', null, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        SRS: SRS,
        codigo: codigo
      }
    })
      .then(response => {
        setDataPreposicionesTabla(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })

  }

  const PostMotivoSalida = async (fechaInicio, fechaFin, SRS, codigo) => {

    await axios.post('api/estadisticas/interh/motivo_salida', null, {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        SRS: SRS,
        codigo: codigo
      }
    })
      .then(response => {
        //setDataMotivoSalida(response.data);
        setDataMotivoSalida({
          datasets: [
            {
              label: 'Motivos',
              data: response.data,
              borderColor: colors,
              backgroundColor: colors
            },
          ],
        });
        return response.data;
      })
      .catch(error => {
        return error;
      })

  }



  //Route::post('estadisticas/interh/porcentaje_cubierta','porcentaje_cubierta');
  //Route::post('estadisticas/interh/preposiciones_tabla','preposiciones_tabla');
  //Route::post('estadisticas/interh/motivo_salida','motivo_salida');
  //Route::post('estadisticas/interh/ubicacion_preposiciones','ubicacion_preposiciones');


  const { SearchBar } = Search;

  const columns = [{
    dataField: 'fecha_reg',
    text: `${t("ambulancias.panelcobertura.fecha")}`,
    sort: true
  }, {
    dataField: 'nombre',
    text: `${t("ambulancias.panelcobertura.preposicion")}`,
    sort: true
  }, {
    dataField: 'cod_ambulancias',
    text: `${t("ambulancias.panelcobertura.unidad")}`,
    sort: true
  }, {
    dataField: 'nombre1',
    text: `${t("ambulancias.panelcobertura.supervisor")}`,
    formatter: (cell, row) => {
      return (
        <div>{`
            ${row.nombre1 != null ? row.nombre1 : ''}
            ${row.apellido1 != null ? row.apellido1 : ''}`}
        </div>);
    },
    sort: true
  }, {
    dataField: 'nombre_motsalida',
    text: `${t("ambulancias.panelcobertura.motivouni")}`,
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
        keyField="fecha_reg"
        columns={columns}
        data={dataPreposicionesTabla}
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

    PostPorcentajeCubierta(fechaInicio, fechaFin, SRS, codigo);
    PostPreposicionesTabla(fechaInicio, fechaFin, SRS, codigo);
    PostMotivoSalida(fechaInicio, fechaFin, SRS, codigo);
    GetSRS();

  }, []);
  useEffect(() => {

    PostPorcentajeCubierta(fechaInicio, fechaFin, SRS, codigo);
    PostPreposicionesTabla(fechaInicio, fechaFin, SRS, codigo);
    PostMotivoSalida(fechaInicio, fechaFin, SRS, codigo);


  }, [fechaInicio, fechaFin, codigo, SRS]);



  return (
    <Container fluid>

      <Row className='pb-4'>

        <Col>
          <Card className='h-100'>
            <Card.Body>
              <h2 className='d-flex justify-content-center py-4' style={{ color: '#073c53' }}>{t("ambulancias.panelcobertura.coberturanacional")}</h2>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      <Row className='pb-4'>


        <Col xs={2}>
          <Card className='mb-1 h-100' style={{ border: "3px solid #176b82", borderRadius: "20px", backgroundColor: "#073c53" }}>
            <Card.Body>
              <Form>
                <Row className='text-white'>

                  <Form.Group as={Col} >
                    <Form.Label><strong>{t("ambulancias.panelcobertura.fechaini")}</strong></Form.Label>
                    <Form.Control type="date" value={fechaInicio} name="fecha_inicio"
                      onChange={e => {
                        setFechaInicio(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} >
                    <Form.Label><strong>{t("ambulancias.panelcobertura.fechafin")}</strong></Form.Label>
                    <Form.Control type="date" value={fechaFin} name="fecha_fin"
                      onChange={e => {
                        setFechaFin(e.target.value);
                      }}

                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} >
                    <Form.Label><strong>{t("ambulancias.panelcobertura.provincia")}</strong></Form.Label>
                    <Form.Control as="select" onChange={e => {
                      setSRS(e.target.value);
                    }}>
                      <option value="0" key="852147852">{t("ambulancias.panelcobertura.todas")}</option>

                      {filtroSRS.map(elemento => (
                        <option key={elemento.nombre_distrito} value={elemento.cod_distrito}>{elemento.nombre_distrito}</option>
                      ))}

                    </Form.Control>
                  </Form.Group>
                  {false && <Form.Group as={Col} xs={12}>
                    <Form.Label><strong>{t("ambulancias.panelcobertura.ultimos")}</strong></Form.Label>
                    <Form.Control as="select" >
                      <option value="">{t("ambulancias.panelcobertura.todas")}</option>

                    </Form.Control>
                  </Form.Group>}
                  <Form.Group as={Col} xs={12}>
                    <Form.Label><strong>{t("ambulancias.panelcobertura.codigo")}</strong></Form.Label>
                    <Form.Control as="select" onChange={e => {
                      setCodigo(e.target.value);
                    }}>
                      <option value="0" key="25845185">{t("ambulancias.panelcobertura.todas")}</option>

                      {codigos.map(elemento => (
                        <option key={elemento.cod_ambulancias} value={elemento.cod_ambulancias}>{elemento.cod_ambulancias}</option>
                      ))}

                    </Form.Control>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className='mb-1 h-100'>
            <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelcobertura.preposiciones")}</Card.Header>
            <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>

              <Container fluid>

                <div>
                  <Card className='mb-1'>
                    <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53' }}>{t("ambulancias.panelcobertura.porcentajedes")}</Card.Header>
                    <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                      {dataPorcentajeCubierta.length > 0 &&
                        <h2 className='d-flex justify-content-center'>
                          {dataPorcentajeCubierta[0].porcentaje_no_cubiertas}
                        </h2>
                      }
                    </Card.Body>
                  </Card>
                  <Card className='mb-1'>
                    <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53' }}>{t("ambulancias.panelcobertura.porcentajecu")}</Card.Header>
                    <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
                      {dataPorcentajeCubierta.length > 0 &&
                        <h2 className='d-flex justify-content-center'>
                          {dataPorcentajeCubierta[0].porcentaje_cubiertas}
                        </h2>
                      }
                    </Card.Body>
                  </Card>
                </div>

              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Card className='mb-1 h-100'>
            <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelcobertura.preposiciones")}</Card.Header>
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


      </Row>
      <Row className='pb-4'>


        <Col xs={6}>
          <Card className='mb-1 h-100'>
            <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelcobertura.motivoserv")}</Card.Header>
            <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>

              <Container fluid>
                <Bar options={optionsMotivoSalida} data={dataMotivoSalida} />
              </Container>

            </Card.Body>
          </Card>
        </Col>

        <Col xs={6}>
          <Card className='mb-1 h-100'>
            <Card.Header as="h6" style={{ color: '#FFFFFF', backgroundColor: '#073c53', textAlign: 'center' }}>{t("ambulancias.panelcobertura.ubicacion")}</Card.Header>
            <Card.Body className='d-flex justify-content-center' style={{ alignItems: 'center' }}>
              <Container fluid>
                <Row>
                  <Mapa />
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>

      </Row>


    </Container>
  );


}

export default PanelCobertura;
