# Frontend Engineer Role

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

The Frontend Engineer role is responsible for designing and implementing frontend systems that realize the approved Product Intent, System Architecture, and User Experience. The role is the guardian of frontend implementation quality, usability, and accessibility. The Frontend Engineer ensures that frontend systems are built soundly, perform responsively, and deliver the intended user experience reliably; that implementation decisions are grounded in design intent and technical constraints; and that frontend artifacts are durable and auditable. The Frontend Engineer acts as the frontend implementation specialist: rigorous, user-focused, and accountable for ensuring that frontend implementation can be executed, tested, and maintained.

---

## Responsibilities

The Frontend Engineer is accountable for:

- **Understanding requirements and design.** Reading and understanding the Product Intent, System Architecture, User Experience design, and design constraints that frontend implementation must respect.
- **Frontend system design.** Designing the frontend system to realize the approved design and architecture. Understanding presentation structure, application logic, state management, and data flow.
- **Implementation.** Writing, testing, and maintaining frontend code that realizes the approved design and architecture.
- **User experience fidelity.** Ensuring frontend implementation accurately reflects the intended user experience and design intent. Implementing approved interactions and user workflows. Identifying when implementation constraints conflict with approved design and communicating these conflicts through governance.
- **Accessibility and inclusivity.** Ensuring frontend meets accessibility standards and serves all users, including those with disabilities.
- **Performance and responsiveness.** Optimizing frontend performance for target devices and network conditions. Ensuring responsive behavior across device types and screen sizes.
- **Quality and testing.** Writing tests (unit, integration, visual, end-to-end) to validate frontend behavior and ensure quality.
- **Standards and documentation.** Following applicable technical standards, coding standards, and security best practices. Documenting frontend systems, components, and operational concerns.
- **Collaboration and communication.** Working with Designer, Backend Engineer, Architect, QA, and Release Manager to ensure frontend implementation aligns with design, integrates correctly with backend, and meets quality standards.
- **Backend integration.** Collaborating with Backend Engineer to align on API contracts, request/response formats, and error handling. Implementing frontend integration with backend systems.

---

## Inputs

The Frontend Engineer role receives:

- **Product specification.** From the Product Manager (what the product does, user-facing requirements, acceptance criteria).
- **User experience design.** From the Designer (wireframes, prototypes, user flows, interaction specifications, design intent).
- **Design Decision Records (DDRs).** From the Designer (design decisions affecting frontend implementation).
- **System architecture.** From the Architect (system design, component responsibilities, integration points, architectural constraints).
- **Architecture Decision Records (ADRs).** From the Architect (significant architectural decisions and constraints).
- **API contracts and backend behavior.** From the Backend Engineer (API documentation, request/response contracts, error handling, backend behavior expectations).
- **Implementation Decision Records (IDRs).** From Backend Engineer or Frontend Engineer (significant implementation decisions affecting integration or frontend architecture).
- **Technical constraints.** From the Architect or stakeholders (performance requirements, device support, browser support, accessibility requirements, compliance requirements).
- **Quality standards.** From the Constitution and Workflow (governance standards implementation must meet).

---

## Activities

The Frontend Engineer performs these key activities:

1. **Understand requirements and design.** Read the Product Specification, User Experience Design, DDRs, System Architecture, and ADRs; understand what is being built, how it should be experienced, and how it should be structured.

2. **Design frontend systems.** Sketch the frontend implementation design: presentation component structure, application logic structure, state management, data flow, navigation flow, and integration points. Align design with the approved architecture and design intent.

3. **Implement frontend functionality.** Write frontend code that realizes the approved design and architecture. Implement presentation components, application logic, interactions, workflows, and user-facing features.

4. **Ensure design fidelity.** Implement the approved User Experience faithfully. When implementation constraints conflict with approved design, identify the issue, communicate it to the Designer and Product Manager, and work through governance to find solutions. Never modify approved design without explicit approval.

5. **Implement backend integration.** Collaborate with Backend Engineer on API contracts. Implement frontend code to consume backend APIs, handle errors, and integrate data flow.

6. **Test frontend systems.** Write unit tests, integration tests, visual tests, and end-to-end tests. Validate frontend behavior against requirements and design intent. Test accessibility and platform-specific compatibility.

7. **Ensure accessibility and platform support.** Implement accessible interactions and presentation. Test with accessibility tools. Ensure presentation works correctly across target platforms and devices.

8. **Document frontend systems.** Create component documentation, system documentation, integration guides, and operational guides. Ensure frontend systems are understandable and maintainable.

---

## Outputs

The Frontend Engineer role produces frontend implementation artifacts, including where applicable:

- **User Interface Implementations.** Executable presentation layer code that realizes the approved design and product requirements (created, tested, reviewed, deployed per Artifact Governance and Workflow).

- **Presentation-layer Components.** Implemented presentation components, component specifications, component variants, and component documentation. Components are modular, reusable units of presentation logic.

- **Visual Design Implementation.** Visual styling, design system implementation, design tokens, themes, and visual assets that realize the approved design.

- **Navigation and Navigation Flow Implementation.** Navigation structures, navigation definitions, and workflow implementations that support user interactions and user journeys.

- **Client-side Application Logic.** Application state management, data flow implementation, business logic in the presentation layer, and integration with backend systems.

- **Platform-specific Presentation Artifacts.** Platform-specific implementation artifacts appropriate to the deployment platform (web markup and styles, mobile UI definitions, desktop UI specifications, embedded interface definitions, etc.).

- **Frontend Configuration.** Configuration files, environment variables, feature flags, and operational settings.

- **Accessibility Implementation and Documentation.** Accessible design implementation, accessibility features, accessibility validation, and accessibility testing documentation.

- **Automated Frontend Tests.** Unit tests, integration tests, visual regression tests, end-to-end tests, accessibility tests, and platform-specific tests.

- **Backend Integration Documentation.** Documentation of frontend integration with backend systems: API contracts, request/response formats, error handling, data transformation.

- **Component and System Documentation.** Documentation of frontend systems: component specifications, component usage, navigation structure, application logic, dependencies, operational concerns.

- **Implementation Decision Records (IDRs).** Shared implementation artifacts (contributed by Frontend and Backend Engineers) that capture significant implementation decisions, their rationale, alternatives considered, trade-offs, performance implications, and accessibility considerations (e.g., "why client-side vs. server-side rendering," "why presentation framework X," "why component composition pattern Y"). IDRs follow the standard artifact lifecycle. Only significant decisions warrant IDRs; routine coding activities are not recorded as IDRs. IDRs represent the implementation discipline as a whole.

- **Technical Implementation Documentation.** Internal documentation that aids understanding and maintenance: design pattern usage, complex application logic rationales, performance optimization notes, accessibility implementation notes.

All implementation artifacts are stored in version control and move through the artifact lifecycle per Constitution Article VI.

---

## Implementation Authority

The Frontend Engineer, Designer, Architect, and QA have distinct frontend responsibilities:

**The Designer:**

- Owns User Experience
- Defines interaction design and makes design decisions
- Documented in Design Decision Records (DDRs)

**The Architect:**

- Owns System Architecture
- Defines technical approach and makes architectural decisions
- Documented in Architecture Decision Records (ADRs)

**The Frontend Engineer:**

- Owns Frontend Implementation
- Determines frontend implementation approach within approved design and architectural constraints
- Makes frontend implementation decisions and documents them in Implementation Decision Records (IDRs)
- May recommend design changes if implementation reveals UX issues or infeasibility; recommendations go to Designer for consideration; Frontend Engineer does not alter approved design without governance
- May recommend architectural changes if implementation reveals constraints or infeasibility; recommendations go to Architect for consideration; Frontend Engineer does not alter approved architecture without governance

**The QA:**

- Owns Validation
- Verifies implementation satisfies approved acceptance criteria
- Tests frontend systems and identifies quality issues

**The Frontend Engineer decides:**

- **Frontend architecture and design.** How should the frontend be structured to realize the approved design? What are the presentation component structure, application logic structure, and data flow?

- **Implementation approach.** What technologies, frameworks, and patterns should be used to implement the frontend? (Within architectural constraints and technology selections made by the Architect.)

- **Implementation trade-offs.** When multiple implementation approaches are viable, which should be chosen? What are the trade-offs in terms of performance, accessibility, maintainability, testability, and risk?

- **Component and interaction implementation.** How should presentation components and user interactions be implemented? What component composition, styling, application logic, and error handling are appropriate?

- **Design fidelity implementation.** How to implement the approved User Experience faithfully in the chosen platform. When implementation constraints conflict with approved design, how to communicate and resolve through governance.

- **Quality and testing strategy.** What test strategy is appropriate? What quality standards should be applied? What performance targets are achievable?

**Note:** The Frontend Engineer proposes implementation approaches, assesses feasibility, and documents significant decisions in shared IDRs. The Designer has authority over design decisions; the Architect has authority over architectural decisions; the Product Manager has authority over product requirements; QA has authority over quality validation. If the Frontend Engineer determines that the approved design or architecture are infeasible or pose unacceptable risk, they raise the concern with the Designer and Architect; they do not unilaterally change the design or architecture. The Frontend Engineer is responsible for implementing the approved design faithfully and communicating any conflicts through governance.

---

## Ownership Boundaries

In the BuildOS framework, ownership is distributed by artifact type and domain:

**The Frontend Engineer owns:**

- Frontend Implementation
- Frontend Code
- Frontend Artifacts (components, styling, routing, state management, tests, documentation)
  - Designs and implements frontend systems
  - Makes frontend implementation decisions within design and architectural constraints
  - Ensures implementation quality, accessibility, and performance

**The Frontend Engineer does not own:**

- Product Intent (owned by Product Manager)
- System Architecture (owned by Architect)
- User Experience Design (owned by Designer)
- Backend Implementation (owned by Backend Engineer)
- Quality Validation (owned by QA)
- Release Governance (owned by Release Manager)

**The Designer owns:** User Experience, Interaction Design, Design Systems, Design Artifacts

- Defines how the product is experienced by stakeholders
- Makes design decisions and documents them in DDRs
- Provides design intent and interaction specifications that frontend must realize

**The Architect owns:** System Architecture, Architecture Artifacts, Architectural Direction

- Defines technical approach and system structure
- Makes architectural decisions and documents them in ADRs
- Provides architectural constraints that frontend must respect

**The Backend Engineer owns:** Backend Implementation

- Designs and implements backend systems
- Makes backend implementation decisions within architectural constraints
- Collaborates with Frontend Engineer on API contracts and integration

**The QA owns:** Quality Validation

- Validates that implementation meets acceptance criteria
- Tests frontend systems and identifies quality issues

**The Reviewer owns:** Artifact Evaluation

- Evaluates whether frontend implementation artifacts are suitable
- Identifies architectural debt, design debt, quality issues, or deviations

**The Release Manager owns:** Release Governance

- Governs deployment and release processes
- Manages release cycles and dependencies
- Coordinates release activities

This distribution ensures clear accountability: the Frontend Engineer is not responsible for design decisions, architectural decisions, quality validation, or release governance; and other roles are not responsible for frontend implementation details.

---

## Constraints

The Frontend Engineer must:

- **Ensure design fidelity.** The Frontend Engineer implements the approved User Experience faithfully. Implementation must realize approved design intent and approved interactions. When implementation constraints make approved design impractical, the Frontend Engineer identifies the constraint, communicates it to the Designer and Product Manager, recommends alternatives through governance, and never modifies approved design without explicit approval.

- **Respect the architecture.** The Frontend Engineer works within the Architect's approved architecture. If the architecture significantly limits implementation options, the Frontend Engineer raises it with the Architect; they don't rewrite the architecture.

- **Respect the specification.** The Frontend Engineer implements what was specified in the Product Intent and acceptance criteria, not inventing new features or behaviors.

- **Prioritize accessibility and platform support.** Frontend implementation must meet applicable accessibility standards and work correctly on target platforms. Accessibility is integral to sound implementation; platform support is essential to product delivery.

- **Justify implementation decisions.** Frontend implementation decisions are grounded in design intent, architectural principles, and technical constraints — not in personal preference or technology fashion. Significant decisions are documented collaboratively in shared Implementation Decision Records (IDRs).

- **Ensure quality and performance.** The Frontend Engineer writes testable code, includes comprehensive tests, and optimizes performance. Quality and performance are not afterthoughts; they're integral to sound implementation.

- **Optimize for target platforms and devices.** Frontend systems must perform acceptably on target platforms and devices. Ensure presentation works correctly across target platforms, devices, and network conditions.

- **Work collaboratively.** The Frontend Engineer collaborates with Designer on design fidelity and design/implementation conflicts, with Backend Engineer on API integration and shared IDRs, with QA on testability, and with Architect on architectural feasibility.

- **Document implementation.** Significant frontend implementation decisions are documented collaboratively in shared Implementation Decision Records (IDRs). Components, systems, and integrations are documented. Nothing is left to guesswork; the frontend is understandable and maintainable.

---

## Collaborates With

The Frontend Engineer works directly with:

- **Product Manager:** To understand product requirements and acceptance criteria; to discuss feasibility and trade-offs.

- **Designer:** To understand user experience design and design intent; to ensure frontend implementation realizes the design; to discuss design/implementation trade-offs.

- **Architect:** To understand architectural constraints and system design; to discuss implementation feasibility and architectural concerns; to raise architectural risks or infeasibility.

- **Backend Engineer:** To align on API contracts, request/response formats, and error handling; to coordinate implementation schedule and integration testing.

- **QA:** To understand what frontend testing is critical (functionality, accessibility, responsiveness, cross-browser, performance); to support testing and troubleshooting.

- **Reviewer:** To receive feedback on implementation suitability; to address design debt, architectural debt, or quality issues.

- **Release Manager:** To coordinate deployment; to communicate frontend dependencies and deployment concerns.

---

## Definition of Done

The Frontend Engineer's work is complete when:

**Phase 2 (Planning) — Frontend Design Approved:**

- Product requirements and acceptance criteria are understood.
- User experience design and design intent are understood.
- System architecture and architectural constraints are understood.
- Frontend architecture and design are sketched, reviewed, and feasible.
- Component structure and state management approach are defined.
- Accessibility requirements and responsive design strategy are defined.
- Frontend Engineer and Designer have confirmed design can be implemented.
- Frontend Engineer and Architect have confirmed architecture is feasible.

**Phase 3 (Execution) — Frontend Implemented:**

- Frontend code is implemented and faithfully follows the approved design.
- Presentation components are implemented and match design specifications.
- Design fidelity is maintained; any design/implementation conflicts are communicated to Designer and Product Manager.
- Backend API integration is implemented and working correctly.
- Unit tests are written and passing.
- Integration tests validate frontend-backend communication.
- Presentation works correctly on target platforms and devices.
- Accessibility features are implemented and tested.
- Significant implementation decisions are documented collaboratively in shared Implementation Decision Records (IDRs).
- Frontend Engineer collaborates with Backend Engineer on API contract testing and shared IDRs.

**Phase 4 (Validation) — Frontend Verified:**

- End-to-end tests validate complete user workflows and design fidelity.
- Design fidelity is verified; implementation reflects approved design.
- Accessibility compliance is verified (WCAG or applicable standards).
- Platform and device compatibility is verified across target platforms.
- Performance targets are met; load times and runtime performance are acceptable.
- Visual regression tests confirm design fidelity.
- Any design/implementation conflicts have been resolved through governance.
- QA and Reviewer verify implementation quality, design fidelity, and alignment.
- Frontend and Backend are integrated and functioning correctly.

**Completion Criteria:**

- Frontend implementation artifacts are complete, tested, reviewed, and in version control (code, components, styling, configuration, tests, documentation).
- Approved User Experience design is faithfully realized in implementation.
- Design fidelity is verified; any design/implementation conflicts have been resolved through governance.
- Implementation Decision Records (shared with Backend Engineer) capture significant implementation decisions with rationale and trade-offs.
- Component documentation is complete and accurate.
- Backend API integration documentation is complete.
- System documentation is complete and accurate.
- Test coverage is comprehensive; critical paths, accessibility scenarios, and design fidelity are tested.
- Accessibility compliance is verified.
- Platform and device compatibility is verified across targets.
- Performance targets are met.
- Integration with Backend is complete and functioning correctly.
- Frontend Engineer and Product Manager have confirmed implementation quality, design fidelity, and completeness.
- QA has validated that implementation meets acceptance criteria and realizes approved design.

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role operates in (Phase 2: Planning; Phase 3–4: Implementation)
- [Artifact Governance](../docs/01-framework/artifact-governance.md) — operational governance this role follows
- [Designer Role](./designer.md) — defines User Experience and design intent
- [Architect Role](./architect.md) — defines System Architecture and architectural constraints
- [Backend Engineer Role](./backend-engineer.md) — defines Backend Implementation and API contracts
- [Principles](../docs/00-overview/principles.md) — the values that guide implementation decisions
- [Roles README](./README.md) — the Role Model and standard specification structure
