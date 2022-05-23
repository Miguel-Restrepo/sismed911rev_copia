import React from 'react';
import ReactDOM from 'react-dom';
//import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from './sidebar/SideBar';
import Content from './content/Content';
import { BrowserRouter, Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import resources_es from '../../translations/es.json';
import resources_en from '../../translations/en.json';
import resources_fr from '../../translations/fr.json';
import resources_pt from '../../translations/pt.json';

i18n.init({
    interpolation: {
        escapeValue: false,
    },
    lng: 'es',
    resources: {
        es: {
            global: resources_es,
        },
        en: {
            global: resources_en,
        },
        fr: {
            global: resources_fr,
        },
        pt: {
            global: resources_pt,
        },
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);

        // Moblie first
        this.state = {
            isOpen: false,
            isMobile: true,
        };

        this.previousWidth = -1;
    }

    updateWidth() {
        const width = window.innerWidth;
        const widthLimit = 576;
        const isMobile = width <= widthLimit;
        const wasMobile = this.previousWidth <= widthLimit;

        if (isMobile !== wasMobile) {
            this.setState({
                isOpen: !isMobile,
            });
        }

        this.previousWidth = width;
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth.bind(this));
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        return (
            <BrowserRouter>
                <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
                <Content toggle={this.toggle} isOpen={this.state.isOpen} />
            </BrowserRouter>
        );
    }
}

export default App;

ReactDOM.render(
    <I18nextProvider lng="es" resources={resources_es} i18n={i18n}>
        <App />
    </I18nextProvider>,
    document.getElementById('root')
);
