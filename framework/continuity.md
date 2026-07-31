# Continuity Framework

> Status: QA Candidate v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

The Continuity Framework establishes how BuildOS projects preserve knowledge, maintain operational continuity, and remain fully resumable without dependence on conversational history or individual contributors.

BuildOS operates in environments where:
- Contributors (human or AI) may change or become unavailable
- Conversational context may be lost or unavailable
- Projects may be resumed after extended pauses
- Knowledge must survive beyond individual participants
- Work must be verifiable and auditable by any future contributor

The Continuity Framework solves this by establishing a principle of **repository-first operation** where all necessary project knowledge is stored in governed artifacts, version controlled, and queryable. A future contributor encountering the repository for the first time should be able to:
- Understand the project's intent and history
- Determine current project state
- Identify what work is in progress, completed, or blocked
- Resume work without re-establishing context from prior contributors
- Execute work according to governing frameworks without external explanation

---

## Objectives

**Repository-First Operation**
Projects operate from the repository as the authoritative source of project state. No critical information exists in conversation history, local state, or individual contributor memory.

**Continuity Across Contributors**
Contributors transition in and out of projects. The framework ensures that new contributors can understand project state and resume work without re-explaining context.

**Preservation of Project Knowledge**
Project knowledge (decisions, rationale, constraints, history) is captured in governed artifacts and remains available regardless of contributor changes.

**Resumability of Work**
Work can be resumed at any point with complete understanding of:
- What was attempted
- Why it was attempted
- What succeeded or failed
- What comes next

**Stateless Contribution**
Contributors don't accumulate knowledge over time that becomes necessary for the project. All necessary knowledge is in artifacts.

---

## Principles

### Repository First

The repository is the authoritative source of project state. All information necessary to understand and continue the project resides in version-controlled artifacts.

**Implication:** If something is not in the repository, it doesn't exist as far as future contributors are concerned.

### Stateless Contributors

Contributors bring their skills, experience, and effort to the project. They don't bring persistent project knowledge that the project depends on.

**Implication:** A new contributor should be able to read the repository and continue work without talking to prior contributors.

### Persistent Knowledge

All project knowledge — decisions, rationale, constraints, history, lessons learned — is captured in governed artifacts within the repository.

**Implication:** Work Order registers, artifact governance decisions, architecture decisions, design rationale, and implementation lessons are all recorded as artifacts that persist.

### Explicit Project State

The current state of the project (what's in progress, what's complete, what's blocked, what's planned) is explicit and queryable in the repository.

**Implication:** A contributor can answer "what should I work on?" by reading project state, not by asking other people.

### Controlled Continuity

Continuity is a property of the project, not of individual contributors or tools. Continuity is preserved through deliberate application of governance, not through tool automation or contributor memory.

**Implication:** BuildOS itself (via Constitution, Workflow, Artifact Governance, and Continuity Framework) ensures continuity. Tools support this but don't drive it.

---

## Continuity Artifacts

### Definition

Continuity Artifacts are governed artifacts whose purpose includes preserving project knowledge, recording project decisions, or establishing project state necessary for resumability.

Continuity Artifacts are a subset of all governed artifacts. Examples include:

- **Work Order Register** — Records all work orders, outcomes, and project history
- **Decision Records** — Architecture Decision Records (ADRs), Design Decision Records (DDRs), Implementation Decision Records (IDRs) capture the "why" behind decisions
- **Architecture Artifacts** — System design, constraints, integration strategy persist independently of contributors
- **Design Artifacts** — User experience rationale, design principles, design specifications persist
- **Implementation Artifacts** — Code, tests, documentation record how systems were built
- **Project Status Artifacts** — Release notes, deployment records, production state
- **Artifact Governance Artifacts** — This Continuity Framework itself, Workflow, Constitution

### Purpose of Continuity Artifacts

Continuity Artifacts serve two purposes:

1. **Immediate Project Governance** — They guide current work, gate decisions, and establish project rules (same purpose as all governed artifacts)
2. **Historical Preservation** — They record decisions, rationale, and context so future contributors can understand what was intended and why

### Responsibility for Continuity

**Project Owners** (typically Product Manager) are accountable for ensuring that project knowledge is preserved in artifacts.

**Contributors** (all roles) are accountable for recording their work, decisions, and rationale in artifacts as they work, not retroactively.

**Reviewers** are accountable for evaluating whether artifacts are sufficiently documented for future resumability.

---

## Integration with BuildOS Frameworks

### Relationship to Constitution

The Constitution (Article III: Artifacts as Source of Truth) establishes that artifacts are authoritative. The Continuity Framework extends this by requiring that artifacts contain all information necessary for resumability, not just decisions.

**Constitution Article III** states: "Artifacts are the source of truth." **Continuity Framework** requires: "All necessary project knowledge must be in artifacts."

### Relationship to Workflow

The Workflow defines six phases and decision gates. The Continuity Framework ensures that each phase creates artifacts documenting what was done, why, and what comes next.

**Workflow** defines what work happens. **Continuity Framework** ensures that work is recorded in resumable form.

### Relationship to Artifact Governance

The Artifact Governance establishes a five-stage artifact lifecycle (Creation → Independent Review → Approval → Baseline → Controlled Evolution). The Continuity Framework ensures that lifecycle governance also preserves knowledge.

**Artifact Governance** defines how artifacts move through stages. **Continuity Framework** ensures that the governance process itself is recorded and artifact rationale is preserved.

---

## Responsibilities

### Project Owner (Typically Product Manager)

- **Ensure continuity infrastructure** — Work Orders, status tracking, decision records exist and are maintained
- **Preserve project history** — Decisions, changes, and evolution are recorded in artifacts
- **Maintain project state** — Current work, blockers, and priorities are explicit in artifacts
- **Support contributor transitions** — When contributors change, ensure onboarding materials exist in the repository

### Contributors (All Roles)

- **Record work in artifacts** — As work is performed, document it. Don't wait for retroactive documentation
- **Capture rationale** — When making decisions, record the rationale (why was X chosen over Y?)
- **Document lessons learned** — If work revealed surprises, constraints, or opportunities, record them
- **Maintain project state** — Update project status as work progresses so future contributors know what's happening

### Reviewers

- **Evaluate continuity** — When reviewing artifacts, assess whether they contain sufficient information for a new contributor to understand and continue the work
- **Request documentation** — If artifacts lack rationale or decision context, request that they be added

---

## Definition of Done

Continuity is achieved in a project when:

- **All governed artifacts are recorded** — Every decision, work order, design, architecture, and implementation artifact is stored in the repository
- **Rationale is preserved** — Decision records (ADRs, DDRs, IDRs) document the "why" behind decisions
- **Project state is explicit** — Current work, completed work, and planned work are visible in the repository
- **Work is traceable** — Any artifact can be traced to the work order that created it, and vice versa
- **Knowledge is independent of contributors** — A new contributor reading the repository can understand project intent, history, and current state without talking to prior contributors
- **Transitions are supported** — When contributors change, project artifacts contain sufficient information for smooth handoff
- **Framework compliance is maintained** — Project governance follows Constitution, Workflow, and Artifact Governance; all artifacts are created and maintained according to these frameworks

---

## Related Documents

- [Constitution](./constitution.md) — Article III: Artifacts as Source of Truth establishes foundation for continuity
- [Workflow](./workflow.md) — Defines project phases; each phase produces continuity artifacts
- [Artifact Governance](./artifact-governance.md) — Defines artifact lifecycle; continuity is preserved through governance
- [Roles](../roles/README.md) — Each role has responsibility for recording their work in artifacts
- [Work Order Register](../work-order-register.md) — The project's historical record and current status tracker
