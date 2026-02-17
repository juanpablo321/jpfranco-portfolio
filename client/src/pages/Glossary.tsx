/**
 * Standalone Glossary Page
 * Full-page marketing & eCommerce dictionary with alphabetical navigation
 * Orange/purple palette, clean layout
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import {
  glossaryTerms,
  getTermsByLetter,
  getAvailableLetters,
} from "@/data/glossaryData";

export default function Glossary() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const termsByLetter = getTermsByLetter();
  const availableLetters = getAvailableLetters();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Set page title
  useEffect(() => {
    document.title =
      "Glosario de Marketing Digital y eCommerce | Juan Pablo Franco";
  }, []);

  // Filter terms based on search query
  const filteredTerms = searchQuery
    ? glossaryTerms.filter(
        (term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedLetter
      ? termsByLetter[selectedLetter] || []
      : [];

  // Show all terms grouped by letter when no search and no letter selected
  const showAllGrouped = !searchQuery && !selectedLetter;

  const handleLetterClick = (letter: string) => {
    if (availableLetters.includes(letter)) {
      setSelectedLetter(letter);
      setSearchQuery("");
      // Scroll to the terms area
      const el = document.getElementById("glossary-results");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSelectedLetter(null);
  };

  const totalTerms = glossaryTerms.length;
  const totalCategories = new Set(
    glossaryTerms.map((t) => t.category).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section
        className="pt-32 pb-20 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.18 310) 0%, oklch(0.50 0.20 310) 40%, oklch(0.55 0.18 330) 70%, oklch(0.60 0.16 50) 100%)",
        }}
      >
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Glosario</span>
            </nav>
            <h1 className="text-white mb-6">
              Glosario de Marketing Digital y eCommerce
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Diccionario completo con los términos esenciales de marketing
              digital, comercio electrónico, transformación digital e
              inteligencia artificial, explicados de forma clara y práctica.
            </p>
            <div className="flex gap-8 mt-10">
              <div>
                <p className="text-3xl font-bold">{totalTerms}+</p>
                <p className="text-white/70 text-sm mt-1">Términos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{totalCategories}</p>
                <p className="text-white/70 text-sm mt-1">Categorías</p>
              </div>
              <div>
                <p className="text-3xl font-bold">A-Z</p>
                <p className="text-white/70 text-sm mt-1">Índice Completo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Index Section */}
      <section className="py-12 bg-background border-b">
        <div className="container">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar término o concepto..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Alphabetical Index */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                setSelectedLetter(null);
                setSearchQuery("");
              }}
              className={`px-4 h-10 rounded-lg font-semibold transition-all text-sm ${
                showAllGrouped
                  ? "bg-primary text-white shadow-lg"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              Todos
            </button>
            {alphabet.map((letter) => {
              const isAvailable = availableLetters.includes(letter);
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={!isAvailable}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    isAvailable
                      ? isSelected
                        ? "bg-primary text-white shadow-lg scale-110"
                        : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105"
                      : "bg-muted text-muted-foreground/30 cursor-not-allowed"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="glossary-results" className="py-16 bg-background">
        <div className="container">
          {/* Search results */}
          {searchQuery && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-5 h-5" />
                <p>
                  {filteredTerms.length} resultado
                  {filteredTerms.length !== 1 ? "s" : ""} para "{searchQuery}"
                </p>
              </div>
              {filteredTerms.length > 0 ? (
                <div className="space-y-4">
                  {filteredTerms.map((term) => (
                    <TermCard key={term.slug} term={term} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No se encontraron resultados. Intenta con otro término." />
              )}
            </div>
          )}

          {/* Filtered by letter */}
          {selectedLetter && !searchQuery && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 flex items-center gap-2">
                <span className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">
                  {selectedLetter}
                </span>
                <div>
                  <p className="text-lg font-semibold">
                    Letra {selectedLetter}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {filteredTerms.length} término
                    {filteredTerms.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {filteredTerms.map((term) => (
                  <TermCard key={term.slug} term={term} />
                ))}
              </div>
            </div>
          )}

          {/* All terms grouped */}
          {showAllGrouped && (
            <div className="max-w-4xl mx-auto">
              {availableLetters.map((letter) => (
                <div key={letter} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">
                      {letter}
                    </span>
                    <div className="h-px flex-1 bg-border"></div>
                    <span className="text-sm text-muted-foreground">
                      {termsByLetter[letter].length} término
                      {termsByLetter[letter].length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {termsByLetter[letter].map((term) => (
                      <TermCard key={term.slug} term={term} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Term Card Component - links to individual term page
function TermCard({ term }: { term: { term: string; slug: string; definition: string; category?: string } }) {
  return (
    <Link href={`/glosario/${term.slug}`}>
      <Card className="corp-card cursor-pointer group hover:shadow-lg hover:border-primary/30 transition-all">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors">
                {term.term}
              </h3>
              {term.category && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                  {term.category}
                </span>
              )}
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                {term.definition}
              </p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Sin resultados</h3>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
