/**
 * Onboarding Step 7: Complete
 */

interface CompleteStepProps {
  onFinish: () => void
}

export function CompleteStep({ onFinish }: CompleteStepProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-6xl mb-6">🎊</div>
      <h1 className="text-4xl font-bold text-white mb-4">
        You're All Set!
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Your SEO automation is now active and working in the background
      </p>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">What happens next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Continuous Scanning
            </h3>
            <p className="text-gray-300">
              SEOLOGY.AI will automatically scan your site daily for new SEO issues
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              AI-Powered Fixes
            </h3>
            <p className="text-gray-300">
              Our AI will generate and apply fixes based on your chosen execution mode
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Real-Time Analytics
            </h3>
            <p className="text-gray-300">
              Track your SEO improvements with detailed analytics and insights
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔔</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Smart Notifications
            </h3>
            <p className="text-gray-300">
              Get notified when critical issues are found or fixes are applied
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left">
        <h3 className="text-lg font-semibold text-white mb-3">Quick tips to get the most out of SEOLOGY.AI:</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Check your dashboard regularly to see new issues and fixes
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Connect more sites to protect your entire web presence
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Review the AI Analysis tab to understand SEO recommendations
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Adjust your execution mode in settings as you get comfortable
          </li>
        </ul>
      </div>

      <button
        onClick={onFinish}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
      >
        Go to Dashboard →
      </button>
    </div>
  )
}
