/**
 * Shopify Admin GraphQL Queries & Mutations
 *
 * Centralized repository of all GraphQL operations used in the app.
 * Use these queries with the type-safe client in lib/shopify-graphql-typed.ts
 *
 * Documentation: context/shopify-docs/07-admin-graphql-api.md
 */

// =============================================================================
// PRODUCT QUERIES
// =============================================================================

/**
 * Get a single product with SEO data
 */
export const GET_PRODUCT = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      descriptionHtml
      status
      vendor
      productType
      tags
      createdAt
      updatedAt
      seo {
        title
        description
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            sku
            price
          }
        }
      }
    }
  }
`;

/**
 * Get multiple products with pagination
 */
export const GET_PRODUCTS = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          status
          vendor
          createdAt
          seo {
            title
            description
          }
          images(first: 1) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * Get products count
 */
export const GET_PRODUCTS_COUNT = `
  query GetProductsCount {
    productsCount {
      count
    }
  }
`;

/**
 * Search products by title or handle
 */
export const SEARCH_PRODUCTS = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          seo {
            title
            description
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

// =============================================================================
// COLLECTION QUERIES
// =============================================================================

/**
 * Get a single collection with SEO data
 */
export const GET_COLLECTION = `
  query GetCollection($id: ID!) {
    collection(id: $id) {
      id
      title
      handle
      descriptionHtml
      seo {
        title
        description
      }
      image {
        id
        url
        altText
      }
      productsCount
    }
  }
`;

/**
 * Get all collections
 */
export const GET_COLLECTIONS = `
  query GetCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          seo {
            title
            description
          }
          productsCount
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// =============================================================================
// PAGE QUERIES
// =============================================================================

/**
 * Get a single page with SEO data
 */
export const GET_PAGE = `
  query GetPage($id: ID!) {
    page(id: $id) {
      id
      title
      handle
      body
      bodySummary
      seo {
        title
        description
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * Get all pages
 */
export const GET_PAGES = `
  query GetPages($first: Int!, $after: String) {
    pages(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          bodySummary
          seo {
            title
            description
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// =============================================================================
// BLOG & ARTICLE QUERIES
// =============================================================================

/**
 * Get a single article with SEO data
 */
export const GET_ARTICLE = `
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      handle
      contentHtml
      excerpt
      seo {
        title
        description
      }
      image {
        id
        url
        altText
      }
      blog {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * Get all blogs with articles
 */
export const GET_BLOGS = `
  query GetBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          title
          handle
          articles(first: 10) {
            edges {
              node {
                id
                title
                handle
                seo {
                  title
                  description
                }
              }
            }
          }
        }
      }
    }
  }
`;

// =============================================================================
// SHOP QUERIES
// =============================================================================

/**
 * Get shop information
 */
export const GET_SHOP = `
  query GetShop {
    shop {
      id
      name
      email
      description
      contactEmail
      url
      primaryDomain {
        host
        url
      }
      plan {
        displayName
        partnerDevelopment
        shopifyPlus
      }
      features {
        multiLocation
        storefront
      }
    }
  }
`;

/**
 * Get shop metafields
 */
export const GET_SHOP_METAFIELDS = `
  query GetShopMetafields($first: Int!) {
    shop {
      metafields(first: $first) {
        edges {
          node {
            id
            namespace
            key
            value
            type
          }
        }
      }
    }
  }
`;

// =============================================================================
// REDIRECT QUERIES
// =============================================================================

/**
 * Get URL redirects
 */
export const GET_REDIRECTS = `
  query GetRedirects($first: Int!, $after: String) {
    urlRedirects(first: $first, after: $after) {
      edges {
        node {
          id
          path
          target
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// =============================================================================
// PRODUCT MUTATIONS
// =============================================================================

/**
 * Update product SEO metadata
 */
export const UPDATE_PRODUCT_SEO = `
  mutation UpdateProductSEO($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
        seo {
          title
          description
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Update product description
 */
export const UPDATE_PRODUCT_DESCRIPTION = `
  mutation UpdateProductDescription($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        descriptionHtml
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Update product image alt text
 */
export const UPDATE_PRODUCT_IMAGE = `
  mutation UpdateProductImage($productId: ID!, $image: ImageInput!) {
    productUpdate(input: { id: $productId, images: [$image] }) {
      product {
        id
        images(first: 10) {
          edges {
            node {
              id
              altText
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// =============================================================================
// COLLECTION MUTATIONS
// =============================================================================

/**
 * Update collection SEO metadata
 */
export const UPDATE_COLLECTION_SEO = `
  mutation UpdateCollectionSEO($input: CollectionInput!) {
    collectionUpdate(input: $input) {
      collection {
        id
        title
        seo {
          title
          description
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// =============================================================================
// PAGE MUTATIONS
// =============================================================================

/**
 * Update page SEO metadata
 */
export const UPDATE_PAGE_SEO = `
  mutation UpdatePageSEO($input: PageInput!) {
    pageUpdate(input: $input) {
      page {
        id
        title
        seo {
          title
          description
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// =============================================================================
// ARTICLE MUTATIONS
// =============================================================================

/**
 * Update article SEO metadata
 */
export const UPDATE_ARTICLE_SEO = `
  mutation UpdateArticleSEO($input: ArticleUpdateInput!) {
    articleUpdate(input: $input) {
      article {
        id
        title
        seo {
          title
          description
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// =============================================================================
// REDIRECT MUTATIONS
// =============================================================================

/**
 * Create URL redirect
 */
export const CREATE_REDIRECT = `
  mutation CreateRedirect($redirect: UrlRedirectInput!) {
    urlRedirectCreate(urlRedirect: $redirect) {
      urlRedirect {
        id
        path
        target
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Delete URL redirect
 */
export const DELETE_REDIRECT = `
  mutation DeleteRedirect($id: ID!) {
    urlRedirectDelete(id: $id) {
      deletedUrlRedirectId
      userErrors {
        field
        message
      }
    }
  }
`;

// =============================================================================
// METAFIELD MUTATIONS
// =============================================================================

/**
 * Update product metafield
 */
export const UPDATE_PRODUCT_METAFIELD = `
  mutation UpdateProductMetafield($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        id
        namespace
        key
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`;
