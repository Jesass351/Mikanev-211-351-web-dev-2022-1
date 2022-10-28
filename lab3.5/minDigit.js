function minDigit(x) {
    let array = String(x).split('');
    for (let j = array.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
        }
    }
    return array[0];
}

console.log(minDigit(10)); //0
console.log(minDigit(462975694375968)); //2