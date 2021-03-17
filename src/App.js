import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import NumeroParada from "./Components/NumeroParada";
import Buses from "./Components/Buses";
import SelectLinea from "./Components/SelectLinea";
import TiempoLinea from "./Components/TiempoLinea";

function App() {
  const [parada, setParada] = useState(2543);
  const [tiempoLinea, setTiempoLine] = useState(null);
  const { datos: datosParada, pedirDatos: pedirParada } = useFetch();
  const { datos: datosLineas, pedirDatos: pedirLineas } = useFetch();

  useEffect(() => {
    pedirParada(`https://api.tmb.cat/v1/transit/parades/${parada}?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);
  }, [pedirParada, parada]);

  useEffect(() => {
    if(datosParada){
      pedirLineas(`https://api.tmb.cat/v1/ibus/stops/${parada}?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);
    }
  }, [datosParada, parada, pedirLineas]);

  const tiempoLineaHandler = (idLinea) => {
    const datosFiltrados = datosLineas.data.ibus.filter(linea => linea.line === idLinea);
    setTiempoLine({
      linea : datosFiltrados[0].line,
      minutos: datosFiltrados[0]["t-in-min"]
    });

  };

  return (
    <div className="contenedor">
      <header className="cabecera">
        <NumeroParada parada={datosParada} nParada={parada}/>
        <Buses lineas={datosLineas}/>
        {tiempoLinea ? <TiempoLinea linea={tiempoLinea}/> : ""}

      </header>
      <section className="forms">
        <form>
          <label htmlFor="num-parada">Parada nº: </label>
          <input type="number" id="num-parada" />
          <button type="submit">Buscar</button>
        </form>
        <SelectLinea lineas={datosLineas} tiempoLineaHandler={tiempoLineaHandler} />
      </section>
    </div>
  );
}

export default App;
