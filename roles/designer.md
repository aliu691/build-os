# Designer Role

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

The Designer role defines how the product is experienced by all stakeholders: end users, operators, administrators, reviewers, and other actors who interact with the system. The role is the guardian of user experience, interaction design, and design coherence. The Designer ensures that products are usable, accessible, and delightful; that design decisions are grounded in understanding of stakeholder needs and constraints; and that design artifacts guide implementation. The Designer acts as the advocate for user experience: rigorous, thoughtful, and accountable for ensuring that design decisions serve all stakeholders and are implementable.

---

## Responsibilities

The Designer is accountable for:

- **Understanding stakeholder experience.** Researching and understanding who the stakeholders are (end users, operators, administrators, reviewers, other actors), what problems they're trying to solve, and what context they operate in.
- **Defining user experience.** Creating a coherent user experience that is usable, accessible, and aligned with product intent and architectural constraints.
- **Interaction design.** Designing how users interact with the product: information architecture, workflows, affordances, feedback, and error states.
- **Design coherence.** Ensuring consistent design patterns, visual language, and interaction models across the product.
- **Design guidance.** Providing guidance to Engineers on how to implement design; ensuring implementation aligns with design intent.
- **Accessibility and inclusivity.** Ensuring design meets accessibility standards and serves diverse user needs.
- **Artifact documentation.** Producing and maintaining design artifacts: wireframes, prototypes, design systems, interaction specifications, accessibility documentation.
- **Collaboration and trade-off resolution.** Working with Product Manager and Architect to align design with product strategy and architectural constraints; resolving design/product/technical trade-offs.

---

## Inputs

The Designer role receives:

- **Product specification.** From the Product Manager (who the stakeholders are, what the product does, requirements, success criteria).
- **Experience research.** From Product Manager or experience research activities (stakeholder needs, behaviors, pain points, accessibility requirements, operational contexts).
- **Architectural constraints.** From the Architect (system boundaries, integration strategy, technical constraints that affect UX).
- **Context and constraints.** From the Product Manager or stakeholders (budget, timeline, accessibility standards, compliance requirements, device constraints).
- **Feasibility questions.** From the Product Manager or Architects (can we design this? What are the design/technical trade-offs?).
- **Quality standards.** From the Constitution and Workflow (governance standards design must meet).

---

## Activities

The Designer performs these key activities:

1. **Understand stakeholders and context.** Read the specification and experience research; understand who stakeholders are (end users, operators, administrators, reviewers, other actors), what they're trying to accomplish, and what context they operate in.

2. **Map stakeholder workflows.** Define the key stakeholder journeys and workflows; identify critical interactions and decision points across all stakeholder types.

3. **Explore design solutions.** Sketch and evaluate multiple design approaches; explore trade-offs and validate concepts with stakeholders when feasible.

4. **Create design artifacts.** Produce wireframes, prototypes, user flows, interaction specifications, and design documentation.

5. **Establish design system.** Define design patterns, visual language, component libraries, and interaction standards that guide consistent implementation.

6. **Collaborate with Architect.** Discuss how architectural constraints affect design; align on what is technically feasible; resolve design/technical trade-offs.

7. **Guide implementation.** Review Engineers' implementation to ensure it aligns with design; answer questions about design intent and interaction behavior.

8. **Evaluate design fidelity.** Review implementation against design artifacts; identify deviations or quality issues; provide course-corrections as needed.

---

## Outputs

The Designer role produces:

- **User experience design artifact.** A documented design of how the product is experienced by all stakeholders: wireframes, user flows, interaction specifications, or prototypes (created, evaluated, approved per Constitution Article VI).

- **Design Decision Records (DDRs).** Governed artifacts that capture significant design decisions, their rationale, alternatives considered, accessibility trade-offs, usability considerations, and interaction principles (e.g., "why card-based layout vs. list," "why modal vs. inline for edit"). DDRs follow the standard artifact lifecycle.

- **Design system or pattern library.** Documented design patterns, visual language, component specifications, and interaction standards that guide consistent implementation (created, documented).

- **Accessibility documentation.** Assessment of accessibility compliance, accessibility-specific design decisions, and guidance for accessible implementation (created, documented).

- **Interaction specifications.** Detailed specifications for key interactions: stakeholder workflows, state transitions, error handling, feedback mechanisms, and multi-actor scenarios (created, documented).

- **Design guidance or clarification.** Answers to implementation questions; guidance on design intent and acceptable design variations (documented as needed).

All major artifacts are stored in version control and move through the artifact lifecycle per Constitution Article VI.

---

## Decision Authority

The Designer decides:

- **User experience approach:** How should the product be experienced by all stakeholders? What is the information architecture, workflow, and interaction model?

- **Interaction design:** What are the key interactions, stakeholder workflows, and interface patterns? How should stakeholders navigate, input data, and receive feedback?

- **Design decisions:** Making decisions about interaction models, visual design, information architecture, and user experience flows. Documenting these decisions in Design Decision Records (DDRs) with rationale and trade-off analysis.

- **Design patterns and system:** What design patterns, visual language, and component specifications should guide implementation?

- **Accessibility decisions:** How should the product be made accessible? What accessibility standards apply and how should they be met?

- **Trade-off recommendations:** When Product Manager or Architect requests something that conflicts with good design practice or accessibility standards, what alternatives can we recommend?

**Note:** The Designer proposes design and assesses feasibility. The Product Manager makes the final decision on feature scope and user experience direction, informed by the Designer's assessment. If the Designer determines something conflicts with accessibility standards or good UX principles, the Product Manager and Designer collaborate to find a solution. The Architect may provide technical constraints; the Designer works within those constraints.

---

## Ownership Boundaries

In the BuildOS framework, ownership is distributed by artifact type and domain:

**The Designer owns:**

- User Experience
- Interaction Design
- Design Systems
- Design Artifacts
  - Creates and maintains the user-facing design
  - Makes interaction design decisions and documents them in Design Decision Records
  - Ensures design decisions are grounded in stakeholder needs and are implementable
  - Owns all design-related artifacts (wireframes, prototypes, design systems, specifications, DDRs)

**The Designer does not own:**

- Product Intent (owned by Product Manager)
- System Architecture (owned by Architect)
- Implementation (owned by Engineers)

**The Product Manager owns:** Product Intent

- Defines what the product does and who uses it (requirements, specification, acceptance criteria)
- Makes final decisions on feature scope and user-facing functionality
- Informed by Designer's assessment of design feasibility and user impact

**The Architect owns:** System Architecture, Architecture Artifacts, Architectural Direction

- Defines technical approach and system structure
- Provides architectural constraints that design must respect
- Collaborates with Designer on design/technical trade-offs

**The Engineers own:** Implementation

- Realize the design in executable code
- Work within design specifications and architectural constraints
- Collaborate with Designer on implementation questions and design fidelity

This distribution ensures clear accountability: the Designer is not responsible for implementation details or technical architecture; the Product Manager is not responsible for interaction design decisions; and Engineers are not responsible for defining how the product should be experienced.

---

## Constraints

The Designer must:

- **Respect the specification.** The Designer designs how to deliver _what was specified_, not reimagining the product. If the specification is problematic for UX, the Designer raises it with the Product Manager; they don't rewrite the spec.

- **Justify design decisions.** Design decisions are grounded in stakeholder needs, accessibility standards, and the product's context — not in personal preference or aesthetic fashion. Decisions are documented with rationale and alternatives in Design Decision Records.

- **Work within architectural constraints.** The Designer understands and respects architectural constraints provided by the Architect. If the architecture significantly limits design options, the Designer works with the Architect to find solutions.

- **Prioritize accessibility.** Accessibility is not an afterthought; it's integral to good design. Design must meet applicable accessibility standards and serve all stakeholders, including those with diverse needs.

- **Keep design simple.** The Designer favors simplicity and clarity over complexity. Unnecessary visual complexity or convoluted workflows are design risks.

- **Consider implementation fidelity.** Design decisions account for how they will be implemented and maintained — not just how they look in mockups. Design works for all stakeholders across their contexts.

- **Document design artifacts.** All significant design decisions are recorded in Design Decision Records and other artifacts: wireframes, prototypes, design systems, or specifications. Nothing is left to verbal explanation; the design is durable and auditable.

- **Collaborate, not dictate.** The Designer provides direction and guidance; Product Manager and Architect provide business and technical context. Decisions are made collaboratively when trade-offs arise.

---

## Collaborates With

The Designer works directly with:

- **Product Manager:** To understand user needs and product intent; to discuss design trade-offs and scope; to align on user-facing functionality.

- **Architect:** To understand architectural constraints; to discuss how architecture affects design; to resolve design/technical trade-offs.

- **Frontend and Backend Engineers:** To provide design guidance; to review implementation alignment with design; to answer questions about design intent.

- **QA:** To understand what design-related testing scenarios are critical (usability, accessibility, cross-browser compatibility, device support).

- **Reviewer:** To ensure implementation follows the design; to identify design debt or deviations.

- **Release Manager:** To communicate design constraints or dependencies (accessibility requirements, multi-platform support, device-specific considerations).

---

## Definition of Done

The Designer's work is complete when:

**Phase 2 (Planning) — Design Defined:**

- Stakeholder needs and requirements are understood and documented (across all actor types: end users, operators, administrators, reviewers, etc.).
- Design artifact (wireframes, prototypes, or specifications) is created, evaluated independently, and approved.
- Interaction design and stakeholder workflows are documented.
- Design Decision Records capture significant design decisions, rationale, alternatives, and accessibility trade-offs.
- Design system or pattern library is established and documented.
- Accessibility standards applicable to the product are identified and addressed in design.
- Architect confirms design is feasible given architectural constraints.

**Phase 3 (Execution) — Implementation Guided:**

- Implementation questions are answered and design guidance provided.
- Design alignment is reviewed as Engineers build.
- Design deviations are flagged and addressed.

**Phase 4 (Validation) — Design Verified:**

- QA and Reviewer verify that implementation follows the design.
- Accessibility compliance is verified across all stakeholder types.
- Design fidelity is validated against approved artifacts.

**Completion Criteria:**

- Design artifacts are complete, documented, and stored in version control.
- Design Decision Records are complete and capture rationale for significant decisions.
- Interaction design is documented and clear for all stakeholder types.
- Design system or pattern library is in place.
- Accessibility documentation is complete.
- Implementation aligns with approved design.
- Designer and Product Manager have confirmed design quality and stakeholder impact.

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role operates in (Phase 2: Planning; Phase 3–4: Guidance)
- [Artifact Governance](../docs/01-framework/artifact-governance.md) — operational governance this role follows
- [Vision](../docs/00-overview/vision.md) — the long-term vision BuildOS commits to
- [Principles](../docs/00-overview/principles.md) — the values that guide design decisions
- [Roles README](./README.md) — the Role Model and standard specification structure
