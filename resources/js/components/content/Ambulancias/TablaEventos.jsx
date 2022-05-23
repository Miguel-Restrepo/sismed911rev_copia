import React from "react";
import classNames from "classnames";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Icofont from 'react-icofont';
import { withTranslation } from 'react-i18next';
import Badge from 'react-bootstrap/Badge'

class TablaEventos extends React.Component {


  constructor(props) {
    super(props);
    this.state = ({
      datos: []
    })
  }


  componentDidMount() {

    fetch('/api/ambulancias/eventos')
      .then(response => response.json())
      .then(data => {
        this.setState({
          datos: data
        });
      });
  }


  render() {
    const { t } = this.props;
    const { SearchBar } = Search;
    const columns = [{
      dataField: 'id',
      text: `${t("ambulancias.eventos.datos.id")}`,
      sort: true
    }, {
      dataField: 'cod_ambulancias',
      text: `${t("ambulancias.eventos.datos.ambulancia")}`,
      sort: true
    }, {
      dataField: 'placas',
      text: `${t("ambulancias.eventos.datos.placas")}`,
      sort: true
    }, {
      dataField: 'frecuencia_tiempo',
      text: `${t("ambulancias.eventos.datos.frecuenciat")}`,
      sort: true
    }, {
      dataField: 'servicio',
      text: `${t("ambulancias.eventos.datos.servicios")}`,
      sort: true
    }, {
      sort: true,
      text: `${t("ambulancias.eventos.datos.estadokm")}`,
      dataField: '685',
      formatter: (cell, row, rowIndex, extraData) => {
        return (
          <div>
            {row.anticipo_km > row.frecuencia_km ?
                <h4 className="text-center">
                    <Badge pill className="bg-success">
                    {t("ambulancias.eventos.datos.atiempo")}
                    </Badge>
                </h4>:
                <h4 className="text-center">
                    <Badge pill className="bg-danger">
                    {t("ambulancias.eventos.datos.vencido")}
                    </Badge>
                </h4>}
          </div>
        );
      }
    },
    {
      sort: true,
      text: `${t("ambulancias.eventos.datos.estadoseguro")}`,
      dataField: '785',
      formatter: (cell, row, rowIndex, extraData) => {
        return (
          <div>
            {row.fecha_iniseguro > row.fecha_finseguro ?
            <h4 className="text-center">
                <Badge pill className="bg-success">
                {t("ambulancias.eventos.datos.atiempo")}
                </Badge>
            </h4>:
            <h4 className="text-center">
                <Badge pill className="bg-danger">
                {t("ambulancias.eventos.datos.vencido")}
                </Badge>
            </h4>}
          </div>
        );
      }
    },
    {
      sort: true,
      text: `${t("ambulancias.eventos.datos.estadoti")}`,
      dataField: '56',
      formatter: (cell, row, rowIndex, extraData) => {
        return (
          <div>
            {row.anticipo_tiempo > row.frecuencia_tiempo ?
                <h4 className="text-center">
                <Badge pill className="bg-success">
                {t("ambulancias.eventos.datos.atiempo")}
                </Badge>
            </h4>:
            <h4 className="text-center">
                <Badge pill className="bg-danger">
                {t("ambulancias.eventos.datos.vencido")}
                </Badge>
            </h4>}
          </div>
        );
      }
    }

    ];
    const options = {
      custom: true,
      paginationSize: 5,
      pageStartIndex: 1,
      firstPageText: `${t("tabla.primera")}`,
        prePageText: `${t("tabla.anterior")}`,
        nextPageText: `${t("tabla.sgte")}`,
        lastPageText: `${t("tabla.ultima")}`,
        nextPageTitle: `${t("tabla.sgtepag")}`,
        prePageTitle: `${t("tabla.anteriorpag")}`,
        firstPageTitle: `${t("tabla.primerapag")}`,
        lastPageTitle: `${t("tabla.ultimapag")}`,
      showTotal: true,
      totalSize: this.state.datos.length
    };
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        selected: [1],
        hideSelectColumn: true,
        classes: 'selection-row'
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <ToolkitProvider
          keyField="id"
          columns={columns}
          data={this.state.datos}
          search
        >
          {
            toolkitprops => (
              <div>
                <SearchBar placeholder={`${t("tabla.buscador")}`}  {...toolkitprops.searchProps} />
                <BootstrapTable
                  striped
                  hover
                  {...toolkitprops.baseProps}
                  {...paginationTableProps}
                  noDataIndication={`${t("tabla.sindatos")}`}
                  selectRow={selectRow}
                />
              </div>
            )
          }
        </ToolkitProvider>
        <PaginationListStandalone {...paginationProps} />
      </div>
    );
    return (
      <div>
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          {contentTable}
        </PaginationProvider>
      </div >
    );
  }
}

export default withTranslation('global')(TablaEventos);

