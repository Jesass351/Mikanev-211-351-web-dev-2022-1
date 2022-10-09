function minDigit(x){
    return Math.min.apply(Math,(Array.from(String(x), Number)));
}

console.log(minDigit(10)); //0
console.log(minDigit(462975694375968)); //2