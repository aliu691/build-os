/**
 * Generator: Main orchestration engine for BuildOS project generation
 *
 * Coordinates the complete generation pipeline:
 * 1. Validate inputs
 * 2. Load blueprint
 * 3. Load runtime
 * 4. Load framework snapshot
 * 5. Generate version metadata
 * 6. Assemble project files
 */

import { GeneratorConfig, GenerationResult, VersionMetadata, ErrorCode } from './types';
import { Validator } from './Validator';
import { BlueprintLoader } from './BlueprintLoader';
import { FrameworkLoader } from './FrameworkLoader';
import { RuntimeLoader } from './RuntimeLoader';
import { MetadataGenerator } from './MetadataGenerator';
import { FileAssembler } from './FileAssembler';

export class Generator {
  private validator: Validator;
  private blueprintLoader: BlueprintLoader;
  private frameworkLoader: FrameworkLoader;
  private runtimeLoader: RuntimeLoader;
  private metadataGenerator: MetadataGenerator;
  private fileAssembler: FileAssembler;

  constructor() {
    this.validator = new Validator();
    this.blueprintLoader = new BlueprintLoader();
    this.frameworkLoader = new FrameworkLoader();
    this.runtimeLoader = new RuntimeLoader();
    this.metadataGenerator = new MetadataGenerator();
    this.fileAssembler = new FileAssembler();
  }

  async generate(config: GeneratorConfig): Promise<GenerationResult> {
    try {
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

      // Step 5: Generate version metadata
      const metadata = this.metadataGenerator.generate(
        config.projectName,
        frameworkResult.data.version,
        frameworkResult.data.commit,
        runtimeResult.data.version,
        config.blueprintName,
        blueprintResult.data.version,
        '1.0.0', // Generator version (would be read from package.json in real usage)
        '' // Repository URL (would be provided by caller)
      );

      // Step 6: Assemble project files
      const assemblyResult = await this.fileAssembler.assemble(
        config.destinationPath,
        blueprintResult.data,
        frameworkResult.data,
        runtimeResult.data,
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

      return {
        success: true,
        projectPath: config.destinationPath,
        message: `BuildOS project "${config.projectName}" created successfully`,
        metadata,
      };
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
