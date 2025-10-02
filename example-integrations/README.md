# ctxforge Integration Examples

This folder contains example integration guides showing how to use ctxforge with different LLM platforms.

---

## Universal Command

The framework works with **any LLM** using this simple command:

```
Read docs/context/CORE.md and ask what I want to work on
```

---

## Platform-Specific Examples

### [INTEGRATION-GUIDE.md](./INTEGRATION-GUIDE.md) - Universal Guide
Complete integration guide for 12+ platforms:
- ChatGPT / GPT-4
- GitHub Copilot
- Cursor
- Codeium
- Continue.dev
- Windsurf
- Aider
- Local models (Ollama, LM Studio)
- Devin
- Replit AI
- CodeWhisperer
- Tabnine

### [CLAUDE.md](./CLAUDE.md) - Claude & Claude Code
Specific examples for:
- Claude.ai web interface
- Claude Code desktop/CLI
- Custom instructions
- API integration

### [GEMINI.md](./GEMINI.md) - Google Gemini
Examples for:
- Gemini web interface
- Gemini Studio
- API integration with Python
- Multimodal features

### [AGENTS.md](./AGENTS.md) - Agent Systems
Examples for autonomous agents:
- LangChain integration
- CrewAI multi-agent workflows
- Custom agent frameworks
- Tool definitions

---

## Quick Start

1. Install ctxforge:
   ```bash
   npx ctxforge init
   ```

2. Start your LLM with the universal command:
   ```
   Read docs/context/CORE.md and ask what I want to work on
   ```

3. The LLM will:
   - Ask what you want to work on
   - Detect your intent automatically
   - Load the appropriate protocol
   - Guide you through systematic development

---

## How It Works

```
Your Request → CORE.md (5K tokens) → Intent Detection → Load Protocol (4K tokens)
                                    ↓
                    "Add login" → FEATURE-DEVELOPMENT
                    "Fix bug"   → BUG-FIXING
                    "Review"    → CODE-REVIEW
                    "Test"      → TESTING
                    "Deploy"    → DEPLOYMENT
                    ... (15 protocols total)
```

---

## Integration Tips

### For Web-Based LLMs (ChatGPT, Claude, Gemini)
- Upload or paste CORE.md at session start
- Or add to custom instructions

### For IDE-Integrated LLMs (Cursor, Copilot, Codeium)
- Add framework command to `.cursorrules`, `.github/copilot-instructions.md`, etc.
- LLM reads files automatically from workspace

### For CLI/API LLMs (Aider, local models)
- Pass CORE.md content in system prompt
- Use file reading tools if available

### For Agent Systems (LangChain, CrewAI)
- Load CORE.md in system prompt
- Configure protocol auto-loading
- Define tools for file operations

---

## Files in This Folder

These are **example reference files** - NOT installed by `npx ctxforge init`.

They show different ways to integrate ctxforge with various LLM platforms. Pick the one relevant to your setup and follow the examples.

---

## Need Help?

- **Framework docs:** `docs/context/FRAMEWORK.md` (after installation)
- **Protocol list:** `docs/context/protocols/` (after installation)
- **GitHub issues:** [Report issues](https://github.com/yourusername/ctxforge/issues)

---

**The framework is LLM-agnostic** - these examples just show how to get started with popular platforms!
