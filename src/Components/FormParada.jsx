import React from "react";
import ContextParada from "../context/Parada";

export const NumeroParada = (props) => {
  const { parada, nParada } = prop => ContextParada;
  const modificarParada = e => {
    nParada(e.target.value);
  };
  const buscarParada = e => {
    e.PreventDefault();
  };
  return (
    <form onSubmit={buscarParada}>
      <label htmlFor="num-parada">Parada nº: {parada}</label>
      <input type="number" id="num-parada" onChange={modificarParada} />
      <button type="submit">Buscar</button>
    </form>
  );
};
