import React from 'react';
import classNames from 'classnames';
import Icofont from 'react-icofont';

import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Accordion, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

//import 'bootstrap/dist/css/bootstrap.css';

class SubAdministracion extends React.Component {
    constructor(props) {
        super(props);
        this.ObtenerSesion = this.ObtenerSesion.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleNavbar1 = this.toggleNavbar1.bind(this);
        this.state = {
            collapsed: true,
            collapsed1: true,
            collapsed2: true,
            sesionActual: null,
            accesoTodo: false,
            incidentes: false,
            tipo: false,
            modalidad: false,
            especial: false,
            especialidad: false,
            usuarios: false,
            nivel: false,
            acode: false,
            sede: false,
            base: false,
            webservices: false,
            movil: false,
            medicamentos: false,
            insumos: false,
            procedimientos: false,
            exploracion: false,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    toggleNavbar1() {
        this.setState({
            collapsed1: !this.state.collapsed1,
        });
    }

    ObtenerSesion = () => {
        axios
            .get('/sesion-activa')
            .then((responser) => {
                this.accesorAdministracion(responser.data);
                this.setState({
                    sesionActual: responser.data,
                });
                return responser.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    accesorAdministracion(sesionActual) {
        if (sesionActual != null) {
            if (sesionActual.perfil == -1) {
                this.setState({
                    accesoTodo: true,
                });
            } else if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Incidentes') {
                        this.setState({
                            incidentes: true,
                        });
                    }
                    if (element.tablename == 'Tipo Ambulancia') {
                        this.setState({
                            tipo: true,
                        });
                    }

                    if (element.tablename == 'Modalidad Ambulancia') {
                        this.setState({
                            modalidad: true,
                        });
                    }

                    if (element.tablename == 'Especial Ambulancia') {
                        this.setState({
                            especial: true,
                        });
                    }

                    if (element.tablename == 'Especialidad Hospital') {
                        this.setState({
                            especialidad: true,
                        });
                    }

                    if (element.tablename == 'Usuarios') {
                        this.setState({
                            usuarios: true,
                        });
                    }

                    if (element.tablename == 'Usuarios') {
                        this.setState({
                            nivel: true,
                        });
                    }

                    if (element.tablename == 'Code Planta') {
                        this.setState({
                            acode: true,
                        });
                    }

                    if (element.tablename == 'Sede Sismed') {
                        this.setState({
                            sede: true,
                        });
                    }
                    if (element.tablename == 'Base Ambulancia') {
                        this.setState({
                            base: true,
                        });
                    }
                    if (element.tablename == 'Webservices') {
                        this.setState({
                            webservices: true,
                        });
                    }
                    if (
                        element.tablename == 'Medicamentos' ||
                        element.tablename == 'Medicamentos Registros'
                    ) {
                        this.setState({
                            medicamentos: true,
                            movil: true,
                        });
                    }
                    if (
                        element.tablename == 'Insumos' ||
                        element.tablename == 'Insumos Registros'
                    ) {
                        this.setState({
                            insumos: true,
                            movil: true,
                        });
                    }
                    if (
                        element.tablename == 'Procedimientos' ||
                        element.tablename == 'Procedimiento Registro'
                    ) {
                        this.setState({
                            procedimientos: true,
                            movil: true,
                        });
                    }
                    if (element.tablename.includes('Explo')) {
                        this.setState({
                            exploracion: true,
                            movil: true,
                        });
                    }
                });
            }
        }
    }

    componentDidMount() {
        this.ObtenerSesion();
    }

    render() {
        const { t } = this.props;
        return (
            <Nav.Item className={classNames({ open: !this.state.collapsed })}>
                <Accordion>
                    <Accordion.Toggle
                        as={Nav.Link}
                        variant="link"
                        eventKey="0"
                        onClick={this.toggleNavbar}
                    >
                        <Icofont icon="ui-settings" className="mx-2" />

                        {t('sidebar.administracion.principal')}

                        <FontAwesomeIcon
                            icon={
                                this.state.collapsed ? faAngleLeft : faAngleDown
                            }
                            className="ms-1"
                        />
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <nav className="nav flex-column">
                            {(this.state.accesoTodo ||
                                this.state.incidentes) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/incidentes"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t('sidebar.administracion.incidentes')}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.tipo) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/tipoambulancia"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t(
                                        'sidebar.administracion.tipo-ambulancia'
                                    )}
                                </Link>
                            )}

                            {(this.state.accesoTodo ||
                                this.state.modalidad) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/modalidadambulancia"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t(
                                        'sidebar.administracion.modalidad-ambulancia'
                                    )}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.especial) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/especialambulancia"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t(
                                        'sidebar.administracion.especial-ambulancia'
                                    )}
                                </Link>
                            )}

                            {(this.state.accesoTodo ||
                                this.state.especialidad) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/especialidadhospital"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t(
                                        'sidebar.administracion.especialidad-hospital'
                                    )}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.usuarios) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/usuarios"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t('sidebar.administracion.usuarios')}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.nivel) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/nivel"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t('sidebar.administracion.nivel')}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.acode) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/acode"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t('sidebar.administracion.acode')}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.sede) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/sede"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t('sidebar.administracion.sede')}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.base) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/base"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t('sidebar.administracion.base')}
                                </Link>
                            )}

                            {(this.state.accesoTodo ||
                                this.state.webservices) && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/webservices"
                                >
                                    <Icofont icon="play" className="mx-2" />
                                    {t('sidebar.administracion.webservices')}
                                </Link>
                            )}

                            {(this.state.accesoTodo || this.state.movil) && (
                                <Accordion>
                                    <Accordion.Toggle
                                        as={Nav.Link}
                                        variant="link"
                                        eventKey="0"
                                        onClick={this.toggleNavbar1}
                                    >
                                        <Icofont
                                            icon="prescription"
                                            className="mx-2"
                                        />

                                        {t('sidebar.administracion.movil')}

                                        <FontAwesomeIcon
                                            icon={
                                                this.state.collapsed1
                                                    ? faAngleLeft
                                                    : faAngleDown
                                            }
                                            className="ms-1"
                                        />
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="0">
                                        <nav className="nav flex-column navitems">
                                            {(this.state.accesoTodo ||
                                                this.state.medicamentos) && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item pl-4'
                                                    }
                                                    to="/medicamentos"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.administracion.medicamentos'
                                                    )}
                                                </Link>
                                            )}

                                            {(this.state.accesoTodo ||
                                                this.state.insumos) && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item pl-4'
                                                    }
                                                    to="/insumos"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.administracion.insumos'
                                                    )}
                                                </Link>
                                            )}

                                            {(this.state.accesoTodo ||
                                                this.state.procedimientos) && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item pl-4'
                                                    }
                                                    to="/procedimientos"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.administracion.procedimientos'
                                                    )}
                                                </Link>
                                            )}

                                            {(this.state.accesoTodo ||
                                                this.state.exploracion) && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item pl-4'
                                                    }
                                                    to="/exploracionfisica"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.administracion.exploracion-fisica'
                                                    )}
                                                </Link>
                                            )}
                                        </nav>
                                    </Accordion.Collapse>
                                </Accordion>
                            )}
                        </nav>
                    </Accordion.Collapse>
                </Accordion>
            </Nav.Item>
        );
    }
}

export default withTranslation('global')(SubAdministracion);
