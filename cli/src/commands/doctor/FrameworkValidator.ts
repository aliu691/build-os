/**
 * FrameworkValidator: Validates framework snapshot integrity
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { Finding, ValidationContext } from './types.js';

export class FrameworkValidator {
  validate(context: ValidationContext): Finding[] {
    const findings: Finding[] = [];

    const frameworkPath = join(context.projectPath, 'buildos', 'framework');

    // Check if framework directory exists
    if (!existsSync(frameworkPath)) {
      findings.push({
        severity: 'error',
        category: 'framework',
        message: 'Framework directory not found',
        details: `Expected at ${frameworkPath}`,
      });
      return findings;
    }

    findings.push({
      severity: 'pass',
      category: 'framework',
      message: 'Framework directory found',
    });

    // Check for critical framework files
    const criticalFiles = ['constitution.md', 'workflow.md', 'artifact-governance.md', 'continuity.md'];

    let missingFiles = 0;
    for (const file of criticalFiles) {
      const filePath = join(frameworkPath, file);
      if (!existsSync(filePath)) {
        findings.push({
          severity: 'error',
          category: 'framework',
          message: `Critical framework file missing: ${file}`,
          details: `Expected at ${filePath}`,
        });
        missingFiles++;
      }
    }

    if (missingFiles === 0) {
      findings.push({
        severity: 'pass',
        category: 'framework',
        message: 'All critical framework files present',
      });
    }

    // Check for framework directories
    const frameworkDirs = ['roles', 'prompts', 'templates'];
    let missingDirs = 0;

    for (const dir of frameworkDirs) {
      const dirPath = join(frameworkPath, dir);
      if (!existsSync(dirPath)) {
        findings.push({
          severity: 'warning',
          category: 'framework',
          message: `Framework directory missing: ${dir}`,
          details: `Expected at ${dirPath}`,
        });
        missingDirs++;
      }
    }

    if (missingDirs === 0) {
      findings.push({
        severity: 'pass',
        category: 'framework',
        message: 'All framework directories present',
      });
    }

    return findings;
  }
}
