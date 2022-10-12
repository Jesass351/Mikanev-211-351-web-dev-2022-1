let vectorA={
    x:15,
    y:10,
    z:10,
}

let vectorB={
    x:15,
    y:10,
    z:10,
}

function sum(vectorA, vectorB){
    let result = {
        x:vectorA.x+vectorB.x,
        y:vectorA.y+vectorB.y,
        z:vectorA.z+vectorB.z,
    };
    return result;
}

function multy(vectorA, vectorB){
    let result = {
        x:vectorA.x*vectorB.x,
        y:vectorA.y*vectorB.y,
        z:vectorA.z*vectorB.z,
    };
    return result;
}

function diff(vectorA, vectorB){
    let result = {
        x:vectorA.x-vectorB.x,
        y:vectorA.y-vectorB.y,
        z:vectorA.z-vectorB.z,
    };
    return result;
}

function multyK(vectorA, k){
    let result = {
        x:vectorA.x*k,
        y:vectorA.y*k,
        z:vectorA.z*k,
    };
    return result;
}

function length(vector){
    return((vector.x**2+vector.y**2+vector.z**2)**0.5)
}

function scalar(vectorA, vectorB){
    return(vectorA.x*vectorB.x+vectorA.y*vectorB.y+vectorA.z*vectorB.z);
}

console.log(length(vectorA).toFixed(2));
console.log(sum(vectorA, vectorB));
console.log(multy(vectorA, vectorB));
console.log(diff(vectorA, vectorB));
console.log(multyK(vectorA, 5));
console.log(scalar(vectorA, vectorB));