# Blueprint Implementation Tracking

## Domain: dunk-calculator.info

### Master Plan Progress (Based on Attached Blueprint)

## ✅ COMPLETED

### Pre-Build Setup
- [x] Fast hosting environment ready (Replit)
- [x] Development environment configured
- [x] Basic project structure established

### Current Homepage (/dunk-calculator/)
- [x] Basic dunk calculator functionality
- [x] Physics calculations (vertical jump, hang time, power)
- [x] Interactive visualization with canvas
- [x] Basic FAQ section
- [x] Responsive design foundation

## 🔄 IN PROGRESS

### Homepage Redesign (Blueprint Compliance)
- [ ] **Fix H-tag structure** per blueprint:
  ```
  H1 Dunk Calculator – See Exactly What You Need to Fly
  H2 Instant Results, Visualized ✅
  H2 What Influences Dunking Ability? ❌
    H3 Height & Standing Reach ❌
    H3 Vertical Jump – Standing vs. Approach ❌
    H3 Hand Size & Ball Control ❌
    H3 Power-to-Weight Ratio ❌
    H3 Technique & Timing ❌
  H2 Ready to Close the Gap? ❌ (3 pillar hub cards)
  H2 Advanced Tools for Serious Jumpers ❌ (6 calculator links)
  H2 Real-World Case Studies & FAQs ✅
  ```

## ❌ MISSING (Critical Implementation Needed)

### Pillar 1: Calculator Hub (/calculators/)
- [ ] **Hub page** with 7 calculator links
- [ ] **6 Additional Calculators:**
  1. [ ] /calculators/vertical-jump-calculator/
  2. [ ] /calculators/standing-reach-calculator/
  3. [ ] /calculators/approach-vs-standing-jump-calculator/
  4. [ ] /calculators/jump-fatigue-calculator/
  5. [ ] /calculators/max-potential-jump-calculator/
  6. [ ] /calculators/ideal-body-weight-jump-calculator/

### Pillar 2: Training Hub (/vertical-jump-training/)
- [ ] **Hub page** (2,500 words)
- [ ] **Programs:**
  - [ ] /vertical-jump-training/12-week-program/ (5,000 words)
  - [ ] /vertical-jump-training/at-home-bodyweight-jump-program/ (3,000 words)
  - [ ] /vertical-jump-training/advanced-shock-method-plyometrics/ (2,500 words)
- [ ] **Exercise Libraries:**
  - [ ] /vertical-jump-training/exercises/plyometric-exercises/ (1,200 words)
  - [ ] /vertical-jump-training/exercises/strength-exercises/ (1,200 words)
  - [ ] /vertical-jump-training/exercises/isometric-exercises/ (1,200 words)
  - [ ] /vertical-jump-training/exercises/stretching-mobility/ (1,200 words)
- [ ] **Guides:**
  - [ ] /vertical-jump-training/guides/improving-jump-technique/ (1,800 words)
  - [ ] /vertical-jump-training/guides/how-to-measure-vertical-jump/ (1,200 words)

### Pillar 3: Performance Hub (/athletic-performance/)
- [ ] **Hub page** (2,000 words)
- [ ] **Science Section:**
  - [ ] /athletic-performance/science/biomechanics-of-jumping/
  - [ ] /athletic-performance/science/fast-twitch-vs-slow-twitch/
  - [ ] /athletic-performance/science/cns-role-in-jumping/
- [ ] **Nutrition Section:**
  - [ ] /athletic-performance/nutrition/explosive-power-meals/
  - [ ] /athletic-performance/nutrition/supplements-for-jump-performance/ (2,000 words)
  - [ ] /athletic-performance/nutrition/hydration-for-athletes/ (1,200 words)
- [ ] **Gear Reviews:**
  - [ ] /athletic-performance/gear/best-basketball-shoes/
  - [ ] /athletic-performance/gear/best-plyo-boxes/
- [ ] **Recovery Section:**
  - [ ] /athletic-performance/recovery/preventing-jumpers-knee/ (2,200 words)
  - [ ] /athletic-performance/recovery/active-recovery-techniques/ (1,500 words)
  - [ ] /athletic-performance/recovery/safe-landing-from-jumps/ (1,000 words)

### Standalone Pages
- [ ] /can-i-dunk/ (1,000 words)
- [ ] /how-to-dunk-a-basketball/ (3,000 words)
- [ ] /dunking-requirements-by-height/ (1,400 words)
- [ ] /guides/types-of-dunks-explained/ (2,000 words)
- [ ] /blog/how-to-palm-a-basketball/ (900 words)

### Technical Requirements
- [ ] **Schema Markup:**
  - [ ] SoftwareApplication for all calculators
  - [ ] ItemList for hub pages
  - [ ] HowTo for guides
  - [ ] FAQPage blocks
- [ ] **Internal Linking Strategy:**
  - [ ] Up/down/across link matrix
  - [ ] Anchor text rotation (30% exact, 20% brand, 50% descriptive)
- [ ] **SEO Optimization:**
  - [ ] Title tags ≤60 chars (KW first, brand last)
  - [ ] Meta descriptions 150-160 chars
  - [ ] OpenGraph images per calculator
- [ ] **Performance:**
  - [ ] CLS guard (140px pre-allocation)
  - [ ] Service worker caching
  - [ ] WebP images <80kB

## 🎯 IMMEDIATE PRIORITIES (This Session)

1. **Homepage UI Redesign** - Fix structure per blueprint
2. **Add Missing Calculator Features** - More calculation options
3. **Create Calculator Hub** - /calculators/ with 6 additional tools
4. **Internal Navigation** - Link structure between sections
5. **Schema Markup** - Add required structured data

## 📊 Word Count Targets

| Page Type | Target Words | Current Status |
|-----------|--------------|----------------|
| Homepage | 2,000 | ~800 (needs expansion) |
| Calculator Hub | 1,200 | 0 (not created) |
| Individual Calculators | 800 each | 0 (6 missing) |
| Training Hub | 2,500 | 0 (not created) |
| Performance Hub | 2,000 | 0 (not created) |

## 🔗 Link Architecture Missing

**Current:** Single page with no internal linking
**Required:** 3-pillar hub structure with cross-links

**Up Links:** Child pages → Hub pages
**Down Links:** Hub pages → Child pages  
**Across Links:** Between silos (calculators ↔ training ↔ performance)