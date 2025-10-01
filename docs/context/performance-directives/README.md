# Performance & Code Quality Directives

**Purpose:** Universal best practices that LLMs must apply automatically without asking.

**Status:** Non-negotiable - these are fundamental software engineering principles.

---

## How to Use This File

### For LLMs:
- **Read this before implementing ANY task**
- **Apply directives automatically** (don't ask permission)
- **Reference directive numbers in code comments**
- **Document violations only if absolutely necessary** (with justification)

### For Humans:
- **Customize for your stack** (add language/framework specific directives)
- **Add project-specific rules** (PD-PROJECT-XXX)
- **Don't delete universal directives** (they're foundational)

---

## Directive Categories

### Core Directives (Always Load)
- **[algorithmic-efficiency.md](algorithmic-efficiency.md)** - Time complexity, data structures, optimization
- **[memory-management.md](memory-management.md)** - Cleanup, memory leaks, object creation
- **[data-handling.md](data-handling.md)** - Immutability, validation, null handling

### UI/Frontend Directives 
- **[user-interaction.md](user-interaction.md)** - Input debouncing, feedback, validation
- **[accessibility.md](accessibility.md)** - Semantic HTML, keyboard nav, ARIA
- **[react-specific.md](react-specific.md)** - Memoization, re-renders, hooks

### Quality Assurance Directives
- **[error-handling.md](error-handling.md)** - Fail fast, assertions, user messages
- **[code-organization.md](code-organization.md)** - SRP, DRY, naming conventions
- **[testing.md](testing.md)** - Edge cases, performance verification

### Security & Documentation
- **[security.md](security.md)** - Input sanitization, data exposure
- **[documentation.md](documentation.md)** - Comments, interface docs

---

## Loading Strategy

### For General Development
Load: algorithmic-efficiency.md + memory-management.md + data-handling.md + error-handling.md

### For Frontend/UI Work
Additionally load: user-interaction.md + accessibility.md + react-specific.md

### For Security-Critical Features
Additionally load: security.md

### For API/Library Development
Additionally load: documentation.md + testing.md

---

## Quick Reference

**[Directive Summary Checklist](directive-summary.md)** - One-page reference for all directives

---

## Adding Project-Specific Directives

Create `project-directives.md` with your additional rules:

```markdown
### PD-PROJECT-001: [Directive Name]
**Rule:** [Specific guideline]
**Applies to:** [When this should be used]
**Example:** [Code example]
**Reason:** [Why this helps your project]
```

---

**Usage:** LLMs should load the README.md + relevant category files based on the task type.