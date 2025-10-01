# Context Integration Map

**Purpose:** Define relationships between context files and provide clear navigation for LLMs and users.

**Single Responsibility:** This file ONLY maps context relationships - it doesn't duplicate content.

---

## Context File Architecture

### **Core Framework Files (Read First)**
```
1. llm-instructions.md          → Primary workflow and responsibilities
2. context-engineering-guide.md → Complete methodology  
3. performance-directives/      → Non-negotiable code quality rules (modular)
4. llm-validation-checklist.md  → Pre-task validation protocol
```

### **Context Discovery System (New Feature)**
```
5. context-discovery-guide.md     → How to analyze user requests
6. domain-knowledge-patterns.md   → Best practices by domain
7. specification-generation-guide.md → How to create behavioral specs
```

### **Templates & References**
```
8. README.md                    → Framework overview
9. framework-summary.md         → Complete feature summary
10. quick-start.md             → 5-minute setup guide
```

### **Working Files (Generated/Updated)**
```
11. behavioral-specs/          → Feature specifications
12. state-snapshots/          → Context compression
13. templates/                → Reusable templates
```

---

## Integration Workflows

### **For New Projects**
```
LLM Reading Order:
1. llm-instructions.md (sections 1-3: Role, Framework Usage, Project Init)
2. context-engineering-guide.md (project setup)
3. performance-directives/README.md (quality standards overview)
4. llm-validation-checklist.md (validate setup)
```

### **For Ongoing Development**
```
LLM Reading Order:
1. llm-instructions.md (section 4: Session Management)
2. CONTEXT.md (project-specific context)
3. Latest state-snapshot (if mid-feature)
4. performance-directives/ modules (refresh quality rules)
```

### **For New Feature Requests (Context Discovery)**
```
LLM Reading Order:
1. context-discovery-guide.md (analysis methodology)
2. domain-knowledge-patterns.md (domain expertise)
3. Current project context (existing patterns)
4. specification-generation-guide.md (output format)
```

### **For Feature Implementation**
```
LLM Reading Order:
1. Behavioral specification (from behavioral-specs/)
2. performance-directives/README.md + task-specific modules (quality requirements)
3. CONTEXT.md (project patterns)
4. llm-validation-checklist.md (pre-implementation check)
```

---

## Context Dependencies

### **Core Dependencies (Always Required)**
- `llm-instructions.md` → References all other files
- `performance-directives/README.md` → Applied in all workflows (load specific modules by task)
- `llm-validation-checklist.md` → Used in all processes

### **Conditional Dependencies**
- `context-discovery-guide.md` → Only for new feature analysis
- `domain-knowledge-patterns.md` → Only during specification creation
- `specification-generation-guide.md` → Only when creating behavioral specs
- `context-engineering-guide.md` → Only for project initialization
- `performance-directives/[category].md` → Load specific directive modules by task type

### **Project-Specific Dependencies**
- `CONTEXT.md` → Universal project context (always read)
- `behavioral-specs/*.md` → Feature-specific context
- `state-snapshots/*.md` → Session continuity context

---

## File Relationships

### **Primary → Secondary References**
```
llm-instructions.md
├── → context-engineering-guide.md (project setup)
├── → performance-directives/ (quality standards - modular)
├── → llm-validation-checklist.md (validation)
├── → context-discovery-guide.md (NEW: feature analysis)
└── → CONTEXT.md (project context)

context-discovery-guide.md
├── → domain-knowledge-patterns.md (domain expertise)
└── → specification-generation-guide.md (output format)

specification-generation-guide.md
├── → performance-directives/ (quality requirements)
├── → behavioral-spec templates (output format)
└── → domain-knowledge-patterns.md (best practices)
```

### **Bidirectional References**
```
performance-directives/ ←→ domain-knowledge-patterns.md
(Quality standards inform domain patterns, domain patterns specify quality criteria)

behavioral-specs/*.md ←→ state-snapshots/*.md  
(Specs drive implementation, snapshots capture progress)
```

---

## Context Loading Strategies

### **Minimal Context (Token Efficient)**
For simple tasks or established projects:
```
1. llm-instructions.md (workflow only)
2. CONTEXT.md (project context)
3. performance-directives/README.md + relevant modules (quality check)
```

### **Discovery Context (New Features)**
For analyzing new feature requests:
```
1. context-discovery-guide.md (methodology)
2. domain-knowledge-patterns.md (expertise)
3. Project context (existing patterns)
4. specification-generation-guide.md (output)
```

### **Implementation Context (Feature Development)**
For implementing defined features:
```
1. Behavioral specification (requirements)
2. performance-directives/README.md + task-specific modules (quality)
3. CONTEXT.md (project patterns)
4. Latest state snapshot (progress)
```

### **Full Context (Complex Projects)**
For complex or unfamiliar projects:
```
1. Complete core framework files (1-4)
2. Relevant discovery files (5-7) 
3. Project-specific context
4. Historical snapshots for patterns
```

---

## Integration Principles

### **DRY (Don't Repeat Yourself)**
- **No content duplication** between files
- **Single source of truth** for each concept
- **References instead of copies**

### **SOLID Principles Applied**
- **Single Responsibility:** Each file has one clear purpose
- **Open/Closed:** New domains extend domain-knowledge-patterns.md
- **Liskov Substitution:** Templates are interchangeable 
- **Interface Segregation:** LLMs read only needed context
- **Dependency Inversion:** High-level workflow depends on abstractions

### **Context Economy**
- **Load only necessary files** for current task
- **Progressive context loading** based on complexity
- **Clear entry/exit points** for each workflow

---

## Usage Guidelines

### **For LLMs**
1. **Start with this map** to understand context structure
2. **Follow reading order** for your current task type
3. **Load minimal context** for simple tasks
4. **Reference dependencies** as needed during work

### **For Framework Maintainers**
1. **Update this map** when adding new context files
2. **Maintain single sources of truth** - avoid duplication
3. **Validate relationships** when modifying core files
4. **Test integration workflows** after changes

### **For Project Teams**
1. **Customize domain patterns** for your specific needs
2. **Extend performance directives** with project-specific rules
3. **Reference this map** when training team members
4. **Use minimal context strategies** for routine work

---

**Last Updated:** 2025-10-01  
**Version:** 1.2.0 (includes context discovery system and modular directives)  
**Maintainer:** ctxforge framework team