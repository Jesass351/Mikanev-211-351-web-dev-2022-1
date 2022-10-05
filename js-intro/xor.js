function xor(numA, numB){
    return numA != numB ? 1 : 0;
}

let xor2 = (a,b) => (a+b)%2;

console.log(xor(1,0));

console.log(xor2(1,0));

function checkPalindrom (str) {
    return str == str.split('').reverse().join('');
  }

console.log(checkPalindrom('шалаш'));