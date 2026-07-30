# Principles

> Status: Approved v1 · Owner: Product Manager · Last updated: 2026-07-30

These are the foundational principles that guide BuildOS design and operation. They are timeless — they describe how we think about software delivery with AI, not how we implement it today. When we face a choice, these principles help us decide.

## 1. Humans in Command

**Statement:** Agents execute work. Humans make decisions, set priorities, and own outcomes.

**Rationale:** AI can plan, code, review, and test — but it cannot judge what is worth building, whether a tradeoff is acceptable, or when to ship. These are human calls. BuildOS amplifies human judgment by removing busywork, not by replacing it.

**Practical implications:**

- Every workflow has human gates where the builder can redirect, reject, or override agent output.
- Agents never ship on their own; a human approves every release.
- The framework assumes a human makes the final call on strategy, scope, and risk.
- If an agent's output is unclear or wrong, humans can and should rewrite it.

## 2. Process as Code

**Statement:** The way we build is versioned, executable, and improvable like any other artifact.

**Rationale:** Tribal knowledge, oral process, and individual discipline don't scale. Encoding the workflow in the repo makes it transparent, repeatable, durable, and easy to improve. Future teams inherit process, not a blank slate.

**Practical implications:**

- Workflows, checklists, and decision gates are defined in templates and prompts, not in someone's head.
- The process itself lives in version control and can be audited, reviewed, and changed through pull requests.
- Anyone joining a project can read the process and understand how work flows from idea to release.
- The process evolves with the project; improvements are committed and tracked.

## 3. Artifacts Over Conversation

**Statement:** Structured, durable outputs outlast chat history. Context lives in the repo, not in the conversation.

**Rationale:** Chat-based collaboration is fast but ephemeral. Specs, decisions, and rationale disappear. BuildOS produces permanent artifacts (PRDs, specs, design docs, test plans, release notes) that stay with the project, keep context alive, and let newcomers understand why something was built.

**Practical implications:**

- Every decision is captured in a durable artifact (a doc, a spec, a test plan).
- Artifacts are stored in version control, not in chat or email.
- A newcomer to the project can read the repo history and understand the full chain of reasoning behind any feature or fix.
- Artifacts are reviewed and approved before they drive work.

## 4. Roles, Not Tools

**Statement:** BuildOS is defined by roles and responsibilities, not by any specific AI model, tool, or vendor.

**Rationale:** AI models and tools evolve rapidly. If BuildOS is tied to one model, it becomes obsolete when that model is replaced. Defining work by role (Product Manager, Architect, Engineer, QA) lets the framework adapt as tools improve.

**Practical implications:**

- Each role is defined by its inputs, responsibilities, and outputs — not by which AI tool fills it.
- You can swap underlying tools (different models, vendors, local vs. cloud) without changing the framework.
- The framework improves as models improve; no rewrite is needed.
- A role can be filled by a human, an AI agent, or both collaborating.

## 5. Transparency by Default

**Statement:** Every decision, artifact, and output is inspectable, learnable, and criticizable by anyone on the team.

**Rationale:** Opacity breeds mistrust. If builders cannot see how a decision was made or why code was reviewed a certain way, they cannot learn, improve, or challenge. Transparency enables accountability, learning, and course correction.

**Practical implications:**

- Every artifact and decision is stored in the repo, not hidden in a tool or proprietary database.
- The reasoning behind a decision (in commit messages, docs, or specs) is visible.
- Agent output is readable by humans; we do not produce black-box decisions.
- Anyone can propose changes to the process, artifacts, or decisions through normal code review.

## 6. Empiricism

**Statement:** We validate assumptions through real projects, not theory.

**Rationale:** BuildOS is built on hypotheses about how AI-assisted delivery works. Those hypotheses will be wrong in places. We learn by using the framework on real projects, measuring what works, and iterating.

**Practical implications:**

- The framework is started with strong opinions but remains open to change based on evidence.
- When a workflow fails in practice, we investigate and improve it, not defend the theory.
- We track what works and what doesn't; the roadmap is driven by learning from real use.
- New adopters will find issues; we listen and improve, not blame the user.

## 7. Opinionated by Design

**Statement:** BuildOS provides a single, coherent way to build, not infinite options.

**Rationale:** Flexibility is seductive but paralyzing. A newcomer facing ten process options will pick wrong. Strong opinions reduce decision fatigue, speed adoption, and create a coherent team culture. Opinionated doesn't mean rigid — the process evolves — but it means we start narrow.

**Practical implications:**

- The framework defines _one_ sprint lifecycle, not multiple workflows to choose from.
- Templates and prompts are prescriptive, not examples of infinite possibility.
- A team can override the opinion, but they do so deliberately and with visibility.
- Simplicity and consistency are prioritized over maximum flexibility.

## How principles guide decisions

When BuildOS faces a design choice, we ask:

- **Does this keep humans in command?** (Does it prevent humans from deciding, or hide the decision-making?)
- **Can this be encoded as code?** (Can we put it in the repo in a way others can read and improve?)
- **Does this create durable artifacts or rely on ephemeral conversation?**
- **Is this tied to a specific tool, or does it work across tools and models?**
- **Is this transparent and inspectable?**
- **Can we test this assumption in real projects?**
- **Does this serve simplicity and coherence, or add complexity?**

If a design choice violates these principles, we reconsider or articulate why an exception is necessary.

## Related documents

- [Vision](./vision.md) — where BuildOS is heading
- [Mission](./mission.md) — what BuildOS does today
