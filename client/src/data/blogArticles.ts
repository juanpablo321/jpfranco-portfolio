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
    slug: "geo-generative-engine-optimization-b2b",
    title: "GEO (Generative Engine Optimization): Cómo Posicionar tu Marca B2B en la Era de la Búsqueda por IA",
    excerpt: "Aprende qué es la Optimización para Motores Generativos (GEO) y cómo aplicarla para que tu marca B2B sea la fuente de verdad que la IA cita, asegurando tu relevancia en la nueva era de la búsqueda conversacional.",
    category: "Inteligencia Artificial",
    date: "15 de Febrero, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&h=675&fit=crop",
    keywords: ["GEO", "Generative Engine Optimization", "AEO", "Answer Engine Optimization", "IA en marketing", "SEO para IA", "marketing B2B", "búsqueda conversacional", "marketing de contenidos IA", "estrategia digital 2026"]
  },
  {
    slug: "ia-agentica-marketing-b2b-2026",
    title: "IA Agéntica en Marketing B2B: Cómo los Agentes Autónomos Están Redefiniendo la Estrategia Digital en 2026",
    excerpt: "Descubre cómo la inteligencia artificial agéntica está transformando el marketing B2B con agentes autónomos que ejecutan campañas, personalizan experiencias y optimizan el funnel de ventas sin intervención humana constante.",
    category: "Inteligencia Artificial",
    date: "14 de Febrero, 2026",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop",
    keywords: ["IA agéntica", "agentes autónomos marketing", "inteligencia artificial B2B", "marketing automation IA", "agentic AI", "estrategia digital 2026", "GEO optimización", "AEO marketing", "IA generativa B2B", "transformación digital Colombia"]
  },
  {
    slug: "guia-expansion-digital-b2b-2026",
    title: "Guía Completa de Expansión Digital para Empresas B2B en 2026",
    excerpt: "Roadmap completo con estrategias probadas para empresas que buscan expandirse digitalmente y transformar su modelo de negocio B2B.",
    category: "Expansión Digital",
    date: "13 de Febrero, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
    keywords: ["expansión digital", "transformación digital B2B", "estrategia digital empresarial"]
  },
  {
    slug: "estrategias-omnicanalidad-b2b",
    title: "5 Estrategias de Omnicanalidad que Transformarán tu Negocio B2B",
    excerpt: "Descubre cómo integrar todos tus canales de venta para ofrecer una experiencia unificada y aumentar la satisfacción del cliente empresarial.",
    category: "Expansión Digital",
    date: "12 de Febrero, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
    keywords: ["omnicanalidad B2B", "experiencia cliente digital", "integración canales venta"]
  },
  {
    slug: "marketplaces-b2b-comercio-electronico",
    title: "Marketplaces B2B: La Nueva Frontera del Comercio Electrónico",
    excerpt: "Por qué los marketplaces B2B son el futuro del comercio digital y cómo implementar una estrategia exitosa para tu empresa.",
    category: "Expansión Digital",
    date: "11 de Febrero, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=675&fit=crop",
    keywords: ["marketplace B2B", "plataforma eCommerce", "comercio electrónico empresarial"]
  },
  {
    slug: "escalar-ecommerce-b2b-internacional",
    title: "Cómo Escalar tu eCommerce B2B Internacionalmente",
    excerpt: "Estrategias probadas para llevar tu eCommerce más allá de las fronteras y conquistar mercados internacionales con éxito.",
    category: "Expansión Digital",
    date: "10 de Febrero, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&h=675&fit=crop",
    keywords: ["expansión internacional eCommerce", "comercio transfronterizo", "globalización digital"]
  },
  {
    slug: "transformacion-digital-legacy-nube",
    title: "Transformación Digital: Del Legacy System a la Nube",
    excerpt: "Guía práctica para migrar sistemas legacy a arquitecturas cloud modernas sin interrumpir operaciones críticas del negocio.",
    category: "Expansión Digital",
    date: "9 de Febrero, 2026",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop",
    keywords: ["migración a la nube", "modernización sistemas", "infraestructura digital"]
  },
  {
    slug: "inteligencia-artificial-ecommerce-2026",
    title: "Inteligencia Artificial en eCommerce: Tendencias 2026",
    excerpt: "Las aplicaciones de IA que están revolucionando el comercio electrónico y cómo implementarlas en tu negocio B2B.",
    category: "Inteligencia Artificial",
    date: "8 de Febrero, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop",
    keywords: ["inteligencia artificial eCommerce", "IA B2B", "automatización comercio digital"]
  },
  {
    slug: "chatbots-ia-atencion-cliente-b2b",
    title: "Chatbots con IA: Revolucionando la Atención al Cliente B2B",
    excerpt: "Cómo los chatbots inteligentes están mejorando la experiencia del cliente empresarial y reduciendo costos operativos.",
    category: "Inteligencia Artificial",
    date: "7 de Febrero, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=675&fit=crop",
    keywords: ["chatbot IA", "atención cliente automatizada", "servicio cliente B2B"]
  },
  {
    slug: "personalizacion-ia-experiencia-cliente",
    title: "Personalización con IA: El Futuro de la Experiencia del Cliente",
    excerpt: "Descubre cómo la inteligencia artificial permite personalizar experiencias a escala en el comercio B2B.",
    category: "Inteligencia Artificial",
    date: "6 de Febrero, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop",
    keywords: ["personalización IA", "experiencia cliente personalizada", "machine learning B2B"]
  },
  {
    slug: "analisis-predictivo-ventas-b2b",
    title: "Análisis Predictivo: Anticipando Oportunidades de Venta B2B",
    excerpt: "Utiliza el poder del análisis predictivo para identificar oportunidades de venta antes que tu competencia.",
    category: "Inteligencia Artificial",
    date: "5 de Febrero, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80",
    keywords: ["análisis predictivo", "forecasting ventas", "inteligencia de negocios"]
  },
  {
    slug: "automatizacion-procesos-ia-b2b",
    title: "Automatización de Procesos con IA en Empresas B2B",
    excerpt: "Cómo la automatización inteligente está transformando operaciones y liberando tiempo para actividades estratégicas.",
    category: "Inteligencia Artificial",
    date: "4 de Febrero, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop",
    keywords: ["automatización procesos", "RPA", "eficiencia operacional"]
  },
  {
    slug: "estrategia-contenidos-b2b-2026",
    title: "Estrategia de Contenidos B2B que Genera Leads Calificados",
    excerpt: "Crea una estrategia de content marketing que atraiga y convierta a tus clientes ideales en el entorno B2B.",
    category: "Marketing Digital B2B",
    date: "3 de Febrero, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop",
    keywords: ["content marketing B2B", "generación leads", "estrategia contenidos"]
  },
  {
    slug: "linkedin-marketing-b2b-estrategias",
    title: "LinkedIn Marketing: Estrategias Avanzadas para B2B",
    excerpt: "Domina LinkedIn para generar leads calificados y posicionar tu marca como líder de pensamiento en tu industria.",
    category: "Marketing Digital B2B",
    date: "2 de Febrero, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=1200&h=675&fit=crop",
    keywords: ["LinkedIn marketing", "social selling", "generación leads LinkedIn"]
  },
  {
    slug: "account-based-marketing-abm",
    title: "Account-Based Marketing (ABM): Guía Completa 2026",
    excerpt: "Implementa una estrategia ABM efectiva para enfocarte en cuentas de alto valor y acelerar el ciclo de ventas.",
    category: "Marketing Digital B2B",
    date: "1 de Febrero, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=675&fit=crop",
    keywords: ["account based marketing", "ABM", "marketing cuentas clave"]
  },
  {
    slug: "seo-b2b-posicionamiento-organico",
    title: "SEO para B2B: Posicionamiento Orgánico que Genera Resultados",
    excerpt: "Estrategias de SEO específicas para empresas B2B que buscan atraer tráfico cualificado y generar oportunidades de negocio.",
    category: "Marketing Digital B2B",
    date: "31 de Enero, 2026",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=675&fit=crop",
    keywords: ["SEO B2B", "posicionamiento orgánico", "optimización motores búsqueda"]
  },
  {
    slug: "email-marketing-b2b-nurturing",
    title: "Email Marketing B2B: Nurturing que Convierte",
    excerpt: "Diseña campañas de email marketing que nutran leads y los conviertan en clientes a través del embudo de ventas.",
    category: "Marketing Digital B2B",
    date: "30 de Enero, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=675&fit=crop",
    keywords: ["email marketing B2B", "lead nurturing", "automatización email"]
  },
  {
    slug: "marketing-automation-b2b",
    title: "Marketing Automation: Escalando tu Estrategia B2B",
    excerpt: "Implementa automatización de marketing para escalar tus esfuerzos y mejorar la eficiencia de tu equipo.",
    category: "Marketing Digital B2B",
    date: "29 de Enero, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=675&fit=crop",
    keywords: ["marketing automation", "automatización marketing", "HubSpot"]
  },
  {
    slug: "video-marketing-b2b-estrategia",
    title: "Video Marketing B2B: Contenido Visual que Convierte",
    excerpt: "Aprovecha el poder del video para educar, inspirar y convertir a tus clientes empresariales.",
    category: "Marketing Digital B2B",
    date: "28 de Enero, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=675&fit=crop",
    keywords: ["video marketing B2B", "contenido visual", "marketing audiovisual"]
  },
  {
    slug: "webinars-b2b-generacion-leads",
    title: "Webinars B2B: Generación de Leads de Alta Calidad",
    excerpt: "Organiza webinars que posicionen tu expertise y generen leads calificados para tu equipo de ventas.",
    category: "Marketing Digital B2B",
    date: "27 de Enero, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=675&fit=crop",
    keywords: ["webinars B2B", "eventos virtuales", "generación leads webinars"]
  },
  {
    slug: "datos-analytics-marketing-b2b",
    title: "Datos y Analytics: Optimizando tu Marketing B2B",
    excerpt: "Utiliza datos y analytics para tomar decisiones informadas y optimizar continuamente tu estrategia de marketing.",
    category: "Marketing Digital B2B",
    date: "26 de Enero, 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=85",
    keywords: ["marketing analytics", "datos marketing", "optimización ROI"]
  },
  {
    slug: "tendencias-marketing-b2b-2026",
    title: "10 Tendencias de Marketing B2B que Dominarán 2026",
    excerpt: "Mantente adelante de la curva conociendo las tendencias que definirán el marketing B2B en 2026 y más allá.",
    category: "Marketing Digital B2B",
    date: "25 de Enero, 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=675&fit=crop",
    keywords: ["tendencias marketing B2B", "futuro marketing digital", "innovación marketing"]
  }
];
