/**
 * MetadataGenerator: Generates version metadata for buildos.json
 */

import { VersionMetadata } from './types';

export class MetadataGenerator {
  generate(
    projectName: string,
    frameworkVersion: string,
    frameworkCommit: string,
    runtimeVersion: string,
    blueprintName: string,
    blueprintVersion: string,
    generatorVersion: string,
    repositoryUrl: string = ''
  ): VersionMetadata {
    return {
      framework: 'BuildOS',
      frameworkVersion,
      frameworkCommit,
      runtimeVersion,
      blueprintName,
      blueprintVersion: `${blueprintName}-${blueprintVersion}`,
      generatorVersion,
      project: projectName,
      repository: repositoryUrl,
    };
  }

  serialize(metadata: VersionMetadata): string {
    return JSON.stringify(metadata, null, 2);
  }
}
