/* Soft Modernism Header
 * Glassmorphism sticky navigation with rounded corners
 * Soft shadows and pastel accents
 * Smooth hover transitions
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-card"
          : "bg-white/80 backdrop-blur-md rounded-3xl border border-white/60"
      }`}
      style={{
        boxShadow: isScrolled
          ? "0 8px 32px rgba(184, 164, 217, 0.15)"
          : "0 4px 16px rgba(184, 164, 217, 0.10)",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            JPF
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-primary/5"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("experiencia")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-primary/5"
            >
              Experiencia
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-primary/5"
            >
              Expertise
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-primary/5"
            >
              Contacto
            </button>
            <Button
              onClick={() => scrollToSection("contacto")}
              className="soft-button"
            >
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sm font-medium px-4 py-2 rounded-xl bg-primary/10 text-primary"
            onClick={() => scrollToSection("contacto")}
          >
            Menú
          </button>
        </nav>
      </div>
    </header>
  );
}
