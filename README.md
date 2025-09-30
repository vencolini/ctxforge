# ctxforge

> Context Engineering Framework for LLM-Assisted Development

[![npm version](https://badge.fury.io/js/ctxforge.svg)](https://www.npmjs.com/package/ctxforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## The Problem

Working with AI coding assistants (Claude Code, Gemini CLI, ChatGPT) often leads to:

- **Silent drift**: AI makes wrong assumptions, you only discover this after bad code is written
- **Context loss**: Long projects lose important details, causing repeated mistakes  
- **Quality inconsistency**: Sometimes great code, sometimes poor - no consistent standards
- **Verification overhead**: You spend more time fixing AI code than writing it yourself

## The Solution

ctxforge establishes a **two-phase process**:

1. **Context Engineering**: You describe WHAT users need, AI shows HOW it will build it, you approve before any coding
2. **Autonomous Execution**: AI builds with enforced best practices and maintains context automatically

**Result**: High-quality code that gets better over time, with minimal human intervention.

## Quick Start

```bash
# Initialize in your project
npx ctxforge init

# Start with your AI assistant
claude-code --file docs/context/llm-instructions.md
```

That's it! The AI now follows structured context engineering.

## Key Features

- ✅ **Behavior-first specification** - Describe what users do, not how to code it
- ✅ **Performance by default** - Best practices enforced automatically (Big O, memoization, cleanup)
- ✅ **Context preservation** - Never lose project state across sessions
- ✅ **Learning system** - Mistakes documented and prevented in future
- ✅ **Universal compatibility** - Works with Claude Code, Gemini CLI, ChatGPT, any LLM

## Example: Before vs After

**Before ctxforge:**
```
You: "Add search functionality"
AI: [Writes code immediately, makes assumptions]
You: [Discovers bugs, wrong patterns, poor performance]
```

**With ctxforge:**
```
You: "Users need to search products by typing"
AI: "I'll implement with:
     - Client-side filtering (5K items manageable)
     - Debouncing 300ms
     - Case-insensitive matching
     Approve before I code?"
You: "Approved"
AI: [Writes high-quality code with best practices]
```

## Works With

- **Claude Code** (Anthropic)
- **Gemini CLI** (Google)  
- **ChatGPT** (OpenAI)
- Any LLM that can read files

## Supports

- **Any language**: JavaScript, Python, Go, Rust, Java...
- **Any framework**: React, Vue, Django, Rails, Express...
- **Any project type**: Web, mobile, backend, ML, desktop...

## Installation

```bash
# Global installation
npm install -g ctxforge

# Or use directly (no installation)
npx ctxforge init
```

## Documentation

- [Quick Start Guide](docs/quick-start.md) - Get running in 5 minutes
- [Complete Guide](docs/context-engineering-guide.md) - Full walkthrough
- [Framework Overview](docs/README.md) - Detailed documentation

## Real Results

- **45 minutes**: React todo app from scratch to working
- **Zero debugging**: AI applies best practices automatically  
- **Perfect context**: Resume projects weeks later without explanation
- **Quality improvement**: Code gets better as project learns from mistakes

## Important Notes

⚠️ **LLM Quality Dependency**: This framework works **non-deterministically** and relies heavily on the underlying LLM's capabilities. Results will vary significantly based on:

- **Model quality**: Works best with high-capability models
- **Context following**: Some models follow structured instructions better than others
- **Consistency**: Lower-quality models may ignore directives or produce inconsistent results

**Recommended LLMs** (in order of effectiveness):
1. **Claude 3.7+,OpenAI GPT4+, Qwen 3+, Grok 4+, Gemini** via Claude Code, gemini cli, cline vs code extension, kilo code vsextension etc - Excellent instruction following
2. Avoid smaller/older models - may not follow framework consistently

## Contributing

This framework improves with use. Share your:
- Language-specific directives
- Domain patterns you discover
- Framework improvements

## License

MIT - Use freely, adapt to your needs, share improvements.

---

**Transform your AI coding experience**: `npx ctxforge init`