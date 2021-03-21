/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const Linea = () => {
  let { id } = useParams();

  const { datos: datosParadasLinea, pedirDatos: pedirParadasLinea } = useFetch();

  useEffect(() => {
    pedirParadasLinea(`https://api.tmb.cat/v1/transit/linies/bus/${id}/parades?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);
  }, [id, pedirParadasLinea]);

  return (
    datosParadasLinea ?
      <>
        <header className="cabecera">
          <h2>Bus {id} - Hospital Clínic / Polígon Zona Franca</h2>
          <h3>Polígon Zona Franca -{">"} Hospital Clínic</h3>
          <a href="#">Volver a la portada</a>
        </header>
        <section>
          <ul className="grafico-paradas">
            {datosParadasLinea.features.map(parada =>
              <li key={parada.id} className="parada">Parada nº {parada.properties.CODI_PARADA}: {parada.properties.NOM_PARADA}
                &nbsp;(<a href={`http://maps.google.com/maps?z=19&t=m&q=loc:
                  ${parada.geometry.coordinates[1]}+${parada.geometry.coordinates[0]}`}>ver mapa
                </a>)
              </li>)}
          </ul>
        </section>
      </> : <p>cargando</p>
  );
};

export default Linea;
