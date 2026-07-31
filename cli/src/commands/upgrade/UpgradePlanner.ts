/**
 * UpgradePlanner: Create an upgrade plan
 */

import { VersionInfo, UpgradePlan, UpgradeAction } from './types.js';

export class UpgradePlanner {
  createPlan(componentsToUpgrade: string[], currentVersions: VersionInfo, availableVersions: VersionInfo): UpgradePlan {
    const actions: UpgradeAction[] = [];

    if (componentsToUpgrade.includes('framework')) {
      actions.push({
        id: 'upgrade-framework',
        type: 'framework',
        description: `Update framework snapshot from ${currentVersions.framework} to ${availableVersions.framework}`,
        files: ['buildos/framework/*'],
      });
    }

    if (componentsToUpgrade.includes('runtime')) {
      actions.push({
        id: 'upgrade-runtime',
        type: 'runtime',
        description: `Update runtime assets from ${currentVersions.runtime} to ${availableVersions.runtime}`,
        files: ['buildos/instructions.md', 'buildos/buildos.json'],
      });
    }

    if (componentsToUpgrade.includes('blueprint')) {
      actions.push({
        id: 'update-blueprint-metadata',
        type: 'blueprint',
        description: `Update blueprint metadata to ${availableVersions.blueprint}`,
        files: ['buildos/buildos.json'],
      });
    }

    // Always update manifest
    if (actions.length > 0) {
      actions.push({
        id: 'update-manifest',
        type: 'manifest',
        description: 'Update generation manifest with new versions',
        files: ['buildos/generation-manifest.json'],
      });
    }

    return { actions };
  }
}
