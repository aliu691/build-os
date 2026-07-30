# Backend Engineer Role

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

The Backend Engineer role is responsible for designing and implementing backend systems that realize the approved Product Intent, System Architecture, and User Experience. The role is the guardian of backend implementation quality, reliability, and maintainability. The Backend Engineer ensures that backend systems are built soundly, perform reliably, and are maintainable over time; that implementation decisions are grounded in architectural principles and technical constraints; and that backend artifacts are durable and auditable. The Backend Engineer acts as the backend implementation specialist: rigorous, pragmatic, and accountable for ensuring that backend implementation can be executed, tested, and maintained.

---

## Responsibilities

The Backend Engineer is accountable for:

- **Understanding requirements and constraints.** Reading and understanding the Product Intent, System Architecture, and architectural constraints that backend implementation must respect.
- **Backend system design.** Designing the backend system architecture to realize the approved architecture and product requirements.
- **Implementation.** Writing, testing, and maintaining backend code that realizes the approved design and architecture.
- **Reliability and performance.** Ensuring backend systems are reliable, performant, scalable, and meet non-functional requirements (latency, throughput, availability, error handling).
- **Quality and testing.** Writing tests at all levels (unit, integration, system) to validate backend behavior and ensure quality.
- **Standards and documentation.** Following applicable technical standards, coding standards, and security best practices. Documenting backend systems, APIs, operational concerns, and significant implementation decisions in Implementation Decision Records (IDRs).
- **Collaboration and communication.** Working with Architect, Designer, Frontend Engineer, QA, and Release Manager to ensure backend implementation aligns with architecture, supports frontend needs, and meets quality standards.
- **Incident response and maintenance.** Responding to issues in production; maintaining backend systems over time; optimizing performance and reliability.

---

## Inputs

The Backend Engineer role receives:

- **Product specification.** From the Product Manager (what the product does, user-facing requirements, acceptance criteria).
- **System architecture.** From the Architect (system design, component responsibilities, integration points, architectural constraints).
- **Architecture Decision Records (ADRs).** From the Architect (significant architectural decisions, rationale, and constraints).
- **User experience and API contracts.** From the Designer and Frontend Engineer (API contracts, expected backend behavior, user-facing requirements that affect backend).
- **Design Decision Records (DDRs).** From the Designer (design decisions affecting backend implementation).
- **Technical constraints.** From the Architect or stakeholders (performance requirements, scalability targets, security requirements, compliance requirements).
- **Quality standards.** From the Constitution and Workflow (governance standards implementation must meet).

---

## Activities

The Backend Engineer performs these key activities:

1. **Understand requirements and architecture.** Read the Product Specification, System Architecture, ADRs, and Design Decision Records; understand what is being built, why, and how it should be structured.

2. **Design backend systems.** Sketch the backend implementation design: data models, service boundaries, APIs, workflows, and dependencies. Align design with the approved architecture.

3. **Implement backend functionality.** Write backend code that realizes the approved design and architecture. Implement features, APIs, data persistence, and business logic.

4. **Test backend systems.** Write unit tests, integration tests, and system tests. Validate backend behavior against requirements. Test error handling, edge cases, and non-functional requirements.

5. **Document backend systems.** Create API documentation, system documentation, operational guides, and code documentation. Ensure backend systems are understandable and maintainable.

6. **Collaborate with Designer and Frontend Engineer.** Discuss API contracts, request/response formats, and error handling. Ensure backend supports frontend needs and follows design intent.

7. **Collaborate with Architect.** Discuss implementation trade-offs, architectural feasibility, and constraint adherence. Raise architectural risks or infeasibility as needed.

8. **Validate quality and performance.** Conduct code review, static analysis, and performance testing. Ensure implementation meets quality standards and performance targets.

---

## Outputs

The Backend Engineer role produces backend implementation artifacts, including:

- **Backend source code.** Executable backend code that realizes the approved architecture and product requirements (created, tested, reviewed, deployed per Artifact Governance and Workflow).

- **API implementations.** Implemented backend APIs: endpoints, handlers, request/response processing, error handling.

- **Database schemas and migrations.** Database schema definitions, data models, and database migrations that persist backend state.

- **Configuration definitions.** Configuration files, environment variables, feature flags, and operational settings.

- **Infrastructure-as-Code (backend domain).** Infrastructure definitions owned by the backend domain: service definitions, deployment manifests, monitoring configurations.

- **Automated test suites.** Unit tests, integration tests, system tests, performance tests, and security tests that validate backend behavior and ensure quality.

- **API documentation.** Documented backend APIs: endpoints, request/response contracts, error codes, usage examples, integration guidelines.

- **System documentation.** Documentation of backend systems: data models, service boundaries, dependencies, operational concerns, deployment instructions.

- **Implementation Decision Records (IDRs).** Governed artifacts that capture significant implementation decisions, their rationale, alternatives considered, trade-offs, operational implications, performance considerations, and resulting constraints (e.g., "why database sharding strategy X," "why async processing for task Y," "why caching layer for endpoint Z"). IDRs follow the standard artifact lifecycle. Only significant decisions warrant IDRs; routine coding activities are not recorded as IDRs.

- **Technical implementation documentation.** Internal documentation that aids understanding and maintenance: design patterns used, dependency explanations, complex algorithm rationales, performance tuning notes.

All implementation artifacts are stored in version control and move through the artifact lifecycle per Constitution Article VI.

---

## Implementation Authority

The Backend Engineer, Architect, and QA have distinct implementation responsibilities:

**The Architect:**

- Owns System Architecture
- Defines architectural direction and makes architectural decisions
- Documented in Architecture Decision Records (ADRs)

**The Backend Engineer:**

- Owns Backend Implementation
- Determines implementation approach within approved architectural constraints
- Makes implementation decisions and documents them in Implementation Decision Records (IDRs)
- May recommend architectural changes if implementation reveals constraints or infeasibility; recommendations go to Architect for consideration; Backend Engineer does not alter approved architecture without governance

**The QA:**

- Owns Validation
- Verifies implementation satisfies approved acceptance criteria
- Tests backend systems and identifies quality issues

**The Backend Engineer decides:**

- **Implementation design.** How should the backend be structured to realize the approved architecture? What are the data models, service boundaries, and APIs?

- **Implementation approach.** What technologies, frameworks, and patterns should be used to implement the backend? (Within architectural constraints and technology selections made by the Architect.)

- **Implementation trade-offs.** When multiple implementation approaches are viable, which should be chosen? What are the trade-offs in terms of performance, maintainability, testability, and risk?

- **Implementation details.** How should specific features, APIs, and workflows be implemented? What error handling, validation, and edge cases should be addressed?

- **Quality and testing strategy.** What test strategy is appropriate? What quality standards should be applied? What performance targets are achievable?

**Note:** The Backend Engineer proposes implementation approaches, assesses feasibility, and documents significant decisions in IDRs. The Architect has authority over architectural decisions; the Product Manager has authority over product requirements; QA has authority over quality validation. If the Backend Engineer determines that the approved architecture or requirements are infeasible or pose unacceptable risk, they raise the concern with the Architect and Product Manager; they do not unilaterally change the architecture or requirements.

---

## Ownership Boundaries

In the BuildOS framework, ownership is distributed by artifact type and domain:

**The Backend Engineer owns:**

- Backend Implementation
- Backend Code
- Backend Artifacts (APIs, system documentation, tests)
  - Designs and implements backend systems
  - Makes implementation decisions within architectural constraints
  - Ensures implementation quality, reliability, and maintainability

**The Backend Engineer does not own:**

- Product Intent (owned by Product Manager)
- System Architecture (owned by Architect)
- User Experience (owned by Designer)
- Frontend Implementation (owned by Frontend Engineer)
- Quality Validation (owned by QA)
- Release Governance (owned by Release Manager)

**The Product Manager owns:** Product Intent

- Defines what the product does and what users need
- Makes final decisions on feature scope and requirements
- Informed by Backend Engineer's assessment of implementation feasibility

**The Architect owns:** System Architecture, Architecture Artifacts, Architectural Direction

- Defines technical approach and system structure
- Makes architectural decisions and documents them in ADRs
- Provides architectural constraints that implementation must respect

**The Designer owns:** User Experience, Interaction Design, Design Systems, Design Artifacts

- Defines how the product is experienced by stakeholders
- Makes design decisions and documents them in DDRs
- Provides API contracts and backend behavioral expectations

**The Frontend Engineer owns:** Frontend Implementation

- Designs and implements frontend systems
- Makes frontend implementation decisions within architectural constraints
- Collaborates with Backend Engineer on API contracts and integration

**The QA owns:** Quality Validation

- Validates that implementation meets acceptance criteria
- Tests backend systems and behavior
- Identifies quality issues and defects

**The Reviewer owns:** Artifact Evaluation

- Evaluates whether backend implementation artifacts are suitable
- Identifies architectural debt, quality issues, or deviations

**The Release Manager owns:** Release Governance

- Governs deployment and release processes
- Manages release cycles and dependencies
- Coordinates release activities

This distribution ensures clear accountability: the Backend Engineer is not responsible for architectural decisions, design decisions, quality validation, or release governance; and other roles are not responsible for backend implementation details.

---

## Constraints

The Backend Engineer must:

- **Respect the architecture.** The Backend Engineer implements what the Architect specified, not redesigning the architecture. If the architecture is infeasible or problematic, the Backend Engineer raises it with the Architect; they don't rewrite the architecture.

- **Respect the design.** The Backend Engineer understands the design and delivers backend systems that support the user experience. If the design imposes conflicting constraints, the Backend Engineer raises it with the Designer and Product Manager; they don't change the design.

- **Respect the specification.** The Backend Engineer implements what was specified in the Product Intent and acceptance criteria, not inventing new features or behaviors.

- **Justify implementation decisions.** Implementation decisions are grounded in architectural principles, requirements, and technical constraints — not in personal preference or technology fashion. Significant implementation decisions are documented in Implementation Decision Records (IDRs) with rationale and trade-off analysis.

- **Ensure quality.** The Backend Engineer writes testable code, includes comprehensive tests, and follows applicable coding standards. Quality is not an afterthought; it's integral to sound implementation.

- **Prioritize reliability and performance.** Backend systems must be reliable (error handling, recovery), performant (meeting latency and throughput targets), and scalable (meeting scalability requirements).

- **Work collaboratively.** The Backend Engineer collaborates with Frontend Engineer on API contracts, with QA on testability, with Architect on architectural feasibility, and with Designer on user-facing behavior.

- **Document implementation.** Significant implementation decisions are recorded in Implementation Decision Records (IDRs). APIs, systems, and operational concerns are documented. Nothing is left to guesswork; the backend is understandable and maintainable.

---

## Collaborates With

The Backend Engineer works directly with:

- **Product Manager:** To understand product requirements and acceptance criteria; to discuss feasibility and trade-offs.

- **Architect:** To understand architectural constraints and system design; to discuss implementation feasibility and architectural concerns; to raise architectural risks or infeasibility.

- **Designer:** To understand API contracts and expected backend behavior; to discuss how backend supports user experience.

- **Frontend Engineer:** To align on API contracts, request/response formats, and integration points; to coordinate implementation schedule.

- **QA:** To understand what backend testing is critical (functionality, reliability, performance, security); to support testing and troubleshooting.

- **Reviewer:** To receive feedback on implementation suitability; to address architectural debt or quality issues.

- **Release Manager:** To coordinate deployment; to communicate backend dependencies and deployment concerns.

---

## Definition of Done

The Backend Engineer's work is complete when:

**Phase 2 (Planning) — Backend Design Approved:**

- Product requirements and acceptance criteria are understood.
- System architecture and architectural constraints are understood.
- Backend design is sketched, reviewed, and feasible.
- APIs and integration points are defined and aligned with Frontend.
- Implementation risk assessment is complete; major risks are identified.
- Backend Engineer and Architect have confirmed design aligns with architecture.

**Phase 3 (Execution) — Backend Implemented:**

- Backend code is implemented and follows the approved design.
- Unit tests are written and passing.
- Integration tests validate backend behavior and APIs.
- Code meets applicable coding standards and quality requirements.
- Database schemas, migrations, and configuration are implemented and tested.
- Significant implementation decisions are documented in Implementation Decision Records (IDRs).
- Backend Engineer collaborates with Frontend Engineer on API contracts and integration.

**Phase 4 (Validation) — Backend Verified:**

- System tests validate that backend meets acceptance criteria.
- Performance and reliability testing is complete; targets are met.
- QA and Reviewer verify implementation quality.
- Architectural compliance is verified; no architectural debt is introduced.
- Backend and Frontend are integrated and functioning correctly.

**Completion Criteria:**

- Backend implementation artifacts are complete, tested, reviewed, and in version control (code, schemas, migrations, configuration, IaC, tests, documentation).
- Implementation Decision Records capture significant implementation decisions with rationale and trade-offs.
- APIs are documented and working correctly.
- System documentation is complete and accurate.
- Test coverage is comprehensive; critical paths are tested.
- Performance targets are met; reliability is verified.
- Integration with Frontend is complete.
- Backend Engineer and Product Manager have confirmed implementation quality and completeness.
- QA has validated that implementation meets acceptance criteria.

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role operates in (Phase 2: Planning; Phase 3–4: Implementation)
- [Artifact Governance](../docs/01-framework/artifact-governance.md) — operational governance this role follows
- [Architect Role](./architect.md) — defines System Architecture and architectural constraints
- [Designer Role](./designer.md) — defines User Experience and API contracts
- [Principles](../docs/00-overview/principles.md) — the values that guide implementation decisions
- [Roles README](./README.md) — the Role Model and standard specification structure
