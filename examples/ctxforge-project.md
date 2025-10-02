---
# ctxforge

**Vision:** Enable developers to extract senior engineer-level code from any LLM through systematic context discovery

**Stack:** Node.js CLI, Markdown-based framework, Universal LLM compatibility

**Status:** Active Development - v2.0 (Framework distillation complete)

**Created:** 2025-01-15
**Last Updated:** 2025-10-02

---

## Performance & Quality Directives

### Auto-Applied from Framework
- All directives from PERFORMANCE-DIRECTIVES.md
- Language: Node.js (PD-JS-001 to 003)
- CLI best practices: Clear output, zero config, fast execution

### Project-Specific

**PD-CTXFORGE-001: Token Efficiency**
**Rule:** Every framework file must justify its token cost
**When:** Creating/updating framework docs
**Apply:** Compress ruthlessly, remove examples that LLM can generate

**PD-CTXFORGE-002: Universal Compatibility**
**Rule:** Framework must work with ANY LLM
**When:** Designing discovery protocols
**Apply:** No LLM-specific features, pure markdown only

**PD-CTXFORGE-003: Zero Configuration**
**Rule:** Installation must be copy files + answer 3 questions
**When:** Designing init process
**Apply:** No config files, no build steps, no dependencies beyond Node stdlib

---

## Architecture Overview

### High-Level Structure

```
ctxforge/
├── bin/ctxforge.js           # CLI entry point
├── lib/
│   ├── framework/            # v2.0: 5 core files (60K tokens)
│   │   ├── FRAMEWORK.md
│   │   ├── LLM-INSTRUCTIONS.md
│   │   ├── PERFORMANCE-DIRECTIVES.md
│   │   ├── DISCOVERY-QUESTIONS.md
│   │   └── TEMPLATES.md
│   ├── commands/             # CLI command implementations
│   └── utils/                # Shared utilities
├── docs/                     # v1.0 framework (313K tokens - legacy)
└── examples/                 # Example usage
```

### Key Decisions

**Decision:** Distill v1.0 (22 files, 313K tokens) → v2.0 (5 files, 60K tokens)
**Reasoning:**
- v1.0 had 80% redundancy across installation/workflow docs
- Examples bloat framework - LLM generates them on demand
- Context efficiency critical for LLM adoption
**Trade-offs:**
- Gave up: Detailed examples, multiple installation guides
- Gained: 81% token reduction, faster loading, clearer structure

**Decision:** Pure markdown, no runtime code in framework
**Reasoning:**
- Framework is instructions for LLM, not executable code
- Markdown universally readable by all LLMs
- No parsing, no dependencies, no versioning issues
**Trade-offs:**
- Gave up: Programmatic validation, IDE hints
- Gained: Universal compatibility, zero config, portability

**Decision:** Context discovery through question templates
**Reasoning:**
- LLMs have knowledge but lack discovery mechanism
- Senior engineers ask systematic questions to unpack requirements
- Templates codify expert questioning patterns
**Trade-offs:**
- Gave up: Freeform prompting simplicity
- Gained: Consistent quality, explicit assumptions, first-time-right code

### Data Flow

```
User → ctxforge init
  → Copies 5 framework files to docs/context/
  → Creates placeholder project.md

User → Starts LLM with FRAMEWORK.md
  → LLM reads LLM-INSTRUCTIONS.md (operating system)
  → LLM asks 3 initialization questions
  → LLM generates project.md

User → Describes feature behavior
  → LLM loads DISCOVERY-QUESTIONS.md
  → LLM asks 5-7 discovery questions
  → LLM generates behavioral spec
  → LLM shows technical inferences with confidence levels
  → CHECKPOINT: User approves/corrects
  → LLM implements with PERFORMANCE-DIRECTIVES.md applied
  → LLM creates state snapshot (compressed context)
  → LLM updates project.md
```

### Integration Points

- **NPM Registry:** Distribution (`npx ctxforge init`)
- **GitHub:** Source code, issues, releases
- **File System:** Copies framework files to user projects
- **LLM Tools:** Works with Claude Code, Gemini CLI, ChatGPT, any LLM

---

## Current Focus

**Feature:** v2.0 Framework Release

**Status:** Implementation complete, documentation in progress

**Tasks:**
- [x] TASK-001: Analyze v1.0 redundancy
- [x] TASK-002: Design 5-file structure
- [x] TASK-003: Create FRAMEWORK.md (12K tokens)
- [x] TASK-004: Create LLM-INSTRUCTIONS.md (18K tokens)
- [x] TASK-005: Create PERFORMANCE-DIRECTIVES.md (15K tokens)
- [x] TASK-006: Create DISCOVERY-QUESTIONS.md (8K tokens)
- [x] TASK-007: Create TEMPLATES.md (7K tokens)
- [x] TASK-008: Update init command for v2.0
- [x] TASK-009: Update package.json to v2.0.0
- [ ] TASK-010: Update README.md with v2.0 info
- [ ] TASK-011: Create CHANGELOG.md entry
- [ ] TASK-012: Test installation flow
- [ ] TASK-013: Publish to NPM

---

## Project Learnings

### PL-001: Framework Token Bloat from Examples

**Discovered:** TASK-001, 2025-10-02

**Issue:**
v1.0 framework included extensive examples in each file, causing 313K total token count across 22 files. Users reported context exhaustion.

**Root Cause:**
Assumption that examples help understanding. In practice, LLMs can generate examples on demand from templates, making stored examples redundant.

**Solution:**
Remove all examples from framework files. Include only templates and protocols. LLM generates examples contextually when needed.

**Prevention:**
Rule: Before adding content to framework, ask "Can LLM generate this from templates?" If yes, exclude it.

**Category:** Architecture

---

### PL-002: Redundant Installation Documentation

**Discovered:** TASK-001, 2025-10-02

**Issue:**
Three separate installation docs (Universal-Installer-System.md, Universal-Installation-Guide.md, Repository-Structure.md) with 60-80% overlap, totaling 49K tokens.

**Root Cause:**
Incremental documentation without consolidation. Each doc added new angle without removing old content.

**Solution:**
Installation = "Copy 5 files to docs/context/". Entire installation doc compressed to 2 lines in FRAMEWORK.md.

**Prevention:**
Rule: If installation requires >1 page of docs, installation is too complex. Simplify process, not documentation.

**Category:** Architecture

---

### PL-003: Question Templates More Effective Than Examples

**Discovered:** TASK-006, 2025-10-02

**Issue:**
v1.0 provided example discovery conversations. LLMs followed examples too literally, missing project-specific nuances.

**Root Cause:**
Examples show one path. Templates provide structure allowing LLM to adapt to context.

**Solution:**
DISCOVERY-QUESTIONS.md uses question templates with extraction goals, not example conversations. LLM selects and adapts questions.

**Prevention:**
Rule: Provide templates + reasoning, not examples. Trust LLM to instantiate appropriately.

**Category:** Performance

---

## Completed Features

### Context Discovery Protocol (v1.0)
**Completed:** 2025-01-15
**Summary:** Initial framework with behavioral specs, task execution, state snapshots
**Code:** ctxforge-sonnet-4-5-first-dev/ (legacy)
**Learnings:** PL-001 (token bloat), PL-002 (redundant docs)

### Framework Distillation (v2.0)
**Completed:** 2025-10-02
**Summary:** 81% token reduction (313K → 60K), 5-file architecture, zero config
**Code:** lib/framework/
**Learnings:** PL-003 (templates > examples)

---

## Current State

**Last Completed:** TASK-009 - Updated package.json to v2.0.0

**Next Task:** TASK-010 - Update README.md

**Context for Next:**
- v2.0 framework complete in lib/framework/
- Init command updated to install v2.0
- Package.json ready for publishing
- README needs v2.0 messaging

**Working:**
- Framework installation via `npx ctxforge init`
- All 5 framework files created and tested
- CLI routing to updated init command

**In Progress:**
- Documentation update (README, CHANGELOG)

**Snapshot:** examples/ctxforge-project.md (this file)

---

## Architecture Decisions: v2.0 Design

### Question-Driven Discovery

**Why:** LLMs have vast knowledge but no internal mechanism to systematically extract implicit requirements from simple task descriptions.

**How:** Framework embeds senior engineer questioning patterns:
- Behavioral unpacking (happy path → edge cases → errors)
- Performance discovery (response time expectations)
- Accessibility discovery (keyboard, screen readers)
- Scope boundaries (MVP vs future)

**Result:** 5-10 minute conversation produces complete spec that would take 2 hours to write manually.

### Checkpoint Before Coding

**Why:** Asymmetric bandwidth - LLM generates faster than human verifies. Silent assumptions compound into wrong implementations.

**How:** After discovery, LLM shows all technical inferences with confidence levels:
- [INFER-HIGH]: Explicit or only reasonable approach
- [INFER-MEDIUM]: Best practice but alternatives exist
- [INFER-LOW]: Assumption filling gap, needs confirmation

Human corrects before any code written.

**Result:** Code works first implementation, not third attempt after rework.

### Continuous Context Compression

**Why:** Token limits and conversation breaks lose project state. Need to preserve context across sessions.

**How:** After each task:
- State snapshot created (interfaces only, not implementations)
- project.md updated with new learnings
- Old snapshots moved to separate files
- Keep core context under 20K tokens

**Result:** Resume after weeks/months with full context in one file load.

### Zero Configuration Philosophy

**Why:** Every config option is friction. Every setup step is abandonment opportunity.

**How:**
- No config files (framework is instructions, not settings)
- No build steps (pure markdown)
- No dependencies (framework doesn't run, LLM reads it)
- Installation = copy 5 files

**Result:** 2-minute setup, works immediately, universal compatibility.

---

## Token Budget Analysis

### Framework Overhead (v2.0)

**Total:** 60K tokens
- FRAMEWORK.md: 12K (human-facing intro)
- LLM-INSTRUCTIONS.md: 18K (LLM operating system)
- PERFORMANCE-DIRECTIVES.md: 15K (quality rules)
- DISCOVERY-QUESTIONS.md: 8K (question templates)
- TEMPLATES.md: 7K (artifact structures)

**Typical Session Load:** 30-40K tokens
- Setup: FRAMEWORK + LLM-INSTRUCTIONS + TEMPLATES = 37K
- Development: project.md + PERFORMANCE + DISCOVERY = 35-40K
- Review: project.md + learnings = 20-25K

**Efficiency Gain:** v1.0 required 75-150K per session, v2.0 requires 30-40K
**Headroom:** 160-170K remaining of 200K context window

### Growing Project Context

**project.md Growth Pattern:**
- Week 1: 5K (initialization)
- Week 4: 15K (3-4 features)
- Week 8: 20K → compress → 12K
- Continues bounded under 20K via compression

**Compression Triggers:**
- >5 state snapshots inline (move to snapshots/)
- Architecture section duplicating code (summarize + reference)
- Completed features detailed (compress to one-line + learnings)

---

## Future Enhancements

### Post v2.0 Release

**Automated Metrics:**
- Track token savings (v1 vs v2 usage)
- Discovery question effectiveness (corrections needed)
- Time to first working code

**IDE Integration:**
- VS Code extension for framework commands
- Inline project.md viewer
- Learning entry quick-add

**Community Templates:**
- Domain-specific question sets (e-commerce, ML, DevOps)
- Language-specific directives (Rust, Go, Python expansions)
- Project type templates (SaaS, CLI, library)

---

## Context Compression Log

**This File:** examples/ctxforge-project.md
- Created: 2025-10-02
- Purpose: Example of framework applied to itself
- Token estimate: ~8K
- Demonstrates: All template sections in real use

---
