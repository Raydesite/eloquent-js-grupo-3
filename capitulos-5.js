/* Aplanamiento */
const aplanar = (arr) => {
  return arr.reduce((arreglo, valor) => {
    return arreglo.concat(Array.isArray(valor) ? aplanar(valor) : valor);
  }, []);
};

/* Ciclo for */
const ciclo = (inicio, prueba, actualizacion, accion) => {
  for (i = inicio; prueba(i); i = actualizacion(i)) {
    accion(i);
  }
};

/* Every usando some */
const every = (arr, evaluacion) => !arr.some((item) => !evaluacion(item));

/* Every usando ciclo for */
const every = (arr, evaluacion) => {
  let result = true;
  for (let item of arr) {
    result = result && evaluacion(item);
  }

  return result;
};

/* Every usando reduce */
const every = (arr, evaluacion) =>
  arr.reduce((result, item) => evaluacion(item) && result, true);
