# Roadmap

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

## Purpose of this roadmap

BuildOS evolves through versioned releases, each advancing the framework toward production readiness. This roadmap charts that path from foundation (v0.1) to the first release where external teams can reliably use BuildOS to ship a complete product (v1.0). Each release is outcome-oriented: we measure success by capability maturity, not by task completion.

## Guiding approach

We build BuildOS in a way that models its own principles:

- **Early releases are opinionated, narrow, and coherent** rather than flexible and feature-complete.
- **Each release is proven on a real project** before we move to the next (empiricism).
- **The roadmap evolves based on what we learn** from building with the framework itself.
- **We ship artifacts and working examples with each release**, not just documentation.
- **Adoption and feedback drive priorities** more than a pre-planned feature list.

## Release timeline

### v0.1: Foundation (Current)

**Objective:** Define the framework as code and document.

BuildOS starts with a clear vision, mission, and set of principles. All core agent roles are named. The basic operating framework (what makes a role? how do agents hand off? what does a sprint look like?) is documented. This is the scaffolding; the details come next.

**Capabilities:**

- Vision, Mission, and Principles documents (durable decision foundation)
- Defined roles: Product Manager, Architect, Designer, Frontend Engineer, Backend Engineer, QA, Reviewer, Release Manager
- Glossary of key terms
- High-level sprint lifecycle sketch
- Constitution (values and guardrails every agent operates under)

**Success criteria:**

- Framework is human-readable and can guide a builder
- Someone new can understand the roles and how they interact
- Principles are clear enough to guide design decisions
- Foundation is solid enough to build the next layer on

**Timeline:** By end of Q3 2026

---

### v0.2: Core workflow

**Objective:** Make the workflow executable end-to-end.

BuildOS moves from scaffold to skeleton. Each role has a clear charter: what inputs it expects, what it produces, what it's accountable for. The sprint lifecycle is defined in detail (planning → design → build → test → review → release). Constitution is operationalized: what does "humans in command" mean in practice? What gates exist? How does a human override an agent?

**Capabilities:**

- Complete agent role charters (inputs, responsibilities, outputs, examples)
- Full sprint lifecycle with stages and gates
- Handoff protocols: how does one role's output become the next role's input?
- Constitution operationalized: decision authority, approval gates, human override points
- First set of reusable prompts (plan a sprint, write a PRD outline)

**Success criteria:**

- A builder with no prior BuildOS experience can follow the workflow and move work from idea to release
- Each role's responsibilities are clear; no ambiguity about who does what
- Handoffs between roles are unambiguous (A produces X, B expects X)
- A human can articulate where they make decisions and where agents execute

**Timeline:** By end of Q4 2026

---

### v0.3: Structured artifacts

**Objective:** Enable teams to produce durable, traceable outputs.

BuildOS now produces permanent artifacts at each stage. When a PRD is written, it's a versioned, reviewable document in the repo. When a feature is designed, the design doc lives alongside the code. Tests are plans, not conversations. This layer makes BuildOS's promise of "traceable to a requirement, a spec, a review, and a release note" real.

**Capabilities:**

- PRD template (working example)
- Feature specification template
- Architecture/design document template
- Test plan template
- Release notes template
- Versioning guidance: how do we track changes to these artifacts?
- Examples: real artifacts from a test project (redacted as needed)

**Success criteria:**

- A builder can point to a released feature and trace it back through spec → design → test → review → release notes
- Artifacts are in the repo, versioned, and reviewable
- Each artifact has a clear purpose and a clear handoff to the next stage
- A newcomer can read the artifact history and understand the full story of a feature

**Timeline:** By end of Q1 2027

---

### v0.4: Agent roles operationalized

**Objective:** Each agent role has explicit prompts, examples, and success criteria.

BuildOS moves from role definitions to agent instructions. When an agent takes on the Product Manager role, it knows: "Here is your charter. Here are your inputs. Here are the outputs you are expected to produce. Here are examples of good outputs. Here is how success is measured." This makes roles machine-executable, not just human-understandable.

**Capabilities:**

- Complete prompts for each role (Product Manager, Architect, Designer, Frontend/Backend Engineers, QA, Reviewer, Release Manager)
- Success criteria for each role's output (e.g., "A good PRD is complete, testable, and traces to user need")
- Examples of outputs for each role (a well-executed PRD, a sound architecture doc, effective test coverage)
- Feedback protocol: how does one role evaluate and approve another role's output?

**Success criteria:**

- An AI agent given a role prompt can execute that role without ambiguity
- The handoff from one role to the next is clear (role A's output is role B's input)
- A human can see the agent's work and verify it meets the role's success criteria
- The framework can guide AI agents as well as humans

**Timeline:** By end of Q2 2027

---

### v0.5: Orchestrated workflows

**Objective:** Connect roles into an end-to-end AI-assisted delivery pipeline.

BuildOS moves from individual roles to orchestrated workflows. When a product idea comes in, the Product Manager role acts, producing a PRD. That PRD becomes input to the Architect. The Architecture doc becomes input to the Designers and Engineers. Tests are planned. Code is reviewed. Releases are approved. The whole cycle runs as a connected workflow, with humans making irreversible decisions and agents handling the work in between.

**Capabilities:**

- Workflow orchestration: PRD → Spec → Design → Implementation → Testing → Review → Release
- Agent-to-agent handoff automation (output of one becomes input to the next)
- Approval gates: where must humans review and approve?
- Iteration protocol: when does a workflow loop (e.g., design feedback loops back to spec)?
- Monitoring and observability: visibility into where work is in the pipeline

**Success criteria:**

- A complete idea can flow through the entire BuildOS workflow with minimal manual intervention
- Humans approve decisions; agents execute work
- The workflow produces all expected artifacts at each stage
- A team can run multiple projects in parallel using the same workflow

**Timeline:** By end of Q3 2027

---

### v1.0: BuildOS is validated through the successful delivery of a real product.

**Objective:** BuildOS is proven on real projects and ready for external adoption.

BuildOS reaches v1.0 when the framework has shipped a complete, non-trivial product: idea to market. The framework has been tested, refined, and proven. Documentation is complete and accessible to newcomers. The community is ready to adopt and contribute.

**Capabilities:**

- At least one complete product shipped entirely using BuildOS (the proof)
- Comprehensive user guide and getting-started docs
- Community examples and case studies
- Framework is stable; breaking changes are rare and well-communicated
- Contribution guidelines and roadmap process are clear
- The framework's own development is managed using BuildOS (dogfooding)

**Success criteria:**

- An external team can adopt BuildOS and ship a product without inventing process
- The framework is stable; teams can build on top of it without fear of major breakage
- BuildOS itself is delivered using BuildOS (the ultimate proof)
- The framework attracts users and contributors beyond its authors
- Success metrics are clear: adoption, projects shipped, team feedback

**Timeline:** By end of Q4 2027 (aspirational; likely to slip based on learning)

---

## Success criteria across the roadmap

We measure BuildOS's progress toward v1.0 by:

1. **Framework coherence:** Do the roles, artifacts, and workflow form a complete, understandable system?
2. **Human-to-agent clarity:** Can both humans and AI agents understand their role and execute it?
3. **Artifact traceability:** Can a shipped feature be traced from idea to release through all artifacts?
4. **Real-project validation:** Has at least one non-trivial product been delivered using the framework at each stage?
5. **Principle adherence:** Does each release reinforce the foundational principles (humans in command, process as code, artifacts over conversation, roles not tools, transparency, empiricism, opinionated design)?
6. **Newcomer readiness:** Can someone new to BuildOS understand the framework and use it without inventing process?

## Living document

This roadmap is a hypothesis about how BuildOS should evolve. It will change based on:

- What we learn from building projects using BuildOS
- Feedback from early adopters
- Changes in AI capability and model landscape
- Community input and contribution

We commit to transparency: changes to this roadmap will be documented with rationale. The roadmap is versioned in the repo like any other artifact.

## Related documents

- [Vision](./vision.md) — where BuildOS is heading (3–5 year North Star)
- [Mission](./mission.md) — what BuildOS does today
- [Principles](./principles.md) — the values that guide BuildOS decisions
