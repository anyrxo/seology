'use client'

/**
 * Minimal test page to isolate Agents rendering issue
 */

import { AGENT_TEMPLATES } from '@/lib/seo-agent-templates'

export default function AgentsTestPage() {
  const templateKeys = Object.keys(AGENT_TEMPLATES)

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Agents Test Page</h1>
      <p>If you can see this, the page renders successfully!</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Agent Templates Loaded:</h2>
        <ul className="list-disc pl-6">
          {templateKeys.map(key => (
            <li key={key}>{key}: {AGENT_TEMPLATES[key as keyof typeof AGENT_TEMPLATES].name}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
