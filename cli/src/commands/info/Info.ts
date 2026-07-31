/**
 * Info: Information gathering engine
 */

import { join } from 'path';
import { InfoReport, ProjectInfo, VersionInfo } from './types.js';
import { ProjectLocator } from '../doctor/ProjectLocator.js';
import { MetadataLoader } from './MetadataLoader.js';
import { ManifestLoader } from './ManifestLoader.js';

export class Info {
  private projectLocator: ProjectLocator;
  private metadataLoader: MetadataLoader;
  private manifestLoader: ManifestLoader;

  constructor() {
    this.projectLocator = new ProjectLocator();
    this.metadataLoader = new MetadataLoader();
    this.manifestLoader = new ManifestLoader();
  }

  gather(startPath?: string): InfoReport | null {
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

    // Load manifest
    const manifest = this.manifestLoader.load(projectPath);

    // Extract project info
    const project: ProjectInfo = {
      name: buildosJson.project || 'Unknown',
      repository: buildosJson.repository || undefined,
      generatedAt: manifest?.generatedAt || undefined,
    };

    // Extract version info
    const versions: VersionInfo = {
      framework: buildosJson.frameworkVersion || 'unknown',
      generator: buildosJson.generatorVersion || 'unknown',
      runtime: buildosJson.runtimeVersion || 'unknown',
      blueprint: buildosJson.blueprintVersion || 'unknown',
    };

    // Extract assets from manifest
    const assets = (manifest?.assets || []) as string[];

    const report: InfoReport = {
      project,
      versions,
      assets,
      timestamp: new Date().toISOString(),
    };

    // Add verbose info
    report.verbose = {
      buildosJson,
      manifest: manifest || undefined,
    };

    return report;
  }
}
