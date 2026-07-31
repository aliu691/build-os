# BuildOS Architecture

This document explains the architectural organization of BuildOS after the v1.0 refactor.

## Design Rationale

BuildOS is organized into four distinct components to achieve two key goals:

1. **Separation of Concerns** — Framework logic, runtime configuration, project blueprints, and tooling are isolated
2. **Reusability** — Each component can be independently versioned, extended, or swapped

### Historical Context

Prior to this refactor, BuildOS was a monolithic repository containing all framework assets, documentation, and examples. This made it difficult to:

- Identify which assets should be copied into generated projects
- Version framework components independently
- Build a project generation tool (CLI)
- Scale to multiple blueprints and project templates

This refactor separates these concerns into explicit architectural layers.

## Component Overview

### Framework (framework/)

**Purpose:** Canonical source of truth for BuildOS itself.

**Characteristics:**
- Stable and versioned with the framework release
- Approved through formal review processes
- Binding on all roles and projects using BuildOS
- Not modified by project-generation or project-specific tools

**Contents:**
- Governance documents (constitution, workflow, artifact governance, continuity)
- Role definitions with responsibilities and constraints
- Prompts that guide AI agents through workflow stages
- Templates for consistent documentation and code
- Review checklists and approval standards

**Versioning:** Follows semantic versioning. Projects reference a specific framework version in `runtime/buildos/buildos.json`.

**Extensibility:** The constitution defines how framework components can be extended or overridden. Project-specific customizations go in `runtime/buildos/`, not `framework/`.

### Runtime (runtime/)

**Purpose:** Configurable layer that bridges the framework and generated projects.

**Characteristics:**
- Copied into each generated project
- Mutable by the generated project
- Provides project-specific configuration and customization
- Instructs AI agents how to operate within a specific project context

**Contents:**
- `buildos/buildos.json` — Project identity and configuration reference
- `buildos/instructions.md` — Runtime instructions for AI agents
- `buildos/prompts/` — Project-specific prompt customizations
- `buildos/roles/` — Project-specific role overrides
- `buildos/templates/` — Project-specific templates

**Lifecycle:**
1. Created as a template at `runtime/buildos/`
2. Copied into new projects by the CLI
3. Customized by project teams to match specific needs
4. Never modified in the framework repository (only in generated projects)

**Customization:** Projects can override framework assets by providing versions in `runtime/buildos/`. The BuildOS runtime instructions define the precedence and conflict resolution.

### Blueprints (blueprints/)

**Purpose:** Reusable project scaffolding templates for different application types.

**Characteristics:**
- Initial project structures for common patterns (SaaS, microservices, etc.)
- No application logic or code — only directory structures and configuration templates
- Selected by the CLI when generating a new project
- Can be extended with additional blueprints as patterns emerge

**Current Blueprints:**
- `saas/` — Software-as-a-Service applications

**Blueprint Structure:**
Each blueprint defines:
- Directory structure for the application
- README template explaining the blueprint
- Placeholder configuration files and examples
- CI/CD and deployment templates (in `.github/`)

**Lifecycle:**
1. User specifies `--blueprint saas` when running `buildos new`
2. CLI copies blueprint structure into new project
3. CLI overlays runtime configuration from `runtime/`
4. CLI applies project name and repository configuration
5. Generated project includes both blueprint structure and BuildOS runtime

### CLI (cli/)

**Purpose:** Tool for creating and managing BuildOS projects.

**Characteristics:**
- Planned but not yet implemented
- Orchestrates framework, runtime, and blueprint assets
- Single source of truth for project generation logic
- Extensible for future commands and workflows

**Planned Capabilities:**
- `buildos new --blueprint <name>` — Create a new project
- `buildos init` — Initialize BuildOS in an existing project (planned)
- `buildos review` — Run automated reviews (planned)
- Future commands for project management and CI/CD integration

**Implementation Notes:**
- Will be a separate Node.js application (or similar)
- Should minimize custom logic — primarily orchestrating existing assets
- Extensible architecture for plugins and custom commands

## Data Flow: Project Generation

When a user runs `buildos new --blueprint saas --project myproject`:

```
┌─────────────────────────────────────────────────────────┐
│ CLI (entrypoint)                                         │
├─────────────────────────────────────────────────────────┤
│ 1. Parse arguments                                      │
│ 2. Load blueprint from blueprints/saas/                │
│ 3. Load runtime template from runtime/buildos/         │
│ 4. Load framework reference from framework/            │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Project Generation                                       │
├─────────────────────────────────────────────────────────┤
│ 1. Create project directory                            │
│ 2. Copy blueprint structure (backend, frontend, docs)  │
│ 3. Copy runtime/ to project/buildos/                   │
│ 4. Populate buildos.json with project metadata         │
│ 5. Create .claude/settings.json with framework ref     │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Generated Project Structure                             │
├─────────────────────────────────────────────────────────┤
│ myproject/                                              │
│ ├── buildos/                  (from runtime/buildos/)  │
│ │   ├── buildos.json          (project config)        │
│ │   ├── instructions.md       (runtime instructions)  │
│ │   ├── roles/                (project-specific roles) │
│ │   ├── prompts/              (project-specific)      │
│ │   └── templates/            (project-specific)      │
│ ├── backend/                  (from blueprints/saas/) │
│ ├── frontend/                 (from blueprints/saas/) │
│ ├── docs/                     (from blueprints/saas/) │
│ ├── .github/                  (from blueprints/saas/) │
│ └── ... (project-specific files)                      │
└─────────────────────────────────────────────────────────┘
```

When an AI agent works on the generated project:

1. Read `buildos/buildos.json` to identify framework version and project config
2. Reference `framework/` (either locally or from BuildOS repository) for canonical guidelines
3. Follow `buildos/instructions.md` for runtime expectations
4. Use role definitions from `framework/roles/` (or overrides from `buildos/roles/`)
5. Follow workflow from `framework/workflow.md`
6. Use prompts from `framework/prompts/` (or overrides from `buildos/prompts/`)

## Versioning Strategy

**Framework Version:** Tied to BuildOS releases (e.g., 1.0.0, 1.1.0, 2.0.0)

**Project Framework Reference:** Stored in `buildos/buildos.json`:
```json
{
  "framework": "BuildOS",
  "version": "1.0.0",
  "blueprint": "saas",
  "project": "myproject",
  "repository": "https://github.com/myorg/myproject"
}
```

**Framework Asset Paths:**
- If framework is embedded in project: `buildos/` references point to `../../../framework/` (BuildOS repo structure)
- If framework is external: `buildos/instructions.md` provides URL/path to framework assets

**Compatibility:** The BuildOS framework version determines:
- Required roles and responsibilities
- Workflow and review processes
- Artifact governance standards
- CLI compatibility

## Extension Points

### Adding New Blueprints

1. Create `blueprints/mynewblueprint/`
2. Define directory structure and placeholder files
3. Create `blueprints/mynewblueprint/README.template.md` explaining the blueprint
4. CLI will automatically support `buildos new --blueprint mynewblueprint`

### Customizing Runtime Assets

Project teams can override framework assets by:

1. Adding custom prompts to `buildos/prompts/`
2. Defining project-specific roles in `buildos/roles/`
3. Creating project-specific templates in `buildos/templates/`
4. Updating `buildos/instructions.md` with project-specific guidance

The BuildOS constitution defines precedence for resolving conflicts between framework and project-specific assets.

### Framework Evolution

Framework changes (constitution, workflow, roles, etc.) are:

1. Proposed in pull requests with clear rationale
2. Reviewed per the approval process in `framework/artifact-governance.md`
3. Versioned with new BuildOS releases
4. Communicated to existing projects with migration guidance

Projects can upgrade their framework version by updating `buildos/buildos.json` and reviewing the changelog for breaking changes.

## Key Design Principles

1. **Framework as Law** — Framework documents are canonical and binding. Projects cannot override them without explicit approval.

2. **Runtime as Configuration** — Runtime assets are customizable by each project while respecting framework constraints.

3. **Clear Lineage** — Every generated project knows which framework version and blueprint it was created from.

4. **Minimal CLI Logic** — The CLI is primarily an orchestrator, not a rule engine. Business logic lives in framework documents and runtime instructions.

5. **Explicit Over Implicit** — Configuration is explicit in `buildos.json` and `instructions.md`, not inferred from directory structure.

6. **Portable Projects** — A generated project can reference BuildOS either locally (embedded copy) or externally (URL reference).

## Related Documentation

- **Constitution:** `framework/constitution.md` — Governing principles
- **Workflow:** `framework/workflow.md` — Development processes
- **Artifact Governance:** `framework/artifact-governance.md` — How to manage artifacts
- **Runtime Instructions:** `runtime/buildos/instructions.md` — AI agent runtime guidance
- **Getting Started:** `docs/02-guides/getting-started.md` — User-facing guidance
