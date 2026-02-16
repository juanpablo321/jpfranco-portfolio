import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedDate?: string;
}

const BASE_URL = "https://franco.com.co";
const DEFAULT_TITLE = "Juan Pablo Franco - Estratega de Expansión Digital | eCommerce & Marketplaces";
const DEFAULT_DESCRIPTION = "Consultor experto en comercio digital especializado en VTEX, desarrollo de marketplaces y generación de leads B2B en Colombia y el mundo.";

function setMetaTag(property: string, content: string, isName = false) {
  const attr = isName ? "name" : "property";
  let element = document.querySelector(`meta[${attr}="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export function useSEO({
  title,
  description,
  url,
  image,
  type = "website",
  keywords,
  author = "Juan Pablo Franco",
  publishedDate,
}: SEOProps) {
  useEffect(() => {
    // Page title
    document.title = title;

    // Standard meta tags
    setMetaTag("description", description, true);
    if (keywords && keywords.length > 0) {
      setMetaTag("keywords", keywords.join(", "), true);
    }
    setMetaTag("author", author, true);

    // Open Graph
    setMetaTag("og:title", title);
    setMetaTag("og:description", description);
    setMetaTag("og:url", `${BASE_URL}${url}`);
    setMetaTag("og:type", type);
    setMetaTag("og:site_name", "Juan Pablo Franco - Estratega de Expansión Digital");
    setMetaTag("og:locale", "es_CO");
    if (image) {
      setMetaTag("og:image", image);
      setMetaTag("og:image:width", "1200");
      setMetaTag("og:image:height", "675");
      setMetaTag("og:image:alt", title);
    }

    // Twitter Card
    setMetaTag("twitter:card", "summary_large_image", true);
    setMetaTag("twitter:title", title, true);
    setMetaTag("twitter:description", description, true);
    if (image) {
      setMetaTag("twitter:image", image, true);
    }

    // Article-specific meta (for blog posts)
    if (type === "article") {
      setMetaTag("article:author", author);
      if (publishedDate) {
        setMetaTag("article:published_time", publishedDate);
      }
    }

    // Canonical URL
    setOrCreateLink("canonical", `${BASE_URL}${url}`);

    // Cleanup: restore defaults when component unmounts
    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag("description", DEFAULT_DESCRIPTION, true);
      setMetaTag("og:title", DEFAULT_TITLE);
      setMetaTag("og:description", DEFAULT_DESCRIPTION);
      setMetaTag("og:url", BASE_URL);
      setMetaTag("og:type", "website");
      setMetaTag("og:image", "");
    };
  }, [title, description, url, image, type, keywords, author, publishedDate]);
}
