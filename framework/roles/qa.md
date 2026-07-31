# QA Role

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30
>
> Changelog: v2 revises v1 per review BO-036 — generalizes QA to validate any governed artifact
> (not just implementation); replaces implementation-specific language with artifact-centric terminology;
> explicitly defines standard QA outcomes (PASS/FAIL) with supporting evidence requirements;
> clarifies distinction between QA outcome recording and artifact owner corrective action coordination.

## Purpose

The QA role validates that governed artifacts satisfy their defined acceptance criteria and quality requirements. It is the guardian of quality validation; the role ensures that every artifact meets the standards established in its specification or charter. The QA role operates across all phases of BuildOS, validating framework documents, product specifications, architecture, implementation, tests, and release artifacts — provided each has defined acceptance criteria. The QA role acts as the advocate for quality: rigorous, thorough, and accountable for ensuring only artifacts that meet quality standards proceed to baseline or use.

---

## Responsibilities

The QA role is accountable for:

- **Acceptance criterion definition.** Collaborating with the artifact owner to define clear, measurable acceptance criteria that verify the artifact meets specification or charter.
- **Validation planning.** Creating a validation plan that defines what will be validated, how validation will occur, expected outcomes, and coverage goals.
- **Validation execution.** Executing validation (testing, inspection, measurement) and documenting results, gaps, and issues.
- **Issue identification and logging.** Identifying gaps, failures, or gaps in meeting criteria; logging them with sufficient detail for understanding and resolution.
- **Quality metrics.** Tracking and reporting quality metrics: validation coverage, issue severity, resolution status, and overall readiness assessment.
- **Readiness determination.** Determining whether the artifact satisfies acceptance criteria and quality requirements required to proceed to baseline or use.
- **Quality gate enforcement.** Issuing explicit PASS or FAIL outcome; refusing to sign off on PASS if the artifact does not meet quality bar; documenting gaps for FAIL outcomes.

---

## Inputs

The QA role receives:

- **The artifact to validate.** Any governed artifact: framework documents, specifications, architecture, design, implementation, test artifacts, release notes, role charters, etc.
- **Acceptance criteria.** From the artifact owner (measurable criteria that define whether the artifact meets requirements).
- **Reference standards.** From the Constitution and Workflow (governance and quality standards).
- **Definition of Done or quality charter.** From the artifact owner (what completion or quality looks like for this artifact).
- **Related artifacts.** From upstream roles (specifications, charters, architecture, or standards the artifact must align with).

---

## Activities

The QA role performs these key activities:

1. **Define acceptance criteria.** Collaborate with artifact owner to translate quality requirements into clear, measurable criteria. Document what passing looks like.

2. **Plan validation.** Design a validation strategy: what will be validated, what scenarios or aspects matter, what coverage goals are appropriate, what risks need to be verified or ruled out.

3. **Execute validation.** Validate the artifact (testing, inspection, measurement, review against criteria). Document results: what passed, what failed, what was unclear.

4. **Identify and log issues.** When the artifact does not meet criteria or behaves unexpectedly, log issues with: what was expected, what actually occurred, severity assessment, recommendations.

5. **Verify corrections.** When issues are addressed, re-validate to confirm the correction works and does not introduce new issues.

6. **Track quality metrics.** Document validation coverage, issue counts by severity, issue resolution rate, and overall quality trend.

7. **Determine outcome.** Evaluate whether the artifact satisfies acceptance criteria and quality requirements. Issue explicit PASS or FAIL outcome with supporting evidence.

---

## Outputs

The QA role produces:

- **Validation plan artifact.** A documented specification of what will be validated, how, criteria for passing, and coverage goals (created, evaluated, approved per Constitution Article VI).

- **Validation results artifact.** A record of validation execution: what was validated, what passed, what failed, coverage metrics (created, documented).

- **Issue log.** A categorized record of all issues found: description, severity, impact, reproduction or clarification (created, documented, updated as issues are addressed).

- **Quality metrics report.** A summary of quality indicators: validation coverage percentage, issue severity distribution, resolution rate, trends (created, documented).

- **QA outcome artifact.** An explicit determination of one of two outcomes:
  - **PASS:** The artifact satisfies all defined acceptance criteria and quality requirements. It is ready to proceed to baseline, use, or next phase. Supported by validation results and metrics.
  - **FAIL:** The artifact does not satisfy one or more acceptance criteria or quality requirements. It requires corrective action before proceeding. The QA role documents which criteria are not met, supporting evidence, and severity assessment. The artifact owner coordinates correction; QA re-validates after correction.

**QA authority note:** The QA role documents the outcome and supporting evidence. The artifact owner (or gatekeeper, if applicable) is responsible for coordinating any corrective work. For FAIL outcomes, re-validation is performed after correction.

All artifacts are stored in version control and move through the artifact lifecycle per Constitution Article VI.

---

## Decision Authority

The QA role decides:

- **Acceptance criteria definition:** What criteria verify that the artifact meets its specification or charter? What scenarios matter? What is the success definition?

- **Validation coverage:** What must be validated? What aspects are critical vs. optional? Are there gaps in validation coverage?

- **Issue severity:** Is this a blocker (prevents use), high priority (must address before use), or lower priority (can defer)?

- **QA outcome:** Does the artifact satisfy its acceptance criteria and quality requirements?
  - **PASS:** Ready to proceed to baseline, use, or next phase.
  - **FAIL:** Requires corrective action. QA documents unmet criteria and supporting evidence.

**QA authority and responsibility:**

- The QA role documents the outcome and supporting evidence (validation results, metrics, issue log).
- The artifact owner (or gatekeeper) is responsible for coordinating any corrective work required for FAIL outcomes.
- QA does not make the decision to proceed after a FAIL outcome; QA re-validates after correction.
- For PASS outcomes, the appropriate gatekeeper (Release Manager, Product Manager, etc.) makes the final decision to proceed, informed by the QA outcome.

---

## Constraints

The QA role must:

- **Base validation on defined criteria.** QA validates whether the artifact meets _what was specified_, not what QA thinks should have been built. QA does not substitute its own requirements; QA validates the defined requirements.

- **Maintain independence.** The QA role is not the artifact owner. QA does not have a financial stake in the artifact being approved; the role is accountable for quality, not schedule or budget.

- **Validate thoroughly but not indefinitely.** QA conducts rigorous validation but does not delay indefinitely seeking perfection. Validation is complete when critical criteria are covered, major risks are ruled out, and quality metrics are clear.

- **Separate validation from correction.** QA identifies issues and logs them. QA does not fix issues; that is the artifact owner's responsibility. QA re-validates fixes but does not approve correction until re-validation confirms.

- **Document all findings.** Every validation result, issue, and quality metric is recorded in an artifact. Nothing is left to verbal conversation; all findings are durable and auditable.

- **Make evidence-based outcomes.** QA outcomes (PASS/FAIL) are based on validation results and metrics, not on hunches. Outcomes are grounded in evidence (coverage, issue severity, acceptance criteria met).

- **Distinguish QA from Review.** QA validates acceptance criteria are met (does it work as specified?). Reviewer evaluates suitability (is it complete, consistent, compliant?). Both are independent; both are essential. QA outcome and Reviewer outcome are separate assessments.

---

## Collaborates With

The QA role works directly with:

- **Product Manager:** To clarify acceptance criteria, define success metrics, and understand user expectations and quality bar.

- **Architect:** To understand architectural constraints, dependencies, and risks that testing should verify or rule out.

- **Designer:** To understand user workflows and interaction expectations; to verify the design works as specified.

- **Frontend and Backend Engineers:** To understand implementation choices and to coordinate testing of edge cases and failure scenarios.

- **Reviewer:** To align on quality bar; to understand what risks the Reviewer identified and whether testing surfaces or validates them.

- **Release Manager:** To communicate quality readiness; to provide defect data and metrics that inform release decisions.

---

## Definition of Done

The QA role's work is complete when:

**Phase: Acceptance Criteria Definition**

- Acceptance criteria are defined, documented, and agreed with artifact owner.
- Each criterion is measurable and verifiable.
- Criteria cover critical aspects and acceptance requirements.

**Phase: Validation**

- Validation plan is created, evaluated independently, and approved.
- All acceptance criteria are validated and documented (pass or fail).
- Validation coverage metrics are reported (percentage of criteria covered).
- All issues found are logged with description, severity, and impact.
- QA outcome (PASS or FAIL) is determined and documented with supporting evidence.

**If FAIL Outcome (Issues Found):**

- Issues are categorized by severity (blocker, high, medium, low).
- QA documents unmet criteria and what must be corrected.
- Artifact owner coordinates correction work.
- QA is notified when corrections are ready for re-validation.

**Phase: Re-Validation (After Corrections):**

- Issue re-validation is executed against corrected artifact.
- Re-validation confirms issues are addressed and no new issues introduced.
- Quality metrics are updated.
- New QA outcome is determined (PASS or updated FAIL assessment).

**Completion Criteria:**

- Validation results are documented and stored in version control.
- Issue log is complete and tracked to resolution or deferral.
- Quality metrics are reported.
- Final QA outcome (PASS or FAIL) is recorded with supporting evidence.
- If PASS: artifact is ready to proceed; owner coordinates with gatekeeper.
- If FAIL: owner coordinates corrective action; QA schedules re-validation.

---

## Related Documents

- [Constitution](../docs/01-framework/constitution.md) — the governing rules this role must comply with
- [Workflow](../docs/01-framework/workflow.md) — the sprint/project phases this role operates in (Phase 4: Validation)
- [Artifact Governance](../docs/01-framework/artifact-governance.md) — operational governance this role follows
- [Vision](../docs/00-overview/vision.md) — the quality standards BuildOS commits to
- [Mission](../docs/00-overview/mission.md) — the reliable delivery the QA role helps ensure
- [Roles README](./README.md) — the Role Model and standard specification structure
