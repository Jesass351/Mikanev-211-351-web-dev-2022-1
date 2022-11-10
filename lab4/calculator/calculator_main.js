// Функция priority позволяет получить 
// значение приоритета для оператора.
// Возможные операторы: +, -, *, /.
// ----------------------------------------------------------------------------
// The "priority" function allows you to 
// get the priority of an operator. 
// Possible operators: +, -, *, /.

function priority(operation) {
    if (operation == '+' || operation == '-') {
        return 1;
    } else {
        return 2;
    }
}

// Проверка, является ли строка str числом.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains a number.

function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}

// Проверка, является ли строка str цифрой.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains a digit.

function isDigit(str) {
    return /^\d{1}$/.test(str);
}

// Проверка, является ли строка str оператором.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains an operator.

function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}

// Функция tokenize принимает один аргумент -- строку
// с арифметическим выражением и делит его на токены 
// (числа, операторы, скобки). Возвращаемое значение --
// массив токенов.
// ----------------------------------------------------------------------------
// The "tokenize" function takes one argument, a string 
// with an arithmetic expression, and divides it into 
// tokens (numbers, operators, brackets).The return value 
// is an array of tokens.

function tokenize(str) {
    let tokens = [];
    let lastNumber = '';
    for (char of str) {
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            if (lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        } 
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        } 
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    return tokens;
}

// Функция compile принимает один аргумент -- строку
// с арифметическим выражением, записанным в инфиксной 
// нотации, и преобразует это выражение в обратную 
// польскую нотацию (ОПН). Возвращаемое значение -- 
// результат преобразования в виде строки, в которой 
// операторы и операнды отделены друг от друга пробелами. 
// Выражение может включать действительные числа, операторы 
// +, -, *, /, а также скобки. Все операторы бинарны и левоассоциативны.
// Функция реализует алгоритм сортировочной станции 
// (https://ru.wikipedia.org/wiki/Алгоритм_сортировочной_станции).
// ----------------------------------------------------------------------------
// The compile function takes one argument, a string with an arithmetic 
// expression written in infix notation, and converts this expression to 
// reverse Polish notation(RPN).The return value is the result of the 
// conversion as a string with operators and operands separated by 
// spaces.The expression can include real numbers, +, -, *, / operators, 
// and brackets. All operators are binary and left associative. 
// The function implements the Shunting yard algorithm
// (https://en.wikipedia.org/wiki/Shunting_yard_algorithm).

function compile(str) {
    let out = [];
    let stack = [];
    for (token of tokenize(str)) {
        if (isNumeric(token)) {
            out.push(token);
        } else if (isOperation(token)) {
            while (stack.length > 0 && 
                   isOperation(stack[stack.length - 1]) && 
                   priority(stack[stack.length - 1]) >= priority(token)) {
                out.push(stack.pop());
            }
            stack.push(token);
        } else if (token == '(') {
            stack.push(token);
        } else if (token == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    return out.join(' ');
}

// Функция evaluate принимает один аргумент -- строку 
// с арифметическим выражением, записанным в обратной 
// польской нотации. Возвращаемое значение -- результат 
// вычисления выражения. Выражение может включать 
// действительные числа и операторы +, -, *, /.
// Вам нужно реализовать эту функцию
// (https://ru.wikipedia.org/wiki/Обратная_польская_запись#Вычисления_на_стеке).
// ----------------------------------------------------------------------------
// The evaluate function takes one argument, a string 
// containing an arithmetic expression written in reverse 
// Polish notation.The return value is the result of 
// evaluating the expression.The expression can include 
// real numbers and the operators +, -, *, /. 
// You need to implement this function
// (https://en.wikipedia.org/wiki/Reverse_Polish_notation).


//можно и switch case, но через объект и стрелочные прям красиво получилось
const operators = {
    '+': (x, y) => x + y,
    '*': (x, y) => x * y,
    '-': (x, y) => x - y,
    '/': (x, y) => x / y,
};

function evaluate(str) {
    let revPolNotation = compile(str);
    console.log(revPolNotation);
    let result = [];

    for (let token of revPolNotation.split(' ')) {
        if (token in operators) {
            let [y, x] = [result.pop(), result.pop()];
            result.push(operators[token](x, y));
        } else {
            result.push(parseFloat(token));
        }
    }

    if (result[0] % 1 == 0) {   
        return result[0];
    } else {
        return result[0].toFixed(2);
    }

}

//<------------------------------------------------------------------------------------------>
//<------------------------------------------------------------------------------------------>
//<------------------------------------------------------------------------------------------>
//<------------------------------------------------------------------------------------------>

const buttonsScreen = document.querySelector('.buttons_screen');
const resultScreen = document.querySelector('.result_screen');

function showMessage(str, flag) {
    if (flag == 'button') {
        buttonsScreen.innerHTML += str;
    } else if (flag == 'output') {
        if (!isNaN(str)) {
            resultScreen.innerHTML = '= ' + str;
        } 
    }
}

function eraseCalculations() {
    resultScreen.innerHTML = "";
    resultScreen.classList.remove('bigger');

    buttonsScreen.innerHTML = "";
    buttonsScreen.classList.remove('hide');
}

function checkDisplayingBtns() {
    if (buttonsScreen.classList.contains('hide')) {
        return true;
    } else false;
}

function dialogCloser() {
    document.querySelector('#overflowWarning').close();
}

function showWarning() {
    document.querySelector('#overflowWarning').showModal();
}

// Функция clickHandler предназначена для обработки 
// событий клика по кнопкам калькулятора. 
// По нажатию на кнопки с классами digit, operation и bracket
// на экране (элемент с классом screen) должны появляться 
// соответствующие нажатой кнопке символы.
// По нажатию на кнопку с классом clear содержимое экрана 
// должно очищаться.
// По нажатию на кнопку с классом result на экране 
// должен появиться результат вычисления введённого выражения 
// с точностью до двух знаков после десятичного разделителя (точки).
// Реализуйте эту функцию. Воспользуйтесь механизмом делегирования 
// событий (https://learn.javascript.ru/event-delegation), чтобы 
// не назначать обработчик для каждой кнопки в отдельности.
// ----------------------------------------------------------------------------
// The clickHandler function is designed to handle click events 
// on calculator buttons. When buttons with classes "digit", 
// "operation" and "bracket" are pressed, the symbols corresponding 
// to the pressed button should appear on the screen 
// (element with the class "screen"). On clicking the button with 
// the "clear" class, the contents of the screen should be cleared.
// By clicking on the button with the "result" class, the result of 
// the calculation of the entered expression should appear on the screen 
// with an accuracy of two decimal places after the decimal separator (point). 
// Implement this function. Use the event delegation mechanism 
// (https://javascript.info/event-delegation) so as not to set a 
// handler for each button separately.

// Назначьте нужные обработчики событий.
// ----------------------------------------------------------------------------
// Set event handlers.

function clickHandler(event) {

    //считываем только кнопки
    if (!event.target.classList.contains('key')) {
        return;
    }

    //кнопочка очистки
    if (event.target.classList.contains('clear')) {
        eraseCalculations();
        return;
    }

    //кнопочка "результат"
    if (event.target.classList.contains('result')) {

        if (String(evaluate(buttonsScreen.innerHTML)).length > 15) {
            showWarning();
            return;
        }

        buttonsScreen.classList.add('hide');
        resultScreen.classList.add('bigger');

        buttonsScreen.innerHTML = "";

        return;
    }

    //чтобы не нажимать "стереть" после каждого вызова "результат"
    if (checkDisplayingBtns()) {
        eraseCalculations();
    }

    //чтобы не переполнилось окно ввода
    if (buttonsScreen.innerHTML.length > 21) {
        showWarning();
        return;
    }

    //вывод примера на верхний подэкран
    showMessage(event.target.innerHTML, 'button');

    //вывод в "прямом эфире" результата примера с верхнего подэкрана
    showMessage(evaluate(buttonsScreen.innerHTML), 'output');
}

window.onload = function () {
    eraseCalculations();

    let ourButtons = document.querySelector('.buttons');
    ourButtons.onclick = clickHandler;

    let dialogCloserBtn = document.querySelector('#dialogCloser');
    dialogCloserBtn.onclick = dialogCloser;
};


