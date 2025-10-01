# Memory Management Directives

**Purpose:** Prevent memory leaks and optimize memory usage patterns.

---

## PD-MEM-001: Clean Up Side Effects
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

## PD-MEM-002: Avoid Memory Leaks from Closures
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

## PD-MEM-003: Avoid Unnecessary Object Creation in Loops
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