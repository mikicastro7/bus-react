import React from "react";

const Buses = (props) => {
  const { lineas } = props;

  const generarLineas = () => {
    if (!Array.isArray(lineas)) {
      if (lineas.data.ibus.length > 0) {
        return lineas.data.ibus.map((linea, i) => {
          return (
            <div key={i} className="bus">
              <span className="linea">{linea.line}</span>
              <span className="destino">{linea.destination}</span>
              <span className="tiempo">{linea["text-ca"]}</span>
            </div>
          );
        });
      } else {
        return <span>no hi ha cap bus</span>;
      }
    }
  };
  return (
    <div className="display">
      {generarLineas()}
    </div>
  );
};

export default Buses;
