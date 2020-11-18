// CALCULATOR PROJECT by Vlada Mihai Catalin

// Getting the DOM elements
const container = document.querySelector('.container');
const numbers = document.querySelectorAll('.number');
const plus = document.getElementById('add');
const minus = document.getElementById('subtract');
const star = document.getElementById('multiply');
const slash = document.getElementById('divide');
const equal = document.getElementById('equal');
const display = document.getElementById('display');

let operator = '';
let first;
let second = 0;
let isEvaluated = false;

numbers.forEach( number => {
    number.addEventListener('click', (e) => {
        second = 10*second + Number(e.target.textContent);
        display.textContent += second%10;
        isEvaluated = false;
    });
});

plus.addEventListener('click', (e) => {
    if(!isEvaluated && first) {
        first = operate(operator, first, second);
    }
    if (!first) {
        first = second;
    }
    operator = e.target.textContent;
    display.textContent += operator;
    second = 0;
    isEvaluated = true;
});
minus.addEventListener('click', (e) => {
    if(!isEvaluated && first) {
        first = operate(operator, first, second);
    }
    if (!first) {
        first = second;
    }
    operator = e.target.textContent;
    display.textContent += operator;
    second = 0;
    isEvaluated = true;
});
star.addEventListener('click', (e) => {
    if(!isEvaluated && first) {
        first = operate(operator, first, second);
    }
    if (!first) {
        first = second;
    }
    operator = e.target.textContent;
    display.textContent += operator;
    second = 0;
    isEvaluated = true;
});
slash.addEventListener('click', (e) => {
    if(!isEvaluated && first) {
        first = operate(operator, first, second);
    }
    if (!first) {
        first = second;
    }
    operator = e.target.textContent;
    display.textContent += operator;
    second = 0;
    isEvaluated = true;
});

equal.addEventListener('click', () => {
    display.textContent = operate(operator, first, second);
    first = operate(operator, first, second);
    isEvaluated = true;
})


// FUNCTIONS OF A CALCULATOR ------>
function add(a, b) {
    return a+b;
}
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a*b;
}
function divide(a, b) {
    return Math.floor(a/b * 100) / 100;
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
            return 0;
            break;
    }
}
// <----------------