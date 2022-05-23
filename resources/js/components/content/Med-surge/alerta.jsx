import React from "react";
import Icofont from "react-icofont";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-phone-input-2/lib/style.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-phone-input-2/lib/style.css";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { set } from "lodash";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Alerta = () => {
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [date3, setDate3] = useState("");
    const [date4, setDate4] = useState("");
    const [t, i18n] = useTranslation("global");
    const [form, setForm] = useState({
        hora1: "",
        hora2: "",
        hora3: "",
        hora4: "",
        t_recordatorio: "",
        texto_recordatorio: "",
        t_notificacion: "",
        texto_notificacion: "",
    });

    const handleChange = (e) => {
        e.persist();
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const notificarExitoCaso = (idcaso) =>
        toast.success(
            `${t("mensajes.mscasoid")} ${idcaso} ${t("mensajes.msexito")}`,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }
        );

    const notificarErrorCaso = () =>
        toast.error(`${t("mensajes.mscreacionerror")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    const Post = () => {
        axios
            .post("/api/alerta_censo", {
                hora1: date1,
                hora2: date2,
                hora3: date3,
                hora4: date4,
                t_recordatorio: form.t_recordatorio,
                texto_recordatorio: form.texto_recordatorio,
                t_notificacion: form.t_notificacion,
                texto_notificacion: form.texto_notificacion,
            })
            .then((response) => {
                notificarExitoCaso(response.data.id_tiempocenso);
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    return (
        <div>
            <div>
                <h2>{t("medsurge.alertas.titulo")}</h2>
            </div>
            <div>
                <Form className="m-xxl-4">
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formcodigo"
                    >
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.registro1")}
                        </Form.Label>
                        <Col sm={2}>
                            <div>
                                <DatePicker
                                    selected={date1}
                                    onChange={(date) => setDate1(date)}
                                    timeInputLabel={`${t(
                                        "medsurge.alertas.datos.registro1"
                                    )}`}
                                    dateFormat="yyyy/MM/dd h:mm:ss"
                                    showTimeInput
                                    customInput={<Form.Control />}
                                    name="hora1"
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formcodigo"
                    >
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.registro2")}
                        </Form.Label>
                        <Col sm={2}>
                            <div>
                                <DatePicker
                                    selected={date2}
                                    onChange={(date) => setDate2(date)}
                                    timeInputLabel={`${t(
                                        "medsurge.alertas.datos.registro2"
                                    )}`}
                                    dateFormat="yyyy/MM/dd h:mm:ss"
                                    showTimeInput
                                    customInput={<Form.Control />}
                                    name="hora1"
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formcodigo"
                    >
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.registro3")}
                        </Form.Label>
                        <Col sm={2}>
                            <div>
                                <DatePicker
                                    selected={date3}
                                    onChange={(date) => setDate3(date)}
                                    timeInputLabel={`${t(
                                        "medsurge.alertas.datos.registro3"
                                    )}`}
                                    dateFormat="yyyy/MM/dd h:mm:ss"
                                    showTimeInput
                                    customInput={<Form.Control />}
                                    name="hora1"
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formcodigo"
                    >
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.registro4")}
                        </Form.Label>
                        <Col sm={2}>
                            <div>
                                <DatePicker
                                    selected={date4}
                                    onChange={(date) => setDate4(date)}
                                    timeInputLabel={`${t(
                                        "medsurge.alertas.datos.registro4"
                                    )}`}
                                    dateFormat="yyyy/MM/dd h:mm:ss"
                                    showTimeInput
                                    customInput={<Form.Control />}
                                    name="hora1"
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formperfil">
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.tiemporecord")}
                        </Form.Label>
                        <Col sm={2}>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    as="select"
                                    name="t_recordatorio"
                                    value={form.t_recordatorio}
                                    onChange={handleChange}
                                >
                                    <option value="" id="defespec">
                                        {`-- ${t("etiquetas.seleccion")} --`}
                                    </option>
                                    <option value="5" key="5m">
                                        {`5 ${t("etiquetas.minutos")}`}
                                    </option>
                                    <option value="10" key="10m">
                                        {`10 ${t("etiquetas.minutos")}`}
                                    </option>
                                    <option value="15" key="15m">
                                        {`15 ${t("etiquetas.minutos")}`}
                                    </option>
                                    <option value="20" key="20m">
                                        {`20 ${t("etiquetas.minutos")}`}
                                    </option>
                                </Form.Control>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formcodigo"
                    >
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.textorecord")}
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="text"
                                value={form.texto_recordatorio}
                                onChange={handleChange}
                                placeholder={`${t(
                                    "medsurge.alertas.datos.textorecord"
                                )}`}
                                name="texto_recordatorio"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formperfil">
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.tiempoms")}
                        </Form.Label>
                        <Col sm={2}>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    as="select"
                                    name="t_notificacion"
                                    value={form.t_notificacion}
                                    onChange={handleChange}
                                >
                                    <option value="" id="defespec">
                                        {`-- ${t("etiquetas.seleccion")} --`}
                                    </option>
                                    <option value="10" key="5m">
                                        {`10 ${t("etiquetas.minutos")}`}
                                    </option>
                                    <option value="20" key="10m">
                                        {`20 ${t("etiquetas.minutos")}`}
                                    </option>
                                    <option value="30" key="15m">
                                        {`30 ${t("etiquetas.minutos")}`}
                                    </option>
                                    <option value="40" key="20m">
                                        {`40 ${t("etiquetas.minutos")}`}
                                    </option>
                                </Form.Control>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formcodigo"
                    >
                        <Form.Label column sm="2">
                            {t("medsurge.alertas.datos.textoms")}
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="text"
                                value={form.texto_notificacion}
                                placeholder={`${t(
                                    "medsurge.alertas.datos.textoms"
                                )}`}
                                onChange={handleChange}
                                name="texto_notificacion"
                            />
                        </Col>
                    </Form.Group>

                    <Button
                        variant="primary"
                        className="m-xxl-4"
                        onClick={Post}
                    >
                        {t("etiquetas.agregar")}
                    </Button>
                    <Button variant="secondary" className="m-xxl-4">
                        {t("etiquetas.cancelar")}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Alerta;
