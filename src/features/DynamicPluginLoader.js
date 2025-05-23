import { useState, useEffect } from "react";

class DynamicPluginLoader {
  constructor() {
    this.plugins = new Map();
    this.pluginCallbacks = new Set();
  }

  // Register a new plugin
  registerPlugin(plugin) {
    if (!plugin.name || !plugin.execute) {
      throw new Error("Plugin must have a name and execute function");
    }
    this.plugins.set(plugin.name, plugin);
    this.notifyPluginUpdate();
  }

  // Unregister a plugin
  unregisterPlugin(pluginName) {
    this.plugins.delete(pluginName);
    this.notifyPluginUpdate();
  }

  // Get all registered plugins
  getPlugins() {
    return Array.from(this.plugins.values());
  }

  // Subscribe to plugin updates
  subscribe(callback) {
    this.pluginCallbacks.add(callback);
    return () => this.pluginCallbacks.delete(callback);
  }

  // Notify subscribers of plugin updates
  notifyPluginUpdate() {
    this.pluginCallbacks.forEach((callback) => callback(this.getPlugins()));
  }
}

// Create a singleton instance
const pluginLoader = new DynamicPluginLoader();

// Custom hook for using plugins
export const usePlugins = () => {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    const unsubscribe = pluginLoader.subscribe(setPlugins);
    return () => unsubscribe();
  }, []);

  return {
    plugins,
    registerPlugin: pluginLoader.registerPlugin.bind(pluginLoader),
    unregisterPlugin: pluginLoader.unregisterPlugin.bind(pluginLoader),
  };
};

export default pluginLoader;
