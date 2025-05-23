import BasePlugin from "./BasePlugin";

class CalculatorPlugin extends BasePlugin {
  constructor() {
    super("calc", "/calc");
  }

  async process(expression) {
    try {
      if (!expression) {
        throw new Error("Please provide an expression to calculate");
      }

      // Sanitize the expression to only allow numbers and basic operators
      const sanitizedExpression = expression.replace(/[^0-9+\-*/().\s]/g, "");

      // Validate the expression has at least one operator
      if (!/[\+\-\*\/]/.test(sanitizedExpression)) {
        throw new Error(
          "Invalid expression: must contain at least one operator"
        );
      }

      // Use a safer evaluation method
      const result = this.safeEvaluate(sanitizedExpression);

      if (typeof result !== "number" || !isFinite(result)) {
        throw new Error("Invalid expression: result is not a finite number");
      }

      return {
        expression: expression,
        result: result,
      };
    } catch (error) {
      throw new Error(error.message || "Invalid mathematical expression");
    }
  }

  safeEvaluate(expression) {
    // Split the expression into tokens
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g) || [];

    // Convert to postfix notation (Reverse Polish Notation)
    const postfix = this.toPostfix(tokens);

    // Evaluate postfix expression
    return this.evaluatePostfix(postfix);
  }

  toPostfix(tokens) {
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const output = [];
    const operators = [];

    for (const token of tokens) {
      if (token.match(/^\d+\.?\d*$/)) {
        output.push(parseFloat(token));
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          output.push(operators.pop());
        }
        operators.pop(); // Remove '('
      } else {
        while (
          operators.length &&
          operators[operators.length - 1] !== "(" &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      }
    }

    while (operators.length) {
      output.push(operators.pop());
    }

    return output;
  }

  evaluatePostfix(postfix) {
    const stack = [];

    for (const token of postfix) {
      if (typeof token === "number") {
        stack.push(token);
      } else {
        const b = stack.pop();
        const a = stack.pop();

        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            if (b === 0) throw new Error("Division by zero");
            stack.push(a / b);
            break;
        }
      }
    }

    return stack[0];
  }

  render(data) {
    return {
      type: "calculator",
      content: {
        expression: data.expression,
        result: data.result,
      },
    };
  }
}

const calculatorPlugin = new CalculatorPlugin();
export default calculatorPlugin;
