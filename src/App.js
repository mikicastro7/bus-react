import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import NumeroParada from "./Components/NumeroParada";
import Buses from "./Components/Buses";

function App() {
  const [parada, setParada] = useState(2543);
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

  return (
    <div className="contenedor">
      <header className="cabecera">
        <NumeroParada parada={datosParada} nParada={parada}/>
        <Buses lineas={datosLineas}/>
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
