import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FormularioAmbulancia from './FormularioAmbulancia_';
import Icofont from 'react-icofont';
import { useTranslation } from 'react-i18next';

const FormulariosDespacho = (params) => {
    const [t, i18n] = useTranslation('global');

    return (
        <Tabs
            defaultActiveKey="ambu"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab
                eventKey="ambu"
                title={
                    <div>
                        <Icofont icon="police-car-alt-2" className="mx-2" />
                        {t('formularios.ambulancia')}
                    </div>
                }
            >
                <FormularioAmbulancia
                    setFormAmbulancia={params.setFormAmbulancia}
                    formAmbulancia={params.formAmbulancia}
                ></FormularioAmbulancia>
            </Tab>
        </Tabs>
    );
};

export default FormulariosDespacho;
