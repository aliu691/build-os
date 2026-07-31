# BuildOS

An AI-native product delivery framework for planning, designing, building, testing, and shipping software using AI agents.

## Repository Structure

BuildOS is organized into four logical components that separate framework assets, runtime configuration, project blueprints, and the CLI tool.

### framework/

The foundational BuildOS framework — source of truth for how BuildOS operates.

- **constitution.md** — Governing principles and decision-making authority
- **workflow.md** — Sprint lifecycle, code review, and release processes
- **artifact-governance.md** — How to manage and version project artifacts
- **continuity.md** — Handoff procedures and team transition protocols
- **roles/** — Role definitions (architect, engineer, designer, reviewer, etc.)
- **prompts/** — AI task prompts for each role and workflow stage
- **templates/** — Document and code templates for consistency
- **reviews/** — Review checklists and standards

### runtime/

Runtime configuration and instructions for BuildOS-generated projects.

- **buildos/buildos.json** — Project identity and framework configuration
- **buildos/instructions.md** — Runtime instructions for AI agents working on the project
- **buildos/prompts/** — Project-specific prompt overrides
- **buildos/roles/** — Project-specific role customizations
- **buildos/templates/** — Project-specific templates
- **README.template.md** — Template documentation for runtime setup

### blueprints/

Reusable project generation blueprints.

- **saas/** — Software-as-a-Service application blueprint
  - backend/ — Server-side structure
  - frontend/ — Client-side structure
  - docs/ — Documentation structure
  - .github/ — CI/CD and GitHub configuration templates

### cli/

Command-line interface for BuildOS operations.

- **src/** — CLI source code (planned)

### docs/

Project documentation and guides (separate from framework).

- **00-overview/** — Mission, principles, and strategic context
- **02-guides/** — Getting started, best practices, and usage guides
- **03-roadmap/** — Release plans and changelog

### examples/

Reference implementations and case studies.

## Getting Started

1. **Review the Framework**
   - Start with `framework/constitution.md` to understand governing principles
   - Read `framework/workflow.md` for development processes
   - Review roles in `framework/roles/` to understand team structure

2. **For Generating New Projects** (planned)
   - Use `buildos new --blueprint saas` to scaffold a new project
   - Configure via `runtime/buildos/buildos.json`
   - Follow `runtime/buildos/instructions.md` for runtime expectations

3. **For Contributing to BuildOS**
   - Framework changes require approval per constitution
   - See `docs/02-guides/` for contribution guidelines
   - Follow the BuildOS workflow defined in `framework/workflow.md`

## Project Generation (Planned)

Once the CLI is implemented, BuildOS can generate new projects by:

1. Copying a blueprint structure from `blueprints/`
2. Configuring runtime assets from `runtime/buildos/`
3. Applying framework conventions from `framework/`
4. Generating project scaffolding and initial structure

## Contributing

BuildOS itself follows the BuildOS framework. All changes must:

- Comply with the Constitution (`framework/constitution.md`)
- Follow the Workflow (`framework/workflow.md`)
- Respect Artifact Governance (`framework/artifact-governance.md`)
- Maintain clear decision documentation

See `docs/02-guides/` for detailed contribution guidelines.
