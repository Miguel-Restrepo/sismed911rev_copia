import React from 'react';
import TablaDespacho from './TablaDespacho';
import FormulariosDespacho from './FormulariosDespacho';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

//import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Despacho = () => {
    const [t, i18n] = useTranslation('global');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showModalExito, setShowModalExito] = useState(false);
    const handleCloseModalExito = () => setShowModalExito(false);
    const handleShowModalExito = () => setShowModalExito(true);
    const [showModalError, setShowModalError] = useState(false);
    const handleCloseModalError = () => setShowModalError(false);
    const handleShowModalError = () => setShowModalError(true);
    const [acciones, setAcciones] = useState([]);
    const [incidentes, setIncidentes] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [archivo, setArchivo] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [llamadas, setLlamadas] = useState([]);

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

    const [formAmbulancia, setFormAmbulancia] = useState({
        id_servcioambulacia: '',
        cod_casopreh: '',
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

    const GetAcciones = () => {
        axios
            .get('/api/interh_accion')
            .then((response) => {
                setAcciones(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
        axios
            .get('/api/incidentes')
            .then((response) => {
                setIncidentes(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    const GetPrioridades = () => {
        axios
            .get('/api/interh_prioridad')
            .then((response) => {
                setPrioridades(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    useEffect(() => {
        GetAcciones();
        GetPrioridades();
    }, []);

    useEffect(() => {
        GetAcciones();
        GetPrioridades();
    }, [formAmbulancia]);

    return (
        <div>
            <div>
                <h2>{t('interhospital.tabla.datos.despacho')}</h2>
            </div>

            <TablaDespacho
                setFormAmbulancia={setFormAmbulancia}
            ></TablaDespacho>

            <FormulariosDespacho
                setFormAmbulancia={setFormAmbulancia}
                formAmbulancia={formAmbulancia}
            ></FormulariosDespacho>

            <Modal show={showModalExito} onHide={handleCloseModalExito}>
                <Alert variant="success" className="mb-0">
                    <Alert.Heading>{t('mensajes.exito')}</Alert.Heading>
                    <p>{t('mensajes.mscreacionexito')}</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => setShowModalExito(false)}
                            variant="outline-success"
                        >
                            {t('etiquetas.aceptar')}
                        </Button>
                    </div>
                </Alert>
            </Modal>

            <Modal show={showModalError} onHide={handleCloseModalError}>
                <Alert variant="danger" className="mb-0">
                    <Alert.Heading>{t('mensajes.error')}</Alert.Heading>
                    <p>{t('mensajes.mscreacionerror')}</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => setShowModalError(false)}
                            variant="outline-danger"
                        >
                            {t('etiquetas.aceptar')}
                        </Button>
                    </div>
                </Alert>
            </Modal>
        </div>
    );
};

export default Despacho;
