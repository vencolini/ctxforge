# Learning Protocol

**Load this protocol when:** Teaching concepts, explaining technology, or providing tutorials

---

## When to Use

User requests starting with: teach me, learn, how does X work, explain, tutorial, what is

Examples:
- "Teach me React hooks"
- "How do promises work?"
- "Explain microservices"

---

## Step 1: Learning Discovery (Ask 2-4 Questions)

**Tailor the teaching approach:**

### Q1: Learning Goal
```
"What would you like to learn?

- **Specific concept?** (e.g., React hooks, async/await)
- **Technology/framework?** (e.g., Docker, GraphQL)
- **Broad topic?** (e.g., microservices, functional programming)
- **Practical skill?** (e.g., how to deploy, how to test)

Please describe what you want to understand."
```

### Q2: Current Understanding
```
"What's your current level with this topic?

- **Complete beginner:** Never heard of it
- **Heard of it:** Know the name, but not the details
- **Basic understanding:** Know the basics, want depth
- **Intermediate:** Comfortable, want advanced concepts
- **Experienced:** Know it well, want specific clarification

This helps me start at the right level."
```

### Q3: Learning Style
```
"How do you learn best?

- **Theory first:** Understand concepts, then see examples
- **Example first:** See it working, then understand why
- **Hands-on:** Build something while learning
- **Visual:** Diagrams and illustrations
- **Step-by-step:** Methodical progression

Or a mix?"
```

### Q4: Learning Purpose (optional)
```
"Why are you learning this?

- **Project needs:** Using it in current work
- **Job preparation:** Interview or new role
- **Curiosity:** Just want to understand
- **Skill building:** Expanding knowledge

This helps me focus on what matters most to you."
```

---

## Step 2: Teaching

### Teaching Structure

**Use the 4-layer approach:**

1. **What & Why** (Context)
2. **Simple Example** (Basic understanding)
3. **How It Works** (Deeper understanding)
4. **Advanced Concepts** (Mastery)

---

### Example: Teaching React Hooks

```markdown
## Learning: React Hooks

**Goal:** Understand React hooks and when to use them
**Your level:** Basic React knowledge
**Style:** Example-first, then theory

---

## Layer 1: What & Why

### What are React Hooks?

Hooks are functions that let you "hook into" React features from function components.

**Before hooks (class components):**
\`\`\`javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // State
  }

  componentDidMount() { // Lifecycle
    document.title = \`Count: \${this.state.count}\`;
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
\`\`\`

**With hooks (function components):**
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0); // State hook

  useEffect(() => { // Lifecycle hook
    document.title = \`Count: \${count}\`;
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

### Why hooks?

**Problems hooks solve:**
1. **Complex components:** Logic scattered across lifecycle methods
2. **Reusing logic:** Hard to share stateful logic between components
3. **Classes confusing:** `this` keyword, binding, verbose

**Benefits:**
- ✅ Simpler code (functions vs classes)
- ✅ Reusable logic (custom hooks)
- ✅ Better composition
- ✅ Easier testing

---

## Layer 2: Simple Examples

### useState - Managing State

**Purpose:** Add state to function components

**Simplest example:**
\`\`\`javascript
import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, updaterFunction]
  const [count, setCount] = useState(0); // 0 is initial value

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

**Try it yourself:**
Can you add a "Decrement" button that decreases the count?

**Solution:**
\`\`\`javascript
<button onClick={() => setCount(count - 1)}>
  Decrement
</button>
\`\`\`

**Multiple state variables:**
\`\`\`javascript
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  // Each state variable is independent
}
\`\`\`

---

### useEffect - Side Effects

**Purpose:** Perform side effects (data fetching, subscriptions, DOM manipulation)

**Simplest example:**
\`\`\`javascript
import { useState, useEffect } from 'react';

function DocumentTitle() {
  const [count, setCount] = useState(0);

  // Runs after every render
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  return <button onClick={() => setCount(count + 1)}>Click</button>;
}
\`\`\`

**With dependency array:**
\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // Only run when count changes
\`\`\`

**Run once (on mount):**
\`\`\`javascript
useEffect(() => {
  console.log('Component mounted');
}, []); // Empty array = run once
\`\`\`

**Cleanup:**
\`\`\`javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup function (runs when component unmounts)
  return () => clearInterval(timer);
}, []);
\`\`\`

---

## Layer 3: How It Works

### Behind the Scenes

**React's magic:**

When you call `useState`, React:
1. Checks if this is first render
2. If yes: Store initial value
3. If no: Return stored value
4. Associates state with component instance

**State updates:**
\`\`\`javascript
setCount(count + 1); // Queues update
// React schedules re-render
// Next render: count has new value
\`\`\`

**Important:** State updates are asynchronous!

\`\`\`javascript
// ❌ This won't work as expected
setCount(count + 1);
setCount(count + 1); // Still uses old count
// Result: count only increases by 1

// ✅ Use updater function
setCount(c => c + 1);
setCount(c => c + 1);
// Result: count increases by 2
\`\`\`

---

### useEffect Mental Model

**Think of it as:**
"After React finishes updating the DOM, do this thing"

**Timeline:**
\`\`\`
1. Component renders
2. React updates DOM
3. Browser paints screen
4. useEffect runs
\`\`\`

**Dependencies:**
\`\`\`javascript
useEffect(() => {
  // This effect uses 'count'
  console.log(count);
}, [count]); // So count is a dependency
\`\`\`

**Rule:** Include ALL values from component scope used inside effect

**Why?** Prevents stale closures (effect using old values)

---

## Layer 4: Advanced Concepts

### Custom Hooks

**Reusable logic:**

\`\`\`javascript
// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]); // Refetch if URL changes

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>User: {user.name}</div>;
}
\`\`\`

**Benefits:**
- ✅ Reusable across components
- ✅ Testable in isolation
- ✅ Compose multiple hooks
- ✅ Share logic without HOCs or render props

---

### useCallback & useMemo

**Optimization hooks:**

**useCallback:** Memoize functions
\`\`\`javascript
const handleClick = useCallback(() => {
  console.log('Clicked', count);
}, [count]); // Only recreate if count changes
\`\`\`

**useMemo:** Memoize values
\`\`\`javascript
const expensiveResult = useMemo(() => {
  return expensiveCalculation(data);
}, [data]); // Only recalculate if data changes
\`\`\`

**When to use:**
- Passing callbacks to optimized child components
- Expensive calculations
- Preventing unnecessary re-renders

**When NOT to use:**
- Simple calculations (overhead not worth it)
- Not causing performance issues

**Rule:** Measure first, optimize second

---

### useReducer

**For complex state logic:**

\`\`\`javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}
\`\`\`

**When to use:**
- Complex state logic
- Multiple sub-values
- Next state depends on previous
- Easier testing (reducer is pure function)

---

## Practice Exercises

### Exercise 1: Todo List (Beginner)

Build a todo list using `useState`:
- Add todos
- Mark todos as complete
- Delete todos

**Hint:** State structure: `const [todos, setTodos] = useState([]);`

---

### Exercise 2: Data Fetching (Intermediate)

Create a component that:
- Fetches user data on mount
- Shows loading state
- Handles errors
- Allows refresh

**Hint:** Use `useEffect` with empty dependency array

---

### Exercise 3: Custom Hook (Advanced)

Extract the data fetching logic into a reusable `useFetch` hook:
- Takes URL as parameter
- Returns `{ data, loading, error, refetch }`
- Handles cleanup

---

## Common Mistakes

### Mistake 1: Missing Dependencies

\`\`\`javascript
// ❌ Bad: count not in dependency array
useEffect(() => {
  console.log(count);
}, []); // Effect uses stale count

// ✅ Good: Include all dependencies
useEffect(() => {
  console.log(count);
}, [count]);
\`\`\`

---

### Mistake 2: Infinite Loops

\`\`\`javascript
// ❌ Bad: Creates infinite loop
const [data, setData] = useState([]);

useEffect(() => {
  setData([...data, newItem]); // Triggers re-render
}); // No dependency array = runs every render = infinite loop

// ✅ Good: Add dependency array
useEffect(() => {
  // Only runs when appropriate dependency changes
}, [dependency]);
\`\`\`

---

### Mistake 3: Calling Hooks Conditionally

\`\`\`javascript
// ❌ Bad: Conditional hook call
if (condition) {
  const [state, setState] = useState(0); // Breaks React's rules!
}

// ✅ Good: Hooks at top level
const [state, setState] = useState(0);
if (condition) {
  // Use state here
}
\`\`\`

**Rule:** Always call hooks at the top level (not inside conditions, loops, or nested functions)

---

## Learning Checklist

**You understand React Hooks when you can:**

- [ ] Explain what hooks are and why they exist
- [ ] Use `useState` to add state to function components
- [ ] Use `useEffect` for side effects
- [ ] Understand dependency arrays
- [ ] Write cleanup functions in `useEffect`
- [ ] Create custom hooks
- [ ] Explain when to use `useCallback` and `useMemo`
- [ ] Understand `useReducer` for complex state
- [ ] Follow hooks rules (top level, function components only)
- [ ] Avoid common mistakes (missing deps, infinite loops)

---

## Further Learning

**Official resources:**
- React Hooks Docs: https://react.dev/reference/react
- Hooks FAQ: https://react.dev/learn/hooks-faq

**Practice:**
- Build projects using only hooks
- Refactor class components to hooks
- Create custom hooks library

**Next topics:**
- Context API with hooks
- React Query / SWR (data fetching)
- Advanced patterns (compound components, etc.)

---

**Questions?** What concept would you like me to clarify?

**Ready to practice?** Pick an exercise and give it a try!
```

---

## Teaching Strategies

### For Different Learning Styles

**Visual learners:**
\`\`\`
Use ASCII diagrams:

Component Tree:
    App
     ├── Header
     ├── Content
     │    ├── Sidebar
     │    └── Main
     └── Footer

Data Flow:
User Input → Event → setState → Re-render → Update DOM
\`\`\`

**Hands-on learners:**
- Provide code to modify
- Give incremental exercises
- Build projects together

**Conceptual learners:**
- Explain the "why" thoroughly
- Connect to broader patterns
- Discuss trade-offs and alternatives

---

### Checking Understanding

**After each concept:**

1. **Ask them to explain it back:**
   > "Can you explain useState in your own words?"

2. **Give a small challenge:**
   > "Try adding a reset button to the counter"

3. **Ask connecting questions:**
   > "How is this similar to [previous concept]?"
   > "When would you use this vs [alternative]?"

---

### Scaffolding Difficulty

**Progressive complexity:**

**Level 1:** Basic example (working code)
**Level 2:** Guided exercise (fill in blanks)
**Level 3:** Open problem (solve independently)
**Level 4:** Extend/improve (add features)

**Example progression:**

1. "Here's a counter with useState"
2. "Now add a decrement button"
3. "Build a todo list using what you learned"
4. "Add localStorage persistence to your todo list"

---

## Quality Criteria

Teaching successful when:
- [ ] Concept explained at appropriate level
- [ ] Examples are clear and runnable
- [ ] Student can explain concept back
- [ ] Student can apply concept (exercises)
- [ ] Common mistakes addressed
- [ ] Further learning resources provided
- [ ] Student feels confident to continue learning
- [ ] Questions answered satisfactorily

---
