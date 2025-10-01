# Step 2: Verification (30 seconds)

Quick validation that ctxforge is properly installed and configured.

---

## Health Check Commands

Run these commands to verify your setup:

```bash
# Comprehensive framework validation
npx ctxforge validate

# Current context status
npx ctxforge status

# Context health monitoring
npx ctxforge health
```

---

## Expected Output

### ✅ Successful Validation

```bash
$ npx ctxforge validate

🔍 Validating ctxforge framework compliance...

✅ CONTEXT.md exists
✅ LLM context files present
✅ Framework structure valid
✅ Project learnings format
✅ Performance directives accessible

📊 Framework Compliance: 5/5 checks passed
🎉 Framework is properly configured!
```

### ✅ Healthy Context Status

```bash
$ npx ctxforge status

📋 Current Context Status

📄 CONTEXT.md: 15KB
🎯 Current Feature: None active
📸 State Snapshots: 0 files
🧠 Project Learnings: 0 documented
```

### ✅ Good Health Score

```bash
$ npx ctxforge health

🏥 Context Health Report

📊 Health Metrics:
   Size: 15KB ✅ (Target: <50KB)
   Active Features: 0
   Completed Features: 0
   Project Learnings: 0
   State Snapshots: 0

🎯 Health Score:
   Overall: 95/100 🟢
```

---

## What Each Check Means

### Framework Compliance Checks

| Check | What It Validates |
|-------|------------------|
| **CONTEXT.md exists** | Primary context file is created |
| **LLM context files present** | At least one of CLAUDE.md, AGENTS.md, etc. exists |
| **Framework structure valid** | Required directories exist (docs/context/, etc.) |
| **Project learnings format** | CONTEXT.md has proper sections |
| **Performance directives accessible** | Code quality rules are available |

### Health Metrics

| Metric | Meaning | Target |
|--------|---------|--------|
| **Size** | CONTEXT.md file size | <50KB |
| **Active Features** | Features currently being developed | 0-2 |
| **Completed Features** | Finished features | Any number |
| **Project Learnings** | Documented technical pitfalls | Grows over time |
| **State Snapshots** | Context compression files | Managed automatically |

---

## Troubleshooting Validation Issues

### ❌ "CONTEXT.md not found"

**Fix:**
```bash
# Re-run initialization
npx ctxforge init

# Or guided setup
npx ctxforge guided
```

### ❌ "Framework structure invalid"

**Issue:** Missing required directories

**Fix:**
```bash
# Create missing directories
mkdir -p docs/context/behavioral-specs
mkdir -p docs/context/state-snapshots
mkdir -p docs/templates

# Re-run validation
npx ctxforge validate
```

### ❌ "LLM context files missing"

**Issue:** No CLAUDE.md, AGENTS.md, etc.

**Fix:**
```bash
# Re-run initialization to create LLM files
npx ctxforge init
```

### ❌ "Performance directives not accessible"

**Issue:** Missing performance-directives directory

**Fix:**
```bash
# Check if directory exists
ls docs/context/performance-directives/

# If missing, re-run setup
npx ctxforge guided
```

---

## Validation Success Indicators

✅ **All 5 compliance checks pass**  
✅ **Health score 80+ (Green)**  
✅ **CONTEXT.md size reasonable (<50KB)**  
✅ **Status command shows project info**  

---

## Quick Fixes for Common Issues

### Low Health Score
```bash
# Clean up old files
npx ctxforge optimize

# Check specific recommendations
npx ctxforge health
```

### Large Context File
```bash
# Optimize automatically
npx ctxforge optimize

# Manual cleanup if needed
# Archive completed features to separate files
```

### Missing Components
```bash
# Fresh installation
npx ctxforge guided  # Will detect and fix issues
```

---

## Verification Complete

If all checks pass, you're ready for the next step!

**✅ Validation successful** → Continue to [Step 3: Start Your LLM](step-3.md)

**❌ Issues found:**
1. Review error messages above
2. Apply suggested fixes
3. Re-run validation
4. Continue when all checks pass

---

**Time so far:** 2.5 minutes  
**Remaining:** 2.5 minutes to working implementation