# SEOLOGY Chat Commands - Complete Guide

## Overview

The SEOLOGY chat interface now includes **intelligent command detection** that triggers real SEO actions, not just conversations. When users type specific commands, the chat API detects the intent and executes the appropriate audit or fix operation automatically.

## How It Works

### Architecture

```
User types "analyze my products"
        ↓
Chat API receives message
        ↓
Intent detection (regex patterns)
        ↓
Command detected: ANALYZE - products
        ↓
Internal API call to /api/shopify/analyze-and-fix
        ↓
Audit runs, fixes created
        ↓
Results formatted as chat response
        ↓
User sees: "I found 15 issues across 20 products..."
```

### Code Flow

**File**: `app/api/shopify/chat/route.ts`

1. **Intent Detection**:
   - User's last message is checked against regex patterns
   - Patterns detect: ANALYZE (audit) vs FIX (apply) intents
   - Scope detection: products, content, or full store

2. **Command Execution**:
   - Calls `/api/shopify/analyze-and-fix` internally
   - Passes detected scope and limits
   - Waits for results

3. **Response Formatting**:
   - Includes Claude AI summary from audit
   - Shows resource count, issues found, fixes created
   - Provides mode-specific next steps (AUTOMATIC/PLAN/APPROVE)

4. **Fallback**:
   - If no command detected → normal conversational AI
   - If command fails → error message with fallback to conversation

---

## Supported Commands

### 🔍 Analyze/Audit Commands

**Analyze Products:**
```
"analyze my products"
"audit my products"
"check my products"
"scan my products"
```
**Result**: Audits up to 20 products for SEO issues

**Analyze Content:**
```
"analyze my content"
"audit my content"
"check my pages"
"analyze my pages"
```
**Result**: Audits pages, blog posts, and collections

**Analyze Full Store:**
```
"analyze my store"
"audit my store"
"check my store"
"scan my store"
"full audit"
"complete audit"
```
**Result**: Comprehensive audit of products (50), pages (10), collections (10)

---

### 🔧 Fix/Optimize Commands

**Fix Products:**
```
"fix my products"
"optimize my products"
"improve my products"
```
**Result**: Runs audit + creates fixes for products

**Fix Entire Store:**
```
"fix my store"
"optimize my store"
"improve my store"
"fix everything"
"fix all"
```
**Result**: Runs full audit + creates fixes for all resources

---

## Response Format

### Example Response (PLAN Mode)

**User**: "analyze my products"

**SEOLOGY**:
```
I found 15 SEO issues across your products. Most issues involve missing
meta descriptions and image alt text that could improve your search visibility.

**Results:**
- Analyzed 20 resources
- Found 15 SEO issues
- Created 15 fixes

📋 **Fix Plan Created**
I've created a plan with 15 fixes. You can review and approve all fixes at once.

**Next Steps:**
Say "show me the plan" or "apply the plan" to proceed.
```

### Example Response (AUTOMATIC Mode)

**User**: "fix my store"

**SEOLOGY**:
```
I analyzed your store and found 42 SEO issues that needed attention.
I've now optimized your meta tags, image alt text, and other elements.

**Results:**
- Analyzed 50 resources
- Found 42 SEO issues
- Created 42 fixes

✅ **Fixes Applied Automatically**
All 42 fixes have been applied to your store immediately.
```

### Example Response (APPROVE Mode)

**User**: "analyze my content"

**SEOLOGY**:
```
I reviewed your content and found 8 SEO opportunities across your pages
and collections. These fixes will help improve your search rankings.

**Results:**
- Analyzed 20 resources
- Found 8 SEO issues
- Created 8 fixes

⏸️ **Fixes Pending Approval**
8 fixes are waiting for your approval. Each fix needs individual approval
before being applied.

**Next Steps:**
Say "show fixes" or "approve fixes" to review them.
```

---

## Intent Detection Logic

### Regex Patterns

```typescript
const INTENT_PATTERNS = {
  ANALYZE_PRODUCTS: [
    /analyze\s+(my\s+)?products?/i,
    /audit\s+(my\s+)?products?/i,
    /check\s+(my\s+)?products?/i,
    /scan\s+(my\s+)?products?/i,
  ],
  ANALYZE_CONTENT: [
    /analyze\s+(my\s+)?content/i,
    /audit\s+(my\s+)?content/i,
    /check\s+(my\s+)?pages?/i,
    /analyze\s+(my\s+)?pages?/i,
  ],
  ANALYZE_FULL: [
    /analyze\s+(my\s+)?store/i,
    /audit\s+(my\s+)?store/i,
    /check\s+(my\s+)?store/i,
    /scan\s+(my\s+)?store/i,
    /full\s+audit/i,
    /complete\s+audit/i,
  ],
  FIX_PRODUCTS: [
    /fix\s+(my\s+)?products?/i,
    /optimize\s+(my\s+)?products?/i,
    /improve\s+(my\s+)?products?/i,
  ],
  FIX_STORE: [
    /fix\s+(my\s+)?store/i,
    /optimize\s+(my\s+)?store/i,
    /improve\s+(my\s+)?store/i,
    /fix\s+everything/i,
    /fix\s+all/i,
  ],
}
```

### Detection Order

1. **ANALYZE_PRODUCTS** - Highest priority for product-specific queries
2. **ANALYZE_CONTENT** - Pages and collections
3. **ANALYZE_FULL** - Full store audit
4. **FIX_PRODUCTS** - Product fixes
5. **FIX_STORE** - Full store fixes
6. **No match** → Fallback to conversational AI

---

## Execution Modes Impact

The chat response adapts based on the user's execution mode:

### AUTOMATIC Mode
- ✅ Fixes are applied immediately without approval
- Chat response confirms all fixes were applied
- User sees immediate changes in Shopify

### PLAN Mode
- 📋 Fixes are grouped into a plan
- User must approve the entire plan at once
- Chat suggests: "say 'apply the plan' to proceed"

### APPROVE Mode
- ⏸️ Each fix requires individual approval
- Fixes remain pending until approved one by one
- Chat suggests: "say 'show fixes' to review them"

---

## API Integration

### Internal API Call

When a command is detected, the chat API calls:

```typescript
const analyzeResponse = await fetch(
  `${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/analyze-and-fix`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-shopify-shop-domain': shop,
    },
    body: JSON.stringify({
      options: {
        scope: detectedIntent.scope,  // 'products', 'content', or 'full'
        limit: detectedIntent.scope === 'full' ? 50 : 20,
      },
    }),
  }
)
```

### Response Structure

```typescript
{
  success: true,
  data: {
    message: "Formatted response with results...",
    action: {
      type: "ANALYZE" | "FIX",
      scope: "products" | "content" | "full",
      issuesFound: 15,
      fixesCreated: 15,
      planId: "uuid",  // if PLAN mode
      executionMode: "PLAN" | "AUTOMATIC" | "APPROVE"
    }
  }
}
```

---

## Usage Limits

Commands respect the user's monthly fix limits:

- **STARTER**: 500 fixes/month
- **GROWTH**: 5,000 fixes/month
- **SCALE**: Unlimited

If the user hits their limit:
```
I tried to fix your products, but you've reached your monthly limit.
You've used 500 of 500 fixes this month. Please upgrade your plan
or wait until next month.
```

---

## Error Handling

### Command Execution Fails

If the analyze-and-fix API returns an error:
```
I tried to analyze your store, but encountered an error:

Monthly fix limit reached. You've used 450 of 500 fixes this month.

Please try again or contact support if the issue persists.
```

### Fallback to Conversation

If command detection throws an exception:
- Error is logged to console
- Falls through to conversational AI
- User gets a helpful conversational response instead

---

## Testing Commands

### Test in Development

1. Complete Shopify onboarding
2. Enable chat feature in onboarding
3. Navigate to chat interface
4. Type any supported command

**Example Test Sequence**:
```
User: "analyze my products"
→ Should trigger audit, show results

User: "fix my store"
→ Should run full audit, create fixes

User: "What is SEO?"
→ Should fall back to conversational AI
```

### Console Logs

Look for these logs in development:
```
[Chat] Detected intent: ANALYZE - products
[Chat] Command execution error: ...
```

---

## Future Enhancements

### Planned Commands

1. **Show Plan**: "show me the plan", "view plan"
2. **Apply Plan**: "apply the plan", "approve plan"
3. **Show Fixes**: "show fixes", "list pending fixes"
4. **Approve Fix**: "approve fix #1", "apply first fix"
5. **Usage Status**: "how many fixes left?", "my usage"

### Enhanced Intent Detection

- Use Claude AI for more natural intent detection
- Support multi-turn conversations ("yes, apply them all")
- Context-aware follow-ups

### Visual Feedback

- Show progress indicators during audit
- Display fix details in chat UI
- Add interactive approve/reject buttons

---

## Code Reference

**Main File**: [app/api/shopify/chat/route.ts](app/api/shopify/chat/route.ts)

**Key Functions**:
- `detectIntent(message: string)` - Lines 62-85
- Command execution logic - Lines 135-221
- Response formatting - Lines 165-188

**Related Files**:
- [app/api/shopify/analyze-and-fix/route.ts](app/api/shopify/analyze-and-fix/route.ts) - Audit + fix creation
- [lib/shopify-fix-engine.ts](lib/shopify-fix-engine.ts) - Fix generation and application
- [lib/usage-enforcement.ts](lib/usage-enforcement.ts) - Usage limits

---

## Conclusion

✅ **Chat commands are now fully functional**

The chat interface can:
- Detect user intents from natural language
- Trigger real SEO audits
- Create and apply fixes
- Respect execution modes
- Enforce usage limits
- Provide actionable next steps

**Ready for testing with real Shopify stores!**
