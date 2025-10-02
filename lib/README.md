# ctxforge Library

Internal implementation modules for ctxforge v2.0.

## Structure

```
lib/
├── framework/          # v2.0 Context Discovery Framework (60K tokens)
│   ├── FRAMEWORK.md
│   ├── LLM-INSTRUCTIONS.md
│   ├── PERFORMANCE-DIRECTIVES.md
│   ├── DISCOVERY-QUESTIONS.md
│   └── TEMPLATES.md
├── commands/           # CLI command implementations
│   ├── init.js        # Framework installation
│   ├── validate.js    # Framework validation
│   ├── health.js      # Context health monitoring
│   ├── status.js      # Project status
│   ├── optimize.js    # Context optimization
│   └── spec.js        # Specification generation
└── utils/             # Shared utilities
    ├── projectDetection.js
    ├── healthCalculation.js
    └── fileOperations.js
```

## Framework Files (lib/framework/)

These 5 markdown files form the complete v2.0 framework:
- Copied to user projects by `ctxforge init`
- Read by LLMs to enable context discovery
- Total: 60K tokens (81% reduction from v1.0)

## Commands (lib/commands/)

Each command is a focused module implementing one CLI operation.

## Utilities (lib/utils/)

Shared functions used across commands.
