# Performance & Quality Directives

**Auto-apply these rules in all code. No discussion needed.**

---

## Algorithmic Efficiency

### PD-ALGO-001: Time Complexity Targets
**Rule:** O(n log n) maximum for user-facing operations
**When:** Loops, sorting, searching, filtering on user data
**Apply:** Use appropriate data structures (Map, Set, binary search)

### PD-ALGO-002: Memoization Required
**Rule:** Cache expensive calculations
**When:** Pure functions with repeated calls, derived state, recursive calculations
**Apply:** useMemo (React), @lru_cache (Python), manual memoization

### PD-ALGO-003: Debounce User Input
**Rule:** Debounce 300-500ms for input handlers
**When:** Search-as-you-type, autocomplete, live validation
**Apply:** Lodash debounce, React useDebounce, language-specific utilities

---

## Memory Management

### PD-MEM-001: Cleanup Required
**Rule:** Remove listeners, timers, subscriptions on cleanup
**When:** Event listeners, setInterval, WebSocket, observers
**Apply:** useEffect cleanup (React), destructor patterns, finally blocks

### PD-MEM-002: Lazy Loading
**Rule:** Load non-critical resources on demand
**When:** Images below fold, route components, large libraries
**Apply:** React.lazy, dynamic imports, intersection observer

### PD-MEM-003: Virtualization for Long Lists
**Rule:** Virtualize lists >100 items
**When:** Data tables, infinite scroll, large dropdowns
**Apply:** react-window, virtual-scroller, pagination

---

## Data Handling

### PD-DATA-001: Immutable Updates
**Rule:** Never mutate state directly
**When:** React state, Redux, any state management
**Apply:** Spread operators, map/filter/reduce, immutable libraries

### PD-DATA-002: Normalize Nested Data
**Rule:** Flatten nested structures for lookups
**When:** Lists with nested objects, relational data from API
**Apply:** Normalizr, manual ID-based maps, database patterns

### PD-DATA-003: Pagination Server-Side
**Rule:** Never load entire dataset client-side
**When:** >1000 records possible, user-generated content
**Apply:** Cursor-based pagination, offset/limit, infinite scroll

---

## User Input & Interaction

### PD-INPUT-001: Optimistic UI Updates
**Rule:** Update UI immediately, rollback on error
**When:** Mutations (create, update, delete), favoriting, voting
**Apply:** Optimistic response, local state + API sync, error boundaries

### PD-INPUT-002: Loading States Always
**Rule:** Show loading indicator for >200ms operations
**When:** API calls, file uploads, heavy computations
**Apply:** Skeleton screens, spinners, progress bars

### PD-INPUT-003: Validation Client + Server
**Rule:** Validate on both sides
**When:** All user input (forms, API endpoints)
**Apply:** Client for UX, server for security, shared validation logic if possible

---

## Framework-Specific: React

### PD-REACT-001: Key Prop in Lists
**Rule:** Use stable, unique keys (not index)
**When:** .map() rendering lists
**Apply:** ID from data, composite keys, uuid for client-generated items

### PD-REACT-002: Dependency Arrays Correct
**Rule:** Include all dependencies in useEffect/useMemo/useCallback
**When:** Using hooks
**Apply:** ESLint exhaustive-deps rule, manual verification

### PD-REACT-003: Component Composition
**Rule:** Split components <300 lines, functions <50 lines
**When:** Any component/function growing large
**Apply:** Extract child components, custom hooks, utility functions

---

## Framework-Specific: Python

### PD-PYTHON-001: List Comprehensions
**Rule:** Use comprehensions over loops for transformations
**When:** map/filter operations, creating lists
**Apply:** `[x for x in items if condition]` instead of loop + append

### PD-PYTHON-002: Context Managers
**Rule:** Use `with` for resource management
**When:** Files, database connections, locks
**Apply:** `with open() as f:`, custom context managers

### PD-PYTHON-003: Generator Expressions
**Rule:** Use generators for large sequences
**When:** One-time iteration, memory constraints
**Apply:** `(x for x in items)` instead of `[x for x in items]`

---

## Accessibility (WCAG 2.1 AA Minimum)

### PD-A11Y-001: Semantic HTML
**Rule:** Use correct HTML elements
**When:** All markup
**Apply:** `<button>` not `<div onclick>`, `<nav>`, `<main>`, `<header>`

### PD-A11Y-002: Keyboard Navigation
**Rule:** All interactive elements keyboard accessible
**When:** Buttons, links, forms, modals, dropdowns
**Apply:** Tab order, Enter/Space handlers, Escape to close, focus management

### PD-A11Y-003: ARIA Labels
**Rule:** Label all interactive elements without visible text
**When:** Icon buttons, close buttons, status indicators
**Apply:** aria-label, aria-labelledby, aria-describedby

### PD-A11Y-004: Color Contrast
**Rule:** 4.5:1 minimum for text, 3:1 for large text
**When:** All text, icons, focus indicators
**Apply:** Check with contrast checker, use design system tokens

---

## Error Handling

### PD-ERROR-001: Try/Catch Async
**Rule:** Wrap all async operations in try/catch
**When:** API calls, file operations, async functions
**Apply:** try/catch blocks, .catch() on promises, error boundaries (React)

### PD-ERROR-002: User-Friendly Messages
**Rule:** Show actionable error messages
**When:** Errors shown to users
**Apply:** "Email already registered. Try logging in?" not "Error 409"

### PD-ERROR-003: Logging for Debug
**Rule:** Log errors with context
**When:** All error handlers
**Apply:** Error tracking service (Sentry), structured logs, include user action context

---

## Code Organization

### PD-ORG-001: File Size Limits
**Rule:** Max 300 lines per file
**When:** Any file growing large
**Apply:** Split by concern, extract utilities, create submodules

### PD-ORG-002: Single Responsibility
**Rule:** One function, one purpose
**When:** Writing/refactoring functions
**Apply:** If function name has "and", split it

### PD-ORG-003: Named Exports
**Rule:** Prefer named exports over default
**When:** Exporting functions, components, constants
**Apply:** `export function foo()` not `export default foo`

---

## Testing & Verification

### PD-TEST-001: Testable Code
**Rule:** Write code that can be tested
**When:** All business logic, utility functions
**Apply:** Pure functions, dependency injection, avoid tight coupling

### PD-TEST-002: Edge Cases in Tests
**Rule:** Test edge cases discovered in behavioral spec
**When:** Writing tests
**Apply:** Empty arrays, null values, boundary conditions, error states

---

## Security

### PD-SEC-001: Input Sanitization
**Rule:** Sanitize all user input
**When:** Displaying user content, SQL queries, shell commands
**Apply:** Parameterized queries, escape HTML, validation libraries

### PD-SEC-002: Secrets Never Hardcoded
**Rule:** No API keys, tokens, passwords in code
**When:** All secret values
**Apply:** Environment variables, secret management services, .gitignore

---

## Performance Measurement

### PD-PERF-001: Measure Before Optimizing
**Rule:** Profile before performance optimization
**When:** Considering optimization beyond directives
**Apply:** Browser DevTools, performance.now(), profilers

### PD-PERF-002: Bundle Size Monitoring
**Rule:** Track bundle size, lazy load large dependencies
**When:** Adding libraries >50KB
**Apply:** Bundle analyzer, code splitting, tree shaking

---

## Language-Specific Additions

### TypeScript/JavaScript

**PD-TS-001:** Strict mode enabled
**PD-TS-002:** Avoid `any` type, use `unknown` if needed
**PD-TS-003:** Destructure props/params for clarity

### Python

**PD-PY-001:** Type hints on function signatures
**PD-PY-002:** F-strings for string interpolation
**PD-PY-003:** Virtual environment always

### Go

**PD-GO-001:** Error handling explicit (check all errors)
**PD-GO-002:** Defer for cleanup
**PD-GO-003:** Goroutines with proper cancellation

### Rust

**PD-RUST-001:** Use Result/Option, no panics in library code
**PD-RUST-002:** Ownership clear, minimize clones
**PD-RUST-003:** Clippy warnings addressed

---

## Application Rules

### When to Apply

**Always:** All directives relevant to your language/framework

**Without Asking:** Apply automatically, no "should I optimize?" questions

**Document if Unusual:** If NOT following a directive for good reason, comment why

### Priority Levels

**Tier 1 (Non-Negotiable):**
- Security directives (PD-SEC)
- Accessibility directives (PD-A11Y)
- Error handling (PD-ERROR)

**Tier 2 (Default):**
- Algorithmic efficiency (PD-ALGO)
- Memory management (PD-MEM)
- Data handling (PD-DATA)

**Tier 3 (Context-Dependent):**
- Performance measurement (PD-PERF) - only when needed
- Bundle size (for web apps)
- Specific optimizations beyond defaults

### When NOT to Apply

**Prototyping:** If explicitly prototyping, relax ORG and TEST
**Performance Not Critical:** For internal tools, relax PERF (but keep A11Y, SEC, ERROR)
**Framework Differs:** If framework has different conventions, adapt (but same principle)

---

## Self-Review Checklist

Before presenting code, verify:

**Functionality:**
□ Meets behavioral spec
□ Handles edge cases
□ Error states graceful

**Performance:**
□ Time complexity acceptable
□ No memory leaks (cleanup present)
□ Debouncing/throttling where needed
□ Lazy loading if appropriate

**Accessibility:**
□ Keyboard navigation works
□ ARIA labels present
□ Semantic HTML used
□ Contrast acceptable

**Code Quality:**
□ File <300 lines
□ Functions <50 lines
□ Single responsibility
□ Self-documenting names

**Security:**
□ Input sanitized
□ No hardcoded secrets
□ SQL parameterized if applicable

**Testing:**
□ Can be unit tested
□ Edge cases testable
□ Dependencies injectable

If any □ unchecked, fix before presenting.

---

## Expansion

Add project-specific directives to project.md:

```markdown
## Custom Directives

### PD-CUSTOM-001: [Project-specific rule]
**Rule:** [What to do]
**When:** [Trigger]
**Apply:** [How]
```

Examples:
- API response caching strategy
- Specific design system usage
- Custom logging format
- Team code conventions

---

## Philosophy

> "Quality is not negotiable. These directives ensure every line of code meets professional standards automatically."

**Apply without discussion. Self-review before presenting. Ship quality by default.**

---

**Version:** 2.0
**Last Updated:** 2025-10-02
**Directives:** 30 core + framework-specific additions
