/* Blog Listing Page - Professional Corporate Style
 * SEO-optimized blog listing with articles
 * Categories: Expansión Digital, Inteligencia Artificial, Marketing Digital B2B
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { articles } from "@/data/blogArticles";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container">
          {/* Blog Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Blog de Expansión Digital
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights sobre transformación digital, inteligencia artificial y marketing B2B para empresas que buscan crecer en el mundo digital.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <article className="group cursor-pointer bg-white border border-border rounded-none overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-primary">
                        {article.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {article.date}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        · {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
