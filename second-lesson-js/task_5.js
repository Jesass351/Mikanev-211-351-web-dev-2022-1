function task_5(array, k) {
    let arrayTemp = [];
    
    for (let i = 0; i < array.length; i++) {
        arrayTemp.push(array[(i + k) % array.length]);
    }
    return arrayTemp;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(task_5(array, 4)); //+