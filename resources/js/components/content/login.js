import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import "./login.css";
import { Link } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
import { useTranslation } from "react-i18next"
const Login = () => {
    const [t, i18n] = useTranslation("global");
    const [formLogin, setFormLogin] = useState({
        password: '',
        login: ''

    });
    const handleChangeFormLogin = e => {
        e.persist();
        setFormLogin(
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
        toast.error(`${t("mensajes.incorrecto")}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });;
    const PostLogin = () => {

        axios.post('/login', {
            password: formLogin.password,
            email: formLogin.login
        })
            .then(response => {
                axios.post('/api/loguear', {
                    correo: formLogin.login
                }).then(r => {
                    window.location.href = "/";

                }).catch(er => {
                });
                //REDICIONAR AL INICIO
                return response.data;
            })
            .catch(error => {
                notificarErrorCaso();
                return error.response.data;
            })
    }
    return (


        <div className="divlogin">

            <Figure  >
                <Figure.Image
                    width={642}
                    height={153}
                    src='/assets/SISMED911_logo.png'
                    alt="Sismed911"

                />
            </Figure>

            <Form className="p-3 mt-3">
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <Form.Control type="text" placeholder={`${t("ambulancias.novedades.datos.usuario")}`} name="login" value={formLogin.login} onChange={handleChangeFormLogin} />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <Form.Control type="password" placeholder={`${t("administracion.usuarios.datos.pw")}`} name="password" value={formLogin.password} onChange={handleChangeFormLogin} />
                </div>

                <Button className="btn mt-3" onClick={PostLogin} >{t("etiquetas.iniciar")}</Button>
            </Form>
        </div>

    );

}
export default Login;