/* Mínimo */
const min = function (a, b) {
  return a < b ? a : b;
};
min(4, 2);
//-> 2

/* Recursión */
const esPar = function (n) {
  if (n < 0) n = -n;
  if (n == 0) return true;
  if (n == 1) return false;
  return esPar(n - 2);
};

/* Conteo de letras F */
const contarCaracteres = function (str, ch) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == ch) count++;
  }
  return count;
};
const contarFs = function (str) {
  return contarCaracteres(str, "F");
};
