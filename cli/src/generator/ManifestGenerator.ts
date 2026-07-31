/**
 * ManifestGenerator: Creates a generation manifest recording what was generated
 *
 * The manifest serves as a permanent receipt of the generation process,
 * enabling future commands to understand project state without filesystem inspection.
 */

import { GenerationManifest, VersionMetadata } from './types.js';

export class ManifestGenerator {
  generate(
    metadata: VersionMetadata,
    assets: string[],
    directoriesCreated: number,
    filesCopied: number,
    generatorVersion: string = '1.0.0'
  ): GenerationManifest {
    return {
      generatorVersion,
      generatedAt: new Date().toISOString(),
      framework: {
        version: metadata.frameworkVersion,
        commit: metadata.frameworkCommit,
      },
      runtime: {
        version: metadata.runtimeVersion,
      },
      blueprint: {
        name: metadata.blueprintName,
        version: metadata.blueprintVersion,
      },
      project: {
        name: metadata.project,
      },
      assets,
      summary: {
        directoriesCreated,
        filesCopied,
      },
    };
  }

  serialize(manifest: GenerationManifest): string {
    return JSON.stringify(manifest, null, 2);
  }
}
