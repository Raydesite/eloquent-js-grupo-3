/* Aplanamiento */
const aplanar = (a) => {
  if (Array.isArray(a)) {
    return a.reduce((nLista, i) => {
      return nLista.concat(aplanar(i));
    }, []);
  }
  return a;
};
console.log(aplanar([1, [2, 3, [4, 5, 7, [1, 2]]]]));
// -> [1, 2, 3, 4, 5, 7, 1, 2]

/* Tu propio ciclo */
const ciclo = (vi, prueba, actualiza, accion) => {
  for (let i = vi; prueba(i); i = actualiza(i)) {
    accion(i);
  }
};
ciclo(
  1,
  (i) => i < 3,
  (i) => i + 1,
  console.log
);
// -> 1
// -> 2

/* Cada */
const every = (a, test) => {
  let every = true;
  for (let e of a) {
    every = every && test(e);
  }
  return every;
};
console.log(every([1, 3, 5], (n) => n < 10));
// → true

/* Dirección de Escritura Dominante */

// Constante de códigos (selccioné solo una, la lista completa aquí: https://eloquentjavascript.net/code/scripts.js)

const SCRIPTS = [
  {
    name: "Latin",
    ranges: [
      [65, 91],
      [97, 123],
      [170, 171],
      [186, 187],
      [192, 215],
      [216, 247],
      [248, 697],
      [736, 741],
      [7424, 7462],
      [7468, 7517],
      [7522, 7526],
      [7531, 7544],
      [7545, 7615],
      [7680, 7936],
      [8305, 8306],
      [8319, 8320],
      [8336, 8349],
      [8490, 8492],
      [8498, 8499],
      [8526, 8527],
      [8544, 8585],
      [11360, 11392],
      [42786, 42888],
      [42891, 42927],
      [42928, 42936],
      [42999, 43008],
      [43824, 43867],
      [43868, 43877],
      [64256, 64263],
      [65313, 65339],
      [65345, 65371],
    ],
    direction: "ltr",
    year: -700,
    living: true,
    link: "https://en.wikipedia.org/wiki/Latin_script",
  },
];

// Funciones predefinidas
function contarPor(elementos, nombreGrupo) {
  let cuentas = [];
  for (let elemento of elementos) {
    let nombre = nombreGrupo(elemento);
    let conocido = cuentas.findIndex((c) => c.nombre == nombre);
    if (conocido == -1) {
      cuentas.push({ nombre, cuenta: 1 });
    } else {
      cuentas[conocido].cuenta++;
    }
  }
  return cuentas;
}

function codigoCaracter(codigo_caracter) {
  for (let codigo of SCRIPTS) {
    if (
      codigo.ranges.some(([desde, hasta]) => {
        return codigo_caracter >= desde && codigo_caracter < hasta;
      })
    ) {
      return codigo;
    }
  }
  return null;
}

// Determina la dirección dominante en el conjunto de caracteres (texto) dado
let direccionDom = (texto) => {
  let porDirecc = contarPor(texto, (i) => {
    let codigo = codigoCaracter(i.codePointAt(0));
    return codigo ? codigo.direction : "No";
  });
  if (porDirecc.length == 0) return "No hay caracteres";
  let mayor = porDirecc.reduce((mayor, i) =>
    mayor.cuenta > i.cuenta ? mayor : i
  );
  return mayor.nombre;
};
direccionDom("Test");
//-> "ltr"
