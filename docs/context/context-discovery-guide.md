# Context Discovery Guide for LLMs

**Purpose:** Guide LLMs in analyzing user requests and determining what additional context is needed for comprehensive behavioral specifications.

---

## Context Discovery Methodology

### Step 1: User Intent Analysis

When a user provides a description like "On the products page we need to add a search field to search through the products", analyze:

**What you can extract directly:**
- Feature type (search functionality)
- Location (products page)
- Target data (products)
- Primary user action (searching)

**What requires clarification:**
- Scale and performance requirements
- Specific functionality expectations
- Integration with existing patterns
- Technical constraints

### Step 2: Context Gap Identification

**Critical Context Categories:**

1. **Scale & Performance**
   - Data volume affects implementation strategy
   - User load impacts architecture decisions
   - Response time requirements determine caching needs

2. **User Experience Requirements**
   - Interaction patterns (real-time, on-demand, etc.)
   - Feedback expectations (instant, progressive, etc.)
   - Error handling preferences

3. **Technical Integration**
   - Existing system patterns to follow
   - Technology stack constraints
   - API or database integration points

4. **Business Logic**
   - Validation rules and constraints
   - Security requirements
   - Accessibility needs

### Step 3: Smart Questioning Strategy

**Ask questions that:**
- Significantly impact implementation approach
- Cannot be reasonably assumed from context
- Help apply appropriate best practices
- Ensure consistency with existing patterns

**Avoid questions that:**
- Have obvious answers for the domain
- Are implementation details rather than requirements
- Can be derived from standard best practices

### Step 4: Context-Aware Question Generation

Based on the feature type and project context, generate questions that matter:

**For Search Features:**
```
If data volume unknown: "How many items will be searched through?"
If searchable fields unclear: "What information should be searchable?"
If response time unclear: "What's the expected search response time?"
```

**For Form Features:**
```
If validation rules unclear: "What validation is required?"
If data flow unknown: "Where does this data go after submission?"
If error handling unclear: "How should validation errors be displayed?"
```

**For Upload Features:**
```
If file constraints unclear: "What file types and sizes are acceptable?"
If processing unclear: "What happens to files after upload?"
If storage unclear: "Where and how should files be stored?"
```

---

## Question Quality Guidelines

### Good Questions
- "How many products will users search through?" (impacts client vs server search)
- "What validation rules apply to this form?" (determines error handling patterns)
- "Should this follow the existing dashboard layout?" (ensures consistency)

### Poor Questions
- "What color should the button be?" (design detail, not behavioral requirement)
- "Which database should we use?" (implementation detail)
- "Should we use React hooks?" (technical implementation choice)

---

## Context Synthesis

After gathering additional context:

1. **Combine** user intent + project context + additional context
2. **Apply** relevant performance directives and best practices
3. **Generate** comprehensive behavioral specification
4. **Include** rationale for decisions made based on context

---

## Example Context Discovery Process

**User Request:** "Users need to upload profile pictures"

**Direct Analysis:**
- Feature: File upload
- Target: Profile pictures  
- Location: User profile/settings

**Context Gaps Identified:**
- File size/type constraints (affects validation)
- Processing requirements (affects implementation)
- Storage strategy (affects architecture)

**Smart Questions:**
1. "What image formats should be supported?" (determines validation rules)
2. "What's the maximum file size?" (affects upload strategy and user experience)
3. "Should images be automatically resized?" (determines processing requirements)

**Context Synthesis:**
Combine answers with project's existing file handling patterns and performance directives to generate specification.

---

**Remember:** The goal is to gather just enough context to create a comprehensive behavioral specification that an LLM can implement correctly following the project's patterns and best practices.