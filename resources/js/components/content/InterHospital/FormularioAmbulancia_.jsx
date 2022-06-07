import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Icofont from 'react-icofont';
import Modal from 'react-bootstrap/Modal';
import BootstrapTable from 'react-bootstrap-table-next';
import DatePicker from 'react-datepicker';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ToolkitProvider, {
    Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-picker/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const { DateTime } = require('luxon');

const FormularioAmbulancia = (params) => {
    const [t, i18n] = useTranslation('global');
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [ambulancias, setambulancias] = useState([]);
    const [codAmbulanciaTemp, setCodAmbulanciaTemp] = useState('');
    const [fechaActual, setFechaActual] = useState('');
    const [startDate, setStartDate] = useState(
        params.formAmbulancia.hora_asigna
    );
    const [startDatellegada, setStartDatellegada] = useState(
        params.formAmbulancia.hora_llegada
    );
    const [startDateinicio, setStartDateinicio] = useState(
        params.formAmbulancia.hora_inicio
    );
    const [startDatedestino, setStartDatedestino] = useState(
        params.formAmbulancia.hora_destino
    );
    const [startDatebase, setStartDatebase] = useState(
        params.formAmbulancia.hora_preposicion
    );

    const { SearchBar } = Search;

    //TABLA ambulancia
    const columns = [
        {
            dataField: 'codigo',
            text: `${t('formularios.formambulancias.codigo')}`,
            sort: true,
        },
        {
            dataField: 'cod_ambulancias',
            text: `${t('formularios.formambulancias.placa')}`,
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
        totalSize: ambulancias.length,
    };

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        classes: 'selection-row',
        onSelect: (row, isSelect, rowIndex, e) => {
            setCodAmbulanciaTemp(row.cod_ambulancias);
        },
    };

    const [formAmbulancia, setFormAmbulancia] = useState({
        id_servcioambulacia: '',
        cod_ambulancia: '',
        hora_asigna: '',
        hora_llegada: '',
        hora_inicio: '',
        hora_destino: '',
        hora_preposicion: '',
        conductor: '',
        medico: '',
        paramedico: '',
        observaciones: '',
    });

    const actual = () => {
        setFechaActual(DateTime.fromISO(DateTime.now()));
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_ambulancias"
                columns={columns}
                data={ambulancias}
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
                            striped
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

    const handleChangeFormAmbulancia = (e) => {
        e.persist();
        setFormAmbulancia((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

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

    useEffect(() => {
        params.setFormAmbulancia((prevState) => ({
            ...prevState,
            hora_asigna: fechaActual,
        }));
    }, [fechaActual]);

    useEffect(() => {
        const GetAmbulancias = async () => {
            await axios
                .get('/api/ambulancias/listaespecial')
                .then((response) => {
                    setambulancias(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        GetAmbulancias();
    }, []);

    useEffect(() => {
        console.log(formAmbulancia);
        if (formAmbulancia.id_servcioambulacia) {
            //Actualizacion de servicio ambulancia, la funcion isNaN me verifica si esta entrando o no un numero
            axios
                .put(
                    `/api/servicio_ambulancia/${formAmbulancia.id_servcioambulacia}`,
                    {
                        cod_casointerh: params.formAmbulancia.cod_casointerh,
                        hora_asigna: !isNaN(startDate)
                            ? params.formAmbulancia.hora_asigna
                            : startDate,
                        hora_llegada: !isNaN(startDatellegada)
                            ? params.formAmbulancia.hora_llegada
                            : startDatellegada,
                        hora_inicio: !isNaN(startDateinicio)
                            ? params.formAmbulancia.hora_inicio
                            : startDateinicio,
                        hora_destino: !isNaN(startDatedestino)
                            ? params.formAmbulancia.hora_destino
                            : startDatedestino,
                        hora_preposicion: !isNaN(startDatebase)
                            ? params.formAmbulancia.hora_preposicion
                            : startDatebase,
                        cod_ambulancia: formAmbulancia.cod_ambulancia,
                        conductor: formAmbulancia.conductor,
                        medico: formAmbulancia.medico,
                        paramedico: formAmbulancia.paramedico,
                        observaciones: formAmbulancia.observaciones,
                    }
                )
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        } else if (
            formAmbulancia.cod_casointerh != null &&
            formAmbulancia.cod_casointerh != ''
        ) {
            axios
                .post('/api/servicio_ambulancia', {
                    cod_casointerh: params.formAmbulancia.cod_casointerh,
                    hora_asigna: startDate,
                    hora_llegada: startDatellegada,
                    hora_inicio: startDateinicio,
                    hora_destino: startDatedestino,
                    hora_preposicion: startDatebase,
                    cod_ambulancia: formAmbulancia.cod_ambulancia,
                    conductor: formAmbulancia.conductor,
                    medico: formAmbulancia.medico,
                    paramedico: formAmbulancia.paramedico,
                    observaciones: formAmbulancia.observaciones,
                })
                .then((response) => {
                    setFormAmbulancia((prevState) => ({
                        ...prevState,
                        id_servcioambulacia: response.data.id_servcioambulacia,
                    }));
                    notificarExitoCaso(response.data.id_servcioambulacia);
                    return response.data;
                })
                .catch((error) => {
                    notificarErrorCaso();
                    return error.response.data;
                });
        }
    }, [
        formAmbulancia,
        startDate,
        startDatebase,
        startDatedestino,
        startDateinicio,
        startDatellegada,
    ]);

    useEffect(() => {
        setStartDate(Date.parse(params.formAmbulancia.hora_asigna));
        setStartDatedestino(Date.parse(params.formAmbulancia.hora_destino));
        setStartDatebase(Date.parse(params.formAmbulancia.hora_preposicion));
        setStartDateinicio(Date.parse(params.formAmbulancia.hora_inicio));
        setStartDatellegada(Date.parse(params.formAmbulancia.hora_llegada));
        setFormAmbulancia((prevState) => ({
            ...prevState,
            id_servcioambulacia: params.formAmbulancia.id_servcioambulacia,
            cod_ambulancia: params.formAmbulancia.cod_ambulancia,
            conductor: params.formAmbulancia.conductor,
            medico: params.formAmbulancia.medico,
            paramedico: params.formAmbulancia.paramedico,
            observaciones: params.formAmbulancia.observaciones,
            hora_asigna: params.formAmbulancia.hora_asigna,
            hora_llegada: params.formAmbulancia.hora_llegada,
            hora_inicio: params.formAmbulancia.hora_inicio,
            hora_destino: params.formAmbulancia.hora_destino,
            hora_preposicion: params.formAmbulancia.hora_preposicion,
        }));
    }, [params.formAmbulancia]);

    /* useEffect(() => {
         params.setFormAmbulancia(
             prevState => ({
                 ...prevState,
                 hora_preposicion: (startDatebase),
                 hora_destino: (startDatedestino),
                 hora_inicio:(startDateinicio),
                 hora_llegada: (startDatellegada),
                 hora_asigna: (startDate)
             })
         )
     }, [startDatebase,startDatedestino,startDateinicio,startDatellegada,startDate])*/
    return (
        <div>
            {params.formAmbulancia.cod_casointerh != '' ? (
                <Form>
                    {formAmbulancia.cod_casointerh}

                    <Row className="mb-4">
                        <Col>
                            <Row>
                                <Form.Label htmlFor="inlineFormInputGroup">
                                    <strong>
                                        {t(
                                            'formularios.formambulancias.ambulancia'
                                        )}
                                    </strong>
                                </Form.Label>

                                <InputGroup className="mb-2">
                                    <Form.Control
                                        disabled
                                        value={formAmbulancia.cod_ambulancia}
                                        placeholder={`${t(
                                            'formularios.formambulancias.ambulancia'
                                        )}`}
                                        //name="cod_ambulancia"
                                        //onChange={handleChangeFormAmbulancia}
                                    />

                                    <InputGroup.Text onClick={handleShow2}>
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Row>
                        </Col>

                        <Form.Group as={Col}>
                            <Row>
                                <Form.Label>
                                    <strong>
                                        {t(
                                            'formularios.formambulancias.hasignacion'
                                        )}
                                    </strong>
                                </Form.Label>
                                <InputGroup className="mb-2 no-wr">
                                    <div>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(date)
                                            }
                                            timeInputLabel={`${t(
                                                'etiquetas.hora'
                                            )}`}
                                            dateFormat="yyyy/MM/dd h:mm:ss"
                                            showTimeInput
                                            customInput={<Form.Control />}
                                            name="hora_asigna"
                                        />
                                    </div>
                                    <InputGroup.Text
                                        onClick={() => setStartDate(new Date())}
                                    >
                                        <Icofont
                                            icon="ui-clock"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Row>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formambulancias.hllegada')}
                                </strong>
                            </Form.Label>
                            <InputGroup className="mb-2 no-wr">
                                <div>
                                    <DatePicker
                                        selected={startDatellegada}
                                        onChange={(date) =>
                                            setStartDatellegada(date)
                                        }
                                        timeInputLabel={`${t(
                                            'etiquetas.hora'
                                        )}`}
                                        dateFormat="yyyy/MM/dd h:mm:ss"
                                        showTimeInput
                                        customInput={<Form.Control />}
                                        name="hora_llegada"
                                    />
                                </div>
                                <InputGroup.Text
                                    onClick={() =>
                                        setStartDatellegada(new Date())
                                    }
                                >
                                    <Icofont icon="ui-clock" className="mx-2" />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formambulancias.hinicia')}
                                </strong>
                            </Form.Label>
                            <InputGroup className="mb-2 no-wr">
                                <div>
                                    <DatePicker
                                        selected={startDateinicio}
                                        onChange={(date) =>
                                            setStartDateinicio(date)
                                        }
                                        timeInputLabel={`${t(
                                            'etiquetas.hora'
                                        )}`}
                                        dateFormat="yyyy/MM/dd h:mm:ss"
                                        showTimeInput
                                        customInput={<Form.Control />}
                                        name="hora_inicio"
                                    />
                                </div>
                                <InputGroup.Text
                                    onClick={() =>
                                        setStartDateinicio(new Date())
                                    }
                                >
                                    <Icofont icon="ui-clock" className="mx-2" />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formambulancias.hdestino')}
                                </strong>
                            </Form.Label>
                            <InputGroup className="mb-2 no-wr">
                                <div>
                                    <DatePicker
                                        selected={startDatedestino}
                                        onChange={(date) =>
                                            setStartDatedestino(date)
                                        }
                                        timeInputLabel={`${t(
                                            'etiquetas.hora'
                                        )}`}
                                        dateFormat="yyyy/MM/dd h:mm:ss"
                                        showTimeInput
                                        customInput={<Form.Control />}
                                        name="hora_destino"
                                    />
                                </div>
                                <InputGroup.Text
                                    onClick={() =>
                                        setStartDatedestino(new Date())
                                    }
                                >
                                    <Icofont icon="ui-clock" className="mx-2" />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formambulancias.hbase')}
                                </strong>
                            </Form.Label>
                            <InputGroup className="mb-2 no-wr">
                                <div>
                                    <DatePicker
                                        selected={startDatebase}
                                        onChange={(date) =>
                                            setStartDatebase(date)
                                        }
                                        timeInputLabel={`${t(
                                            'etiquetas.hora'
                                        )}`}
                                        dateFormat="yyyy/MM/dd h:mm:ss"
                                        showTimeInput
                                        customInput={<Form.Control />}
                                        name="hora_preposicion"
                                    />
                                </div>
                                <InputGroup.Text
                                    onClick={() => setStartDatebase(new Date())}
                                >
                                    <Icofont icon="ui-clock" className="mx-2" />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formambulancias.tectranssanitario'
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formambulancias.tecnicosanitario'
                                )}`}
                                onChange={handleChangeFormAmbulancia}
                                value={formAmbulancia.conductor}
                                name="conductor"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formambulancias.medgeneral'
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formambulancias.medgeneral'
                                )}`}
                                onChange={handleChangeFormAmbulancia}
                                value={formAmbulancia.medico}
                                name="medico"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formambulancias.tecmedicas'
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formambulancias.tecnicomedicas'
                                )}`}
                                onChange={handleChangeFormAmbulancia}
                                value={formAmbulancia.paramedico}
                                name="paramedico"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formambulancias.observaciones'
                                    )}
                                </strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formambulancias.observaciones'
                                )}`}
                                as="textarea"
                                onChange={handleChangeFormAmbulancia}
                                value={formAmbulancia.observaciones}
                                name="observaciones"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            ) : (
                ''
            )}

            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t('formularios.formambulancias.selectambulancia')}
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
                            //setambulancia(ambulanciaTemp);
                            //setIdambulancia(idambulanciaTemp);
                            setFormAmbulancia((prevState) => ({
                                ...prevState,
                                cod_ambulancia: codAmbulanciaTemp,
                            }));
                            // actual();
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
        </div>
    );
};

export default FormularioAmbulancia;
