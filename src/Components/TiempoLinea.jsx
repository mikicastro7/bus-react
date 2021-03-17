import React from "react";

const TiempoLinea = (props) => {
  const { linea, minutos } = props.linea;
  return (
    <div>
      <h2>Tiempo para la línea {linea} : {minutos} minutos</h2>
    </div>
  );
};

export default TiempoLinea;
