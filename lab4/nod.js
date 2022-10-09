function gcd(a, b) {
    if (!b) {
      return a;
    }
    else{
        return gcd(b, a % b);
    }
}

console.log(gcd(100,50)); //50
console.log(gcd(1,100)) //1