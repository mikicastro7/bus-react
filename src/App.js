/* eslint-disable jsx-a11y/anchor-is-valid */
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import NumeroParada from "./Components/NumeroParada";
import Buses from "./Components/Buses";
import SelectLinea from "./Components/SelectLinea";
import TiempoLinea from "./Components/TiempoLinea";
import DatosParadaContext from "./contexts/DatosParadaContext";

function App() {
  const [parada, setParada] = useState(2543);
  const [tiempoLinea, setTiempoLine] = useState(null);
  const { datos: datosParada, pedirDatos: pedirParada } = useFetch();
  const { datos: datosLineas, pedirDatos: pedirLineas, setDatos: setDatosLineas } = useFetch();

  useEffect(() => {
    pedirParada(`https://api.tmb.cat/v1/transit/parades/${parada}?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);
  }, [pedirParada, parada]);

  useEffect(() => {
    if (datosParada) {
      if(datosParada.numberMatched > 0){
        pedirLineas(`https://api.tmb.cat/v1/ibus/stops/${parada}?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);
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
    <Router>
      <div className="contenedor">
        <Switch>
          <Route path="/parada" exact>
            <header className="cabecera">
              <DatosParadaContext.Provider value={datosParada}>
                <NumeroParada nParada={parada}/>
              </DatosParadaContext.Provider>
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
          </Route>
          <Route path="/linea/:numParada">
            <header className="cabecera">
              <h2>Bus 109 - Hospital Clínic / Polígon Zona Franca</h2>
              <h3>Polígon Zona Franca -{">"} Hospital Clínic</h3>
              <a href="#">Volver a la portada</a>
            </header>
            <section>
              <ul className="grafico-paradas">
                <li className="parada">Parada nº X: Nombre parada (<a href="#">ver mapa</a>)</li>
                <li className="parada">Parada nº 1741: Cotxeres TB Zona Franca (<a href="#">ver mapa</a>)</li>
                <li className="parada">Parada nº 1045: Pg Zona Franca - Motors (<a href="#">ver mapa</a>)</li>
                <li className="parada">Parada nº 1615: Carrer número 4 - Carrer D (<a href="#">ver mapa</a>)</li>
                <li className="parada">Parada nº 1639: Carrer A- Comissaria Portuària (<a href="#">ver mapa</a>)</li>
                <li className="parada">Parada nº 1643: Mercabarna - Mercat del Peix (<a href="#">ver mapa</a>)</li>
              </ul>
            </section>
          </Route>
          <Route>
            <Redirect to="/parada"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
