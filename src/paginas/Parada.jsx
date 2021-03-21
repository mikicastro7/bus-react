import React from "react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import NumeroParada from "../Components/NumeroParada";
import Buses from "../Components/Buses";
import SelectLinea from "../Components/SelectLinea";
import TiempoLinea from "../Components/TiempoLinea";
import DatosParadaContext from "../contexts/DatosParadaContext";

const Parada = () => {
  const [parada, setParada] = useState(2543);
  const [tiempoLinea, setTiempoLine] = useState(null);
  const { datos: datosParada, pedirDatos: pedirParada } = useFetch();
  const { datos: datosLineas, pedirDatos: pedirLineas, setDatos: setDatosLineas } = useFetch();

  useEffect(() => {
    pedirParada(`${process.env.REACT_APP_API_URL_PARADA}${parada}?app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`);
  }, [pedirParada, parada]);

  useEffect(() => {
    if (datosParada) {
      if (datosParada.numberMatched > 0) {
        pedirLineas(`${process.env.REACT_APP_API_BUSES_PARADA}${parada}?app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`);
      } else {
        setDatosLineas(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosParada, pedirLineas]);

  const tiempoLineaHandler = (idLinea) => {
    const datosFiltrados = datosLineas.data.ibus.filter(linea => linea.line === idLinea);
    setTiempoLine({
      linea: datosFiltrados[0].line,
      minutos: datosFiltrados[0]["t-in-min"]
    });
  };

  return (
    <>
      <header className="cabecera">
        <DatosParadaContext.Provider value={datosParada}>
          <NumeroParada nParada={parada} />
        </DatosParadaContext.Provider>
        <Buses lineas={datosLineas} />
        {tiempoLinea ? <TiempoLinea linea={tiempoLinea} /> : ""}
      </header>
      <section className="forms">
        <form>
          <label htmlFor="num-parada">Parada nº: </label>
          <input type="number" id="num-parada" />
          <button type="submit">Buscar</button>
        </form>
        <SelectLinea lineas={datosLineas} tiempoLineaHandler={tiempoLineaHandler} />
      </section>
    </>
  );
};

export default Parada;
