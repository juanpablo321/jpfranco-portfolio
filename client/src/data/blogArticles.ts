export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  keywords: string[];
}

export const articles: BlogArticle[] = [
  {
    slug: "guia-expansion-digital-b2b-2026",
    title: "Guía Completa de Expansión Digital para Empresas B2B en 2026",
    excerpt: "Roadmap completo con estrategias probadas para empresas que buscan expandirse digitalmente y transformar su modelo de negocio B2B.",
    category: "Expansión Digital",
    date: "13 de Febrero, 2026",
    readTime: "8 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-1_1771034649000_na1fn_YmxvZy1leHBhbnNpb24tZGlnaXRhbC1iMmI.png",
    keywords: ["expansión digital", "transformación digital B2B", "estrategia digital empresarial"]
  },
  {
    slug: "estrategias-omnicanalidad-b2b",
    title: "5 Estrategias de Omnicanalidad que Transformarán tu Negocio B2B",
    excerpt: "Descubre cómo integrar todos tus canales de venta para ofrecer una experiencia unificada y aumentar la satisfacción del cliente empresarial.",
    category: "Expansión Digital",
    date: "12 de Febrero, 2026",
    readTime: "7 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-2_1771034654000_na1fn_YmxvZy1vbW5pY2FuYWxpZGFkLWIyYg.png",
    keywords: ["omnicanalidad B2B", "experiencia cliente digital", "integración canales venta"]
  },
  {
    slug: "marketplaces-b2b-comercio-electronico",
    title: "Marketplaces B2B: La Nueva Frontera del Comercio Electrónico",
    excerpt: "Por qué los marketplaces B2B son el futuro del comercio digital y cómo implementar una estrategia exitosa para tu empresa.",
    category: "Expansión Digital",
    date: "11 de Febrero, 2026",
    readTime: "9 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-3_1771034652000_na1fn_YmxvZy1tYXJrZXRwbGFjZS1iMmI.png",
    keywords: ["marketplace B2B", "plataforma eCommerce", "comercio electrónico empresarial"]
  },
  {
    slug: "escalar-ecommerce-b2b-internacional",
    title: "Cómo Escalar tu eCommerce B2B Internacionalmente",
    excerpt: "Estrategias probadas para llevar tu eCommerce más allá de las fronteras y conquistar mercados internacionales con éxito.",
    category: "Expansión Digital",
    date: "10 de Febrero, 2026",
    readTime: "10 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-4_1771034655000_na1fn_YmxvZy1lY29tbWVyY2UtaW50ZXJuYWNpb25hbA.png",
    keywords: ["expansión internacional eCommerce", "comercio transfronterizo", "globalización digital"]
  },
  {
    slug: "transformacion-digital-legacy-nube",
    title: "Transformación Digital: Del Legacy System a la Nube",
    excerpt: "Guía práctica para migrar sistemas legacy a arquitecturas cloud modernas sin interrumpir operaciones críticas del negocio.",
    category: "Expansión Digital",
    date: "9 de Febrero, 2026",
    readTime: "11 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-5_1771034637000_na1fn_YmxvZy10cmFuc2Zvcm1hY2lvbi1kaWdpdGFsLW51YmU.png",
    keywords: ["migración a la nube", "modernización sistemas", "infraestructura digital"]
  },
  {
    slug: "inteligencia-artificial-ecommerce-2026",
    title: "Inteligencia Artificial en eCommerce: Tendencias 2026",
    excerpt: "Las aplicaciones de IA que están revolucionando el comercio electrónico y cómo implementarlas en tu negocio B2B.",
    category: "Inteligencia Artificial",
    date: "8 de Febrero, 2026",
    readTime: "9 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-6_1771034642000_na1fn_YmxvZy1pYS1lY29tbWVyY2U.png",
    keywords: ["inteligencia artificial eCommerce", "IA B2B", "automatización comercio digital"]
  },
  {
    slug: "chatbots-ia-atencion-cliente-b2b",
    title: "Chatbots con IA: Revolucionando la Atención al Cliente B2B",
    excerpt: "Cómo los chatbots inteligentes están mejorando la experiencia del cliente empresarial y reduciendo costos operativos.",
    category: "Inteligencia Artificial",
    date: "7 de Febrero, 2026",
    readTime: "8 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-7_1771034644000_na1fn_YmxvZy1jaGF0Ym90LWlh.png",
    keywords: ["chatbot IA", "atención cliente automatizada", "servicio cliente B2B"]
  },
  {
    slug: "personalizacion-ia-experiencia-cliente",
    title: "Personalización con IA: El Futuro de la Experiencia del Cliente",
    excerpt: "Descubre cómo la inteligencia artificial permite personalizar experiencias a escala en el comercio B2B.",
    category: "Inteligencia Artificial",
    date: "6 de Febrero, 2026",
    readTime: "7 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-8_1771034647000_na1fn_YmxvZy1wZXJzb25hbGl6YWNpb24taWE.png",
    keywords: ["personalización IA", "experiencia cliente personalizada", "machine learning B2B"]
  },
  {
    slug: "analisis-predictivo-ventas-b2b",
    title: "Análisis Predictivo: Anticipando Oportunidades de Venta B2B",
    excerpt: "Utiliza el poder del análisis predictivo para identificar oportunidades de venta antes que tu competencia.",
    category: "Inteligencia Artificial",
    date: "5 de Febrero, 2026",
    readTime: "9 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-9_1771034638000_na1fn_YmxvZy1hbmFsaXNpcy1wcmVkaWN0aXZv.png",
    keywords: ["análisis predictivo", "forecasting ventas", "inteligencia de negocios"]
  },
  {
    slug: "automatizacion-procesos-ia-b2b",
    title: "Automatización de Procesos con IA en Empresas B2B",
    excerpt: "Cómo la automatización inteligente está transformando operaciones y liberando tiempo para actividades estratégicas.",
    category: "Inteligencia Artificial",
    date: "4 de Febrero, 2026",
    readTime: "10 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-10_1771034640000_na1fn_YmxvZy1hdXRvbWF0aXphY2lvbi1wcm9jZXNvcw.png",
    keywords: ["automatización procesos", "RPA", "eficiencia operacional"]
  },
  {
    slug: "estrategia-contenidos-b2b-2026",
    title: "Estrategia de Contenidos B2B que Genera Leads Calificados",
    excerpt: "Crea una estrategia de content marketing que atraiga y convierta a tus clientes ideales en el entorno B2B.",
    category: "Marketing Digital B2B",
    date: "3 de Febrero, 2026",
    readTime: "8 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-11_1771034643000_na1fn_YmxvZy1jb250ZW5pZG9zLWIyYg.png",
    keywords: ["content marketing B2B", "generación leads", "estrategia contenidos"]
  },
  {
    slug: "linkedin-marketing-b2b-estrategias",
    title: "LinkedIn Marketing: Estrategias Avanzadas para B2B",
    excerpt: "Domina LinkedIn para generar leads calificados y posicionar tu marca como líder de pensamiento en tu industria.",
    category: "Marketing Digital B2B",
    date: "2 de Febrero, 2026",
    readTime: "9 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-12_1771034645000_na1fn_YmxvZy1saW5rZWRpbi1tYXJrZXRpbmc.png",
    keywords: ["LinkedIn marketing", "social selling", "generación leads LinkedIn"]
  },
  {
    slug: "account-based-marketing-abm",
    title: "Account-Based Marketing (ABM): Guía Completa 2026",
    excerpt: "Implementa una estrategia ABM efectiva para enfocarte en cuentas de alto valor y acelerar el ciclo de ventas.",
    category: "Marketing Digital B2B",
    date: "1 de Febrero, 2026",
    readTime: "10 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-13_1771034639000_na1fn_YmxvZy1hYm0tbWFya2V0aW5n.png",
    keywords: ["account based marketing", "ABM", "marketing cuentas clave"]
  },
  {
    slug: "seo-b2b-posicionamiento-organico",
    title: "SEO para B2B: Posicionamiento Orgánico que Genera Resultados",
    excerpt: "Estrategias de SEO específicas para empresas B2B que buscan atraer tráfico cualificado y generar oportunidades de negocio.",
    category: "Marketing Digital B2B",
    date: "31 de Enero, 2026",
    readTime: "11 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-14_1771034641000_na1fn_YmxvZy1zZW8tYjJi.png",
    keywords: ["SEO B2B", "posicionamiento orgánico", "optimización motores búsqueda"]
  },
  {
    slug: "email-marketing-b2b-nurturing",
    title: "Email Marketing B2B: Nurturing que Convierte",
    excerpt: "Diseña campañas de email marketing que nutran leads y los conviertan en clientes a través del embudo de ventas.",
    category: "Marketing Digital B2B",
    date: "30 de Enero, 2026",
    readTime: "8 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-15_1771034646000_na1fn_YmxvZy1lbWFpbC1tYXJrZXRpbmc.png",
    keywords: ["email marketing B2B", "lead nurturing", "automatización email"]
  },
  {
    slug: "marketing-automation-b2b",
    title: "Marketing Automation: Escalando tu Estrategia B2B",
    excerpt: "Implementa automatización de marketing para escalar tus esfuerzos y mejorar la eficiencia de tu equipo.",
    category: "Marketing Digital B2B",
    date: "29 de Enero, 2026",
    readTime: "9 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-16_1771034648000_na1fn_YmxvZy1tYXJrZXRpbmctYXV0b21hdGlvbg.png",
    keywords: ["marketing automation", "automatización marketing", "HubSpot"]
  },
  {
    slug: "video-marketing-b2b-estrategia",
    title: "Video Marketing B2B: Contenido Visual que Convierte",
    excerpt: "Aprovecha el poder del video para educar, inspirar y convertir a tus clientes empresariales.",
    category: "Marketing Digital B2B",
    date: "28 de Enero, 2026",
    readTime: "7 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-17_1771034650000_na1fn_YmxvZy12aWRlby1tYXJrZXRpbmc.png",
    keywords: ["video marketing B2B", "contenido visual", "marketing audiovisual"]
  },
  {
    slug: "webinars-b2b-generacion-leads",
    title: "Webinars B2B: Generación de Leads de Alta Calidad",
    excerpt: "Organiza webinars que posicionen tu expertise y generen leads calificados para tu equipo de ventas.",
    category: "Marketing Digital B2B",
    date: "27 de Enero, 2026",
    readTime: "8 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-18_1771034651000_na1fn_YmxvZy13ZWJpbmFycy1iMmI.png",
    keywords: ["webinars B2B", "eventos virtuales", "generación leads webinars"]
  },
  {
    slug: "datos-analytics-marketing-b2b",
    title: "Datos y Analytics: Optimizando tu Marketing B2B",
    excerpt: "Utiliza datos y analytics para tomar decisiones informadas y optimizar continuamente tu estrategia de marketing.",
    category: "Marketing Digital B2B",
    date: "26 de Enero, 2026",
    readTime: "10 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-19_1771034653000_na1fn_YmxvZy1kYXRvcy1hbmFseXRpY3M.png",
    keywords: ["marketing analytics", "datos marketing", "optimización ROI"]
  },
  {
    slug: "tendencias-marketing-b2b-2026",
    title: "10 Tendencias de Marketing B2B que Dominarán 2026",
    excerpt: "Mantente adelante de la curva conociendo las tendencias que definirán el marketing B2B en 2026 y más allá.",
    category: "Marketing Digital B2B",
    date: "25 de Enero, 2026",
    readTime: "9 min",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/L90nvBG12OiNoYq5WXLhXX-img-20_1771034656000_na1fn_YmxvZy10ZW5kZW5jaWFzLW1hcmtldGluZw.png",
    keywords: ["tendencias marketing B2B", "futuro marketing digital", "innovación marketing"]
  }
];
