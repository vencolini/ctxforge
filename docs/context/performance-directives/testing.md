# Testing & Verification Directives

**Purpose:** Ensure code reliability through comprehensive testing and performance verification.

---

## PD-TEST-001: Test Edge Cases
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

## PD-TEST-002: Verify Performance Claims
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