function getSortedArray(array, key) {
    for (let j = 0; j<array.length-1;j++){
        for (let i = 0; i<array.length-1; i++){
            if (array[i][key]>array[i+1][key]){
                [array[i], array[i+1]]=[array[i+1], array[i]];
            }
        }
    }
    return array;
}


// Пример работы функции.
let array = [{name: 'Макар', age: 20}, {name: 'Роберт', age: 32}, {name: 'Екатерина', age: 50}, {name: 'Оксана', age: 24}, {name: 'Святослав', age: 43}];
array = getSortedArray(array, 'age')
console.log(array); // ++ [{name: 'Макар', age: 20}, {name: 'Оксана', age: 24}, {name: 'Роберт', age: 32}, {name: 'Святослав', age: 43}, {name: 'Екатерина', age: 50}];
//array = getSortedArray(array, 'name')
//console.log(array); // +++ [{name: 'Екатерина', age: 50}, {name: 'Макар', age: 20}, {name: 'Оксана', age: 24}, {name: 'Роберт', age: 32}, {name: 'Святослав', age: 43}];