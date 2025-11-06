/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.myshopify.com',
        pathname: '/cdn/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon/thumbnail sizes
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache images for 30 days
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'], // Tree-shake large packages
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Recharts in separate chunk (large library)
            recharts: {
              name: 'recharts',
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
              priority: 30,
            },
            // Framer Motion in separate chunk
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
            },
          },
        },
      }
    }

    return config
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.shopify.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://api.anthropic.com https://*.myshopify.com https://vercel-insights.com",
              "frame-ancestors 'self' https://*.myshopify.com",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  async rewrites() {
    return [
      // Root homepage
      {
        source: '/',
        destination: '/index.html'
      },
      // Marketing pages (Craflow template - BLACK design)
      {
        source: '/about',
        destination: '/about.html'
      },
      {
        source: '/projects',
        destination: '/projects.html'
      },
      {
        source: '/contact',
        destination: '/contact.html'
      },
      // Dashboard pages (Dashflow template)
      {
        source: '/dashboard',
        destination: '/dashboard/index.html'
      },
      {
        source: '/dashboard/components',
        destination: '/dashboard/components.html'
      },
      {
        source: '/dashboard/search',
        destination: '/dashboard/search.html'
      },
      {
        source: '/dashboard/changelog',
        destination: '/dashboard/changelog.html'
      },
      {
        source: '/dashboard/licenses',
        destination: '/dashboard/licenses.html'
      },
    ]
  },
}

module.exports = nextConfig
