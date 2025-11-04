# Business Profile & AI Personalization TODO

## Overview

Two main improvements needed:
1. **Business Profile Management** - Allow users to edit their business information in settings
2. **AI Site-Specific Advice** - Make AI reference actual connected sites and give personalized advice

## Current Status

### ✅ Already in Database
The User model already has these fields:
- `businessName` - Name of the business
- `businessType` - E-commerce, SaaS, Local Business, etc.
- `businessStage` - Just Starting, Growing, Established
- `platform` - Shopify, WordPress, WooCommerce, Custom

### ⏳ What Needs to Be Done

## 1. Add Business Profile Section to Settings UI

**File:** `components/dashboard/SettingsClient.tsx`

**Changes Needed:**

### A. Update User Interface (Line 7-14):
```typescript
interface User {
  firstName: string | null
  lastName: string | null
  email: string
  userId: string
  plan: string
  executionMode: string
  businessName: string | null      // ADD
  businessType: string | null      // ADD
  businessStage: string | null     // ADD
  platform: string | null          // ADD
}
```

### B. Add State for Business Profile (after line 27):
```typescript
const [businessProfile, setBusinessProfile] = useState({
  businessName: user.businessName || '',
  businessType: user.businessType || '',
  businessStage: user.businessStage || '',
  platform: user.platform || '',
})
const [savingProfile, setSavingProfile] = useState(false)
```

### C. Add Handler Function (after line 94):
```typescript
const handleBusinessProfileUpdate = async () => {
  setSavingProfile(true)
  setErrorMessage(null)
  setSuccessMessage(null)

  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(businessProfile),
    })

    if (response.ok) {
      setSuccessMessage('Business profile updated successfully')
      setTimeout(() => setSuccessMessage(null), 3000)
      router.refresh()
    } else {
      setErrorMessage('Failed to update business profile')
    }
  } catch (error) {
    setErrorMessage('An error occurred. Please try again.')
  } finally {
    setSavingProfile(false)
  }
}
```

### D. Add Business Profile Section in Profile Tab (after line 290):
```typescript
{/* Business Profile Section */}
<div className="divider card-small-divider mg-top-32px mg-bottom-32px"></div>

<div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
    <span style={{ fontSize: '16px' }}>🏢</span>
  </div>
  <div>
    <h2 className="text-xl font-bold text-white">
      Business Profile
    </h2>
    <p className="text-sm text-gray-400 mt-1">
      This information helps our AI provide personalized SEO advice
    </p>
  </div>
</div>

<div className="grid-2-columns gap-row-24px gap-column-24px">
  <div className="flex-vertical">
    <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
      Business Name
    </label>
    <input
      type="text"
      value={businessProfile.businessName}
      onChange={(e) => setBusinessProfile({ ...businessProfile, businessName: e.target.value })}
      placeholder="Enter your business name"
      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
    />
  </div>

  <div className="flex-vertical">
    <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
      Business Type
    </label>
    <select
      value={businessProfile.businessType}
      onChange={(e) => setBusinessProfile({ ...businessProfile, businessType: e.target.value })}
      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
    >
      <option value="">Select type...</option>
      <option value="E-commerce">E-commerce</option>
      <option value="SaaS">SaaS</option>
      <option value="Local Business">Local Business</option>
      <option value="Agency">Agency</option>
      <option value="Blog/Content">Blog/Content</option>
      <option value="Portfolio">Portfolio</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div className="flex-vertical">
    <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
      Business Stage
    </label>
    <select
      value={businessProfile.businessStage}
      onChange={(e) => setBusinessProfile({ ...businessProfile, businessStage: e.target.value })}
      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
    >
      <option value="">Select stage...</option>
      <option value="Just Starting">Just Starting</option>
      <option value="Growing">Growing</option>
      <option value="Established">Established</option>
      <option value="Enterprise">Enterprise</option>
    </select>
  </div>

  <div className="flex-vertical">
    <label className="text-sm font-medium text-gray-400 mg-bottom-8px">
      Primary Platform
    </label>
    <select
      value={businessProfile.platform}
      onChange={(e) => setBusinessProfile({ ...businessProfile, platform: e.target.value })}
      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
    >
      <option value="">Select platform...</option>
      <option value="Shopify">Shopify</option>
      <option value="WordPress">WordPress</option>
      <option value="WooCommerce">WooCommerce</option>
      <option value="Magento">Magento</option>
      <option value="Custom">Custom</option>
      <option value="Other">Other</option>
    </select>
  </div>
</div>

<button
  onClick={handleBusinessProfileUpdate}
  disabled={savingProfile}
  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {savingProfile ? 'Saving...' : 'Save Business Profile'}
</button>
```

## 2. Create API Endpoint for Business Profile

**File:** `app/api/user/profile/route.ts` (NEW FILE)

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Get user's business profile
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: {
        businessName: true,
        businessType: true,
        businessStage: true,
        platform: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Error fetching business profile:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch business profile',
        },
      },
      { status: 500 }
    )
  }
}

// PUT - Update user's business profile
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { businessName, businessType, businessStage, platform } = body

    const updatedUser = await db.user.update({
      where: { clerkId: userId },
      data: {
        businessName: businessName || null,
        businessType: businessType || null,
        businessStage: businessStage || null,
        platform: platform || null,
      },
      select: {
        businessName: true,
        businessType: true,
        businessStage: true,
        platform: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedUser,
    })
  } catch (error) {
    console.error('Error updating business profile:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update business profile',
        },
      },
      { status: 500 }
    )
  }
}
```

## 3. Update AI Chat to Use Business Profile & Site Info

**File:** `app/api/chat/route.ts`

**Changes Needed:**

### A. Enhanced System Prompt (around line 224):

Current context building needs to be expanded to include:

```typescript
const contextInfo = buildUserContext({
  id: user.id,
  plan: user.plan,
  executionMode: user.executionMode,
  businessType: user.businessType,
  businessName: user.businessName,
  businessStage: user.businessStage,
  platform: user.platform,
  connections: user.connections.map((conn) => ({
    ...conn,
    // Include actual domain/URL info
  })),
})
```

### B. Update System Prompt to be More Site-Specific:

Add to system prompt after line 232:

```
BUSINESS CONTEXT:
${user.businessName ? `- Business Name: ${user.businessName}` : ''}
${user.businessType ? `- Business Type: ${user.businessType}` : ''}
${user.businessStage ? `- Business Stage: ${user.businessStage}` : ''}
${user.platform ? `- Primary Platform: ${user.platform}` : ''}

CONNECTED SITES:
${user.connections.length > 0 ? user.connections.map((conn, idx) => `
${idx + 1}. ${conn.displayName || conn.domain} (${conn.platform})
   - URL: ${conn.domain}
   - Status: ${conn.status}
   - Health: ${conn.healthStatus}
   - Pages: ${conn.pageCount}
   - Issues: ${conn.issueCount}
`).join('\n') : 'No sites connected yet'}

CRITICAL: ALWAYS REFERENCE SPECIFIC SITES BY NAME/URL
- GOOD: "Your Shopify store at example-store.myshopify.com needs..."
- GOOD: "I've analyzed your main website (example.com) and found..."
- BAD: "Your store needs..." (too generic)
- BAD: "The website has issues..." (which website?)

When user has NO sites connected:
- Guide them to connect a site first: "I see you haven't connected any sites yet. To analyze your SEO, please visit /dashboard/sites/connect to connect your first site."
- Still help with general SEO questions and articles they share
- Be helpful but emphasize you can do MUCH more with a connected site

When user has sites connected:
- Always mention which site you're analyzing
- Reference their business type in advice (e.g., "For an e-commerce store like yours...")
- Tailor examples to their industry (e.g., product pages for e-commerce, service pages for local business)
- Use their business stage to adjust complexity (simpler for "Just Starting", advanced for "Established")
```

## 4. Testing Checklist

### Business Profile:
- [ ] User can edit business name
- [ ] User can select business type from dropdown
- [ ] User can select business stage from dropdown
- [ ] User can select primary platform
- [ ] Changes persist after page refresh
- [ ] Success message shows after save
- [ ] Error handling works

### AI Personalization:
- [ ] AI mentions specific connected site names/URLs
- [ ] AI tailors advice to business type
- [ ] AI adjusts complexity based on business stage
- [ ] AI guides users to connect sites when none are connected
- [ ] AI references specific issues from specific sites
- [ ] AI uses business name in conversation naturally

## 5. Example AI Responses After Implementation

### With Connected Sites:
```
User: "Check my SEO"

AI: "I'm analyzing your Shopify store at acme-widgets.myshopify.com...

Since you're running an established e-commerce business, I'm focusing on product page optimization and conversion rate factors.

Issues found on acme-widgets.myshopify.com:
1. Homepage missing meta description (affects CTR)
2. 12 product pages missing alt text on images
3. Site speed could be improved (3.2s load time)

Since you're in AUTOMATIC mode, shall I apply these fixes to your store right now?"
```

### No Connected Sites:
```
User: "Check my SEO"

AI: "I'd love to help analyze your site's SEO! However, I don't see any connected sites in your account yet.

To get started:
1. Visit /dashboard/sites/connect
2. Connect your site (I see you're on Shopify based on your profile!)
3. Come back here and I'll run a full analysis

In the meantime, I can still help with:
- General SEO questions
- Analyzing specific URLs you paste
- SEO strategy for your e-commerce business

What would you like to know about SEO?"
```

## Files to Create/Modify Summary

### Create:
1. ✅ `app/dashboard/settings/page.tsx` - Already updated to pass business fields
2. ⏳ `app/api/user/profile/route.ts` - NEW: Business profile API

### Modify:
1. ⏳ `components/dashboard/SettingsClient.tsx` - Add business profile UI section
2. ⏳ `app/api/chat/route.ts` - Enhanced AI prompt with business context and site-specific instructions

## Priority Order

1. **HIGH** - Create business profile API endpoint
2. **HIGH** - Add business profile UI to settings
3. **MEDIUM** - Update AI prompt to use business data
4. **MEDIUM** - Make AI more site-specific in responses

## Expected Impact

### User Benefits:
- More personalized AI advice tailored to their industry
- AI that "knows" their business context
- More actionable, specific recommendations
- Better onboarding experience

### AI Improvements:
- References actual store names/URLs
- Tailors examples to business type (e-commerce vs SaaS vs local)
- Adjusts complexity based on experience level
- Provides context-aware suggestions

## Notes

- Business profile is optional - AI works without it but is enhanced with it
- All fields can be left blank - AI provides general advice
- Platform field helps AI understand technical constraints
- Business stage helps AI adjust explanation complexity
