/**
 * UpgradeExecutor: Execute upgrade plan
 */

import { UpgradePlan, UpgradeAction, VersionInfo } from './types.js';

export class UpgradeExecutor {
  async execute(
    projectPath: string,
    plan: UpgradePlan,
    currentVersions: VersionInfo,
    availableVersions: VersionInfo,
    dryRun: boolean = false
  ): Promise<{ completed: UpgradeAction[]; skipped: UpgradeAction[]; errors: string[] }> {
    const completed: UpgradeAction[] = [];
    const skipped: UpgradeAction[] = [];
    const errors: string[] = [];

    for (const action of plan.actions) {
      try {
        // In v1.1.0, we don't have actual upgrade logic yet
        // This is the infrastructure for future upgrades
        if (dryRun) {
          // Dry-run: simulate the action
          skipped.push(action);
        } else {
          // For now, all upgrade actions are skipped in v1.1.0
          // since there are no upgrades available yet
          skipped.push(action);
        }
      } catch (err) {
        errors.push(`Failed to execute ${action.id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    return { completed, skipped, errors };
  }
}
