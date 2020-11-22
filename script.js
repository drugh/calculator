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
const del = document.getElementById('backspace');

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
        updateDisplay();
    });
});

plus.addEventListener('click', (e) => {
    asignAfterOperator('+');
    updateDisplay();
});
minus.addEventListener('click', (e) => {
    asignAfterOperator('-');
    updateDisplay();
});
star.addEventListener('click', (e) => {
    asignAfterOperator('*');
    updateDisplay();
});
slash.addEventListener('click', (e) => {
    asignAfterOperator('/');
    updateDisplay();
});

equal.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

dot.addEventListener('click', (e) => {
    addDot();
    updateDisplay();
});

del.addEventListener('click', () => {
    backspace(); 
    updateDisplay();
})
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
    if(shownString[shownString.length - 1] === '.') {
        second = shownString + number;
    } else if ((shownString == 0) || (shownString === 'ERROR')) {
        second = number;
        result = null;
    } else if(shownString != 0 && second === null) {
        if (shownString[shownString.length - 1] === newOperator) {
            second = number;
            result = null;
        } else {
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
    } else if (shownString === 'ERROR') {
        clearScreen('ERROR');
        return;
    } else if (shownString.toString()[shownString.toString().length - 1] === newOperator) {
        return;
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
        if ((second == 0) && (newOperator === '/')) {
            clearScreen('ERROR');
        } else {
            clearScreen('0');
        }
    } else if (shownString[shownString.length - 1] === newOperator) {
        clearScreen('ERROR');
    } else {
        if ((newOperator === null) && (shownString === 'ERROR')) {
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

function addDot() {
    if (shownString[shownString.length - 1] === newOperator) {
        second = '0';
        second += '.';
        shownString = second;
    } else if (shownString.toString().indexOf('.') !== -1) {
        return;
    } else if (shownString === 'ERROR') {
        return;
    } else {
        shownString += '.';
    }
}

function backspace() {
    if (shownString == 0) {
        clearScreen('0');
    } else if (shownString.toString().length === 1) {
        clearScreen('0');
    } else {
        shownString = shownString.toString().substring(0, shownString.toString().length - 1);
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
    return Math.floor((Number(a) + Number(b)) * (10**numberOfDecimals)) / (10**numberOfDecimals);
}
function subtract(a, b) {
    return Math.floor((Number(a) - Number(b)) * (10**numberOfDecimals)) / (10**numberOfDecimals);
}
function multiply(a, b) {
    return Math.floor((Number(a) * Number(b)) * (10**numberOfDecimals)) / (10**numberOfDecimals);
}
function divide(a, b) {
    if (b == 0) {
        return 'ERROR';
    }
    return Math.floor((Number(a) / Number(b)) * (10**numberOfDecimals)) / (10**numberOfDecimals);
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