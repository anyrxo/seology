# Claude AI Integration - Complete Documentation

## Overview

Comprehensive Claude AI wrapper for SEOLOGY.AI providing SEO analysis and fix generation.

## Core Functions

### analyzeSite - Multi-page Analysis
Analyze multiple pages with prompt caching for efficiency.

### generateFixPlanForIssues - Batch Fix Generation
Generate fixes for multiple issues simultaneously.

### generateFixImplementation - Platform-Specific Code
Create implementation code for Shopify, WordPress, WIX, or custom sites.

### reviewFix - Safety Validation
Review fixes before applying to detect potential risks.

## Usage Example

```typescript
import { analyzeSite, generateFixImplementation, reviewFix } from '@/lib/claude'

// Analyze site
const response = await analyzeSite(siteId, pages)

if (response.success) {
  for (const issue of response.data.issues) {
    // Generate implementation
    const impl = await generateFixImplementation(issue, platform)
    
    // Review for safety
    const review = await reviewFix({
      id: issue.id,
      description: issue.description,
      changes: impl.data.code,
      issueType: issue.type,
      platform
    })
    
    if (review.data.safe) {
      // Apply fix
    }
  }
}
```

## Key Features

- Prompt caching for cost efficiency
- Automatic retry with exponential backoff
- Platform-specific code generation
- Safety validation and risk assessment
- Comprehensive error handling

See lib/claude.ts for complete API reference.
