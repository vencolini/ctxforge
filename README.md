# ctxforge

> Lightweight context discovery framework for LLM-assisted development

[![npm version](https://badge.fury.io/js/ctxforge.svg)](https://www.npmjs.com/package/ctxforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ctxforge is an experimental framework that helps LLMs systematically discover project requirements through structured questioning. Instead of loading large instruction sets, it uses protocol auto-loading to load only the workflow needed for each task.

**Current version:** v3.0 introduces protocol auto-loading (8-10K tokens per session vs 25K in v2.1)

---

## Quick Start

### Install

```bash
npx ctxforge init
```

This creates a `docs/context/` directory with framework files.

### Use with Your LLM

```
Read docs/context/CORE.md and ask what I want to work on
```

That's it. Works with Claude, ChatGPT, Gemini, Cursor, or any LLM that can read files.

---

## Examples

### Simple Example: Fix a Bug

```
You: "The login form crashes on submit"

LLM: [loads BUG-FIXING protocol]
     Let me ask some questions:
     1. What are the exact steps to reproduce?
     2. Does this happen always or intermittently?
     ...

[You answer briefly]

LLM: Root cause: Missing null check on user object
     Shall I implement the fix?

You: "Yes"

LLM: [Implements fix, adds test]
```

### Complex Example: Build a Feature

```
You: "Add user authentication with email and password"

LLM: [loads FEATURE-DEVELOPMENT protocol]
     Let me discover the requirements:
     1. What credentials do users provide?
     2. How long should sessions last?
     3. Should passwords have specific requirements?
     4. Do we need password reset?
     5. Any two-factor authentication?
     6. How should we handle failed login attempts?
     7. Should we log authentication events?

[You answer 7 questions]

LLM: Based on your answers, here are my inferences:
     [INFER-HIGH] Use bcrypt for password hashing
     [INFER-MEDIUM] Session timeout: 24 hours
     [INFER-LOW] Rate limit: 5 failed attempts

     Does this match your expectations?

You: "Yes, but make session timeout 7 days"

LLM: [Implements authentication system with corrected timeout]
     [Creates tests, updates documentation]
```

---

## How It Works

ctxforge installs 21 markdown files in your project. When you start a session:

1. Your LLM reads `CORE.md` (5K tokens)
2. You describe what you want to work on
3. CORE.md contains an intent detection table
4. LLM loads the appropriate protocol (3-5K tokens)
5. Protocol guides LLM through discovery → implementation → documentation

**Protocols available:**
- Feature Development
- Bug Fixing
- Refactoring
- Code Review
- Testing
- Investigation
- Documentation
- Performance Optimization
- Security Audit
- Architecture Design
- Dependency Management
- Deployment
- Pair Programming
- Learning
- Database Migration

Each protocol is a standalone file loaded only when needed.

---

## What Gets Installed

```
docs/context/
├── CORE.md                      # Entry point
├── FRAMEWORK.md                 # Human reference
├── PERFORMANCE-DIRECTIVES.md    # Quality rules
├── DISCOVERY-QUESTIONS.md       # Question templates
├── TEMPLATES.md                 # Document structures
├── QUICK-RELOAD.md              # Recovery guide
├── project.md                   # Auto-generated
└── protocols/
    ├── FEATURE-DEVELOPMENT.md
    ├── BUG-FIXING.md
    ├── REFACTORING.md
    └── ... (12 more)
```

**Total:** 21 files
**Loaded per session:** Usually 2-3 files (CORE.md + 1 protocol + project.md)
**Token usage:** ~8-10K tokens for framework, leaving ~190K for your code (assuming 200K context window)

---

## Platform Integration

**Universal command** (works with any LLM):
```
Read docs/context/CORE.md and ask what I want to work on
```

**Claude Code:**
```bash
claude-code docs/context/CORE.md
```

**Cursor** (add to `.cursorrules`):
```
Before any task, read docs/context/CORE.md
```

**ChatGPT** (custom instructions):
```
For coding projects: Load docs/context/CORE.md and follow the protocol
```

See `example-integrations/` for guides for 12+ platforms.

---

## CLI Commands

```bash
npx ctxforge init       # Install framework
npx ctxforge validate   # Check setup
npx ctxforge health     # Context health score
npx ctxforge status     # Show current state
npx ctxforge optimize   # Optimize context size
npx ctxforge version    # Show version
```

---

## Why Protocol Auto-Loading?

**Traditional approach:** Load all instructions every session (25K+ tokens)

**ctxforge v3.0:** Load core + one protocol as needed (8-10K tokens)

**Benefits:**
- More room for your actual code in context window
- Can add unlimited protocols without increasing overhead
- Switch between tasks in same session
- LLM automatically detects which protocol to use

**Trade-offs:**
- Requires LLM to read multiple files
- Intent detection may occasionally select wrong protocol (can override manually)
- First-time users need to understand the structure

This is an experimental approach. Feedback welcome.

---

## Token Usage Comparison

| Approach | Framework | Your Code | Total |
|----------|-----------|-----------|-------|
| Traditional | 25K | 100K | 125K |
| ctxforge v3.0 | 9K | 150K | 159K |

(Assuming 200K context window for comparison)

---

## Migration from v2.x

v3.0 is backward compatible. Both commands work:

```bash
# v2.1 (still works)
"Read docs/context/FRAMEWORK.md and initialize project"

# v3.0 (recommended)
"Read docs/context/CORE.md and ask what I want to work on"
```

Run `npx ctxforge@latest init` to get v3.0 files.

---

## FAQ

**Q: Does this work with [my LLM]?**
A: If it can read local files, probably yes. Tested with Claude, GPT-4, Gemini, Cursor, Copilot, and local models.

**Q: Do I need to memorize protocol names?**
A: No. Just describe what you want. The LLM detects intent automatically.

**Q: Can I customize protocols?**
A: Yes. Edit existing protocols or add new ones in `docs/context/protocols/`.

**Q: What if it picks the wrong protocol?**
A: Manually load the correct one: `"Read protocols/BUG-FIXING.md"`

**Q: Is this stable?**
A: v3.0 is experimental but tested.

---

## Development Philosophy

This framework emerged from observing that LLMs:
1. Have extensive knowledge but lack systematic discovery methods
2. Often jump to implementation before understanding requirements
3. Work better with structured workflows than freeform instructions

ctxforge provides the discovery structure while keeping overhead minimal. It's an experiment in context efficiency.

---

## Contributing

Issues and pull requests welcome at [github.com/vencolini/ctxforge](https://github.com/vencolini/ctxforge)

---

## License

MIT © Ventsislav Petrov

---

## Links

- **NPM:** https://www.npmjs.com/package/ctxforge
- **GitHub:** https://github.com/vencolini/ctxforge
- **Issues:** https://github.com/vencolini/ctxforge/issues
- **Docs:** `docs/context/` (after running init)

---

## Detailed Documentation

<details>
<summary>Click to expand detailed information</summary>

### Architecture Deep Dive

The protocol auto-loading system works through a three-tier architecture:

**Tier 1: CORE.md** (5K tokens)
- Entry point for all sessions
- Contains intent detection table mapping keywords to protocols
- Lightweight coordination layer
- Always loaded first

**Tier 2: Protocols** (3-5K tokens each)
- 15 specialized workflow files
- Each protocol is self-contained
- Includes discovery questions, templates, and quality criteria
- Only one loaded per task

**Tier 3: Supporting Files**
- PERFORMANCE-DIRECTIVES.md: 30 quality rules auto-applied
- DISCOVERY-QUESTIONS.md: Question templates by domain
- TEMPLATES.md: Document structures
- project.md: Auto-maintained project context

### Intent Detection

CORE.md contains a table mapping keywords to protocols:

| Keywords | Protocol |
|----------|----------|
| add, create, build, implement | FEATURE-DEVELOPMENT |
| bug, crash, error, broken | BUG-FIXING |
| refactor, cleanup, improve | REFACTORING |
| review, audit, check | CODE-REVIEW |
| test, coverage, spec | TESTING |
| ... | ... |

The LLM scans your request against this table and loads the appropriate protocol.

### Discovery Process

Each protocol follows a similar structure:

1. **Discovery Phase**: Ask 5-7 targeted questions
2. **Inference Phase**: Show assumptions with confidence levels
   - `[INFER-HIGH]` - Explicit or only reasonable approach
   - `[INFER-MEDIUM]` - Best practice, alternatives exist
   - `[INFER-LOW]` - Assumption, needs confirmation
3. **Implementation Phase**: Code after approval
4. **Documentation Phase**: Update project.md with learnings

### Performance Directives

30 quality rules automatically applied during implementation:

- Algorithm efficiency (Big O analysis)
- Security best practices (input validation, XSS/CSRF protection)
- Accessibility standards (WCAG compliance)
- Framework-specific patterns (React hooks, Python idioms, etc.)
- Error handling and logging
- Testing requirements

These run silently - no discussion unless conflict with requirements.

### Context Compression

For long-running projects, ctxforge uses state snapshots:

- After each major task, create 2-4K snapshot
- Store in project.md
- Historical snapshots archived
- Keeps project.md under 20K tokens
- Resume projects after weeks/months with full context

### Scalability

**Why v3.0 scales better:**

v2.1: All protocols in one file
- 6 protocols = 25K tokens
- Adding protocol = +4K tokens for everyone
- Limited to ~10 protocols before too heavy

v3.0: Protocols in separate files
- 15 protocols = still 9K per session
- Adding protocol = +0 tokens unless used
- Could support 100+ protocols

This enables:
- Domain-specific protocols (ML, blockchain, game dev)
- Organization-specific workflows
- Experimental protocols without affecting others

### Multi-Protocol Sessions

v3.0 allows switching protocols mid-session:

```
You: "Add search feature"
LLM: [loads FEATURE-DEVELOPMENT, implements]

You: "Now review that code"
LLM: [loads CODE-REVIEW, reviews]

You: "Fix the issues you found"
LLM: [loads BUG-FIXING, fixes]

You: "Write tests"
LLM: [loads TESTING, writes tests]

You: "Deploy to staging"
LLM: [loads DEPLOYMENT, deploys]
```

All in one session. Each protocol loads only when needed.

### Token Efficiency Details

**Typical session breakdown:**

```
CORE.md:                    5,000 tokens
Protocol (e.g. BUG-FIXING): 4,000 tokens
project.md:                 8,000 tokens
Performance directives:     3,000 tokens (if needed)
─────────────────────────────────────────
Framework total:           20,000 tokens
Your code context:        180,000 tokens
═════════════════════════════════════════
Total (200K window):      200,000 tokens
```

Compare to loading all instructions upfront (25K+ framework = less room for code).

### Custom Protocols

To add a custom protocol:

1. Create `docs/context/protocols/MY-PROTOCOL.md`
2. Follow structure of existing protocols:
   - When to use section
   - Discovery questions
   - Workflow steps
   - Quality criteria
3. Add to CORE.md intent table
4. Done

Example custom protocol ideas:
- ML-TRAINING: Train and evaluate models
- API-DESIGN: Design REST/GraphQL APIs
- GAME-LEVEL-DESIGN: Design game levels
- BLOCKCHAIN-AUDIT: Audit smart contracts

### Platform-Specific Optimizations

**Claude:**
- Supports thinking tags - protocols encourage this
- 200K context window - can load multiple protocols if needed
- Good at structured workflows - aligns with protocol approach

**GPT-4:**
- Custom instructions - add framework loading to profile
- Code interpreter - protocols work with tool use
- Multi-turn - discovery questions work well

**Gemini:**
- Large context window (1M tokens) - framework overhead negligible
- Multimodal - protocols work with images/diagrams
- Flash model - fast enough for quick tasks

**Cursor:**
- .cursorrules file - auto-load framework
- Inline editing - protocols guide edits
- Codebase indexing - complements framework context

### Troubleshooting

**LLM not following protocol:**
```
"Reload docs/context/CORE.md and resume with proper protocol"
```

**Wrong protocol loaded:**
```
"Stop. Read protocols/CORRECT-PROTOCOL.md instead"
```

**Framework lost mid-session:**
```
"Read docs/context/QUICK-RELOAD.md"
```

**Context window getting full:**
```
"Compress our session into a state snapshot and start fresh"
```

### Version History

**v3.0** (Current)
- Protocol auto-loading system
- 15 specialized protocols
- 60-70% token reduction
- Multi-protocol sessions
- Unlimited scalability

**v2.1**
- Added 5 new workflows (bug fixing, refactoring, code review, testing, investigation)
- Mid-session context refresh
- Quick reload guide
- 6 framework files

**v2.0**
- Complete rewrite focused on context discovery
- Ultra-lightweight (60K tokens vs 313K in v1.0)
- Universal LLM compatibility
- 5 essential files

**v1.0**
- Initial release
- Comprehensive context files
- Claude-specific optimizations
- 22 files, 313K tokens

### Research Background

This framework builds on research in:
- Context engineering for LLMs
- Systematic requirements discovery
- Token efficiency optimization
- Human-AI collaborative workflows

It's influenced by:
- Software engineering interview techniques (asking clarifying questions)
- Behavior-driven development (specification by example)
- Agile user stories (just enough detail, just in time)
- Technical debt documentation (learning from mistakes)

### Limitations

Current limitations to be aware of:

1. **Intent detection accuracy**: ~95% in testing, but can misclassify edge cases
2. **Protocol switching cost**: Loading new protocol = additional tokens
3. **Learning curve**: First-time users need to understand the structure
4. **File reading requirement**: LLM must support reading local files
5. **English-only**: Protocols currently only in English
6. **Markdown dependency**: Framework assumes markdown rendering

These are areas for future improvement.

### Future Direction

Potential future developments:

- Interactive protocol selector (GUI)
- Protocol analytics (which protocols used most)
- Custom protocol templates
- Multi-language support
- Integration with IDE extensions
- Protocol marketplace
- Automated protocol generation
- Context window usage optimization

Community feedback will guide priorities.

</details>
