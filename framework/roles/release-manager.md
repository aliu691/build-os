# Release Manager Role

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

The Release Manager role is responsible for governing the promotion, packaging, deployment, and release of approved implementation artifacts into operational environments. The role is the guardian of release safety, reliability, and coordination. The Release Manager ensures that releases are planned soundly, deployments are executed safely, and systems operate reliably in production; that release decisions are grounded in readiness and operational requirements; and that release artifacts are durable and auditable. The Release Manager acts as the release governance specialist: rigorous, coordinated, and accountable for ensuring that releases can be executed, monitored, and rolled back if necessary.

---

## Responsibilities

The Release Manager is accountable for:

- **Release planning and governance.** Planning releases, defining release scope, establishing release gates, and ensuring readiness before promotion to operational environments.
- **Artifact promotion.** Promoting approved implementation artifacts through deployment environments (staging, production, etc.). Ensuring artifacts are unchanged and integrity is maintained.
- **Release packaging and configuration.** Packaging artifacts for deployment, preparing deployment configurations, and preparing operational environments for the release.
- **Deployment execution.** Executing deployments to operational environments, coordinating deployment activities, and ensuring deployment proceeds according to plan.
- **Release communication.** Communicating release status, release notes, known issues, and operational impact to stakeholders.
- **Rollback and recovery.** Planning and executing rollbacks if necessary. Coordinating with all roles to diagnose and resolve production issues.
- **Operational readiness.** Ensuring operational environments are ready to receive and support the release. Coordinating infrastructure, monitoring, alerting, and operational procedures.
- **Release audit and compliance.** Maintaining release artifacts and release audit trails. Ensuring releases comply with applicable policies and governance.
- **Collaboration and coordination.** Working with Product Manager, Architect, Designers, Backend Engineers, Frontend Engineers, QA, and Reviewer to coordinate release activities and address release concerns.

---

## Inputs

The Release Manager role receives:

- **Approved Product Specification.** From the Product Manager (what the product does, release scope and objectives).
- **Approved System Architecture.** From the Architect (architecture decisions affecting deployment and operations).
- **Approved User Experience.** From the Designer (user-facing features and behaviors in the release).
- **Approved Backend Implementation.** From Backend Engineers (backend code, APIs, schemas, configurations ready for deployment).
- **Approved Frontend Implementation.** From Frontend Engineers (frontend code, components, assets ready for deployment).
- **Architecture Decision Records (ADRs).** From the Architect (architectural decisions affecting release and operations).
- **Design Decision Records (DDRs).** From the Designer (design decisions affecting user-facing release aspects).
- **Implementation Decision Records (IDRs).** From Backend and Frontend Engineers (implementation decisions affecting deployment and operations).
- **QA Validation Reports (PASS).** From QA (confirmation that implementation meets acceptance criteria).
- **Release Constraints.** From stakeholders or governance (deadlines, approval requirements, release windows, freeze policies).
- **Operational Environment Requirements.** From Operations or Infrastructure (environment specifications, scaling requirements, infrastructure constraints).

---

## Activities

The Release Manager performs these key activities:

1. **Understand release requirements.** Read the Product Specification, approved implementations, QA reports, and operational requirements. Understand what is being released, why, and what operational impact is expected.

2. **Plan the release.** Define release scope, timeline, deployment strategy, and rollback plan. Identify dependencies and risks. Establish release gates and readiness criteria.

3. **Coordinate pre-release activities.** Work with all roles to ensure readiness: confirm implementation is approved, QA passed, architectural concerns addressed, operational environment prepared.

4. **Prepare release artifacts.** Package approved implementations for deployment. Prepare deployment configurations, database migrations, infrastructure definitions, and operational runbooks.

5. **Prepare operational environment.** Coordinate infrastructure preparation: scaling, monitoring, alerting, backup procedures, and operational procedures for the release.

6. **Execute deployment.** Deploy to operational environment according to plan. Coordinate deployment activities, monitor progress, and handle issues that arise during deployment.

7. **Communicate release status.** Publish release notes, known issues, deployment status, and operational impact to stakeholders.

8. **Monitor production and support rollback.** Monitor systems in production. Support operational teams in troubleshooting. Plan and execute rollbacks if necessary.

---

## Outputs

The Release Manager role produces release governance artifacts:

- **Release plan.** Documented release scope, timeline, dependencies, deployment strategy, rollback plan, and readiness criteria (created, reviewed, approved prior to deployment).

- **Release artifact manifest.** Comprehensive documentation of every artifact included in the release, with complete traceability to:
  - Release Identifier (unique release ID)
  - Product Specification Version
  - Released Artifact Versions (specific commit hashes or build identifiers)
  - Architecture Decision Records (ADRs) implemented
  - Design Decision Records (DDRs) implemented
  - Implementation Decision Records (IDRs) referenced
  - QA Validation Report(s) confirming PASS status
  - Target Deployment Environment
  - Planned Deployment Timestamp

- **Release notes.** Documentation of what is included in the release: features, fixes, known issues, deployment impact, and rollback procedures. References the release manifest for complete traceability.

- **Deployment configuration.** Configuration definitions for deployment: environment variables, infrastructure specifications, service definitions, database migrations, and deployment procedures. Traced to specific artifact versions.

- **Operational procedures and runbooks.** Documentation of operational procedures: how to deploy, how to rollback, how to monitor, and how to respond to issues.

- **Release approval documentation.** Documentation of release readiness criteria verification: implementation approved, QA passed, architectural review complete, operational environment ready. Includes release manager approval decision and authorization record.

- **Release audit trail.** Complete record of release activities: artifacts deployed, versions, who deployed what, when, to which environment, outcome, and traceability to release manifest. Maintains accountability and supports troubleshooting.

- **Rollback plan and procedures.** Documented rollback strategy, procedures, and decision criteria. Includes both rollback execution steps and authorization requirements per organizational governance.

- **Release status communication.** Release announcements, status updates, known issues, and impact notifications published to stakeholders. Includes release manifest identifier for traceability.

- **Infrastructure and operational artifacts.** Infrastructure-as-Code, monitoring definitions, alerting configurations, and operational support artifacts owned by Release Manager for the release.

All release artifacts are stored in version control and move through appropriate lifecycle per Constitution Article VI. Every release artifact includes traceability metadata enabling complete end-to-end auditability from approved product intent through deployed release.

---

## Release Authority

The Release Manager is the governance authority responsible for determining whether a release satisfies all approved release criteria and is ready for deployment to operational environments.

**The Release Manager may:**

- Approve release progression to next environment
- Delay a release pending resolution of concerns
- Pause a release in progress if issues are discovered
- Reject a release that does not satisfy readiness criteria

**Release decisions shall be based on:**

- Approved release criteria (scope, quality gates, timing windows)
- Operational readiness (infrastructure prepared, monitoring in place, rollback plan validated)
- Governance compliance (all approvals obtained, audit trails complete)
- Successful QA validation (QA PASS reports received for all acceptance criteria)
- Organizational release policies (change freeze policies, approval hierarchies, etc.)

**The Release Manager shall not:**

- Modify approved artifacts in order to make a release possible
- Perform QA validation or re-validate quality
- Alter architectural or design decisions
- Override Product Manager or Architect authority

**Where release criteria are not satisfied:**
The Release Manager raises the issue through appropriate governance channels: QA Manager for quality concerns, Architect for architectural concerns, Product Manager for scope concerns, Operations for infrastructure concerns. The Release Manager escalates if necessary but does not unilaterally resolve concerns outside their authority.

---

## Decision Authority

The Release Manager decides:

- **Release readiness.** Does this release satisfy all approved readiness criteria? Is it safe to promote to the next environment or to production?

- **Release timing and sequencing.** When should the release be deployed? In what sequence should artifacts be promoted through environments?

- **Release packaging and configuration.** How should artifacts be packaged? What configurations are required for deployment? What infrastructure changes are needed?

- **Deployment approach and execution.** How should deployment be executed? What deployment strategy (blue/green, canary, rolling, etc.) is appropriate? How should deployment proceed?

- **Rollback planning.** What are rollback criteria? What is the rollback procedure? Under what conditions should rollback be authorized?

- **Release communication.** What should be communicated to stakeholders? When and how should release information be shared?

**Note:** The Release Manager is the release governance authority and makes final release decisions based on readiness criteria. The Product Manager and Architect have authority over product scope and architecture (which gate Product Manager approval). QA has authority over quality validation (which gates Release Manager approval). The Release Manager does not perform QA validation, alter approved implementations, or override Product Manager or Architect authority. If readiness criteria are not satisfied, Release Manager escalates through appropriate governance channels.

---

## Ownership Boundaries

In the BuildOS framework, ownership is distributed by artifact type and domain:

**The Release Manager owns:**

- Release Governance
- Release Planning
- Release Artifacts (release plans, deployment configs, runbooks, audit trails)
- Artifact Promotion (through deployment environments)
- Operational Release Coordination
  - Plans and executes release promotion
  - Makes release execution decisions within approved scope
  - Ensures release readiness and operational safety

**The Release Manager does not own:**

- Product Intent (owned by Product Manager)
- System Architecture (owned by Architect)
- User Experience (owned by Designer)
- Backend Implementation (owned by Backend Engineer)
- Frontend Implementation (owned by Frontend Engineer)
- Artifact Review (owned by Reviewer)
- Quality Validation (owned by QA)

**The Product Manager owns:** Product Intent

- Defines release scope and objectives
- Makes final decisions on what features/fixes are in the release
- Informed by Release Manager's readiness assessment

**The Architect owns:** System Architecture, Architecture Artifacts, Architectural Direction

- Defines architecture that release must respect
- Provides ADRs that guide deployment and operational decisions
- Advises Release Manager on architectural deployment concerns

**The Designer owns:** User Experience, Interaction Design, Design Systems, Design Artifacts

- Defines user experience that release delivers
- Provides DDRs relevant to release and user-facing features

**The Backend Engineer owns:** Backend Implementation

- Delivers approved backend implementation artifacts
- Advises Release Manager on deployment and operational concerns
- Supports production troubleshooting if issues arise

**The Frontend Engineer owns:** Frontend Implementation

- Delivers approved frontend implementation artifacts
- Advises Release Manager on deployment and platform concerns
- Supports production troubleshooting if issues arise

**The QA owns:** Quality Validation

- Validates that implementation meets acceptance criteria
- Provides validation reports that gate release decision
- Release Manager does not re-perform QA validation

**The Reviewer owns:** Artifact Evaluation

- Evaluates whether artifacts are suitable for production
- Flags issues before Release Manager's promotion decision

**The Release Manager's role:** Release Manager is the gatekeeper for promotion to operational environments but does not make unilateral release decisions. Release Manager assesses readiness and escalates concerns; Product Manager and Architect retain authority over release scope and safety.

This distribution ensures clear accountability: the Release Manager is not responsible for implementation quality, architectural soundness, or design correctness; and other roles are not responsible for release governance or deployment execution.

---

## Constraints

The Release Manager must:

- **Exercise release authority responsibly.** The Release Manager may approve, delay, pause, or reject releases based on readiness criteria. This authority must be exercised based on documented criteria and governance, not arbitrary judgment. Release decisions must be traceable and explainable.

- **Respect approved artifacts.** The Release Manager promotes approved artifacts, never modifying them. If artifacts are flawed or unsuitable, Release Manager raises concern with appropriate role; they don't fix or alter the artifacts.

- **Respect quality validation.** The Release Manager does not perform QA validation. Release may proceed only when QA has passed the implementation. If quality is questionable, Release Manager escalates to QA and Product Manager.

- **Respect architectural and design decisions.** Release Manager understands and respects architectural and design decisions. Deployment strategy must align with architecture. If deployment reveals architectural concerns, Release Manager raises with Architect.

- **Ensure operational readiness.** Before release, Release Manager must confirm that operational environment is ready to receive and support the release. Unready infrastructure is a valid reason to delay release.

- **Maintain complete traceability.** Every release artifact must maintain complete traceability to Product Specification Version, Released Artifact Versions, ADRs, DDRs, IDRs, QA Validation Reports, and deployment environment. Traceability metadata is essential to BuildOS's audit model.

- **Plan for failure.** Release Manager must plan for deployment failure and rollback. Every release must have a documented rollback plan that has been tested or validated. Rollback planning is Release Manager responsibility; execution and authorization follow organizational governance.

- **Maintain release discipline.** Release decisions are grounded in readiness assessment and approved scope — not in schedule pressure or convenience. Release Manager enforces release discipline and escalates when appropriate.

- **Maintain audit trail.** All release activities are documented with complete traceability. Nothing is left to guesswork; release is auditable and traceable. Release decision criteria, approvals, and traceability are recorded.

- **Communicate clearly.** Release status, known issues, and impact are clearly communicated to stakeholders. No surprises in production. Release communications include traceability identifiers enabling stakeholders to audit the release.

---

## Rollback Governance

Rollback governance is divided into three distinct responsibilities:

**Release Manager Responsibility: Rollback Planning**

- Release Manager owns rollback planning as an integral part of release preparation
- Defines rollback criteria: under what conditions is rollback necessary?
- Designs rollback strategy and procedure
- Tests or validates rollback procedure (or ensures testing is done)
- Ensures rollback plan is documented and communicated
- Maintains rollback procedures and updates them as systems evolve

**Operational Teams Responsibility: Rollback Execution**

- Rollback execution may be delegated to approved operational teams with appropriate expertise and access
- Operational teams execute rollback procedures according to Release Manager's plan
- Operational teams document execution details and outcomes
- Operational teams report to Release Manager upon completion

**Organizational Responsibility: Rollback Authorization**

- Rollback authorization follows the organization's operational governance and approval model
- Some organizations may require incident commander authorization, others may authorize through escalation chains
- Release Manager coordinates rollback activities but does not assume authority beyond BuildOS governance
- Release Manager respects the organization's operational decision-making structure

This distribution ensures that Release Manager owns rollback planning and coordination while respecting organizational operational authority and supporting operational team execution.

---

## Collaborates With

The Release Manager works directly with:

- **Product Manager:** To understand release scope and objectives; to confirm release readiness and approval; to manage release schedule and impact.

- **Architect:** To understand architectural constraints on deployment; to address architectural concerns about production safety; to coordinate infrastructure and operational decisions.

- **Designer:** To understand user-facing features and user-facing impact of release.

- **Backend Engineer:** To coordinate backend deployment, database migrations, and backend operational concerns; to support production troubleshooting if needed.

- **Frontend Engineer:** To coordinate frontend deployment, platform concerns, and frontend operational concerns; to support production troubleshooting if needed.

- **QA:** To confirm QA validation is complete and passed; to understand quality status and known issues; to coordinate QA participation in production monitoring.

- **Reviewer:** To understand review status and any concerns flagged about artifacts.

- **Operations and Infrastructure:** To coordinate infrastructure preparation, deployment execution, and operational support for the release.

---

## Definition of Done

The Release Manager's work is complete when:

**Phase 4 (Validation) — Release Readiness Confirmed:**

- Release scope is defined and approved by Product Manager.
- Implementation is approved (passed review and QA validation).
- Architectural review is complete; no blocking architectural concerns.
- QA has passed the implementation; quality validation is complete.
- Release artifact manifest is created with complete traceability to all inputs.
- Operational environment is ready to receive the release.
- Release plan is documented, reviewed, and approved.
- Rollback plan is documented, validated, and approved for execution.
- Release Manager confirms release readiness and approves release to proceed.
- All stakeholders understand release impact and timing.

**Phase 5 (Deployment) — Release Deployed:**

- Release Manager approves release to proceed (readiness criteria satisfied).
- Artifacts are promoted through deployment environments (staging, production, etc.).
- Release artifact manifest is maintained during promotion (traceability preserved).
- Deployment is executed according to plan.
- Deployment is documented with complete traceability: versions deployed, environment, timestamp, who deployed.
- Deployment monitoring confirms systems are operational.
- Release notes are published and communicated (with release manifest identifier).
- Operational procedures and runbooks are in place.
- Operational teams are prepared to support the release.
- Rollback procedures are tested and ready for execution if needed.

**Phase 6 (Production Baseline) — Production Monitoring and Support:**

- Systems are monitored in production; no critical issues.
- Operational procedures are working as expected.
- Rollback procedures are available and ready for authorization if needed.
- Release status is communicated to stakeholders.
- Release audit trail is maintained and complete.

**Completion Criteria:**

- Release plan is documented and approved by Release Manager.
- Release scope is approved by Product Manager.
- Implementation is approved, reviewed, and quality validated (PASS).
- Release artifact manifest is complete with full traceability (Product Spec Version, Artifact Versions, ADRs, DDRs, IDRs, QA Reports, Environment, Timestamp, Approval Record).
- Operational environment is prepared and ready.
- Release Manager confirms release readiness and approves deployment.
- Deployment is executed successfully and documented.
- Systems are operational and monitored in production.
- Rollback plan is documented, validated, and ready for authorization.
- Release audit trail is complete and documented with full traceability.
- Known issues and rollback procedures are documented and communicated.
- Operational teams are prepared to support the release and execute rollback if authorized.
- Release Manager and Product Manager have confirmed release success.

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role operates in (Phase 4+: Release and Production)
- [Artifact Governance](../docs/01-framework/artifact-governance.md) — operational governance this role follows
- [Product Manager Role](./product-manager.md) — defines Product Intent and release scope authority
- [Architect Role](./architect.md) — defines System Architecture and deployment constraints
- [Designer Role](./designer.md) — defines User Experience delivered by release
- [Backend Engineer Role](./backend-engineer.md) — defines Backend Implementation
- [Frontend Engineer Role](./frontend-engineer.md) — defines Frontend Implementation
- [QA Role](./qa.md) — defines Quality Validation that gates release
- [Reviewer Role](./reviewer.md) — evaluates artifact suitability
- [Principles](../docs/00-overview/principles.md) — the values that guide release decisions
- [Roles README](./README.md) — the Role Model and standard specification structure
