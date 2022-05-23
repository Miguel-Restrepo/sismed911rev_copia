import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import Formularios from "../InterHospital/Formularios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icofont from 'react-icofont';
import { faMapMarkedAlt, faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormCheck from 'react-bootstrap/FormCheck'
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { DateTime } from "luxon"
import PhoneInput from 'react-phone-input-2'
//import 'react-phone-input-2/lib/style.css'
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function FormularioKamban(params) {

    const [t, i18n] = useTranslation("global");
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [ventanaCamas, setVentanaCamas] = useState(false);
    const cerrarVentanaCamas = () => setVentanaCamas(false);
    const abrirVentanaCamas = () => setVentanaCamas(true);
    const [EspecialidadTemp, setEspecialidadTemp] = useState("");
    const [Especialidad, setEspecialidad] = useState("");
    const [idEspecialidadTemp, setIdEspecialidadTemp] = useState("");
    const [procedimientos, setProcedimientos] = useState([]);
    const [camas, setCama] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
    const [c4, setC4] = useState(false);
    const [c5, setC5] = useState(false);

    const [form2, setForm2] = useState({
        necesidad: '',
        hospitalizado_reciente: 2,
        id_riesgo: '',
        no_cama: '',
        procedimientos_sala: '',
        id_salaatencionmedica: '',
        especialidad: ''
    });




    const GetProcedimientos = () => {
        axios.get('/api/procedimientos')
            .then(response => {
                setProcedimientos(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }
    const GetEspecialidades = () => {
        axios.get('/api/especialidad')
            .then(response => {
                setEspecialidades(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }

    const GetCamas = () => {
        axios.get('/api/cama')
            .then(response => {
                setCama(response.data);
                return response.data;
            })
            .catch(error => {
                return error;
            })
    }



    const handleChange1 = e => {
        e.persist();
        setForm2(
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
    const PostKamban = () => {
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
        setForm2(
            prevState => ({
                ...prevState,
                id_riesgo: necesidades
            })
        );
        axios.post('/api/monitoreo', {
            necesidad: form2.necesidad,
            hospitalizado_reciente: form2.hospitalizado_reciente,
            id_riesgo: necesidades,
            no_cama: form2.no_cama,
            procedimientos_sala: form2.procedimientos_sala,
            id_salaatencionmedica: form2.id_salaatencionmedica,
            especialidad: form2.especialidad
        })
            .then(response => {
                notificarExitoCaso(response.data.id);
                /* setMostrarFormulario(true);
                 (
                     prevState => ({
                         ...prevState,
                         id_paciente: response.data.id_paciente
                     })
                 )*/
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
               return error.response.data;
            })
    }
    useEffect(() => {
        GetEspecialidades();
        GetProcedimientos();
        GetCamas();
    }, []);
    useEffect(() => {
        if (params.monitoreo != null) {
            if (params.monitoreo.id_riesgo != null) {
                let id_riesgo = params.monitoreo.id_riesgo.substring(1, params.monitoreo.id_riesgo.length - 1);
                let id_riesgos = id_riesgo.split(",");
                id_riesgos.forEach(element => {
                    if (element == "1") {
                        setC1(true);
                    } else if (element == "2") {
                        setC2(true);
                    } else if (element == "3") {
                        setC3(true);
                    } else if (element == "4") {
                        setC4(true);
                    } else if (element == "5") {
                        setC5(true);
                    }
                });
            }

            setForm2(
                prevState => ({
                    ...prevState,
                    necesidad: params.monitoreo.necesidad != null ? params.monitoreo.necesidad : "",
                    hospitalizado_reciente: params.monitoreo.hospitalizado_reciente != null ? params.monitoreo.hospitalizado_reciente : "",
                    id_riesgo: params.monitoreo.id_riesgo != null ? params.monitoreo.id_riesgo : "",
                    no_cama: params.monitoreo.no_cama != null ? params.monitoreo.no_cama : "",
                    procedimientos_sala: params.monitoreo.procedimientos_sala != null ? params.monitoreo.procedimientos_sala : "",
                    id_salaatencionmedica: params.monitoreo.id_salaatencionmedica,
                    especialidad: params.monitoreo.especialidad != null ? params.monitoreo.especialidad : ""
                })
            );
        } else {
            setC1(false);
            setC2(false);
            setC3(false);
            setC4(false);
            setC5(false);
            setForm2(
                prevState => ({
                    ...prevState,
                    necesidad: "",
                    hospitalizado_reciente: "",
                    id_riesgo: "",
                    no_cama: "",
                    procedimientos_sala: "",
                    id_salaatencionmedica: params.codigo,
                    especialidad: ""
                })
            );
        }


    }, [params.monitoreo]);

    const { SearchBar } = Search;
    //TABLA especialidades
    const columns =
        [{
            dataField: 'id_especialidad',
            text: `${t("formularios.formkamban.codigo")}`,
            sort: true
        }, {
            dataField: 'nombre_especialidad',
            text: `${t("formularios.formkamban.necesidad")}`,
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
        totalSize: especialidades.length
    };
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: "#fff", background: "#0d6efd" },
        onSelect: (row, isSelect, rowIndex, e) => {


            setEspecialidadTemp(row.nombre_especialidad);
            setIdEspecialidadTemp(row.id_especialidad);
        }
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_especialidad"
                columns={columns}
                data={especialidades}
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
    return (
        <div>
            <div>
                <h2>{t("formularios.formkamban.titulo")}</h2>

            </div>
            <div>
                <Form >

                    <Row className="mb-2">

                        <Form.Group as={Col} >
                            <Form.Label><strong>{t("formularios.formkamban.necesidad")}</strong></Form.Label>
                            <Form.Control as="select"
                                value={form2.necesidad} placeholder={`-- ${t("etiquetas.seleccion")} --`}
                                name="necesidad" onChange={handleChange1}>

                                <option value="">
                                    {`-- ${t("etiquetas.seleccionopcion")} --`}
                                </option>
                                <option key="Cuidado intermedio" value="Cuidado intermedio">
                                    {t("formularios.formkamban.cuidadointer")}
                                </option>
                                <option key="Cuidado mínimo" value="Cuidado mínimo">
                                    {t("formularios.formkamban.cuidadomin")}
                                </option>
                                <option key="Cuidado intensivo" value="Cuidado intensivo">
                                    {t("formularios.formkamban.cuidadoten")}
                                </option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}  >
                            <Form.Label required><strong>{t("formularios.formkamban.hptlz30")}</strong></Form.Label>
                            <Col sm={9}>

                                <Form.Check
                                    type="radio"
                                    checked={form2.hospitalizado_reciente == 1}
                                    label="Si"
                                    key={1}
                                    name="hospitalizado_reciente"
                                    id={1}
                                    value={1}
                                    onChange={handleChange1}
                                />
                                <Form.Check
                                    type="radio"
                                    checked={form2.hospitalizado_reciente == 2}
                                    label="No"
                                    key={2}
                                    name="hospitalizado_reciente"
                                    id={2}
                                    value={2}
                                    onChange={handleChange1}
                                />

                            </Col>


                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} >
                            <Form.Label><strong>{t("formularios.formkamban.tieneriesgo")}</strong></Form.Label>
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
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label required><strong>{t("formularios.formkamban.nocama")}</strong></Form.Label>

                            <InputGroup className="mb-2" >
                                <Form.Control as="select" value={form2.no_cama}
                                    placeholder={`-- ${t("etiquetas.seleccion")} --`} name="no_cama" onChange={handleChange1}>
                                    <option value="">{`-- ${t("etiquetas.seleccion")} --`}</option>
                                    {camas.map(elemento => (
                                        <option key={elemento.id_sala_camas} value={elemento.id_sala_camas}>
                                            {elemento.id_sala_camas}</option>
                                    ))}
                                </Form.Control>
                                <InputGroup.Text onClick={abrirVentanaCamas}>
                                    <Icofont icon="ui-add" className="mx-2" />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                    </Row>


                    <Row className="mb-2">
                        <Form.Group as={Col} >
                            <Form.Label><strong>{t("formularios.formkamban.especial")}</strong></Form.Label>
                            <InputGroup className="mb-2">
                                <Form.Control id="inlineFormInputGroup"
                                    placeholder={`${t("formularios.formkamban.especial")}`}
                                    value={Especialidad || form2.especialidad}
                                    name="especialidad" disabled
                                    onChange={handleChange1} />
                                <InputGroup.Text onClick={handleShow2}>
                                    <Icofont icon="ui-search" className="mx-2" />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label><strong>{t("formularios.formkamban.procedimientos")}</strong></Form.Label>
                            <Form.Control as="select" value={form2.procedimientos_sala}
                                placeholder={`-- ${t("etiquetas.seleccion")} --`} name="procedimientos_sala"
                                onChange={handleChange1}>
                                <option value="">{`-- ${t("etiquetas.seleccion")} --`}</option>
                                {procedimientos.map(elemento => (
                                    <option key={elemento.id_sala_procedimiento} value={elemento.id_sala_procedimiento}>{elemento.nombre_procedimiento}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>


                    </Row>


                    <Button variant="primary" onClick={PostKamban}>
                        {t("etiquetas.guardar")}
                    </Button>

                </Form>
            </div>
            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t("formularios.formkamban.select")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PaginationProvider pagination={paginationFactory(options)}>
                        {contentTable}
                    </PaginationProvider>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setEspecialidad(EspecialidadTemp);
                        setForm2(
                            prevState => ({
                                ...prevState,
                                especialidad: idEspecialidadTemp
                            })
                        );
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
}

export default FormularioKamban;
