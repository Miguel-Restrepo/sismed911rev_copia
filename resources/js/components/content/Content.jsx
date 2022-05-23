import React from 'react';
import classNames from 'classnames';
import { Container, Card } from 'react-bootstrap';
import NavBar from './Navbar';
import { Route, Routes } from 'react-router-dom';

import Inicio from './Inicio';
import Info from './Info';

import InterHospital from './InterHospital/InterHospital';
import Regulacion from './PreHospital/Regulacion';
import Despacho from './PreHospital/Despacho';

import Hospital from './Med-surge/Hospital';
import Registro from './Med-surge/Registro';
import Reportes from './Med-surge/Reportes';
import Estadistica from './Med-surge/estadistica';
import Alerta from './Med-surge/alerta';
import Seleccionsalas from './Med-surge/seleccionsalas';
import Nuevaseccion from './Med-surge/nuevaseccion';

import Eventos from './Ambulancias/Eventos';
import Ambulancias from './Ambulancias/Ambulancias';
import Recordatorio from './Ambulancias/Recordatorio';
import Taller from './Ambulancias/Taller';
import Mantenimiento from './Ambulancias/Mantenimiento';
import Catalogo from './Ambulancias/Catalogo';
import Novedades from './Ambulancias/Novedades';

import Admision from './E-clinical/Admision';
import Clasificacion from './E-clinical/Clasificacion';
import Emergencias from './E-clinical/Emergencias';
import Urgencias from './E-clinical/Urgencias';
import Monitoreo from './E-clinical/Monitoreo';
import Evaluacion from './E-clinical/Evaluacion';
import Expediente from './E-clinical/Expediente';

import ModalidadAmbulancia from './Administracion/ModalidadAmbulancia';
import TipoAmbulancia from './Administracion/TipoAmbulancia';
import EspecialAmbulancia from './Administracion/EspecialAmbulancia';
import EspecialidadHospital from './Administracion/EspecialidadHospital';
import Usuarios from './Administracion/Usuarios';
import Nivel from './Administracion/Nivel';
import Acode from './Administracion/Acode';
import Sede from './Administracion/Sede';
import Base from './Administracion/Base';
import Webservices from './Administracion/Webservices';
import Medicamentos from './Administracion/Medicamentos';
import Insumos from './Administracion/Insumos';
import Procedimientos from './Administracion/Procedimientos';
import ExploracionFisica from './Administracion/ExploracionFisica';
import Incidentes from './Administracion/Incidentes';
import Permisos from './Administracion/Permisos';

import Login from './login';

import TrasladoInterH from './InterHospital/TrasladoInterH';
import axios from 'axios';
import Cola from './InterHospital/Cola';
import ColaPreh from './PreHospital/ColaPreh';
import TableroPreh from './PreHospital/TableroPreh';
import TableroInterH from './InterHospital/TableroInterH';
import PanelCobertura from './Ambulancias/PanelCobertura';
import Gestion from './Ambulancias/PanelGestion';

import { withTranslation } from 'react-i18next';
import TrasladoPreh from './PreHospital/TrasladoPreh';

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sesionActual: null,
            panelInterh: false, //ya
            colaInterH: false, //ya
            interhospitalario: false, //ya
            despacho: false, //ya
            regulacion: false, //ya
            medHospital: false, //ya
            registro: false, //ya
            reportes: false, //ya
            alerta: false, //ya
            estadistica: false, //ya
            seleccionsalas: false, //ya
            trasladoPreh: false, //ya
            tableroPrehH: false, //ya
            colaPreh: false, //ya
            panelPreH: false, //ya
            nuevaseccion: false, //ya
            eventos: false, //ya
            ambulancias: false, //ya
            mantenimiento: false,
            recordatorio: false, //ya
            taller: false, //ya
            tipoServicios: false, //ya
            novedades: false, //ya
            admision: false, //ya
            clasificacion: false, //ya
            emergencias: false, //ya
            urgencias: false, //ya
            monitoreokamban: false, //ya
            tipoambulancia: false, //ya
            modalidadambulancia: false, //ya
            especialambulancia: false, //ya
            especialidadhospital: false, //ya
            usuarios: false, //ya
            nivel: false, //ya
            acode: false, //ya
            sede: false, //ya
            base: false, //ya
            webservices: false, //ya
            medicamentos: false, //ya
            incidentes: false, //ya
            insumos: false, //ya
            procedimientos: false, //ya
            exploracionfisica: false, //ya
            permisos: false, //ya
            login: true,
            trasladoInterH: false, //ya
            tableroInterH: false, //ya
            panelCoberturaAmbulancias: false, //ya
            panelGestionAmbulancias: false, //ya
        };
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
            if (sesionActual.accesos != null) {
                sesionActual.accesos.forEach((element) => {
                    if (
                        element.tablename == 'Reporte Interh-Hospital' ||
                        element.tablename == 'Interh Reporte'
                    ) {
                        this.setState({
                            panelInterh: true,
                            colaInterH: true,
                            trasladoInterH: true,
                            tableroInterH: true,
                            login: false,
                        });
                    } else if (
                        element.tablename.includes('Inter') &&
                        element.tablename != 'Reporte Interh-Hospital' &&
                        element.tablename != 'Interh Reporte'
                    ) {
                        this.setState({
                            interhospitalario: true,
                            login: false,
                        });
                    } else if (
                        element.tablename.includes('Pre') &&
                        element.tablename != 'Detalle Preh-Hospital'
                    ) {
                        this.setState({
                            regulacion: true,
                            despacho: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Detalle Preh-Hospital') {
                        this.setState({
                            tableroPrehH: true,
                            trasladoPreh: true,
                            colaPreh: true,
                            panelPreH: true,
                            login: false,
                        });
                    } else if (
                        element.tablename == 'Eventos proximos Ambulancia'
                    ) {
                        this.setState({
                            eventos: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Ambulancia') {
                        this.setState({
                            panelGestionAmbulancias: true,
                            panelCoberturaAmbulancias: true,
                            ambulancias: true,
                            tipoServicios: true,
                            novedades: true,
                            login: false,
                        });
                    } else if (
                        element.tablename == 'Ambulancia' ||
                        element.tablename == 'Asignación Ambulancia' ||
                        element.tablename == 'Despacho Ambulancias' ||
                        element.tablename == 'Servicio Ambulancia'
                    ) {
                        this.setState({
                            ambulancias: true,
                            tipoServicios: true,
                            novedades: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Recordatorios') {
                        this.setState({
                            recordatorio: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Taller') {
                        this.setState({
                            taller: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Sala Admisión') {
                        this.setState({
                            admision: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Emergencias') {
                        this.setState({
                            emergencias: true,
                            monitoreokamban: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Urgencias') {
                        this.setState({
                            urgencias: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Clasificación') {
                        this.setState({
                            clasificacion: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Incidentes') {
                        this.setState({
                            incidentes: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Tipo Ambulancia') {
                        this.setState({
                            tipoambulancia: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Modalidad Ambulancia') {
                        this.setState({
                            modalidadambulancia: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Especial Ambulancia') {
                        this.setState({
                            especialambulancia: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Especialidad Hospital') {
                        this.setState({
                            especialidadhospital: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Usuarios') {
                        this.setState({
                            usuarios: true,
                            permisos: true,
                            nivel: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Code Planta') {
                        this.setState({
                            acode: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Sede Sismed') {
                        this.setState({
                            sede: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Base Ambulancia') {
                        this.setState({
                            base: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Webservices') {
                        this.setState({
                            webservices: true,
                            login: false,
                        });
                    } else if (
                        element.tablename == 'Medicamentos' ||
                        element.tablename == 'Medicamentos Registros'
                    ) {
                        this.setState({
                            medicamentos: true,
                            movil: true,
                            login: false,
                        });
                    } else if (
                        element.tablename == 'Insumos' ||
                        element.tablename == 'Insumos Registros'
                    ) {
                        this.setState({
                            insumos: true,
                            login: false,
                        });
                    } else if (
                        element.tablename == 'Procedimientos' ||
                        element.tablename == 'Procedimiento Registro'
                    ) {
                        this.setState({
                            procedimientos: true,
                            login: false,
                        });
                    } else if (element.tablename.includes('Explo')) {
                        this.setState({
                            exploracionfisica: true,
                            login: false,
                        });
                    } else if (
                        element.tablename == 'Hospital' ||
                        element.tablename == 'Hospitales Principales' ||
                        element.tablename == 'Sector Hospital' ||
                        element.tablename == 'Disponibilidad Hospitalaria' ||
                        element.tablename == 'Disponibilad Hospitalaria' ||
                        element.tablename == 'Especialidad Hospital'
                    ) {
                        this.setState({
                            medHospital: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Registro Diario') {
                        this.setState({
                            registro: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Censo Total') {
                        this.setState({
                            estadisticas: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Censo Total') {
                        this.setState({
                            reportes: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Recordatorios') {
                        this.setState({
                            alerta: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Sección Sala') {
                        this.setState({
                            seleccionsalas: true,
                            login: false,
                        });
                    } else if (element.tablename == 'Nueva Sección') {
                        this.setState({
                            nuevaseccion: true,
                            login: false,
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
            <Container
                fluid
                className={classNames('content', 'px-0', {
                    'is-open': this.props.isOpen,
                })}
            >
                <NavBar toggle={this.props.toggle} />

                <Container className="p-3 m-0 main" fluid>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/inicio" element={<Inicio />} />
                        <Route path="/informacion" element={<Info />} />
                        {this.state.colaInterH && (
                            <Route path="/colaInterH" element={<Cola />} />
                        )}

                        {this.state.interhospitalario && (
                            <Route
                                path="/interhospitalario"
                                element={<InterHospital />}
                            />
                        )}

                        {this.state.regulacion && (
                            <Route
                                path="/regulacion"
                                element={<Regulacion />}
                            />
                        )}

                        {this.state.despacho && (
                            <Route path="/despacho" element={<Despacho />} />
                        )}

                        {this.state.medHospital && (
                            <Route path="/medHospital" element={<Hospital />} />
                        )}

                        {this.state.registro && (
                            <Route path="/registro" element={<Registro />} />
                        )}

                        {this.state.reportes && (
                            <Route path="/reportes" element={<Reportes />} />
                        )}

                        {this.state.alerta && (
                            <Route path="/alerta" element={<Alerta />} />
                        )}

                        {this.state.estadistica && (
                            <Route
                                path="/estadistica"
                                element={<Estadistica />}
                            />
                        )}

                        {this.state.seleccionsalas && (
                            <Route
                                path="/seleccionsalas"
                                element={<Seleccionsalas />}
                            />
                        )}

                        {this.state.trasladoPreh && (
                            <Route
                                path="/trasladoPreh"
                                element={<TrasladoPreh />}
                            />
                        )}

                        {this.state.tableroPrehH && (
                            <Route
                                path="/tableroPrehH"
                                element={<TableroPreh />}
                            />
                        )}

                        {this.state.colaPreh && (
                            <Route path="/colaPreh" element={<ColaPreh />} />
                        )}

                        {this.state.nuevaseccion && (
                            <Route
                                path="/nuevaseccion"
                                element={<Nuevaseccion />}
                            />
                        )}

                        {this.state.eventos && (
                            <Route path="/eventos" element={<Eventos />} />
                        )}

                        {this.state.ambulancias && (
                            <Route
                                path="/ambulancias"
                                element={<Ambulancias />}
                            />
                        )}

                        {this.state.mantenimiento && (
                            <Route
                                path="/ambulancias/mantenimiento"
                                element={<Mantenimiento />}
                            />
                        )}

                        {this.state.recordatorio && (
                            <Route
                                path="/recordatorio"
                                element={<Recordatorio />}
                            />
                        )}

                        {this.state.taller && (
                            <Route path="/taller" element={<Taller />} />
                        )}

                        {this.state.tipoServicios && (
                            <Route
                                path="/tipoServicios"
                                element={<Catalogo />}
                            />
                        )}

                        {this.state.novedades && (
                            <Route path="/novedades" element={<Novedades />} />
                        )}

                        {this.state.admision && (
                            <Route path="/admision" element={<Admision />} />
                        )}

                        {this.state.clasificacion && (
                            <Route
                                path="/clasificacion"
                                element={<Clasificacion />}
                            />
                        )}

                        {this.state.emergencias && (
                            <Route
                                path="/emergencias"
                                element={<Emergencias />}
                            />
                        )}

                        {this.state.urgencias && (
                            <Route path="/urgencias" element={<Urgencias />} />
                        )}

                        {this.state.monitoreokamban && (
                            <Route
                                path="/monitoreokamban"
                                element={<Monitoreo />}
                            />
                        )}

                        {this.state.admision && (
                            <Route
                                path="/evaluacion"
                                element={<Evaluacion />}
                            />


                        )}
                        {this.state.monitoreokamban && (
                            <Route
                                path="/expediente"
                                element={<Expediente />}
                            />
                        )}
                        {this.state.tipoambulancia && (
                            <Route
                                path="/tipoambulancia"
                                element={<TipoAmbulancia />}
                            />
                        )}

                        {this.state.modalidadambulancia && (
                            <Route
                                path="/modalidadambulancia"
                                element={<ModalidadAmbulancia />}
                            />
                        )}

                        {this.state.especialambulancia && (
                            <Route
                                path="/especialambulancia"
                                element={<EspecialAmbulancia />}
                            />
                        )}

                        {this.state.especialidadhospital && (
                            <Route
                                path="/especialidadhospital"
                                element={<EspecialidadHospital />}
                            />
                        )}

                        {this.state.usuarios && (
                            <Route path="/usuarios" element={<Usuarios />} />
                        )}

                        {this.state.nivel && (
                            <Route path="/nivel" element={<Nivel />} />
                        )}

                        {this.state.acode && (
                            <Route path="/acode" element={<Acode />} />
                        )}

                        {this.state.sede && (
                            <Route path="/sede" element={<Sede />} />
                        )}

                        {this.state.base && (
                            <Route path="/base" element={<Base />} />
                        )}

                        {this.state.webservices && (
                            <Route
                                path="/webservices"
                                element={<Webservices />}
                            />
                        )}

                        {this.state.medicamentos && (
                            <Route
                                path="/medicamentos"
                                element={<Medicamentos />}
                            />
                        )}

                        {this.state.incidentes && (
                            <Route
                                path="/incidentes"
                                element={<Incidentes />}
                            />
                        )}

                        {this.state.insumos && (
                            <Route path="/insumos" element={<Insumos />} />
                        )}

                        {this.state.procedimientos && (
                            <Route
                                path="/procedimientos"
                                element={<Procedimientos />}
                            />
                        )}

                        {this.state.exploracionfisica && (
                            <Route
                                path="/exploracionfisica"
                                element={<ExploracionFisica />}
                            />
                        )}

                        {this.state.permisos && (
                            <Route path="/permisos" element={<Permisos />} />
                        )}

                        {this.state.login && (
                            <Route path="/login" element={<Login />} />
                        )}

                        {this.state.trasladoInterH && (
                            <Route
                                path="/trasladoInterH"
                                element={<TrasladoInterH />}
                            />
                        )}

                        {this.state.tableroInterH && (
                            <Route
                                path="/tableroInterH"
                                element={<TableroInterH />}
                            />
                        )}

                        {this.state.panelCoberturaAmbulancias && (
                            <Route
                                path="/panelCoberturaAmbulancias"
                                element={<PanelCobertura />}
                            />
                        )}

                        {this.state.panelGestionAmbulancias && (
                            <Route
                                path="/panelGestionAmbulancias"
                                element={<Gestion />}
                            />
                        )}
                    </Routes>
                </Container>

                <Card.Footer className="text-muted d-flex justify-content-center">
                    © {t('mensajes.piepag')}
                </Card.Footer>
            </Container>
        );
    }
}
export default withTranslation('global')(Content);
