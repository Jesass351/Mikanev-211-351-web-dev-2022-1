function palindrom (str) {
    return str == str.split('').reverse().join('');
  }

console.log(palindrom('ШАЛАШ'));
console.log(palindrom('НЕШАЛАШ'));


function palindrom2(str) {

    for (let i = 0; i < Math.floor(str.length/2); i++ ) {
        if (str[i] != str[str.length - 1 - i]) {
            return false;
        }
    }

    return true;
}

console.log(palindrom2('шалаш'));
console.log(palindrom2('dsdsшалаш'));


