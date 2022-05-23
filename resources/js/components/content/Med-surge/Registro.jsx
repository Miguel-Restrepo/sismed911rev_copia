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
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set } from 'lodash';
import PhoneInput from 'react-phone-input-2'
import { DateTime } from "luxon"
import { useTranslation } from "react-i18next"
import ServiceConfig from '../config/service';
const Registro = () => {
  const [t, i18n] = useTranslation("global");
  const [hospitales, setHospitales] = useState([]);
  const [hospital, setHospital] = useState("");
  const [idHospital, setIdHospital] = useState("");
  const [hospitalTemp, setHospitalTemp] = useState("");
  const [idHospitalTemp, setIdHospitalTemp] = useState("");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [chose, setChose] = useState('');

  const [form, setForm] = useState({
    id_hospital: '',
    fecha_reporte: DateTime.now().set({ milliseconds: 0 }).toISO({ suppressMilliseconds: true }),
    nombre_reporta: '',
    tele_reporta: '',
    id_bloque: ''
  });

  const clearform = () => setForm({
    id_hospital: '',
    fecha_reporte: DateTime.now().set({ milliseconds: 0 }).toISO({ suppressMilliseconds: true }),
    nombre_reporta: '',
    tele_reporta: '',
    id_bloque: ''
  })
  const clearUci = () => setUci({
    ocupadas: '',
    sin_servicio: '',
    libres: '',
    id_camas: ''
  })
  const clearHosptlz = () => setHosptlz({
    ocupadas: '',
    sin_servicio: '',
    libres: '',
    id_camas: ''
  })
  const clearPediatria = () => setPediatria({
    ocupadas: '',
    sin_servicio: '',
    libres: '',
    id_camas: ''
  })

  const [uci, setUci] = useState({
    ocupadas: '',
    sin_servicio: '',
    libres: '',
    id_camas: ''
  });

  const [hosptlz, setHosptlz] = useState({
    ocupadas: '',
    sin_servicio: '',
    libres: '',
    id_camas: ''
  });

  const [pediatria, setPediatria] = useState({
    ocupadas: '',
    sin_servicio: '',
    libres: '',
    id_camas: ''
  });



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

  const GetBloques = () => {
    axios.get(`/api/bloque_div`)
      .then(response => {

        const ds = response.data.filter(e => e.activo === true)
        setChose({
          id: ds[0].id,
          bloque: ds[0].bloque,
          fecha_creacion: ds[0].fecha_creacion,
          activo: ds[0].activo
        })
        setForm(prevState => ({
          ...prevState,
          id_bloque: ds[0].id
        }));
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

  const handleChangeUci = e => {
    e.persist();
    setUci(
      prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      })
    )


  }
  const handleChangeHos = e => {
    e.persist();
    setHosptlz(
      prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      })
    )


  }
  const handleChangePe = e => {
    e.persist();
    setPediatria(
      prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      })
    )


  }

  const Post = async () => {
    await axios.post('/api/censo_Camas', form)
      .then(response => {
        clearform()
        setUci(prevState => ({
          ...prevState,
          id_camas: response.data.id_camas
        }));
        setHosptlz(prevState => ({
          ...prevState,
          id_camas: response.data.id_camas
        }));
        setPediatria(prevState => ({
          ...prevState,
          id_camas: response.data.id_camas
        }));
        setForm()
        return response.data;
      })
      .catch(error => {

        return error.response.data;
      })

    axios.post('/api/camas_uci', uci)
      .then(response => {
        clearUci()
        return response.data;
      })
      .catch(error => {

        return error.response.data;
      })
    axios.post('/api/camas_hosptlz', hosptlz)
      .then(response => {
        clearHosptlz()
        return response.data;
      })
      .catch(error => {

        return error.response.data;
      })
    axios.post('/api/camas_pedtria', pediatria)
      .then(response => {
        clearPediatria()
        return response.data;
      })
      .catch(error => {

        return error.response.data;
      })
  }


  useEffect(() => {
    GetBloques()
    GetHospital()
  }, []);

  useEffect(() => {
    setForm(prevState => ({
      ...prevState,
      id_hospital: idHospital
    }));

  }, [hospital, idHospital])


  const { SearchBar } = Search;
  const columns1 =
    [{
      text: '',
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
        <h2>{t("medsurge.registro.titulo")}o</h2>
      </div>
      <div>
        <Form className='m-xxl-4'>
          <Form.Group as={Row} className="mb-3" controlId="formcodigo">
            <Form.Label column sm="2">
              {t("medsurge.registro.datos.fecha")}
            </Form.Label>
            <Col sm={4} >
              <Form.Control plaintext readOnly defaultValue={chose.fecha_creacion} name="fecha_reporte" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              {t("medsurge.registro.datos.hospital")}
            </Form.Label>
            <Col sm={5}>
              <InputGroup className="mb-2" >
                <Form.Control id="x"
                  placeholder={`-- ${t("etiquetas.seleccionhptl")} --`}
                  disabled
                  value={hospital}
                  name="hospital"
                />
                <Button variant="outline-secondary" id="button-search" onClick={handleShow2}>
                  <Icofont icon="ui-search" className="mx-2" />
                </Button>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formcodigo">
            <Form.Label column sm="2">
              {t("medsurge.registro.datos.nombreres")}
            </Form.Label>
            <Col sm={4} >
              <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.nombreres")}`} value={form.nombre_reporta} onChange={handleChange} name="nombre_reporta" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="Telefono">
            <Form.Label column sm={2}>
              {t("medsurge.registro.datos.telefono")}
            </Form.Label>
            <Col sm={4}>
              <PhoneInput
                containerClass="mx-0"
                inputClass="mx-0"
                country={ServiceConfig.codgoPais}
                value={form.tele_reporta}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formcodigo">
            <Form.Label column sm="2">
              {t("medsurge.registro.datos.id")}
            </Form.Label>
            <Col sm={4} >
              <Form.Control plaintext readOnly defaultValue={chose.id} name="id_bloque" />
            </Col>
          </Form.Group>


          <Col className='mb-xxl-5 opcionasd' sm='5' >
            <h3>{t("medsurge.registro.datos.camasuci")} </h3>
            <Row sm='4'>
              <Col sm={3} className="my-1">
                <Form.Label sm="2">
                  {t("medsurge.registro.datos.ocupadas")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.ocupadas")}`} value={uci.ocupadas} onChange={handleChangeUci} name="ocupadas" />
              </Col>

              <Col sm={3} className="my-1">
                <Form.Label sm="2">
                  {t("medsurge.registro.datos.libres")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.libres")}`} value={uci.libres} onChange={handleChangeUci} name="libres" />
              </Col>
              <Col sm={3} className="my-1">
                <Form.Label sm="3">
                  {t("medsurge.registro.datos.noservicio")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.noservicio")}`} value={uci.sin_servicio} onChange={handleChangeUci} name="sin_servicio" />
              </Col>
            </Row>
          </Col>

          <Col className='mb-xxl-5 opcionasd' sm='5' >
            <h3>{t("medsurge.registro.datos.camashptlz")} </h3>
            <Row sm='4'>
              <Col sm={3} className="my-1">
                <Form.Label sm="2">
                  {t("medsurge.registro.datos.ocupadas")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.ocupadas")}`} name="ocupadas" value={hosptlz.ocupadas} onChange={handleChangeHos} />
              </Col>

              <Col sm={3} className="my-1">
                <Form.Label sm="2">
                  {t("medsurge.registro.datos.libres")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.libres")}`} name="libres" value={hosptlz.libres} onChange={handleChangeHos} />
              </Col>
              <Col sm={3} className="my-1">
                <Form.Label sm="3">
                  {t("medsurge.registro.datos.noservicio")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.noservicio")}`} name="sin_servicio" value={hosptlz.sin_servicio} onChange={handleChangeHos} />
              </Col>
            </Row>
          </Col>

          <Col className='mb-xxl-5 opcionasd' sm='5'>
            <h3>{t("medsurge.registro.datos.camasped")}</h3>
            <Row sm='4'>
              <Col sm={3} className="my-1">
                <Form.Label sm="2">
                  {t("medsurge.registro.datos.ocupadas")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.ocupadas")}`} name="ocupadas" value={pediatria.ocupadas} onChange={handleChangePe} />
              </Col>

              <Col sm={3} className="my-1">
                <Form.Label sm="2">
                  {t("medsurge.registro.datos.libres")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.libres")}`} name="libres" value={pediatria.libres} onChange={handleChangePe} />
              </Col>
              <Col sm={3} className="my-1">
                <Form.Label sm="3">
                  {t("medsurge.registro.datos.noservicio")}
                </Form.Label>
                <Form.Control type='text' placeholder={`${t("medsurge.registro.datos.noservicio")}`} name="sin_servicio" value={pediatria.sin_servicio} onChange={handleChangePe} />
              </Col>
            </Row>
          </Col>

          <Button variant="primary" className='m-xxl-4' onClick={() => {
            Post()
          }}>
            {t("etiquetas.agregar")}
          </Button>
        </Form>

        <Modal show={show2} onHide={handleClose2} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{t("medsurge.registro.datos.hospital")} </Modal.Title>
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

export default Registro;
