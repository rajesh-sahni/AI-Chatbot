import BasePlugin from "./BasePlugin";

class CalculatorPlugin extends BasePlugin {
  constructor() {
    super("calc", "/calc");
  }

  async process(expression) {
    try {
      // Safely evaluate the expression
      const sanitizedExpression = expression.replace(/[^0-9+\-*/().\s]/g, "");
      const result = eval(sanitizedExpression);

      if (typeof result !== "number" || !isFinite(result)) {
        throw new Error("Invalid expression");
      }

      return {
        expression: expression,
        result: result,
      };
    } catch (error) {
      throw new Error("Invalid mathematical expression");
    }
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

export default new CalculatorPlugin();
