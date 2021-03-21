import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Buses = (props) => {
  const { lineas } = props;

  const [posicion, setposicion] = useState(0);

  useEffect(() => {
    let i = 0;
    if (lineas) {
      const interval = setInterval(function () {
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
      return () => clearInterval(interval);
    }
  }, [lineas]);

  return (
    <div className="display">
      {lineas ?
        lineas.data.ibus?.map((linea) => {
          return (
            <div key={linea.line} className="bus" style={{ top: posicion }}>
              <Link to={`/linea/${linea.line}`}><span className="linea">{linea.line}</span></Link>
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
