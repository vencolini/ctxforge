# LLM Validation Checklist

**Purpose:** Ensure LLMs properly understand and follow ctxforge framework before executing tasks.

**Usage:** LLM must complete this checklist before implementing any task.

---

## Pre-Task Validation Protocol

**LLM must confirm each item before proceeding with task implementation:**

### ✅ Context Loading Verification

```markdown
## CONTEXT VALIDATION CHECKLIST

### 1. Performance Directives Understanding
I have read and understand the following performance directives applicable to this task:

- [ ] **PD-XXX:** [Directive name] - [How I'll apply it]
- [ ] **PD-YYY:** [Another directive] - [How I'll apply it]
- [ ] **PD-ZZZ:** [Third directive] - [How I'll apply it]

**Minimum:** List 3 relevant directives and how you'll apply them.

### 2. Project Learnings Verification
I have checked project learnings and will avoid these documented pitfalls:

- [ ] **PL-XXX:** [Learning name] - [How I'll avoid this issue]
- [ ] **PL-YYY:** [Another learning] - [How I'll avoid this issue]
- [ ] No relevant project learnings found ✓

**Requirement:** Check ALL PL-XXX entries for relevance to current task.

### 3. Behavioral Goal Confirmation
**In my own words, the behavioral goal of this task is:**

"[Restate what the user will be able to do after this task completes]"

**Success criteria I must meet:**
- [ ] [Specific testable outcome 1]
- [ ] [Specific testable outcome 2]
- [ ] [Performance requirement if applicable]

### 4. Technical Approach Declaration
**I will implement this using:**

1. **[Primary technique/pattern]**
   - **Why:** [Reasoning based on directives or requirements]
   - **Complexity:** O([X]) - [Justification]

2. **[Secondary technique/pattern]**
   - **Why:** [Reasoning based on directives or requirements]
   - **Risk mitigation:** [How avoiding known pitfalls]

### 5. Framework Compliance Commitment
- [ ] I will reference directive numbers (PD-XXX) in code comments
- [ ] I will document algorithmic complexity for non-trivial operations
- [ ] I will handle all edge cases explicitly
- [ ] I will include proper error handling
- [ ] I will create state snapshot after task completion
- [ ] I will update CONTEXT.md with task status and compression log
```

---

## Validation Failure Protocol

**If LLM cannot complete checklist:**

### Missing Context Information
```markdown
⚠️ VALIDATION INCOMPLETE

**Missing Information:**
- [ ] Cannot find CONTEXT.md
- [ ] Performance directives not accessible
- [ ] Project learnings not available
- [ ] Task requirements unclear
- [ ] Previous task state unknown

**Required Action:** Request human to provide missing context or run "npx ctxforge validate"
```

### Insufficient Understanding
```markdown
⚠️ FRAMEWORK UNDERSTANDING INSUFFICIENT

**Issues:**
- [ ] Cannot identify relevant performance directives
- [ ] Unclear how to avoid documented pitfalls
- [ ] Behavioral goal ambiguous
- [ ] Technical approach uncertain

**Required Action:** Request clarification from human before proceeding
```

---

## Quality Assurance Integration

### Mid-Task Validation
**LLM should self-check during implementation:**

```markdown
## MID-TASK VALIDATION (Optional but Recommended)

**Progress Check:**
- [ ] Still following declared technical approach
- [ ] No directive violations introduced
- [ ] Edge cases being handled as planned
- [ ] On track to meet success criteria

**If issues discovered:**
- Document deviation and reasoning
- Adjust approach if needed
- Continue with framework compliance
```

### Post-Task Validation
**Before marking task complete:**

```markdown
## POST-TASK VALIDATION (Mandatory)

**Implementation Review:**
- [ ] All success criteria met
- [ ] All declared directives applied (check code comments)
- [ ] All project learnings avoided (reference PL-XXX numbers)
- [ ] State snapshot created with minimal context for next task
- [ ] CONTEXT.md updated with task status and compression

**Quality Confirmation:**
- [ ] Code follows project naming conventions
- [ ] No TODO/FIXME comments left
- [ ] Error handling present
- [ ] Edge cases handled
- [ ] Performance requirements met

**Only mark COMPLETE when ALL items verified.**
```

---

## Framework Evolution Support

### Learning Discovery
**If LLM discovers new technical issues:**

```markdown
## NEW LEARNING DISCOVERED

**Issue Found:** [Description of technical problem]
**During:** TASK-XXX implementation
**Impact:** [How this affects code quality/performance]
**Solution Applied:** [How the issue was fixed]

**Recommendation:** Document as new PL-XXX entry in CONTEXT.md to prevent recurrence.
```

### Directive Effectiveness
**If directive seems inadequate:**

```markdown
## DIRECTIVE FEEDBACK

**Directive:** PD-XXX - [Name]
**Issue:** [Why directive didn't prevent problem or wasn't clear]
**Suggestion:** [Proposed improvement to directive]
**Context:** [Specific project/task where this occurred]

**Recommendation:** Consider updating directive for better clarity/effectiveness.
```

---

## Compliance Scoring

### Validation Score Calculation
**LLM compliance score based on checklist completion:**

- **Pre-task validation complete:** 40 points
- **All directives identified and applied:** 25 points  
- **All project learnings checked:** 15 points
- **Behavioral goal clearly restated:** 10 points
- **Post-task validation complete:** 10 points

**Total:** /100 points

**Targets:**
- **90-100:** Excellent compliance
- **80-89:** Good compliance  
- **70-79:** Acceptable compliance
- **<70:** Needs improvement - review framework training

---

## Implementation Notes

### For Framework Users
- Include this checklist in LLM task instructions
- Reference during code reviews to verify compliance
- Use as training material for team LLM usage

### For LLM Tools
- Integrate checklist into task execution workflow
- Use as quality gate before task implementation
- Reference during self-review process

### For Framework Evolution
- Track compliance scores to identify improvement areas
- Use feedback to refine directives and processes
- Monitor validation effectiveness over time

---

**This checklist ensures consistent framework application and prevents quality drift in LLM-assisted development.**

**Last Updated:** 2025-10-01  
**Framework Version:** 1.1 (Phase 1 Enhancement)