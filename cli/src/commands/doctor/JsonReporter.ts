/**
 * JsonReporter: Formats diagnostic report as JSON
 */

import { DoctorReport } from './types.js';

export class JsonReporter {
  report(report: DoctorReport): string {
    // Create a clean JSON object for output
    const output = {
      status: report.status,
      checks: report.checks,
      passed: report.passed,
      warnings: report.warnings,
      errors: report.errors,
      frameworkVersion: report.frameworkVersion,
      generatorVersion: report.generatorVersion,
      runtimeVersion: report.runtimeVersion,
      blueprintVersion: report.blueprintVersion,
      findings: report.findings.map((f) => ({
        severity: f.severity,
        category: f.category,
        message: f.message,
        details: f.details,
      })),
      timestamp: report.timestamp,
    };

    return JSON.stringify(output, null, 2);
  }

  reportLine(report: DoctorReport): string {
    // Single-line JSON output for scripting
    return JSON.stringify({
      status: report.status,
      checks: report.checks,
      passed: report.passed,
      warnings: report.warnings,
      errors: report.errors,
      timestamp: report.timestamp,
    });
  }
}
