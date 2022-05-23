import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import SubMedSurge from './SubMedSurge';
import SubAdministracion from './SubAdministracion';
import { useEffect, useState, useContext } from 'react';

import { Nav, Button } from 'react-bootstrap';
import Figure from 'react-bootstrap/Figure';
import classNames from 'classnames';
import Icofont from 'react-icofont';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import {sesion} from '../../contexts/SesionContext';
//import { ThemeContext, themes } from '../../contexts/SesionContext';
//import {variableOne} from '../../contexts/SampleContext'
//{{"Panel principal": "/panelInterH", "Interhospitalario":"/interhospitalario"}}

function SideBar(props) {
    const [t, i18n] = useTranslation('global');
    const prueba = 'f';
    const [sesionActual, setSesionActual] = useState(null);
    const [accesoInterh, setAccesoInterh] = useState(false);
    const [accesoPreh, setAccesoPreh] = useState(false);
    const [accesoMed, setAccesoMed] = useState(false);
    const [accesoAmbulancia, setAccesoAmbulancia] = useState(false);
    const [accesoEClinical, setAccesoEClinical] = useState(false);
    const [accesoAdministracion, setAccesoAdministracion] = useState(false);
    const [itemsInterh, setItemsInterh] = useState({});
    const [itemsPreh, setItemsPreh] = useState({});
    const [itemsAmbulancia, setItemsAmbulancia] = useState({});
    const [itemsEClinical, setItemsEClinical] = useState({});

    const ObtenerSesion = () => {
        axios
            .get('/sesion-activa')
            .then((responser) => {
                setSesionActual(responser.data);
                return responser.data;
            })
            .catch((error) => {});
    };

    const accesorMed = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename == 'Hospital' ||
                        element.tablename == 'Hospitales Principales' ||
                        element.tablename == 'Sector Hospital' ||
                        element.tablename == 'Disponibilidad Hospitalaria' ||
                        element.tablename == 'Disponibilad Hospitalaria' ||
                        element.tablename == 'Especialidad Hospital' ||
                        element.tablename == 'Censo Total' ||
                        element.tablename == 'Recordatorios' ||
                        element.tablename == 'Registro Diario' ||
                        element.tablename == 'Sección Sala' ||
                        element.tablename == 'Nueva Sección'
                    ) {
                        setAccesoMed(true);
                        return;
                    }
                });
            }
        }
    };

    const accesorAdministracion = () => {
        if (sesionActual != null) {
            if (sesionActual.perfil == -1) {
                setAccesoAdministracion(true);
                return;
            } else if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename == 'Incidentes' ||
                        element.tablename == 'Tipo Ambulancia' ||
                        element.tablename == 'Modalidad Ambulancia' ||
                        element.tablename == 'Especial Ambulancia' ||
                        element.tablename == 'Modalidad Ambulancia' ||
                        element.tablename == 'Especialidad Hospital' ||
                        element.tablename == 'Usuarios' ||
                        element.tablename == 'Code Planta' ||
                        element.tablename == 'Sede Sismed' ||
                        element.tablename == 'Base Ambulancia' ||
                        element.tablename == 'Webservices' ||
                        element.tablename == 'Medicamentos' ||
                        element.tablename == 'Medicamentos Registros' ||
                        element.tablename == 'Insumos' ||
                        element.tablename == 'Insumos Registros' ||
                        element.tablename == 'Procedimientos' ||
                        element.tablename == 'Procedimiento Registro' ||
                        element.tablename.includes('Explo')
                    ) {
                        setAccesoAdministracion(true);
                        return;
                    }
                });
            }
        }
    };

    const llenarInterh = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename == 'Reporte Interh-Hospital' ||
                        element.tablename == 'Interh Reporte'
                    ) {
                        setAccesoInterh(true);
                        setItemsInterh((prevState) => ({
                            ...prevState,
                            '/trasladoInterH': 'Traslado',
                            '/tableroInterH': 'Tablero',
                            '/colaInterH': 'Cola Pacientes',
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarInteh2 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename.includes('Inter') &&
                        element.tablename != 'Reporte Interh-Hospital' &&
                        element.tablename != 'Interh Reporte'
                    ) {
                        setAccesoInterh(true);
                        setItemsInterh((prevState) => ({
                            ...prevState,
                            '/interhospitalario': t(
                                'sidebar.inter-hospital.interhospitalario'
                            ),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarPreh = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename.includes('Pre') &&
                        element.tablename != 'Detalle Preh-Hospital'
                    ) {
                        setAccesoPreh(true);
                        setItemsPreh((prevState) => ({
                            ...prevState,
                            '/regulacion': t('sidebar.pre-hospital.regulacion'),
                            '/despacho': t('sidebar.pre-hospital.despacho'),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarPreh2 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Detalle Preh-Hospital') {
                        setAccesoPreh(true);
                        setItemsPreh((prevState) => ({
                            ...prevState,
                            '/trasladoPreh': 'Traslado',
                            '/tableroPrehH': 'Tablero',
                            '/colaPreh': 'Cola Pacientes',
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarAmbulancias = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Eventos proximos Ambulancia') {
                        setAccesoAmbulancia(true);
                        setItemsAmbulancia((prevState) => ({
                            ...prevState,
                            '/eventos': t('sidebar.ambulancias.eventos'),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarAmbulancias2 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename == 'Ambulancia' ||
                        element.tablename == 'Asignación Ambulancia' ||
                        element.tablename == 'Despacho Ambulancias' ||
                        element.tablename == 'Servicio Ambulancia'
                    ) {
                        setAccesoAmbulancia(true);
                        setItemsAmbulancia((prevState) => ({
                            ...prevState,
                            '/ambulancias': t(
                                'sidebar.ambulancias.ambulancias'
                            ),
                            '/tipoServicios': t(
                                'sidebar.ambulancias.tipo-servicios'
                            ),
                            '/novedades': t('sidebar.ambulancias.novedades'),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarAmbulancias3 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Recordatorios') {
                        setAccesoAmbulancia(true);
                        setItemsAmbulancia((prevState) => ({
                            ...prevState,
                            '/recordatorio': t(
                                'sidebar.ambulancias.recordatorio'
                            ),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarAmbulancias4 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Taller') {
                        setAccesoAmbulancia(true);
                        setItemsAmbulancia((prevState) => ({
                            ...prevState,
                            '/taller': t('sidebar.ambulancias.taller'),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarAmbulancias5 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Ambulancia') {
                        setAccesoAmbulancia(true);
                        setItemsAmbulancia((prevState) => ({
                            ...prevState,
                            '/panelGestionAmbulancias': 'Gestion',
                            '/panelCoberturaAmbulancias':
                                'Cobertura Preposiciones',
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarEclinical = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Sala Admisión') {
                        setAccesoEClinical(true);
                        setItemsEClinical((prevState) => ({
                            ...prevState,
                            '/admision': t('sidebar.e-clinical.admision'),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarEclinical2 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Clasificación') {
                        setAccesoEClinical(true);
                        setItemsEClinical((prevState) => ({
                            ...prevState,
                            '/clasificacion': t(
                                'sidebar.e-clinical.clasificacion'
                            ),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarEclinical3 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Urgencias') {
                        setAccesoEClinical(true);
                        setItemsEClinical((prevState) => ({
                            ...prevState,
                            '/urgencias': t('sidebar.e-clinical.urgencias'),
                        }));
                        return;
                    }
                });
            }
        }
    };

    const llenarEclinical4 = () => {
        if (sesionActual != null) {
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (element.tablename == 'Emergencias') {
                        setAccesoEClinical(true);
                        setItemsEClinical((prevState) => ({
                            ...prevState,
                            '/emergencias': t('sidebar.e-clinical.emergencias'),
                            '/monitoreokamban': 'Monitoreo',
                        }));
                        return;
                    }
                });
            }
        }
    };

    useEffect(() => {
        accesorMed();
        accesorAdministracion();
        llenarInterh();
        llenarInteh2();
        llenarPreh();
        llenarPreh2();
        llenarAmbulancias();
        llenarAmbulancias2();
        llenarAmbulancias3();
        llenarAmbulancias4();
        llenarAmbulancias5();
        llenarEclinical();
        llenarEclinical2();
        llenarEclinical3();
        llenarEclinical4();
    }, [sesionActual]);

    useEffect(() => {
        ObtenerSesion();
    }, []);

    return (
        <div
            className={classNames('sidebar', 'bg-dark', {
                'is-open': props.isOpen,
            })}
            bg="dark"
        >
            <div className="sisimage">
                <Figure className="pt-lg-4 pe-xxl-4">
                    <Figure.Image
                        width={200}
                        height={38}
                        src="/assets/logo.png"
                    />
                </Figure>
            </div>

            <Nav className="flex-column p-2 sidebar-layout">
                <div className="sidebar-content">
                    {sesionActual != null && (
                        <>
                            <Nav.Item className="active">
                                <Link to="/inicio">
                                    <Icofont icon="ui-home" className="mx-2" />
                                    {t('sidebar.inicio')}
                                </Link>
                            </Nav.Item>

                            {accesoInterh && (
                                <SubMenu
                                    title={t(
                                        'sidebar.inter-hospital.principal'
                                    )}
                                    icon={'medical-sign'}
                                    items={itemsInterh}
                                />
                            )}

                            {accesoPreh && (
                                <SubMenu
                                    title={t('sidebar.pre-hospital.principal')}
                                    icon={faStarOfLife}
                                    icfon="font"
                                    items={itemsPreh}
                                />
                            )}

                            {accesoMed && <SubMedSurge />}

                            {accesoAmbulancia && (
                                <SubMenu
                                    title={t('sidebar.ambulancias.principal')}
                                    icon={'tools'}
                                    items={itemsAmbulancia}
                                />
                            )}

                            {accesoEClinical && (
                                <SubMenu
                                    title={t('sidebar.e-clinical.principal')}
                                    icon={'hospital'}
                                    items={itemsEClinical}
                                />
                            )}

                            {accesoAdministracion && <SubAdministracion />}
                        </>
                    )}

                    <Nav.Item>
                        <Link to="/informacion?terminos=1">
                            <FontAwesomeIcon
                                icon={faMoneyCheck}
                                className="mx-2"
                            />
                            {t('sidebar.terminos-condiciones')}
                        </Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Link to="/informacion?acercade=1">
                            <Icofont icon="info-square" className="mx-2" />
                            {t('sidebar.acerca-de')}
                        </Link>
                    </Nav.Item>
                </div>
            </Nav>
        </div>
    );
}

export default SideBar;
