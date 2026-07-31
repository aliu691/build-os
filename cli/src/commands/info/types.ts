/**
 * Types for the Info command
 */

export interface ProjectInfo {
  name: string;
  repository?: string;
  generatedAt?: string;
}

export interface VersionInfo {
  framework: string;
  generator: string;
  runtime: string;
  blueprint: string;
}

export interface InfoReport {
  project: ProjectInfo;
  versions: VersionInfo;
  assets: string[];
  verbose?: {
    buildosJson?: Record<string, any>;
    manifest?: Record<string, any>;
  };
  timestamp: string;
}

export interface InfoOptions {
  verbose?: boolean;
  json?: boolean;
  help?: boolean;
}
