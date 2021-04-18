/**************************
 * Start of Sum of a Range *
***************************/
const range = (start = 0, end = 0) => {
    let arr = [];
    arr[0] = start
    for (let i = 1; i < end; i++) {
        arr[i] = arr[i - 1] + 1;
    }

    return arr;
}

const sum = (arr = []) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}

const range2 = (start = 0, end = 0, step = 1) => {
    let arr = [];
    arr[0] = start;
    let condition = (step < 0) ? start : end;

    for (let i = 1; i < condition; i++) {
        arr[i] = arr[i - 1] + step;
    }

    return arr;
}


/**************************
 * End of Sum of a Range *
***************************/




/**************************
 * Start of List problem *
***************************/

class node {
    constructor(value = 0, next = null) {
        this.value = value;
        this.next = next;
    }
}

const arrayToList = (arr = []) => {
    let list = null;
    for (let i = arr.length - 1; i >= 0; i--) {
        list = new node(arr[i], list);
    }
    return list;
}

const listToArray = function (head = new node()) {
    let arr = [];
    while (head !== null) {
        arr.push(head.value);
        head = head.next;
    }
    return arr;
}

const prepend = function (list = new node(), value = 0) {
    let head = list;
    while (head.next != null) {

        head = head.next;
    }

    head.next = new node(value, null);
    return list;
}

const ntn = function (list = new node(), index = 0) {
    let head = list;
    for (let i = 0; i < index; i++) {
        if (head.next === null) {
            return -1
        }
        head = head.next;
    }
    return head.value
}

/*******************
 * End of List problem *
*******************/


// var x = arrayToList([1, 2, 3, 4, 5])
// const y = prepend(x, 6);
// console.log(x)
// const arr = listToArray(y);
// const val = ntn(y, 5)
// //console.log(arr)
let x = { key1: "1", key2: { key3: "2", key4: "4" } };
let y = { ...x };
console.log(y);
//{ key1: '1', key2: { key3: '2', key4: '4' } }