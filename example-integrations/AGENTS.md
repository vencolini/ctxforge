# ctxforge for AI Agent Systems

**Integration guide for autonomous agents, multi-agent systems, and agentic workflows**

Compatible with: AutoGPT, LangChain Agents, CrewAI, Semantic Kernel, and custom agent frameworks

---

## Quick Start

```bash
cd your-project
npx ctxforge init
```

---

## Agent System Integration

### System Prompt Integration

Add to your agent's system prompt:

```markdown
# Agent Instructions

## Framework
You operate using the ctxforge context discovery framework.

**On task start:**
1. Read: docs/context/CORE.md
2. Read: docs/context/project.md
3. Detect intent from task description
4. Load appropriate protocol from docs/context/protocols/
5. Follow protocol workflow

**Intent detection:**
- NEW_FEATURE → protocols/FEATURE-DEVELOPMENT.md
- BUG_FIX → protocols/BUG-FIXING.md
- REFACTOR → protocols/REFACTORING.md
- CODE_REVIEW → protocols/CODE-REVIEW.md
- TESTING → protocols/TESTING.md
- INVESTIGATION → protocols/INVESTIGATION.md

**Protocol execution:**
- Ask discovery questions
- Generate inferences with confidence
- Get approval before implementation
- Create state snapshots
- Update project.md
```

---

## Multi-Agent Workflows

### Discovery Agent + Implementation Agent

**Discovery Agent:**
```python
discovery_agent = Agent(
    role="Requirements Analyst",
    goal="Extract complete requirements through systematic questioning",
    instructions="""
    Load docs/context/CORE.md and detect task intent.
    Load appropriate protocol.
    Execute discovery phase only:
    - Ask all discovery questions
    - Generate behavioral spec
    - Create technical inferences
    - Get human approval

    Output: Complete specification with approved inferences
    """,
    tools=[file_read, ask_human]
)
```

**Implementation Agent:**
```python
implementation_agent = Agent(
    role="Senior Developer",
    goal="Implement features following approved specifications",
    instructions="""
    Load docs/context/CORE.md and docs/context/PERFORMANCE-DIRECTIVES.md.

    Input: Approved specification from discovery agent

    Execute:
    - Implement following inferences
    - Apply all performance directives
    - Self-review against checklist
    - Create state snapshot
    - Update project.md

    Output: Working code + documentation
    """,
    tools=[file_read, file_write, bash, web_search]
)
```

### Workflow Orchestration

```python
workflow = Sequential(
    agents=[discovery_agent, implementation_agent],
    context_sharing=True,
    framework_files=[
        "docs/context/CORE.md",
        "docs/context/project.md",
        "docs/context/PERFORMANCE-DIRECTIVES.md"
    ]
)

result = workflow.run("Add user authentication")
```

---

## LangChain Integration

```python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory

# Load framework
with open('docs/context/CORE.md') as f:
    core_md = f.read()

# Create ctxforge-aware agent
llm = OpenAI(temperature=0)

system_message = f"""
{core_md}

You are a development agent using the ctxforge framework.
For every task:
1. Detect intent
2. Load protocol
3. Execute systematic discovery
4. Implement with quality directives
"""

tools = [
    Tool(
        name="ReadFile",
        func=read_file,
        description="Read framework files and project code"
    ),
    Tool(
        name="WriteFile",
        func=write_file,
        description="Write code and documentation"
    ),
    Tool(
        name="AskHuman",
        func=ask_human,
        description="Ask discovery questions to human"
    )
]

agent = initialize_agent(
    tools,
    llm,
    agent="chat-conversational-react-description",
    memory=ConversationBufferMemory(),
    system_message=system_message
)

# Run with framework
response = agent.run("Add password reset feature")
```

---

## CrewAI Integration

```python
from crewai import Agent, Task, Crew

# Framework-aware agents
analyst = Agent(
    role='Requirements Analyst',
    goal='Extract complete requirements using ctxforge discovery protocol',
    backstory="""You use systematic questioning to uncover implicit
    requirements. You load appropriate discovery protocols and ask 5-7
    targeted questions.""",
    tools=[file_read_tool, question_tool],
    verbose=True
)

developer = Agent(
    role='Senior Developer',
    goal='Implement features following ctxforge quality directives',
    backstory="""You implement code following approved specifications.
    You apply all performance directives automatically and self-review
    against the quality checklist.""",
    tools=[file_read_tool, file_write_tool, bash_tool],
    verbose=True
)

reviewer = Agent(
    role='Code Reviewer',
    goal='Review code against ctxforge standards',
    backstory="""You review code against PERFORMANCE-DIRECTIVES.md
    and project learnings. You provide actionable feedback.""",
    tools=[file_read_tool, analysis_tool],
    verbose=True
)

# Tasks with framework context
task1 = Task(
    description="""
    Load docs/context/CORE.md and detect intent for: 'Add dark mode toggle'
    Load appropriate protocol and execute discovery phase.
    """,
    agent=analyst,
    output_file='discovery-output.md'
)

task2 = Task(
    description="""
    Load discovery output and docs/context/PERFORMANCE-DIRECTIVES.md.
    Implement the feature following approved specification.
    """,
    agent=developer,
    context=[task1],
    output_file='implementation.md'
)

task3 = Task(
    description="""
    Load implementation and review against ctxforge standards.
    Provide quality score and actionable feedback.
    """,
    agent=reviewer,
    context=[task2],
    output_file='review.md'
)

crew = Crew(
    agents=[analyst, developer, reviewer],
    tasks=[task1, task2, task3],
    verbose=2
)

result = crew.kickoff()
```

---

## Autonomous Agent Configuration

### Tool Definitions

Agents need these tools to use ctxforge:

```python
tools = [
    {
        "name": "load_framework_core",
        "description": "Load docs/context/CORE.md for intent detection",
        "parameters": {}
    },
    {
        "name": "load_protocol",
        "description": "Load specific protocol file",
        "parameters": {
            "protocol": "string (FEATURE-DEVELOPMENT|BUG-FIXING|etc)"
        }
    },
    {
        "name": "detect_intent",
        "description": "Analyze task and detect intent",
        "parameters": {
            "task_description": "string"
        }
    },
    {
        "name": "ask_discovery_question",
        "description": "Ask human a discovery question",
        "parameters": {
            "question": "string",
            "context": "string"
        }
    },
    {
        "name": "create_state_snapshot",
        "description": "Create compressed state snapshot",
        "parameters": {
            "task_id": "string",
            "changes": "object"
        }
    },
    {
        "name": "update_project_md",
        "description": "Update project.md with learnings",
        "parameters": {
            "section": "string",
            "content": "string"
        }
    }
]
```

### Agent Workflow

```python
class CtxforgeAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.load_framework()

    def load_framework(self):
        """Load core framework"""
        self.core = self.tools['load_framework_core']()
        self.project = self.tools['read_file']('docs/context/project.md')
        self.directives = self.tools['read_file']('docs/context/PERFORMANCE-DIRECTIVES.md')

    def execute_task(self, task_description):
        """Execute task with framework"""

        # 1. Detect intent
        intent = self.tools['detect_intent'](task_description)

        # 2. Load protocol
        protocol = self.tools['load_protocol'](intent['protocol'])

        # 3. Execute protocol
        if intent['type'] == 'NEW_FEATURE':
            result = self.feature_development(task_description, protocol)
        elif intent['type'] == 'BUG_FIX':
            result = self.bug_fixing(task_description, protocol)
        # ... etc

        # 4. Create snapshot
        self.tools['create_state_snapshot'](
            task_id=result['task_id'],
            changes=result['changes']
        )

        # 5. Update project
        self.tools['update_project_md']('learnings', result['learnings'])

        return result

    def feature_development(self, task, protocol):
        """Execute feature development protocol"""

        # Ask discovery questions
        answers = []
        for question in protocol['discovery_questions']:
            answer = self.tools['ask_discovery_question'](
                question=question,
                context=task
            )
            answers.append(answer)

        # Generate inferences
        inferences = self.llm.generate_inferences(answers)

        # Get approval
        approved = self.tools['ask_human']('Review inferences and approve?')

        if approved:
            # Implement
            code = self.llm.implement(
                specification=inferences,
                directives=self.directives
            )

            # Self-review
            review = self.llm.self_review(code, protocol['checklist'])

            return {
                'task_id': generate_id(),
                'code': code,
                'review': review,
                'changes': extract_changes(code)
            }
```

---

## Protocol Auto-Loading in Agents

```python
def auto_load_protocol(task_description):
    """Automatically detect and load protocol"""

    # Intent keywords
    intents = {
        'NEW_FEATURE': ['build', 'create', 'add', 'implement', 'develop'],
        'BUG_FIX': ['fix', 'bug', 'error', 'broken', 'crash'],
        'REFACTOR': ['refactor', 'improve', 'clean', 'optimize'],
        'CODE_REVIEW': ['review', 'check', 'assess', 'evaluate'],
        'TESTING': ['test', 'tests', 'coverage', 'unit test'],
        'INVESTIGATION': ['why', 'how', 'explain', 'understand']
    }

    # Detect intent
    task_lower = task_description.lower()
    detected_intent = None

    for intent, keywords in intents.items():
        if any(kw in task_lower for kw in keywords):
            detected_intent = intent
            break

    # Load protocol
    protocol_file = f"protocols/{detected_intent}.md"
    with open(f"docs/context/{protocol_file}") as f:
        protocol = f.read()

    return {
        'intent': detected_intent,
        'protocol': protocol,
        'confidence': calculate_confidence(task_description, keywords)
    }
```

---

## Best Practices for Agent Systems

### 1. Framework as Agent Memory
```python
agent.long_term_memory = {
    'framework': 'docs/context/CORE.md',
    'project_state': 'docs/context/project.md',
    'quality_rules': 'docs/context/PERFORMANCE-DIRECTIVES.md',
    'learnings': extract_learnings('docs/context/project.md')
}
```

### 2. Protocol-Specific Agents
```python
agents = {
    'feature_builder': Agent(protocol='FEATURE-DEVELOPMENT'),
    'bug_fixer': Agent(protocol='BUG-FIXING'),
    'code_reviewer': Agent(protocol='CODE-REVIEW'),
    'tester': Agent(protocol='TESTING')
}

# Route task to appropriate agent
task_intent = detect_intent(task)
agent = agents[task_intent]
result = agent.execute(task)
```

### 3. Human-in-the-Loop Checkpoints
```python
# Framework checkpoint pattern
def execute_with_checkpoints(agent, task):
    # Discovery phase
    discovery = agent.discover(task)

    # Checkpoint 1: Approve inferences
    if not human.approve(discovery.inferences):
        discovery = agent.refine(human.feedback)

    # Implementation phase
    implementation = agent.implement(discovery)

    # Checkpoint 2: Review code
    if not passes_self_review(implementation):
        implementation = agent.refine(implementation)

    return implementation
```

---

## Learn More

- Framework: `docs/context/FRAMEWORK.md`
- Protocols: `docs/context/protocols/`
- Core: `docs/context/CORE.md`

---

**Agent startup command:**
```python
agent.load_system_prompt("""
Read docs/context/CORE.md and ask what task to execute.
Auto-detect intent and load appropriate protocol.
""")
```
