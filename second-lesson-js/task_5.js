function task_5(array, k){
    let arrayTemp = [];

    for (let j = 0; j < array.length; j++){
        arrayTemp[j] = array[j];
    }
    for (let i = 0; i < array.length; i++){
        array[(i + array.length - (k % array.length)) % array.length] = arrayTemp[i];
    }
    return array;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(task_5(array, 2)); 