import React from 'react'
import Icofont from 'react-icofont';

import TablaEnventos from "./TablaEventos";
import Link from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class Eventos extends React.Component {

    render() {
        const { t } = this.props;
        return (
            <div>
                <div>
                    <h2>{t("ambulancias.eventos.titulo")}</h2>
                </div>
                
                <TablaEnventos></TablaEnventos>
            </div>
        )
    }
}

export default withTranslation('global')(Eventos);
