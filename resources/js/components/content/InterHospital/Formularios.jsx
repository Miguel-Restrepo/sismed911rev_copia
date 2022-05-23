import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FormularioPaciente from "./FormularioPaciente";
import FormularioEvaluacion from "./FormularioEvaluacion";
import FormularioHospital from "./FormularioHospital";
import FormularioAmbulancia from "./FormularioAmbulancia";
import Icofont from "react-icofont";
import { useTranslation } from "react-i18next";

const Formularios = (params) => {
    const [t, i18n] = useTranslation("global");
    return (
        <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab
                eventKey="home"
                title={
                    <div>
                        <Icofont icon="male" className="mx-2" />
                        {t("formularios.pacientes")}
                    </div>
                }
            >
                <FormularioPaciente
                    setFormPaciente={params.setFormPaciente}
                    formPaciente={params.formPaciente}
                ></FormularioPaciente>
            </Tab>

            <Tab
                eventKey="profile"
                title={
                    <div>
                        <Icofont icon="heartbeat" className="mx-2" />
                        {t("formularios.evaluacion")}
                    </div>
                }
            >
                <FormularioEvaluacion
                    setFormEvaluacion={params.setFormEvaluacion}
                    formEvaluacion={params.formEvaluacion}
                ></FormularioEvaluacion>
            </Tab>

            <Tab
                eventKey="contact"
                title={
                    <div>
                        <Icofont icon="hospital" className="mx-2" />
                        {t("formularios.hospital")}
                    </div>
                }
            >
                <FormularioHospital
                    hospitales={params.hospitales}
                    setFormHospital={params.setFormHospital}
                    formHospital={params.formHospital}
                ></FormularioHospital>
            </Tab>

            <Tab
                eventKey="ambu"
                title={
                    <div>
                        <Icofont icon="police-car-alt-2" className="mx-2" />
                        {t("formularios.ambulancia")}
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

export default Formularios;
