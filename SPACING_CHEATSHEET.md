# Dashflow X Spacing Cheat Sheet

Quick reference for common spacing patterns. Copy and paste these examples.

---

## CARD PATTERNS

### Standard Card (Most Common - 80% Usage)
```tsx
<div className="card pd-24px">
  <div className="flex-vertical gap-row-16px">
    <h3 className="text-200 bold color-neutral-800">Title</h3>
    <p className="text-100 color-neutral-600">Description</p>
  </div>
</div>
```

### Compact Card (Nested, Stats)
```tsx
<div className="card pd-16px">
  <div className="flex-horizontal gap-column-12px align-center">
    <div className="card-icon-square _26px">🔍</div>
    <div className="flex-vertical">
      <span className="text-50 color-neutral-600">Label</span>
      <span className="text-200 bold color-neutral-800">Value</span>
    </div>
  </div>
</div>
```

### Large Card (Features, Sections)
```tsx
<div className="card pd-32px---24px">
  <div className="flex-vertical gap-row-24px">
    <div className="flex-horizontal gap-column-12px align-center">
      <div className="card-icon-square _40px">💡</div>
      <h2 className="text-400 bold color-neutral-800">Section Title</h2>
    </div>
    <div className="text-200 color-neutral-600">Content</div>
  </div>
</div>
```

### Premium Card (Hero, CTA, Empty State)
```tsx
<div className="card pd-32px---44px">
  <div className="text-center">
    <div className="card-icon-square _40px" style={{ margin: '0 auto 24px' }}>
      🚀
    </div>
    <h1 className="text-600 bold color-neutral-800 mg-bottom-16px">Hero Title</h1>
    <p className="text-200 color-neutral-600 mg-bottom-32px">Subtitle</p>
    <button className="btn-primary large">Get Started</button>
  </div>
</div>
```

---

## STAT CARDS

### Stat Card with Badge
```tsx
<div className="card pd-24px">
  <div className="flex-horizontal space-between align-center mg-bottom-16px">
    <div className="card-icon-square _26px">📊</div>
    <div className="badge green">
      <div className="text-50 medium">Active</div>
    </div>
  </div>
  <div className="flex-vertical gap-row-12px">
    <div className="text-100 medium color-neutral-600">Total Sites</div>
    <div className="card-amount-container green">
      <div className="display-2 color-neutral-800">24</div>
    </div>
  </div>
</div>
```

### Stat Card with Trend
```tsx
<div className="card pd-24px">
  <div className="flex-horizontal space-between align-center mg-bottom-12px">
    <div className="card-icon-square _40px">✅</div>
  </div>
  <div className="text-100 medium color-neutral-600 mg-bottom-12px">Fixes Applied</div>
  <div className="flex-horizontal space-between align-center">
    <div className="card-amount-container green">
      <div className="display-2 color-neutral-800">142</div>
    </div>
    <span className="text-50 color-neutral-500">This month</span>
  </div>
</div>
```

---

## GRIDS

### Stats Grid (4 Columns)
```tsx
<div className="grid-4-columns _1-column-tablet gap-row-32px gap-column-12px">
  <div className="card pd-24px">Stat 1</div>
  <div className="card pd-24px">Stat 2</div>
  <div className="card pd-24px">Stat 3</div>
  <div className="card pd-24px">Stat 4</div>
</div>
```

### Feature Grid (3 Columns)
```tsx
<div className="grid-3-columns _1-column-mbl gap-row-24px gap-column-12px">
  <div className="card pd-24px hover-card-link">Feature 1</div>
  <div className="card pd-24px hover-card-link">Feature 2</div>
  <div className="card pd-24px hover-card-link">Feature 3</div>
</div>
```

### Content Grid (2 Columns)
```tsx
<div className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px">
  <div className="card pd-32px---24px">Content Left</div>
  <div className="card pd-32px---24px">Content Right</div>
</div>
```

### Vertical Stack (1 Column)
```tsx
<div className="grid-1-column gap-row-32px">
  <div className="card pd-24px">Section 1</div>
  <div className="card pd-24px">Section 2</div>
  <div className="card pd-24px">Section 3</div>
</div>
```

---

## TYPOGRAPHY HIERARCHY

### Page Header
```tsx
<div className="mg-bottom-48px">
  <div className="flex-horizontal gap-column-16px align-center">
    <div className="card-icon-square _40px">👋</div>
    <div className="flex-vertical">
      <h1 className="text-500 bold color-neutral-800">Welcome back, User!</h1>
      <p className="text-200 color-neutral-600">Here's what's happening</p>
    </div>
  </div>
</div>
```

### Section Header
```tsx
<div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
  <div className="card-icon-square _40px">⚡</div>
  <h2 className="text-400 bold color-neutral-800">Quick Actions</h2>
</div>
```

### Card Header
```tsx
<div className="mg-bottom-16px">
  <h3 className="text-300 bold color-neutral-800 mg-bottom-8px">Card Title</h3>
  <p className="text-100 color-neutral-600">Card description text</p>
</div>
```

### Body Text Variations
```tsx
<p className="text-200 color-neutral-600 mg-bottom-16px">Large body text</p>
<p className="text-100 color-neutral-600 mg-bottom-16px">Standard body text</p>
<span className="text-50 color-neutral-500">Small label or caption</span>
```

---

## BUTTONS

### Primary Button
```tsx
<button className="btn-primary large">
  <div className="flex-horizontal gap-column-6px">
    <Plus className="w-5 h-5" />
    <div>Connect Site</div>
  </div>
</button>
```

### Secondary Button
```tsx
<button className="btn-secondary">
  <div className="text-100 medium">Learn More</div>
</button>
```

### Button Row
```tsx
<div className="buttons-row justify-end gap-column-8px">
  <button className="btn-secondary">Cancel</button>
  <button className="btn-primary">Save Changes</button>
</div>
```

---

## BADGES

### Status Badges
```tsx
<div className="badge green">
  <div className="text-50 medium">Active</div>
</div>

<div className="badge orange">
  <div className="text-50 medium">Pending</div>
</div>

<div className="badge red">
  <div className="text-50 medium">Error</div>
</div>

<div className="badge neutral">
  <div className="text-50 medium">Inactive</div>
</div>
```

---

## ICON CONTAINERS

### Standard Icon (40px)
```tsx
<div className="card-icon-square _40px">
  <div className="text-300">🌐</div>
</div>
```

### Small Icon (26px)
```tsx
<div className="card-icon-square _26px">
  <div className="text-100">🔍</div>
</div>
```

### Neutral Icon (Muted)
```tsx
<div className="card-icon-square _26px neutral-icon">
  <div className="text-100">⏱️</div>
</div>
```

---

## LAYOUTS

### Dashboard Layout
```tsx
<div className="w-layout-blockcontainer container-default w-container">
  <div className="grid-1-column gap-row-32px">
    {/* Page sections */}
  </div>
</div>
```

### Two-Column Dashboard (Sidebar + Main)
```tsx
<div className="grid-2-columns main-dashboard-grid">
  <aside className="flex-vertical gap-row-24px">
    {/* Sidebar content */}
  </aside>
  <main className="flex-vertical gap-row-32px">
    {/* Main content */}
  </main>
</div>
```

---

## SPACING QUICK REFERENCE

### Padding Classes
- `pd-16px` - Compact cards
- `pd-24px` - Standard cards (MOST COMMON)
- `pd-32px---24px` - Large cards
- `pd-32px---44px` - Premium cards
- `pd-22px---18px` - Mini cards
- `pd-24px---18px` - Narrow cards

### Gap Classes (Columns)
- `gap-column-4px` - Icon + text (minimal)
- `gap-column-6px` - Button icon + label
- `gap-column-8px` - Small spacing
- `gap-column-12px` - Standard spacing (MOST COMMON)
- `gap-column-16px` - Large spacing
- `gap-column-24px` - Section spacing

### Gap Classes (Rows)
- `gap-row-8px` - Compact
- `gap-row-12px` - Small
- `gap-row-16px` - Standard (MOST COMMON)
- `gap-row-24px` - Large
- `gap-row-32px` - Major spacing

### Margin Classes
- `mg-bottom-8px` - Small
- `mg-bottom-12px` - Medium-small
- `mg-bottom-16px` - Standard (MOST COMMON)
- `mg-bottom-24px` - Section
- `mg-bottom-32px` - Large section
- `mg-bottom-48px` - Major divider

### Typography Classes
- `text-50` - 12px - Badges, captions
- `text-100` - 14px - Body text (BASE)
- `text-200` - 16px - Emphasized body
- `text-300` - 18px - Subheadings
- `text-400` - 20px - Card headings
- `text-500` - 24px - Section headings
- `text-600` - 30px - Page titles
- `display-1` - 48px - Hero
- `display-2` - 40px - Large stats

### Weight Modifiers
- `.medium` - font-weight: 500
- `.bold` - font-weight: 700

### Color Classes
- `color-neutral-800` - Headings
- `color-neutral-600` - Body text
- `color-neutral-500` - Muted text
- `color-accent-1` - Brand blue

---

## COMMON COMBINATIONS

### Standard Card Content
```tsx
pd-24px + gap-row-16px + mg-bottom-24px
```

### Compact Card Content
```tsx
pd-16px + gap-row-12px + mg-bottom-16px
```

### Large Card Content
```tsx
pd-32px---24px + gap-row-24px + mg-bottom-32px
```

### Stats Grid
```tsx
grid-4-columns + gap-row-24px + gap-column-12px
```

### Page Section
```tsx
grid-1-column + gap-row-32px + mg-bottom-48px
```

---

## RESPONSIVE MODIFIERS

### Grid Responsive
- `_1-column-tablet` - Stack on tablet (< 991px)
- `_1-column-mbl` - Stack on mobile (< 478px)
- `_2-columns-tablet` - 2 columns on tablet

### Padding Responsive
- `pd-sides-0-mbl` - Remove horizontal padding on mobile
- `_100-mbl` - Full width on mobile

### Margin Responsive
- `mg-bottom-32px-mbl` - Increase margin on mobile

---

## COPY-PASTE TEMPLATES

### Dashboard Page
```tsx
<div className="w-layout-blockcontainer container-default w-container">
  <div className="grid-1-column gap-row-32px">
    {/* Header */}
    <div className="flex-horizontal gap-column-16px align-center mg-bottom-48px">
      <div className="card-icon-square _40px">🌐</div>
      <div className="flex-vertical">
        <h1 className="text-500 bold color-neutral-800">Page Title</h1>
        <p className="text-200 color-neutral-600">Page description</p>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid-4-columns _1-column-tablet gap-row-32px gap-column-12px">
      <div className="card pd-24px">Stat 1</div>
      <div className="card pd-24px">Stat 2</div>
      <div className="card pd-24px">Stat 3</div>
      <div className="card pd-24px">Stat 4</div>
    </div>

    {/* Content Section */}
    <div className="card pd-32px---24px">
      <h2 className="text-400 bold color-neutral-800 mg-bottom-24px">Section Title</h2>
      <div className="flex-vertical gap-row-16px">
        {/* Content */}
      </div>
    </div>
  </div>
</div>
```

### Empty State
```tsx
<div className="card pd-32px---44px">
  <div className="text-center inner-container _400px center">
    <div className="card-icon-square _40px" style={{ margin: '0 auto 24px' }}>
      🌐
    </div>
    <h2 className="text-400 bold color-neutral-800 mg-bottom-12px">
      No items found
    </h2>
    <p className="text-200 color-neutral-600 mg-bottom-32px">
      Get started by adding your first item
    </p>
    <button className="btn-primary large">
      <div className="flex-horizontal gap-column-6px">
        <Plus className="w-5 h-5" />
        <div>Add Item</div>
      </div>
    </button>
  </div>
</div>
```

### Card List
```tsx
<div className="flex-vertical gap-row-12px">
  <div className="card pd-16px">
    <div className="flex-horizontal gap-column-12px align-center">
      <div className="card-icon-square _26px">📝</div>
      <div className="flex-vertical flex-1">
        <div className="text-100 medium color-neutral-800">Item Title</div>
        <div className="text-50 color-neutral-600">Item description</div>
      </div>
    </div>
  </div>
</div>
```

---

**Pro Tips**:

1. **Default to `pd-24px`** for most cards (80% usage)
2. **Use `gap-row-16px`** for standard vertical spacing
3. **Use `gap-column-12px`** for standard horizontal spacing
4. **Use `mg-bottom-16px`** for standard element spacing
5. **Use `text-100`** for body text, `text-200` for emphasis
6. **Always include responsive modifiers** (`_1-column-tablet`, etc.)
7. **Icon containers**: `_40px` for prominent, `_26px` for small
8. **Nest `pd-16px` cards** inside `pd-24px` cards for metrics

**Remember**: Consistency > Perfection. Stick to these patterns and your UI will match Dashflow X exactly.
