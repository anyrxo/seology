/**
 * Download Shopify Admin GraphQL API Schema
 *
 * This script fetches the GraphQL schema from Shopify's admin API
 * using introspection and saves it to graphql.schema.json
 *
 * Uses the public introspection endpoint (no auth required)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_VERSION = '2025-10';
const SCHEMA_URL = `https://shopify.dev/admin-graphql-direct-proxy/${API_VERSION}`;
const OUTPUT_FILE = path.join(__dirname, '..', 'graphql.schema.json');

// GraphQL introspection query
const INTROSPECTION_QUERY = {
  query: `
    query IntrospectionQuery {
      __schema {
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          description
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      description
      type { ...TypeRef }
      defaultValue
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `
};

console.log('📥 Downloading Shopify Admin GraphQL schema...');
console.log(`   API Version: ${API_VERSION}`);
console.log(`   Endpoint: ${SCHEMA_URL}`);
console.log('');

const postData = JSON.stringify(INTROSPECTION_QUERY);

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = https.request(SCHEMA_URL, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`❌ Error: HTTP ${res.statusCode}`);
      console.error(data);
      process.exit(1);
    }

    try {
      const response = JSON.parse(data);

      if (response.errors) {
        console.error('❌ GraphQL Errors:');
        response.errors.forEach(error => {
          console.error(`   - ${error.message}`);
        });
        process.exit(1);
      }

      if (!response.data || !response.data.__schema) {
        console.error('❌ Invalid schema response');
        console.error(data);
        process.exit(1);
      }

      // Write schema to file
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(response.data, null, 2));

      const stats = fs.statSync(OUTPUT_FILE);
      const fileSizeKB = (stats.size / 1024).toFixed(2);

      console.log('✅ Schema downloaded successfully!');
      console.log(`   File: ${OUTPUT_FILE}`);
      console.log(`   Size: ${fileSizeKB} KB`);
      console.log(`   Types: ${response.data.__schema.types.length}`);
      console.log('');
      console.log('💡 Next steps:');
      console.log('   1. Run "npm run graphql:codegen" to generate TypeScript types');
      console.log('   2. Use generated types in lib/shopify-graphql-typed.ts');
      console.log('');
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      console.error(data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Network error:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();
