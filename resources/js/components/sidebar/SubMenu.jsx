import React from 'react';
import classNames from 'classnames';
import Icofont from 'react-icofont';

import { Link } from 'react-router-dom';
import { Accordion, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
//import 'bootstrap/dist/css/bootstrap.css';

class SubMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { icon, title, items, icfon } = this.props;

        return (
            <Nav.Item className={classNames({ open: !this.state.collapsed })}>
                <Accordion>
                    <Accordion.Toggle
                        as={Nav.Link}
                        variant="link"
                        eventKey="0"
                        onClick={this.toggleNavbar}
                    >
                        <Icofont icon={icon} className="mx-2" />

                        {icfon === 'font' ? (
                            <FontAwesomeIcon icon={icon} className="mx-2" />
                        ) : (
                            ''
                        )}

                        {title}

                        <FontAwesomeIcon
                            icon={
                                this.state.collapsed ? faAngleLeft : faAngleDown
                            }
                            className="ms-1"
                        />
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <nav className="nav flex-column">
                            {Object.keys(items).map((item) => (
                                <Link
                                    className={`nav-link nav-item pl-4 ${
                                        item === 'Active' ? 'active' : ''
                                    } `}
                                    to={item}
                                    key={item}
                                >
                                    <Icofont icon="play" className="mx-2" />

                                    {items[item]}
                                </Link>
                            ))}
                        </nav>
                    </Accordion.Collapse>
                </Accordion>
            </Nav.Item>
        );
    }
}

export default SubMenu;
