# Constitution

> Status: Approved v2 · Owner: Product Manager · Last updated: 2026-07-30
>
> Changelog: v2 revises v1 per review BO-015 — adds document precedence governance rule,
> clarifies Article VI lifecycle stages as implementation-independent lifecycle requirements.

## Purpose

BuildOS is a framework for AI-assisted product delivery. Like any organization, BuildOS requires a set of governing rules — a constitution — that defines how the framework itself is built, governed, and evolved. This constitution establishes binding principles that every role, workflow, template, artifact, and future extension must comply with. The constitution is not a guide to using BuildOS; it is the law of how BuildOS operates.

## Scope

This constitution governs:

- **The framework itself:** how BuildOS is designed, documented, and versioned.
- **All roles, workflows, and artifacts:** every extension to the framework must comply.
- **Decision-making authority:** who can decide what, and what decisions require human approval.
- **Framework evolution:** how the constitution itself is amended or clarified.

This constitution does not govern:

- Implementation details (which AI models, tools, or platforms are used).
- Specific workflow instances (how a particular team runs a sprint is their choice, within constitutional constraints).
- Tactical decisions by individual teams (choosing which feature to build next).

## Constitutional Articles

### Article I — BuildOS Governs Itself

**Statement:** BuildOS is defined, documented, and versioned within BuildOS itself.

**Rule:**

- The framework — its roles, workflows, principles, constitution, and all artifacts — is captured in code and stored in version control.
- The framework is not defined in oral tradition, external systems, or proprietary databases; it is human-readable, reviewable, and executable code.
- Any change to the framework (roles, workflows, templates, constitution) is committed as a changeset with rationale, reviewed before merge, and auditable in the git history.
- Future versions of BuildOS are developed using BuildOS itself.

**Implications:**

- Framework evolution is transparent and traceable.
- Newcomers can read the repo and understand the framework without consulting experts.
- The framework improves through the same rigor it applies to products.

---

### Article II — Humans Retain Decision Authority

**Statement:** Agents execute work. Humans make decisions, retain final authority, and own outcomes.

**Rule:**

- No AI agent can autonomously make an irreversible decision (ship code, release a product, commit to scope, change the constitution).
- Every workflow must have explicit human decision gates where the builder can redirect, override, or reject agent output.
- Humans are accountable for what ships. Agents are accountable for executing their role well.
- "Humans in command" is not aspirational; it is a binding constraint on every role and workflow.

**Implications:**

- Every release requires human approval, even if the agent output is correct.
- Every specification is subject to human review and revision before it drives work.
- If an agent's output is wrong or unclear, the human can rewrite it; the agent's work is not sacred.
- The framework does not pretend agents can replace human judgment.

---

### Article III — Artifacts are the Source of Truth

**Statement:** The canonical record of any work, decision, or output is a durable artifact stored in version control.

**Rule:**

- Conversations, chat logs, and ephemeral outputs are not the source of truth. Artifacts are.
- Every decision, specification, design, test plan, and release note must be captured in a permanent, versioned artifact.
- Artifacts are stored in the repository where the code lives, not in external tools or proprietary systems.
- A feature cannot be considered "done" until all relevant artifacts exist: requirement, spec, design doc, test plan, code review, release notes.
- The absence of an artifact is a blocker; work does not proceed without it.

**Implications:**

- Six months from now, a newcomer can read the artifact history and understand why every feature was built.
- Decisions are traceable; no "we decided this in a meeting" with no record.
- Agents produce artifacts; they do not produce opinions or recommendations that disappear.
- The framework trusts artifacts more than code reviews, more than agent confidence, more than individual memory.

---

### Article IV — Roles Define Responsibilities, Not Tools

**Statement:** BuildOS is organized by roles (Product Manager, Architect, Engineer, QA, etc.). Roles are defined by responsibility, not by which tool or model fills them.

**Rule:**

- Each role has a clear charter: inputs, responsibilities, outputs, and success criteria.
- A role can be filled by a human, an AI agent, or both; the charter does not change.
- The framework does not depend on any specific AI model, vendor, or tool. Roles remain the same across model upgrades, vendor changes, or tool substitutions.
- If a role's charter cannot be executed by today's tools, the role is described as it should be; the framework does not contort itself to match tool limitations.
- Roles are abstract; they survive tool evolution.

**Implications:**

- BuildOS remains relevant as AI models improve and tools evolve.
- Teams can swap underlying tools without relearning the framework.
- A role is defined by what it delivers, not by "ask Claude to do X."

---

### Article V — Process is Version Controlled

**Statement:** Workflows, checklists, decision gates, and process rules are code and live in the repository.

**Rule:**

- The sprint lifecycle, handoff protocols, approval gates, and all process rules are versioned in the repository.
- Process is not oral; it is written, reviewed, and committed like any other artifact.
- When someone asks "What's the process for feature review?" the answer is a file in the repo, not a person's recollection.
- Changes to process are changes to the codebase. They go through the same review, approval, and traceability as code changes.
- Future projects inherit the documented process; they do not start from scratch.

**Implications:**

- Process is transparent, auditable, and improvable.
- Teams can propose process changes through pull requests.
- The git history of the process file shows the evolution of how BuildOS works.

---

### Article VI — Every Artifact Has a Defined Lifecycle

**Statement:** Every artifact produced by BuildOS must move through a defined lifecycle: creation, independent evaluation, approval, establishment of a baseline, and controlled evolution.

**Rule:**

- **Creation:** An artifact is produced by the responsible role according to its charter. The artifact is stored in the repository.
- **Independent evaluation:** Before an artifact drives subsequent work, it must be evaluated by a role or roles independent of its creator (e.g., a PRD produced by the Product Manager role is evaluated by the Architect and QA roles).
- **Approval:** Evaluation results and approval (or revision requirements) are recorded in the artifact. No artifact proceeds to baseline status without approval.
- **Baseline:** Once approved, the artifact becomes the canonical reference for downstream work. The baseline version is clearly marked and preserved in version control.
- **Controlled evolution:** After baseline, artifacts may evolve in response to learning or changed circumstances. All changes are versioned, rationale is recorded, and the change history is auditable. Artifacts are never deleted; superseded versions are marked as deprecated.

The specific names of lifecycle stages (e.g., "Draft," "Review," "Approved," "Released," "Archived") and the tools used to track them are implementation details. What is constitutional is the requirement that these five stages exist.

**Implications:**

- Every artifact has a clear chain of custody and approval.
- No artifact is treated as canonical until it is approved by an independent evaluator.
- The artifact history shows all decisions, approvals, and why artifacts evolved.
- Workflows must implement these five stages, though the names and tools vary.

---

### Article VII — Continuous Improvement Through Empiricism

**Statement:** BuildOS is built on hypotheses. These hypotheses are tested through real projects. The framework evolves based on evidence, not theory.

**Rule:**

- When BuildOS is used on a real project, the team documents what works and what doesn't.
- Failures, friction, or unexpected complexity are treated as data, not anomalies.
- The framework is designed with strong opinions (opinionated approach) but remains open to change based on evidence.
- Changes to the framework are driven by learning from projects, not by a fixed roadmap.
- The roadmap is a hypothesis; it is revisited after each project and revised based on what was learned.

**Implications:**

- New adopters will find issues; we listen and improve.
- A workflow that fails in practice is changed, not defended.
- BuildOS's own development is a continuous learning cycle.
- The framework is humble about what works and what does not.

---

## Governance

### Who Enforces the Constitution

The constitution is self-enforcing through code review and the development process:

- **Pull requests:** Changes that violate the constitution (e.g., adding a process rule that is not versioned in the repo, creating artifacts outside the repo) are caught in code review.
- **Role charters:** Each role's charter includes the obligation to comply with these articles.
- **Artifacts:** Every artifact's lifecycle enforcement includes a compliance gate.
- **Newcomers:** The constitution is in the repo; anyone can read it and understand the rules.

There is no "constitution police." The framework's own structure (version control, roles, artifacts, approval gates) enforces compliance.

### Dispute Resolution

If two roles or teams disagree on constitutional interpretation:

1. The disagreement is documented in a pull request or issue.
2. The relevant role charters and constitution articles are re-read to clarify.
3. If clarification is needed, the Product Manager (role) proposes an amendment (see Amendment Process below).
4. The amendment is reviewed and merged like any other change.

The goal is clarity, not winning an argument.

### Document Precedence

BuildOS operates under a clear hierarchy of governing documents. Higher-level documents constrain lower-level documents; conflicts are resolved by following this precedence:

1. **Constitution** — the binding rules that govern all of BuildOS.
2. **Principles** — the foundational values and decision-making frameworks.
3. **Workflow definitions** — the documented processes and lifecycle stages.
4. **Role charters** — the responsibilities, inputs, and outputs for each role.
5. **Templates** — the specific artifact formats and examples.

**Rule:** If a lower-level document (e.g., a template or workflow) conflicts with a higher-level document (e.g., the Principles or Constitution), the higher-level document prevails. The lower-level document is revised to comply.

**Implications:**

- A workflow cannot override a constitutional requirement.
- A role charter cannot contradict a principle.
- A template cannot require what the Constitution forbids.
- When conflicts arise, they are escalated to the appropriate level for resolution.

---

## Amendment Process

The constitution is a living document. It is amended through:

1. **Proposal:** A change to the constitution is proposed as a pull request with:
   - Clear statement of the article or section being changed.
   - Rationale for the change (what evidence supports it? what problem does it solve?).
   - Impact assessment (what workflows or roles are affected?).

2. **Review:** The proposal is reviewed by:
   - The Product Manager (role).
   - At least two other roles (to ensure broad perspective).
   - The Reviewer (role), who ensures the amendment aligns with the constitution's purpose.

3. **Approval:** The amendment is approved by the Product Manager and merged.

4. **Documentation:** The amendment is documented in the Version History section with date, change, and rationale.

5. **Communication:** If the amendment is significant, it is communicated to all active projects.

---

## Compliance

### Checking Compliance

BuildOS compliance is checked at multiple stages:

- **Pull request review:** Does this change comply with the constitution?
- **Artifact approval:** Does this artifact meet the lifecycle requirements?
- **Role execution:** Is the role executing within its charter?
- **Framework evolution:** Does a proposed new role, workflow, or artifact comply with these articles?

### Violations

If a change violates the constitution:

- **During review:** The pull request is rejected with a clear explanation of the violation. The author revises to comply.
- **After merge:** If a violation is discovered post-merge, it is treated as a bug in the framework itself. A new pull request fixes it, and the rationale is documented.
- **In practice:** If a project finds that a constitutional requirement is impossible to meet, the project documents the blocker, and the Product Manager evaluates whether the constitution needs clarification or amendment.

Constitution violations are not punished; they are treated as opportunities to clarify or improve the framework.

---

## Version History

| Date       | Version | Change                                                                | Rationale                                                                                                                                                                                                                                                                                                           |
| ---------- | ------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-07-30 | v2      | Clarified Article VI lifecycle stages; added Document Precedence rule | Review BO-015 feedback: Article VI now specifies implementation-independent lifecycle stages (creation, independent evaluation, approval, baseline, controlled evolution) rather than workflow state names. Added governance rule establishing hierarchy: Constitution → Principles → Workflow → Roles → Templates. |
| 2026-07-30 | v1      | Initial Constitution                                                  | Foundation document establishing the 7 core articles and governance model.                                                                                                                                                                                                                                          |

---

## Related Documents

- [Vision](../00-overview/vision.md) — where BuildOS is heading
- [Mission](../00-overview/mission.md) — what BuildOS does
- [Principles](../00-overview/principles.md) — values that guide decisions
- [Roadmap](../00-overview/roadmap.md) — how BuildOS evolves
