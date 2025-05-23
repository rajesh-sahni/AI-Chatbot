class NaturalLanguageProcessor {
  constructor() {
    this.commandPatterns = {
      calc: [
        /(?:calculate|compute|what is|what's|whats)\s+(\d+(?:\s*[+\-*/]\s*\d+)+)/i,
        /(\d+(?:\s*[+\-*/]\s*\d+)+)/i,
      ],
      weather: [
        /(?:weather|temperature|forecast)\s+(?:in|at|for|of)?\s+([a-zA-Z\s,]+)/i,
        /(?:what's|whats|what is)\s+(?:the)?\s+(?:weather|temperature|forecast)\s+(?:in|at|for|of)?\s+([a-zA-Z\s,]+)/i,
      ],
      define: [
        /(?:what is the definition of|what is the meaning of|define|meaning of|what is|what's|whats)\s+([a-zA-Z\s]+)/i,
        /(?:definition|meaning)\s+(?:of|for)?\s+([a-zA-Z\s]+)/i,
      ],
    };
  }

  processInput(input) {
    if (!input || typeof input !== "string") {
      return null;
    }

    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return null;
    }

    for (const [command, patterns] of Object.entries(this.commandPatterns)) {
      for (const pattern of patterns) {
        const match = trimmedInput.match(pattern);
        if (match && match[1]) {
          const args = match[1].trim();
          if (args) {
            return {
              command: `/${command}`,
              args,
              fullCommand: `/${command} ${args}`,
            };
          }
        }
      }
    }
    return null;
  }

  // Add new command patterns
  addCommandPattern(command, patterns) {
    if (!this.commandPatterns[command]) {
      this.commandPatterns[command] = [];
    }
    this.commandPatterns[command].push(...patterns);
  }
}

const naturalLanguageProcessor = new NaturalLanguageProcessor();
export default naturalLanguageProcessor;
