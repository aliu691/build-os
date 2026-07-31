/**
 * Validator: Ensures all required assets exist and configuration is valid
 */

import { existsSync, statSync } from 'fs';
import { dirname } from 'path';
import { GeneratorConfig, ValidationResult, GenerationError, ErrorCode } from './types';

export class Validator {
  validate(config: GeneratorConfig): ValidationResult {
    const errors: GenerationError[] = [];

    // Validate project name
    if (!this.isValidProjectName(config.projectName)) {
      errors.push({
        code: ErrorCode.INVALID_PROJECT_NAME,
        message: `Invalid project name: "${config.projectName}"`,
        details: 'Project name must contain only lowercase letters, numbers, hyphens, and underscores',
      });
    }

    // Validate framework exists
    if (!existsSync(config.frameworkPath)) {
      errors.push({
        code: ErrorCode.MISSING_FRAMEWORK,
        message: 'BuildOS framework not found',
        details: `Framework path does not exist: ${config.frameworkPath}`,
      });
    } else if (!this.hasRequiredFrameworkFiles(config.frameworkPath)) {
      errors.push({
        code: ErrorCode.MISSING_FRAMEWORK,
        message: 'BuildOS framework is incomplete',
        details: 'Missing required framework files (constitution.md, workflow.md, etc)',
      });
    }

    // Validate blueprint exists
    if (!existsSync(config.blueprintPath)) {
      errors.push({
        code: ErrorCode.MISSING_BLUEPRINT,
        message: `Blueprint not found: "${config.blueprintName}"`,
        details: `Blueprint path does not exist: ${config.blueprintPath}`,
      });
    }

    // Validate runtime exists
    if (!existsSync(config.runtimePath)) {
      errors.push({
        code: ErrorCode.MISSING_RUNTIME,
        message: 'BuildOS runtime not found',
        details: `Runtime path does not exist: ${config.runtimePath}`,
      });
    }

    // Validate destination
    const destValidation = this.validateDestination(config.destinationPath);
    if (!destValidation.valid) {
      errors.push(...destValidation.errors);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private isValidProjectName(name: string): boolean {
    // Valid: lowercase, numbers, hyphens, underscores
    // Must start with letter
    const projectNameRegex = /^[a-z][a-z0-9_-]*$/;
    return projectNameRegex.test(name) && name.length > 0 && name.length <= 100;
  }

  private hasRequiredFrameworkFiles(frameworkPath: string): boolean {
    const requiredFiles = [
      'constitution.md',
      'workflow.md',
      'artifact-governance.md',
      'continuity.md',
      'roles',
      'prompts',
      'templates',
    ];

    for (const file of requiredFiles) {
      const fullPath = `${frameworkPath}/${file}`;
      if (!existsSync(fullPath)) {
        return false;
      }
    }

    return true;
  }

  private validateDestination(destinationPath: string): ValidationResult {
    const errors: GenerationError[] = [];

    // Check if destination exists
    if (existsSync(destinationPath)) {
      errors.push({
        code: ErrorCode.DESTINATION_EXISTS,
        message: 'Destination directory already exists',
        details: `Cannot create project at ${destinationPath}: directory already exists`,
      });
    }

    // Check if parent directory exists and is writable
    const parentDir = dirname(destinationPath);
    if (!existsSync(parentDir)) {
      errors.push({
        code: ErrorCode.INVALID_DESTINATION,
        message: 'Parent directory does not exist',
        details: `Cannot create project: parent directory does not exist at ${parentDir}`,
      });
    } else {
      try {
        const stat = statSync(parentDir);
        if (!stat.isDirectory()) {
          errors.push({
            code: ErrorCode.INVALID_DESTINATION,
            message: 'Parent path is not a directory',
            details: `Cannot create project: parent path exists but is not a directory`,
          });
        }
      } catch (err) {
        errors.push({
          code: ErrorCode.INVALID_DESTINATION,
          message: 'Cannot access parent directory',
          details: `Failed to validate parent directory: ${err instanceof Error ? err.message : String(err)}`,
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
