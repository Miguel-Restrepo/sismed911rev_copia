import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Icofont from 'react-icofont';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faGlobe,
    faUser,
    faBell,
} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

function NavBar(props) {
    const [t, i18n] = useTranslation('global');
    const [passw1, setPassw1] = useState(false);
    const [passw2, setPassw2] = useState(false);
    const [passw3, setPassw3] = useState(false);
    const handleText1 = () => setPassw1(true);
    const handlePassw1 = () => setPassw1(false);
    const handleText2 = () => setPassw2(true);
    const handlePassw2 = () => setPassw2(false);
    const handleText3 = () => setPassw3(true);
    const handlePassw3 = () => setPassw3(false);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [showInformacion, setShowInformacion] = useState(false);
    const handleCloseInformacion = () => setShowInformacion(false);
    const handleShowInformacion = () => setShowInformacion(true);
    const [notificacion, setNotificacion] = useState('');
    const [sesionActual, setSesionActual] = useState(null);
    const [campana, setCampana] = useState(faBell);
    const [notificaciones, setNotificaciones] = useState([]);
    const [notificacionesDef, setNotificacionesDef] = useState([]);
    const [deshabilitar, setDeshabilitar] = useState(false);
    window.Echo.private('logs').listen('UsuarioLogeado', (e) => {
        ObtenerSesion();
        setNotificacion(
            `EL usuario: ` + e.nombre + `<br> ha ingresado al sistema.`
        );
    });
    /*
  window.Echo.private('actinterh').listen('ActualizarInterh', (e) => {
    /
  });
  window.Echo.private('actpreh').listen('ActualizarPreh', (e) => {

  });*/
    window.Echo.private('notificaciones').listen('Notificaciones', (e) => {
        setNotificacion(
            `Nueva notificación <br> Mensaje notificacion: <br>` + e.mensaje
        );
    });

    window.Echo.private('recordatorios').listen('Recordatorios', (e) => {
        setNotificacion(
            `Nuevo recordatorio <br> Mensaje recordatorio: <br>` + e.mensaje
        );
    });

    window.Echo.private('inactividadinterh').listen(
        'InactividadInterh',
        (e) => {
            setNotificacion(
                `EL caso No. ` +
                    e.datos +
                    `<br> del modulo interhospitalario <br> con fecha de inicio <br>` +
                    e.fecha +
                    `<br>aún no se ha cerrado.`
            );
        }
    );

    window.Echo.private('inactividadprehh').listen('InactividadPreh', (e) => {
        setNotificacion(
            `EL caso No. ` +
                e.datos +
                `<br> del modulo prehospitalario <br> con fecha de inicio <br>` +
                e.fecha +
                `<br>aún no se ha cerrado.`
        );
    });

    const [formPassword, setFormPassword] = useState({
        id_usuario: '',
        vieja_password: '',
        nueva_password: '',
        confirma_password: '',
    });

    const clearform = () => {
        setFormPassword({
            id_usuario: '',
            vieja_password: '',
            nueva_password: '',
            confirm_password: '',
        });
    };

    const ObtenerSesion = () => {
        axios
            .get('/sesion-activa')
            .then((responser) => {
                setSesionActual(responser.data);

                return responser.data;
            })
            .catch((error) => {});
    };

    const cambiarPassword = () => {
        if (formPassword.nueva_password == formPassword.confirma_password) {
            axios
                .put('/api/usuarios/cambiarpassword', {
                    id: sesionActual.id_user,
                    vieja_password: formPassword.vieja_password,
                    nueva_password: formPassword.nueva_password,
                    confirma_password: formPassword.confirma_password,
                })
                .then((responser) => {
                    clearform();
                    return responser.data;
                })
                .catch((error) => {});
        }
    };

    const handleChangePassword = (e) => {
        e.persist();
        setFormPassword((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        ObtenerSesion();
    }, []);

    useEffect(() => {
        if (notificacionesDef.indexOf(notificacion) == -1) {
            setNotificacionesDef([...notificacionesDef, notificacion]);
        }
    }, [notificacion]);

    const eliminar = (itemId) => {
        //En vez de uasr item.id, usa la propiedad
        //que te ayuda a identificar tu objeto que quieres borrar.
        //Quizas clavearticulo sea la adecuada.
        const filtredData = notificacionesDef.filter((item) => item != itemId);
        setNotificacionesDef(filtredData);
    };
    const eliminarVacio = () => {
        //En vez de uasr item.id, usa la propiedad
        //que te ayuda a identificar tu objeto que quieres borrar.
        //Quizas clavearticulo sea la adecuada.
        const filtredData = notificacionesDef.filter((item) => item != '');
        setNotificacionesDef(filtredData);
    };

    return (
        <>
            <Navbar bg="secondary" className="shadow-sm p-3" expand>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={props.toggle}
                    className="mx-2"
                    color="rgba(255,255,255,0.5)"
                />

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="ms-auto vstack align-items-md-end"
                >
                    <Nav className="ml-auto " navbar>
                        {sesionActual != null ? (
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="secondary"
                                    id="dropdown-autoclose-true"
                                >
                                    <FontAwesomeIcon
                                        icon={campana}
                                        className="mx-2"
                                        color="rgba(255,255,255,0.5)"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="menu2">
                                    {notificacionesDef.map((elemento) =>
                                        elemento != '' ? (
                                            <div key={elemento}>
                                                <Dropdown.Item>
                                                    <div className="Esquinero">
                                                        <span
                                                            className="equis"
                                                            onClick={() =>
                                                                eliminar(
                                                                    elemento
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </span>
                                                        <div
                                                            className="Esquinero"
                                                            dangerouslySetInnerHTML={{
                                                                __html: elemento,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </Dropdown.Item>
                                                <div className="dropdown-divider"></div>
                                            </div>
                                        ) : (
                                            ''
                                        )
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            ''
                        )}

                        <Dropdown>
                            <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-autoclose-true"
                            >
                                <FontAwesomeIcon
                                    icon={faGlobe}
                                    className="mx-2"
                                    color="rgba(255,255,255,0.5)"
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="menu2">
                                <Dropdown.Item
                                    onClick={() => i18n.changeLanguage('en')}
                                >
                                    English
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => i18n.changeLanguage('fr')}
                                >
                                    Français
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => i18n.changeLanguage('pt')}
                                >
                                    Português
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => i18n.changeLanguage('es')}
                                >
                                    Español
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-autoclose-true"
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mx-2"
                                    color="rgba(255,255,255,0.5)"
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {sesionActual != null ? (
                                    <div>
                                        <div className="mb-2 p-0">
                                            <Dropdown.Item className="text-muted px-4 mb-3">
                                                {sesionActual.nombres}{' '}
                                                {sesionActual.apellidos}
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={handleShowInformacion}
                                                className="text-muted mb-2"
                                            >
                                                <Icofont
                                                    icon="user"
                                                    className="mx-2"
                                                />
                                                {t('navbar.info')}
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={handleShow2}
                                                className="text-muted mb-2"
                                            >
                                                <Icofont
                                                    icon="ui-password"
                                                    className="mx-2"
                                                />
                                                {t('navbar.cambiarpw')}
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    axios
                                                        .post('/logout', {})
                                                        .then((response) => {
                                                            window.location.href =
                                                                '/login';
                                                            return response.data;
                                                        })
                                                        .catch((error) => {
                                                            return error
                                                                .response.data;
                                                        });
                                                }}
                                                className="text-muted"
                                            >
                                                <Icofont
                                                    icon="logout"
                                                    className="mx-2"
                                                />
                                                {t('navbar.finsesion')}
                                            </Dropdown.Item>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-center">
                                        <Link to="/login">
                                            <Dropdown.Item className="text-muted">
                                                <Icofont
                                                    icon="user"
                                                    className="mx-2"
                                                />
                                                {t('navbar.iniciosesion')}
                                            </Dropdown.Item>
                                        </Link>
                                    </div>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('navbar.cambiarpw')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className="ms-xl-4">
                        {deshabilitar && (
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>{t('navbar.actualpw')}</strong>
                                </Form.Label>
                                <Col sm={8}>
                                    <InputGroup className="mb-2">
                                        <Form.Control
                                            type={passw1 ? 'text' : 'password'}
                                            onChange={handleChangePassword}
                                            placeholder={`${t(
                                                'navbar.actualpw'
                                            )}`}
                                            name="vieja_password"
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={
                                                passw1
                                                    ? handlePassw1
                                                    : handleText1
                                            }
                                        >
                                            <Icofont
                                                icon={
                                                    passw1
                                                        ? 'eye-blocked'
                                                        : 'eye'
                                                }
                                                className="mx-2"
                                            />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        )}
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>{t('navbar.nuevapw')}</strong>
                            </Form.Label>
                            <Col sm={8}>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type={passw2 ? 'text' : 'password'}
                                        onChange={handleChangePassword}
                                        placeholder={`${t('navbar.nuevapw')}`}
                                        name="nueva_password"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={
                                            passw2 ? handlePassw2 : handleText2
                                        }
                                    >
                                        <Icofont
                                            icon={
                                                passw2 ? 'eye-blocked' : 'eye'
                                            }
                                            className="mx-2"
                                        />
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>{t('navbar.confirmarpw')}</strong>
                            </Form.Label>
                            <Col sm={8}>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type={passw3 ? 'text' : 'password'}
                                        onChange={handleChangePassword}
                                        placeholder={`${t(
                                            'navbar.confirmarpw'
                                        )}`}
                                        name="confirma_password"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={
                                            passw3 ? handlePassw3 : handleText3
                                        }
                                    >
                                        <Icofont
                                            icon={
                                                passw3 ? 'eye-blocked' : 'eye'
                                            }
                                            className="mx-2"
                                        />
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            cambiarPassword();
                            handleClose2();
                        }}
                    >
                        {t('navbar.cambiar')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showInformacion} onHide={handleCloseInformacion}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('navbar.datosusuario')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {sesionActual != null && (
                        <div>
                            <Row>
                                <Col>
                                    <strong> {t('navbar.fecha')}</strong>
                                </Col>
                                <Col>{sesionActual.fecha_creacion}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong> {t('navbar.nombres')} </strong>
                                </Col>
                                <Col>
                                    {sesionActual.nombres}{' '}
                                    {sesionActual.apellidos}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong> {t('navbar.telefono')} </strong>
                                </Col>
                                <Col>{sesionActual.telefono}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong> {t('navbar.usuario')} </strong>
                                </Col>
                                <Col>{sesionActual.login}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong> {t('navbar.sede')} </strong>
                                </Col>
                                <Col>
                                    {sesionActual.sede_sismed != null &&
                                        sesionActual.sede_sismed.nombre_sede}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong> {t('navbar.hospital')} </strong>
                                </Col>
                                <Col>
                                    {sesionActual.hospital != null &&
                                        sesionActual.hospital.nombre_hospital}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong> {t('navbar.rol')} </strong>
                                </Col>
                                <Col>
                                    {sesionActual.rol != null &&
                                        sesionActual.rol.userlevelname}
                                </Col>
                            </Row>
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleCloseInformacion();
                        }}
                    >
                        {t('navbar.cerrar')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NavBar;
