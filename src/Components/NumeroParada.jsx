import React from "react";

export const NumeroParada = (props) => {
  const { parada, nParada } = props;
  return (
    //existeParada ? <h1>Parada nº {parada}</h1> : <h1>La parada {parada} no existe</h1>
    parada ?
      parada.numberMatched > 0 ? <h1> Parada nº {nParada}</h1 > : <h1>La parada {nParada} no existe</h1> : <h1>cargando..</h1>
  );
};

export default NumeroParada;
