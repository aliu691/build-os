/**
 * RuntimeLoader: Loads BuildOS runtime assets
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { RuntimeAssets, LoaderResult, GenerationError, ErrorCode } from './types';

export class RuntimeLoader {
  async load(runtimePath: string): Promise<LoaderResult<RuntimeAssets>> {
    try {
      if (!existsSync(runtimePath)) {
        return {
          success: false,
          error: {
            code: ErrorCode.MISSING_RUNTIME,
            message: 'BuildOS runtime not found',
            details: `Runtime directory does not exist at ${runtimePath}`,
          },
        };
      }

      const buildosPath = join(runtimePath, 'buildos');
      if (!existsSync(buildosPath)) {
        return {
          success: false,
          error: {
            code: ErrorCode.MISSING_RUNTIME,
            message: 'Runtime buildos directory not found',
            details: `Expected runtime/buildos directory at ${buildosPath}`,
          },
        };
      }

      const version = this.extractRuntimeVersion(runtimePath);
      const files = await this.collectRuntimeFiles(runtimePath);

      return {
        success: true,
        data: {
          path: runtimePath,
          version,
          files,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: {
          code: ErrorCode.UNKNOWN_ERROR,
          message: 'Failed to load runtime',
          details: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  private extractRuntimeVersion(runtimePath: string): string {
    try {
      // Look for version in README or package
      const readmePath = join(runtimePath, 'README.template.md');
      if (existsSync(readmePath)) {
        const content = readFileSync(readmePath, 'utf-8');
        const match = content.match(/version[:\s]+([0-9.]+)/i);
        if (match) {
          return match[1];
        }
      }
    } catch (err) {
      // Ignore errors
    }

    return '1.0.0';
  }

  private async collectRuntimeFiles(runtimePath: string): Promise<Map<string, string>> {
    const files = new Map<string, string>();
    const buildosPath = join(runtimePath, 'buildos');

    try {
      await this.walkDirectory(buildosPath, buildosPath, '', files);
    } catch (err) {
      // Continue on error, some files might still be collected
    }

    return files;
  }

  private async walkDirectory(
    basePath: string,
    currentPath: string,
    relativePath: string,
    files: Map<string, string>
  ): Promise<void> {
    try {
      const { readdirSync } = await import('fs');
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
    } catch (err) {
      // Silently skip on error
    }
  }
}
