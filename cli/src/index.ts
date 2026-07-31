#!/usr/bin/env node

/**
 * BuildOS CLI
 * Main entry point for the command-line interface
 */

import { ArgumentParser } from './parser/ArgumentParser.js';
import { displayVersion } from './commands/version.js';
import { displayHelp } from './commands/help.js';
import { executeNew } from './commands/new.js';
import { executeDoctor, displayDoctorHelp } from './commands/doctor.js';
import { executeInfo, displayInfoHelp } from './commands/info.js';
import { executeUpgrade, displayUpgradeHelp } from './commands/upgrade.js';

async function main(): Promise<void> {
  try {
    // Parse command-line arguments
    const parser = new ArgumentParser();
    const { args, error } = parser.parse(process.argv);

    if (error) {
      console.error(`✗ ${error.message}\n`);
      process.exit(1);
    }

    // Handle version flag
    if (args.version) {
      displayVersion();
      process.exit(0);
    }

    // Handle help flag
    if (args.help) {
      displayHelp(args.command);
      process.exit(0);
    }

    // Extract doctor-specific options from args
    const doctorOptions = {
      verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
      json: process.argv.includes('--json'),
      help: process.argv.includes('--help') || process.argv.includes('-h'),
    };

    // Default to 'new' command if no command specified
    const command = args.command || 'new';

    // Route to appropriate command
    if (command === 'new') {
      if (!args.projectName) {
        console.error('✗ Project name is required\n');
        displayHelp('new');
        process.exit(1);
      }

      // Validate project name
      const nameValidation = parser.validateProjectName(args.projectName);
      if (!nameValidation.valid) {
        console.error(`✗ ${nameValidation.error}\n`);
        displayHelp('new');
        process.exit(1);
      }

      // Execute the 'new' command
      const exitCode = await executeNew({
        projectName: args.projectName,
        blueprint: args.blueprint,
        destination: args.destination,
        repository: args.repository,
      });

      process.exit(exitCode);
    } else if (command === 'doctor') {
      // Execute the 'doctor' command
      const exitCode = await executeDoctor(doctorOptions);
      process.exit(exitCode);
    } else if (command === 'info') {
      // Extract info-specific options
      const infoOptions = {
        verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
        json: process.argv.includes('--json'),
        help: process.argv.includes('--help') || process.argv.includes('-h'),
      };
      // Execute the 'info' command
      const exitCode = await executeInfo(infoOptions);
      process.exit(exitCode);
    } else if (command === 'upgrade') {
      // Extract upgrade-specific options
      const upgradeOptions = {
        check: process.argv.includes('--check'),
        plan: process.argv.includes('--plan'),
        apply: process.argv.includes('--apply'),
        dryRun: process.argv.includes('--dry-run'),
        json: process.argv.includes('--json'),
        verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
        help: process.argv.includes('--help') || process.argv.includes('-h'),
      };
      // Execute the 'upgrade' command
      const exitCode = await executeUpgrade(upgradeOptions);
      process.exit(exitCode);
    } else {
      console.error(`✗ Unknown command: ${command}\n`);
      displayHelp();
      process.exit(1);
    }
  } catch (err) {
    console.error('✗ Unexpected error:');
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

main();
