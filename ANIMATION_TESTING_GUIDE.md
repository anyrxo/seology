# Craflow Animation Testing Guide

Quick reference for testing all restored animations on SEOLOGY.AI.

---

## Quick Test (5 minutes)

1. **Open index.html in browser**
2. **Open DevTools (F12) → Console tab**
3. **Look for these messages:**
   ```
   🎬 Initializing Craflow Animation System v2...
   🖼️  Initializing X frame image animations
   🔗 Initializing X nav link animations
   🔗 Initializing X link button animations
   📋 Initializing X service card animations
   👀 Initializing scroll reveal animations...
   ✅ Craflow Animation System v2 fully initialized!
   ```

4. **Visual checks:**
   - ✅ Header images fade in smoothly on load
   - ✅ Hover over nav links shows slide-up effect
   - ✅ Sections fade in as you scroll down
   - ✅ Back to top button appears after scrolling

---

## Detailed Test Checklist

### 1. Page Load Animations
**Test:** Refresh the page (Ctrl+R)

| Element | Expected Behavior | Status |
|---------|------------------|--------|
| Frame Images | Fade in from opacity 0 to 1 | ⬜ |
| Frame Images | Staggered timing (100ms between each) | ⬜ |
| Header Content | Appears without delay | ⬜ |
| No Console Errors | Check DevTools console | ⬜ |

---

### 2. Navigation Animations
**Test:** Hover over navigation links in header

| Action | Expected Behavior | Status |
|--------|------------------|--------|
| Hover "Home" | Text slides up, reveals hover state | ⬜ |
| Hover "About" | Same slide-up effect | ⬜ |
| Hover "Projects" | Same slide-up effect | ⬜ |
| Hover "Contact" | Same slide-up effect | ⬜ |
| Smooth Transition | No jank or stuttering | ⬜ |

---

### 3. Scroll Parallax
**Test:** Scroll up and down the page

| Element | Expected Behavior | Status |
|---------|------------------|--------|
| Frame Images | Move at different speeds | ⬜ |
| Slower than page | Creates depth effect | ⬜ |
| Smooth Motion | 60fps, no jank | ⬜ |

---

### 4. Scroll Reveal
**Test:** Scroll through entire page

| Element Type | Expected Behavior | Status |
|--------------|------------------|--------|
| Sections | Fade in + slide up 40px | ⬜ |
| Pricing Cards | Same reveal effect | ⬜ |
| Feature Cards | Same reveal effect | ⬜ |
| Trigger Point | ~100px before element visible | ⬜ |
| Only Triggers Once | Doesn't re-animate on scroll up | ⬜ |

---

### 5. Button Hover Animations
**Test:** Hover over links and buttons in footer

| Element | Expected Behavior | Status |
|---------|------------------|--------|
| Footer Links | Text slides up on hover | ⬜ |
| CTA Buttons | (If present) Similar effect | ⬜ |
| Smooth Transition | 0.3s ease | ⬜ |

---

### 6. Service Card Accordions
**Test:** Hover over service cards (if present on page)

| Action | Expected Behavior | Status |
|--------|------------------|--------|
| Hover on Card | Description expands (height: 0 → auto) | ⬜ |
| Leave Card | Description collapses back to 0 | ⬜ |
| Smooth Animation | 0.4s ease transition | ⬜ |

---

### 7. Back to Top Button
**Test:** Scroll behavior

| Action | Expected Behavior | Status |
|--------|------------------|--------|
| Page Load | Button hidden | ⬜ |
| Scroll 500px+ | Button fades in | ⬜ |
| Scroll Back Up | Button fades out | ⬜ |
| Click Button | Smooth scroll to top | ⬜ |

---

### 8. Smooth Scroll
**Test:** Click anchor links (like navigation or "Learn More")

| Action | Expected Behavior | Status |
|--------|------------------|--------|
| Click Anchor Link | Smooth animated scroll | ⬜ |
| Not Instant | Should take ~0.5s | ⬜ |
| Correct Position | Lands at target element | ⬜ |

---

## Browser Testing Matrix

Test on multiple browsers:

| Browser | Version | Page Load | Hover | Scroll | Status |
|---------|---------|-----------|-------|--------|--------|
| Chrome | Latest | ⬜ | ⬜ | ⬜ | ⬜ |
| Firefox | Latest | ⬜ | ⬜ | ⬜ | ⬜ |
| Safari | Latest | ⬜ | ⬜ | ⬜ | ⬜ |
| Edge | Latest | ⬜ | ⬜ | ⬜ | ⬜ |

---

## Performance Testing

### Check FPS (Frames Per Second)

**Chrome DevTools:**
1. Open DevTools (F12)
2. Go to "Rendering" tab (⋮ menu → More tools → Rendering)
3. Enable "Frame Rendering Stats"
4. Scroll the page
5. **Expected:** 60fps steady, no drops below 50fps

### Check Memory Usage

**Chrome DevTools:**
1. Open DevTools (F12)
2. Go to "Performance" tab
3. Record while scrolling for 10 seconds
4. Stop recording
5. **Expected:** No memory leaks, steady memory usage

### Lighthouse Score

**Run Lighthouse:**
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance" + "Desktop"
4. Click "Analyze page load"
5. **Expected:** Score 85+ (animations may reduce score slightly)

---

## Console Messages Reference

### Normal Output (Success)
```
🎬 Initializing Craflow Animation System v2...
🚀 Starting animation system initialization...
🖼️  Initializing 6 frame image animations
🔗 Initializing 4 nav link animations
🔗 Initializing 12 link button animations
📋 Initializing 5 service card animations
👀 Initializing scroll reveal animations...
✅ Observing 15 elements for scroll reveal
✅ Webflow IX2 initialized
✅ Craflow Animation System v2 fully initialized!
```

### Informational Messages (OK)
```
ℹ️  No frame images found
(This is OK for pages without frame images)
```

### Error Messages (Fix Required)
```
❌ Error: Cannot read property 'style' of null
(Missing element - check HTML structure)

❌ TypeError: observer is not defined
(Browser compatibility issue)
```

---

## Common Issues & Fixes

### Issue: No animations working at all

**Possible Causes:**
- JavaScript file not loaded
- Console errors blocking execution
- Browser compatibility

**Fix:**
1. Check console for errors
2. Hard refresh (Ctrl+Shift+R)
3. Try different browser
4. Check if webflow.js is loaded

---

### Issue: Frame images not animating

**Possible Causes:**
- No `.frame-image` elements on page
- Inline styles missing
- CSS conflicts

**Fix:**
1. Check if page has frame images
2. Verify inline styles are present
3. Check CSS for `!important` overrides

---

### Issue: Scroll reveal not triggering

**Possible Causes:**
- Elements don't match selectors
- IntersectionObserver not supported
- Threshold too high

**Fix:**
1. Check element class names
2. Test in modern browser
3. Adjust rootMargin in script

---

### Issue: Animations feel janky/laggy

**Possible Causes:**
- Low-end device
- Other scripts blocking
- Too many observers

**Fix:**
1. Close other tabs
2. Disable browser extensions
3. Check Performance tab in DevTools

---

## Testing Other Pages

Test the same animations on:

- ✅ `about.html`
- ✅ `pricing.html`
- ✅ `contact.html`
- ✅ `projects.html`
- ✅ All 24 updated pages

**Note:** Some pages may not have all animation elements (e.g., frame images only on homepage).

---

## Mobile Testing

### Responsive Behavior

**Test on:**
- Phone (< 768px)
- Tablet (768px - 991px)
- Desktop (992px+)

**Expected:**
- Frame animations may be disabled on mobile (performance)
- Hover effects become tap effects
- Scroll reveal still works
- Smooth scroll still works

**Test Tools:**
- Chrome DevTools Device Toolbar (Ctrl+Shift+M)
- Real devices if available

---

## Automated Testing (Optional)

### Cypress Test Example
```javascript
describe('Craflow Animations', () => {
  it('should initialize animation system', () => {
    cy.visit('/index.html')
    cy.window().then((win) => {
      cy.get('body').should('have.class', 'craflow-animations-ready')
    })
  })

  it('should reveal sections on scroll', () => {
    cy.visit('/index.html')
    cy.scrollTo(0, 500)
    cy.get('section').first().should('have.css', 'opacity', '1')
  })
})
```

---

## Sign-Off Checklist

Before considering testing complete:

- [ ] All 8 animation types tested
- [ ] Tested on 3+ browsers
- [ ] No console errors
- [ ] Performance acceptable (60fps)
- [ ] Mobile responsive
- [ ] All 24 pages spot-checked
- [ ] Back to top button works
- [ ] Smooth scroll works
- [ ] Parallax smooth on scroll

**Tester Name:** _________________
**Date:** _________________
**Status:** ⬜ Pass ⬜ Fail ⬜ Partial

---

## Quick Commands

```bash
# Re-run restoration script
cd "c:\Users\manna\Downloads\iimagined.webflow (1)"
node restore-craflow-animations-v2.js

# Restore from backup
cp public/_animation_backup_v2/*.html public/

# Check file sizes
ls -lh public/*.html

# Search for animation script in files
grep -l "Craflow Animation System v2" public/*.html
```

---

## Report Issues

If you find bugs or issues:

1. **Document the issue:**
   - What page?
   - What browser?
   - What's the expected vs actual behavior?
   - Screenshot of console errors

2. **Check backups:**
   - Try restoring from backup
   - See if issue persists

3. **Debug:**
   - Open DevTools console
   - Look for error messages
   - Check Network tab for failed resources

---

**Testing Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Last Updated:** November 2, 2025
