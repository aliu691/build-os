# Artifact Governance

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30
>
> Changelog: v2 revises v1 per review BO-032 — expands Artifact Governance Pattern with operational
> paths and decision outcomes (Approve/Approve with Recommendations/Request Revision/Reject);
> explicitly distinguishes Independent Review from Quality Assurance; establishes governance
> inheritance rule for all future Work Orders.

## Purpose

This document defines the standard operational governance model used for all BuildOS artifacts. It establishes the governance patterns, work order structures, decision rules, and operational procedures that enable BuildOS to deliver reliable, auditable, and continuously improving software delivery.

Artifact governance is the practical application of the Constitution in day-to-day work. While the Constitution defines the binding rules, this document shows how those rules are operationalized through roles, workflows, review, and decision-making.

---

## Scope

This document covers:

- **Artifact Governance Pattern:** How artifacts move through their lifecycle.
- **Work Order Structure:** How work is defined, communicated, and completed.
- **Decision Rules:** How decisions are made, documented, and enforced.
- **Governance Rules:** How BuildOS ensures compliance with the Constitution and Workflow.

This document does not redefine the Constitution, Workflow, or Role Model; it operationalizes them.

---

## Standard Artifact Governance Pattern

### Conceptual Lifecycle (Constitution Article VI)

The Constitution defines five conceptual stages every artifact must pass through:

**Creation → Independent Evaluation → Approval → Baseline → Controlled Evolution**

### Operational Lifecycle (This Document)

This section defines the operational implementation of the conceptual lifecycle, including decision branches and revision loops.

**Operational Flow:**

```
Creation
    ↓
Independent Evaluation
    ↓
Decision Outcomes:
    • Approve → proceed to Baseline
    • Approve with Recommendations → gatekeeper decides on immediate incorporation or deferral → proceed to Baseline
    • Request Revision → return to Revision
    • Reject → return to Revision
    ↓
[If Revision Required]
    ↓
Revision (artifact owner makes changes based on feedback)
    ↓
Independent Evaluation (re-evaluate the revised artifact)
    ↓
Quality Validation (confirm changes address findings; no new issues introduced)
    ↓
Approval (gatekeeper approves revised artifact)
    ↓
Baseline (revised artifact becomes canonical)
    ↓
Controlled Evolution (artifact evolves based on learning)
```

The Constitution defines the conceptual journey. This document defines the operational execution, including how decision outcomes route artifacts through revision cycles if needed.

---

## Operational Artifact Lifecycle Stages

### 1. Creation

**Who:** The responsible role for the artifact (e.g., Product Manager creates PRDs, Architect creates design docs, Reviewer creates review artifacts).

**What happens:**

- The role produces the artifact according to their responsibilities and the artifact's template (if one exists).
- The artifact is stored in version control with metadata (date, author, purpose).
- The artifact is marked as "Draft" or "In Progress" to signal it is not yet canonical.

**Completion:** The artifact exists and is readable. It does not need to be perfect; it needs to be reviewable.

---

### 2. Independent Evaluation

**Who:** A role independent of the artifact owner (e.g., PRDs are evaluated by Architect and QA; code is reviewed by the Reviewer role).

**What happens:**

- The evaluator reads the artifact thoroughly.
- The evaluator checks for completeness, consistency, compliance, and risks.
- The evaluator documents findings in a review artifact.
- The evaluator provides an outcome: Approve, Approve with Recommendations, Request Revision, or Reject.

**Completion:** A review artifact exists with documented findings and an explicit outcome.

---

### 3. Approval

**Who:** The gatekeeper role for the artifact at its lifecycle stage (e.g., Product Manager at planning gates, Release Manager at baseline gates).

**What happens:**

- The gatekeeper reviews the artifact and the review findings.
- If the Reviewer outcome is "Approve" or "Approve with Recommendations," the gatekeeper decides whether to proceed.
  - If "Approve with Recommendations," the gatekeeper decides whether to incorporate recommendations now or queue for future work.
- If the Reviewer outcome is "Request Revision" or "Reject," the gatekeeper holds and requires revision.
- The gatekeeper's decision is documented in the artifact or a decision record.

**Completion:** An approval decision is made and documented. The artifact may proceed or must return for revision.

---

### 4. Baseline

**Who:** The artifact becomes canonical and its baseline version is established.

**What happens:**

- The approved artifact is marked as "Approved" or "Baseline" in version control.
- The baseline version is clearly tagged (e.g., a git tag, version number, or status marker).
- The artifact is now the canonical reference for all downstream work.
- The artifact is frozen from modification without governance (changes require re-evaluation and re-approval).

**Completion:** The artifact is baseline. Downstream roles can rely on it.

---

### 5. Controlled Evolution

**Who:** The artifact owner (or a new role, if ownership changes).

**What happens:**

- After baseline, the artifact may evolve in response to learning, feedback, or changed circumstances.
- Changes to the artifact are committed to version control with rationale.
- Significant changes may require re-evaluation and re-approval (depending on the artifact type and change magnitude).
- All versions are auditable; superseded versions are marked as deprecated, not deleted.

**Completion:** The artifact evolves; its history remains auditable. No versions are lost.

---

## Independent Review vs. Quality Assurance

BuildOS uses two independent evaluation activities. Both are essential; both are distinct.

### Independent Review

**Purpose:** Evaluates whether an artifact is suitable, complete, consistent, compliant, and ready to become canonical.

**Performed by:** The Reviewer role (or designated reviewer for framework governance documents).

**Evaluation criteria:**

- Is the artifact complete? (Does it contain all required sections and information?)
- Is it consistent? (Internally, and with related artifacts?)
- Is it compliant? (Does it follow the Constitution, Workflow, and standards?)
- Are there risks or concerns? (Technical, architectural, or procedural risks?)
- Is it ready? (Can downstream roles rely on it, or must it be revised?)

**Outcome:** Approve, Approve with Recommendations, Request Revision, or Reject. Documented in a review artifact.

**Authority:** The Reviewer role documents findings and recommends an outcome. The gatekeeper role (Product Manager, Release Manager, etc.) enforces the outcome (proceeds if Approve/Approve with Recommendations; requires revision if Request Revision/Reject).

### Quality Assurance

**Purpose:** Validates whether an artifact satisfies its defined acceptance criteria and works as specified.

**Performed by:** The QA role (for implementation artifacts) or designated evaluator (for other artifact types).

**Evaluation criteria:**

- Do all acceptance tests pass?
- Does the artifact meet its specified definition of done?
- Are there defects or gaps in meeting the requirements?
- Does the artifact perform as expected in the conditions it will encounter?

**Outcome:** Pass (all criteria met), or Fail (gaps or defects found that must be addressed). Documented in a QA artifact (test results, coverage report, etc.).

**Authority:** The QA role documents results and recommends readiness. The gatekeeper role (Release Manager, etc.) enforces the outcome.

### Why Both Are Essential

- **Independent Review** ensures the artifact is _suitable_ (correct format, complete, compliant, sound).
- **Quality Assurance** ensures the artifact _works_ (meets acceptance criteria, performs correctly).

An artifact can pass review (suitable, sound) but fail QA (doesn't meet acceptance criteria). Both must pass for an artifact to proceed to baseline.

### Shared Principle: Independence

Both roles are independent of the artifact owner. Neither role owns the artifact. Both evaluate against objective standards (the Constitution, Workflow, specifications, acceptance criteria). This independence prevents bias and catches problems early.

---

## Standard Work Order Structure

Every piece of work in BuildOS is communicated and tracked using a standard work order structure. Work orders ensure clarity, accountability, and auditability.

### Standard Sections

1. **Role:** Who is performing this work? (e.g., Product Manager, Reviewer, QA)
2. **Objective:** What is the work trying to accomplish? (e.g., "Create docs/roles/README.md")
3. **Inputs:** What does this work consume? (e.g., approved documents, existing artifacts)
4. **Constraints:** What limits this work? (e.g., "Do not modify Constitution," "Do not introduce implementation details")
5. **Definition of Done:** When is the work complete? What criteria must be met?
6. **Output:** What is produced? What artifact is delivered?

### Work Order Lifecycle

1. **Initiation:** A work order is created and communicates the work to be done.
2. **Execution:** The role performs the work according to constraints and objectives.
3. **Completion:** The work is completed per the Definition of Done.
4. **Review:** If required by governance, the output is reviewed (see Artifact Governance Pattern).
5. **Archival:** The work order is archived in the work tracking system or documented in the artifact history.

### Example Work Orders

Throughout BO-001 to BO-030, all work has followed this structure:

- BO-002: Review docs/00-overview/vision.md (Draft v1)
- BO-003: Revise docs/00-overview/vision.md (based on BO-002 recommendations)
- BO-024: Revise roles/product-manager.md to conform to Role Specification

This creates a traceable chain: work order → artifact creation → review → revision → approval.

---

## Decision Rules

BuildOS has clear rules for how decisions are made, documented, and enforced.

### Decision Hierarchy

Decisions fall into four categories:

1. **Role decisions:** Decisions made by a specific role within their authority (e.g., Product Manager decides scope at Intake gate).
2. **Gatekeeper decisions:** Decisions made at workflow gates to approve or hold work (e.g., Release Manager approves release).
3. **Evaluator decisions:** Decisions made by independent evaluators (e.g., Reviewer determines review outcome).
4. **Governance decisions:** Decisions about the framework itself (e.g., amendments to the Constitution).

### Decision Documentation

Every decision must be:

- **Explicit:** The decision is clearly stated (not implied or assumed).
- **Documented:** The decision is recorded in an artifact (not left to conversation).
- **Rationale included:** Why was this decision made? What factors were considered?
- **Discoverable:** The decision is in version control and linked to the artifact it affects.
- **Reversible or irreversible:** The decision document clarifies whether it can be changed later.

### Decision Gates

Decisions occur at workflow gates:

| Gate                       | Phase   | Decision Maker              | Decision                        |
| -------------------------- | ------- | --------------------------- | ------------------------------- |
| **Intake Gate**            | Phase 1 | Product Manager             | Forward to Planning or Archive? |
| **Planning Gate**          | Phase 2 | Product Manager + Architect | Ready to execute?               |
| **Execution Confirmation** | Phase 3 | Builder                     | Execution complete?             |
| **Validation Gate**        | Phase 4 | QA + Reviewer               | Quality bar met?                |
| **Baseline Gate**          | Phase 5 | Release Manager             | Ready to release?               |
| **Evolution Gate**         | Phase 6 | Product Manager             | How to categorize feedback?     |

Each gate is a human decision point. Agents may prepare information or analysis; humans decide.

---

## Governance Rules

These rules ensure that BuildOS operates with integrity, transparency, and auditability.

### Rule 1: Process as Code

**Statement:** All processes, workflows, and decision rules are versioned in the repository.

**Application:** When a process changes (e.g., the Workflow is updated, a role charter changes), the change goes through a pull request, is reviewed, and is committed with rationale. Future teams can read the git history and understand how the process evolved.

### Rule 2: Artifacts as Source of Truth

**Statement:** Decisions and work are recorded in artifacts, not in conversations.

**Application:** When a decision is made, it is documented in an artifact (a decision record, a comment in a specification, or a review document). Conversations may happen, but the artifact is the record of truth.

### Rule 3: Humans Decide, Agents Execute

**Statement:** Every irreversible decision is made by a human; agents provide analysis and recommendations.

**Application:** An AI agent may analyze code and provide feedback (agents execute), but the decision to approve or reject is made by the Reviewer role (a human). An agent may draft a PRD, but the decision to greenlight it is made by the Product Manager.

### Rule 4: Independent Evaluation

**Statement:** Every artifact must be evaluated by someone independent of its creator before becoming canonical.

**Application:** PRDs are evaluated by Architect and QA (not the PM alone). Code is reviewed by the Reviewer (not the builder). This prevents blindness and catches problems early.

### Rule 5: Transparent and Auditable

**Statement:** BuildOS operates in the open. All decisions, artifacts, and process are visible and auditable.

**Application:** Review findings are documented. Decision rationale is recorded. Artifact history is preserved in git. Anyone can audit the framework and understand why a decision was made or a direction was taken.

### Rule 6: Role Accountability

**Statement:** Every role is accountable for defined outputs and decisions.

**Application:** When work is not delivered or a decision is questioned, there is a clear responsible role. Accountability drives quality and trust.

### Rule 7: Continuous Improvement

**Statement:** BuildOS improves through empiricism: learning from real projects, not theory.

**Application:** When a process doesn't work in practice, teams document the issue. The Issue becomes data. The framework is revised based on evidence, not planning alone. The Constitution Amendment Process operationalizes this.

### Rule 8: Governance Inheritance

**Statement:** Unless otherwise specified, all BuildOS Work Orders inherit the Standard Artifact Governance Pattern and Standard Work Order Structure defined in this document.

**Application:** Every Work Order follows the six-section template (Role, Objective, Inputs, Constraints, Definition of Done, Output). Every artifact produced by a Work Order moves through the operational lifecycle (Creation → Independent Evaluation → Decision Outcomes → Revision [if needed] → Approval → Baseline → Evolution). This eliminates the need to redefine governance for every work order; governance is inherited from this canonical source.

**Exception:** A Work Order may explicitly override or extend this governance. When it does, the override is clearly stated in the Work Order's constraints or scope section.

---

## Relationships to Constitution and Workflow

### How Artifact Governance Implements the Constitution

| Constitution Article                                       | Artifact Governance Practice                                                |
| ---------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Article I:** BuildOS Governs Itself                      | All artifacts (framework and product) are in version control and versioned. |
| **Article II:** Humans Retain Decision Authority           | Every gate has an explicit human decision.                                  |
| **Article III:** Artifacts are the Source of Truth         | All work is recorded in artifacts; conversations do not count.              |
| **Article IV:** Roles Define Responsibilities, Not Tools   | Work orders clarify role accountability; governance is tool-agnostic.       |
| **Article V:** Process is Version Controlled               | All processes (Workflow, governance rules, role charters) are in the repo.  |
| **Article VI:** Every Artifact Has a Lifecycle             | All artifacts move through the five-stage governance pattern.               |
| **Article VII:** Continuous Improvement Through Empiricism | Evidence from real projects drives framework updates.                       |

### How Artifact Governance Enables the Workflow

The Workflow defines _how work moves_ (six phases). Artifact Governance defines _how each artifact moves_ through those phases.

- **Workflow Phase 1 (Intake):** Artifact Governance ensures ideas are captured in durable artifacts and decisions are documented.
- **Workflow Phase 2 (Planning):** Artifact Governance ensures PRDs and specifications are created, evaluated independently, and approved.
- **Workflow Phase 3 (Execution):** Artifact Governance ensures implementation artifacts (code, design) are produced and evaluated.
- **Workflow Phase 4 (Validation):** Artifact Governance ensures QA and Reviewer artifacts are created with findings.
- **Workflow Phase 5 (Baseline):** Artifact Governance ensures release decisions are documented and versions are tagged.
- **Workflow Phase 6 (Evolution):** Artifact Governance ensures feedback is captured and decisions on how to route it are recorded.

---

## Governance in Practice: Example

Here is how artifact governance operates in a real scenario:

**Scenario:** A Product Manager creates a PRD for a new feature.

1. **Creation:** PM writes the PRD and commits it to the repo as a draft.
2. **Independent Evaluation:** Architect reviews for feasibility; QA reviews for testability. Both produce review artifacts with findings.
3. **Approval:** Product Manager reviews the findings. For "Approve with Recommendations," PM decides whether to incorporate feedback now or defer. PM approves PRD or holds for revision.
4. **Baseline:** PRD is marked as "Approved" and becomes canonical. Designers and engineers can now rely on it.
5. **Evolution:** After the feature is built and shipped, PM captures user feedback. PM decides: is this a bug fix (return to Execution), a feature request (return to Planning), or a new idea (return to Intake)? Feedback is routed accordingly.

Throughout, decisions are documented, reviews are durable, and the artifact history is auditable.

---

## Related Documents

- [Constitution](./constitution.md) — the binding rules this governance operationalizes
- [Workflow](./workflow.md) — the sprint/project phases that this governance enables
- [Roles README](../roles/README.md) — the roles that execute this governance
