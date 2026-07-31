/**
 * ConsoleReporter: Format upgrade report for console
 */

import { UpgradeReport } from './types.js';

export class ConsoleReporter {
  report(report: UpgradeReport, verbose: boolean = false): void {
    console.log('\nBuildOS Upgrade\n');

    // Current versions
    console.log('Current');
    console.log(`  Framework: ${report.current.framework}`);
    console.log(`  Generator: ${report.current.generator}`);
    console.log(`  Runtime: ${report.current.runtime}`);
    console.log(`  Blueprint: ${report.current.blueprint}`);
    console.log();

    if (report.available) {
      console.log('Available');
      console.log(`  Framework: ${report.available.framework}`);
      console.log(`  Generator: ${report.available.generator}`);
      console.log(`  Runtime: ${report.available.runtime}`);
      console.log(`  Blueprint: ${report.available.blueprint}`);
      console.log();
    }

    // Plan
    if (report.plan && report.plan.actions.length > 0) {
      console.log('Plan');
      for (const action of report.plan.actions) {
        console.log(`  ✓ ${action.description}`);
      }
      console.log();
    }

    // Status
    console.log('Status');
    switch (report.status) {
      case 'no_upgrades':
        console.log('  ✓ Project is up to date');
        break;
      case 'upgrade_available':
        console.log('  ⚠ Upgrade Available');
        break;
      case 'upgrade_applied':
        console.log('  ✓ Upgrade Applied Successfully');
        break;
      case 'upgrade_failed':
        console.log('  ✗ Upgrade Failed');
        break;
      case 'validation_failed':
        console.log('  ✗ Validation Failed');
        break;
    }
    console.log();

    if (report.errors && report.errors.length > 0) {
      console.log('Errors');
      for (const error of report.errors) {
        console.log(`  ✗ ${error}`);
      }
      console.log();
    }

    if (verbose) {
      this.printVerbose(report);
    }
  }

  private printVerbose(report: UpgradeReport): void {
    console.log('Verbose Information');
    console.log(`  Timestamp: ${report.timestamp}`);
    if (report.plan) {
      console.log(`  Actions: ${report.plan.actions.length}`);
    }
    if (report.completed) {
      console.log(`  Completed: ${report.completed.length}`);
    }
    if (report.skipped) {
      console.log(`  Skipped: ${report.skipped.length}`);
    }
    console.log();
  }
}
