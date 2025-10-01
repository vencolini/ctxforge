# Framework-Specific: React Directives

**Purpose:** Optimize React applications for performance and maintainability.

---

## PD-REACT-001: Memoize Expensive Computations
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

## PD-REACT-002: Correct Dependency Arrays
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

## PD-REACT-003: Prevent Unnecessary Re-renders
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