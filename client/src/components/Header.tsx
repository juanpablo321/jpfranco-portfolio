/* Professional Corporate Header
 * Clean white background
 * Simple black text navigation
 * Working mobile hamburger menu
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    // Small delay to allow menu close animation
    setTimeout(() => {
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
    }, 100);
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        isScrolled || isMobileMenuOpen ? "shadow-md" : ""
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity z-50"
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334573136/khJkEFbJFeiDPXxI.png"
              alt="Juan Pablo Franco"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-base font-normal text-foreground hover:text-primary transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("experiencia")}
              className="text-base font-normal text-foreground hover:text-primary transition-colors"
            >
              Experiencia
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className="text-base font-normal text-foreground hover:text-primary transition-colors"
            >
              Expertise
            </button>
            <a
              href="/blog"
              className="text-base font-normal text-foreground hover:text-primary transition-colors"
            >
              Blog
            </a>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-base font-normal text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-white transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 pt-12 px-6">
          <button
            onClick={() => scrollToSection("servicios")}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection("experiencia")}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            Experiencia
          </button>
          <button
            onClick={() => scrollToSection("expertise")}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            Expertise
          </button>
          <a
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            Blog
          </a>
          <button
            onClick={() => scrollToSection("contacto")}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            Contacto
          </button>
          <a
            href="https://wa.me/573235812748"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
          >
            Agendar Consultoría
          </a>
        </div>
      </div>
    </header>
  );
}
