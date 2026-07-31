/**
 * AssetValidator: Validates generated assets using manifest
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { Finding, ValidationContext } from './types.js';

export class AssetValidator {
  validate(context: ValidationContext): Finding[] {
    const findings: Finding[] = [];

    if (!context.manifest || !Array.isArray(context.manifest.assets)) {
      findings.push({
        severity: 'warning',
        category: 'assets',
        message: 'Cannot validate assets without manifest',
      });
      return findings;
    }

    const assets = context.manifest.assets;

    if (assets.length === 0) {
      findings.push({
        severity: 'warning',
        category: 'assets',
        message: 'No assets to validate',
      });
      return findings;
    }

    let missingAssets = 0;

    for (const asset of assets) {
      // Assets follow hybrid snapshot model:
      // - framework is a directory in buildos/framework
      // - runtime consists of files in buildos/ (buildos.json, instructions.md, etc)
      // - other assets (blueprint dirs) are at project root
      let assetPath: string;
      let exists = false;

      if (asset === 'framework') {
        assetPath = join(context.projectPath, 'buildos', 'framework');
        exists = existsSync(assetPath);
      } else if (asset === 'runtime') {
        // Runtime is represented by files in buildos directory
        // Check for at least buildos.json which is always created
        assetPath = join(context.projectPath, 'buildos', 'buildos.json');
        exists = existsSync(assetPath);
      } else {
        assetPath = join(context.projectPath, asset);
        exists = existsSync(assetPath);
      }

      if (!exists) {
        findings.push({
          severity: 'error',
          category: 'assets',
          message: `Generated asset missing: ${asset}`,
          details: `Expected at ${assetPath}`,
        });
        missingAssets++;
      }
    }

    if (missingAssets === 0) {
      findings.push({
        severity: 'pass',
        category: 'assets',
        message: `All ${assets.length} generated assets present`,
      });
    } else {
      findings.push({
        severity: 'error',
        category: 'assets',
        message: `${missingAssets} of ${assets.length} generated assets missing`,
      });
    }

    return findings;
  }
}
