# Execution Mode Implementation Summary

## Overview

The AI chat now dynamically changes its behavior based on the user's selected execution mode. The mode can be toggled directly in the chat interface and persists across sessions.

## Three Execution Modes

### 1. AUTOMATIC Mode
**Behavior:** AI applies fixes immediately without waiting for approval

**User Experience:**
- User asks to fix something or analyze their site
- AI immediately starts applying fixes
- AI narrates what it's fixing in real-time
- Confirms fixes with "✓ Applied automatically"
- Very fast, action-oriented experience

**Example Interaction:**
```
User: "Fix my homepage meta description"
AI: "Analyzing your homepage... Found missing meta description.
     ✓ Adding meta description now...
     ✓ Applied! Your homepage now has: 'Shop premium products...'
     This change is live on your Shopify store."
```

### 2. PLAN Mode
**Behavior:** AI creates a comprehensive plan, waits for single approval, then executes all fixes at once

**User Experience:**
- User asks to fix something or analyze their site
- AI creates a numbered list of all related fixes
- AI asks for approval of the ENTIRE plan
- Once approved, AI applies all fixes together
- Best for reviewing multiple related changes before committing

**Example Interaction:**
```
User: "Improve my site's SEO"
AI: "I've analyzed your site and created this improvement plan:

     1. Homepage: Add meta description
     2. Product pages: Optimize 12 product titles
     3. Blog posts: Add internal linking (8 posts)
     4. Images: Add alt text to 22 images

     This plan will improve your search rankings by addressing
     critical SEO issues. Ready to apply all of these?"

User: "yes"
AI: "✓ Applying all 43 fixes from the plan...
     ✓ Complete! Visit your dashboard to review the changes."
```

### 3. APPROVE Mode
**Behavior:** AI presents issues one at a time, waits for explicit approval on each before moving forward

**User Experience:**
- User asks to analyze their site
- AI finds the first issue and asks for approval
- User approves or denies
- AI applies fix (if approved) then moves to next issue
- Very methodical, maximum control

**Example Interaction:**
```
User: "Check my homepage"
AI: "Analyzing your homepage...

     Issue #1: Missing meta description
     This affects your click-through rate by ~15%.
     Would you like me to add one?"

User: "yes"
AI: "✓ Meta description added.

     Issue #2: Your H1 tag is duplicated (2 H1s found)
     This confuses search engines about page topic.
     Should I fix this?"

User: "no, I want to keep both"
AI: "Understood, keeping current H1 structure.

     Issue #3: 3 images without alt text
     This hurts accessibility and image SEO.
     Fix these?"
```

## Implementation Details

### Frontend (SeologyChat.tsx)

**Toggle Component:**
- Located in chat header next to "Online" badge
- Three buttons: Auto, Plan, Approve
- Gradient active state (blue to purple)
- Loads user's current mode on mount
- Optimistic UI updates (changes immediately, reverts on error)

**State Management:**
```typescript
const [executionMode, setExecutionMode] = useState<ExecutionMode>('AUTOMATIC')
const [isLoadingMode, setIsLoadingMode] = useState(true)

// Loads mode on mount
useEffect(() => {
  const loadExecutionMode = async () => {
    const response = await fetch('/api/user/execution-mode')
    const data = await response.json()
    setExecutionMode(data.data.executionMode)
  }
  loadExecutionMode()
}, [])

// Updates mode with optimistic UI
const handleExecutionModeChange = async (newMode: ExecutionMode) => {
  const previousMode = executionMode
  setExecutionMode(newMode) // Update immediately

  try {
    await fetch('/api/user/execution-mode', {
      method: 'PUT',
      body: JSON.stringify({ executionMode: newMode })
    })
  } catch (error) {
    setExecutionMode(previousMode) // Revert on error
  }
}
```

### Backend API (app/api/user/execution-mode/route.ts)

**GET Endpoint:**
- Fetches user's current execution mode from database
- Returns: `{ success: true, data: { executionMode: 'AUTOMATIC' } }`

**PUT Endpoint:**
- Updates user's execution mode in database
- Validates mode is one of: AUTOMATIC, PLAN, APPROVE
- Returns updated mode

**Security:**
- Both endpoints require Clerk authentication
- User isolation (can only read/update own mode)
- Input validation

### AI Behavior (app/api/chat/route.ts)

**System Prompt Enhancement:**
The AI receives dramatically different instructions based on the user's mode:

**AUTOMATIC Mode Prompt:**
```
- When user asks you to fix something, tell them you're applying the fixes IMMEDIATELY
- Don't wait for approval - explain you're making changes right now
- List what you're fixing and confirm "✓ Applied automatically"
- Be proactive and action-oriented
```

**PLAN Mode Prompt:**
```
- When user mentions issues, create a COMPREHENSIVE PLAN with all related fixes
- Present the plan as a numbered list with descriptions
- Ask: "Would you like me to apply all of these to your store?"
- Only execute when they explicitly approve the ENTIRE plan
- Keep track of what's in the current plan throughout the conversation
```

**APPROVE Mode Prompt:**
```
- When identifying issues, present them ONE AT A TIME
- For each issue, explain what's wrong and ask "Would you like me to fix this?"
- Wait for explicit approval before moving to the next
- Track approvals and denials throughout the conversation
- Be patient and methodical, never rush ahead without approval
```

## Database Schema

**User Model (prisma/schema.prisma):**
```prisma
model User {
  id              String        @id @default(uuid())
  executionMode   ExecutionMode @default(AUTOMATIC)
  // ... other fields
}

enum ExecutionMode {
  AUTOMATIC
  PLAN
  APPROVE
}
```

The execution mode is stored at the user level, persists across sessions, and can be changed at any time via the toggle.

## User Flow

### Changing Execution Mode:

1. User clicks toggle in chat header (Auto/Plan/Approve)
2. UI updates immediately (optimistic)
3. API call updates database
4. If API fails, UI reverts to previous mode
5. Next message to AI uses new mode's behavior

### AI Behavior Adaptation:

1. User sends message to AI
2. Chat API loads user from database (includes executionMode)
3. System prompt is built with mode-specific instructions
4. AI responds according to current mode
5. User experiences different interaction pattern

## Testing the Modes

### Test AUTOMATIC Mode:
```
User: "Analyze my homepage"
Expected: AI immediately starts analyzing and applying fixes without asking
```

### Test PLAN Mode:
```
User: "Improve my SEO"
Expected: AI creates numbered plan, asks for approval before applying
```

### Test APPROVE Mode:
```
User: "Check my site for issues"
Expected: AI presents first issue, waits for "yes"/"no" before continuing
```

## Benefits

### For Users:
- **Control:** Choose how much control they want over changes
- **Speed:** AUTOMATIC mode for fast iteration
- **Safety:** APPROVE mode for careful review
- **Flexibility:** Can switch modes mid-conversation
- **Visibility:** Toggle shows current mode at all times

### For Development:
- **No Code Changes:** Switching modes doesn't require code deployment
- **AI-Powered:** Behavior changes happen in AI reasoning, not hardcoded logic
- **Scalable:** Easy to add new modes or modify existing behavior
- **User-Centric:** Each user can have different preferences

## Future Enhancements

### Potential Additions:

1. **Mode Descriptions:**
   - Add tooltip explaining each mode on hover
   - Show mode description in chat when switched

2. **Mode-Specific UI:**
   - Different color schemes per mode
   - Visual indicators (icons) for each mode

3. **Smart Suggestions:**
   - Suggest PLAN mode for large changes
   - Suggest APPROVE mode for critical pages
   - Suggest AUTOMATIC for minor fixes

4. **Analytics:**
   - Track which modes users prefer
   - A/B test different mode behaviors
   - Optimize AI prompts based on usage

5. **Per-Site Modes:**
   - Allow different modes for different connected sites
   - Default mode for new sites

6. **Conversation Context:**
   - Remember mode preferences per conversation type
   - Auto-switch based on user request patterns

## Files Modified

1. ✅ [components/dashboard/SeologyChat.tsx](components/dashboard/SeologyChat.tsx)
   - Added execution mode state and toggle UI
   - Added mode loading/saving logic
   - Lines 56-96 (state), 266-291 (toggle UI), 226-245 (handlers)

2. ✅ [app/api/user/execution-mode/route.ts](app/api/user/execution-mode/route.ts) (NEW)
   - GET endpoint to fetch user's execution mode
   - PUT endpoint to update execution mode
   - Full authentication and validation

3. ✅ [app/api/chat/route.ts](app/api/chat/route.ts)
   - Enhanced system prompt with mode-specific behavior
   - Lines 281-349 (execution mode instructions)
   - AI now responds differently based on user's mode

## Summary

The execution mode system gives users complete control over how aggressively the AI applies SEO fixes to their sites:

- **AUTOMATIC** = "Just fix it, I trust you"
- **PLAN** = "Show me the plan, I'll approve it"
- **APPROVE** = "Ask me before every change"

The mode is visible in the UI, persists across sessions, and dramatically changes the AI's conversation style and behavior. This creates three distinct user experiences within the same chat interface.
