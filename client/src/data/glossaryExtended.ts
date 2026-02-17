/**
 * Extended Glossary Content
 * Rich content for each glossary term: expanded definitions, examples,
 * industry references, key takeaways, and chart data for illustrations.
 */

export interface ChartData {
  type: "bar" | "pie" | "line" | "doughnut" | "horizontalBar";
  title: string;
  source?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
}

export interface Reference {
  title: string;
  author: string;
  type: "libro" | "estudio" | "herramienta" | "artículo" | "framework";
  description: string;
  url?: string;
}

export interface ExtendedContent {
  slug: string;
  extendedDefinition: string;
  keyPoints: string[];
  example: {
    title: string;
    description: string;
  };
  references: Reference[];
  chart?: ChartData;
  proTip?: string;
}

export const extendedGlossary: Record<string, ExtendedContent> = {
  "ab-testing": {
    slug: "ab-testing",
    extendedDefinition:
      "El A/B Testing es una metodología de experimentación controlada que permite tomar decisiones basadas en datos reales en lugar de suposiciones. Se divide el tráfico de forma aleatoria entre dos variantes (A y B) y se miden los resultados estadísticamente significativos. Las empresas líderes como Google, Amazon y Netflix ejecutan miles de tests A/B simultáneamente para optimizar cada aspecto de la experiencia del usuario, desde colores de botones hasta algoritmos de recomendación.",
    keyPoints: [
      "Requiere un tamaño de muestra estadísticamente significativo para obtener resultados confiables",
      "Solo se debe cambiar una variable a la vez para aislar el impacto de cada modificación",
      "La duración mínima recomendada es de 2 semanas para capturar ciclos de comportamiento completos",
      "Herramientas populares: Google Optimize, Optimizely, VWO, AB Tasty",
    ],
    example: {
      title: "Caso Booking.com",
      description:
        "Booking.com ejecuta más de 1,000 tests A/B simultáneos. En un test famoso, cambiar el color del botón de reserva de azul a naranja incrementó las conversiones un 3.2%, lo que representó millones de dólares en ingresos adicionales anuales.",
    },
    references: [
      {
        title: "Trustworthy Online Controlled Experiments",
        author: "Ron Kohavi, Diane Tang, Ya Xu",
        type: "libro",
        description:
          "Guía definitiva sobre experimentación online escrita por expertos de Microsoft y Google.",
      },
      {
        title: "Optimizely",
        author: "Optimizely Inc.",
        type: "herramienta",
        description:
          "Plataforma líder de experimentación digital utilizada por más del 30% de las empresas Fortune 500.",
        url: "https://www.optimizely.com",
      },
      {
        title: "The Surprising Power of Online Experiments",
        author: "Harvard Business Review",
        type: "artículo",
        description:
          "Artículo que documenta cómo Microsoft descubrió que pequeños cambios generan impactos de millones de dólares.",
      },
    ],
    chart: {
      type: "bar",
      title: "Impacto promedio del A/B Testing por industria",
      source: "VWO State of A/B Testing Report",
      labels: ["eCommerce", "SaaS", "Media", "Finanzas", "Travel"],
      datasets: [
        {
          label: "Mejora promedio en conversión (%)",
          data: [15.8, 12.3, 9.7, 11.2, 14.5],
          backgroundColor: [
            "oklch(0.70 0.18 50)",
            "oklch(0.65 0.18 50)",
            "oklch(0.60 0.18 50)",
            "oklch(0.55 0.18 50)",
            "oklch(0.50 0.18 50)",
          ],
        },
      ],
    },
    proTip:
      "No detengas un test antes de alcanzar significancia estadística (p < 0.05), incluso si los resultados parciales parecen concluyentes. Los resultados prematuros suelen ser engañosos.",
  },

  "above-the-fold": {
    slug: "above-the-fold",
    extendedDefinition:
      "El concepto 'Above the Fold' proviene de la industria periodística, donde el contenido más importante se colocaba en la mitad superior del periódico doblado. En el mundo digital, se refiere al área visible de una página web sin hacer scroll. Estudios de Nielsen Norman Group demuestran que los usuarios pasan el 57% de su tiempo de visualización en el contenido above the fold y el 74% en las dos primeras pantallas. Aunque el scroll es más común hoy, el contenido inicial sigue siendo determinante para la primera impresión y la decisión de permanecer en la página.",
    keyPoints: [
      "El 57% del tiempo de visualización se concentra above the fold según Nielsen Norman Group",
      "El CTA principal debe ser visible sin scroll para maximizar conversiones",
      "La resolución de pantalla varía: diseñar para múltiples breakpoints es esencial",
      "El contenido above the fold debe comunicar la propuesta de valor en menos de 5 segundos",
    ],
    example: {
      title: "Caso Basecamp",
      description:
        "Basecamp rediseñó su homepage colocando un headline claro, un subtítulo con beneficio y un CTA prominente above the fold. El resultado fue un incremento del 14% en registros de prueba gratuita.",
    },
    references: [
      {
        title: "Scrolling and Attention",
        author: "Nielsen Norman Group",
        type: "estudio",
        description:
          "Investigación con eye-tracking que demuestra cómo los usuarios distribuyen su atención en páginas web.",
        url: "https://www.nngroup.com",
      },
      {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        type: "libro",
        description:
          "Clásico de usabilidad web que establece principios fundamentales de diseño centrado en el usuario.",
      },
    ],
    chart: {
      type: "doughnut",
      title: "Distribución del tiempo de atención del usuario",
      source: "Nielsen Norman Group, 2024",
      labels: [
        "Above the Fold",
        "Segunda pantalla",
        "Tercera pantalla",
        "Resto de la página",
      ],
      datasets: [
        {
          label: "Tiempo de atención (%)",
          data: [57, 17, 12, 14],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.60 0.15 310)",
            "oklch(0.75 0.08 310)",
          ],
        },
      ],
    },
    proTip:
      "Usa herramientas como Hotjar o Crazy Egg para ver exactamente dónde está el fold en tu audiencia real, ya que varía enormemente entre dispositivos.",
  },

  "account-based-marketing-abm": {
    slug: "account-based-marketing-abm",
    extendedDefinition:
      "Account-Based Marketing (ABM) invierte el funnel tradicional de marketing: en lugar de lanzar una red amplia para captar leads, identifica primero las cuentas de mayor valor y crea campañas hiperpersonalizadas para cada una. Según ITSMA, el 87% de los marketers B2B reportan que ABM supera a otras iniciativas de marketing en ROI. La estrategia requiere una alineación estrecha entre marketing y ventas, donde ambos equipos colaboran para identificar, atraer y cerrar cuentas objetivo específicas.",
    keyPoints: [
      "El 87% de los marketers B2B reportan mayor ROI con ABM que con otras estrategias",
      "Requiere alineación total entre equipos de marketing y ventas (smarketing)",
      "Se clasifica en tres niveles: One-to-One (estratégico), One-to-Few (lite), One-to-Many (programático)",
      "El ciclo de ventas promedio se reduce un 30% con ABM bien implementado",
    ],
    example: {
      title: "Caso Snowflake",
      description:
        "Snowflake implementó ABM dirigido a las 500 cuentas enterprise más grandes. Personalizaron landing pages, contenido y secuencias de email para cada cuenta, logrando un incremento del 285% en pipeline generado y reduciendo el ciclo de ventas en un 40%.",
    },
    references: [
      {
        title: "ABM is B2B",
        author: "Sangram Vajre",
        type: "libro",
        description:
          "Guía práctica del cofundador de Terminus sobre cómo implementar ABM desde cero.",
      },
      {
        title: "ITSMA ABM Benchmark Study",
        author: "ITSMA/ABM Leadership Alliance",
        type: "estudio",
        description:
          "Estudio anual que mide la adopción y efectividad de ABM en empresas B2B globales.",
      },
      {
        title: "6sense",
        author: "6sense Inc.",
        type: "herramienta",
        description:
          "Plataforma de ABM con inteligencia artificial que identifica cuentas en el mercado y predice intención de compra.",
        url: "https://6sense.com",
      },
    ],
    chart: {
      type: "bar",
      title: "ROI comparativo: ABM vs Marketing Tradicional B2B",
      source: "ITSMA ABM Benchmark Study",
      labels: ["ABM Estratégico", "ABM Lite", "ABM Programático", "Inbound", "Outbound"],
      datasets: [
        {
          label: "ROI promedio (%)",
          data: [350, 220, 180, 150, 90],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.60 0.16 50)",
            "oklch(0.55 0.14 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.60 0.15 310)",
          ],
        },
      ],
    },
    proTip:
      "Empieza con ABM Lite (10-20 cuentas) antes de escalar. Necesitas validar tu ICP (Ideal Customer Profile) y afinar la personalización antes de invertir en ABM one-to-one.",
  },

  "api-application-programming-interface": {
    slug: "api-application-programming-interface",
    extendedDefinition:
      "Las APIs son el tejido conectivo del ecosistema digital moderno. Permiten que aplicaciones independientes se comuniquen e intercambien datos de forma estandarizada. En eCommerce, las APIs son fundamentales para integrar plataformas de pago (Stripe, PayU), logística (Servientrega, FedEx), ERPs (SAP, Oracle), CRMs (Salesforce, HubSpot) y marketplaces (Amazon, Mercado Libre). La economía API genera más de $2 billones anuales según Gartner, y se estima que el 90% de las aplicaciones web modernas dependen de APIs de terceros.",
    keyPoints: [
      "REST y GraphQL son los estilos de API más utilizados en eCommerce",
      "Las APIs permiten la arquitectura headless commerce, separando frontend de backend",
      "La seguridad API (OAuth 2.0, API keys, rate limiting) es crítica para proteger datos",
      "Plataformas como VTEX exponen más de 300 endpoints API para personalización total",
    ],
    example: {
      title: "Caso Rappi",
      description:
        "Rappi conecta más de 200 APIs simultáneamente: pasarelas de pago, geolocalización, restaurantes, supermercados, logística de última milla y notificaciones push. Esta arquitectura API-first les permite lanzar nuevas verticales (RappiTravel, RappiPay) en semanas en lugar de meses.",
    },
    references: [
      {
        title: "API Design Patterns",
        author: "JJ Geewax (Google)",
        type: "libro",
        description:
          "Patrones de diseño de APIs escritos por un ingeniero de Google, aplicables a cualquier plataforma.",
      },
      {
        title: "Postman",
        author: "Postman Inc.",
        type: "herramienta",
        description:
          "Plataforma de desarrollo y testing de APIs utilizada por más de 25 millones de desarrolladores.",
        url: "https://www.postman.com",
      },
    ],
    chart: {
      type: "line",
      title: "Crecimiento del uso de APIs en eCommerce (2019-2025)",
      source: "Gartner API Economy Report",
      labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
      datasets: [
        {
          label: "Llamadas API diarias (billones)",
          data: [1.2, 2.1, 3.8, 5.5, 8.2, 12.0, 16.5],
          borderColor: "oklch(0.65 0.18 50)",
          backgroundColor: "oklch(0.65 0.18 50 / 0.1)",
        },
      ],
    },
    proTip:
      "Documenta tus APIs con OpenAPI/Swagger desde el día uno. Una API bien documentada reduce el tiempo de integración de semanas a días.",
  },

  "average-order-value-aov": {
    slug: "average-order-value-aov",
    extendedDefinition:
      "El Average Order Value (AOV) es una de las tres palancas fundamentales del revenue en eCommerce, junto con el tráfico y la tasa de conversión. Se calcula dividiendo los ingresos totales entre el número de pedidos. Incrementar el AOV es generalmente más rentable que adquirir nuevos clientes, ya que el costo marginal de vender más a un cliente existente es significativamente menor. Según datos de Shopify, las tiendas que implementan estrategias de upselling y cross-selling logran incrementos de AOV entre 10% y 30%.",
    keyPoints: [
      "Fórmula: AOV = Ingresos Totales / Número de Pedidos",
      "Estrategias clave: upselling, cross-selling, bundles, envío gratis con mínimo de compra",
      "El AOV promedio en eCommerce varía entre $50-$150 USD según la industria",
      "Un incremento del 10% en AOV puede tener mayor impacto que un 10% más de tráfico",
    ],
    example: {
      title: "Caso Amazon",
      description:
        "La sección 'Frecuentemente comprados juntos' de Amazon genera el 35% de sus ingresos. Esta estrategia de cross-selling incrementó el AOV promedio en un 29%, demostrando que las recomendaciones inteligentes son la palanca más poderosa para aumentar el valor del pedido.",
    },
    references: [
      {
        title: "Predictably Irrational",
        author: "Dan Ariely",
        type: "libro",
        description:
          "Explica la psicología detrás de las decisiones de compra y cómo el framing afecta la percepción de valor.",
      },
      {
        title: "Shopify AOV Benchmark Report",
        author: "Shopify",
        type: "estudio",
        description:
          "Reporte anual con benchmarks de AOV por industria, región y tamaño de empresa.",
      },
    ],
    chart: {
      type: "bar",
      title: "AOV promedio por industria en eCommerce (USD)",
      source: "Shopify Commerce Report 2024",
      labels: ["Moda", "Electrónica", "Hogar", "Salud", "Alimentos", "Lujo"],
      datasets: [
        {
          label: "AOV promedio (USD)",
          data: [86, 175, 120, 65, 45, 350],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.60 0.16 50)",
            "oklch(0.55 0.14 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.55 0.18 310)",
            "oklch(0.60 0.16 310)",
          ],
        },
      ],
    },
    proTip:
      "Implementa umbrales de envío gratis un 20-30% por encima de tu AOV actual. Es la táctica más efectiva para incrementar el valor del pedido sin descuentos.",
  },

  "b2b-business-to-business": {
    slug: "b2b-business-to-business",
    extendedDefinition:
      "El modelo B2B representa el mayor volumen de transacciones comerciales a nivel global, superando al B2C por un factor de 5:1. En el contexto digital, el eCommerce B2B está experimentando una transformación acelerada: según McKinsey, el 65% de las empresas B2B ahora ofrecen canales de venta digital, y los compradores B2B completan el 70% de su proceso de decisión antes de contactar a un vendedor. Las plataformas como VTEX, Magento y SAP Commerce Cloud permiten crear experiencias B2B con catálogos personalizados, precios por volumen, aprobaciones de compra y crédito comercial.",
    keyPoints: [
      "El eCommerce B2B global alcanzará $20.9 trillones para 2027 según Statista",
      "Los compradores B2B esperan experiencias similares al B2C (self-service, personalización)",
      "El ciclo de ventas B2B es más largo y complejo, con múltiples tomadores de decisión",
      "La integración con ERPs y sistemas de procurement es fundamental en B2B",
    ],
    example: {
      title: "Caso Grainger (W.W. Grainger)",
      description:
        "Grainger, distribuidor industrial B2B, genera más del 75% de sus $16 mil millones en ventas a través de canales digitales. Su plataforma ofrece catálogos personalizados por cliente, precios negociados, reordenamiento automático y integración con sistemas de procurement corporativos.",
    },
    references: [
      {
        title: "B2B eCommerce: The Definitive Guide",
        author: "McKinsey & Company",
        type: "estudio",
        description:
          "Análisis exhaustivo del estado y futuro del eCommerce B2B con datos de más de 3,500 empresas.",
      },
      {
        title: "VTEX B2B Suite",
        author: "VTEX",
        type: "herramienta",
        description:
          "Suite de herramientas especializadas para eCommerce B2B: organizaciones, cotizaciones, aprobaciones y precios personalizados.",
        url: "https://vtex.com",
      },
    ],
    chart: {
      type: "line",
      title: "Crecimiento del eCommerce B2B global (trillones USD)",
      source: "Statista Digital Market Outlook",
      labels: ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027"],
      datasets: [
        {
          label: "Volumen eCommerce B2B",
          data: [6.6, 8.5, 10.7, 13.1, 15.2, 17.1, 19.0, 20.9],
          borderColor: "oklch(0.65 0.18 50)",
          backgroundColor: "oklch(0.65 0.18 50 / 0.1)",
        },
      ],
    },
    proTip:
      "En B2B, el self-service digital no reemplaza a los vendedores, los potencia. Los mejores resultados vienen de un modelo híbrido donde el vendedor se enfoca en cuentas estratégicas y el digital maneja el long tail.",
  },

  "b2c-business-to-consumer": {
    slug: "b2c-business-to-consumer",
    extendedDefinition:
      "El modelo B2C es el más visible del comercio electrónico, donde las empresas venden directamente al consumidor final. La pandemia aceleró la adopción digital en 10 años según McKinsey, y el eCommerce B2C representa ahora más del 20% del retail global. Las tendencias actuales incluyen el social commerce, la personalización con IA, el live shopping y la experiencia omnicanal. En Latinoamérica, el eCommerce B2C creció un 25% en 2024, liderado por Brasil, México y Colombia.",
    keyPoints: [
      "El eCommerce B2C global superó los $5.8 trillones en 2024",
      "El móvil representa más del 72% de las transacciones B2C",
      "La personalización puede incrementar los ingresos B2C entre un 10-15%",
      "El social commerce es el canal B2C de mayor crecimiento (+30% anual)",
    ],
    example: {
      title: "Caso Mercado Libre",
      description:
        "Mercado Libre se convirtió en la empresa más valiosa de Latinoamérica con una capitalización de más de $80 mil millones. Su ecosistema B2C integra marketplace, fintech (Mercado Pago), logística (Mercado Envíos) y publicidad, procesando más de 40 compras por segundo.",
    },
    references: [
      {
        title: "eCommerce in Latin America",
        author: "eMarketer/Insider Intelligence",
        type: "estudio",
        description:
          "Reporte anual sobre el estado del eCommerce B2C en Latinoamérica con proyecciones por país.",
      },
    ],
    chart: {
      type: "doughnut",
      title: "Distribución del eCommerce B2C en LATAM por país",
      source: "eMarketer 2024",
      labels: ["Brasil", "México", "Argentina", "Colombia", "Chile", "Otros"],
      datasets: [
        {
          label: "Participación de mercado (%)",
          data: [42, 22, 12, 8, 6, 10],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.55 0.18 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.60 0.18 310)",
            "oklch(0.70 0.12 310)",
            "oklch(0.80 0.05 310)",
          ],
        },
      ],
    },
    proTip:
      "En B2C, la velocidad de carga es dinero: cada segundo adicional de carga reduce las conversiones un 7%. Invierte en CDN, optimización de imágenes y lazy loading.",
  },

  "bounce-rate": {
    slug: "bounce-rate",
    extendedDefinition:
      "El Bounce Rate o tasa de rebote mide el porcentaje de sesiones en las que el usuario abandona el sitio sin interactuar más allá de la página de entrada. En Google Analytics 4, la métrica ha evolucionado: ahora se considera 'rebote' una sesión que no fue 'engaged' (menos de 10 segundos, sin conversión, sin segunda página vista). Un bounce rate alto no siempre es negativo; en blogs o páginas de contenido, puede indicar que el usuario encontró la información que buscaba. Sin embargo, en páginas de producto o landing pages, un bounce rate alto señala problemas de relevancia, velocidad o UX.",
    keyPoints: [
      "Bounce rate promedio por tipo de sitio: blogs 70-90%, landing pages 60-90%, eCommerce 20-45%",
      "GA4 redefine el bounce rate como el inverso del 'engagement rate'",
      "Factores principales: velocidad de carga, relevancia del contenido, diseño mobile-first",
      "Un bounce rate alto en páginas de producto indica desalineación entre expectativa y realidad",
    ],
    example: {
      title: "Caso Walmart",
      description:
        "Walmart descubrió que por cada segundo de mejora en velocidad de carga, las conversiones aumentaban un 2%. Redujeron su bounce rate del 48% al 31% optimizando imágenes, implementando lazy loading y migrando a una CDN global.",
    },
    references: [
      {
        title: "Web Performance Optimization",
        author: "Google Web.dev",
        type: "framework",
        description:
          "Guía oficial de Google sobre Core Web Vitals y su impacto en métricas de engagement.",
        url: "https://web.dev",
      },
    ],
    chart: {
      type: "horizontalBar",
      title: "Bounce Rate promedio por tipo de sitio web",
      source: "CXL Institute Research",
      labels: [
        "eCommerce",
        "B2B SaaS",
        "Landing Pages",
        "Blogs",
        "Portales de noticias",
        "Directorios",
      ],
      datasets: [
        {
          label: "Bounce Rate promedio (%)",
          data: [33, 40, 65, 78, 55, 60],
          backgroundColor: "oklch(0.65 0.18 50)",
        },
      ],
    },
    proTip:
      "Segmenta el bounce rate por fuente de tráfico. Un bounce rate alto desde redes sociales es normal; desde búsqueda orgánica indica problemas de relevancia o meta descriptions engañosas.",
  },

  "buyer-persona": {
    slug: "buyer-persona",
    extendedDefinition:
      "Un Buyer Persona es una representación semi-ficticia del cliente ideal basada en investigación real: entrevistas, datos de CRM, analytics y encuestas. A diferencia de la segmentación demográfica tradicional, los buyer personas incluyen motivaciones, frustraciones, objetivos, canales preferidos y criterios de decisión. Según HubSpot, las empresas que usan buyer personas logran un 73% más de conversiones. Un error común es crear demasiados personas; la recomendación es empezar con 3-5 que representen el 80% de los ingresos.",
    keyPoints: [
      "Basarse en datos reales (entrevistas, analytics) no en suposiciones",
      "Incluir: demografía, objetivos, retos, canales preferidos, objeciones de compra",
      "Actualizar los personas al menos cada 12 meses",
      "Cada pieza de contenido y campaña debe dirigirse a un persona específico",
    ],
    example: {
      title: "Caso HubSpot",
      description:
        "HubSpot creó dos buyer personas principales: 'Marketing Mary' (directora de marketing en empresa mediana) y 'Owner Ollie' (dueño de pequeña empresa). Esta segmentación les permitió personalizar todo su funnel, desde el blog hasta los planes de precios, incrementando la conversión de leads un 73%.",
    },
    references: [
      {
        title: "Buyer Personas",
        author: "Adele Revella",
        type: "libro",
        description:
          "Metodología de las '5 Rings of Buying Insight' para crear buyer personas basados en entrevistas reales.",
      },
      {
        title: "Make My Persona",
        author: "HubSpot",
        type: "herramienta",
        description:
          "Herramienta gratuita de HubSpot para crear buyer personas paso a paso.",
        url: "https://www.hubspot.com/make-my-persona",
      },
    ],
    chart: {
      type: "bar",
      title: "Impacto de usar Buyer Personas en métricas de marketing",
      source: "HubSpot State of Marketing Report",
      labels: [
        "Conversión de leads",
        "Engagement email",
        "Tráfico orgánico",
        "ROI campañas",
        "Ciclo de ventas",
      ],
      datasets: [
        {
          label: "Mejora (%)",
          data: [73, 45, 55, 38, -25],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.60 0.16 50)",
            "oklch(0.55 0.14 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.55 0.18 310)",
          ],
        },
      ],
    },
    proTip:
      "Entrevista a clientes que NO compraron además de los que sí. Las razones de no-compra son más valiosas que las de compra para refinar tu persona.",
  },

  "business-intelligence-bi": {
    slug: "business-intelligence-bi",
    extendedDefinition:
      "Business Intelligence (BI) transforma datos crudos en información accionable para la toma de decisiones estratégicas. En eCommerce, BI permite analizar patrones de compra, predecir demanda, optimizar inventario y personalizar experiencias. Las herramientas modernas de BI como Tableau, Power BI y Looker democratizan el acceso a datos, permitiendo que equipos no técnicos creen sus propios análisis. Según Dresner Advisory, las empresas que adoptan BI reportan un incremento promedio del 127% en ROI en los primeros 3 años.",
    keyPoints: [
      "Las 4 capas de BI: recolección de datos, almacenamiento (data warehouse), análisis y visualización",
      "Self-service BI permite que usuarios de negocio creen reportes sin depender de IT",
      "La integración de IA/ML en BI permite análisis predictivo y prescriptivo",
      "El ROI promedio de implementar BI es del 127% en 3 años según Dresner Advisory",
    ],
    example: {
      title: "Caso Grupo Éxito",
      description:
        "Grupo Éxito implementó una plataforma de BI que integra datos de 500+ tiendas, eCommerce y programas de lealtad. El análisis predictivo de demanda redujo el desperdicio de alimentos un 15% y optimizó el inventario, ahorrando más de $20 millones USD anuales.",
    },
    references: [
      {
        title: "Power BI",
        author: "Microsoft",
        type: "herramienta",
        description:
          "Herramienta de BI líder del mercado con integración nativa con el ecosistema Microsoft.",
        url: "https://powerbi.microsoft.com",
      },
      {
        title: "Storytelling with Data",
        author: "Cole Nussbaumer Knaflic",
        type: "libro",
        description:
          "Guía esencial sobre cómo comunicar insights de datos de forma efectiva a través de visualizaciones.",
      },
    ],
    chart: {
      type: "pie",
      title: "Herramientas de BI más utilizadas en empresas",
      source: "Gartner Magic Quadrant for BI 2024",
      labels: ["Power BI", "Tableau", "Qlik", "Looker", "SAP Analytics", "Otros"],
      datasets: [
        {
          label: "Cuota de mercado (%)",
          data: [36, 22, 12, 10, 8, 12],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.55 0.18 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.60 0.18 310)",
            "oklch(0.70 0.12 310)",
            "oklch(0.80 0.05 310)",
          ],
        },
      ],
    },
    proTip:
      "Antes de elegir una herramienta de BI, define tus KPIs críticos y fuentes de datos. La herramienta más cara no es la mejor; la mejor es la que tu equipo realmente usará.",
  },

  "call-to-action-cta": {
    slug: "call-to-action-cta",
    extendedDefinition:
      "El Call to Action (CTA) es el elemento más crítico de cualquier página orientada a conversión. Un CTA efectivo combina diseño visual prominente, copy persuasivo y ubicación estratégica para guiar al usuario hacia la acción deseada. Según WordStream, los CTAs personalizados convierten un 202% mejor que los genéricos. Los principios clave incluyen: usar verbos de acción, crear urgencia, reducir fricción y alinear el CTA con la etapa del buyer journey. En eCommerce, el CTA del botón de compra es responsable directo de la conversión final.",
    keyPoints: [
      "Los CTAs personalizados convierten 202% mejor que los genéricos (WordStream)",
      "El color del CTA debe contrastar con el fondo; no existe un 'mejor color universal'",
      "Usar primera persona ('Quiero mi descuento') supera a segunda persona ('Obtén tu descuento') en un 90%",
      "Un solo CTA por sección evita la parálisis de decisión",
    ],
    example: {
      title: "Caso Netflix",
      description:
        "Netflix simplificó su CTA de registro a un solo botón rojo con el texto 'Comienza tu mes gratis'. La eliminación de campos de formulario y la promesa clara de valor sin riesgo contribuyeron a una tasa de conversión del 8.4% en su landing page, muy superior al promedio de la industria.",
    },
    references: [
      {
        title: "Call to Action: Secret Formulas",
        author: "Bryan Eisenberg, Jeffrey Eisenberg",
        type: "libro",
        description:
          "Fórmulas probadas para crear CTAs que convierten, basadas en décadas de testing.",
      },
    ],
    chart: {
      type: "bar",
      title: "Impacto de diferentes técnicas de CTA en conversión",
      source: "HubSpot CTA Research",
      labels: [
        "CTA personalizado",
        "Primera persona",
        "Con urgencia",
        "Color contrastante",
        "Above the fold",
      ],
      datasets: [
        {
          label: "Incremento en conversión (%)",
          data: [202, 90, 45, 32, 25],
          backgroundColor: "oklch(0.65 0.18 50)",
        },
      ],
    },
    proTip:
      "Testea el microcopy de tu CTA antes que el color. 'Empezar gratis' vs 'Crear cuenta' puede generar diferencias de conversión del 30% o más.",
  },

  "churn-rate": {
    slug: "churn-rate",
    extendedDefinition:
      "El Churn Rate es la métrica que mide la velocidad a la que una empresa pierde clientes. Es especialmente crítica en modelos de suscripción y SaaS, donde la retención determina la viabilidad del negocio. Según Bain & Company, incrementar la retención un 5% puede aumentar las ganancias entre un 25% y 95%. El churn se clasifica en voluntario (el cliente decide cancelar) e involuntario (fallo de pago, tarjeta expirada). Las estrategias de reducción incluyen onboarding efectivo, customer success proactivo, y análisis predictivo de señales de abandono.",
    keyPoints: [
      "Fórmula: Churn Rate = (Clientes perdidos / Clientes al inicio del período) × 100",
      "Churn rate aceptable en SaaS: 3-5% mensual para SMB, <1% mensual para enterprise",
      "El churn involuntario (fallos de pago) representa el 20-40% del churn total",
      "Reducir el churn un 5% puede incrementar ganancias entre 25-95% (Bain & Company)",
    ],
    example: {
      title: "Caso Spotify",
      description:
        "Spotify redujo su churn rate del 7.5% al 3.9% mensual implementando playlists personalizadas con IA (Discover Weekly), notificaciones de artistas favoritos y un proceso de cancelación con ofertas de retención escalonadas. El Discover Weekly por sí solo redujo el churn un 20%.",
    },
    references: [
      {
        title: "The Loyalty Effect",
        author: "Frederick Reichheld (Bain & Company)",
        type: "libro",
        description:
          "Estudio seminal sobre el impacto económico de la retención de clientes en la rentabilidad empresarial.",
      },
      {
        title: "ProfitWell/Paddle",
        author: "Paddle",
        type: "herramienta",
        description:
          "Plataforma de métricas de suscripción que incluye análisis de churn y recuperación automática de pagos fallidos.",
        url: "https://www.paddle.com",
      },
    ],
    chart: {
      type: "line",
      title: "Impacto del Churn Rate en ingresos a 24 meses (base: $100K MRR)",
      source: "Modelo de proyección SaaS",
      labels: ["Mes 0", "Mes 4", "Mes 8", "Mes 12", "Mes 16", "Mes 20", "Mes 24"],
      datasets: [
        {
          label: "Churn 2% mensual",
          data: [100, 92, 85, 78, 72, 66, 61],
          borderColor: "oklch(0.65 0.18 50)",
          backgroundColor: "oklch(0.65 0.18 50 / 0.1)",
        },
        {
          label: "Churn 5% mensual",
          data: [100, 81, 66, 54, 44, 36, 29],
          borderColor: "oklch(0.50 0.20 310)",
          backgroundColor: "oklch(0.50 0.20 310 / 0.1)",
        },
        {
          label: "Churn 10% mensual",
          data: [100, 66, 43, 28, 19, 12, 8],
          borderColor: "oklch(0.70 0.15 25)",
          backgroundColor: "oklch(0.70 0.15 25 / 0.1)",
        },
      ],
    },
    proTip:
      "Implementa un sistema de 'health score' para tus clientes que combine métricas de uso, engagement y soporte. Interviene proactivamente cuando el score baja, no cuando el cliente ya pidió cancelar.",
  },

  "content-marketing": {
    slug: "content-marketing",
    extendedDefinition:
      "Content Marketing es una estrategia a largo plazo que construye confianza, autoridad y relaciones con la audiencia a través de contenido valioso. A diferencia de la publicidad tradicional, no interrumpe sino que atrae. Según el Content Marketing Institute, el 72% de los marketers reportan que el content marketing incrementa el engagement y el número de leads. El contenido puede tomar múltiples formas: blogs, videos, podcasts, infografías, whitepapers, webinars y casos de estudio. La clave está en crear contenido que resuelva problemas reales de la audiencia objetivo.",
    keyPoints: [
      "El content marketing genera 3x más leads que el marketing tradicional a un 62% menos de costo",
      "El 72% de los marketers reportan mayor engagement con content marketing (CMI)",
      "Los formatos más efectivos: video (86%), blogs (67%), infografías (45%)",
      "El SEO y el content marketing son inseparables: el contenido alimenta el posicionamiento orgánico",
    ],
    example: {
      title: "Caso HubSpot Blog",
      description:
        "El blog de HubSpot recibe más de 7 millones de visitas mensuales y es responsable del 80% de sus leads. Su estrategia de 'pillar pages' y topic clusters les posiciona en las primeras posiciones de Google para miles de términos de marketing, generando un pipeline de $100M+ anuales.",
    },
    references: [
      {
        title: "They Ask, You Answer",
        author: "Marcus Sheridan",
        type: "libro",
        description:
          "Metodología de content marketing basada en responder honestamente las preguntas de los clientes.",
      },
      {
        title: "Content Marketing Institute",
        author: "CMI",
        type: "framework",
        description:
          "Organización líder en educación y benchmarks de content marketing a nivel global.",
        url: "https://contentmarketinginstitute.com",
      },
    ],
    chart: {
      type: "bar",
      title: "Formatos de contenido más efectivos para B2B",
      source: "Content Marketing Institute B2B Report 2024",
      labels: ["Video", "Blog posts", "Casos de estudio", "Infografías", "Whitepapers", "Podcasts"],
      datasets: [
        {
          label: "Efectividad reportada (%)",
          data: [86, 67, 62, 45, 43, 38],
          backgroundColor: "oklch(0.65 0.18 50)",
        },
      ],
    },
    proTip:
      "Aplica la regla 80/20: el 80% de tu contenido debe educar y resolver problemas; solo el 20% debe ser promocional. El contenido que vende sin vender es el que mejor convierte.",
  },

  "conversion-rate": {
    slug: "conversion-rate",
    extendedDefinition:
      "La tasa de conversión es la métrica más directa para medir la efectividad de un sitio web o campaña. Se calcula dividiendo el número de conversiones entre el total de visitantes y multiplicando por 100. En eCommerce, la conversión promedio global es del 2.5-3%, pero varía significativamente por industria, dispositivo y fuente de tráfico. Cada punto porcentual de mejora en conversión tiene un impacto directo en ingresos sin necesidad de invertir más en adquisición de tráfico, lo que la convierte en una de las métricas con mayor ROI de optimización.",
    keyPoints: [
      "Fórmula: Conversion Rate = (Conversiones / Visitantes) × 100",
      "Promedio global eCommerce: 2.5-3% (desktop: 3.5%, mobile: 1.8%)",
      "La conversión varía hasta 5x entre industrias (alimentos 5.5% vs lujo 1.1%)",
      "Mejorar la conversión 0.5% puede equivaler a duplicar el presupuesto de adquisición",
    ],
    example: {
      title: "Caso Zalando",
      description:
        "Zalando incrementó su tasa de conversión del 2.1% al 3.8% en 18 meses implementando: recomendaciones con IA, checkout en un paso, envío y devolución gratis, y tallas predictivas. Esto representó un incremento de €800 millones en ingresos anuales.",
    },
    references: [
      {
        title: "Conversion Optimization",
        author: "Khalid Saleh, Ayat Shukairy",
        type: "libro",
        description:
          "Guía completa de optimización de conversión con frameworks probados y casos de estudio.",
      },
    ],
    chart: {
      type: "bar",
      title: "Tasa de conversión promedio por industria en eCommerce",
      source: "Statista eCommerce Benchmarks 2024",
      labels: ["Alimentos", "Salud", "Moda", "Electrónica", "Muebles", "Lujo"],
      datasets: [
        {
          label: "Tasa de conversión (%)",
          data: [5.5, 4.2, 2.8, 2.1, 1.5, 1.1],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.60 0.16 50)",
            "oklch(0.55 0.14 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.55 0.18 310)",
            "oklch(0.60 0.16 310)",
          ],
        },
      ],
    },
    proTip:
      "No optimices la conversión general; segmenta por dispositivo, fuente de tráfico y tipo de usuario. La conversión mobile suele ser la mitad que desktop, y ahí está tu mayor oportunidad.",
  },

  "conversion-rate-optimization-cro": {
    slug: "conversion-rate-optimization-cro",
    extendedDefinition:
      "CRO es la disciplina de mejorar sistemáticamente el porcentaje de visitantes que realizan una acción deseada. Va más allá de cambiar colores de botones: implica entender la psicología del usuario, analizar datos cuantitativos y cualitativos, formular hipótesis y validarlas mediante experimentación. El proceso CRO sigue un ciclo: investigación → hipótesis → priorización → testing → análisis → implementación. Según Econsultancy, las empresas que invierten en CRO obtienen un ROI promedio del 223%.",
    keyPoints: [
      "El ROI promedio de CRO es del 223% según Econsultancy",
      "El framework PIE (Potential, Importance, Ease) ayuda a priorizar tests",
      "Combina datos cuantitativos (analytics) con cualitativos (heatmaps, encuestas, user testing)",
      "Solo el 1 de cada 7 tests A/B produce un resultado ganador significativo",
    ],
    example: {
      title: "Caso Airbnb",
      description:
        "Airbnb tiene un equipo dedicado de CRO que ejecuta más de 500 experimentos al año. Un test famoso fue agregar fotografía profesional gratuita para anfitriones, lo que incrementó las reservas un 24% y se convirtió en una ventaja competitiva clave de la plataforma.",
    },
    references: [
      {
        title: "You Should Test That",
        author: "Chris Goward",
        type: "libro",
        description:
          "Framework LIFT para optimización de conversión: propuesta de valor, relevancia, claridad, urgencia, ansiedad y distracción.",
      },
      {
        title: "Hotjar",
        author: "Hotjar Ltd.",
        type: "herramienta",
        description:
          "Suite de herramientas CRO que incluye heatmaps, grabaciones de sesión, encuestas y funnels de conversión.",
        url: "https://www.hotjar.com",
      },
    ],
    chart: {
      type: "pie",
      title: "Distribución del presupuesto CRO por actividad",
      source: "CXL Institute CRO Survey",
      labels: [
        "A/B Testing",
        "Investigación de usuarios",
        "Análisis de datos",
        "Herramientas",
        "Capacitación",
      ],
      datasets: [
        {
          label: "Distribución (%)",
          data: [35, 25, 20, 12, 8],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.55 0.18 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.60 0.18 310)",
            "oklch(0.75 0.08 310)",
          ],
        },
      ],
    },
    proTip:
      "Antes de testear, investiga. El 80% del éxito en CRO viene de la fase de investigación (analytics, heatmaps, encuestas). Sin entender el 'por qué', los tests son disparos al aire.",
  },

  "customer-acquisition-cost-cac": {
    slug: "customer-acquisition-cost-cac",
    extendedDefinition:
      "El CAC mide cuánto cuesta adquirir un nuevo cliente, incluyendo todos los gastos de marketing y ventas. Es una métrica fundamental para evaluar la sostenibilidad del negocio: si el CAC supera al CLV, el modelo no es viable. La relación CLV:CAC ideal es de 3:1 o superior. En eCommerce, el CAC ha aumentado un 60% en los últimos 5 años debido a la mayor competencia por atención digital y los cambios en privacidad (iOS 14.5, eliminación de cookies de terceros).",
    keyPoints: [
      "Fórmula: CAC = (Gasto total en marketing + ventas) / Número de nuevos clientes",
      "Ratio ideal CLV:CAC es 3:1 (por cada $1 en adquisición, $3 en valor de vida)",
      "El CAC en eCommerce ha aumentado 60% en 5 años por mayor competencia digital",
      "El payback period (tiempo para recuperar el CAC) ideal es menor a 12 meses",
    ],
    example: {
      title: "Caso Dollar Shave Club",
      description:
        "Dollar Shave Club redujo su CAC de $45 a $8 con un video viral que costó $4,500 y generó 12,000 suscriptores en 48 horas. Su modelo de suscripción con CLV de $180 les dio un ratio CLV:CAC de 22:1, lo que llevó a Unilever a adquirirlos por $1 billón.",
    },
    references: [
      {
        title: "The SaaS CFO",
        author: "Ben Murray",
        type: "framework",
        description:
          "Framework de métricas SaaS que incluye CAC, CAC Payback Period y CAC por canal.",
        url: "https://www.thesaascfo.com",
      },
    ],
    chart: {
      type: "bar",
      title: "CAC promedio por industria (USD)",
      source: "ProfitWell Benchmarks 2024",
      labels: ["SaaS", "eCommerce", "Fintech", "EdTech", "HealthTech", "Travel"],
      datasets: [
        {
          label: "CAC promedio (USD)",
          data: [395, 85, 520, 245, 310, 120],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.60 0.16 50)",
            "oklch(0.55 0.14 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.55 0.18 310)",
            "oklch(0.60 0.16 310)",
          ],
        },
      ],
    },
    proTip:
      "Calcula el CAC por canal (orgánico, paid, referral) para identificar dónde invertir más. El CAC orgánico suele ser 5-10x menor que el paid, pero tarda más en escalar.",
  },

  "customer-journey": {
    slug: "customer-journey",
    extendedDefinition:
      "El Customer Journey mapea cada interacción entre un cliente y una marca, desde el primer descubrimiento hasta la post-compra y la recomendación. En promedio, un comprador B2B tiene 27 touchpoints antes de tomar una decisión, y un comprador B2C tiene 8-12. Mapear este recorrido permite identificar puntos de fricción, oportunidades de mejora y momentos clave de decisión. Las herramientas modernas permiten crear journey maps dinámicos que se actualizan con datos en tiempo real.",
    keyPoints: [
      "Las 5 etapas clásicas: Awareness, Consideration, Decision, Retention, Advocacy",
      "Un comprador B2B tiene en promedio 27 touchpoints antes de decidir",
      "El 73% de los consumidores usan múltiples canales durante su journey",
      "Los momentos de verdad (moments of truth) son los puntos donde se gana o pierde al cliente",
    ],
    example: {
      title: "Caso Starbucks",
      description:
        "Starbucks mapeó su customer journey completo e identificó que el momento más frustrante era la espera en cola. Implementaron Mobile Order & Pay, que permite ordenar desde la app, reduciendo el tiempo de espera un 80% y aumentando la frecuencia de visita un 25%.",
    },
    references: [
      {
        title: "Mapping Experiences",
        author: "Jim Kalbach",
        type: "libro",
        description:
          "Guía completa sobre cómo crear mapas de experiencia, journey maps y service blueprints.",
      },
    ],
    chart: {
      type: "bar",
      title: "Touchpoints promedio por etapa del Customer Journey",
      source: "Salesforce State of the Connected Customer",
      labels: ["Awareness", "Consideration", "Decision", "Retention", "Advocacy"],
      datasets: [
        {
          label: "Touchpoints promedio",
          data: [8, 6, 5, 4, 3],
          backgroundColor: "oklch(0.65 0.18 50)",
        },
      ],
    },
    proTip:
      "Mapea el journey desde la perspectiva del cliente, no de tu organización. Incluye emociones en cada etapa: los puntos de mayor frustración son tus mayores oportunidades de diferenciación.",
  },

  "customer-lifetime-value-clv": {
    slug: "customer-lifetime-value-clv",
    extendedDefinition:
      "El CLV predice el valor económico total que un cliente generará durante toda su relación con la empresa. Es la métrica más importante para determinar cuánto invertir en adquisición y retención. Según Harvard Business Review, adquirir un nuevo cliente cuesta 5-25x más que retener uno existente. Las empresas con mayor CLV son las que logran crear hábitos de recompra, programas de lealtad efectivos y experiencias excepcionales que generan advocacy.",
    keyPoints: [
      "Fórmula simplificada: CLV = (Valor promedio de compra × Frecuencia de compra × Vida del cliente)",
      "Adquirir un nuevo cliente cuesta 5-25x más que retener uno existente (HBR)",
      "El top 1% de clientes vale 18x más que el cliente promedio en eCommerce",
      "Incrementar la retención un 5% puede aumentar ganancias entre 25-95%",
    ],
    example: {
      title: "Caso Starbucks",
      description:
        "El CLV promedio de un cliente Starbucks es de $14,099 USD a lo largo de 20 años. Su programa de lealtad (Starbucks Rewards) con 30+ millones de miembros activos incrementa la frecuencia de visita un 40% y el ticket promedio un 20%, siendo el motor principal de su CLV excepcional.",
    },
    references: [
      {
        title: "Customer Centricity",
        author: "Peter Fader (Wharton)",
        type: "libro",
        description:
          "Framework para identificar y maximizar el valor de los mejores clientes basado en modelos probabilísticos de CLV.",
      },
    ],
    chart: {
      type: "bar",
      title: "CLV promedio por industria (USD)",
      source: "Kissmetrics CLV Research",
      labels: ["Automotive", "SaaS", "Retail", "Telecom", "Banking", "eCommerce"],
      datasets: [
        {
          label: "CLV promedio (USD)",
          data: [52000, 8400, 1800, 6200, 12500, 950],
          backgroundColor: [
            "oklch(0.65 0.18 50)",
            "oklch(0.60 0.16 50)",
            "oklch(0.55 0.14 50)",
            "oklch(0.50 0.20 310)",
            "oklch(0.55 0.18 310)",
            "oklch(0.60 0.16 310)",
          ],
        },
      ],
    },
    proTip:
      "Segmenta tu base de clientes por CLV y trata diferente a cada segmento. El 20% superior merece experiencias premium; el 20% inferior puede estar costándote dinero.",
  },
};

// Add remaining terms to the extendedGlossary object
// We need to merge these into the existing object
Object.assign(extendedGlossary, {
  "dashboard": {
    slug: "dashboard",
    extendedDefinition: "Un dashboard efectivo no es simplemente una colección de gráficos, sino una narrativa visual que permite tomar decisiones en segundos. Los mejores dashboards siguen el principio de 'glanceability': la información más crítica debe ser comprensible en menos de 5 segundos. En eCommerce, los dashboards típicamente monitorean ventas en tiempo real, inventario, conversiones, tráfico y satisfacción del cliente. Según Databox, las empresas que revisan dashboards diariamente tienen un 30% más de probabilidad de alcanzar sus objetivos.",
    keyPoints: ["Principio de los 5 segundos: la información clave debe ser comprensible de un vistazo", "Máximo 7±2 métricas por dashboard para evitar sobrecarga cognitiva", "Usar jerarquía visual: las métricas más importantes arriba a la izquierda", "Actualización en tiempo real para métricas operativas; diaria para métricas estratégicas"],
    example: { title: "Caso Shopify", description: "El dashboard de Shopify para merchants muestra ventas en tiempo real, sesiones activas, tasa de conversión y top productos en una sola vista. Su diseño minimalista con sparklines y comparaciones temporales permite que merchants tomen decisiones de inventario y marketing en segundos." },
    references: [{ title: "Information Dashboard Design", author: "Stephen Few", type: "libro", description: "Referencia definitiva sobre principios de diseño de dashboards efectivos y visualización de datos." }, { title: "Databox", author: "Databox Inc.", type: "herramienta", description: "Plataforma que conecta múltiples fuentes de datos para crear dashboards unificados con KPIs en tiempo real.", url: "https://databox.com" }],
    chart: { type: "doughnut", title: "KPIs más monitoreados en dashboards de eCommerce", source: "Databox eCommerce Survey", labels: ["Ventas/Revenue", "Conversión", "Tráfico", "AOV", "CAC", "Inventario"], datasets: [{ label: "Frecuencia de monitoreo (%)", data: [95, 88, 82, 65, 58, 52], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.55 0.18 50)", "oklch(0.50 0.20 310)", "oklch(0.60 0.18 310)", "oklch(0.70 0.12 310)", "oklch(0.80 0.05 310)"] }] },
    proTip: "Diseña dashboards para responder preguntas específicas, no para mostrar todos los datos disponibles. Pregúntate: '¿Qué decisión tomará alguien al ver este dashboard?'"
  },

  "data-driven-marketing": {
    slug: "data-driven-marketing",
    extendedDefinition: "Data-Driven Marketing reemplaza la intuición con evidencia empírica para tomar decisiones de marketing. Según Forbes, las empresas data-driven son 23 veces más propensas a adquirir clientes y 6 veces más propensas a retenerlos. Sin embargo, solo el 33% de las organizaciones se consideran verdaderamente data-driven. El desafío no es la falta de datos sino la capacidad de convertirlos en insights accionables. La implementación requiere infraestructura tecnológica (CDP, analytics), cultura organizacional y talento analítico.",
    keyPoints: ["Las empresas data-driven son 23x más propensas a adquirir clientes (Forbes/McKinsey)", "Solo el 33% de las organizaciones se consideran verdaderamente data-driven", "Los 3 pilares: datos de calidad, herramientas de análisis y cultura data-driven", "El GDPR y la eliminación de cookies de terceros están transformando la recolección de datos"],
    example: { title: "Caso Netflix", description: "Netflix invierte $1.5 billones anuales en contenido, y el 80% de las decisiones de producción se basan en datos. El algoritmo de recomendación genera el 80% de las visualizaciones y ahorra $1 billón anual en retención. House of Cards fue producida porque los datos mostraban que la audiencia amaba a Kevin Spacey, David Fincher y dramas políticos." },
    references: [{ title: "Competing on Analytics", author: "Thomas Davenport", type: "libro", description: "Cómo las empresas líderes usan analytics como ventaja competitiva estratégica." }],
    chart: { type: "bar", title: "Madurez data-driven por función de marketing", source: "Gartner Marketing Data & Analytics Survey", labels: ["Email", "Paid Media", "SEO", "Social Media", "Content", "Brand"], datasets: [{ label: "Nivel de madurez data-driven (%)", data: [78, 72, 65, 55, 42, 30], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "Empieza con first-party data (datos propios) antes de depender de third-party data. Con la desaparición de cookies, tu CRM, email list y datos de comportamiento en sitio son tu activo más valioso."
  },

  "dropshipping": {
    slug: "dropshipping",
    extendedDefinition: "Dropshipping es un modelo de fulfillment donde el vendedor no mantiene inventario propio. Cuando un cliente compra, el pedido se envía al proveedor quien lo despacha directamente al cliente final. Aunque tiene barreras de entrada bajas, los márgenes son típicamente del 15-30% y la competencia es intensa. Según Statista, el mercado global de dropshipping alcanzará $476 billones para 2026. El éxito depende de encontrar nichos rentables, construir marca y ofrecer experiencia superior al cliente.",
    keyPoints: ["Margen típico: 15-30%, significativamente menor que retail tradicional (50-70%)", "Ventaja principal: cero inversión en inventario y almacenamiento", "Desventaja principal: menor control sobre calidad, tiempos de envío y experiencia", "Plataformas populares: Shopify + Oberlo/DSers, WooCommerce, AliExpress"],
    example: { title: "Caso Gymshark", description: "Gymshark comenzó como dropshipping de ropa deportiva en 2012 con una inversión de £500. Ben Francis identificó que la ropa de gym para millennials era un nicho desatendido. Hoy factura más de $500M anuales y es una de las marcas de fitness más reconocidas del mundo, habiendo migrado a inventario propio." },
    references: [{ title: "Oberlo/DSers", author: "Shopify", type: "herramienta", description: "App de Shopify que automatiza la importación de productos y gestión de pedidos con proveedores de AliExpress.", url: "https://www.dsers.com" }],
    chart: { type: "line", title: "Crecimiento del mercado global de Dropshipping (billones USD)", source: "Statista Market Insights", labels: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"], datasets: [{ label: "Tamaño del mercado", data: [128, 174, 226, 287, 351, 413, 476], borderColor: "oklch(0.65 0.18 50)", backgroundColor: "oklch(0.65 0.18 50 / 0.1)" }] },
    proTip: "El dropshipping funciona mejor como validación de mercado. Usa dropshipping para probar productos y nichos; cuando encuentres ganadores, migra a inventario propio para mejorar márgenes y control."
  },

  "ecommerce": {
    slug: "ecommerce",
    extendedDefinition: "El eCommerce ha evolucionado de simples catálogos online a ecosistemas complejos que integran inteligencia artificial, realidad aumentada, social commerce y logística de última milla. En 2024, las ventas globales de eCommerce superaron los $6.3 trillones, representando el 20.1% del retail total. Las tendencias que definen el futuro incluyen: composable commerce (arquitectura modular), live shopping, voice commerce, y la convergencia entre online y offline (phygital). En Latinoamérica, el eCommerce creció un 25% en 2024, con Colombia como uno de los mercados de mayor crecimiento.",
    keyPoints: ["El eCommerce global superó $6.3 trillones en 2024 (20.1% del retail)", "Mobile commerce representa el 72% de las ventas de eCommerce", "Las plataformas líderes: Shopify, VTEX, Magento, Salesforce Commerce Cloud", "Tendencias: composable commerce, live shopping, IA generativa, social commerce"],
    example: { title: "Caso Shein", description: "Shein revolucionó el eCommerce de moda con un modelo de 'real-time retail': produce lotes pequeños de 100-200 unidades, mide la demanda con datos en tiempo real y escala solo los productos exitosos. Su tiempo de diseño-a-venta es de 3 días vs 3-6 meses de la industria. Factura más de $30 billones anuales." },
    references: [{ title: "eMarketer Global eCommerce Forecast", author: "Insider Intelligence", type: "estudio", description: "Pronóstico anual del eCommerce global con datos por región, categoría y plataforma." }, { title: "VTEX", author: "VTEX", type: "herramienta", description: "Plataforma de comercio digital enterprise utilizada por más de 3,400 tiendas en 43 países.", url: "https://vtex.com" }],
    chart: { type: "line", title: "Penetración del eCommerce en retail global (%)", source: "eMarketer 2024", labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"], datasets: [{ label: "Penetración eCommerce (%)", data: [13.8, 17.8, 19.6, 19.4, 19.7, 20.1, 21.2], borderColor: "oklch(0.65 0.18 50)", backgroundColor: "oklch(0.65 0.18 50 / 0.1)" }] },
    proTip: "No intentes competir en precio con Amazon o Mercado Libre. Diferénciate con experiencia de marca, contenido educativo, comunidad y servicio al cliente excepcional."
  },

  "email-marketing": {
    slug: "email-marketing",
    extendedDefinition: "El email marketing sigue siendo el canal digital con mayor ROI: $36 por cada $1 invertido según Litmus. A pesar del auge de redes sociales y messaging, el email es el único canal donde tienes control total sobre tu audiencia y no dependes de algoritmos de terceros. Las tendencias actuales incluyen hiperpersonalización con IA, emails interactivos (AMP for Email), segmentación predictiva y automatización basada en comportamiento. La clave del éxito es tratar el email como una conversación, no como un megáfono.",
    keyPoints: ["ROI del email marketing: $36 por cada $1 invertido (Litmus)", "La tasa de apertura promedio es 21.5% y el CTR promedio es 2.3%", "Los emails segmentados generan 760% más ingresos que los masivos", "La automatización (welcome series, abandoned cart, post-purchase) genera el 29% de los ingresos por email"],
    example: { title: "Caso Casper", description: "Casper, la marca de colchones DTC, genera el 20% de sus ventas a través de email. Su secuencia de carrito abandonado de 3 emails recupera el 15% de los carritos con un enfoque humorístico y empático ('¿Volviste a dormir mal anoche?'). Su newsletter semanal tiene un open rate del 35%, muy superior al promedio de la industria." },
    references: [{ title: "Klaviyo", author: "Klaviyo Inc.", type: "herramienta", description: "Plataforma de email marketing y SMS para eCommerce con segmentación avanzada y automatización basada en datos.", url: "https://www.klaviyo.com" }],
    chart: { type: "bar", title: "ROI por canal de marketing digital (USD por cada $1 invertido)", source: "Litmus State of Email Report", labels: ["Email", "SEO", "Content", "Social Paid", "Display", "Influencer"], datasets: [{ label: "ROI (USD)", data: [36, 22, 16, 9.8, 7.2, 5.2], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.60 0.16 50)", "oklch(0.55 0.14 50)", "oklch(0.50 0.20 310)", "oklch(0.55 0.18 310)", "oklch(0.60 0.16 310)"] }] },
    proTip: "Implementa una secuencia de carrito abandonado de 3 emails (1h, 24h, 72h después). Es la automatización con mayor ROI en eCommerce y puede recuperar entre el 5-15% de los carritos."
  },

  "fulfillment": {
    slug: "fulfillment",
    extendedDefinition: "Fulfillment abarca todo el proceso desde que un cliente hace clic en 'Comprar' hasta que recibe el producto en sus manos. Incluye gestión de inventario, picking, packing, envío, tracking y gestión de devoluciones. En la era de Amazon Prime, los consumidores esperan envío en 1-2 días, lo que ha presionado a todas las empresas de eCommerce a optimizar su cadena logística. Las opciones incluyen fulfillment propio, 3PL (third-party logistics) y modelos híbridos.",
    keyPoints: ["El 66% de los consumidores esperan envío gratis y el 80% espera entrega en 2 días o menos", "El costo de fulfillment representa el 15-20% del precio del producto en eCommerce", "Las devoluciones en eCommerce promedian el 20-30% (vs 8-10% en tienda física)", "El fulfillment de última milla representa el 53% del costo total de envío"],
    example: { title: "Caso Amazon FBA", description: "Amazon FBA (Fulfillment by Amazon) maneja la logística de más de 2 millones de sellers. Los productos FBA tienen un 30% más de conversión que los no-FBA gracias al badge Prime. Amazon opera más de 1,000 centros de fulfillment globalmente y entrega el 72% de los pedidos Prime en menos de 24 horas." },
    references: [{ title: "ShipBob", author: "ShipBob Inc.", type: "herramienta", description: "Plataforma de fulfillment para eCommerce DTC con centros de distribución en US, Canada, UK y Australia.", url: "https://www.shipbob.com" }],
    chart: { type: "doughnut", title: "Desglose del costo de fulfillment en eCommerce", source: "Logistics Management Report", labels: ["Última milla", "Almacenamiento", "Picking & Packing", "Devoluciones", "Tecnología"], datasets: [{ label: "Distribución del costo (%)", data: [53, 18, 12, 10, 7], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.55 0.18 50)", "oklch(0.50 0.20 310)", "oklch(0.60 0.18 310)", "oklch(0.75 0.08 310)"] }] },
    proTip: "Ofrece múltiples opciones de envío (express, estándar, pickup en tienda). El 56% de los consumidores abandonan el carrito si no encuentran su opción de envío preferida."
  },

  "funnel-de-conversion": {
    slug: "funnel-de-conversion",
    extendedDefinition: "El funnel de conversión es un modelo que visualiza el recorrido del usuario desde el primer contacto hasta la acción deseada. Cada etapa del funnel tiene una tasa de abandono natural, y el objetivo del marketing es minimizar las pérdidas en cada transición. El funnel clásico AIDA (Attention, Interest, Desire, Action) ha evolucionado hacia modelos más complejos que incluyen retención y advocacy. En eCommerce, un funnel típico va de visita → página de producto → agregar al carrito → checkout → compra, con tasas de conversión decrecientes en cada paso.",
    keyPoints: ["El funnel clásico AIDA ha evolucionado a modelos como AARRR (Pirate Metrics)", "En eCommerce, la mayor caída ocurre entre 'agregar al carrito' y 'completar compra' (70% abandono)", "Cada etapa requiere contenido y tácticas diferentes", "Los funnels modernos no son lineales; los usuarios entran y salen en múltiples puntos"],
    example: { title: "Caso Dropbox", description: "Dropbox diseñó un funnel viral: free trial → uso del producto → invitar amigos (incentivado con espacio extra) → conversión a premium. Este funnel generó un crecimiento del 3900% en 15 meses, pasando de 100K a 4M de usuarios sin publicidad tradicional." },
    references: [{ title: "Lean Analytics", author: "Alistair Croll, Benjamin Yoskovitz", type: "libro", description: "Framework de métricas por etapa del funnel para startups y empresas en crecimiento." }],
    chart: { type: "bar", title: "Tasas de conversión típicas por etapa del funnel en eCommerce", source: "Baymard Institute", labels: ["Visita a sitio", "Vista de producto", "Agregar al carrito", "Inicio checkout", "Compra completada"], datasets: [{ label: "Tasa de conversión (%)", data: [100, 45, 12, 5, 3], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.60 0.16 50)", "oklch(0.55 0.14 50)", "oklch(0.50 0.20 310)", "oklch(0.55 0.18 310)"] }] },
    proTip: "Identifica tu 'leaky bucket': la etapa del funnel con mayor caída porcentual. Optimizar esa etapa tendrá el mayor impacto en tu conversión total."
  },

  "growth-hacking": {
    slug: "growth-hacking",
    extendedDefinition: "Growth Hacking es una mentalidad y metodología que prioriza el crecimiento rápido y escalable mediante experimentación continua, creatividad y análisis de datos. Acuñado por Sean Ellis en 2010, el término describe el enfoque de startups como Airbnb, Dropbox y Uber que crecieron exponencialmente con presupuestos limitados. El growth hacker combina habilidades de marketing, producto y datos para encontrar 'growth loops' (ciclos de crecimiento auto-reforzantes) en lugar de depender de canales tradicionales.",
    keyPoints: ["El framework ICE (Impact, Confidence, Ease) prioriza experimentos de crecimiento", "Los growth loops (viral, content, paid) son más sostenibles que los funnels lineales", "El North Star Metric alinea a todo el equipo en una métrica de crecimiento", "La velocidad de experimentación es más importante que la tasa de éxito individual"],
    example: { title: "Caso Airbnb + Craigslist", description: "Airbnb creó una integración no oficial con Craigslist que permitía a los hosts publicar automáticamente sus listings en ambas plataformas. Este hack generó millones de visitas gratuitas desde la audiencia masiva de Craigslist, siendo el catalizador del crecimiento inicial de Airbnb de 0 a 10M de noches reservadas." },
    references: [{ title: "Hacking Growth", author: "Sean Ellis, Morgan Brown", type: "libro", description: "Guía del creador del término 'growth hacking' sobre cómo implementar un proceso de crecimiento sistemático." }],
    chart: { type: "bar", title: "Canales de crecimiento más efectivos para startups", source: "First Round Capital Survey", labels: ["Producto viral", "Content/SEO", "Paid acquisition", "Sales", "Partnerships", "Community"], datasets: [{ label: "Efectividad reportada (%)", data: [72, 65, 58, 48, 42, 38], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "No busques 'hacks' mágicos. El verdadero growth hacking es un proceso: genera 20+ ideas por semana, prioriza con ICE, ejecuta 3-5 experimentos semanales y mide resultados rigurosamente."
  },

  "headless-commerce": {
    slug: "headless-commerce",
    extendedDefinition: "Headless Commerce separa la capa de presentación (frontend) del motor de comercio (backend), conectándolos mediante APIs. Esta arquitectura permite crear experiencias de compra personalizadas en cualquier canal (web, app, IoT, kioscos, voice) sin las limitaciones de un frontend monolítico. VTEX, Shopify Plus, commercetools y BigCommerce ofrecen capacidades headless. Según Gartner, para 2025 el 80% de las nuevas implementaciones de comercio digital serán headless o composable.",
    keyPoints: ["Headless permite velocidades de carga 2-3x más rápidas con frameworks como Next.js", "El 80% de las nuevas implementaciones serán headless/composable para 2025 (Gartner)", "Requiere mayor inversión inicial pero ofrece flexibilidad y escalabilidad superiores", "Composable commerce extiende headless: cada capacidad (checkout, search, CMS) es un microservicio independiente"],
    example: { title: "Caso Nike", description: "Nike migró a una arquitectura headless que les permite lanzar experiencias personalizadas en 30+ países simultáneamente. Su app Nike SNKRS usa el backend de comercio headless para crear experiencias de compra gamificadas (drops exclusivos, AR try-on) que generan $1B+ en ventas anuales." },
    references: [{ title: "commercetools", author: "commercetools GmbH", type: "herramienta", description: "Plataforma de comercio headless cloud-native, líder del Gartner Magic Quadrant.", url: "https://commercetools.com" }],
    chart: { type: "bar", title: "Beneficios reportados de migrar a Headless Commerce", source: "Forrester Headless Commerce Study", labels: ["Velocidad de carga", "Time-to-market", "Personalización", "Escalabilidad", "Developer experience"], datasets: [{ label: "Mejora reportada (%)", data: [65, 55, 48, 42, 38], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "No migres a headless solo porque es tendencia. Si tu negocio no necesita experiencias multi-canal personalizadas o tu equipo técnico es pequeño, una plataforma monolítica bien configurada puede ser más eficiente."
  },

  "heatmap": {
    slug: "heatmap",
    extendedDefinition: "Los heatmaps son representaciones visuales del comportamiento del usuario en una página web, usando colores cálidos (rojo) para áreas de alta actividad y fríos (azul) para baja actividad. Existen tres tipos principales: click maps (dónde hacen clic), scroll maps (hasta dónde hacen scroll) y move maps (movimiento del cursor). Según Crazy Egg, el análisis de heatmaps puede incrementar las conversiones hasta un 30% al revelar patrones de comportamiento invisibles en los analytics tradicionales.",
    keyPoints: ["Tres tipos: click maps, scroll maps y move maps (cada uno revela insights diferentes)", "Los heatmaps complementan los datos cuantitativos de analytics con contexto visual", "El 'false bottom' (usuarios que no hacen scroll porque creen que la página terminó) es un hallazgo común", "Combinar heatmaps con grabaciones de sesión proporciona el contexto completo del comportamiento"],
    example: { title: "Caso ASOS", description: "ASOS descubrió mediante heatmaps que el 40% de los usuarios hacían clic en imágenes de producto que no eran clickeables. Al hacer todas las imágenes clickeables y agregar zoom, incrementaron el add-to-cart rate un 17% y redujeron las devoluciones un 8% (los usuarios podían ver mejor el producto)." },
    references: [{ title: "Hotjar", author: "Hotjar Ltd.", type: "herramienta", description: "Herramienta líder de heatmaps, grabaciones de sesión y encuestas de feedback para optimización UX.", url: "https://www.hotjar.com" }, { title: "Crazy Egg", author: "Crazy Egg Inc.", type: "herramienta", description: "Pionero en heatmaps web, fundada por Neil Patel, con funcionalidades de A/B testing integradas.", url: "https://www.crazyegg.com" }],
    chart: { type: "pie", title: "Tipos de insights descubiertos con Heatmaps", source: "Hotjar UX Research Report", labels: ["Elementos ignorados", "CTAs no visibles", "Contenido no leído", "Clics en no-links", "Distracciones", "Otros"], datasets: [{ label: "Frecuencia (%)", data: [28, 22, 18, 15, 10, 7], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.55 0.18 50)", "oklch(0.50 0.20 310)", "oklch(0.60 0.18 310)", "oklch(0.70 0.12 310)", "oklch(0.80 0.05 310)"] }] },
    proTip: "Analiza heatmaps por segmento de usuario (nuevos vs recurrentes, mobile vs desktop). El comportamiento varía dramáticamente y las optimizaciones deben ser específicas para cada segmento."
  },

  "inbound-marketing": {
    slug: "inbound-marketing",
    extendedDefinition: "Inbound Marketing es una metodología creada por HubSpot que atrae clientes mediante contenido relevante y experiencias personalizadas, en contraste con el outbound marketing que interrumpe con publicidad no solicitada. La metodología se basa en cuatro etapas: Attract (atraer con contenido), Convert (convertir con ofertas de valor), Close (cerrar con nurturing) y Delight (deleitar para generar advocacy). Según HubSpot, el inbound genera 54% más leads que el outbound y cuesta 61% menos por lead.",
    keyPoints: ["El inbound genera 54% más leads que el outbound a un 61% menos de costo por lead", "Las 4 etapas: Attract, Convert, Close, Delight", "El contenido es el combustible del inbound: blogs, ebooks, webinars, videos", "El inbound requiere paciencia: los resultados significativos llegan a partir del mes 6-12"],
    example: { title: "Caso HubSpot", description: "HubSpot practica lo que predica: su blog genera 7M+ visitas mensuales, su academia ofrece certificaciones gratuitas con 500K+ graduados, y su herramienta CRM gratuita captura leads que luego convierten a planes pagos. El 80% de sus $2B+ en ingresos anuales proviene de inbound." },
    references: [{ title: "Inbound Marketing", author: "Brian Halligan, Dharmesh Shah", type: "libro", description: "El libro fundacional del inbound marketing escrito por los cofundadores de HubSpot." }, { title: "HubSpot Academy", author: "HubSpot", type: "herramienta", description: "Plataforma de educación gratuita con certificaciones en inbound marketing, ventas y servicio al cliente.", url: "https://academy.hubspot.com" }],
    chart: { type: "bar", title: "Costo por Lead: Inbound vs Outbound por industria", source: "HubSpot State of Inbound", labels: ["Software", "Servicios B2B", "eCommerce", "Educación", "Salud"], datasets: [{ label: "Inbound (USD)", data: [45, 65, 35, 55, 75], backgroundColor: "oklch(0.65 0.18 50)" }, { label: "Outbound (USD)", data: [120, 180, 95, 140, 195], backgroundColor: "oklch(0.50 0.20 310)" }] },
    proTip: "No esperes resultados inmediatos del inbound. Crea un 'content moat' (foso de contenido) publicando consistentemente durante 12 meses. El efecto compuesto del SEO y el contenido evergreen genera retornos exponenciales a largo plazo."
  },

  "kpi-key-performance-indicator": {
    slug: "kpi-key-performance-indicator",
    extendedDefinition: "Los KPIs son métricas cuantificables que miden el progreso hacia objetivos de negocio específicos. La diferencia entre una métrica y un KPI es la relevancia estratégica: todas las KPIs son métricas, pero no todas las métricas son KPIs. Un buen KPI es SMART (Specific, Measurable, Achievable, Relevant, Time-bound). En eCommerce, los KPIs fundamentales incluyen: revenue, conversion rate, AOV, CAC, CLV, churn rate y NPS. El error más común es medir demasiadas métricas sin priorizar las que realmente impulsan el negocio.",
    keyPoints: ["Un buen KPI cumple los criterios SMART: específico, medible, alcanzable, relevante y temporal", "Máximo 5-7 KPIs por equipo para mantener foco", "Distinguir entre leading indicators (predictivos) y lagging indicators (resultados)", "Los KPIs deben revisarse y ajustarse trimestralmente según la etapa del negocio"],
    example: { title: "Caso Spotify", description: "Spotify define su North Star Metric como 'Tiempo de escucha semanal por usuario'. Este KPI único alinea a todos los equipos: producto (mejorar recomendaciones), contenido (adquirir podcasts), marketing (activar usuarios dormidos) y monetización (reducir ads intrusivos). Cada equipo tiene sub-KPIs que alimentan esta métrica principal." },
    references: [{ title: "Measure What Matters", author: "John Doerr", type: "libro", description: "El sistema OKR (Objectives and Key Results) usado por Google, Intel y miles de empresas para alinear KPIs con objetivos estratégicos." }],
    chart: { type: "horizontalBar", title: "KPIs más importantes por etapa de empresa", source: "First Round Capital Startup Metrics", labels: ["Revenue", "Conversion Rate", "CAC", "CLV", "Churn", "NPS", "MRR Growth"], datasets: [{ label: "Importancia relativa (1-10)", data: [9.5, 8.8, 8.5, 8.2, 7.8, 7.5, 9.0], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "Define una 'North Star Metric' que capture el valor central que entregas al cliente. Todos los demás KPIs deben ser inputs que alimenten esa métrica principal."
  },

  "landing-page": {
    slug: "landing-page",
    extendedDefinition: "Una landing page es una página diseñada con un único objetivo de conversión, eliminando todas las distracciones que podrían desviar al usuario de la acción deseada. A diferencia de una homepage (múltiples objetivos), una landing page tiene un CTA claro, sin navegación principal, y contenido alineado con la fuente de tráfico. Según Unbounce, la tasa de conversión promedio de landing pages es del 9.7%, pero las mejores superan el 25%. Los elementos clave incluyen: headline compelling, social proof, beneficios claros y formulario optimizado.",
    keyPoints: ["Tasa de conversión promedio: 9.7%, top performers: 25%+ (Unbounce)", "Eliminar la navegación principal puede incrementar conversiones un 100%", "El número de campos del formulario es inversamente proporcional a la conversión", "La coherencia entre el ad y la landing page (message match) es crítica"],
    example: { title: "Caso Slack", description: "La landing page de Slack para enterprise tiene una tasa de conversión del 23%. Su fórmula: headline orientado a beneficio ('Slack reúne a tu equipo'), un solo CTA ('Hablar con ventas'), logos de clientes Fortune 500 como social proof, y un video de 60 segundos que muestra el producto en acción." },
    references: [{ title: "Unbounce", author: "Unbounce Inc.", type: "herramienta", description: "Plataforma líder de creación de landing pages con A/B testing integrado y Smart Traffic (IA).", url: "https://unbounce.com" }],
    chart: { type: "bar", title: "Tasa de conversión de landing pages por industria", source: "Unbounce Conversion Benchmark Report", labels: ["SaaS", "eCommerce", "Educación", "Finanzas", "Salud", "Travel"], datasets: [{ label: "Tasa de conversión (%)", data: [12.5, 7.8, 15.2, 8.3, 11.6, 9.1], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.60 0.16 50)", "oklch(0.55 0.14 50)", "oklch(0.50 0.20 310)", "oklch(0.55 0.18 310)", "oklch(0.60 0.16 310)"] }] },
    proTip: "Crea una landing page específica para cada campaña y audiencia. Una landing page genérica convierte 2-3x menos que una personalizada para el segmento y la fuente de tráfico."
  },

  "lead-generation": {
    slug: "lead-generation",
    extendedDefinition: "Lead Generation es el proceso de atraer y capturar información de contacto de personas interesadas en tu producto o servicio. En B2B, donde el ciclo de ventas es largo y complejo, la generación de leads es la base del pipeline de ventas. Las tácticas incluyen content marketing (ebooks, webinars), SEO, publicidad pagada, eventos, referrals y partnerships. Según Demand Gen Report, el 68% de las empresas B2B luchan con la generación de leads de calidad, no de cantidad.",
    keyPoints: ["El 68% de las empresas B2B luchan con la calidad de leads, no la cantidad", "El costo por lead varía de $30 (content/SEO) a $500+ (eventos/outbound)", "Lead scoring (puntuación de leads) prioriza los leads más propensos a convertir", "El contenido gated (ebooks, whitepapers) sigue siendo la táctica #1 de lead gen en B2B"],
    example: { title: "Caso Salesforce", description: "Salesforce genera más de 1 millón de leads anuales combinando: Dreamforce (evento con 170K+ asistentes), Trailhead (plataforma de aprendizaje con 5M+ usuarios), content marketing (blog, podcasts, webinars) y un programa de referrals que genera el 30% de sus nuevos clientes." },
    references: [{ title: "Demand Gen Report", author: "Demand Gen Report", type: "estudio", description: "Investigación anual sobre tendencias, tácticas y benchmarks de generación de leads B2B.", url: "https://www.demandgenreport.com" }],
    chart: { type: "bar", title: "Efectividad de tácticas de Lead Generation en B2B", source: "Demand Gen Report B2B Survey", labels: ["Content/SEO", "Email", "Events", "Social Media", "Paid Ads", "Referrals"], datasets: [{ label: "Efectividad (%)", data: [72, 65, 58, 52, 48, 45], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "Implementa lead scoring desde el día uno. No todos los leads son iguales: un lead que descargó 3 ebooks y visitó la página de precios vale 10x más que uno que solo se suscribió al newsletter."
  },

  "marketplace": {
    slug: "marketplace",
    extendedDefinition: "Un marketplace es una plataforma que conecta vendedores con compradores, facilitando transacciones sin poseer inventario propio. El modelo de negocio se basa en comisiones por transacción (típicamente 5-20%), suscripciones de sellers y/o publicidad. Los marketplaces se benefician del efecto de red: más vendedores atraen más compradores y viceversa. Según Statista, los marketplaces representan el 67% de las ventas globales de eCommerce. Los tipos incluyen B2C (Amazon, Mercado Libre), B2B (Alibaba), C2C (eBay) y verticales (Etsy, StockX).",
    keyPoints: ["Los marketplaces representan el 67% de las ventas globales de eCommerce", "El efecto de red es la ventaja competitiva principal: más sellers → más buyers → más sellers", "Comisiones típicas: 5-20% del valor de la transacción", "El 'chicken and egg problem' (¿qué viene primero, sellers o buyers?) es el mayor desafío inicial"],
    example: { title: "Caso Mercado Libre", description: "Mercado Libre es el marketplace más grande de Latinoamérica con más de 148 millones de usuarios activos. Su ecosistema integra marketplace, fintech (Mercado Pago con 50M+ usuarios), logística (Mercado Envíos con entregas same-day) y publicidad. Procesa más de 40 compras por segundo y tiene una capitalización de mercado superior a $80 billones." },
    references: [{ title: "Platform Revolution", author: "Geoffrey Parker, Marshall Van Alstyne", type: "libro", description: "Análisis de cómo los marketplaces y plataformas están transformando la economía global." }],
    chart: { type: "pie", title: "Top marketplaces globales por GMV", source: "Digital Commerce 360", labels: ["Amazon", "Taobao/Tmall", "JD.com", "Mercado Libre", "Shopee", "Otros"], datasets: [{ label: "Participación GMV (%)", data: [28, 25, 12, 5, 4, 26], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.55 0.18 50)", "oklch(0.50 0.20 310)", "oklch(0.60 0.18 310)", "oklch(0.70 0.12 310)", "oklch(0.80 0.05 310)"] }] },
    proTip: "Si estás construyendo un marketplace, resuelve primero el lado más difícil de la ecuación (generalmente el supply/sellers). Ofrece herramientas gratuitas o subsidios iniciales para atraer a los primeros vendedores."
  },

  "omnicanalidad-omnichannel": {
    slug: "omnicanalidad-omnichannel",
    extendedDefinition: "La omnicanalidad integra todos los canales de venta y comunicación para crear una experiencia de cliente unificada y sin fricciones. A diferencia del multi-channel (canales independientes), el omnichannel conecta los canales para que el cliente pueda iniciar una interacción en uno y continuarla en otro sin perder contexto. Según Harvard Business Review, los clientes omnichannel gastan un 10% más online y un 4% más en tienda que los clientes de un solo canal. La implementación requiere integración de datos, tecnología y procesos.",
    keyPoints: ["Los clientes omnichannel gastan 10% más online y 4% más en tienda (HBR)", "El 73% de los consumidores usan múltiples canales durante su proceso de compra", "Requiere un Customer Data Platform (CDP) que unifique datos de todos los canales", "Las estrategias clave: BOPIS (buy online, pick up in store), ship-from-store, endless aisle"],
    example: { title: "Caso Falabella", description: "Falabella implementó una estrategia omnichannel que integra sus 500+ tiendas con eCommerce, app móvil y marketplace. El programa CMR Puntos unifica la identidad del cliente en todos los canales. El 40% de las compras online se recogen en tienda (BOPIS), y el 25% de los clientes que recogen en tienda realizan compras adicionales." },
    references: [{ title: "Omnichannel Retail", author: "Tim Mason, Miya Knights", type: "libro", description: "Guía práctica sobre cómo implementar una estrategia omnichannel exitosa en retail." }],
    chart: { type: "bar", title: "Impacto de la omnicanalidad en métricas clave", source: "Harvard Business Review Omnichannel Study", labels: ["Gasto online", "Gasto en tienda", "Frecuencia de visita", "Lealtad (NPS)", "CLV"], datasets: [{ label: "Incremento vs single-channel (%)", data: [10, 4, 23, 15, 30], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "No intentes ser omnichannel en todos los canales a la vez. Empieza integrando los 2 canales más importantes para tu cliente (generalmente web + tienda física o web + app) y expande gradualmente."
  },

  "retargeting": {
    slug: "retargeting",
    extendedDefinition: "El retargeting muestra anuncios a usuarios que previamente interactuaron con tu sitio web o app pero no completaron una conversión. Es una de las tácticas más efectivas en marketing digital porque se dirige a personas que ya mostraron interés. Según AdRoll, el retargeting puede incrementar las conversiones un 150% y el CTR de los anuncios es 10x mayor que los display ads regulares. Con la eliminación de cookies de terceros, el retargeting está evolucionando hacia first-party data y server-side tracking.",
    keyPoints: ["El retargeting incrementa conversiones un 150% vs display ads regulares (AdRoll)", "El CTR de retargeting es 10x mayor que display ads estándar", "La frecuencia óptima es 15-20 impresiones por usuario por mes (evitar 'ad fatigue')", "Con la eliminación de cookies, el retargeting migra a first-party data y server-side tracking"],
    example: { title: "Caso Adidas", description: "Adidas implementó retargeting dinámico que muestra exactamente los productos que el usuario vio, con precios actualizados y disponibilidad en tiempo real. Esta estrategia recupera el 12% de los visitantes que abandonaron sin comprar, con un ROAS de 12:1, siendo su canal publicitario más rentable." },
    references: [{ title: "Criteo", author: "Criteo S.A.", type: "herramienta", description: "Plataforma líder de retargeting con IA que personaliza anuncios basándose en comportamiento de navegación.", url: "https://www.criteo.com" }],
    chart: { type: "bar", title: "ROAS por tipo de campaña publicitaria", source: "AdRoll Performance Benchmarks", labels: ["Retargeting", "Search Ads", "Social Ads", "Display Ads", "Video Ads"], datasets: [{ label: "ROAS promedio (x)", data: [10.2, 8.5, 5.3, 2.8, 4.1], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.60 0.16 50)", "oklch(0.55 0.14 50)", "oklch(0.50 0.20 310)", "oklch(0.55 0.18 310)"] }] },
    proTip: "Segmenta tu retargeting por profundidad de interacción: un usuario que abandonó el carrito merece un mensaje diferente (y más agresivo) que uno que solo visitó la homepage."
  },

  "return-on-investment-roi": {
    slug: "return-on-investment-roi",
    extendedDefinition: "El ROI es la métrica universal para evaluar la rentabilidad de cualquier inversión. En marketing digital, el ROI promedio varía significativamente por canal: email marketing ($36 por cada $1), SEO ($22), content marketing ($16) y paid social ($9.8). Sin embargo, el ROI no captura el valor completo de algunas inversiones como brand awareness o content marketing, cuyos retornos son acumulativos y a largo plazo. Por eso, es importante complementar el ROI con métricas como ROAS, CAC payback period y CLV.",
    keyPoints: ["Fórmula: ROI = (Ganancia - Inversión) / Inversión × 100", "El ROI de marketing digital promedio es del 500-800% según industria", "Distinguir entre ROI de corto plazo (paid ads) y largo plazo (SEO, content, brand)", "El ROI no captura externalidades positivas como brand equity y word-of-mouth"],
    example: { title: "Caso Coca-Cola", description: "Coca-Cola invierte $4 billones anuales en marketing con un ROI medido de 3.5:1 en ventas directas. Sin embargo, su verdadero ROI incluye brand equity valorado en $97 billones (Interbrand), lo que demuestra que el ROI financiero directo subestima el valor real de las inversiones en marca." },
    references: [{ title: "Marketing ROI", author: "James Lenskold", type: "libro", description: "Framework para medir y optimizar el ROI de marketing con modelos de atribución avanzados." }],
    chart: { type: "bar", title: "ROI promedio por canal de marketing digital", source: "Litmus & HubSpot Research", labels: ["Email", "SEO", "Content", "Social Paid", "Display", "Influencer"], datasets: [{ label: "ROI ($ por cada $1)", data: [36, 22, 16, 9.8, 7.2, 5.2], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.60 0.16 50)", "oklch(0.55 0.14 50)", "oklch(0.50 0.20 310)", "oklch(0.55 0.18 310)", "oklch(0.60 0.16 310)"] }] },
    proTip: "Mide el ROI por cohorte, no solo en agregado. El ROI de clientes adquiridos en enero puede ser muy diferente al de septiembre. Las cohortes revelan tendencias que los promedios ocultan."
  },

  "search-engine-optimization-seo": {
    slug: "search-engine-optimization-seo",
    extendedDefinition: "SEO es el conjunto de técnicas para mejorar la visibilidad de un sitio web en los resultados orgánicos de motores de búsqueda. Con más del 68% de las experiencias online comenzando con una búsqueda (BrightEdge), el SEO es el canal de adquisición más importante a largo plazo. El SEO moderno va más allá de keywords: incluye experiencia de usuario (Core Web Vitals), E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), contenido semántico, y optimización para AI Overviews de Google.",
    keyPoints: ["El 68% de las experiencias online comienzan con una búsqueda (BrightEdge)", "El primer resultado orgánico recibe el 27.6% de los clics (Backlinko)", "Core Web Vitals (LCP, FID, CLS) son factores de ranking desde 2021", "El SEO tiene el segundo mejor ROI después del email: $22 por cada $1 invertido"],
    example: { title: "Caso Canva", description: "Canva creó más de 100,000 landing pages optimizadas para SEO, cada una dirigida a un template específico ('invitation template', 'resume template', etc.). Esta estrategia de SEO programático genera más de 200 millones de visitas orgánicas mensuales y es responsable del 60% de sus nuevos usuarios." },
    references: [{ title: "Ahrefs", author: "Ahrefs Pte. Ltd.", type: "herramienta", description: "Suite de herramientas SEO para análisis de backlinks, keyword research, auditoría técnica y tracking de rankings.", url: "https://ahrefs.com" }, { title: "The Art of SEO", author: "Eric Enge, Stephan Spencer, Jessie Stricchiola", type: "libro", description: "Guía exhaustiva de SEO considerada la 'biblia' de la industria, actualizada regularmente." }],
    chart: { type: "bar", title: "CTR por posición en resultados de Google", source: "Backlinko CTR Study", labels: ["Posición 1", "Posición 2", "Posición 3", "Posición 4", "Posición 5", "Posiciones 6-10"], datasets: [{ label: "CTR promedio (%)", data: [27.6, 15.8, 11.0, 8.4, 6.3, 3.5], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "Enfócate en topic clusters en lugar de keywords individuales. Crea una 'pillar page' exhaustiva sobre un tema y enlázala con artículos de soporte. Google premia la autoridad temática sobre la optimización de keywords aisladas."
  },

  "shopping-cart-abandonment": {
    slug: "shopping-cart-abandonment",
    extendedDefinition: "El abandono de carrito es el fenómeno donde un usuario agrega productos al carrito de compras pero no completa la transacción. Con una tasa promedio global del 70.19% según Baymard Institute, representa la mayor oportunidad de recuperación de ingresos en eCommerce. Las razones principales incluyen: costos inesperados (48%), obligación de crear cuenta (24%), proceso de checkout largo (17%) y preocupaciones de seguridad (18%). Las estrategias de recuperación incluyen emails de carrito abandonado, retargeting y optimización del checkout.",
    keyPoints: ["Tasa promedio de abandono: 70.19% (Baymard Institute)", "Razón #1: costos inesperados de envío, impuestos o fees (48%)", "Los emails de carrito abandonado recuperan entre 5-15% de los carritos", "Simplificar el checkout de 5 pasos a 1 puede reducir el abandono un 35%"],
    example: { title: "Caso ASOS", description: "ASOS redujo su tasa de abandono del 75% al 58% implementando: checkout como invitado (sin obligar a crear cuenta), envío gratis en pedidos superiores a £20, múltiples métodos de pago (incluyendo Klarna para pagar después), y una secuencia de 3 emails de recuperación que genera £25M+ anuales en ventas recuperadas." },
    references: [{ title: "Baymard Institute", author: "Baymard Institute", type: "estudio", description: "Investigación exhaustiva sobre UX de checkout con datos de más de 100 estudios de usabilidad.", url: "https://baymard.com" }],
    chart: { type: "horizontalBar", title: "Razones principales de abandono de carrito", source: "Baymard Institute Checkout Research", labels: ["Costos inesperados", "Crear cuenta obligatorio", "Envío lento", "Checkout complejo", "No confío con tarjeta", "Errores del sitio"], datasets: [{ label: "Porcentaje de usuarios (%)", data: [48, 24, 22, 17, 18, 13], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "Implementa 'exit-intent popups' que ofrezcan envío gratis o un descuento cuando el usuario mueve el cursor hacia el botón de cerrar. Puede recuperar un 5-10% adicional de abandonos."
  },

  "transformacion-digital": {
    slug: "transformacion-digital",
    extendedDefinition: "La transformación digital no es simplemente adoptar tecnología; es un cambio fundamental en cómo una organización opera, entrega valor y compite. Según McKinsey, el 70% de las iniciativas de transformación digital fracasan, principalmente por resistencia al cambio y falta de liderazgo. La transformación exitosa requiere tres pilares: tecnología (cloud, datos, automatización), procesos (agilidad, customer-centricity) y personas (cultura, capacitación, change management). En Latinoamérica, la pandemia aceleró la transformación digital 5-7 años.",
    keyPoints: ["El 70% de las transformaciones digitales fracasan (McKinsey)", "Los 3 pilares: tecnología, procesos y personas (la cultura es el factor más crítico)", "La pandemia aceleró la transformación digital 5-7 años en Latinoamérica", "El ROI promedio de la transformación digital es del 20-30% en eficiencia operativa"],
    example: { title: "Caso Bancolombia", description: "Bancolombia invirtió más de $500M USD en transformación digital, creando Nequi (neobank con 17M+ usuarios), migrando el 80% de sus operaciones a la nube, e implementando IA para atención al cliente (60% de consultas resueltas por chatbot). El resultado: reducción del 40% en costos operativos y un NPS que pasó de 45 a 72." },
    references: [{ title: "Leading Digital", author: "George Westerman, Didier Bonnet (MIT/Capgemini)", type: "libro", description: "Framework de transformación digital basado en investigación de MIT con más de 400 empresas globales." }],
    chart: { type: "bar", title: "Principales barreras de la Transformación Digital", source: "McKinsey Digital Transformation Survey", labels: ["Cultura/Resistencia", "Falta de talento", "Silos organizacionales", "Legacy systems", "Presupuesto", "Falta de estrategia"], datasets: [{ label: "Empresas que reportan esta barrera (%)", data: [62, 55, 48, 45, 38, 35], backgroundColor: "oklch(0.65 0.18 50)" }] },
    proTip: "La transformación digital empieza con las personas, no con la tecnología. Invierte primero en change management y capacitación. La mejor tecnología fracasa si el equipo no la adopta."
  },

  "vtex": {
    slug: "vtex",
    extendedDefinition: "VTEX es una plataforma de comercio digital cloud-native fundada en Brasil que se ha convertido en líder en Latinoamérica y está expandiéndose globalmente. Ofrece soluciones completas para eCommerce B2C, B2B y marketplaces con un enfoque en composable commerce. VTEX es reconocida por Gartner como 'Challenger' en su Magic Quadrant for Digital Commerce y por IDC como líder en Latinoamérica. Más de 3,400 tiendas en 43 países usan VTEX, incluyendo marcas como Coca-Cola, Nestlé, Sony, Whirlpool y Carrefour.",
    keyPoints: ["Más de 3,400 tiendas en 43 países usan VTEX", "Arquitectura composable: cada módulo (checkout, CMS, OMS) puede usarse independientemente", "VTEX IO permite desarrollo de apps custom sobre la plataforma", "Marketplace nativo: cualquier tienda VTEX puede convertirse en marketplace o seller"],
    example: { title: "Caso Grupo Éxito + VTEX", description: "Grupo Éxito, el retailer más grande de Colombia, migró a VTEX para unificar sus 4 marcas (Éxito, Carulla, Surtimax, Super Inter) en una sola plataforma. La implementación incluyó marketplace con 2,000+ sellers, fulfillment desde tienda, y personalización por marca. El resultado: crecimiento del 120% en ventas digitales y reducción del 45% en tiempo de entrega." },
    references: [{ title: "VTEX", author: "VTEX", type: "herramienta", description: "Plataforma de comercio digital enterprise con soluciones para B2C, B2B, marketplace y omnichannel.", url: "https://vtex.com" }, { title: "Gartner Magic Quadrant for Digital Commerce", author: "Gartner", type: "estudio", description: "Evaluación anual de las principales plataformas de comercio digital a nivel global." }],
    chart: { type: "pie", title: "Distribución de clientes VTEX por región", source: "VTEX Annual Report", labels: ["Brasil", "LATAM (ex-Brasil)", "Europa", "Norteamérica", "Asia/Otros"], datasets: [{ label: "Distribución (%)", data: [45, 25, 15, 10, 5], backgroundColor: ["oklch(0.65 0.18 50)", "oklch(0.55 0.18 50)", "oklch(0.50 0.20 310)", "oklch(0.60 0.18 310)", "oklch(0.75 0.08 310)"] }] },
    proTip: "Aprovecha el marketplace nativo de VTEX para expandir tu catálogo sin inventario propio. Puedes conectar sellers externos y ofrecer miles de productos adicionales con comisiones del 10-15%."
  },
});
