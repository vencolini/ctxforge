# User Input & Interaction Directives

**Purpose:** Optimize user experience through responsive and intuitive interactions.

---

## PD-INPUT-001: Debounce User Input
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

## PD-INPUT-002: Provide Immediate Feedback
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

## PD-INPUT-003: Validate on Appropriate Events
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