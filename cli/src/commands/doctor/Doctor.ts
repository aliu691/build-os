/**
 * Doctor: Main diagnostic engine
 */

import { join } from 'path';
import { DoctorReport, Finding, ValidationContext } from './types.js';
import { ProjectLocator } from './ProjectLocator.js';
import { MetadataValidator } from './MetadataValidator.js';
import { FrameworkValidator } from './FrameworkValidator.js';
import { ManifestValidator } from './ManifestValidator.js';
import { AssetValidator } from './AssetValidator.js';

export class Doctor {
  private projectLocator: ProjectLocator;
  private metadataValidator: MetadataValidator;
  private frameworkValidator: FrameworkValidator;
  private manifestValidator: ManifestValidator;
  private assetValidator: AssetValidator;

  constructor() {
    this.projectLocator = new ProjectLocator();
    this.metadataValidator = new MetadataValidator();
    this.frameworkValidator = new FrameworkValidator();
    this.manifestValidator = new ManifestValidator();
    this.assetValidator = new AssetValidator();
  }

  diagnose(startPath?: string): DoctorReport | null {
    // Locate BuildOS project
    const projectPath = this.projectLocator.locate(startPath);

    if (!projectPath) {
      return null;
    }

    // Create validation context
    const context: ValidationContext = {
      projectPath,
      buildosJsonPath: join(projectPath, 'buildos', 'buildos.json'),
      manifestPath: join(projectPath, 'buildos', 'generation-manifest.json'),
      frameworkPath: join(projectPath, 'buildos', 'framework'),
      runtimePath: join(projectPath, 'buildos'),
    };

    // Collect all findings
    const findings: Finding[] = [];

    findings.push(...this.metadataValidator.validate(context));
    findings.push(...this.frameworkValidator.validate(context));
    findings.push(...this.manifestValidator.validate(context));
    findings.push(...this.assetValidator.validate(context));

    // Calculate summary
    const passed = findings.filter((f) => f.severity === 'pass').length;
    const warnings = findings.filter((f) => f.severity === 'warning').length;
    const errors = findings.filter((f) => f.severity === 'error').length;
    const checks = findings.length;

    // Determine status
    let status: 'healthy' | 'healthy-with-warnings' | 'errors-detected' = 'healthy';
    if (errors > 0) {
      status = 'errors-detected';
    } else if (warnings > 0) {
      status = 'healthy-with-warnings';
    }

    // Extract version info
    const report: DoctorReport = {
      status,
      projectPath,
      checks,
      passed,
      warnings,
      errors,
      frameworkVersion: context.buildosJson?.frameworkVersion,
      generatorVersion: context.buildosJson?.generatorVersion,
      runtimeVersion: context.buildosJson?.runtimeVersion,
      blueprintVersion: context.buildosJson?.blueprintVersion,
      findings,
      timestamp: new Date().toISOString(),
    };

    return report;
  }
}
