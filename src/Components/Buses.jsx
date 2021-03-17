import React, { useState, useEffect, useRef } from "react";

const Buses = (props) => {
  const { lineas } = props;

  const [posicion, setposicion] = useState(0);

  useEffect(() => {
    let i = 0;
    setInterval(function () {
      i++;
      if (lineas) {
        if (i < lineas.data.ibus.length) {
          setposicion(-30 * i);
        } else {
          setposicion(0);
          i = 0;
        }
      }
    }, 2000);
  }, [lineas]);

  return (
    <div className="display">
      {lineas ?
        lineas.data.ibus?.map((linea, i) => {

          return (
            <div key={linea.line} className="bus" style={{ top: posicion }}>
              <span className="linea">{linea.line}</span>
              <span className="destino">{linea.destination}</span>
              <span className="tiempo">{linea["text-ca"]}</span>
            </div>
          );
        })
        : <span className="linea">Cargando o no hay buses </span>}
    </div >
  );
};

export default Buses;
