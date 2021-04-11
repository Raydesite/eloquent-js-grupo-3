// Ejercicios Capítulo 4, Eloquent JavaScript
// Diana Chacón Ocariz


// EJERCICIO 1: RANGO Y SUMA

// Función que devuelve un arreglo que contiene un rango de números
// dependiendo de un paso.
// El paso por defecto es 1. 
// En el caso de un paso negativo, el rango va ordenado de mayor a menor
// Si el paso es 0, se devuelve un arreglo vacío
function Rango(n, m, paso = 1) {
    let arreglo = [];
    let j = 0;
    
    // Si el paso es 0, se produce un stack overflow
    // en ese caso, devolvemos el arreglo vacío
    if (paso == 0) return arreglo;

    if (paso > 0) {
        for (let i=n; i <= m; i = i + paso) {
            arreglo[j] = i;
            j++;
        }
    }
    else {
        for (let i=n; i >= m; i = i + paso) {
            arreglo[j] = i;
            j++;
        }
    }

    return arreglo;
}

// console.log("\nPruebas diferentes rangos con pasos positivos y negativos");
// console.log(Rango(1, 10));
// console.log(Rango(1, 10, 2));
// console.log(Rango(1, 10, 0));
// console.log(Rango(5, 2, -1));
// console.log(Rango(1, 10, -2));
// console.log(Rango(10, 1, -2));
// console.log(Rango(-10, 5, 2));
// console.log(Rango(-1, -15, -3));
// console.log(Rango(-5, 5, 20));


// Función que devuelve la suma de los elementos de un arreglo
function Suma(arreglo) {
    let total=0;

    for (let i=0; i < arreglo.length; i++) {
        total = total + arreglo[i];
    }

    return total;
}

// console.log("\nSuma elementos diferentes arreglos");
// console.log(Suma(Rango(1, 10)));
// console.log(Suma(Rango(1, 10, 2)));
// console.log(Suma(Rango(1, 10, 0)));
// console.log(Suma(Rango(5, 2, -1)));
// console.log(Suma(Rango(10, 1, -2)));


// EJERCICIO 2: INVERTIR ARREGLO

// Devuelve un nuevo arreglo con los mismos elementos del arreglo
// pasado como parámetro pero en orden inverso
function InvertirArreglo(arreglo) {
    let nuevo = [];

    for (let i=0; i < arreglo.length; i++) {
        nuevo[arreglo.length - 1 - i] = arreglo[i];
    }

    return nuevo;
}


// Modifica el arreglo pasado como parámetro y lo devuelve
// en orden inverso
function InvertirMismoArreglo(arreglo) {
    let aux = arreglo;
    
    for (let i=0; i < arreglo.length ; i++) {
        arreglo[i] = aux[arreglo.length - 1 - i];
    }

    return arreglo;
}

let arr1 = [3, 4, 8, 2, -1, 6, 7];

// console.log("\nPruebas invertir arreglos, generando uno nuevo o invirtiendo el mismo");
// console.log(arr1);
// console.time("InvertirArreglo");
// console.log(InvertirArreglo(arr1));
// console.timeEnd("InvertirArreglo");
// console.log(arr1);
// console.time("InvertirMismoArreglo");
// console.log(InvertirMismoArreglo(arr1));
// console.timeEnd("InvertirMismoArreglo");
// console.log(arr1);

// El tiempo de ejecución de los 2 métodos es más o menos equivalente
// InvertirArreglo es una función pura, ya que produce el mismo resultado
// si se le pasa el mismo parámetro y no tiene efectos secundarios.
// Mientras que InvertirMismoArreglo no es pura porque, al transformar
// el arreglo pasado como parámetro, se corre el riesgo de alterar otras
// partes del código o producir resultados distintos si el arreglo es
// modificado por otra parte del código.
// Dependiendo del contexto y lo que se desee, cada versión tendrá su
// utilidad.
// El método reverse es normal que actúe directamente sobre el array, pues
// es un método y su fin es modificar un objeto.
// En este caso, debemos hablar de funciones independientes de parámetros y
// pensar en el paradigma funcional.


//EJERCICIO 3: LISTAS

// Arreglo inicial para crear la lista
let arreglo = [133, 'Hola', 432, 'a todos', 23];

// Transforma un arreglo en lista. Función recursiva
function ArregloALista(arr) {
    let lista = {}; 
    let arreglo = arr;

    lista = {
        valor: arreglo[0],
        resto: null
    };

    if (arreglo.length - 1 > 0) {
        arreglo.shift();
        lista.resto = ArregloALista(arreglo);
    }

    return lista;
}

// console.log("\nLista para los ejercicios de listas");
// let lista = ArregloALista(arreglo);
// console.log(lista);

function ListaAArreglo(list) {
    let arreglo = [];
    let lista = list;

    while (lista.resto != null) {
        arreglo.push(lista.valor);
        lista = lista.resto;
    } 

    arreglo.push(lista.valor);

    return arreglo;
}

// console.log("\nTransforma la lista a arreglo");
// console.log(ListaAArreglo(lista));

// Agrega un elemento al comienzo de la lista
function Preceder(valor, lista) {
    let nuevaLista = {
        valor: valor,
        resto: lista
    };

    return nuevaLista;
}

// console.log("\nAgrega un nuevo elemento y se genera una nueva lista");
// console.log(Preceder(5, lista));


// Devuelve la posición de un valor dado
// (Ok, no está en los ejercicios pero igual ya la hice :-P )
function PosicionValorEnLista(valor, lista) {
    let i = 0;
    let listaAux = lista;

    // En caso de no encontrarse el valor, listaAux = null
    while (listaAux != null) {

        if (listaAux.valor != valor) {
            listaAux = listaAux.resto;
            i++;
        }
        else return i;
    } 

    if (listaAux === null) return undefined; 
}

// console.log("\nDevuelve la posición de un elemento en la lista");
// console.log(PosicionValorEnLista('a todos', lista));
// console.log(PosicionValorEnLista(133, lista));
// console.log(PosicionValorEnLista('fsgdfs', lista));


// Devuelve el elemento de la posición dada
function Posicion(i, lista) {
    let listaAux = lista;
    let j = 0;

    if (i < 0 || i == NaN) {
        return undefined;
    }

    while (j <= i) {

        if (j == i) {
            return listaAux.valor;
        }
        else {
            j++,
            listaAux = listaAux.resto;
        }
    }        
}

// Igual pero recursiva
function PosicionRecursiva(i, lista) {
    let listaAux = lista;

    if (i == 0) {
        return listaAux.valor;
    }
    else if (i < 0 || i == NaN) {
        return undefined;
    }
    else
    {
        listaAux = listaAux.resto;
        i--;
        // No olvidar el return
        return PosicionRecursiva(i, listaAux);
    }
}

// console.log("\nDevuelve el elemento en la posición dada, versión con while y recursiva");
// console.log(Posicion(1, lista));
// console.log(PosicionRecursiva(3, lista));


// EJERCICIO 4: COMPARACIÓN PROFUNDA
// Compara 2 valores, incluso cuando se trata de objetos
// de varias dimensiones

function ComparacionProfunda(a,b) {

    // Si los 2 valores a comparar son del mismo tipo y no son objetos,
    // se hace una comparación estricta ===
    if (typeof a === typeof b && typeof a != 'object') {
        return (a === b ? true : false);
    }
    // Si los tipos de los valores son distintos o al menos uno es nulo
    else if ((typeof a != typeof b) || (a === null || b === null))  {
        return false;
    }
    // Caso de objetos y arreglos. 
    // Se hacen llamados recursivos precisamente para tratar las
    // dimensiones múltiples en arreglos y objetos
    // Se itera sobre las claves más numerosas
    // Al comparar a[clave] con b[clave] no importa que las claves
    // estén en diferente orden, y si no son iguales, dará falso
    else {
        for (let clave of (a.length >= b.length ? Object.keys(a) : Object.keys(b))) {
            if (! ComparacionProfunda(a[clave], b[clave])) return false;
        }

        return true;
    }

}

console.log("\nCompara 2 variables, no importa el tipo");
let cadena1 = "Esta es una cadena";
let cadena2 = "Esta es una cadena";
let arreglo1 = [1, 2, 3];
let arreglo2 = [1, 2, 3];
let arreglo3 = [1, 2, 3, [5, 6]];
let arreglo4 = [1, 2, 3, [5, 6]];
let obj1 = {
    valor1: 1,
    valor2: "hola",
    valor3: 2.2
}
let obj2 = {
    valor1: 1,
    valor2: "hola",
    valor3: 2.2
}
let obj3 = {
    valor1: 1,
    valor2: "chao",
    valor3: 2.2
}
let obj4 = {
    valor1: 1,
    valor2: "hola",
    arreglo1: [1, 2]
}
let obj5 = {
    valor1: 1,
    valor2: "hola",
    arreglo1: [1, 2]
}
let obj6 = {
    arreglo1: [1, 2],
    valor1: 1,
    valor2: "hola"    
}
let obj7 = {
    arr: [1, 2],
    v1: 1,
    v2: "hola"    
}

// console.log(ComparacionProfunda(cadena1, cadena1));
// console.log(ComparacionProfunda(arreglo1, arreglo2));
// console.log(ComparacionProfunda(arreglo3, arreglo4));
// console.log(ComparacionProfunda(obj1, obj2));
// console.log(ComparacionProfunda(obj1, obj3));
// console.log(ComparacionProfunda(obj4, obj1));
// console.log(ComparacionProfunda(obj4, obj5));
// console.log(ComparacionProfunda(obj1, cadena1));
// console.log(ComparacionProfunda(obj1, null));
// console.log(ComparacionProfunda(null, null));
console.log(ComparacionProfunda(obj6, obj5));
console.log(ComparacionProfunda(obj7, obj5));