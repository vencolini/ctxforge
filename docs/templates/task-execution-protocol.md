# Task Execution Protocol

**Purpose:** Standard process for LLMs to execute atomic development tasks with quality and context preservation.

**Usage:** LLM reads this before implementing each task.

---

## Task Execution Checklist

For every task, follow this exact sequence:

```
☐ 1. Load Context
☐ 2. Pre-Implementation Verification
☐ 3. Implementation
☐ 4. Self-Review
☐ 5. Create State Snapshot
☐ 6. Update claude.md
☐ 7. Checkpoint for Next Task
```

---

## STEP 1: Load Context

### What to Load

```markdown
## EXECUTING TASK-XXX: [Task Name]

### Context Loading Checklist:
- [ ] Read claude.md "Performance Directives" section
- [ ] Read claude.md "Current Feature" behavioral spec
- [ ] Check "Project Learnings" for relevant pitfalls
- [ ] Load previous task's state snapshot (if applicable)
- [ ] Review this task's requirements from claude.md
- [ ] Note any dependencies from previous tasks
```

### Confirm Context Loaded

```markdown
### Context Loaded Successfully ✅

**Performance Directives:** Loaded [X] directives applicable to this task
**Behavioral Spec:** [Feature Name] - [One-sentence goal]
**Project Learnings:** Found [Y] relevant patterns to avoid:
  - PL-XXX: [Name] - [How I'll avoid it]
  - PL-YYY: [Name] - [How I'll avoid it]
**Previous State:** [Snapshot filename or "N/A - first task"]
**Dependencies:** [List interfaces/components from previous work]

Context is complete. Ready for pre-implementation verification.
```

---

## STEP 2: Pre-Implementation Verification

### Verify Understanding

```markdown
### Pre-Implementation Verification

#### Behavioral Goal (In My Words):
[Restate what user will be able to do after this task completes]

**Example:**
"After this task, users will be able to type in the search box and see 
the product list below filter to matching products in real-time."

#### Technical Approach:
I will implement using these techniques:

1. **[Technique/Pattern 1]**
   - **Why:** [Reasoning related to directives or requirements]
   - **Directive:** [Reference PD-XXX if applicable]
   
2. **[Technique/Pattern 2]**
   - **Why:** [Reasoning]
   - **Directive:** [Reference PD-XXX if applicable]

**Example:**
1. **Custom React Hook (useSearch)**
   - **Why:** Separates search logic from UI (PD-ORG-001: Single Responsibility)
   - **Directive:** PD-REACT-001 (Will use useMemo for filtering)

2. **Debounced Input Handler**
   - **Why:** Prevent excessive filtering during typing
   - **Directive:** PD-INPUT-001 (300ms standard debounce)

#### Performance Strategy:

**Algorithm Complexity:**
- [Operation name]: O([complexity])
- **Justification:** [Why this complexity is acceptable]

**Optimization Techniques:**
- [Technique 1]: [Which directive - PD-XXX]
- [Technique 2]: [Which directive - PD-XXX]

**Performance Target:**
- [Specific target if defined, e.g., "< 1 second response"]

**Example:**
- Filter operation: O(n) - linear search through products
- **Justification:** 5000 items × 50ms = acceptable for user expectation
- **Memoization:** Using React useMemo (PD-REACT-001)
- **Target:** Results in < 1 second (from behavioral spec)

#### Avoiding Known Pitfalls:

For each relevant Project Learning:

**PL-XXX: [Issue Name]**
- **How I'll avoid:** [Specific technique or check]

**Example:**
**PL-001: Debounce Timer Memory Leak**
- **How I'll avoid:** Return cleanup function in useEffect (PD-MEM-001)

**PL-003: Case-Sensitive Search Bug**
- **How I'll avoid:** Use toLowerCase() on both search term and data (PD-DATA-001)

#### Success Indicators:

This task succeeds when:
- [ ] [Testable outcome 1]
- [ ] [Testable outcome 2]
- [ ] [Performance requirement met]

**Example:**
- [ ] User types "laptop" and sees only laptop products
- [ ] Typing 3+ characters triggers search
- [ ] Response time < 1 second with 5000 products

---

⚠️ CHECKPOINT (Optional): If uncertain about approach, confirm with human before proceeding.
Otherwise, proceed to implementation.
```

---

## STEP 3: Implementation

### Implementation Guidelines

**Write Clean Code:**
- Follow project naming conventions from claude.md
- Reference directive numbers in comments
- Document complexity for non-trivial algorithms
- Handle edge cases explicitly
- Include error handling

**Code Comment Template:**

```javascript
/**
 * [Function/Component Name]
 * 
 * Implements: TASK-XXX - [Task Name]
 * Behavioral Goal: [What user can do]
 * Performance: O([complexity]) for [operation]
 */

// [Implementation with inline directive references]

// PD-REACT-001: Memoizing expensive filter operation
const filteredResults = useMemo(() => {
  // O(n) filter - acceptable for 5K items
  return items.filter(item => /* condition */);
}, [items, /* dependencies */]);

// PL-005: Cleanup to avoid memory leak
useEffect(() => {
  const handler = debounce(callback, 300);
  
  return () => handler.cancel(); // Prevent memory leak
}, [callback]);
```

### Edge Cases to Handle

**Always consider:**
- [ ] Empty input/data
- [ ] Null/undefined values
- [ ] Maximum size/length limits
- [ ] Invalid input
- [ ] Concurrent operations
- [ ] Error conditions

**Document edge case handling:**

```javascript
// Edge case: Empty search term
if (!searchTerm || searchTerm.length < 3) {
  return allItems; // Show everything (from behavioral spec)
}

// Edge case: Special characters (PD-DATA-002: sanitize input)
const sanitized = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Edge case: No results
if (filtered.length === 0) {
  return []; // Empty state handled by UI component
}
```

---

## STEP 4: Self-Review

### Comprehensive Self-Review Checklist

```markdown
## SELF-REVIEW: TASK-XXX

### Code Quality ✅
- [ ] Follows project naming conventions
- [ ] No magic numbers (constants defined)
- [ ] No TODO/FIXME comments left
- [ ] TypeScript strict mode passing (if applicable)
- [ ] No unused variables or imports
- [ ] Comments explain "why" not "what"

### Performance Directives Applied ✅
- [ ] PD-ALGO-001: Time complexity documented and acceptable
- [ ] PD-MEM-001: All side effects have cleanup
- [ ] PD-DATA-001: Immutable operations used
- [ ] [Other relevant directives checked]

### Project Learnings Avoided ✅
- [ ] PL-XXX: [Confirmed not present]
- [ ] PL-YYY: [Confirmed not present]
- [ ] [All relevant learnings checked]

### Accessibility (if UI) ✅
- [ ] PD-A11Y-001: Semantic HTML used
- [ ] PD-A11Y-002: Keyboard navigation works
- [ ] PD-A11Y-003: ARIA labels where needed
- [ ] PD-A11Y-004: Focus indicators visible

### Edge Cases Handled ✅
- [ ] Empty input/data
- [ ] Null/undefined values
- [ ] Invalid input
- [ ] Error conditions
- [ ] [Feature-specific edge cases]

### Error Handling ✅
- [ ] PD-ERROR-001: Failures are explicit
- [ ] PD-ERROR-002: Assertions in dev mode
- [ ] PD-ERROR-003: User-friendly messages
- [ ] Try-catch blocks where appropriate

### What I Implemented:

✅ **[Component/Function 1]:** [Purpose and key features]
   - File: `path/to/file.ext`
   - Exports: [What it exports]
   - Dependencies: [What it imports]

✅ **[Component/Function 2]:** [Purpose and key features]
   - File: `path/to/file.ext`
   - Exports: [What it exports]

**Example:**
✅ **useSearch Hook:** Custom hook for product search filtering
   - File: `src/hooks/useSearch.ts`
   - Exports: `useSearch(products, searchTerm)`
   - Returns: `{results, isSearching}`
   - Performance: O(n) filter with memoization

✅ **filterProducts Utility:** Core filter algorithm
   - File: `src/utils/filterProducts.ts`
   - Exports: `filterProducts(items, term)`
   - Logic: Case-insensitive substring match

### What I Did NOT Implement (Intentionally):

❌ **[Feature X]:** Out of scope for this task
   - Reason: Will be implemented in TASK-YYY
   
❌ **[Optimization Y]:** Not needed yet
   - Reason: Current performance meets requirement
   - Note: May add if metrics show need

**Example:**
❌ **Search History:** Out of scope
   - Reason: Separate feature (not in current spec)

❌ **Pagination:** Not needed yet
   - Reason: Scrollable list performs well with current data size
   - Note: Will add if dataset grows significantly

### Deviations from Original Plan:

[If you changed approach during implementation]

⚠️ **Changed [X] to [Y]**
   - **Reason:** [Technical reason discovered during implementation]
   - **Impact:** [What this affects]
   - **Benefit:** [Why this is better]

**Example:**
⚠️ **Changed from useEffect to useMemo for filtering**
   - **Reason:** Filtering is synchronous, no side effect needed
   - **Impact:** Simpler code, no cleanup needed
   - **Benefit:** Better performance, follows React best practices

### Performance Analysis:

**Measured/Estimated:**
- [Operation]: O([complexity]) - [timing if measured]
- [Comparison to requirement]: [Met/Exceeded/Within range]

**Example:**
- Filter operation: O(n) - measured 45ms for 5000 items
- Target: < 1 second (from behavioral spec)
- Result: ✅ Exceeds requirement by 20x

### New Issues Discovered:

[If you found bugs or technical problems during implementation]

**Issue:** [Description of problem]
**Severity:** [Low/Medium/High/Critical]
**Status:** [Fixed in this task / Needs separate task / Document as PL-XXX]

**Example:**
**Issue:** Special characters in search break regex
**Severity:** Medium
**Status:** Fixed - added input sanitization
**Note:** Will document as PL-XXX for future reference
```

---

## STEP 5: Create State Snapshot

### State Snapshot Template

Save this to: `docs/context/state-snapshots/snapshot-after-task-XXX.md`

```markdown
## STATE SNAPSHOT: After TASK-XXX

**Date:** [Date]
**Task Completed:** TASK-XXX - [Task Name]
**Feature:** [Feature Name]

---

### Changes Made in This Task

**Created Files:**
- `path/to/file1.ext` - [Purpose]
- `path/to/file2.ext` - [Purpose]

**Modified Files:**
- `path/to/existing.ext` - [What changed]

**Deleted Files:**
- [If any files removed]

---

### Interfaces for Next Task (Minimal Context)

[Only include what next task NEEDS to know - interfaces, not implementations]

#### Type Definitions

```typescript
// Only types/interfaces, not full implementations
type DataType = {
  field1: string;
  field2: number;
};

interface ComponentProps {
  prop1: string;
  prop2: () => void;
}
```

#### Available Functions/Hooks

**Function/Hook Name:** `functionName(params): ReturnType`
**Purpose:** [Brief description]
**Usage Example:**
```javascript
const result = functionName(arg1, arg2);
```

**Example:**
**useSearch Hook:** `useSearch(products: Product[], term: string)`
**Purpose:** Filters products based on search term with debouncing
**Returns:** `{ results: Product[], isSearching: boolean }`
**Usage:**
```javascript
const { results, isSearching } = useSearch(allProducts, searchTerm);
```

#### Component APIs

**Component:** `<ComponentName />`
**Props:**
```typescript
{
  prop1: string;
  prop2: () => void;
}
```
**Purpose:** [What it does]

---

### What Next Task Can Assume

[Assumptions next task can safely make]

**Example:**
- useSearch hook works correctly with up to 10K products
- Filtering is case-insensitive
- Debouncing is 300ms
- Search requires minimum 3 characters (enforced in hook)
- Returns empty array when no matches (not null)

---

### What Next Task Should Know

[Important context that affects next implementation]

**Example:**
- SearchInput component will need to manage searchTerm state itself
- SearchInput should call useSearch with products + searchTerm
- isSearching flag available for loading indicator
- Error handling not in hook (component responsibility)

---

### Discarded Details (No Longer Needed)

[Implementation details that future tasks don't need]

**Example:**
- Internal debouncing implementation (abstracted in hook)
- Specific memoization approach (internal detail)
- Filter algorithm internals (encapsulated in utility)
- Early prototypes and alternatives considered

---

### Architecture Impact

[How this changes the overall system structure]

**Example:**
**Added:**
- /hooks/useSearch.ts - New custom hook
- /utils/filterProducts.ts - New utility

**Pattern Established:**
- Search logic separated from UI
- Hooks for stateful logic, utils for pure functions

**No Changes:**
- Component structure remains the same
- State management approach unchanged

---

### Known Issues Carried Forward

[Any issues discovered but not fixed yet]

**Example:**
- [ ] Special character handling could be more robust
      - Priority: Low
      - Plan: Address if users report issues

---

### Performance Notes

[Performance characteristics to remember]

**Example:**
- Current filter: O(n) with 5K items = 45ms
- Acceptable up to ~20K items before optimization needed
- Memoization prevents re-filtering on unrelated state changes

---

### For Next Task:

**Next Task:** TASK-YYY - [Name]
**Will Need:**
- useSearch hook (interface above)
- Product type definition
- [Other specific needs]

**Should Start By:**
- [Suggestion for next step]

**Example:**
**Next Task:** TASK-002 - Search Input Component
**Will Need:**
- useSearch hook for filtering logic
- Debounce cleanup pattern (see PL-001)
**Should Start By:**
- Creating SearchInput component
- Managing searchTerm state locally
- Calling useSearch with managed state
```

---

## STEP 6: Update claude.md

### What to Update

```markdown
## Updates to claude.md

### 1. Task Status Update

**Change:**
- TASK-XXX: TODO/IN_PROGRESS → ✅ DONE

**Location:** Task Breakdown section

---

### 2. Context Compression Log Entry

**Add to Context Compression Log section:**

```markdown
### After TASK-XXX Completion ([Date])

**State Changes:**
- [Brief summary of what was added/modified]

**Carry Forward to Next Task:**
- [Interface] [Minimal description]
- [Another interface]

**Discarded:**
- [Implementation details no longer needed]

**Updated Files:**
- `path/to/file` - [Change summary]
```

**Example:**
```markdown
### After TASK-001 Completion (2024-01-15)

**State Changes:**
- Created useSearch hook for product filtering
- Added filterProducts utility
- Established search logic pattern

**Carry Forward:**
- useSearch(products, term) → {results, isSearching}
- Product type definition
- 3-character minimum requirement

**Discarded:**
- Internal debouncing implementation details
- Alternative filtering approaches explored

**Updated Files:**
- `src/hooks/useSearch.ts` (created)
- `src/utils/filterProducts.ts` (created)
- `src/types/Product.ts` (updated with search-related types)
```

---

### 3. New Project Learning (If Discovered)

**If you found a technical issue, add to Project Learnings section:**

```markdown
### PL-XXX: [Issue Name]
**Discovered:** TASK-XXX, [Date]
**Issue:** [Technical problem]
**Root Cause:** [Why it happened]
**Solution:** [How we fixed it]
**Prevention:** [How to avoid in future]
**Category:** [Performance/Architecture/Bug/Security]

**Code Example:**
[Bad code vs Good code]
```

**Example:**
```markdown
### PL-004: Special Characters Breaking Regex Search
**Discovered:** TASK-001, 2024-01-15
**Issue:** Search crashed when user typed special regex characters like $ ( ) [ ]
**Root Cause:** Direct string interpolation into RegExp without escaping
**Solution:** Escape special characters before creating regex pattern
**Prevention:** Always sanitize user input (PD-DATA-002)
**Category:** Bug

**Code Example:**
```javascript
// ❌ WRONG - Crashes on special chars
const pattern = new RegExp(searchTerm);

// ✅ CORRECT - Escapes special characters
const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = new RegExp(escaped);
```
```

---

### 4. Architecture Update (If Major Change)

**If this task added significant components, update Architecture Overview:**

```markdown
### Updated System Structure:

```
App
├─ Header
├─ SearchFeature  [NEW]
│  ├─ SearchInput [ADDED IN TASK-002]
│  └─ ProductList [ADDED IN TASK-003]
└─ Footer
```

**New Patterns:**
- Search logic in custom hooks
- UI components consume hooks
```

---

## STEP 7: Checkpoint for Next Task

### Confirm Completion

```markdown
## TASK-XXX COMPLETE ✅

### Summary:
**Implemented:**
- [Brief bullet list of what was built]

**Performance:**
- [Key metric if measured]

**Files Changed:**
- [Count] files created
- [Count] files modified

**Context Preserved:**
- State snapshot created: `snapshot-after-task-XXX.md`
- claude.md updated with compressed state
- [X] project learnings added

**Quality Checks:**
- ✅ All directives applied
- ✅ All project learnings avoided
- ✅ Self-review complete
- ✅ Edge cases handled

---

### Ready for Next Step:

**Option 1: Continue to TASK-YYY**
- Next task is ready to start
- Context is in place

**Option 2: Review First**
- Human can review this task
- Then approve next task

**Option 3: Adjust Current Task**
- If issues found in review
- Can iterate before proceeding

Which would you prefer?
```

---

## Special Cases

### When Task Takes Longer Than Expected

```markdown
⚠️ Task Complexity Notice

This task is larger than initially estimated.

**Options:**
1. **Continue:** Complete full task (will take longer)
2. **Split:** Break into sub-tasks (TASK-XXX-A, TASK-XXX-B)
3. **Simplify:** Reduce scope, add remaining to new task

**Recommendation:** [Your recommendation with reasoning]

How should I proceed?
```

### When You Discover Task Dependencies

```markdown
⚠️ Dependency Discovered

TASK-XXX requires [something not yet built].

**Options:**
1. **Pause:** Stop this task, build dependency first
2. **Mock:** Create temporary mock, replace later
3. **Adjust:** Modify task to work without dependency

**Recommendation:** [Your recommendation with reasoning]

Should I proceed or adjust?
```

### When You Find Bugs in Previous Tasks

```markdown
🐛 Issue Found in Previous Task

**Problem:** [Description of bug]
**Location:** TASK-YYY [file/component]
**Severity:** [Low/Medium/High/Critical]

**Options:**
1. **Fix Now:** Correct immediately, update previous state
2. **Document:** Add to Known Issues, fix in separate task
3. **Workaround:** Implement workaround in current task

**Recommendation:** [Based on severity]

How should I handle this?
```

---

## Quality Checklist Summary

Before marking any task complete, verify:

```markdown
### Final Quality Gate

- [ ] Behavioral goal achieved (testable)
- [ ] All performance directives applied
- [ ] All project learnings checked and avoided
- [ ] Self-review checklist completed
- [ ] State snapshot created and saved
- [ ] claude.md updated with status and compression log
- [ ] Code comments reference directive/learning numbers
- [ ] No TODOs or placeholders in code
- [ ] Edge cases explicitly handled
- [ ] Error handling present
- [ ] Accessibility requirements met (if UI)
- [ ] Can confidently proceed to next task

**Only mark COMPLETE when ALL items checked.**
```

---

**This protocol ensures consistent quality and context preservation across all tasks.**

**Last Updated:** [Date]
