const flatten = (arr = [[]]) => {
    return arr.reduce((a, b) => {
        return a.concat(b);
    }, [])
}

const loop = (start, test, update, body) => {
    for (let value = start; test(value); value = update(value))
        body(value);
}

console.log(loop(3, n => n > 0, n => n - 1, console.log))

function everyloop(array, test) {
    for (let n = 0; n < array.length; n++) {
        if (test(array[n]) === false) return false;
    }
    return true
}

console.log(everyloop([1, 2, 3, 4, 5, 6], n => n > 0));

function every(array, test) {
    return !array.some(n => !test(n));
}

console.log(every([1, 2, 3, 4, 5, 6], n => n > 0));