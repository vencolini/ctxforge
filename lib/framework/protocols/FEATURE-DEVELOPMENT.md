# Feature Development Protocol

**Load this protocol when: Building new functionality**

---

## When to Use

User requests starting with: build, create, add, implement, develop, make, design

Examples:
- "Add user registration"
- "Build search feature"
- "Create dashboard"

---

## Phase 1: Behavioral Unpacking (Ask 5-7 Questions)

Select questions based on feature type from DISCOVERY-QUESTIONS.md.

**Core question categories:**

### 1. Happy Path Discovery
```
"Describe the successful scenario step-by-step from user's perspective.
What do they see/do/experience?"
```

### 2. Edge Case Discovery
```
"What should happen when [obvious edge case]?
Examples: empty state, no results, invalid input, network error"
```

### 3. Performance Discovery
```
"How should this feel to the user?
Examples: Instant (<100ms)? Fast (<1s)? Eventual (loading state okay)?"
```

### 4. Error Discovery
```
"What should NEVER happen?
What would frustrate users most?"
```

### 5. Accessibility Discovery
```
"Should this work for:
- Screen reader users?
- Keyboard-only navigation?
- Mobile devices?
- Low-bandwidth connections?"
```

### 6. Scope Discovery
```
"For this feature, what's explicitly OUT of scope?
What should we NOT build yet?"
```

### 7. Integration Discovery (if relevant)
```
"Does this interact with:
- Existing features?
- External APIs?
- Database?
- Authentication?"
```

**Important:** Adapt questions to context. Don't ask all 7 if some are obvious.

---

## Phase 2: Technical Synthesis

Based on answers, generate:

### 2A: Behavioral Specification

```markdown
# Feature: [Name]

## User Scenarios

SCENARIO: [Happy path name]
  GIVEN [initial context]
    AND [additional context if needed]
  WHEN [user action]
  THEN [immediate outcome]
    AND [secondary outcome]
    AND [state change]

SCENARIO: [Edge case 1]
  GIVEN [context]
  WHEN [action]
  THEN [outcome]

SCENARIO: [Error case]
  GIVEN [context]
  WHEN [error condition]
  THEN [error handling]
    AND [user feedback]
    AND [recovery path]

## Out of Scope
- [Explicitly not building]
- [Deferred to later]
```

### 2B: Technical Inferences

```markdown
## Technical Inferences

[INFER-HIGH]: [Assumption based on explicit requirement]
  Reasoning: [Why this inference is confident]

[INFER-MEDIUM]: [Industry best practice for this scenario]
  Reasoning: [Why this is likely correct]

[INFER-LOW]: [Assumption that needs confirmation]
  Reasoning: [Why uncertain]

## Clarification Needed

Q: [Question about ambiguous requirement]
Q: [Question about unspecified detail]
```

**Confidence Level Guidelines:**

- **HIGH**: Human explicitly said this OR it's the only reasonable approach
- **MEDIUM**: Standard practice for this scenario, but alternatives exist
- **LOW**: Assumption filling gap, could be wrong

### 2C: Present for Approval

```
─────────────────────────────────────
BEHAVIORAL SPEC
─────────────────────────────────────
[Show scenarios in Gherkin format]

─────────────────────────────────────
TECHNICAL INFERENCES
─────────────────────────────────────
[Show inferences with confidence levels]

─────────────────────────────────────
QUESTIONS FOR CONFIRMATION
─────────────────────────────────────
[List ambiguities]

─────────────────────────────────────

Please review:
1. Do scenarios match your intent?
2. Any inferences to correct?
3. Answers to clarification questions?

Reply "approve" to proceed or correct any assumptions.
```

---

## Phase 3: Task Breakdown

After approval, generate atomic tasks:

```markdown
## Task Breakdown

TASK-001: [Atomic unit - one feature piece]
Estimated: [1.5-2.5 hours]
Deliverable: [What will work after this task]

TASK-002: [Next atomic unit]
Estimated: [1.5-2.5 hours]
Deliverable: [What will work]

[Continue...]

Total: [X tasks, Y-Z hours estimated]
```

**Atomic Task Guidelines:**
- Can be completed in one coding session
- Produces working, testable code
- Minimal dependencies on incomplete work
- Clear success criteria

Update project.md:
```markdown
## Current Focus

**Feature:** [Name]
**Status:** Ready for implementation
**Tasks:**
- [ ] TASK-001: [Description]
- [ ] TASK-002: [Description]
...
```

Present:
```
✓ Created task breakdown
✓ Updated project.md

Ready to execute TASK-001? (yes/review/modify)
```

---

## Phase 4: Implementation

For each task:

### Step 1: Load Context
- project.md (architecture, learnings)
- PERFORMANCE-DIRECTIVES.md (quality rules)
- Latest snapshot (if exists)

### Step 2: Pre-Implementation Verification
```
Before coding TASK-XXX, verify:
✓ Behavioral spec clear?
✓ Dependencies available?
✓ Project learnings reviewed? (avoid past mistakes)
✓ Performance directives loaded?
✓ Test approach understood?
```

### Step 3: Implementation
Write code following inferences + performance directives.

### Step 4: Self-Review
BEFORE presenting code:

```
ACCESSIBILITY
□ Semantic HTML / proper elements
□ ARIA labels on interactive elements
□ Keyboard navigation works
□ Color contrast sufficient

PERFORMANCE
□ Time complexity acceptable (O(n log n) max)
□ No unnecessary re-renders
□ Debounced user inputs
□ Efficient data structures

ERROR HANDLING
□ Try-catch on async operations
□ User-friendly error messages
□ Graceful degradation
□ Null/undefined checks

EDGE CASES
□ Empty states handled
□ Loading states shown
□ Null checks present
□ Boundary conditions tested

CODE QUALITY
□ Functions < 50 lines
□ Clear variable names
□ No magic numbers
□ Proper code organization
□ Can be tested
□ Edge cases testable
```

If any □ fails, fix before presenting.

### Step 5: State Compression
Create snapshot (2-4K tokens):

```markdown
## Snapshot: TASK-XXX

**Date:** [ISO date]
**Feature:** [Name]
**Task:** TASK-XXX - [Description]

## Changes Made
- [File]: [What changed and why]
- [File]: [What changed and why]

## New Interfaces/Functions
\`\`\`typescript
// Only signatures, not implementations
interface NewThing {
  prop: type;
}

function newFunction(params): returnType
\`\`\`

## What Next Task Needs to Know
- [Key point 1]
- [Key point 2]

## What Can Be Assumed Working
- [Feature piece 1]
- [Feature piece 2]

## Discarded Details
[Implementation specifics no longer needed in context]
```

### Step 6: Update project.md

Update these sections:
1. **Current Focus** → Mark task complete, show next
2. **Architecture Overview** → Add new components/patterns
3. **Project Learnings** → Add if issues discovered

**Keep project.md under 20K tokens:**
- Move old state snapshots to separate files
- Reference interfaces, not full implementations
- Summarize architecture, don't duplicate code

Present:
```
✓ TASK-XXX complete
✓ Self-review passed
✓ State compressed
✓ project.md updated

Files modified:
- [file]: [summary]

Ready for TASK-YYY? (yes/review/break)
```

---

## Discovery Question Selection (Feature-Specific)

### CRUD Operations
- Data validation rules?
- Concurrent edit handling?
- Delete confirmation?
- Soft vs hard delete?

### Search/Filter
- Search scope (what fields)?
- Real-time or submit?
- Fuzzy matching?
- Result sorting?
- Empty results message?

### Authentication
- Password requirements?
- Session duration?
- Remember me?
- Forgot password flow?
- Account lockout?

### Forms
- Validation timing (on blur/submit)?
- Required fields?
- Error message placement?
- Unsaved changes warning?

### Real-time Features
- Polling vs WebSocket?
- Update frequency?
- Conflict resolution?
- Offline support?

### Data Visualization
- Interactivity level?
- Responsive behavior?
- Accessibility (data tables)?
- Export options?

**Adapt from DISCOVERY-QUESTIONS.md templates.**

---

## Success Criteria

Feature complete when:
- [ ] All tasks from breakdown completed
- [ ] Self-review checklist passed for each
- [ ] State snapshots created
- [ ] project.md updated with learnings
- [ ] Tests written (if applicable)
- [ ] Documentation updated (if needed)

---
