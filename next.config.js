/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async rewrites() {
    return [
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
