'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Globe,
  Star,
  GitFork,
  Check,
  AlertCircle,
  Search,
  Filter,
  ExternalLink,
  Lock,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react'

interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
  html_url: string
  homepage: string | null
  has_pages: boolean
  default_branch: string
  stargazers_count: number
  forks_count: number
  owner: {
    login: string
    avatar_url: string
  }
  detected_url: string | null
}

interface SessionData {
  accessToken: string
  githubUser: {
    login: string
    id: number
    avatar_url: string
    name: string | null
  }
  userId: string
  timestamp: number
}

export default function GitHubRepositorySelector() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [repositories, setRepositories] = useState<GitHubRepository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPagesOnly, setFilterPagesOnly] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    const session = searchParams.get('session')
    if (!session) {
      setError('Invalid session. Please try connecting again.')
      setIsLoading(false)
      return
    }

    try {
      const decoded = JSON.parse(Buffer.from(session, 'base64').toString('utf-8'))

      if (Date.now() - decoded.timestamp > 10 * 60 * 1000) {
        setError('Session expired. Please try connecting again.')
        setIsLoading(false)
        return
      }

      setSessionData(decoded)
      fetchRepositories(decoded.accessToken)
    } catch (err) {
      setError('Invalid session data')
      setIsLoading(false)
    }
  }, [searchParams, filterPagesOnly])

  const fetchRepositories = async (accessToken: string) => {
    setIsLoading(true)
    try {
      const url = new URL('/api/github/repositories', window.location.origin)
      url.searchParams.set('accessToken', accessToken)
      if (filterPagesOnly) {
        url.searchParams.set('pagesOnly', 'true')
      }

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch repositories')
      }

      setRepositories(data.repositories)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load repositories')
      setIsLoading(false)
    }
  }

  const handleConnect = async (repo: GitHubRepository) => {
    if (!sessionData) return

    setIsConnecting(true)
    setSelectedRepo(repo)

    try {
      const response = await fetch('/api/github/repositories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repository: repo,
          accessToken: sessionData.accessToken,
          githubUser: sessionData.githubUser,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect repository')
      }

      router.push(`/dashboard/sites/${data.connection.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect repository')
      setIsConnecting(false)
      setSelectedRepo(null)
    }
  }

  const filteredRepositories = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.full_name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = !filterPagesOnly || repo.has_pages || repo.homepage

    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredRepositories.length / itemsPerPage)
  const paginatedRepositories = filteredRepositories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (error && !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-red-900/20 border border-red-500/50 rounded-2xl p-8 text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connection Error</h2>
          <p className="text-red-300 mb-6">{error}</p>
          <button
            onClick={() => router.push('/dashboard/sites/connect')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push('/dashboard/sites/connect')}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Platform Selection
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600">
              <Github className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Select Repository
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Choose a repository to connect to SEOLOGY.AI
              </p>
            </div>
          </div>

          {sessionData?.githubUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 px-4 py-3 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
            >
              <img
                src={sessionData.githubUser.avatar_url}
                alt={sessionData.githubUser.login}
                className="w-10 h-10 rounded-full border-2 border-purple-500/50"
              />
              <div>
                <p className="text-white font-semibold">
                  {sessionData.githubUser.name || sessionData.githubUser.login}
                </p>
                <p className="text-gray-400 text-sm">@{sessionData.githubUser.login}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 space-y-3"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search repositories by name or description..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={() => {
              setFilterPagesOnly(!filterPagesOnly)
              setCurrentPage(1)
            }}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium
              ${filterPagesOnly
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-800/30 backdrop-blur-sm text-gray-300 hover:bg-gray-800/50 border border-gray-700/50'
              }
            `}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Show only repositories with websites</span>
            {filterPagesOnly && <Check className="w-4 h-4 ml-1" />}
          </button>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2" />
                <div className="h-3 bg-gray-700 rounded w-2/3" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredRepositories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center"
          >
            <Github className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No repositories found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? 'Try a different search term'
                : filterPagesOnly
                ? 'No repositories with websites found. Disable the filter to see all repositories.'
                : 'No repositories available'}
            </p>
            {(searchQuery || filterPagesOnly) && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterPagesOnly(false)
                  setCurrentPage(1)
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* Repository Grid */}
        {!isLoading && paginatedRepositories.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {paginatedRepositories.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 rounded-xl p-6 transition-all group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      className="w-12 h-12 rounded-full border-2 border-gray-700 group-hover:border-blue-500/50 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                          {repo.name}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-xs truncate">{repo.owner.login}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {repo.private && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-900/30 text-yellow-400 rounded border border-yellow-500/30">
                        <Lock className="w-3 h-3" />
                        Private
                      </span>
                    )}
                    {repo.has_pages && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded border border-green-500/30">
                        <Sparkles className="w-3 h-3" />
                        Pages
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {repo.description || 'No description'}
                  </p>

                  {repo.detected_url && (
                    <div className="flex items-center gap-2 mb-4 p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <a
                        href={repo.detected_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs hover:underline flex items-center gap-1 truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="truncate">{repo.detected_url}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{repo.forks_count.toLocaleString()}</span>
                    </div>
                  </div>

                  {repo.detected_url ? (
                    <button
                      onClick={() => handleConnect(repo)}
                      disabled={isConnecting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
                    >
                      {isConnecting && selectedRepo?.id === repo.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Connect Repository
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-start gap-2 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-400 text-sm font-medium">
                          No website URL detected
                        </p>
                        <p className="text-yellow-300/70 text-xs mt-1">
                          Enable GitHub Pages or set a homepage URL
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`
                            w-10 h-10 rounded-lg font-semibold transition-all
                            ${page === currentPage
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:bg-gray-800/50'
                            }
                          `}
                        >
                          {page}
                        </button>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="text-gray-500">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Error Message */}
        {error && sessionData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium">Error</p>
                <p className="text-red-300/70 text-sm mt-1">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
