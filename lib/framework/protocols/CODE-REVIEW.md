# Code Review Protocol

**Load this protocol when:** Reviewing code quality, security, or best practices

---

## When to Use

User requests starting with: review, check, assess, critique, evaluate, audit

Examples:
- "Review this authentication code"
- "Check if this is secure"
- "Evaluate code quality"

---

## Step 1: Load Quality Criteria

Before reviewing, establish criteria:

```
I'll review against:

✓ PERFORMANCE-DIRECTIVES.md (30 quality rules)
✓ Project learnings (past mistakes to avoid - from project.md)
✓ Best practices for [language/framework]
✓ Security considerations (OWASP, CVE patterns)
✓ Accessibility requirements (WCAG 2.1)
✓ Performance implications
✓ Maintainability and readability

Starting review...
```

---

## Step 2: Multi-Level Review

Present findings in priority order:

```markdown
## Code Review: [Component/Feature Name]

**Reviewed:** [File(s) or module name]
**Date:** [Current date]
**Reviewer:** [LLM model]

---

### 🔴 CRITICAL (Must fix before deployment)

#### Issue 1: [Critical issue name]
**Location:** [File:line or function name]
**Problem:** [Detailed description]
**Impact:** [Security risk / Data loss / System crash / etc]
**Fix:** [Specific code change needed]

```diff
- // Bad: Vulnerable code
+ // Good: Secure code
```

**Priority:** Fix immediately
**Effort:** [Low/Medium/High]

---

#### Issue 2: [Another critical issue]
[Same format...]

---

### 🟡 IMPORTANT (Should fix before merge)

#### Issue 1: [Important issue name]
**Location:** [File:line]
**Problem:** [Description]
**Impact:** [Performance degradation / Accessibility barrier / etc]
**Fix:** [How to correct]

**Example:**
```javascript
// Current: O(n²) complexity
for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < items.length; j++) {
    // ...
  }
}

// Suggested: O(n) with Map
const itemMap = new Map(items.map(item => [item.id, item]));
```

**Priority:** Should fix
**Effort:** [Low/Medium/High]

---

### 🟢 NICE-TO-HAVE (Consider improving)

#### Issue 1: [Nice-to-have improvement]
**Location:** [File:line]
**Problem:** [Description]
**Impact:** [Maintenance / Readability / Team consistency]
**Suggestion:** [How to improve]

**Priority:** Optional
**Effort:** [Low/Medium/High]

---

### ✅ GOOD PRACTICES FOUND

Positive aspects worth noting:

- ✓ **Error handling:** Proper try-catch with specific error messages
- ✓ **Input validation:** All user inputs validated before processing
- ✓ **Type safety:** Good use of TypeScript types
- ✓ **Semantic HTML:** Accessible markup with proper ARIA
- ✓ **Code organization:** Clear separation of concerns
- ✓ **Testing:** Well-covered with unit tests

---

### 📊 SUMMARY

**Quality Score:** [X/100]

Breakdown:
- Security: [X/25]
- Correctness: [X/25]
- Performance: [X/15]
- Maintainability: [X/15]
- Accessibility: [X/10]
- Testing: [X/10]

**Issues Found:**
- Critical: [N] (must fix)
- Important: [N] (should fix)
- Nice-to-have: [N] (optional)

**Top Priority:** Fix [critical issue name] first (blocks security)

**Overall Assessment:** [READY / NEEDS WORK / MAJOR REVISION]

---

### 📋 CHECKLIST AGAINST PERFORMANCE-DIRECTIVES.md

Compliance with framework directives:

**Layout & Composition:**
- [ ] Uses Flexbox/Grid (not floats)
- [ ] Mobile-first responsive design
- [ ] Proper semantic HTML

**Performance:**
- [ ] No unnecessary re-renders
- [ ] Images optimized and lazy-loaded
- [ ] Efficient algorithms (no O(n²) where avoidable)

**Accessibility:**
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient

**Error Handling:**
- [ ] Try-catch for async operations
- [ ] User-friendly error messages
- [ ] Graceful degradation

**Security:**
- [ ] Input sanitization
- [ ] No hardcoded secrets
- [ ] SQL injection protection
- [ ] XSS protection

[Full checklist based on loaded PERFORMANCE-DIRECTIVES.md]

---

### 💡 RECOMMENDATIONS

**Immediate Actions:**
1. [Fix critical issue 1] → Estimated: [time]
2. [Fix critical issue 2] → Estimated: [time]

**Short-term Improvements:**
1. [Address important issue 1]
2. [Address important issue 2]

**Long-term Considerations:**
1. [Consider nice-to-have 1]
2. [Refactoring opportunity for better architecture]

---
```

---

## Step 3: Offer to Fix

After presenting review, ask:

```
Would you like me to:

1. **Fix critical + important issues?** (recommended)
   → I'll implement all security and correctness fixes
   → Apply important performance and accessibility improvements
   → Estimated effort: [X minutes/hours]

2. **Fix only critical issues?** (minimum for safety)
   → Address security vulnerabilities and bugs
   → Leave improvements for later
   → Estimated effort: [X minutes]

3. **Explain issues in detail?** (for learning)
   → Walk through each issue
   → Show why it's problematic
   → Demonstrate better alternatives

4. **Review approach only?** (no code changes)
   → Just feedback, you implement fixes
   → I can clarify any questions

Choose option 1-4, or tell me which specific issues to fix.
```

---

## Step 4: Implement Fixes (if approved)

After approval to fix:

```markdown
## Implementing Review Fixes

**Fixing in order:**

### ✅ FIXED: [Issue name]
**Change:** [What was changed]
**File:** [File:line]

```diff
- // Before: Vulnerable code
const query = `SELECT * FROM users WHERE id = ${userId}`;
+ // After: Parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
const result = await db.query(query, [userId]);
```

**Verification:** [How to verify fix works]
**Tests:** [Added/updated tests]

---

### ✅ FIXED: [Next issue]
[Same format...]

---

### FIXES SUMMARY

**Files modified:**
- [file1]: [changes made]
- [file2]: [changes made]

**Tests added/updated:**
- [test file]: [test cases]

**Before/after quality score:**
- Before: [X/100]
- After: [Y/100]
- Improvement: [+Z points]

**Remaining issues:**
- Nice-to-have issues left for future iteration
```

---

## Step 5: Document Learnings

If review revealed patterns or common mistakes:

```markdown
### PL-XXX: [Pattern or mistake found]

**Discovered:** Code review session, [date]

**Issue:**
[What pattern was problematic]
Example: "Using innerHTML without sanitization creates XSS vulnerability"

**Impact:**
[Why this matters]
Example: "Allows attackers to inject malicious scripts"

**Solution:**
[Better approach]
Example: "Use textContent for text, or sanitize HTML with DOMPurify library"

**Prevention:**
Rule: [Practice to follow in future]
Example: "Always sanitize user-generated content before rendering as HTML. Use textContent by default, DOMPurify for rich content."

**References:**
- [OWASP link or documentation]

**Category:** Security / Performance / Accessibility
```

Add to project.md under "Project Learnings".

---

## Review Categories

### Security Review
Focus areas:
- Input validation and sanitization
- Authentication and authorization
- Secrets management
- SQL injection prevention
- XSS/CSRF protection
- Dependency vulnerabilities

### Performance Review
Focus areas:
- Algorithm complexity (Big O)
- Unnecessary re-renders (React/Vue)
- Database query optimization
- Asset loading (images, scripts)
- Memory leaks
- Bundle size

### Accessibility Review
Focus areas:
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Color contrast
- Screen reader compatibility
- Focus management

### Code Quality Review
Focus areas:
- Readability and clarity
- Code duplication (DRY)
- Function/class size
- Naming conventions
- Comments and documentation
- Error handling

---

## Quality Scoring Rubric

**Security (25 points)**
- 25: No vulnerabilities, follows best practices
- 20: Minor issues, mostly secure
- 15: Some vulnerabilities, needs attention
- 10: Major vulnerabilities
- 0: Critical security flaws

**Correctness (25 points)**
- 25: Logic sound, handles all cases
- 20: Minor edge case issues
- 15: Some incorrect logic
- 10: Major bugs present
- 0: Fundamentally broken

**Performance (15 points)**
- 15: Optimal algorithms, no bottlenecks
- 12: Good performance, minor improvements possible
- 9: Acceptable but could be better
- 6: Performance concerns
- 0: Severe performance issues

**Maintainability (15 points)**
- 15: Clear, well-structured, documented
- 12: Good structure, mostly readable
- 9: Acceptable but could improve
- 6: Hard to understand/modify
- 0: Unmaintainable mess

**Accessibility (10 points)**
- 10: Fully accessible, WCAG AAA
- 8: Good accessibility, WCAG AA
- 6: Basic accessibility, some gaps
- 4: Poor accessibility
- 0: Not accessible

**Testing (10 points)**
- 10: Comprehensive tests, edge cases covered
- 8: Good test coverage
- 6: Basic tests present
- 4: Minimal testing
- 0: No tests

**Total: /100**

---

## Example Review Session

```
Human: "Review this login component"

LLM:
I'll review against:
✓ PERFORMANCE-DIRECTIVES.md
✓ Security best practices
✓ React best practices
✓ Accessibility standards

## Code Review: LoginComponent

### 🔴 CRITICAL

#### Issue 1: Password stored in plain text
**Location:** handleSubmit, line 23
**Problem:** Password sent to console.log, visible in logs
**Impact:** Security vulnerability - passwords exposed
**Fix:** Remove console.log, use proper logging library

#### Issue 2: No CSRF protection
**Location:** API call, line 28
**Problem:** POST request without CSRF token
**Impact:** Vulnerable to cross-site request forgery
**Fix:** Include CSRF token in headers

### 🟡 IMPORTANT

#### Issue 1: Missing loading state
**Location:** LoginForm component
**Problem:** No loading indicator during auth
**Impact:** Poor UX - user doesn't know request is processing
**Fix:** Add loading state and disable button during request

### ✅ GOOD PRACTICES

- ✓ Password input uses type="password"
- ✓ Form validation before submit
- ✓ Error messages displayed to user

### 📊 SUMMARY

Quality Score: 68/100
- Critical: 2 (must fix)
- Important: 1 (should fix)

Top priority: Remove password logging (security)

Would you like me to:
1. Fix critical + important issues?
2. Fix only critical?
3. Explain in detail?
```

---

## Quality Criteria

Review complete when:
- [ ] All categories assessed (security, performance, accessibility, etc.)
- [ ] Issues prioritized (critical, important, nice-to-have)
- [ ] Specific fixes proposed with examples
- [ ] Quality score calculated with breakdown
- [ ] Good practices acknowledged
- [ ] Learnings documented if patterns found
- [ ] Clear next steps provided

---
