// Ejercicios Capítulo 3, Eloquent JavaScript
// Diana Chacón Ocariz

// EJERCICIO 1
// Función que devuelve el mínimo de 2 números
// Este código funciona (llamada de la función
// antes de su declaración) si y solamente si
// se utiliza la declaración de funciones, para que
// JS aplique el hoisting (desplazamiento al comienzo
// del bloque)
// Si se define la función como expresión, no será posible
// llamarla antes de declararla

// Este código da error si se hace una expresión de función

console.log("\nDevuelve el mínimo entre 2 valores:");
console.log("Mínimo entre 3 y 8: " + min(3,8));
console.log("Mínimo entre 2 y nada: " + min(2));
console.log("Mínimo entre 3 y -8: " + min(3,-8));

// const min = function(a, b) {
function min(a, b) {
    if (a <= b || b === undefined) {
        return a;
    }
    else { return b } ;
}


// EJERCICIO 2
// Función recursiva para saber si un número es par o impar
// Devuelve True si el número es par, sino False
// Se utiliza el valor absoluto del número para evitar
// un stack overflow cuando el parámetro es un número negativo
// En caso de que el parámetro no sea un número (NaN) o no sea
// entero, se devuelve NaN

const EsPar = function(n) {

    if (isNaN(n) || ! Number.isInteger(n) ) {

        return NaN;
    }
    else {
        n = Math.abs(n);
    }

    if (n == 0) { 
        return true;
    }
    else if (n == 1) {
        return false;
    }
    else {
        return EsPar(n-2);
    }
}

console.log("\nDevuelve True si un número es par, False sino. Nan si no es entero o NaN");
console.log("¿50 es par? " + EsPar(50));
console.log("¿75 es par? " + EsPar(75));
console.log("¿-3 es par? " + EsPar(-3));
console.log("¿-3.14 es par? " + EsPar(-3.14));
console.log("¿e es par? " + EsPar("e"));

// EJERCICIO 3
// Función que cuenta las ocurrencias de una letra dada
// dentro de una cadena de caractéres


let cadena = "Esta es una cadena de caractéres";
console.log("\nContando la cantidad de 's' en '" + cadena + "'");
console.log(CuentaLetra(cadena, 'a'));



console.log("\nContando la cantidad de 's' en '" + cadena + "'");
console.log(cuentaS(cadena));

function CuentaLetra(cadena, car) {
    let numLetra = 0;

    for (let i=0; i<cadena.length; i++) {
        if (cadena[i] == car) {
            numLetra++;
        }
        
    }

    return numLetra;
}

// Función que cuenta las 's' de una cadena de caractéres 
const cuentaS = function(cadena) {
    return CuentaLetra(cadena, 's');
}
