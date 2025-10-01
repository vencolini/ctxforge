# Data Handling Directives

**Purpose:** Ensure robust, safe, and efficient data operations.

---

## PD-DATA-001: Immutability by Default
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

## PD-DATA-002: Input Validation and Sanitization
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

## PD-DATA-003: Handle Null/Undefined Explicitly
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