/**
 * FileAssembler: Assembles project files in the destination directory
 */

import { mkdirSync, copyFileSync, writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';
import {
  BlueprintAssets,
  FrameworkAssets,
  RuntimeAssets,
  VersionMetadata,
  GenerationError,
  ErrorCode,
  GenerationManifest,
} from './types.js';

export interface AssemblyStats {
  directoriesCreated: number;
  filesCopied: number;
}

export class FileAssembler {
  private stats: AssemblyStats = {
    directoriesCreated: 0,
    filesCopied: 0,
  };

  async assemble(
    destinationPath: string,
    blueprintAssets: BlueprintAssets,
    frameworkAssets: FrameworkAssets,
    runtimeAssets: RuntimeAssets,
    metadata: VersionMetadata
  ): Promise<{ success: boolean; stats?: AssemblyStats; error?: GenerationError }> {
    try {
      // Reset stats for this assembly
      this.stats = { directoriesCreated: 0, filesCopied: 0 };

      // Create project root
      this.createDirectory(destinationPath);

      // 1. Copy blueprint structure (directories)
      await this.createBlueprintStructure(destinationPath, blueprintAssets);

      // 2. Copy runtime to buildos/
      await this.copyRuntimeAssets(destinationPath, runtimeAssets);

      // 3. Copy framework snapshot to buildos/framework/
      await this.copyFrameworkSnapshot(destinationPath, frameworkAssets);

      // 4. Generate buildos.json with metadata
      await this.generateBuildosJson(destinationPath, metadata);

      // 5. Create placeholder directories for customization
      await this.createCustomizationDirectories(destinationPath);

      return { success: true, stats: this.stats };
    } catch (err) {
      return {
        success: false,
        error: {
          code: ErrorCode.FAILED_FILE_COPY,
          message: 'Failed to assemble project files',
          details: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  async writeManifest(destinationPath: string, manifest: GenerationManifest): Promise<{ success: boolean; error?: GenerationError }> {
    try {
      const manifestPath = join(destinationPath, 'buildos', 'generation-manifest.json');
      const content = JSON.stringify(manifest, null, 2);
      writeFileSync(manifestPath, content, 'utf-8');
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: {
          code: ErrorCode.FAILED_FILE_COPY,
          message: 'Failed to write generation manifest',
          details: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  private createDirectory(path: string): void {
    mkdirSync(path, { recursive: true });
    this.stats.directoriesCreated++;
  }

  private copyFile(srcPath: string, destPath: string): void {
    const destDir = dirname(destPath);
    this.createDirectory(destDir);
    copyFileSync(srcPath, destPath);
    this.stats.filesCopied++;
  }

  private async createBlueprintStructure(destinationPath: string, blueprintAssets: BlueprintAssets): Promise<void> {
    // Create blueprint directories in project root
    for (const dir of blueprintAssets.directories) {
      const dirPath = join(destinationPath, dir);
      this.createDirectory(dirPath);
    }

    // Copy blueprint files
    for (const [relPath, srcPath] of blueprintAssets.files.entries()) {
      const destPath = join(destinationPath, relPath);
      this.copyFile(srcPath, destPath);
    }
  }

  private async copyRuntimeAssets(destinationPath: string, runtimeAssets: RuntimeAssets): Promise<void> {
    const buildosPath = join(destinationPath, 'buildos');
    this.createDirectory(buildosPath);

    for (const [relPath, srcPath] of runtimeAssets.files.entries()) {
      const destPath = join(buildosPath, relPath);
      this.copyFile(srcPath, destPath);
    }
  }

  private async copyFrameworkSnapshot(destinationPath: string, frameworkAssets: FrameworkAssets): Promise<void> {
    const frameworkDestPath = join(destinationPath, 'buildos', 'framework');
    this.createDirectory(frameworkDestPath);

    for (const [relPath, srcPath] of frameworkAssets.files.entries()) {
      const destPath = join(frameworkDestPath, relPath);
      this.copyFile(srcPath, destPath);
    }
  }

  private async generateBuildosJson(destinationPath: string, metadata: VersionMetadata): Promise<void> {
    const buildosJsonPath = join(destinationPath, 'buildos', 'buildos.json');
    const content = JSON.stringify(metadata, null, 2);
    writeFileSync(buildosJsonPath, content, 'utf-8');
    this.stats.filesCopied++;
  }

  private async createCustomizationDirectories(destinationPath: string): Promise<void> {
    const customizationDirs = [
      join(destinationPath, 'buildos', 'prompts'),
      join(destinationPath, 'buildos', 'roles'),
      join(destinationPath, 'buildos', 'templates'),
    ];

    for (const dir of customizationDirs) {
      this.createDirectory(dir);

      // Create .gitkeep to ensure directories are tracked by git
      const gitkeepPath = join(dir, '.gitkeep');
      writeFileSync(gitkeepPath, '', 'utf-8');
      this.stats.filesCopied++;
    }
  }
}
