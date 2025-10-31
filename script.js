const add = function (a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    } else {

    }
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
    if (expression.operand1 === "") {
        return 0;
    } else if (expression.operand2 === "") {
        return parseInt(expression.operand1);
    } else {
        const operand1 = parseFloat(expression.operand1);
        const operator = expression.operator;
        const operand2 = parseFloat(expression.operand2);
        const OPERATORS = {"+": add, "-": subtract, "/": divide, "*": multiply};

        const operation = OPERATORS[operator];
        return operation(operand1, operand2); 
    }
};

const generateExpression = function (userInputs) {
    let expression =  { operand1: "", operator: "", operand2: ""}
    const OPERATORS = { "+": null, "-": null, "/": null, "*": null};
    let role = "operand1";

    for (input of userInputs) {
        if (!(input in OPERATORS)) {
            expression[role] += input;
        } else {
            expression["operator"] = input;
            role = "operand2";
        }
    }

    return expression;
};

const runCalculator = function () {

    const calculator = document.querySelector("#calculator-container");
    const resultDisplay = document.querySelector("#result");
    const expressionDisplay = document.querySelector("#expression");

    const NUMBERS = {0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null};
    const OPERATORS = { "+": null, "-": null, "/": null, "*": null};
    let userInputs = [];
    let expression = [];
    let result = 0;

    calculator.addEventListener("click", (e) => {
        
        if (e.target.type === "button") {
            const input = e.target;
            
            if (input.textContent in NUMBERS) {
                userInputs.push(input.textContent);
                resultDisplay.textContent += (input.textContent);
                expression.push(input.textContent);
            } else if (input.textContent in OPERATORS) {
                resultDisplay.textContent = "";
                if (userInputs.filter(input => input in OPERATORS).length === 1) {
                    const interimResult = evaluateExpression(generateExpression(userInputs));
                    userInputs = [];
                    userInputs.push(interimResult);
                } 
                userInputs.push(input.textContent);
                if (expression.at(-1) in OPERATORS) {
                    expression.pop();
                }
                expression.push(input.textContent)
            } else if (input.textContent === "CE") {
                userInputs.pop();
                resultDisplay.textContent = "";
                expression.pop();
            } else if (input.textContent === "AC") {
                userInputs = []
                resultDisplay.textContent = "";
                expression = [];
            } else if (input.textContent === "=") {
                result = evaluateExpression(generateExpression(userInputs));
                userInputs = [result.toString()];
                resultDisplay.textContent = result;
                if (expression.at(-1) in OPERATORS) {
                    expression.pop()
                }
                expression.push("=")
            }
            console.log(expression);
            expressionDisplay.textContent = expression.join("");
            expression = input.textContent === "=" ? [...userInputs] : expression;
            
            console.log(userInputs);

        }
    })
}

runCalculator();