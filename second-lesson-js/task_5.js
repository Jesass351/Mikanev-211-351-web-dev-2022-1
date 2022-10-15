function task_5(array, k){
    let arrayTemp = [];

    for (let i in array){
        arrayTemp[i] = array[i];
    }
    
    for (let i = 0; i < array.length; i++){
        array[(i + array.length - (k % array.length)) % array.length] = arrayTemp[i];
    }
    return array;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(task_5(array, 4)); //+