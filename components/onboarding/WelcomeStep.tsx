/**
 * Onboarding Step 1: Welcome
 */

interface WelcomeStepProps {
  userName: string
  onNext: () => void
}

export function WelcomeStep({ userName, onNext }: WelcomeStepProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-6xl mb-6">🚀</div>
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to SEOLOGY.AI, {userName}!
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        The world's first AI-powered SEO automation platform that actually fixes issues for you—not just reports them.
      </p>

      <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left">
        <h2 className="text-lg font-semibold text-white mb-4">What you'll do in this quick setup:</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">1.</span>
            <span>Connect your first website (Shopify, WordPress, or any site)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">2.</span>
            <span>Let Claude AI scan and analyze your SEO</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">3.</span>
            <span>Choose how you want fixes applied (automatic or manual approval)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">4.</span>
            <span>Watch your first SEO issue get fixed automatically</span>
          </li>
        </ul>
      </div>

      <button
        onClick={onNext}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
      >
        Let's Get Started →
      </button>

      <p className="text-sm text-gray-500 mt-6">Takes about 5 minutes</p>
    </div>
  )
}
