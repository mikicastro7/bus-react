
import { useEffect, useState } from "react";

const useFetch = url => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(datosAPI => {
        setDatos(datosAPI);
        setCargando(false);
      });
  }, [url]);
  return {
    datos,
    cargando
  };
};

export default useFetch;
