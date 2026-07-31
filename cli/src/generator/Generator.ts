/**
 * Generator: Main orchestration engine for BuildOS project generation
 *
 * Coordinates the complete generation pipeline:
 * 1. PreGenerate hook (optional)
 * 2. Validate inputs
 * 3. Load blueprint
 * 4. Load runtime
 * 5. Load framework snapshot
 * 6. Generate version metadata
 * 7. Assemble project files
 * 8. Generate manifest
 * 9. PostGenerate hook (optional)
 */

import {
  GeneratorConfig,
  GenerationResult,
  GenerationContext,
  GeneratorHooks,
  VersionMetadata,
  ErrorCode,
  BlueprintAssets,
  FrameworkAssets,
  RuntimeAssets,
} from './types.js';
import { Validator } from './Validator.js';
import { BlueprintLoader } from './BlueprintLoader.js';
import { FrameworkLoader } from './FrameworkLoader.js';
import { RuntimeLoader } from './RuntimeLoader.js';
import { MetadataGenerator } from './MetadataGenerator.js';
import { ManifestGenerator } from './ManifestGenerator.js';
import { FileAssembler } from './FileAssembler.js';

export class Generator {
  private validator: Validator;
  private blueprintLoader: BlueprintLoader;
  private frameworkLoader: FrameworkLoader;
  private runtimeLoader: RuntimeLoader;
  private metadataGenerator: MetadataGenerator;
  private manifestGenerator: ManifestGenerator;
  private fileAssembler: FileAssembler;
  private hooks?: GeneratorHooks;

  constructor(hooks?: GeneratorHooks) {
    this.validator = new Validator();
    this.blueprintLoader = new BlueprintLoader();
    this.frameworkLoader = new FrameworkLoader();
    this.runtimeLoader = new RuntimeLoader();
    this.metadataGenerator = new MetadataGenerator();
    this.manifestGenerator = new ManifestGenerator();
    this.fileAssembler = new FileAssembler();
    this.hooks = hooks;
  }

  setHooks(hooks: GeneratorHooks): void {
    this.hooks = hooks;
  }

  async generate(config: GeneratorConfig): Promise<GenerationResult> {
    let blueprintAssets: BlueprintAssets | undefined;
    let frameworkAssets: FrameworkAssets | undefined;
    let runtimeAssets: RuntimeAssets | undefined;
    let metadata: VersionMetadata | undefined;

    try {
      // Step 0: PreGenerate hook (optional)
      if (this.hooks?.preGenerate) {
        try {
          const context: GenerationContext = { config };
          await this.hooks.preGenerate(context);
        } catch (hookErr) {
          return {
            success: false,
            projectPath: config.destinationPath,
            message: 'PreGenerate hook failed',
            error: {
              code: ErrorCode.UNKNOWN_ERROR,
              message: 'PreGenerate hook failed',
              details: hookErr instanceof Error ? hookErr.message : String(hookErr),
            },
          };
        }
      }

      // Step 1: Validate inputs
      const validation = this.validator.validate(config);
      if (!validation.valid) {
        const error = validation.errors[0];
        return {
          success: false,
          projectPath: config.destinationPath,
          message: error.message,
          error,
        };
      }

      // Step 2: Load blueprint
      const blueprintResult = await this.blueprintLoader.load(config.blueprintPath, config.blueprintName);
      if (!blueprintResult.success || !blueprintResult.data) {
        return {
          success: false,
          projectPath: config.destinationPath,
          message: blueprintResult.error?.message || 'Failed to load blueprint',
          error: blueprintResult.error,
        };
      }
      blueprintAssets = blueprintResult.data;

      // Step 3: Load runtime
      const runtimeResult = await this.runtimeLoader.load(config.runtimePath);
      if (!runtimeResult.success || !runtimeResult.data) {
        return {
          success: false,
          projectPath: config.destinationPath,
          message: runtimeResult.error?.message || 'Failed to load runtime',
          error: runtimeResult.error,
        };
      }
      runtimeAssets = runtimeResult.data;

      // Step 4: Load framework snapshot
      const frameworkResult = await this.frameworkLoader.load(config.frameworkPath);
      if (!frameworkResult.success || !frameworkResult.data) {
        return {
          success: false,
          projectPath: config.destinationPath,
          message: frameworkResult.error?.message || 'Failed to load framework',
          error: frameworkResult.error,
        };
      }
      frameworkAssets = frameworkResult.data;

      // Step 5: Generate version metadata
      metadata = this.metadataGenerator.generate(
        config.projectName,
        frameworkAssets.version,
        frameworkAssets.commit,
        runtimeAssets.version,
        config.blueprintName,
        blueprintAssets.version,
        '1.0.0', // Generator version (would be read from package.json in real usage)
        '' // Repository URL (would be provided by caller)
      );

      // Step 6: Assemble project files
      const assemblyResult = await this.fileAssembler.assemble(
        config.destinationPath,
        blueprintAssets,
        frameworkAssets,
        runtimeAssets,
        metadata
      );

      if (!assemblyResult.success) {
        return {
          success: false,
          projectPath: config.destinationPath,
          message: assemblyResult.error?.message || 'Failed to assemble project',
          error: assemblyResult.error,
        };
      }

      // Step 7: Generate manifest
      const generatedAssets = [
        'framework',
        'runtime',
        ...blueprintAssets.directories,
      ];

      const manifest = this.manifestGenerator.generate(
        metadata,
        generatedAssets,
        assemblyResult.stats?.directoriesCreated || 0,
        assemblyResult.stats?.filesCopied || 0,
        '1.0.0'
      );

      // Step 8: Write manifest
      const manifestResult = await this.fileAssembler.writeManifest(config.destinationPath, manifest);
      if (!manifestResult.success) {
        return {
          success: false,
          projectPath: config.destinationPath,
          message: manifestResult.error?.message || 'Failed to write generation manifest',
          error: manifestResult.error,
        };
      }

      const result: GenerationResult = {
        success: true,
        projectPath: config.destinationPath,
        message: `BuildOS project "${config.projectName}" created successfully`,
        metadata,
      };

      // Step 9: PostGenerate hook (optional)
      if (this.hooks?.postGenerate) {
        try {
          await this.hooks.postGenerate(result);
        } catch (hookErr) {
          // Log hook error but don't fail the generation
          console.warn('PostGenerate hook failed:', hookErr instanceof Error ? hookErr.message : String(hookErr));
        }
      }

      return result;
    } catch (err) {
      return {
        success: false,
        projectPath: config.destinationPath,
        message: 'Unexpected error during project generation',
        error: {
          code: ErrorCode.UNKNOWN_ERROR,
          message: 'Unexpected error during project generation',
          details: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }
}
