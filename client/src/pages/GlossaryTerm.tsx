/**
 * Individual Glossary Term Page
 * Displays a single term with full definition, related terms, and navigation
 * Orange/purple palette
 */

import { useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Tag,
  ArrowRight,
} from "lucide-react";
import {
  getTermBySlug,
  getRelatedTerms,
  getAdjacentTerms,
} from "@/data/glossaryData";

export default function GlossaryTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();

  const term = slug ? getTermBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentTerms(slug) : { prev: null, next: null };
  const relatedTerms = term?.relatedTerms
    ? getRelatedTerms(term.relatedTerms)
    : [];

  // Set page title and scroll to top
  useEffect(() => {
    if (term) {
      document.title = `${term.term} - Glosario | Juan Pablo Franco`;
    }
    window.scrollTo(0, 0);
  }, [term, slug]);

  // 404 if term not found
  if (!term) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-20 text-center">
          <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Término no encontrado</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            El término que buscas no existe en nuestro glosario.
          </p>
          <Link href="/glosario">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Glosario
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section
        className="pt-32 pb-16 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.18 310) 0%, oklch(0.50 0.20 310) 40%, oklch(0.55 0.18 330) 70%, oklch(0.60 0.16 50) 100%)",
        }}
      >
        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/glosario"
                className="hover:text-white transition-colors"
              >
                Glosario
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{term.term}</span>
            </nav>

            {/* Category badge */}
            {term.category && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-white/15 text-white rounded-full mb-4">
                <Tag className="w-3.5 h-3.5" />
                {term.category}
              </span>
            )}

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
              {term.term}
            </h1>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Main Definition */}
            <Card className="corp-card mb-12">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Definición</h2>
                </div>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {term.definition}
                </p>
              </CardContent>
            </Card>

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                  Términos Relacionados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTerms.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/glosario/${related.slug}`}
                    >
                      <Card className="corp-card cursor-pointer group hover:shadow-md hover:border-primary/30 transition-all h-full">
                        <CardContent className="pt-5 pb-5">
                          <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors mb-1 text-base">
                            {related.term}
                          </h3>
                          {related.category && (
                            <span className="text-xs text-muted-foreground">
                              {related.category}
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation between terms */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t">
              {adjacent.prev ? (
                <Link
                  href={`/glosario/${adjacent.prev.slug}`}
                  className="flex items-center gap-3 group max-w-[45%]"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                    <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Anterior
                    </p>
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {adjacent.prev.term}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <Link href="/glosario">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Ver todos
                </Button>
              </Link>

              {adjacent.next ? (
                <Link
                  href={`/glosario/${adjacent.next.slug}`}
                  className="flex items-center gap-3 group max-w-[45%]"
                >
                  <div className="text-right min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Siguiente
                    </p>
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {adjacent.next.term}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-2xl font-semibold mb-4">
            ¿Necesitas ayuda con tu estrategia digital?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Con más de 15 años de experiencia en eCommerce y marketing digital,
            puedo ayudarte a implementar estas estrategias en tu negocio.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/#contacto">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                Agendar Consultoría
              </Button>
            </Link>
            <Link href="/glosario">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
              >
                Explorar Glosario
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
