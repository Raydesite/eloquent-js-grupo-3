// Ejercicios Capítulo 6, Eloquent JavaScript
// Diana Chacón Ocariz

// EJERCICIO 1: VECTORES
// Crea una clase Vector, cuyas propiedades son las coordenadas
// de un punto 
// 2 métodos: mas y menos, que suman y restan respectivamente 
// otro vector. Devuelve un nuevo objeto de tipo vector
// También posee una propiedad getter, largo, que es el largo
// del vector calculado desde el punto (0,0)
class Vector {
    constructor (x = 0, y = 0) {
        this.x = x,
        this.y = y
    }

    mas (x, y) {
        let nuevoVec = new Vector (this.x + x, this.y + y);    
        return nuevoVec;
    }

    menos (x, y) {
        let nuevoVec = new Vector (this.x - x, this.y - y);    
        return nuevoVec;
    }

    get largo() {
        let largoVec = Math.sqrt(this.x * this.x + this.y * this.y);
        return largoVec;
    }

}

console.log("\nOperaciones con vectores");
let vector1 = new Vector (5, 8);
let vector2 = vector1.mas(3,2);
console.log(vector1.menos(3,2));
console.log(vector1.largo);
console.log(vector2, vector2.largo);


// EJERCICIO 2: GRUPOS
// Clase Grupo que contiene un arreglo de elementos únicos
class Grupo {
    constructor () {
        this.elementos = [];
    }

    agregar (elemento) {
        if (! this.elementos.includes(elemento)) {
            return this.elementos.push(elemento);
        }
    }

    borrar (elemento) {
        let indice = this.elementos.indexOf(elemento);
        if (indice != -1) {
            return this.elementos = this.elementos.slice(0, indice).concat(this.elementos.slice(indice+1));
        }
    }

    tiene (elemento) {
        return this.elementos.includes(elemento);
    }

    static desde (iterable) {
        let grupo = new Grupo();

        for (let elemento of iterable) {
            grupo.agregar(elemento);
        }

        return grupo;

    }

    [Symbol.iterator]() {
        return new IteradorGrupo(this);
    }   
}

console.log("\nClase Grupo");
let grupo = new Grupo;

console.log(grupo);
grupo.agregar(2);
console.log(grupo);
grupo.agregar(4);
console.log(grupo);
grupo.agregar(8);
console.log(grupo);
grupo.agregar(2);
console.log(grupo);
grupo.borrar(4);
console.log(grupo);

let arreglo = [1, 3, 5, 7];
console.log(Grupo.desde(arreglo));

// Iterador "natural" que puede tener
// cualquier objeto iterable
console.log("\nSymbol.iterator");
let iterador = grupo.elementos[Symbol.iterator]();
for (let elemento of grupo) {
    console.log(elemento);
}
// console.log(iterador.next());
// console.log(iterador.next());
// console.log(iterador.next());

// EJERCICIO 3: ITERADOR

class IteradorGrupo {
    constructor (grupo) {
        this.grupo = grupo,
        this.contador = 0
    }
    next () {
        console.log("Iterador construido")
        if (this.grupo.elementos.length >= 0 && this.contador <= this.grupo.elementos.length) {
            let resultado = {
                value: this.grupo.elementos[this.contador],
                done: false,
            }
            this.contador++;
            return resultado;
        }
        else {
            return {
                value: undefined,
                done: true
            }
        }
    }
}


console.log("\nIterador de la clase");

for (let elemento of grupo) {
    console.log(elemento);
}

// class GeneradorGrupo {
//     constructor (grupo) {
//         this.grupo = grupo
//     }
//     next () {
        
        
//     }
// }

// EJERCICIO 4: MÉTODO PRESTADO

const hasOwnProperty = Symbol("hasOwnProperty");

let map = {
    prop1: 1,
    prop2: 2,
    prop3: 3,
    [hasOwnProperty]: "Símbolo"
}

console.log(map[hasOwnProperty]);
console.log(typeof map[hasOwnProperty]);
console.log(map.hasOwnProperty("prop1"));
console.log(map.hasOwnProperty("prop4"));
console.log(typeof map.hasOwnProperty);

// Solución libro
// let map = {one: true, two: true, hasOwnProperty: true};

// console.log(Object.prototype.hasOwnProperty.call(map, "one"));



