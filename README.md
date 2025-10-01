# ctxforge

> **Context Engineering Framework for LLM-Assisted Development**

[![npm version](https://badge.fury.io/js/ctxforge.svg)](https://www.npmjs.com/package/ctxforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is ctxforge?

ctxforge provides structured context and engineering standards to AI coding assistants, enabling them to understand your project architecture, follow established patterns, and generate production-quality code that integrates seamlessly with existing codebases.

## The Challenge

Modern AI coding assistants excel at generating code quickly but often lack project context, leading to:

- **Inconsistent patterns** that don't match existing codebase conventions
- **Performance oversights** like inefficient algorithms or memory management issues  
- **Integration gaps** where new code doesn't align with established architecture
- **Quality variance** across different development sessions

ctxforge addresses these issues by providing AI with comprehensive project understanding and engineering standards.

## Installation

```bash
# Option 1: Use directly (no installation needed)
npx ctxforge guided

# Option 2: Install globally
npm install -g ctxforge
ctxforge guided

# Option 3: Install in project
npm install ctxforge
npx ctxforge guided
```

## Quick Start (3 steps)

### Step 1: Initialize (30 seconds)
```bash
cd your-project
npx ctxforge guided
```
**What happens:** Creates `CONTEXT.md` with your project info and `CLAUDE.md` (or AGENTS.md) for AI integration.

### Step 2: Test with AI (1 minute)
Start your AI tool (Claude Code, Cursor, etc.) - it now reads your project context automatically.

**Try this:** Ask AI to "add input validation to the login form"
- **Before ctxforge:** AI guesses, writes generic code
- **With ctxforge:** AI knows your validation patterns, error handling, and UI components

### Step 3: Generate specifications (30 seconds)
```bash
npx ctxforge spec "users need to filter products by category"
```
**What happens:** AI analyzes your request and creates a detailed behavioral specification in `docs/context/behavioral-specs/`

## Framework Components

### Generated Files
- **`CONTEXT.md`** - Central project knowledge base containing architecture, patterns, and standards
- **`CLAUDE.md` / `AGENTS.md`** - AI tool integration files for seamless context loading  
- **`docs/context/`** - Performance directives, behavioral specifications, and domain expertise

### Engineering Standards Applied
- **Algorithmic efficiency** with documented time complexity requirements
- **Memory management** patterns including cleanup and leak prevention
- **Accessibility compliance** with semantic HTML and keyboard navigation
- **Security practices** for input validation and data handling

### Language and Framework Support
Compatible with JavaScript, Python, Go, Rust, Java, C# and frameworks including React, Vue, Django, Rails, Express, FastAPI. Integrates with Claude Code, Cursor, ChatGPT, Gemini CLI, and other AI development tools.

## Implementation Example

Consider a typical request: "Add search functionality to the product catalog."

### Standard AI Response
```javascript
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // Issues: No debouncing, potential memory leaks, unoptimized API calls
    fetch(`/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, [query]);
  
  return <div>{/* basic implementation */}</div>;
}
```

### Context-Aware Implementation
```javascript
function SearchComponent({ products }) {
  const [query, setQuery] = useState('');
  
  // Applies project-specific patterns and performance standards
  const filteredProducts = useMemo(() => {
    if (query.length < 2) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);
  
  const debouncedQuery = useDebounce(query, 300);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
      />
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

The context-aware implementation automatically applies debouncing, memoization, accessibility standards, and appropriate algorithm selection based on data size and project patterns.

## Useful Commands

```bash
# Initialize framework in your project
npx ctxforge guided

# Generate behavioral specifications  
npx ctxforge spec "users need to upload files with drag and drop"

# Validate setup
npx ctxforge validate

# Check project health  
npx ctxforge health
```

**Each command takes 10-30 seconds and gives immediate feedback.**

## Frequently Asked Questions

**How long does initial setup require?**  
Setup typically takes 2-3 minutes, primarily spent providing project-specific information during the guided initialization process.

**Is integration required with specific AI tools?**  
No. ctxforge generates standard context files that any AI coding assistant can read, maintaining compatibility with your current development workflow.

**What happens if my project uses unsupported technologies?**  
The framework automatically detects over 20 programming languages and frameworks. For unsupported technologies, it provides generic engineering standards that can be customized for your specific stack.

**Can the applied standards be modified?**  
Yes. All generated files including `CONTEXT.md` and performance directives are fully editable to match your team's specific requirements and coding standards.

**Does ctxforge transmit code or project data externally?**  
⚠️ No. All operations are performed locally. ctxforge only creates context files that your AI assistant reads during development sessions.

---

**Documentation:** [docs/README.md](docs/README.md) | **Issues:** [GitHub Issues](https://github.com/vencolini/ctxforge/issues) | **npm:** [ctxforge](https://www.npmjs.com/package/ctxforge)