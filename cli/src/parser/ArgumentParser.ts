/**
 * ArgumentParser: Parse and validate command-line arguments
 */

export interface ParsedArguments {
  command?: string;
  projectName?: string;
  blueprint: string;
  destination: string;
  repository: string;
  help: boolean;
  version: boolean;
}

export interface ParserError {
  message: string;
  code: string;
}

export class ArgumentParser {
  parse(argv: string[]): { args: ParsedArguments; error?: ParserError } {
    // Filter out node and script path
    const args = argv.slice(2);

    const parsed: ParsedArguments = {
      blueprint: 'saas',
      destination: process.cwd(),
      repository: '',
      help: false,
      version: false,
    };

    let i = 0;
    while (i < args.length) {
      const arg = args[i];

      if (arg === '--version' || arg === '-v') {
        parsed.version = true;
        i++;
      } else if (arg === '--help' || arg === '-h') {
        parsed.help = true;
        i++;
      } else if (arg === '--blueprint' || arg === '-b') {
        if (i + 1 >= args.length) {
          return {
            args: parsed,
            error: {
              message: 'Missing value for --blueprint',
              code: 'MISSING_OPTION_VALUE',
            },
          };
        }
        parsed.blueprint = args[i + 1];
        i += 2;
      } else if (arg === '--destination' || arg === '-d') {
        if (i + 1 >= args.length) {
          return {
            args: parsed,
            error: {
              message: 'Missing value for --destination',
              code: 'MISSING_OPTION_VALUE',
            },
          };
        }
        parsed.destination = args[i + 1];
        i += 2;
      } else if (arg === '--repository' || arg === '-r') {
        if (i + 1 >= args.length) {
          return {
            args: parsed,
            error: {
              message: 'Missing value for --repository',
              code: 'MISSING_OPTION_VALUE',
            },
          };
        }
        parsed.repository = args[i + 1];
        i += 2;
      } else if (arg.startsWith('-')) {
        return {
          args: parsed,
          error: {
            message: `Unknown option: ${arg}`,
            code: 'UNKNOWN_OPTION',
          },
        };
      } else {
        // Positional argument (project name)
        if (!parsed.command) {
          parsed.command = arg;
        } else if (!parsed.projectName) {
          parsed.projectName = arg;
        } else {
          return {
            args: parsed,
            error: {
              message: `Too many positional arguments: ${arg}`,
              code: 'TOO_MANY_ARGS',
            },
          };
        }
        i++;
      }
    }

    // If first positional is 'new', treat next as project name
    if (parsed.command === 'new' && parsed.projectName) {
      // This is the standard case: `buildos new projectname`
    } else if (parsed.command && !parsed.projectName && parsed.command !== 'new') {
      // If first positional is not 'new', treat it as the command/project name
      parsed.projectName = parsed.command;
      parsed.command = 'new';
    }

    return { args: parsed };
  }

  validateProjectName(name: string): { valid: boolean; error?: string } {
    if (!name) {
      return { valid: false, error: 'Project name is required' };
    }

    // Valid: lowercase, numbers, hyphens, underscores
    // Must start with letter
    const projectNameRegex = /^[a-z][a-z0-9_-]*$/;
    if (!projectNameRegex.test(name)) {
      return {
        valid: false,
        error: `Invalid project name: "${name}". Must start with a letter and contain only lowercase letters, numbers, hyphens, and underscores.`,
      };
    }

    if (name.length > 100) {
      return { valid: false, error: 'Project name must be 100 characters or fewer' };
    }

    return { valid: true };
  }
}
