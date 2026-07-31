/**
 * BuildOS Generator - Public API
 *
 * Exports the core Generator and types for building BuildOS projects
 */

export { Generator } from './Generator.js';
export { Validator } from './Validator.js';
export { BlueprintLoader } from './BlueprintLoader.js';
export { FrameworkLoader } from './FrameworkLoader.js';
export { RuntimeLoader } from './RuntimeLoader.js';
export { MetadataGenerator } from './MetadataGenerator.js';
export { ManifestGenerator } from './ManifestGenerator.js';
export { FileAssembler } from './FileAssembler.js';

export type {
  GeneratorConfig,
  GenerationResult,
  GenerationError,
  GenerationContext,
  GeneratorHooks,
  GenerationManifest,
  VersionMetadata,
  ValidationResult,
  BlueprintAssets,
  FrameworkAssets,
  RuntimeAssets,
  LoaderResult,
} from './types.js';

export { ErrorCode } from './types.js';
