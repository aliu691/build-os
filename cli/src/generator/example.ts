/**
 * Example: Using the BuildOS Generator
 *
 * This demonstrates how future CLI commands will use the Generator library
 * to create BuildOS projects.
 */

import { Generator, GeneratorConfig } from './index';
import { resolve } from 'path';

async function exampleUsage() {
  // Configuration for project generation
  const config: GeneratorConfig = {
    projectName: 'my-app',
    blueprintName: 'saas',
    destinationPath: '/path/to/my-app',
    frameworkPath: resolve(__dirname, '../../..', 'framework'),
    runtimePath: resolve(__dirname, '../../..', 'runtime'),
    blueprintPath: resolve(__dirname, '../../..', 'blueprints', 'saas'),
  };

  // Create generator instance
  const generator = new Generator();

  // Generate the project
  const result = await generator.generate(config);

  if (result.success) {
    console.log(`✓ Project created successfully`);
    console.log(`  Path: ${result.projectPath}`);
    console.log(`  Framework: ${result.metadata?.frameworkVersion}`);
    console.log(`  Blueprint: ${result.metadata?.blueprintName}`);
  } else {
    console.error(`✗ Project generation failed`);
    console.error(`  Error: ${result.error?.message}`);
    if (result.error?.details) {
      console.error(`  Details: ${result.error.details}`);
    }
  }
}

// Export for testing
export { exampleUsage };
