/**
 * Upgrade: Main upgrade engine
 */

import { join } from 'path';
import { UpgradeReport, VersionInfo } from './types.js';
import { ProjectLocator } from '../doctor/ProjectLocator.js';
import { MetadataLoader } from '../info/MetadataLoader.js';
import { ManifestLoader } from '../info/ManifestLoader.js';
import { UpgradeDiscovery } from './UpgradeDiscovery.js';
import { UpgradePlanner } from './UpgradePlanner.js';
import { UpgradeExecutor } from './UpgradeExecutor.js';

export class Upgrade {
  private projectLocator: ProjectLocator;
  private metadataLoader: MetadataLoader;
  private manifestLoader: ManifestLoader;
  private discovery: UpgradeDiscovery;
  private planner: UpgradePlanner;
  private executor: UpgradeExecutor;

  constructor() {
    this.projectLocator = new ProjectLocator();
    this.metadataLoader = new MetadataLoader();
    this.manifestLoader = new ManifestLoader();
    this.discovery = new UpgradeDiscovery();
    this.planner = new UpgradePlanner();
    this.executor = new UpgradeExecutor();
  }

  async check(startPath?: string): Promise<UpgradeReport | null> {
    // Locate project
    const projectPath = this.projectLocator.locate(startPath);
    if (!projectPath) {
      return null;
    }

    // Load metadata
    const buildosJson = this.metadataLoader.load(projectPath);
    if (!buildosJson) {
      return null;
    }

    // Get current versions
    const current: VersionInfo = {
      framework: buildosJson.frameworkVersion || '1.0.0',
      generator: buildosJson.generatorVersion || '1.0.0',
      runtime: buildosJson.runtimeVersion || '1.0.0',
      blueprint: buildosJson.blueprintVersion || 'saas-1.0.0',
    };

    // Discover available upgrades
    const available = this.discovery.discoverAvailableVersions();

    // Determine if upgrades are available
    const hasUpgrades = this.discovery.hasUpgrades(current, available);

    return {
      status: hasUpgrades ? 'upgrade_available' : 'no_upgrades',
      current,
      available: hasUpgrades ? available : undefined,
      timestamp: new Date().toISOString(),
    };
  }

  async plan(startPath?: string): Promise<UpgradeReport | null> {
    const checkReport = await this.check(startPath);
    if (!checkReport || checkReport.status === 'no_upgrades') {
      return checkReport;
    }

    // Get project path for planning
    const projectPath = this.projectLocator.locate(startPath);
    if (!projectPath) {
      return checkReport;
    }

    // Determine components to upgrade
    const componentsToUpgrade = this.discovery.getComponentsToUpgrade(checkReport.current, checkReport.available!);

    // Create upgrade plan
    const upgradePlan = this.planner.createPlan(componentsToUpgrade, checkReport.current, checkReport.available!);

    return {
      ...checkReport,
      plan: upgradePlan,
    };
  }

  async apply(startPath?: string, dryRun: boolean = false): Promise<UpgradeReport | null> {
    const planReport = await this.plan(startPath);
    if (!planReport || planReport.status === 'no_upgrades') {
      return planReport;
    }

    const projectPath = this.projectLocator.locate(startPath);
    if (!projectPath) {
      return planReport;
    }

    // Execute the plan
    const result = await this.executor.execute(
      projectPath,
      planReport.plan!,
      planReport.current,
      planReport.available!,
      dryRun
    );

    return {
      ...planReport,
      status: result.errors.length > 0 ? 'upgrade_failed' : dryRun ? 'upgrade_available' : 'upgrade_applied',
      completed: result.completed,
      skipped: result.skipped,
      errors: result.errors.length > 0 ? result.errors : undefined,
    };
  }
}
