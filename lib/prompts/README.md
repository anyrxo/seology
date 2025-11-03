# Claude AI Integration Prompts

This directory contains prompt templates and documentation for the Claude AI integration in SEOLOGY.AI.

## Prompt Structure

All prompts follow a consistent structure:
1. **System Prompt**: Defines Claude's role and expertise
2. **User Prompt**: Provides specific task with structured data
3. **Output Format**: JSON schema for consistent parsing

## Prompt Caching

For efficiency, site context is cached using Claude's prompt caching feature:
- System prompts with site context are marked for caching
- Reduces token usage for repeated analysis
- Cache persists for 5 minutes

## SEO Issue Types

### Critical Issues
- Missing meta titles
- Missing H1 tags
- Broken canonical URLs
- Missing schema markup

### High Priority
- Missing meta descriptions
- Multiple H1 tags
- Broken internal links
- Missing alt text on key images

### Medium Priority
- Suboptimal title length
- Suboptimal description length
- Slow-loading resources
- Poor heading hierarchy

### Low Priority
- Thin content
- Missing external links
- Unoptimized images

## Platform-Specific Code Generation

### Shopify (Liquid)
```liquid
{% comment %} SEO Fix {% endcomment %}
<meta name="description" content="{{ page_description }}">
```

### WordPress (PHP)
```php
// SEO Fix
add_action('wp_head', function() {
    echo '<meta name="description" content="' . esc_attr($description) . '">';
});
```

### Custom (JavaScript)
```javascript
// SEO Fix
document.querySelector('meta[name="description"]')?.setAttribute('content', description);
```

## Safety Guidelines

1. **Never generate destructive operations**
2. **Always include rollback code**
3. **Validate inputs before applying**
4. **Test in staging first (when available)**
5. **Log all changes for audit**

## Testing Prompts

To test prompts locally:

```typescript
import { analyzeSite } from '@/lib/claude'

const pages = [
  {
    url: 'https://example.com',
    title: 'Example Page',
    content: '<html>...</html>',
    metaDescription: 'Example description',
    wordCount: 500
  }
]

const result = await analyzeSite('site-id', pages)
console.log(result)
```
