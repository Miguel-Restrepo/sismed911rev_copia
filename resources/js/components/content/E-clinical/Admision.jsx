import Icofont from 'react-icofont';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
    Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { DateTime } from 'luxon';
import PhoneInput from 'react-phone-input-2';
//import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceConfig from '../config/service';

toast.configure();

function Admision() {
    const [t, i18n] = useTranslation('global');
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState('');
    const [idPaciente, setIdPaciente] = useState('');
    const [pacienteTemp, setPacienteTemp] = useState('');
    const [idPacienteTemp, setIdPacienteTemp] = useState('');
    const [tipos, setTipos] = useState([]);
    const [tipos_documentos, setTipos_documentos] = useState([]);
    const [tipos_edad, setTipos_edad] = useState([]);
    const [tipos_genero, setTipos_genero] = useState([]);
    const [mostrarSelect, setMostrarSelect] = useState(false); //mostrar o ucultar slect
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //mostrar o ucultar formulario
    const [search, setSearch] = useState(false);

    const [form, setForm] = useState({
        id_ingreso: '',
        cod911: '',
        id_paciente: '',
        acompañante: '',
        telefono_acompañante: '',
        fecha_admision: DateTime.now()
            .set({ milliseconds: 0 })
            .toISO({ suppressMilliseconds: true }),
    });

    const [form2, setForm2] = useState({
        cod_casointerh: 0,
        tipo_doc: '',
        num_doc: '',
        expendiente: '',
        fecha_nacido: '',
        edad: '',
        cod_edad: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        genero: '',
        apodo: '',
        nacionalidad: '',
        telefono: '',
        aseguradro: '',
        direccion: '',
        observacion: '',
    });

    const { SearchBar } = Search;

    const columns = [
        {
            dataField: 'codigo',
            text: `${t('eclinical.admision.datos.id')}`,
            sort: true,
        },
        {
            dataField: 'nombre1',
            text: `${t('eclinical.admision.datos.nombre1')}`,
            sort: true,
        },
        {
            dataField: 'nombre2',
            text: `${t('eclinical.admision.datos.nombre2')}`,
            sort: true,
        },
        {
            dataField: 'apellido1',
            text: `${t('eclinical.admision.datos.apellido1')}`,
            sort: true,
        },
        {
            dataField: 'apellido2',
            text: `${t('eclinical.admision.datos.apellido2')}`,
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
        totalSize: pacientes.length,
    };

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: false,
        style: { color: '#fff', background: '#0d6efd' },
        onSelect: (row, isSelect, rowIndex, e) => {
            setPacienteTemp(row.nombre1);
            setIdPacienteTemp(row.codigo);
        },
    };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="codigo"
                columns={columns}
                data={pacientes}
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

    const GetPacientes = () => {
        axios
            .get('/api/pacientegeneral')
            .then((response) => {
                setPacientes(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipos = () => {
        axios
            .get('/api/tipo_ingreso')
            .then((response) => {
                setTipos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipoDocumento = () => {
        axios
            .get('/api/tipo_id')
            .then((response) => {
                setTipos_documentos(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipoEdad = () => {
        axios
            .get('/api/tipo_edad')
            .then((response) => {
                setTipos_edad(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetTipoGenero = () => {
        axios
            .get('/api/tipo_genero')
            .then((response) => {
                setTipos_genero(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const calcularEdadForm = (value) => {
        let end = DateTime.fromISO(DateTime.now());
        let start = DateTime.fromISO(value);
        if (end.diff(start, 'years').years >= 1) {
            setForm2((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'years').years | 0,
                cod_edad: 1,
            }));
        } else if (end.diff(start, 'months').months >= 1) {
            setForm2((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'months').months | 0,
                cod_edad: 2,
            }));
        } else {
            setForm2((prevState) => ({
                ...prevState,
                edad: end.diff(start, 'days').days | 0,
                cod_edad: 3,
            }));
        }
    };

    const calcularEdad = (e) => {
        e.persist();
        calcularEdadForm(e.target.value);
        setForm2((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChange = (e) => {
        e.persist();
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChange1 = (e) => {
        e.persist();
        setForm2((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeFormPacienteDoc = (e) => {
        setSearch(e.target.value == 1);
        handleChange1(e);
    };

    const cambioSelect = (e) => {
        e.persist();
        if (e.target.value == 2) {
            setMostrarSelect(true);
        } else {
            setMostrarSelect(false);
        }
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const showForm = () => {
        setSearch(true);
        setMostrarFormulario(!mostrarFormulario);
    };

    const buscarCedula = async (cedula) => {
        if (ServiceConfig.number_validate(cedula)) {
            await axios({
                url: '/api/pacientegeneral/get_token',
                method: 'post',
                data: {
                    key: ServiceConfig.key,
                },
            })
                .then((response) => {
                    if (response.data.code && response.data.code === 403) {
                        mostarError(response.data.mensaje);
                    } else {
                        const getDatos = async () => {
                            await axios
                                .post('/api/pacientegeneral/get_datos', {
                                    doc: cedula,
                                    token: response.data,
                                })
                                .then((response) => {
                                    console.log(response.data);
                                    if (response.data.valido) {
                                        let genero = 1;
                                        if (response.data.sexo === 'F')
                                            genero = 2;

                                        setForm2((prevState) => ({
                                            ...prevState,
                                            ['fecha_nacido']:
                                                response.data.fecha_nacimiento,
                                            ['nombre1']:
                                                response.data.nombres.split(
                                                    ' '
                                                )[0],
                                            ['nombre2']:
                                                response.data.nombres.split(' ')
                                                    .length > 1
                                                    ? response.data.nombres.split(
                                                          ' '
                                                      )[1]
                                                    : '',
                                            ['apellido1']:
                                                response.data.apellido1,
                                            ['apellido2']:
                                                response.data.apellido2,
                                            ['genero']: genero,
                                            ['nacionalidad']:
                                                response.data.nacionalidad,
                                        }));
                                        calcularEdadForm(
                                            response.data.fecha_nacimiento
                                        );
                                    } else {
                                        mostarError('Ha ocurrido un error');
                                    }
                                })
                                .catch(() => {
                                    mostarError('Ha ocurrido un error');
                                });
                        };

                        getDatos();
                    }
                })
                .catch(() => {
                    mostarError('Ha ocurrido un error');
                });
        } else {
            toast.warning('Número de cédula no válido', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };

    const mostarError = (texto) => {
        toast.error(texto, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
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

    const Post = () => {
        axios
            .post('/api/sala_admision', form)
            .then((response) => {
                notificarExitoCaso(response.data.id_admision);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    const PostPaciente = () => {
        axios
            .post('/api/pacientegeneral', form2)
            .then((response) => {
                GetPacientes();
                setMostrarFormulario(false);
                setForm((prevState) => ({
                    ...prevState,
                    id_paciente: response.data.id_paciente,
                }));
                notificarExitoCaso(response.data.id_paciente);
                return response.data;
            })
            .catch((error) => {
                notificarErrorCaso();
                return error.response.data;
            });
    };

    useEffect(() => {
        GetPacientes();
        GetTipos();
        GetTipoDocumento();
        GetTipoGenero();
        GetTipoEdad();
    }, []);

    useEffect(() => {
        setForm((prevState) => ({
            ...prevState,
            id_paciente: idPaciente,
        }));
    }, [paciente, idPaciente]);

    return (
        <div>
            <div>
                <h2>{t('eclinical.admision.titulo')}</h2>
            </div>

            <div>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="id_ingreso">
                            <Form.Label>
                                <strong>
                                    {t('eclinical.admision.datos.tipoingreso')}
                                </strong>
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    value={form.id_ingreso}
                                    onChange={cambioSelect}
                                    name="id_ingreso"
                                >
                                    <option value="" id="defAcc">
                                        {`-- ${t('etiquetas.seleccion')} --`}
                                    </option>
                                    {tipos.map((tipo) => (
                                        <option
                                            key={tipo.id_ingreso}
                                            value={tipo.id_ingreso}
                                        >
                                            {tipo.nombre_ingreso}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        {mostrarSelect && (
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="inlineFormInputGroup">
                                    <strong>
                                        {t('eclinical.admision.datos.nombre1')}
                                    </strong>
                                </Form.Label>

                                <Form.Control
                                    id="inlineFormInputGroup"
                                    placeholder={`${t(
                                        'formularios.ambulancia'
                                    )}`}
                                    value={form.cod911}
                                    onChange={handleChange}
                                    name="cod911"
                                />
                            </Form.Group>
                        )}

                        <Form.Group as={Col}>
                            <Form.Label column sm={3}>
                                <strong>
                                    {t('formularios.formpacientes.paciente')}
                                </strong>
                            </Form.Label>

                            <Col sm={9}>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        id="x"
                                        placeholder={`-- ${t(
                                            'etiquetas.seleccionpcte'
                                        )} --`}
                                        disabled
                                        value={paciente}
                                        onChange={handleChange}
                                        name="id_paciente"
                                    />

                                    <InputGroup.Text onClick={handleShow2}>
                                        <Icofont
                                            icon="ui-search"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>

                                    <InputGroup.Text onClick={showForm}>
                                        <Icofont
                                            icon="ui-add"
                                            className="mx-2"
                                        />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.compa')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.nombrecompa'
                                )}`}
                                value={form.acompañante}
                                onChange={handleChange}
                                name="acompañante"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.telcompa')}
                                </strong>
                            </Form.Label>

                            <Col sm={9}>
                                <PhoneInput
                                    containerClass="mx-0"
                                    inputClass="mx-0"
                                    country={ServiceConfig.codgoPais}
                                    value={form.telefono_acompañante}
                                    onChange={(value) =>
                                        setForm((prevState) => ({
                                            ...prevState,
                                            telefono_acompañante: value,
                                        }))
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Row>

                    {form.id_ingreso != '' && paciente != '' && (
                        <Button variant="primary" onClick={Post}>
                            {t('etiquetas.guardar')}
                        </Button>
                    )}
                </Form>
            </div>

            <br></br>

            <h5>
                <Icofont icon="patient-file" className="mx-2" />{' '}
                {t('formularios.formulario')}
                <span className="case"></span>
            </h5>

            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t('etiquetas.seleccionpcte')}</Modal.Title>
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
                            setPaciente(pacienteTemp);
                            setIdPaciente(idPacienteTemp);
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

            <br></br>

            {mostrarFormulario && (
                <Form className={mostrarFormulario ? 'show-element' : null}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.docid')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                as="select"
                                placeholder={`${t(
                                    'formularios.formpacientes.pasaporte'
                                )}`}
                                name="tipo_doc"
                                value={form2.tipo_doc}
                                onChange={handleChangeFormPacienteDoc}
                            >
                                {tipos_documentos.map((elemento) => (
                                    <option
                                        key={elemento.id_tipo}
                                        value={elemento.id_tipo}
                                    >
                                        {elemento.descripcion}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.numero')}
                                </strong>
                            </Form.Label>

                            <InputGroup className="mb-2">
                                <Form.Control
                                    type="number"
                                    placeholder={`${t(
                                        'formularios.formpacientes.numero'
                                    )}`}
                                    name="num_doc"
                                    value={form2.num_doc}
                                    onChange={handleChange1}
                                />

                                <InputGroup.Text
                                    onClick={() => buscarCedula(form2.num_doc)}
                                    className={search ? 'd-flex' : 'd-none'}
                                >
                                    <Icofont
                                        icon="ui-search"
                                        className="mx-2"
                                    />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.expediente')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.expediente'
                                )}`}
                                name="expendiente"
                                value={form2.expendiente}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.fechanac')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="date"
                                name="fecha_nacido"
                                value={form2.fecha_nacido}
                                onChange={calcularEdad}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.edad')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="number"
                                placeholder={`${t(
                                    'formularios.formpacientes.edad'
                                )}`}
                                name="edad"
                                value={form2.edad}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.tipoedad')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                as="select"
                                placeholder={`${t(
                                    'formularios.formpacientes.tipoedad'
                                )}`}
                                name="cod_edad"
                                value={form2.cod_edad}
                                onChange={handleChange1}
                            >
                                {tipos_edad.map((elemento) => (
                                    <option
                                        key={elemento.id_edad}
                                        value={elemento.id_edad}
                                    >
                                        {elemento.nombre_edad}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.nombre1')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.nombre1'
                                )}`}
                                name="nombre1"
                                value={form2.nombre1}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.nombre2')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.nombre2'
                                )}`}
                                name="nombre2"
                                value={form2.nombre2}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.apellido1')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.apellido1'
                                )}`}
                                name="apellido1"
                                value={form2.apellido1}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.apellido2')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.apellido2'
                                )}`}
                                name="apellido2"
                                value={form2.apellido2}
                                onChange={handleChange1}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} xs={2}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.genero')}
                                </strong>
                            </Form.Label>

                            <Col sm={9}>
                                {tipos_genero.map((genero) => (
                                    <Form.Check
                                        type="radio"
                                        checked={
                                            form2.genero == genero.id_genero
                                        }
                                        label={genero.nombre_genero}
                                        key={genero.id_genero}
                                        name="genero"
                                        id={genero.id_genero}
                                        value={genero.id_genero}
                                        onChange={handleChange1}
                                    />
                                ))}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.apodo')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.apodo'
                                )}`}
                                name="apodo"
                                value={form2.apodo}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formpacientes.nacionalidad'
                                    )}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.nacionalidad'
                                )}`}
                                name="nacionalidad"
                                value={form2.nacionalidad}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.telefono')}
                                </strong>
                            </Form.Label>

                            <Col sm={9}>
                                <PhoneInput
                                    containerClass="mx-0"
                                    inputClass="mx-0"
                                    country={ServiceConfig.codgoPais}
                                    value={form2.telefono}
                                    onChange={(value) =>
                                        setForm2((prevState) => ({
                                            ...prevState,
                                            telefono: value,
                                        }))
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formpacientes.segurosocial'
                                    )}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="number"
                                placeholder={`${t(
                                    'formularios.formpacientes.segurosocial'
                                )}`}
                                name="aseguradro"
                                value={form2.aseguradro}
                                onChange={handleChange1}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t('formularios.formpacientes.direccion')}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder={`${t(
                                    'formularios.formpacientes.direccion'
                                )}`}
                                name="direccion"
                                value={form2.direccion}
                                onChange={handleChange1}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                <strong>
                                    {t(
                                        'formularios.formpacientes.observaciones'
                                    )}
                                </strong>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder={`${t(
                                    'formularios.formpacientes.observaciones'
                                )}`}
                                name="observacion"
                                value={form2.observacion}
                                onChange={handleChange1}
                            />
                        </Form.Group>
                    </Row>
                    {form2.num_doc != '' && (
                        <Button variant="primary" onClick={PostPaciente}>
                            {t('etiquetas.guardar')}
                        </Button>
                    )}
                </Form>
            )}
        </div>
    );
}

export default Admision;
