/**
 * Help Command: Display help for BuildOS CLI
 */

export function displayHelp(command?: string): void {
  if (command === 'new') {
    displayNewHelp();
  } else {
    displayGeneralHelp();
  }
}

function displayGeneralHelp(): void {
  console.log(`
BuildOS CLI

AI-native project generation and management framework

USAGE:
  buildos <command> [options]

COMMANDS:
  new               Create a new BuildOS project
  doctor            Diagnose BuildOS project health
  --version, -v     Display CLI version
  --help, -h        Display this help

EXAMPLES:
  buildos new peopledesk
  buildos new myproject --blueprint saas
  buildos new myapp --destination ~/projects
  buildos doctor
  buildos doctor --json

For command-specific help:
  buildos new --help
  buildos doctor --help

DOCUMENTATION:
  https://github.com/anthropics/build-os
`);
}

function displayNewHelp(): void {
  console.log(`
buildos new - Create a new BuildOS project

USAGE:
  buildos new <project-name> [options]

ARGUMENTS:
  <project-name>     Name of the project (required)
                     Must start with a letter
                     Can contain lowercase letters, numbers, hyphens, underscores

OPTIONS:
  --blueprint <name>   Blueprint to use (default: saas)
                       Available: saas

  --destination <path> Where to create the project (default: current directory)

  --repository <url>   Repository URL for the project (optional)

  --help, -h          Display this help

  --version, -v       Display CLI version

EXAMPLES:
  # Create a project using the default blueprint (saas)
  buildos new peopledesk

  # Create a project with a specific blueprint
  buildos new myapp --blueprint saas

  # Create a project in a specific directory
  buildos new myproject --destination ~/projects

  # Create a project with all options
  buildos new myapp \\
    --blueprint saas \\
    --destination ~/projects \\
    --repository https://github.com/company/myapp

PROJECT STRUCTURE:
  After creation, your project will contain:

  • buildos/           BuildOS framework and runtime configuration
  • backend/           Server-side application structure
  • frontend/          Client-side application structure
  • docs/              Documentation structure
  • .github/           GitHub configuration and workflows

NEXT STEPS:
  cd <project-name>
  git init
  npm install (if using Node.js)

For more information:
  https://github.com/anthropics/build-os
`);
}
