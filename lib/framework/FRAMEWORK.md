# Context Discovery Framework v2.0

**Get senior engineer-level code from any LLM through systematic context extraction.**

---

## Install (2 minutes)

### Option 1: NPM (Recommended)
```bash
npx ctxforge init
```

### Option 2: Manual
```bash
# Copy 5 files to your project
mkdir -p docs/context
cp node_modules/ctxforge/lib/framework/*.md docs/context/

# Or download from GitHub
curl -L https://github.com/[your-repo]/ctxforge/archive/main.zip
```

### Option 3: Global Install
```bash
npm install -g ctxforge
ctxforge init
```

**That's it.** No config files. No setup scripts. No dependencies.

---

## Core Principle

```
You describe: WHAT users experience (behavioral)
LLM discovers: WHY and HOW (technical)
You approve: Corrections before any code
LLM builds: With senior engineer reasoning
```

**The magic:** Framework contains smart questions that extract implicit knowledge from LLMs.

---

## The Discovery Loop

```
Human: "Users need to search products"
   ↓
LLM: Asks 5-7 discovery questions
   - "How fast should results appear?"
   - "What if no matches found?"
   - "Should it work while typing?"
   - "Any filters needed?"
   - "What about typos?"
   ↓
Human: Answers in 2-3 sentences each
   ↓
LLM: Shows technical inferences
   [INFER-HIGH] Debounced input handler (you said "while typing")
   [INFER-HIGH] Fuzzy matching (you said "handle typos")
   [INFER-MEDIUM] Client-side filtering (you said "<100ms")
   ↓
Human: Approve or correct
   ↓
LLM: Implements + creates compressed state snapshot
```

**Time investment:** 5-10 minutes of questions vs 2 hours of spec writing

---

## Quick Start

### Step 1: Initialize (First time only)

```bash
# Start LLM with framework
claude-code docs/context/FRAMEWORK.md

# Or with any LLM
"Read docs/context/LLM-INSTRUCTIONS.md and initialize my project"
```

LLM asks 3 questions:
1. Project name and one-sentence vision?
2. Tech stack?
3. What should we build first?

LLM creates `project.md` automatically.

### Step 2: Develop Features

```bash
# Describe behavior in natural language
"Users need to login with email and password"
```

LLM runs discovery protocol:
- Asks 5-7 behavioral questions
- Shows technical inferences
- Waits for approval
- Implements with best practices
- Compresses state for next task

### Step 3: Continue Development

```bash
# LLM remembers everything through project.md
claude-code docs/context/project.md

# Or after a break
"Read project.md and continue where we left off"
```

Context preserved automatically via state snapshots.

---

## What Gets Created

After first session:

```
your-project/
├── docs/context/
│   ├── FRAMEWORK.md              (this file)
│   ├── LLM-INSTRUCTIONS.md       (how LLM operates)
│   ├── PERFORMANCE-DIRECTIVES.md (quality rules)
│   ├── DISCOVERY-QUESTIONS.md    (question templates)
│   ├── TEMPLATES.md              (artifact structures)
│   └── project.md                (✨ YOUR PROJECT CONTEXT)
└── src/
    └── [your code]
```

**project.md** is the living document that grows with your project.

---

## How It Works

### Traditional LLM Development
```
Human: "Add search feature"
LLM: *makes 20 assumptions silently*
LLM: *writes code*
Human: "No, that's not what I wanted"
[Repeat 3-4 times]
```

### With Context Discovery Framework
```
Human: "Add search feature"
LLM: *asks 7 discovery questions*
Human: *answers briefly*
LLM: *shows 20 assumptions explicitly with confidence levels*
Human: *corrects 2 assumptions, approves rest*
LLM: *writes code once, correctly*
```

**Key difference:** Checkpoint BEFORE coding, not after.

---

## Framework Files Explained

### For Humans

**FRAMEWORK.md** (this file)
Quick reference and installation guide.

**DISCOVERY-QUESTIONS.md**
See what questions LLM will ask for common scenarios.

### For LLMs

**LLM-INSTRUCTIONS.md**
Complete protocol for context discovery and task execution.

**PERFORMANCE-DIRECTIVES.md**
30 auto-apply quality rules (Big O, accessibility, security, etc.).

**TEMPLATES.md**
Structures for project.md, specs, and state snapshots.

### Created During Use

**project.md**
Your project's living context (vision, architecture, learnings, current state).

**snapshots/** (optional)
Compressed state between tasks for very large projects.

---

## Token Efficiency

**Framework overhead:** 60K tokens total across 5 files
**Typical session load:** 30-40K tokens
**Your context budget remaining:** 160K+ tokens

**Why it's efficient:**
- LLM loads 2-3 framework files per session (not all 5)
- project.md stays compressed via state snapshots
- No redundant documentation (framework auto-generates)

---

## Compatibility

### Works With
✅ Any LLM (Claude Code, Gemini, ChatGPT, local models)
✅ Any language (JavaScript, Python, Rust, Go, Java, etc.)
✅ Any framework (React, Vue, Django, Rails, etc.)
✅ Any project type (web, mobile, backend, ML, CLI, etc.)
✅ New or existing projects (minimal changes required)

### Requirements
- LLM that can read markdown files
- That's it

---

## Common Workflows

### Starting New Feature
```bash
# Just describe the behavior
"Users should be able to export data to CSV"

# LLM handles the rest:
# - Asks discovery questions
# - Shows technical inferences
# - Creates task breakdown
# - Implements step by step
# - Compresses state
```

### Continuing After Break
```bash
# Even after weeks/months
claude-code docs/context/project.md

# LLM loads:
# - Project vision
# - Architecture decisions
# - Performance directives
# - Learnings (past mistakes)
# - Current state
# - Next task

# Ready to continue immediately
```

### Switching LLMs
```bash
# Switch from Claude to Gemini mid-project
gemini-cli docs/context/project.md

# Works seamlessly (framework is LLM-agnostic)
```

### Onboarding New Developer
```bash
# Human or AI
"Read docs/context/project.md"

# Everything needed to contribute:
# - Why this project exists
# - How it's architected
# - What to avoid (learnings)
# - What we're building now
# - How to maintain quality
```

---

## FAQ

**Q: Do I need to specify every detail upfront?**
A: No. Describe user behavior. LLM asks questions to discover the rest.

**Q: What if LLM makes wrong assumptions?**
A: That's why there's a checkpoint. Correct before it codes.

**Q: How is this different from just prompting well?**
A: Framework contains senior engineer question templates. You get expert-level context extraction automatically.

**Q: Will this slow down development?**
A: 5-10 minutes of questions saves hours of rework. Net faster.

**Q: Can I use with existing projects?**
A: Yes. Copy 5 files to docs/, answer 3 questions, continue coding.

**Q: Does it require changing my workflow?**
A: No. You still describe what to build. Framework makes LLM ask better questions.

**Q: What if my project gets huge?**
A: State snapshots compress context. Framework scales to any size.

**Q: Do I need to learn a new syntax?**
A: No. Natural language only. Framework handles structure.

**Q: What about team collaboration?**
A: project.md becomes shared context. All devs (human/AI) read same source of truth.

**Q: Is there a learning curve?**
A: 10 minutes to understand, 1 feature to master.

---

## Next Steps

### First Time User
1. Run: `npx ctxforge init`
2. Read: `docs/context/LLM-INSTRUCTIONS.md` (optional, for curiosity)
3. Start LLM: `claude-code docs/context/FRAMEWORK.md`
4. Answer 3 initialization questions
5. Describe first feature
6. Watch the discovery loop in action

### Already Familiar
1. Load your project.md: `claude-code docs/context/project.md`
2. Describe next feature
3. Continue development

### Want to Understand Deeply
1. Read: `docs/context/LLM-INSTRUCTIONS.md` (how LLM operates)
2. Read: `docs/context/DISCOVERY-QUESTIONS.md` (question templates)
3. Read: `docs/context/PERFORMANCE-DIRECTIVES.md` (quality standards)

---

## Support

**Issues:** https://github.com/[your-repo]/ctxforge/issues
**Docs:** https://github.com/[your-repo]/ctxforge/blob/main/README.md
**NPM:** https://www.npmjs.com/package/ctxforge

---

## Version

**Framework:** v2.0
**Last Updated:** 2025-10-02
**Token Budget:** 60K total (81% reduction from v1.0)

---

## Philosophy

> "The best code is code that solves the right problem.
> The best way to find the right problem is to ask the right questions.
> This framework asks the right questions."

**Now go build something.** 🚀
