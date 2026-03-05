/* Blog Article Page Template - Premium Reading Experience
 * Professional Corporate Style with refined typography
 * SEO-optimized with single H1, proper heading hierarchy
 * Content sourced from Sanity CMS via tRPC, rendered with @portabletext/react
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useSEO } from "@/hooks/useSEO";

// Fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop";

// Custom Portable Text components to match the existing blog-content CSS styles
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mt-6 mb-2">{children}</h4>,
    normal: ({ children }) => <p className="mb-5 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside pl-6 mb-5 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside pl-6 mb-5 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?.url;
      if (!imageUrl) return null;
      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={value?.alt || ""}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value?.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: article, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Fetch all articles for related articles section
  const { data: allArticles = [] } = trpc.blog.getAll.useQuery();

  // Dynamic SEO meta tags for each article
  useSEO({
    title: article ? `${article.title} | Juan Pablo Franco` : "Artículo no encontrado | Juan Pablo Franco",
    description: article?.excerpt || "Artículo no encontrado en el blog de Juan Pablo Franco.",
    url: `/blog/${slug}`,
    image: article?.imageUrl,
    type: "article",
    keywords: article?.keywords,
    author: "Juan Pablo Franco",
    publishedDate: article?.date,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-32 pb-20">
          <div className="container">
            <div className="max-w-[720px] mx-auto animate-pulse space-y-6">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-8 bg-muted rounded w-full" />
              <div className="h-8 bg-muted rounded w-4/5" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="aspect-[16/9] bg-muted rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error or not found state
  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-32 pb-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Artículo no encontrado</h1>
              <p className="text-muted-foreground mb-8">
                El artículo que buscas no existe o ha sido eliminado.
              </p>
              <Link href="/blog" className="text-primary hover:underline font-semibold">
                Volver al blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-primary z-[60] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <Header />

      <main className="flex-1 pt-28 md:pt-32 pb-16 md:pb-24">
        <article className="container">
          {/* Breadcrumb */}
          <div className="max-w-[720px] mx-auto mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver al blog
            </Link>
          </div>

          {/* Article Header */}
          <header className="max-w-[720px] mx-auto mb-10 md:mb-14">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/8 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-muted-foreground">{formatDate(article.date)}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-sm text-muted-foreground">{article.readTime} min de lectura</span>
            </div>

            {/* Title - Single H1 */}
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
              {article.excerpt}
            </p>

            {/* Author line */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border/60">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                JPF
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">Juan Pablo Franco</p>
                <p className="text-xs text-muted-foreground">Estratega de Crecimiento Digital</p>
              </div>
            </div>
          </header>

          {/* Article Hero Image */}
          <div className="max-w-[960px] mx-auto mb-12 md:mb-16">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={article.imageUrl || FALLBACK_IMAGE}
                alt={article.title}
                className="w-full h-auto aspect-[16/9] object-cover"
              />
            </div>
          </div>

          {/* Article Content - Portable Text */}
          <div className="max-w-[720px] mx-auto">
            <div className="blog-content" id={`article-content-${article.slug}`}>
              {article.body && Array.isArray(article.body) && article.body.length > 0 ? (
                <PortableText value={article.body as any} components={portableTextComponents} />
              ) : (
                <p className="text-muted-foreground">
                  El contenido del artículo no está disponible en este momento.
                </p>
              )}
            </div>
          </div>

          {/* Keywords */}
          <div className="max-w-[720px] mx-auto mt-14 pt-8 border-t border-border/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Palabras clave
            </p>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1.5 bg-secondary text-muted-foreground text-sm rounded-full border border-border/50 hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Share / CTA Section */}
          <div className="max-w-[720px] mx-auto mt-12">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 md:p-10 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">
                ¿Te resultó útil este artículo?
              </p>
              <p className="text-muted-foreground mb-6">
                Compártelo con tu red profesional o agenda una consultoría gratuita para implementar estas estrategias en tu negocio.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://franco.com.co/blog/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-full hover:bg-[#004182] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Compartir en LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=https://franco.com.co/blog/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-white text-sm font-semibold rounded-full hover:bg-foreground/80 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Compartir en X
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="max-w-[960px] mx-auto mt-20 pt-14 border-t border-border/60">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
                Artículos relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.slug} href={`/blog/${relatedArticle.slug}`}>
                    <article className="group cursor-pointer">
                      <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                        <img
                          src={relatedArticle.imageUrl || FALLBACK_IMAGE}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                        {relatedArticle.category}
                      </span>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedArticle.readTime} min de lectura
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
