import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Icofont from 'react-icofont';
import Modal from 'react-bootstrap/Modal';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import { DateTime } from 'luxon';
import InputMask from 'react-input-mask';
import { useEffect, useState } from 'react';
import ToolkitProvider, {
    Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Select, { StylesConfig } from 'react-select';

import chroma from 'chroma-js';

import { useTranslation } from 'react-i18next';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const FormularioEvaluacion = (params) => {
    const [t, i18n] = useTranslation('global');
    const colourOptions = [
        { value: 'Critico', label: 'Critico', color: '#FF5630' },
        { value: 'Severo', label: 'Severo', color: '#FF8B00' },
        { value: 'Moderado', label: 'Moderado', color: '#FFC400' },
        { value: 'Leve', label: 'Leve', color: '#36B37E' },
    ];
    const [nuevaEvaluacion, setNuevaEvaluacion] = useState(null);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [formEvaluacion, setFormEvaluacion] = useState({
        id_paciente: '',
        fecha_horaevaluacion: DateTime.now(),
        cod_casopreh: '',
        cod_paciente: '',
        cod_diag_cie: '',
        diagnos_txt: '',
        triage: '',
        c_clinico: '',
        examen_fisico: '',
        tratamiento: '',
        antecedentes: '',
        paraclinicos: '',
        sv_tx: '',
        sv_fc: '',
        sv_fr: '',
        sv_temp: '',
        sv_gl: '',
        peso: '',
        talla: '',
        sv_fcf: '',
        sv_sato2: '',
        sv_apgar: '',
        sv_gli: '',
        usu_sede: '',
        tiempo_enfermedad: '',
        tipo_enfermedad: '',
        ap_med_paciente: '',
        ap_diabetes: '',
        ap_cardiop: '',
        ap_convul: '',
        ap_asma: '',
        ap_acv: '',
        ap_has: '',
        ap_alergia: '',
        ap_otros: '',
        tipo_paciente: '',
    });
    const clearform = () => {
        setFormEvaluacion({
            id_paciente: '',
            fecha_horaevaluacion: DateTime.now(),
            cod_paciente: '',
            cod_diag_cie: '',
            diagnos_txt: '',
            triage: '',
            c_clinico: '',
            examen_fisico: '',
            tratamiento: '',
            antecedentes: '',
            paraclinicos: '',
            sv_tx: '',
            sv_fc: '',
            sv_fr: '',
            sv_temp: '',
            sv_gl: '',
            peso: '',
            talla: '',
            sv_fcf: '',
            sv_sato2: '',
            sv_apgar: '',
            sv_gli: '',
            usu_sede: '',
            tiempo_enfermedad: '',
            tipo_enfermedad: '',
            ap_med_paciente: '',
            ap_diabetes: '',
            ap_cardiop: '',
            ap_convul: '',
            ap_asma: '',
            ap_acv: '',
            ap_has: '',
            ap_alergia: '',
            ap_otros: '',
            tipo_paciente: '',
        });
    };
    const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? data.color
                    : isFocused
                    ? color.alpha(0.1).css()
                    : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const [cie10s, setcie10s] = useState([]);
    const [cie10, setcie10] = useState('');
    const [idcie10, setIdcie10] = useState('');
    const [cie10Temp, setcie10Temp] = useState('');
    const [idcie10Temp, setIdcie10Temp] = useState('');
    const [tipos, setTipos] = useState([]);
    const [condicion, setCondicion] = useState([]);
    const handleChangeFormEvaluacion = (e) => {
        e.persist();
        params.setFormEvaluacion((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChangeFormEvaluacionNueva = (e) => {
        e.persist();
        setFormEvaluacion((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChangeEnmascarado = (e) => {
        e.persist();
        setFormEvaluacion((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            cod_casopreh: params.formEvaluacion.cod_casopreh,
        }));
    };

    const seleccionColor = (e) => {
        params.setFormEvaluacion((prevState) => ({
            ...prevState,
            cod_paciente: e.value,
        }));
    };
    const seleccionColorNuevo = (e) => {
        setFormEvaluacion((prevState) => ({
            ...prevState,
            cod_paciente: e.value,
        }));
    };
    const { SearchBar } = Search;
    //TABLA CIE10
    const columns = [
        {
            dataField: 'codigo_cie',
            text: `${t('formularios.formevaluacion.codigo')}`,
            sort: true,
        },
        {
            dataField: 'diagnostico',
            text: `${t('formularios.formevaluacion.diagnostico')}`,
            sort: true,
        },
    ];
    const options = {
        custom: true,
        paginationSize: 3,
        pageStartIndex: 1,
        firstPageText: `${t('tabla.primera')}`,
        prePageText: `${t('tabla.anterior')}`,
        nextPageText: `${t('tabla.sgte')}`,
        lastPageText: `${t('tabla.ultima')}`,
        nextPageTitle: `${t('tabla.sgtepag')}`,
        prePageTitle: `${t('tabla.anteriorpag')}`,
        firstPageTitle: `${t('tabla.primerapag')}`,
        lastPageTitle: `${t('tabla.ultimapag')}`,
        showTotal: true,
        totalSize: cie10s.length,
    };
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        style: { color: '#fff', background: '#0d6efd' },
        onSelect: (row, isSelect, rowIndex, e) => {
            setcie10Temp(row.diagnostico);
            setIdcie10Temp(row.codigo_cie);
        },
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="codigo_cie"
                columns={columns}
                data={cie10s}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <SearchBar
                            placeholder={`${t('tabla.buscador')}`}
                            {...toolkitprops.searchProps}
                            className="mb-3"
                        />
                        <BootstrapTable
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={`${t('tabla.sindatos')}`}
                            selectRow={selectRow}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );
    const GetCie10 = () => {
        axios
            .get('/api/cie10')
            .then((response) => {
                setcie10s(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipo = () => {
        axios
            .get('/api/tipo_paciente')
            .then((response) => {
                setTipos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
    useEffect(() => {
        GetTipo();
        GetCie10();
        //GetCondicion();
    }, []);

    const notificarExitoCaso = (idcaso) =>
        toast.success(
            `${t('mensajes.mscasoid')} ${idcaso} ${t('mensajes.msexito')}`,
            {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            }
        );

    const notificarErrorCaso = () =>
        toast.error(`${t('mensajes.mscreacionerror')}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const PostEvaluaciones = () => {
        setEvaluaciones(params.formEvaluacion.evaluaciones_clinicas);

        axios
            .post('/api/preh_evaluacionclinica', formEvaluacion)
            .then((response) => {
                clearform();
                notificarExitoCaso(response.data.id_evaluacionclinica);
                setNuevaEvaluacion(response.data);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };
    useEffect(() => {
        if (nuevaEvaluacion != null) {
            evaluaciones.push(nuevaEvaluacion);
            setFormEvaluacion((prevState) => ({
                ...prevState,
                evaluaciones_clinicas: evaluaciones,
            }));
        }
    }, [nuevaEvaluacion]);
    const seleccionEvaluacion = (e) => {
        e.persist();
        if (e.target.value != '') {
            params.setFormEvaluacion((prevState) => ({
                ...prevState,
                id_evaluacionclinica:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .id_evaluacionclinica,
                fecha_horaevaluacion:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .fecha_horaevaluacion,
                cod_paciente:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .cod_paciente,
                cod_diag_cie:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .cod_diag_cie,
                diagnos_txt:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .diagnos_txt,
                triage: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].triage,
                c_clinico:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .c_clinico,
                examen_fisico:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .examen_fisico,
                tratamiento:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .tratamiento,
                antecedentes:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .antecedentes,
                paraclinicos:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .paraclinicos,
                sv_tx: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].sv_tx,
                sv_fc: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].sv_fc,
                sv_fr: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].sv_fr,
                sv_temp:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .sv_temp,
                sv_gl: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].sv_gl,
                peso: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].peso,
                talla: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].talla,
                sv_fcf: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].sv_fcf,
                sv_sato2:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .sv_sato2,
                sv_apgar:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .sv_apgar,
                sv_gli: params.formEvaluacion.evaluaciones_clinicas[
                    e.target.value
                ].sv_gli,
                usu_sede:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .usu_sede,
                tipo_paciente:
                    params.formEvaluacion.evaluaciones_clinicas[e.target.value]
                        .tipo_paciente,
            }));
        }
    };
    return (
        <div>
            <Form>
                <Form.Group as={Col}>
                    <Form.Label>
                        <strong>
                            {t('formularios.formevaluacion.selectevaluacion')}
                        </strong>
                    </Form.Label>
                    <InputGroup className="mb-2">
                        <Form.Control
                            as="select"
                            placeholder={`${t(
                                'formularios.formevaluacion.paciente'
                            )}`}
                            name="tipo_doc"
                            onChange={seleccionEvaluacion}
                        >
                            <option value="">{`-- ${t(
                                'etiquetas.seleccion'
                            )} --`}</option>

                            {params.formEvaluacion.evaluaciones_clinicas.map(
                                (elemento) => (
                                    <option
                                        key={elemento.id_evaluacionclinica}
                                        value={params.formEvaluacion.evaluaciones_clinicas.indexOf(
                                            elemento
                                        )}
                                    >
                                        {elemento.id_evaluacionclinica}:{' '}
                                        {elemento.nombre1} {elemento.nombre2}{' '}
                                        {elemento.apellido1}{' '}
                                        {elemento.apellido2}
                                    </option>
                                )
                            )}
                        </Form.Control>
                        <InputGroup.Text onClick={handleShow3}>
                            <Icofont icon="ui-add" className="mx-2" />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                {params.formEvaluacion.cod_casopreh != '' &&
                params.formEvaluacion.fecha_horaevaluacion != '' ? (
                    <div>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.ta')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={params.formEvaluacion.sv_tx}
                                    mask="(999)/(999) mmHg"
                                    name="sv_tx"
                                    onChange={handleChangeFormEvaluacion}
                                >
                                    <Form.Control
                                        type="text"
                                        name="sv_tx"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.ta'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.fc')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={params.formEvaluacion.sv_fc}
                                    mask="999 bpm"
                                    name="sv_fc"
                                    onChange={handleChangeFormEvaluacion}
                                >
                                    <Form.Control
                                        type="text"
                                        name="sv_fc"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.fc'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.fr')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={params.formEvaluacion.sv_fr}
                                    mask="99 rpm"
                                    name="sv_fr"
                                    onChange={handleChangeFormEvaluacion}
                                >
                                    <Form.Control
                                        type="text"
                                        name="sv_fr"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.fr'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.to')}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={params.formEvaluacion.sv_temp}
                                    type="number"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.to'
                                    )}`}
                                    name="sv_temp"
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.glasgow'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="sv_gl"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.glasgow'
                                    )}`}
                                    value={params.formEvaluacion.sv_gl}
                                    onKeyUp={(e) => {
                                        if (e.target.value > 15) {
                                            e.target.value = 15;
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (
                                            e.target.value < 3 &&
                                            e.target.value != ''
                                        ) {
                                            e.target.value = 3;
                                        }
                                    }}
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.sp01')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={params.formEvaluacion.sv_sato2}
                                    mask="999 %"
                                    name="sv_sato2"
                                    onChange={handleChangeFormEvaluacion}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.sp02'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.glicemia'
                                        )}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={params.formEvaluacion.sv_gli}
                                    mask="99 mg/dL"
                                    name="sv_gli"
                                    onChange={handleChangeFormEvaluacion}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.glicemia'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.talla')}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={params.formEvaluacion.talla}
                                    placeholder={`${t(
                                        'formularios.formevaluacion.talla'
                                    )}`}
                                    name="talla"
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.peso')}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={params.formEvaluacion.peso}
                                    placeholder={`${t(
                                        'formularios.formevaluacion.peso'
                                    )}`}
                                    name="peso"
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.condicionpcte'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Select
                                    name="cod_paciente"
                                    onChange={seleccionColor}
                                    defaultValue={colourOptions[2]}
                                    options={colourOptions}
                                    styles={colourStyles}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.tipopcte'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={params.formEvaluacion.tipo_paciente}
                                    name="tipo_paciente"
                                    onChange={handleChangeFormEvaluacion}
                                >
                                    <option>{`-- ${t(
                                        'etiquetas.seleccion'
                                    )} --`}</option>
                                    {tipos.map((tipo) => (
                                        <option
                                            key={tipo.id_tipopaciente}
                                            value={tipo.id_tipopaciente}
                                        >
                                            {tipo.nombre_tipopaciente}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInputGroup">
                                    <strong>
                                        {t('formularios.formevaluacion.cie10')}
                                    </strong>
                                </Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        id="inlineFormInputGroup"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.cie10'
                                        )}`}
                                        name="cod_diag_cie"
                                        disabled
                                        value={
                                            params.formEvaluacion
                                                .cod_diag_cie || cie10
                                        }
                                        onChange={handleChangeFormEvaluacion}
                                    />
                                    <InputGroup.Text onClick={handleShow2}>
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.cuadroclinico'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={params.formEvaluacion.c_clinico}
                                    type="text"
                                    as="textarea"
                                    name="c_clinico"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.cuadroclinico'
                                    )}`}
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.examenfisico'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={params.formEvaluacion.examen_fisico}
                                    type="text"
                                    as="textarea"
                                    name="examen_fisico"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.examenfisico'
                                    )}`}
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.antecedentes'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={params.formEvaluacion.antecedentes}
                                    type="text"
                                    as="textarea"
                                    name="antecedentes"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.antecedentes'
                                    )}`}
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.paraclinicos'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={params.formEvaluacion.paraclinicos}
                                    type="text"
                                    as="textarea"
                                    name="paraclinicos"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.paraclinicos'
                                    )}`}
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.tratamiento'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={params.formEvaluacion.tratamiento}
                                    type="text"
                                    as="textarea"
                                    name="tratamiento"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.tratamiento'
                                    )}`}
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.informaciondx'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={params.formEvaluacion.diagnos_txt}
                                    type="text"
                                    as="textarea"
                                    name="diagnos_txt"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.informaciondx'
                                    )}`}
                                    onChange={handleChangeFormEvaluacion}
                                />
                            </Form.Group>
                        </Row>
                    </div>
                ) : (
                    ''
                )}
            </Form>
            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t('formularios.formevaluacion.selectcie10')}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <PaginationProvider pagination={paginationFactory(options)}>
                        {contentTable}
                    </PaginationProvider>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setcie10(cie10Temp);
                            setIdcie10(idcie10Temp);
                            params.setFormEvaluacion((prevState) => ({
                                ...prevState,
                                cod_diag_cie: idcie10Temp,
                            }));
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.seleccionar')}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose2();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show3} onHide={handleClose3} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t('formularios.formevaluacion.crearevaluacion')}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formevaluacion.selectpaciente'
                                    )}
                                </strong>
                            </Form.Label>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    as="select"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.paciente'
                                    )}`}
                                    value={formEvaluacion.id_paciente}
                                    name="id_paciente"
                                    onChange={handleChangeFormEvaluacionNueva}
                                >
                                    <option value="">{`-- ${t(
                                        'etiquetas.seleccion'
                                    )} --`}</option>

                                    {params.formEvaluacion.pacientes.map(
                                        (elemento) => (
                                            <option
                                                key={elemento.id_paciente}
                                                value={elemento.id_paciente}
                                            >
                                                {elemento.nombre1}{' '}
                                                {elemento.nombre2}{' '}
                                                {elemento.apellido1}{' '}
                                                {elemento.apellido2}{' '}
                                            </option>
                                        )
                                    )}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.ta')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={formEvaluacion.sv_tx}
                                    mask="(999)/(999) mmHg"
                                    name="sv_tx"
                                    onChange={handleChangeEnmascarado}
                                >
                                    <Form.Control
                                        type="text"
                                        name="sv_tx"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.ta'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.fc')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={formEvaluacion.sv_fc}
                                    mask="999 bpm"
                                    name="sv_fc"
                                    onChange={handleChangeFormEvaluacionNueva}
                                >
                                    <Form.Control
                                        type="text"
                                        name="sv_fc"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.fc'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.fr')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={formEvaluacion.sv_fr}
                                    mask="99 rpm"
                                    name="sv_fr"
                                    onChange={handleChangeFormEvaluacionNueva}
                                >
                                    <Form.Control
                                        type="text"
                                        name="sv_fr"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.fr'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.to')}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={formEvaluacion.sv_temp}
                                    type="number"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.to'
                                    )}`}
                                    name="sv_temp"
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.glasgow'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="sv_gl"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.glasgow'
                                    )}`}
                                    value={formEvaluacion.sv_gl}
                                    onKeyUp={(e) => {
                                        if (e.target.value > 15) {
                                            e.target.value = 15;
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (
                                            e.target.value < 3 &&
                                            e.target.value != ''
                                        ) {
                                            e.target.value = 3;
                                        }
                                    }}
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.sp02')}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={formEvaluacion.sv_sato2}
                                    mask="999 %"
                                    name="sv_sato2"
                                    onChange={handleChangeFormEvaluacionNueva}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.sp02'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.glicemia'
                                        )}
                                    </strong>
                                </Form.Label>
                                <InputMask
                                    value={formEvaluacion.sv_gli}
                                    mask="99 mg/dL"
                                    name="sv_gli"
                                    onChange={handleChangeFormEvaluacionNueva}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.glicemia'
                                        )}`}
                                    />
                                </InputMask>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.talla')}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formEvaluacion.talla}
                                    placeholder={`${t(
                                        'formularios.formevaluacion.talla'
                                    )}`}
                                    name="talla"
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t('formularios.formevaluacion.peso')}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formEvaluacion.peso}
                                    placeholder={`${t(
                                        'formularios.formevaluacion.peso'
                                    )}`}
                                    name="peso"
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.condicionpcte'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Select
                                    name="cod_paciente"
                                    onChange={seleccionColorNuevo}
                                    defaultValue={colourOptions[2]}
                                    options={colourOptions}
                                    styles={colourStyles}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.tipopcte'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formEvaluacion.tipo_paciente}
                                    name="tipo_paciente"
                                    onChange={handleChangeFormEvaluacionNueva}
                                >
                                    <option>{`-- ${t(
                                        'etiquetas.seleccion'
                                    )} --`}</option>
                                    {tipos.map((tipo) => (
                                        <option
                                            key={tipo.id_tipopaciente}
                                            value={tipo.id_tipopaciente}
                                        >
                                            {tipo.nombre_tipopaciente}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInputGroup">
                                    <strong>
                                        {t('formularios.formevaluacion.cie10')}
                                    </strong>
                                </Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        id="inlineFormInputGroup"
                                        placeholder={`${t(
                                            'formularios.formevaluacion.cie10'
                                        )}`}
                                        name="cod_diag_cie"
                                        disabled
                                        value={
                                            formEvaluacion.cod_diag_cie || cie10
                                        }
                                        onChange={
                                            handleChangeFormEvaluacionNueva
                                        }
                                    />
                                    <InputGroup.Text onClick={handleShow2}>
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.cuadroclinico'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={formEvaluacion.c_clinico}
                                    type="text"
                                    as="textarea"
                                    name="c_clinico"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.cuadroclinico'
                                    )}`}
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.examenfisico'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={formEvaluacion.examen_fisico}
                                    type="text"
                                    as="textarea"
                                    name="examen_fisico"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.examenfisico'
                                    )}`}
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.antecedentes'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={formEvaluacion.antecedentes}
                                    type="text"
                                    as="textarea"
                                    name="antecedentes"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.antecedentes'
                                    )}`}
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.paraclinicos'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={formEvaluacion.paraclinicos}
                                    type="text"
                                    as="textarea"
                                    name="paraclinicos"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.paraclinicos'
                                    )}`}
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.tratamiento'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={formEvaluacion.tratamiento}
                                    type="text"
                                    as="textarea"
                                    name="tratamiento"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.tratamiento'
                                    )}`}
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formevaluacion.informaciondx'
                                        )}
                                    </strong>
                                </Form.Label>
                                <Form.Control
                                    value={formEvaluacion.diagnos_txt}
                                    type="text"
                                    as="textarea"
                                    name="diagnos_txt"
                                    placeholder={`${t(
                                        'formularios.formevaluacion.informaciondx'
                                    )}`}
                                    onChange={handleChangeFormEvaluacionNueva}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            PostEvaluaciones();
                            handleClose3();
                        }}
                    >
                        {t('etiquetas.crear')}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose3();
                        }}
                    >
                        {t('etiquetas.cancelar')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FormularioEvaluacion;
