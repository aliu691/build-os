/**
 * ConsoleReporter: Formats diagnostic report for console output
 */

import { DoctorReport } from "./types.js";

export class ConsoleReporter {
  report(report: DoctorReport, verbose: boolean = false): void {
    // Print status
    this.printStatus(report);

    // Print findings by severity
    this.printFindings(report);

    // Print summary
    this.printSummary(report);

    // Print versions
    this.printVersions(report);

    if (this.verbose) {
      this.printVerbose(report);
    }
  }

  private printStatus(report: DoctorReport): void {
    console.log();
    const statusText =
      report.status === "healthy"
        ? "✓ Healthy"
        : report.status === "healthy-with-warnings"
          ? "⚠ Healthy with Warnings"
          : "✗ Errors Detected";

    console.log(statusText);
    console.log();
  }

  private printFindings(report: DoctorReport): void {
    // Group findings by category
    const byCategory: Record<string, DoctorReport["findings"]> = {};

    for (const finding of report.findings) {
      if (!byCategory[finding.category]) {
        byCategory[finding.category] = [];
      }
      byCategory[finding.category].push(finding);
    }

    // Print errors first
    if (report.errors > 0) {
      console.log("Errors:");
      const errorFindings = report.findings.filter(
        (f) => f.severity === "error",
      );
      for (const finding of errorFindings) {
        console.log(`  ✗ ${finding.message}`);
        if (finding.details) {
          console.log(`    ${finding.details}`);
        }
      }
      console.log();
    }

    // Then warnings
    if (report.warnings > 0) {
      console.log("Warnings:");
      const warningFindings = report.findings.filter(
        (f) => f.severity === "warning",
      );
      for (const finding of warningFindings) {
        console.log(`  ⚠ ${finding.message}`);
        if (finding.details) {
          console.log(`    ${finding.details}`);
        }
      }
      console.log();
    }

    // Then passes
    if (
      report.passed > 0 &&
      (this.verbose || report.errors > 0 || report.warnings > 0)
    ) {
      console.log("Passed:");
      const passFindings = report.findings.filter((f) => f.severity === "pass");
      for (const finding of passFindings.slice(0, 5)) {
        // Show only first 5 passes by default
        console.log(`  ✓ ${finding.message}`);
      }
      if (passFindings.length > 5) {
        console.log(`  ... and ${passFindings.length - 5} more checks passed`);
      }
      console.log();
    }
  }

  private printSummary(report: DoctorReport): void {
    console.log("Summary:");
    console.log(`  Checks: ${report.checks}`);
    console.log(`  Passed: ${report.passed}`);
    if (report.warnings > 0) {
      console.log(`  Warnings: ${report.warnings}`);
    }
    if (report.errors > 0) {
      console.log(`  Errors: ${report.errors}`);
    }
    console.log();
  }

  private printVersions(report: DoctorReport): void {
    console.log("Project Information:");
    console.log(`  Framework: ${report.frameworkVersion || "unknown"}`);
    console.log(`  Generator: ${report.generatorVersion || "unknown"}`);
    console.log(`  Runtime: ${report.runtimeVersion || "unknown"}`);
    console.log(`  Blueprint: ${report.blueprintVersion || "unknown"}`);
    console.log();
  }

  private verbose = false;

  private printVerbose(report: DoctorReport): void {
    console.log("Verbose Output:");
    console.log(`  Project Path: ${report.projectPath}`);
    console.log(`  Timestamp: ${report.timestamp}`);
    console.log();
  }
}
