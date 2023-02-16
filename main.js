const calculator = document.querySelector('.calculator-buttons');
const display = document.querySelector('.screen');
let displayValue = '0';
let holdValue = null;
let operator = null;
nextValue = false;
updateDisplay();

const buttonClick = (e) => {
    const element = e.target;
    if (e.target.matches("button")) {
        console.log(element);
    }
    else {
        return;
    }

    if (element.classList.contains('operator')) {
        console.log("operator", element.value);
        handleOperator(element.value);
    }

    else if (element.classList.contains('delete')) {
        console.log("delete", element.value);
        deleteValue();
    }

    else if (element.classList.contains('clear')) {
        console.log("clear", element.value);
        clearValue();
    }

    else if (element.classList.contains('decimal')) {
        console.log("decimal", element.value);
        inputDecimal();
    }
    else if (element.classList.contains('number')) {
        inputNumber(element.value);
    }
    updateDisplay();
}

calculator.addEventListener('click', buttonClick);

function updateDisplay() {
    display.value = displayValue;
}

function inputNumber(num) {
    if (nextValue) {
        displayValue = num;
        nextValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }

    console.log(displayValue, holdValue, operator, nextValue);
}

const deleteValue = () => {
    Number(displayValue);
    displayValue = Math.floor(displayValue / 10)
}

const clearValue = () => {
    displayValue = '0';
}

const inputDecimal = () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

const handleOperator = (nextOperator) => {
    const value = parseFloat(displayValue);

    if (operator && nextValue) {
        operator = nextOperator;
        return;
    }

    if (holdValue === null) {
        holdValue = value;
    } else if (operator) {
        const result = calculate(holdValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        holdValue = result;
    }

    nextValue = true;
    operator = nextOperator;
    console.log(displayValue, holdValue, operator, nextValue);

}

function calculate(firstValue, secondValue, operator) {
    if (operator === '+') {
        return firstValue + secondValue;
    } else if (operator === '-') {
        return firstValue - secondValue;
    } else if (operator === '*') {
        return firstValue * secondValue
    } else if (operator === '/') {
        return firstValue / secondValue;
    }
    return secondValue;
}