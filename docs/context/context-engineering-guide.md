# Context Engineering Guide

Complete step-by-step guide for creating effective context for LLM-assisted development.

---

## Overview: The Two-Phase System

```
PHASE 1: CONTEXT ENGINEERING (Human + LLM Collaboration)
└─> Creates executable specification (claude.md)

PHASE 2: AUTONOMOUS EXECUTION (LLM implements from spec)
└─> Produces working code with maintained context
```

---

# PHASE 1: Context Engineering

## Step 1: Project Initialization

### 1.1 Gather Basic Information

**LLM should ask human:**

```markdown
1. **Project Name:** What is this project called?

2. **Project Vision:** One-sentence description of what this project does and who it's for.
   Example: "A task management app for freelancers to track billable hours"

3. **Technology Stack:**
   - Programming language(s)
   - Framework(s) (if any)
   - Major libraries

4. **Environment:**
   - Runtime version (Node 20, Python 3.11, etc.)
   - Browser targets (if web app)
   - Mobile targets (if mobile app)
   - Deployment platform

5. **Constraints:**
   - What can't you use? (certain libraries, patterns, etc.)
   - What must you use? (company standards, etc.)
   - Performance requirements (if any specific ones)
```

### 1.2 Initialize claude.md

**LLM creates the base claude.md file:**

```markdown
# Project: [Project Name]

## Meta Information
- **Created:** [Date]
- **Last Updated:** [Date]
- **Framework/Stack:** [From answers above]
- **LLM Coder:** [Which LLM is being used]
- **Context Engineering Version:** 1.0

## 🎯 Project Vision
[One-sentence vision from human]

## 🏗️ Performance & Code Quality Directives

[Copy from performance-directives/README.md and relevant modules, customize for stack]

## 📐 Architecture Overview

### Current System Structure
```
[To be filled as features are added]
```

### Data Flow Patterns
[To be filled as patterns emerge]

### State Management Approach
[To be determined/specified]

## 🔧 Development Context

### Environment
[From initialization answers]

### Project Structure
[Standard structure for the tech stack]

### Dependencies
[Initially empty, will grow]

### Naming Conventions
[Standard conventions for the language/framework]

## 🎭 Current Feature: [None yet]

[Will be populated when first feature is added]

## 📋 Task Breakdown

[Will be populated when features are added]

## 🧠 Project Learnings

[Will grow as technical issues are discovered]

## 📊 Current State Snapshot

### Completed Features
[Empty initially]

### In Progress
[Empty initially]

### Known Issues
[Empty initially]

## 🔍 Context Compression Log

[Will be populated as tasks complete]
```

**LLM confirms with human:** "I've created the initial claude.md. Should we add your first feature?"

---

## Step 2: Feature Context Engineering

### 2.1 Gather Behavioral Description

**LLM asks:** "Describe what users should be able to do with this feature. Focus on behavior, not implementation."

**Human provides compressed description:**
```
Example: "Users need to search products. They type in a search box, 
and the product list below filters in real-time to show matching items."
```

### 2.2 LLM Extracts Behavioral Requirements

**LLM creates structured behavioral spec:**

```markdown
## BEHAVIORAL SPECIFICATION: [Feature Name]

### USER SCENARIOS (Gherkin-style)

**SCENARIO 1: [Main Happy Path]**
```gherkin
GIVEN [initial state]
WHEN [user action]
THEN [expected result]
AND [additional result]
```

**SCENARIO 2: [Edge Case or Alternative Path]**
```gherkin
GIVEN [different initial state]
WHEN [user action]
THEN [expected handling]
```

**SCENARIO 3: [Error Case]**
```gherkin
GIVEN [condition that causes error]
WHEN [user action]
THEN [error handling behavior]
```

### INTERACTION DETAILS

**[Component/Area] Experience:**
- [Describe visual/interactive behavior]
- [Focus on what user sees/feels]
- [Accessibility requirements]
- [Performance perception ("feels instant", etc.)]

### SUCCESS CRITERIA (Testable)
✅ [Specific measurable outcome]
✅ [Another measurable outcome]

❌ FAILURE CONDITIONS
- If [condition] → FAILED
- If [condition] → FAILED
```

**LLM shows this to human:** "Here's my understanding of the feature. Is this correct?"

### 2.3 LLM Generates Technical Inferences

**After behavioral spec is approved, LLM shows technical interpretation:**

```markdown
## TECHNICAL INFERENCES (Awaiting Approval)

### INFERENCE 1: [Technical Decision]
**Confidence:** High / Medium / Low
**Reasoning:** [Why this makes sense given behavioral spec]
**Alternative:** [What else could work]
**Impacts:** [What this affects]

[INFER-HIGH] Example: Client-side filtering
**Reasoning:** You said "real-time" and have <10K items, so no backend needed
**Alternative:** Could use backend API if data grows
**Impacts:** Need to load all data upfront

### INFERENCE 2: [Another Decision]
[Same structure...]

### QUESTIONS BEFORE PROCEEDING

❓ [Question about ambiguous behavior]
❓ [Question about technical approach]
❓ [Question about edge case]

⚠️ CHECKPOINT: Please review inferences and answer questions
```

**Human responds with:**
- "Approved" (if all correct)
- "Adjust: [specific corrections]" (if changes needed)
- Answers to questions

### 2.4 LLM Creates Task Breakdown

**After inferences approved, LLM decomposes into atomic tasks:**

```markdown
## TASK BREAKDOWN FOR: [Feature Name]

### Atomicity Principle
Each task must be:
- A single logical unit (one testable piece)
- Implementable with minimal context from previous tasks
- Small enough to complete in one focused session
- Large enough to deliver user-facing value

---

### TASK-001: [Descriptive Name]

**Behavioral Goal:** [What user can do after this task]

**Technical Scope:**
- [Component/function to build]
- [Another component/function]

**Dependencies:**
- [Previous task if any]
- [External dependency if any]

**Completion Criteria:**
- [ ] [Specific testable outcome]
- [ ] [Another testable outcome]
- [ ] [Performance requirement if applicable]

**Estimated Complexity:** Simple / Medium / Complex

**Context Handoff to Next Task:**
[What minimal info next task needs]

---

### TASK-002: [Next Task Name]
[Same structure...]

---

## EXECUTION ORDER
Task-001 → Task-002 → Task-003 → [etc.]

## PARALLEL OPPORTUNITIES
[Note if any tasks can be done in parallel]
```

**LLM updates claude.md** with:
- Feature behavioral spec in "Current Feature" section
- Task breakdown in "Task Breakdown" section
- Updated "Current State" showing feature in progress

**LLM confirms:** "Context engineering complete. Ready to execute Task-001?"

---

# PHASE 2: Autonomous Task Execution

## Step 3: Task Execution Loop

### 3.1 Pre-Implementation Checklist

**For each task, LLM loads context:**

```markdown
## EXECUTING: TASK-XXX: [Name]

### Context Loading Checklist
- [ ] Read claude.md "Performance Directives" section
- [ ] Read "Current Feature" behavioral spec
- [ ] Check "Project Learnings" for relevant pitfalls
- [ ] Load previous task's state snapshot (if exists)
- [ ] Review this task's completion criteria

### Context Loaded Successfully
✅ Performance directives understood
✅ Behavioral requirements clear
✅ Known pitfalls identified: [List relevant PL-XXX numbers]
✅ Dependencies available: [List interfaces from previous tasks]

### Pre-Implementation Verification

**Behavioral Goal:**
[Restate in LLM's own words]

**Technical Approach:**
I will implement using:
1. [Specific technique/pattern] because [reasoning]
2. [Another technique] because [reasoning]

**Performance Considerations:**
- [Algorithm/operation]: O([complexity]) - [justification]
- [Optimization applied]: [Which directive from claude.md]

**Avoiding Known Pitfalls:**
- PL-XXX: [How I'll avoid this specific issue]
- PL-YYY: [How I'll avoid this other issue]

**Success Indicators:**
I'll know this works when:
- [Testable outcome 1]
- [Testable outcome 2]

⚠️ CHECKPOINT: Confirm approach before implementation (optional)
```

### 3.2 Implementation

**LLM implements with best practices:**

```typescript
// Example implementation with inline reasoning

/**
 * [Component/Function Name]
 * 
 * Implements: TASK-XXX [Name]
 * Behavioral Goal: [What user can do]
 * Performance: O([complexity]) for [operation]
 */

// [Clean, well-structured code following all directives]

// Example annotations:
// Applying PD-001: Memoizing expensive computation
const memoizedResult = useMemo(() => {
  // O(n log n) sorting - acceptable for <10K items
  return data.sort(compareFn);
}, [data]);

// Avoiding PL-005: Adding cleanup for side effect
useEffect(() => {
  const handler = debounce(callback, 300);
  
  return () => handler.cancel(); // PL-005: Prevent memory leak
}, [callback]);
```

### 3.3 Self-Review

**LLM performs comprehensive self-review:**

```markdown
## SELF-REVIEW: TASK-XXX

### Completion Checklist
- [ ] All completion criteria met
- [ ] Performance directives applied
- [ ] Known pitfalls avoided
- [ ] Code follows project conventions
- [ ] Accessibility requirements met (if UI)
- [ ] Error handling present
- [ ] Edge cases handled

### What I Implemented
✅ [Component/function 1]: [Purpose and key features]
✅ [Component/function 2]: [Purpose and key features]

### What I Did NOT Implement (Intentionally)
❌ [Feature X]: Out of scope for this task
❌ [Optimization Y]: Not needed yet, may add if metrics show need

### Deviations from Plan
⚠️ Changed [X] to [Y] because [specific technical reason]
⚠️ Added [Z] to handle [edge case discovered during implementation]

### Performance Analysis
- [Key operation]: O([complexity]) - [meets/exceeds requirement]
- [Another operation]: [actual timing if measured]
- Memory usage: [estimated if relevant]

### Pitfalls Checked
✅ PL-XXX: [How I avoided it]
✅ PL-YYY: [How I avoided it]

### New Technical Issues Discovered
[If any bugs found during testing, document as potential new PL-XXX]
```

### 3.4 State Compression

**LLM creates state snapshot for next task:**

```markdown
## STATE SNAPSHOT: After TASK-XXX
**Date:** [Date]
**Task Completed:** TASK-XXX [Name]

### What Changed in This Task
- Added [Component/module]
- Modified [Existing component]
- Created [New utility/hook]

### Interfaces for Next Task (Minimal Context)

**Types/Interfaces:**
```typescript
// Only type definitions, not full implementations
interface ComponentProps {
  // ...
}

type DataStructure = {
  // ...
}
```

**Available Functions/Hooks:**
- `functionName(params): ReturnType` - [Brief description]
- `useHookName(): ReturnValue` - [Brief description]

**Component APIs:**
- `<ComponentName prop={} />` - [What it does]

### What Next Task Can Assume
- [Assumption 1 about current state]
- [Assumption 2 about current state]

### What Next Task Should NOT Assume
- [Clarification about what's not done]

### Files Modified
- `src/path/to/file.ts` - [What changed]
- `src/path/to/other.ts` - [What changed]

### Discarded (No Longer Needed)
- [Implementation details not relevant to future tasks]
- [Temporary workarounds that are now resolved]
```

**LLM saves this to:** `docs/context/state-snapshots/snapshot-after-task-XXX.md`

### 3.5 Update claude.md

**LLM updates the main context file:**

```markdown
## Updates to claude.md

### Task Status
- TASK-XXX: Status → DONE

### Context Compression Log Entry
```markdown
### After Task-XXX Completion
**State Changes:**
- [Summary of what changed]

**Carry Forward:**
- [Minimal interfaces for next task]

**Discarded:**
- [What can be forgotten]
```

### New Project Learning (if discovered)
```markdown
### PL-XXX: [New Technical Issue]
**Discovered:** Task-XXX, [Date]
**Issue:** [What went wrong technically]
**Solution:** [How we fixed it]
**Prevention:** [How to avoid in future]
**Category:** [Performance/Architecture/Bug/Security]
```

### Architecture Update (if needed)
[Update architecture diagram if new major components added]
```

### 3.6 Checkpoint for Next Task

**LLM confirms:** 

```
TASK-XXX Complete ✅

Summary:
- Implemented: [Brief summary]
- Performance: [Key metrics if relevant]
- Context compressed: snapshot-after-task-XXX.md created
- claude.md updated

Ready to proceed to TASK-YYY? (yes/review-first/adjust-needed)
```

---

## Step 4: Feature Completion

### 4.1 Integration Verification

**After all tasks for a feature complete:**

```markdown
## FEATURE COMPLETE: [Feature Name]

### All Tasks Completed
✅ TASK-001: [Name]
✅ TASK-002: [Name]  
✅ TASK-003: [Name]
[etc.]

### Integration Testing
Testing complete user scenarios from behavioral spec:

**SCENARIO 1: [Name]**
✅ Tested - [Result]

**SCENARIO 2: [Name]**  
✅ Tested - [Result]

### Success Criteria Validation
✅ [Criterion 1] - Verified
✅ [Criterion 2] - Verified

### Performance Measurements
- [Key operation]: [Actual timing]
- [Another operation]: [Actual timing]
- [Comparison to requirements]: [Met/Exceeded]

### Final Architecture Update
[Update claude.md architecture section with complete feature structure]
```

### 4.2 Documentation Update

**LLM updates claude.md:**

```markdown
## Updates for Completed Feature

### Move feature to "Completed Features"
✅ [Feature Name] - [Brief description]
  - Implements: [Link to behavioral spec]
  - Components: [List main components]
  - Performance: [Key metrics]

### Clear "Current Feature" section
Ready for next feature

### Archive task breakdown
Move completed tasks to an archive or remove (keeping only status in log)

### Update Architecture Overview
[Reflect new components in architecture diagram]
```

---

## Step 5: Continuous Improvement

### 5.1 Project Learnings Maintenance

**Regularly review and categorize learnings:**

```markdown
## Project Learnings Health Check

### By Category
**Performance:** [Count] learnings
**Architecture:** [Count] learnings  
**Bug Patterns:** [Count] learnings
**Security:** [Count] learnings

### High-Impact Learnings (Review often)
- PL-XXX: [Issue] - [Impact level: CRITICAL]
- PL-YYY: [Issue] - [Impact level: HIGH]

### Patterns to Consolidate
- PL-AAA and PL-BBB are similar → Merge into PL-AAA-v2
- PL-CCC is outdated (architecture changed) → Archive
```

### 5.2 Performance Directives Evolution

**Update directives based on project experience:**

```markdown
## Project-Specific Directive Additions

### PD-PROJECT-001: [New Directive]
**Reason:** Discovered through PL-XXX experience
**Rule:** [Specific rule for this project]
**Applies to:** [Which components/situations]

### PD-PROJECT-002: [Another Directive]
[Same structure...]
```

### 5.3 Architecture Refinement

**As project grows, refine architecture documentation:**

```markdown
## Architecture Evolution

### Version 1.0 (Initial)
[Simple structure]

### Version 2.0 (After Feature Set 1)
[Refined structure with patterns emerging]
- Pattern: [Observed pattern]
- Rationale: [Why this pattern works]

### Current (Version 2.1)
[Latest structure]
```

---

## Common Patterns & Tips

### Pattern 1: When to Create New Task

**Create new task when:**
- ✅ Implementing a new user-facing component
- ✅ Adding a new user behavior
- ✅ Implementing a new data layer
- ✅ Significant refactoring

**Don't create new task for:**
- ❌ Fixing bugs in current task (just fix it)
- ❌ Small styling tweaks
- ❌ Renaming variables

### Pattern 2: Context Compression Strategy

**Always compress:**
```markdown
BEFORE (Verbose):
"We created a useSearch hook that takes products and searchTerm 
as parameters. The hook internally uses useState to manage the 
debounced term with a 300ms delay. It filters products using 
Array.filter and checks if product name includes the search term 
in a case-insensitive manner. It returns an object with results 
and isSearching properties."

AFTER (Compressed):
useSearch(products, searchTerm) → {results, isSearching}
- Debounces 300ms
- Case-insensitive name filtering
```

**Keep interfaces, discard implementation details.**

### Pattern 3: When Behavioral Spec Needs Refinement

**Refine if during implementation you discover:**
- User experience is unclear
- Edge cases weren't considered
- Performance requirement is unrealistic
- Technical approach fundamentally conflicts with behavior

**Process:**
1. Pause implementation
2. Document the discovery
3. Propose behavioral spec update
4. Get human approval
5. Update behavioral spec
6. Continue implementation

### Pattern 4: Handling Technical Debt

**Document in claude.md, not as project learning:**

```markdown
### Technical Debt
💳 [Description of shortcut taken]
   - **Why:** [Reason it exists]
   - **Impact:** [Current limitations]
   - **Plan:** [When/how to address]
   - **Priority:** [Low/Medium/High]
```

**Technical debt ≠ Project learning.** Debt is intentional, learnings are discoveries.

---

## Troubleshooting

### Problem: Context Getting Too Large

**Solution:**
- Aggressive state snapshot compression
- Reference interfaces only, not implementations
- Archive old completed task details
- Keep only high-impact project learnings

### Problem: LLM Not Following Directives

**Solution:**
- LLM should explicitly reference directive numbers in code comments
- Add reminder in task pre-implementation checklist
- Include directive violations as new project learnings

### Problem: Behavioral Spec Too Vague

**Solution:**
- LLM should ask more specific questions
- Use Gherkin scenarios for concrete examples
- Request actual user interaction sequence

### Problem: Tasks Too Large

**Solution:**
- Break into smaller atomic units
- Each task should complete one user-facing capability
- If can't complete in focused session, split further

### Problem: Repeated Mistakes

**Solution:**
- Check if documented in project learnings (if yes, LLM not checking)
- If not documented, add as new PL-XXX
- Reference in task pre-implementation checklist

---

## Success Metrics

### Context Engineering is Working When:

✅ LLM can execute tasks with minimal human intervention  
✅ Code quality is consistent across tasks  
✅ Performance requirements met without discussion  
✅ Context preserved across long breaks  
✅ New team members (human or LLM) can onboard from claude.md  
✅ Repeated mistakes decrease over time  
✅ State snapshots keep context manageable  

### Warning Signs:

⚠️ Frequent corrections needed during implementation  
⚠️ Same bugs appearing multiple times  
⚠️ LLM asking about performance approaches  
⚠️ Context snapshots growing too large  
⚠️ Behavioral specs require constant clarification  

**If warning signs appear:** Review and refine your context engineering approach.

---

## Next Steps

After completing context engineering:

1. **Execute tasks** using `task-execution-protocol.md`
2. **Maintain claude.md** as project evolves
3. **Document learnings** in `project-learnings.md`
4. **Compress context** after each task
5. **Iterate and improve** the framework for your project

---

**The framework is a living system. Adapt it to your needs while maintaining core principles.**
