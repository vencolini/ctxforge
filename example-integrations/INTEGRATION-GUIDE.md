# ctxforge Integration Guide

**Universal integration instructions for any LLM or AI coding assistant**

---

## The Universal Command

**Works with ANY LLM:**

```
Read the file docs/context/CORE.md and ask what I want to work on
```

That's it! The LLM will:
1. Load the framework (5K tokens)
2. Ask what you're working on
3. Detect your intent automatically
4. Load ONLY the protocol it needs
5. Guide you through systematic discovery

---

## Integration by Platform

### 🤖 LLM-Specific Guides

| LLM | Integration File | Quick Start |
|-----|------------------|-------------|
| **Claude / Claude Code** | [CLAUDE.md](./CLAUDE.md) | `claude-code docs/context/CORE.md` |
| **Gemini / Gemini Studio** | [GEMINI.md](./GEMINI.md) | Upload CORE.md, then chat |
| **Agent Systems** | [AGENTS.md](./AGENTS.md) | Add to system prompt |
| **ChatGPT / GPT-4** | See below | Custom instructions |
| **GitHub Copilot** | See below | Workspace instructions |
| **Cursor** | See below | `.cursorrules` file |
| **Codeium** | See below | Chat instructions |
| **Local Models** | See below | System prompt |

---

## Platform-Specific Integration

### ChatGPT / OpenAI

**Web Interface:**
```
Upload docs/context/CORE.md to chat
Then: "You've loaded ctxforge. Ask what I want to work on."
```

**Custom Instructions (Settings → Personalization):**
```
For coding projects with docs/context/CORE.md:
- Load the framework at session start
- Ask what I'm working on
- Detect intent → load appropriate protocol
- Follow systematic discovery workflow
```

**API Integration:**
```javascript
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const coreMd = fs.readFileSync('docs/context/CORE.md', 'utf-8');

const response = await openai.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [
    {
      role: 'system',
      content: coreMd
    },
    {
      role: 'user',
      content: 'Ask me what I want to work on and load the right protocol'
    }
  ]
});
```

---

### GitHub Copilot

**In VS Code:**

Create `.github/copilot-instructions.md`:
```markdown
# Copilot Instructions

When helping with this project:
1. Read docs/context/CORE.md (framework core)
2. Read docs/context/project.md (current state)
3. For each task, detect intent and load protocol:
   - New feature → protocols/FEATURE-DEVELOPMENT.md
   - Bug fix → protocols/BUG-FIXING.md
   - Refactoring → protocols/REFACTORING.md
   - Code review → protocols/CODE-REVIEW.md
   - Testing → protocols/TESTING.md

Follow the loaded protocol's workflow.
```

**In Copilot Chat:**
```
@workspace Load docs/context/CORE.md and ask what I want to work on
```

---

### Cursor

**Create `.cursorrules` in project root:**
```markdown
# Cursor Rules for ctxforge

## Framework Loading
Before any development task:
- Read docs/context/CORE.md
- Read docs/context/project.md
- Detect intent from user request
- Load appropriate protocol from docs/context/protocols/

## Intent Detection
- "build/add/create" → FEATURE-DEVELOPMENT
- "fix/bug/error" → BUG-FIXING
- "refactor/improve" → REFACTORING
- "review/check" → CODE-REVIEW
- "test/tests" → TESTING
- "why/how/explain" → INVESTIGATION

## Workflow
Follow the loaded protocol:
1. Discovery questions
2. Show inferences with confidence
3. Get approval before coding
4. Implement with quality directives
5. Create state snapshot
6. Update project.md

## Quality
Auto-apply all directives from PERFORMANCE-DIRECTIVES.md
```

**In Cursor Chat:**
```
Load docs/context/CORE.md and let's start working
```

---

### Codeium

**Workspace Chat Instructions:**
```
Read docs/context/CORE.md
Ask what I want to work on
Detect intent and load the right protocol
Follow systematic discovery workflow
```

**Settings → Chat Behavior:**
```markdown
This project uses ctxforge framework.

For every task:
1. Load docs/context/CORE.md (if not already loaded)
2. Detect user intent
3. Load protocol from docs/context/protocols/
4. Execute discovery → inference → implementation workflow
```

---

### Continue.dev

**config.json:**
```json
{
  "systemMessage": "Read docs/context/CORE.md and follow ctxforge protocol for all development tasks.",
  "contextProviders": [
    {
      "name": "file",
      "params": {
        "files": [
          "docs/context/CORE.md",
          "docs/context/project.md",
          "docs/context/PERFORMANCE-DIRECTIVES.md"
        ]
      }
    }
  ]
}
```

---

### Windsurf / Codeium Editor

**Create `.windsurf/instructions.md`:**
```markdown
# Windsurf Instructions

## Framework
Load ctxforge at session start:
- docs/context/CORE.md
- docs/context/project.md

## Workflow
1. User describes task
2. Detect intent automatically
3. Load protocol: docs/context/protocols/[INTENT].md
4. Follow protocol workflow

## Quality
Apply docs/context/PERFORMANCE-DIRECTIVES.md automatically
```

---

### Aider

**Aider Chat:**
```bash
aider --read docs/context/CORE.md --read docs/context/project.md

# In chat:
> Load the ctxforge framework. Ask what I want to work on and detect intent.
```

**aider.conf.yml:**
```yaml
read:
  - docs/context/CORE.md
  - docs/context/project.md
  - docs/context/PERFORMANCE-DIRECTIVES.md

system-message: |
  You use the ctxforge framework for development.
  Detect intent and load appropriate protocol before each task.
```

---

### Local Models (Ollama, LM Studio, etc.)

**System Prompt:**
```markdown
You are a software development assistant using the ctxforge framework.

# Framework Files
Load these at session start:
- docs/context/CORE.md (protocol system)
- docs/context/project.md (project state)
- docs/context/PERFORMANCE-DIRECTIVES.md (quality rules)

# Workflow
For each user request:
1. Detect intent (feature/bug/refactor/review/test/investigate)
2. Load protocol file: docs/context/protocols/[INTENT].md
3. Follow protocol workflow:
   - Ask discovery questions
   - Show inferences with confidence levels
   - Get approval before implementation
   - Code with quality directives applied
   - Create state snapshot
   - Update project.md

# Quality
Auto-apply all performance directives without discussion.
```

**Example with Ollama:**
```bash
# Load framework files
cat docs/context/CORE.md > /tmp/framework.txt
cat docs/context/project.md >> /tmp/framework.txt

# Start Ollama with framework
ollama run codellama:70b "$(cat /tmp/framework.txt)

Now ask me what I want to work on and follow the protocol."
```

---

### Devin / Agent-Based IDEs

**Agent Configuration:**
```json
{
  "agent": {
    "name": "ctxforge-aware-developer",
    "initialization": [
      "read:docs/context/CORE.md",
      "read:docs/context/project.md"
    ],
    "workflow": {
      "intent_detection": "automatic",
      "protocol_loading": "dynamic",
      "human_checkpoints": true
    },
    "tools": ["file_read", "file_write", "ask_human", "bash"]
  }
}
```

---

### Replit AI

**In Replit Chat:**
```
Read docs/context/CORE.md
Ask me what I want to work on
Detect intent and load the appropriate protocol
```

**Replit .replit config:**
```toml
[ai]
instructions = """
Load ctxforge framework from docs/context/CORE.md
For each task: detect intent → load protocol → follow workflow
"""
```

---

### Amazon CodeWhisperer

**Workspace Customization:**
```markdown
This project uses ctxforge for systematic development.

Before any task:
1. Load docs/context/CORE.md
2. Detect intent from user description
3. Load docs/context/protocols/[intent].md
4. Follow discovery → inference → implementation workflow
```

---

### Tabnine

**Custom Instructions:**
```
Project framework: ctxforge (docs/context/)

For development tasks:
- Read CORE.md for protocol system
- Detect intent and load specific protocol
- Follow systematic discovery workflow
```

---

## Custom LLM Integration Template

For any LLM not listed above:

```
STEP 1: Load Framework
Read the file: docs/context/CORE.md

STEP 2: Initialize
Ask: "What should we work on?"

STEP 3: Intent Detection
When user responds, detect intent:
- Feature words → FEATURE-DEVELOPMENT
- Bug words → BUG-FIXING
- Refactor words → REFACTORING
- Review words → CODE-REVIEW
- Test words → TESTING
- Why/how words → INVESTIGATION

STEP 4: Load Protocol
Read: docs/context/protocols/[DETECTED_INTENT].md

STEP 5: Execute Protocol
Follow the loaded protocol's workflow

STEP 6: Quality
Apply: docs/context/PERFORMANCE-DIRECTIVES.md
```

---

## Integration Testing

**Test your integration:**

1. **Load Framework:**
   ```
   [Your LLM-specific command to load CORE.md]
   ```

2. **Test Intent Detection:**
   ```
   "Add a login feature"
   ```
   Expected: LLM detects NEW_FEATURE, loads FEATURE-DEVELOPMENT.md

3. **Test Discovery:**
   ```
   LLM should ask 5-7 discovery questions
   ```

4. **Test Inference:**
   ```
   LLM should show inferences with confidence levels
   [INFER-HIGH], [INFER-MEDIUM], [INFER-LOW]
   ```

5. **Test Checkpoint:**
   ```
   LLM should wait for approval before coding
   ```

If all 5 pass, integration is working! ✅

---

## Common Integration Patterns

### Pattern 1: Custom Instructions
Most LLMs support custom instructions:
```
For projects with docs/context/CORE.md:
Load the framework and follow ctxforge protocols
```

### Pattern 2: File Upload
Some LLMs need file upload:
```
1. Upload docs/context/CORE.md
2. Say: "Framework loaded, ask what I want to work on"
```

### Pattern 3: API Integration
For API-based access:
```javascript
const framework = fs.readFileSync('docs/context/CORE.md', 'utf-8');
const systemPrompt = framework + "\n\nAsk what the user wants to work on.";
// Use systemPrompt in API call
```

### Pattern 4: Agent System
For autonomous agents:
```python
agent.load_framework('docs/context/CORE.md')
agent.auto_detect_intent = True
agent.load_protocols_on_demand = True
```

---

## Troubleshooting

### LLM Not Following Framework

**Solution:**
```
Stop. Reload docs/context/CORE.md and resume with protocol.
```

### Protocol Not Loading

**Solution:**
```
Explicitly load: Read docs/context/protocols/FEATURE-DEVELOPMENT.md
```

### Intent Detection Failing

**Solution:**
```
Skip auto-detect. Load protocol manually:
Read docs/context/protocols/BUG-FIXING.md for this bug fix
```

### Framework Lost Mid-Session

**Solution:**
```
Read docs/context/QUICK-RELOAD.md for recovery steps
```

---

## Learn More

- **Full documentation:** `docs/context/FRAMEWORK.md`
- **All protocols:** `docs/context/protocols/`
- **Quick recovery:** `docs/context/QUICK-RELOAD.md`
- **LLM-specific guides:**
  - Claude: `CLAUDE.md`
  - Gemini: `GEMINI.md`
  - Agents: `AGENTS.md`

---

## Quick Reference

**Universal startup:**
```
Read docs/context/CORE.md and ask what I want to work on
```

**Manual protocol load:**
```
Read docs/context/protocols/[PROTOCOL-NAME].md
```

**Recovery:**
```
Read docs/context/QUICK-RELOAD.md
```

That's it! The framework adapts to any LLM. 🚀
