/* Ciclo de un triángulo */
for (let i = 1; i <= 7; i++) {
  console.log('#'.repeat(i));
}

/* FizzBuzz */
for (let i = 1; i <= 100; i++) {
  let str = '';

  if (i % 3 === 0) str += 'Fizz';

  if (i % 5 === 0) str += 'Buzz';

  console.log(str || i);
}

/* Tablero de ajedrez */
let cadena = '';

for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 8; j++) {
    if (i % 2 !== 0) {
      cadena += '# ';
    } else {
      cadena += ' #';
    }
  }
  cadena += '\n';
}

console.log(cadena);
