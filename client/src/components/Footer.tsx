/* Design: Kinetic Expressionism - Footer with gradient accents */

import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Juan Pablo Franco
            </h3>
            <p className="text-background/80 mb-4">
              Estratega de Crecimiento Digital & Especialista en eCommerce
            </p>
            <p className="text-background/70 text-sm">
              Transformando negocios a través de estrategias de comercio digital
              basadas en datos en LATAM, Europa y Norteamérica.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Sobre Mí
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("experience")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Experiencia
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">

              <li className="flex items-center gap-2 text-background/80">
                <Phone size={18} />
                <a
                  href="tel:+573235812748"
                  className="hover:text-background transition-colors"
                >
                  +57 323 581 2748
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <MapPin size={18} />
                <span>Bogotá D.C., Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Linkedin size={18} />
                <a
                  href="https://linkedin.com/in/juanpablo321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors"
                >
                  linkedin.com/in/juanpablo321
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © 2025 Juan Pablo Franco - Estratega de Crecimiento Digital. Todos
            los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/juanpablo321"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
