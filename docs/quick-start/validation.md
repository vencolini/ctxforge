# Quick Start Validation Checklist

Use this checklist to verify your ctxforge setup is working correctly.

---

## ✅ Installation Validation

### Step 1 Complete:
- [ ] **ctxforge CLI available:** `npx ctxforge --help` shows commands
- [ ] **Framework files installed:** `docs/context/` directory exists
- [ ] **CONTEXT.md created:** Main context file exists in project root
- [ ] **LLM integration files:** At least one of CLAUDE.md, AGENTS.md, GEMINI.md, CODEX.md exists

### Step 2 Complete:
- [ ] **Validation passes:** `npx ctxforge validate` shows 5/5 checks passed
- [ ] **Health score good:** `npx ctxforge health` shows 80+ score
- [ ] **Status shows data:** `npx ctxforge status` displays context metrics

---

## ✅ LLM Integration Validation

### Universal File Access:
- [ ] **CONTEXT.md readable:** File opens and contains project structure
- [ ] **LLM files point correctly:** CLAUDE.md/AGENTS.md redirect to CONTEXT.md
- [ ] **Sample spec exists:** `docs/context/behavioral-specs/sample-feature.md` created

### LLM Tool Compatibility:
Choose one and verify:
- [ ] **Claude Code:** `claude` command loads project correctly
- [ ] **Cursor:** Opens project and reads AGENTS.md → CONTEXT.md
- [ ] **Gemini CLI:** `gemini-cli` loads GEMINI.md → CONTEXT.md
- [ ] **Other LLM:** Tool can read CONTEXT.md file

---

## ✅ Framework Functionality Validation

### Context Engineering Ready:
- [ ] **Performance directives accessible:** `docs/context/performance-directives/` directory exists
- [ ] **LLM instructions available:** `docs/context/llm-instructions.md` exists
- [ ] **Validation checklist present:** `docs/context/llm-validation-checklist.md` exists
- [ ] **Templates copied:** `docs/templates/` contains 4+ template files

### Sample Feature Ready:
- [ ] **Behavioral spec readable:** Sample feature spec makes sense for your project
- [ ] **Project type detected:** Sample matches your framework (React, Python, etc.)
- [ ] **Success criteria clear:** Spec contains testable outcomes

---

## ✅ Quality Check

### Framework Compliance:
```bash
# All should return success
npx ctxforge validate  # 5/5 checks passed
npx ctxforge health     # 80+ health score
npx ctxforge status     # Shows meaningful data
```

### File Structure:
```
your-project/
├── ✅ CONTEXT.md
├── ✅ [LLM-file].md (CLAUDE.md or AGENTS.md or GEMINI.md)
└── docs/
    ├── context/
    │   ├── ✅ performance-directives/
    │   │   ├── README.md
    │   │   └── [specific modules]
    │   ├── ✅ llm-instructions.md
    │   ├── ✅ llm-validation-checklist.md
    │   ├── behavioral-specs/
    │   │   └── ✅ sample-feature.md
    │   └── state-snapshots/
    └── templates/
        ├── ✅ behavioral-spec-template.md
        ├── ✅ task-execution-protocol.md
        ├── ✅ project-learnings-template.md
        └── ✅ state-snapshot-template.md
```

---

## ❌ Common Issues & Fixes

### Issue: Command not found
```bash
node --version          # Ensure Node.js 14+ installed
npx clear-npx-cache     # Clear cache if needed
npx ctxforge@latest guided  # Try with explicit version
```

### Issue: Validation fails
```bash
# Check specific error and re-run setup
npx ctxforge validate   # See which check fails
npx ctxforge guided     # Re-run guided setup
```

### Issue: LLM can't read files
- **Check file exists:** `ls CONTEXT.md`
- **Verify LLM tool supports file reading**
- **Try manual specification:** Point LLM directly to CONTEXT.md

### Issue: Poor health score
```bash
npx ctxforge optimize   # Clean up automatically
npx ctxforge health     # Check specific recommendations
```

---

## 🎯 Success Criteria

**You're ready to proceed when:**

✅ **All checkboxes above are checked**  
✅ **CLI validation commands succeed**  
✅ **Your LLM tool can read CONTEXT.md**  
✅ **Sample behavioral spec exists and makes sense**  

---

## Next Steps After Validation

### ✅ All checks pass:
→ **Continue to implementation:** [Step 4: First Feature](step-4.md)  
→ **Or start with your LLM:** [Step 3: Start Your LLM](step-3.md)

### ❌ Some checks fail:
→ **Review error messages** and apply fixes above  
→ **Re-run setup:** `npx ctxforge guided`  
→ **Get help:** Check `docs/reference/troubleshooting.md`

---

**Validation complete?** → Time to see ctxforge in action!