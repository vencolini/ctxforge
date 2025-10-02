# Database Migration Protocol

**Load this protocol when:** Changing database schema, migrating data, or upgrading database versions

---

## When to Use

User requests starting with: migrate, migration, schema change, alter table, database upgrade, add column

Examples:
- "Add a new column to users table"
- "Migrate from SQLite to PostgreSQL"
- "Change column type in orders table"

---

## Step 1: Migration Discovery (Ask 4-5 Questions)

**Don't change schema blindly.** Understand the impact:

### Q1: Migration Type
```
"What type of database migration?

**Schema changes:**
- **Add column/table?** (non-breaking, usually safe)
- **Modify column?** (change type, add constraint)
- **Remove column/table?** (potentially breaking)
- **Add index?** (performance improvement)
- **Rename?** (needs careful coordination)

**Data migrations:**
- **Transform data?** (e.g., split name into firstName/lastName)
- **Migrate between databases?** (SQLite → PostgreSQL)
- **Upgrade database version?** (PostgreSQL 13 → 15)

**What are you changing?"
```

### Q2: Production Data
```
"Is this for production database?

- **Production:** Live user data (requires careful planning)
- **Staging:** Pre-production testing (safer to experiment)
- **Development:** Local database (lowest risk)

**Data volume:**
- How many rows in affected tables?
- Expected migration duration?

**Downtime acceptable?**
- Zero downtime required?
- Maintenance window available? (when/how long)
```

### Q3: Breaking Changes
```
"Will this break existing code?

**Application compatibility:**
- Is code already deployed that uses old schema?
- Will removing column break running app?
- Can app handle both old and new schema?

**API changes:**
- Does this affect API responses?
- Will clients break?

**Rollback scenario:**
- If migration fails, can we rollback?
- Can app run with old schema after deploy?"
```

### Q4: Data Handling
```
"What happens to existing data?

- **New column:** Default value? NULL allowed?
- **Modify column:** Data transformation needed?
- **Remove column:** Archive data first?
- **Rename:** Update all references?

**Data validation:**
- Need to validate data before migration?
- Backfill required?
```

### Q5: Performance Impact (optional)
```
"Performance considerations?

- **Table lock duration:** Large table = long lock?
- **Index creation:** Can be slow on large tables
- **Online migration needed?** (no downtime)
- **Batch processing?** (for large data changes)

How critical is performance during migration?"
```

---

## Step 2: Migration Planning

```markdown
## Migration Plan: [Change Description]

**Migration:** [Add user_roles column to users table]
**Database:** PostgreSQL 14
**Environment:** Production
**Data volume:** 2.5 million users

---

### 📋 Change Summary

**What's changing:**
- Table: `users`
- Action: Add column `role`
- Type: `VARCHAR(50)`
- Default: `'user'`
- Constraint: NOT NULL

**Why:**
- Implement role-based access control (RBAC)
- Support admin, user, guest roles
- Required for new permissions system

---

### ⚠️ Impact Analysis

**Breaking changes:**
- ❌ No breaking changes
- ✅ Default value means all existing users become 'user' role
- ✅ Existing code continues to work (column is optional for now)

**Performance impact:**
- Table size: 2.5M rows
- Estimated migration time: 2-5 minutes
- Lock duration: ~30 seconds (adding column with default)
- Downtime: None (using online migration strategy)

**Application compatibility:**
- ✅ Old code: Ignores new column (works fine)
- ✅ New code: Reads new column (deployed after migration)
- ✅ Rollback safe: Can drop column if needed

---

### 🎯 Migration Strategy

**Option 1: Simple Migration** (Requires brief downtime)
```sql
ALTER TABLE users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user';
```

**Pros:**
- ✅ Simple, one command
- ✅ Automatic backfill with default value
- ✅ Fast (30 seconds)

**Cons:**
- ❌ Locks table for 30 seconds (blocks writes)
- ❌ Brief downtime for users

---

**Option 2: Online Migration** (Zero downtime) ✅ RECOMMENDED
```sql
-- Step 1: Add column as nullable (no table lock)
ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';

-- Step 2: Backfill in batches (doesn't block)
UPDATE users SET role = 'user' WHERE role IS NULL;
-- (Can be done in batches: WHERE id BETWEEN X AND Y)

-- Step 3: Add NOT NULL constraint (quick)
ALTER TABLE users ALTER COLUMN role SET NOT NULL;
```

**Pros:**
- ✅ No downtime
- ✅ No long locks
- ✅ Can monitor progress
- ✅ Can pause/resume

**Cons:**
- ⚠️ More steps (more complex)
- ⚠️ Takes longer (5 minutes)

---

**Recommendation:** Option 2 (Online Migration)
- Production requires zero downtime
- 5 minutes is acceptable
- Worth the safety of no locks

---

### 📝 Detailed Migration Steps

**Prerequisites:**
- [ ] Code deployed that handles new column
- [ ] Database backup created
- [ ] Migration tested on staging
- [ ] Team notified
- [ ] Monitoring ready

**Step 1: Create backup**
```bash
pg_dump production > backup_$(date +%Y%m%d_%H%M%S).sql
# Backup saved to: backup_20251002_143000.sql
```

**Step 2: Create migration file**
```javascript
// migrations/20251002143000_add_user_roles.js

exports.up = async function(knex) {
  // Add column as nullable first
  await knex.schema.table('users', table => {
    table.string('role', 50).defaultTo('user');
  });

  // Backfill existing users in batches
  let batch = 0;
  const batchSize = 10000;
  let processed = 0;

  while (true) {
    const updated = await knex('users')
      .whereNull('role')
      .limit(batchSize)
      .update({ role: 'user' });

    processed += updated;
    console.log(\`Backfilled \${processed} users\`);

    if (updated < batchSize) break; // Done
    await sleep(100); // Brief pause between batches
  }

  // Add NOT NULL constraint
  await knex.raw('ALTER TABLE users ALTER COLUMN role SET NOT NULL');
};

exports.down = async function(knex) {
  // Rollback: Remove column
  await knex.schema.table('users', table => {
    table.dropColumn('role');
  });
};
```

**Step 3: Execute migration**
```bash
# On production
npm run migrate:up

# Output:
# Running migration: 20251002143000_add_user_roles.js
# Adding column...
# Backfilling users...
# Backfilled 10000 users
# Backfilled 20000 users
# ...
# Backfilled 2500000 users
# Adding NOT NULL constraint...
# ✅ Migration completed in 4m 32s
```

**Step 4: Verify**
```sql
-- Check column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'role';

-- Result:
-- role | character varying(50) | NO

-- Check data
SELECT role, COUNT(*) FROM users GROUP BY role;

-- Result:
-- role  | count
-- user  | 2500000
```

**Step 5: Deploy application code**
```bash
# Code that uses new column
git push production main

# App now reads role from database
```

---

### 🔄 Rollback Plan

**If migration fails:**

**Before constraint added:**
```sql
-- Just drop the column (still nullable, safe)
ALTER TABLE users DROP COLUMN role;
```

**After constraint added:**
```sql
-- Drop constraint first, then column
ALTER TABLE users ALTER COLUMN role DROP NOT NULL;
ALTER TABLE users DROP COLUMN role;
```

**If data corruption:**
```bash
# Restore from backup (worst case)
psql production < backup_20251002_143000.sql
```

**Application rollback:**
```bash
# Revert to previous version
git revert HEAD
git push production main
```

---

### 🧪 Testing Plan

**Pre-migration testing (on staging):**

1. **Run migration on staging**
   ```bash
   npm run migrate:up
   # Verify no errors
   ```

2. **Test application with new schema**
   - ✅ User login works
   - ✅ User registration works
   - ✅ Role assignment works
   - ✅ API returns role field

3. **Test rollback**
   ```bash
   npm run migrate:down
   # Verify rollback works
   ```

4. **Performance test**
   - Measure migration time on staging (similar data volume)
   - Monitor CPU/memory during migration
   - Check for lock contention

**Post-migration validation:**

1. **Data integrity**
   ```sql
   -- All users have role
   SELECT COUNT(*) FROM users WHERE role IS NULL;
   -- Expected: 0

   -- Roles are valid
   SELECT DISTINCT role FROM users;
   -- Expected: Only 'user', 'admin', 'guest'
   ```

2. **Application health**
   - Check error logs (no new errors)
   - Monitor response times (no degradation)
   - Verify API endpoints work

3. **Database performance**
   ```sql
   -- Query performance acceptable
   EXPLAIN ANALYZE SELECT * FROM users WHERE role = 'admin';
   -- Should use index if created
   ```

---

### 📊 Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Migration fails | LOW | HIGH | Tested on staging, have rollback |
| Data corruption | LOW | CRITICAL | Backup before migration |
| Application breaks | LOW | HIGH | Deploy code first, test thoroughly |
| Performance degradation | MEDIUM | MEDIUM | Online migration, batched updates |
| Long lock duration | LOW | MEDIUM | Using online migration strategy |

**Overall risk:** LOW (well-planned, tested, and mitigated)

---

### ⏰ Timeline

**Preparation:**
- Code deployment: Day 1 (deploy code that handles new column)
- Testing complete: Day 2

**Migration:**
- Backup: 5 minutes
- Migration: 5 minutes
- Verification: 5 minutes
- **Total: 15 minutes**

**Schedule:**
- **When:** Tuesday, 2:00 AM UTC (low traffic)
- **Who:** Database admin + on-call engineer
- **Communication:** Notify team 24 hours in advance

---

### 📢 Communication Plan

**Pre-migration (24h before):**
```
📢 Database Migration Scheduled

When: Tuesday Oct 3, 2:00 AM UTC
Duration: ~15 minutes
Impact: None (zero downtime)

Changes:
- Adding 'role' column to users table
- Enables new permissions system

Action required: None
Questions: Contact @db-admin
```

**During migration:**
```
🔄 Database migration in progress...
Status: Adding column ✅
Status: Backfilling data... 50% complete
Status: Complete ✅

Verification passed, all systems operational
```

**Post-migration:**
```
✅ Database Migration Complete

Duration: 4m 32s (faster than expected)
Downtime: 0 seconds
Status: All systems healthy

New column 'role' available for use
```

---

**Proceed with migration?** (yes/modify plan/test more)
```

---

## Step 3: Migration Execution

```markdown
## Executing Migration

**Started:** 2025-10-03 02:00:00 UTC
**Status:** In Progress

---

### Step 1: Pre-flight Checks

\`\`\`bash
# Check database connection
psql -h production-db -U admin -d maindb -c "SELECT 1"
# ✅ Connected

# Check table exists
psql -c "SELECT COUNT(*) FROM users"
# ✅ 2,500,000 rows

# Check backup directory
ls -lh backups/
# ✅ 50GB free space

# Check current schema
psql -c "\\d users"
# ✅ Schema verified
\`\`\`

✅ All checks passed

---

### Step 2: Create Backup

\`\`\`bash
pg_dump production > backups/backup_20251003_020000.sql

# Output:
# Dumping schema...
# Dumping data...
# ✅ Backup complete: 1.2 GB
# Saved to: backups/backup_20251003_020000.sql
\`\`\`

✅ Backup created (02:03:22 UTC)

---

### Step 3: Run Migration

\`\`\`bash
npm run migrate:up

# Output:
# [02:05:00] Running migration: 20251002143000_add_user_roles.js
# [02:05:01] Adding column 'role'...
# [02:05:03] Column added (2.1s)
# [02:05:03] Backfilling users...
# [02:05:13] Backfilled 100,000 users (4%)
# [02:05:23] Backfilled 200,000 users (8%)
# [02:05:33] Backfilled 300,000 users (12%)
# ...
# [02:08:43] Backfilled 2,500,000 users (100%)
# [02:08:44] Adding NOT NULL constraint...
# [02:08:45] Constraint added (1.2s)
# [02:08:45] ✅ Migration completed successfully
\`\`\`

✅ Migration complete (02:08:45 UTC)
**Duration:** 3m 45s

---

### Step 4: Verification

\`\`\`sql
-- Check column added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'role';

-- Result:
-- role | character varying(50) | NO ✅

-- Check all rows have role
SELECT COUNT(*) FROM users WHERE role IS NULL;
-- Result: 0 ✅

-- Check role distribution
SELECT role, COUNT(*) as count FROM users GROUP BY role;
-- Result:
-- role  | count
-- user  | 2,500,000 ✅

-- Test query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE role = 'user' LIMIT 10;
-- Execution time: 0.234 ms ✅
\`\`\`

✅ All verifications passed

---

### Step 5: Application Verification

\`\`\`bash
# Health check
curl https://api.production.com/health
# {\"status\":\"healthy\",\"database\":\"connected\"} ✅

# Test user endpoint
curl https://api.production.com/users/123
# {\"id\":123,\"email\":\"user@example.com\",\"role\":\"user\"} ✅

# Check error logs
tail -n 100 /var/log/app.log | grep ERROR
# No errors ✅

# Check metrics
# Response time: 95ms (p95) ✅
# Error rate: 0.01% ✅
# Database connections: 15/100 ✅
\`\`\`

✅ Application healthy

---

### ✅ Migration Successful

**Completed:** 02:10:00 UTC
**Total duration:** 10 minutes
**Downtime:** 0 seconds
**Status:** All systems operational

---

### 📢 Announcement

**Posted to #engineering:**

\`\`\`
✅ Database Migration Complete

Migration: Add user_roles column
Duration: 3m 45s
Downtime: None
Status: All systems healthy

The 'role' column is now available in the users table.
All existing users have been assigned the 'user' role.

Questions? Contact @db-admin
\`\`\`

---

### 📊 Post-Migration Monitoring

**Monitoring for next 24 hours:**

**+1 hour:**
- Database CPU: 32% (normal) ✅
- Query performance: Stable ✅
- Error rate: 0.01% (normal) ✅

**+12 hours:**
- All metrics stable ✅
- No anomalies detected ✅
- Migration considered successful ✅
```

---

## Common Migration Patterns

### Pattern 1: Add Column (Non-Breaking)

```sql
-- Safe: Adding nullable column
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(255);

-- Backfill (optional, can be done gradually)
UPDATE users SET avatar_url = generate_avatar_url(id);
```

---

### Pattern 2: Rename Column (Breaking)

**Multi-step deployment:**

```sql
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN email_address VARCHAR(255);

-- Step 2: Backfill
UPDATE users SET email_address = email;

-- Deploy code that reads both columns (fallback)

-- Step 3: Drop old column (after all instances updated)
ALTER TABLE users DROP COLUMN email;
```

---

### Pattern 3: Change Column Type

```sql
-- Safe approach: Create new column
ALTER TABLE orders ADD COLUMN amount_decimal DECIMAL(10,2);

-- Migrate data
UPDATE orders SET amount_decimal = amount::DECIMAL;

-- Verify
SELECT COUNT(*) FROM orders WHERE amount_decimal IS NULL;

-- Deploy code using new column

-- Drop old column
ALTER TABLE orders DROP COLUMN amount;
ALTER TABLE orders RENAME COLUMN amount_decimal TO amount;
```

---

### Pattern 4: Large Data Migration

```javascript
// Batch processing for large tables
async function migrateData() {
  const batchSize = 1000;
  let offset = 0;

  while (true) {
    const rows = await db.query(
      'SELECT id, data FROM legacy_table LIMIT $1 OFFSET $2',
      [batchSize, offset]
    );

    if (rows.length === 0) break;

    // Transform and insert
    await db.transaction(async trx => {
      for (const row of rows) {
        const transformed = transform(row);
        await trx('new_table').insert(transformed);
      }
    });

    offset += batchSize;
    console.log(`Migrated ${offset} rows`);

    // Pause to avoid overwhelming database
    await sleep(100);
  }
}
```

---

## Quality Criteria

Migration complete when:
- [ ] Migration planned and documented
- [ ] Tested on staging environment
- [ ] Backup created
- [ ] Migration executed successfully
- [ ] Data verified (no NULLs, correct values)
- [ ] Application verified (no errors)
- [ ] Performance acceptable
- [ ] Rollback plan tested
- [ ] Team notified
- [ ] Monitoring active for 24 hours

---
