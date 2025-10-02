# ctxforge for Google Gemini

**Quick integration guide for Google Gemini models**

---

## Installation

```bash
cd your-project
npx ctxforge init
```

---

## Usage

### Gemini Studio / AI Studio

1. Upload `docs/context/CORE.md` to the chat
2. Send message:
```
You've loaded the ctxforge framework. Ask me what we should work on and follow the protocol.
```

### Gemini API

```python
import google.generativeai as genai
import os

genai.configure(api_key=os.environ['GEMINI_API_KEY'])

# Load framework
with open('docs/context/CORE.md', 'r') as f:
    core_md = f.read()

with open('docs/context/project.md', 'r') as f:
    project_md = f.read()

model = genai.GenerativeModel('gemini-1.5-pro')

response = model.generate_content(
    f"{core_md}\n\n{project_md}\n\n"
    "Now ask me what we should work on and follow the framework protocol."
)

print(response.text)
```

### Gemini in IDEs (via extensions)

Add to workspace instructions:
```markdown
# Project Instructions

Load ctxforge framework:
1. Read docs/context/CORE.md
2. Ask what we're working on
3. Auto-detect intent and load protocol
4. Follow systematic discovery workflow
```

---

## Integration Examples

### Custom Instructions

Create `.gemini/instructions.md`:
```markdown
# Development Workflow

## Framework
Before starting any task:
- Read docs/context/CORE.md (framework core)
- Read docs/context/project.md (current state)
- Ask what we're working on
- Detect intent → load appropriate protocol

## Style
- Use structured sections with ## headers
- Show confidence levels for inferences
- Present code in clean blocks
- Checkpoints before implementation
```

### Gemini Code Assist

```
// .gemini/config
{
  "instructions": "Load docs/context/CORE.md and ask what to work on. Follow ctxforge discovery protocol.",
  "context_files": [
    "docs/context/CORE.md",
    "docs/context/project.md",
    "docs/context/PERFORMANCE-DIRECTIVES.md"
  ]
}
```

---

## Gemini-Specific Optimizations

### Structured Output
Gemini excels at structured responses. Framework uses:
- Clear section headers (`## Discovery Questions`)
- Bulleted lists for options
- Code blocks for examples
- Tables for comparisons

### Multimodal Context
Gemini can process images. Use with framework:
```
"Here's a screenshot of the bug [attach image].
Follow bug-fixing protocol to diagnose."
```

### Long Context Window
- Gemini 1.5 Pro: 1M tokens
- Can load entire framework + all protocols at once (if needed)
- Better for complex multi-protocol sessions

---

## Recommended Gemini Models

| Model | Context | Best For |
|-------|---------|----------|
| gemini-1.5-pro | 1M tokens | Complex projects, multiple protocols |
| gemini-1.5-flash | 1M tokens | Quick tasks, faster responses |
| gemini-2.0-flash | 1M tokens | Latest features, experiments |

---

## Common Workflows

### Starting Session
```
Load docs/context/CORE.md and docs/context/project.md.
Ask what I want to work on, detect intent, and load the right protocol.
```

**Gemini:**
```
## Framework Loaded
✓ ctxforge v3.0 CORE protocol
✓ Project context loaded
✓ Ready for intent detection

## What should we work on?

I can help with:
- 🆕 Building new features
- 🐛 Fixing bugs
- ♻️ Refactoring code
- ✅ Code reviews
- 🧪 Writing tests
- 🔍 Investigating issues

What would you like to do?
```

---

## Tips for Gemini

### 1. Use Structured Prompts
Gemini responds well to structure:
```
Task: Add search feature
Framework: Follow FEATURE-DEVELOPMENT protocol
Output: Show discovery questions first
```

### 2. Explicit Format Requests
```
"Follow the protocol and format responses as:
- ## Section Headers
- Bullet points for lists
- Code blocks for code
- Tables for comparisons"
```

### 3. Multimodal Integration
```
"Review this UI screenshot against accessibility directives.
Load CODE-REVIEW protocol and assess WCAG compliance."
```

### 4. Long Context Advantage
```
"Load CORE.md + all protocols in protocols/.
I'll tell you which to use per task during this session."
```

---

## Troubleshooting

### Gemini Not Following Framework
```
"Stop. Reload docs/context/CORE.md and resume with proper protocol."
```

### Protocol Confusion
```
"Clear context. Load only CORE.md.
Detect intent for this task: [describe task]"
```

### Quick Recovery
```
"Read docs/context/QUICK-RELOAD.md and follow recovery steps."
```

---

## Performance Notes

**Token usage:**
- CORE.md: ~5K tokens
- Protocol: ~4K tokens
- project.md: ~10K tokens
- Overhead: ~19K tokens

**With Gemini 1.5 Pro (1M context):**
- Can load all protocols upfront (~40K tokens)
- Switch between workflows without reloading
- Keep extensive project history in context

---

## Example Session

**You:**
```
Read docs/context/CORE.md.
Task: Fix the search results showing duplicates.
```

**Gemini:**
```
## Framework Loaded
✓ ctxforge CORE protocol loaded
✓ Intent detected: BUG_FIX
✓ Loading: protocols/BUG-FIXING.md

## Bug Discovery

Let me understand the issue:

### Question 1: Reproduction Steps
What are the exact steps to reproduce this bug?
- What search term triggers duplicates?
- Happens on all searches or specific ones?

### Question 2: Scope
Does this happen:
- Always or intermittently?
- All browsers or specific ones?
- Production + staging or just local?

### Question 3: Recent Changes
When did this start?
- Did search work before?
- What was changed recently?

Please provide details for these questions.
```

---

## Learn More

- Framework: `docs/context/FRAMEWORK.md`
- Protocols: `docs/context/protocols/`
- Quick reload: `docs/context/QUICK-RELOAD.md`

---

**Start with:**
```
Read docs/context/CORE.md and ask what I want to work on
```
