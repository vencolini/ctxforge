# Dependency Management Protocol

**Load this protocol when:** Adding, updating, or removing package dependencies

---

## When to Use

User requests starting with: add, install, update, upgrade, remove dependency, package

Examples:
- "Add React Query to the project"
- "Update all dependencies"
- "Remove unused packages"

---

## Step 1: Dependency Discovery (Ask 2-4 Questions)

**Don't install packages blindly.** Understand the need:

### Q1: Dependency Purpose
```
"What do you need this dependency for?

- **Add new package?** What feature/functionality?
- **Update existing?** Why update? (security, features, compatibility)
- **Remove package?** Why remove? (unused, replaced)
- **Audit dependencies?** Security scan, cleanup

Please describe the use case."
```

### Q2: Requirements
```
"What are your requirements?

- **Specific version?** (e.g., React 18+ required)
- **Size constraints?** (bundle size limits)
- **License requirements?** (MIT, Apache only)
- **Browser support?** (IE11, modern browsers)
- **TypeScript support?** (must have types)

Any dealbreakers?"
```

### Q3: Alternatives (if adding new)
```
"Have you considered alternatives?

For [package name], alternatives include:
- [Alternative 1]: [Pros/cons]
- [Alternative 2]: [Pros/cons]

Or is this package specifically requested?"
```

### Q4: Impact (if updating/removing)
```
"What's the potential impact?

- **Breaking changes?** (major version bump)
- **Usage scope?** (used in 1 file or throughout codebase)
- **Critical dependency?** (core functionality)
- **Testing required?** (manual testing needed)

This helps me plan the update safely."
```

---

## Step 2: Dependency Analysis

### For Adding Dependencies

```markdown
## Dependency Analysis: [Package Name]

**Package:** `[package-name]`
**Purpose:** [What it does]
**Use case:** [Why we need it]

---

### 📊 Package Information

**Version:** [X.Y.Z] (latest stable)
**Size:**
- Minified: [XX] KB
- Gzipped: [XX] KB
- Impact on bundle: +[X]% increase

**Maintenance:**
- Last published: [Date]
- Downloads/week: [XXX]
- GitHub stars: [XXX]
- Open issues: [XX]
- Maintainers: [Active / Inactive]

**License:** [MIT / Apache / GPL / etc.]
- ✅ Compatible with project license
- ⚠️ Requires attribution
- ❌ Copyleft (viral license)

**Dependencies:**
- Direct dependencies: [N]
- Peer dependencies: [List]
- Total dependency tree: [N] packages

---

### 🔍 Alternatives Comparison

| Package | Size | Downloads | Stars | Last Update | License |
|---------|------|-----------|-------|-------------|---------|
| **[package-name]** | 45 KB | 2M/week | 15K | 2 days ago | MIT ✅ |
| [alternative-1] | 120 KB | 500K/week | 8K | 3 months ago | MIT ✅ |
| [alternative-2] | 15 KB | 100K/week | 2K | 1 week ago | GPL ❌ |

**Winner:** [package-name]

**Reasoning:**
- ✅ Best size/features ratio
- ✅ Most actively maintained
- ✅ Large community (better support)
- ✅ TypeScript support included
- ✅ No peer dependency conflicts

---

### ⚠️ Considerations

**Pros:**
- Solves [problem] elegantly
- Well-documented
- Active community
- Good TypeScript support
- Tree-shakeable (only import what you need)

**Cons:**
- Adds 45 KB to bundle (acceptable given features)
- Learning curve for team (1-2 days)
- Another dependency to maintain

**Risks:**
- LOW: Package well-maintained, popular
- MEDIUM: Could become unmaintained (backup plan: fork or migrate)
- LOW: Breaking changes (semantic versioning followed)

---

### 📋 Impact Assessment

**Bundle size impact:**
```
Current bundle: 850 KB gzipped
After adding [package]: 895 KB gzipped (+5.3%)

Acceptable? (threshold: <1 MB) ✅
```

**Performance impact:**
- Initial load: +50ms (negligible)
- Runtime overhead: Minimal
- Tree shaking: Supported ✅

**Dependency conflicts:**
- ✅ No version conflicts detected
- ✅ Peer dependencies satisfied
- ✅ Compatible with existing packages

---

### 🔒 Security Check

**npm audit results:**
```bash
# Running: npm audit
found 0 vulnerabilities ✅
```

**Snyk scan:**
- ✅ No known vulnerabilities
- ✅ No malicious code detected
- ✅ License compliant

**Supply chain:**
- ✅ Package signed
- ✅ Maintainer verified
- ✅ No suspicious dependencies

---

### 💡 Recommendation

**APPROVE adding [package-name]**

**Reasoning:**
1. Best solution for [use case]
2. Well-maintained and secure
3. Minimal bundle impact
4. No better alternatives
5. Risk is low

**Installation command:**
\`\`\`bash
npm install [package-name]
# or
yarn add [package-name]
\`\`\`

**Version to install:** `^X.Y.Z` (allows patch updates)

---

**Proceed with installation?** (yes/choose alternative/reconsider)
```

---

### For Updating Dependencies

```markdown
## Dependency Update Analysis

**Packages to update:** [N] total

---

### 🔴 Security Updates (High Priority)

#### Package: [vulnerable-package]
**Current:** X.Y.Z
**Latest:** X.Y.Z+1
**Reason:** Security vulnerability CVE-XXXX-XXXX

**Vulnerability:**
- **Severity:** HIGH / CRITICAL
- **Issue:** [Description]
- **Affected versions:** X.Y.Z and below
- **Fixed in:** X.Y.Z+1

**Breaking changes:** None (patch update)
**Testing required:** Minimal (security patch only)
**Priority:** UPDATE IMMEDIATELY

---

### 🟡 Major Updates (May Have Breaking Changes)

#### Package: react
**Current:** 17.0.2
**Latest:** 18.2.0

**Changes in v18:**
- ⚠️ BREAKING: Automatic batching behavior changed
- ⚠️ BREAKING: `ReactDOM.render` deprecated
- ✅ NEW: Concurrent rendering
- ✅ NEW: Automatic batching
- ✅ NEW: Suspense improvements

**Migration effort:** MEDIUM (2-3 days)
**Benefits:**
- Better performance (concurrent rendering)
- Improved user experience
- Future-proof (active version)

**Migration guide:**
https://react.dev/blog/2022/03/08/react-18-upgrade-guide

**Testing required:**
- Full regression testing
- Check for deprecated API usage
- Update test utils

**Recommendation:** UPDATE (but schedule dedicated time)

---

### 🟢 Minor/Patch Updates (Low Risk)

| Package | Current | Latest | Changes | Risk |
|---------|---------|--------|---------|------|
| lodash | 4.17.20 | 4.17.21 | Bug fixes | LOW |
| axios | 1.4.0 | 1.6.0 | Features + fixes | LOW |
| date-fns | 2.29.0 | 2.30.0 | New methods | LOW |

**These can be updated safely** (no breaking changes)

---

### 📊 Update Strategy

**Option 1: Update All at Once** (Risky)
```bash
npm update
# Updates all to latest within semver range
```
**Risk:** HIGH (multiple changes at once)
**Testing:** Extensive required

**Option 2: Phased Updates** (Recommended)
```bash
# Week 1: Security patches
npm install vulnerable-package@latest

# Week 2: Minor/patch updates
npm update lodash axios date-fns

# Week 3: Major updates (one at a time)
npm install react@18 react-dom@18
# Test thoroughly
npm install webpack@5
# Test again
```
**Risk:** LOW (isolated changes)
**Testing:** Focused per update

**Recommendation:** Option 2 (phased approach)

---

### 🧪 Testing Checklist

After updates:
- [ ] Run `npm install` successfully
- [ ] Run test suite (`npm test`)
- [ ] Run build (`npm run build`)
- [ ] Manual smoke testing of key features
- [ ] Check for console warnings/errors
- [ ] Performance testing (if major updates)
- [ ] Verify no dependency conflicts
- [ ] Update documentation if API changed

---

**Proceed with updates?** (yes/modify plan)
```

---

### For Removing Dependencies

```markdown
## Dependency Removal Analysis: [Package Name]

**Package to remove:** `[package-name]`
**Reason:** [Unused / Replaced / Bloat]

---

### 📊 Usage Analysis

**Searching codebase for usage...**

```bash
# Finding imports
grep -r "from '[package-name]'" src/
grep -r "require('[package-name]')" src/
```

**Results:**
```
Found [N] references:
- src/utils/helper.js:5
- src/components/Widget.tsx:12
- src/services/api.ts:8
```

---

### ⚠️ Impact Analysis

**Direct usage:**
- Used in [N] files
- [X] imports total
- [Critical/Non-critical] functionality

**Indirect impact:**
- Other packages depend on this? [Yes/No]
- Removing affects [N] other modules

**Replacement plan:**
- Option 1: Remove entirely (if unused)
- Option 2: Replace with [alternative]
- Option 3: Inline the needed functionality (if minimal use)

---

### 🔄 Migration Plan

**Current usage:**
```javascript
// src/utils/helper.js
import { debounce } from 'lodash';

export const search = debounce(async (query) => {
  // Search logic
}, 300);
```

**After removal (Option 3 - Inline):**
```javascript
// src/utils/helper.js
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const search = debounce(async (query) => {
  // Search logic
}, 300);
```

**Bundle size impact:**
- Before: 850 KB
- After: 795 KB (-55 KB, -6.5%) ✅

---

### ✅ Removal Checklist

- [ ] Identified all usage locations
- [ ] Created replacement code (if needed)
- [ ] Updated imports throughout codebase
- [ ] Removed package from package.json
- [ ] Run `npm uninstall [package]`
- [ ] Verified no broken imports
- [ ] Tests still pass
- [ ] Bundle size reduced as expected

---

**Proceed with removal?** (yes/keep it)
```

---

## Step 3: Implementation

### Adding a Package

```markdown
## Installing [Package Name]

**Command:**
\`\`\`bash
npm install [package-name]@^X.Y.Z --save
# or for dev dependency
npm install [package-name] --save-dev
\`\`\`

**Installation output:**
\`\`\`
added 1 package, and audited 487 packages in 3s
found 0 vulnerabilities ✅
\`\`\`

---

### 📝 Usage Example

**Basic usage:**
\`\`\`javascript
import { feature } from '[package-name]';

const result = feature({
  option1: 'value',
  option2: true
});
\`\`\`

**TypeScript setup (if needed):**
\`\`\`bash
npm install @types/[package-name] --save-dev
\`\`\`

---

### ✅ Post-Installation

- [x] Package installed successfully
- [x] Types installed (if needed)
- [x] No dependency conflicts
- [x] Bundle size within limits (+45 KB)
- [x] Example code works
- [ ] Documentation updated (next step)
- [ ] Team notified of new dependency

---

### 📚 Documentation Update

**Updated:**
- README.md - Added to dependencies section
- docs/setup.md - Added installation note
- package.json - Lock file updated

**Team notification:**
\`\`\`
New dependency added: [package-name] v X.Y.Z

Purpose: [Brief description]
Docs: [Link]
Usage: See examples in src/examples/
\`\`\`
```

---

## Step 4: Maintenance & Monitoring

```markdown
## Dependency Maintenance Plan

### 🔄 Update Schedule

**Security updates:**
- Frequency: Immediately upon notification
- Process: Review CVE → Test → Deploy
- Automation: Dependabot alerts enabled

**Minor/patch updates:**
- Frequency: Monthly
- Process: Batch updates → Test → Deploy
- Automation: Renovate bot creates PRs

**Major updates:**
- Frequency: Quarterly (or as needed)
- Process: Plan → Migrate → Test → Deploy
- Review: Assess breaking changes first

---

### 📊 Monitoring

**Tools configured:**
- **npm audit** - Weekly runs in CI
- **Snyk** - Real-time vulnerability scanning
- **Dependabot** - Automated PR creation
- **Bundle analyzer** - Track size impact

**Alerts:**
- Critical vulnerability → Immediate Slack alert
- High vulnerability → Daily digest
- Outdated major version → Monthly report

---

### 🧹 Cleanup Process

**Quarterly dependency audit:**
1. Run `npm prune` - Remove unused packages
2. Run `depcheck` - Find unused dependencies
3. Review large dependencies - Can we replace?
4. Check for duplicates - Dedupe if possible
5. Update documentation - Keep deps list current

---

### PL-XXX: Dependency Management Learnings

**Discovered:** Dependency management session, [date]

**Best practices:**
1. **Always check alternatives** before adding
2. **Lock versions** for stability (package-lock.json)
3. **Review bundle size** impact
4. **Audit security** with npm audit + Snyk
5. **Phased updates** reduce risk

**Mistakes to avoid:**
- Don't add packages for trivial functionality
- Don't ignore security updates
- Don't update everything at once
- Don't skip testing after updates

**Category:** Dependencies
```

---

## Common Scenarios

### Scenario 1: Dependency Conflict

**Problem:**
```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@17.0.2
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^18.0.0" from react-awesome-lib@3.0.0
```

**Solution:**
```bash
# Option 1: Update React to v18
npm install react@18 react-dom@18

# Option 2: Use older version of lib (if v18 not ready)
npm install react-awesome-lib@2.5.0

# Option 3: Force resolution (risky)
npm install --legacy-peer-deps
```

---

### Scenario 2: Vulnerable Dependency

**Problem:**
```
found 3 high severity vulnerabilities
run `npm audit fix` to fix them
```

**Solution:**
```bash
# Review vulnerabilities
npm audit

# Auto-fix (non-breaking)
npm audit fix

# Fix with breaking changes (review first!)
npm audit fix --force

# Manual fix specific package
npm install vulnerable-package@safe-version
```

---

### Scenario 3: Bundle Size Bloat

**Problem:** Bundle grew from 800 KB to 1.2 MB

**Investigation:**
```bash
# Analyze bundle
npm run build -- --analyze

# Find largest dependencies
npm install -g cost-of-modules
cost-of-modules
```

**Solution:**
- Replace large packages with smaller alternatives
- Use tree-shaking (import only what you need)
- Lazy load heavy dependencies
- Consider CDN for common libraries

---

## Quality Criteria

Dependency management complete when:
- [ ] Need for dependency justified
- [ ] Alternatives evaluated
- [ ] Security audit passed
- [ ] Bundle size impact acceptable
- [ ] No dependency conflicts
- [ ] Installation successful
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Team notified (if significant)
- [ ] Monitoring configured

---
