/**
 * MetadataValidator: Validates buildos.json content
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Finding, ValidationContext } from './types.js';

export class MetadataValidator {
  validate(context: ValidationContext): Finding[] {
    const findings: Finding[] = [];

    // Check if buildos.json exists
    if (!existsSync(context.buildosJsonPath)) {
      findings.push({
        severity: 'error',
        category: 'metadata',
        message: 'buildos.json not found',
        details: `Expected at ${context.buildosJsonPath}`,
      });
      return findings;
    }

    findings.push({
      severity: 'pass',
      category: 'metadata',
      message: 'buildos.json found',
    });

    // Try to parse buildos.json
    try {
      const content = readFileSync(context.buildosJsonPath, 'utf-8');
      context.buildosJson = JSON.parse(content);
    } catch (err) {
      findings.push({
        severity: 'error',
        category: 'metadata',
        message: 'buildos.json is invalid JSON',
        details: err instanceof Error ? err.message : String(err),
      });
      return findings;
    }

    // Validate required fields
    const requiredFields = ['framework', 'frameworkVersion', 'runtimeVersion', 'generatorVersion', 'blueprintVersion'];

    for (const field of requiredFields) {
      if (!(field in context.buildosJson!)) {
        findings.push({
          severity: 'error',
          category: 'metadata',
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Validate field values are non-empty strings
    for (const field of requiredFields) {
      if (field in context.buildosJson! && typeof context.buildosJson![field] !== 'string') {
        findings.push({
          severity: 'error',
          category: 'metadata',
          message: `Field ${field} must be a string`,
        });
      }
    }

    if (findings.every((f) => f.severity !== 'error')) {
      findings.push({
        severity: 'pass',
        category: 'metadata',
        message: 'All required metadata fields present',
      });
    }

    return findings;
  }
}
