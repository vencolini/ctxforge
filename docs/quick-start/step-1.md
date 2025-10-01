# Step 1: Project Setup (2 minutes)

This step installs ctxforge in your project and creates the framework structure.

---

## Choose Your Setup Method

### 🚀 Guided Setup (Recommended)

**Best for:** Any project, especially if you want automatic configuration

```bash
npx ctxforge guided
```

**What it does:**
- 🔍 **Detects your project type** (React, Python, Go, etc.)
- 📋 **Generates customized templates** for your stack
- 🎯 **Creates sample behavioral spec** relevant to your framework
- 🔗 **Sets up universal LLM integration** (works with any AI tool)

**Output example:**
```
🚀 ctxforge Guided Setup

📊 Step 1: Analyzing your project...
✅ Project Type: Web Application
✅ Framework: React
✅ Language: TypeScript

📁 Step 2: Creating framework structure...
   ✓ Created docs/context/behavioral-specs
   ✓ Created docs/context/state-snapshots
   ✓ Created docs/templates

📝 Step 3: Generating customized templates...
   ✓ Created customized CONTEXT.md for React
   ✓ Copied performance directives modules with React-specific rules

🎯 Step 5: Creating sample behavioral specification...
   ✓ Created sample-feature.md
   📋 Sample feature: Interactive Button Component

🎉 Guided setup complete!
```

---

### ⚡ Standard Setup

**Best for:** Quick installation without customization

```bash
npx ctxforge init
```

**What it does:**
- 📁 **Creates basic framework structure**
- 📄 **Copies standard templates** (you customize later)
- 🔗 **Sets up universal LLM integration**

---

## What Gets Created

Both methods create this structure:

```
your-project/
├── CONTEXT.md                    # Universal project context
├── CLAUDE.md                     # Claude Code integration
├── AGENTS.md                     # Cursor/GPT integration  
├── GEMINI.md                     # Gemini CLI integration
├── CODEX.md                      # OpenAI Codex integration
└── docs/
    ├── context/
    │   ├── README.md             # Framework documentation
    │   ├── llm-instructions.md   # Instructions for LLMs
    │   ├── performance-directives/   # Code quality rules (modular)
    │   │   ├── README.md             # Main overview
    │   │   └── [specific modules]    # Category-specific directives
    │   ├── behavioral-specs/     # Feature specifications
    │   │   └── sample-feature.md # Example to get started
    │   └── state-snapshots/      # Context compression
    └── templates/                # Reusable templates
```

---

## Key Files Explained

### 🎯 CONTEXT.md
- **Primary file** that any LLM reads
- Contains project vision, architecture, current tasks
- **Living document** that evolves with your project

### 🔗 LLM Integration Files
- **CLAUDE.md** → Points Claude Code to CONTEXT.md
- **AGENTS.md** → Points Cursor to CONTEXT.md  
- **GEMINI.md** → Points Gemini CLI to CONTEXT.md
- **CODEX.md** → Points OpenAI tools to CONTEXT.md

### 📋 docs/context/
- **Complete framework documentation**
- **Performance directives** (non-negotiable code quality rules)
- **LLM instructions** (how AI tools should behave)
- **Sample behavioral spec** (ready-to-implement example)

---

## Verification

After setup completes, verify everything worked:

```bash
# Check framework compliance
npx ctxforge validate

# Show current context state  
npx ctxforge status
```

**Expected validation output:**
```
🔍 Validating ctxforge framework compliance...

✅ CONTEXT.md exists
✅ LLM context files present
✅ Framework structure valid
✅ Project learnings format
✅ Performance directives accessible

📊 Framework Compliance: 5/5 checks passed
🎉 Framework is properly configured!
```

---

## Troubleshooting

### Issue: "Command not found"
```bash
# Install Node.js first
node --version  # Should show v14+

# Try with explicit version
npx ctxforge@latest guided
```

### Issue: "Permission denied"
```bash
# On Linux/Mac, you might need:
sudo npm install -g ctxforge
ctxforge guided
```

### Issue: "Files already exist"
- ✅ **Safe:** ctxforge backs up existing files
- ✅ **Non-destructive:** Existing content is preserved
- ✅ **Additive:** Framework integration is prepended

### Issue: "Setup incomplete"
```bash
# Check what's missing
npx ctxforge validate

# Fix structure issues
npx ctxforge init  # Run standard setup
```

---

## What's Next?

✅ **Setup complete** → Continue to [Step 2: Verification](step-2.md)

**Or jump ahead:**
- [Step 3: Start Your LLM](step-3.md)  
- [Step 4: First Feature](step-4.md)
- [Complete Quick Start](README.md)

---

**Time so far:** 2 minutes  
**Remaining:** 3 minutes to working ctxforge implementation