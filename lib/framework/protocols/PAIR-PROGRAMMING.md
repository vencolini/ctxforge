# Pair Programming Protocol

**Load this protocol when:** Working collaboratively with the user, teaching while coding, or explaining as you build

---

## When to Use

User requests starting with: work with me, let's build together, explain as you go, teach me, show me how

Examples:
- "Let's build this feature together"
- "Work with me on this refactoring"
- "Explain what you're doing as we go"

---

## Step 1: Pair Programming Setup (Ask 2-3 Questions)

**Establish collaboration style:**

### Q1: Role Preference
```
"How should we work together?

**Driver/Navigator roles:**
- **I drive, you navigate:** I write code, you guide direction
- **You drive, I navigate:** You write, I provide guidance
- **Switch roles:** Alternate between driver/navigator
- **Collaborative:** We both contribute equally

**Explanation level:**
- **Detailed:** Explain every line as I write it
- **Moderate:** Explain key decisions and patterns
- **Minimal:** Just highlight important points

What works best for you?"
```

### Q2: Learning Goals
```
"What do you want to learn/achieve?

- **Build feature:** Focus on completing the task
- **Learn concepts:** Understand the 'why' behind decisions
- **Best practices:** Learn industry standards
- **Specific skill:** (e.g., React hooks, async patterns)
- **Problem solving:** Learn debugging and troubleshooting

Your priority?"
```

### Q3: Current Understanding (optional)
```
"What's your experience level with this?

- **Beginner:** New to this technology/pattern
- **Intermediate:** Know basics, want to level up
- **Advanced:** Familiar, want best practices
- **Expert:** Just need collaboration

This helps me calibrate my explanations."
```

---

## Step 2: Collaborative Development

### If I'm Driving (Writing Code)

```markdown
## Pair Programming Session: [Feature Name]

**Roles:** I drive, you navigate
**Goal:** [Build X while learning Y]
**Style:** Explain key decisions

---

### What We're Building

**Task:** [Brief description]
**Approach:** [High-level strategy]

Let's start!

---

### Step 1: [First Step Name]

**What I'm doing:** [Brief explanation]

**Why this approach:**
[Explain reasoning]

**Code:**
\`\`\`javascript
// [Comment explaining intent]
function authenticate(credentials) {
  // I'm using async/await here because it's cleaner than
  // promise chains for sequential operations

  // First, validate the input
  if (!credentials.email || !credentials.password) {
    throw new ValidationError('Email and password required');
  }

  // Then look up the user
  const user = await User.findByEmail(credentials.email);

  // Check if user exists and password matches
  if (!user || !user.verifyPassword(credentials.password)) {
    // Important: Same error for both cases (security best practice)
    // Prevents account enumeration attacks
    throw new AuthenticationError('Invalid credentials');
  }

  return user;
}
\`\`\`

**Key concepts:**
- **Async/await:** Modern way to handle asynchronous operations
- **Early returns:** Validate inputs first, fail fast
- **Security:** Same error message prevents info leakage

**Questions so far?** (or ready to continue)

---

### Step 2: [Next Step Name]

**What I'm doing:** [Explanation]

**Building on what we learned:**
[Connect to previous concepts]

**Code:**
\`\`\`javascript
// Now let's create the JWT token
function generateToken(user) {
  // JWT = JSON Web Token
  // Three parts: header, payload, signature

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
    // Don't include sensitive data like password hashes!
  };

  // Sign with secret key, expires in 1 hour
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256'
  });
}
\`\`\`

**Discussion points:**
- **Why JWT?** Stateless auth, scales horizontally
- **What goes in payload?** Public data only, no secrets
- **Security:** Secret key in env var (never hardcode)
- **Expiration:** Short-lived tokens (1h) for security

**Try it yourself:**
Can you write a function to verify the token?
(Take a moment, I'll wait)

[After user attempts or asks for help]

**Here's one way:**
\`\`\`javascript
function verifyToken(token) {
  try {
    // jwt.verify() throws if token is invalid or expired
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, userId: payload.userId };
  } catch (error) {
    // Token invalid, expired, or tampered with
    return { valid: false, error: error.message };
  }
}
\`\`\`

**Did your solution look different?** That's okay! Multiple valid approaches exist.

---

### Step 3: [Integration Step]

**Now let's put it together:**

\`\`\`javascript
// Complete authentication flow
async function login(req, res) {
  try {
    // Step 1: Authenticate user
    const user = await authenticate(req.body);

    // Step 2: Generate token
    const token = generateToken(user);

    // Step 3: Send response
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
        // Notice: Not sending password hash!
      }
    });
  } catch (error) {
    // Step 4: Handle errors gracefully
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}
\`\`\`

**Architecture pattern:** This is the **controller** → **service** → **repository** pattern
- Controller: Handles HTTP (req/res)
- Service: Business logic (authenticate, generateToken)
- Repository: Database access (User.findByEmail)

**Benefits:**
- Separation of concerns
- Easier to test (mock dependencies)
- Reusable logic

---

### Step 4: Testing

**Let's test what we built:**

\`\`\`javascript
// I'm writing a test to verify our code works
describe('Authentication', () => {
  it('should authenticate valid credentials', async () => {
    // Arrange: Set up test data
    const credentials = {
      email: 'test@example.com',
      password: 'Password123!'
    };

    // Act: Call our function
    const result = await authenticate(credentials);

    // Assert: Check expectations
    expect(result).toBeDefined();
    expect(result.email).toBe(credentials.email);
  });

  it('should reject invalid credentials', async () => {
    // Testing the error case
    const credentials = {
      email: 'test@example.com',
      password: 'WrongPassword'
    };

    // Expect it to throw
    await expect(authenticate(credentials))
      .rejects.toThrow('Invalid credentials');
  });
});
\`\`\`

**Testing pattern:** **Arrange-Act-Assert** (AAA pattern)
- Arrange: Set up test data
- Act: Execute the code
- Assert: Verify results

Run tests: `npm test`

✅ All tests passing!

---

### Recap

**What we built:**
1. Authentication function (validates credentials)
2. Token generation (JWT for stateless auth)
3. Token verification (checks validity)
4. Complete login flow (ties it all together)
5. Tests (ensures it works)

**Concepts learned:**
- Async/await for clean async code
- JWT authentication
- Security best practices (password handling, error messages)
- Controller → Service → Repository pattern
- Arrange-Act-Assert testing

**Questions? Want to:**
- Dive deeper into any concept?
- Refactor something we wrote?
- Add another feature?
- Review what we learned?
```

---

### If You're Driving (User Writing Code)

```markdown
## Pair Programming: I'll Navigate

**Your task:** [Build X]
**I'll provide:** Guidance, suggestions, explanation

---

### Getting Started

**Here's the high-level approach:**

1. [Step 1 overview]
2. [Step 2 overview]
3. [Step 3 overview]

**Start with Step 1.** Let me know what you're thinking or if you'd like hints!

---

[User writes code...]

**Great start!** I see you're doing [observation].

**Suggestion:** Consider [alternative or improvement] because [reason].

**Try:** [Specific hint or example]

---

[User continues...]

**Nice!** That [pattern/technique] is exactly right.

**Next step:** Now that [current state], we need to [next action].

**Think about:** [Question to guide their thinking]
- How should we handle [edge case]?
- What if [error scenario] happens?

---

[User asks question...]

**Good question!** [Answer their question with explanation]

**Here's why:** [Deeper explanation]

**Related concept:** [Connect to broader understanding]

Want to try implementing that? I'll help if you get stuck.

---

### Code Review

**Let's review what you wrote:**

\`\`\`javascript
// Your code
[User's code]
\`\`\`

**What works well:**
- ✅ [Positive observation 1]
- ✅ [Positive observation 2]
- ✅ [Positive observation 3]

**Suggestions for improvement:**
- 💡 [Suggestion 1]: [Reason]
- 💡 [Suggestion 2]: [Reason]

**Refactored version:**
\`\`\`javascript
// Incorporating suggestions
[Improved code with comments explaining changes]
\`\`\`

**Does this make sense?** Want to try refactoring it yourself first?
```

---

## Teaching Moments

### Explaining Complex Concepts

**Pattern: Analogy → Simple Example → Real Code → Advanced**

**Example: Closures**

**Analogy:**
```
A closure is like a backpack:
- Function is the person
- Variables in scope are items in backpack
- Person carries backpack everywhere they go
- Can access backpack contents anytime
```

**Simple example:**
\`\`\`javascript
function makeCounter() {
  let count = 0; // This is in the "backpack"

  return function increment() {
    count++; // Can still access count (from the backpack)
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
// count is "remembered" even though makeCounter finished!
\`\`\`

**Real-world use:**
\`\`\`javascript
// Private variables (data hiding)
function createUser(name) {
  let password = 'secret'; // Private!

  return {
    getName: () => name,
    verifyPassword: (input) => input === password,
    // No way to access password directly (encapsulation)
  };
}
\`\`\`

**Advanced concept:**
Closures enable: Module pattern, currying, memoization, React hooks

---

### Debugging Together

**When you encounter a bug:**

```markdown
**Bug encountered:** [Error message]

**Let's debug systematically:**

**Step 1: Read the error**
\`\`\`
Error: Cannot read property 'name' of undefined
  at UserProfile.js:45
\`\`\`

**What does this tell us?**
- Something is `undefined` when we expect an object
- Happens at line 45 in UserProfile.js
- Trying to access `.name` property

**Step 2: Look at the code**
\`\`\`javascript
// Line 45
const userName = user.name; // ← Error here
\`\`\`

**Question:** Where does `user` come from?

**Step 3: Trace backward**
\`\`\`javascript
// Line 42
const user = props.user;
\`\`\`

**Aha!** `props.user` is undefined.

**Step 4: Why is it undefined?**
- Not passed from parent component?
- API call hasn't returned yet?
- Data is null/undefined from database?

**Step 5: Fix**
\`\`\`javascript
// Add a guard clause
if (!user) {
  return <div>Loading...</div>;
}

const userName = user.name; // Safe now
\`\`\`

**Or use optional chaining:**
\`\`\`javascript
const userName = user?.name || 'Guest';
\`\`\`

**Debugging lesson:** Always check assumptions, trace data flow, add guards.
```

---

## Pair Programming Best Practices

### Communication

**I'll do:**
- ✅ Explain reasoning, not just what
- ✅ Ask if pace is okay
- ✅ Pause for questions
- ✅ Celebrate wins
- ✅ Admit when I don't know something

**You can:**
- ✅ Ask questions anytime (no dumb questions!)
- ✅ Request more/less explanation
- ✅ Suggest alternative approaches
- ✅ Take breaks when needed

---

### Pacing

**Signs I'm going too fast:**
- You feel lost or confused
- Concepts aren't clicking
- You're just watching, not understanding

**Tell me:** "Can we slow down and review [topic]?"

**Signs I'm going too slow:**
- You're ahead of my explanation
- Concepts are already clear
- You want to move faster

**Tell me:** "I got this, let's move on!"

---

### Learning Checkpoints

**After each major concept:**

**Quick check:**
1. Can you explain it back to me in your own words?
2. Can you think of another example?
3. Ready to move on or want to practice more?

**Example:**
> You: "So closures are when a function remembers variables from where it was created, even after that outer function is done?"
>
> Me: "Exactly! Perfect explanation. Can you think of when that might be useful?"
>
> You: "Maybe for... creating private variables?"
>
> Me: "Yes! That's one of the main use cases. Ready to see a real example?"

---

## Session Wrap-Up

```markdown
## Pair Programming Session Complete!

**What we built:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

**Concepts covered:**
1. [Concept 1] - [Brief description]
2. [Concept 2] - [Brief description]
3. [Concept 3] - [Brief description]

**Skills practiced:**
- [Skill 1]
- [Skill 2]
- [Skill 3]

---

### 📚 Further Learning

**To solidify today's concepts:**

**Practice exercises:**
1. [Exercise 1]: Try implementing [X]
2. [Exercise 2]: Refactor [Y] using [pattern we learned]
3. [Exercise 3]: Add [feature] to what we built

**Resources:**
- [Link to docs]
- [Link to tutorial]
- [Link to examples]

**Next session ideas:**
- Build on today's work ([specific extension])
- Learn related concept ([related topic])
- Tackle different problem ([alternative challenge])

---

### 💡 Key Takeaways

**Most important things to remember:**
1. [Key point 1]
2. [Key point 2]
3. [Key point 3]

**When you get stuck:**
- [Debugging tip]
- [Where to look for help]
- [How to search for solutions]

---

**Great work today!** Questions about anything we covered?

Ready to continue or want to end here?
```

---

## Quality Criteria

Pair programming session successful when:
- [ ] Clear communication throughout
- [ ] User understands concepts (can explain back)
- [ ] Code works and is tested
- [ ] User feels they learned something
- [ ] Pace was appropriate
- [ ] User feels comfortable asking questions
- [ ] Both contributed meaningfully
- [ ] Next steps are clear

---
