# SEOLOGY.AI Test Suite

Comprehensive test coverage for the SEOLOGY.AI platform.

## Overview

This test suite provides comprehensive coverage across:
- Unit tests for business logic and utilities
- Component tests for React components
- API route tests for backend endpoints
- Integration tests for workflows
- E2E tests for user journeys

## Test Structure

```
tests/
├── utils/
│   ├── factories.ts        # Test data factories
│   ├── mocks.ts           # Mock generators for external services
│   └── README.md          # This file
├── integration/           # Integration tests
└── e2e/                   # End-to-end tests with Playwright

lib/__tests__/             # Unit tests for lib functions
components/__tests__/      # Component tests
app/api/**/__tests__/      # API route tests
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run with coverage
```bash
npm run test:coverage
```

### Run in watch mode
```bash
npm run test:watch
```

### Run specific test file
```bash
npm test -- --testPathPatterns="execution-modes"
```

### Run tests for specific directory
```bash
npm test -- lib/__tests__
```

## Coverage Thresholds

The project enforces 80% coverage across all metrics:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## Test Utilities

### Factories (`tests/utils/factories.ts`)

Create mock data for tests:

```typescript
import { createMockUser, createMockConnection, createMockIssue } from '@/tests/utils/factories'

const user = createMockUser({ email: 'custom@example.com' })
const connection = createMockConnection({ platform: 'WORDPRESS' })
const issue = createMockIssue({ severity: 'CRITICAL' })
```

### Mocks (`tests/utils/mocks.ts`)

Mock external services:

```typescript
import { mockPrismaClient, mockStripeAPI, mockClaudeAPI } from '@/tests/utils/mocks'

// Mock Prisma client
jest.mock('@/lib/db', () => ({ db: mockPrismaClient() }))

// Mock Stripe
jest.mock('stripe', () => ({ default: jest.fn(() => mockStripeAPI()) }))
```

## Test Categories

### 1. Unit Tests (`lib/__tests__/`)

Test individual functions and modules in isolation.

**Files:**
- `execution-modes.test.ts` - Tests for AUTOMATIC, PLAN, and APPROVE modes
- `shopify.test.ts` - Shopify integration tests
- `wordpress.test.ts` - WordPress integration tests
- `encryption.test.ts` - Encryption/decryption tests
- `usage.test.ts` - Usage tracking tests
- `notifications.test.ts` - Notification system tests
- `teams.test.ts` - Team collaboration tests
- `webhooks.test.ts` - Webhook system tests

**Example:**
```typescript
describe('executeFixes', () => {
  it('should route to AUTOMATIC mode', async () => {
    // Arrange
    const user = createMockUser({ executionMode: 'AUTOMATIC' })

    // Act
    const result = await executeFixes('site-123', user.id)

    // Assert
    expect(result.success).toBe(true)
  })
})
```

### 2. Component Tests (`components/__tests__/`)

Test React components with React Testing Library.

**Files:**
- `Sidebar.test.tsx` - Dashboard sidebar navigation
- `NotificationCenter.test.tsx` - Notification UI
- `IssueCard.test.tsx` - SEO issue display
- `ConfirmDialog.test.tsx` - Confirmation dialogs
- `WelcomeStep.test.tsx` - Onboarding steps
- `ConnectSiteStep.test.tsx` - Site connection flow

**Example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from '@/components/dashboard/Sidebar'

describe('Sidebar', () => {
  it('should navigate when link clicked', () => {
    render(<Sidebar />)

    const dashboardLink = screen.getByText('Dashboard')
    fireEvent.click(dashboardLink)

    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })
})
```

### 3. API Route Tests (`app/api/**/__tests__/`)

Test API endpoints with mocked requests/responses.

**Files:**
- `sites/route.test.ts` - Site management APIs
- `fixes/route.test.ts` - Fix application APIs
- `billing/route.test.ts` - Stripe integration APIs
- `auth/shopify/route.test.ts` - Shopify OAuth flow
- `admin/users/route.test.ts` - Admin user management

**Example:**
```typescript
import { POST } from '@/app/api/fixes/route'
import { NextRequest } from 'next/server'

describe('POST /api/fixes', () => {
  it('should create and apply fix', async () => {
    const req = new NextRequest('http://localhost/api/fixes', {
      method: 'POST',
      body: JSON.stringify({ siteId: 'site-123', issueIds: ['issue-1'] })
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

### 4. Integration Tests (`tests/integration/`)

Test complete workflows across multiple systems.

**Files:**
- `oauth-flow.test.ts` - Complete OAuth flows (Shopify, WordPress)
- `execution-modes.test.ts` - End-to-end execution mode workflows
- `billing-flow.test.ts` - Subscription and payment flows
- `team-collaboration.test.ts` - Multi-user team workflows
- `webhook-delivery.test.ts` - Webhook trigger and delivery

**Example:**
```typescript
describe('Shopify OAuth Flow', () => {
  it('should complete full OAuth flow', async () => {
    // 1. Start OAuth
    const authUrl = generateShopifyOAuthUrl(...)

    // 2. Exchange code for token
    const token = await exchangeShopifyOAuthCode(...)

    // 3. Save connection
    const connection = await saveConnection(...)

    // 4. Test connection
    const testResult = await testShopifyConnection(...)

    expect(testResult.success).toBe(true)
  })
})
```

### 5. E2E Tests (`tests/e2e/`)

Test complete user journeys with Playwright.

**Files:**
- `onboarding.spec.ts` - New user onboarding flow
- `connect-site.spec.ts` - Site connection workflows
- `fix-application.spec.ts` - Viewing and applying fixes
- `admin-panel.spec.ts` - Admin operations
- `team-management.spec.ts` - Team collaboration features

**Example:**
```typescript
test('user can complete onboarding', async ({ page }) => {
  await page.goto('/dashboard/onboarding')

  // Step 1: Welcome
  await page.click('text=Get Started')

  // Step 2: Connect site
  await page.fill('[name="shopDomain"]', 'test-store.myshopify.com')
  await page.click('text=Connect')

  // ... more steps

  await expect(page).toHaveURL('/dashboard')
})
```

## Testing Best Practices

### 1. Test Structure

Follow the **Arrange-Act-Assert** pattern:

```typescript
it('should do something', async () => {
  // Arrange: Set up test data and mocks
  const user = createMockUser()
  mockDb.user.findUnique.mockResolvedValue(user)

  // Act: Execute the code being tested
  const result = await someFunction(user.id)

  // Assert: Verify the outcome
  expect(result.success).toBe(true)
})
```

### 2. Test Isolation

Each test should be independent:

```typescript
beforeEach(() => {
  jest.clearAllMocks()  // Clear all mocks before each test
})

afterEach(() => {
  jest.restoreAllMocks()  // Restore original implementations
})
```

### 3. Descriptive Test Names

Use clear, descriptive test names:

```typescript
// Good
it('should return error if user not found')
it('should apply fixes in AUTOMATIC mode')
it('should rollback fix within 90-day window')

// Bad
it('works')
it('test 1')
it('error handling')
```

### 4. Mock External Dependencies

Always mock external services:

```typescript
// Mock database
jest.mock('@/lib/db')

// Mock Stripe
jest.mock('stripe')

// Mock Clerk
jest.mock('@clerk/nextjs')

// Mock fetch
global.fetch = jest.fn()
```

### 5. Test Edge Cases

Test both happy path and error scenarios:

```typescript
describe('approveFix', () => {
  it('should apply fix successfully')           // Happy path
  it('should return error if fix not found')    // Error case
  it('should return error if user unauthorized') // Security case
  it('should return error if fix not pending')  // State validation
})
```

## Continuous Integration

Tests run automatically on:
- Every push to main
- Every pull request
- Before deployment

**CI Configuration:**
```yaml
# .github/workflows/test.yml
- run: npm test -- --coverage
- run: npx tsc --noEmit  # Type checking
```

## Debugging Tests

### Run single test
```bash
npm test -- --testNamePattern="should apply fixes"
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-coverage"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Verbose output
```bash
npm test -- --verbose
```

## Common Issues

### Issue: Tests timing out
**Solution:** Increase timeout
```typescript
jest.setTimeout(10000)  // 10 seconds
```

### Issue: Mocks not working
**Solution:** Ensure mocks are defined before imports
```typescript
// Define mocks first
jest.mock('@/lib/db')

// Then import modules
import { someFunction } from '@/lib/someModule'
```

### Issue: TypeScript errors in tests
**Solution:** Update test types
```typescript
const mockFn = jest.fn() as jest.MockedFunction<typeof realFunction>
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain 80% coverage
4. Add integration/E2E tests for user-facing features
5. Update this README if adding new test patterns
