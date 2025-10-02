# Refactoring Protocol

**Load this protocol when:** Improving or reorganizing existing code

---

## When to Use

User requests starting with: refactor, improve, clean, reorganize, optimize

Examples:
- "Refactor the authentication module"
- "Clean up this messy function"
- "Improve code organization"

---

## Step 1: Understand Current State (Ask 3-4 Questions)

**Don't immediately rewrite.** Discover the context:

### Q1: Improvement Target
```
"What specifically needs improvement?

Options:
- Performance issues?
- Code organization?
- Readability?
- Maintainability?
- Testability?
- All of the above?

Please be specific about what's problematic."
```

### Q2: Constraints
```
"What must NOT change?

Clarify:
- External API/interface?
- Behavior/functionality?
- Performance characteristics?
- Database schema?

This helps me avoid breaking changes."
```

### Q3: Testing Coverage
```
"Are there tests for this code?

- If yes: We must keep them passing
- If no: Should we add tests first?

Testing-first refactoring is safer."
```

### Q4: Historical Context (optional)
```
"Why was it written this way originally?

Understanding original constraints helps:
- Time pressure?
- Missing knowledge?
- Changed requirements?

(Check project.md Recent Tasks & Learnings for clues)"
```

---

## Step 2: Analysis & Proposal

Present analysis BEFORE refactoring:

```markdown
## Refactoring Analysis

**Current issues:**
- [Issue 1]: [Technical description]
  → Impact: [How it affects maintenance/performance/readability]
- [Issue 2]: [Technical description]
  → Impact: [Specific problems it causes]

**Proposed changes:**

### Change 1: [Name of change]
**What:** [Technical description]
**Why:** [Benefit - improves testability/readability/performance]
**Risk:** [None/Low/Medium - specific risk if any]

### Change 2: [Name of change]
**What:** [Technical description]
**Why:** [Benefit]
**Risk:** [Assessment]

**What stays the same:**
- Interface/API: [No external changes / Specific exceptions]
- Behavior: [Identical outputs for same inputs]
- Performance: [Same Big O or better]

**Testing strategy:**
- [ ] Existing tests pass without modification
- [ ] Add missing edge case tests
- [ ] Benchmark before/after (if performance-critical)

**Refactoring approach:**
- Incremental steps (not big-bang rewrite)
- Review after each step
- Easy to rollback if needed

Proceed with refactoring? (yes/modify approach)
```

---

## Step 3: Refactor Incrementally

**NEVER do big-bang rewrites.**

Break into small, reviewable steps:

```markdown
I'll refactor in these steps:

**STEP 1:** Extract [function X]
  → Changes: [Specific code movements]
  → Review checkpoint: Does it work? Tests pass?
  → Commit: "refactor: extract [X] for better testability"

**STEP 2:** Reorganize [structure Y]
  → Changes: [File moves, renames]
  → Review checkpoint: Still working?
  → Commit: "refactor: reorganize [Y] for clarity"

**STEP 3:** Optimize [algorithm Z]
  → Changes: [Algorithm improvement]
  → Review checkpoint: Same behavior, better performance?
  → Commit: "refactor: optimize [Z] algorithm"

Each step is independently reviewable and revertable.
```

### Implementation Rules

After approval, apply these rules:

1. **One change at a time**
   - Extract function → test → commit
   - Rename variable → test → commit
   - Reorganize structure → test → commit

2. **Keep tests green**
   - Run tests after every change
   - If tests fail, understand why before proceeding
   - Update tests only if interface legitimately changed

3. **Preserve behavior**
   - Inputs → same outputs
   - Side effects → same side effects
   - Errors → same error handling

4. **Document non-obvious changes**
   - Why this pattern over alternatives
   - What constraints influenced the design
   - Links to related learnings

---

## Step 4: Validation Checklist

After refactoring, verify:

```markdown
## Refactoring Complete - Self-Review

- [ ] All existing tests pass without modification (or documented changes)
- [ ] No behavior changes (verified through tests)
- [ ] Performance not degraded (benchmarked if critical)
- [ ] Code more readable than before
- [ ] Code more maintainable than before
- [ ] No new warnings or lint errors
- [ ] Documentation updated if needed
- [ ] Commits are atomic and well-described

**Before/After comparison:**

Metric | Before | After | Improvement
-------|--------|-------|------------
Lines of code | [X] | [Y] | [%]
Cyclomatic complexity | [X] | [Y] | [%]
Test coverage | [X%] | [Y%] | [delta]
Performance (if measured) | [X] | [Y] | [%]

**Quality improvement:**
[Brief description of how code is better]
```

---

## Step 5: Document Learning

If refactoring reveals past mistakes or patterns:

```markdown
### PL-XXX: [What we learned from this refactoring]

**Discovered:** Refactoring session, [date]

**Issue:**
[Why original implementation was problematic]
Example: "God class doing too many things made testing impossible"

**Root Cause:**
[Why it was written that way]
- Time pressure?
- Missing knowledge?
- Requirements changed since?

**Solution:**
[Better pattern we refactored to]
Example: "Extracted 3 single-responsibility classes with clear interfaces"

**Prevention:**
Rule: [Guideline for future implementations]
Example: "Keep classes focused on single responsibility. If class has >3 dependencies, consider splitting."

**Category:** Architecture / Code Quality
```

Add to project.md under "Project Learnings".

---

## Common Refactoring Patterns

### Extract Function
- **When:** Block of code does something specific
- **Benefit:** Reusability, testability, readability
- **Risk:** Low

### Extract Class
- **When:** Too many responsibilities in one class
- **Benefit:** Single responsibility, easier testing
- **Risk:** Medium (interface changes)

### Rename for Clarity
- **When:** Names don't reflect current purpose
- **Benefit:** Self-documenting code
- **Risk:** Low (if IDE refactor used)

### Replace Algorithm
- **When:** Better algorithm available
- **Benefit:** Performance, clarity
- **Risk:** Medium (behavior must stay identical)

### Introduce Parameter Object
- **When:** Functions have too many parameters
- **Benefit:** Flexibility, readability
- **Risk:** Low

### Replace Conditional with Polymorphism
- **When:** Complex if/switch on type
- **Benefit:** Extensibility, maintainability
- **Risk:** Medium (architecture change)

---

## Anti-Patterns to Avoid

### ❌ Big-Bang Rewrite
```
DON'T: Rewrite entire module at once
DO: Incremental changes with tests green
```

### ❌ Refactoring + Feature
```
DON'T: Refactor while adding new feature
DO: Refactor first, then add feature (or vice versa)
```

### ❌ Breaking Tests to "Fix Later"
```
DON'T: Break tests with plan to fix later
DO: Keep tests passing at every step
```

### ❌ Changing Behavior "While We're At It"
```
DON'T: Sneak in behavior changes during refactor
DO: Pure refactor only, behavior changes separate
```

---

## Quality Criteria

Refactoring complete when:
- [ ] All tests pass (or documented legitimate changes)
- [ ] Code metrics improved (complexity, readability)
- [ ] No behavior changes (unless explicitly documented)
- [ ] Performance not degraded
- [ ] Incremental commits with clear messages
- [ ] Learning documented in project.md
- [ ] Team reviewed and approved (if team workflow)

---

## Example Session

```
Human: "Refactor the user authentication service"

LLM: Let me understand what needs improvement:

1. What specifically needs improvement?
   - Is it performance?
   - Code organization?
   - Readability?

2. What must NOT change?
   - The authentication API interface?
   - Any specific behavior?

3. Are there tests for this service?

[Human answers...]

LLM:
## Refactoring Analysis

**Current issues:**
- Issue: 500-line God class doing auth, validation, logging, caching
  → Impact: Impossible to test in isolation, violates SRP

**Proposed changes:**

### Change 1: Extract AuthValidator class
**What:** Move validation logic to separate class
**Why:** Can test validation independently
**Risk:** None, internal refactor only

### Change 2: Extract AuthCache class
**What:** Move caching to separate class
**Why:** Clearer responsibility, easier to swap cache strategies
**Risk:** None, internal refactor only

**What stays the same:**
- Interface: All public methods unchanged
- Behavior: Identical authentication flow
- Performance: Same (caching still present)

**Testing strategy:**
- [ ] All 47 existing tests pass
- [ ] Add unit tests for extracted classes

Proceed? (yes/modify)

[Human: yes]

LLM:
I'll refactor in 3 steps:

STEP 1: Extract AuthValidator
  → Moving validation logic
  → Tests still pass (using new class internally)
  → Commit: "refactor: extract AuthValidator class"

[Shows code change]

Review: Tests pass? ✓

STEP 2: Extract AuthCache
  ...
```

---
