# Enhanced AI Chat with Execution Mode Switching

## Overview
The Shopify AI Chat now features seamless execution mode switching that allows users to change between AUTOMATIC, PLAN, and APPROVE modes directly from the chat interface. The chat is fully context-aware, displaying real-time store information and adapting Claude AI's responses based on the active execution mode.

## Features Implemented

### 1. **Execution Mode Switcher UI** ([components/shopify/ShopifyChat.tsx](components/shopify/ShopifyChat.tsx))

#### Visual Mode Selector
- Three prominent buttons: ⚡ Auto, 📋 Plan, ✓ Approve
- Color-coded buttons:
  - 🟢 **Auto (Green)**: Instant fixes without approval
  - 🟡 **Plan (Yellow)**: Batch approval workflow
  - 🔵 **Approve (Blue)**: Individual fix approval
- Active mode is highlighted with a ring and shadow effect
- Tooltips explain each mode on hover
- Disabled state while mode is changing

#### Store Context Display
- Shows product count and active issue count
- Displays current execution mode
- Shows AI credit usage: `X/Y credits` with color coding
  - Green: Healthy (>30 credits)
  - Yellow: Low (10-30 credits)
  - Red: Critical (<10 credits)

### 2. **Real-Time Mode Switching**

#### Client-Side Logic
```typescript
const changeExecutionMode = async (newMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE') => {
  // Updates user's execution mode via API
  // Shows confirmation message in chat
  // Updates UI state immediately
}
```

#### Mode Descriptions
- **AUTOMATIC**: "All SEO fixes will be applied instantly without approval"
- **PLAN**: "Fixes will be grouped into plans for batch approval"
- **APPROVE**: "Each fix will require individual approval before being applied"

### 3. **API Endpoints**

#### Store Context API
**Endpoint**: `GET /api/shopify/context?shop={shop}`

Returns:
```json
{
  "success": true,
  "data": {
    "executionMode": "PLAN",
    "productCount": 150,
    "issueCount": 23,
    "planName": "GROWTH",
    "credits": {
      "used": 45,
      "limit": 500,
      "remaining": 455
    }
  }
}
```

#### Execution Mode Change API
**Endpoint**: `POST /api/shopify/execution-mode`

Request Body:
```json
{
  "shop": "mystore.myshopify.com",
  "executionMode": "AUTOMATIC"
}
```

Features:
- Validates execution mode
- Updates user preferences in database
- Creates audit log entry
- Returns success confirmation

### 4. **Enhanced Claude AI Context** ([app/api/shopify/chat/route.ts](app/api/shopify/chat/route.ts))

Claude now receives comprehensive store context:

```
Store Context:
- Shop: mystore.myshopify.com
- Products: 150 products in store
- Execution Mode: PLAN (Fixes are grouped into plans for batch approval)
- Recent Issues Found: 23 active issues
- Recent Fixes Applied: 5 fixes

Active Issues:
- Missing meta title on Product A (CRITICAL)
- Short meta description on Product B (HIGH)
...

Recent Fixes:
- Updated meta title for Product C (12/15/2024)
- Added alt text to 3 images (12/14/2024)
...
```

This allows Claude to:
- Provide mode-specific advice
- Reference actual store data
- Suggest fixes appropriate to the current mode
- Answer questions about execution workflows

### 5. **Credit System Integration** ([lib/credits.ts](lib/credits.ts))

The chat is fully integrated with the AI credit system:

**Helper Functions**:
- `getRemainingCredits(userId)` - Get current credit status
- `consumeCredit(userId)` - Track chat message usage
- `hasAvailableCredits(userId)` - Check before API call
- `getCreditStatus(userId)` - Get detailed status with health indicator

**Credit Limits by Plan**:
- STARTER: 100 messages/month
- GROWTH: 500 messages/month
- SCALE: 2000 messages/month

**Features**:
- Real-time credit display in chat header
- Automatic credit deduction on each message
- Error handling for insufficient credits
- Credit status returned in API responses

## User Flow

### Opening the Chat
1. User clicks the floating chat button (bottom-right sparkle icon)
2. Chat opens and automatically fetches store context
3. Execution mode switcher displays with current mode highlighted
4. Credit balance is shown in header
5. Product count and issue count displayed

### Changing Execution Mode
1. User clicks desired mode button (Auto/Plan/Approve)
2. Button shows loading state
3. API updates user's execution mode in database
4. Success message appears in chat
5. Mode description is shown
6. UI updates to reflect new mode

### Chatting with Claude
1. User types message about SEO
2. Claude receives full store context including:
   - Current execution mode
   - Product count
   - Active issues
   - Recent fixes
3. Claude provides relevant, context-aware advice
4. Credit count decrements by 1
5. Updated credit balance shown in header

### Mode-Specific Behavior
Claude's responses adapt based on execution mode:

- **AUTOMATIC Mode**:
  - "Your store is in AUTOMATIC mode, so all recommended fixes will be applied instantly."
  - Emphasizes speed and automation

- **PLAN Mode**:
  - "I'll help you create a fix plan. You can review and approve all fixes at once."
  - Focuses on batch operations

- **APPROVE Mode**:
  - "Each fix will require your individual approval before being applied."
  - Provides detailed explanations for each recommendation

## Technical Architecture

### Component Structure
```
ShopifyChat (components/shopify/ShopifyChat.tsx)
├── Header
│   ├── AI Badge
│   ├── Credit Display
│   └── Close Button
├── Execution Mode Switcher
│   ├── Auto Button
│   ├── Plan Button
│   └── Approve Button
├── Messages Area
│   ├── User Messages
│   ├── Assistant Messages
│   └── System Messages (mode changes)
└── Input Area
    ├── Textarea
    └── Send Button
```

### State Management
```typescript
interface StoreContext {
  executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  productCount: number
  issueCount: number
  planName: string
}

interface CreditInfo {
  used: number
  limit: number
  remaining: number
}
```

### API Integration Flow
```
User Action → Chat Component
    ↓
API Request → Server Route
    ↓
Database Update → Prisma
    ↓
Response ← Server
    ↓
UI Update ← Component
    ↓
Confirmation Message in Chat
```

## Benefits

### For Users
1. **Seamless Mode Switching**: Change execution preferences without leaving the chat
2. **Context-Aware AI**: Claude knows exactly how your store is configured
3. **Real-Time Feedback**: Instant confirmation when mode changes
4. **Credit Transparency**: Always see remaining AI credits
5. **Store Overview**: Quick glance at product and issue counts

### For Development
1. **Reusable Components**: Execution mode switcher can be used elsewhere
2. **Type-Safe API**: Full TypeScript coverage
3. **Audit Trail**: All mode changes logged
4. **Scalable Architecture**: Easy to add new modes or features
5. **Credit System**: Reusable helpers for other AI features

## Database Changes

### Audit Log Entry
When mode changes:
```prisma
AuditLog {
  action: "EXECUTION_MODE_CHANGED"
  resource: "user"
  details: {
    newMode: "AUTOMATIC",
    changedVia: "chat"
  }
}
```

### Usage Tracking
Each chat message increments:
```prisma
UsageRecord {
  aiCreditsUsed: +1
}
```

## Security & Validation

### Input Validation
- Shop domain verified against database
- Execution mode validated against enum
- Credit limits enforced before API calls

### Authentication
- Shop connection verified
- User ID retrieved from connection
- Only connected shops can access chat

### Rate Limiting
- Credit system prevents abuse
- Monthly limits per plan
- Clear error messages when limits reached

## Future Enhancements

### Potential Features
1. **Quick Actions**: Pre-built prompts for common tasks
2. **Voice Input**: Speech-to-text for hands-free operation
3. **Fix Preview**: Show exactly what will change before applying
4. **Batch Mode Selection**: Apply different modes per product collection
5. **Analytics Integration**: Track which mode generates best results
6. **A/B Testing**: Compare mode effectiveness automatically
7. **Smart Suggestions**: AI recommends best mode for user's needs
8. **Multi-Store Management**: Switch between stores in chat

### Performance Optimizations
1. **Context Caching**: Cache store context for faster load
2. **Lazy Loading**: Load messages on demand
3. **WebSocket Support**: Real-time updates for mode changes
4. **Optimistic Updates**: Update UI before server confirms

## Testing Recommendations

### Manual Testing
1. Open chat and verify context loads
2. Switch between all three modes
3. Send messages in each mode
4. Verify credit deduction works
5. Test with low/zero credits
6. Test with different plan types
7. Verify error handling

### Automated Testing
1. API endpoint tests
2. Component unit tests
3. Integration tests for mode switching
4. Credit system tests
5. Error boundary tests

## Documentation

All code includes:
- JSDoc comments for functions
- Inline comments for complex logic
- TypeScript interfaces for type safety
- Clear variable and function names

## Conclusion

The enhanced AI chat with execution mode switching provides a seamless, intuitive interface for managing SEO automation preferences. Users can easily switch between automation levels while chatting with Claude AI, which adapts its responses based on the active mode and real store data. The credit system ensures fair usage, and the entire feature is built with type safety, security, and scalability in mind.
