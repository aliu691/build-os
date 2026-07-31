/**
 * Version utility: Read the CLI version from package.json
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

let cachedVersion: string = '';

export function getGeneratorVersion(): string {
  if (cachedVersion) {
    return cachedVersion;
  }

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const packageJsonPath = join(__dirname, '..', '..', 'package.json');

    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    if (typeof packageJson.version === 'string') {
      cachedVersion = packageJson.version;
      return cachedVersion;
    }
  } catch (err) {
    // Silently continue to fallback
  }

  return '1.1.0';
}
