/**
 * Core types for BuildOS Generator
 */

export interface GeneratorConfig {
  projectName: string;
  blueprintName: string;
  destinationPath: string;
  frameworkPath: string;
  runtimePath: string;
  blueprintPath: string;
}

export interface VersionMetadata {
  framework: string;
  frameworkVersion: string;
  frameworkCommit: string;
  runtimeVersion: string;
  blueprintName: string;
  blueprintVersion: string;
  generatorVersion: string;
  project: string;
  repository: string;
}

export interface GenerationResult {
  success: boolean;
  projectPath: string;
  message: string;
  metadata?: VersionMetadata;
  error?: GenerationError;
}

export interface GenerationError {
  code: ErrorCode;
  message: string;
  details?: string;
}

export enum ErrorCode {
  MISSING_FRAMEWORK = 'MISSING_FRAMEWORK',
  MISSING_BLUEPRINT = 'MISSING_BLUEPRINT',
  MISSING_RUNTIME = 'MISSING_RUNTIME',
  INVALID_DESTINATION = 'INVALID_DESTINATION',
  FAILED_FILE_COPY = 'FAILED_FILE_COPY',
  INVALID_METADATA = 'INVALID_METADATA',
  INVALID_PROJECT_NAME = 'INVALID_PROJECT_NAME',
  DESTINATION_EXISTS = 'DESTINATION_EXISTS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface LoaderResult<T> {
  success: boolean;
  data?: T;
  error?: GenerationError;
}

export interface BlueprintAssets {
  path: string;
  name: string;
  version: string;
  directories: string[];
  files: Map<string, string>;
}

export interface FrameworkAssets {
  path: string;
  version: string;
  commit: string;
  files: Map<string, string>;
}

export interface RuntimeAssets {
  path: string;
  version: string;
  files: Map<string, string>;
}

export interface ValidationResult {
  valid: boolean;
  errors: GenerationError[];
}
