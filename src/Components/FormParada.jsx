import { useContext, useState } from "react";
import ContextBuscar from "../context/Buscar";

export const NumeroParada = (props) => {
  const { paradaBuscada } = useContext(ContextBuscar);
  const [busqueda, setBusqueda] = useState("");

  const modificarParada = e => {
    setBusqueda(e.target.value);
  };

  const buscarParada = e => {
    e.PreventDefault();
    paradaBuscada(busqueda);
  };

  return (
    <form onSubmit={buscarParada}>
      <label htmlFor="num-parada">{buscarParada ? "Parada nº" : ""} </label>
      <input type="number" id="num-parada" onChange={modificarParada} />
      <button type="submit">Buscar</button>
    </form>
  );
};
