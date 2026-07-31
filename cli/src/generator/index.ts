/**
 * BuildOS Generator - Public API
 *
 * Exports the core Generator and types for building BuildOS projects
 */

export { Generator } from './Generator';
export { Validator } from './Validator';
export { BlueprintLoader } from './BlueprintLoader';
export { FrameworkLoader } from './FrameworkLoader';
export { RuntimeLoader } from './RuntimeLoader';
export { MetadataGenerator } from './MetadataGenerator';
export { FileAssembler } from './FileAssembler';

export type {
  GeneratorConfig,
  GenerationResult,
  GenerationError,
  VersionMetadata,
  ValidationResult,
  BlueprintAssets,
  FrameworkAssets,
  RuntimeAssets,
  LoaderResult,
} from './types';

export { ErrorCode } from './types';
