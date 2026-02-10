/* Soft Modernism Footer
 * Clean footer with soft colors and rounded elements
 * Gentle spacing and pastel accents
 */

import { Linkedin, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/30 backdrop-blur-sm">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Juan Pablo Franco</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Estratega de Expansión Digital especializado en eCommerce, VTEX y
              desarrollo de marketplaces B2B.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="soft-label mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <a
                  href="tel:+573235812748"
                  className="hover:text-primary transition-colors"
                >
                  +57 323 581 2748
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span>Bogotá D.C., Colombia</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Linkedin size={16} className="text-primary" />
                </div>
                <a
                  href="https://www.linkedin.com/in/juanpablofrancob/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="soft-label mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-primary transition-colors">
                Consultoría eCommerce
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                Implementación VTEX
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                Desarrollo de Marketplaces
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                Generación de Leads B2B
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Juan Pablo Franco. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
