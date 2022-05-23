import React, { Component } from 'react'
import Figure from 'react-bootstrap/Figure'

import { withTranslation } from 'react-i18next';


class Inicio extends React.Component {
  render() {
    const { i18n } = this.props;
    const { t } = this.props;
    return (
      <div>
        <h1> {t("sidebar.inicio")}</h1>
        <div className='ini'>
          <div className='align-self-start'>SISMED911</div>
          <Figure  >
            <Figure.Image
              width={642}
              height={153}
              src={i18n.language == "es" ?'/assets/SISMED911_logo.png':'/assets/SISMED911_logo_en.png'}

            />
          </Figure>
          <Figure>
            <Figure.Image
              width={583}
              height={120}
              src={i18n.language == "es" ? '/assets/paho_es.png' :i18n.language == "en" ? '/assets/paho_en.png':i18n.language == "fr" ?'/assets/paho_fr.png':i18n.language == "pt" ?'/assets/paho_pr.png':'/assets/paho_en.png'}
            />
          </Figure>
        </div>
      </div>
    )
  }
}

export default withTranslation('global')(Inicio);