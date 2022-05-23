import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

//import 'react-phone-input-2/lib/style.css'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set, update } from 'lodash';
import { useTranslation } from "react-i18next"


const Nivel = () => {

    const [t, i18n] = useTranslation("global");
    let url = useLocation().search
    const [searchParams] = useSearchParams();
    let cod = searchParams.get('cod')

    const [tablas, setTablas] = useState([]);

    const [pertabla, setPerTabla] = useState([])

    let tablare = [{ tabla: 'Acerca de', id: 1, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Amdiminstracción registro', id: 2, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Admisión', id: 3, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Ambulancia', id: 4, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Antecedentes Registro', id: 5, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Asegurador', id: 6, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Asignación Ambulancia', id: 7, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Base Ambulancia', id: 8, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Camas Hosptlz', id: 9, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Camas Pedtria', id: 10, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Camas UCI', id: 11, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Caso Múltiple', id: 12, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Catálogo', id: 13, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Causa externa', id: 14, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Causa Externa', id: 15, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Causa Registro', id: 16, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Causa Trauma Categoría', id: 17, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Causa Trauma Situación', id: 18, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Censo Total', id: 19, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Cie 10 Clas', id: 20, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Cie 10 Tipo', id: 21, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Cie 10dx', id: 22, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'CIE10', id: 23, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Clasificación', id: 24, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Clasificación', id: 25, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Code Planta', id: 26, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Consulta peru Camas', id: 27, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Control', id: 28, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Control', id: 29, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Custom View 1', id: 30, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Departamento', id: 31, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Depto Reniec', id: 32, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Despacho', id: 33, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Despacho', id: 34, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Despacho Ambulancias', id: 35, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Destino', id: 36, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Detalle Inter-Hospital', id: 37, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Detalle Preh-Hospital', id: 38, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Disponibilidad Hospitalaria', id: 39, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Disponibilad Hospitalaria', id: 40, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Distrito', id: 41, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Distrito Reniec', id: 42, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'División Hosp', id: 43, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Divisiones', id: 44, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Emergencias', id: 45, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Especial Ambulancia', id: 46, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Especialidad Hospital', id: 47, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Eventos proximos Ambulancia', id: 48, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Explo física Registro', id: 49, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Explo general Afección', id: 50, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Explo general Cat', id: 51, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Explo general Registro', id: 52, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Exploración Física', id: 53, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Firmas Registro', id: 54, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Hospital', id: 55, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Hospitales Principales', id: 56, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Incidentes', id: 57, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Inicio', id: 58, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Insumos', id: 59, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Insumos Registros', id: 60, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Inter Despacho', id: 61, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Inter-Hospital', id: 62, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Acción', id: 63, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Cierre', id: 64, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Estado', id: 65, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh EvaluaciónCínica', id: 66, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Hospitales', id: 67, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Map', id: 68, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh MotivoAtención', id: 69, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Prioridad', id: 70, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Reporte', id: 71, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh Seguimiento', id: 72, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Interh TipoServicio', id: 73, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Mantenimiento', id: 74, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Medicamentos', id: 75, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Medicamentos Registros', id: 76, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Modalidad Ambulancia', id: 77, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Nivel Hospital', id: 78, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Nueva Sección', id: 79, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Obstétrico Registro', id: 80, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'PacienteGeneral', id: 81, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Perfiles', id: 82, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Pre-Hospital', id: 83, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Preh Cierre', id: 84, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Preh Destino', id: 85, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Preh EvaluaciónClínica', id: 86, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Preh Map', id: 87, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Preh Seguimiento', id: 88, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Preh Servicio Ambulancia', id: 89, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Procedimiento Registro', id: 90, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Procedimientos', id: 91, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Provincias', id: 92, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Provincias Reniec', id: 93, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'r 1', id: 94, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'r 2', id: 95, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Recordatorios', id: 96, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Registro Diario', id: 97, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Reporte Interh-Hospital', id: 98, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Reportes', id: 99, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Sala Admisión', id: 100, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Sala Rac', id: 101, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Sección Sala', id: 102, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Sector Hospital', id: 103, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Sede Sismed', id: 104, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Servicio Ambulancia', id: 105, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Servicio Disponibilidad', id: 106, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Servicios División', id: 107, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Servicios Hospitalarios', id: 108, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tablero', id: 109, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tablero Control', id: 110, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Taller', id: 111, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Temp Camas', id: 112, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tipo Ambulancia', id: 113, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tipo CierreCaso', id: 114, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tipo Edad', id: 115, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tipo Género', id: 116, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tipo Id', id: 117, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tipo Llamada', id: 118, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Tipo Paciente', id: 119, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Trauma Registro', id: 120, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Triage', id: 121, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Turno Registro', id: 122, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Términos y Condiciones', id: 123, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Urgencias', id: 124, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'UserLevelPermissions', id: 125, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Usuarios', id: 126, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Valida', id: 127, agregar: false, editar: false, ver: false, eliminar: false, admin: false },
    { tabla: 'Webservices', id: 128, agregar: false, editar: false, ver: false, eliminar: false, admin: false }]

    const Get = async () => {
        await axios.get(`/api/userlevelpermissions/${cod}`)
            .then(response => {
                response.data.map(e => {

                    tablare.map(b => {
                        if (e.tablename === b.tabla) {
                            if (e.permission === 1) {
                                b.agregar = true
                            }
                            if (e.permission === 2) {
                                b.editar = true
                            }
                            if (e.permission === 3) {
                                b.ver = true
                            }
                            if (e.permission === 4) {
                                b.eliminar = true
                            }
                            if (e.permission === 5) {
                                b.admin = true
                            }
                        }
                    })
                })
                setTablas(response.data)
                return response.data;
            })
            .catch(error => {
                return error;
            })
        setPerTabla(tablare)

    }


    useEffect(() => {
        Get()
    }, []);


    const agregar = (cd) => {
        tablare = pertabla
        if (tablare[cd - 1].agregar) {
            tablare[cd - 1].agregar = false;
        } else {
            tablare[cd - 1].agregar = true;
        }
        setPerTabla(tablare)
    }
    const editar = (cd) => {
        tablare = pertabla
        if (tablare[cd - 1].editar) {
            tablare[cd - 1].editar = false;
        } else {
            tablare[cd - 1].editar = true;
        }
        setPerTabla(tablare)
    }
    const ver = (cd) => {
        tablare = pertabla
        if (tablare[cd - 1].ver) {
            tablare[cd - 1].ver = false;
        } else {
            tablare[cd - 1].ver = true;
        }
        setPerTabla(tablare)
    }
    const eliminar = (cd) => {
        tablare = pertabla
        if (tablare[cd - 1].eliminar) {
            tablare[cd - 1].eliminar = false;
        } else {
            tablare[cd - 1].eliminar = true;
        }
        setPerTabla(tablare)
    }

    const admin = (cd) => {
        tablare = pertabla
        if (tablare[cd - 1].admin) {
            tablare[cd - 1].admin = false;
        } else {
            tablare[cd - 1].admin = true;
        }
        setPerTabla(tablare)
    }

    const Post = () => {

        pertabla.map(item => {
            let ag = false
            let ed = false
            let ve = false
            let el = false
            let ad = false

            tablas.map(td => {
                if (item.agregar || item.editar || item.ver || item.eliminar || item.admin) {
                    if (td.tablename === item.tabla && td.permission === 1) {
                        ag = true
                    }
                    if (td.tablename === item.tabla && td.permission === 2) {
                        ed = true
                    }
                    if (td.tablename === item.tabla && td.permission === 3) {
                        ve = true
                    }
                    if (td.tablename === item.tabla && td.permission === 4) {
                        el = true
                    }
                    if (td.tablename === item.tabla && td.permission === 5) {
                        ad = true
                    }

                }

                if (td.tablename === item.tabla) {
                    if (!item.agregar && td.permission === 1) {
                        axios.post('/api/userlevelpermissions/destruir', { userlevelid: `${cod}`, tablename: item.tabla, permission: 1 })
                            .then(response => {

                                return response.data;
                            })
                            .catch(error => {

                                return error.response.data;
                            })
                    }
                    if (!item.editar && td.permission === 2) {
                        axios.post('/api/userlevelpermissions/destruir', { userlevelid: `${cod}`, tablename: item.tabla, permission: 2 })
                            .then(response => {
                                return response.data;
                            })
                            .catch(error => {

                                return error.response.data;
                            })
                    }
                    if (!item.ver && td.permission === 3) {
                        axios.post('/api/userlevelpermissions/destruir', { userlevelid: `${cod}`, tablename: item.tabla, permission: 3 })
                            .then(response => {
                                return response.data;
                            })
                            .catch(error => {

                                return error.response.data;
                            })
                    }
                    if (!item.eliminar && td.permission === 4) {
                        axios.post('/api/userlevelpermissions/destruir', { userlevelid: `${cod}`, tablename: item.tabla, permission: 4 })
                            .then(response => {
                                return response.data;
                            })
                            .catch(error => {

                                return error.response.data;
                            })
                    }
                    if (!item.admin && td.permission === 5) {
                        axios.post('/api/userlevelpermissions/destruir', { userlevelid: `${cod}`, tablename: item.tabla, permission: 5 })
                            .then(response => {

                                return response.data;
                            })
                            .catch(error => {

                                return error.response.data;
                            })
                    }
                }

            })

            if (!ag && item.agregar) {
                axios.post('/api/userlevelpermissions', { userlevelid: `${cod}`, tablename: item.tabla, permission: 1 })
                    .then(response => {

                        return response.data;
                    })
                    .catch(error => {

                        return error.response.data;
                    })
            }
            if (!ed && item.editar) {
                axios.post('/api/userlevelpermissions', { userlevelid: `${cod}`, tablename: item.tabla, permission: 2 })
                    .then(response => {

                        return response.data;
                    })
                    .catch(error => {

                        return error.response.data;
                    })
            }
            if (!ve && item.ver) {
                axios.post('/api/userlevelpermissions', { userlevelid: `${cod}`, tablename: item.tabla, permission: 3 })
                    .then(response => {

                        return response.data;
                    })
                    .catch(error => {

                        return error.response.data;
                    })
            }
            if (!el && item.eliminar) {
                axios.post('/api/userlevelpermissions', { userlevelid: `${cod}`, tablename: item.tabla, permission: 4 })
                    .then(response => {

                        return response.data;
                    })
                    .catch(error => {

                        return error.response.data;
                    })
            }
            if (!ad && item.admin) {
                axios.post('/api/userlevelpermissions', { userlevelid: `${cod}`, tablename: item.tabla, permission: 5 })
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => {

                        return error.response.data;
                    })
            }
        })
    }


    const { SearchBar } = Search;
    const columns = [{
        dataField: 'tabla',
        text: `${t("administracion.permisos.datos.tablas")}`,
        sort: true
    }, {

        text: `${t("administracion.permisos.datos.agregar")}`,
        dataField: '12547575',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Form.Check aria-label="option 1" name='agregar' defaultChecked={row.agregar} onClick={() => {
                        agregar(row.id)
                    }
                    } />
                </div>
            );
        }
    }, {

        text: `${t("administracion.permisos.datos.editar")}`,
        dataField: '525874',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Form.Check aria-label="option 1" name='editar' defaultChecked={row.editar} onClick={() => {
                        editar(row.id)
                    }
                    } />
                </div>
            );
        }
    }, {

        text: `${t("administracion.permisos.datos.ver")}`,
        dataField: '9745',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Form.Check aria-label="option 1" name='ver' defaultChecked={row.ver} onClick={() => {
                        ver(row.id)
                    }
                    } />
                </div>
            );
        }
    }, {

        text: `${t("administracion.permisos.datos.eliminar")}`,
        dataField: '453',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div>
                    <Form.Check aria-label="option 1" name='eliminar' defaultChecked={row.eliminar} onClick={() => {
                        eliminar(row.id)
                    }
                    } />
                </div>
            );
        }
    }, {

        text: `${t("administracion.permisos.datos.admin")}`,
        dataField: '1235',
        formatter: (cell, row, rowIndex, extraData) => {
            return (
                <div className='align-content-lg-center'>
                    <Form.Check aria-label="option 1" name='admin' defaultChecked={row.admin} onClick={() => {
                        admin(row.id)
                    }
                    } />
                </div>
            );
        }
    }
    ];
    const options = {
        custom: true,
        paginationSize: 5,
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
        totalSize: pertabla.length
    };
    const selectRow = {
        mode: 'radio',
        selected: [1],
        hideSelectColumn: true
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id"
                columns={columns}
                data={pertabla}
                search
            >
                {
                    toolkitprops => (
                        <div>
                            <SearchBar placeholder={`${t("tabla.buscador")}`}   {...toolkitprops.searchProps} />
                            <BootstrapTable
                                striped
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
                <h2>{t("administracion.permisos.titulo")}</h2>
            </div>
            <div>
                <PaginationProvider
                    pagination={
                        paginationFactory(options)
                    }
                >
                    {contentTable}
                </PaginationProvider>
                <Button variant="primary" className='m-xxl-4' onClick={Post}>
                    {t("etiquetas.agregar")}
                </Button>
                <Link to="/nivel">
                    <Button variant="secondary" className='m-xxl-4'>
                        {t("etiquetas.cancelar")}
                    </Button>
                </Link>
            </div>

        </div>
    )

}

export default Nivel;
