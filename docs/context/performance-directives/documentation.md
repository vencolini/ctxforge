# Documentation Directives

**Purpose:** Create clear, maintainable documentation that helps developers understand and maintain code.

---

## PD-DOC-001: Comments Explain "Why", Not "What"
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

## PD-DOC-002: Document Public Interfaces
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