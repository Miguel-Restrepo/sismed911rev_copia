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

class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleNavbar1 = this.toggleNavbar1.bind(this);
        this.toggleNavbar2 = this.toggleNavbar2.bind(this);
        this.state = {
            collapsed: true,
            collapsed1: true,
            collapsed2: true,
            hospital: false,
            registro: false,
            reportesP: false,
            estadisticas: false,
            reportes: false,
            configuracion: false,
            alerta: false,
            sesion_sala: false,
            nueva_sesion: false,
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

    toggleNavbar2() {
        this.setState({
            collapsed2: !this.state.collapsed2,
        });
    }

    ObtenerSesion = () => {
        axios
            .get('/sesion-activa')
            .then((responser) => {
                this.accesorAdministracion(responser.data);
                return responser.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    accesorAdministracion(sesionActual) {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename == 'Hospital' ||
                        element.tablename == 'Hospitales Principales' ||
                        element.tablename == 'Sector Hospital' ||
                        element.tablename == 'Disponibilidad Hospitalaria' ||
                        element.tablename == 'Disponibilad Hospitalaria' ||
                        element.tablename == 'Especialidad Hospital'
                    ) {
                        this.setState({
                            hospital: true,
                        });
                    }
                    if (element.tablename == 'Registro Diario') {
                        this.setState({
                            registro: true,
                        });
                    }
                    if (element.tablename == 'Censo Total') {
                        this.setState({
                            estadisticas: true,
                            reportesP: true,
                        });
                    }
                    if (element.tablename == 'Censo Total') {
                        this.setState({
                            reportes: true,
                            reportesP: true,
                        });
                    }
                    if (element.tablename == 'Recordatorios') {
                        this.setState({
                            alerta: true,
                            configuracion: true,
                        });
                    }
                    if (element.tablename == 'Sección Sala') {
                        this.setState({
                            sesion_sala: true,
                            configuracion: true,
                        });
                    }
                    if (element.tablename == 'Nueva Sección') {
                        this.setState({
                            nueva_sesion: true,
                            configuracion: true,
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
                        <Icofont icon="external" className="mx-2" />

                        {t('sidebar.med-surge.principal')}

                        <FontAwesomeIcon
                            icon={
                                this.state.collapsed ? faAngleLeft : faAngleDown
                            }
                            className="ms-1"
                        />
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <nav className="nav flex-column">
                            {this.state.hospital && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/medHospital"
                                >
                                    <Icofont icon="play" className="mx-2" />

                                    {t('sidebar.med-surge.hospital')}
                                </Link>
                            )}

                            {this.state.registro && (
                                <Link
                                    className={'nav-link nav-item pl-4'}
                                    to="/registro"
                                >
                                    <Icofont icon="play" className="mx-2" />

                                    {t('sidebar.med-surge.registro')}
                                </Link>
                            )}

                            {this.state.reportesP && (
                                <Accordion className="accordion2">
                                    <Accordion.Toggle
                                        as={Nav.Link}
                                        variant="link"
                                        eventKey="0"
                                        onClick={this.toggleNavbar1}
                                    >
                                        <Icofont icon="play" className="mx-2" />

                                        {t(
                                            'sidebar.med-surge.reportes.principal'
                                        )}

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
                                            {this.state.estadisticas && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item ps-5'
                                                    }
                                                    to="/estadistica"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.med-surge.reportes.estadistica'
                                                    )}
                                                </Link>
                                            )}

                                            {this.state.reportes && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item ps-5'
                                                    }
                                                    to="/reportes"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.med-surge.reportes.reportes'
                                                    )}
                                                </Link>
                                            )}
                                        </nav>
                                    </Accordion.Collapse>
                                </Accordion>
                            )}

                            {this.state.configuracion && (
                                <Accordion className="accordion2">
                                    <Accordion.Toggle
                                        as={Nav.Link}
                                        variant="link"
                                        eventKey="0"
                                        onClick={this.toggleNavbar2}
                                    >
                                        <Icofont icon="play" className="mx-2" />
                                        {t(
                                            'sidebar.med-surge.configuracion.principal'
                                        )}
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
                                            {this.state.alerta && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item ps-5'
                                                    }
                                                    to="/alerta"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.med-surge.configuracion.alerta'
                                                    )}
                                                </Link>
                                            )}

                                            {this.state.sesion_sala && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item ps-5'
                                                    }
                                                    to="/seleccionsalas"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.med-surge.configuracion.seleccion-salas'
                                                    )}
                                                </Link>
                                            )}

                                            {this.state.nueva_sesion && (
                                                <Link
                                                    className={
                                                        'nav-link nav-item ps-5'
                                                    }
                                                    to="/nuevaseccion"
                                                >
                                                    <Icofont
                                                        icon="play"
                                                        className="mx-2"
                                                    />

                                                    {t(
                                                        'sidebar.med-surge.configuracion.nueva-seccion'
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

export default withTranslation('global')(SubMenu);
