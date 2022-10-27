function Vector(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.sum = function(other){
        return new Vector(this.x + other.x,this.y + other.y,this.z + other.z );
    }

    this.mult = function(other){
        return new Vector(this.x * other.x,this.y * other.y,this.z * other.z );
    }

    this.sub = function(other){
        return new Vector(this.x - other.x,this.y - other.y,this.z - other.z );
    }

    this.multScalar = function(skalar){
        return new Vector(this.x * skalar,this.y * scalar.y,this.z * scalar);
    }

    this.norm = function(){
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    this.dotProduct = function(other){
        return (this.x * other.x + this.y * other.y + this.z * other.z);
    }

}

let v1 = new Vector(1,2,3);
let v2 = new Vector(4,5,6);

console.log(v.sum(v2));

// let vectorA={
//     x:15,
//     y:10,
//     z:10,
// }

// let vectorB={
//     x:15,
//     y:10,
//     z:10,
// }

// function sum(vectorA, vectorB){
//     let result = {
//         x:vectorA.x+vectorB.x,
//         y:vectorA.y+vectorB.y,
//         z:vectorA.z+vectorB.z,
//     };
//     return result;
// }

// function multy(vectorA, vectorB){
//     let result = {
//         x:vectorA.x*vectorB.x,
//         y:vectorA.y*vectorB.y,
//         z:vectorA.z*vectorB.z,
//     };
//     return result;
// }

// function diff(vectorA, vectorB){
//     let result = {
//         x:vectorA.x-vectorB.x,
//         y:vectorA.y-vectorB.y,
//         z:vectorA.z-vectorB.z,
//     };
//     return result;
// }

// function multyK(vectorA, k){
//     let result = {
//         x:vectorA.x*k,
//         y:vectorA.y*k,
//         z:vectorA.z*k,
//     };
//     return result;
// }

// function length(vector){
//     return ((vector.x**2+vector.y**2+vector.z**2)**0.5).toFixed(3);
// }

// function scalar(vectorA, vectorB){
//     return(vectorA.x*vectorB.x+vectorA.y*vectorB.y+vectorA.z*vectorB.z);
// }


// console.log(sum(vectorA, vectorB)); //+
// console.log(multy(vectorA, vectorB)); //+
// console.log(diff(vectorA, vectorB)); //+
// console.log(multyK(vectorA, 5)); //+
// console.log(length(vectorA)); //+
// console.log(scalar(vectorA, vectorB)); //+