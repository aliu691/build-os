/**
 * UpgradeDiscovery: Determine available upgrades for a project
 */

import { VersionInfo } from './types.js';

export class UpgradeDiscovery {
  /**
   * Discover available upgrades
   *
   * For BuildOS v1.1.0, this is a placeholder.
   * Future versions will check against remote registries.
   */
  discoverAvailableVersions(): VersionInfo {
    // In v1.1.0, there are no upgrades available yet
    // This is the first release with upgrade infrastructure
    return {
      framework: '1.1.0',
      generator: '1.1.0',
      runtime: '1.1.0',
      blueprint: 'saas-1.1.0',
    };
  }

  hasUpgrades(current: VersionInfo, available: VersionInfo): boolean {
    return (
      current.framework !== available.framework ||
      current.generator !== available.generator ||
      current.runtime !== available.runtime ||
      current.blueprint !== available.blueprint
    );
  }

  getComponentsToUpgrade(current: VersionInfo, available: VersionInfo): string[] {
    const components: string[] = [];

    if (current.framework !== available.framework) {
      components.push('framework');
    }
    if (current.runtime !== available.runtime) {
      components.push('runtime');
    }
    if (current.blueprint !== available.blueprint) {
      components.push('blueprint');
    }

    return components;
  }
}
