# Project: [Project Name]

## Meta Information
- **Created:** [Date]
- **Last Updated:** [Date]
- **Framework/Stack:** [Technology stack]
- **LLM Coder:** [Which LLM - Claude/Gemini/etc.]
- **Context Engineering Version:** 1.0

---

## 🎯 Project Vision

[One-sentence description of what this project does and who it's for]

Example: "A task management app for freelancers to track billable hours and generate client invoices"

---

## 🏗️ Performance & Code Quality Directives

### FOUNDATIONAL PRINCIPLES (Always Applied)

**Algorithmic Efficiency:**
- All algorithms must consider Big O complexity (PD-ALGO-001)
- Target: O(n log n) or better for operations on user data
- O(n²) acceptable only for small datasets (<100 items) with justification
- Document time/space complexity for non-trivial functions

**Memory Management:**
- Clean up all side effects: timers, listeners, subscriptions (PD-MEM-001)
- Avoid memory leaks from closures (PD-MEM-002)
- Minimize object creation in loops (PD-MEM-003)

**Data Handling:**
- Immutability by default (PD-DATA-001)
- Validate and sanitize all external input (PD-DATA-002)
- Handle null/undefined explicitly (PD-DATA-003)
- Debounce user input handlers (PD-INPUT-001)

**Error Handling:**
- Fail fast, fail explicitly (PD-ERROR-001)
- Assert invariants in development (PD-ERROR-002)
- User-friendly error messages (PD-ERROR-003)

**Code Organization:**
- Single Responsibility Principle (PD-ORG-001)
- DRY - Don't Repeat Yourself (PD-ORG-002)
- Intention-revealing names (PD-ORG-003)

**Accessibility (Non-Negotiable):**
- WCAG 2.1 AA minimum compliance
- Semantic HTML first (PD-A11Y-001)
- Keyboard navigation for all interactive elements (PD-A11Y-002)
- ARIA labels where semantic HTML insufficient (PD-A11Y-003)
- Focus indicators always visible (PD-A11Y-004)

### [FRAMEWORK-SPECIFIC DIRECTIVES]

**React Best Practices:**
- Memoize expensive computations (useMemo, useCallback) (PD-REACT-001)
- Correct dependency arrays in hooks (PD-REACT-002)
- Prevent unnecessary re-renders (React.memo) (PD-REACT-003)

[Adjust based on your tech stack - add Python/Django/Vue/etc. specific directives]

### PROJECT-SPECIFIC DIRECTIVES

[Add project-specific performance rules as you discover patterns]

**Example:**
```markdown
### PD-PROJECT-001: [Directive Name]
**Rule:** [Specific rule for this project]
**Reasoning:** [Why this is needed]
**Applies to:** [When/where]
```

### PERFORMANCE MEASUREMENT PROTOCOL
1. Build with best practices first (following directives above)
2. Measure actual performance in realistic scenarios
3. Optimize only if measurements reveal issues
4. Document optimization decisions in Project Learnings

**No premature optimization - but also no ignorance of fundamentals.**

---

## 📐 Architecture Overview

### Current System Structure

```
[Component/module tree - update as system evolves]

Example:
App
├─ Header
│  ├─ Navigation
│  └─ UserMenu
├─ MainContent
│  └─ [Feature components as they're added]
└─ Footer
```

### Data Flow Patterns

```
[How data moves through the system]

Example:
User Input → Event Handler → State Update → Re-render
API Call → Response → Transform → Cache → Display
```

### State Management Approach

- **Local State:** [When to use component state]
- **Global State:** [When to use context/redux/etc.]
- **Server State:** [How API data is managed]
- **Current Decision:** [What you're using now]

**Examples:**
- "Using React useState for component-specific data"
- "Using Context API for user authentication state"
- "No external state library needed yet"

### Key Patterns & Conventions

[Patterns that emerge as you build]

**Example:**
- "All async operations follow: loading → success/error pattern"
- "Form components use: value, onChange, onBlur validation pattern"

---

## 🔧 Development Context

### Environment

**Runtime:**
- [Language version: Node 20, Python 3.11, etc.]
- [Runtime specifics: browser targets, mobile OS versions]

**Development Tools:**
- Package Manager: [npm, yarn, pnpm, pip, etc.]
- Build Tool: [Vite, Webpack, etc.]
- Linter: [ESLint, Pylint, etc.]
- Formatter: [Prettier, Black, etc.]

**Deployment:**
- Platform: [Vercel, AWS, Heroku, etc.]
- CI/CD: [GitHub Actions, etc.]

### Project Structure

```
/project-root
├─ /src
│  ├─ /components    - Reusable UI components
│  ├─ /features      - Feature-specific components
│  ├─ /hooks         - Custom React hooks (or equivalent)
│  ├─ /utils         - Pure utility functions
│  ├─ /types         - Type definitions
│  ├─ /styles        - Global styles
│  └─ /api           - API integration layer
├─ /docs
│  └─ /context       - This file and context engineering docs
└─ /tests            - Test files

[Adjust structure for your project type]
```

### Dependencies

**Production Dependencies:**
```
[List key libraries with versions]

Example:
- react@18.2.0
- react-router-dom@6.x
- [other critical dependencies]
```

**Development Dependencies:**
```
[List dev tools]

Example:
- typescript@5.x
- vite@4.x
- eslint@8.x
```

**Forbidden Dependencies:**
```
[Libraries not to use and why]

Example:
- moment.js - Use date-fns instead (smaller bundle)
- lodash (full) - Import specific functions only
```

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (SearchInput.tsx)
- Hooks: `camelCase.ts` (useSearch.ts)
- Utils: `camelCase.ts` (formatDate.ts)
- Types: `PascalCase.ts` (UserType.ts)

**Code:**
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Components: `PascalCase`
- Functions: `camelCase`
- Types/Interfaces: `PascalCase`

**CSS:**
- Classes: `kebab-case` or Tailwind utilities
- IDs: `kebab-case`

[Adjust for your language/framework conventions]

---

## 🎭 Current Feature: [Feature Name]

[This section is populated when working on a feature]

### Behavioral Specification

[Link to detailed spec: docs/context/behavioral-specs/[feature-name].md]

**Quick Summary:**
[One-sentence description of what users can do]

**Key User Scenarios:**
```gherkin
SCENARIO: [Main scenario name]
  GIVEN [context]
  WHEN [action]
  THEN [result]
```

### LLM Technical Inferences (APPROVED)

[List approved technical approaches for this feature]

**Example:**
- [INFER] Client-side filtering (5K items manageable)
- [INFER] Debouncing with 300ms delay
- [INFER] O(n) filter complexity acceptable

### Success Criteria

✅ [Measurable outcome 1]
✅ [Measurable outcome 2]
✅ [Measurable outcome 3]

---

## 📋 Task Breakdown

### Active Tasks

#### TASK-001: [Task Name]
**Status:** [TODO | IN_PROGRESS | DONE | BLOCKED]
**Behavioral Goal:** [What user can do after this task]

**Technical Scope:**
- [Component/function to build]
- [Another component/function]

**Dependencies:**
- [Previous task or external dependency]

**Completion Criteria:**
- [ ] [Testable outcome 1]
- [ ] [Testable outcome 2]

**Estimated Complexity:** [Simple | Medium | Complex]

---

#### TASK-002: [Next Task Name]
[Same structure...]

---

### Execution Order
Task-001 → Task-002 → Task-003 → [etc.]

---

## 🧠 Project Learnings (Technical Pitfalls Only)

[Technical issues discovered during development]

### PL-001: [Issue Name]
**Discovered:** [Task, Date]
**Issue:** [Technical problem that occurred]
**Root Cause:** [Why it happened - technical reason]
**Solution:** [How we fixed it]
**Prevention:** [How to avoid in future tasks]
**Category:** [Performance | Architecture | Bug | Security]

**Code Example:**
```javascript
// ❌ WRONG - [what caused the issue]
[bad code]

// ✅ CORRECT - [how to do it right]
[good code]
```

---

### Learning Criteria

**Include these types of learnings:**
✅ Technical mistakes (bugs, crashes, performance issues)
✅ Architectural decisions and their consequences
✅ Framework/library gotchas specific to this project
✅ Security vulnerabilities discovered
✅ Performance bottlenecks and solutions

**Do NOT include these:**
❌ Product requirement changes
❌ Feature pivots or design iterations
❌ User preference changes
❌ Business logic modifications

---

## 📊 Current State Snapshot

### Completed Features
[List of finished features with links to specs]

Example:
- ✅ **User Authentication** - Login/logout functionality
  - Implements: [link to behavioral spec]
  - Components: LoginForm, AuthContext, useAuth
  - Status: Live in production

### In Progress
[Current work]

Example:
- 🔄 **Product Search** - Task 2 of 4
  - Next: Implement results display
  - Blocker: None

### Known Issues
[Documented bugs/problems]

Example:
- 🐛 **Search breaks on special characters** - Priority: High
  - Tracking: [link to issue/task]
  - Plan: Fix in TASK-003

### Technical Debt
[Intentional shortcuts taken]

Example:
- 💳 **Hardcoded API URL** - Priority: Medium
  - Why: No environment config setup yet
  - Impact: Must manually change for prod deployment
  - Plan: Add env vars before first deployment

---

## 🔍 Context Compression Log

[After each task, add entry showing what changed and what to carry forward]

### After TASK-001 Completion ([Date])
**State Changes:**
- [What was added/modified]

**Carry Forward to Next Task:**
- [Minimal interface/contract info needed]

**Discarded (No Longer Needed):**
- [Implementation details to forget]

**Updated Files:**
- `path/to/file.ext` - [brief change description]

---

### After TASK-002 Completion ([Date])
[Same structure...]

---

## 📚 Reference Information

### Code Patterns to Follow

[As patterns emerge, document them here]

**Example: Error Handling Pattern**
```javascript
// Standard pattern for this project
async function fetchData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  try {
    const result = await api.get('/data');
    setData(result);
  } catch (err) {
    setError(err);
    console.error('Fetch failed:', err);
  } finally {
    setLoading(false);
  }
}
```

### Testing Approach

[How you test in this project]

Example:
- **Manual Testing:** Test all user scenarios after each task
- **Automated Testing:** [If/when you add automated tests]
- **Critical Paths:** [User flows that must always work]
  - User can login
  - User can create item
  - User can save changes

### Common Issues & Solutions

[Project-specific gotchas that don't warrant full PL-XXX entries]

Example:
- **Issue:** Dev server crashes on file change
  - **Fix:** Restart with `npm run dev -- --force`

---

## 🔄 Change Log

[High-level log of major changes]

### [Date] - Project Initialized
- Created initial project structure
- Added React + TypeScript + Tailwind
- Set up development environment

### [Date] - Feature: User Authentication Complete
- Tasks 001-004 completed
- Added JWT token handling
- Implemented protected routes
- Performance: Login response <500ms ✅

### [Date] - PL-003 Discovered & Fixed
- Found case-sensitivity bug in search
- Fixed and documented
- Added test case for future

---

## 📖 How to Use This File

### For Humans:
1. **Update after each feature completes:** Move to "Completed Features"
2. **Review before planning:** Check "Known Issues" and "Technical Debt"
3. **Onboard new developers:** This file is their starting point
4. **Make project-specific:** Add directives as patterns emerge

### For LLMs:
1. **Read this file at session start:** Load complete context
2. **Check before each task:** Review relevant sections
3. **Update after each task:** Add to Context Compression Log
4. **Document discoveries:** Add Project Learnings for technical issues
5. **Maintain architecture section:** Keep it current with system

### Session Workflow:

**Starting new session:**
```
1. LLM reads this file (claude.md)
2. LLM reads latest state snapshot
3. LLM confirms: "Working on [feature], [task status]"
4. Continue from current task
```

**Mid-session:**
```
1. Complete task following task-execution-protocol.md
2. Create state snapshot
3. Update this file (status, log, learnings)
4. Move to next task
```

---

## 🎯 Quick Links

- **Context Engineering Guide:** `docs/context/context-engineering-guide.md`
- **Performance Directives:** `docs/context/performance-directives.md`
- **Task Execution Protocol:** `docs/templates/task-execution-protocol.md`
- **Project Learnings:** `docs/context/project-learnings.md`
- **Behavioral Specs:** `docs/context/behavioral-specs/`
- **State Snapshots:** `docs/context/state-snapshots/`

---

**This is a living document. Keep it updated as your project evolves.**

Last Updated: [Date]
