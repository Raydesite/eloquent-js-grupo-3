// Ejercicios Capítulo 5, Eloquent JavaScript
// Diana Chacón Ocariz


// EJERCICIO 1: APLANAR MATRIZ

let matriz = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9]
];

const ConcatenarArrow = (a, b) => a.concat(b);

function Concatenar(a, b) {
    return a.concat(b);
}

// A reduce le pasamos como parámetro la función que vamos a aplicar
// para reducir el arreglo o matriz. En este caso, vamos a ir concatenando
// cada uno de los elementos a un arreglo que en un principio está vacio. 
// El parámetro a de la función, representa el arreglo al que se van a ir
// acumulando o concatenando los elementos de la matriz. b es cada elemento
// que se va iterando
// Funciona de estas 3 maneras, la función puede definirse de cualquier manera
// No se les pasa parámetros porque da error
console.log("\nAplana arreglo o matriz");
console.log(matriz.reduce((a, b) => a.concat(b)));
console.log(matriz.reduce(Concatenar));
console.log(matriz.reduce(ConcatenarArrow));

// // Aquí el resultado será un arreglo con el 1er elemento = "aplanado",
// // seguido de todos los elementos de la matriz
console.log(matriz.reduce((a, b) => a.concat(b), ["aplanado"]));


// EJERCICIO 2: CICLO
// Ejecuta una función dentro de un ciclo for
// valor es el comienzo del ciclo
// prueba es la función que evelúa cuándo parar el ciclo
// actualiza es la función utilizada para definir el paso del ciclo
// funcion es la función a realizarse en cada iteración

function Ciclo (inicio, prueba, incrementa, funcion) {
    for (let i=inicio; prueba(i); i = incrementa(i)) {
        funcion(i);
    }
}

console.log("\nEjecuta una función en un ciclo for");
Ciclo (1, n => n <= 5, n => n + 1, console.log);

const jugando = n => console.log(n * n);

Ciclo (10, n => n >= 0, n => n - 2, jugando);


// EJERCICIO 3: CADA - EVERY

function Cada (arreglo, predicado) {

    for (let i= 0; i <= arreglo.length - 1; i++) {
        if (! predicado(arreglo[i])) return false;
    }

    return true; 
}


// Para que some (operador OR) sea falso, todos los elementos deben ser falsos
// Para que cada (every u operador AND) sea verdadero, todos los elementos deben
// ser verdaderos
// Si la negación de todos los elementos es falso, entonces some es falso


// Se debe evaluar la negación del predicado para que el resultado sea
// falso y some continue evaluando el siguiente elemento
// Si todas las negaciones de todos los elmentos son falsas, 
// entonces todas son verdaderas y el reultado según el
// operador AND es verdadero
function Cada2 (arreglo, predicado) {

    return ! arreglo.some(valor => ! predicado (valor)); 
}

let arr1 = [1, 2, 3];
let arr2 = [2, 4, 6];


console.log("\nFunción cada (Every), simula una expresión con AND");
console.log(Cada(arr1, n => n % 2 === 0));
console.log(Cada(arr2, n => n % 2 === 0));
console.log(Cada2(arr1, n => n % 2 === 0));
console.log(Cada2(arr2, n => n % 2 === 0));

// EJERCICIO 4: DIRECCIÓN DE ESCRITURA DOMINANTE

// load dependencies
require("./Recursos/scripts.js");
// load dependencies
//require("./code/load")("code/scripts.js", "code/chapter/05_higher_order.js", "code/intro.js");

function characterScript(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
        return script;
      }
    }
    return null;
  }
  
  function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let name = groupName(item);
      let known = counts.findIndex(c => c.name == name);
      if (known == -1) {
        counts.push({name, count: 1});
      } else {
        counts[known].count++;
      }
    }
    return counts;
  }


function DireccionDominate (texto) {
    console.log(texto);
    let contador = countBy(texto, caracter => {
        let cadena = characterScript(caracter.codePointAt(0));
        return cadena ? cadena.direction : "ninguno";
    }).filter(({name}) => name != "ninguno");

    if (contador.length == 0) return "ltr";

    return contador.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log("\nDirección dominate");
texto = "Hola!.مساء الخيرمساء الخيرمساء الخير";

console.log(DireccionDominate(texto));


function dominantDirection(text) {
    let counted = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name != "none");
  
    if (counted.length == 0) return "ltr";
  
    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
  }