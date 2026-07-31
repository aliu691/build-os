/**
 * ManifestValidator: Validates generation manifest
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Finding, ValidationContext } from './types.js';

export class ManifestValidator {
  validate(context: ValidationContext): Finding[] {
    const findings: Finding[] = [];

    const manifestPath = join(context.projectPath, 'buildos', 'generation-manifest.json');

    // Check if manifest exists
    if (!existsSync(manifestPath)) {
      findings.push({
        severity: 'warning',
        category: 'manifest',
        message: 'generation-manifest.json not found',
        details: `Expected at ${manifestPath}`,
      });
      return findings;
    }

    findings.push({
      severity: 'pass',
      category: 'manifest',
      message: 'generation-manifest.json found',
    });

    // Try to parse manifest
    try {
      const content = readFileSync(manifestPath, 'utf-8');
      context.manifest = JSON.parse(content);
    } catch (err) {
      findings.push({
        severity: 'error',
        category: 'manifest',
        message: 'generation-manifest.json is invalid JSON',
        details: err instanceof Error ? err.message : String(err),
      });
      return findings;
    }

    // Validate required fields
    const requiredFields = ['generatorVersion', 'generatedAt', 'framework', 'runtime', 'blueprint', 'project', 'assets'];

    for (const field of requiredFields) {
      if (!(field in context.manifest!)) {
        findings.push({
          severity: 'error',
          category: 'manifest',
          message: `Missing required field in manifest: ${field}`,
        });
      }
    }

    // Validate framework section
    if (context.manifest!.framework) {
      const frameworkSection = context.manifest!.framework;
      if (!frameworkSection.version) {
        findings.push({
          severity: 'error',
          category: 'manifest',
          message: 'Manifest framework.version missing',
        });
      }
      if (!frameworkSection.commit) {
        findings.push({
          severity: 'warning',
          category: 'manifest',
          message: 'Manifest framework.commit missing (required for reproducibility)',
        });
      }
    }

    // Validate assets array
    if (Array.isArray(context.manifest!.assets)) {
      if (context.manifest!.assets.length === 0) {
        findings.push({
          severity: 'warning',
          category: 'manifest',
          message: 'No assets recorded in manifest',
        });
      } else {
        findings.push({
          severity: 'pass',
          category: 'manifest',
          message: `${context.manifest!.assets.length} assets recorded in manifest`,
        });
      }
    } else {
      findings.push({
        severity: 'error',
        category: 'manifest',
        message: 'Manifest assets field is not an array',
      });
    }

    // Version consistency check
    if (context.buildosJson && context.manifest) {
      if (context.buildosJson.frameworkVersion !== context.manifest.framework?.version) {
        findings.push({
          severity: 'warning',
          category: 'manifest',
          message: 'Framework version mismatch between buildos.json and manifest',
          details: `buildos.json: ${context.buildosJson.frameworkVersion}, manifest: ${context.manifest.framework?.version}`,
        });
      }
    }

    if (findings.every((f) => f.severity !== 'error')) {
      findings.push({
        severity: 'pass',
        category: 'manifest',
        message: 'Manifest is valid',
      });
    }

    return findings;
  }
}
