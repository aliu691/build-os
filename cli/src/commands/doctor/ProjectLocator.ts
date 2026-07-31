/**
 * ProjectLocator: Find BuildOS project root by walking up directory tree
 */

import { existsSync, statSync } from 'fs';
import { resolve, dirname } from 'path';

export class ProjectLocator {
  locate(startPath: string = process.cwd()): string | null {
    let currentPath = resolve(startPath);

    // Walk up the directory tree looking for buildos/buildos.json
    while (true) {
      const buildosJsonPath = `${currentPath}/buildos/buildos.json`;

      if (existsSync(buildosJsonPath)) {
        // Verify it's a file
        try {
          if (statSync(buildosJsonPath).isFile()) {
            return currentPath;
          }
        } catch (err) {
          // Continue searching
        }
      }

      // Move to parent directory
      const parentPath = dirname(currentPath);

      // Stop at filesystem root
      if (parentPath === currentPath) {
        return null;
      }

      currentPath = parentPath;
    }
  }
}
