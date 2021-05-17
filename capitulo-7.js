// Ejercicios Capítulo 7 Eloquent JavaScript
// Diana Chacón Ocariz

const caminos = [
	"Casa de Alicia-Casa de Bob", "Casa de Alicia-Cabaña",
	"Casa de Alicia-Oficina de Correos", "Casa de Bob-Ayuntamiento",
	"Casa de Daria-Casa de Ernie", "Casa de Daria-Ayuntamiento",
	"Casa de Ernie-Casa de Grete", "Casa de Grete-Granja",
	"Casa de Grete-Tienda", "Mercado-Granja",
	"Mercado-Oficina de Correos", "Mercado-Tienda",
	"Mercado-Ayuntamiento", "Tienda-Ayuntamiento"
];

function construirGrafo(bordes) {
    let grafo = Object.create(null);
    function añadirBorde(desde, hasta) {
      if (grafo[desde] == null) {
        grafo[desde] = [hasta];
      } else {
        grafo[desde].push(hasta);
      }
    }
    for (let [desde, hasta] of bordes.map((c) => c.split("-"))) {
      añadirBorde(desde, hasta);
      añadirBorde(hasta, desde);
    }
    return grafo;
  }

  // grafoCamino es un objeto donde las claves son los nodos (lugares)
  // y el valor un arreglo de los nodos adyacentes
  const grafoCamino = construirGrafo(caminos);

  class EstadoPueblo {
    constructor(lugar, paquetes) {
      this.lugar = lugar; // En donde se encuentra el robot
      this.paquetes = paquetes; // La lista de paquetes a entregar
    }
    mover(destino) {
      if (!grafoCamino[this.lugar].includes(destino)) {
        return this;
      } else {
        let paquetes = this.paquetes
          .map((p) => {
            if (p.lugar != this.lugar) return p;
            return { lugar: destino, direccion: p.direccion };
          })
          .filter((p) => p.lugar != p.direccion);
        return new EstadoPueblo(destino, paquetes);
      }
    }
  }

// let primero = new EstadoPueblo(
// 	"Oficina de Correos",
// 	[{lugar: "Oficina de Correos", direccion: "Casa de Alicia"}]
// );
// let siguiente = primero.mover("Casa de Alicia");
// console.log(siguiente.lugar);
// // → Casa de Alicia
// console.log(siguiente.paquetes);
// // → []
// console.log(primero.lugar);
// // → Oficina de Correos
// console.log(primero.paquetes)
// // → [{lugar: "Oficina de Correos", direccion: "Casa de Alicia"}]

function correrRobot(estado, robot, memoria) {
  // Se modificó para no imprimir los movimientos
  // y devolver el total de turnos
    for (let turno = 0; ; turno++) {
      if (estado.paquetes.length == 0) {
        // console.log(`Listo en ${turno} turnos`);
        return turno;
        // break;
      }
      let accion = robot(estado, memoria); 
      estado = estado.mover(accion.direccion);
      memoria = accion.memoria;     
      // console.log(`Moverse a ${accion.direccion}`);
    }
  }

function eleccionAleatoria(array) {
	let eleccion = Math.floor(Math.random() * array.length);
	return array[eleccion];
}

function robotAleatorio(estado) {
	// Escoge aleatoriamente a partir de la lista de lugares a los
	// que podemos ir a partir del lugar actual (que se encuentra en el estado)
	return {direccion: eleccionAleatoria(grafoCamino[estado.lugar])};
}

EstadoPueblo.aleatorio = function (numeroDePaquetes = 5) {
    let paquetes = [];
    for (let i = 0; i < numeroDePaquetes; i++) {
      let direccion = eleccionAleatoria(Object.keys(grafoCamino));
      let lugar;
      do {
        lugar = eleccionAleatoria(Object.keys(grafoCamino));
      } while (lugar == direccion);
      paquetes.push({ lugar, direccion });
    }
    let estadoNuevo = new EstadoPueblo("Oficina de Correos", paquetes);
    return estadoNuevo;
};

// correrRobot(EstadoPueblo.aleatorio(), robotAleatorio);
// → Moverse a Mercado
// → Moverse a Ayuntamiento
// →…
// → Listo en 50 turnos

const rutaCorreo = [
	"Casa de Alicia", "Cabaña", "Casa de Alicia", "Casa de Bob",
	"Ayuntamiento", "Casa de Daria", "Casa de Ernie",
	"Casa de Grete", "Tienda", "Casa de Grete", "Granja",
	"Mercado", "Oficina de Correos"
];

function robotRuta(estado, memoria) {
	if (memoria.length == 0) {
		memoria = rutaCorreo;
	}
	return {direccion: memoria[0], memoria: memoria.slice(1)};
}

function encontrarRuta(grafo, desde, hasta) {
  let trabajo = [{ donde: desde, ruta: [] }];
  for (let i = 0; i < trabajo.length; i++) {
    let { donde, ruta } = trabajo[i];
    for (let lugar of grafo[donde]) {
      if (lugar == hasta) return ruta.concat(lugar);
      if (!trabajo.some((w) => w.donde == lugar)) {
        trabajo.push({ donde: lugar, ruta: ruta.concat(lugar) });
      }
    }
  }
}

function robotOrientadoAMetas({ lugar, paquetes }, ruta) { 

  if (ruta.length == 0) { 
    let paquete = paquetes[0];
    if (paquete.lugar != lugar) { 
      ruta = encontrarRuta(grafoCamino, lugar, paquete.lugar); 
    } else { 
      ruta = encontrarRuta(grafoCamino, lugar, paquete.direccion); 
    } 
  } 
  return { direccion: ruta[0], memoria: ruta.slice(1) };
}

// EJERCICIO 1: COMPARAR ROBOTS
function compararRobot(numTareas, robot1, robot2) {
  let turnos1 = 0;
  let turnos2 = 0;
  for (i=0; i < numTareas; i++) {
    // Una tarea consiste en entregar 5 paquetes
    // Se asigna la misma tarea a los 2 robots
    let estado = EstadoPueblo.aleatorio();

    turnos1 += correrRobot(estado, robot1, []);
    turnos2 += correrRobot(estado, robot2, []);
  }

  console.log("\nPromedio de turnos por robot:");
  console.log(`Robot 1: ${turnos1/numTareas} turnos`);
  console.log(`Robot 2: ${turnos2/numTareas} turnos`);
}
// console.log("\ncompararRobot robotRuta y robotOrientadoAMetas");
// compararRobot(100,robotRuta,robotOrientadoAMetas);


// EJERCICIO 2: ROBOT OPTIMIZADO

// Devuelve el puntaje de una ruta en función del estado del robot.
// A cada nodo de la ruta se le asigna un puntaje dependiendo si envía y/o recibe
// paquetes. Por cada paquete que envía, se le suman 5 puntos.
// Por cada paquete que recibe, se le suma 1 punto.
function calcularPuntaje({ lugar, paquetes }, ruta) {
  let puntaje = 0; 
  for (nodo of ruta) {
    puntaje += paquetes.filter((item) => (item.lugar == nodo)).length * 5;
    puntaje += paquetes.filter((item) => (item.direccion == nodo)).length;
  }
  return puntaje;
}

// Apartir de un estado, busca la ruta más óptima
// La ruta más óptima es aquella que pasa en prioridad por los lugares
// donde hay que recoger y/o entregar más paquetes, o sea
// la ruta con mayor puntaje
function robotMejorado({ lugar, paquetes }, ruta) {
  if (ruta.length == 0) { 
    rutas = paquetes.map((paquete) => {
      let obj = {};
      if (paquete.lugar != lugar) {
        obj.rutaInter = encontrarRuta(grafoCamino, lugar, paquete.lugar);
        obj.puntaje = 0;
      }
      else {
        obj.rutaInter = encontrarRuta(grafoCamino, lugar, paquete.direccion);
        obj.puntaje = 0; 
      }
      return obj;
    });
    for (camino of rutas) {
      camino.puntaje = calcularPuntaje({ lugar, paquetes }, camino.rutaInter);
    }
    let mejorRuta = rutas.sort((a, b) => (a.puntaje <= b.puntaje ? 1 : -1))[0];
    return { direccion: mejorRuta.rutaInter[0], memoria: mejorRuta.rutaInter.slice(1) };
  };

  return { direccion: ruta[0], memoria: ruta.slice(1) };
}

console.log("\ncompararRobot robotMejorado y robotOrientadoAMetas");
compararRobot(100,robotMejorado,robotOrientadoAMetas);

// EJERCICIO 3: CONJUNTO PERSISTENTE
// Cada vez que se añade o elimina un elemento
// se crea una nueva instancia de ConjuntoP
class ConjuntoP {
  constructor (elemento) {
    this.elementos = elemento;
  }

  agregar (elemento) {
    let result = new ConjuntoP([]);
    if (this.elementos.length != 0 ) {
      let arr = new Set(this.elementos);
      result.elementos = [...arr];
    }
    if (! this.tiene(elemento)) {
      result.elementos.push(elemento);
    }
    return result;
  }

  borrar (elemento) {
    if (this.tiene(elemento)) {
      let result = new ConjuntoP([]);
      let indice = this.elementos.indexOf(elemento);
      if (indice != -1) {
        result.elementos = this.elementos.slice(0, indice).concat(this.elementos.slice(indice+1));
        return result;
      }
    }
  }

  tiene (elemento) {
      return this.elementos.includes(elemento);
  }
}

// console.log("\nConjunto persistente");
// ConjuntoP.vacio = new ConjuntoP([]);
// let a = ConjuntoP.vacio.agregar("a");
// let ab = a.agregar("b");
// let abc = ab.agregar("c");
// let ab2c = abc.agregar("c");
// let sinb = abc.borrar("b");
// console.log(a);
// console.log(ab);
// console.log(abc);
// console.log(ab2c);
// console.log(sinb);
// console.log(abc.tiene("b"));
// console.log(sinb.tiene("b"));

