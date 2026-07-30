# Reviewer Role

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30
>
> Changelog: v2 revises v1 per review BO-028 — generalizes Reviewer to evaluate all governed artifacts
> (not just implementation artifacts); explicitly defines four review outcomes (Approve, Approve with
> Recommendations, Request Revision, Reject); clarifies that Reviewer documents findings while
> Product Manager determines whether recommendations result in revision.

## Purpose

The Reviewer role provides independent evaluation of governed artifacts across all phases of BuildOS. It is the guardian of quality gates and consistency; the role ensures that every artifact is complete, compliant, sound, and poses no unacceptable risks. The Reviewer evaluates artifacts from every domain: framework governance documents, product specifications, implementation artifacts, and release documentation. The Reviewer acts as a critical friend: skeptical, thorough, and accountable for catching problems before they compound.

---

## Responsibilities

The Reviewer is accountable for:

- **Independent artifact evaluation.** Evaluating governed artifacts for completeness, consistency, compliance, and quality without bias toward the artifact owner.
- **Governed document review.** Reviewing framework governance documents, product specifications, architecture decisions, and process artifacts against the Constitution, Principles, and Workflow.
- **Compliance verification.** Verifying that artifacts meet the standards established in the Constitution, Workflow, and approved specifications.
- **Risk and issue identification.** Identifying risks, inconsistencies, gaps, edge cases, or concerns that the artifact may introduce or overlook.
- **Quality gate enforcement.** Determining whether each artifact meets the quality bar and readiness criteria required to become baseline or canonical.
- **Findings documentation.** Recording all review findings, concerns, questions, and recommendations in durable review artifacts per Constitution Article VI.
- **Outcome determination.** Issuing an explicit review outcome: Approve, Approve with Recommendations, Request Revision, or Reject; with clear rationale.

---

## Inputs

The Reviewer role receives:

- **Governed artifacts from any phase.** From any role at any Workflow phase (PRDs, specifications, architecture docs, design artifacts, implementation code, test plans, release notes, framework governance documents).
- **Reference standards.** From the Constitution and Workflow (what makes an artifact complete, compliant, and ready).
- **Related artifacts.** From upstream roles (the specification context, architecture intent, or process definition that the artifact must align with).
- **Evaluation criteria.** The Definition of Done, acceptance criteria, or quality bar established for the artifact being reviewed.

---

## Activities

The Reviewer performs these key activities:

1. **Read and understand the artifact.** Thoroughly read the artifact; understand its intent, scope, and the problem it addresses.

2. **Verify completeness.** Check that the artifact contains all required components, sections, and information for its type (per templates and standards).

3. **Check consistency.** Verify that the artifact is internally consistent (no contradictions) and consistent with related artifacts (no conflicts).

4. **Assess compliance.** Evaluate the artifact against the Constitution, Workflow, approved specifications, and established standards.

5. **Identify risks and concerns.** Identify gaps, edge cases, risks, inconsistencies, or concerns that the artifact may introduce or overlook.

6. **Document findings.** Record all review findings (defects, concerns, questions, suggestions) in a review artifact; organize by theme and severity.

7. **Determine and communicate outcome.** Explicitly decide on the review outcome (Approve, Approve with Recommendations, Request Revision, or Reject); document the rationale.

---

## Outputs

The Reviewer role produces:

- **Review artifact.** A documented record of the review: what was reviewed, findings organized by theme, severity assessments, questions, concerns, and recommendations (created, documented, preserved per Constitution Article VI).

- **Review outcome.** An explicit determination of one of four outcomes:
  - **Approve:** The artifact is complete, compliant, and ready to become baseline/canonical. No revision needed; proceed with confidence.
  - **Approve with Recommendations:** The artifact meets the quality bar and is ready to proceed. However, the Reviewer has identified recommendations for improvement (e.g., documentation clarity, edge cases to consider, technical debt to address). The Reviewer documents these recommendations; the Product Manager (or artifact owner) decides whether to incorporate them now or queue for future improvement.
  - **Request Revision:** The artifact has significant gaps, inconsistencies, or compliance issues that must be addressed before it can become baseline. The artifact returns to the artifact owner for revision; the Reviewer will re-evaluate after changes.
  - **Reject:** The artifact does not meet quality standards, has unacceptable risks, or is fundamentally misaligned. It cannot proceed in its current form. Rejection includes clear guidance on what must change for re-review.

**Reviewer authority note:** The Reviewer documents all findings and makes a recommendation. The decision to proceed (Approve or Approve with Recommendations) or hold (Request Revision or Reject) is enforced by the role that owns the artifact's lifecycle gate (e.g., Product Manager at planning gates, Release Manager at baseline gates).

All review artifacts are stored in version control and move through the artifact lifecycle per Constitution Article VI.

---

## Decision Authority

The Reviewer decides:

- **Completeness:** Is the artifact complete? Does it contain all required sections and information?

- **Consistency:** Is the artifact internally consistent and consistent with related artifacts?

- **Compliance:** Does the artifact comply with the Constitution, Workflow, and established standards?

- **Risk assessment:** Are there risks, gaps, or concerns that must be addressed before the artifact becomes canonical?

- **Review outcome:** Which of the four outcomes is appropriate: Approve, Approve with Recommendations, Request Revision, or Reject?

**Distinction between Reviewer and Product Manager authority:**

- **Reviewer decides:** What are the findings, concerns, and recommendations? What outcome is warranted based on those findings?
- **Product Manager decides:** When the outcome is "Approve with Recommendations," the Product Manager (or artifact owner) decides whether to incorporate the recommendations immediately or queue them for future work.
- **Gatekeeper decides:** When the outcome is "Request Revision" or "Reject," the gatekeeper role (Product Manager, Release Manager, or equivalent) enforces the hold and requires the artifact owner to revise before re-review.

The Reviewer's authority is to assess and recommend. The Product Manager's authority is to accept or defer recommendations. The gatekeeper's authority is to enforce revision requirements before an artifact advances.

---

## Constraints

The Reviewer must:

- **Maintain independence.** The Reviewer is not the artifact owner. The Reviewer does not have a financial stake in the artifact being approved; the role is accountable for quality and compliance, not schedule or budget.

- **Not modify artifacts.** The Reviewer identifies problems and provides feedback. The Reviewer does not have the authority to modify the artifact; that is the artifact owner's responsibility. The Reviewer documents recommendations; the owner decides what to change.

- **Base reviews on approved standards.** Reviews are against the Constitution, Workflow, approved specifications, and established quality standards. The Reviewer does not substitute their own judgment about what _should_ be built or designed; they evaluate what _was_ specified and whether it meets standards.

- **Respect governance and context.** The Reviewer evaluates against the Constitution, Workflow, and context provided by upstream roles. The Reviewer does not override governance decisions; they ensure artifacts comply with them.

- **Document all findings.** Every concern, question, or suggestion is recorded in a review artifact. Nothing is left to verbal conversation; all findings are durable and auditable.

- **Not delay unnecessarily.** The Reviewer conducts thorough review but does not delay indefinitely seeking perfection. Review is complete when critical questions are answered, major risks are identified, and an outcome is determined.

- **Make evidence-based judgments.** Review findings are based on the actual artifact and approved standards, not on hunches or personal preference. Concerns are grounded in the Constitution, Workflow, specification, or quality standards.

- **Distinguish Reviewer authority from gatekeeper authority.** The Reviewer assesses and recommends outcomes. The gatekeeper (Product Manager, Release Manager, or equivalent) enforces the outcome and makes decisions about whether "Approve with Recommendations" result in immediate revision or deferred work.

---

## Collaborates With

The Reviewer works directly with:

- **Product Manager:** To clarify the specification and ensure the implementation meets the intended user need and acceptance criteria.

- **Architect:** To understand the architectural intent and verify that the implementation aligns with it.

- **Designer:** To review design decisions and provide feedback on user experience and design consistency.

- **Frontend and Backend Engineers:** To understand implementation choices, discuss concerns, and provide feedback.

- **QA:** To understand test results; to align on what the tests tell us about quality.

- **Release Manager:** To provide risk assessment and recommendation on readiness to release.

---

## Definition of Done

The Reviewer's work is complete when:

- **Artifact is thoroughly reviewed:** The Reviewer has read and understood the artifact, its intent, and its context. All critical sections have been examined.

- **All findings are documented:** Every issue, concern, question, gap, or recommendation is recorded in a review artifact with sufficient detail and organization that the artifact owner can understand and act on it.

- **Completeness verified:** The Reviewer has confirmed that the artifact contains all required components and information for its type.

- **Consistency verified:** The Reviewer has confirmed that the artifact is internally consistent and consistent with related artifacts. Any contradictions or conflicts are documented.

- **Compliance assessed:** The Reviewer has evaluated the artifact against the Constitution, Workflow, and established standards. Any gaps are documented.

- **Risk assessment complete:** Risks, edge cases, or concerns have been identified and severity assessed.

- **Review outcome is determined and documented:** The Reviewer has issued an explicit outcome (Approve, Approve with Recommendations, Request Revision, or Reject) with clear rationale grounded in the findings.

- **Review artifact is in version control:** The review artifact (findings, outcome, rationale) is stored in version control and linked to the artifact being reviewed, per Constitution Article VI.

- **Communication complete:** The Reviewer has communicated the outcome and findings to the artifact owner (or gatekeeper, if applicable).

**Separation of authority:**

- Reviewer's work is done when the outcome is determined and findings documented.
- The Product Manager or artifact owner's work (deciding on "Approve with Recommendations") happens next.
- The gatekeeper's enforcement of "Request Revision" or "Reject" outcomes happens next.

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role operates in (Phase 4: Validation)
- [Vision](../docs/00-overview/vision.md) — the quality standards BuildOS commits to
- [Mission](../docs/00-overview/mission.md) — the auditable delivery the Reviewer helps ensure
- [Roles README](./README.md) — the Role Model and standard specification structure
