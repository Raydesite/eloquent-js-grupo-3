// Ejercicios Capítulo 2, Eloquent JavaScript
// Diana Chacón Ocariz


// EJERCICIO 1
// Imprime un triángulo de n líneas de '#' en la pantalla
function Triangulo(n) {
    let car = "";
    for (let i=1; i<=n; i+=1) {
        car = car + '#'
        console.log(car);
    }
}

console.log("\n Triángulo de '#'");
Triangulo(10);


// Imprime un árbol de n líneas con el caracter '*'
function Arbol(n) {
    let car = '*',  esp = ' ',  m = n/2;
    
    for (let i=1; i<=m; i+=1) {
        console.log(esp.repeat(m-i) + car.repeat(i) + car.repeat(i) + esp.repeat(m-i));
    }
}

console.log("\n Árbol de '*'");
Arbol(20);


// EJERCICIO 2
// Imprime los números del 1 al n
// Para los números múltiplos de 3, imprime la palabra "Fizz"
// Para los números múltiplos de 5, imprime la palabra "Buzz"
// Y para los números múltiplos de 3 y 5 a la vez, imprime la palabra "FizzBuzz"
function FizzBuzz (n) {

    let car = '';

    for (let i=1; i<=n; i+=1) {
        car = '';
        if (i % 3 == 0) car = "Fizz";
        if (i % 5 == 0) car = car + "Buzz"; // Crea FizzBuzz en caso de múltiplo de 3 y 5
        if (car == '') car = i;

        console.log(car);    

    }
}

console.log("\n FizzBuuz Con if");
FizzBuzz(30);


// Versión FizzBuzz con Switch
// Atención: El orden de las opciones del Switchs es importante
// para generar el resultado correcto
function FizzBuzzSwitch(n) {

    let car = '';

    for (let i=1; i<=n; i+=1) {
        car = '';

        // Siempre entrará en el switch
        // El orden de los case es importante
        switch (true) {
            case (i % 3 == 0 && i % 5 == 0): car = "FizzBuzz"; break; 
            case (i % 3 == 0): car = "Fizz"; break;
            case (i % 5 == 0): car = "Buzz"; break;
            default: car = i;
        } 

        console.log(car);    

    }
}

console.log("\n FizzBuuz Con switch");
FizzBuzzSwitch(30);


// EJERCICIO 3
// Imprime un tablero de ajedrez de lin lineas y col columnas
function Tablero(lin, col) {
    let car,  linea = '';
    
    for (let i=1; i<=lin; i+=1) {

        car = (i % 2 == 0 ? '#' : ' ');
        linea = car;

        for (let j=1; j<col; j+=1) {
            car = (car == ' ' ? '#' : ' ');
            linea = linea + car;
        }

        console.log(linea);
    }
}

console.log("\n Tablero de ajedrez");
Tablero(15,30);

