function bubbleSort(array) {
    for (let j = array.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
        }
    }
    return array;
}


console.log(bubbleSort([4, 1, 2])); //+
console.log(bubbleSort([5, -10, 32, 3, 5, 2, 4, 6, 7])); //+
console.log(bubbleSort([5, 2, 3, 5, 7, 1, 2, -93])); //+
