const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const divide = function (a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    } else {
        return a / b;
    }
};

const evaluateExpression = function (expression) {
    const operand1 = parseInt(expression[0]);
    const operator = expression[1];
    const operand2 = parseInt(expression[2]);
    const OPERATORS = {"+": add, "-": subtract, "/": divide, "*": multiply};

    const operation = OPERATORS[operator];
    return operation(operand1, operand2); 
};

const runCalculator = function () {
    // add click listener to the inputs container
    const calculator = document.querySelector("#calculator-container");
    const resultDisplay = document.querySelector("#result");
    const expressionDisplay = document.querySelector("#expression");
    let i = 0;
    let expression = ["", "", ""];
    const NUMBERS = {0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null};
    const OPERATORS = { "+": null, "-": null, "/": null, "*": null};

    calculator.addEventListener("click", (e) => {
        const input = e.target;

        if (input.type === "button") {
            resultDisplay.textContent = input.textContent;
            if (input.textContent in NUMBERS) {
                expression[i] += input.textContent;
                expressionDisplay.textContent = expression.join("");
            } else if (input.textContent in OPERATORS) {
                expression[1] = input.textContent;
                i = 2;
                expressionDisplay.textContent = expression.join("");
            } else if (input.textContent === "=") {
                i = 0;
                const evaluation = evaluateExpression(expression);
                expressionDisplay.textContent = expression.join("") + "=";
                expression = ["", "", ""]
                expression[0] = evaluation;
                resultDisplay.textContent = evaluation;
            }
        
            console.log(input);
            console.log(input.textContent);
            console.log(expression);
        }

    })
}

runCalculator();