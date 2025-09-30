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

## Algorithmic Efficiency Directives

### PD-ALGO-001: Always Consider Time Complexity
**Rule:** Document Big O complexity for any non-trivial operation  
**Applies to:** Loops, recursion, data structure operations  
**Target:** O(n log n) or better for operations on user data

```javascript
// ✅ GOOD - O(n) with justification
// O(n) linear search acceptable: max 100 items in typical use case
const found = items.find(item => item.id === targetId);

// ❌ BAD - O(n²) without justification
// Nested loops with no complexity comment
items.forEach(item => {
  otherItems.forEach(other => {
    compare(item, other);
  });
});

// ✅ GOOD - O(n²) with justification
// O(n²) acceptable here: data capped at 50 items per API constraint
// More efficient algorithms would add complexity without meaningful gain
```

**Acceptable Complexities:**
- O(1), O(log n), O(n): Always acceptable
- O(n log n): Acceptable for most use cases
- O(n²): Only with justification (small data, cap explained)
- O(2ⁿ), O(n!): Requires strong justification

### PD-ALGO-002: Optimize Data Structure Choice
**Rule:** Use appropriate data structure for access patterns  
**Applies to:** Any collection of data

```javascript
// ✅ GOOD - O(1) lookup
const userMap = new Map(users.map(u => [u.id, u]));
const user = userMap.get(userId); // O(1)

// ❌ BAD - O(n) lookup when not needed
const user = users.find(u => u.id === userId); // O(n) every time

// When to use what:
// - Frequent lookups by key → Map/Object
// - Unique values, membership check → Set
// - Ordered iteration, filter/map → Array
// - FIFO/LIFO → Queue/Stack (array with push/shift)
```

### PD-ALGO-003: Avoid Premature Optimization
**Rule:** Measure before optimizing, but use good algorithms from start  
**Applies to:** All optimization decisions

**Process:**
1. Implement with good algorithmic choices (O(n) not O(n²))
2. Measure actual performance with realistic data
3. Optimize only if measurements show need
4. Document optimization decisions

```javascript
// ✅ GOOD - Start with reasonable algorithm
const sorted = [...items].sort(compareFn); // O(n log n)
// Measure: 45ms for 10K items - acceptable
// No further optimization needed

// ❌ BAD - Complex optimization without measurement
// Implemented custom QuickSort with pivot optimization
// because "it might be faster" - no measurement to justify complexity
```

---

## Memory Management Directives

### PD-MEM-001: Clean Up Side Effects
**Rule:** Every setup must have corresponding cleanup  
**Applies to:** Timers, listeners, subscriptions, connections

```javascript
// ✅ GOOD - React example
useEffect(() => {
  const timer = setTimeout(callback, 1000);
  const listener = element.addEventListener('click', handler);
  
  return () => {
    clearTimeout(timer);
    element.removeEventListener('click', listener);
  };
}, [dependencies]);

// ❌ BAD - No cleanup
useEffect(() => {
  setInterval(callback, 1000); // Memory leak
  element.addEventListener('click', handler); // Memory leak
}, []);

// ✅ GOOD - Python example
try:
    file = open('data.txt', 'r')
    # process file
finally:
    file.close()  # Always cleanup
```

### PD-MEM-002: Avoid Memory Leaks from Closures
**Rule:** Be cautious with closures that capture large objects  
**Applies to:** Callbacks, event handlers, memoized functions

```javascript
// ❌ BAD - Closure captures entire large object
const items = fetchLargeDataset(); // 10MB
button.addEventListener('click', () => {
  console.log(items.length); // Only need length, but keeps all items in memory
});

// ✅ GOOD - Extract only what's needed
const items = fetchLargeDataset();
const itemCount = items.length;
button.addEventListener('click', () => {
  console.log(itemCount); // Only captures number
});
```

### PD-MEM-003: Avoid Unnecessary Object Creation in Loops
**Rule:** Create objects outside loops when possible  
**Applies to:** Loops, array methods, recursion

```javascript
// ❌ BAD - Creates new object on every iteration
for (let i = 0; i < 10000; i++) {
  const config = { option: 'value' }; // Created 10000 times
  process(items[i], config);
}

// ✅ GOOD - Reuse object
const config = { option: 'value' };
for (let i = 0; i < 10000; i++) {
  process(items[i], config);
}

// ❌ BAD - Array method creates function each time
items.map((item) => ({ ...item, processed: true })); // New arrow function each call

// ✅ GOOD - Reuse function
const processItem = (item) => ({ ...item, processed: true });
items.map(processItem);
```

---

## Data Handling Directives

### PD-DATA-001: Immutability by Default
**Rule:** Prefer immutable operations, avoid mutations  
**Applies to:** All data transformations

```javascript
// ✅ GOOD - Immutable
const updated = items.map(item => 
  item.id === targetId ? { ...item, value: newValue } : item
);

// ❌ BAD - Mutation
const updated = items;
const target = updated.find(item => item.id === targetId);
target.value = newValue; // Mutates original array

// ✅ GOOD - Python immutable
new_list = [x * 2 for x in old_list]

// ❌ BAD - Python mutation
for i in range(len(old_list)):
    old_list[i] *= 2  # Mutates original
```

### PD-DATA-002: Input Validation and Sanitization
**Rule:** Validate all external input, sanitize before use  
**Applies to:** User input, API responses, file content

```javascript
// ✅ GOOD - Validation and sanitization
function processSearch(input: unknown): string {
  // Type guard
  if (typeof input !== 'string') {
    throw new Error('Search input must be string');
  }
  
  // Length validation
  if (input.length > 200) {
    throw new Error('Search too long (max 200 chars)');
  }
  
  // Sanitize for use in regex
  return input.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ❌ BAD - No validation
function processSearch(input) {
  return input; // Could be anything, could break downstream
}
```

### PD-DATA-003: Handle Null/Undefined Explicitly
**Rule:** Never assume data exists, always handle absence  
**Applies to:** All data access

```javascript
// ✅ GOOD - Explicit handling
const userName = user?.name ?? 'Anonymous';
const itemCount = items?.length || 0;

// ❌ BAD - Assumes existence
const userName = user.name; // Crashes if user is null
const itemCount = items.length; // Crashes if items is undefined

// ✅ GOOD - Type-safe
if (data !== null && data !== undefined) {
  process(data);
}

// ❌ BAD - Truthy check can miss falsy valid values
if (data) {
  process(data); // Skips 0, '', false which might be valid
}
```

---

## User Input & Interaction Directives

### PD-INPUT-001: Debounce User Input
**Rule:** Debounce keystroke handlers to avoid excessive processing  
**Applies to:** Search inputs, live filters, autocomplete

```javascript
// ✅ GOOD - Debounced
import { debounce } from 'lodash';

useEffect(() => {
  const handler = debounce((value) => {
    performSearch(value);
  }, 300); // Standard 300ms delay
  
  handler(searchTerm);
  
  return () => handler.cancel(); // Cleanup
}, [searchTerm]);

// ❌ BAD - No debouncing
useEffect(() => {
  performSearch(searchTerm); // Fires on every keystroke
}, [searchTerm]);
```

**Standard Timings:**
- Search/filter: 300ms
- Autocomplete: 200-300ms
- Resize handlers: 150-250ms
- Scroll handlers: 100-150ms

### PD-INPUT-002: Provide Immediate Feedback
**Rule:** Show loading/processing states for async operations  
**Applies to:** Forms, search, data fetching

```javascript
// ✅ GOOD - Loading state
const [isLoading, setIsLoading] = useState(false);

async function handleSubmit() {
  setIsLoading(true);
  try {
    await saveData();
  } finally {
    setIsLoading(false);
  }
}

return (
  <button disabled={isLoading}>
    {isLoading ? 'Saving...' : 'Save'}
  </button>
);

// ❌ BAD - No feedback
async function handleSubmit() {
  await saveData(); // User sees nothing happening
}
```

### PD-INPUT-003: Validate on Appropriate Events
**Rule:** Validate at the right moment, not too early or late  
**Applies to:** Forms, user input

**Pattern:**
- `onChange`: Update state only, no validation
- `onBlur`: Show validation errors
- `onSubmit`: Final validation, block if invalid

```javascript
// ✅ GOOD - Validate on blur
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => validateEmail(email)}
/>

// ❌ BAD - Validate on every keystroke
<input
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value); // Annoying: shows error while typing
  }}
/>
```

---

## Framework-Specific: React Directives

### PD-REACT-001: Memoize Expensive Computations
**Rule:** Use useMemo for expensive calculations, useCallback for function props  
**Applies to:** Computed values, function props passed to children

```javascript
// ✅ GOOD - Memoized computation
const expensiveResult = useMemo(() => {
  return items.filter(item => /* complex condition */)
              .map(item => /* transformation */)
              .sort(compareFn);
}, [items, /* other dependencies */]);

// ❌ BAD - Recomputes on every render
const expensiveResult = items
  .filter(item => /* complex condition */)
  .map(item => /* transformation */)
  .sort(compareFn);

// ✅ GOOD - Memoized callback
const handleClick = useCallback((id) => {
  // handler logic
}, [/* dependencies */]);

// ❌ BAD - New function every render
const handleClick = (id) => {
  // handler logic creates new function reference each render
};
```

### PD-REACT-002: Correct Dependency Arrays
**Rule:** Include all values from component scope used in effect  
**Applies to:** useEffect, useMemo, useCallback

```javascript
// ✅ GOOD - All dependencies listed
useEffect(() => {
  fetchData(userId, filter);
}, [userId, filter]); // Both used in effect

// ❌ BAD - Missing dependency
useEffect(() => {
  fetchData(userId, filter);
}, [userId]); // filter missing - stale closure bug

// ✅ GOOD - Use function form to avoid dependency
useEffect(() => {
  setCount(c => c + 1); // Don't need count in dependency
}, []); // Truly no dependencies

// ❌ BAD - Unnecessary dependency
useEffect(() => {
  setCount(count + 1); // Requires count in dependency, less stable
}, [count]);
```

### PD-REACT-003: Prevent Unnecessary Re-renders
**Rule:** Use React.memo for expensive leaf components  
**Applies to:** Components with heavy rendering, list items

```javascript
// ✅ GOOD - Memoized component
const ListItem = React.memo(({ item, onSelect }) => {
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.name}
    </div>
  );
});

// Use with memoized callback
const handleSelect = useCallback((id) => {
  setSelected(id);
}, []);

<ListItem item={item} onSelect={handleSelect} />

// ❌ BAD - Re-renders on every parent render
const ListItem = ({ item, onSelect }) => {
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.name}
    </div>
  );
};

// New function reference each time
<ListItem item={item} onSelect={(id) => setSelected(id)} />
```

---

## Accessibility Directives (Universal)

### PD-A11Y-001: Semantic HTML First
**Rule:** Use semantic HTML elements, not div/span for everything  
**Applies to:** All UI components

```html
<!-- ✅ GOOD - Semantic -->
<button onClick={handleClick}>Submit</button>
<nav><a href="/home">Home</a></nav>
<main><article>Content</article></main>

<!-- ❌ BAD - Non-semantic -->
<div onClick={handleClick}>Submit</div>
<div><span onclick="...">Home</span></div>
<div><div>Content</div></div>
```

### PD-A11Y-002: Keyboard Navigation
**Rule:** All interactive elements must be keyboard accessible  
**Applies to:** Buttons, links, form controls, custom widgets

```javascript
// ✅ GOOD - Keyboard accessible
<button 
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Action
</button>

// ❌ BAD - Mouse only
<div onClick={handleClick}>Action</div> // Not keyboard accessible

// ✅ GOOD - Custom widget with keyboard support
<div 
  role="button" 
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Custom Button
</div>
```

### PD-A11Y-003: ARIA Labels When Needed
**Rule:** Add ARIA when semantic HTML insufficient  
**Applies to:** Icons, custom controls, dynamic content

```html
<!-- ✅ GOOD - Icon button with label -->
<button aria-label="Close dialog">
  <XIcon />
</button>

<!-- ❌ BAD - Icon with no label -->
<button>
  <XIcon />
</button>

<!-- ✅ GOOD - Dynamic content announced -->
<div 
  role="status" 
  aria-live="polite"
>
  {statusMessage}
</div>

<!-- ❌ BAD - Screen reader misses update -->
<div>{statusMessage}</div>
```

### PD-A11Y-004: Focus Indicators Visible
**Rule:** Don't remove focus outlines without replacement  
**Applies to:** All focusable elements

```css
/* ❌ BAD - Removes focus with no replacement */
button:focus {
  outline: none;
}

/* ✅ GOOD - Custom focus that's still visible */
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* ✅ GOOD - Use :focus-visible for better UX */
button:focus-visible {
  outline: 2px solid blue;
}
```

---

## Error Handling Directives

### PD-ERROR-001: Fail Fast, Fail Explicitly
**Rule:** Don't silently swallow errors, make failures visible  
**Applies to:** All error-prone operations

```javascript
// ✅ GOOD - Explicit error handling
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw after logging
  }
}

// ❌ BAD - Silent failure
async function fetchData() {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return null; // Caller doesn't know why it failed
  }
}
```

### PD-ERROR-002: Validate Assumptions with Assertions
**Rule:** Assert invariants in development, handle errors in production  
**Applies to:** Critical assumptions, algorithm invariants

```javascript
// ✅ GOOD - Development assertion
if (process.env.NODE_ENV === 'development') {
  console.assert(items.length > 0, 'Items array should not be empty here');
}

// ✅ GOOD - Production error handling
if (items.length === 0) {
  return handleEmptyState();
}

// ❌ BAD - Assumption without check
const first = items[0]; // Crashes if items is empty
```

### PD-ERROR-003: User-Friendly Error Messages
**Rule:** Show helpful errors to users, technical details to developers  
**Applies to:** UI error messages

```javascript
// ✅ GOOD - User-friendly
try {
  await saveData();
} catch (error) {
  console.error('Save failed:', error); // Technical details to console
  showToast('Unable to save. Please try again.'); // User message
}

// ❌ BAD - Technical error to user
try {
  await saveData();
} catch (error) {
  alert(error.message); // "ECONNREFUSED 127.0.0.1:3000" confuses user
}
```

---

## Code Organization Directives

### PD-ORG-001: Single Responsibility Principle
**Rule:** Each function/class does one thing well  
**Applies to:** All functions, classes, modules

```javascript
// ✅ GOOD - Single responsibility
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendEmail(to, subject, body) {
  // Send logic
}

function validateAndSend(email, subject, body) {
  if (!validateEmail(email)) {
    throw new Error('Invalid email');
  }
  return sendEmail(email, subject, body);
}

// ❌ BAD - Multiple responsibilities
function sendEmail(to, subject, body) {
  // Validation mixed with sending
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error('Invalid email');
  }
  // Send logic
}
```

### PD-ORG-002: DRY (Don't Repeat Yourself)
**Rule:** Extract repeated logic into reusable functions  
**Applies to:** Any code repeated 2+ times

```javascript
// ✅ GOOD - Extracted common logic
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

const price = formatCurrency(item.price);
const total = formatCurrency(cart.total);
const tax = formatCurrency(cart.tax);

// ❌ BAD - Repeated logic
const price = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(item.price);

const total = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(cart.total);
// ... repeated again
```

### PD-ORG-003: Intention-Revealing Names
**Rule:** Names should clearly state purpose, not implementation  
**Applies to:** All variables, functions, classes

```javascript
// ✅ GOOD - Clear intent
const activeUsers = users.filter(u => u.lastActive > cutoffDate);
const formattedDate = formatDate(date, 'YYYY-MM-DD');

function isEligibleForDiscount(user) {
  return user.age >= 65 || user.memberYears >= 10;
}

// ❌ BAD - Unclear intent
const arr = users.filter(u => u.lastActive > cutoffDate);
const str = formatDate(date, 'YYYY-MM-DD');

function check(u) {
  return u.age >= 65 || u.memberYears >= 10;
}
```

---

## Testing & Verification Directives

### PD-TEST-001: Test Edge Cases
**Rule:** Test boundary conditions, not just happy path  
**Applies to:** All logic

**Edge cases to consider:**
- Empty collections ([], null, undefined)
- Single item
- Maximum size/length
- Invalid input
- Concurrent operations

```javascript
// ✅ GOOD - Handles edge cases
function getFirst(items) {
  if (!items || items.length === 0) {
    return null;
  }
  return items[0];
}

// Test cases:
// - Empty array → null
// - Null → null
// - Single item → that item
// - Multiple items → first item

// ❌ BAD - Crashes on edge cases
function getFirst(items) {
  return items[0]; // Crashes if items is null/undefined
}
```

### PD-TEST-002: Verify Performance Claims
**Rule:** Measure actual performance, don't guess  
**Applies to:** Any performance-critical code

```javascript
// ✅ GOOD - Measured
console.time('filter-operation');
const filtered = largeArray.filter(predicate);
console.timeEnd('filter-operation');
// Measured: 45ms for 10K items - acceptable

// ❌ BAD - Assumed
const filtered = largeArray.filter(predicate);
// Assumed to be fast, never measured
```

---

## Security Directives

### PD-SEC-001: Sanitize User Input for Injection
**Rule:** Escape/sanitize input used in SQL, HTML, commands  
**Applies to:** Database queries, HTML rendering, shell commands

```javascript
// ✅ GOOD - Parameterized query
db.query('SELECT * FROM users WHERE email = ?', [userEmail]);

// ❌ BAD - SQL injection vulnerability
db.query(`SELECT * FROM users WHERE email = '${userEmail}'`);

// ✅ GOOD - Sanitized HTML
const sanitized = DOMPurify.sanitize(userContent);
element.innerHTML = sanitized;

// ❌ BAD - XSS vulnerability
element.innerHTML = userContent;
```

### PD-SEC-002: Don't Expose Sensitive Data
**Rule:** Sanitize responses, don't leak internal details  
**Applies to:** API responses, error messages, logs

```javascript
// ✅ GOOD - Sanitized response
res.json({
  id: user.id,
  name: user.name,
  email: user.email
});

// ❌ BAD - Leaks sensitive data
res.json(user); // Includes password hash, internal IDs, etc.

// ✅ GOOD - Generic error
catch (error) {
  console.error(error); // Log details server-side
  res.status(500).json({ error: 'Internal server error' });
}

// ❌ BAD - Leaks implementation details
catch (error) {
  res.status(500).json({ error: error.stack }); // Shows file paths, DB structure
}
```

---

## Documentation Directives

### PD-DOC-001: Comments Explain "Why", Not "What"
**Rule:** Code should be self-explanatory, comments add context  
**Applies to:** All code

```javascript
// ✅ GOOD - Explains reasoning
// Using debounce to avoid excessive API calls during typing
const debouncedSearch = debounce(search, 300);

// Performance: O(n log n) is acceptable here because:
// - Dataset capped at 1000 items by API
// - Sorting only happens once per data fetch
items.sort(compareFn);

// ❌ BAD - States the obvious
// Declare variable
const result = calculate();

// Loop through items
for (let i = 0; i < items.length; i++) {
  // Process item
  process(items[i]);
}
```

### PD-DOC-002: Document Public Interfaces
**Rule:** Functions exported/exposed to other modules need docs  
**Applies to:** Public APIs, exported functions, hooks

```typescript
/**
 * Filters products based on search term
 * 
 * @param products - Array of products to filter
 * @param searchTerm - Search string (case-insensitive)
 * @returns Filtered products matching the search term
 * 
 * @example
 * const results = filterProducts(allProducts, 'laptop');
 * // Returns products where name or description contains 'laptop'
 */
export function filterProducts(
  products: Product[], 
  searchTerm: string
): Product[] {
  // Implementation
}
```

---

## Directive Violations

### When You Can Violate a Directive

**Only with explicit justification:**

```javascript
// DIRECTIVE VIOLATION: PD-ALGO-001
// Using O(n²) algorithm here despite directive
// Justification: Dataset size capped at 20 items by product requirement
// More efficient algorithm would add significant complexity
// Measured: 2ms for worst case (20 items)
for (let i = 0; i < items.length; i++) {
  for (let j = i + 1; j < items.length; j++) {
    compare(items[i], items[j]);
  }
}
```

**Document the violation in code and in project learnings if it becomes a pattern.**

---

## Adding Project-Specific Directives

Format for new directives:

```markdown
### PD-PROJECT-001: [Directive Name]
**Rule:** [Specific rule]
**Reasoning:** [Why this is needed for this project]
**Applies to:** [When/where this applies]
**Example:**
[Code example]
```

---

## Directive Summary Checklist

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
