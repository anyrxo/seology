---
description: Run comprehensive S-Tier design review on recent UI changes
---

# Design Review: S-Tier SaaS Dashboard Standards

You are conducting a **comprehensive design review** following the S-Tier SaaS Dashboard framework from OneRedOak.

## Context

Review recent UI changes for compliance with:
- [Design Principles](../../context/design-principles.md) - S-Tier standards
- [Style Guide](../../context/style-guide.md) - SEOLOGY.AI brand guidelines

## Your Task

Conduct a **7-phase design review** of the most recent UI changes:

### Phase 0: Preparation

1. **Gather Context**:
   - Run `git diff main` to see what files changed
   - Identify all modified UI components
   - Read the design principles and style guide
   - Note the user story or feature being implemented

2. **Set Scope**:
   - List all components/pages to review
   - Identify critical user flows affected
   - Note any special accessibility requirements

### Phase 1: Interaction & User Flow

Analyze user interactions:

- [ ] **User Journey**: Can users complete their intended task?
- [ ] **Click Targets**: All interactive elements clearly identifiable?
- [ ] **Feedback**: Visual feedback on hover, focus, active states?
- [ ] **Loading States**: Skeleton screens or spinners during data fetch?
- [ ] **Error States**: Clear error messages with recovery actions?
- [ ] **Success States**: Confirmation of successful actions?
- [ ] **Navigation**: Logical flow between screens?
- [ ] **CTAs**: Primary action clear and prominent?

**Scoring**: 0-10 points

### Phase 2: Responsiveness Testing

Test at these breakpoints:

#### Desktop (1440px)
- [ ] Layout optimal and spacious
- [ ] All content visible without scroll (above fold)
- [ ] Proper use of grid/flexbox
- [ ] Images and graphics properly sized

#### Tablet (768px)
- [ ] Layout adapts gracefully
- [ ] Navigation collapses appropriately
- [ ] Content remains readable
- [ ] No awkward line breaks

#### Mobile (375px)
- [ ] Mobile-first design principles followed
- [ ] Touch targets ≥ 44x44px
- [ ] Text ≥ 16px (readable without zoom)
- [ ] Hamburger menu or simplified nav
- [ ] Data tables use card view
- [ ] No horizontal scroll

**Scoring**: 0-15 points (5 per breakpoint)

### Phase 3: Visual Polish

Inspect visual design details:

#### Spacing & Layout
- [ ] **8px Grid System**: All spacing uses 8px multiples (gap-2, gap-4, gap-8)
- [ ] **Alignment**: Elements properly aligned (left/center/right)
- [ ] **Whitespace**: Adequate breathing room around elements
- [ ] **Hierarchy**: Clear visual hierarchy (size, weight, color)

#### Typography
- [ ] **Scale**: Uses design system scale (text-h1, text-h2, text-body)
- [ ] **Line Height**: 1.5+ for body text, 1.2-1.4 for headings
- [ ] **Font Families**: Primary (Inter), Secondary (DM Sans), Mono (Roboto Mono)
- [ ] **Alignment**: Left-aligned text (not center unless intentional)

#### Colors
- [ ] **Design Tokens**: Uses CSS custom properties (--brand-primary-500)
- [ ] **Semantic Colors**: Success/error/warning/info colors correct
- [ ] **Glassmorphism**: Cards use bg-white/5 backdrop-blur-xl
- [ ] **Dark Mode**: Uses #0a0f1f base, not pure black

#### Borders & Shadows
- [ ] **Border Radius**: Consistent (rounded-lg, rounded-xl)
- [ ] **Borders**: rgba(255,255,255,0.1) on dark backgrounds
- [ ] **Shadows**: Subtle, appropriate for elevation

**Scoring**: 0-20 points

### Phase 4: Accessibility (WCAG 2.1 AA)

#### Color Contrast
- [ ] **Text Contrast**: 4.5:1 minimum for normal text
- [ ] **Large Text**: 3:1 minimum for 18px+ text
- [ ] **UI Components**: 3:1 minimum for buttons, borders, icons
- [ ] **Tool**: Use WebAIM Contrast Checker to verify

#### Keyboard Navigation
- [ ] **Tab Order**: Logical tab sequence
- [ ] **Focus Indicators**: Visible 2px outline + 4px shadow
- [ ] **Skip Links**: "Skip to content" link present
- [ ] **No Keyboard Traps**: Can tab out of all components
- [ ] **Enter/Space**: Activate buttons and links

#### Screen Readers
- [ ] **Semantic HTML**: Proper <header>, <nav>, <main>, <button>, <a>
- [ ] **ARIA Labels**: aria-label on icon-only buttons
- [ ] **ARIA Descriptions**: aria-describedby for errors/hints
- [ ] **Form Labels**: Explicit <label for=""> on all inputs
- [ ] **Alt Text**: Meaningful alt text on images (not decorative)
- [ ] **Heading Hierarchy**: H1 → H2 → H3 (no skipping)
- [ ] **Table Headers**: <th scope="col"> in data tables

#### Touch & Input
- [ ] **Touch Targets**: ≥ 44x44px on mobile (.touch-target class)
- [ ] **Input Types**: Correct type="email|tel|number" for mobile keyboards
- [ ] **Autocomplete**: autocomplete attributes on forms

#### Reduced Motion
- [ ] **@media (prefers-reduced-motion: reduce)**: Animations disabled
- [ ] **Essential Motion Only**: Critical animations remain

#### High Contrast
- [ ] **@media (prefers-contrast: high)**: Borders increased to 2px
- [ ] **Focus Indicators**: 3px outlines in high contrast mode

**Scoring**: 0-30 points (most important phase)

### Phase 5: Robustness Testing

Test edge cases:

#### Long Content
- [ ] **Long Names**: User names, site names with 50+ characters
- [ ] **Long Numbers**: Large metrics (e.g., 1,234,567,890)
- [ ] **Long Lists**: 100+ items in tables/lists
- [ ] **Text Overflow**: Proper truncation with ellipsis or wrapping

#### Empty States
- [ ] **No Data**: Clear "No items yet" message with CTA
- [ ] **Loading**: Skeleton screens during initial load
- [ ] **Errors**: Helpful error messages with retry option
- [ ] **Illustration**: Empty state icon/illustration

#### Data Variations
- [ ] **Zero Values**: 0, $0.00, 0% display correctly
- [ ] **Negative Values**: -$500, -23% styled appropriately
- [ ] **Null/Undefined**: Handles missing data gracefully
- [ ] **Decimals**: Proper precision (2 decimals for currency)

#### Internationalization
- [ ] **Long Translations**: Layout doesn't break with German/French
- [ ] **RTL Support**: (future) Right-to-left language support
- [ ] **Date Formats**: Uses locale-aware formatting

**Scoring**: 0-10 points

### Phase 6: Code Health

Review code quality:

#### Component Structure
- [ ] **Reusability**: Component can be reused in other contexts
- [ ] **Props Interface**: Clear TypeScript types defined
- [ ] **Single Responsibility**: Component does one thing well
- [ ] **Composition**: Uses children props for flexibility

#### Performance
- [ ] **Memoization**: React.memo for expensive renders
- [ ] **useMemo**: Memoize expensive calculations
- [ ] **useCallback**: Stable function references
- [ ] **Lazy Loading**: Heavy components lazy loaded
- [ ] **Image Optimization**: Next.js Image component used

#### Maintainability
- [ ] **Comments**: Complex logic explained
- [ ] **Naming**: Clear, descriptive variable/function names
- [ ] **File Organization**: Logical file structure
- [ ] **No Magic Numbers**: Constants defined (not 44, but TOUCH_TARGET_SIZE)

#### Accessibility Code
- [ ] **ARIA Attributes**: Proper aria-* usage
- [ ] **Semantic Elements**: <button> not <div onClick>
- [ ] **Form Structure**: Proper <form>, <label>, <input> association

**Scoring**: 0-10 points

### Phase 7: Content & Console

Final checks:

#### UI Copy
- [ ] **Clear**: Simple, direct language
- [ ] **Concise**: No unnecessary words
- [ ] **Active Voice**: "Fix issues" not "Issues will be fixed"
- [ ] **Helpful**: Explains what will happen
- [ ] **No Jargon**: Technical terms explained or avoided
- [ ] **Consistent**: Same terminology throughout

#### Browser Console
- [ ] **No Errors**: Console clean (no red errors)
- [ ] **No Warnings**: No React warnings (key props, etc.)
- [ ] **No 404s**: All assets load successfully
- [ ] **HTTPS**: No mixed content warnings

#### Metadata
- [ ] **Page Title**: Descriptive <title> tag
- [ ] **Meta Description**: (if public page)
- [ ] **Favicon**: Loads correctly

**Scoring**: 0-5 points

---

## Output Format

Provide your review as a structured report:

```markdown
# Design Review Report: [Feature Name]

**Date**: [YYYY-MM-DD]
**Reviewer**: Claude Code
**Scope**: [List of components/pages reviewed]

## Overall Score: X/100 (Grade)

- **A+ (S-Tier)**: 95-100 - Production ready, industry-leading quality
- **A**: 90-94 - Excellent, minor polish needed
- **B**: 80-89 - Good, some improvements recommended
- **C**: 70-79 - Acceptable, notable issues to address
- **D**: 60-69 - Needs work, multiple issues
- **F**: <60 - Not acceptable, major issues

---

## Phase Scores

| Phase | Score | Max | Percentage |
|-------|-------|-----|------------|
| 0. Preparation | - | - | Setup |
| 1. Interaction & User Flow | X | 10 | X% |
| 2. Responsiveness | X | 15 | X% |
| 3. Visual Polish | X | 20 | X% |
| 4. Accessibility | X | 30 | X% |
| 5. Robustness | X | 10 | X% |
| 6. Code Health | X | 10 | X% |
| 7. Content & Console | X | 5 | X% |
| **Total** | **X** | **100** | **X%** |

---

## Critical Issues 🔴

[List of critical issues that MUST be fixed before merge]

1. **[Issue Title]** (Phase X)
   - **Problem**: [Description]
   - **Impact**: [Why this matters]
   - **Fix**: [Specific code or approach to fix]
   - **Location**: [file.tsx:123]

---

## High Priority Issues 🟡

[Important issues that should be fixed soon]

1. **[Issue Title]** (Phase X)
   - **Problem**: [Description]
   - **Fix**: [Solution]

---

## Medium Priority Issues 🟢

[Nice-to-have improvements]

1. **[Issue Title]** (Phase X)
   - **Suggestion**: [Improvement]

---

## Strengths ✅

[Things done exceptionally well]

- [Strength 1]
- [Strength 2]

---

## Recommendations

### Immediate Actions
1. [Fix critical issue 1]
2. [Fix critical issue 2]

### Before Merge
1. [Address high priority issues]
2. [Run accessibility audit]

### Future Improvements
1. [Medium priority enhancements]
2. [Performance optimizations]

---

## Design Principles Adherence

- ✅ User-Centric Design: [Pass/Fail with explanation]
- ✅ Craftsmanship: [Pass/Fail]
- ✅ Performance: [Pass/Fail]
- ✅ Simplicity: [Pass/Fail]
- ✅ Efficiency: [Pass/Fail]
- ✅ Consistency: [Pass/Fail]
- ✅ Accessibility: [Pass/Fail]
- ✅ Thoughtful Defaults: [Pass/Fail]

---

## Next Steps

1. [ ] Address all critical issues
2. [ ] Fix high priority issues
3. [ ] Re-run design review
4. [ ] Update visual regression tests (if applicable)
5. [ ] Get stakeholder approval
6. [ ] Merge to main

---

**Review completed by Claude Code using S-Tier SaaS Dashboard framework**
```

---

## Execution Steps

1. **Read design documentation**:
   - context/design-principles.md
   - context/style-guide.md

2. **Identify changes**:
   ```bash
   git diff main --name-only | grep -E '\.(tsx|jsx|css)$'
   ```

3. **Read changed files**:
   - Use Read tool on each UI component
   - Focus on components, pages, styles

4. **Analyze each phase** systematically:
   - Use the checklists above
   - Score each phase honestly
   - Provide specific examples and line numbers

5. **Generate report**:
   - Use the markdown template above
   - Be specific with file paths and line numbers
   - Prioritize issues by severity

6. **Save report** (optional):
   - Create `DESIGN_REVIEW_[DATE].md` in project root
   - Useful for tracking improvements over time

---

## Important Notes

- **Be thorough but efficient**: Don't spend time on unchanged code
- **Be specific**: "Line 45 in Button.tsx" not "the button component"
- **Be actionable**: Provide exact fixes, not vague suggestions
- **Be fair**: Acknowledge what's done well, not just problems
- **Reference standards**: Quote specific design principle when relevant
- **Use tools**: WebAIM Contrast Checker, WAVE, axe DevTools
- **Test in browser**: If possible, view the actual rendered output

---

## Success Criteria

A successful design review:
- ✅ Covers all 7 phases
- ✅ Provides specific, actionable feedback
- ✅ Includes file paths and line numbers
- ✅ Assigns accurate severity levels
- ✅ References design principles
- ✅ Gives an honest overall grade
- ✅ Helps developer improve quickly

---

**Begin the review now!**
