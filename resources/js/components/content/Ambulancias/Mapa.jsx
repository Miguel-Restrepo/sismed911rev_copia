import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next"
const Mapa = () => {

  const [t, i18n] = useTranslation("global");
  const [puntos, setPuntos] = useState([]);
  const [centro, setCentro] = useState([]);
  const Get = () => {
    axios.get('/api/estadisticas/interh/ubicacion_preposiciones')
      .then(response => {
        setCentro([response.data[0].longitud, response.data[0].latitud]);
        setPuntos(response.data);
        return response.data;
      })
      .catch(error => {
        return error;
      })

  }
  const calcularCentro = () => {
    let longitud = 0;
    let latitud = 0;
    let cantidad = 0;
    puntos.forEach(element => {
      longitud = longitud + parseFloat(element.longitud);
      latitud = latitud + parseFloat(element.latitud);
      cantidad = cantidad + 1;
    });
    if (cantidad != 0) {
      setCentro(['' + longitud / cantidad + '', '' + latitud / cantidad + '']);
    }
  }
  useEffect(() => {
    calcularCentro();
  }, [puntos])
  useEffect(() => {
    Get();
  }, [])
  useEffect(() => {
  }, [centro])
  return (

    <div>
      {centro[0] != null ? <MapContainer center={centro} zoom={17}>
        <TileLayer
          attribution='&copy; <a >SISMED911</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {puntos.map((elemento,ind) => (
          <Marker key={ind} position={[elemento.longitud, elemento.latitud]}>
            <Popup>
            {t("sidebar.administracion.base")} <br /> {elemento.nombre}
            </Popup>
          </Marker>
        ))}
      </MapContainer> : t("tabla.sindatos")}
    </div>
  )
}
export default Mapa;