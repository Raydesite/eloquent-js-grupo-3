/* Looping a triangle */
for(let i=0; i<7; i++){
    let linea = '#';
    for(let j=0; j<i; j++){
        linea+="#";
    }
    console.log(linea);
}

/* FizzBuzz */
for(let i = 1; i<=100; i++){
    let mess = "";
    if(i%3==0){
        mess+="Fizz";
    }
    if (i%5==0){
        mess+="Buzz";
    }
    mess?console.log(mess):console.log(i)
}

/* Tablero de ajedrez */

let tablero = "";
let tamanio = 8;
for(let i=0; i<tamanio; i++){
    for(let j=0; j<tamanio; j++){
        if((i+j)%2==0){
            tablero += " ";
        }else{
            tablero += "#";
        }
    }
    tablero+="\n";
}
console.log(tablero);
