'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MobileButton } from '@/components/mobile/MobileButton'
import { Skeleton, CardSkeleton } from '@/components/mobile/Skeleton'
import { EmptyState } from '@/components/mobile/EmptyState'
import { OptimizedImage, MobileAvatar } from '@/components/mobile/OptimizedImage'
import { useHaptic } from '@/lib/hooks/use-haptic'
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
  const {success, error: errorHaptic } = useHaptic()

  const [repositories, setRepositories] = useState<GitHubRepository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPagesOnly, setFilterPagesOnly] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null)

  useEffect(() => {
    // Get session data from URL
    const session = searchParams.get('session')
    if (!session) {
      setError('Invalid session. Please try connecting again.')
      setIsLoading(false)
      return
    }

    try {
      const decoded = JSON.parse(Buffer.from(session, 'base64').toString('utf-8'))

      // Check session expiry (10 minutes)
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
  }, [searchParams])

  const fetchRepositories = async (accessToken: string) => {
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
      errorHaptic()
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

      success()

      // Redirect to site page
      router.push(`/dashboard/sites/${data.connection.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect repository')
      errorHaptic()
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

  if (error && !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <EmptyState
          icon={AlertCircle}
          title="Connection Error"
          description={error}
          action={{
            label: 'Try Again',
            onClick: () => router.push('/dashboard/sites/connect'),
          }}
          variant="warning"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Select Repository
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Choose a repository to connect to SEOLOGY.AI
              </p>
            </div>
          </div>

          {sessionData?.githubUser && (
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <MobileAvatar
                src={sessionData.githubUser.avatar_url}
                alt={sessionData.githubUser.login}
                size={40}
              />
              <div>
                <p className="text-white font-semibold">
                  {sessionData.githubUser.name || sessionData.githubUser.login}
                </p>
                <p className="text-gray-400 text-sm">@{sessionData.githubUser.login}</p>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => {
              setFilterPagesOnly(!filterPagesOnly)
              if (sessionData) {
                setIsLoading(true)
                fetchRepositories(sessionData.accessToken)
              }
            }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl transition-all
              ${filterPagesOnly
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
              }
            `}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Show only sites with GitHub Pages</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredRepositories.length === 0 && (
          <EmptyState
            icon={Github}
            title="No repositories found"
            description={
              searchQuery
                ? 'Try a different search term'
                : filterPagesOnly
                ? 'No repositories with GitHub Pages found. Disable the filter to see all repositories.'
                : 'No repositories available'
            }
            variant="default"
          />
        )}

        {/* Repository List */}
        {!isLoading && filteredRepositories.length > 0 && (
          <div className="space-y-4">
            {filteredRepositories.map((repo) => (
              <div
                key={repo.id}
                className="card bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all p-5 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <MobileAvatar
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    size={48}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {repo.name}
                      </h3>
                      {repo.private && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-900/30 text-yellow-400 rounded border border-yellow-500/30">
                          Private
                        </span>
                      )}
                      {repo.has_pages && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded border border-green-500/30">
                          Pages
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {repo.description || 'No description'}
                    </p>

                    {/* Website URL */}
                    {repo.detected_url && (
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <a
                          href={repo.detected_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-sm hover:underline flex items-center gap-1"
                        >
                          {repo.detected_url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>

                    {repo.detected_url ? (
                      <MobileButton
                        variant="primary"
                        size="md"
                        icon={Check}
                        onClick={() => handleConnect(repo)}
                        loading={isConnecting && selectedRepo?.id === repo.id}
                        disabled={isConnecting}
                        fullWidth
                      >
                        Connect Repository
                      </MobileButton>
                    ) : (
                      <div className="flex items-start gap-2 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-yellow-400 text-sm font-medium">
                            No website URL detected
                          </p>
                          <p className="text-yellow-300/70 text-xs mt-1">
                            Enable GitHub Pages or set a homepage URL to connect this repository
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && sessionData && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium">Error</p>
                <p className="text-red-300/70 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
