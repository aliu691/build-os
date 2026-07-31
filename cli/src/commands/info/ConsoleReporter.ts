/**
 * ConsoleReporter: Format info report for console output
 */

import { InfoReport } from './types.js';

export class ConsoleReporter {
  report(report: InfoReport, verbose: boolean = false): void {
    console.log('\nBuildOS Project Information\n');

    // Project section
    console.log('Project');
    console.log(`  Name: ${report.project.name}`);
    if (report.project.repository) {
      console.log(`  Repository: ${report.project.repository}`);
    }
    if (report.project.generatedAt) {
      console.log(`  Generated: ${report.project.generatedAt.split('T')[0]}`);
    }
    console.log();

    // Versions section
    console.log('Versions');
    console.log(`  Framework: ${report.versions.framework}`);
    console.log(`  Generator: ${report.versions.generator}`);
    console.log(`  Runtime: ${report.versions.runtime}`);
    console.log(`  Blueprint: ${report.versions.blueprint}`);
    console.log();

    // Assets section
    if (report.assets.length > 0) {
      console.log('Assets');
      for (const asset of report.assets) {
        console.log(`  ✓ ${asset}`);
      }
      console.log();
    }

    if (verbose) {
      this.printVerbose(report);
    }
  }

  private printVerbose(report: InfoReport): void {
    console.log('Verbose Information');
    console.log();

    if (report.verbose?.buildosJson) {
      console.log('Project Configuration (buildos.json):');
      console.log(JSON.stringify(report.verbose.buildosJson, null, 2));
      console.log();
    }

    if (report.verbose?.manifest) {
      console.log('Generation Manifest:');
      console.log(JSON.stringify(report.verbose.manifest, null, 2));
      console.log();
    }
  }
}
