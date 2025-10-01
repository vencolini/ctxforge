# Project Learnings Database

**Purpose:** Document technical pitfalls discovered during development to prevent repeated mistakes.

**Last Updated:** [Date]

---

## How to Use This File

### For LLMs:
1. **Read before each task** - Check for relevant patterns to avoid
2. **Reference in code** - Add comments like `// Avoiding PL-005: memory leak`
3. **Add discoveries** - Document new technical issues as PL-XXX
4. **Update claude.md** - Cross-reference new learnings in main context

### For Humans:
1. **Review regularly** - Understand common pitfalls in this project
2. **Share with team** - Onboarding reference for new developers
3. **Refine as needed** - Consolidate similar patterns, archive outdated ones
4. **Quality metric** - Decreasing new learnings = improving code quality

---

## Learning Criteria

### ✅ INCLUDE These Types of Learnings:

**Technical Bugs:**
- Code that crashed or behaved unexpectedly
- Race conditions, memory leaks, edge cases missed

**Performance Issues:**
- Algorithms with poor complexity
- Operations that were slower than expected
- Memory/resource usage problems

**Architecture Decisions:**
- Design choices and their consequences
- Refactoring insights
- Pattern discoveries

**Framework/Library Gotchas:**
- Non-obvious behavior of tools you're using
- Common mistakes with specific libraries
- Version-specific issues

**Security Vulnerabilities:**
- Input validation failures
- Authentication/authorization bugs
- Data exposure issues

---

### ❌ DO NOT INCLUDE These:

**Product Changes:**
- "User wanted 3 characters instead of 2" ← This is a requirement change
- "Changed button color to blue" ← This is a design decision
- "Added new feature per user request" ← This is feature work

**Business Logic:**
- "Discount applies only to premium users" ← This is business rules
- "Orders over $100 get free shipping" ← This is domain logic

**Preferences:**
- "Prefer tabs over spaces" ← This is style preference
- "Using Prettier for formatting" ← This is tooling choice

---

## Learning Categories

### Performance
Issues related to speed, efficiency, resource usage

### Architecture  
Issues related to system design, structure, patterns

### Bug
Logic errors, crashes, unexpected behavior

### Security
Vulnerabilities, authentication, data protection

### Framework
Library/framework-specific issues

### Data
Data handling, validation, transformation issues

---

## Active Learnings

### PL-001: [Descriptive Name of Technical Issue]

**Discovered:** [Task where found], [Date]

**Category:** [Performance | Architecture | Bug | Security | Framework | Data]

**Issue:**
[Clear description of the technical problem that occurred]

**Example Scenario:**
[Specific situation where this manifested]

**Root Cause:**
[Technical explanation of why this happened]

**Code Example:**
```[language]
// ❌ WRONG - [Brief explanation of what's wrong]
[Code that demonstrates the problem]

// ✅ CORRECT - [Brief explanation of the fix]
[Code that shows the correct approach]
```

**Solution:**
[How we fixed or prevent this issue]

**Prevention:**
[Specific things to check/do to avoid this in future]

**Related Directives:**
[Reference to PD-XXX directives this relates to]

**Impact:**
[How this affected the project - severity/scope]

**Status:** [ACTIVE | ARCHIVED | RESOLVED]

---

### PL-002: [Another Learning]

[Same structure as above...]

---

## Template for New Learnings

```markdown
### PL-XXX: [Descriptive Name]

**Discovered:** TASK-XXX, [Date]
**Category:** [Performance | Architecture | Bug | Security | Framework | Data]

**Issue:**
[What went wrong technically]

**Example Scenario:**
[When/where this happens]

**Root Cause:**
[Technical explanation]

**Code Example:**
```[language]
// ❌ WRONG
[Bad code]

// ✅ CORRECT  
[Good code]
```

**Solution:**
[How to fix/prevent]

**Prevention:**
[Checklist or pattern to follow]

**Related Directives:**
[PD-XXX references]

**Impact:**
[Severity and scope]

**Status:** ACTIVE
```

---

## Example Learnings

### PL-001: Debounce Timer Memory Leak

**Discovered:** TASK-002, 2024-01-15
**Category:** Bug

**Issue:**
Debounced event handlers weren't cleaned up on component unmount, causing memory leaks in long sessions.

**Example Scenario:**
User navigates away from search page and back multiple times. Each visit creates new debounce timer without canceling old one.

**Root Cause:**
useEffect with debounce didn't return cleanup function, so timers accumulated in memory.

**Code Example:**
```javascript
// ❌ WRONG - Memory leak
useEffect(() => {
  const debouncedHandler = debounce(handleSearch, 300);
  debouncedHandler(searchTerm);
}, [searchTerm]);
// Timer persists after unmount

// ✅ CORRECT - Cleanup on unmount
useEffect(() => {
  const debouncedHandler = debounce(handleSearch, 300);
  debouncedHandler(searchTerm);
  
  return () => debouncedHandler.cancel(); // Cancel timer
}, [searchTerm]);
```

**Solution:**
Always return cleanup function from useEffect that cancels/cleans up the debounce timer.

**Prevention:**
- Check every useEffect with timers/intervals for cleanup
- Use ESLint rule: `exhaustive-deps` to catch missing cleanups
- Add to pre-implementation checklist: "Does this effect need cleanup?"

**Related Directives:**
- PD-MEM-001: Clean Up Side Effects
- PD-INPUT-001: Debounce User Input

**Impact:**
High - Memory leaks caused browser slowdown after 30+ searches in testing. Fixed improved performance significantly.

**Status:** ACTIVE

---

### PL-002: Case-Sensitive Search Bug

**Discovered:** TASK-001, 2024-01-14
**Category:** Bug

**Issue:**
Search failed to find products when user's search term case didn't match product name case (e.g., "iPhone" vs "iphone").

**Example Scenario:**
User types "iphone" but product is named "iPhone". No results shown despite product existing.

**Root Cause:**
Direct string comparison using `.includes()` without normalizing case.

**Code Example:**
```javascript
// ❌ WRONG - Case-sensitive comparison
const filtered = products.filter(p => 
  p.name.includes(searchTerm)
);
// "iphone" won't match "iPhone"

// ✅ CORRECT - Case-insensitive comparison
const filtered = products.filter(p => 
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);
// Both normalized to lowercase before comparison
```

**Solution:**
Always normalize case for user-facing search/comparison operations using `.toLowerCase()` on both sides.

**Prevention:**
- Any user input comparison should be case-insensitive by default
- Document when case-sensitive comparison is intentional
- Add test cases with mixed-case inputs

**Related Directives:**
- PD-DATA-002: Input Validation and Sanitization
- PD-TEST-001: Test Edge Cases

**Impact:**
Critical - 30% of user searches failed before fix. User-facing bug that directly impacted feature usability.

**Status:** ACTIVE

---

### PL-003: Stale Closure in Memoized Callback

**Discovered:** TASK-003, 2024-01-16
**Category:** Framework (React)

**Issue:**
Memoized callback captured old state value, causing incorrect behavior when state updated.

**Example Scenario:**
User clicks filter button, but filter uses old filter value from when callback was created, not current value.

**Root Cause:**
useCallback with empty dependency array captured initial state and never updated.

**Code Example:**
```javascript
// ❌ WRONG - Stale closure
const handleFilter = useCallback(() => {
  // filterValue is captured from initial render
  applyFilter(filterValue);
}, []); // Empty dependencies - callback never updates

// ✅ CORRECT - Include dependencies
const handleFilter = useCallback(() => {
  // filterValue always current
  applyFilter(filterValue);
}, [filterValue]); // Callback updates when filterValue changes

// ✅ ALTERNATIVE - Functional update pattern
const handleFilter = useCallback(() => {
  setFilteredResults(prev => {
    // Use prev state, don't need filterValue in closure
    return computeFiltered(prev);
  });
}, []); // Can use empty array with functional updates
```

**Solution:**
- Include all values from component scope in useCallback dependency array
- OR use functional update pattern (`setState(prev => ...)`) to avoid capturing state
- Enable ESLint `exhaustive-deps` rule

**Prevention:**
- Always list dependencies in useCallback/useMemo/useEffect
- Use ESLint to catch missing dependencies
- When in doubt, include the dependency (re-creating callbacks is cheap)

**Related Directives:**
- PD-REACT-002: Correct Dependency Arrays

**Impact:**
Medium - Feature worked on first interaction but failed on subsequent uses. Subtle bug that passed initial testing.

**Status:** ACTIVE

---

### PL-004: O(n²) Complexity in Comparison Function

**Discovered:** TASK-005, 2024-01-18
**Category:** Performance

**Issue:**
Nested loops for comparing items caused significant slowdown with larger datasets.

**Example Scenario:**
With 1000 items, comparison took 15 seconds. With 5000 items, browser froze.

**Root Cause:**
Used nested forEach loops (O(n²)) when Set-based lookup (O(n)) would work.

**Code Example:**
```javascript
// ❌ WRONG - O(n²) complexity
const duplicates = [];
items.forEach(item => {
  items.forEach(other => {
    if (item.id !== other.id && item.name === other.name) {
      duplicates.push(item);
    }
  });
});
// 1000 items = 1,000,000 comparisons

// ✅ CORRECT - O(n) with Set
const seen = new Set();
const duplicates = [];
items.forEach(item => {
  if (seen.has(item.name)) {
    duplicates.push(item);
  } else {
    seen.add(item.name);
  }
});
// 1000 items = 1000 operations
```

**Solution:**
Use appropriate data structure (Set/Map) for lookups instead of nested loops.

**Prevention:**
- Before writing nested loops, consider if Set/Map could replace inner loop
- Document time complexity for non-trivial operations
- Performance test with realistic data sizes
- Review PD-ALGO-001 and PD-ALGO-002 before implementing comparisons

**Related Directives:**
- PD-ALGO-001: Always Consider Time Complexity
- PD-ALGO-002: Optimize Data Structure Choice

**Impact:**
High - Performance degraded severely with realistic data. Required refactoring after initial implementation. Measured 200x improvement after fix (15s → 75ms).

**Status:** ACTIVE

---

## Consolidated Learnings

### CL-001: Input Sanitization Pattern

[When multiple similar learnings emerge, consolidate into a single pattern]

**Combines:** PL-002 (Case-sensitive), PL-008 (Special chars), PL-012 (Whitespace)

**Pattern:**
All user input for search/filter should follow this sanitization:

```javascript
function sanitizeSearchInput(input: string): string {
  return input
    .trim()                                          // Remove whitespace
    .toLowerCase()                                   // Normalize case
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');        // Escape regex special chars
}
```

**Use When:**
- Search functionality
- Filter inputs
- Any user text that will be used in comparisons

**Related:** PD-DATA-002

**Status:** ACTIVE

---

## Archived Learnings

[Move old learnings here when they're no longer relevant]

### PL-007: API Response Type Changed (ARCHIVED)

**Discovered:** TASK-010, 2024-01-20
**Category:** Bug
**Status:** ARCHIVED - API stabilized in v2

[Archive reason]: Original API issue was fixed in backend v2. No longer relevant after API upgrade.

[Keep minimal documentation of archived learnings for historical reference]

---

## Learning Statistics

**Total Active Learnings:** [X]
**By Category:**
- Performance: [X]
- Architecture: [X]
- Bug: [X]
- Security: [X]
- Framework: [X]
- Data: [X]

**Total Archived:** [X]

**Learning Rate:**
- Week 1: [X] new learnings
- Week 2: [X] new learnings  
- Week 3: [X] new learnings
[Decreasing trend = quality improving]

**High-Impact Learnings:**
[List learnings with "High" or "Critical" impact for priority review]

---

## Learning Review Schedule

### Monthly Review
- [ ] Consolidate similar learnings
- [ ] Archive obsolete learnings
- [ ] Update related directives in performance-directives.md
- [ ] Share learnings in team meeting

### Quarterly Review
- [ ] Analyze patterns across learnings
- [ ] Update framework if systemic issues found
- [ ] Create project-specific directives from learnings
- [ ] Celebrate decreasing learning rate (improving quality)

---

## Contributing New Learnings

### When to Add:
- ✅ Bug discovered during implementation
- ✅ Performance issue identified
- ✅ Architecture insight from refactoring
- ✅ Framework gotcha that wasted time
- ✅ Security vulnerability found

### When NOT to Add:
- ❌ Normal feature work
- ❌ Product requirement changes
- ❌ Design/UX iterations
- ❌ Expected behavior of libraries
- ❌ Things documented in official docs

### Process:
1. Use template above
2. Assign next PL-XXX number
3. Add to "Active Learnings" section
4. Update learning statistics
5. Reference in code where relevant
6. Add to claude.md if impacts future work

---

**This file is a living document. It should grow with your project and reflect the actual technical challenges you encounter.**

**Next PL Number:** PL-005

**Last Updated:** [Date]
