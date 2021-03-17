import React from "react";

const SelectLinea = (props) => {
  const { lineas, tiempoLineaHandler } = props;

  const obtenirLineaSeleccionada = (e) => {
    tiempoLineaHandler(e.target.value);
  };

  return (
    <form>
      <label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </label>
      <select onChange={obtenirLineaSeleccionada} id="tiempo-linea">
        <option disabled selected value>Elige línea</option>
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
