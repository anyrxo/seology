import '@testing-library/jest-dom'

// Mock environment variables for tests
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_123'
process.env.CLERK_SECRET_KEY = 'sk_test_123'
process.env.ANTHROPIC_API_KEY = 'sk-ant-test-123'
process.env.STRIPE_SECRET_KEY = 'sk_test_123'
process.env.ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef'
process.env.CRON_SECRET = 'test-cron-secret'
