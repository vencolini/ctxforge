# Quick Start Guide

Get started with the Context Engineering Framework in 5 steps (30 minutes).

## Step 1: Setup Framework (5 min)

### Create Directory Structure

```bash
# In your project root
mkdir -p docs/context/behavioral-specs
mkdir -p docs/context/state-snapshots
mkdir -p docs/templates

# Copy framework files
cp README.md docs/context/
cp QUICK-START.md docs/context/
cp context-engineering-guide.md docs/context/
cp llm-instructions.md docs/context/
cp -r performance-directives/ docs/context/

# Copy templates
cp behavioral-spec-template.md docs/templates/
cp task-execution-protocol.md docs/templates/
cp project-learnings-template.md docs/templates/
cp state-snapshot-template.md docs/templates/

# Create empty project files
touch docs/context/claude.md
touch docs/context/project-learnings.md
```

## Step 2: Initialize claude.md (10 min)

Run with your LLM CLI:

```bash
# Claude Code
claude-code --file docs/context/context-engineering-guide.md

# Gemini CLI
gemini-cli --context docs/context/context-engineering-guide.md

# Or manually with prompts:
# "Read context-engineering-guide.md and help me initialize claude.md for my project"
```

**You'll provide:**
- Project name and vision (1 sentence)
- Technology stack (React, Python, etc.)
- Environment details (Node version, browsers, etc.)

**LLM will generate:**
- Complete claude.md with performance directives
- Project structure template
- Initial architecture section

## Step 3: Create First Feature Spec (10 min)

Describe your first feature in natural language:

```bash
# Example: Create a file with your feature description
cat > feature-description.txt << 'EOF'
I need a login feature. Users enter email and password, 
click login button, and if credentials are correct they 
see the dashboard. If wrong, show error message.
EOF

# LLM processes this
claude-code --file docs/context/context-engineering-guide.md \
             --input feature-description.txt
```

**LLM will:**
1. Convert to behavioral specification (Gherkin scenarios)
2. Generate technical inferences
3. Ask for your approval
4. Create task breakdown
5. Update CONTEXT.md

## Step 4: Execute First Task (5 min)

Once you approve the context:

```bash
# LLM executes first atomic task
claude-code --file docs/context/claude.md

# LLM will:
# 1. Load context and directives
# 2. Implement task with best practices
# 3. Self-review code
# 4. Compress state for next task
# 5. Update CONTEXT.md
```

## Step 5: Verify & Continue

**Check the output:**
- ✅ Code follows performance directives?
- ✅ Behavioral requirement met?
- ✅ State snapshot created?

**Continue to next task:**
```bash
# LLM reads updated claude.md and continues
claude-code --file docs/context/claude.md
```

---

## Example: Complete First Session

### 1. Start Context Engineering

```bash
$ claude-code

> I'd like to use the context engineering framework. 
> Please read docs/context/context-engineering-guide.md 
> and help me initialize my project.
```

### 2. LLM Asks Questions

```
LLM: I'll help you initialize the framework. Let me ask:

1. Project name and one-sentence vision?
2. Technology stack (language/framework)?
3. Environment (Node version, browser targets, etc.)?
4. Any specific dependencies or constraints?
```

### 3. You Provide Basic Info

```
You: 
- Name: TaskMaster
- Vision: Simple todo app for personal productivity
- Stack: React 18, TypeScript, Tailwind
- Environment: Node 20, Chrome 120+, no IE
- No backend yet, client-side only
```

### 4. LLM Creates claude.md

```
LLM: I've created docs/context/claude.md with:
- Performance directives for React/TypeScript
- Architecture section (ready for your features)
- Big O complexity requirements
- Accessibility standards (WCAG 2.1 AA)
- Code organization patterns

Ready to add your first feature. What should we build first?
```

### 5. You Describe First Feature

```
You: Users need to add tasks. They type in an input field, 
press Enter or click Add button, and the task appears in 
a list below. Each task has a checkbox to mark it complete.
```

### 6. LLM Engineers Context

```
LLM: Let me create the behavioral specification...

SCENARIO: User adds task
  GIVEN user is on the app
  WHEN user types "Buy milk" and presses Enter
  THEN task appears in list below
  AND input field clears
  AND user can immediately add another task

SCENARIO: User completes task
  WHEN user clicks checkbox next to task
  THEN task shows as completed (visual change)
  AND task remains in list

My technical inferences:
[INFER-HIGH] Client-side state with useState (you said no backend)
[INFER-HIGH] Controlled input component
[INFER-MEDIUM] Array of tasks: {id, text, completed}
[INFER-MEDIUM] Generate unique IDs (crypto.randomUUID)
[INFER-LOW] Save to localStorage for persistence?

Questions:
- Should completed tasks stay in list or hide?
- Should task persist after browser refresh?
- Any task character limit?

Approve these inferences? Correct any? Answer questions?
```

### 7. You Approve with Adjustments

```
You: adjust:
- completed tasks stay visible (just styled differently)
- yes to localStorage for persistence
- 200 character limit per task
```

### 8. LLM Creates Task Breakdown

```
LLM: Creating task breakdown...

TASK-001: Task State Management
- Create task data structure and state hooks
- localStorage persistence
- Add/complete/remove operations

TASK-002: Task Input Component
- Input field with Enter/button submit
- 200 char limit with counter
- Clear on submit

TASK-003: Task List Display
- Render task list
- Checkbox interaction
- Completed styling

Updated claude.md. Ready to execute Task-001? (yes/review-first)
```

### 9. Execute First Task

```
You: yes

LLM: Executing TASK-001...

[Implements code with performance directives applied]

Self-review:
✅ O(1) add operation
✅ localStorage with error handling
✅ Cleanup on unmount
✅ TypeScript strict mode passing

Created state snapshot: docs/context/state-snapshots/snapshot-after-task-001.md

Task-001 complete. Ready for Task-002?
```

### 10. Continue Autonomous Execution

From here, LLM can continue task-by-task, maintaining context through state snapshots.

---

## Common First-Time Questions

**Q: Do I need to specify every detail upfront?**  
A: No! Describe user behavior. LLM infers technical details and shows you for approval.

**Q: What if LLM makes wrong inference?**  
A: That's the point of the checkpoint. Correct before it codes.

**Q: Can I use this with multiple LLMs?**  
A: Yes! claude.md is LLM-agnostic. Any LLM reads the same context.

**Q: How do I switch LLMs mid-project?**  
A: New LLM reads claude.md + latest state snapshot and continues seamlessly.

**Q: What if I take a break for weeks?**  
A: When you return, LLM reads claude.md to load all project context.

**Q: How big can projects get?**  
A: State snapshots compress context. Framework scales to large projects.

---

## CLI Tool Specific Commands

### Claude Code

```bash
# Initialize framework
claude-code docs/context/context-engineering-guide.md

# Execute task
claude-code docs/context/claude.md

# Continue from snapshot
claude-code docs/context/state-snapshots/snapshot-after-task-005.md
```

### Gemini CLI

```bash
# Initialize framework
gemini-cli --context docs/context/context-engineering-guide.md

# Execute task  
gemini-cli --context docs/context/claude.md

# Multi-file context
gemini-cli --context docs/context/claude.md \
           --context docs/context/project-learnings.md
```

### Generic LLM

```bash
# In any chat interface:
"Please read the file docs/context/llm-instructions.md 
and follow the framework described there."
```

---

## Next Steps

After your first feature is working:

1. **Add more features:** Repeat context engineering process
2. **Document learnings:** When bugs found, add to project-learnings.md
3. **Refine directives:** Add project-specific performance rules
4. **Maintain context:** Update claude.md as architecture evolves

---

## Troubleshooting

**Problem:** LLM not following framework  
**Solution:** Explicitly ask it to read `llm-instructions.md` first

**Problem:** Context getting too large  
**Solution:** Use state snapshots, reference interfaces not full code

**Problem:** LLM making wrong assumptions  
**Solution:** Stop at checkpoint, correct inference before it codes

**Problem:** Quality issues in code  
**Solution:** Check performance-directives/ modules are being applied

**Problem:** Repeated mistakes  
**Solution:** Document in project-learnings.md, LLM will check before each task

---

## Success Checklist

After your first session, you should have:

- ✅ `docs/context/claude.md` initialized with your project
- ✅ First behavioral spec in `docs/context/behavioral-specs/`
- ✅ At least one task completed with working code
- ✅ First state snapshot in `docs/context/state-snapshots/`
- ✅ Understanding of the two-phase process

**You're ready!** Continue adding features using the same process.

---

**Need Help?** Read the detailed `context-engineering-guide.md` for step-by-step walkthrough.
