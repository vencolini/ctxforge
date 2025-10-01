# Error Handling Directives

**Purpose:** Build robust applications that fail gracefully and provide meaningful feedback.

---

## PD-ERROR-001: Fail Fast, Fail Explicitly
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

## PD-ERROR-002: Validate Assumptions with Assertions
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

## PD-ERROR-003: User-Friendly Error Messages
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