/**
 * JsonReporter: Format info report as JSON
 */

import { InfoReport } from './types.js';

export class JsonReporter {
  report(report: InfoReport): string {
    const output = {
      project: report.project,
      versions: report.versions,
      assets: report.assets,
      timestamp: report.timestamp,
    };

    return JSON.stringify(output, null, 2);
  }
}
