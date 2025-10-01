# Code Organization Directives

**Purpose:** Maintain clean, readable, and maintainable codebases through good organizational practices.

---

## PD-ORG-001: Single Responsibility Principle
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

## PD-ORG-002: DRY (Don't Repeat Yourself)
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

## PD-ORG-003: Intention-Revealing Names
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