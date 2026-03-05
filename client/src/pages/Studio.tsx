import { useEffect } from "react";
import { ExternalLink, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const SANITY_STUDIO_URL = "https://rjpa3i6l.sanity.studio";

/**
 * Studio page — redirects to the Sanity Studio hosted on sanity.io
 * Accessible at /studio (protected, only visible to the owner)
 */
export default function Studio() {
  useEffect(() => {
    // Auto-redirect after a brief moment
    const timer = setTimeout(() => {
      window.location.href = SANITY_STUDIO_URL;
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <PenSquare className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Sanity Studio</h1>
          <p className="text-muted-foreground">
            Redirigiendo al panel de edición de contenido...
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full gap-2"
          >
            <a href={SANITY_STUDIO_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Abrir Sanity Studio
            </a>
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full"
          >
            <a href="/">Volver al inicio</a>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Gestiona artículos del blog, imágenes y contenido desde el panel de Sanity CMS.
        </p>
      </div>
    </div>
  );
}
