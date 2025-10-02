# ctxforge

> **Ultra-lightweight context discovery framework for LLM-assisted development**

[![npm version](https://badge.fury.io/js/ctxforge.svg)](https://www.npmjs.com/package/ctxforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Extract senior engineer-level code from any LLM through systematic questioning. **5 files. 60K tokens. Zero config.**

---

## What is ctxforge?

ctxforge is a context discovery framework that extracts implicit requirements from simple task descriptions through senior engineer-level questioning. Instead of writing detailed specs yourself, you describe user behavior and the framework guides LLMs to ask the right questions.

### The Problem

LLMs have vast knowledge but lack an internal mechanism to systematically discover:
- Edge cases you haven't considered
- Performance expectations unstated
- Accessibility requirements assumed
- Error scenarios unmentioned
- Integration constraints implicit

**Result:** LLMs make silent assumptions → wrong implementations → multiple rework cycles

### The Solution

ctxforge embeds senior engineer questioning patterns that extract complete context before any code is written:

```
You: "Users need to search products"
  ↓
LLM: [Asks 5-7 discovery questions]
  - How fast should results appear?
  - What if no matches found?
  - Should it work while typing?
  - What about typos?
  ↓
You: [Answer in 2-3 sentences each]
  ↓
LLM: [Shows technical inferences with confidence levels]
  [INFER-HIGH] Debounced input (300ms)
  [INFER-HIGH] Fuzzy matching for typos
  [INFER-MEDIUM] Client-side filtering (<1000 items)
  ↓
You: [Approve or correct]
  ↓
LLM: [Implements correctly first time]
```

**Time investment:** 5-10 minutes of questions vs 2 hours of spec writing
**Result:** Code works first implementation, not third attempt

---

## Installation

### Option 1: NPX (Recommended)
```bash
npx ctxforge init
```

### Option 2: Global Install
```bash
npm install -g ctxforge
ctxforge init
```

### Option 3: Project Install
```bash
npm install ctxforge
npx ctxforge init
```

**Installation time:** 2 minutes
**Files created:** 6 (5 framework + 1 project.md)
**Configuration required:** None
**Dependencies added:** None

---

## Quick Start

### Step 1: Initialize (2 minutes)

```bash
cd your-project
npx ctxforge init
```

**What happens:**
- Creates `docs/context/` directory
- Copies 5 framework files (60K tokens)
- Creates placeholder `project.md`

### Step 2: Start LLM with Framework

```bash
# Claude Code
claude-code docs/context/FRAMEWORK.md

# Or any LLM
"Read docs/context/FRAMEWORK.md and initialize my project"
```

**LLM asks 3 questions:**
1. Project name and one-sentence vision?
2. Tech stack?
3. What should we build first?

**LLM creates `project.md` automatically** with:
- Performance directives for your stack
- Architecture section (ready for features)
- Project learnings tracker
- Current state management

### Step 3: Develop Features

Just describe user behavior:

```bash
"Users need to login with email and password"
```

**LLM runs discovery protocol:**
1. Asks 5-7 behavioral questions
2. Shows technical inferences
3. Waits for approval
4. Implements with best practices
5. Creates state snapshot
6. Updates project.md

**You're done.** Framework handles context preservation, quality enforcement, and state management automatically.

---

## How It Works

### Core Philosophy

```
Human provides: WHAT (user behavior & experience)
LLM infers: HOW (technical implementation)
Checkpoint: LLM shows inferences, human corrects BEFORE building
```

### The Discovery Loop

**Traditional LLM development:**
```
Human: "Add search"
LLM: *makes 20 assumptions silently*
LLM: *writes code*
Human: "No, that's not what I wanted"
[Repeat 3-4 times]
```

**With ctxforge:**
```
Human: "Add search"
LLM: *asks 7 discovery questions*
Human: *answers briefly*
LLM: *shows 20 assumptions explicitly*
Human: *corrects 2, approves rest*
LLM: *writes code once, correctly*
```

### Framework Components (5 Files, 60K Tokens)

#### 1. FRAMEWORK.md (12K)
Human-readable introduction and quick reference
**Load when:** First time, showing to team

#### 2. LLM-INSTRUCTIONS.md (18K)
Complete protocol for LLM operation - discovery, implementation, compression
**Load when:** Every development session

#### 3. PERFORMANCE-DIRECTIVES.md (15K)
30 auto-apply quality rules (Big O, accessibility, security, etc.)
**Load when:** Implementation sessions

#### 4. DISCOVERY-QUESTIONS.md (8K)
Question templates for common scenarios (auth, CRUD, search, forms, etc.)
**Load when:** Feature discovery phase

#### 5. TEMPLATES.md (7K)
Structures for project.md, specs, snapshots
**Load when:** Setup, reference only

#### 6. project.md (Growing Document)
Your project's living context - vision, architecture, learnings, state
**Created by LLM during initialization**
**Grows:** ~5K per feature, compressed to stay under 20K

---

## What Makes ctxforge Different

### vs Traditional Specs
❌ **Traditional:** Write 2-page behavioral spec manually
✅ **ctxforge:** Answer 7 questions, LLM generates spec

### vs Generic Prompting
❌ **Generic:** "Make it fast, accessible, handle errors"
✅ **ctxforge:** Systematic discovery with confidence-scored inferences

### vs Heavy Frameworks
❌ **Heavy:** 50+ files, config hell, version conflicts
✅ **ctxforge:** 5 markdown files, zero config, universal compatibility

### vs Code Generation Tools
❌ **Gen Tools:** Generate code, hope it's right
✅ **ctxforge:** Discover requirements FIRST, then generate correctly

---

## Key Features

### 🎯 Context Discovery Protocol
Systematic questioning extracts implicit requirements before coding

### ⚡ Lightweight (60K Tokens)
81% reduction from v1.0 - efficient context usage

### 🔧 Zero Configuration
Copy 5 files, answer 3 questions, start coding

### 🌍 Universal Compatibility
Works with **any** LLM (Claude, GPT, Gemini, local models)

### 📊 Automatic Quality Enforcement
30 performance directives applied automatically (no discussion needed)

### 🔄 Context Compression
State snapshots preserve context across sessions (resume after months)

### 📝 Living Documentation
project.md grows with your codebase, always current

### 🧠 Learning System
Mistakes documented, never repeated (project-specific wisdom)

---

## Real-World Example

### Request
```
"Add user authentication"
```

### Discovery Questions (LLM asks automatically)
```
Q1: What credentials do users provide?
Q2: How long should sessions last?
Q3: What about password requirements?
Q4: Forgot password flow needed?
Q5: Failed login handling?
Q6: Screen reader compatibility?
Q7: Should work on mobile?
```

### Your Answers (2-3 sentences each)
```
A1: Email + password. Maybe Google OAuth later.
A2: Stay logged in for 7 days, with "remember me" option.
A3: Minimum 8 characters, no complexity rules.
A4: Yes, email reset link.
A5: Show error, don't lock account.
A6: Yes, needs keyboard navigation.
A7: Yes, responsive design.
```

### LLM Shows Inferences
```markdown
[INFER-HIGH] JWT tokens in httpOnly cookies (you said 7-day sessions)
[INFER-HIGH] Server-side password hashing with bcrypt
[INFER-HIGH] Email service integration for password reset
[INFER-MEDIUM] Rate limiting on login endpoint (prevent brute force)
[INFER-MEDIUM] OAuth prep but not implement yet (you said "maybe later")
[INFER-LOW] Password strength indicator in UI? (not specified)

Questions for confirmation:
Q: Should we save email for next visit (localStorage)?
Q: Backend exists or create mock API for now?
```

### You Approve
```
"Yes to localStorage, use mock API for now, add password strength indicator"
```

### LLM Implements
```
TASK-001: Auth state management + JWT handling (2h)
TASK-002: Login/register forms with validation (2h)
TASK-003: Password reset flow (1.5h)
TASK-004: OAuth preparation (hooks only) (1h)

✓ Implements with:
  - Debounced validation
  - Accessible form labels
  - Error boundary
  - Loading states
  - Keyboard navigation
  - Mobile responsive

✓ Creates state snapshot
✓ Updates project.md
✓ Ready for next feature
```

**Total time:** 10 minutes discovery + LLM implementation vs 2 hours writing spec + multiple implementation attempts

---

## Compatibility

### LLM Tools Supported
✅ Claude Code (Anthropic)
✅ Cursor (OpenAI)
✅ ChatGPT CLI
✅ Gemini CLI (Google)
✅ GitHub Copilot
✅ Any LLM with file reading capability

### Technology Stack
✅ Any language (JavaScript, Python, Rust, Go, Java, C#, etc.)
✅ Any framework (React, Vue, Django, Rails, Express, FastAPI, etc.)
✅ Any project type (web, mobile, backend, ML, CLI, etc.)

### Project Size
✅ New projects (initialize from scratch)
✅ Existing projects (minimal changes - add 5 files)
✅ Small teams (1-5 devs)
✅ Large projects (context compression scales)

---

## Commands

```bash
# Initialize framework in project
npx ctxforge init

# Validate framework setup
npx ctxforge validate

# Check context health
npx ctxforge health

# Show current state
npx ctxforge status

# Optimize context size
npx ctxforge optimize

# Show version
npx ctxforge version
```

---

## Token Efficiency

### Framework Overhead
**Total:** 60K tokens across 5 files
**Typical session load:** 30-40K tokens (1 LLM + 2-3 framework files)
**Remaining budget:** 160-170K of 200K context window

### Session Loading Strategy

**Setup session:**
FRAMEWORK.md + LLM-INSTRUCTIONS.md + TEMPLATES.md = **37K**

**Development session:**
project.md (10-15K) + PERFORMANCE-DIRECTIVES.md (15K) + DISCOVERY-QUESTIONS.md (8K) = **35-40K**

**Review session:**
project.md (10-15K) + current code files = **20-30K**

### Growing project.md
- Week 1: 5K (initialization)
- Week 4: 15K (3-4 features)
- Week 8: 20K → compress → 12K
- Stays bounded under 20K via state snapshots

---

## FAQ

**Q: Do I need to specify every detail upfront?**
A: No. Describe user behavior. LLM asks questions to discover the rest.

**Q: What if LLM makes wrong assumptions?**
A: That's the point of the checkpoint. Correct inferences before it codes.

**Q: How is this different from writing good prompts?**
A: Framework contains senior engineer question templates. Consistent expert-level discovery automatically.

**Q: Will this slow down development?**
A: 5-10 minutes of discovery saves hours of rework. Net faster.

**Q: Can I use with existing projects?**
A: Yes. Copy 5 files to docs/, answer 3 questions, continue coding.

**Q: Does it require changing my workflow?**
A: No. You still describe what to build. Framework makes LLM ask better questions.

**Q: What if my project gets huge?**
A: State snapshots compress context. Scales to any size.

**Q: Do I need to learn a new syntax?**
A: No. Natural language only. Framework handles structure.

**Q: What about team collaboration?**
A: project.md becomes shared context. All devs (human/AI) read same source of truth.

**Q: Is there a learning curve?**
A: 10 minutes to understand, 1 feature to master.

**Q: Does ctxforge send data externally?**
A: No. Everything runs locally. Zero network calls.

---

## Comparison: v1.0 → v2.0

| Metric | v1.0 | v2.0 | Improvement |
|--------|------|------|-------------|
| Files | 22 | 5 | 77% fewer |
| Total tokens | 313K | 60K | **81% reduction** |
| Install time | 30 min | 2 min | 93% faster |
| Install steps | 12 | 1 | 92% simpler |
| Session load | 75-150K | 30-40K | 60-73% lighter |
| Human effort | Write specs | Answer questions | **90% less work** |
| LLM automation | Manual | Auto-discovery | **Fully automated** |
| Compatibility | 5 LLMs documented | ANY LLM | **Universal** |

---

## Examples

See `examples/` directory:
- `ctxforge-project.md` - Framework applied to itself
- More examples coming soon

---

## Contributing

Issues and PRs welcome at [GitHub](https://github.com/vencolini/ctxforge)

---

## License

MIT © Ventsislav Petrov + Claude Sonnet 4.5

---

## Links

**NPM:** https://www.npmjs.com/package/ctxforge
**GitHub:** https://github.com/vencolini/ctxforge
**Issues:** https://github.com/vencolini/ctxforge/issues
**Documentation:** `docs/context/FRAMEWORK.md` (after init)

---

**Now go extract some senior engineer-level code.** 🚀
