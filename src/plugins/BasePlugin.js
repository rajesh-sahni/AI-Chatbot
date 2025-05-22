class BasePlugin {
  constructor(name, commandPattern) {
    this.name = name;
    this.commandPattern = commandPattern;
  }

  matchesCommand(command) {
    return command.startsWith(this.commandPattern);
  }

  parseArgs(command) {
    return command.slice(this.commandPattern.length).trim();
  }

  async execute(command) {
    const args = this.parseArgs(command);
    return await this.process(args);
  }

  async process(args) {
    throw new Error("Plugin must implement process method");
  }

  render(data) {
    throw new Error("Plugin must implement render method");
  }
}

export default BasePlugin;
