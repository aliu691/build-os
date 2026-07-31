/**
 * Types for the Doctor diagnostic command
 */

export interface Finding {
  severity: 'pass' | 'warning' | 'error';
  category: string;
  message: string;
  details?: string;
}

export interface DoctorReport {
  status: 'healthy' | 'healthy-with-warnings' | 'errors-detected';
  projectPath: string;
  checks: number;
  passed: number;
  warnings: number;
  errors: number;
  frameworkVersion?: string;
  generatorVersion?: string;
  runtimeVersion?: string;
  blueprintVersion?: string;
  findings: Finding[];
  timestamp: string;
}

export interface ValidationContext {
  projectPath: string;
  buildosJsonPath: string;
  manifestPath: string;
  frameworkPath: string;
  runtimePath: string;
  buildosJson?: Record<string, any>;
  manifest?: Record<string, any>;
}

export interface DoctorOptions {
  verbose?: boolean;
  json?: boolean;
  help?: boolean;
}
