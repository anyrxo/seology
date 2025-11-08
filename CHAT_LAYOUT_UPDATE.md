# Shopify Chat Layout Update

**Date**: Current Session
**Status**: COMPLETE ✅

---

## Changes Made

### 1. Chat Layout Adjusted to 75/25 Split

**Previous**: 50% Store Overview / 50% Chat
**New**: 75% Store Overview / 25% Chat

**Files Modified**:
- `app/shopify/chat/page.tsx`
  - Line 194: Changed left panel from `w-1/2` to `w-3/4`
  - Line 291: Changed right panel from `w-1/2` to `w-1/4`

**Result**: Store overview now takes up most of the screen, with chat as a compact sidebar on the right.

---

### 2. Quick Actions Moved Under Chat Input

**Previous**: Quick actions were on the left (dashboard) side
**New**: Quick actions are under the chat input on the right side

**Files Modified**:
- `app/shopify/chat/page.tsx`
  - Lines 245-278: Removed quick actions from left panel
  - Lines 373-404: Added quick actions under chat input in right panel

**Quick Actions Included**:
- 🔍 Analyze Products
- 🔧 Fix Store Issues
- 📄 Audit Content

**Styling**: Compact buttons with smaller text (text-xs) and reduced padding (p-2) to fit in the narrower chat panel.

---

### 3. Execution Mode Switching Implemented

**Previous**: Execution mode was read-only, showed "Loading..."
**New**: Clickable execution mode with modal to switch between modes

**Features Added**:
1. **Clickable Execution Mode Card** (Lines 216-240)
   - Shows current mode with colored indicator
   - Has dropdown chevron icon
   - Hover effect (border changes to blue)

2. **Mode Selection Modal** (Lines 408-472)
   - Full-screen overlay with backdrop blur
   - Three mode options:
     - AUTOMATIC (green) - Auto-apply fixes
     - PLAN (blue) - Batch approval
     - APPROVE (yellow) - Individual approval
   - Shows current selection with highlighted border
   - Each option has description

3. **Mode Change Function** (Lines 154-181)
   - Calls `/api/shopify/execution-mode` endpoint
   - Updates local state on success
   - Shows system message in chat confirming change
   - Closes modal automatically

**User Flow**:
1. User clicks on execution mode card
2. Modal opens with three options
3. User selects desired mode
4. API call updates database
5. UI updates to show new mode
6. System message appears in chat

---

### 4. Dashboard Data Loading Fixed

**Previous**: Dashboard showed "Loading..." and "0" for all stats
**New**: Dashboard properly maps API response to expected data format

**Files Modified**:
- `app/shopify/dashboard/page.tsx`
  - Lines 48-94: Updated `fetchDashboardData()` function
  - Maps `data.data` fields to `DashboardStats` interface
  - Handles missing fields with defaults
  - Added error logging for failed requests

**API Response Mapping**:
```typescript
{
  productCount: data.data.productCount || 0,
  issueCount: data.data.issueCount || 0,
  fixesApplied: 0, // TODO: Add to API
  executionMode: data.data.executionMode || 'PLAN',
  planName: data.data.planName || 'GROWTH',
  usageStats: {
    fixesUsed: data.data.credits?.used || 0,
    fixesLimit: data.data.credits?.limit || 5000,
    aiCreditsUsed: 0, // TODO: Add tracking
    aiCreditsLimit: 100,
  }
}
```

---

## Visual Result

### Chat Interface Layout

```
┌─────────────────────────────────────────────────────────┬───────────────┐
│                                                         │               │
│  STORE OVERVIEW (75%)                                   │  CHAT (25%)   │
│                                                         │               │
│  ┌─────────────────────────────────────────────────┐   │  ┌─────────┐  │
│  │ Execution Mode: PLAN                            │   │  │ Avatar  │  │
│  │ (Click to change)                               │   │  │         │  │
│  └─────────────────────────────────────────────────┘   │  └─────────┘  │
│                                                         │               │
│  ┌──────────────┬──────────────┐                       │  Messages...  │
│  │  Products    │ Active Issues│                       │               │
│  │     20       │      5       │                       │               │
│  └──────────────┴──────────────┘                       │               │
│                                                         │  ┌─────────┐  │
│  ┌─────────────────────────────────────────────────┐   │  │ Input   │  │
│  │ AI Credits                                      │   │  └─────────┘  │
│  │ [████████░░] 80/100                             │   │               │
│  └─────────────────────────────────────────────────┘   │  Quick Actions│
│                                                         │  🔍 Analyze   │
│  ┌─────────────────────────────────────────────────┐   │  🔧 Fix       │
│  │ Current Plan: GROWTH                            │   │  📄 Audit     │
│  └─────────────────────────────────────────────────┘   │               │
└─────────────────────────────────────────────────────────┴───────────────┘
```

### Execution Mode Modal

When user clicks on execution mode:

```
                    ┌─────────────────────────────────┐
                    │ Change Execution Mode      [X]  │
                    ├─────────────────────────────────┤
                    │                                 │
                    │ ┌───────────────────────────┐   │
                    │ │ ● AUTOMATIC               │   │
                    │ │ Fixes applied automatically│   │
                    │ └───────────────────────────┘   │
                    │                                 │
                    │ ┌───────────────────────────┐   │
                    │ │ ● PLAN (selected)         │   │ ← Highlighted
                    │ │ Batch approval required   │   │
                    │ └───────────────────────────┘   │
                    │                                 │
                    │ ┌───────────────────────────┐   │
                    │ │ ● APPROVE                 │   │
                    │ │ Individual approval req.  │   │
                    │ └───────────────────────────┘   │
                    │                                 │
                    └─────────────────────────────────┘
```

---

## Technical Details

### State Management

Added new state variable:
```typescript
const [showModeModal, setShowModeModal] = useState(false)
```

### API Integration

Calls `/api/shopify/execution-mode` endpoint:
```typescript
POST /api/shopify/execution-mode
Body: { shop: string, mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE' }
```

### UI Components

**Colors**:
- AUTOMATIC: Green (`bg-green-500`, `border-green-500`)
- PLAN: Blue (`bg-blue-500`, `border-blue-500`)
- APPROVE: Yellow (`bg-yellow-500`, `border-yellow-500`)

**Atlas Theme**:
- Background: `#191A1B`
- Cards: `#262A2B`
- Borders: `gray-700`
- Gradient: `blue-600` to `purple-600`

---

## Testing Checklist

- [x] TypeScript compilation passes (0 errors)
- [ ] Chat layout is 75/25 split
- [ ] Quick actions appear under chat input
- [ ] Quick actions populate input on click
- [ ] Execution mode card is clickable
- [ ] Modal opens when clicking execution mode
- [ ] Can select different modes
- [ ] API call updates mode in database
- [ ] UI updates after mode change
- [ ] System message appears in chat
- [ ] Dashboard loads data properly
- [ ] No console errors

---

## Outstanding TODOs

1. **Add Fixes Applied Count** to context API
   - Currently hardcoded to 0 in dashboard
   - Need to query Fix table for applied fixes count

2. **Add AI Credits Tracking**
   - Currently hardcoded to 0/100
   - Need separate tracking for AI API usage vs fix usage

3. **Replace Mock Activity Data**
   - Dashboard shows hardcoded recent activity
   - Need to query actual audit/fix history

4. **Test with Real Shopify Store**
   - Context API needs real connection to load data
   - Currently will show 0s if no connection exists

---

## Files Modified Summary

1. `app/shopify/chat/page.tsx` - Chat layout, quick actions, execution mode switching
2. `app/shopify/dashboard/page.tsx` - Data mapping fix

**Total Lines Changed**: ~150 lines
**New Features**: Execution mode switching modal
**Bug Fixes**: Dashboard data loading
**UI Improvements**: 75/25 layout, relocated quick actions

---

## Next Steps

1. Create Shopify development store
2. Test OAuth connection flow
3. Run end-to-end test:
   - Connect store
   - Verify dashboard loads real data
   - Test execution mode switching
   - Test chat commands
   - Verify quick actions work

**Estimated Time**: 2-3 hours for testing and bug fixes
