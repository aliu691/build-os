/**
 * ManifestLoader: Load and parse generation-manifest.json
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export class ManifestLoader {
  load(projectPath: string): Record<string, any> | null {
    const manifestPath = join(projectPath, 'buildos', 'generation-manifest.json');

    if (!existsSync(manifestPath)) {
      return null;
    }

    try {
      const content = readFileSync(manifestPath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      return null;
    }
  }
}
