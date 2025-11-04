# Dashflow X Spacing System - Complete Reference

## PADDING SYSTEM

### Card Padding Classes

Based on Dashflow X template CSS extracted from `anyros-wondrous-site.webflow.css`:

```css
/* Uniform padding */
.card.pd-16px { padding: 16px; }         /* Compact cards */
.card.pd-24px { padding: 24px; }         /* Standard cards */

/* Asymmetric padding (vertical --- horizontal) */
.card.pd-22px---18px { padding: 22px 18px; }         /* Slightly taller */
.card.pd-24px---18px { padding: 24px 18px; }         /* Standard with narrow sides */
.card.pd-24px---18px---28px { padding: 24px 18px 28px; }  /* Custom bottom */
.card.pd-32px---18px { padding: 32px 18px; }         /* Tall with narrow sides */
.card.pd-32px---24px { padding: 32px 24px; }         /* Large cards */
.card.pd-32px---44px { padding: 32px 44px; }         /* Extra wide horizontal padding */
```

### Naming Convention
- `pd-Xpx` = uniform padding all sides
- `pd-Ypx---Xpx` = vertical padding --- horizontal padding
- `pd-Tpx---Xpx---Bpx` = top --- horizontal --- bottom

### Usage Guidelines
- **pd-16px**: Mini cards, compact stat cards, tight layouts
- **pd-24px**: Default card padding, most common use case (80% of cards)
- **pd-32px---24px**: Large content cards, headers, feature sections
- **pd-32px---44px**: Premium cards, CTA cards with wide content

---

## MARGIN SYSTEM

### Bottom Margins
```css
.mg-bottom-4px { margin-bottom: 4px; }      /* Tiny spacing between tight elements */
.mg-bottom-8px { margin-bottom: 8px; }      /* Small spacing (h3, list items) */
.mg-bottom-12px { margin-bottom: 12px; }    /* Medium-small spacing */
.mg-bottom-16px { margin-bottom: 16px; }    /* Standard spacing (h1, h2, p) */
.mg-bottom-24px { margin-bottom: 24px; }    /* Section spacing */
.mg-bottom-32px { margin-bottom: 32px; }    /* Large section spacing */
.mg-bottom-40px { margin-bottom: 40px; }    /* Extra large spacing */
.mg-bottom-48px { margin-bottom: 48px; }    /* Major section divider */
.mg-bottom-80px { margin-bottom: 80px; }    /* Page section divider */
```

### Top Margins
```css
.mg-top-2px { margin-top: 2px; }
.mg-top-16px { margin-top: 16px; }
.mg-top-48px { margin-top: 48px; }
.mg-top-80px { margin-top: 80px; }
```

### Margin Scale Pattern
**Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 80px
- Uses multiples of 4 (design token standard)
- Fibonacci-like progression for visual harmony
- Most common: 16px (standard), 24px (sections), 48px (major divisions)

---

## GAP SYSTEM (Grid & Flex)

### Column Gaps
```css
.gap-column-4px { grid-column-gap: 4px; }    /* Minimal horizontal spacing */
.gap-column-6px { grid-column-gap: 6px; }    /* Icon + text combinations */
.gap-column-8px { grid-column-gap: 8px; }    /* Small horizontal spacing */
.gap-column-12px { grid-column-gap: 12px; }  /* Medium horizontal spacing */
.gap-column-16px { grid-column-gap: 16px; }  /* Standard horizontal spacing */
.gap-column-20px { grid-column-gap: 20px; }  /* Large horizontal spacing */
.gap-column-24px { grid-column-gap: 24px; }  /* Section horizontal spacing */
.gap-column-48px { grid-column-gap: 48px; }  /* Major horizontal divider */
```

### Row Gaps
```css
.gap-row-8px { grid-row-gap: 8px; }          /* Compact vertical spacing */
.gap-row-12px { grid-row-gap: 12px; }        /* Small vertical spacing (sidebar links) */
.gap-row-16px { grid-row-gap: 16px; }        /* Standard vertical spacing */
.gap-row-24px { grid-row-gap: 24px; }        /* Medium vertical spacing (most common) */
.gap-row-32px { grid-row-gap: 32px; }        /* Large vertical spacing */
.gap-row-64px { grid-row-gap: 64px; }        /* Major vertical divider */
```

### Gap Scale Pattern
- **Column gaps**: 4px, 6px, 8px, 12px, 16px, 20px, 24px, 48px
- **Row gaps**: 8px, 12px, 16px, 24px, 32px, 64px
- **Most common**:
  - Tight layouts: 8px/12px
  - Standard layouts: 16px
  - Comfortable layouts: 24px
  - Section dividers: 48px/64px

---

## TYPOGRAPHY SYSTEM

### Text Scale
```css
.text-50 {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.333em;  /* 16px */
}  /* Small text, captions, badges */

.text-100 {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.286em;  /* 18px */
} /* Base body text (DEFAULT) */

.text-200 {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25em;   /* 20px */
}  /* Large body text, card titles */

.text-300 {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.222em;  /* 22px */
} /* Subheadings */

.text-400 {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2em;    /* 24px */
}   /* Small headings, stat values */

.text-500 {
  font-size: 24px;
  font-weight: 400;
  line-height: 1.167em;  /* 28px */
} /* Medium headings */

.text-600 {
  font-size: 30px;
  line-height: 1.133em;  /* 34px */
}  /* Large headings, page titles */
```

### Weight Modifiers
```css
.text-50.medium { font-weight: 500; }
.text-50.bold { font-weight: 700; }
.text-100.medium { font-weight: 500; }
.text-100.bold { font-weight: 700; }
.text-200.medium { font-weight: 500; }
.text-200.bold { font-weight: 700; }
.text-300.bold { font-weight: 700; }
.text-400.bold { font-weight: 700; }
```

### Heading Elements (Semantic HTML)
```css
h1 { font-size: 28px; font-weight: 700; line-height: 1.571em; margin-bottom: 16px; }
h2 { font-size: 24px; font-weight: 700; line-height: 1.417em; margin-bottom: 16px; }
h3 { font-size: 22px; font-weight: 700; line-height: 1.273em; margin-bottom: 8px; }
h4 { font-size: 16px; font-weight: 700; line-height: 1.375em; margin-bottom: 10px; }
h5 { font-size: 14px; font-weight: 700; line-height: 1.429em; margin-bottom: 10px; }
h6 { font-size: 12px; font-weight: 700; line-height: 1.5em; margin-bottom: 10px; }
body { font-size: 14px; font-weight: 400; line-height: 1.571em; } /* Base = text-100 */
```

### Typography Usage Guide
- **text-50** (12px): Badges, small labels, timestamps, metadata, micro-copy
- **text-100** (14px): Body text, descriptions, default text (BASE SIZE)
- **text-200** (16px): Emphasized body text, card titles, input labels, buttons
- **text-300** (18px): Subheadings, section titles, large buttons
- **text-400** (20px): Card headings, stat values, modal subtitles
- **text-500** (24px): Page section headings, modal titles, H2 equivalent
- **text-600** (30px): Hero headings, page titles, H1 equivalent

### Display Typography (Extra Large)
```css
.display-1 { font-size: 48px; line-height: 1.167em; font-weight: 700; }
.display-2 { font-size: 40px; line-height: 1.2em; font-weight: 700; }
.display-3 { font-size: 36px; line-height: 1.222em; font-weight: 700; }
```

Usage: Hero sections, landing pages, stat displays

---

## GRID SYSTEMS

### Standard Grids
```css
.w-layout-grid {
  grid-row-gap: 16px;
  grid-column-gap: 16px;
}  /* Base grid */

.grid-1-column {
  grid-template-columns: 1fr;
}

.grid-2-columns {
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
}

.grid-3-columns {
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
}

.grid-4-columns {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

### Special Grid Layouts
```css
/* Dashboard sidebar + main content */
.grid-2-columns.main-dashboard-grid {
  grid-column-gap: 40px;
  grid-template-columns: 1fr 5.5fr;  /* Sidebar : Main = 1:5.5 ratio */
  align-items: start;
}

/* Wide column gap for spacious layouts */
.grid-2-columns.gap-column-48px {
  grid-column-gap: 48px;
}

/* Sidebar link list (compact) */
.grid-1-column.sidebar-links-grid {
  grid-row-gap: 4px;
}
```

### Default Grid Gaps
- Base grid gap: **16px** (row & column)
- Standard grids (2/3 col): **24px**
- Dashboard grid: **40px** column gap
- Sidebar links: **4px** row gap

---

## CONTAINER SYSTEM

### Main Container
```css
.container-default {
  max-width: 1268px;
  padding-left: 24px;
  padding-right: 24px;
}
```

### Inner Container Max-Widths
Common max-width values used throughout the template:

**Small (Forms, Inputs)**:
- 180px, 244px, 272px, 326px, 334px, 348px, 368px, 370px, 384px, 388px, 400px

**Medium (Content Blocks)**:
- 542px, 576px, 600px, 624px

**Large (Main Content)**:
- 720px, 1268px

### Usage Examples
- **244px-400px**: Form fields, narrow content columns, modals
- **542px-720px**: Content containers, centered text blocks, articles
- **1268px**: Main page container (container-default)

---

## COLOR SYSTEM

### Neutral Colors (Grayscale)
```css
--neutral--100: #ffffff    /* White, card backgrounds */
--neutral--200: #f7f8fc    /* Page background (MAIN BG) */
--neutral--300: #eff1f6    /* Subtle dividers */
--neutral--400: #e6e9f1    /* Borders, disabled states */
--neutral--500: #aab1c6    /* Muted text, placeholders */
--neutral--600: #828aa3    /* Body text (DEFAULT TEXT COLOR) */
--neutral--700: #454e66    /* Dark text */
--neutral--800: #1f2d54    /* Headings, emphasis (HEADING COLOR) */
```

### Accent Colors
```css
--accent--primary-1: #3d73ff  /* Brand blue (primary CTA, links) */

--secondary--color-1: #c7d6ff  /* Light blue */
--secondary--color-2: #f1f4ff  /* Lightest blue */
--secondary--color-3: #f5f8ff  /* Pale blue */
--secondary--color-4: #94acf2  /* Medium blue */
--secondary--color-5: #fdb52a  /* Gold/yellow accent */
```

### System Colors (Status)
```css
/* Green (Success) */
--system--green-100: #def2e6
--system--green-200: #7fdca4
--system--green-300: #14ca74
--system--green-400: #11845b

/* Red (Error/Danger) */
--system--red-100: #ffeff0
--system--red-200: #ffbec2
--system--300: #ff5a65       /* Primary red */
--system--red-400: #dc2b2b

/* Blue (Info) */
--system--blue-100: #eaf4ff
--system--blue-200: #8fc3ff
--system--blue-300: #1d88fe
--system--blue-400: #086cd9

/* Orange (Warning) */
--system--orange-100: #fff3e4
--system--orange-200: #ffd19b
--system--orange-300: #ff9e2c
--system--orange-400: #d5691b
```

---

## SHADOW SYSTEM

### Shadow Variables
```css
--general--shadow-01: #14142b17  /* rgba(20, 20, 43, 0.09) - Subtle */
--general--shadow-02: #14142b0f  /* rgba(20, 20, 43, 0.06) - Very subtle */
--general--shadow-03: #14142b1a  /* rgba(20, 20, 43, 0.10) - Light */
--general--shadow-04: #14142b24  /* rgba(20, 20, 43, 0.14) - Medium */
--general--shadow-05: #14142b29  /* rgba(20, 20, 43, 0.16) - Medium-strong */
--general--shadow-06: #14142b3d  /* rgba(20, 20, 43, 0.24) - Strong */
```

### Shadow Usage
```css
.card {
  box-shadow: 0 2px 7px 0 var(--general--shadow-01);
}  /* Default card shadow */

.input {
  box-shadow: 0 0 4px 0 var(--general--shadow-01);
}

.btn-primary {
  box-shadow: 0 1px 4px 0 var(--button-shadow--color-01);
}
.btn-primary:hover {
  box-shadow: 0 2px 16px 1px #4a3aff4d;
}  /* Elevated hover */
```

---

## BORDER RADIUS

### Standard Border Radius Values
```css
.card { border-radius: 12px; }           /* Most cards */
.input { border-radius: 6px; }           /* Form inputs */
.checkbox { border-radius: 2px; }        /* Checkboxes */
.empty-state { border-radius: 11px; }    /* Empty states */
.badge { border-radius: 4px; }           /* Badges */
.btn-primary { border-radius: 76px; }    /* Pill-shaped buttons */
.btn-secondary { border-radius: 76px; }  /* Pill-shaped buttons */
blockquote { border-radius: 24px; }      /* Large content blocks */
```

### Border Radius Scale
**Common values**: 2px, 4px, 6px, 11px, 12px, 20px, 24px, 76px (pill)
- **2px**: Checkboxes, small elements
- **6px**: Inputs, dropdowns, small cards
- **12px**: Standard cards (MOST COMMON)
- **20px-24px**: Large cards, modals, feature sections
- **76px**: Pill buttons (100% rounded)

---

## AVATAR & ICON SIZES

### Avatar Sizes
```css
.avatar-circle._24px { min-width: 24px; max-width: 24px; min-height: 24px; max-height: 24px; }
.avatar-circle._32px { min-width: 32px; max-width: 32px; min-height: 32px; max-height: 32px; }
.avatar-circle._40px { min-width: 40px; max-width: 40px; min-height: 40px; max-height: 40px; }
.avatar-circle._48px { min-width: 48px; max-width: 48px; min-height: 48px; max-height: 48px; }
```

### Icon Container Sizes
```css
.card-icon-square._26px { /* 26x26px icon container */ }
.card-icon-square._40px { /* 40x40px icon container */ }
```

### Icon Usage
- **24px avatars**: Inline mentions, compact lists
- **32px avatars**: Standard UI, comments, small cards
- **40px avatars**: Card headers, user menus
- **48px avatars**: Profile sections, large cards

---

## RESPONSIVE BREAKPOINTS

Based on Webflow defaults:
- **Mobile**: < 478px
- **Mobile Landscape**: 479px - 767px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1279px
- **Large Desktop**: ≥ 1280px

### Responsive Modifiers
```css
._100-mbl { width: 100%; }  /* Full width on mobile */
.pd-sides-0-mbl { padding-left: 0; padding-right: 0; }  /* Remove horizontal padding on mobile */
.mg-bottom-32px-mbl { margin-bottom: 32px; }  /* Specific mobile margin */
```

---

## KEY DESIGN PATTERNS

### 1. Card Spacing Patterns

#### Compact Card (Tight Layout)
```html
<div class="card pd-16px">
  <div class="flex-vertical gap-row-12px">
    <!-- Content with 12px vertical spacing -->
  </div>
</div>
```

#### Standard Card (Most Common - 80% of cards)
```html
<div class="card pd-24px mg-bottom-24px">
  <div class="flex-vertical gap-row-16px">
    <!-- Content with 16px vertical spacing -->
  </div>
</div>
```

#### Large Card (Feature Sections)
```html
<div class="card pd-32px---24px mg-bottom-32px">
  <div class="flex-vertical gap-row-24px">
    <!-- Content with 24px vertical spacing -->
  </div>
</div>
```

#### Premium Card (Hero/CTA)
```html
<div class="card pd-32px---44px mg-bottom-48px">
  <div class="flex-vertical gap-row-32px">
    <!-- Content with 32px vertical spacing -->
  </div>
</div>
```

### 2. Section Spacing Patterns

```css
/* Tight sections (related content) */
.section { margin-bottom: 24px; }

/* Standard sections (separate topics) */
.section { margin-bottom: 32px; }  /* OR */
.section { margin-bottom: 48px; }

/* Major sections (page divisions) */
.section { margin-bottom: 80px; }
```

### 3. Grid + Gap Combinations

```html
<!-- Stats Grid (4 columns) -->
<div class="grid-4-columns gap-row-24px gap-column-12px">
  <div class="card pd-24px"><!-- Stat 1 --></div>
  <div class="card pd-24px"><!-- Stat 2 --></div>
  <div class="card pd-24px"><!-- Stat 3 --></div>
  <div class="card pd-24px"><!-- Stat 4 --></div>
</div>

<!-- Card Grid (2 columns) -->
<div class="grid-2-columns gap-row-24px gap-column-24px">
  <div class="card pd-32px---24px"><!-- Card 1 --></div>
  <div class="card pd-32px---24px"><!-- Card 2 --></div>
</div>

<!-- Sidebar Links (Compact) -->
<div class="grid-1-column gap-row-4px">
  <a class="sidebar-link">Link 1</a>
  <a class="sidebar-link">Link 2</a>
</div>

<!-- Form Grid -->
<div class="grid-2-columns gap-column-16px gap-row-16px">
  <input class="input" />
  <input class="input" />
</div>
```

### 4. Typography Patterns

```html
<!-- Card Header -->
<div class="mg-bottom-16px">
  <h3 class="text-400 bold color-neutral-800 mg-bottom-8px">Card Title</h3>
  <p class="text-100 color-neutral-600">Card description text</p>
</div>

<!-- Stat Display -->
<div class="mg-bottom-12px">
  <p class="text-100 medium color-neutral-600 mg-bottom-8px">Total Revenue</p>
  <p class="text-600 bold color-neutral-800">$24,500</p>
  <p class="text-50 color-neutral-500">+12% from last month</p>
</div>

<!-- Section Header -->
<div class="mg-bottom-24px">
  <h2 class="text-500 bold color-neutral-800 mg-bottom-12px">Section Title</h2>
  <p class="text-200 color-neutral-600">Section description with larger body text</p>
</div>
```

---

## SPACING MISMATCHES FOUND IN OUR COMPONENTS

### Critical Issues

#### 1. **GlassCard.tsx** - Wrong Padding System
**Current**: Uses Tailwind padding (p-4, p-6, p-8, p-10)
```tsx
const paddings = {
  none: '',
  sm: 'p-4',      // 16px - CORRECT by accident
  md: 'p-6',      // 24px - CORRECT by accident
  lg: 'p-8',      // 32px
  xl: 'p-10',     // 40px
}
```

**Should be**: Dashflow classes
```tsx
const paddings = {
  none: '',
  sm: 'pd-16px',
  md: 'pd-24px',
  lg: 'pd-32px---24px',
  xl: 'pd-32px---44px',
}
```

#### 2. **dashflow-card.tsx** - Mixing Systems
**Current**: Mixes Tailwind (p-4, gap-4) with Dashflow (pd-24px)
```tsx
<div className="bg-white/5 ... p-4 sm:p-6">  // Tailwind
```

**Should be**: Pure Dashflow
```tsx
<div className="card pd-16px">  // or pd-24px
```

#### 3. **StatsCard.tsx** - Inconsistent Gaps
**Current**: Uses custom CSS classes
```tsx
<div className="flex-vertical gap-row-12px">  // CORRECT
```

**Issue**: Mixing with Tailwind in other places
```tsx
<div className="flex items-center gap-2">  // Should be gap-column-8px
```

#### 4. **CardGrid** - Wrong Gap Values
**Current**: Uses Tailwind
```tsx
<div className="grid gap-4 sm:gap-6">
```

**Should be**: Dashflow
```tsx
<div className="grid-4-columns gap-row-24px gap-column-12px">
```

#### 5. **Typography** - Mixing Text Classes
**Current**: Mixed Tailwind and Dashflow
```tsx
<h3 className="text-base sm:text-lg">  // Tailwind
<p className="text-sm">  // Tailwind
```

**Should be**: Pure Dashflow
```tsx
<h3 className="text-400 bold">  // or text-500
<p className="text-100">  // Base body text
```

#### 6. **Margins** - Using Tailwind mb-*
**Current**:
```tsx
<div className="mb-4">  // 16px in Tailwind
<div className="mb-6">  // 24px in Tailwind
```

**Should be**:
```tsx
<div className="mg-bottom-16px">
<div className="mg-bottom-24px">
```

---

## CONVERSION GUIDE: TAILWIND → DASHFLOW

### Padding Conversion
| Tailwind | Dashflow | Pixels |
|----------|----------|--------|
| p-4 | pd-16px | 16px |
| p-6 | pd-24px | 24px |
| p-8 | pd-32px---24px* | 32px (or 32x24) |

*Note: Dashflow prefers asymmetric padding for larger cards

### Gap Conversion
| Tailwind | Dashflow | Pixels |
|----------|----------|--------|
| gap-2 | gap-column-8px | 8px |
| gap-3 | gap-column-12px | 12px |
| gap-4 | gap-column-16px | 16px |
| gap-6 | gap-column-24px | 24px |

### Margin Conversion
| Tailwind | Dashflow | Pixels |
|----------|----------|--------|
| mb-2 | mg-bottom-8px | 8px |
| mb-3 | mg-bottom-12px | 12px |
| mb-4 | mg-bottom-16px | 16px |
| mb-6 | mg-bottom-24px | 24px |
| mb-8 | mg-bottom-32px | 32px |

### Typography Conversion
| Tailwind | Dashflow | Size |
|----------|----------|------|
| text-xs | text-50 | 12px |
| text-sm | text-100 | 14px |
| text-base | text-200 | 16px |
| text-lg | text-300 | 18px |
| text-xl | text-400 | 20px |
| text-2xl | text-500 | 24px |
| text-3xl | text-600 | 30px |

---

## RECOMMENDATIONS FOR IMPLEMENTATION

### Option 1: Pure Dashflow CSS (RECOMMENDED)
Import Dashflow CSS and use their classes directly:

```tsx
// Import in layout.tsx or app.tsx
import '@/public/webflow/dashflow.css'

// Use in components
<div className="card pd-24px mg-bottom-24px">
  <div className="flex-vertical gap-row-16px">
    <h3 className="text-400 bold color-neutral-800">Title</h3>
    <p className="text-100 color-neutral-600">Description</p>
  </div>
</div>
```

**Pros**:
- Exact match to template
- No conversion needed
- Proven design system

**Cons**:
- Verbose class names
- Less familiar to Tailwind users

### Option 2: Tailwind Config Extension
Map Dashflow values to Tailwind utilities:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'df-16': '16px',  // pd-16px
        'df-24': '24px',  // pd-24px
        'df-32': '32px',  // pd-32px
        'df-44': '44px',  // pd-44px
      },
      fontSize: {
        'df-50': ['12px', { lineHeight: '1.333em' }],
        'df-100': ['14px', { lineHeight: '1.286em' }],
        'df-200': ['16px', { lineHeight: '1.25em' }],
        'df-300': ['18px', { lineHeight: '1.222em' }],
        'df-400': ['20px', { lineHeight: '1.2em' }],
        'df-500': ['24px', { lineHeight: '1.167em' }],
        'df-600': ['30px', { lineHeight: '1.133em' }],
      },
      colors: {
        neutral: {
          100: '#ffffff',
          200: '#f7f8fc',
          300: '#eff1f6',
          400: '#e6e9f1',
          500: '#aab1c6',
          600: '#828aa3',
          700: '#454e66',
          800: '#1f2d54',
        },
        accent: {
          primary: '#3d73ff',
        },
      },
    },
  },
}
```

Usage:
```tsx
<div className="p-df-24 mb-df-24 text-df-100">
```

**Pros**:
- Familiar Tailwind syntax
- Type-safe with Tailwind IntelliSense

**Cons**:
- Still custom classes
- Need to maintain config

### Option 3: Hybrid Approach (PRAGMATIC)
Use Dashflow CSS for structure, Tailwind for utilities:

```tsx
<div className="card pd-24px">  {/* Dashflow structure */}
  <div className="flex items-center justify-between">  {/* Tailwind utilities */}
    <h3 className="text-400 bold">  {/* Dashflow typography */}
      Title
    </h3>
  </div>
</div>
```

**Pros**:
- Best of both worlds
- Flexible

**Cons**:
- Two systems to understand
- Potential for confusion

---

## NEXT STEPS (ACTION ITEMS)

### Immediate Fixes Required

1. **Update StatsCard.tsx**
   - Replace Tailwind gaps with Dashflow: `gap-2` → `gap-column-8px`
   - Ensure all cards use `pd-24px` or `pd-16px`

2. **Update dashflow-card.tsx**
   - Remove Tailwind padding: `p-4 sm:p-6` → `pd-16px` or `pd-24px`
   - Use Dashflow gap classes: `gap-4` → `gap-row-16px gap-column-16px`

3. **Update GlassCard.tsx**
   - Change padding variants to use Dashflow classes
   - Or map to exact pixel values that match Dashflow

4. **Create Component Variants**
   - CompactStatsCard: `pd-16px` + `gap-row-12px`
   - StandardStatsCard: `pd-24px` + `gap-row-16px`
   - LargeStatsCard: `pd-32px---24px` + `gap-row-24px`
   - PremiumStatsCard: `pd-32px---44px` + `gap-row-32px`

5. **Standardize Grids**
   - Replace `<div className="grid gap-4">` with `grid-4-columns gap-row-24px gap-column-12px`
   - Use Dashflow grid classes throughout

6. **Typography Audit**
   - Replace all `text-sm`, `text-base`, `text-lg` with `text-100`, `text-200`, `text-300`
   - Add weight modifiers: `.medium`, `.bold`

### Long-term Improvements

1. **Import Dashflow CSS globally**
   ```tsx
   // app/layout.tsx
   import '@/public/webflow/normalize.css'
   import '@/public/webflow/webflow.css'
   import '@/public/webflow/dashflow.css'
   ```

2. **Create TypeScript types for Dashflow classes**
   ```tsx
   type DashflowPadding = 'pd-16px' | 'pd-24px' | 'pd-32px---24px' | 'pd-32px---44px'
   type DashflowText = 'text-50' | 'text-100' | 'text-200' | 'text-300' | 'text-400' | 'text-500' | 'text-600'
   ```

3. **Component library documentation**
   - Document which Dashflow classes each component uses
   - Create Storybook stories showing correct spacing

4. **Design tokens file**
   - Export Dashflow values as JS/TS constants
   - Use in styled-components or CSS-in-JS if needed

---

## SPACING CHEAT SHEET (Quick Reference)

### Most Common Patterns

```css
/* Card: Standard */
.card.pd-24px { padding: 24px; }
.gap-row-16px { grid-row-gap: 16px; }
.mg-bottom-24px { margin-bottom: 24px; }

/* Card: Compact */
.card.pd-16px { padding: 16px; }
.gap-row-12px { grid-row-gap: 12px; }
.mg-bottom-16px { margin-bottom: 16px; }

/* Card: Large */
.card.pd-32px---24px { padding: 32px 24px; }
.gap-row-24px { grid-row-gap: 24px; }
.mg-bottom-32px { margin-bottom: 32px; }

/* Typography: Common */
.text-100 { font-size: 14px; }  /* Body */
.text-200 { font-size: 16px; }  /* Emphasis */
.text-400 { font-size: 20px; }  /* Headings */

/* Grid: Stats (4 columns) */
.grid-4-columns
.gap-row-24px
.gap-column-12px
```

### Golden Rules

1. **Cards**: Use `pd-24px` as default (80% of cases)
2. **Gaps**: Use `gap-row-16px` for standard vertical spacing
3. **Margins**: Use `mg-bottom-24px` for section spacing
4. **Typography**: Use `text-100` as base, `text-200` for emphasis
5. **Grids**: Use `grid-2-columns` with `gap-row-24px gap-column-24px`

---

**Last Updated**: 2025-11-04
**Template Source**: Dashflow X (anyros-wondrous-site.webflow)
**Component Library**: Seology.AI Dashboard
