/**
 * Types for the Upgrade command
 */

export interface VersionInfo {
  framework: string;
  generator: string;
  runtime: string;
  blueprint: string;
}

export interface UpgradePlan {
  actions: UpgradeAction[];
}

export interface UpgradeAction {
  id: string;
  type: "framework" | "runtime" | "metadata" | "manifest" | "blueprint";
  description: string;
  files?: string[];
}

export interface UpgradeReport {
  status:
    | "no_upgrades"
    | "upgrade_available"
    | "upgrade_applied"
    | "upgrade_failed"
    | "validation_failed";
  current: VersionInfo;
  available?: VersionInfo;
  plan?: UpgradePlan;
  completed?: UpgradeAction[];
  skipped?: UpgradeAction[];
  errors?: string[];
  timestamp: string;
}

export interface UpgradeOptions {
  check?: boolean;
  plan?: boolean;
  apply?: boolean;
  dryRun?: boolean;
  json?: boolean;
  verbose?: boolean;
  help?: boolean;
}
