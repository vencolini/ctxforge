# 5-Minute ctxforge Quick Start

**Time to complete:** 5 minutes  
**Result:** Working ctxforge setup with sample feature ready to implement

---

## What You'll Learn

By the end of this guide, you will have:

- **ctxforge installed** in your project  
- **Universal LLM integration** working with any AI tool  
- **Sample behavioral specification** ready to implement  
- **First feature implementation** started with your LLM  

## Prerequisites

- Any LLM tool: Claude Code, Cursor, Gemini CLI, ChatGPT, etc.
- Node.js 14+ (for the ctxforge CLI)
- A project directory (empty or existing)

---

## Step 1: Install & Initialize (2 minutes)

### Option A: Guided Setup (Recommended)
```bash
# Interactive setup that detects your project type
npx ctxforge guided
```

### Option B: Standard Setup
```bash
# Basic setup without project detection
npx ctxforge init
```

**What happens:**
- Framework files installed to `docs/context/`
- Universal LLM integration created (CLAUDE.md, AGENTS.md, etc.)
- Sample behavioral specification generated
- Project-specific templates customized

---

## Step 2: Verify Setup (30 seconds)

```bash
# Check everything is working
npx ctxforge validate
npx ctxforge status
```

**Expected output:**
```
✅ CONTEXT.md exists
✅ Framework structure valid
✅ Project learnings format
✅ Performance directives accessible

📊 Framework Compliance: 4/4 checks passed
🎉 Framework is properly configured!
```

**Note:** Don't worry if you see "LLM context files present" as a failed check - that's expected in the framework repository itself. The files get created when you run `npx ctxforge init` in your actual projects.

---

## Step 3: Start Your LLM Tool (30 seconds)

### Any of these commands will work:

```bash
claude          # Claude Code
cursor          # Cursor
gemini-cli      # Gemini CLI
```

**Or manually:** Open your preferred LLM tool and load your project.

---

## Step 4: Implement Sample Feature (2 minutes)

### Tell your LLM:

> "Let's implement the sample feature from the behavioral spec in docs/context/behavioral-specs/sample-feature.md"

**What happens next:**
1. LLM reads CONTEXT.md automatically
2. LLM follows ctxforge validation checklist
3. LLM breaks down feature into atomic tasks
4. LLM implements with performance directives applied
5. LLM creates state snapshots for next session

---

## 🎉 Success!

If you see your LLM:
- **Reading the behavioral spec** and restating the goal
- **Listing performance directives** it will apply  
- **Breaking down the implementation** into tasks
- **Writing high-quality code** with best practices

**You're successfully using ctxforge!**

---

## What's Next?

### Immediate Next Steps:
1. **Complete the sample feature** with your LLM
2. **Review the generated code** - notice the quality
3. **Check project health:** `npx ctxforge health`

### For Your Real Project:
1. **Replace sample spec** with your actual feature
2. **Start developing** - watch ctxforge guide the process
3. **Add project learnings** as you discover patterns

### Learn More:
- **Deep dive:** Read `docs/reference/` for complete documentation
- **Advanced features:** Check `docs/advanced/` for power-user tips
- **Troubleshooting:** Common issues and solutions

---

## Troubleshooting

### ❌ "Command not found"
```bash
# Make sure you have Node.js installed
node --version

# Try with npx explicitly
npx ctxforge@latest guided
```

### ❌ "LLM not reading CONTEXT.md"
```bash
# Verify files exist
npx ctxforge validate

# Check your LLM tool supports file reading
# Some require explicit file specification
```

### ❌ "Guided setup failed"
```bash
# Use standard setup instead
npx ctxforge init

# Then manually review docs/context/ files
```

### ❌ "Framework not working as expected"
- Check `docs/reference/troubleshooting.md` for detailed solutions
- Run `npx ctxforge health` for diagnostics
- Ensure your LLM is high-quality (Claude 3.5+, GPT-4+, etc.)

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npx ctxforge guided` | Interactive setup with project detection |
| `npx ctxforge init` | Standard framework installation |
| `npx ctxforge validate` | Check framework compliance |
| `npx ctxforge status` | Show current context state |
| `npx ctxforge health` | Context health monitoring |
| `npx ctxforge optimize` | Clean up old context files |

---

**Total time:** 5 minutes to working ctxforge setup  
**Next:** Start building with your LLM and watch the quality improve!

**Need help?** Check `docs/reference/` for detailed documentation.