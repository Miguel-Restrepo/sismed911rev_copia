import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Icofont from 'react-icofont';
import Modal from 'react-bootstrap/Modal'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

import InputMask from 'react-input-mask';
import { useEffect, useState } from "react";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import "react-datepicker/dist/react-datepicker.css";
import Picker from 'rc-picker';
import 'rc-picker/assets/index.css';
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next"
const FormularioHospital = (params) => {
    const [t, i18n] = useTranslation("global");
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [hospitals, sethospitals] = useState([]);
    const [hospital, sethospital] = useState("");
    const [idhospital, setIdhospital] = useState("");
    const [hospitalTemp, sethospitalTemp] = useState("");
    const [idhospitalTemp, setIdhospitalTemp] = useState("");
    const [startDate, setStartDate] = useState(params.formHospital.hora_seleccion_hospital);
    const GetHospitales = () => {
        axios.get('/api/hospitalesgeneral')
            .then(response => {
                sethospitals(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }
    useEffect(() => {
        GetHospitales();


    }, []);
    const { SearchBar } = Search;
    //TABLA hospital
    const columns =
        [{
            dataField: 'nombre_hospital',
            text: `${t("formularios.formhospital.hospital")}`,
            sort: true
        }];
    const options = {
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
        totalSize: hospitals.length
    };
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {


            sethospitalTemp(row.nombre_hospital);
            setIdhospitalTemp(row.id_hospital);
        }
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_hospital"
                columns={columns}
                data={hospitals}
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
                                selectRow={selectRow}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>

    );
    const handleChangeHospital = e => {
        e.persist();
        params.setFormHospital(
            prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )
    }
    useEffect(() => {
        sethospital("");
        hospitals.map(hospital =>{
            if(params.formHospital.hospital_destino==hospital.id_hospital){

                let pertenece="";
                if(hospital.nombre_dpto!=null)
                {
                    pertenece=" Región: "+hospital.nombre_dpto+",";
                }
                if(hospital.nombre_provincia!=null)
                {
                    pertenece=pertenece+" Provincia: "+hospital.nombre_provincia+",";
                }
                if(hospital.nombre_provincia!=null)
                {
                    pertenece=pertenece+" Distrito: "+hospital.nombre_provincia+",";
                }
                if(hospital.nombre_dpto!=null || hospital.nombre_provincia!=null || hospital.nombre_provincia!=null){

                    pertenece=pertenece.substring(0,pertenece.length-1);
                    sethospital(hospital.nombre_hospital+pertenece);
                }else{
                    sethospital(hospital.nombre_hospital);
                }
               }
        }

        )
        if(params.formHospital.hora_seleccion_hospital!=null && params.formHospital.hora_seleccion_hospital!='')
        {
            setStartDate(new Date(params.formHospital.hora_seleccion_hospital));
        }

    }, [params.formHospital.hospital_destino])

    useEffect(() => {
        params.setFormHospital(
            prevState => ({
                ...prevState,
                hora_seleccion_hospital: startDate
            })
        )
    }, [startDate])

    return (
        <div>
            {params.formHospital.cod_casopreh!= "" ?<Form>

                <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInputGroup">
                        <strong>{t("formularios.formhospital.hptldestino")}
                        </strong></Form.Label>
                    <InputGroup className="mb-2">

                        <Form.Control id="inlineFormInputGroup" placeholder={`${t("formularios.formhospital.hptldestino")}`}
                            name="hospital_destino" disabled value={hospital}
                            onChange={handleChangeHospital} />
                        <InputGroup.Text>
                            <Icofont icon="ui-search" className="mx-2" onClick={handleShow2} />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
                <Form.Group as={Col} xs="auto" >

                    <Row>
                        <Col>
                            <Form.Label>
                                <strong>{t("formularios.formhospital.hasignacion")}</strong>
                            </Form.Label>
                        </Col>

                    </Row>
                        <InputGroup className="mb-2">
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    disabled
                                    onChange={(date) => setStartDate(date)}
                                    timeInputLabel={`${t("etiquetas.hora")}`}
                                    dateFormat="yyyy/MM/dd h:mm:ss"
                                    showTimeInput
                                    customInput={<Form.Control />}
                                    name="hora_seleccion_hospital"
                                />
                            </div>

                        </InputGroup>
                </Form.Group>

                <Row className="mb-3">

                    <Form.Group as={Col} >
                        <Form.Label><strong>{t("formularios.formhospital.nombremedico")}</strong></Form.Label>
                        <Form.Control type="text" placeholder={`${t("formularios.formhospital.nombremedico")}`} value={params.formHospital.nombre_medico} name="nombre_medico" onChange={handleChangeHospital} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label><strong>{t("formularios.formhospital.telmedico")}</strong></Form.Label>
                        <Form.Control type="number" placeholder={`${t("formularios.formhospital.telmedico")}`} value={params.formHospital.telefono} name="telefono" onChange={handleChangeHospital} />
                    </Form.Group>

                </Row>
            </Form> : ""}
            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t("formularios.formhospital.selecthptl")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PaginationProvider pagination={paginationFactory(options)}>
                        {contentTable}
                    </PaginationProvider>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        sethospital(hospitalTemp);
                        setIdhospital(idhospitalTemp);
                        params.setFormHospital(
                            prevState => ({
                                ...prevState,
                                hospital_destino: idhospitalTemp

                            })
                        );
                        setStartDate(new Date());
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
    );
};

export default FormularioHospital;
