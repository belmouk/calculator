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
    return parseFloat(expression.operand1);
  } else {
    const operand1 = parseFloat(expression.operand1);
    const operator = expression.operator;
    const operand2 = parseFloat(expression.operand2);
    const OPERATIONS = { "+": add, "-": subtract, "/": divide, "*": multiply };

    const operation = OPERATIONS[operator];
    return operation(operand1, operand2);
  }
};

const generateExpression = function (userInputs) {
  const expression = { operand1: "", operator: "", operand2: "" };
  let role = "operand1";

  for (const input of userInputs) {
    if (!OPERATORS.has(input)) {
      expression[role] += input;
    } else {
      expression.operator = input;
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

  calculator.addEventListener("click", ({ target }) => {
    if (target.type !== "button") return;

    const inputValue = target.textContent;

    if (NUMBERS.has(inputValue)) {
      userInputs.push(inputValue);
      expression.push(inputValue);

    } else if (OPERATORS.has(inputValue)) {
      if (userInputs.length === 0) return; // prevent starting with operator
      if (userInputs.at(-1) && !OPERATORS.has(userInputs.at(-1))) {
        const interimResult = evaluateExpression(generateExpression(userInputs));
        userInputs = [interimResult.toString(), inputValue];
      } else {
        userInputs[userInputs.length - 1] = inputValue;
      }

      if (OPERATORS.has(expression.at(-1))) expression.pop();
      expression.push(inputValue);
      decimalSwitch = 0;

    } else if (inputValue === "CE") {
      userInputs.pop();
      expression.pop();

    } else if (inputValue === "AC") {
      userInputs = [];
      expression = [];
      decimalSwitch = 0;

    } else if (inputValue === "=") {
      const result = evaluateExpression(generateExpression(userInputs));
      resultDisplay.textContent = result;
      userInputs = [result.toString()];
      if (OPERATORS.has(expression.at(-1))) expression.pop();
      expression.push("=");
      decimalSwitch = 0;

    } else if (inputValue === "." && decimalSwitch === 0) {
      userInputs.push(inputValue);
      expression.push(inputValue);
      decimalSwitch = 1;
    }

    resultDisplay.textContent = userInputs.join("");
    expressionDisplay.textContent = expression.join("");
    if (inputValue === "=") expression = [...userInputs];
  });
};

runCalculator();
