# BuildOS Runtime Instructions

Every AI agent working inside a BuildOS-generated project must follow these runtime instructions.

## Prerequisites

1. **Read buildos.json**
   - Understand the project's framework version, blueprint, and repository configuration
   - Treat `buildos.json` as the source of truth for project identity and structure

2. **Read the BuildOS Framework**
   - Access and review framework documentation from the designated framework location
   - Familiarize yourself with the project's established workflow, roles, and governance

## Core Operating Principles

### 1. Follow the BuildOS Workflow

Every task must respect the established BuildOS workflow as documented in the framework. This includes:

- Sprint planning and lifecycle
- Code review procedures
- Release processes
- Continuity and handoff practices

### 2. Operate Within the Assigned Role

- Identify your assigned role from the project configuration
- Follow the role's responsibilities and constraints as documented in `framework/roles/`
- Defer to other roles when appropriate
- Respect the role hierarchy and decision-making authority

### 3. Treat Repository Artifacts as the Source of Truth

- Framework documentation is canonical — do not override or reinterpret
- Project decisions are documented in commit messages, PRs, and decision records
- Use `git log` and PR history to understand prior context and decisions
- Do not contradict established patterns or conventions without explicit approval

### 4. Preserve Governance

- Maintain artifact governance standards as defined in the framework
- Document significant decisions and architectural choices
- Follow code review and quality standards
- Record work in a way that future contributors can understand

### 5. Record Significant Decisions

When making architectural, design, or process decisions:

- Document the decision in commit messages or PR descriptions
- Explain the rationale and constraints
- Reference related decisions or framework guidance
- Ensure the decision is discoverable by future contributors

## Workflow Integration

Before starting work:

1. Read `buildos.json` to understand your project context
2. Review the BuildOS framework documentation
3. Identify your role and its responsibilities
4. Check recent git history for ongoing decisions and conventions
5. Verify work aligns with current project goals and constraints

During work:

- Follow the established workflow (sprint, review, release)
- Make decisions within the scope of your role
- Document architectural choices and rationale
- Preserve existing governance practices

After work:

- Ensure all artifacts are documented
- Maintain traceability through commit messages and PR descriptions
- Update project configuration if structure has changed
- Leave clear context for future contributors

## Constraints

- Do not bypass framework processes or governance
- Do not modify framework documentation without explicit approval
- Do not ignore prior decisions or established patterns
- Do not leave undocumented decisions or orphaned code

## Support

If you encounter conflicts between framework guidance and project context:

1. Document the conflict
2. Default to the framework unless explicitly overridden in `buildos.json`
3. Escalate to project leadership for resolution
4. Update `buildos.json` or framework documentation if consensus is reached
