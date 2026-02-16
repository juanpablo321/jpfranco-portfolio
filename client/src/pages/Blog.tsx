/* Blog Listing Page - Professional Corporate Style
 * SEO-optimized blog listing with category filters, search, and pagination
 * Categories: Expansión Digital, Inteligencia Artificial, Marketing Digital B2B
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useState, useMemo, useCallback } from "react";
import { articles } from "@/data/blogArticles";
import { useSEO } from "@/hooks/useSEO";

const CATEGORIES = [
  { label: "Todos", value: "all" },
  { label: "Expansión Digital", value: "Expansión Digital" },
  { label: "Inteligencia Artificial", value: "Inteligencia Artificial" },
  { label: "Marketing Digital B2B", value: "Marketing Digital B2B" },
];

const ARTICLES_PER_PAGE = 9;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useSEO({
    title: "Blog de Expansión Digital | Juan Pablo Franco",
    description: "Insights sobre transformación digital, inteligencia artificial y marketing B2B para empresas que buscan crecer en el mundo digital.",
    url: "/blog",
    type: "website",
    keywords: ["blog marketing digital", "expansión digital B2B", "inteligencia artificial marketing", "eCommerce Colombia", "estrategia digital"],
  });

  // Filter by category
  const categoryFiltered = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  // Filter by search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return categoryFiltered;
    const query = searchQuery.toLowerCase().trim();
    return categoryFiltered.filter((a) =>
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.keywords.some((k: string) => k.toLowerCase().includes(query)) ||
      a.category.toLowerCase().includes(query)
    );
  }, [categoryFiltered, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Category counts (always based on all articles, not filtered)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Reset page when filters change
  const handleCategoryChange = useCallback((value: string) => {
    setActiveCategory(value);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="container">
          {/* Blog Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog de Expansión Digital
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Insights sobre transformación digital, inteligencia artificial y marketing B2B para empresas que buscan crecer en el mundo digital.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar artículos por título, tema o palabra clave..."
                className="w-full pl-12 pr-12 py-3.5 bg-white border border-border/80 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground/60 hover:text-foreground transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              const count = categoryCounts[cat.value] || 0;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
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
          <div className="mb-8 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-semibold text-foreground">{filteredArticles.length}</span> artículo{filteredArticles.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && (
                <> en <span className="font-semibold text-primary">{activeCategory}</span></>
              )}
              {searchQuery && (
                <> para "<span className="font-semibold text-foreground">{searchQuery}</span>"</>
              )}
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-muted-foreground">
                Página <span className="font-semibold text-foreground">{currentPage}</span> de <span className="font-semibold text-foreground">{totalPages}</span>
              </p>
            )}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedArticles.map((article, index) => (
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
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-lg text-muted-foreground mb-2">
                No se encontraron artículos
              </p>
              <p className="text-sm text-muted-foreground/70 mb-6">
                {searchQuery
                  ? `No hay resultados para "${searchQuery}". Intenta con otros términos.`
                  : "No hay artículos en esta categoría."}
              </p>
              <div className="flex items-center justify-center gap-3">
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    Limpiar búsqueda
                  </button>
                )}
                {activeCategory !== "all" && (
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Ver todos los artículos
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-14 flex items-center justify-center" aria-label="Paginación del blog">
              <div className="inline-flex items-center gap-1 bg-white border border-border/60 rounded-xl p-1.5 shadow-sm">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`
                    inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                    ${currentPage === 1
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    }
                  `}
                  aria-label="Página anterior"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="inline-flex items-center justify-center w-10 h-10 text-sm text-muted-foreground/50"
                    >
                      ···
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`
                        inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                        ${currentPage === page
                          ? "bg-primary text-white shadow-sm shadow-primary/20"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                        }
                      `}
                      aria-label={`Ir a página ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`
                    inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                    ${currentPage === totalPages
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    }
                  `}
                  aria-label="Página siguiente"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
