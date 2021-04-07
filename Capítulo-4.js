/* Suma de un Rango */
rango = (inicio=0, fin=0, paso=1)=>{
    if(paso==0) return [inicio];
    if(inicio>fin && paso>0) paso=-paso;
    let a = [];
		if( paso>0 ){
	    for (let i=inicio; i<=fin ; i+=paso){
	        a.push(i);
	    }
		}
		else{
	    for (let i=inicio; i>=fin ; i+=paso){
	        a.push(i);
	    }
		}
    return a;
}

suma = (a)=>{
    let suma = 0;
    for (i of a){
        suma+=i;
    }
    return suma;
}

console.log(suma(rango(1, 10)));
//-> 55
rango(1, 10, 2)
//-> [1, 3, 5, 7, 9]
rango(5, 2, -1)
//-> [5, 4, 3, 2]



/* Revirtiendo un array */
revertirArray = (a)=>{
    let b = [];
    for (let e of a){
        b.unshift(e);
    }
    return b;
}

revertirArrayEnSuLugar = (a)=>{
    let b = [];
    for (let e of a){
        b.unshift(e);
    }
    for(let i = 0; i<b.length; i++){
        a[i]=b[i]   
    }
    return b;
}

/* Una lista */
arrayALista = (a)=>{
    let li = null;
    for(let i=a.length-1; i>=0; i--){
        li = {
            valor: a[i],
            rest: li
        }
    }
    return li;
}

listaAArray = (li)=>{
    let a = []
    while(li){
        a.push(li.valor);
        li=li.rest
    }
    return a;
}

// Agrega un elemento al inicio de la lista
preceder = (e, li) => {
    return  {
                valor: e,
                rest: li
            };
}

// Devuelve el valor que se encuentra en 
// la posición i de la lista li
posicion = (li, i)=>{
    if(li){
        if(i==0) return li.valor
        return posicion(li.rest, i-1)
    }
}

/* Comparación profunda */
igualdadProfunda = function(a, b){
    if(a===b)
        return true;
    if(a && b && typeof(a)=="object" && typeof(b)=="object"){
        let iguales = true;
        let props = Object.keys(a);
        for ( p of props){
            iguales = iguales && igualdadProfunda(a[p], b[p])
        }
        return iguales;
    }
    return false;
}
