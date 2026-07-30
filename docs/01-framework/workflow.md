# Workflow

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose

BuildOS workflow describes how work moves through the framework from idea to evolved product. It defines the phases, decision points, and artifacts that characterize a sprint or project cycle. The workflow ensures that every piece of work is intentional, tracked, approved, and auditable. This is the heartbeat of BuildOS: how structured delivery actually happens.

## Workflow Overview

Work flows through BuildOS in a cycle:

```
Intake → Planning → Execution → Validation → Baseline → Evolution
  ↑                                                        ↓
  └────────────────────────────────────────────────────────┘
```

Each phase has clear objectives, roles, decision points, and artifacts. Work does not proceed to the next phase until the current phase's gate is passed. Humans make irreversible decisions at each gate; agents execute the work in between.

## Workflow Phases

### Phase 1: Intake

**Objective:** Capture and validate ideas; determine if they belong in BuildOS.

**What happens:**

- Ideas, opportunities, or problems are brought to the Product Manager role.
- The Product Manager captures the idea in a durable artifact (problem statement, opportunity brief, or user need).
- The artifact is stored in the repository with metadata (date, source, priority).
- The Product Manager evaluates the idea against BuildOS's vision and principles. Is this aligned? Is it in scope? Is it feasible?

**Key artifacts:**

- Idea capture (brief, problem statement, or opportunity note)

**Human decision gate:**

- Product Manager decides: Does this idea warrant a full planning cycle? If yes, advance to Phase 2. If no, archive with rationale.

**No work proceeds beyond this gate without human decision.**

---

### Phase 2: Planning

**Objective:** Define what will be built, why, and how to measure success.

**What happens:**

- The Product Manager role, in collaboration with the Architect role, defines the work in detail.
- A PRD (or equivalent) is written: what is being built, user need, success criteria, constraints, assumptions.
- The Architect role sketches the high-level solution approach: architecture, technology choices, dependencies, risks.
- A specification (or equivalent) is written: detailed requirements that developers and QA can execute against.
- These artifacts move through the artifact lifecycle: creation → independent evaluation → approval → baseline (see Artifact Lifecycle section below).

**Key artifacts:**

- PRD (created by Product Manager, evaluated independently, approved)
- Specification (created by Product Manager/Architect, evaluated independently, approved)
- Architecture or design overview (created by Architect, evaluated independently, approved)
- Success criteria and acceptance tests (created by Product Manager/QA, evaluated independently, approved)

**Human decision gate:**

- Product Manager decides: Are the plan and spec ready to execute? Do they align with the vision? If yes, advance to Phase 3. If no, revise and re-evaluate.
- Architect decides: Is the proposed approach sound and feasible? If no, escalate risks or propose changes.

**No execution begins until the plan is approved by both Product Manager and Architect.**

---

### Phase 3: Execution

**Objective:** Build the solution according to the plan.

**What happens:**

- Designer, Frontend Engineer, and Backend Engineer roles read the specification and execute.
- Design docs are created (if needed): interaction flows, visual language, component specs.
- Code is written according to the specification.
- Documentation is written: user guides, developer docs, deployment guides (if applicable).
- These artifacts move through the artifact lifecycle (creation → independent evaluation → approval → baseline).

**Key artifacts:**

- Design documents (if applicable)
- Code (in version control)
- Developer documentation
- Deployment or integration guides (if applicable)

**Human decision gate:**

- Each Engineer (Designer, Frontend, Backend) reports: "Execution is complete and ready for validation." If there are blockers, they escalate to the Architect or Product Manager.

**Work does not advance to Phase 4 until the Builder (human or team) confirms execution is complete.**

---

### Phase 4: Validation

**Objective:** Verify that the execution meets the plan and works as intended.

**What happens:**

- QA role reads the acceptance tests from Phase 2 and tests the execution.
- A test plan (or equivalent) is created: what is being tested, test cases, expected outcomes.
- Testing is performed; results are documented.
- The Reviewer role (independent of the builders) reviews the code, design, and artifacts against the specification. Does the code do what was promised? Does it follow the architecture? Are there edge cases or risks?
- Issues, defects, and design concerns are documented.

**Key artifacts:**

- Test plan (created by QA, evaluated independently, approved)
- Test results and coverage report
- Code review (documented, defects logged)
- Any design review notes or architecture review feedback

**Human decision gate:**

- QA decides: Does the execution meet the acceptance tests? If no, send back to Phase 3 (Execution) for rework. If yes, proceed.
- Reviewer decides: Is the code, design, and overall execution sound? Are there unacceptable risks? If yes, send back to Phase 3. If no, proceed.

**Work does not advance to Phase 5 until both QA and Reviewer have signed off.**

---

### Phase 5: Baseline

**Objective:** Establish the work as an approved, released version ready for use.

**What happens:**

- The Release Manager role coordinates the final approval and release.
- Release notes are written: what is in this release, what changed, known issues, migration steps (if applicable).
- A human (the Release Manager or builder) approves the release.
- The work is tagged as a release (a baseline version in version control).
- The release is communicated to stakeholders and deployed or published.

**Key artifacts:**

- Release notes (created by Release Manager, reviewed and approved)
- Release tag or version marker in the repository
- Deployment or publication confirmation

**Human decision gate:**

- Release Manager (or owner) decides: Is this ready to release? Are all gates passed? If yes, release. If no, hold and document why.

**No release happens without explicit human approval.**

---

### Phase 6: Evolution

**Objective:** Improve the work based on real-world feedback and learning.

**What happens:**

- After release, the work is used by real users or real teams.
- Feedback, issues, and improvement ideas are captured.
- The Product Manager evaluates the feedback: Is this a bug fix (small correction)? Is this a feature request (new capability)? Is this a redesign (rethink the approach)?
- Small fixes and issues flow back to Phase 3 (Execution) for quick rework and re-validation.
- Larger opportunities or redesigns flow back to Phase 2 (Planning) for re-planning.
- Major new directions flow back to Phase 1 (Intake) as new ideas.

**Key artifacts:**

- Issue reports or feedback logs
- Decision on how to address feedback (document rationale)

**Human decision gate:**

- Product Manager decides: What category of change is this? Where does it go (Phase 1, 2, or 3)? If it's urgent, escalate. Otherwise, queue it for the next planning cycle.

---

## Artifact Lifecycle vs. Workflow Phases

**Important distinction:** The Constitution (Article VI) defines the _artifact lifecycle_. The workflow defines the _sprint/project phases_. They are related but different.

**Artifact lifecycle** (per Constitution): Every artifact moves through creation → independent evaluation → approval → baseline → controlled evolution.

**Workflow phases** (this document): Work as a whole moves through Intake → Planning → Execution → Validation → Baseline → Evolution.

Within each workflow phase, individual artifacts move through their lifecycle. For example:

- In Phase 2 (Planning), the PRD and Specification artifacts are created, evaluated, and approved before Phase 3 begins.
- In Phase 3 (Execution), code and design docs are created and evaluated as the builders work.
- In Phase 4 (Validation), the test plan is created and approved; test results are produced.
- In Phase 5 (Baseline), release notes are created and approved; the release is marked as baseline.

The workflow ensures that artifacts are produced in the right order and are approved at the right gates. The artifact lifecycle (per Constitution) ensures that every artifact goes through evaluation and approval before becoming canonical.

---

## Decision Points

BuildOS workflow has six human decision gates, one at the end of each phase:

| Gate                   | Owner                       | Decision                                        | Forward / Block                             |
| ---------------------- | --------------------------- | ----------------------------------------------- | ------------------------------------------- |
| **Gate 1: Intake**     | Product Manager             | Is this idea aligned and in scope?              | Forward to Planning or Archive              |
| **Gate 2: Planning**   | Product Manager + Architect | Is the plan sound and ready to execute?         | Forward to Execution or Revise Plan         |
| **Gate 3: Execution**  | Builder (Engineer)          | Is execution complete and ready for validation? | Forward to Validation or Continue Execution |
| **Gate 4: Validation** | QA + Reviewer               | Does execution meet plan and quality bar?       | Forward to Baseline or Return to Execution  |
| **Gate 5: Baseline**   | Release Manager             | Is this ready to release?                       | Release or Hold                             |
| **Gate 6: Evolution**  | Product Manager             | Where does feedback go?                         | Intake, Planning, or Execution              |

No work proceeds to the next phase without human approval at each gate.

---

## Governance Rules

The workflow must comply with the Constitution. Key rules:

1. **Humans decide, agents execute.** (Article II) Every gate is a human decision. Agents produce work; humans review and decide whether to proceed.

2. **Artifacts are source of truth.** (Article III) Every decision, plan, design, test, and result is captured in an artifact. Work is not "done" until all artifacts exist.

3. **Artifacts have a lifecycle.** (Article VI) Every artifact created in the workflow must move through creation → evaluation → approval → baseline → evolution per the Constitution.

4. **Process is versioned.** (Article V) This workflow itself is version-controlled. Changes to the workflow go through pull requests and are auditable.

5. **Roles own responsibilities.** (Article IV) Each phase identifies which roles are involved. Roles are accountable for their outputs.

6. **Empiricism drives learning.** (Article VII) After Phase 6 (Evolution), teams document what worked and what didn't. The workflow is revised based on evidence, not theory.

---

## Workflow State Machine

For reference, here is the workflow as a formal state machine:

```
[Idea] → (Gate 1: PM decision) → [Planning]
                ↓
            (Archived)

[Planning] → (Gate 2: PM + Architect decision) → [Execution]
              ↓
          (Blocked, revise)

[Execution] → (Gate 3: Builder confirmation) → [Validation]
              ↓
          (Blocked, continue execution)

[Validation] → (Gate 4: QA + Reviewer decision) → [Baseline]
              ↓
          (Blocked, return to Execution)

[Baseline] → (Gate 5: Release Manager decision) → [Released]
             ↓
         (On hold)

[Released] → (Gate 6: PM decision on feedback) → [Intake] / [Planning] / [Execution]
```

---

## Workflow Compliance Checklist

When running a sprint or project through BuildOS workflow:

- [ ] Phase 1 (Intake): Idea captured in artifact; PM decision recorded.
- [ ] Phase 2 (Planning): PRD and Spec created, evaluated, approved; architecture defined; success criteria clear.
- [ ] Phase 3 (Execution): Work performed according to plan; artifacts (code, docs, designs) produced.
- [ ] Phase 4 (Validation): Test plan created; testing completed; code reviewed; defects logged and addressed.
- [ ] Phase 5 (Baseline): Release notes written; final approval given; work tagged as release.
- [ ] Phase 6 (Evolution): Feedback captured; decisions made on how to address it; improvements queued.

Every phase must be completed and every gate must be passed. No shortcuts.

---

## Related Documents

- [Constitution](./constitution.md) — the governing rules BuildOS workflow must comply with
- [Vision](../00-overview/vision.md) — the long-term direction BuildOS serves
- [Mission](../00-overview/mission.md) — what BuildOS does
- [Principles](../00-overview/principles.md) — the values guiding BuildOS decisions
