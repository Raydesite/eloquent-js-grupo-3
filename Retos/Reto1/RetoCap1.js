// Reto 1: Eloquent JavaScript

// Nombre: Diana Chacón Ocariz
// Usuario Discord: DianaChacon
// Grupo de lectura: 3


// Ejercicio 1
function Ejercicio1() {
    const numero_1 = 2;

    if (numero_1==8) {
        let numero_4 = 5;
        numero_1 = 3;
    }

    let numero_4 = 7;

    console.log(numero_1);
}

Ejercicio1();

/*
Resultado:

1) console.log(numero_1); 
-> // 2
numero_1 es una constante y su valor no cambia

2) Por esta razón, si la condición del if fuese verdadera, numero_1 = 3 daría error
*/


// Ejercicio 2


function Ejercicio2() {
    const numero_1 = 2;
    
    if (numero_1==6) {
            let numero_4 = 5;
            numero_1 = 3;
    }
    
    let numero_4 = 7;
    
    console.log(numero_4);
}

Ejercicio2();

/*
Resultado:

1) console.log(numero_4); 
-> // 7

El numero_4 dentro del if es diferente al numero_4 fuera de él. 
El primero solo tiene alcance dentro del if, por eso el resultado
*/

function Ejercicio3() {
    const url_base = 'https://api.prueba.com';
    const key = 'uahgysgkjhdsyt';
    const user_key = 'user_prueba';

    if (key == 22){
        let value = 22;
        console.log('Usuario: ' + user_key + '- Llave: ' + key);
        console.log('Valor = ' + value);

        value = value + 1;
        console.log('Valor = ' + value);

        value = value - 1;
        console.log('Valor = ' + value);

    }

    console.log('Valor = ' + value);
}

// Ejercicio3()

/*
Resultado:

1) El código da error porque la variable 'value' está definida dentro del if y
por lo tanto su alcance se limita a esta instrucción, fuera del if, no existe

Para corregirlo, basta con declarar la variable 'value' fuera del if.

Para corregirlo y simplificarlo:

1) url_base puede ser eliminada ya que no existe
2) La condición del if nunca se va a cumplir, ya que key es una constante diferente de 22
se puede entonces: Eliminar toda la instrucción if o simplemente imprimir 

    console.log('Usuario: ' + user_key + ' - Llave: ' + key);
    console.log('Valor = ' + value);

Ya que sumar 1 a value para luego restarlo, también es inútil.
3) Fin


*/

function Ejercicio3_bis() {
    const key = 'uahgysgkjhdsyt';
    const user_key = 'user_prueba';
    let value = 22;

    console.log('Usuario: ' + user_key + ' - Llave: ' + key);
    console.log('Valor = ' + value);
}

Ejercicio3_bis();


function Ejercicio3_ter() {
    let value = 22;
    console.log('Valor = ' + value);
}

Ejercicio3_bis();