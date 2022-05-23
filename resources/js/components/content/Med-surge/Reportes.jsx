import React from 'react'
import Icofont from 'react-icofont';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from "axios";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { set } from 'lodash';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { useTranslation } from "react-i18next"


const Reportes = () => {
  const [t, i18n] = useTranslation("global");
  const [tablas, setTablas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [line, setLine] = useState("");
  const [show, setShow] = useState(false);
  const [showe, setShowE] = useState(false);
  const [show1, setShow1] = useState(false);
  const [view, setView] = useState(true);
  const [editar, setEditar] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseE = () => setShowE(false);
  const handleShowE = () => setShowE(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleDelet = () => setView(false);
  const handleView = () => setView(true);
  const handleEdit = () => setEditar(true);
  const handleAdd = () => setEditar(false);


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    );


  const Get  = async () => {
    await axios.get(`/api/ambulancias`)
      .then(response => {
        setTablas(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })
  }

  let datosAmbulancias = Object.values(tablas.reduce((x,{marca}) => {
    let key = `${marca}`;
    x[key] = x[key]  || {marca, total : 0};
    x[key].total++;
    return x;
  }, {}));

let labelsAmbulancias = datosAmbulancias.map(x => {
    if (x.marca==null){
        return "null";
    } else{
        return x.marca;
    }
});

//escala de azules en base a cantidad de labels
const backgroundcolorAmbulancias = [];
const bordercolorAmbulancias = [];
for (let i = 0; i < labelsAmbulancias.length; i++) {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    backgroundcolorAmbulancias.push('rgba('+r+','+g+','+b+', '+0.4+')');
    bordercolorAmbulancias.push('rgba('+r+','+g+','+b+', 1)');
}





let dataAmbulancias = {
    labels: labelsAmbulancias,
    datasets: [
      {
        label: 'Ambulancias',
        data: datosAmbulancias,
        backgroundColor: backgroundcolorAmbulancias,
          borderColor: bordercolorAmbulancias,
          borderWidth: 1,
      },
    ],
  };

  let optionsAmbulancias = {
    parsing: {
        xAxisKey: 'marca' === null ? 'null' : 'marca' ,
        yAxisKey: 'total'
      }
  }




  useEffect(() => {
    Get()

  }, []);



  const { SearchBar } = Search;
  const columns = [{
    dataField: 'cod_ambulancias',
    text: `${t("medsurge.reportes.datos.ambulancia")}`,
    sort: true
  }, {
    dataField: 'placas',
    text: `${t("medsurge.reportes.datos.placa")}`,
    sort: true
  }, {
    dataField: 'marca',
    text: `${t("medsurge.reportes.datos.marca")}`,
    sort: true
  }, {
    text: `${t("medsurge.reportes.datos.estado")}`,
    sort: true,
    dataField: '11',
    formatter: (cell, row, rowIndex, extraData) => {
      return (
        <div>
          {row.estado == 1 ? <p class="text-success">{t("medsurge.reportes.datos.disponible")}</p> :  <p class="text-danger">{t("medsurge.reportes.datos.nodisponible")}</p>}
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
    totalSize: tablas.length
  };
  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    selected: [1],
    hideSelectColumn: true,
    bgColor: '#00BFFF'
  };
  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      <ToolkitProvider
        keyField="cod_ambulancias"
        columns={columns}
        data={tablas}
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
      <div>
        <h2>{t("medsurge.reportes.titulo")}</h2>
      </div>

      <div>
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          {contentTable}
        </PaginationProvider>

        <div style={{width: "100%", overflowX: "scroll", overflowY: "scroll"}}>
                    <div style={{width: "100%", height: "500px"}}>
                        <Bar options={optionsAmbulancias} data={dataAmbulancias} height="300" width="0" />
                    </div>
        </div>

      </div>

    </div>
  )

}

export default Reportes;
