/**
 * FrameworkLoader: Loads the BuildOS framework snapshot
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { FrameworkAssets, LoaderResult, GenerationError, ErrorCode } from './types.js';

export class FrameworkLoader {
  async load(frameworkPath: string): Promise<LoaderResult<FrameworkAssets>> {
    try {
      if (!existsSync(frameworkPath)) {
        return {
          success: false,
          error: {
            code: ErrorCode.MISSING_FRAMEWORK,
            message: 'BuildOS framework not found',
            details: `Framework directory does not exist at ${frameworkPath}`,
          },
        };
      }

      const version = this.extractFrameworkVersion(frameworkPath);
      const commit = this.extractFrameworkCommit(frameworkPath);
      const files = await this.collectFrameworkFiles(frameworkPath);

      return {
        success: true,
        data: {
          path: frameworkPath,
          version,
          commit,
          files,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: {
          code: ErrorCode.UNKNOWN_ERROR,
          message: 'Failed to load framework',
          details: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  private extractFrameworkVersion(frameworkPath: string): string {
    try {
      // Look for version file or git information
      const versionFile = join(frameworkPath, '..', '..', 'package.json');
      if (existsSync(versionFile)) {
        const content = readFileSync(versionFile, 'utf-8');
        const pkg = JSON.parse(content);
        if (pkg.version) {
          return pkg.version;
        }
      }

      // Look for version in constitution
      const constitutionPath = join(frameworkPath, 'constitution.md');
      if (existsSync(constitutionPath)) {
        const content = readFileSync(constitutionPath, 'utf-8');
        // Extract version from content (e.g., "v1.0.0")
        const match = content.match(/[Vv]([0-9.]+)/);
        if (match) {
          return match[1];
        }
      }
    } catch (err) {
      // Ignore errors, use default version
    }

    return '1.0.0';
  }

  private extractFrameworkCommit(frameworkPath: string): string {
    try {
      // Try to read from git or metadata file
      // In a real implementation, this would read from git
      // For now, use a default or read from a metadata file if it exists
      const metadataPath = join(frameworkPath, '..', '.buildos-metadata');
      if (existsSync(metadataPath)) {
        const content = readFileSync(metadataPath, 'utf-8');
        const match = content.match(/commit[:\s]+([a-f0-9]+)/i);
        if (match) {
          return match[1];
        }
      }
    } catch (err) {
      // Ignore errors
    }

    // Default to a placeholder commit (would be replaced with actual git commit in real usage)
    return 'unknown';
  }

  private async collectFrameworkFiles(frameworkPath: string): Promise<Map<string, string>> {
    const files = new Map<string, string>();
    await this.walkDirectory(frameworkPath, frameworkPath, '', files);
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
