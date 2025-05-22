class PluginManager {
  constructor() {
    this.plugins = new Map();
  }

  registerPlugin(plugin) {
    this.plugins.set(plugin.name, plugin);
  }

  async executePlugin(pluginName, args) {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      throw new Error(`Plugin ${pluginName} not found`);
    }
    return await plugin.execute(args);
  }

  getPluginForCommand(command) {
    for (const [name, plugin] of this.plugins) {
      if (plugin.matchesCommand(command)) {
        return plugin;
      }
    }
    return null;
  }
}

export default new PluginManager();
