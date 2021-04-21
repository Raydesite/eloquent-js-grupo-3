/* 1. Un tipo vector */
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  mas(vb) {
    return new Vec(this.x + vb.x, this.y + vb.y);
  }

  menos(vb) {
    return new Vec(this.x - vb.x, this.y - vb.y);
  }

  get longitud() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}
console.log(new Vec(1, 2).mas(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).menos(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).longitud);
// → 5

/* 2. Conjuntos */
class Group {
  constructor() {
    this.conjunto = [];
  }

  add(e) {
    if (!this.conjunto.includes(e)) this.conjunto.push(e);
  }

  delete(e) {
    let index = this.conjunto.indexOf(e);
    if (index >= 0) this.conjunto.splice(index, 1);
  }

  has(e) {
    return this.conjunto.includes(e);
  }

  static from(iter) {
    let conjunto = new Group();
    for (let e of iter) {
      conjunto.add(e);
    }
    return conjunto;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

/* 3. Conjuntos Iterables */
// Al código del ejercicio 2, añadir lo siguiente:
class GroupIterator {
  constructor(conjunto) {
    this.index = 0;
    this.conjunto = conjunto;
  }

  next() {
    if (this.index == this.conjunto.conjunto.length) return { done: true };
    let value = this.conjunto.conjunto[this.index];
    this.index++;
    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

/* 4. Tomando un método prestado */
let map = { one: true, two: true, hasOwnProperty: true };

const hasOwnPropertySymbol = Symbol("hasOwnProperty");
map[hasOwnPropertySymbol] = Object.prototype.hasOwnProperty;

console.log(map[hasOwnPropertySymbol]("one"));
// → true
