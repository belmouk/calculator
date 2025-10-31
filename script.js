const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

const divide = function (a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    } else {
        return a / b;
    }
};

const OPERATORS = new Set(["+", "-", "/", "*"]);


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
    let role = "operand1";

    for (input of userInputs) {
        if (!(OPERATORS.has(input))) {
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

    const NUMBERS = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    
    
    let userInputs = [];
    let expression = [];
    let decimalSwitch = 0;

    calculator.addEventListener("click", ( { target }) => {
        
        if (target.type === "button") {
            const inputValue = target.textContent;
            
            if (NUMBERS.has(inputValue)) {
                userInputs.push(inputValue);
                expression.push(inputValue);
                resultDisplay.textContent += (inputValue); // to check
            } else if (OPERATORS.has(inputValue)) {
                if (userInputs.at(-1) && !(OPERATORS.has(userInputs.at(-1)))) {
                    const interimResult = evaluateExpression(generateExpression(userInputs));
                    userInputs = [interimResult.toString(), inputValue];
                } else {
                    userInputs.at(-1) = inputValue;
                }
                if (OPERATORS.has(expression.at(-1))) { // to check 
                    expression.pop();
                }
                resultDisplay.textContent = ""; // to check
                decimalSwitch = 0;
                expression.push(inputValue)
                
            } else if (inputValue === "CE") {
                userInputs.pop();
                expression.pop();
                resultDisplay.textContent = ""; // to check                
            } else if (inputValue === "AC") {
                userInputs = [];
                expression = [];
                resultDisplay.textContent = "";
                decimalSwitch = 0;
            } else if (inputValue === "=") {
                const result = evaluateExpression(generateExpression(userInputs));
                resultDisplay.textContent = result;
                userInputs = [result.toString()];
                expression.push("=")
                if (OPERATORS.has(expression.at(-1))) {
                    expression.pop()
                }
                
            } else if (inputValue === "." && decimalSwitch === 0) {
                    userInputs.push(inputValue);
                    decimalSwitch = 1;
                    expression.push(inputValue);
                    resultDisplay.textContent += (inputValue);
                } 
            console.log(expression);
            expressionDisplay.textContent = expression.join("");
            expression = inputValue === "=" ? [...userInputs] : expression;
            
            console.log(userInputs);

        }
    })
}

runCalculator();