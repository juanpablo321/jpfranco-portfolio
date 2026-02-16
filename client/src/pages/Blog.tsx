/* Blog Listing Page - Professional Corporate Style
 * SEO-optimized blog listing with category filters
 * Categories: Expansión Digital, Inteligencia Artificial, Marketing Digital B2B
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { articles } from "@/data/blogArticles";
import { useSEO } from "@/hooks/useSEO";

const CATEGORIES = [
  { label: "Todos", value: "all" },
  { label: "Expansión Digital", value: "Expansión Digital" },
  { label: "Inteligencia Artificial", value: "Inteligencia Artificial" },
  { label: "Marketing Digital B2B", value: "Marketing Digital B2B" },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  useSEO({
    title: "Blog de Expansión Digital | Juan Pablo Franco",
    description: "Insights sobre transformación digital, inteligencia artificial y marketing B2B para empresas que buscan crecer en el mundo digital.",
    url: "/blog",
    type: "website",
    keywords: ["blog marketing digital", "expansión digital B2B", "inteligencia artificial marketing", "eCommerce Colombia", "estrategia digital"],
  });

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="container">
          {/* Blog Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog de Expansión Digital
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Insights sobre transformación digital, inteligencia artificial y marketing B2B para empresas que buscan crecer en el mundo digital.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              const count = categoryCounts[cat.value] || 0;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`
                    inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium
                    transition-all duration-200 border
                    ${isActive
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                    }
                  `}
                >
                  {cat.label}
                  <span
                    className={`
                      inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-semibold
                      ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-secondary text-muted-foreground"
                      }
                    `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-semibold text-foreground">{filteredArticles.length}</span> artículo{filteredArticles.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && (
                <> en <span className="font-semibold text-primary">{activeCategory}</span></>
              )}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article, index) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <article
                  className="group cursor-pointer bg-white border border-border/60 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-primary/90 backdrop-blur-sm rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <span>{article.date}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span>{article.readTime} de lectura</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/40">
                      <span className="text-sm font-semibold text-primary group-hover:underline inline-flex items-center gap-1">
                        Leer artículo
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                No se encontraron artículos en esta categoría.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="text-primary font-semibold hover:underline"
              >
                Ver todos los artículos
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
