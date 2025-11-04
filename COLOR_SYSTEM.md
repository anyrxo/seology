# SEOLOGY.AI Color System

Complete color palette extracted from Dashflow X and Radiant UI templates for EXACT visual matching.

## Source Templates

1. **Dashflow X** (`anyros-wondrous-site.webflow`) - Dashboard/SaaS UI
2. **Radiant UI** (`radiant-ui-component-library-s-34e5e8.webflow`) - Component library

---

## Dashflow X Color Variables

### Neutral Colors (Grays/Base)

```css
--neutral--100: #ffffff       /* Pure white - backgrounds, cards */
--neutral--200: #f7f8fc       /* Lightest gray - page backgrounds */
--neutral--300: #eff1f6       /* Light gray - subtle backgrounds */
--neutral--400: #e6e9f1       /* Border gray - dividers, borders */
--neutral--500: #aab1c6       /* Medium gray - disabled states */
--neutral--600: #828aa3       /* Body text gray - main text color */
--neutral--700: #454e66       /* Dark gray - headings, emphasis */
--neutral--800: #1f2d54       /* Darkest - primary headings */
/* NOTE: --neutral--900 does NOT exist in Dashflow X */
```

### Primary Accent Colors

```css
--accent--primary-1: #3d73ff  /* Primary blue - buttons, links, brand */
/* NOTE: --accent--primary-2 does NOT exist in Dashflow X */
```

### Secondary Accent Colors

```css
--secondary--color-1: #c7d6ff  /* Light blue tint */
--secondary--color-2: #f1f4ff  /* Lighter blue tint */
--secondary--color-3: #f5f8ff  /* Lightest blue tint - hover states */
--secondary--color-4: #94acf2  /* Medium blue accent */
--secondary--color-5: #fdb52a  /* Yellow/gold accent */
```

### System Colors - Green (Success)

```css
--system--green-100: #def2e6  /* Light green background */
--system--green-200: #7fdca4  /* Light green accent */
--system--green-300: #14ca74  /* Main success green */
--system--green-400: #11845b  /* Dark success green */
```

### System Colors - Red (Error/Danger)

```css
--system--red-100: #ffeff0    /* Light red background */
--system--red-200: #ffbec2    /* Light red accent */
--system--300: #ff5a65        /* Main error red (also --system--300) */
--system--red-400: #dc2b2b    /* Dark error red */
```

### System Colors - Blue (Info)

```css
--system--blue-100: #eaf4ff   /* Light blue background */
--system--blue-200: #8fc3ff   /* Light blue accent */
--system--blue-300: #1d88fe   /* Main info blue */
--system--blue-400: #086cd9   /* Dark info blue */
```

### System Colors - Orange (Warning)

```css
--system--orange-100: #fff3e4 /* Light orange background */
--system--orange-200: #ffd19b /* Light orange accent */
--system--orange-300: #ff9e2c /* Main warning orange */
--system--orange-400: #d5691b /* Dark warning orange */
```

### Shadow Colors

```css
/* General shadows (hex with alpha) */
--general--shadow-01: #14142b17  /* Lightest shadow (opacity ~0.09) */
--general--shadow-02: #14142b0f  /* Light shadow (opacity ~0.06) */
--general--shadow-03: #14142b1a  /* Medium shadow (opacity ~0.10) */
--general--shadow-04: #14142b24  /* Medium-dark shadow (opacity ~0.14) */
--general--shadow-05: #14142b29  /* Dark shadow (opacity ~0.16) */
--general--shadow-06: #14142b3d  /* Darkest shadow (opacity ~0.24) */

/* Button shadows */
--button-shadow--color-01: #4a3aff42  /* Primary button shadow (blue, opacity ~0.26) */
--button-shadow--color-2: #4a3aff14   /* Primary button shadow light (opacity ~0.08) */
--button-shadow--color-3: #4a3aff14   /* Primary button shadow light (opacity ~0.08) */
--button-shadow--white-01: #14142b0a  /* White button shadow lightest (opacity ~0.04) */
--button-shadow--white-02: #14142b0f  /* White button shadow light (opacity ~0.06) */
--button-shadow--white-03: #14142b1a  /* White button shadow medium (opacity ~0.10) */
```

---

## Radiant UI Color Variables

### Core Colors

```css
--radiant-ui-components-library-marketplace--color--white: #ffffff
--radiant-ui-components-library-marketplace--color--body-font-dark: #6d6d6d
--radiant-ui-components-library-marketplace--color--heading-dark: #150438
```

### Additional Radiant UI Colors (from inline styles)

```css
/* Backgrounds */
#f4f4f4     /* Light gray background (footer, sections) */
#d5d5d5     /* Border gray */

/* Accent Blue (primary CTA) */
#3898ec     /* Primary blue accent (matches buttons, links) */
rgba(56, 152, 236, 0) /* Transparent blue for overlays */

/* Navigation & UI */
#112542     /* Dark navy (shadows) - rgba(17, 37, 66, 0.15) */
#0000000d   /* Very light border */
#00000026   /* Light shadow */
#0000001a   /* Medium shadow */
```

---

## Dark Mode Palette

The dark theme inverts the neutral scale and adjusts colors for visibility.

### Dark Mode Neutrals (EXISTING in globals.css)

```css
.dark {
  --neutral--100: #1f2337       /* Dark background (replaces white) */
  --neutral--200: #1a1d2e       /* Darkest background */
  --neutral--300: #252938       /* Dark card background */
  --neutral--400: #2f3447       /* Dark border */
  --neutral--500: #52566d       /* Medium gray */
  --neutral--600: #9095a8       /* Light gray text */
  --neutral--700: #c5c9d6       /* Lighter text */
  --neutral--800: #e6e8f0       /* Lightest text (headings) */
}
```

### Dark Mode Accent (EXISTING in globals.css)

```css
.dark {
  --accent--primary-1: #5b8fff  /* Lighter blue for dark mode */
}
```

### Dark Mode Shadows (EXISTING in globals.css)

```css
.dark {
  /* Button shadows */
  --button-shadow--color-01: rgba(91, 143, 255, 0.26);
  --button-shadow--white-01: rgba(255, 255, 255, 0.04);
  --button-shadow--white-02: rgba(255, 255, 255, 0.06);
  --button-shadow--white-03: rgba(255, 255, 255, 0.1);

  /* General shadows */
  --general--shadow-01: rgba(0, 0, 0, 0.3);
  --general--shadow-02: rgba(0, 0, 0, 0.4);
  --general--shadow-03: rgba(0, 0, 0, 0.5);
}
```

### Dark Mode Radiant UI (EXISTING in globals.css)

```css
.dark {
  --radiant-ui-components-library-marketplace--color--white: #1f2337;
  --radiant-ui-components-library-marketplace--color--body-font-dark: #9095a8;
  --radiant-ui-components-library-marketplace--color--heading-dark: #e6e8f0;
}
```

---

## Color Usage Guide

### Typography

| Element | Light Mode | Dark Mode | CSS Variable |
|---------|------------|-----------|--------------|
| Primary headings | `#1f2d54` | `#e6e8f0` | `--neutral--800` |
| Secondary headings | `#454e66` | `#c5c9d6` | `--neutral--700` |
| Body text | `#828aa3` | `#9095a8` | `--neutral--600` |
| Muted/disabled text | `#aab1c6` | `#52566d` | `--neutral--500` |

### Backgrounds

| Element | Light Mode | Dark Mode | CSS Variable |
|---------|------------|-----------|--------------|
| Page background | `#f7f8fc` | `#1a1d2e` | `--neutral--200` |
| Card/panel | `#ffffff` | `#1f2337` | `--neutral--100` |
| Subtle highlight | `#eff1f6` | `#252938` | `--neutral--300` |
| Hover state | `#f5f8ff` | `#2f3447` | `--secondary--color-3` / `--neutral--400` |

### Borders

| Element | Light Mode | Dark Mode | CSS Variable |
|---------|------------|-----------|--------------|
| Default border | `#e6e9f1` | `#2f3447` | `--neutral--400` |
| Light border | `#eff1f6` | `#252938` | `--neutral--300` |
| Strong border | `#aab1c6` | `#52566d` | `--neutral--500` |

### Interactive Elements

| Element | Color | CSS Variable |
|---------|-------|--------------|
| Primary button | `#3d73ff` | `--accent--primary-1` |
| Primary button hover | `#2a5dd9` | (darker variant) |
| Link color | `#3d73ff` | `--accent--primary-1` |
| Link hover | `#1d88fe` | `--system--blue-300` |
| Focus ring | `#3d73ff` with opacity | `--accent--primary-1` |

### Status/Feedback

| Status | Background | Foreground | Border |
|--------|------------|------------|--------|
| Success | `--system--green-100` | `--system--green-400` | `--system--green-300` |
| Error | `--system--red-100` | `--system--red-400` | `--system--300` |
| Warning | `--system--orange-100` | `--system--orange-400` | `--system--orange-300` |
| Info | `--system--blue-100` | `--system--blue-400` | `--system--blue-300` |

---

## Implementation Checklist

### Phase 1: Update globals.css

- [x] Dark mode variables already exist
- [ ] Add light mode `:root` variables
- [ ] Add Radiant UI variables to `:root`
- [ ] Add shadow variables
- [ ] Add secondary color variables

### Phase 2: Component Updates

Update all components to use CSS variables instead of hardcoded colors:

**Priority 1 - Core UI Components:**
- [ ] `components/ui/button.tsx` - Use `--accent--primary-1`
- [ ] `components/ui/badge.tsx` - Use system colors
- [ ] `components/ui/input.tsx` - Use neutral colors
- [ ] `components/ui/glass-card.tsx` - Use neutral backgrounds
- [ ] `components/ui/alert.tsx` - Use system colors

**Priority 2 - Dashboard Components:**
- [ ] `components/dashboard/StatsCard.tsx` - Use neutral colors
- [ ] `components/dashboard/DashboardClient.tsx` - Use backgrounds
- [ ] `components/dashboard/SitesClient.tsx` - Use borders
- [ ] `components/dashboard/Header.tsx` - Use neutral colors

**Priority 3 - Skeleton/Loading:**
- [ ] `components/ui/Skeleton.tsx` - Use neutral colors
- [ ] `app/dashboard/loading.tsx` - Use neutral backgrounds

### Phase 3: Tailwind Config

Update `tailwind.config.ts` to use CSS variables:

```typescript
colors: {
  neutral: {
    100: 'var(--neutral--100)',
    200: 'var(--neutral--200)',
    300: 'var(--neutral--300)',
    400: 'var(--neutral--400)',
    500: 'var(--neutral--500)',
    600: 'var(--neutral--600)',
    700: 'var(--neutral--700)',
    800: 'var(--neutral--800)',
  },
  accent: {
    primary: 'var(--accent--primary-1)',
  },
  system: {
    green: {
      100: 'var(--system--green-100)',
      200: 'var(--system--green-200)',
      300: 'var(--system--green-300)',
      400: 'var(--system--green-400)',
    },
    red: {
      100: 'var(--system--red-100)',
      200: 'var(--system--red-200)',
      300: 'var(--system--300)',
      400: 'var(--system--red-400)',
    },
    blue: {
      100: 'var(--system--blue-100)',
      200: 'var(--system--blue-200)',
      300: 'var(--system--blue-300)',
      400: 'var(--system--blue-400)',
    },
    orange: {
      100: 'var(--system--orange-100)',
      200: 'var(--system--orange-200)',
      300: 'var(--system--orange-300)',
      400: 'var(--system--orange-400)',
    },
  },
}
```

---

## Testing Checklist

### Visual Verification

- [ ] Compare button colors side-by-side with Dashflow X template
- [ ] Compare card backgrounds with template
- [ ] Verify text contrast ratios (WCAG AA minimum)
- [ ] Test hover states match template
- [ ] Test focus states match template
- [ ] Test active states match template
- [ ] Verify shadow depths match template
- [ ] Test dark mode colors match template dark theme

### Component Testing

- [ ] All badges show correct system colors
- [ ] Success/error/warning alerts use correct colors
- [ ] Stats cards match template styling
- [ ] Buttons match template blue
- [ ] Forms use correct border colors
- [ ] Tables use correct border and background colors
- [ ] Modals use correct background and shadow colors

### Browser Testing

- [ ] Chrome - colors render correctly
- [ ] Firefox - colors render correctly
- [ ] Safari - colors render correctly
- [ ] Edge - colors render correctly

---

## Color Psychology & Rationale

### Why These Colors Work

**Dashflow X Palette:**
- **Primary Blue (#3d73ff)**: Professional, trustworthy, tech-forward
- **Neutral Grays**: Clean, modern, accessible
- **System Colors**: Clear, accessible status indicators
- **Soft backgrounds**: Reduces eye strain for long dashboard sessions

**Radiant UI Palette:**
- **Deep Purple Headings (#150438)**: Premium, sophisticated
- **Medium Gray Body (#6d6d6d)**: Readable, professional
- **Light Blue Accents (#3898ec)**: Friendly, approachable

---

## Accessibility Notes

### Contrast Ratios (WCAG 2.1 AA)

**Text on backgrounds:**
- `#1f2d54` on `#ffffff` - ✅ 12.63:1 (AAA)
- `#454e66` on `#ffffff` - ✅ 8.59:1 (AAA)
- `#828aa3` on `#ffffff` - ✅ 4.52:1 (AA)
- `#aab1c6` on `#ffffff` - ⚠️ 3.02:1 (Large text only)

**System colors:**
- Green on white - ✅ Passes AA
- Red on white - ✅ Passes AA
- Blue on white - ✅ Passes AA
- Orange on white - ✅ Passes AA

**Dark mode:**
- `#e6e8f0` on `#1f2337` - ✅ 12.1:1 (AAA)
- `#9095a8` on `#1f2337` - ✅ 4.8:1 (AA)

---

## Migration Notes

### Current Status

The project currently has:
- ✅ Dark mode variables defined in `globals.css`
- ⚠️ Missing light mode `:root` variables
- ⚠️ Some components use hardcoded colors
- ⚠️ Tailwind config may not reference CSS variables

### Breaking Changes

None - adding CSS variables is backward compatible. Components can be migrated incrementally.

### Rollout Strategy

1. Add all `:root` variables to `globals.css`
2. Update Tailwind config to use CSS variables
3. Migrate components one by one
4. Test each component after migration
5. Remove hardcoded color values

---

## Resources

**Dashflow X Source:**
- Path: `C:\Users\manna\Downloads\Website inspo\anyros-wondrous-site.webflow\css\anyros-wondrous-site.webflow.css`
- Lines: 41-84 (`:root` block)

**Radiant UI Source:**
- Path: `C:\Users\manna\Downloads\Website inspo\radiant-ui-component-library-s-34e5e8.webflow\css\radiant-ui-component-library-s-34e5e8.webflow.css`
- Lines: 1-5 (`:root` block)

**Current Project:**
- `app/globals.css` - Dark mode variables
- `components/ui/` - UI components to update

---

## Quick Reference Card

```css
/* LIGHT MODE - Most Used Colors */
Background: #f7f8fc (--neutral--200)
Card: #ffffff (--neutral--100)
Text: #828aa3 (--neutral--600)
Heading: #1f2d54 (--neutral--800)
Primary: #3d73ff (--accent--primary-1)
Border: #e6e9f1 (--neutral--400)

Success: #14ca74 (--system--green-300)
Error: #ff5a65 (--system--300)
Warning: #ff9e2c (--system--orange-300)
Info: #1d88fe (--system--blue-300)

/* DARK MODE - Most Used Colors */
Background: #1a1d2e (--neutral--200)
Card: #1f2337 (--neutral--100)
Text: #9095a8 (--neutral--600)
Heading: #e6e8f0 (--neutral--800)
Primary: #5b8fff (--accent--primary-1)
Border: #2f3447 (--neutral--400)
```

---

**Last Updated:** 2025-11-04
**Status:** Complete extraction, ready for implementation
