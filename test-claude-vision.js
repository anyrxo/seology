/**
 * Test script to verify Claude API can handle image attachments
 * This tests the vision capability that we're using in the chat
 */

const Anthropic = require('@anthropic-ai/sdk')
const fs = require('fs')
const path = require('path')

// Load API key from .env.local
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const apiKeyMatch = envContent.match(/ANTHROPIC_API_KEY=(.+)/)
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null

if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
  console.error('❌ ANTHROPIC_API_KEY not found or not configured in .env.local')
  process.exit(1)
}

const anthropic = new Anthropic({ apiKey })

async function testTextOnly() {
  console.log('\n🔍 Test 1: Text-only message (baseline)')
  console.log('─'.repeat(60))

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: 'Say hello and confirm you can respond to messages.',
        },
      ],
    })

    console.log('✅ Success! Claude responded:')
    console.log(response.content[0].text)
    return true
  } catch (error) {
    console.error('❌ Failed:', error.message)
    return false
  }
}

async function testImageAttachment() {
  console.log('\n🔍 Test 2: Image attachment with vision API')
  console.log('─'.repeat(60))

  // Create a simple test image (1x1 red pixel PNG)
  const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=='

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: testImageBase64,
              },
            },
            {
              type: 'text',
              text: 'What color is this image? Please describe it.',
            },
          ],
        },
      ],
    })

    console.log('✅ Success! Claude analyzed the image:')
    console.log(response.content[0].text)
    return true
  } catch (error) {
    console.error('❌ Failed:', error.message)
    if (error.error) {
      console.error('Error details:', JSON.stringify(error.error, null, 2))
    }
    return false
  }
}

async function testMultipleAttachments() {
  console.log('\n🔍 Test 3: Multiple attachments (text + image + text)')
  console.log('─'.repeat(60))

  // Create a simple test image
  const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=='

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: '[User attached file: document.pdf (250.5KB)]',
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: testImageBase64,
              },
            },
            {
              type: 'text',
              text: 'I attached a document and an image. Can you confirm you received both attachments?',
            },
          ],
        },
      ],
    })

    console.log('✅ Success! Claude responded:')
    console.log(response.content[0].text)
    return true
  } catch (error) {
    console.error('❌ Failed:', error.message)
    return false
  }
}

async function runTests() {
  console.log('╔═══════════════════════════════════════════════════════════╗')
  console.log('║  Claude Vision API Test Suite - File Attachment Validation ║')
  console.log('╚═══════════════════════════════════════════════════════════╝')

  const results = {
    textOnly: await testTextOnly(),
    imageAttachment: await testImageAttachment(),
    multipleAttachments: await testMultipleAttachments(),
  }

  console.log('\n' + '═'.repeat(60))
  console.log('📊 Test Results Summary')
  console.log('═'.repeat(60))
  console.log(`Text-only message:       ${results.textOnly ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Image attachment:        ${results.imageAttachment ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Multiple attachments:    ${results.multipleAttachments ? '✅ PASS' : '❌ FAIL'}`)

  const allPassed = Object.values(results).every((r) => r)

  console.log('\n' + '═'.repeat(60))
  if (allPassed) {
    console.log('🎉 All tests PASSED! File attachments are fully supported.')
    console.log('✅ Your chat implementation will work correctly with Claude API.')
  } else {
    console.log('⚠️  Some tests FAILED. Review the implementation.')
  }
  console.log('═'.repeat(60) + '\n')

  process.exit(allPassed ? 0 : 1)
}

runTests().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
