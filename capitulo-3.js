/* Mínimo */
const min = (a, b) => (a < b ? a : b);

/* Recursión */
const esPar = (num) => {
  if (num === 0) return true;

  if (num === 1) return false;

  return esPar(Math.abs(num) - 2);
};

/* Conteo de caracteres */
const contarCaracteres = (str, letter) => {
  let counter = 0;
  for (i = 0; i < str.length; i++) {
    if (str[i] === letter) counter++;
  }

  console.log(`La palabra '${str}' contiene ${counter} ${letter}`);
};

const contarFs = (str) => {
  return contarCaracteres(str, 'F');
};
