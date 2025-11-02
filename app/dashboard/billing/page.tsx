import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function BillingPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Usage</h1>
        <p className="text-gray-400">
          Manage your subscription and monitor usage
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-lg p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-white">Free Plan</h2>
              <span className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-xs font-semibold">
                ACTIVE
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Perfect for trying out SEOLOGY.AI
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="text-gray-400">Price:</span>
                <span className="text-white font-semibold ml-2">$0/month</span>
              </div>
              <div>
                <span className="text-gray-400">Renews:</span>
                <span className="text-white font-semibold ml-2">Never</span>
              </div>
            </div>
          </div>
          <a
            href="/pricing.html"
            className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Upgrade Plan
          </a>
        </div>
      </div>

      {/* Usage This Month */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Usage This Month</h2>

        <div className="space-y-6">
          <UsageBar
            label="Sites Connected"
            current={0}
            limit={3}
            unit="sites"
          />

          <UsageBar
            label="Fixes Applied"
            current={0}
            limit={500}
            unit="fixes"
          />
        </div>

        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Usage resets on the 1st of each month. Upgrade to Pro for unlimited sites and fixes.
          </p>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Available Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PlanCard
            name="Free"
            price="$0"
            period="forever"
            features={[
              '3 sites',
              '500 fixes/month',
              'Basic SEO audit',
              'Email support',
              '14-day rollback',
            ]}
            isCurrent={true}
            ctaText="Current Plan"
            ctaDisabled={true}
          />

          <PlanCard
            name="Pro"
            price="$497"
            period="month"
            features={[
              'Unlimited sites',
              'Unlimited fixes',
              'Advanced SEO audit',
              'Priority support',
              '90-day rollback',
              'Custom integrations',
            ]}
            isCurrent={false}
            ctaText="Upgrade to Pro"
            ctaDisabled={false}
            highlighted={true}
          />

          <PlanCard
            name="Enterprise"
            price="Custom"
            period=""
            features={[
              'Everything in Pro',
              'Dedicated account manager',
              'SLA guarantee',
              'White-label reporting',
              'Custom development',
              'On-premise deployment',
            ]}
            isCurrent={false}
            ctaText="Contact Sales"
            ctaDisabled={false}
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Payment Method</h2>

        <div className="text-center py-12">
          <div className="text-5xl mb-4">💳</div>
          <p className="text-gray-400 mb-4">No payment method on file</p>
          <p className="text-sm text-gray-500 mb-6">
            Add a payment method to upgrade to a paid plan
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Billing History</h2>

        <div className="text-center py-12">
          <div className="text-5xl mb-4">📄</div>
          <p className="text-gray-400">No billing history yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Your invoices will appear here
          </p>
        </div>

        {/* Example table when there's history */}
        {/* <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-gray-400 text-sm">
              <tr>
                <th className="text-left px-6 py-3">Invoice</th>
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Amount</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Download</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-800">
                <td className="px-6 py-4 text-white">#INV-001</td>
                <td className="px-6 py-4 text-gray-400">Jan 1, 2025</td>
                <td className="px-6 py-4 text-white">$497.00</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-200">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-blue-300">Download PDF</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  )
}

function UsageBar({
  label,
  current,
  limit,
  unit,
}: {
  label: string
  current: number
  limit: number
  unit: string
}) {
  const percentage = (current / limit) * 100

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className="text-gray-400 text-sm">
          {current} / {limit} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

function PlanCard({
  name,
  price,
  period,
  features,
  isCurrent,
  ctaText,
  ctaDisabled,
  highlighted,
}: {
  name: string
  price: string
  period: string
  features: string[]
  isCurrent: boolean
  ctaText: string
  ctaDisabled: boolean
  highlighted?: boolean
}) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlighted
          ? 'bg-gradient-to-b from-blue-900/50 to-blue-800/50 border-2 border-blue-500'
          : 'bg-gray-800 border border-gray-700'
      }`}
    >
      {highlighted && (
        <div className="text-center mb-4">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          {period && <span className="text-gray-400">/{period}</span>}
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          ctaDisabled
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : highlighted
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
        disabled={ctaDisabled}
      >
        {ctaText}
      </button>
    </div>
  )
}
