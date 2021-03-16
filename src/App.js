import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import NumeroParada from "./Components/NumeroParada";

function App() {
  const [parada, setParada] = useState(27775);
  const [existeParada, setexisteParada] = useState(false);
  const { datos, cargando } = useFetch(`https://api.tmb.cat/v1/transit/parades/${parada}?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);

  useEffect(() => {
    if(!cargando){
      if(datos.numberReturned > 0){
        setexisteParada(true);
      } else {
        setexisteParada(false);
      }
    }
  },[datos, parada, cargando]);

  return (
    <div className="contenedor">
      <header className="cabecera">
        <NumeroParada parada={parada} existeParada={existeParada}/>
        <div className="display">
          <div className="bus">
            <span className="linea">V16</span>
            <span className="destino">Universitat</span>
            <span className="tiempo">10min</span>
          </div>
          <div className="bus">
            <span className="linea">H12</span>
            <span className="destino">Pla de Palau</span>
            <span className="tiempo">1min</span>
          </div>
          <div className="bus">
            <span className="linea">32</span>
            <span className="destino">Barceloneta</span>
            <span className="tiempo">4min</span>
          </div>
        </div>
        <h2>Tiempo para la línea 60: 2 minutos</h2>
      </header>
      <section className="forms">
        <form>
          <label htmlFor="num-parada">Parada nº: </label>
          <input type="number" id="num-parada" />
          <button type="submit">Buscar</button>
        </form>
        <form>
          <label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </label>
          <select id="tiempo-linea">
            <option value="">Elige línea</option>
          </select>
        </form>
      </section>
    </div>
  );
}

export default App;
