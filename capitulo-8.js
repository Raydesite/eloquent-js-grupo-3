// Ejercicios Capítulo 8 Eloquent JavaScript
// Diana Chacón Ocariz

// EJERCICIO 1: REINTENTAR

class FalloUnidadMultiplicadora extends Error {}

// Solo multiplicamos cuando un número al azar entre 1 y 100
// es múltiplo de 5, sino, levantamos una excepción
function multiplicacionPrimitiva(a, b) {
  console.log();

  if ((Math.round(Math.random() * 100)) % 5 === 0) {
    return a * b;
  }
  else {
    throw new FalloUnidadMultiplicadora("Error al multiplicar");
  }
}

// Seguimos multiplicando mientras no tengamos un resultado
function multiplicacion(a, b) {
  let seguir = false;
  do {
    try {
      return multiplicacionPrimitiva(a,b);
    }
    catch(e) {
      if (e instanceof FalloUnidadMultiplicadora) seguir = true;
      else throw e;
    }
  } while (seguir);
}

console.log(multiplicacion(4,8));
console.log(multiplicacion({algo: ["a", "b"]}));

// EJERCICIO 2: CAJA BLOQUEADA

const caja = {
  bloqueada: true,
  desbloquear() { this.bloqueada = false; },
  bloquear() { this.bloqueada = true; },
  _contenido: [],
  get contenido() {
    if (this.bloqueada) throw new Error("Bloqueada!");
    return this._contenido;
  }
};
  
function conCajaDesbloqueada(funcion) {
  try {
    caja.desbloquear();
    return funcion();
  }
  catch (e) {
    console.log("Hubo un error");
  }
  finally {
    caja.bloquear();
  }
}

const funcionOK = () => (3 * 8);

const funcionNoOK = () => {throw new Error("Error!!!");}

console.log(conCajaDesbloqueada(funcionOK));
console.log(caja.bloqueada);

console.log(conCajaDesbloqueada(funcionNoOK));
console.log(caja.bloqueada);