import React from "react";

export const NumeroParada = (props) => {
  const { parada, existeParada } = props;
  return (
    existeParada ? <h1>Parada nº {parada}</h1> : <h1>La parada {parada} no existe</h1>
  );
};

export default NumeroParada;
