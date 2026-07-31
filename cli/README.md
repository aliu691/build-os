# BuildOS CLI

The BuildOS CLI is the primary user interface for creating and managing BuildOS projects.

## Installation

```bash
npm install -g @buildos/cli
```

Or from the repository:

```bash
cd build-os/cli
npm install
npm run build
npm link
```

## Usage

### Create a New Project

```bash
buildos new <project-name>
```

**Example:**

```bash
buildos new peopledesk
```

This creates a new BuildOS project using the default `saas` blueprint in the current directory.

### Specify Blueprint

```bash
buildos new <project-name> --blueprint <blueprint>
```

**Available blueprints:**
- `saas` — Software-as-a-Service application (default)

**Example:**

```bash
buildos new myapp --blueprint saas
```

### Specify Destination

```bash
buildos new <project-name> --destination <path>
```

**Example:**

```bash
buildos new myapp --destination ~/projects
```

### Specify Repository

```bash
buildos new <project-name> --repository <url>
```

**Example:**

```bash
buildos new myapp --repository https://github.com/company/myapp
```

### Combined Example

```bash
buildos new myapp \
  --blueprint saas \
  --destination ~/projects \
  --repository https://github.com/company/myapp
```

## Command Reference

### buildos new

Create a new BuildOS project.

**Syntax:**
```
buildos new <project-name> [options]
```

**Arguments:**
- `<project-name>` — Name of the project (required)

**Options:**
- `--blueprint <name>` — Blueprint to use (default: saas)
- `--destination <path>` — Destination directory (default: current directory)
- `--repository <url>` — Repository URL (optional)
- `--help, -h` — Display help
- `--version, -v` — Display version

**Examples:**
```bash
buildos new peopledesk
buildos new myapp --blueprint saas
buildos new myproject --destination ~/projects
buildos new myapp --repository https://github.com/company/myapp
```

### buildos --version

Display the BuildOS CLI version.

```bash
buildos --version
```

Output:
```
BuildOS CLI v1.1.0
```

### buildos --help

Display help for BuildOS CLI.

```bash
buildos --help
```

Display help for a specific command:

```bash
buildos new --help
```

## Generated Project Structure

When you create a new BuildOS project, the following structure is generated:

```
myapp/
├── buildos/
│   ├── buildos.json              (project configuration)
│   ├── generation-manifest.json  (generation metadata)
│   ├── instructions.md           (runtime instructions)
│   ├── framework/                (BuildOS framework snapshot)
│   │   ├── constitution.md
│   │   ├── workflow.md
│   │   ├── artifact-governance.md
│   │   ├── continuity.md
│   │   ├── roles/
│   │   ├── prompts/
│   │   ├── templates/
│   │   └── ...
│   ├── prompts/                  (project-specific customizations)
│   ├── roles/
│   └── templates/
├── backend/                      (server-side structure)
├── frontend/                      (client-side structure)
├── docs/                          (documentation structure)
└── .github/                       (GitHub configuration)
```

## Project Validation

The CLI validates:
- **Project name format** — Must start with a letter, contain only lowercase letters, numbers, hyphens, and underscores
- **Blueprint existence** — Specified blueprint must exist
- **Destination** — Parent directory must exist, project directory must not already exist
- **Framework availability** — BuildOS framework must be available

## Architecture

The CLI is a lightweight orchestration layer that delegates all project generation to the BuildOS Generator.

**Flow:**
1. Parse and validate command-line arguments
2. Resolve file paths
3. Create GeneratorConfig
4. Invoke Generator
5. Display progress and results

No project generation logic exists in the CLI itself. All generation is handled by the Generator engine.

## Error Handling

The CLI provides clear, human-readable error messages for common issues:

**Invalid project name:**
```
✗ Invalid project name: "MyApp". Must start with a letter and contain only lowercase letters, numbers, hyphens, and underscores.
```

**Blueprint not found:**
```
✗ Blueprint "mobile" not found.

Available blueprints:
• saas
```

**Destination exists:**
```
✗ Project directory already exists.
Please choose a different project name or destination.
```

**Missing framework:**
```
✗ BuildOS framework not found.
This usually means BuildOS is not properly installed.
```

## Next Steps

After creating a project:

```bash
cd myapp

# Initialize git repository
git init
git add -A
git commit -m "Initial commit: BuildOS scaffold"

# Install dependencies (if using Node.js)
npm install

# Start developing
# Follow the BuildOS workflow defined in buildos/framework/workflow.md
```

## Development

### Building from Source

```bash
cd cli
npm install
npm run build
```

### Running Locally

```bash
npm run dev -- new myproject
```

### Testing

```bash
npm test
```

## Architecture Conformance

The CLI implements:
- **BO-065** — Repository architecture (framework, runtime, blueprints, cli)
- **BO-065A** — Framework distribution strategy (hybrid snapshots)
- **BO-066** — Generator engine (orchestration and project creation)
- **BO-066A** — Lifecycle hooks and generation manifest
- **BO-067** — CLI command interface

## Documentation

- [BuildOS Framework](../framework/README.md)
- [Generator Documentation](../cli/src/generator/README.md)
- [Architecture Overview](../ARCHITECTURE.md)
- [GitHub Repository](https://github.com/anthropics/build-os)
