import React from "react";
import Icofont from "react-icofont";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-phone-input-2/lib/style.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-phone-input-2/lib/style.css";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { set } from "lodash";

const Estadistica = () => {
    const [tablas, setTablas] = useState([]);

    const Get = () => {
        axios
            .get(`api/hospitalesgeneral/censos`)
            .then((response) => {
                setTablas(response.data);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };

    useEffect(() => {
        Get();
    }, []);

    const { SearchBar } = Search;
    const columns = [
        {
            dataField: "nombre_hospital",
            text: "Lista de hospitales",
            sort: true,
        },
        {
            text: "Hospitalizacion Ocupadas",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_hospital.ocupadas === 0 ? (
                            <p className="disprojo">
                                {row.camas_hospital.ocupadas}
                            </p>
                        ) : row.camas_hospital.ocupadas > 1 &&
                          row.camas_hospital.ocupadas < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_hospital.ocupadas}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_hospital.ocupadas}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "Hospitalizacion Libres",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_hospital.libres === 0 ? (
                            <p className="disprojo">
                                {row.camas_hospital.libres}
                            </p>
                        ) : row.camas_hospital.libres > 1 &&
                          row.camas_hospital.libres < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_hospital.libres}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_hospital.libres}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "Hospitalizacion Sin servicios",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_hospital.sin_servicio === 0 ? (
                            <p className="disprojo">
                                {row.camas_hospital.sin_servicio}
                            </p>
                        ) : row.camas_hospital.sin_servicio > 1 &&
                          row.camas_hospital.sin_servicio < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_hospital.sin_servicio}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_hospital.sin_servicio}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "UCI Ocupadas",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_uci.ocupadas === 0 ? (
                            <p className="disprojo">{row.camas_uci.ocupadas}</p>
                        ) : row.camas_uci.ocupadas > 1 &&
                          row.camas_uci.ocupadas < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_uci.ocupadas}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_uci.ocupadas}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "UCI Libres",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_uci.libres === 0 ? (
                            <p className="disprojo">{row.camas_uci.libres}</p>
                        ) : row.camas_uci.libres > 1 &&
                          row.camas_uci.libres < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_uci.libres}
                            </p>
                        ) : (
                            <p className="dispverde">{row.camas_uci.libres}</p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "UCI Sin servicio",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_uci.sin_servicio === 0 ? (
                            <p className="disprojo">
                                {row.camas_uci.sin_servicio}
                            </p>
                        ) : row.camas_uci.sin_servicio > 1 &&
                          row.camas_uci.sin_servicio < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_uci.sin_servicio}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_uci.sin_servicio}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "Pediatria Ocupadas",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_pediatria.ocupadas === 0 ? (
                            <p className="disprojo">
                                {row.camas_pediatria.ocupadas}
                            </p>
                        ) : row.camas_pediatria.ocupadas > 1 &&
                          row.camas_pediatria.ocupadas < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_pediatria.ocupadas}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_pediatria.ocupadas}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "Pediatria Libres",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_pediatria.libres === 0 ? (
                            <p className="disprojo">
                                {row.camas_pediatria.libres}
                            </p>
                        ) : row.camas_pediatria.libres > 1 &&
                          row.camas_pediatria.libres < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_pediatria.libres}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_pediatria.libres}
                            </p>
                        )}
                    </div>
                );
            },
        },
        {
            text: "Pediatria Sin servicio",
            dataField: "11",
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div>
                        {row.camas_pediatria.sin_servicio === 0 ? (
                            <p className="disprojo">
                                {row.camas_pediatria.sin_servicio}
                            </p>
                        ) : row.camas_pediatria.sin_servicio > 1 &&
                          row.camas_pediatria.sin_servicio < 6 ? (
                            <p className="dispamarillo">
                                {row.camas_pediatria.sin_servicio}
                            </p>
                        ) : (
                            <p className="dispverde">
                                {row.camas_pediatria.sin_servicio}
                            </p>
                        )}
                    </div>
                );
            },
        },
    ];
    const options = {
        custom: true,
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: "Primera",
        prePageText: "Anterior",
        nextPageText: "Siguiente",
        lastPageText: "Ultima",
        nextPageTitle: "Siguiente pagina",
        prePageTitle: "Anterior pagina",
        firstPageTitle: "Primera pagina",
        lastPageTitle: "Ultima pagina",
        showTotal: true,
        totalSize: tablas.length,
    };
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: false,
        style: { color: "#fff", background: "#0d6efd" },
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id_hospital"
                columns={columns}
                data={tablas}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <SearchBar
                            placeholder="Buscar"
                            {...toolkitprops.searchProps}
                        />
                        <BootstrapTable
                            striped
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            noDataIndication={"No hay datos que mostrar"}
                            selectRow={selectRow}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    );

    return (
        <div>
            <div>
                <h2>Diponibilidad Hospitalaria</h2>
            </div>
            <div>
                <PaginationProvider pagination={paginationFactory(options)}>
                    {contentTable}
                </PaginationProvider>
            </div>
        </div>
    );
};

export default Estadistica;
