/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
    ],
    webpackBuildWorker: true,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      // Don't bundle Puppeteer on client side
      config.resolve.alias = {
        ...config.resolve.alias,
        puppeteer: false,
      }
    }

    // Bundle analyzer in development
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
        })
      )
    }

    return config
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/images/:all*(svg|jpg|jpeg|png|gif|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/js/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  async rewrites() {
    return [
      // Root homepage
      {
        source: '/',
        destination: '/index.html',
      },
      // Marketing pages (Craflow template - BLACK design)
      {
        source: '/about',
        destination: '/about.html',
      },
      {
        source: '/projects',
        destination: '/projects.html',
      },
      {
        source: '/contact',
        destination: '/contact.html',
      },
      // Dashboard pages (Dashflow template)
      {
        source: '/dashboard',
        destination: '/dashboard/index.html',
      },
      {
        source: '/dashboard/components',
        destination: '/dashboard/components.html',
      },
      {
        source: '/dashboard/search',
        destination: '/dashboard/search.html',
      },
      {
        source: '/dashboard/changelog',
        destination: '/dashboard/changelog.html',
      },
      {
        source: '/dashboard/licenses',
        destination: '/dashboard/licenses.html',
      },
    ]
  },
}

module.exports = nextConfig
