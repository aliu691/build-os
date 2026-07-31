/**
 * Info Command: Display BuildOS project information
 */

import { Info } from './info/Info.js';
import { ConsoleReporter } from './info/ConsoleReporter.js';
import { JsonReporter } from './info/JsonReporter.js';
import { InfoOptions } from './info/types.js';

export function displayInfoHelp(): void {
  console.log(`
buildos info - Display BuildOS project information

USAGE:
  buildos info [options]

OPTIONS:
  --verbose, -v     Show complete metadata and manifest
  --json           Output in JSON format (for automation)
  --help, -h       Display this help

EXAMPLES:
  # Display project information
  buildos info

  # Show detailed metadata
  buildos info --verbose

  # Get JSON output for automation
  buildos info --json

  # Pipe JSON to jq for processing
  buildos info --json | jq '.versions'

EXIT CODES:
  0 - Successfully displayed project information
  1 - Not inside a BuildOS project or metadata not found

The info command displays:
  • Project name and repository
  • Framework, generator, runtime, and blueprint versions
  • List of generated assets
  • Generation timestamp

The info command is read-only and informational only.
It never modifies project files.

For more information:
  https://github.com/anthropics/build-os
`);
}

export async function executeInfo(options: InfoOptions): Promise<number> {
  try {
    // Show help if requested
    if (options.help) {
      displayInfoHelp();
      return 0;
    }

    // Gather information
    const info = new Info();
    const report = info.gather();

    if (!report) {
      console.error('✗ Not inside a BuildOS project.');
      console.error();
      console.error('This command must be run from within a BuildOS project directory.');
      console.error('Look for a buildos/ folder with buildos.json inside.');
      console.error();
      return 1;
    }

    // Report information
    if (options.json) {
      const jsonReporter = new JsonReporter();
      console.log(jsonReporter.report(report));
    } else {
      const consoleReporter = new ConsoleReporter();
      consoleReporter.report(report, options.verbose || false);
    }

    return 0;
  } catch (err) {
    console.error('✗ Unexpected error while gathering project information');
    console.error(err instanceof Error ? err.message : String(err));
    return 1;
  }
}
