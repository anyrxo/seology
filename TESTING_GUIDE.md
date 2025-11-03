# AI Chat Testing Guide

## Quick Test Steps

### 1. Navigate to Chat Page
http://localhost:3000/dashboard/chat

### 2. Test Basic Chat
- Type: "Hello, can you help me with SEO?"
- Press Enter or click Send
- Should see streaming response word-by-word

### 3. Test Suggested Prompts
- Click "Audit my site" button
- Should populate input and send

### 4. Test Error Handling
- Try very long message (4000+ chars)
- Should show clear error message in red banner

## Success Checklist
- [ ] Chat page loads without errors
- [ ] Can send messages successfully
- [ ] Messages stream smoothly
- [ ] Error messages are clear and helpful
- [ ] Loading states show correctly

## Common Issues
- If "AI service not configured": Check ANTHROPIC_API_KEY in .env.local
- If "Not authenticated": Sign in at /sign-in
- If streaming fails: Check browser console and network tab
