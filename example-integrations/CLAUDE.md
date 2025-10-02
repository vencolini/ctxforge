# ctxforge for Claude / Claude Code

**Quick integration guide for Anthropic Claude models**

---

## Installation

Already have ctxforge installed in your project? Skip to [Usage](#usage).

```bash
cd your-project
npx ctxforge init
```

This creates `docs/context/` with the framework files.

---

## Usage

### Starting New Session

**In Claude Code (Desktop/CLI):**
```bash
claude-code docs/context/CORE.md
```

**In Claude.ai web chat:**
```
Read the file docs/context/CORE.md and ask what I want to work on
```

**In project with custom instructions:**

Add to your `.claude/instructions.md` or custom instructions:
```markdown
# Project Instructions

Before we start, read docs/context/CORE.md and ask what I want to work on.

This loads the ctxforge framework which will guide our development through
systematic context discovery.
```

---

## What Happens Next

1. Claude loads CORE.md (lightweight - 5K tokens)
2. Asks: "What should we work on?"
3. You answer: "Add user registration" (or whatever task)
4. Claude detects intent → loads appropriate protocol
5. Follows systematic discovery workflow

---

## Integration Examples

### Claude Code Custom Instructions

File: `.claude/instructions.md`
```markdown
# Development Instructions

## Framework
Load ctxforge framework at session start:
- Read docs/context/CORE.md
- Ask what we're working on
- Auto-detect intent and load relevant protocol

## Project Context
- Read docs/context/project.md for current state
- Check docs/context/PERFORMANCE-DIRECTIVES.md for quality rules

## Workflow
Follow the ctxforge discovery protocol for all tasks.
```

### Claude API Integration

```javascript
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Load framework
const coreMd = fs.readFileSync('docs/context/CORE.md', 'utf-8');
const projectMd = fs.readFileSync('docs/context/project.md', 'utf-8');

const response = await claude.messages.create({
  model: 'claude-sonnet-4-5',
  max_tokens: 4096,
  messages: [
    {
      role: 'user',
      content: `${coreMd}\n\n${projectMd}\n\nNow ask me what we should work on and follow the framework protocol.`
    }
  ]
});
```

---

## Claude-Specific Optimizations

The framework is optimized for Claude's strengths:

### Discovery Questions
- Claude excels at systematic questioning
- Framework uses 5-7 question discovery approach
- Claude's context window (200K) easily handles full framework

### Technical Inferences
- Claude naturally shows reasoning with confidence levels
- Framework's INFER-HIGH/MEDIUM/LOW aligns with Claude's style

### Protocol Execution
- Claude follows structured protocols extremely well
- Framework's phase-based approach (discovery → inference → implementation) matches Claude's strengths

---

## Recommended Claude Models

| Model | Best For | Context Window |
|-------|----------|----------------|
| claude-sonnet-4-5 | General development | 200K tokens |
| claude-opus-4 | Complex architecture | 200K tokens |
| claude-haiku-4 | Quick tasks/fixes | 200K tokens |

All models work great with ctxforge!

---

## Tips for Claude

### 1. Use Artifacts
Claude can present code in artifacts. Ask:
```
"Follow the framework and present code in artifacts"
```

### 2. Thinking Tags
Claude uses `<thinking>` tags. Framework prompts encourage this:
```
"Show your reasoning in thinking tags before proposing solution"
```

### 3. Extended Conversations
Claude's 200K context means you can:
- Work on multiple features in one session
- Keep full project.md in context
- Load multiple protocols if needed

### 4. Tool Use
If using Claude with tools, framework integrates seamlessly:
```
Tools available: file_read, file_write, bash
Framework loaded: docs/context/CORE.md

Proceed with systematic development.
```

---

## Common Workflows

### Bug Fixing
```
You: "The login form crashes on submit"

Claude:
✓ Intent detected: BUG_FIX
✓ Loading: protocols/BUG-FIXING.md

Let me discover the bug details:
1. What are exact steps to reproduce?
2. Does this happen always or intermittently?
...
```

### New Feature
```
You: "Add password reset functionality"

Claude:
✓ Intent detected: NEW_FEATURE
✓ Loading: protocols/FEATURE-DEVELOPMENT.md

Let me discover the requirements:
1. How should users request password reset?
2. Email link or security questions?
...
```

### Code Review
```
You: "Review this authentication code"

Claude:
✓ Intent detected: CODE_REVIEW
✓ Loading: protocols/CODE-REVIEW.md

I'll review against:
- PERFORMANCE-DIRECTIVES.md
- Security best practices
- Project learnings
...
```

---

## Troubleshooting

### Claude Not Following Framework
```
"Reload docs/context/CORE.md and resume with proper protocol"
```

### Framework Lost Mid-Session
```
"Read docs/context/QUICK-RELOAD.md for recovery instructions"
```

### Need Different Protocol
```
"Stop current workflow, reload CORE.md, and detect new intent for: [task]"
```

---

## Example Session Start

**You:**
```
Read docs/context/CORE.md and ask what we should work on
```

**Claude:**
```
✓ Framework loaded: ctxforge v3.0
✓ Protocol system: Auto-loading enabled
✓ Project context: [reads project.md]

What should we work on?

I can help with:
- Building new features
- Fixing bugs
- Refactoring code
- Reviewing code quality
- Writing tests
- Investigating issues
- And more...

Just describe what you need and I'll load the appropriate protocol.
```

**You:**
```
Add a dark mode toggle to the settings page
```

**Claude:**
```
✓ Intent detected: NEW_FEATURE
✓ Loading: protocols/FEATURE-DEVELOPMENT.md

Great! Let me discover the requirements for the dark mode feature.

I'll ask 5-7 questions to understand what to build:

1. How should the dark mode toggle work?
   - Switch/toggle button?
   - Dropdown with light/dark/auto options?
   - Something else?

2. Should the preference persist?
   - Remember across sessions?
   - Sync across devices?

...
```

---

## Performance Notes

**Token usage with Claude:**
- CORE.md: ~5K tokens
- Protocol (average): ~4K tokens
- project.md: ~5-10K tokens
- Total overhead: ~14-19K tokens

**Remaining budget:** 181-186K tokens for actual development

**Result:** Can work on multiple features in single session!

---

## Learn More

- Framework docs: `docs/context/FRAMEWORK.md`
- All protocols: `docs/context/protocols/`
- Quick reload: `docs/context/QUICK-RELOAD.md`

---

**Ready to start? Run:**
```bash
claude-code docs/context/CORE.md
```

Or in Claude.ai:
```
Read docs/context/CORE.md and ask what I want to work on
```
