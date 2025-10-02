# Deployment Protocol

**Load this protocol when:** Deploying to staging/production or setting up CI/CD

---

## When to Use

User requests starting with: deploy, release, publish, production, staging, CI/CD, pipeline

Examples:
- "Deploy to production"
- "Set up CI/CD pipeline"
- "Create a release"

---

## Step 1: Deployment Discovery (Ask 3-5 Questions)

**Don't deploy blindly.** Understand the context:

### Q1: Deployment Type
```
"What kind of deployment?

- **Initial deployment?** (Setting up for first time)
- **Regular deployment?** (Releasing changes)
- **Hotfix deployment?** (Emergency bug fix)
- **Rollback?** (Reverting to previous version)
- **CI/CD setup?** (Automating deployments)

Please specify."
```

### Q2: Environment
```
"Where are we deploying?

- **Environment:** Development / Staging / Production
- **Infrastructure:** Cloud (AWS/GCP/Azure) / On-prem / Hybrid
- **Platform:** Kubernetes / Docker / Serverless / VMs / PaaS

What's your current setup?"
```

### Q3: Application State
```
"What's the current application state?

- **Tests passing?** (unit, integration, e2e)
- **Code reviewed?** (approved PRs)
- **Database migrations?** (schema changes needed)
- **Breaking changes?** (API changes, incompatibilities)
- **Dependencies updated?** (security patches)

Pre-deployment status?"
```

### Q4: Deployment Requirements
```
"Any special requirements?

- **Zero-downtime?** (blue-green, rolling update)
- **Approval needed?** (manual gate, stakeholder sign-off)
- **Scheduled time?** (off-hours, maintenance window)
- **Rollback plan?** (automatic or manual)
- **Health checks?** (smoke tests, monitoring)

Critical constraints?"
```

### Q5: Previous Deployments (if regular deployment)
```
"How do previous deployments work?

- **Deployment process:** Manual or automated?
- **Frequency:** Daily / Weekly / On-demand?
- **Common issues:** Any recurring problems?
- **Rollback history:** How often needed?

This helps me follow established patterns or improve process."
```

---

## Step 2: Pre-Deployment Checklist

```markdown
## Pre-Deployment Checklist: [Environment]

**Deployment:** v[X.Y.Z] to [Production/Staging]
**Date:** [Scheduled date/time]
**Deployer:** [Name]
**Reviewer:** [Name]

---

### ✅ Code Quality

- [ ] All tests passing (unit, integration, e2e)
  \`\`\`bash
  npm test
  # ✅ 487 tests passed, 0 failed
  \`\`\`

- [ ] Code reviewed and approved
  - PR #123: ✅ Approved by @reviewer1
  - PR #124: ✅ Approved by @reviewer2

- [ ] No linter errors
  \`\`\`bash
  npm run lint
  # ✅ No errors found
  \`\`\`

- [ ] No TypeScript errors
  \`\`\`bash
  npm run type-check
  # ✅ No type errors
  \`\`\`

- [ ] Security audit passed
  \`\`\`bash
  npm audit
  # ✅ found 0 vulnerabilities
  \`\`\`

---

### 📦 Build & Dependencies

- [ ] Build successful
  \`\`\`bash
  npm run build
  # ✅ Build completed in 45s
  \`\`\`

- [ ] Bundle size acceptable
  \`\`\`
  main.js:     450 KB (gzipped: 120 KB) ✅
  vendor.js:   380 KB (gzipped: 95 KB) ✅
  Total:       830 KB (gzipped: 215 KB) ✅
  Target:      <1 MB ✅
  \`\`\`

- [ ] Dependencies updated
  - No critical vulnerabilities
  - Lock file (package-lock.json) committed

---

### 🗄️ Database

- [ ] Migrations ready (if applicable)
  \`\`\`bash
  npm run db:migrate:status
  # Pending migrations:
  # - 20251002_add_user_roles.sql
  # - 20251002_create_orders_index.sql
  \`\`\`

- [ ] Migration tested on staging
  - ✅ Applied successfully
  - ✅ No data loss
  - ✅ Performance acceptable

- [ ] Rollback script prepared
  \`\`\`bash
  npm run db:migrate:down
  # Ready to rollback if needed
  \`\`\`

- [ ] Database backup created
  \`\`\`bash
  pg_dump production > backup_20251002.sql
  # ✅ Backup saved to S3
  \`\`\`

---

### 🔧 Configuration

- [ ] Environment variables updated
  - `API_KEY`: ✅ Set
  - `DATABASE_URL`: ✅ Set
  - `REDIS_URL`: ✅ Set

- [ ] Secrets rotated (if needed)
  - API keys current
  - SSL certificates valid

- [ ] Feature flags configured
  - `NEW_CHECKOUT_FLOW`: 10% rollout
  - `BETA_DASHBOARD`: Disabled

---

### 🚀 Infrastructure

- [ ] Resources provisioned
  - Servers: ✅ Running
  - Load balancer: ✅ Healthy
  - Database: ✅ Available
  - Cache (Redis): ✅ Connected

- [ ] Monitoring configured
  - ✅ CloudWatch alarms active
  - ✅ Sentry error tracking enabled
  - ✅ Datadog APM configured
  - ✅ PagerDuty on-call set

- [ ] Logs accessible
  - ✅ CloudWatch Logs
  - ✅ Log retention configured (30 days)

---

### 📋 Documentation

- [ ] CHANGELOG updated
  \`\`\`markdown
  ## [X.Y.Z] - 2025-10-02
  ### Added
  - User roles and permissions
  - Order history page
  ### Fixed
  - Login redirect bug
  - Search pagination issue
  \`\`\`

- [ ] Deployment notes prepared
  - Breaking changes documented
  - Migration steps outlined
  - Rollback procedure ready

- [ ] Team notified
  - ✅ Slack #deployments channel
  - ✅ Stakeholders informed
  - ✅ Customer support briefed

---

### 🧪 Staging Verification

- [ ] Deployed to staging
  \`\`\`bash
  git push staging main
  # ✅ Deployed successfully
  \`\`\`

- [ ] Smoke tests passed
  - ✅ Homepage loads
  - ✅ Login works
  - ✅ API endpoints responding
  - ✅ Database queries working

- [ ] Manual QA completed
  - ✅ New features tested
  - ✅ Regression testing done
  - ✅ Browser compatibility checked

- [ ] Performance acceptable
  - Response time <200ms ✅
  - No memory leaks ✅
  - Error rate <0.1% ✅

---

### 🛡️ Rollback Plan

**If deployment fails:**

1. **Immediate actions:**
   \`\`\`bash
   # Revert to previous version
   git revert HEAD
   git push production main
   # Or use platform-specific rollback
   kubectl rollout undo deployment/app
   \`\`\`

2. **Database rollback (if migrations ran):**
   \`\`\`bash
   npm run db:migrate:down
   \`\`\`

3. **Restore from backup (worst case):**
   \`\`\`bash
   psql production < backup_20251002.sql
   \`\`\`

4. **Notify team:**
   - Post in #incidents channel
   - Update status page
   - Inform stakeholders

**Rollback triggers:**
- Error rate >5%
- Response time >1s
- Critical feature broken
- Data corruption detected

---

### ✅ Final Sign-Off

**Checklist complete:** [Yes/No]
**Approved by:** [Name]
**Ready to deploy:** [Yes/No]

**Proceed with deployment?** (yes/abort/schedule later)
```

---

## Step 3: Deployment Execution

### For Manual Deployment

```markdown
## Deploying v[X.Y.Z] to Production

**Started:** [Timestamp]
**Status:** [In Progress]

---

### Step 1: Final Verification

\`\`\`bash
# Verify on correct branch
git branch
# * main

# Verify commit hash
git log -1 --oneline
# abc1234 Release v1.2.3

# Verify remote
git remote -v
# origin  git@github.com:user/repo.git
# production  git@github.com:user/repo-prod.git
\`\`\`

✅ Verified

---

### Step 2: Database Migration

\`\`\`bash
# Run migrations on production
npm run db:migrate

# Output:
# Running migration: 20251002_add_user_roles.sql
# ✅ Migration completed in 2.3s
# Running migration: 20251002_create_orders_index.sql
# ✅ Migration completed in 5.1s
\`\`\`

✅ Migrations successful

---

### Step 3: Deploy Application

\`\`\`bash
# Push to production
git push production main

# Output:
# Enumerating objects: 42, done.
# Counting objects: 100% (42/42), done.
# Compressing objects: 100% (28/28), done.
# Writing objects: 100% (28/28), 8.45 KiB | 2.82 MiB/s, done.
# Total 28 (delta 18), reused 0 (delta 0), pack-reused 0
#
# -----> Building app...
# -----> Installing dependencies...
# -----> Building production bundle...
# -----> Deployment successful!
# -----> Version v1.2.3 is live
\`\`\`

✅ Deployment successful

**Deployed at:** [Timestamp]
**Duration:** [X minutes]

---

### Step 4: Health Checks

**Waiting 2 minutes for instances to stabilize...**

\`\`\`bash
# Check application health
curl https://api.production.com/health

# Response:
{
  "status": "healthy",
  "version": "1.2.3",
  "database": "connected",
  "redis": "connected",
  "uptime": 120
}
\`\`\`

✅ Health check passed

---

### Step 5: Smoke Tests

**Critical user flows:**

1. **Homepage load:**
   - URL: https://production.com
   - Status: 200 ✅
   - Load time: 1.2s ✅

2. **User login:**
   - Endpoint: POST /api/auth/login
   - Status: 200 ✅
   - Response time: 150ms ✅

3. **Create order:**
   - Endpoint: POST /api/orders
   - Status: 201 ✅
   - Response time: 280ms ✅

4. **Database query:**
   - Query: SELECT COUNT(*) FROM users
   - Result: 45,231 users ✅
   - Query time: 12ms ✅

✅ All smoke tests passed

---

### Step 6: Monitoring

**Metrics after deployment:**

\`\`\`
Response time:
- p50: 95ms  ✅ (target <200ms)
- p95: 180ms ✅ (target <500ms)
- p99: 320ms ✅ (target <1s)

Error rate:
- 5xx errors: 0.02% ✅ (target <0.1%)
- 4xx errors: 2.1%  ✅ (normal range)

Throughput:
- Requests/min: 4,200 ✅
- Active users: 1,850 ✅

Resource usage:
- CPU: 35% ✅
- Memory: 62% ✅
- Database connections: 12/100 ✅
\`\`\`

✅ Metrics within acceptable range

---

### Step 7: Final Verification

- [x] Application deployed successfully
- [x] Health checks passing
- [x] Smoke tests passing
- [x] Monitoring shows healthy metrics
- [x] No error spikes
- [x] Team notified of successful deployment

**Deployment status:** ✅ **SUCCESS**

**Completed:** [Timestamp]
**Total duration:** [X minutes]

---

### 📢 Deployment Announcement

**Posted to #deployments:**

\`\`\`
🚀 Production Deployment Complete

Version: v1.2.3
Status: ✅ Successful
Duration: 8 minutes
Downtime: None (rolling update)

Changes:
- Added user roles and permissions
- Fixed login redirect bug
- Performance improvements

Health: All systems operational
Monitoring: https://dashboard.datadog.com/production

Questions? Contact @deployer
\`\`\`

---

### 📊 Post-Deployment Monitoring

**Watching metrics for next 30 minutes...**

**Update (+10 min):**
- Error rate: 0.01% ✅
- Response time stable ✅
- No anomalies detected ✅

**Update (+30 min):**
- All metrics stable ✅
- No incidents reported ✅
- Deployment considered stable ✅

**Monitoring will continue for 24 hours.**
```

---

### For Automated CI/CD Deployment

```markdown
## CI/CD Pipeline Configuration

**Platform:** GitHub Actions / GitLab CI / Jenkins

---

### Pipeline Stages

\`\`\`yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint

      - name: Security audit
        run: npm audit --audit-level=high

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build application
        run: npm run build

      - name: Check bundle size
        run: npm run size-check

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v3

      - name: Deploy to staging
        run: |
          aws s3 sync dist/ s3://staging-bucket/
          aws cloudfront create-invalidation --distribution-id XXX

      - name: Run smoke tests
        run: npm run test:smoke:staging

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Staging deployment complete'

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Manual approval required
        uses: trstringer/manual-approval@v1
        with:
          approvers: tech-lead,cto

      - name: Database migration
        run: npm run db:migrate:production

      - name: Deploy to production
        run: |
          aws s3 sync dist/ s3://production-bucket/
          aws cloudfront create-invalidation --distribution-id YYY

      - name: Health check
        run: |
          sleep 60
          curl -f https://api.production.com/health || exit 1

      - name: Run smoke tests
        run: npm run test:smoke:production

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: '🚀 Production deployment complete - v${{ github.sha }}'

      - name: Create release
        uses: actions/create-release@v1
        with:
          tag_name: v${{ github.run_number }}
          release_name: Release v${{ github.run_number }}

  rollback:
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - name: Rollback deployment
        run: |
          aws s3 sync s3://production-backup/ s3://production-bucket/
          aws cloudfront create-invalidation --distribution-id YYY

      - name: Alert team
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: '🚨 Production deployment failed - rolled back'
\`\`\`

---

### Pipeline Execution

**Triggered by:** Push to `main` branch
**Status:** Running...

\`\`\`
✅ test (2m 15s)
   ✅ Setup Node.js
   ✅ Install dependencies
   ✅ Run tests (487 passed)
   ✅ Run linter
   ✅ Security audit

✅ build (1m 30s)
   ✅ Build application
   ✅ Check bundle size (215 KB gzipped)
   ✅ Upload artifacts

✅ deploy-staging (3m 10s)
   ✅ Download artifacts
   ✅ Deploy to staging
   ✅ Run smoke tests
   ✅ Notify team

⏸️  deploy-production (waiting for approval)
   ⏳ Manual approval required

   Approve: https://github.com/user/repo/actions/runs/123
\`\`\`

**Waiting for approval from:** tech-lead, cto

---

**[Approved by tech-lead]**

\`\`\`
▶️  deploy-production (5m 45s)
   ✅ Manual approval (approved by tech-lead)
   ✅ Database migration
   ✅ Deploy to production
   ✅ Health check
   ✅ Run smoke tests
   ✅ Notify team
   ✅ Create release (v1.2.3)

🚀 Pipeline completed successfully
Total duration: 12m 40s
\`\`\`
```

---

## Step 4: Post-Deployment

```markdown
## Post-Deployment Report

**Deployment:** v1.2.3 to Production
**Date:** 2025-10-02 14:30 UTC
**Status:** ✅ Successful
**Duration:** 8 minutes
**Downtime:** 0 seconds (rolling update)

---

### 📊 Metrics Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Response time (p95) | 195ms | 180ms | -8% ✅ |
| Error rate | 0.03% | 0.02% | -33% ✅ |
| Throughput | 4,100 req/min | 4,200 req/min | +2% ✅ |
| CPU usage | 38% | 35% | -8% ✅ |
| Memory usage | 65% | 62% | -5% ✅ |

---

### ✅ What Went Well

- Zero downtime deployment
- All smoke tests passed first try
- No rollback needed
- Faster than estimated (8m vs 15m planned)
- Team communication clear

---

### ⚠️ Issues Encountered

None

---

### 📚 Learnings

**PL-XXX: Deployment Process**

**Discovered:** Deployment session, 2025-10-02

**Best practices:**
1. Always deploy to staging first
2. Wait for health checks before declaring success
3. Monitor metrics for 30 minutes post-deployment
4. Have rollback plan ready
5. Communicate with team throughout

**Improvements for next time:**
- Consider increasing health check wait time
- Add more automated smoke tests
- Document approval process more clearly

**Category:** Deployment
```

---

## Quality Criteria

Deployment complete when:
- [ ] Pre-deployment checklist passed
- [ ] Deployment executed successfully
- [ ] Health checks passing
- [ ] Smoke tests passing
- [ ] Metrics within acceptable range
- [ ] No error spikes
- [ ] Team notified
- [ ] Monitoring active for 24 hours
- [ ] Documentation updated (CHANGELOG, release notes)
- [ ] Post-deployment report created

---
