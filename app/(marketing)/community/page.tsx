import { Metadata } from 'next'
import { Users, MessageCircle, Video, Calendar, BookOpen, Award, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community - SEOLOGY.AI',
  description: 'Join the SEOLOGY.AI community. Connect with SEO professionals, share insights, attend events, and learn from experts.',
}

export default function CommunityPage() {
  const communityFeatures = [
    {
      icon: MessageCircle,
      title: 'Discussion Forums',
      description: 'Connect with 5,000+ SEO professionals, ask questions, and share your wins.',
      stats: '50K+ discussions',
      link: '#forums',
    },
    {
      icon: Video,
      title: 'Weekly Webinars',
      description: 'Live training sessions with SEO experts covering advanced strategies and tactics.',
      stats: 'Every Thursday 2PM EST',
      link: '#webinars',
    },
    {
      icon: Calendar,
      title: 'Virtual Events',
      description: 'Monthly virtual conferences, workshops, and networking events.',
      stats: 'Next event: Feb 15',
      link: '#events',
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access 200+ guides, templates, and case studies from successful stores.',
      stats: '200+ resources',
      link: '#resources',
    },
  ]

  const upcomingEvents = [
    {
      date: 'Feb 15, 2025',
      time: '2:00 PM EST',
      title: 'Advanced Technical SEO for E-commerce',
      speaker: 'Sarah Chen, Head of SEO at Shopify',
      attendees: 847,
      type: 'Webinar',
    },
    {
      date: 'Feb 22, 2025',
      time: '3:00 PM EST',
      title: 'AI-Powered Content Strategy Workshop',
      speaker: 'Marcus Rodriguez, Content Director',
      attendees: 623,
      type: 'Workshop',
    },
    {
      date: 'Mar 1, 2025',
      time: '12:00 PM EST',
      title: 'SEO Automation Summit 2025',
      speaker: 'Multiple industry experts',
      attendees: 2100,
      type: 'Conference',
    },
  ]

  const topContributors = [
    { name: 'Alex Morgan', role: 'E-commerce SEO Expert', contributions: 1240, badge: '🏆' },
    { name: 'Jamie Lee', role: 'Technical SEO Specialist', contributions: 987, badge: '🥈' },
    { name: 'Sam Williams', role: 'Content Strategist', contributions: 756, badge: '🥉' },
  ]

  const featuredDiscussions = [
    {
      title: 'How I increased organic traffic by 400% in 3 months',
      author: 'Sarah K.',
      replies: 234,
      views: 12000,
      category: 'Success Stories',
    },
    {
      title: 'Best practices for schema markup in 2025',
      author: 'Mike R.',
      replies: 156,
      views: 8900,
      category: 'Technical SEO',
    },
    {
      title: 'Shopify vs. WordPress for SEO - Detailed comparison',
      author: 'Lisa M.',
      replies: 189,
      views: 11200,
      category: 'Platform Comparison',
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Community Hub
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join 5,000+ SEO Professionals
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Connect, learn, and grow with the SEOLOGY.AI community. Share insights, attend events, and level up your SEO game.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Join the Community
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Community Features */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {communityFeatures.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-400 mb-3">{feature.description}</p>
                    <div className="text-sm text-blue-400 font-medium">{feature.stats}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-500/20 rounded-xl p-4 text-center min-w-[120px]">
                      <div className="text-2xl font-bold">{event.date.split(' ')[1].replace(',', '')}</div>
                      <div className="text-sm text-slate-400">{event.date.split(' ')[0]}</div>
                      <div className="text-xs text-slate-500 mt-1">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{event.title}</h3>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-slate-400 mb-2">{event.speaker}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} registered</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Discussions */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Discussions</h2>
          <div className="space-y-4">
            {featuredDiscussions.map((discussion, index) => (
              <Link
                key={index}
                href="#forums"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                        {discussion.title}
                      </h3>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                        {discussion.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>by {discussion.author}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {discussion.replies} replies
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {discussion.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Top Contributors This Month</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {topContributors.map((contributor, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{contributor.badge}</div>
                <h3 className="text-xl font-bold mb-2">{contributor.name}</h3>
                <div className="text-slate-400 text-sm mb-4">{contributor.role}</div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300">{contributor.contributions} contributions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Community Guidelines</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Be Respectful',
                  description: 'Treat all community members with respect and professionalism.',
                },
                {
                  title: 'Share Knowledge',
                  description: 'Contribute insights, answer questions, and help others succeed.',
                },
                {
                  title: 'Stay On Topic',
                  description: 'Keep discussions relevant to SEO, e-commerce, and SEOLOGY.AI.',
                },
                {
                  title: 'No Spam',
                  description: 'Avoid promotional content, spam, or excessive self-promotion.',
                },
              ].map((guideline, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{guideline.title}</h3>
                    <p className="text-sm text-slate-400">{guideline.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Join the Conversation?</h3>
            <p className="text-lg mb-8 opacity-90">
              Create your free account to access forums, attend events, and connect with SEO professionals worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                <Users className="w-5 h-5" />
                Join Community
              </Link>
              <Link
                href="#forums"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Browse Forums
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-6">Free forever. No credit card required.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
