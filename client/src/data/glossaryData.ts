/**
 * Glosario de Marketing Digital y eCommerce
 * Comprehensive directory of marketing, eCommerce, and digital transformation terms
 */

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category?: string;
  relatedTerms?: string[]; // slugs of related terms
}

function generateSlug(term: string): string {
  return term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    term: "A/B Testing",
    slug: "ab-testing",
    definition: "Método de experimentación que compara dos versiones de una página web, email o elemento para determinar cuál genera mejores resultados. Se muestra la versión A a un grupo de usuarios y la versión B a otro, midiendo métricas como conversiones, clics o tiempo en página.",
    category: "Optimización",
    relatedTerms: ["conversion-rate-optimization-cro", "conversion-rate", "heatmap"]
  },
  {
    term: "Above the Fold",
    slug: "above-the-fold",
    definition: "Porción de una página web visible sin necesidad de hacer scroll. Es el espacio más valioso de una página, donde se deben colocar los elementos más importantes y llamadas a la acción principales.",
    category: "UX/UI",
    relatedTerms: ["call-to-action-cta", "landing-page", "user-experience-ux"]
  },
  {
    term: "Account-Based Marketing (ABM)",
    slug: "account-based-marketing-abm",
    definition: "Estrategia de marketing B2B que concentra recursos en un conjunto específico de cuentas objetivo dentro de un mercado. Personaliza campañas para cada cuenta, tratándolas como mercados individuales.",
    category: "Marketing B2B",
    relatedTerms: ["b2b-business-to-business", "lead-generation", "personalization"]
  },
  {
    term: "API (Application Programming Interface)",
    slug: "api-application-programming-interface",
    definition: "Conjunto de protocolos y herramientas que permiten la comunicación entre diferentes aplicaciones de software. En eCommerce, las APIs facilitan la integración entre plataformas, sistemas de pago, inventarios y servicios externos.",
    category: "Tecnología",
    relatedTerms: ["headless-commerce", "erp-enterprise-resource-planning", "saas-software-as-a-service"]
  },
  {
    term: "Average Order Value (AOV)",
    slug: "average-order-value-aov",
    definition: "Valor promedio de pedido. Métrica que calcula el monto promedio gastado cada vez que un cliente realiza una compra. Se obtiene dividiendo los ingresos totales entre el número de pedidos.",
    category: "Métricas",
    relatedTerms: ["upselling", "customer-lifetime-value-clv", "conversion-rate"]
  },

  // B
  {
    term: "B2B (Business to Business)",
    slug: "b2b-business-to-business",
    definition: "Modelo de negocio en el que las transacciones comerciales se realizan entre empresas, no con consumidores finales. Ejemplo: un fabricante que vende a distribuidores.",
    category: "Modelos de Negocio",
    relatedTerms: ["b2c-business-to-consumer", "marketplace", "account-based-marketing-abm"]
  },
  {
    term: "B2C (Business to Consumer)",
    slug: "b2c-business-to-consumer",
    definition: "Modelo de negocio donde las empresas venden productos o servicios directamente a consumidores finales. Es el modelo tradicional de retail y eCommerce.",
    category: "Modelos de Negocio",
    relatedTerms: ["b2b-business-to-business", "ecommerce", "social-commerce"]
  },
  {
    term: "Bounce Rate",
    slug: "bounce-rate",
    definition: "Porcentaje de visitantes que abandonan un sitio web después de ver solo una página, sin interactuar. Una tasa de rebote alta puede indicar problemas de relevancia, velocidad o experiencia de usuario.",
    category: "Métricas",
    relatedTerms: ["session", "conversion-rate", "user-experience-ux"]
  },
  {
    term: "Buyer Persona",
    slug: "buyer-persona",
    definition: "Representación semi-ficticia del cliente ideal basada en datos reales y supuestos fundamentados sobre demografía, comportamiento, motivaciones y objetivos. Guía la estrategia de marketing y desarrollo de producto.",
    category: "Estrategia",
    relatedTerms: ["target-audience", "customer-journey", "data-driven-marketing"]
  },
  {
    term: "Business Intelligence (BI)",
    slug: "business-intelligence-bi",
    definition: "Conjunto de estrategias, tecnologías y herramientas para transformar datos en información útil que apoye la toma de decisiones empresariales. Incluye análisis de datos, reportes, dashboards y visualizaciones.",
    category: "Análisis de Datos",
    relatedTerms: ["dashboard", "kpi-key-performance-indicator", "data-driven-marketing"]
  },

  // C
  {
    term: "Call to Action (CTA)",
    slug: "call-to-action-cta",
    definition: "Elemento de diseño (botón, enlace, banner) que invita al usuario a realizar una acción específica como 'Comprar ahora', 'Descargar', 'Registrarse'. Es fundamental para guiar al usuario en el funnel de conversión.",
    category: "UX/UI",
    relatedTerms: ["landing-page", "conversion-rate", "above-the-fold"]
  },
  {
    term: "Churn Rate",
    slug: "churn-rate",
    definition: "Tasa de cancelación o abandono. Porcentaje de clientes que dejan de usar un producto o servicio durante un período determinado. Métrica crítica en modelos de suscripción y SaaS.",
    category: "Métricas",
    relatedTerms: ["customer-lifetime-value-clv", "net-promoter-score-nps", "saas-software-as-a-service"]
  },
  {
    term: "Content Marketing",
    slug: "content-marketing",
    definition: "Estrategia de marketing enfocada en crear y distribuir contenido valioso, relevante y consistente para atraer y retener una audiencia definida, con el objetivo final de impulsar acciones rentables del cliente.",
    category: "Marketing Digital",
    relatedTerms: ["inbound-marketing", "search-engine-optimization-seo", "lead-generation"]
  },
  {
    term: "Conversion Rate",
    slug: "conversion-rate",
    definition: "Tasa de conversión. Porcentaje de visitantes que completan una acción deseada (compra, registro, descarga). Se calcula dividiendo las conversiones entre el total de visitantes y multiplicando por 100.",
    category: "Métricas",
    relatedTerms: ["conversion-rate-optimization-cro", "ab-testing", "funnel-de-conversion"]
  },
  {
    term: "Conversion Rate Optimization (CRO)",
    slug: "conversion-rate-optimization-cro",
    definition: "Proceso sistemático de aumentar el porcentaje de visitantes de un sitio web que realizan una acción deseada. Incluye análisis de datos, testing A/B, mejoras de UX y optimización del funnel.",
    category: "Optimización",
    relatedTerms: ["ab-testing", "conversion-rate", "heatmap"]
  },
  {
    term: "Customer Acquisition Cost (CAC)",
    slug: "customer-acquisition-cost-cac",
    definition: "Costo de adquisición de cliente. Inversión total en marketing y ventas dividida entre el número de nuevos clientes adquiridos en un período. Métrica clave para evaluar la eficiencia de las estrategias de captación.",
    category: "Métricas",
    relatedTerms: ["customer-lifetime-value-clv", "return-on-investment-roi", "lead-generation"]
  },
  {
    term: "Customer Journey",
    slug: "customer-journey",
    definition: "Recorrido completo que realiza un cliente desde el primer contacto con la marca hasta la compra y más allá. Incluye todas las interacciones y puntos de contacto en diferentes canales.",
    category: "Estrategia",
    relatedTerms: ["buyer-persona", "omnicanalidad-omnichannel", "funnel-de-conversion"]
  },
  {
    term: "Customer Lifetime Value (CLV)",
    slug: "customer-lifetime-value-clv",
    definition: "Valor del tiempo de vida del cliente. Predicción del beneficio neto atribuido a toda la relación futura con un cliente. Ayuda a determinar cuánto invertir en adquisición y retención.",
    category: "Métricas",
    relatedTerms: ["customer-acquisition-cost-cac", "churn-rate", "average-order-value-aov"]
  },

  // D
  {
    term: "Dashboard",
    slug: "dashboard",
    definition: "Panel de control visual que presenta métricas e indicadores clave de rendimiento (KPIs) de manera centralizada. Permite monitorear el estado del negocio en tiempo real y tomar decisiones basadas en datos.",
    category: "Análisis de Datos",
    relatedTerms: ["kpi-key-performance-indicator", "business-intelligence-bi", "data-driven-marketing"]
  },
  {
    term: "Data-Driven Marketing",
    slug: "data-driven-marketing",
    definition: "Enfoque de marketing que utiliza datos de clientes para optimizar estrategias y mensajes. Las decisiones se basan en análisis de datos en lugar de intuición o experiencia previa.",
    category: "Estrategia",
    relatedTerms: ["business-intelligence-bi", "dashboard", "kpi-key-performance-indicator"]
  },
  {
    term: "Dropshipping",
    slug: "dropshipping",
    definition: "Modelo de negocio de eCommerce donde el vendedor no mantiene inventario. Cuando se realiza una venta, el producto se compra a un tercero que lo envía directamente al cliente final.",
    category: "Modelos de Negocio",
    relatedTerms: ["ecommerce", "fulfillment", "marketplace"]
  },

  // E
  {
    term: "eCommerce",
    slug: "ecommerce",
    definition: "Comercio electrónico. Compra y venta de productos o servicios a través de internet. Incluye transacciones B2B, B2C, C2C y C2B realizadas mediante plataformas digitales.",
    category: "Conceptos Básicos",
    relatedTerms: ["b2b-business-to-business", "b2c-business-to-consumer", "mobile-commerce-mcommerce"]
  },
  {
    term: "Email Marketing",
    slug: "email-marketing",
    definition: "Estrategia de marketing digital que utiliza el correo electrónico para comunicarse con clientes potenciales y actuales. Incluye newsletters, campañas promocionales, emails transaccionales y automatizaciones.",
    category: "Marketing Digital",
    relatedTerms: ["marketing-automation", "lead-nurturing", "inbound-marketing"]
  },
  {
    term: "ERP (Enterprise Resource Planning)",
    slug: "erp-enterprise-resource-planning",
    definition: "Sistema de planificación de recursos empresariales que integra procesos de negocio clave como finanzas, inventario, producción, ventas y recursos humanos en una plataforma unificada.",
    category: "Tecnología",
    relatedTerms: ["api-application-programming-interface", "warehouse-management-system-wms", "product-information-management-pim"]
  },

  // F
  {
    term: "Fulfillment",
    slug: "fulfillment",
    definition: "Proceso completo de preparación y entrega de pedidos de eCommerce, desde el almacenamiento de inventario hasta el empaque, envío y gestión de devoluciones.",
    category: "Operaciones",
    relatedTerms: ["warehouse-management-system-wms", "sku-stock-keeping-unit", "dropshipping"]
  },
  {
    term: "Funnel de Conversión",
    slug: "funnel-de-conversion",
    definition: "Embudo de conversión. Modelo que representa las etapas por las que pasa un usuario desde el primer contacto hasta convertirse en cliente. Típicamente incluye: Awareness, Consideration, Decision y Action.",
    category: "Estrategia",
    relatedTerms: ["sales-funnel", "conversion-rate", "customer-journey"]
  },

  // G
  {
    term: "GMV (Gross Merchandise Value)",
    slug: "gmv-gross-merchandise-value",
    definition: "Valor bruto de mercancía. Valor total de ventas realizadas a través de una plataforma de marketplace durante un período específico, antes de deducciones por devoluciones, descuentos o comisiones.",
    category: "Métricas",
    relatedTerms: ["marketplace", "average-order-value-aov", "return-on-investment-roi"]
  },
  {
    term: "Growth Hacking",
    slug: "growth-hacking",
    definition: "Enfoque de marketing orientado al crecimiento rápido mediante experimentación constante, análisis de datos y tácticas creativas de bajo costo. Común en startups y empresas tecnológicas.",
    category: "Estrategia",
    relatedTerms: ["ab-testing", "viral-marketing", "conversion-rate-optimization-cro"]
  },

  // H
  {
    term: "Headless Commerce",
    slug: "headless-commerce",
    definition: "Arquitectura de eCommerce que separa el frontend (capa de presentación) del backend (lógica de negocio y datos). Permite mayor flexibilidad para crear experiencias personalizadas en múltiples canales.",
    category: "Tecnología",
    relatedTerms: ["api-application-programming-interface", "vtex", "omnicanalidad-omnichannel"]
  },
  {
    term: "Heatmap",
    slug: "heatmap",
    definition: "Mapa de calor. Representación visual que muestra dónde los usuarios hacen clic, mueven el cursor o hacen scroll en una página web. Herramienta de análisis UX para optimizar diseño y contenido.",
    category: "Análisis de Datos",
    relatedTerms: ["ab-testing", "conversion-rate-optimization-cro", "user-experience-ux"]
  },

  // I
  {
    term: "Inbound Marketing",
    slug: "inbound-marketing",
    definition: "Metodología de marketing que atrae clientes creando contenido valioso y experiencias personalizadas. Se enfoca en ser encontrado por clientes potenciales en lugar de interrumpirlos con publicidad tradicional.",
    category: "Marketing Digital",
    relatedTerms: ["content-marketing", "search-engine-optimization-seo", "lead-generation"]
  },
  {
    term: "Influencer Marketing",
    slug: "influencer-marketing",
    definition: "Estrategia que utiliza personas con influencia en redes sociales para promocionar productos o servicios. Los influencers tienen audiencias comprometidas que confían en sus recomendaciones.",
    category: "Marketing Digital",
    relatedTerms: ["social-media-marketing", "viral-marketing", "social-commerce"]
  },

  // K
  {
    term: "KPI (Key Performance Indicator)",
    slug: "kpi-key-performance-indicator",
    definition: "Indicador clave de rendimiento. Métrica cuantificable que mide el éxito en alcanzar objetivos de negocio específicos. Ejemplos: tasa de conversión, CAC, ROI, NPS.",
    category: "Métricas",
    relatedTerms: ["dashboard", "business-intelligence-bi", "return-on-investment-roi"]
  },

  // L
  {
    term: "Landing Page",
    slug: "landing-page",
    definition: "Página de aterrizaje diseñada específicamente para convertir visitantes en leads o clientes. Generalmente tiene un único objetivo y CTA, eliminando distracciones y opciones de navegación.",
    category: "UX/UI",
    relatedTerms: ["call-to-action-cta", "conversion-rate", "ab-testing"]
  },
  {
    term: "Lead",
    slug: "lead",
    definition: "Cliente potencial que ha mostrado interés en un producto o servicio al proporcionar información de contacto. Puede ser un lead frío (poco calificado) o caliente (altamente calificado).",
    category: "Conceptos Básicos",
    relatedTerms: ["lead-generation", "lead-nurturing", "sales-funnel"]
  },
  {
    term: "Lead Generation",
    slug: "lead-generation",
    definition: "Generación de leads. Proceso de atraer y convertir extraños en personas interesadas en los productos o servicios de una empresa. Incluye tácticas como content marketing, SEO, PPC y eventos.",
    category: "Marketing Digital",
    relatedTerms: ["lead", "lead-nurturing", "inbound-marketing"]
  },
  {
    term: "Lead Nurturing",
    slug: "lead-nurturing",
    definition: "Proceso de desarrollar relaciones con compradores potenciales en cada etapa del funnel de ventas mediante contenido relevante y comunicación personalizada hasta que estén listos para comprar.",
    category: "Marketing Digital",
    relatedTerms: ["lead-generation", "marketing-automation", "email-marketing"]
  },
  {
    term: "Lifetime Value (LTV)",
    slug: "lifetime-value-ltv",
    definition: "Ver Customer Lifetime Value (CLV). Valor total que un cliente genera para una empresa durante toda su relación comercial.",
    category: "Métricas",
    relatedTerms: ["customer-lifetime-value-clv", "customer-acquisition-cost-cac", "churn-rate"]
  },

  // M
  {
    term: "Marketing Automation",
    slug: "marketing-automation",
    definition: "Uso de software para automatizar tareas repetitivas de marketing como emails, publicaciones en redes sociales, campañas publicitarias y nutrición de leads basándose en comportamientos y triggers específicos.",
    category: "Tecnología",
    relatedTerms: ["email-marketing", "lead-nurturing", "saas-software-as-a-service"]
  },
  {
    term: "Marketplace",
    slug: "marketplace",
    definition: "Plataforma digital que conecta múltiples vendedores con compradores. El marketplace facilita transacciones pero no posee el inventario. Ejemplos: Amazon, Mercado Libre, Alibaba.",
    category: "Modelos de Negocio",
    relatedTerms: ["ecommerce", "gmv-gross-merchandise-value", "b2b-business-to-business"]
  },
  {
    term: "Mobile Commerce (mCommerce)",
    slug: "mobile-commerce-mcommerce",
    definition: "Comercio móvil. Compra y venta de productos o servicios a través de dispositivos móviles como smartphones y tablets. Subconjunto del eCommerce enfocado en experiencia móvil.",
    category: "Conceptos Básicos",
    relatedTerms: ["ecommerce", "social-commerce", "user-experience-ux"]
  },
  {
    term: "Multi-Channel",
    slug: "multi-channel",
    definition: "Estrategia que utiliza múltiples canales de venta y comunicación (tienda física, web, móvil, redes sociales) de manera independiente, sin necesariamente integrarlos.",
    category: "Estrategia",
    relatedTerms: ["omnicanalidad-omnichannel", "social-commerce", "mobile-commerce-mcommerce"]
  },

  // N
  {
    term: "Net Promoter Score (NPS)",
    slug: "net-promoter-score-nps",
    definition: "Métrica de lealtad del cliente que mide la probabilidad de que recomienden tu producto o servicio. Se calcula con una pregunta: '¿Qué tan probable es que recomiendes [empresa] a un amigo?' en escala 0-10.",
    category: "Métricas",
    relatedTerms: ["customer-lifetime-value-clv", "churn-rate", "kpi-key-performance-indicator"]
  },

  // O
  {
    term: "Omnicanalidad (Omnichannel)",
    slug: "omnicanalidad-omnichannel",
    definition: "Estrategia que integra todos los canales de venta y comunicación para ofrecer una experiencia de cliente unificada y sin fricciones, sin importar cómo o dónde el cliente interactúe con la marca.",
    category: "Estrategia",
    relatedTerms: ["multi-channel", "customer-journey", "transformacion-digital"]
  },
  {
    term: "Onboarding",
    slug: "onboarding",
    definition: "Proceso de integración de nuevos usuarios o clientes a un producto o servicio. Incluye tutoriales, guías y comunicaciones diseñadas para ayudar a los usuarios a obtener valor rápidamente.",
    category: "UX/UI",
    relatedTerms: ["user-experience-ux", "churn-rate", "customer-journey"]
  },

  // P
  {
    term: "Payment Gateway",
    slug: "payment-gateway",
    definition: "Pasarela de pago. Servicio que autoriza y procesa pagos con tarjeta de crédito o transferencias bancarias en eCommerce. Actúa como intermediario entre el comercio y las instituciones financieras.",
    category: "Tecnología",
    relatedTerms: ["ecommerce", "shopping-cart-abandonment", "api-application-programming-interface"]
  },
  {
    term: "Personalization",
    slug: "personalization",
    definition: "Personalización. Práctica de crear experiencias individualizadas para cada usuario basándose en datos como comportamiento, preferencias, ubicación, historial de compras y demografía.",
    category: "Estrategia",
    relatedTerms: ["data-driven-marketing", "customer-journey", "account-based-marketing-abm"]
  },
  {
    term: "Product Information Management (PIM)",
    slug: "product-information-management-pim",
    definition: "Sistema que centraliza y gestiona toda la información de productos (descripciones, imágenes, especificaciones, precios) para distribuirla consistentemente a través de múltiples canales de venta.",
    category: "Tecnología",
    relatedTerms: ["erp-enterprise-resource-planning", "omnicanalidad-omnichannel", "sku-stock-keeping-unit"]
  },

  // R
  {
    term: "Retargeting",
    slug: "retargeting",
    definition: "Estrategia publicitaria que muestra anuncios a usuarios que previamente visitaron un sitio web pero no completaron una acción deseada. Utiliza cookies para rastrear y volver a impactar a estos usuarios.",
    category: "Marketing Digital",
    relatedTerms: ["shopping-cart-abandonment", "conversion-rate-optimization-cro", "return-on-ad-spend-roas"]
  },
  {
    term: "Return on Ad Spend (ROAS)",
    slug: "return-on-ad-spend-roas",
    definition: "Retorno de inversión publicitaria. Métrica que mide los ingresos generados por cada peso invertido en publicidad. Se calcula dividiendo los ingresos de la campaña entre el costo de la misma.",
    category: "Métricas",
    relatedTerms: ["return-on-investment-roi", "retargeting", "customer-acquisition-cost-cac"]
  },
  {
    term: "Return on Investment (ROI)",
    slug: "return-on-investment-roi",
    definition: "Retorno de inversión. Métrica que evalúa la rentabilidad de una inversión. Se calcula: (Ganancia - Inversión) / Inversión × 100. Un ROI positivo indica que la inversión generó ganancias.",
    category: "Métricas",
    relatedTerms: ["return-on-ad-spend-roas", "kpi-key-performance-indicator", "customer-acquisition-cost-cac"]
  },

  // S
  {
    term: "SaaS (Software as a Service)",
    slug: "saas-software-as-a-service",
    definition: "Modelo de distribución de software donde las aplicaciones se alojan en la nube y se acceden vía internet mediante suscripción. Ejemplos: Salesforce, HubSpot, Shopify.",
    category: "Tecnología",
    relatedTerms: ["marketing-automation", "erp-enterprise-resource-planning", "vtex"]
  },
  {
    term: "Sales Funnel",
    slug: "sales-funnel",
    definition: "Embudo de ventas. Representación visual del proceso que siguen los prospectos desde el primer contacto hasta convertirse en clientes. Incluye etapas como awareness, interest, decision y action.",
    category: "Estrategia",
    relatedTerms: ["funnel-de-conversion", "lead", "customer-journey"]
  },
  {
    term: "Search Engine Optimization (SEO)",
    slug: "search-engine-optimization-seo",
    definition: "Optimización para motores de búsqueda. Conjunto de técnicas para mejorar la visibilidad de un sitio web en los resultados orgánicos de buscadores como Google, aumentando tráfico cualificado.",
    category: "Marketing Digital",
    relatedTerms: ["content-marketing", "inbound-marketing", "search-engine-optimization-seo"]
  },
  {
    term: "Session",
    slug: "session",
    definition: "Sesión. Período de interacción de un usuario con un sitio web. Por defecto, una sesión termina después de 30 minutos de inactividad o cuando el usuario cierra el navegador.",
    category: "Métricas",
    relatedTerms: ["bounce-rate", "conversion-rate", "kpi-key-performance-indicator"]
  },
  {
    term: "Shopping Cart Abandonment",
    slug: "shopping-cart-abandonment",
    definition: "Abandono de carrito. Situación donde un usuario agrega productos al carrito de compras pero no completa la transacción. La tasa promedio de abandono en eCommerce es del 70%.",
    category: "Métricas",
    relatedTerms: ["retargeting", "payment-gateway", "conversion-rate-optimization-cro"]
  },
  {
    term: "SKU (Stock Keeping Unit)",
    slug: "sku-stock-keeping-unit",
    definition: "Unidad de mantenimiento de stock. Código único que identifica cada producto distinto en inventario, incluyendo variaciones de color, tamaño o modelo.",
    category: "Operaciones",
    relatedTerms: ["product-information-management-pim", "warehouse-management-system-wms", "fulfillment"]
  },
  {
    term: "Social Commerce",
    slug: "social-commerce",
    definition: "Comercio social. Venta de productos directamente a través de plataformas de redes sociales como Instagram, Facebook o TikTok, sin necesidad de que el usuario salga de la aplicación.",
    category: "Modelos de Negocio",
    relatedTerms: ["social-media-marketing", "mobile-commerce-mcommerce", "influencer-marketing"]
  },
  {
    term: "Social Media Marketing",
    slug: "social-media-marketing",
    definition: "Uso de plataformas de redes sociales para conectar con la audiencia, construir marca, aumentar ventas y dirigir tráfico al sitio web. Incluye publicación de contenido, publicidad pagada y engagement.",
    category: "Marketing Digital",
    relatedTerms: ["influencer-marketing", "social-commerce", "content-marketing"]
  },

  // T
  {
    term: "Target Audience",
    slug: "target-audience",
    definition: "Audiencia objetivo. Grupo específico de consumidores a los que se dirige una campaña de marketing o producto, definido por características demográficas, psicográficas y comportamentales.",
    category: "Estrategia",
    relatedTerms: ["buyer-persona", "personalization", "data-driven-marketing"]
  },
  {
    term: "Transformación Digital",
    slug: "transformacion-digital",
    definition: "Proceso de integración de tecnología digital en todas las áreas de una empresa, cambiando fundamentalmente cómo opera y entrega valor a los clientes. Requiere cambios culturales y operacionales.",
    category: "Conceptos Básicos",
    relatedTerms: ["ecommerce", "omnicanalidad-omnichannel", "saas-software-as-a-service"]
  },

  // U
  {
    term: "Upselling",
    slug: "upselling",
    definition: "Técnica de ventas que anima al cliente a comprar una versión más cara o mejorada del producto que está considerando. Ejemplo: ofrecer un modelo premium cuando el cliente mira uno básico.",
    category: "Estrategia",
    relatedTerms: ["average-order-value-aov", "customer-lifetime-value-clv", "conversion-rate"]
  },
  {
    term: "User Experience (UX)",
    slug: "user-experience-ux",
    definition: "Experiencia de usuario. Percepción y respuesta de una persona al usar un producto, sistema o servicio. Incluye aspectos de usabilidad, accesibilidad, diseño y emociones generadas.",
    category: "UX/UI",
    relatedTerms: ["user-interface-ui", "above-the-fold", "onboarding"]
  },
  {
    term: "User Interface (UI)",
    slug: "user-interface-ui",
    definition: "Interfaz de usuario. Punto de interacción entre el usuario y un producto digital. Incluye elementos visuales como botones, iconos, tipografía, colores y layout.",
    category: "UX/UI",
    relatedTerms: ["user-experience-ux", "call-to-action-cta", "landing-page"]
  },

  // V
  {
    term: "Viral Marketing",
    slug: "viral-marketing",
    definition: "Estrategia de marketing que busca que los usuarios compartan contenido de forma orgánica, generando crecimiento exponencial del alcance. Se basa en crear contenido altamente compartible y memorable.",
    category: "Marketing Digital",
    relatedTerms: ["social-media-marketing", "influencer-marketing", "growth-hacking"]
  },
  {
    term: "VTEX",
    slug: "vtex",
    definition: "Plataforma de comercio digital cloud-native que ofrece soluciones completas para eCommerce B2C, B2B y marketplaces. Incluye gestión de catálogo, checkout, OMS, CMS y integraciones.",
    category: "Tecnología",
    relatedTerms: ["ecommerce", "headless-commerce", "marketplace"]
  },

  // W
  {
    term: "Warehouse Management System (WMS)",
    slug: "warehouse-management-system-wms",
    definition: "Sistema de gestión de almacenes. Software que controla y optimiza operaciones de almacén desde la entrada de mercancía hasta el envío, incluyendo picking, packing y gestión de inventario.",
    category: "Tecnología",
    relatedTerms: ["fulfillment", "erp-enterprise-resource-planning", "sku-stock-keeping-unit"]
  },
  {
    term: "Webinar",
    slug: "webinar",
    definition: "Seminario web. Presentación, taller o conferencia transmitida en vivo o grabada a través de internet. Herramienta común en marketing B2B para educar prospectos y generar leads.",
    category: "Marketing Digital",
    relatedTerms: ["lead-generation", "content-marketing", "b2b-business-to-business"]
  },
  {
    term: "White Label",
    slug: "white-label",
    definition: "Producto o servicio producido por una empresa pero comercializado por otra bajo su propia marca. Común en eCommerce para productos genéricos que se rebrandean.",
    category: "Modelos de Negocio",
    relatedTerms: ["b2b-business-to-business", "marketplace", "dropshipping"]
  }
];

// Helper function to get terms grouped by first letter
export function getTermsByLetter(): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {};

  glossaryTerms.forEach(term => {
    const firstLetter = term.term[0].toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(term);
  });

  // Sort terms within each letter
  Object.keys(grouped).forEach(letter => {
    grouped[letter].sort((a, b) => a.term.localeCompare(b.term));
  });

  return grouped;
}

// Get all available letters
export function getAvailableLetters(): string[] {
  const letters = new Set<string>();
  glossaryTerms.forEach(term => {
    letters.add(term.term[0].toUpperCase());
  });
  return Array.from(letters).sort();
}

// Get a single term by slug
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find(t => t.slug === slug);
}

// Get related terms objects from slugs
export function getRelatedTerms(slugs: string[]): GlossaryTerm[] {
  return slugs
    .map(slug => glossaryTerms.find(t => t.slug === slug))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

// Get next and previous terms for navigation
export function getAdjacentTerms(slug: string): { prev: GlossaryTerm | null; next: GlossaryTerm | null } {
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
  const index = sorted.findIndex(t => t.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
