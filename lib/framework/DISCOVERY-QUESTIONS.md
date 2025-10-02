# Context Discovery Questions

**Smart questions that extract senior engineer-level reasoning from LLMs.**

These templates help LLMs discover implicit requirements, edge cases, and technical constraints through systematic questioning.

---

## Universal Discovery Questions

**Use for ANY feature, regardless of type:**

### UQ-1: Happy Path Narrative
```
"Describe the successful scenario step-by-step from the user's perspective.
What do they see, do, and experience?"
```
**Extracts:** User mental model, interaction flow, success criteria

### UQ-2: Edge Case Discovery
```
"What should happen in these scenarios?
- Empty state (no data)
- Maximum state (huge data)
- Invalid input
- Network failure
- Concurrent actions"
```
**Extracts:** Error handling needs, boundary conditions

### UQ-3: Performance Expectations
```
"How should this feel to the user?
- Instant (<100ms)
- Fast (<1s)
- Eventual (loading state okay)
- Background (no wait)"
```
**Extracts:** Performance requirements, loading state needs

### UQ-4: Failure Modes
```
"What should NEVER happen?
What would frustrate users most?"
```
**Extracts:** Constraints, critical paths, error prevention needs

### UQ-5: Accessibility Needs
```
"Should this work for:
- Screen reader users?
- Keyboard-only navigation?
- Touch devices?
- Low-bandwidth connections?"
```
**Extracts:** Accessibility requirements, responsive design needs

### UQ-6: Scope Boundaries
```
"For this feature, what's explicitly OUT of scope?
What should we NOT build yet?"
```
**Extracts:** MVP boundaries, future enhancements, focus

### UQ-7: Integration Points
```
"Does this interact with:
- Existing features?
- External APIs/services?
- Database?
- Authentication/authorization?"
```
**Extracts:** Dependencies, integration requirements, data flow

---

## Feature-Type Specific Questions

### Authentication & Authorization

**AUTH-1: Credential Handling**
```
"What credentials do users provide?
- Email + password?
- Username + password?
- Social login (Google, GitHub)?
- Magic link?
- 2FA required?"
```

**AUTH-2: Session Management**
```
"How long should users stay logged in?
- Until browser close?
- 7 days?
- 30 days?
- Never expire?
Should 'remember me' be optional?"
```

**AUTH-3: Password Requirements**
```
"Any password requirements?
- Minimum length?
- Complexity rules (numbers, symbols)?
- No requirements (passphrase okay)?"
```

**AUTH-4: Account Recovery**
```
"What if user forgets password?
- Email reset link?
- Security questions?
- Contact support?
- No recovery (wallet-style)?"
```

**AUTH-5: Failed Login Handling**
```
"What happens after wrong password?
- Show generic error?
- Count attempts?
- Lock account after X tries?
- CAPTCHA?"
```

**Expected Inferences:**
- [INFER-HIGH] JWT tokens or session cookies based on duration
- [INFER-HIGH] Password hashing (bcrypt/argon2) server-side
- [INFER-MEDIUM] Rate limiting on login endpoint
- [INFER-LOW] Password strength indicator UI

---

### CRUD Operations (Create, Read, Update, Delete)

**CRUD-1: Data Validation**
```
"What makes data valid?
- Required fields?
- Format requirements (email, phone)?
- Length limits?
- Unique constraints?"
```

**CRUD-2: Concurrent Edits**
```
"What if two people edit the same record?
- Last write wins?
- Show conflict, ask to merge?
- Lock during edit?
- Don't worry about it?"
```

**CRUD-3: Delete Confirmation**
```
"Before deleting:
- Ask confirmation?
- Just do it?
- Undo period?
Should deleted items be recoverable?"
```

**CRUD-4: Soft vs Hard Delete**
```
"When user deletes:
- Remove from database (hard delete)?
- Hide but keep (soft delete)?
- Archive for X days then delete?"
```

**CRUD-5: Optimistic Updates**
```
"When user saves:
- Wait for server confirmation?
- Update UI immediately, rollback if fails?
- Show saving indicator?"
```

**Expected Inferences:**
- [INFER-HIGH] Client + server validation (client for UX, server for security)
- [INFER-MEDIUM] Soft delete with isDeleted flag
- [INFER-MEDIUM] Optimistic UI updates with error rollback
- [INFER-LOW] Version field for optimistic locking

---

### Search & Filter

**SEARCH-1: Search Scope**
```
"What should be searchable?
- Specific fields (title, description)?
- All text?
- Metadata (tags, categories)?"
```

**SEARCH-2: Search Timing**
```
"When should search execute?
- As user types (live search)?
- When user presses Enter?
- After pause in typing (debounced)?"
```

**SEARCH-3: Matching Strategy**
```
"How should matching work?
- Exact match only?
- Starts with?
- Contains anywhere?
- Fuzzy (typo-tolerant)?
- Full-text search?"
```

**SEARCH-4: No Results**
```
"If no matches found:
- Show 'no results' message?
- Suggest alternatives?
- Show related items?
- Prompt to clear filters?"
```

**SEARCH-5: Result Sorting**
```
"How should results be ordered?
- Relevance score?
- Alphabetical?
- Most recent?
- User-selectable?"
```

**Expected Inferences:**
- [INFER-HIGH] Debounced search if live (300-500ms)
- [INFER-HIGH] Case-insensitive matching
- [INFER-MEDIUM] Fuzzy matching if "handle typos" mentioned
- [INFER-MEDIUM] Client-side for <1000 items, server-side for more
- [INFER-LOW] Search history/suggestions

---

### Forms & Input

**FORM-1: Validation Timing**
```
"When should validation happen?
- On blur (leaving field)?
- On submit?
- As user types?
- Combination?"
```

**FORM-2: Required Fields**
```
"Which fields are required vs optional?
Any conditional requirements?"
```

**FORM-3: Error Presentation**
```
"How should validation errors appear?
- Inline under field?
- Summary at top?
- Toast notification?
- All of above?"
```

**FORM-4: Unsaved Changes**
```
"If user navigates away with unsaved data:
- Warn before leaving?
- Auto-save?
- Just lose it?"
```

**FORM-5: Default Values**
```
"Any fields pre-filled?
- User's previous values?
- Smart defaults?
- Always empty?"
```

**Expected Inferences:**
- [INFER-HIGH] On blur validation for UX
- [INFER-HIGH] Required field indicators (asterisk/label)
- [INFER-MEDIUM] Unsaved changes warning
- [INFER-MEDIUM] Auto-save to localStorage
- [INFER-LOW] Progressive disclosure for complex forms

---

### Data Visualization

**VIZ-1: Interactivity Level**
```
"Should users interact with the visualization?
- Hover for details?
- Click to drill down?
- Zoom/pan?
- Just display?"
```

**VIZ-2: Responsive Behavior**
```
"On small screens:
- Scale down?
- Simplify (remove details)?
- Horizontal scroll?
- Switch to table?"
```

**VIZ-3: Accessibility**
```
"For non-visual users:
- Data table alternative?
- Text description?
- Sonification?
- Just skip?"
```

**VIZ-4: Export Options**
```
"Can users export?
- Download as image?
- CSV data?
- PDF report?
- No export?"
```

**VIZ-5: Real-time Updates**
```
"Should data update live?
- Auto-refresh interval?
- Manual refresh button?
- Static snapshot?"
```

**Expected Inferences:**
- [INFER-HIGH] Canvas/SVG based on complexity
- [INFER-HIGH] Responsive breakpoints
- [INFER-MEDIUM] Data table for accessibility
- [INFER-MEDIUM] Lazy loading for large datasets
- [INFER-LOW] Animation for transitions

---

### Real-time Features

**REALTIME-1: Update Mechanism**
```
"How should updates arrive?
- Polling (check every X seconds)?
- WebSocket (push updates)?
- Server-sent events?
- Don't care about performance?"
```

**REALTIME-2: Update Frequency**
```
"How often should data refresh?
- Every second?
- Every 5-10 seconds?
- Every minute?
- On user action?"
```

**REALTIME-3: Conflict Resolution**
```
"If user's data changes while editing:
- Show notification?
- Auto-merge?
- Force refresh?
- Last write wins?"
```

**REALTIME-4: Offline Support**
```
"If connection lost:
- Queue actions?
- Block interactions?
- Show offline mode?
- Just fail?"
```

**REALTIME-5: Presence Indicators**
```
"Should users see who else is online?
- Yes, show all users
- Yes, show only in same document
- No presence info"
```

**Expected Inferences:**
- [INFER-HIGH] WebSocket for <1s updates, polling for >10s
- [INFER-MEDIUM] Optimistic updates with conflict resolution
- [INFER-MEDIUM] Reconnection logic
- [INFER-LOW] Offline queue with IndexedDB

---

### File Upload

**UPLOAD-1: File Types**
```
"What file types allowed?
- Images only (jpg, png)?
- Documents (pdf, docx)?
- Any file?
- Specific types?"
```

**UPLOAD-2: Size Limits**
```
"Maximum file size?
- 1MB?
- 10MB?
- 100MB?
- No limit?"
```

**UPLOAD-3: Multiple Files**
```
"Can users upload multiple files?
- One at a time only?
- Multiple simultaneously?
- Batch upload?"
```

**UPLOAD-4: Progress Indication**
```
"For large files:
- Show upload progress?
- Allow cancel?
- Background upload?
- Just wait?"
```

**UPLOAD-5: Validation**
```
"Should file content be validated?
- Check dimensions (images)?
- Scan for viruses?
- Parse to verify format?
- Trust extension?"
```

**Expected Inferences:**
- [INFER-HIGH] Client-side type/size validation before upload
- [INFER-HIGH] Progress bar for >1MB files
- [INFER-MEDIUM] Chunked upload for large files
- [INFER-MEDIUM] Server-side validation (never trust client)
- [INFER-LOW] Thumbnail generation for images

---

### Notifications

**NOTIF-1: Trigger Events**
```
"When should users be notified?
- Real-time events (messages, mentions)?
- Scheduled (daily digest)?
- Status changes (task complete)?
- Errors only?"
```

**NOTIF-2: Delivery Method**
```
"How should notifications appear?
- In-app toast?
- Email?
- Push notification?
- Multiple methods?"
```

**NOTIF-3: Persistence**
```
"Should notifications persist?
- Disappear after X seconds?
- Stay until dismissed?
- Inbox for history?
- Don't store?"
```

**NOTIF-4: User Preferences**
```
"Can users control notifications?
- Turn off specific types?
- Quiet hours?
- Delivery method per type?
- All or nothing?"
```

**NOTIF-5: Notification Priority**
```
"Different urgency levels?
- Critical (red, sound)?
- Normal (blue, silent)?
- Info (gray, dismissible)?
- All same?"
```

**Expected Inferences:**
- [INFER-HIGH] Toast for transient, inbox for persistent
- [INFER-MEDIUM] WebSocket for real-time delivery
- [INFER-MEDIUM] User preferences in settings
- [INFER-LOW] Push notification service integration

---

## Discovery Flow Templates

### Template: New Feature Discovery

```
1. UQ-1: Happy Path Narrative
   → Get user's mental model

2. [Feature-Specific Q1-Q3]
   → Discover domain details

3. UQ-2: Edge Case Discovery
   → Identify error scenarios

4. UQ-3: Performance Expectations
   → Set performance targets

5. UQ-5: Accessibility Needs
   → Ensure inclusive design

6. UQ-6: Scope Boundaries
   → Define MVP clearly

Total: 6-8 questions, 5-10 minute conversation
```

### Template: Existing Feature Enhancement

```
1. "What's working well currently?"
   → Preserve good parts

2. "What's frustrating about it?"
   → Identify pain points

3. UQ-1: Happy Path (for new behavior)
   → Define improved experience

4. "Should existing behavior change or add alongside?"
   → Migration strategy

5. [Feature-Specific questions as needed]
   → Domain details

Total: 4-6 questions, 3-5 minute conversation
```

### Template: Bug Fix Discovery

```
1. "What's the expected behavior?"
   → Clarify intent

2. "What actually happens?"
   → Define bug precisely

3. "How to reproduce?"
   → Create test case

4. "Any data that triggers it?"
   → Edge case identification

5. "Impact on users?"
   → Prioritization

Total: 5 questions, 2-3 minute conversation
```

---

## Inference Generation Guidelines

After discovery questions, generate inferences:

### Confidence Level Assignment

**[INFER-HIGH]:** Use when:
- Human explicitly stated this
- Only one reasonable technical approach exists
- Industry standard for this exact scenario

**[INFER-MEDIUM]:** Use when:
- Common practice but alternatives exist
- Implied by requirements but not explicit
- Best practice for typical use case

**[INFER-LOW]:** Use when:
- Filling gap in requirements
- Multiple valid approaches possible
- Assumption about user preference

### Inference Format

```markdown
[INFER-{LEVEL}]: {Technical decision}
Reasoning: {Why this confidence level}
Alternative: {If MEDIUM/LOW, mention alternative approach}
```

### Example Inference Block

```markdown
## Technical Inferences

[INFER-HIGH]: Debounced search input (300ms)
Reasoning: You said "search while typing" + "feels instant"
Performance: Reduces API calls from ~10/s to ~3/s

[INFER-HIGH]: Client-side filtering for <1000 products
Reasoning: You said "<100ms response" + current product count ~500
Approach: Full dataset in memory, filter on keypress

[INFER-MEDIUM]: Fuzzy matching with fuse.js
Reasoning: You mentioned "handle typos" - fuzzy search addresses this
Alternative: Could use simple contains() but won't catch misspellings

[INFER-MEDIUM]: Save recent searches in localStorage
Reasoning: Common pattern for search UX, improves repeat searches
Alternative: Could skip if privacy concern

[INFER-LOW]: Show search suggestions after 2 characters
Reasoning: Industry standard, prevents single-letter noise
Alternative: Could show from first character if preferred

## Clarification Needed

Q: Should search work across product description or just title?
Q: Maximum number of results to show (pagination vs show all)?
Q: Should filter state persist in URL for sharing?
```

---

## Adaptation Guidelines

### When to Ask More Questions

- Requirements vague or ambiguous
- Edge cases unclear
- Performance expectations unstated
- Accessibility not mentioned
- Integration points undefined

### When to Ask Fewer Questions

- Requirements already detailed
- Similar feature exists as reference
- Prototype/MVP explicitly stated
- Domain is standard (e.g., basic CRUD)

### Customizing Questions

**Do customize:**
- Language/terminology to match user's domain
- Examples to match their product
- Depth based on project complexity

**Don't customize:**
- Core concerns (edge cases, performance, accessibility)
- Systematic approach (always checkpoint before coding)
- Inference generation (always explicit)

---

## Success Metrics

**Discovery working well when:**
✓ Human answers in 2-3 sentences per question
✓ 5-10 minute conversation produces complete spec
✓ Inferences cover 80%+ of implementation decisions
✓ Human corrects <20% of inferences (most are right)
✓ Implementation works first try (no "that's not what I meant")

**Discovery needs adjustment when:**
✗ Human confused by questions (too technical/vague)
✗ Conversation >15 minutes (too many questions)
✗ Many inferences corrected (asking wrong things)
✗ Implementation requires multiple attempts (missed requirements)

---

## Question Bank Extension

Add project-specific questions to project.md:

```markdown
## Custom Discovery Questions

### CUSTOM-DOMAIN-1: [Your domain-specific question]
**Context:** When building [feature type]
**Question:** "[Specific question for your domain]"
**Extracts:** [What this discovers]
```

Example for e-commerce:
```markdown
### CUSTOM-ECOM-1: Inventory Handling
**Context:** When building product purchase flow
**Question:** "What if product goes out of stock while in cart?"
**Extracts:** Inventory locking strategy, user experience for stock-out
```

---

## Philosophy

> "The right questions extract the right context.
> The right context produces the right code.
> First time. Every time."

**Ask. Discover. Infer. Confirm. Build.**

---

**Version:** 2.0
**Last Updated:** 2025-10-02
**Question Templates:** 7 universal + 40+ feature-specific
