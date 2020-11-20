// CALCULATOR PROJECT by Vlada Mihai Catalin

// Getting the DOM elements
const container = document.querySelector('.container');
const numbers = document.querySelectorAll('.number');
const plus = document.getElementById('add');
const minus = document.getElementById('subtract');
const star = document.getElementById('multiply');
const slash = document.getElementById('divide');
const dot = document.getElementById('dot');
const equal = document.getElementById('equal');
const display = document.getElementById('display');
const decimals = document.getElementById('decimals');
const clear = document.getElementById('clear');

display.textContent = '0';
let operator = '+';
let first = '0';
let second = '';
let result = null;



//  FUNCTIONALITY ===========>


// SET THE NUMBER OF DECIMALS TO BE DISPLAYED
//   CAN ONLY GET VALUES BETWEEN 0 AND 5
let numberOfDecimals = 0;
decimals.addEventListener('click', (e) => {
    if (Number(decimals.firstChild.textContent) === 5) {
        decimals.firstChild.textContent = -1;
    }
    decimals.firstChild.textContent = Number(decimals.firstChild.textContent) + 1;
    numberOfDecimals = Number(decimals.firstChild.textContent);
});

clear.addEventListener('click', (e) => {
    clearScreen();
});

//  EACH NUMBER YOU ENTER IS STORED IN THE VARIABLE "second"
numbers.forEach( number => {
    number.addEventListener('click', (e) => {
        second += e.target.textContent;
        console.log(first);
        console.log(operator);
        console.log(second);
        displayText(second);
    });
});

plus.addEventListener('click', (e) => {
    result = operate(operator, first, second);
    first = result;
    operator = '+';
    second = '';
    console.log(first);
    console.log(operator);
    console.log(second);
    displayText(result + operator);
});
minus.addEventListener('click', (e) => {
    result = operate(operator, first, second);
    first = result;
    operator = '-';
    second = '';
    console.log(first);
    console.log(operator);
    console.log(second);
    displayText(result + operator);
});
star.addEventListener('click', (e) => {
    result = operate(operator, first, second);
    first = result;
    operator = '*';
    second = '';
    console.log(first);
    console.log(operator);
    console.log(second);
    displayText(result + operator);
});
slash.addEventListener('click', (e) => {
    result = operate(operator, first, second);
    first = result;
    operator = '/';
    second = '';
    console.log(first);
    console.log(operator);
    console.log(second);
    displayText(result + operator);
});

equal.addEventListener('click', () => {
    result = operate(operator, first, second);
    console.log(first);
    console.log(operator);
    console.log(second);
    displayText(result);
    if (operate(operator, first, second) === 'ERROR') {
        clearScreen('ERROR');
    }
});

dot.addEventListener('click', (e) => {
    // loop through each character of pullString and if a dot appears, you can't add it again
    // this needs to look after an operator, not the whole string
    // display.textContent = e.target.textContent;
});
// <=============



//  FUNCTIONS ============>

function displayText(string) {
    if (result === null) {
        result = 0;
    }
    display.textContent = string;
}

function clearScreen(err) {
    operator = '+';
    first = '0';
    second = '';
    result = null;
    if (err === 'ERROR') {
        return;
    } else {
        display.textContent = '0';
    }
}

// FUNCTIONS OF A CALCULATOR ------>
function add(a, b) {
    return Number(a)+Number(b);
}
function subtract(a, b) {
    return Number(a)-Number(b);
}
function multiply(a, b) {
    if (!Number(a) || !Number(b)) {
        return 'ERROR';
    }
    return Number(a)*Number(b);
}
function divide(a, b) {
    if (b == 0) {
        return 'ERROR';
    }
    return Math.floor(Number(a)/Number(b) * (10**numberOfDecimals)) / (10**numberOfDecimals);
}
// <--------------

// DYNAMICALLY CALLS AN OPERATOR ------>
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            return 'ERROR';
            break;
    }
}
// <----------------
// <================