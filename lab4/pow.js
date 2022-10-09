function pow(x,n){
    let result = 1;
    if (n>=0){
        for (let i = 0; i<n; i++){
            result*=x;
        }
        return result;
    } else 
    {return "Зачем так?..."};
}

console.log(pow(2,2));
console.log(pow(10,2));
console.log(pow(100,0));