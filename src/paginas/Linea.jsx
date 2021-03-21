/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Linea = () => {
  let { id } = useParams();

  const { datos: datosParadasLinea, pedirDatos: pedirParadasLinea } = useFetch();
  const { datos: datosLinea, pedirDatos: pedirDatosLinea } = useFetch();

  useEffect(() => {
    pedirParadasLinea(`https://api.tmb.cat/v1/transit/linies/bus/${id}/parades?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);
  }, [id, pedirParadasLinea]);

  useEffect(() => {
    pedirDatosLinea(`https://api.tmb.cat/v1/transit/linies/bus/${id}/?app_id=a372a6d9&app_key=de3506372e19c90a75a39c1fa2dc9fb7`);
  }, [id, pedirDatosLinea]);

  console.log(datosLinea);
  return (
    datosParadasLinea ?
      <>
        <header className="cabecera">
          <h2>Bus {id} - {datosLinea && datosLinea.features[0].properties.DESC_LINIA}</h2>
          <h3>{datosLinea && datosLinea.features[0].properties.ORIGEN_LINIA} -{">"} {datosLinea && datosLinea.features[0].properties.DESTI_LINIA}</h3>
          <Link to="/">Volver a la portada</Link>
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
