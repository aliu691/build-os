/**
 * Doctor Command: Diagnostic tool for BuildOS projects
 */

import { Doctor } from './doctor/Doctor.js';
import { ConsoleReporter } from './doctor/ConsoleReporter.js';
import { JsonReporter } from './doctor/JsonReporter.js';
import { DoctorOptions } from './doctor/types.js';

export function displayDoctorHelp(): void {
  console.log(`
buildos doctor - Diagnose BuildOS project health

USAGE:
  buildos doctor [options]

OPTIONS:
  --verbose, -v     Show all validation details
  --json           Output in JSON format (for automation)
  --help, -h       Display this help

EXAMPLES:
  # Run basic health check
  buildos doctor

  # Show detailed validation output
  buildos doctor --verbose

  # Get JSON output for automation
  buildos doctor --json

  # Pipe JSON to jq for processing
  buildos doctor --json | jq '.status'

EXIT CODES:
  0 - Project is healthy
  1 - Errors detected
  2 - Warnings detected (but healthy)

The doctor command inspects:
  • buildos.json - Project configuration
  • generation-manifest.json - Generation metadata
  • Framework snapshot - Core BuildOS assets
  • Runtime assets - Project runtime configuration
  • Generated assets - Blueprint-provided structure

The doctor command is read-only and diagnostic only.
It never modifies project files.

For more information:
  https://github.com/anthropics/build-os
`);
}

export async function executeDoctor(options: DoctorOptions): Promise<number> {
  try {
    // Show help if requested
    if (options.help) {
      displayDoctorHelp();
      return 0;
    }

    // Run diagnostics
    const doctor = new Doctor();
    const report = doctor.diagnose();

    if (!report) {
      console.error('✗ Not inside a BuildOS project.');
      console.error();
      console.error('This command must be run from within a BuildOS project directory.');
      console.error('Look for a buildos/ folder with buildos.json inside.');
      console.error();
      return 1;
    }

    // Report findings
    if (options.json) {
      const jsonReporter = new JsonReporter();
      console.log(jsonReporter.report(report));
    } else {
      const consoleReporter = new ConsoleReporter();
      consoleReporter.report(report, options.verbose || false);
    }

    // Return appropriate exit code
    if (report.errors > 0) {
      return 1;
    } else if (report.warnings > 0) {
      return 2;
    }
    return 0;
  } catch (err) {
    console.error('✗ Unexpected error during diagnosis');
    console.error(err instanceof Error ? err.message : String(err));
    return 1;
  }
}
