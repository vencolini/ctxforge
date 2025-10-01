# ctxforge

> **Stop debugging AI code. Start shipping features.**

[![npm version](https://badge.fury.io/js/ctxforge.svg)](https://www.npmjs.com/package/ctxforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is ctxforge?

ctxforge transforms **any AI coding assistant** into a senior developer that understands your project, follows your patterns, and writes production-ready code from day one.

## 30-Second Demo

**Without ctxforge:**
```bash
You: "Add search functionality"
AI: [Immediately writes code with poor performance, missing validation, wrong patterns]
You: [Spend 2 hours debugging and fixing O(n²) algorithms, missing edge cases]
```

**With ctxforge:**
```bash
You: "Add search functionality"  
AI: "I see you have 1,200 products. I'll implement:
     • Client-side filtering (fast for this data size)
     • 300ms debouncing (matches your existing input patterns) 
     • Accessible keyboard navigation (per your project standards)
     Proceeding with optimized implementation..."
You: [Perfect code, zero debugging needed]
```

## The Problem AI Coding Solves (And Creates)

✅ **Solves:** Writing code 10x faster  
❌ **Creates:** Debugging AI code takes longer than writing it yourself

**Why?** AI lacks your project context, makes wrong assumptions, ignores best practices.

## Try It Now (2 minutes)

```bash
# Step 1: Run this in any project directory
npx ctxforge guided

# Step 2: Start your AI tool (Claude, Cursor, ChatGPT, etc.)
# That's it! Your AI now has full project context
```

### What just happened?
- 🎯 **Auto-detected** your project type (React, Node.js, Python, etc.)
- 📋 **Created context files** that any AI can read
- ⚡ **Applied performance standards** automatically
- 🧠 **Gave AI your project knowledge** instantly

### Result: AI writes code like it knows your codebase

## Core Features

🎯 **Smart Context Discovery** - `npx ctxforge spec "users need search"` → AI generates full specifications  
⚡ **Auto Performance** - O(n) complexity enforced, memory leaks prevented automatically  
🧠 **Persistent Memory** - AI remembers your project across sessions  
🔧 **Any Language/Framework** - React, Python, Go, Rust... works with everything  
🤖 **Universal AI Support** - Claude, Cursor, ChatGPT, Gemini - any AI tool

## Real Example: React Search Component

**Without ctxforge** (typical AI response):
```javascript
// AI generates this immediately - looks good but has issues
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // 🚨 Bug: No debouncing - hammers API on every keystroke
    // 🚨 Bug: O(n²) if used with large datasets  
    // 🚨 Bug: Memory leak - no cleanup
    fetch(`/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, [query]);
  
  return <div>{/* basic rendering */}</div>;
}
```

**With ctxforge** (context-aware AI):
```javascript
// AI analyzes your project and generates optimized code
function SearchComponent({ products }) {
  const [query, setQuery] = useState('');
  
  // ✅ AI knows: "1,200 items = client-side filtering optimal"
  // ✅ AI applies: O(n) complexity with memoization  
  // ✅ AI follows: Your project's 300ms debounce pattern
  const filteredProducts = useMemo(() => {
    if (query.length < 2) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]); // ✅ Correct dependencies
  
  // ✅ AI adds: Debouncing from your existing patterns
  const debouncedQuery = useDebounce(query, 300);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products" // ✅ AI adds accessibility
      />
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Result:** Production-ready code that follows your patterns, handles edge cases, and performs optimally.

## Commands You'll Actually Use

```bash
# Start here (detects your project automatically)
npx ctxforge guided

# Generate smart feature specs  
npx ctxforge spec "users need to upload files with drag and drop"

# Check everything is working
npx ctxforge validate
```

## Works With Everything

✅ **Languages:** JavaScript, Python, Go, Rust, Java, C#...  
✅ **Frameworks:** React, Vue, Django, Rails, Express, FastAPI...  
✅ **AI Tools:** Claude Code, Cursor, ChatGPT, Gemini CLI...

## Why This Works

Most "AI coding" fails because:
1. AI lacks project context 
2. AI ignores performance best practices
3. AI can't maintain consistency across sessions

ctxforge solves all three by giving AI a "senior developer brain" that understands your specific project.

---

## Ready to Never Debug AI Code Again?

```bash
npx ctxforge guided
```

**Takes 2 minutes. Works with any project. Any AI tool.**

---

*MIT License - [GitHub](https://github.com/vencolini/ctxforge) - [Full Documentation](docs/README.md)*