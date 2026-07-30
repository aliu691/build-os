# Roles

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

BuildOS is organized around **roles** — defined responsibilities that move work through the framework. This document explains what roles are, why they matter, how they work together, and the standard structure that every role specification follows.

Individual role documents (Product Manager, Architect, Designer, Frontend Engineer, Backend Engineer, QA, Reviewer, Release Manager) define each role's charter, responsibilities, inputs, outputs, and decision authority. This README is the entry point for understanding the role model itself.

---

## What is a Role?

A **role** is a set of responsibilities and accountabilities in BuildOS. A role is not:

- A person (though a person may perform a role)
- A specific AI model or tool (though agents or tools may execute a role)
- A job title (though job titles may correspond to roles)

A role is a **responsibility charter**: a clear definition of what work this role is accountable for, what inputs it receives, what outputs it must produce, and how it decides and collaborates.

**Key principles:**

- A role is defined by its responsibilities, not by the tool or person filling it.
- One person or AI agent can perform multiple roles.
- Multiple people or agents can collaborate to perform one role.
- Roles are abstract; they survive tool changes, model upgrades, and team restructures.

---

## Why Roles Exist

BuildOS uses roles to:

1. **Clarify responsibility.** When a piece of work arrives, everyone knows which role is accountable.
2. **Enable handoffs.** One role's output becomes the next role's input. The contract between roles is clear.
3. **Scale with agents.** AI agents can execute a role if they have a clear charter, inputs, outputs, and success criteria.
4. **Remain tool-agnostic.** Roles don't depend on any specific tool or model; they're defined by responsibility.
5. **Make process transparent.** New team members can read role documents and understand what each role does, how they collaborate, and how decisions are made.

---

## The BuildOS Role Model

### Responsibility, Not Tools

BuildOS defines roles by responsibility, not by tools or models:

- ❌ Bad: "The Frontend Engineer role uses React and Tailwind CSS."
- ✅ Good: "The Frontend Engineer role translates the design specification into interactive user interface code."

This means the role definition doesn't change when tools change. The specification remains the same; the implementation tools do.

### One Person, Multiple Roles

A single person or agent may perform multiple roles:

- A solo builder might be Product Manager, Designer, Frontend Engineer, and QA.
- A team might assign one role per person or have overlap.
- The role definitions don't change; only the staffing does.

**The workflow and responsibilities remain constant; the people and tools vary.**

### Role Collaboration

Roles collaborate by producing and consuming artifacts:

```
Product Manager Role
    ↓ (produces PRD)
    ↓
Architect Role
    ↓ (produces Architecture doc)
    ↓
Designer Role & Engineer Roles
    ↓ (produce Design & Code)
    ↓
QA Role & Reviewer Role
    ↓ (produce Test results & Review)
    ↓
Release Manager Role
```

Each role reads the previous role's output and produces output for the next role. The Constitution (Article VI) requires that every artifact has a defined lifecycle: creation, evaluation, approval, baseline, and evolution.

---

## BuildOS Roles

BuildOS includes eight core roles, organized by category:

### Product Leadership

- **Product Manager** — Defines what is being built and why. Owns the product vision and roadmap. Translates user needs into specifications.

### Architecture

- **Architect** — Designs the high-level solution approach. Defines technology choices, dependencies, and risks. Ensures the design aligns with the roadmap and is technically sound.

### Design

- **Designer** — Translates specifications into interaction flows, visual language, and user experience. Owns the user-facing design and design systems.

### Engineering

- **Frontend Engineer** — Builds the user-facing implementation. Translates design and specifications into interactive code.
- **Backend Engineer** — Builds the server-side and data logic. Owns the systems that make the product work.

### Quality

- **QA** — Tests that the execution meets the specification. Owns quality criteria and test coverage. Reports on readiness to release.

### Review & Release

- **Reviewer** — Independently evaluates code, design, and artifacts against the specification and architecture. Catches risks and provides feedback.
- **Release Manager** — Coordinates the final approval and release. Owns the deployment and communication of a release.

---

## Standard Role Specification

Every role document in BuildOS follows this standard structure:

### 1. Purpose

A one-sentence statement of why this role exists and what it contributes to BuildOS.

_Example: "The Product Manager role defines what is being built and why, translating user needs into specifications that guide all other roles."_

### 2. Responsibilities

A clear list of what this role is accountable for. Responsibilities are framed as outcomes, not tasks.

_Example: "The QA role is accountable for:_

- _Defining test criteria that verify execution meets specification._
- _Executing tests and documenting results._
- _Identifying and logging defects._
- _Approving readiness to proceed to Baseline phase."_

### 3. Inputs

What this role receives as inputs from upstream roles or the workflow.

_Example: "The QA role receives:_

- _Specification (from Product Manager)._
- _Acceptance tests (from Product Manager or Architect)._
- _Code and design artifacts (from Engineer roles)."_

### 4. Activities

The key work this role performs. Activities describe what the role does; they are not a task list.

_Example: "The QA role:_

- _Reads the acceptance tests and specification._
- _Designs and runs tests._
- _Documents results and defects._
- _Reports on readiness."_

### 5. Outputs

What this role produces. Outputs are artifacts that become inputs to downstream roles.

_Example: "The QA role produces:_

- _Test plan (created, evaluated, approved per Constitution Article VI)._
- _Test results and coverage report._
- _Defect log._
- _Readiness recommendation."_

### 6. Decision Authority

What decisions this role has authority to make. Every role has at least one decision point; some have more.

_Example: "The QA role decides:_

- _Does the execution meet the acceptance tests?_
- _Is the quality bar acceptable to proceed to Baseline?_
- _Are there showstoppers (defects that block release)?"_

### 7. Constraints

Constraints that apply to this role's work. What limits its authority? What rules must it follow?

_Example: "The QA role must:_

- _Not override the Specification (per Workflow Phase 2)._
- _Conduct independent testing (not rely on the builder's tests)._
- _Document all findings clearly._
- _Not approve its own work (evaluation must be independent)."_

### 8. Collaborates With

Which other roles does this role work directly with?

_Example: "The QA role collaborates with:_

- _Product Manager (clarifies acceptance tests)._
- _Architect (understands architectural intent)._
- _Engineer roles (understands implementation)._
- _Reviewer (aligns on quality bar)."_

### 9. Definition of Done

How do we know this role has successfully completed its work? What criteria must be met?

_Example: "The QA role's work is done when:_

- _Test plan is created, evaluated, and approved._
- _All tests are executed and documented._
- _All defects are logged and addressed._
- _Readiness recommendation is recorded (signed off)."_

---

## How Roles Fit Into BuildOS

**Workflow** defines how work moves (Intake → Planning → Execution → Validation → Baseline → Evolution).

**Roles** define who performs the work and what they're accountable for.

**Templates** define what each role produces (the format and structure of artifacts).

Together, they form the complete delivery framework: work flows through phases, roles execute at each phase with clear responsibilities, and templates ensure consistent output.

---

## Governance

Roles must comply with the Constitution:

- **Article II (Humans Retain Decision Authority):** Every role has explicit decision authority. Decisions are made by humans; agents execute decisions.
- **Article III (Artifacts are the Source of Truth):** Every role produces artifacts. Conversations don't count; artifacts do.
- **Article IV (Roles Define Responsibilities, Not Tools):** Role definitions are tool-agnostic. A role survives tool changes.
- **Article VI (Artifact Lifecycle):** Every artifact a role produces must move through the lifecycle: creation → evaluation → approval → baseline → evolution.

Roles are orchestrated by the Workflow. Each phase of the workflow involves specific roles and decision points.

---

## Adding or Modifying Roles

When a new role is needed or an existing role changes:

1. **Proposal:** Document the new role or changes as a pull request with rationale.
2. **Evaluation:** Ensure the role aligns with the Workflow, doesn't duplicate existing roles, and complies with the Constitution.
3. **Review:** The Product Manager and Architect review for fit within the framework.
4. **Approval:** Approved roles are merged into the framework; role documents are versioned like any other artifact.

Roles are not added lightly; they represent a commitment that this responsibility will exist in every project. Before adding a role, ask: "Is this responsibility always needed? Is it distinct from existing roles? Does the Workflow support it?"

---

## Related Documents

- [Constitution](../01-framework/constitution.md) — the governing rules that roles must comply with
- [Workflow](../01-framework/workflow.md) — how work moves; roles are the "who"
- [Vision](../00-overview/vision.md) — where BuildOS is headed
- [Mission](../00-overview/mission.md) — what BuildOS does today
- [Principles](../00-overview/principles.md) — the values that guide how roles work
