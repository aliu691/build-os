/**
 * JsonReporter: Format upgrade report as JSON
 */

import { UpgradeReport } from './types.js';

export class JsonReporter {
  report(report: UpgradeReport): string {
    const output = {
      status: report.status,
      current: report.current,
      available: report.available,
      plan: report.plan?.actions.map((a) => a.description),
      completed: report.completed?.length || 0,
      skipped: report.skipped?.length || 0,
      errors: report.errors || [],
      timestamp: report.timestamp,
    };

    return JSON.stringify(output, null, 2);
  }
}
