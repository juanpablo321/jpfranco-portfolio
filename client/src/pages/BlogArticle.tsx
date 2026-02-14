/* Blog Article Page Template - Professional Corporate Style
 * SEO-optimized individual article page
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useRoute } from "wouter";
import { articles } from "@/data/blogArticles";
import { useEffect } from "react";

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const article = articles.find((a) => a.slug === params?.slug);

  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params?.slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-32 pb-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Artículo no encontrado</h1>
              <Link href="/blog" className="text-primary hover:underline">
                Volver al blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <article className="container">
          {/* Breadcrumb */}
          <div className="max-w-4xl mx-auto mb-8">
            <Link href="/blog" className="text-primary hover:underline">
              ← Volver al blog
            </Link>
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <span className="text-sm font-medium text-primary">{article.category}</span>
              <span className="text-sm text-muted-foreground mx-2">·</span>
              <span className="text-sm text-muted-foreground">{article.date}</span>
              <span className="text-sm text-muted-foreground mx-2">·</span>
              <span className="text-sm text-muted-foreground">{article.readTime} de lectura</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {article.excerpt}
            </p>
          </div>

          {/* Article Image */}
          <div className="max-w-5xl mx-auto mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto rounded-none"
            />
          </div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div id={`article-content-${article.slug}`}>
              {/* Content will be loaded here */}
              <p className="text-muted-foreground italic">
                El contenido completo del artículo se está cargando...
              </p>
            </div>
          </div>

          {/* Keywords */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Palabras clave:</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-4 py-2 bg-muted text-muted-foreground text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          <div className="max-w-5xl mx-auto mt-16 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Artículos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles
                .filter((a) => a.slug !== article.slug && a.category === article.category)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link key={relatedArticle.slug} href={`/blog/${relatedArticle.slug}`}>
                    <article className="group cursor-pointer">
                      <div className="aspect-[16/9] overflow-hidden mb-4">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedArticle.readTime} de lectura
                      </p>
                    </article>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
