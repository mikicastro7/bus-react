import React from "react";

const Buses = (props) => {
  const { lineas } = props;

  return (
    <div className="display">
      {lineas ? lineas.data.ibus?.map((linea, i) => {
        return (
          <div key={i} className="bus">
            <span className="linea">{linea.line}</span>
            <span className="destino">{linea.destination}</span>
            <span className="tiempo">{linea["text-ca"]}</span>
          </div>
        );
      }) : <span className="linea">Cargando o no hay buses </span>}
    </div>
  );
};

export default Buses;
