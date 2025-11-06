# Opcode-Inspired Features for SEOLOGY.AI

This document describes the Opcode/Claudia-inspired features integrated into the SEOLOGY.AI Shopify app.

## Overview

Inspired by [Opcode (Claudia)](https://github.com/winfunc/opcode), we've integrated four powerful features:

1. **Custom AI Agents** - Specialized SEO agents with custom prompts
2. **Timeline Checkpoints** - Time-travel through SEO changes with instant rollback
3. **Usage Analytics** - Real-time Claude API cost monitoring and optimization
4. **Execution Monitor** - Live tracking of background automation jobs

## 1. Custom AI Agents

### What Are SEO Agents?

SEO Agents are specialized AI assistants with custom prompts and behavior patterns. Each agent is an expert in a specific SEO domain.

### Pre-Built Agent Templates

#### Title Optimizer Agent
- **Specialty**: Product title optimization
- **Expertise**: Creates compelling, SEO-friendly product titles
- **Input**: Product data (title, description, category)
- **Output**: Optimized title with keyword placement
- **Average Cost**: $0.002 per product

#### Meta Description Expert
- **Specialty**: Meta description generation
- **Expertise**: 150-160 character descriptions with CTAs
- **Input**: Product/page content
- **Output**: High-converting meta descriptions
- **Average Cost**: $0.002 per product

#### Schema.org Wizard
- **Specialty**: Structured data generation
- **Expertise**: Creates valid JSON-LD schema markup
- **Input**: Product/page data
- **Output**: Complete Schema.org structured data
- **Average Cost**: $0.003 per product

#### Alt Text Specialist
- **Specialty**: Image alt text generation
- **Expertise**: Descriptive, keyword-rich alt text
- **Input**: Image URL + context
- **Output**: SEO-optimized alt text
- **Average Cost**: $0.001 per image

#### Comprehensive SEO Auditor
- **Specialty**: Full SEO analysis
- **Expertise**: Identifies all SEO issues and generates fix plan
- **Input**: Complete page/product data
- **Output**: Prioritized issue list + recommendations
- **Average Cost**: $0.005 per product

### Creating Custom Agents

```typescript
// Example: Create a custom agent for e-commerce product descriptions
const customAgent = {
  name: "E-commerce Description Writer",
  description: "Generates persuasive product descriptions with SEO keywords",
  specialty: "custom",
  systemPrompt: `You are an expert e-commerce copywriter specializing in product descriptions.

  Your task:
  1. Write compelling product descriptions that convert
  2. Naturally incorporate target keywords
  3. Highlight key features and benefits
  4. Use persuasive language without being salesy
  5. Keep descriptions between 150-300 words

  Format: Return JSON with { description, keywords_used, word_count }`,

  model: "claude-3-5-sonnet-20241022",
  temperature: 0.8, // Higher for more creative descriptions
  maxTokens: 1000,

  targetIssueTypes: ["missing_description", "poor_description"],
  autoApply: false, // Requires approval
}
```

### Agent Performance Tracking

Each agent tracks:
- Total runs
- Success/failure rate
- Average execution time
- Average tokens used
- Average cost per run
- User ratings (1-5 stars)

### Agent Marketplace

Share and discover agents:
- Browse by category
- See performance metrics
- Read user reviews
- Install with one click
- Rate and review agents you use

**Categories**:
- Title Optimization
- Meta Tags
- Images
- Schema.org
- Comprehensive Audits
- Custom Solutions

## 2. Timeline Checkpoints

### What Are Checkpoints?

Checkpoints are snapshots of your store's SEO state at a specific point in time. They enable:
- Time-travel through your SEO history
- Instant rollback to any previous state
- Branch testing (try different strategies)
- Compare before/after metrics

### Checkpoint Types

#### Manual Checkpoints
- Created by user on-demand
- Use before major changes
- Name and tag for organization

#### Auto-Daily Checkpoints
- Created before daily automation
- Automatic rollback available
- 90-day retention

#### Pre-Agent-Run Checkpoints
- Before each agent execution
- Enables per-agent rollback
- Linked to execution logs

#### Milestone Checkpoints
- Mark important achievements
- Never expire
- Can be branched from

### Timeline Features

#### Visual Timeline View
```
Now ●─────●─────●─────●─────● 30 days ago
     │     │     │     │     │
     │     │     │     │     └─ "Pre-Holiday Push"
     │     │     │     └─────── "Schema.org Added"
     │     │     └──────────── "Title Optimization"
     │     └─────────────────── "Image Alt Text Fixes"
     └──────────────────────── "Daily Automation"
```

#### Branching
```
Main Timeline:  ●─────●─────●─────●
                      │
Branch A:             └─────●─────● (Test aggressive titles)
                      │
Branch B:             └─────●─────● (Test schema variations)
```

#### Diff Viewer
Shows exactly what changed between checkpoints:
- Products modified
- Fields changed (before → after)
- SEO scores (before → after)
- Cost of changes
- Estimated impact

### Rollback Process

1. Select checkpoint from timeline
2. Preview changes that will be reverted
3. Confirm rollback
4. System restores exact state
5. New checkpoint created post-rollback

**Rollback Capabilities**:
- Product titles
- Meta descriptions
- Alt text
- Schema.org markup
- Meta tags
- Image optimizations

**Limitations**:
- Cannot rollback deleted products
- Cannot rollback Shopify app configuration changes
- 90-day rollback window (configurable)

## 3. Usage Analytics Dashboard

### Real-Time Cost Tracking

Track Claude API usage with precision:

#### By Shop
- Cost per Shopify store
- Token usage breakdown
- Most expensive operations
- Cost trends over time

#### By Product
- Which products cost most to optimize
- Cost per product analysis
- ROI calculation (cost vs. traffic increase)

#### By Fix Type
- Title optimization costs
- Meta description costs
- Image alt text costs
- Schema generation costs
- Custom agent costs

#### By Agent
- Performance comparison
- Cost per agent
- Efficiency metrics
- ROI per agent

### Beautiful Charts

#### Cost Trend Chart
Line chart showing daily/weekly/monthly spend

#### Token Usage Pie Chart
Breakdown by operation type

#### Agent Performance Comparison
Bar chart comparing agent costs and success rates

#### ROI Analysis
Scatter plot: Cost vs. SEO score improvement

### Budget Management

#### Set Monthly Budget
```typescript
{
  monthlyLimitUSD: 50.00,
  dailyLimitUSD: 2.00,
  alertAt50Percent: true,
  alertAt75Percent: true,
  alertAt90Percent: true,
  pauseAutomationAt100Percent: true
}
```

#### Smart Alerts
- Email notification at 50% spent
- Dashboard alert at 75% spent
- Urgent notification at 90% spent
- Automatic pause at 100% spent

#### Cost Optimization Suggestions
AI-powered recommendations:
- "Switch to batch processing to save 30%"
- "Agent X is 2x more expensive than Agent Y with similar results"
- "Image optimization costs spiked - investigate"
- "You can reduce costs by adjusting temperature to 0.7"

### Export for Accounting

Export usage data in multiple formats:
- CSV for Excel
- PDF reports
- JSON for custom analysis
- Stripe-compatible format for billing

**Export Includes**:
- Date range
- Total cost
- Breakdown by operation
- Breakdown by shop/product
- Agent execution logs
- Token usage details

## 4. Agent Execution Monitor

### Live Background Job Tracking

Real-time visibility into automation runs:

#### Monitor Dashboard
```
┌─────────────────────────────────────────────┐
│ Daily Automation - Running                   │
│ Started: 2 minutes ago                       │
│ Progress: [████████░░░░░░░░] 45%           │
│                                              │
│ Current Task: Analyzing "Leather Jacket"     │
│ Estimated Time: 3 minutes remaining          │
│                                              │
│ Stats:                                       │
│ ✓ Products analyzed: 45/100                 │
│ ✓ Issues found: 127                         │
│ ✓ Fixes applied: 89                         │
│ ✗ Failures: 3                               │
│                                              │
│ Cost: $0.34 USD                             │
│ Tokens: 23,450                              │
└─────────────────────────────────────────────┘
```

#### Detailed Logs
Real-time log stream:
```
09:15:23 | Starting daily automation
09:15:24 | Fetched 100 products from Shopify
09:15:25 | Agent: Title Optimizer started
09:15:26 | Analyzing: "Leather Jacket" (id: 123)
09:15:28 | Found 3 issues: missing meta, poor title, no alt text
09:15:30 | Generated fixes (0.002s, $0.0023)
09:15:31 | Applied fix: Updated title ✓
09:15:32 | Applied fix: Updated meta ✓
09:15:33 | Applied fix: Added alt text ✓
09:15:34 | Product complete (success)
...
```

#### Performance Metrics

Per-product metrics:
- Time per product (avg, min, max)
- Tokens per product
- Cost per product
- Success/failure rate

Agent comparison:
- Which agents are fastest
- Which agents are most cost-effective
- Which agents have highest success rate
- Which agents provide best SEO improvement

#### Error Tracking

Real-time error monitoring:
- Error type classification
- Error frequency
- Affected products
- Automatic retry logic
- Error resolution suggestions

**Common Errors**:
- Shopify API rate limit (auto-retry with backoff)
- Claude API timeout (retry with increased timeout)
- Invalid product data (skip with warning)
- Permission issues (halt with alert)

#### Pause/Resume Control

Manual control over automation:
- Pause button (stops after current task)
- Resume button (continues from pause)
- Cancel button (stops immediately, creates checkpoint)
- Schedule next run

## Integration with Existing Features

### Automation Engine Integration

The automation engine (`lib/automation-engine.ts`) now:
- Creates checkpoint before each run
- Uses agents for analysis
- Tracks usage events
- Updates execution monitor
- Generates timeline entries

### Execution Modes Integration

All three modes work with Opcode features:

#### AUTOMATIC Mode
- Agent runs automatically
- Checkpoint created before changes
- Usage tracked
- Monitor shows live progress
- Timeline updated

#### PLAN Mode
- Agent generates plan
- Checkpoint created
- Plan approval triggers execution
- Monitor tracks application
- Timeline shows plan execution

#### APPROVE Mode
- Agent creates pending fixes
- Each fix requires approval
- Checkpoint per approved fix
- Monitor shows approval queue
- Timeline tracks approvals

## API Routes

### Agent Management
- `GET /api/shopify/agents` - List agents
- `POST /api/shopify/agents` - Create agent
- `GET /api/shopify/agents/[id]` - Get agent
- `PUT /api/shopify/agents/[id]` - Update agent
- `DELETE /api/shopify/agents/[id]` - Delete agent
- `POST /api/shopify/agents/[id]/execute` - Execute agent

### Agent Marketplace
- `GET /api/shopify/agents/marketplace` - Browse marketplace
- `GET /api/shopify/agents/marketplace/[id]` - Get listing
- `POST /api/shopify/agents/[id]/install` - Install agent
- `POST /api/shopify/agents/[id]/review` - Submit review

### Checkpoints
- `GET /api/shopify/checkpoints` - List checkpoints
- `POST /api/shopify/checkpoints` - Create checkpoint
- `GET /api/shopify/checkpoints/[id]` - Get checkpoint
- `POST /api/shopify/checkpoints/[id]/rollback` - Rollback
- `GET /api/shopify/checkpoints/[id]/diff` - View diff

### Usage Analytics
- `GET /api/shopify/analytics/usage` - Get usage data
- `GET /api/shopify/analytics/costs` - Get cost breakdown
- `GET /api/shopify/analytics/agents` - Agent performance
- `POST /api/shopify/analytics/budget` - Set budget
- `GET /api/shopify/analytics/export` - Export data

### Execution Monitor
- `GET /api/shopify/monitor` - List monitors
- `GET /api/shopify/monitor/[id]` - Get monitor
- `POST /api/shopify/monitor/[id]/pause` - Pause execution
- `POST /api/shopify/monitor/[id]/resume` - Resume execution
- `POST /api/shopify/monitor/[id]/cancel` - Cancel execution
- `GET /api/shopify/monitor/[id]/logs` - Get logs (streaming)

## UI Pages

### Agent Library (`/shopify/agents`)
- Grid view of all agents
- Filter by specialty
- Performance metrics
- Create/edit agents
- Agent marketplace link

### Timeline (`/shopify/timeline`)
- Visual timeline with checkpoints
- Drag to zoom
- Click checkpoint for details
- Rollback button
- Branch visualization
- Diff viewer

### Analytics Dashboard (`/shopify/analytics`)
- Cost overview cards
- Interactive charts
- Budget management
- Export functionality
- Cost optimization tips

### Execution Monitor (`/shopify/monitor`)
- Live monitor dashboard
- Real-time logs
- Performance metrics
- Error tracking
- Agent comparison table
- Pause/Resume controls

## Database Schema

All models are defined in `prisma/schema-opcode-features.prisma`:

- `SEOAgent` - Agent definitions
- `AgentExecution` - Execution history
- `TimelineCheckpoint` - State snapshots
- `UsageEvent` - API usage tracking
- `UsageBudget` - Spending limits
- `AgentMarketplaceListing` - Public agents
- `AgentReview` - User reviews
- `ExecutionMonitor` - Live job tracking

## Cost Estimates

### Typical Costs per Operation

| Operation | Avg Tokens | Avg Cost | Time |
|-----------|-----------|----------|------|
| Product Analysis | 800 | $0.002 | 2s |
| Title Optimization | 600 | $0.002 | 1.5s |
| Meta Description | 700 | $0.002 | 1.5s |
| Alt Text Generation | 400 | $0.001 | 1s |
| Schema.org Generation | 1200 | $0.003 | 2.5s |
| Full SEO Audit | 2000 | $0.005 | 3s |

### Monthly Cost Examples

**Small Store** (50 products):
- Daily automation: $0.10/day = $3/month
- Weekly full audit: $0.25/week = $1/month
- Total: ~$4/month

**Medium Store** (500 products):
- Daily automation: $1/day = $30/month
- Weekly full audit: $2.50/week = $10/month
- Total: ~$40/month

**Large Store** (5000 products):
- Daily automation: $10/day = $300/month
- Weekly full audit: $25/week = $100/month
- Total: ~$400/month

## Best Practices

### Agent Design
1. Start with pre-built templates
2. Test custom agents on small batches
3. Monitor performance before enabling auto-apply
4. Use descriptive names and clear prompts
5. Set appropriate temperature (0.7-0.9 for creative, 0.3-0.5 for technical)

### Checkpoint Strategy
1. Create manual checkpoint before major changes
2. Use milestone checkpoints for achievements
3. Test changes on branches before merging
4. Review checkpoint diffs before rollback
5. Clean up old checkpoints to save storage

### Cost Optimization
1. Set realistic monthly budget
2. Enable all alert thresholds
3. Use batch processing for bulk operations
4. Compare agent performance regularly
5. Review cost reports weekly
6. Optimize prompts to reduce token usage

### Monitoring
1. Check execution monitor daily
2. Review error logs immediately
3. Compare agent performance weekly
4. Pause automation if errors spike
5. Use insights to optimize agents

## Future Enhancements

### Planned Features
- [ ] Agent collaboration (multi-agent workflows)
- [ ] A/B testing framework (compare agent strategies)
- [ ] Predictive cost forecasting
- [ ] Automated agent optimization
- [ ] Team collaboration on agents
- [ ] Agent version control
- [ ] Marketplace paid agents
- [ ] Custom webhooks for monitors
- [ ] Advanced branching strategies
- [ ] Machine learning for cost optimization

### Community Contributions
We welcome contributions for:
- New agent templates
- Performance optimizations
- UI/UX improvements
- Documentation
- Integration guides

## Support

For issues or questions:
- Email: support@seology.ai
- Docs: https://docs.seology.ai/opcode-features
- Discord: https://discord.gg/seology
- GitHub: https://github.com/seology-ai/shopify-app/issues
