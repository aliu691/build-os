/**
 * Upgrade Command: Upgrade BuildOS projects
 */

import { Upgrade } from './upgrade/Upgrade.js';
import { ConsoleReporter } from './upgrade/ConsoleReporter.js';
import { JsonReporter } from './upgrade/JsonReporter.js';
import { UpgradeOptions } from './upgrade/types.js';

export function displayUpgradeHelp(): void {
  console.log(`
buildos upgrade - Upgrade BuildOS projects

USAGE:
  buildos upgrade [options]

OPTIONS:
  --check          Check if upgrades are available (default)
  --plan           Plan the upgrade without applying
  --apply          Apply the upgrade
  --dry-run        Simulate upgrade without writing files
  --json           Output in JSON format (for automation)
  --verbose, -v    Show detailed information
  --help, -h       Display this help

EXAMPLES:
  # Check for available upgrades
  buildos upgrade

  # Plan an upgrade
  buildos upgrade --plan

  # Simulate an upgrade
  buildos upgrade --dry-run

  # Apply an upgrade
  buildos upgrade --apply

  # Get JSON output
  buildos upgrade --json

EXIT CODES:
  0 - Success or no upgrades required
  1 - Upgrade failed
  2 - Upgrade available
  3 - Validation failed

The upgrade command:
  • Checks for available BuildOS versions
  • Creates an upgrade plan
  • Validates project integrity
  • Safely applies upgrades
  • Never modifies files without --apply

For more information:
  https://github.com/anthropics/build-os
`);
}

export async function executeUpgrade(options: UpgradeOptions): Promise<number> {
  try {
    if (options.help) {
      displayUpgradeHelp();
      return 0;
    }

    const upgrade = new Upgrade();

    // Determine what action to perform
    const performApply = options.apply || false;
    const performPlan = options.plan || false;
    const performCheck = options.check || (!performApply && !performPlan);
    const dryRun = options.dryRun || false;

    let report;

    if (performApply) {
      report = await upgrade.apply(undefined, dryRun);
    } else if (performPlan) {
      report = await upgrade.plan();
    } else {
      report = await upgrade.check();
    }

    if (!report) {
      console.error('✗ Not inside a BuildOS project.');
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
    if (report.status === 'validation_failed') {
      return 3;
    } else if (report.status === 'upgrade_failed') {
      return 1;
    } else if (report.status === 'upgrade_available') {
      return 2;
    }
    return 0;
  } catch (err) {
    console.error('✗ Unexpected error during upgrade');
    console.error(err instanceof Error ? err.message : String(err));
    return 1;
  }
}
