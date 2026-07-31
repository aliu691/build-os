/**
 * BlueprintLoader: Loads blueprint assets from the blueprints directory
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { BlueprintAssets, LoaderResult, GenerationError, ErrorCode } from './types.js';

export class BlueprintLoader {
  async load(blueprintPath: string, blueprintName: string): Promise<LoaderResult<BlueprintAssets>> {
    try {
      if (!existsSync(blueprintPath)) {
        return {
          success: false,
          error: {
            code: ErrorCode.MISSING_BLUEPRINT,
            message: `Blueprint not found: "${blueprintName}"`,
            details: `Blueprint directory does not exist at ${blueprintPath}`,
          },
        };
      }

      const version = this.extractBlueprintVersion(blueprintPath);
      const directories = this.findDirectories(blueprintPath);
      const files = await this.findFiles(blueprintPath);

      return {
        success: true,
        data: {
          path: blueprintPath,
          name: blueprintName,
          version,
          directories,
          files,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: {
          code: ErrorCode.UNKNOWN_ERROR,
          message: 'Failed to load blueprint',
          details: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  private extractBlueprintVersion(blueprintPath: string): string {
    try {
      const readmePath = join(blueprintPath, 'README.template.md');
      if (existsSync(readmePath)) {
        const content = readFileSync(readmePath, 'utf-8');
        // Try to extract version from README
        const versionMatch = content.match(/version[:\s]+([0-9.]+)/i);
        if (versionMatch) {
          return `${versionMatch[1]}`;
        }
      }
    } catch (err) {
      // Ignore errors, use default version
    }
    // Default version based on discovery
    return '1.0.0';
  }

  private findDirectories(blueprintPath: string): string[] {
    const directories: string[] = [];
    const entries = readdirSync(blueprintPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        directories.push(entry.name);
      }
    }

    return directories;
  }

  private async findFiles(blueprintPath: string): Promise<Map<string, string>> {
    const files = new Map<string, string>();
    await this.walkDirectory(blueprintPath, blueprintPath, '', files);
    return files;
  }

  private async walkDirectory(
    basePath: string,
    currentPath: string,
    relativePath: string,
    files: Map<string, string>
  ): Promise<void> {
    const entries = readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.')) {
        continue;
      }

      const fullPath = join(currentPath, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        await this.walkDirectory(basePath, fullPath, relPath, files);
      } else if (entry.isFile()) {
        files.set(relPath, fullPath);
      }
    }
  }
}
