# Security Directives

**Purpose:** Protect applications and users from security vulnerabilities and data exposure.

---

## PD-SEC-001: Sanitize User Input for Injection
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

## PD-SEC-002: Don't Expose Sensitive Data
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