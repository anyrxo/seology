/**
 * Test Claude API Capabilities
 * This script tests what Claude can actually DO with tools
 */

const Anthropic = require('@anthropic-ai/sdk')

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Test 1: Can Claude fetch and analyze a real website?
async function testWebsiteAnalysis() {
  console.log('\n🧪 TEST 1: Website Analysis with Real Fetching\n')

  const messages = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    tools: [
      {
        name: 'fetch_website',
        description: 'Fetch the HTML content of a website URL',
        input_schema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'The URL to fetch',
            },
          },
          required: ['url'],
        },
      },
    ],
    messages: [
      {
        role: 'user',
        content: 'Fetch the homepage of anthropic.com and tell me what you see',
      },
    ],
  })

  console.log('Claude Response:')
  console.log(JSON.stringify(messages.content, null, 2))

  // Check if Claude requested the tool
  const toolUse = messages.content.find((block) => block.type === 'tool_use')

  if (toolUse) {
    console.log('\n✅ Claude REQUESTED the fetch_website tool!')
    console.log('Tool Input:', JSON.stringify(toolUse.input, null, 2))

    // Simulate executing the tool
    console.log('\n📡 Simulating tool execution...')
    const response = await fetch(toolUse.input.url)
    const html = await response.text()

    console.log(`✓ Fetched ${html.length} characters from ${toolUse.input.url}`)

    // Send tool result back to Claude
    console.log('\n🔄 Sending tool result back to Claude...')
    const followUp = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      tools: [
        {
          name: 'fetch_website',
          description: 'Fetch the HTML content of a website URL',
          input_schema: {
            type: 'object',
            properties: {
              url: { type: 'string' },
            },
            required: ['url'],
          },
        },
      ],
      messages: [
        {
          role: 'user',
          content: 'Fetch the homepage of anthropic.com and tell me what you see',
        },
        {
          role: 'assistant',
          content: messages.content,
        },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: html.substring(0, 50000), // Limit to 50k chars
            },
          ],
        },
      ],
    })

    console.log('\n📊 Claude Analysis After Receiving Tool Result:')
    const textBlock = followUp.content.find((block) => block.type === 'text')
    if (textBlock) {
      console.log(textBlock.text)
    }
  } else {
    console.log('\n❌ Claude DID NOT request the tool - just responded with text')
    const textBlock = messages.content.find((block) => block.type === 'text')
    if (textBlock) {
      console.log('Text response:', textBlock.text)
    }
  }
}

// Test 2: Can Claude make multiple tool calls in sequence?
async function testMultipleToolCalls() {
  console.log('\n\n🧪 TEST 2: Multiple Sequential Tool Calls\n')

  const messages = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    tools: [
      {
        name: 'get_weather',
        description: 'Get current weather for a city',
        input_schema: {
          type: 'object',
          properties: {
            city: { type: 'string' },
          },
          required: ['city'],
        },
      },
      {
        name: 'search_restaurants',
        description: 'Search for restaurants in a city',
        input_schema: {
          type: 'object',
          properties: {
            city: { type: 'string' },
            cuisine: { type: 'string' },
          },
          required: ['city'],
        },
      },
    ],
    messages: [
      {
        role: 'user',
        content:
          'What is the weather in San Francisco? Also find me Italian restaurants there.',
      },
    ],
  })

  console.log('Tool Uses Requested:')
  const toolUses = messages.content.filter((block) => block.type === 'tool_use')

  if (toolUses.length > 0) {
    console.log(`✅ Claude requested ${toolUses.length} tool(s):`)
    toolUses.forEach((tool, i) => {
      console.log(`  ${i + 1}. ${tool.name} - ${JSON.stringify(tool.input)}`)
    })
  } else {
    console.log('❌ Claude did not request any tools')
  }
}

// Test 3: Can Claude use tools proactively without explicit prompting?
async function testProactiveToolUse() {
  console.log('\n\n🧪 TEST 3: Proactive Tool Use (No Explicit Request)\n')

  const messages = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: `You are a helpful assistant. When a user mentions a website URL, you should ALWAYS use the analyze_url tool to fetch and analyze it. Never just talk about what you could do - actually use the tool.`,
    tools: [
      {
        name: 'analyze_url',
        description: 'Fetch and analyze a website URL',
        input_schema: {
          type: 'object',
          properties: {
            url: { type: 'string' },
          },
          required: ['url'],
        },
      },
    ],
    messages: [
      {
        role: 'user',
        content: 'Tell me about anthropic.com',
      },
    ],
  })

  const toolUse = messages.content.find((block) => block.type === 'tool_use')

  if (toolUse) {
    console.log('✅ Claude PROACTIVELY used the tool without being explicitly asked!')
    console.log('Tool:', toolUse.name)
    console.log('Input:', JSON.stringify(toolUse.input, null, 2))
  } else {
    console.log('❌ Claude did not use the tool proactively')
    const textBlock = messages.content.find((block) => block.type === 'text')
    if (textBlock) {
      console.log('Response:', textBlock.text.substring(0, 200) + '...')
    }
  }
}

// Test 4: Test with AGGRESSIVE system prompt like we use in the SaaS
async function testAggressivePrompt() {
  console.log('\n\n🧪 TEST 4: Aggressive System Prompt (Like Our SaaS)\n')

  const messages = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: `**🚨 CRITICAL RULE: ALWAYS USE TOOLS IMMEDIATELY 🚨**

When you see a URL, you MUST:
1. STOP writing text
2. CALL the analyze_url tool RIGHT NOW
3. NEVER say "Let me analyze" - JUST DO IT

**WRONG RESPONSE:**
❌ "Let me analyze anthropic.com for you..."

**CORRECT RESPONSE:**
✅ [Immediately call analyze_url tool]`,
    tools: [
      {
        name: 'analyze_url',
        description: 'Fetch and analyze a website URL',
        input_schema: {
          type: 'object',
          properties: {
            url: { type: 'string' },
          },
          required: ['url'],
        },
      },
    ],
    messages: [
      {
        role: 'user',
        content: 'Check out futureshive.com',
      },
    ],
  })

  const toolUse = messages.content.find((block) => block.type === 'tool_use')

  if (toolUse) {
    console.log('✅ AGGRESSIVE PROMPT WORKED! Claude called the tool immediately!')
    console.log('Tool:', toolUse.name)
    console.log('Input:', JSON.stringify(toolUse.input, null, 2))
  } else {
    console.log('❌ Even aggressive prompt did not trigger tool use')
    const textBlock = messages.content.find((block) => block.type === 'text')
    if (textBlock) {
      console.log('Response:', textBlock.text)
    }
  }
}

// Test 5: What data CAN Claude actually fetch and process?
async function testDataFetchingCapabilities() {
  console.log('\n\n🧪 TEST 5: Real Data Fetching Capabilities\n')

  console.log('Testing what Claude can actually DO with fetched data...\n')

  // Fetch a real website
  const response = await fetch('https://anthropic.com')
  const html = await response.text()

  console.log(`✓ Fetched ${html.length} characters from anthropic.com`)

  // Send to Claude for analysis
  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Analyze this website HTML and extract:
1. Page title
2. Meta description
3. Number of H1 tags
4. All heading tags (H1-H6)
5. Number of images and how many have alt text
6. Any SEO issues you notice

HTML:
${html.substring(0, 100000)}`,
      },
    ],
  })

  console.log('\n📊 Claude\'s Analysis:\n')
  const textBlock = analysis.content.find((block) => block.type === 'text')
  if (textBlock) {
    console.log(textBlock.text)
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  CLAUDE API CAPABILITIES TEST SUITE')
  console.log('═══════════════════════════════════════════════════')

  try {
    await testWebsiteAnalysis()
    await testMultipleToolCalls()
    await testProactiveToolUse()
    await testAggressivePrompt()
    await testDataFetchingCapabilities()

    console.log('\n\n═══════════════════════════════════════════════════')
    console.log('  ALL TESTS COMPLETE')
    console.log('═══════════════════════════════════════════════════\n')
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Run it
runAllTests()
