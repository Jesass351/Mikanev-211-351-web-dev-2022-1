function fibb(n){
    let result = []; 
    result[0] = 0;
    result[1] = 1;  
    for(let i = 2; i < n+1; i++) {
        result.push(result[i-1] + result[i-2]); 
    }
    return result;
}

console.log(fibb(5));
console.log(fibb(100));