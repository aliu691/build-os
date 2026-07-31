# BuildOS Framework Distribution Strategy

**Status:** Approved Architecture Decision · **Role:** Architect · **Date:** 2026-07-31

---

## 1. Purpose

When BuildOS generates a new project, the question of how to deliver the framework into that project has profound implications:

**Why it matters:** Generated projects are not just code repositories. They are sociotechnical systems governed by BuildOS — a constitution, workflow, roles, artifacts, and standards that enable teams to scale development with AI assistance. These framework assets must be accessible to every contributor, every AI agent, and every tool that operates on the project.

**How projects depend on BuildOS governance:** BuildOS provides:

- **Constitutional authority** — who can decide what, and how decisions are made
- **Workflow guidance** — sprint planning, code review, release procedures
- **Artifact standards** — how to document decisions and maintain quality
- **Role definitions** — responsibilities and constraints for each team member and AI agent
- **AI prompts** — task-specific guidance for AI agents
- **Templates** — consistent structure for documentation and code

Every generated project inherits these governance rules and must reference them when making decisions, performing reviews, planning sprints, or designing new features.

**The distribution decision directly affects:** portability, AI effectiveness, version control, reproducibility, upgrade paths, and team collaboration.

---

## 2. Requirements

A BuildOS distribution strategy must satisfy:

### Functional Requirements

- **Self-contained projects** — generated projects can be cloned, built, and worked on without external dependencies
- **AI discoverability** — AI agents working on the project can easily access and understand BuildOS governance
- **Offline capability** — teams can work on the project without network access to the BuildOS repository
- **Reproducibility** — building the same project from the same blueprint on different dates produces consistent governance

### Non-functional Requirements

- **Version pinning** — each project knows exactly which BuildOS version it's using
- **Framework evolution** — BuildOS can evolve independently of generated projects
- **Upgrade path** — projects can opt in to new BuildOS versions with clear migration support
- **Maintainability** — updates to BuildOS don't require manual changes to hundreds of generated projects
- **Developer experience** — teams understand which files are framework-owned and which are project-owned
- **AI context efficiency** — AI agents have immediate access to framework guidance without network calls

### Governance Requirements

- **Immutability of framework** — framework assets within a project reflect the specific BuildOS version used at creation
- **Project autonomy** — individual projects can customize framework assets (prompts, roles) within governance constraints
- **Clear ownership** — explicit boundary between framework-owned and project-owned assets
- **Audit trail** — history shows when and why framework versions were updated

---

## 3. Distribution Models

### Option A: Framework Reference

**Model:** Generated projects contain only runtime and blueprint assets. The framework is referenced from the BuildOS repository, fetched at runtime or during setup.

**Example project structure:**
```
myproject/
├── buildos/
│   ├── buildos.json
│   │   └── "frameworkRef": "https://github.com/anthropics/build-os/tree/v1.0.0"
│   └── instructions.md
├── backend/
├── frontend/
└── docs/
```

**How it works:**
1. Generator stores a reference (URL + commit hash or tag) in `buildos.json`
2. During project setup or before work, the framework is fetched from the repository
3. AI agents or CLI tools read the reference and fetch framework assets on-demand
4. Project stays lightweight; framework lives in the BuildOS repository

**Advantages:**
- Minimal storage footprint — no duplication across projects
- Always use latest framework (if desired)
- Framework changes propagate to all projects automatically
- Decoupled versioning — BuildOS evolves independently

**Disadvantages:**
- **Portability risk** — projects depend on external repository (GitHub, network availability)
- **AI context problem** — AI agents must fetch framework assets, adding latency and external dependencies
- **Offline capability** — projects cannot be worked on without network access
- **Reproducibility concerns** — repository might move, be deleted, or become inaccessible
- **Portability of archives** — zipped projects lose access to framework
- **Collaboration friction** — new team members must understand the reference model
- **AI cognition** — agents can't include full context in prompts, reducing reasoning quality

**Risks:**
- BuildOS repository becomes critical infrastructure for every generated project
- Link rot — old projects reference deprecated versions that no longer exist
- No fallback if repository becomes unavailable during critical work
- Framework updates could affect existing projects unpredictably

---

### Option B: Framework Snapshot

**Model:** Generated projects receive a complete, immutable copy of the BuildOS framework as it existed at project creation time.

**Example project structure:**
```
myproject/
├── buildos/
│   ├── buildos.json
│   │   └── "frameworkVersion": "1.0.0"
│   ├── instructions.md
│   ├── framework/                    ← Complete copy
│   │   ├── constitution.md
│   │   ├── workflow.md
│   │   ├── roles/
│   │   ├── prompts/
│   │   ├── templates/
│   │   └── ...
│   ├── prompts/                      ← Project customizations
│   ├── roles/
│   └── templates/
├── backend/
├── frontend/
└── docs/
```

**How it works:**
1. Generator copies the entire BuildOS framework directory into the project
2. Version information is stored in metadata for auditing
3. Projects work completely offline using the embedded framework
4. AI agents read the local copy without external dependencies
5. Projects never update framework version (upgrade requires explicit action)

**Advantages:**
- **Portable** — projects can be cloned, archived, moved without losing framework access
- **Offline capable** — full framework available locally
- **Reproducible** — snapshot preserves exact governance at creation time
- **AI context optimal** — agents can read full framework synchronously
- **No external dependencies** — projects don't depend on BuildOS repository availability
- **Clear versioning** — each project has explicit, permanent framework version
- **Collaboration smooth** — new team members clone the project and have everything

**Disadvantages:**
- **Storage overhead** — each project carries a copy of ~50KB+ of framework files
- **Maintenance complexity** — updating framework requires updating every project individually
- **Version skew** — old projects might lag behind framework evolution
- **Upgrade friction** — upgrading to a new framework version requires manual work
- **No automatic improvements** — bug fixes to framework don't reach old projects
- **Difficult to manage at scale** — 100 projects = 100 copies of the framework

**Risks:**
- Project teams might modify framework files locally, creating drift from official BuildOS
- Difficult to enforce governance updates across multiple projects
- Storage waste if many projects use identical framework versions

---

### Option C: Hybrid Snapshot (Recommended)

**Model:** Generated projects contain a snapshot of the framework plus version metadata that enables future upgrades. Projects are self-contained but remain aware of their framework version and origin.

**Example project structure:**
```
myproject/
├── buildos/
│   ├── buildos.json                  ← Contains version metadata
│   │   ├── "framework": "BuildOS"
│   │   ├── "frameworkVersion": "1.0.0"
│   │   ├── "frameworkCommit": "4e6349b"
│   │   ├── "runtimeVersion": "1.0.0"
│   │   ├── "blueprintVersion": "saas-1.0.0"
│   │   ├── "generatorVersion": "1.0.0"
│   │   ├── "blueprint": "saas"
│   │   ├── "project": "myproject"
│   │   └── "repository": "https://github.com/myorg/myproject"
│   ├── instructions.md
│   ├── framework/                    ← Snapshot of BuildOS framework
│   │   ├── constitution.md
│   │   ├── workflow.md
│   │   ├── roles/
│   │   ├── prompts/
│   │   ├── templates/
│   │   ├── architecture/
│   │   │   └── framework-distribution-strategy.md
│   │   └── ...
│   ├── prompts/                      ← Project customizations
│   ├── roles/
│   └── templates/
├── backend/
├── frontend/
└── docs/
```

**How it works:**

1. Generator copies the BuildOS framework into the project at generation time
2. Version metadata is recorded in `buildos.json` with:
   - Framework version (e.g., "1.0.0")
   - Framework commit hash (for exact reproducibility)
   - Blueprint version and identifier
   - Runtime version
   - Generator version that created the project
3. Projects work completely offline with embedded framework
4. Version metadata enables future `buildos upgrade` commands
5. Clear ownership boundary: framework-owned assets are marked or documented
6. Projects can customize framework assets (prompts, roles) in separate directories

**Advantages:**

- **Portable** — projects can be cloned, archived, or moved anywhere
- **Offline capable** — full framework available locally
- **Reproducible** — exact framework version is captured and versionable
- **AI context optimal** — agents read framework synchronously
- **Upgrade path** — metadata enables future `buildos upgrade` command
- **Self-contained** — no external dependencies on BuildOS repository
- **Scalable** — hundreds of projects can exist without central coordination
- **Collaboration friendly** — new contributors get full context immediately
- **Framework evolution** — BuildOS can evolve; projects opt into upgrades explicitly
- **Versioning clear** — each project has permanent record of its framework version
- **Auditable** — version metadata provides audit trail

**Disadvantages:**

- **Storage overhead** — each project carries ~50KB+ framework copy
- **Initial complexity** — version metadata requires additional fields
- **Upgrade support** — BuildOS must provide upgrade tooling and guidance
- **Framework consistency** — projects might drift if customized aggressively

**Risks:**

- Project teams might modify framework files, creating drift (mitigated by clear ownership)
- Upgrade process must be safe and well-documented
- Version compatibility must be managed carefully

---

## 4. Comparative Analysis

| Criterion | Option A: Reference | Option B: Snapshot | Option C: Hybrid |
|-----------|-------------------|------------------|-----------------|
| **Portability** | ❌ No (needs network) | ✅ Full (self-contained) | ✅ Full (self-contained) |
| **Offline Capability** | ❌ No (requires fetch) | ✅ Yes (embedded) | ✅ Yes (embedded) |
| **AI Context** | ❌ Poor (async, latency) | ✅ Excellent (sync) | ✅ Excellent (sync) |
| **Reproducibility** | ⚠️ Risky (external dep) | ✅ Perfect (snapshot) | ✅ Perfect (snapshot) |
| **Version Pinning** | ⚠️ Tag-based | ✅ Complete | ✅ Complete |
| **Framework Evolution** | ✅ Automatic | ❌ Manual only | ✅ Opt-in |
| **Upgrade Path** | ⚠️ Implicit (ref) | ❌ Complex | ✅ Clear (metadata) |
| **Storage Efficiency** | ✅ Minimal | ❌ Overhead | ⚠️ Overhead |
| **Maintainability** | ✅ Centralized | ⚠️ Distributed | ⚠️ Distributed |
| **Developer Experience** | ⚠️ Complex (fetch logic) | ✅ Simple (local) | ✅ Simple (local) |
| **Governance Clarity** | ❌ Unclear (external) | ✅ Clear (snapshot) | ✅ Clear (snapshot) |
| **Collaboration Friction** | ⚠️ Setup required | ✅ Zero friction | ✅ Zero friction |
| **Scale (100+ projects)** | ✅ Minimal overhead | ⚠️ Much duplication | ⚠️ Some duplication |
| **External Dependency Risk** | ❌ Critical (blocks work) | ✅ None | ✅ None |
| **Team Autonomy** | ⚠️ Coupled to BuildOS | ✅ Independent | ✅ Independent |
| **Future `buildos upgrade`** | ⚠️ Complex | ❌ Very complex | ✅ Clear path |

**Summary:**

- **Option A (Reference)** prioritizes centralization but sacrifices portability and AI effectiveness
- **Option B (Snapshot)** provides self-containment but lacks upgrade path
- **Option C (Hybrid)** combines portability, offline capability, AI context, and clear upgrade path

---

## 5. Recommendation

**Official Strategy: Option C — Hybrid Snapshot**

### Technical Justification

**1. Portability and Autonomy**

Generated projects must be self-contained and portable. Teams should be able to:
- Clone projects on any network
- Work offline without BuildOS repository access
- Archive projects long-term without link rot
- Move projects between organizations or version control systems

Option C satisfies this by embedding the framework snapshot.

**2. AI Effectiveness**

The primary beneficiaries of BuildOS are AI agents. For AI agents to reason effectively, they need:
- Synchronous access to complete context (no async fetches)
- Full governance documentation available immediately
- Ability to understand the framework version they're working within

Option C provides this by embedding the complete framework locally.

**3. Reproducibility and Versioning**

BuildOS must enable time-travel reproducibility — the ability to reconstruct exactly what BuildOS version governed a project at any point in its history. This is essential for:
- Debugging past decisions
- Understanding why certain patterns were used
- Auditing governance compliance
- Migrating between frameworks

Option C satisfies this by capturing version metadata.

**4. Framework Evolution Without Fragmentation**

BuildOS will evolve. Projects should:
- Continue working with the framework version they were created with
- Opt-in to framework upgrades when ready
- Receive clear upgrade guidance
- Have a smooth path to newer versions

Option C enables this with version metadata that `buildos upgrade` can use.

**5. Future Tooling**

BuildOS will gain tools like:
- `buildos info` — show project's framework version and metadata
- `buildos doctor` — validate project structure and governance compliance
- `buildos upgrade` — migrate project to a newer framework version
- `buildos validate` — check that framework and project assets are properly separated

Option C makes these tools possible. Options A and B make them either impossible or very complex.

**6. Scale Without Explosion**

At hundreds or thousands of generated projects, Option C's approach is maintainable:
- Each project knows its own framework version
- Upgrades are explicit and per-project
- No central coordination needed
- Framework can evolve independently

---

## 6. Framework Ownership Model

### Framework-Owned Assets

These assets are part of the BuildOS framework snapshot and represent the canonical governance of the project:

#### Immutable Framework Assets

Projects must not modify these files. They are the source of truth for how BuildOS projects operate:

- **buildos/framework/constitution.md** — Governing principles and decision authority
- **buildos/framework/workflow.md** — Sprint lifecycle, code review, release procedures
- **buildos/framework/artifact-governance.md** — How to manage and version artifacts
- **buildos/framework/continuity.md** — Handoff and team transition procedures
- **buildos/framework/git-strategy.md** — Git conventions and branching strategy
- **buildos/framework/sprint-lifecycle.md** — Sprint planning and execution procedures
- **buildos/framework/versioning.md** — Versioning standards

**Rationale:** These documents define how the project operates at a constitutional level. If projects modify them, governance breaks down. Teams should understand that modifying these files is a violation of BuildOS principles.

#### Framework-Owned Role Definitions

- **buildos/framework/roles/** — All 8 standard role definitions (architect, engineer, designer, reviewer, product-manager, qa, release-manager, backend-engineer, frontend-engineer)

**Rationale:** Role definitions are part of the framework's organizational design. Projects inherit these roles.

#### Framework-Owned Prompts and Templates

- **buildos/framework/prompts/** — Standard AI prompts for each workflow stage
- **buildos/framework/templates/** — Standard document and code templates

**Rationale:** These provide the baseline guidance and structure that BuildOS projects follow.

### Project-Customizable Framework Assets

Projects may customize the following within governance constraints:

#### Customizable Prompts

- **buildos/prompts/** — Project-specific prompt overrides

Projects can create role-specific or project-specific prompts in this directory. These override or supplement framework prompts for project-specific workflows (e.g., project-specific PR review guidelines, custom test prompt for your domain).

**Constraints:** Customizations must not contradict framework principles. The `buildos/instructions.md` clarifies precedence.

#### Customizable Roles

- **buildos/roles/** — Project-specific role customizations

Projects can define project-specific roles or add role-specific metadata (e.g., "Senior Backend Engineer" extending the Backend Engineer role). These supplement but do not override framework role definitions.

**Constraints:** Projects may add responsibility but not remove framework-mandated responsibilities.

#### Customizable Templates

- **buildos/templates/** — Project-specific templates

Projects can define project-specific templates for their domain (e.g., API response templates, database schema templates specific to your data model).

**Constraints:** These supplement the standard framework templates and must follow framework artifact governance standards.

### Project-Owned Assets

These belong exclusively to the generated project and must never be overwritten during framework updates:

- **Application source code** — backend/, frontend/, all application logic
- **Architecture documentation** — design decisions, system diagrams (beyond framework templates)
- **Product documentation** — user guides, API documentation, feature specifications
- **Sprint artifacts** — sprint plans, backlog, retrospectives
- **Work Orders** — project-specific work orders and task lists
- **Project configuration** — environment files, build configuration, deployment config
- **Data and credentials** — any sensitive data (should be in .gitignore)
- **CI/CD configuration** — GitHub workflows, deployment pipelines (frameworks provides templates, projects customize)
- **Examples and reference implementations** — project-specific examples

### Ownership Boundary

**Rule: Anything in `buildos/framework/` is framework-owned. Everything outside is project-owned.**

**For the BuildOS Generator and Upgrade System:**

When processing a project:
1. **Framework snapshot directory** — `buildos/framework/` — is framework-owned and managed by BuildOS
2. **Runtime configuration** — `buildos/buildos.json`, `buildos/instructions.md` — is framework-managed but projects read it
3. **Customization directories** — `buildos/prompts/`, `buildos/roles/`, `buildos/templates/` — are project-owned and must never be overwritten
4. **Everything outside buildos/** — is project-owned and must never be modified by BuildOS

**Upgrade safety:** Future `buildos upgrade` commands must:
- Never modify files in project-owned directories
- Update `buildos/framework/` only if project hasn't modified those files
- Alert user if `buildos/framework/` files have been modified locally
- Provide clear migrate guidance if manual changes exist

---

## 7. Versioning Strategy

All version information is stored in `buildos/buildos.json`:

```json
{
  "framework": "BuildOS",
  "frameworkVersion": "1.0.0",
  "frameworkCommit": "4e6349b",
  "runtimeVersion": "1.0.0",
  "blueprintName": "saas",
  "blueprintVersion": "saas-1.0.0",
  "generatorVersion": "1.0.0",
  "project": "myproject",
  "repository": "https://github.com/myorg/myproject"
}
```

### Version Fields

| Field | Purpose | Example | Format |
|-------|---------|---------|--------|
| `framework` | Framework name | "BuildOS" | Fixed string |
| `frameworkVersion` | Semantic version of BuildOS | "1.0.0" | semver |
| `frameworkCommit` | Git commit hash at generation time | "4e6349b" | git commit (short) |
| `runtimeVersion` | Version of runtime structure | "1.0.0" | semver |
| `blueprintName` | Blueprint identifier | "saas" | kebab-case |
| `blueprintVersion` | Version of blueprint used | "saas-1.0.0" | {name}-semver |
| `generatorVersion` | Version of CLI/generator that created project | "1.0.0" | semver |
| `project` | Project name | "myproject" | provided at generation |
| `repository` | Project repository URL | "https://github.com/..." | URL |

### Why Multiple Versions?

- **frameworkVersion** — Determines BuildOS governance model, workflow, roles
- **frameworkCommit** — Enables exact reproduction of the framework state
- **runtimeVersion** — Tracks runtime structure changes (instructions, placeholder dirs)
- **blueprintVersion** — Identifies which blueprint and version was used
- **generatorVersion** — Documents which CLI generated the project (useful for debugging)

### Stability Guarantees

**Semantic Versioning:**
- MAJOR version (x.0.0) — Breaking changes to framework governance
- MINOR version (1.x.0) — New capabilities that don't break existing governance
- PATCH version (1.0.x) — Bug fixes and clarifications

### Version Metadata Uses

**For AI agents:**
- Check `frameworkVersion` to understand governance rules
- Reference `buildos/framework/` for all governance documents

**For CLI tools:**
- Detect outdated projects via `frameworkVersion`
- Use `frameworkCommit` for exact reproduction
- Determine compatibility for `buildos upgrade`

**For humans:**
- Understanding project's governance version at a glance
- Auditing which framework version a decision was made under
- Historical reconstruction of why patterns were used

---

## 8. Upgrade Strategy

### Upgrade Philosophy

BuildOS projects should be able to upgrade to new framework versions when teams are ready, with:
- Clear upgrade paths
- Compatibility information
- Safe, reversible processes
- Minimal friction

### Upgrade Triggers

Teams should consider upgrading when:
- Security issues are fixed in the framework
- Important governance clarifications are released
- New BuildOS features align with project needs
- Current framework version becomes deprecated

### Upgrade Process

**Phase 1: Decision**
```bash
buildos doctor  # Check current framework version and status
buildos info    # Show available upgrades
```

**Phase 2: Preparation**
```bash
git checkout -b framework-upgrade  # Create upgrade branch
buildos upgrade --check --from 1.0.0 --to 2.0.0  # Plan the upgrade
```

**Phase 3: Execution**
```bash
buildos upgrade --from 1.0.0 --to 2.0.0  # Apply upgrade
```

**Phase 4: Validation**
- Review changes: `git diff`
- Resolve conflicts if `buildos/framework/` was modified
- Run tests and validation
- Review new governance documents

**Phase 5: Commit**
```bash
git commit -m "refactor(buildos): upgrade framework from 1.0.0 to 2.0.0"
git push origin framework-upgrade
# Create PR, review, merge
```

### Upgrade Safety

**Before upgrading:**
1. Check if `buildos/framework/` files have been modified locally
2. Alert user if modifications exist (they'll be lost or require merge)
3. Create clear upgrade report showing what changes

**During upgrade:**
1. Preserve all `buildos/prompts/`, `buildos/roles/`, `buildos/templates/` customizations
2. Update `buildos/framework/*` to new version
3. Update `buildos/buildos.json` with new version numbers
4. Leave all project-owned files untouched

**After upgrade:**
1. Commit clearly shows what changed
2. Changelog documents any breaking changes
3. Instructions clarify required actions

### Handling Modified Framework Files

If a project has locally modified `buildos/framework/` files (which should be avoided):

1. **Detect the modification:**
   ```bash
   buildos upgrade --check  # Shows modifications
   ```

2. **Options:**
   - **Discard local changes** — `buildos upgrade --force`
   - **Merge with new version** — `buildos upgrade --merge` (manual review)
   - **Preserve local changes** — `buildos upgrade --preserve` (document why you modified framework)

3. **Prevention:**
   - Document clear guidance in `buildos/instructions.md`
   - Future `buildos validate` command can flag unauthorized framework modifications

### Rollback

Projects can rollback to previous framework version:
```bash
git checkout framework-upgrade~1  # Go back before upgrade
buildos doctor  # Verify framework version
```

Or upgrade to a different version:
```bash
buildos upgrade --to 1.5.0  # Downgrade/upgrade
```

---

## 9. Generator Implications

### Generation Pipeline

When `buildos new --blueprint saas --project myproject` runs:

```
┌─────────────────────────────────────────────────────┐
│ 1. User Input & Validation                          │
│   - Project name, blueprint, repository             │
│   - Validate against naming conventions             │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 2. Resolve Assets                                   │
│   - Load blueprint: blueprints/saas/                │
│   - Load runtime template: runtime/buildos/         │
│   - Load framework snapshot: framework/             │
│   - Capture current BuildOS version & commit        │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 3. Generate Version Metadata                        │
│   - frameworkVersion (from git tag/version file)   │
│   - frameworkCommit (current HEAD)                  │
│   - runtimeVersion, blueprintVersion, generatorVersion
│   - Store in buildos.json template                  │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 4. Create Project Structure                         │
│   - Create myproject/ directory                     │
│   - Copy blueprint structure (backend, frontend)    │
│   - Create buildos/ directory                       │
│   - Copy runtime template → buildos/                │
│   - Copy framework snapshot → buildos/framework/    │
│   - Create empty customization dirs                 │
│   - Populate buildos.json with metadata             │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 5. Initialize Git (optional)                        │
│   - git init                                        │
│   - git add -A                                      │
│   - git commit -m "Initial commit: BuildOS scaffold"
│   - git remote add origin <repository URL>          │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 6. Success Summary                                  │
│   - Show project structure                          │
│   - Display next steps                              │
│   - Provide documentation pointers                  │
└─────────────────────────────────────────────────────┘
```

### Asset Copying Strategy

| Asset | Source | Destination | Copied | Transformed | Notes |
|-------|--------|-------------|--------|-------------|-------|
| **Blueprint structure** | `blueprints/saas/` | `myproject/` | ✓ | No | Directories only, no files |
| **Blueprint README** | `blueprints/saas/README.template.md` | `myproject/README.md` | ✓ | Yes | Replace placeholders |
| **Runtime config** | `runtime/buildos/` | `myproject/buildos/` | ✓ | Yes | Populate buildos.json |
| **Framework snapshot** | `framework/` | `myproject/buildos/framework/` | ✓ | No | Complete copy |
| **buildos.json** | Template | `myproject/buildos/buildos.json` | Generated | Yes | Insert version metadata |
| **Instructions** | `runtime/buildos/instructions.md` | `myproject/buildos/instructions.md` | ✓ | No | No modification needed |
| **.gitignore** | Generated | `myproject/.gitignore` | Generated | Yes | Include .env, node_modules, etc. |
| **.claude/settings.json** | Generated | `myproject/.claude/settings.json` | Generated | Yes | Configure Claude Code settings |

### Generator Responsibilities

**The generator must:**
1. Verify BuildOS repository is available locally or fetch it
2. Extract framework version from `framework/` metadata (version file or git tag)
3. Capture current Git commit hash for reproducibility
4. Copy complete framework snapshot without modification
5. Populate version metadata in `buildos.json`
6. Create README with project-specific information
7. Initialize git repository with clear first commit message
8. Display success summary showing how to get started

**The generator should not:**
1. Modify framework files
2. Generate application code (only structure)
3. Make architectural decisions for the project
4. Include sensitive data or credentials

---

## 10. Future CLI Impact

### Current State (Work Order BO-065)

The repository is organized. The framework is a coherent package.

### Phase 1: Project Generation (BO-066 — planned)

```bash
buildos new --blueprint saas --project myproject
```

**Impact of distribution strategy:**
- Generator copies framework snapshot into every project
- Version metadata in `buildos.json` enables all future tooling
- Each project is self-contained and portable
- No external dependencies on BuildOS repository

### Phase 2: Project Introspection (future)

```bash
buildos info
```

**Impact of distribution strategy:**
- Read `buildos/buildos.json` to display:
  - Framework version and commit
  - Blueprint used
  - Generator version
  - Time since framework was updated
  - Recommendation to upgrade if outdated

**Implementation:** Simple JSON read + comparison to latest BuildOS version

### Phase 3: Health Check (future)

```bash
buildos doctor
```

**Impact of distribution strategy:**
- Validate framework snapshot exists and is readable
- Check if framework files have been modified (warn if yes)
- Compare `frameworkVersion` to latest BuildOS (recommend upgrade if outdated)
- Verify `buildos/buildos.json` is present and valid
- Check that project-owned directories are accessible
- Report status: ✓ Healthy, ⚠️ Warnings, ✗ Errors

**Implementation:** File existence checks, version comparison, modification detection

### Phase 4: Framework Upgrade (future)

```bash
buildos upgrade --from 1.0.0 --to 2.0.0
buildos upgrade --latest
```

**Impact of distribution strategy:**
- Use version metadata to determine upgrade path
- Download new framework snapshot from BuildOS repository
- Replace `buildos/framework/` with new version
- Preserve all `buildos/prompts/`, `buildos/roles/`, `buildos/templates/`
- Detect and alert on locally-modified framework files
- Update `buildos/buildos.json` with new versions
- Create clear commit showing what changed

**Implementation:** Git-based, with clear conflict resolution and rollback

### Phase 5: Governance Validation (future)

```bash
buildos validate
buildos validate --strict
```

**Impact of distribution strategy:**
- Check that framework assets are not corrupted
- Verify that project-owned assets don't violate framework governance
- Ensure role definitions are respected
- Validate artifact structure against templates
- Check that decisions are documented per artifact governance

**Implementation:** Framework-driven validation rules

### Phase 6: Multi-Project Management (far future)

```bash
buildos fleet info
buildos fleet upgrade --version 2.0.0  # Upgrade multiple projects
```

**Impact of distribution strategy:**
- Scan multiple projects, read each `buildos/buildos.json`
- Report aggregate version information
- Plan and execute coordinated upgrades
- Track governance compliance across fleet

**Implementation:** Batch processing of multiple projects

---

## 11. Implementation Roadmap for BuildOS Team

This section is informational and describes how BuildOS tooling will be built on this strategy:

### Immediate (BO-066)

- Implement `buildos new` based on this distribution strategy
- Ensure framework snapshot is properly copied
- Populate `buildos/buildos.json` with version metadata
- Create first generated projects using hybrid snapshot approach
- Validate that projects work offline and portably

### Short-term (future work orders)

- Implement `buildos info` command
- Implement `buildos doctor` command  
- Build framework snapshot validation
- Create first framework upgrade scenario (patch release)

### Medium-term

- Implement `buildos upgrade` command
- Build conflict detection for modified framework files
- Create upgrade guidance and migration docs
- Test framework upgrades across multiple projects

### Long-term

- `buildos validate` for governance checking
- `buildos fleet` for multi-project management
- Framework evolution strategies (major version bumps)
- Community blueprint contributions

---

## 12. Compatibility and Migration

### Compatibility with Prior Work

This strategy builds on successful completion of BO-065 (Architecture Refactor):

- Framework directory is well-organized
- Runtime structure is clear
- Blueprints are structured
- Version metadata structure is defined

### No Breaking Changes

This is an architectural decision that enables future implementation. It does not:
- Modify existing framework documents
- Change governance rules
- Require changes to existing projects (none exist yet)
- Impact BuildOS development workflow

### Migration Path (if approaches change)

If a future decision changes this strategy:
1. New framework version would document the change
2. Existing projects keep their framework version
3. `buildos upgrade` guides migration to new approach
4. Old approach remains supported for backward compatibility

---

## Conclusion

**Hybrid Snapshot Distribution (Option C)** is the official BuildOS framework distribution strategy.

This strategy:

✅ **Enables portability and autonomy** — projects work anywhere, offline  
✅ **Optimizes for AI effectiveness** — full context available synchronously  
✅ **Ensures reproducibility** — framework version captured permanently  
✅ **Provides upgrade path** — projects can evolve framework versions  
✅ **Supports future tooling** — enables doctor, upgrade, validate commands  
✅ **Maintains governance** — framework assets are immutable snapshots  
✅ **Scales without friction** — hundreds of projects, independent lifecycles  

The buildOS Generator (BO-066) will implement this strategy by:
1. Copying the framework snapshot into generated projects
2. Recording version metadata in `buildos/buildos.json`
3. Preserving clear ownership boundaries
4. Enabling future framework upgrades via metadata

This architectural decision establishes the stable contract that all future BuildOS tooling will depend on.

---

## References

- **BO-065** — Repository Architecture Refactor
- **BO-066** — BuildOS Generator Implementation (planned, will follow this strategy)
- `framework/constitution.md` — Governing principles
- `framework/artifact-governance.md` — How to manage artifacts
- `runtime/buildos/instructions.md` — AI agent runtime guidance
