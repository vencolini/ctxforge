# Framework Quick Reload Guide

**Use this when the LLM isn't following the framework protocol.**

---

## Symptoms You're Not Using Framework

- LLM fixing bugs without asking discovery questions
- LLM implementing features without showing inferences first
- No "checkpoint" before coding
- No state snapshots being created
- Performance directives not being applied
- Feels like using regular LLM

---

## How to Reload Framework Mid-Session

**Copy-paste this to your LLM:**

```
Stop. Let's reload the framework context.

Read these files:
1. docs/context/LLM-INSTRUCTIONS.md
2. docs/context/project.md
3. docs/context/PERFORMANCE-DIRECTIVES.md

Then tell me:
- What protocol should you follow? (Feature Discovery / Bug-Fixing / Task Execution)
- What's the next step according to the framework?

Resume using the framework workflow.
```

---

## For Bug Fixing Specifically

**If you're fixing bugs and LLM isn't asking questions, say:**

```
You should be following the Bug-Fixing Protocol from LLM-INSTRUCTIONS.md.

Before fixing bugs, you need to ask 3-5 discovery questions:
1. Exact reproduction steps
2. Scope (always/intermittent, which browsers)
3. Recent changes (when did it start)
4. Impact (who's affected)
5. Related issues

Please reload the Bug-Fixing Protocol section and start over.
```

---

## For New Features

**If LLM is implementing without asking questions:**

```
You should be following the Feature Discovery Protocol from LLM-INSTRUCTIONS.md.

Steps:
1. Ask 5-7 discovery questions (from DISCOVERY-QUESTIONS.md templates)
2. Generate behavioral specification
3. Show technical inferences with confidence levels
4. CHECKPOINT - wait for my approval
5. Then implement

Please reload the Feature Discovery Protocol section and restart this feature.
```

---

## Starting Fresh Session (After Hours/Days)

**Always start with:**

```
Read docs/context/project.md and continue where we left off
```

**LLM should:**
- Load project.md + PERFORMANCE-DIRECTIVES.md
- Tell you what was last completed
- Ask what to work on next
- Follow framework protocol for whatever you say

---

## When Framework Is Working Correctly

You should see:

### For New Features:
```
LLM: "Let me ask 5-7 discovery questions about [feature]..."
[Questions about edge cases, performance, accessibility]

LLM: "Based on your answers, here are my technical inferences:"
[INFER-HIGH] ...
[INFER-MEDIUM] ...
[INFER-LOW] ...

LLM: "Do these look correct before I implement?"
```

### For Bug Fixes:
```
LLM: "Let me discover the bug details..."
1. What are exact steps to reproduce?
2. Does this happen always or intermittently?
3. When did this start happening?
[etc.]

LLM: "## Bug Analysis"
**Root cause hypothesis:** ...
**Confidence:** HIGH/MEDIUM/LOW

LLM: "Shall I investigate [area] to confirm?"
```

### After Tasks:
```
LLM: "✓ Task complete
✓ Self-review passed
✓ State snapshot created
✓ project.md updated

Files modified:
- [file]: [summary]

Ready for next task?"
```

---

## Emergency: Framework Completely Lost

**If LLM has completely forgotten framework exists:**

```
STOP. You are using the Context Discovery Framework.

Read these files IN ORDER:
1. docs/context/FRAMEWORK.md - understand what this framework is
2. docs/context/LLM-INSTRUCTIONS.md - your complete operating instructions
3. docs/context/project.md - current project state
4. docs/context/PERFORMANCE-DIRECTIVES.md - quality rules to auto-apply

After reading, confirm:
- You understand the framework philosophy
- You know which protocol to follow (Feature Discovery / Bug-Fixing)
- You're ready to restart with proper workflow

Then ask: "What should we work on?" and follow the correct protocol.
```

---

## Prevention: Start Every Session Correctly

**Right way:**
```bash
# New session after break
claude-code docs/context/project.md

# Or
"Read docs/context/project.md and continue where we left off"
```

**Wrong way (loses framework):**
```bash
# Just continuing chat without reloading context
"Let's continue"  ❌

# Starting without any context
"Fix this bug..." ❌
```

---

## Summary

**Framework = Systematic questioning BEFORE coding**

If LLM is coding without:
1. Discovery questions
2. Technical inferences
3. Approval checkpoint

Then framework is not loaded. Use this guide to reload it.

---
