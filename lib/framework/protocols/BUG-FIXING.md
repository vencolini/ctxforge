# Bug-Fixing Protocol

**Load this protocol when:** Diagnosing and fixing bugs or errors

---

## When to Use

User requests starting with: fix, bug, error, broken, crash, issue, not working

Examples:
- "Fix the login bug"
- "Error on form submit"
- "The search is broken"

---

## Step 1: Bug Discovery (Ask 3-5 Questions)

**Don't immediately jump to code.** Discover the full scope:

### Q1: Reproduction
```
"What are the exact steps to reproduce this bug?

Include:
- Starting state
- Actions taken
- Expected result
- Actual result
- Any error messages"
```

### Q2: Scope
```
"Does this happen:
- Always or intermittently?
- On all browsers/devices or specific ones?
- For all users or specific scenarios?
- In production, staging, or just local dev?"
```

### Q3: Recent Changes
```
"When did this start happening?
Did it work before? What changed?
(Check project.md Recent Tasks for clues)"
```

### Q4: Impact (if not obvious)
```
"Who is affected?
- All users?
- Specific user roles?
- Edge case only?

How urgent? (blocks work / annoying / minor)"
```

### Q5: Related Issues (optional)
```
"Are there other bugs that might be related?
Any similar issues fixed before?
(Check Project Learnings for patterns)"
```

---

## Step 2: Root Cause Diagnosis

Based on answers:

1. **Check Project Learnings** - Have we seen this before?
2. **Form hypothesis** - What's likely causing this?
3. **Verify hypothesis** - Read relevant code, check logs

Present:
```
## Bug Analysis

**Symptom:** [User-facing problem]
**Root cause hypothesis:** [Technical explanation]
**Affected code:** [Files/functions]

**Reasoning:**
- [Evidence 1]
- [Evidence 2]

**Confidence:** HIGH/MEDIUM/LOW

Shall I investigate [file/area] to confirm?
```

---

## Step 3: Solution Proposal

After confirming root cause:

```
## Proposed Fix

**Change:** [What code will change]
**Why:** [How this fixes the root cause]
**Side effects:** [What else might be affected - be explicit!]

**Testing plan:**
1. [How to verify fix works]
2. [How to verify no regressions]

**Alternative approaches:**
- [Option 2 - with trade-offs]

Proceed with this fix? (yes/try alternative)
```

---

## Step 4: Implement + Validate

After approval:

1. **Fix the bug**

2. **Self-review checklist:**
   - [ ] Bug actually fixed (not just symptoms)
   - [ ] No new bugs introduced
   - [ ] Edge cases handled
   - [ ] Error messages improved if relevant
   - [ ] Performance not degraded

3. **Create test to prevent regression** (if possible)

---

## Step 5: Document Learning

If bug reveals a pattern or mistake:

```markdown
### PL-XXX: [Bug name]

**Discovered:** Bug-fix session, [date]

**Issue:**
[What went wrong]

**Root Cause:**
[Why it happened - architectural/assumption error]

**Solution:**
[How it was fixed]

**Prevention:**
Rule: [Specific practice to avoid in future]
Example: "Always validate user input server-side, even if client validates"

**Category:** Bug
```

Add to project.md under "Project Learnings".

---

## Step 6: Update State

```
✓ Bug fixed: [brief description]
✓ Root cause: [technical cause]
✓ Learning documented: PL-XXX
✓ Prevention rule: [practice to follow]

Files modified:
- [file]: [what changed]

Ready for next task? (yes/more bugs/new feature)
```

---

## Example Session

```
Human: "The search results show duplicates"

LLM: Let me discover the bug details:

1. What are exact steps to reproduce?
   - Search for what term?
   - How many duplicates?
   - Always or intermittent?

2. When did this start?
   - Did search work before?
   - What was built recently?

3. Does it happen:
   - All browsers or specific one?
   - All search terms or specific ones?

[Human answers...]

LLM:
## Bug Analysis

**Symptom:** Search results contain duplicate entries
**Root cause hypothesis:** Missing .distinct() in database query
**Affected code:** src/search/searchService.js:45

**Reasoning:**
- Duplicates suggest JOIN without deduplication
- Recent change added category filter (new JOIN added)
- Happens on all searches with category filter

**Confidence:** HIGH

Shall I check searchService.js to confirm?

[Human: yes]

LLM:
## Proposed Fix

**Change:** Add .distinct() to search query in searchService.js:45
**Why:** JOIN on categories creates cartesian product without deduplication
**Side effects:** None - results should be unique anyway

**Testing plan:**
1. Search with category filter → verify no duplicates
2. Search without filter → verify still works
3. Check performance → .distinct() might be slightly slower

**Alternative approaches:**
- Use subquery instead of JOIN (more complex, same result)

Proceed with this fix? (yes/try alternative)
```

---

## Common Bug Patterns

### Null/Undefined Errors
- Check: Optional chaining usage
- Verify: Null checks before access
- Consider: Default values

### Performance Issues
- Profile: Identify bottleneck
- Measure: Before/after metrics
- Optimize: Targeted changes only

### Race Conditions
- Identify: Concurrent operations
- Solution: Locks, queues, or atomics
- Test: Stress testing

### Integration Errors
- Check: API contract changes
- Verify: Error handling
- Test: Mock failure scenarios

---

## Quality Criteria

Bug fix complete when:
- [ ] Root cause identified and verified
- [ ] Fix addresses cause, not just symptom
- [ ] Self-review checklist passed
- [ ] Regression test created (if applicable)
- [ ] Learning documented in project.md
- [ ] No new bugs introduced

---
