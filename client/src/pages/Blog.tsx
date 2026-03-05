/* Blog Listing Page - Professional Corporate Style
 * SEO-optimized blog listing with category filters, search, and pagination
 * Data sourced from Sanity CMS via tRPC
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useState, useMemo, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";

const CATEGORIES = [
  { label: "Todos", value: "all" },
  { label: "Expansión Digital", value: "Expansión Digital" },
  { label: "Inteligencia Artificial", value: "Inteligencia Artificial" },
  { label: "Marketing Digital B2B", value: "Marketing Digital B2B" },
];

const ARTICLES_PER_PAGE = 9;

// Fallback placeholder image when an article has no mainImage in Sanity
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: articles = [], isLoading, error } = trpc.blog.getAll.useQuery();

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
  }, [activeCategory, articles]);

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
  }, [articles]);

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

  // Format date from ISO string to Spanish locale
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
    } catch {
      return dateStr;
    }
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

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-border/60 rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-[16/9] bg-muted" />
                  <div className="p-5 md:p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-full" />
                    <div className="h-5 bg-muted rounded w-4/5" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No se pudieron cargar los artículos. Por favor, intenta de nuevo más tarde.
              </p>
            </div>
          )}

          {/* Results Count */}
          {!isLoading && !error && (
            <>
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
                          src={article.imageUrl || FALLBACK_IMAGE}
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
                          <span>{formatDate(article.date)}</span>
                          <span className="text-muted-foreground/40">·</span>
                          <span>{article.readTime} min de lectura</span>
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
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No se encontraron artículos</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? `No hay artículos que coincidan con "${searchQuery}"`
                      : `No hay artículos en la categoría "${activeCategory}"`
                    }
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveCategory("all"); setCurrentPage(1); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Ver todos los artículos
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    aria-label="Página anterior"
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {getPageNumbers().map((page, idx) =>
                    typeof page === "string" ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">…</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-all border
                          ${currentPage === page
                            ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                            : "bg-white text-foreground border-border hover:border-primary/40 hover:text-primary"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    aria-label="Página siguiente"
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
