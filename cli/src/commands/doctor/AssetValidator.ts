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
      const assetPath = join(context.projectPath, asset);

      if (!existsSync(assetPath)) {
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
