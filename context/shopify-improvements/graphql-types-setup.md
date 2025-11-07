# GraphQL Type Generation Setup

**Status**: ✅ Implemented
**Date**: 2025-11-07
**Related**: [03-graphql-migration.md](./03-graphql-migration.md)

## Overview

This document describes the automated GraphQL type generation system for the Shopify Admin API integration. The system uses GraphQL Code Generator to create TypeScript types from Shopify's GraphQL schema, providing full type safety for all GraphQL operations.

## Architecture

### Components

1. **Schema Download Script** (`scripts/download-shopify-schema.js`)
   - Downloads Shopify Admin GraphQL schema via introspection
   - Uses public Shopify API endpoint (no auth required)
   - Saves schema to `graphql.schema.json`

2. **Code Generator Config** (`codegen.yml`)
   - Configures GraphQL Code Generator
   - Specifies schema source and output files
   - Customizes type generation options

3. **Centralized Queries** (`lib/shopify-queries.ts`)
   - Repository of all GraphQL queries and mutations
   - Used across the application for consistency
   - Includes comprehensive documentation

4. **Type-Safe Client** (`lib/shopify-graphql-typed.ts`)
   - Wrapper around base GraphQL client
   - Provides fully typed query/mutation execution
   - Helper functions for GID handling and error management

5. **Generated Types** (`types/shopify-graphql.generated.ts`)
   - Auto-generated TypeScript types (66,000+ lines)
   - Complete type definitions for all Shopify GraphQL types
   - Regenerated when schema updates

## Installation

### Dependencies

The following packages are installed:

```json
{
  "devDependencies": {
    "@graphql-codegen/cli": "^6.0.1",
    "@graphql-codegen/introspection": "^5.0.0",
    "@graphql-codegen/typescript": "^5.0.2",
    "graphql": "^16.12.0"
  },
  "dependencies": {
    "graphql-tag": "^2.12.6"
  }
}
```

## Usage

### 1. Download Schema

```bash
npm run graphql:schema
```

This downloads the Shopify Admin GraphQL schema (API version 2025-10) and saves it to `graphql.schema.json`.

**Output:**
- File: `graphql.schema.json` (~9.2 MB)
- Types: 2,969 GraphQL types
- Version: Shopify Admin API 2025-10

### 2. Generate Types

```bash
npm run graphql:codegen
```

This generates TypeScript types from the schema.

**Output:**
- File: `types/shopify-graphql.generated.ts` (~66,294 lines)
- File: `types/shopify-graphql.schema.json` (introspection result)

### 3. One-Step Generation

```bash
npm run graphql:generate
```

This runs both schema download and type generation in sequence.

### 4. Watch Mode (Optional)

```bash
npm run graphql:watch
```

This runs the code generator in watch mode, regenerating types when files change.

## Type-Safe Queries

### Basic Example

```typescript
import { executeTypedQuery } from '@/lib/shopify-graphql-typed'
import { GET_PRODUCT } from '@/lib/shopify-queries'
import type { Product, ProductSeo } from '@/types/shopify-graphql.generated'

// Execute typed query
const result = await executeTypedQuery<{ product: Product }>(
  connection,
  GET_PRODUCT,
  { id: 'gid://shopify/Product/123' }
)

// result.product is fully typed!
console.log(result.product.title) // ✅ Type-safe
console.log(result.product.seo.description) // ✅ Type-safe
```

### Mutation Example

```typescript
import { executeTypedMutation, throwIfUserErrors } from '@/lib/shopify-graphql-typed'
import { UPDATE_PRODUCT_SEO } from '@/lib/shopify-queries'
import type { ProductUpdateMutation } from '@/types/shopify-graphql.generated'

const result = await executeTypedMutation<ProductUpdateMutation>(
  connection,
  UPDATE_PRODUCT_SEO,
  {
    input: {
      id: 'gid://shopify/Product/123',
      seo: {
        title: 'New SEO Title',
        description: 'New SEO Description'
      }
    }
  }
)

// Check for errors
throwIfUserErrors(result.productUpdate.userErrors)

// Access typed response
console.log(result.productUpdate.product.seo.title)
```

### Using Helper Functions

```typescript
import { buildGID, extractIDFromGID } from '@/lib/shopify-graphql-typed'

// Build Global ID
const gid = buildGID('Product', '123')
// => 'gid://shopify/Product/123'

// Extract numeric ID
const id = extractIDFromGID('gid://shopify/Product/123')
// => '123'

// Idempotent (already a GID)
buildGID('Product', 'gid://shopify/Product/123')
// => 'gid://shopify/Product/123'
```

## Available Queries & Mutations

### Product Operations

- `GET_PRODUCT` - Get single product with SEO data
- `GET_PRODUCTS` - Get multiple products with pagination
- `GET_PRODUCTS_COUNT` - Get total product count
- `SEARCH_PRODUCTS` - Search products by title/handle
- `UPDATE_PRODUCT_SEO` - Update product SEO metadata
- `UPDATE_PRODUCT_DESCRIPTION` - Update product description
- `UPDATE_PRODUCT_IMAGE` - Update product image alt text

### Collection Operations

- `GET_COLLECTION` - Get single collection with SEO data
- `GET_COLLECTIONS` - Get all collections with pagination
- `UPDATE_COLLECTION_SEO` - Update collection SEO metadata

### Page Operations

- `GET_PAGE` - Get single page with SEO data
- `GET_PAGES` - Get all pages with pagination
- `UPDATE_PAGE_SEO` - Update page SEO metadata

### Blog & Article Operations

- `GET_ARTICLE` - Get single article with SEO data
- `GET_BLOGS` - Get all blogs with articles
- `UPDATE_ARTICLE_SEO` - Update article SEO metadata

### Shop Operations

- `GET_SHOP` - Get shop information
- `GET_SHOP_METAFIELDS` - Get shop metafields

### Redirect Operations

- `GET_REDIRECTS` - Get URL redirects
- `CREATE_REDIRECT` - Create URL redirect
- `DELETE_REDIRECT` - Delete URL redirect

### Metafield Operations

- `UPDATE_PRODUCT_METAFIELD` - Update product metafield

## Configuration Details

### codegen.yml

```yaml
overwrite: true

schema:
  - ./graphql.schema.json

generates:
  types/shopify-graphql.generated.ts:
    plugins:
      - typescript
    config:
      skipTypename: false
      enumsAsTypes: true
      futureProofEnums: true
      avoidOptionals: false
      immutableTypes: false
      maybeValue: "T | null | undefined"
      scalars:
        DateTime: string
        Money: string
        Decimal: string
        URL: string
        HTML: string
        JSON: string
      namingConvention:
        typeNames: pascal-case#pascalCase
        enumValues: keep
      useTypeImports: true

  types/shopify-graphql.schema.json:
    plugins:
      - introspection
    config:
      minify: false
```

### Key Configuration Options

- **skipTypename**: `false` - Includes `__typename` in types for runtime type checking
- **enumsAsTypes**: `true` - Uses union types instead of TypeScript enums
- **futureProofEnums**: `true` - Adds unknown option to enums for forward compatibility
- **avoidOptionals**: `false` - Keeps optional fields as optional (more accurate)
- **useTypeImports**: `true` - Uses `import type` for better tree-shaking

### Custom Scalars

The following Shopify-specific scalars are mapped to TypeScript types:

- `DateTime` → `string`
- `Money` → `string`
- `Decimal` → `string`
- `URL` → `string`
- `HTML` → `string`
- `JSON` → `string`

## Integration with Existing Code

### Updating shopify-graphql.ts

The existing `shopify-graphql.ts` file remains unchanged. It provides the base GraphQL client with:

- Rate limiting
- Error handling
- Cost tracking
- Automatic retries

The new `shopify-graphql-typed.ts` wraps this client with type safety.

### Updating API Routes

Before:
```typescript
const result = await shopifyGraphQLWithConnection(connection, query, variables)
// result is 'unknown' - no type safety
```

After:
```typescript
import { executeTypedQuery } from '@/lib/shopify-graphql-typed'
import { GET_PRODUCT } from '@/lib/shopify-queries'
import type { Product } from '@/types/shopify-graphql.generated'

const result = await executeTypedQuery<{ product: Product }>(
  connection,
  GET_PRODUCT,
  variables
)
// result.product is fully typed!
```

## Workflow

### Development Workflow

1. **Add new query** to `lib/shopify-queries.ts`
2. **Import and use** with type-safe client
3. **Specify return type** using generated types
4. **Get autocomplete** and type checking in IDE

### Schema Updates

When Shopify updates their API:

1. Run `npm run graphql:schema` to download new schema
2. Run `npm run graphql:codegen` to regenerate types
3. Fix any TypeScript errors from breaking changes

### CI/CD Integration

Add to build pipeline:

```yaml
# .github/workflows/ci.yml
- name: Generate GraphQL Types
  run: npm run graphql:generate

- name: Type Check
  run: npx tsc --noEmit
```

## Git Configuration

Generated files are excluded from version control:

```gitignore
# GraphQL Code Generator
graphql.schema.json
types/shopify-graphql.generated.ts
types/shopify-graphql.schema.json
```

**Rationale:**
- Schema file is 9+ MB
- Generated types are 66,000+ lines
- Can be regenerated on demand
- Reduces repository size
- Regenerated in CI/CD pipeline

## Benefits

### Type Safety

✅ **Autocomplete** - Full IDE autocomplete for all Shopify types
✅ **Type Checking** - Catch errors at compile time, not runtime
✅ **Refactoring** - Safe refactoring with TypeScript's type system
✅ **Documentation** - Types serve as inline documentation

### Developer Experience

✅ **Centralized Queries** - Single source of truth for all GraphQL operations
✅ **Helper Functions** - Utilities for common tasks (GID handling, error checking)
✅ **Consistent API** - Standardized way to execute GraphQL operations
✅ **Error Messages** - Clear error messages with field information

### Maintenance

✅ **Schema Sync** - Easy to update when Shopify releases new API versions
✅ **Breaking Changes** - TypeScript catches breaking changes immediately
✅ **Self-Documenting** - Generated types include Shopify's documentation

## Troubleshooting

### Schema Download Fails

**Problem**: `npm run graphql:schema` returns an error

**Solution:**
```bash
# Check network connection
curl https://shopify.dev/admin-graphql-direct-proxy/2025-10

# Try manual download
node scripts/download-shopify-schema.js
```

### Types Not Generated

**Problem**: `npm run graphql:codegen` fails

**Solution:**
```bash
# Check schema file exists
ls graphql.schema.json

# Validate schema file
cat graphql.schema.json | jq '.data.__schema.types | length'

# Run with verbose output
npx graphql-codegen --config codegen.yml --verbose
```

### Import Errors

**Problem**: Cannot import from `@/types/shopify-graphql.generated`

**Solution:**
```bash
# Ensure types are generated
npm run graphql:generate

# Check TypeScript configuration
cat tsconfig.json | grep paths

# Restart TypeScript server in VS Code
# CMD/CTRL + Shift + P → "TypeScript: Restart TS Server"
```

## Performance Considerations

### Type File Size

The generated types file is large (~66,294 lines), but this has minimal runtime impact:

- TypeScript types are stripped at runtime
- No increase in bundle size
- Tree-shaking removes unused types
- Only impacts compilation time

### Compilation Time

Initial compilation may be slower, but incremental compilation is fast:

- First compile: ~5-10 seconds longer
- Incremental: No noticeable difference
- Use `tsc --incremental` for faster rebuilds

### IDE Performance

Large type files can slow down IDE:

- Use VS Code with TypeScript 5.0+
- Enable TypeScript project references if needed
- Exclude `types/` from file watchers in IDE settings

## Future Enhancements

### Potential Improvements

1. **Code-First Queries**
   - Use `graphql-tag` for query definitions
   - Generate operation-specific types
   - Better type inference for variables

2. **Fragment Colocation**
   - Define fragments with components
   - Better code organization
   - Automatic fragment composition

3. **Schema Stitching**
   - Combine multiple schemas (Shopify + custom)
   - Unified GraphQL API
   - Single source of truth

4. **Real-Time Updates**
   - Watch mode for schema changes
   - Auto-regenerate on API updates
   - Notification of breaking changes

## References

- [GraphQL Code Generator Docs](https://the-guild.dev/graphql/codegen)
- [Shopify Admin GraphQL API](https://shopify.dev/docs/api/admin-graphql)
- [GraphQL Schema Introspection](https://graphql.org/learn/introspection/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

## Related Files

- `lib/shopify-graphql.ts` - Base GraphQL client
- `lib/shopify-graphql-typed.ts` - Type-safe wrapper
- `lib/shopify-queries.ts` - Query definitions
- `scripts/download-shopify-schema.js` - Schema download script
- `codegen.yml` - Code generator configuration
- `types/shopify-graphql.generated.ts` - Generated types

## Summary

The GraphQL type generation system provides:

1. ✅ **Full type safety** for all Shopify GraphQL operations
2. ✅ **Automated schema updates** via NPM scripts
3. ✅ **Centralized query management** in `lib/shopify-queries.ts`
4. ✅ **Developer-friendly utilities** for common tasks
5. ✅ **CI/CD ready** with automated generation

This setup ensures type-safe, maintainable, and future-proof Shopify API integration.
