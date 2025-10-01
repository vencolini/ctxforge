# Directive Summary Checklist

**Purpose:** Quick reference checklist to verify all performance directives have been followed before completing any task.

---

Before completing any task, verify:

**Algorithms:**
- [ ] Time complexity documented and acceptable
- [ ] Appropriate data structures used
- [ ] No premature optimization

**Memory:**
- [ ] Side effects cleaned up
- [ ] No memory leaks from closures
- [ ] Objects not created unnecessarily in loops

**Data:**
- [ ] Immutable operations preferred
- [ ] Input validated and sanitized
- [ ] Null/undefined handled explicitly

**User Input:**
- [ ] Input handlers debounced
- [ ] Loading states shown
- [ ] Validation on appropriate events

**React (if applicable):**
- [ ] Expensive computations memoized
- [ ] Dependency arrays correct
- [ ] Unnecessary re-renders prevented

**Accessibility:**
- [ ] Semantic HTML used
- [ ] Keyboard navigation works
- [ ] ARIA labels where needed
- [ ] Focus indicators visible

**Errors:**
- [ ] Failures explicit, not silent
- [ ] Assumptions validated
- [ ] User-friendly error messages

**Organization:**
- [ ] Single responsibility per function
- [ ] No repeated code (DRY)
- [ ] Clear, intention-revealing names

**Documentation:**
- [ ] Comments explain "why"
- [ ] Public interfaces documented
- [ ] Directive numbers referenced

---

**These directives are living guidelines. Add to them as you discover project-specific patterns, but never remove universal best practices.**