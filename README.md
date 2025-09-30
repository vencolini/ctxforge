# Universal Context Engineering Framework for LLM-Assisted Development

## Overview

This framework enables effective collaboration between humans and LLM coding assistants (Claude Code, Gemini CLI, ChatGPT, etc.) by establishing a structured context engineering process. It solves the core problems of LLM-assisted development:

- **Asymmetric bandwidth:** LLMs generate faster than humans can verify
- **Silent drift:** Assumptions compound into wrong implementations
- **Context loss:** Token limits and conversation breaks lose project state
- **Quality inconsistency:** Missing best practices and repeated mistakes

## Core Philosophy

```
Human provides: WHAT (user behavior & experience)
LLM infers: HOW (technical implementation)
Checkpoint: LLM shows inferences, human corrects before building
```

## Framework Components

### Essential Files

1. **README.md** (this file) - Framework overview
2. **QUICK-START.md** - Fast setup guide
3. **context-engineering-guide.md** - Step-by-step context creation process
4. **llm-instructions.md** - Instructions for LLM to follow
5. **performance-directives.md** - Universal code quality principles

### Project Files (Templates)

6. **claude.md** - Main project context file (living document)
7. **behavioral-spec-template.md** - Template for feature specifications
8. **task-execution-protocol.md** - How to execute atomic tasks
9. **project-learnings-template.md** - Template for documenting pitfalls
10. **state-snapshot-template.md** - Context compression between tasks

## Two-Phase Development Process

### Phase 1: Context Engineering (One-Time Setup Per Feature)
```
Human ─┐
       ├─> Behavioral Requirements (compressed)
LLM  ──┘

       ┌─> Technical Inferences (explicit)
LLM  ──┤
       └─> Awaiting approval

Human ─┐
       ├─> Approve / Correct
       └─> Task Breakdown
```

**Output:** Executable specification in claude.md

### Phase 2: Autonomous Execution (Delegated to LLM)
```
For each atomic task:
  1. Load context (claude.md + state snapshot)
  2. Apply performance directives (automatic)
  3. Check project learnings (avoid pitfalls)
  4. Implement with self-review
  5. Compress state for next task
```

**Output:** Working code with maintained context

## Installation

```bash
# Install globally
npm install -g ctxforge

# Or use with npx (no installation required)
npx ctxforge init
```

## Quick Start

```bash
# 1. Navigate to your project
cd your-project

# 2. Initialize ctxforge
npx ctxforge init

# 3. Start with your LLM
claude-code --file docs/context/llm-instructions.md
# or
gemini-cli --context docs/context/llm-instructions.md
```

### For Humans

```bash
# 1. Copy framework to your project
cp -r context-engineering-framework/ your-project/docs/

# 2. Follow QUICK-START.md to initialize
cd your-project/docs
cat QUICK-START.md

# 3. Start context engineering with your LLM
claude-code --file context-engineering-guide.md
# or
gemini-cli --context context-engineering-guide.md
```

### For LLMs

```bash
# LLM reads this on initialization:
cat llm-instructions.md

# LLM follows guided process:
1. Read context-engineering-guide.md
2. Help human create behavioral spec
3. Generate technical inferences
4. Create claude.md for project
5. Execute tasks following task-execution-protocol.md
```

## Directory Structure

```
your-project/
├── docs/
│   ├── context/
│   │   ├── README.md                           # This file
│   │   ├── QUICK-START.md                      # Fast setup
│   │   ├── context-engineering-guide.md        # Step-by-step guide
│   │   ├── llm-instructions.md                 # For LLM to read
│   │   ├── performance-directives.md           # Code quality rules
│   │   ├── claude.md                           # Main project context
│   │   ├── behavioral-specs/
│   │   │   └── [feature-name].md              # Per-feature specs
│   │   ├── state-snapshots/
│   │   │   └── snapshot-after-task-XXX.md     # Context compression
│   │   └── project-learnings.md               # Technical pitfalls
│   └── templates/
│       ├── behavioral-spec-template.md
│       ├── task-execution-protocol.md
│       ├── project-learnings-template.md
│       └── state-snapshot-template.md
└── src/
    └── [your code]
```

## Framework Principles

### 1. Behavior-First Specification
✅ Describe user experience in natural language  
✅ Use Gherkin-style scenarios (Given/When/Then)  
❌ Don't specify implementation details  
❌ Don't write low-level pseudo-code

### 2. Explicit Technical Inferences
✅ LLM shows all technical assumptions before coding  
✅ Confidence levels attached (High/Medium/Low)  
✅ Reasoning provided for each inference  
❌ LLM never codes without approval

### 3. Performance by Default
✅ Big O complexity considered automatically  
✅ Framework/language best practices applied  
✅ Measure first, optimize only if needed  
❌ No premature optimization discussions

### 4. Atomic Task Execution
✅ Tasks are logical units (one feature piece)  
✅ Each task stands alone with minimal context  
✅ State compressed between tasks  
❌ No token-budget artificial constraints

### 5. Project-Specific Learning
✅ Document technical pitfalls discovered  
✅ Prevent repeated mistakes  
✅ Build project-specific wisdom  
❌ Don't document product/feature changes

## Benefits

### For Humans
- **Less cognitive load:** Describe behavior, not implementation
- **Faster verification:** Check inferences, not code
- **Maintained context:** Never lose project state
- **Improved quality:** Best practices enforced automatically
- **Scalable collaboration:** Framework grows with project

### For LLMs
- **Clear instructions:** Explicit framework to follow
- **Reduced hallucination:** Inferences verified before coding
- **Context efficiency:** Compression prevents token overflow
- **Consistent quality:** Directives eliminate guesswork
- **Continuous improvement:** Learn from project-specific pitfalls

### For Teams
- **Onboarding accelerated:** New devs read claude.md
- **Knowledge preserved:** Project learnings documented
- **Consistency enforced:** All LLM work follows framework
- **Quality improves:** Pitfalls prevented across team
- **Handoffs smooth:** State snapshots enable continuation

## Compatibility

### LLM Tools Supported
- ✅ Claude Code (Anthropic)
- ✅ Gemini CLI (Google)
- ✅ ChatGPT CLI (OpenAI)
- ✅ Claude Web (with file uploads)
- ✅ Any LLM with file/context reading capability

### Technology Agnostic
- ✅ Any programming language
- ✅ Any framework (React, Vue, Django, Rails, etc.)
- ✅ Any project type (web, mobile, backend, ML, etc.)
- ✅ Any team size (solo to enterprise)

## Getting Started

1. **Read:** QUICK-START.md (5 minutes)
2. **Initialize:** Follow context-engineering-guide.md (30 minutes)
3. **Execute:** Use task-execution-protocol.md for development
4. **Maintain:** Update claude.md as project evolves

## Example Workflows

### Starting New Feature
```bash
# 1. Human describes behavior
echo "Users need to search products by typing" > feature-idea.txt

# 2. LLM engineers context
claude-code --file context-engineering-guide.md --input feature-idea.txt

# 3. LLM generates behavioral spec + inferences
# 4. Human reviews and approves
# 5. LLM updates claude.md with task breakdown
# 6. LLM executes tasks autonomously
```

### Continuing After Break
```bash
# 1. LLM reads current state
claude-code --file docs/context/claude.md

# 2. LLM checks last state snapshot
claude-code --file docs/context/state-snapshots/snapshot-after-task-005.md

# 3. LLM continues from where it left off (context preserved)
```

### Onboarding New Developer (Human or LLM)
```bash
# Everything needed is in claude.md:
# - Project vision
# - Architecture overview  
# - Performance directives
# - Current state
# - Project learnings (pitfalls to avoid)

cat docs/context/claude.md
```

## Support & Contribution

This is a living framework. Improve it based on your experience:

- Add language-specific performance directives
- Refine templates for your domain
- Document framework improvements as meta-learnings
- Share successful patterns

## Version

**Framework Version:** 1.0  
**Last Updated:** 2025-01-15  
**Compatibility:** Universal (any LLM, any project)

## License

Use freely. Adapt to your needs. Share improvements.

---

**Next Steps:** Read `QUICK-START.md` to initialize this framework for your project.
