import { pluginGroupPanel, PluginGroupPanel } from '@/plugin/common';

/**
 * 查找注册插件提供的群组面板的信息
 * @param pluginPanelName 插件面板名
 */
export function findPluginPanelInfoByName(
  pluginPanelName: string
): PluginGroupPanel | undefined {
  return pluginGroupPanel.find((p) => p.name === pluginPanelName);
}

export function ensurePluginNamePrefix(name: string): string {
  if (typeof name !== 'string') {
    throw new Error('Plugin Name must be string');
  }

  return name.startsWith('plugin:') ? name : `plugin:${name}`;
}
