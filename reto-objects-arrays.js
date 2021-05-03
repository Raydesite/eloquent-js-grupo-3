const clients = [
  { id: 1, taxNumber: "86620855", name: "HECTOR ACUÑA BOLAÑOS" },
  { id: 2, taxNumber: "7317855K", name: "JESUS RODRIGUEZ ALVAREZ" },
  { id: 3, taxNumber: "73826497", name: "ANDRES NADAL MOLINA" },
  { id: 4, taxNumber: "88587715", name: "SALVADOR ARNEDO MANRIQUEZ" },
  { id: 5, taxNumber: "94020190", name: "VICTOR MANUEL ROJAS LUCAS" },
  { id: 6, taxNumber: "99804238", name: "MOHAMED FERRE SAMPER" },
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
  { id: 1, name: "SANTANDER" },
  { id: 2, name: "CHILE" },
  { id: 3, name: "ESTADO" },
];

/*
Realizar las siguientes operaciones

Para la resolución es importante tomar en cuenta las funciones de arreglos: map, filter, reduce, find.
*/

/*
1. Arreglo con los ids de los clientes
*/
console.log(clients.map((c) => c.id));

/*
2. Arreglo con los id de los clientes ordenados por rut
*/
console.log(
  clients.sort((a, b) => (a.taxNumber > b.taxNumber ? 1 : -1)).map((c) => c.id)
);

/*
3. Arreglo con los nombres de los clientes de mayor a menor por la suma total de los saldos 
de cada cliente en los bancos que participa.
*/
let reduce = (accumulator, current) => {
  let id = current.clientId;
  if (accumulator.hasOwnProperty(id)) {
    accumulator[id] += current.balance;
  } else {
    accumulator[id] = current.balance;
  }
  return accumulator;
};
let saldoPorCliente = accounts.reduce(reduce, {});
console.log(
  clients
    .sort((a, b) => (saldoPorCliente[a.id] > saldoPorCliente[b.id] ? -1 : 1))
    .map((c) => c.name)
);

/*
4. Objeto en los que las claves sean los nombres de los bancos y los valores un arreglo 
con ruts de sus clientes ordenados alfabeticamente por nombre.
*/
/** Usando fors **/
let output = {};
let sortedClients = clients.sort((a, b) => (a.name > b.name ? 1 : -1));
for (b of banks) {
  let clientList = [];
  for (c of sortedClients) {
    if (
      accounts.findIndex((a) => c.id == a.clientId && b.id == a.bankId) > -1
    ) {
      clientList.push(c.taxNumber);
    }
  }
  output[b.name] = clientList;
}
console.log(output);

/** Sin usar for **/
let sortedClients = clients.sort((a, b) => (a.name > b.name ? 1 : -1));
let reduce = (accumulator, bank) => {
  accumulator[bank.name] = sortedClients
    .filter(
      (c) =>
        accounts.findIndex((a) => c.id == a.clientId && bank.id == a.bankId) >
        -1
    )
    .map((c) => c.taxNumber);
  return accumulator;
};
console.log(banks.reduce(reduce, {}));

/*
5. Arreglo ordenado decrecientemente con los saldos de los clientes que tengan mas de 25.000 
en el banco santander.
*/
let santanderAccounts = accounts.filter((a) => a.bankId == 1);
let reduce = (accumulator, current) => {
  let id = current.clientId;
  if (accumulator.hasOwnProperty(id)) {
    accumulator[id] += current.balance;
  } else {
    accumulator[id] = current.balance;
  }
  return accumulator;
};
let saldos = santanderAccounts
  .reduce(reduce, [])
  .filter((s) => s > 25000)
  .sort((a, b) => b - a);
console.log(saldos);

/*
6. Arreglo con los ids de los bancos ordenados crecientemente por la cantidad total 
de dineto que administran.
*/
let reduce = (accumulator, { bankId, balance }) => {
  let item = accumulator.find((a) => a.bankId == bankId);
  if (!item) {
    accumulator.push({ bankId, balance });
  } else {
    item.balance += balance;
  }
  return accumulator;
};
let balances = accounts.reduce(reduce, []);
console.log(
  balances.sort((a, b) => a.balance - b.balance).map((item) => item.bankId)
);

/*
7. Objeto en que las claves sean los nombres de los bancos y los valores el numero de 
clientes que solo tengan cuenta en ese banco.
*/
let auxiliar = banks.reduce((acc, { id, name }) => {
  acc[id] = { name, exclusiveClients: 0 };
  return acc;
}, []);
for (c of clients) {
  let { bankId } = accounts.find((a) => c.id == a.clientId);
  if (!accounts.find((a) => a.clientId == c.id && a.bankId != bankId)) {
    auxiliar[bankId].exclusiveClients++;
  }
}
let output = auxiliar.reduce((acc, curr) => {
  if (curr) {
    let { name, exclusiveClients } = curr;
    acc[name] = exclusiveClients;
  }
  return acc;
}, {});
console.log(output);

/*
8. Objeto en que las claves sean los nombres de los bancos y los valores el id 
de su cliente con menos dinero.
*/
let balanceByClient = accounts.reduce((acc, { bankId, clientId, balance }) => {
  let item = acc.find((i) => i.bankId == bankId && i.clientId == clientId);
  if (!item) {
    acc.push({ bankId, clientId, balance });
  } else {
    item.balance += balance;
  }
  return acc;
}, []);
let output = {};
for (b of banks) {
  output[b.name] = balanceByClient
    .filter((i) => i.bankId == b.id)
    .sort((a, b) => a.balance - b.balance)[0].clientId;
}
console.log(output);

/*
9. Agregar un  nuevo cliente con datos ficticios a clientes y agregar una cuenta 
en el banco estado con un saldo de 9000 para este nuevo cliente, luego devolver el 
lugar que ocupa este cliente en el ranking de la pregunta 3. No modificar los arreglos 
originales para no alterar las respuestas anteriores al correr la solución
*/
const newClients = [
  ...clients,
  { id: 7, taxNumber: "91238ABC", name: "DUMMY CLIENT" },
];
const newAccounts = [...accounts, { clientId: 7, bankId: 3, balance: 9000 }];

let reduce = (accumulator, current) => {
  let id = current.clientId;
  if (accumulator.hasOwnProperty(id)) {
    accumulator[id] += current.balance;
  } else {
    accumulator[id] = current.balance;
  }
  return accumulator;
};
let saldoPorCliente = newAccounts.reduce(reduce, {});
console.log(
  newClients
    .sort((a, b) => (saldoPorCliente[a.id] > saldoPorCliente[b.id] ? -1 : 1))
    .map((c) => c.name)
);
