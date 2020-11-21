// CALCULATOR PROJECT by Vlada Mihai Catalin

// Selecting the DOM elements
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

let shownString = '0';
let oldOperator = null;
let newOperator = null;
let first = null;
let second = null;
let result = null;


//  FUNCTIONALITY ===========>

updateDisplay();

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
    clearScreen('0');
    updateDisplay();
});

//  EACH NUMBER YOU ENTER IS STORED IN THE VARIABLE "second"
numbers.forEach( number => {
    number.addEventListener('click', (e) => {
        asignNumber(e.target.textContent);
        console.log('first:    ' + first);
        console.log('oldOpr:   ' + oldOperator);
        console.log('newOpr:   ' + newOperator);
        console.log('second:   ' + second);
        console.log('result:   ' + result);
        updateDisplay();
    });
});

plus.addEventListener('click', (e) => {
    asignAfterOperator('+');
    console.log('first:    ' + first);
    console.log('oldOpr:   ' + oldOperator);
    console.log('newOpr:   ' + newOperator);
    console.log('second:   ' + second);
    console.log('result:   ' + result);
    updateDisplay();
});
minus.addEventListener('click', (e) => {
    asignAfterOperator('-');
    console.log('first:    ' + first);
    console.log('oldOpr:   ' + oldOperator);
    console.log('newOpr:   ' + newOperator);
    console.log('second:   ' + second);
    console.log('result:   ' + result);
    updateDisplay();
});
star.addEventListener('click', (e) => {
    asignAfterOperator('*');
    console.log('first:    ' + first);
    console.log('oldOpr:   ' + oldOperator);
    console.log('newOpr:   ' + newOperator);
    console.log('second:   ' + second);
    console.log('result:   ' + result);
    updateDisplay();
});
slash.addEventListener('click', (e) => {
    asignAfterOperator('/');
    console.log('first:    ' + first);
    console.log('oldOpr:   ' + oldOperator);
    console.log('newOpr:   ' + newOperator);
    console.log('second:   ' + second);
    console.log('result:   ' + result);
    updateDisplay();
});

equal.addEventListener('click', () => {
    calculate();
    console.log('first:    ' + first);
    console.log('oldOpr:   ' + oldOperator);
    console.log('newOpr:   ' + newOperator);
    console.log('second:   ' + second);
    console.log('result:   ' + result);
    updateDisplay();
});

dot.addEventListener('click', (e) => {
    // loop through each character of pullString and if a dot appears, you can't add it again
    // this needs to look after an , not the whole string
    // display.textContent = e.target.textContent;
});
// <=============



//  FUNCTIONS ============>

function updateDisplay() {
    if (shownString.length > 9) {
        display.textContent = shownString.substring(0, 9);
    } else {
        display.textContent = shownString;
    }
}

function asignNumber(number) {
    if (shownString == 0) {
        second = number;
        result = null;
    } else if(shownString != 0 && second === null) {
        if (shownString[shownString.length - 1] === newOperator) {
            // am apasat un operator inainte de numar
            second = number;
            result = null;
        } else {
            // am apasat = inainte de numar
            second = shownString + number;
            oldOperator = null;
            newOperator = null;
            first = null;
            result = null;
        }
    } else {
        second += number;
    }
    shownString = second;
}

function asignAfterOperator(opr) {
    if (shownString == 0) {
        first = '0';
        newOperator = opr;
        shownString += opr;
    } else {
        oldOperator = newOperator;
        newOperator = opr;
        if (oldOperator === null) {
            first = shownString;
            shownString += opr;
        } else {
            first = operate(oldOperator, first, second);
            if (first !== 'ERROR') {
                shownString = first + opr;    
            }
        }
    }
    second = null;
}

function calculate() {
    if (shownString == 0) {
        clearScreen('0');
    } else if (shownString[shownString.length - 1] === newOperator) {
        clearScreen('ERROR');
    } else {
        if (newOperator === null) {
            return;
        } else {
            if (result === null) {
                result = operate(newOperator, first, second);
                first = result;
                newOperator = null;
                second = null;
                shownString = result;
            } else {
                return;
            }
        }
    }
}

function clearScreen(err) {
    oldOperator = null;
    newOperator = null;
    first = null;
    second = null;
    result = null;
    shownString = err;
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

// DYNAMICALLY CALLS AN  ------>
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