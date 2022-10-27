function task_2(array) {
    let result = [];
    for (let i in array) {
        let flag = false;
        for (let j = 0; j < result.length; j++) {
            if (result[j].value == array[i]) {
                result[j].count += 1;
                flag = true;
            }
        }
        if (!flag) {
            let numbers = {
                value: array[i],
                count: 1,
            };
            result.push(numbers);
        }
    }
    for (let i in result) {
        if (result[i].count == 1) {
            result.splice(i, 1);
        }
    }
    return result;
}

let array = [1, 1, 2, 2, 3, 99, 4, 4, 5, 1, 99, 99, 99]; //+
console.log(task_2(array));