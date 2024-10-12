document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstOperand = null;
    let operator = null;
    let awaitingSecondOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value === 'C') {
                clearCalculator();
            } else if (value === '=') {
                evaluate();
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
                input.value=string;
            } else {
                inputDigit(value);
            }

            updateDisplay();
        });
    });

    function clearCalculator() {
        displayValue = '0';
        firstOperand = null;
        operator = null;
        awaitingSecondOperand = false;
    }

    function inputDigit(digit) {
        if (awaitingSecondOperand) {
            displayValue = digit;
            awaitingSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && awaitingSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        awaitingSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') {
            return firstOperand + secondOperand;
        } else if (operator === '-') {
            return firstOperand - secondOperand;
        } else if (operator === '*') {
            return firstOperand * secondOperand;
        } else if (operator === '/') {
            return firstOperand / secondOperand;
        }

        return secondOperand;
    }

    function evaluate() {
        if (operator && !awaitingSecondOperand) {
            const inputValue = parseFloat(displayValue);
            const result = calculate(firstOperand, inputValue, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = null;
            operator = null;
            awaitingSecondOperand = false;
        }
    }

    function updateDisplay() {
        display.textContent = displayValue;
    }
});
