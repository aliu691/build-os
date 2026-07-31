/**
 * MetadataLoader: Load and parse buildos.json
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export class MetadataLoader {
  load(projectPath: string): Record<string, any> | null {
    const buildosJsonPath = join(projectPath, 'buildos', 'buildos.json');

    if (!existsSync(buildosJsonPath)) {
      return null;
    }

    try {
      const content = readFileSync(buildosJsonPath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      return null;
    }
  }
}
