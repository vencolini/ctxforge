# Performance Optimization Protocol

**Load this protocol when:** Making code faster, reducing load times, or improving efficiency

---

## When to Use

User requests starting with: slow, optimize, faster, performance, speed up, reduce latency

Examples:
- "The page loads too slowly"
- "Optimize this database query"
- "Make the search faster"

---

## Step 1: Performance Discovery (Ask 3-5 Questions)

**Don't optimize blindly.** Measure first:

### Q1: Performance Problem
```
"What specifically is slow?

- **Page load time?** (initial render)
- **Interaction response?** (button clicks, form submissions)
- **Data fetching?** (API calls, database queries)
- **Computation?** (algorithm, processing)
- **Memory usage?** (memory leaks, high consumption)
- **Bundle size?** (JavaScript download size)

Please describe what feels slow."
```

### Q2: Current Metrics
```
"Do you have performance measurements?

**Load times:**
- Current: [X] seconds/ms
- Expected: [Y] seconds/ms

**Tools used:**
- Browser DevTools?
- Lighthouse?
- Performance profiler?

If no metrics yet, should I help measure first?"
```

### Q3: User Impact
```
"When does this slowness occur?

- **Always slow?**
- **Slow with large datasets?** (how large?)
- **Slow on specific devices?** (mobile, old computers)
- **Slow on slow networks?** (3G, throttled)
- **Gradual degradation?** (memory leak over time)

Understanding context helps prioritize."
```

### Q4: Constraints
```
"Any optimization constraints?

- **Cannot change API?** (third-party dependency)
- **Must support old browsers?** (limits modern optimizations)
- **Cannot increase complexity?** (maintainability priority)
- **Budget limits?** (CDN costs, infrastructure)

I'll work within your constraints."
```

### Q5: Optimization Target (optional)
```
"What's your performance target?

- **Lighthouse score:** Aim for [X/100]
- **Load time:** Under [X] seconds
- **Time to Interactive (TTI):** Under [X] seconds
- **First Contentful Paint (FCP):** Under [X] seconds

Or just "make it faster"?"
```

---

## Step 2: Performance Analysis & Diagnosis

### Profiling & Measurement

```markdown
## Performance Analysis: [Feature/Page]

### 📊 Current Metrics (Baseline)

**Measured with:** [Chrome DevTools / Lighthouse / WebPageTest]

**Load Performance:**
```
First Contentful Paint (FCP):  2,400ms  ⚠️ (target: <1,800ms)
Largest Contentful Paint (LCP): 4,200ms  🔴 (target: <2,500ms)
Time to Interactive (TTI):      5,800ms  🔴 (target: <3,800ms)
Total Blocking Time (TBT):      850ms    ⚠️ (target: <200ms)
Cumulative Layout Shift (CLS):  0.15     ⚠️ (target: <0.1)
```

**Resource Breakdown:**
```
Total page size: 2.8 MB
├─ JavaScript:   1.2 MB (43%) ⚠️
├─ Images:       1.0 MB (36%)
├─ CSS:          0.4 MB (14%)
└─ Fonts:        0.2 MB (7%)

Total requests: 47
├─ Scripts: 12
├─ Images:  18
├─ CSS:     8
└─ Fonts:   3
```

---

### 🔍 Bottleneck Analysis

#### Bottleneck 1: Large JavaScript Bundle
**Finding:** Main bundle is 1.2 MB (400 KB gzipped)
**Impact:** 3+ seconds download on 3G
**Location:** `dist/main.bundle.js`

**Breakdown:**
```
node_modules/lodash:        180 KB ⚠️
node_modules/moment:        150 KB ⚠️
src/components/Dashboard:   120 KB
src/utils/helpers:           80 KB
[Other dependencies]:       470 KB
```

**Root cause:** Importing entire libraries instead of specific functions

---

#### Bottleneck 2: Unoptimized Images
**Finding:** 18 images, all PNG, no compression
**Impact:** 1 MB of image data
**Location:** `/public/images/`

**Examples:**
- `hero-bg.png`: 350 KB (could be 50 KB WebP)
- `product-1.png`: 120 KB (could be 20 KB WebP)

**Root cause:** No image optimization pipeline

---

#### Bottleneck 3: N+1 Query Pattern
**Finding:** Database making 50+ queries per page load
**Impact:** 800ms database time
**Location:** `src/api/products.ts:45`

```javascript
// Current: N+1 queries
const products = await db.query('SELECT * FROM products');
for (const product of products) {
  product.category = await db.query(
    'SELECT * FROM categories WHERE id = ?',
    [product.categoryId]
  ); // ⚠️ Query in loop!
}
```

**Root cause:** Missing JOIN or eager loading

---

#### Bottleneck 4: Unnecessary Re-renders (React)
**Finding:** Component re-renders 15 times on single interaction
**Impact:** 400ms of unnecessary work
**Location:** `src/components/ProductList.tsx`

**Profiler shows:**
- Parent re-renders → all children re-render
- No memoization
- Creating new objects in render

**Root cause:** Missing React.memo, useMemo, useCallback

---

### 🎯 Performance Targets

**Goal:** Improve Lighthouse score from 45 to 90+

**Specific targets:**
- LCP: 4,200ms → <2,000ms (52% reduction)
- TTI: 5,800ms → <3,000ms (48% reduction)
- Bundle: 1.2MB → <500KB (58% reduction)
- Requests: 47 → <20 (57% reduction)
```

---

## Step 3: Optimization Proposal

Present optimization strategy:

```markdown
## Performance Optimization Plan

### 🎯 Goal
Reduce page load time from 5.8s to <3s (48% improvement)

---

### 🔧 Optimizations (Prioritized by Impact)

#### HIGH IMPACT (Implement first)

##### 1. Code Splitting & Tree Shaking
**Problem:** 1.2 MB JavaScript bundle
**Solution:** Split into route-based chunks, remove unused code

**Changes:**
```javascript
// Before: Import everything
import _ from 'lodash';
import moment from 'moment';

// After: Import only what's needed
import debounce from 'lodash/debounce';
import { format } from 'date-fns'; // Smaller alternative to moment
```

**Implementation:**
- Enable Webpack code splitting
- Use dynamic imports for routes
- Replace moment.js with date-fns (70% smaller)
- Replace lodash imports with individual functions

**Expected impact:**
- Bundle: 1.2 MB → 400 KB (67% reduction)
- LCP improvement: 1,500ms faster
- TTI improvement: 2,000ms faster

**Effort:** 4 hours
**Risk:** Low (no behavior changes)

---

##### 2. Image Optimization
**Problem:** 1 MB of unoptimized PNG images
**Solution:** Convert to WebP, add lazy loading

**Implementation:**
```html
<!-- Before -->
<img src="hero-bg.png" alt="Hero" />

<!-- After -->
<img
  src="hero-bg.webp"
  alt="Hero"
  loading="lazy"
  width="1200"
  height="600"
/>
```

**Tools:**
- Convert to WebP with `sharp` or `imagemin`
- Add `loading="lazy"` attribute
- Serve responsive images with `srcset`

**Expected impact:**
- Image size: 1 MB → 150 KB (85% reduction)
- LCP improvement: 800ms faster
- Initial page weight: 2.8 MB → 2 MB

**Effort:** 2 hours
**Risk:** Low (progressive enhancement)

---

##### 3. Database Query Optimization
**Problem:** N+1 query pattern (50+ queries)
**Solution:** Use JOIN or eager loading

**Implementation:**
```javascript
// Before: N+1 queries (50+ database calls)
const products = await db.query('SELECT * FROM products');
for (const product of products) {
  product.category = await db.query(
    'SELECT * FROM categories WHERE id = ?',
    [product.categoryId]
  );
}

// After: Single JOIN query (1 database call)
const products = await db.query(`
  SELECT p.*, c.name as categoryName
  FROM products p
  LEFT JOIN categories c ON p.categoryId = c.id
`);
```

**Expected impact:**
- Database time: 800ms → 50ms (94% reduction)
- API response: Faster by 750ms
- Server load: Reduced by 98%

**Effort:** 1 hour
**Risk:** Low (same result, better query)

---

#### MEDIUM IMPACT (Implement second)

##### 4. React Performance Optimization
**Problem:** Unnecessary re-renders (15x per interaction)
**Solution:** Add memoization

**Implementation:**
```javascript
// Before: Re-renders on every parent update
function ProductList({ products, onSelect }) {
  return products.map(product => (
    <ProductCard product={product} onSelect={onSelect} />
  ));
}

// After: Memoized, only re-renders when props change
const ProductList = React.memo(({ products, onSelect }) => {
  const memoizedOnSelect = useCallback(onSelect, []);

  return products.map(product => (
    <ProductCard product={product} onSelect={memoizedOnSelect} />
  ));
});

const ProductCard = React.memo(({ product, onSelect }) => {
  // Component only re-renders when product changes
});
```

**Expected impact:**
- TBT: 850ms → 250ms (71% reduction)
- Interaction: Feels 3x more responsive
- CPU usage: Reduced by 60%

**Effort:** 3 hours
**Risk:** Low (no functional changes)

---

##### 5. Add Response Caching
**Problem:** Re-fetching same data on every load
**Solution:** Cache API responses

**Implementation:**
```javascript
// Add cache headers
app.get('/api/products', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 min cache
  res.json(products);
});

// Add client-side cache
const cache = new Map();
async function fetchProducts() {
  if (cache.has('products')) {
    return cache.get('products');
  }
  const data = await fetch('/api/products').then(r => r.json());
  cache.set('products', data);
  return data;
}
```

**Expected impact:**
- Repeat visits: 70% faster
- Server load: Reduced by 40%
- API calls: Reduced significantly

**Effort:** 2 hours
**Risk:** Low (needs cache invalidation strategy)

---

#### LOW IMPACT (Nice to have)

##### 6. Enable Compression
**Solution:** Enable Brotli/Gzip compression

```javascript
// server.js
const compression = require('compression');
app.use(compression()); // Brotli if available, else Gzip
```

**Expected impact:** 20-30% reduction in transfer size
**Effort:** 15 minutes
**Risk:** None

---

##### 7. Prefetch Critical Resources
**Solution:** Add resource hints

```html
<link rel="preconnect" href="https://api.example.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
<link rel="preload" as="script" href="/main.js" />
```

**Expected impact:** 100-200ms faster initial connection
**Effort:** 30 minutes
**Risk:** None

---

### 📊 Expected Results

**Before optimization:**
- Lighthouse score: 45/100
- Load time: 5.8s
- Bundle size: 1.2 MB

**After all optimizations:**
- Lighthouse score: 92/100 ✅ (target: 90+)
- Load time: 2.1s ✅ (target: <3s)
- Bundle size: 400 KB ✅ (target: <500 KB)

**Total improvement:**
- 64% faster load time
- 67% smaller bundle
- 104% Lighthouse score improvement

---

### 🎯 Implementation Strategy

**Phase 1 (Week 1): High-impact optimizations**
1. Code splitting (Day 1-2)
2. Image optimization (Day 3)
3. Database query optimization (Day 4)
4. Measure improvements

**Phase 2 (Week 2): Medium-impact optimizations**
1. React memoization (Day 1-2)
2. Caching strategy (Day 3)
3. Measure improvements

**Phase 3: Low-impact optimizations**
1. Compression
2. Resource hints
3. Final measurement

---

**Proceed with Phase 1?** (yes/modify plan)
```

---

## Step 4: Implementation

After approval, implement optimizations:

```markdown
## Implementing Optimizations

### ✅ Optimization 1: Code Splitting

**Changes made:**

1. **Webpack configuration:**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        }
      }
    }
  }
};
```

2. **Dynamic imports for routes:**
```javascript
// Before
import Dashboard from './Dashboard';

// After
const Dashboard = lazy(() => import('./Dashboard'));
```

3. **Replaced heavy dependencies:**
- moment.js (150 KB) → date-fns (20 KB)
- Full lodash (180 KB) → Individual functions (15 KB)

**Results:**
```
Before: main.bundle.js = 1.2 MB
After:
  main.js     = 180 KB
  vendors.js  = 220 KB
  dashboard.js = 80 KB (lazy loaded)

Total initial: 400 KB (67% reduction) ✅
```

**Testing:**
- ✅ All features working
- ✅ Routes load correctly
- ✅ No console errors

---

### ✅ Optimization 2: Image Optimization

**Changes made:**

1. **Converted images to WebP:**
```bash
# Conversion script
for file in public/images/*.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done
```

2. **Added lazy loading:**
```html
<img
  src="hero-bg.webp"
  alt="Hero"
  loading="lazy"
  width="1200"
  height="600"
/>
```

**Results:**
```
Before: 1.0 MB PNG images
After:  150 KB WebP images (85% reduction) ✅
```

**Browser support:** 95% (fallback to PNG for old browsers)

---

[Continue for each optimization...]

---

### 📊 Final Performance Results

**Before vs After:**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Lighthouse Score** | 45 | 93 | +107% |
| **First Contentful Paint** | 2,400ms | 1,200ms | -50% |
| **Largest Contentful Paint** | 4,200ms | 1,800ms | -57% |
| **Time to Interactive** | 5,800ms | 2,100ms | -64% |
| **Total Blocking Time** | 850ms | 220ms | -74% |
| **Bundle Size** | 1.2 MB | 400 KB | -67% |
| **Page Weight** | 2.8 MB | 1.1 MB | -61% |

**Lighthouse audit:**
```
Performance:   93/100 ✅ (was 45)
Accessibility: 95/100 ✅
Best Practices: 100/100 ✅
SEO:           100/100 ✅
```

**User impact:**
- 64% faster page load
- Smooth interactions (no jank)
- Works well on 3G networks
- Improved mobile experience

---

### 🎉 Success Criteria Met

- [x] Lighthouse score >90 (achieved 93)
- [x] Load time <3s (achieved 2.1s)
- [x] Bundle size <500KB (achieved 400KB)
- [x] No regressions in functionality
- [x] Improved user experience
```

---

## Step 5: Document & Monitor

```markdown
## Performance Monitoring Setup

### Continuous Monitoring

**Tools configured:**
1. **Lighthouse CI** - Run on every deploy
2. **Web Vitals** - Track real user metrics
3. **Sentry Performance** - Monitor slow transactions

**Alerts configured:**
- LCP >2.5s → Slack notification
- Bundle size >600KB → Block deployment
- Lighthouse score <85 → Warning

---

### Performance Budget

**Enforced limits:**
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 512000 }]
      }
    }
  }
};
```

---

### PL-XXX: Performance Optimization Learnings

**Discovered:** Performance optimization session, [date]

**Key learnings:**

1. **Measure first, optimize second**
   - Always profile before optimizing
   - Don't guess where bottlenecks are

2. **Biggest wins:**
   - Code splitting (67% bundle reduction)
   - Database query optimization (94% faster)
   - Image optimization (85% smaller)

3. **React performance:**
   - Use React.memo for expensive components
   - Memoize callbacks passed to children
   - Monitor re-renders with DevTools Profiler

4. **Prevention:**
   - Set performance budgets
   - Monitor in CI/CD
   - Regular performance audits

**Category:** Performance
```

---

## Quality Criteria

Optimization complete when:
- [ ] Baseline metrics measured
- [ ] Bottlenecks identified and profiled
- [ ] Optimization plan approved
- [ ] Changes implemented and tested
- [ ] Performance targets met
- [ ] No functionality regressions
- [ ] Monitoring configured
- [ ] Performance budget established
- [ ] Team trained on maintaining performance

---
