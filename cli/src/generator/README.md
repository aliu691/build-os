# BuildOS Generator

The BuildOS Generator is a reusable TypeScript library that orchestrates the creation of BuildOS projects by assembling approved framework, runtime, and blueprint components.

## Purpose

The Generator is the core engine responsible for:

1. **Validating inputs** — ensures all required assets exist
2. **Loading assets** — reads framework, runtime, and blueprint
3. **Generating metadata** — creates version information
4. **Assembling projects** — copies files into destination
5. **Producing deterministic output** — generates identical projects from same inputs

## Architecture

```
┌──────────────────────────────────────┐
│ Generator (Main Orchestrator)        │
└──────────────────────────────────────┘
    │
    ├── Validator
    │   └── Validates inputs and paths
    │
    ├── BlueprintLoader
    │   └── Loads blueprint assets
    │
    ├── FrameworkLoader
    │   └── Loads framework snapshot
    │
    ├── RuntimeLoader
    │   └── Loads runtime configuration
    │
    ├── MetadataGenerator
    │   └── Creates version metadata
    │
    ├── ManifestGenerator
    │   └── Creates generation manifest
    │
    └── FileAssembler
        └── Writes files to destination
```

## Lifecycle Hooks

The Generator supports optional lifecycle hooks for extensibility:

```typescript
interface GeneratorHooks {
  preGenerate?(context: GenerationContext): Promise<void>;
  postGenerate?(result: GenerationResult): Promise<void>;
}
```

### PreGenerate Hook

Executed **before validation starts**.

Use cases:
- Custom setup or initialization
- Environment preparation
- Validation of external conditions

```typescript
const hooks: GeneratorHooks = {
  preGenerate: async (context) => {
    console.log(`Preparing to generate: ${context.config.projectName}`);
  }
};

const generator = new Generator(hooks);
```

### PostGenerate Hook

Executed **after successful generation** (after manifest is written).

Use cases:
- Git initialization
- Dependency installation
- Project registration
- Analytics or telemetry
- Automated setup

```typescript
const hooks: GeneratorHooks = {
  postGenerate: async (result) => {
    if (result.success) {
      console.log(`Project created at ${result.projectPath}`);
      // Could initialize git, install dependencies, etc.
    }
  }
};

const generator = new Generator(hooks);
```

**Note:** If a postGenerate hook fails, the generation is still considered successful. Hook errors are logged but don't fail the generation.

### Registering Hooks

Hooks can be provided at construction time or set later:

```typescript
// At construction
const generator = new Generator(hooks);

// Or later
generator.setHooks(hooks);
```

### Hook Optional Behavior

If no hooks are registered:
- Generator behaves exactly as before
- No performance impact
- Zero changes to behavior

## Generation Manifest

Every generated project includes a generation manifest at `buildos/generation-manifest.json`.

The manifest records:
- Generator version that created the project
- Timestamp of generation
- Framework version and commit
- Runtime version
- Blueprint name and version
- Project name
- Generated assets list
- Generation statistics

### Example Manifest

```json
{
  "generatorVersion": "1.0.0",
  "generatedAt": "2026-07-31T09:45:00.000Z",
  "framework": {
    "version": "1.0.0",
    "commit": "4e6349b"
  },
  "runtime": {
    "version": "1.0.0"
  },
  "blueprint": {
    "name": "saas",
    "version": "saas-1.0.0"
  },
  "project": {
    "name": "my-app"
  },
  "assets": [
    "framework",
    "runtime",
    "backend",
    "frontend",
    "docs",
    ".github"
  ],
  "summary": {
    "directoriesCreated": 47,
    "filesCopied": 92
  }
}
```

### Purpose

The manifest enables future BuildOS commands to:
- Determine how a project was generated
- Validate project structure without filesystem inspection
- Plan framework upgrades based on current version
- Track project lifecycle and changes
- Provide accurate diagnostics

Future commands that use the manifest:
- `buildos doctor` — Validate project health
- `buildos info` — Show project information
- `buildos upgrade` — Upgrade framework version
- `buildos validate` — Check governance compliance

## Components

### Generator

Main orchestration engine. Coordinates all loaders and assemblers.

```typescript
import { Generator, GeneratorConfig } from './generator';

const config: GeneratorConfig = {
  projectName: 'my-app',
  blueprintName: 'saas',
  destinationPath: '/path/to/my-app',
  frameworkPath: '/path/to/framework',
  runtimePath: '/path/to/runtime',
  blueprintPath: '/path/to/blueprints/saas',
};

const generator = new Generator();
const result = await generator.generate(config);
```

### Validator

Validates all inputs before generation starts.

**Checks:**
- Project name format (lowercase, alphanumeric, hyphens, underscores)
- Framework exists and is complete
- Blueprint exists
- Runtime exists
- Destination directory doesn't exist
- Parent directory is accessible

### BlueprintLoader

Loads blueprint assets (directory structure, files).

**Returns:**
- Blueprint path
- Blueprint name
- Blueprint version
- Directory structure
- File mappings

### FrameworkLoader

Loads the BuildOS framework snapshot.

**Returns:**
- Framework path
- Framework version
- Framework commit hash
- All framework files

### RuntimeLoader

Loads BuildOS runtime configuration.

**Returns:**
- Runtime path
- Runtime version
- Runtime files (buildos.json, instructions.md, placeholders)

### MetadataGenerator

Generates version metadata for buildos.json.

**Generates:**
```json
{
  "framework": "BuildOS",
  "frameworkVersion": "1.0.0",
  "frameworkCommit": "4e6349b",
  "runtimeVersion": "1.0.0",
  "blueprintName": "saas",
  "blueprintVersion": "saas-1.0.0",
  "generatorVersion": "1.0.0",
  "project": "my-app",
  "repository": "https://github.com/..."
}
```

### FileAssembler

Assembles all project files in the destination directory.

**Process:**
1. Creates project root directory
2. Copies blueprint structure (directories)
3. Copies runtime to buildos/
4. Copies framework snapshot to buildos/framework/
5. Generates buildos/buildos.json
6. Creates customization directories

## Generation Pipeline

```
1. Validate Inputs
   ├─ Project name format
   ├─ Framework exists
   ├─ Blueprint exists
   ├─ Runtime exists
   └─ Destination valid
   
2. Load Blueprint
   ├─ Read blueprint directory
   ├─ Extract version
   └─ Map all files
   
3. Load Runtime
   ├─ Read runtime directory
   ├─ Extract version
   └─ Map buildos/* files
   
4. Load Framework
   ├─ Read framework directory
   ├─ Extract version and commit
   └─ Map all framework files
   
5. Generate Metadata
   ├─ Assemble version info
   ├─ Record commit hash
   └─ Create buildos.json content
   
6. Assemble Project
   ├─ Create project root
   ├─ Copy blueprint structure
   ├─ Copy runtime assets
   ├─ Copy framework snapshot
   ├─ Write buildos.json
   └─ Create customization directories
   
7. Return Success
   └─ Return project path and metadata
```

## Output Structure

Generated project structure:

```
my-app/
├── buildos/
│   ├── buildos.json          ← Version metadata
│   ├── instructions.md       ← AI agent runtime instructions
│   ├── framework/            ← BuildOS framework snapshot
│   │   ├── constitution.md
│   │   ├── workflow.md
│   │   ├── artifact-governance.md
│   │   ├── continuity.md
│   │   ├── roles/
│   │   ├── prompts/
│   │   ├── templates/
│   │   └── ...
│   ├── prompts/              ← Placeholder for project customization
│   ├── roles/                ← Placeholder for project customization
│   └── templates/            ← Placeholder for project customization
├── backend/                  ← From blueprint
├── frontend/                 ← From blueprint
├── docs/                     ← From blueprint
└── .github/                  ← From blueprint
```

## Error Handling

The Generator returns structured errors:

```typescript
interface GenerationError {
  code: ErrorCode;
  message: string;
  details?: string;
}

enum ErrorCode {
  MISSING_FRAMEWORK = 'MISSING_FRAMEWORK',
  MISSING_BLUEPRINT = 'MISSING_BLUEPRINT',
  MISSING_RUNTIME = 'MISSING_RUNTIME',
  INVALID_DESTINATION = 'INVALID_DESTINATION',
  FAILED_FILE_COPY = 'FAILED_FILE_COPY',
  INVALID_METADATA = 'INVALID_METADATA',
  INVALID_PROJECT_NAME = 'INVALID_PROJECT_NAME',
  DESTINATION_EXISTS = 'DESTINATION_EXISTS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
```

## Usage Example

```typescript
import { Generator, GeneratorConfig } from './generator';

async function createProject() {
  const config: GeneratorConfig = {
    projectName: 'my-saas-app',
    blueprintName: 'saas',
    destinationPath: '/workspace/my-saas-app',
    frameworkPath: '/buildos/framework',
    runtimePath: '/buildos/runtime',
    blueprintPath: '/buildos/blueprints/saas',
  };

  const generator = new Generator();
  const result = await generator.generate(config);

  if (result.success) {
    console.log(`✓ Created: ${result.projectPath}`);
    console.log(`✓ Framework: ${result.metadata?.frameworkVersion}`);
    console.log(`✓ Blueprint: ${result.metadata?.blueprintName}`);
  } else {
    console.error(`✗ ${result.error?.message}`);
    if (result.error?.details) {
      console.error(`  ${result.error.details}`);
    }
  }
}
```

## Integration with CLI

Future CLI commands will use this Generator:

```bash
buildos new --blueprint saas --project myapp
```

The CLI will:
1. Parse arguments
2. Resolve paths (framework, runtime, blueprints)
3. Create GeneratorConfig
4. Invoke Generator.generate()
5. Display result to user

## Determinism

The Generator produces deterministic output:

- Same inputs always produce identical output
- Version metadata captures exact framework commit
- File ordering is consistent
- No timestamps or random data in generated files
- Reproducible across different machines

## Testing

Key test scenarios:

1. **Valid generation** — all assets exist, project created successfully
2. **Missing assets** — framework, blueprint, or runtime missing
3. **Invalid project name** — uppercase, special characters, etc.
4. **Destination exists** — error when destination directory exists
5. **Invalid paths** — return structured errors
6. **Metadata accuracy** — version info is correct
7. **File integrity** — all files copied correctly

## Future Extensions

Possible future enhancements:

- Support for multiple blueprints
- Custom asset injection
- Template variable substitution (project name, etc.)
- Dry-run mode (validate without creating)
- Asset validation and integrity checks
- Post-generation hooks
- Git initialization option
- Package manager setup

## No CLI Dependencies

This generator intentionally contains no CLI-specific logic:

- No argument parsing
- No interactive prompts
- No console output (returns structured results)
- No command definitions
- No environment-specific code

This allows future CLI commands to use the Generator in various ways:

- Interactive CLI (`buildos new`)
- Programmatic API
- CI/CD integration
- IDE plugins
- Web interface

## Architecture Conformance

The Generator strictly follows the architecture defined in:

- **BO-065** — Repository structure (framework, runtime, blueprints, cli)
- **BO-065A** — Framework distribution strategy (hybrid snapshot)

Every generated project:

- ✓ Contains complete framework snapshot
- ✓ Records version metadata
- ✓ Separates framework-owned and project-owned assets
- ✓ Enables future framework upgrades
- ✓ Is self-contained and portable

## References

- `framework/architecture/framework-distribution-strategy.md` — Architectural decision
- `ARCHITECTURE.md` — High-level repository structure
- `runtime/buildos/instructions.md` — AI agent runtime guidance
