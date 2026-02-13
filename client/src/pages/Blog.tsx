/* Blog Listing Page
 * Professional Corporate Design (Simon Sinek Inspired)
 * Clean layout with card-based article previews
 * Consistent with the site's blue/white corporate style
 */

import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, ArrowRight, User } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "lessons-from-a-conversation-with-rafa-nadal",
    title: "Lessons From a Conversation With Rafa Nadal",
    excerpt:
      "There are moments in life when a conversation does more than inspire; it recalibrates you. That's what happened during my interview with Rafa Nadal at VTEX Connect in Lisbon.",
    author: "Santiago Naranjo",
    date: "Nov 18, 2025",
    readTime: "3 min",
    image:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663334573136/VWiQyXbRDSALDxTi.webp",
    category: "Leadership",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="corp-blue-section pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">
              Blog
            </p>
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
              Ideas & Perspectivas
            </h1>
            <p className="text-xl text-white/90 mt-6 leading-relaxed">
              Artículos sobre liderazgo, comercio digital, estrategia y
              transformación empresarial.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{post.date}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-3 transition-all">
                      <span>Leer artículo</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
