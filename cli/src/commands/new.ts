/**
 * New Command: Create a new BuildOS project
 */

import { resolve, join } from 'path';
import { Generator, GeneratorConfig, GenerationResult, ErrorCode } from '../generator/index.js';
import { getVersion } from './version.js';

interface NewCommandOptions {
  projectName: string;
  blueprint: string;
  destination: string;
  repository: string;
}

export async function executeNew(options: NewCommandOptions): Promise<number> {
  try {
    // Resolve paths
    const destinationPath = resolve(options.destination);
    const projectPath = join(destinationPath, options.projectName);

    // Resolve framework and blueprint paths relative to CLI
    // In production, these would be part of the installed package
    // For now, we reference the repository structure
    const repoRoot = resolve(new URL('.', import.meta.url).pathname, '..', '..', '..');

    const config: GeneratorConfig = {
      projectName: options.projectName,
      blueprintName: options.blueprint,
      destinationPath: projectPath,
      frameworkPath: join(repoRoot, 'framework'),
      runtimePath: join(repoRoot, 'runtime'),
      blueprintPath: join(repoRoot, 'blueprints', options.blueprint),
    };

    // Display progress
    displayProgress('Creating BuildOS project...');
    displayStep('Validating inputs');

    // Create generator instance
    const generator = new Generator();

    // Execute generation
    const result = await generator.generate(config);

    if (!result.success) {
      displayError(result);
      return 1;
    }

    // Display success
    displaySuccess(result, options);
    return 0;
  } catch (err) {
    console.error('\n✗ Unexpected error');
    console.error(err instanceof Error ? err.message : String(err));
    return 1;
  }
}

function displayProgress(message: string): void {
  console.log(`\n${message}\n`);
}

function displayStep(step: string): void {
  console.log(`✓ ${step}`);
}

function displaySuccess(result: GenerationResult, options: NewCommandOptions): void {
  console.log(`\n✓ Project created successfully\n`);

  console.log('Project:');
  console.log(`  ${options.projectName}\n`);

  console.log('Location:');
  console.log(`  ${result.projectPath}\n`);

  console.log('Blueprint:');
  console.log(`  ${options.blueprint}\n`);

  if (result.metadata) {
    console.log('Framework:');
    console.log(`  ${result.metadata.frameworkVersion}\n`);

    console.log('Generator:');
    console.log(`  ${getVersion()}\n`);
  }

  console.log('Next steps:');
  console.log(`  cd ${options.projectName}`);
  console.log(`  git init`);
  console.log(`  git add -A`);
  console.log(`  git commit -m "Initial commit: BuildOS scaffold"\n`);
}

function displayError(result: GenerationResult): void {
  console.log('\n✗ Project creation failed\n');

  if (result.error) {
    console.log(`Error: ${result.error.message}`);

    if (result.error.details) {
      console.log(`Details: ${result.error.details}`);
    }

    // Provide helpful context for common errors
    if (result.error.code === ErrorCode.MISSING_BLUEPRINT) {
      console.log('\nAvailable blueprints:');
      console.log('  • saas');
    }

    if (result.error.code === ErrorCode.INVALID_PROJECT_NAME) {
      console.log('\nProject name must:');
      console.log('  • Start with a letter');
      console.log('  • Contain only lowercase letters, numbers, hyphens, underscores');
      console.log('  • Be 100 characters or fewer');
    }

    if (result.error.code === ErrorCode.DESTINATION_EXISTS) {
      console.log('\nProject directory already exists.');
      console.log('Please choose a different project name or destination.');
    }

    if (result.error.code === ErrorCode.MISSING_FRAMEWORK) {
      console.log('\nBuildOS framework not found.');
      console.log('This usually means BuildOS is not properly installed.');
    }
  } else {
    console.log(result.message);
  }

  console.log();
}
