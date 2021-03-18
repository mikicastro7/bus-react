import { useState } from "react";
import React from "react";

const SelectLinea = (props) => {
  const { lineas, tiempoLineaHandler } = props;
  const [lineaSelec, setLineaSelect] = useState("");

  const obtenirLineaSeleccionada = (valor) => {
    setLineaSelect(valor);
    tiempoLineaHandler(valor);
  };

  return (
    <form>
      <label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </label>
      <select value={lineaSelec} onChange={(e) => obtenirLineaSeleccionada(e.target.value)} id="tiempo-linea">
        <option disabled value="">Elige línea</option>
        {lineas ?
          lineas.data.ibus?.map((linea) => {
            return (
              <option key={linea.line} value={linea.line}>{linea.line}</option>
            );
          })
          : ""}
      </select>
    </form>
  );
};

export default SelectLinea;
