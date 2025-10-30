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

const evaluateExpression = function (operand1, operator, operand2) {
    const OPERATORS = {"+": add, "-": subtract, "/": divide, "*": multiply};
    const operation = OPERATORS[operator];
    return operation(operand1, operand2); 
}