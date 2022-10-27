

function cesar(str, shift, action) {

    let result = "";
    let alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"; //33
    if (action == "encode") {
        for (let character of str) {
            if (alphabet.indexOf(character.toLowerCase()) > -1) {
                if (character == character.toUpperCase()) {
                    result += alphabet[(alphabet.indexOf(character.toLowerCase()) + shift) % 33].toUpperCase();
                } else {
                    result += alphabet[(alphabet.indexOf(character) + shift) % 33];
                }
            } else {
                result += character;
            }
        }
    } else if (action == "decode") {
        for (let character of str) {
            if (alphabet.indexOf(character.toLowerCase()) > -1) {
                if (character == character.toUpperCase()) {
                    result += alphabet.at((alphabet.indexOf(character.toLowerCase()) - shift) % 33).toUpperCase();
                } else {
                    result += alphabet.at((alphabet.indexOf(character) - shift) % 33);
                }
            } else {
                result += character;
            }
        }
    }
    return result;
}


console.log("<-------ТЕСТЫ------->");

let encode = cesar("Привет!", 31, "encode");
console.log(encode);

let decode = cesar(encode, 31, "decode");
console.log(decode);

//Ответ на Ваше задание: "хакуна матата", ключ = 8
for (let i = 0; i <= 10; i++) {
    console.log(cesar("эзтыхз фзъзъз", i, "decode") + "  ", i); 
}

