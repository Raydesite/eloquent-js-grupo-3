/* Rango */
const rango = (a, b) => Array.from(Array(b - a + 1).keys()).map((x) => x + a);

/* Rango con saltos */
const rangoConSaltos = (a, b, i = 1) =>
  Array.from(Array(Math.abs(Math.floor((b - a) / i)) + 1).keys()).map(
    (x) => x * i + a
  );

/* Revirtiendo un array */

const revertirArray = (arr) => {
  let arrReverse = [];
  for (let i of arr) {
    arrReverse.unshift(i);
  }

  return arrReverse;
};

/* Revirtiendo array sin copia */
const revertirArrayEnSuLugar = (arr) => {
  const len = arr.length;
  for (let i = 0; i < Math.ceil(len / 2); i++) {
    let aux = arr[i];
    arr[i] = arr[len - 1 - i];
    arr[len - 1 - i] = aux;
  }

  return arr;
};

/* Arreglo a lista */
const arrayALista = (arr) => {
  let [valor, ...resto] = arr;

  if (!arr.length) return null;

  return { valor, resto: arrayALista(resto) };
};

/* Lista a arreglo */
const listaArray = (obj) => {
  let { valor, ...all } = obj;
  if (!all.resto) return valor;
  return [valor, listaArray(all.resto)].flat();
};

/* Comparación profunda */
const igualdadProfunda = (val1, val2) => {
  if (val1 === val2) return true;

  if (Array.isArray(val1) && Array.isArray(val2)) {
    return val1.sort().join('') === val2.sort().join('');
  }
  if (
    val1 !== null &&
    val2 !== null &&
    typeof val1 === 'object' &&
    typeof val2 === 'object'
  ) {
    if (
      Object.keys(val1).sort().join('') !== Object.keys(val2).sort().join('')
    ) {
      return false;
    }

    for (const property in val1) {
      if (!igualdadProfunda(val1[property], val2[property])) {
        return false;
      }
    }
    return true;
  }
  return false;
};
