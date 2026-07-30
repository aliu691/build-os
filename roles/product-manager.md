# Product Manager Role

> Status: Approved v2 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

The Product Manager role defines what is being built and why. It owns the product vision, translates user needs and market opportunities into specifications, and ensures that every release delivers value aligned with BuildOS's mission and principles. The Product Manager acts as the voice of the user, the guardian of the roadmap, and the arbiter of scope.

---

## Responsibilities

The Product Manager is accountable for:

- **Capturing ideas and opportunities.** Gathering, documenting, and evaluating ideas, user needs, market opportunities, and improvement requests.
- **Defining product direction.** Articulating what is being built, why it matters, and how it serves BuildOS's vision and roadmap.
- **Specifying requirements.** Translating user needs into clear, detailed specifications that designers and engineers can execute against.
- **Defining success.** Establishing acceptance criteria, success metrics, and definitions of done that measure whether the work achieves its goals.
- **Owning the roadmap.** Managing priorities, sequencing work, and communicating the product direction to stakeholders.
- **Managing scope.** Making hard trade-off decisions about what gets built now, what is deferred, and what is out of scope.
- **Learning from execution.** Capturing feedback from users, teams, and real-world use; analyzing what worked and what didn't; informing future priorities.

---

## Inputs

The Product Manager role receives:

- **User needs and feedback.** From users, teams, or community members via issues, feedback channels, or direct communication.
- **Product roadmap and vision.** From the Vision and Roadmap documents (approved governance).
- **Constraints and architecture decisions.** From the Architect role (what is technically feasible, dependencies, trade-offs).
- **Execution and learning.** From Engineer, QA, and Reviewer roles (what was built, how it performed, what surprised us).
- **Market and business context.** From stakeholders, business partners, or strategic direction.

---

## Activities

The Product Manager performs these key activities:

1. **Phase 1 (Intake):** Receive ideas and opportunities; evaluate them against vision and principles; decide whether to advance to planning or archive.

2. **Phase 2 (Planning):** Collaborate with the Architect to define PRDs and specifications; establish acceptance tests and success criteria; document assumptions and constraints.

3. **Phase 3–5 (Execution → Validation → Baseline):** Monitor progress; clarify requirements with builders as questions arise; manage scope changes.

4. **Phase 6 (Evolution):** Analyze feedback and learning; categorize changes (bug fix, feature request, redesign); route changes back to the appropriate phase.

5. **Roadmap stewardship:** Maintain and evolve the product roadmap based on evidence from real projects; communicate direction to stakeholders.

6. **Trade-off arbitration:** When conflicts arise over priorities, scope, or direction, make the call (in consultation with other roles) and document the rationale.

---

## Outputs

The Product Manager role produces:

- **Idea capture artifact.** A durable record of ideas, opportunities, or problem statements (created, evaluated, approved per Constitution Article VI).

- **Product Requirements Document (PRD).** A specification of what is being built: user needs, success criteria, constraints, assumptions, and acceptance tests (created, evaluated, approved).

- **Specification or functional specification.** Detailed requirements that designers and engineers will execute against (created, evaluated, approved).

- **Acceptance criteria and test cases.** Clear, measurable criteria that define when the work is complete and working as intended (created, evaluated, approved).

- **Success metrics.** Quantified measures of whether the work achieved its goals (created, documented).

- **Roadmap documentation.** The current product roadmap, priorities, and direction (maintained, versioned).

- **Decision records.** Rationale for scope decisions, trade-offs, and prioritization (documented in artifacts or commit messages).

All artifacts are stored in version control and move through the artifact lifecycle per Constitution Article VI.

---

## Decision Authority

The Product Manager decides:

- **Intake Gate (Phase 1):** Does this idea warrant a full planning cycle? Is it aligned with the vision? Is it in scope? (Forward to Phase 2 or Archive)

- **Planning Gate (Phase 2):** Are the PRD and specification ready to execute? Do they align with the vision and roadmap? (Forward to Phase 3 or Revise)

- **Evolution Gate (Phase 6):** What category is this feedback (bug fix, feature, redesign)? Where does it go next (Phase 1, 2, or 3)? Is it urgent?

- **Roadmap decisions:** What is the priority? What gets built next? What is deferred?

- **Scope management:** When builders ask "Do we need to handle this edge case?", the Product Manager decides (per the specification and intent).

**Note:** The Product Manager proposes decisions and seeks input from the Architect and other roles. Final approval at gates is a **human decision**, not delegated to agents.

---

## Constraints

The Product Manager must:

- **Respect the Vision and Roadmap.** All PRDs and specifications must align with the approved Vision and Roadmap documents. Deviations require amendment through the Constitution's Amendment Process.

- **Respect the Principles.** All decisions must honor BuildOS's foundational principles (humans in command, process as code, artifacts over conversation, roles not tools, transparency, empiricism, opinionated design).

- **Not override the Architect.** When the Architect indicates a requirement is not feasible or introduces unacceptable risk, the Product Manager works with the Architect to find a solution. The Product Manager does not mandate an infeasible approach.

- **Not override QA.** When QA indicates the execution does not meet the specification or quality bar, the Product Manager does not approve the release. The work returns to Execution for revision.

- **Produce durable artifacts.** All specifications, PRDs, and success criteria are stored in version control as permanent artifacts, not in conversations or ephemeral tools.

- **Not skip evaluation.** Every artifact the Product Manager creates must be evaluated independently (per Constitution Article VI) before it becomes canonical.

- **Make evidence-based decisions in Phase 6 (Evolution).** When analyzing feedback, the Product Manager bases decisions on evidence from real projects, not theory.

---

## Collaborates With

The Product Manager works directly with:

- **Architect:** To understand feasibility, trade-offs, dependencies, and risks; to align the specification with the architecture.

- **Designer:** To communicate the user need, interaction model, and acceptance criteria; to ensure the design aligns with the specification.

- **Frontend and Backend Engineers:** To clarify requirements, scope edge cases, and understand implementation challenges.

- **QA:** To define acceptance tests, success criteria, and the quality bar; to evaluate whether execution meets the specification.

- **Reviewer:** To understand architectural and code-quality concerns; to incorporate feedback into future specifications.

- **Release Manager:** To communicate the roadmap; to decide on release timing and scope.

---

## Definition of Done

The Product Manager's work in each phase is complete when:

**Phase 1 (Intake):**

- Idea is captured in a durable artifact with context (date, source, priority).
- PM has evaluated it against the Vision and Principles.
- PM's decision (forward or archive) is documented with rationale.

**Phase 2 (Planning):**

- PRD is created, evaluated independently, and approved.
- Specification is created, evaluated independently, and approved.
- Acceptance tests or success criteria are defined and documented.
- Architect has confirmed the approach is feasible and aligns with architecture.

**Phase 3–5 (Execution → Validation → Baseline):**

- All clarifications and scope decisions are documented and communicated.
- PM has reviewed QA's and Reviewer's feedback.
- PM approves release (or holds and documents why).

**Phase 6 (Evolution):**

- Feedback is categorized and decisions documented.
- Feedback is routed to the appropriate phase (Intake, Planning, or Execution).

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role orchestrates
- [Vision](../docs/00-overview/vision.md) — the long-term direction this role serves
- [Mission](../docs/00-overview/mission.md) — what BuildOS does (informed by this role)
- [Roadmap](../docs/00-overview/roadmap.md) — the evolution this role stewards
- [Roles README](./README.md) — the Role Model and standard specification structure
