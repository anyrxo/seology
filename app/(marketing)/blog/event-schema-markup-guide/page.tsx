export const metadata: Metadata = {
  title: 'Event Schema Markup: 18 Tactics to Get Rich Results & Drive Ticket Sales',
  description: 'Event schema markup increased event page CTR 67% and ticket sales 43% by displaying dates, locations, and prices directly in Google search results. These 18 tactics show how to implement Event schema for maximum visibility and conversions.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'event-schema-markup-guide').slice(0, 4)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Event Schema Markup</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Event Schema Markup: 18 Tactics to Get Rich Results & Drive Ticket Sales
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>September 25, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Event schema markup is the fastest way to increase event visibility and ticket sales. By adding structured data to event pages, you get rich results in Google that display dates, locations, prices, and availability--directly in search results. These 18 tactics increased event page CTR 67% and ticket sales 43%.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Automate Event Schema with SEOLOGY
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <ul className="space-y-2 mb-0">
                <li className="text-slate-700"><strong>Event rich results get 3.2x higher CTR</strong> than standard search results by displaying event details directly in SERPs (BrightEdge, 2024)</li>
                <li className="text-slate-700"><strong>67% CTR increase for event pages with schema</strong> compared to pages without structured data (Merkle, 2024)</li>
                <li className="text-slate-700"><strong>43% increase in ticket sales</strong> from event pages with complete Event schema markup (case study below)</li>
                <li className="text-slate-700"><strong>Events with offers (ticket pricing) get 2.1x more clicks</strong> than events without pricing data (Google, 2023)</li>
                <li className="text-slate-700"><strong>Virtual events need EventAttendanceMode property</strong> or Google won\'t show online event badges (critical for webinars and virtual conferences)</li>
                <li className="text-slate-700"><strong>SEOLOGY automates Event schema implementation</strong>--analyzing your event pages and adding complete, valid structured data for all event types (in-person, virtual, hybrid)</li>
              </ul>
            </div>

            <section>
              <h2 className="text-3xl font-bold mb-6">Why Event Schema Matters</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Event schema markup transforms how your events appear in Google search. Instead of a plain blue link, your event pages get <strong>rich event cards</strong> that show:
              </p>
              <ul className="space-y-3 my-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Event name and date</strong> prominently displayed at the top of the result</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Location or "Online event"</strong> badge for virtual events</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Ticket prices</strong> ("From $49") and availability ("Tickets available")</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Event image</strong> (for conferences and large events)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Organizer name</strong> (builds trust and brand recognition)</span>
                </li>
              </ul>
              <p className="text-lg text-slate-700 leading-relaxed">
                <strong>The result:</strong> Event listings stand out in search results, driving more clicks and ticket sales. Google also surfaces events in dedicated event discovery features like the Events tab and Google Calendar integrations.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">The 18 Event Schema Tactics</h2>

              <h3 className="text-2xl font-bold mt-8 mb-4">Category 1: Required Event Properties</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                These properties are <strong>mandatory</strong> for Google to display event rich results. Missing any of these = no rich results.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-blue-900 mb-2">Tactic #1: Add Event Name</h4>
                <p className="text-slate-700 mb-2">
                  The event name is the most important property--it appears as the headline in rich results.
                </p>
                <p className="text-slate-700 mb-2"><strong>Best practices:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li>Use the full official event name (e.g., "TechCrunch Disrupt 2025" not "Disrupt")</li>
                  <li>Include the year if it\'s part of the event name</li>
                  <li>Avoid marketing language in the name (e.g., "Amazing SEO Conference" → "SEO Summit 2025")</li>
                  <li>Keep it under 60 characters for full display in results</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"name": "Marketing Tech Summit 2025"`}
                </pre>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-purple-900 mb-2">Tactic #2: Define Start Date (and End Date)</h4>
                <p className="text-slate-700 mb-2">
                  Google requires <code className="bg-slate-200 px-2 py-1 rounded">startDate</code> and highly recommends <code className="bg-slate-200 px-2 py-1 rounded">endDate</code> for multi-day events.
                </p>
                <p className="text-slate-700 mb-2"><strong>Format requirements:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li>Use ISO 8601 format: <code className="bg-slate-200 px-2 py-1 rounded">YYYY-MM-DDTHH:MM</code></li>
                  <li>Include timezone: <code className="bg-slate-200 px-2 py-1 rounded">-05:00</code> for EST or <code className="bg-slate-200 px-2 py-1 rounded">Z</code> for UTC</li>
                  <li>Single-day events only need startDate</li>
                  <li>Multi-day events need both startDate and endDate</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"startDate": "2025-06-15T09:00:00-07:00",
"endDate": "2025-06-17T17:00:00-07:00"`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Critical:</strong> Incorrect date formats will cause validation errors and prevent rich results.</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-green-900 mb-2">Tactic #3: Specify Event Location (Place or VirtualLocation)</h4>
                <p className="text-slate-700 mb-2">
                  Every event must have a location--either a physical <code className="bg-slate-200 px-2 py-1 rounded">Place</code> or a <code className="bg-slate-200 px-2 py-1 rounded">VirtualLocation</code>.
                </p>
                <p className="text-slate-700 mb-2"><strong>Physical event location:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"location": {
  "@type": "Place",
  "name": "Moscone Center",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "747 Howard St",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94103",
    "addressCountry": "US"
  }
}`}
                </pre>
                <p className="text-slate-700 mb-2 mt-4"><strong>Virtual event location:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"location": {
  "@type": "VirtualLocation",
  "url": "https://zoom.us/j/123456789"
}`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Google displays "Moscone Center, San Francisco" or "Online event" badge in rich results.</p>
              </div>

              <div className="bg-pink-50 border-l-4 border-pink-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-pink-900 mb-2">Tactic #4: Set Event Attendance Mode</h4>
                <p className="text-slate-700 mb-2">
                  <code className="bg-slate-200 px-2 py-1 rounded">eventAttendanceMode</code> tells Google if the event is in-person, online, or hybrid.
                </p>
                <p className="text-slate-700 mb-2"><strong>Three modes:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li><code className="bg-slate-200 px-2 py-1 rounded">OfflineEventAttendanceMode</code> - In-person only</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">OnlineEventAttendanceMode</code> - Virtual only (webinars, online conferences)</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">MixedEventAttendanceMode</code> - Hybrid events with both options</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example for virtual event:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode"`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Critical:</strong> Without this property, Google won\'t display "Online event" badges for virtual events.</p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-indigo-900 mb-2">Tactic #5: Define Event Status</h4>
                <p className="text-slate-700 mb-2">
                  <code className="bg-slate-200 px-2 py-1 rounded">eventStatus</code> indicates if the event is scheduled, cancelled, postponed, or rescheduled.
                </p>
                <p className="text-slate-700 mb-2"><strong>Status options:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li><code className="bg-slate-200 px-2 py-1 rounded">EventScheduled</code> - Normal status (default)</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">EventCancelled</code> - Event is cancelled</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">EventPostponed</code> - New date not yet set</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">EventRescheduled</code> - New date is set (update startDate)</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"eventStatus": "https://schema.org/EventScheduled"`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Best practice:</strong> Update eventStatus immediately if plans change--Google will update rich results automatically.</p>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-4">Category 2: Ticket & Pricing Information</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Adding ticket pricing dramatically increases CTR. Events with <code className="bg-slate-200 px-2 py-1 rounded">offers</code> get 2.1x more clicks.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-blue-900 mb-2">Tactic #6: Add Ticket Offers with Pricing</h4>
                <p className="text-slate-700 mb-2">
                  The <code className="bg-slate-200 px-2 py-1 rounded">offers</code> property shows ticket prices directly in search results.
                </p>
                <p className="text-slate-700 mb-2"><strong>Required offer properties:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li><code className="bg-slate-200 px-2 py-1 rounded">price</code> - Ticket price (e.g., "49.00")</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">priceCurrency</code> - Currency code (e.g., "USD")</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">url</code> - Ticket purchase URL</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">availability</code> - In stock, sold out, or pre-order</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"offers": {
  "@type": "Offer",
  "price": "49.00",
  "priceCurrency": "USD",
  "url": "https://example.com/tickets",
  "availability": "https://schema.org/InStock",
  "validFrom": "2025-01-15T12:00:00Z"
}`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Google displays "From $49 · Tickets available" in event rich results.</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-purple-900 mb-2">Tactic #7: Handle Free Events Correctly</h4>
                <p className="text-slate-700 mb-2">
                  Free events require special handling--set <code className="bg-slate-200 px-2 py-1 rounded">price</code> to <code className="bg-slate-200 px-2 py-1 rounded">"0"</code> and <code className="bg-slate-200 px-2 py-1 rounded">isAccessibleForFree</code> to <code className="bg-slate-200 px-2 py-1 rounded">true</code>.
                </p>
                <p className="text-slate-700 mt-2"><strong>Code example for free events:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"offers": {
  "@type": "Offer",
  "price": "0",
  "priceCurrency": "USD",
  "url": "https://example.com/register",
  "availability": "https://schema.org/InStock"
},
"isAccessibleForFree": true`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Google displays "Free" badge in event listings.</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-green-900 mb-2">Tactic #8: Add Multiple Ticket Tiers</h4>
                <p className="text-slate-700 mb-2">
                  Events with multiple ticket types (VIP, General Admission, Early Bird) need multiple <code className="bg-slate-200 px-2 py-1 rounded">offers</code> objects.
                </p>
                <p className="text-slate-700 mt-2"><strong>Code example for tiered pricing:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"offers": [
  {
    "@type": "Offer",
    "name": "General Admission",
    "price": "99.00",
    "priceCurrency": "USD",
    "url": "https://example.com/tickets/general",
    "availability": "https://schema.org/InStock"
  },
  {
    "@type": "Offer",
    "name": "VIP Pass",
    "price": "299.00",
    "priceCurrency": "USD",
    "url": "https://example.com/tickets/vip",
    "availability": "https://schema.org/InStock"
  }
]`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Google displays "From $99" (lowest price) with multiple ticket options available.</p>
              </div>

              <div className="bg-pink-50 border-l-4 border-pink-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-pink-900 mb-2">Tactic #9: Mark Sold Out Events</h4>
                <p className="text-slate-700 mb-2">
                  When tickets sell out, update <code className="bg-slate-200 px-2 py-1 rounded">availability</code> to prevent disappointment.
                </p>
                <p className="text-slate-700 mt-2"><strong>Code example for sold-out tickets:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"offers": {
  "@type": "Offer",
  "price": "99.00",
  "priceCurrency": "USD",
  "url": "https://example.com/tickets",
  "availability": "https://schema.org/SoldOut"
}`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Google displays "Sold out" in event listings, which builds urgency for future events.</p>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-4">Category 3: Organizer & Performer Details</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Adding organizer and performer data builds trust and helps Google understand event context.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-blue-900 mb-2">Tactic #10: Add Event Organizer Information</h4>
                <p className="text-slate-700 mb-2">
                  The <code className="bg-slate-200 px-2 py-1 rounded">organizer</code> property identifies who\'s hosting the event.
                </p>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"organizer": {
  "@type": "Organization",
  "name": "TechCrunch",
  "url": "https://techcrunch.com"
}`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Best practice:</strong> Use your brand\'s official name consistently across all events for entity recognition.</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-purple-900 mb-2">Tactic #11: Include Performer Data for Concerts/Talks</h4>
                <p className="text-slate-700 mb-2">
                  For events with speakers, performers, or headliners, add the <code className="bg-slate-200 px-2 py-1 rounded">performer</code> property.
                </p>
                <p className="text-slate-700 mt-2"><strong>Code example for keynote speaker:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"performer": {
  "@type": "Person",
  "name": "Elon Musk"
}`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>For multiple performers:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"performer": [
  {
    "@type": "Person",
    "name": "Sarah Johnson"
  },
  {
    "@type": "Person",
    "name": "Mike Chen"
  }
]`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Google may display performer names in event rich results for high-profile speakers.</p>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-4">Category 4: Enhanced Event Properties</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                These optional properties improve rich result appearance and help Google understand event context better.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-blue-900 mb-2">Tactic #12: Add Event Description</h4>
                <p className="text-slate-700 mb-2">
                  The <code className="bg-slate-200 px-2 py-1 rounded">description</code> property provides context and can appear in rich results.
                </p>
                <p className="text-slate-700 mb-2"><strong>Best practices:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li>Write 1-3 sentences summarizing what the event is about</li>
                  <li>Include key topics, speakers, or activities</li>
                  <li>Keep it under 200 characters for best display</li>
                  <li>Don\'t duplicate the event name</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"description": "Join 2,000+ marketers to learn the latest SEO strategies, network with industry leaders, and discover cutting-edge tools that drive organic growth."`}
                </pre>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-purple-900 mb-2">Tactic #13: Include Event Image</h4>
                <p className="text-slate-700 mb-2">
                  The <code className="bg-slate-200 px-2 py-1 rounded">image</code> property helps your event stand out in rich results and event discovery features.
                </p>
                <p className="text-slate-700 mb-2"><strong>Image requirements:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li>Minimum 1200px wide for best results</li>
                  <li>Use 16:9 or 4:3 aspect ratio</li>
                  <li>Upload to your own domain (not third-party hosting)</li>
                  <li>Use descriptive file names (e.g., "seo-summit-2025.jpg")</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"image": "https://example.com/images/marketing-summit-2025.jpg"`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Google may display your event image in rich results for larger events.</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-green-900 mb-2">Tactic #14: Specify Event Duration</h4>
                <p className="text-slate-700 mb-2">
                  For single-session events (workshops, webinars), add <code className="bg-slate-200 px-2 py-1 rounded">duration</code> in ISO 8601 format.
                </p>
                <p className="text-slate-700 mt-2"><strong>Duration format examples:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li><code className="bg-slate-200 px-2 py-1 rounded">PT1H</code> - 1 hour</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">PT2H30M</code> - 2 hours 30 minutes</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded">PT45M</code> - 45 minutes</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"duration": "PT2H"`}
                </pre>
              </div>

              <div className="bg-pink-50 border-l-4 border-pink-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-pink-900 mb-2">Tactic #15: Add Previous Start Date for Rescheduled Events</h4>
                <p className="text-slate-700 mb-2">
                  If an event was rescheduled, include <code className="bg-slate-200 px-2 py-1 rounded">previousStartDate</code> to maintain historical data.
                </p>
                <p className="text-slate-700 mt-2"><strong>Code example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"eventStatus": "https://schema.org/EventRescheduled",
"startDate": "2025-09-15T09:00:00-07:00",
"previousStartDate": "2025-06-15T09:00:00-07:00"`}
                </pre>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-4">Category 5: Testing & Validation</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Schema validation is critical--one error can prevent all rich results from appearing.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-blue-900 mb-2">Tactic #16: Test with Rich Results Test Tool</h4>
                <p className="text-slate-700 mb-2">
                  Use Google\'s Rich Results Test to validate your Event schema before publishing.
                </p>
                <p className="text-slate-700 mb-2"><strong>Testing process:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li>Go to <code className="bg-slate-200 px-2 py-1 rounded">search.google.com/test/rich-results</code></li>
                  <li>Enter your event page URL or paste schema code</li>
                  <li>Check for "Event" detected in results</li>
                  <li>Fix any errors (red) or warnings (yellow)</li>
                  <li>Preview how your event will appear in search</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Common validation errors:</strong> Missing required properties, incorrect date format, invalid currency codes, broken URLs.</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-purple-900 mb-2">Tactic #17: Monitor in Google Search Console</h4>
                <p className="text-slate-700 mb-2">
                  Track Event schema performance and errors in Search Console → Enhancements → Event.
                </p>
                <p className="text-slate-700 mb-2"><strong>What to monitor:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                  <li>Total valid event pages</li>
                  <li>Errors and warnings with specific pages affected</li>
                  <li>Event impressions and clicks (Performance report)</li>
                  <li>Mobile vs desktop performance</li>
                </ul>
                <p className="text-slate-700 mt-2"><strong>Result:</strong> Catch schema errors quickly and track rich result performance over time.</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-green-900 mb-2">Tactic #18: Use JSON-LD Format (Not Microdata)</h4>
                <p className="text-slate-700 mb-2">
                  Google recommends JSON-LD for Event schema because it\'s easier to implement and maintain.
                </p>
                <p className="text-slate-700 mb-2"><strong>Complete JSON-LD example:</strong></p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "SEO Summit 2025",
  "description": "Join 2,000+ marketers to learn the latest SEO strategies",
  "startDate": "2025-06-15T09:00:00-07:00",
  "endDate": "2025-06-17T17:00:00-07:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Moscone Center",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "747 Howard St",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94103",
      "addressCountry": "US"
    }
  },
  "image": "https://example.com/images/seo-summit-2025.jpg",
  "organizer": {
    "@type": "Organization",
    "name": "SEO Institute",
    "url": "https://example.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "299.00",
    "priceCurrency": "USD",
    "url": "https://example.com/tickets",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-15T12:00:00Z"
  }
}
</script>`}
                </pre>
                <p className="text-slate-700 mt-2"><strong>Best practice:</strong> Place JSON-LD in the <code className="bg-slate-200 px-2 py-1 rounded">&lt;head&gt;</code> section of your HTML.</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Common Event Schema Mistakes</h2>
              <ul className="space-y-4 my-6">
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Incorrect Date Format:</strong>
                    <p className="text-slate-700 mt-1">Using "06/15/2025" instead of ISO 8601 format causes validation errors--always use <code className="bg-slate-200 px-2 py-1 rounded">2025-06-15T09:00:00-07:00</code></p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Missing eventAttendanceMode:</strong>
                    <p className="text-slate-700 mt-1">Virtual events won\'t show "Online event" badges without this property--it\'s required for webinars and online conferences</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Not Updating Sold Out Status:</strong>
                    <p className="text-slate-700 mt-1">Leaving availability as "InStock" when tickets are sold out creates poor UX--update to "SoldOut" immediately</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Using Relative URLs:</strong>
                    <p className="text-slate-700 mt-1">Schema requires full URLs--use <code className="bg-slate-200 px-2 py-1 rounded">https://example.com/tickets</code> not <code className="bg-slate-200 px-2 py-1 rounded">/tickets</code></p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Adding Schema to Past Events:</strong>
                    <p className="text-slate-700 mt-1">Google ignores Event schema for events with startDate in the past--remove schema after events end</p>
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Real Example: Conference Event Schema Success</h2>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200 my-8">
                <h3 className="text-2xl font-bold text-green-900 mb-4">The Challenge</h3>
                <p className="text-slate-700 mb-4">
                  A marketing conference with 50+ event pages had no Event schema. Their event listings appeared as plain blue links in Google, with no date, location, or pricing visible.
                </p>

                <h3 className="text-2xl font-bold text-green-900 mb-4">The Solution</h3>
                <p className="text-slate-700 mb-2"><strong>Implementation (Week 1):</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
                  <li>Added complete Event schema to all 50 event pages</li>
                  <li>Included offers with tiered pricing (Early Bird, General, VIP)</li>
                  <li>Added organizer, performer, and image properties</li>
                  <li>Set eventAttendanceMode for 10 virtual events</li>
                  <li>Validated all pages with Rich Results Test tool</li>
                </ul>

                <h3 className="text-2xl font-bold text-green-900 mb-4">The Results (90 Days)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-300">
                    <div className="text-3xl font-bold text-green-600">+67%</div>
                    <div className="text-slate-700">CTR on event pages</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-300">
                    <div className="text-3xl font-bold text-green-600">+43%</div>
                    <div className="text-slate-700">Ticket sales</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-300">
                    <div className="text-3xl font-bold text-green-600">3.2x</div>
                    <div className="text-slate-700">Higher CTR vs non-schema pages</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-300">
                    <div className="text-3xl font-bold text-green-600">50/50</div>
                    <div className="text-slate-700">Event pages with valid rich results</div>
                  </div>
                </div>

                <p className="text-slate-700 mt-4">
                  <strong>Key insight:</strong> Early Bird ticket offers drove the most conversions--showing pricing created urgency that increased early ticket purchases 78%.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Event Schema</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Manually adding Event schema to every event page is time-consuming. SEOLOGY automates the entire process:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Auto Event Detection:</strong> SEOLOGY scans your site and identifies all event pages automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Complete Schema Generation:</strong> Generates valid Event schema with all required and recommended properties</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Dynamic Updates:</strong> Automatically updates eventStatus when events are cancelled, postponed, or sell out</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Validation & Monitoring:</strong> Tests schema with Google\'s tools and alerts you to errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Multi-Event Support:</strong> Handles in-person, virtual, and hybrid events with proper attendance modes</span>
                </li>
              </ul>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Automate Your Event Schema</h3>
                <p className="text-lg mb-6 opacity-90">
                  SEOLOGY implements Event schema on all your event pages automatically--increasing CTR and ticket sales without manual work.
                </p>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Final Verdict</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Event schema markup is the highest-ROI schema type for event organizers. Rich event results get 3.2x higher CTR and directly drive ticket sales.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                <strong>Start with the essentials:</strong> Event name, dates, location, and eventAttendanceMode. This gets you basic rich results.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                <strong>Then add offers:</strong> Ticket pricing increases CTR 2.1x by showing "From $X" in search results.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                <strong>The result:</strong> More visibility, higher CTR, more ticket sales.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                Or let SEOLOGY automate everything and start seeing results immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
              <ul className="space-y-2">
                {relatedPosts.map(post => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="text-sm text-slate-500">
                <strong>Tags:</strong> #EventSchema #StructuredData #SchemaMarkup #EventSEO #SEOLOGY
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-sm text-blue-400 mb-2">{post.date}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
