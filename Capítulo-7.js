const caminos = [
  "Casa de Alicia-Casa de Bob",
  "Casa de Alicia-Cabaña",
  "Casa de Alicia-Oficina de Correos",
  "Casa de Bob-Ayuntamiento",
  "Casa de Daria-Casa de Ernie",
  "Casa de Daria-Ayuntamiento",
  "Casa de Ernie-Casa de Grete",
  "Casa de Grete-Granja",
  "Casa de Grete-Tienda",
  "Mercado-Granja",
  "Mercado-Oficina de Correos",
  "Mercado-Tienda",
  "Mercado-Ayuntamiento",
  "Tienda-Ayuntamiento",
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

function correrRobot(estado, robot, memoria) {
  let turno;
  for (turno = 0; turno <= 60; turno++) {
    if (estado.paquetes.length == 0) {
      console.log(`Listo en ${turno} turnos`);
      break;
    }
    let accion = robot(estado, memoria); // Recibe el siguiente movimiento del robot
    estado = estado.mover(accion.direccion);
    memoria = accion.memoria;
    //console.log(`Moverse a ${accion.direccion} en turno ${turno}`);
  }
  return turno;
}

function eleccionAleatoria(array) {
  let eleccion = Math.floor(Math.random() * array.length);
  return array[eleccion];
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
  return new EstadoPueblo("Oficina de Correos", paquetes);
};

/* ROBOT ALEATORIO */
function robotAleatorio(estado) {
  // Escoge aleatoriamente a partir de la lista de lugares a los
  // que podemos ir a partir del lugar actual (que se encuentra en el estado)
  return { direccion: eleccionAleatoria(grafoCamino[estado.lugar]) };
}

// correrRobot(EstadoPueblo.aleatorio(), robotAleatorio);
// → Moverse a Mercado
// → Moverse a Ayuntamiento
// →…
// → Listo en 50 turnos

/* ROBOT RUTA */
const rutaCorreo = [
  "Casa de Alicia",
  "Cabaña",
  "Casa de Alicia",
  "Casa de Bob",
  "Ayuntamiento",
  "Casa de Daria",
  "Casa de Ernie",
  "Casa de Grete",
  "Tienda",
  "Casa de Grete",
  "Granja",
  "Mercado",
  "Oficina de Correos",
];

function robotRuta(estado, memoria) {
  if (memoria.length == 0) {
    memoria = rutaCorreo;
  }
  return { direccion: memoria[0], memoria: memoria.slice(1) };
}

// correrRobot(EstadoPueblo.aleatorio(), robotRuta, []);

/* ROBOT RUTA GENERADA - ORIENTADO A METAS */

function encontrarRuta(grafo, desde, hasta) {
  // Almacena la lista de lugares que debemos visitar
  // Cada elemento tiene:
  //  - donde: lugar en el que nos encontramos en nuestra búsqueda
  //  - ruta: lista de lugares que hemos visitado para llegar a "donde"
  let trabajo = [{ donde: desde, ruta: [] }];
  for (let i = 0; i < trabajo.length; i++) {
    let { donde, ruta } = trabajo[i];
    for (let lugar of grafo[donde]) {
      // Ya encontramos la ruta y anexamos el lugar actual a
      // la ruta para llegar ahí
      if (lugar == hasta) return ruta.concat(lugar);
      // Si no hemos recorrido ya ese lugar, entonces es un
      // siguiente lugar por visitar
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

// correrRobot(EstadoPueblo.aleatorio(), robotOrientadoAMetas, []);

/*****************************************
	1. MIDIENDO UN ROBOT
*****************************************/
let compararRobots = (robot1, memoria1, robot2, memoria2) => {
  const NUM_TAREAS = 100;
  let turnosRobot1 = 0;
  let turnosRobot2 = 0;
  for (let i = 0; i < NUM_TAREAS; i++) {
    let tareas = EstadoPueblo.aleatorio();
    turnosRobot1 += correrRobot(tareas, robot1, memoria1);
    turnosRobot2 += correrRobot(tareas, robot2, memoria2);
  }
  console.log(
    `En promedio, al robot ${robot1.name} le tomó ${
      turnosRobot1 / NUM_TAREAS
    } pasos por tarea`
  );
  console.log(
    `En promedio, al robot ${robot2.name} le tomó ${
      turnosRobot2 / NUM_TAREAS
    } pasos por tarea`
  );
};

// compararRobots(robotOrientadoAMetas, [], robotRuta, [])
//-> En promedio, al robot robotOrientadoAMetas le tomó 14.29 pasos por tarea
//-> En promedio, al robot robotRuta le tomó 18.05 pasos por tarea

/*****************************************
	2. EFICIENCIA DEL ROBOT
*****************************************/
function robotMejoradoSegunYo({ lugar, paquetes }, ruta) {
  if (ruta.length == 0) {
    let rutas = []; // Almacena todas las posibles rutas
    paquetes.forEach((paquete) => {
      if (paquete.lugar != lugar) {
        rutas.push(encontrarRuta(grafoCamino, lugar, paquete.lugar));
      } else {
        rutas.push(encontrarRuta(grafoCamino, lugar, paquete.direccion));
      }
    });
    // Ordena las rutas obtenidas por cantidad de pasos a dar
    // yendo primero a recoger (o entregar) el paquete más cercano
    ruta = rutas.sort((a, b) => (a.length > b.length ? 1 : -1))[0];
  }
  return { direccion: ruta[0], memoria: ruta.slice(1) };
}
compararRobots(robotOrientadoAMetas, [], robotMejoradoSegunYo, []);
//-> En promedio, al robot robotOrientadoAMetas le tomó 14.77 pasos por tarea
//-> En promedio, al robot robotMejoradoSegunYo le tomó 12.32 pasos por tarea

/*****************************************
	3. CONJUNTO PERSISTENTE
*****************************************/
class PGroup {
  constructor(arr = []) {
    this.conjunto = arr;
  }

  add(x) {
    if (!this.conjunto.includes(x))
      return new PGroup(this.conjunto.concat([x]));
    return this;
  }

  delete(x) {
    let index = this.conjunto.indexOf(x);
    if (index >= 0) return new PGroup(this.conjunto.filter((e) => e != x));
    return this;
  }

  has(x) {
    return this.conjunto.includes(x);
  }

  static empty = new PGroup();
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
