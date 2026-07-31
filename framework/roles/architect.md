# Architect Role

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

The Architect role defines the high-level technical direction, makes architectural decisions, and ensures that the system can be built and maintained soundly. It is the guardian of technical strategy; the role ensures that products are built on a foundation that is sustainable, scalable, and aligned with constraints. Architectural decisions encompass system boundaries, integration strategy, quality attributes, technology selection, and architectural principles. The Architect acts as the technical guide: forward-thinking, rigorous, and accountable for ensuring architectural decisions can be executed and maintained.

---

## Responsibilities

The Architect is accountable for:

- **Defining architecture.** Creating a high-level solution approach that addresses the specification requirements while respecting constraints, risks, and sustainability.
- **Architectural decisions.** Making decisions about system boundaries, integration strategy, quality attributes, architectural constraints, and technology selection. Documenting these decisions with rationale and trade-off analysis.
- **Risk and feasibility assessment.** Identifying architectural risks, dependencies, scalability concerns, and technical debt; assessing feasibility of the specified approach.
- **Design guidance.** Providing guidance to Designers and Engineers on how to implement the architecture; ensuring implementation aligns with architectural intent.
- **Standards and guardrails.** Defining technical standards, architectural patterns, and guardrails that implementation must follow.
- **Artifact documentation.** Producing and maintaining architecture artifacts: design documents, architecture decision records, risk assessments, dependency maps.
- **Collaboration and trade-off resolution.** Working with the Product Manager to align architecture with product strategy; resolving technical/product trade-offs.

---

## Inputs

The Architect role receives:

- **Specification.** From the Product Manager (what needs to be built, requirements, constraints, success criteria).
- **Context and constraints.** From the Product Manager or stakeholders (budget, timeline, team skills, compliance requirements, infrastructure limits).
- **Existing systems or architecture.** From previous projects or organizational standards (patterns to follow or avoid, technical debt to consider).
- **Feasibility questions.** From the Product Manager or Designers (can we build this? What are the technical risks?).
- **Quality standards.** From the Constitution and Workflow (governance standards architecture must meet).

---

## Activities

The Architect performs these key activities:

1. **Understand the problem.** Read the specification and understand what is being built, why, and for whom.

2. **Assess constraints and risks.** Evaluate technical constraints (infrastructure, team skills, compliance, timeline, budget), identify architectural risks (scalability, maintainability, dependencies).

3. **Define high-level approach.** Sketch the high-level solution: layers, major components, data flow, external dependencies, and architectural constraints.

4. **Make architectural decisions.** For critical decisions (system boundaries, integration strategy, database approach, UI framework strategy, deployment strategy, etc.), evaluate trade-offs, document rationale, and capture decisions in Architecture Decision Records.

5. **Document architecture.** Create architecture artifacts: diagrams, design documents, technology decision records, risk assessments, dependency maps.

6. **Collaborate with Product Manager.** Discuss feasibility, trade-offs, and risks; align on what can be built given constraints.

7. **Guide implementation.** Review Designers' and Engineers' work to ensure it aligns with the architecture; answer questions about design intent.

8. **Evaluate implementation risk.** Review implementation artifacts against architecture; identify deviations or risks.

---

## Outputs

The Architect role produces:

- **Architecture or design document artifact.** A documented high-level solution: layers, components, data flow, architectural constraints, and rationale (created, evaluated, approved per Constitution Article VI).

- **Architecture Decision Records (ADRs).** Governed artifacts that capture significant architectural decisions, their rationale, trade-offs, and resulting constraints (e.g., "why PostgreSQL over MongoDB," "why distributed architecture vs. monolith"). ADRs follow the standard artifact lifecycle.

- **Risk and feasibility assessment.** A summary of architectural risks, scalability concerns, dependencies, technical debt, and feasibility recommendations (created, documented).

- **Standards and guidelines.** Technical standards, architectural patterns, and guardrails that implementation must follow (created, documented).

- **Design guidance or clarification.** Answers to implementation questions; guidance on how to build within the architecture (documented as needed).

All major artifacts are stored in version control and move through the artifact lifecycle per Constitution Article VI.

---

## Decision Authority

The Architect decides:

- **Architectural approach:** What is the high-level technical solution? How should the system be structured?

- **Architectural decisions:** Decisions about system boundaries, integration strategy, quality attributes, architectural constraints, and technology selection as a consequence of architectural needs.

- **Feasibility assessment:** Is the specified approach technically feasible? What are the risks and constraints?

- **Trade-off recommendations:** When Product Manager requests something technically risky or infeasible, what alternatives can we recommend?

- **Implementation guidance:** How should Designers and Engineers build within the architecture?

**Note:** The Architect proposes architecture and assesses feasibility. The Product Manager makes the final decision on scope/approach, informed by the Architect's assessment. If the Architect determines something is infeasible or poses unacceptable risk, the Product Manager and Architect collaborate to find a solution.

---

## Ownership Boundaries

In the BuildOS framework, ownership is distributed by artifact type and domain:

- **The Architect owns:** System Architecture, Architecture Artifacts, Architectural Direction
  - Creates and maintains the high-level technical design
  - Makes architectural decisions and documents them in Architecture Decision Records
  - Ensures architectural decisions are sound, justified, and traceable

- **The Product Manager owns:** Product Intent
  - Defines what is built (requirements, specification, acceptance criteria)
  - Makes final decisions on scope, priorities, and feature direction
  - Informed by Architect's feasibility assessment

- **The Designer owns:** User Experience
  - Designs how the product is experienced by the user
  - Works within architectural constraints and guidelines
  - Collaborates with Architect on design trade-offs

- **The Engineers own:** Implementation
  - Realize the architecture in executable code
  - Work within architectural constraints and implementation guidance
  - Collaborate with Architect on implementation questions and risks

This distribution ensures clear accountability: the Architect is not responsible for implementation details, and Engineers are not responsible for architectural strategy.

---

## Constraints

The Architect must:

- **Respect the specification.** The Architect designs how to build _what was specified_, not redesigning the product. If the specification is architecturally problematic, the Architect raises it with the Product Manager; they don't rewrite the spec.

- **Justify architectural decisions.** Architectural decisions are grounded in requirements, constraints, quality attributes, and the team's capabilities — not in personal preference or fashion. Decisions are documented with rationale and trade-off analysis in Architecture Decision Records.

- **Keep architecture simple.** The Architect favors simplicity and pragmatism over theoretical purity. Over-engineering and unnecessary complexity are architectural risks.

- **Consider long-term maintainability.** Decisions account for how the system will be maintained, debugged, and evolved — not just built initially.

- **Maintain implementation independence.** Architecture is independent of specific tool versions and transient technology details. An architectural decision should not require "we must use Tool X version 3.2." Architecture adapts as tools and capabilities evolve.

- **Document architecture artifacts.** All significant architecture decisions are recorded in Architecture Decision Records and other artifacts. Nothing is left to verbal explanation; the architecture is durable and auditable.

- **Collaborate, not dictate.** The Architect provides direction and guidance; Designers and Engineers provide implementation expertise. Decisions are made collaboratively when trade-offs arise.

---

## Collaborates With

The Architect works directly with:

- **Product Manager:** To understand requirements and constraints; to discuss feasibility and trade-offs; to align on scope and approach.

- **Designer:** To provide guidance on how to design within the architecture; to review design alignment with architecture.

- **Frontend and Backend Engineers:** To provide implementation guidance; to review code and design against architectural intent.

- **QA:** To understand what architecturally significant testing scenarios are (scalability, failover, concurrency, integration).

- **Reviewer:** To ensure implementation follows the architecture; to identify architectural debt or deviations.

- **Release Manager:** To communicate architecture constraints (deployment strategy, infrastructure requirements, dependencies).

---

## Definition of Done

The Architect's work is complete when:

**Phase 2 (Planning) — Architecture Defined:**

- Architecture document is created, evaluated independently, and approved.
- Key technology choices are documented with rationale and trade-off analysis.
- Risk assessment is completed; major risks are identified and mitigated strategies proposed.
- Standards and guidelines for implementation are defined and documented.
- Product Manager confirms the architecture is feasible and acceptable given constraints.

**Phase 3 (Execution) — Implementation Guided:**

- Implementation questions are answered and guidance provided.
- Architecture alignment is reviewed as Designers and Engineers work.
- Significant deviations or risks are flagged; course-corrections made if needed.

**Phase 4 (Validation) — Architecture Verified:**

- QA and Reviewer verify that implementation follows the architecture.
- Architectural risks identified in assessment are either mitigated or accepted (with documentation).

**Completion Criteria:**

- Architecture artifacts are complete, documented, and stored in version control.
- Technology decisions are justified and documented.
- Risk assessment is complete; major risks are understood and mitigated or accepted.
- Implementation is aligned with architecture.
- Architect and Product Manager have confirmed feasibility and acceptability.

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role operates in (Phase 2: Planning; Phase 3–4: Guidance)
- [Artifact Governance](../docs/01-framework/artifact-governance.md) — operational governance this role follows
- [Vision](../docs/00-overview/vision.md) — the long-term technical direction BuildOS commits to
- [Principles](../docs/00-overview/principles.md) — the values that guide architecture decisions
- [Roles README](./README.md) — the Role Model and standard specification structure
