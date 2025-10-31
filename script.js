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
    const operand1 = parseInt(expression.operand1);
    const operator = expression.operator;
    const operand2 = parseInt(expression.operand2);
    const OPERATORS = {"+": add, "-": subtract, "/": divide, "*": multiply};

    const operation = OPERATORS[operator];
    return operation(operand1, operand2); 
};

const generateExpression = function (userInputs) {
    let expression =  { operand1: "", operator: "", operand2: ""}
    const OPERATORS = { "+": null, "-": null, "/": null, "*": null};
    let role = "operand1";
    
    if (userInputs.length === 1) {
        return {operand1: userInputs[0], operator: "*", operand2: "1"};
    } else if (userInputs.length === 0) {
        return {operand1: "0", operator: "*", operand2: "0"};
    }

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
    // add click listener to the inputs container
    const calculator = document.querySelector("#calculator-container");
    const resultDisplay = document.querySelector("#result");
    const expressionDisplay = document.querySelector("#expression");
    let i = 0;
    let userInputs = [];
    const NUMBERS = {0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null};
    const OPERATORS = { "+": null, "-": null, "/": null, "*": null};
    let result = 0;

    calculator.addEventListener("click", (e) => {
        const input = e.target;
        
        if (input.textContent in NUMBERS) {
            userInputs.push(input.textContent);
        } else if (input.textContent in OPERATORS) {
            if (userInputs.filter(input => input in OPERATORS).length === 1) {
                const interimResult = evaluateExpression(generateExpression(userInputs));
                userInputs = [];
                userInputs.push(interimResult);
            } 
            userInputs.push(input.textContent);
        } else if (input.textContent === "CE") {
            userInputs.pop();
        } else if (input.textContent === "AC") {
            userInputs = []
        } else if (input.textContent === "=") {
            result = evaluateExpression(generateExpression(userInputs));
            userInputs = [result.toString()];
        }
        console.log(input);
        console.log(userInputs);
        console.log(result);


        // if (input.type === "button") {
        //     if (input.textContent === "CE") {
        //         resultDisplay.textContent = "0";
        //     } else if (input.textContent === "AC") {
        //         i = 0;
        //         expression = ["", "", ""];
        //         expressionDisplay.textContent = "";
        //         resultDisplay.textContent = "0";
        //     }
            
        //     else {
        //             resultDisplay.textContent = input.textContent;
        //             if (input.textContent in NUMBERS) {
        //             expression[i] += input.textContent;
        //             expressionDisplay.textContent = expression.join("");
        //         } else if (input.textContent in OPERATORS) {
        //             expression[1] = input.textContent;
        //             i = 2;
        //             expressionDisplay.textContent = expression.join("");
        //         } else if (input.textContent === "=") {
        //             i = 0;
        //             const evaluation = evaluateExpression(expression);
        //             expressionDisplay.textContent = expression.join("") + "=";
        //             expression = ["", "", ""]
        //             expression[0] = evaluation;
        //             resultDisplay.textContent = evaluation;
        //         }

        //         console.log(input);
        //         console.log(input.textContent);
        //         console.log(expression);
        //     } 
        

        // }

    })
}

runCalculator();