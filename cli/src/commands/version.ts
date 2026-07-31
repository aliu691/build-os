/**
 * Version Command: Display BuildOS CLI version
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getVersion(): string {
  try {
    const packageJsonPath = join(__dirname, '..', '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return packageJson.version || '1.1.0';
  } catch (err) {
    return '1.1.0';
  }
}

export function displayVersion(): void {
  const version = getVersion();
  console.log(`BuildOS CLI v${version}`);
}
