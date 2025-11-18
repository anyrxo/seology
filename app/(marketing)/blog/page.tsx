'use client';

import Link from "next/link"
import { ArrowRight, Calendar } from 'lucide-react'
import { blogPosts } from "@/lib/blog-posts"
import { motion } from 'framer-motion'
export default function Blog() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
        {/* Gradient fade overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_30%,transparent)]"></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black dark:text-white mb-6">
              Seology Blog
            </h1>
            <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 leading-relaxed">
              SEO tips, strategies, and insights to help your Shopify store rank higher and grow faster
            </p>
          </motion.div>
        </div>
      </section>
        {/* Blog Posts Grid */}
        <section className="py-24 bg-white dark:bg-black">
          <div className="container max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 hover:shadow-2xl hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 h-full"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    {/* Content */}
                    <div className="p-6 h-full flex flex-col">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-black/60 dark:text-white/60 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                      </div>
                      {/* Title */}
                      <h2 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                        {post.title}
                      </h2>
                      {/* Description */}
                      <p className="text-black/60 dark:text-white/60 mb-4 flex-1">
                        {post.description}
                      </p>
                      {/* Author & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                        <span className="text-sm text-black/60 dark:text-white/60">
                          By {post.author}
                        </span>
                        <span className="flex items-center gap-1 text-black dark:text-white font-medium text-sm group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        {/* Newsletter CTA */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get SEO Tips in Your Inbox
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join 10,000+ store owners getting weekly SEO insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-white/70 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>
    </>
  );
}