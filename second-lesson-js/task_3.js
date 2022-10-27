function task_3(matrix) {
    let tempResult = [];
    for (let i = 0; i < matrix.length; i++) {
        tempResult.push(Math.min(...matrix[i]));
    }
    return Math.max(...tempResult);
}


let matr = [
    [2, 3, 4],
    [4, 3, 4],
    [4, 10, 4],
    [4, 1, 4],
    [93, 5, 4],
];

console.log(task_3(matr));
console.log(task_3([
    [2, 3, 4], //2
    [4, 3, 4], //3
]));

