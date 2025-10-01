# Algorithmic Efficiency Directives

**Purpose:** Ensure optimal time and space complexity in all implementations.

---

## PD-ALGO-001: Always Consider Time Complexity
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

## PD-ALGO-002: Optimize Data Structure Choice
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

## PD-ALGO-003: Avoid Premature Optimization
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