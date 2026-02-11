/* Professional Corporate Header (Simon Sinek Inspired)
 * Clean white background
 * Simple black text navigation
 * Minimal design with generous spacing
 */

import { useState, useEffect } from "react";

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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334573136/hRFdEuEvuNZudCry.png"
              alt="Juan Pablo Franco"
              className="h-12 w-auto"
            />
          </button>

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
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-base font-normal text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-base font-normal text-foreground"
            onClick={() => scrollToSection("contacto")}
          >
            Menú
          </button>
        </nav>
      </div>
    </header>
  );
}
