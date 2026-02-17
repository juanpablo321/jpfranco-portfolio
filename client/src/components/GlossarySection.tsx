/**
 * Interactive Glossary Section Component
 * Displays marketing and eCommerce terms with alphabetical navigation
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import { glossaryTerms, getTermsByLetter, getAvailableLetters } from "@/data/glossaryData";

export default function GlossarySection() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const termsByLetter = getTermsByLetter();
  const availableLetters = getAvailableLetters();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

  const handleLetterClick = (letter: string) => {
    if (availableLetters.includes(letter)) {
      setSelectedLetter(letter);
      setSearchQuery("");
      setSelectedTerm(null);
    }
  };

  const handleTermClick = (term: string) => {
    setSelectedTerm(selectedTerm === term ? null : term);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSelectedLetter(null);
    setSelectedTerm(null);
  };

  return (
    <section id="glosario" className="corp-white-section corp-section">
      <div className="container">
        <div className="text-center mb-16">
          <p className="corp-label text-primary mb-4">Glosario</p>
          <h2 className="mb-6">Diccionario de Marketing Digital y eCommerce</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Términos esenciales de marketing digital, eCommerce, transformación digital
            e inteligencia artificial explicados de forma clara y práctica.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
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
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {alphabet.map((letter) => {
              const isAvailable = availableLetters.includes(letter);
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={!isAvailable}
                  className={`
                    w-10 h-10 rounded-lg font-semibold transition-all
                    ${
                      isAvailable
                        ? isSelected
                          ? "bg-primary text-white shadow-lg scale-110"
                          : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105"
                        : "bg-muted text-muted-foreground/30 cursor-not-allowed"
                    }
                  `}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Terms Display */}
        {filteredTerms.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-5 h-5" />
              <p>
                {searchQuery
                  ? `${filteredTerms.length} resultado${filteredTerms.length !== 1 ? "s" : ""} encontrado${filteredTerms.length !== 1 ? "s" : ""}`
                  : `Letra ${selectedLetter}: ${filteredTerms.length} término${filteredTerms.length !== 1 ? "s" : ""}`}
              </p>
            </div>

            <div className="space-y-4">
              {filteredTerms.map((term, index) => (
                <Card
                  key={index}
                  className={`
                    corp-card cursor-pointer transition-all
                    ${selectedTerm === term.term ? "ring-2 ring-primary shadow-lg" : ""}
                  `}
                  onClick={() => handleTermClick(term.term)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-primary">
                          {term.term}
                        </h3>
                        {term.category && (
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                            {term.category}
                          </span>
                        )}
                        <p
                          className={`
                            text-muted-foreground leading-relaxed
                            ${selectedTerm === term.term ? "" : "line-clamp-2"}
                          `}
                        >
                          {term.definition}
                        </p>
                      </div>
                      <div
                        className={`
                          flex-shrink-0 w-6 h-6 rounded-full border-2 border-primary
                          flex items-center justify-center transition-transform
                          ${selectedTerm === term.term ? "rotate-180" : ""}
                        `}
                      >
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery
                ? "No se encontraron resultados"
                : "Selecciona una letra para comenzar"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Intenta con otro término o busca por categoría"
                : "Haz clic en una letra del índice alfabético para ver los términos"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
