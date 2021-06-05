const clients = [
  { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS' },
  { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ' },
  { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA' },
  { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ' },
  { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS' },
  { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' },
];

const accounts = [
  { clientId: 6, bankId: 1, balance: 15000 },
  { clientId: 1, bankId: 3, balance: 18000 },
  { clientId: 5, bankId: 3, balance: 135000 },
  { clientId: 2, bankId: 2, balance: 5600 },
  { clientId: 3, bankId: 1, balance: 23000 },
  { clientId: 5, bankId: 2, balance: 15000 },
  { clientId: 3, bankId: 3, balance: 45900 },
  { clientId: 2, bankId: 3, balance: 19000 },
  { clientId: 4, bankId: 3, balance: 51000 },
  { clientId: 5, bankId: 1, balance: 89000 },
  { clientId: 1, bankId: 2, balance: 1600 },
  { clientId: 5, bankId: 3, balance: 37500 },
  { clientId: 6, bankId: 1, balance: 19200 },
  { clientId: 2, bankId: 3, balance: 10000 },
  { clientId: 3, bankId: 2, balance: 5400 },
  { clientId: 3, bankId: 1, balance: 9000 },
  { clientId: 4, bankId: 3, balance: 13500 },
  { clientId: 2, bankId: 1, balance: 38200 },
  { clientId: 5, bankId: 2, balance: 17000 },
  { clientId: 1, bankId: 3, balance: 1000 },
  { clientId: 5, bankId: 2, balance: 600 },
  { clientId: 6, bankId: 1, balance: 16200 },
  { clientId: 2, bankId: 2, balance: 10000 },
];

const banks = [
  { id: 1, name: 'SANTANDER' },
  { id: 2, name: 'CHILE' },
  { id: 3, name: 'ESTADO' },
];

// Funciones generales

// Devuelve un arreglo de objetos formado por un id (de banks o clients)
// y un arreglo de valores. Se puede aplicar un filtro para determinar
// qué clientes o bancos tomar en cuenta
function idArreglo (ac, id, arr, filtro) {
  let result = [];
  let aux = [];

  if (filtro) {
    aux = ac.filter(filtro)
  }
  else {
    aux = ac;
  }

  aux.forEach(element => {
    if (! result.some(item => item.id == element[id])) {
      let obj = {
        id: null,
        valores: []
      }
      obj.id = element[id]; 
      obj.valores.push(element[arr]);
      result.push(obj);
    }
    else {
      let i = result.findIndex(item => item.id === element[id]);
      result[i].valores.push(element[arr]);
    }
  })

  return result.map(function(item) {
    let arr = new Set(item.valores);
    item.valores = [...arr];
    return item;
  });

}

// Calcula el total de un arreglo de valores
function totalArreglo(arr){
  arr.forEach(element => {
    let total = element.valores.reduce((a,b) => a + b);
    element.valores = total;
  });
  return arr;
}

// A partir de un arreglo de objetos {id: valor, valores: valor}
// devuelve una nuevo arreglo de objetos {name: valor, totalBalance: valor}
// según orden descendiente o ascendiente del balance
function nameBalance (entity, arrBal, orderDesc = true) {
  let result = [];

  entity.forEach(element => {
    let obj = {
      id: element.id,
      name: element.name,
      totalBalance: 0
    }
    let i = arrBal.findIndex(item => item.id === element.id);
    if (i != -1) {
      obj.totalBalance = arrBal[i].valores;
      result.push(obj);
    } 
  })

  if (orderDesc) {
    return result.sort((a, b) => (b.totalBalance - a.totalBalance));
  }
  else {
    return result.sort((a, b) => (a.totalBalance - b.totalBalance));
  }
}

// Devuelve un objeto con las claves = Nombre de los bancos
// y valor = arreglo con los id de sus clientes
function objNameValue(entity, arr, keyPadre, keyHijo) {
  let obj = {};

  entity.forEach((element) => {
    let arrAcc = arr.filter(arrItem => arrItem[keyPadre] === element.id).map(item => item[keyHijo]);
    let arrCl = new Set(arrAcc);

    obj[element.name] = [...arrCl];
  });

  return obj;
}


// 1. arr con los ids de los clientes
let idClients1 = clients.map((client) => client.id);
console.log("\n 1. Arreglo con el id de los clientes");
console.log(idClients1);


// 2. arr con los id de los clientes ordenados por rut
let idClients2 = clients.sort((a, b) => 
(a.taxNumber <= b.taxNumber ? -1 : 1)).map((client) => client.id);
console.log("\n 2. Arreglo con el id de los clientes ordenados por RUT");
console.log(idClients2);


// 3. arr con los nombres de los clientes de mayor a menor 
// por la suma total de los balances de cada cliente en los bancos 
// que participa.
let totalBalanceCls = idArreglo(accounts, "clientId", "balance");
console.log("\n 3. Arreglo con los clientes y el balance total");
console.log(nameBalance(clients, totalArreglo(totalBalanceCls)));


// 4. obj en los que las claves sean los nombres de los bancos 
// y los valores un arr con ruts de sus clientes ordenados 
// alfabeticamente por nombre.

function objBanksRUTs(objBk, cl) {

  let obj = objBk;

  // Creamos un arreglo con los id y RUT ordenados por nombre 
  // del cliente
  let RUTClients = cl.sort((a, b) => 
    (a.name <= b.name ? -1 : 1)).map((client) => {
      let obj = {
        id: client.id, 
        rut: client.taxNumber
      }
      return obj;
    });

  for (let clave of Object.keys(obj)) {
    let arrAux = obj[clave];
    let arrRUT = [];
    
    RUTClients.forEach((client) => {
      if (arrAux.includes(client.id)) {
        arrRUT.push(client.rut);
      }
    })
    obj[clave] = arrRUT;    
  }
  return objBk;
}

let objBankClients = objNameValue(banks, accounts, "bankId", "clientId");
console.log("\n 4. Objeto con los bancos y los RUTs de sus clientes");
console.log(objBanksRUTs(objBankClients, clients));


// 5. arr ordenado decrecientemente con los balances de los clientes 
// que tengan mas de 25.000 en el banco santander.

// Solo clientes del Santander con el balance total en ese banco
let totalClsSantander = idArreglo(accounts, "clientId", "balance", (ac) => (ac.bankId === 1));
let clsSantander = totalArreglo(totalClsSantander).filter((item) => (item.valores >= 25000)).sort((a, b) => 
(a.valores <= b.valores ? 1 : -1));

// Nombres de los clientes con su saldo ordenado decrecientemente
console.log("\n 5. Arreglo clientes del Santander con saldon >= 25000");
console.log(nameBalance(clients, clsSantander));


// 6. arr con los ids de los bancos ordenados crecientemente por 
// la cantidad total de dinero que administran.
let totalBanks = idArreglo(accounts, "bankId", "balance");

// Nombre de los bancos con el total del dinero que manejan
// ordenado crecientemente
console.log("\n 6. Arreglo bancos y total saldo que manejan");
console.log(nameBalance(banks, totalArreglo(totalBanks), false));


// 7. obj en que las claves sean los nombres de los bancos 
// y los valores el numero de clientes que solo tengan 
// cuenta en ese banco.

// Clientes con cuenta en un solo banco
let clOneBank1 = idArreglo(accounts, "clientId", "bankId").filter(item => (item.valores.length == 1));
let clOneBank = clOneBank1.map(item => {
  let obj = {
    id: item.id,
    banco: parseInt(item.valores.toString())
  }
  return obj});

let objBkExclusiveCl = objNameValue(banks, clOneBank, "banco", "id");

for (let clave of Object.keys(objBkExclusiveCl)) {
  objBkExclusiveCl[clave] = objBkExclusiveCl[clave].length;
}

console.log("\n 7. Bancos y número de clientes con cuenta sólo en ese banco");
console.log(objBkExclusiveCl);


// 8. obj en que las claves sean los nombres de los bancos y 
// los valores el id de su cliente con menos dinero.
function minBalance(obj) {
  let id = 1;
  for (let clave of Object.keys(obj)) {
    let arr = obj[clave].map(item => {
      let clBalance = idArreglo(accounts, "clientId", "balance", (ac) => (ac.bankId === id && ac.clientId === item));
      return totalArreglo(clBalance)[0];
      });

    let clMin = nameBalance(clients, arr, false);

    obj[clave] = clMin[0].id;
    id++;
  }
  return obj;
}

console.log("\n 8. Bancos con el id del cliente con menor saldo");
let clsBank = objNameValue(banks, accounts, "bankId", "clientId");
console.log(minBalance(clsBank));

// 9. Agregar un  nuevo cliente con datos ficticios a clientes 
// y agregar una cuenta en el banco estado con un balance 
// de 9000 para este nuevo cliente, luego devolver el lugar 
// que ocupa este cliente en el ranking de la pregunta 3. 
// No modificar los arrs originales para no alterar las 
// respuestas anteriores al correr la solución

let clients2 = [...clients];
let accounts2 = [...accounts];

let cl = { id: 7, taxNumber: '12345678', name: 'DIANA CHACON' };
clients2.push(cl);
let ac = { clientId: 7, bankId: 3, balance: 9000 };
accounts2.push(ac);

let totalBalanceCls2 = idArreglo(accounts2, "clientId", "balance");

console.log("\n 9. Arreglo con los clientes y el balance total con nuevo cliente");
console.log(nameBalance(clients2, totalArreglo(totalBalanceCls2)));








