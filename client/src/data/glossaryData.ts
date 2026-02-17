/**
 * Glosario de Marketing Digital y eCommerce
 * Comprehensive directory of marketing, eCommerce, and digital transformation terms
 */

export interface GlossaryTerm {
  term: string;
  definition: string;
  category?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    term: "A/B Testing",
    definition: "Método de experimentación que compara dos versiones de una página web, email o elemento para determinar cuál genera mejores resultados. Se muestra la versión A a un grupo de usuarios y la versión B a otro, midiendo métricas como conversiones, clics o tiempo en página.",
    category: "Optimización"
  },
  {
    term: "Above the Fold",
    definition: "Porción de una página web visible sin necesidad de hacer scroll. Es el espacio más valioso de una página, donde se deben colocar los elementos más importantes y llamadas a la acción principales.",
    category: "UX/UI"
  },
  {
    term: "Account-Based Marketing (ABM)",
    definition: "Estrategia de marketing B2B que concentra recursos en un conjunto específico de cuentas objetivo dentro de un mercado. Personaliza campañas para cada cuenta, tratándolas como mercados individuales.",
    category: "Marketing B2B"
  },
  {
    term: "API (Application Programming Interface)",
    definition: "Conjunto de protocolos y herramientas que permiten la comunicación entre diferentes aplicaciones de software. En eCommerce, las APIs facilitan la integración entre plataformas, sistemas de pago, inventarios y servicios externos.",
    category: "Tecnología"
  },
  {
    term: "Average Order Value (AOV)",
    definition: "Valor promedio de pedido. Métrica que calcula el monto promedio gastado cada vez que un cliente realiza una compra. Se obtiene dividiendo los ingresos totales entre el número de pedidos.",
    category: "Métricas"
  },
  
  // B
  {
    term: "B2B (Business to Business)",
    definition: "Modelo de negocio en el que las transacciones comerciales se realizan entre empresas, no con consumidores finales. Ejemplo: un fabricante que vende a distribuidores.",
    category: "Modelos de Negocio"
  },
  {
    term: "B2C (Business to Consumer)",
    definition: "Modelo de negocio donde las empresas venden productos o servicios directamente a consumidores finales. Es el modelo tradicional de retail y eCommerce.",
    category: "Modelos de Negocio"
  },
  {
    term: "Bounce Rate",
    definition: "Porcentaje de visitantes que abandonan un sitio web después de ver solo una página, sin interactuar. Una tasa de rebote alta puede indicar problemas de relevancia, velocidad o experiencia de usuario.",
    category: "Métricas"
  },
  {
    term: "Buyer Persona",
    definition: "Representación semi-ficticia del cliente ideal basada en datos reales y supuestos fundamentados sobre demografía, comportamiento, motivaciones y objetivos. Guía la estrategia de marketing y desarrollo de producto.",
    category: "Estrategia"
  },
  {
    term: "Business Intelligence (BI)",
    definition: "Conjunto de estrategias, tecnologías y herramientas para transformar datos en información útil que apoye la toma de decisiones empresariales. Incluye análisis de datos, reportes, dashboards y visualizaciones.",
    category: "Análisis de Datos"
  },
  
  // C
  {
    term: "Call to Action (CTA)",
    definition: "Elemento de diseño (botón, enlace, banner) que invita al usuario a realizar una acción específica como 'Comprar ahora', 'Descargar', 'Registrarse'. Es fundamental para guiar al usuario en el funnel de conversión.",
    category: "UX/UI"
  },
  {
    term: "Churn Rate",
    definition: "Tasa de cancelación o abandono. Porcentaje de clientes que dejan de usar un producto o servicio durante un período determinado. Métrica crítica en modelos de suscripción y SaaS.",
    category: "Métricas"
  },
  {
    term: "Content Marketing",
    definition: "Estrategia de marketing enfocada en crear y distribuir contenido valioso, relevante y consistente para atraer y retener una audiencia definida, con el objetivo final de impulsar acciones rentables del cliente.",
    category: "Marketing Digital"
  },
  {
    term: "Conversion Rate",
    definition: "Tasa de conversión. Porcentaje de visitantes que completan una acción deseada (compra, registro, descarga). Se calcula dividiendo las conversiones entre el total de visitantes y multiplicando por 100.",
    category: "Métricas"
  },
  {
    term: "Conversion Rate Optimization (CRO)",
    definition: "Proceso sistemático de aumentar el porcentaje de visitantes de un sitio web que realizan una acción deseada. Incluye análisis de datos, testing A/B, mejoras de UX y optimización del funnel.",
    category: "Optimización"
  },
  {
    term: "Customer Acquisition Cost (CAC)",
    definition: "Costo de adquisición de cliente. Inversión total en marketing y ventas dividida entre el número de nuevos clientes adquiridos en un período. Métrica clave para evaluar la eficiencia de las estrategias de captación.",
    category: "Métricas"
  },
  {
    term: "Customer Journey",
    definition: "Recorrido completo que realiza un cliente desde el primer contacto con la marca hasta la compra y más allá. Incluye todas las interacciones y puntos de contacto en diferentes canales.",
    category: "Estrategia"
  },
  {
    term: "Customer Lifetime Value (CLV)",
    definition: "Valor del tiempo de vida del cliente. Predicción del beneficio neto atribuido a toda la relación futura con un cliente. Ayuda a determinar cuánto invertir en adquisición y retención.",
    category: "Métricas"
  },
  
  // D
  {
    term: "Dashboard",
    definition: "Panel de control visual que presenta métricas e indicadores clave de rendimiento (KPIs) de manera centralizada. Permite monitorear el estado del negocio en tiempo real y tomar decisiones basadas en datos.",
    category: "Análisis de Datos"
  },
  {
    term: "Data-Driven Marketing",
    definition: "Enfoque de marketing que utiliza datos de clientes para optimizar estrategias y mensajes. Las decisiones se basan en análisis de datos en lugar de intuición o experiencia previa.",
    category: "Estrategia"
  },
  {
    term: "Dropshipping",
    definition: "Modelo de negocio de eCommerce donde el vendedor no mantiene inventario. Cuando se realiza una venta, el producto se compra a un tercero que lo envía directamente al cliente final.",
    category: "Modelos de Negocio"
  },
  
  // E
  {
    term: "eCommerce",
    definition: "Comercio electrónico. Compra y venta de productos o servicios a través de internet. Incluye transacciones B2B, B2C, C2C y C2B realizadas mediante plataformas digitales.",
    category: "Conceptos Básicos"
  },
  {
    term: "Email Marketing",
    definition: "Estrategia de marketing digital que utiliza el correo electrónico para comunicarse con clientes potenciales y actuales. Incluye newsletters, campañas promocionales, emails transaccionales y automatizaciones.",
    category: "Marketing Digital"
  },
  {
    term: "ERP (Enterprise Resource Planning)",
    definition: "Sistema de planificación de recursos empresariales que integra procesos de negocio clave como finanzas, inventario, producción, ventas y recursos humanos en una plataforma unificada.",
    category: "Tecnología"
  },
  
  // F
  {
    term: "Fulfillment",
    definition: "Proceso completo de preparación y entrega de pedidos de eCommerce, desde el almacenamiento de inventario hasta el empaque, envío y gestión de devoluciones.",
    category: "Operaciones"
  },
  {
    term: "Funnel de Conversión",
    definition: "Embudo de conversión. Modelo que representa las etapas por las que pasa un usuario desde el primer contacto hasta convertirse en cliente. Típicamente incluye: Awareness, Consideration, Decision y Action.",
    category: "Estrategia"
  },
  
  // G
  {
    term: "GMV (Gross Merchandise Value)",
    definition: "Valor bruto de mercancía. Valor total de ventas realizadas a través de una plataforma de marketplace durante un período específico, antes de deducciones por devoluciones, descuentos o comisiones.",
    category: "Métricas"
  },
  {
    term: "Growth Hacking",
    definition: "Enfoque de marketing orientado al crecimiento rápido mediante experimentación constante, análisis de datos y tácticas creativas de bajo costo. Común en startups y empresas tecnológicas.",
    category: "Estrategia"
  },
  
  // H
  {
    term: "Headless Commerce",
    definition: "Arquitectura de eCommerce que separa el frontend (capa de presentación) del backend (lógica de negocio y datos). Permite mayor flexibilidad para crear experiencias personalizadas en múltiples canales.",
    category: "Tecnología"
  },
  {
    term: "Heatmap",
    definition: "Mapa de calor. Representación visual que muestra dónde los usuarios hacen clic, mueven el cursor o hacen scroll en una página web. Herramienta de análisis UX para optimizar diseño y contenido.",
    category: "Análisis de Datos"
  },
  
  // I
  {
    term: "Inbound Marketing",
    definition: "Metodología de marketing que atrae clientes creando contenido valioso y experiencias personalizadas. Se enfoca en ser encontrado por clientes potenciales en lugar de interrumpirlos con publicidad tradicional.",
    category: "Marketing Digital"
  },
  {
    term: "Influencer Marketing",
    definition: "Estrategia que utiliza personas con influencia en redes sociales para promocionar productos o servicios. Los influencers tienen audiencias comprometidas que confían en sus recomendaciones.",
    category: "Marketing Digital"
  },
  
  // K
  {
    term: "KPI (Key Performance Indicator)",
    definition: "Indicador clave de rendimiento. Métrica cuantificable que mide el éxito en alcanzar objetivos de negocio específicos. Ejemplos: tasa de conversión, CAC, ROI, NPS.",
    category: "Métricas"
  },
  
  // L
  {
    term: "Landing Page",
    definition: "Página de aterrizaje diseñada específicamente para convertir visitantes en leads o clientes. Generalmente tiene un único objetivo y CTA, eliminando distracciones y opciones de navegación.",
    category: "UX/UI"
  },
  {
    term: "Lead",
    definition: "Cliente potencial que ha mostrado interés en un producto o servicio al proporcionar información de contacto. Puede ser un lead frío (poco calificado) o caliente (altamente calificado).",
    category: "Conceptos Básicos"
  },
  {
    term: "Lead Generation",
    definition: "Generación de leads. Proceso de atraer y convertir extraños en personas interesadas en los productos o servicios de una empresa. Incluye tácticas como content marketing, SEO, PPC y eventos.",
    category: "Marketing Digital"
  },
  {
    term: "Lead Nurturing",
    definition: "Proceso de desarrollar relaciones con compradores potenciales en cada etapa del funnel de ventas mediante contenido relevante y comunicación personalizada hasta que estén listos para comprar.",
    category: "Marketing Digital"
  },
  {
    term: "Lifetime Value (LTV)",
    definition: "Ver Customer Lifetime Value (CLV). Valor total que un cliente genera para una empresa durante toda su relación comercial.",
    category: "Métricas"
  },
  
  // M
  {
    term: "Marketing Automation",
    definition: "Uso de software para automatizar tareas repetitivas de marketing como emails, publicaciones en redes sociales, campañas publicitarias y nutrición de leads basándose en comportamientos y triggers específicos.",
    category: "Tecnología"
  },
  {
    term: "Marketplace",
    definition: "Plataforma digital que conecta múltiples vendedores con compradores. El marketplace facilita transacciones pero no posee el inventario. Ejemplos: Amazon, Mercado Libre, Alibaba.",
    category: "Modelos de Negocio"
  },
  {
    term: "Mobile Commerce (mCommerce)",
    definition: "Comercio móvil. Compra y venta de productos o servicios a través de dispositivos móviles como smartphones y tablets. Subconjunto del eCommerce enfocado en experiencia móvil.",
    category: "Conceptos Básicos"
  },
  {
    term: "Multi-Channel",
    definition: "Estrategia que utiliza múltiples canales de venta y comunicación (tienda física, web, móvil, redes sociales) de manera independiente, sin necesariamente integrarlos.",
    category: "Estrategia"
  },
  
  // N
  {
    term: "Net Promoter Score (NPS)",
    definition: "Métrica de lealtad del cliente que mide la probabilidad de que recomienden tu producto o servicio. Se calcula con una pregunta: '¿Qué tan probable es que recomiendes [empresa] a un amigo?' en escala 0-10.",
    category: "Métricas"
  },
  
  // O
  {
    term: "Omnicanalidad (Omnichannel)",
    definition: "Estrategia que integra todos los canales de venta y comunicación para ofrecer una experiencia de cliente unificada y sin fricciones, sin importar cómo o dónde el cliente interactúe con la marca.",
    category: "Estrategia"
  },
  {
    term: "Onboarding",
    definition: "Proceso de integración de nuevos usuarios o clientes a un producto o servicio. Incluye tutoriales, guías y comunicaciones diseñadas para ayudar a los usuarios a obtener valor rápidamente.",
    category: "UX/UI"
  },
  
  // P
  {
    term: "Payment Gateway",
    definition: "Pasarela de pago. Servicio que autoriza y procesa pagos con tarjeta de crédito o transferencias bancarias en eCommerce. Actúa como intermediario entre el comercio y las instituciones financieras.",
    category: "Tecnología"
  },
  {
    term: "Personalization",
    definition: "Personalización. Práctica de crear experiencias individualizadas para cada usuario basándose en datos como comportamiento, preferencias, ubicación, historial de compras y demografía.",
    category: "Estrategia"
  },
  {
    term: "Product Information Management (PIM)",
    definition: "Sistema que centraliza y gestiona toda la información de productos (descripciones, imágenes, especificaciones, precios) para distribuirla consistentemente a través de múltiples canales de venta.",
    category: "Tecnología"
  },
  
  // R
  {
    term: "Retargeting",
    definition: "Estrategia publicitaria que muestra anuncios a usuarios que previamente visitaron un sitio web pero no completaron una acción deseada. Utiliza cookies para rastrear y volver a impactar a estos usuarios.",
    category: "Marketing Digital"
  },
  {
    term: "Return on Ad Spend (ROAS)",
    definition: "Retorno de inversión publicitaria. Métrica que mide los ingresos generados por cada peso invertido en publicidad. Se calcula dividiendo los ingresos de la campaña entre el costo de la misma.",
    category: "Métricas"
  },
  {
    term: "Return on Investment (ROI)",
    definition: "Retorno de inversión. Métrica que evalúa la rentabilidad de una inversión. Se calcula: (Ganancia - Inversión) / Inversión × 100. Un ROI positivo indica que la inversión generó ganancias.",
    category: "Métricas"
  },
  
  // S
  {
    term: "SaaS (Software as a Service)",
    definition: "Modelo de distribución de software donde las aplicaciones se alojan en la nube y se acceden vía internet mediante suscripción. Ejemplos: Salesforce, HubSpot, Shopify.",
    category: "Tecnología"
  },
  {
    term: "Sales Funnel",
    definition: "Embudo de ventas. Representación visual del proceso que siguen los prospectos desde el primer contacto hasta convertirse en clientes. Incluye etapas como awareness, interest, decision y action.",
    category: "Estrategia"
  },
  {
    term: "Search Engine Optimization (SEO)",
    definition: "Optimización para motores de búsqueda. Conjunto de técnicas para mejorar la visibilidad de un sitio web en los resultados orgánicos de buscadores como Google, aumentando tráfico cualificado.",
    category: "Marketing Digital"
  },
  {
    term: "Session",
    definition: "Sesión. Período de interacción de un usuario con un sitio web. Por defecto, una sesión termina después de 30 minutos de inactividad o cuando el usuario cierra el navegador.",
    category: "Métricas"
  },
  {
    term: "Shopping Cart Abandonment",
    definition: "Abandono de carrito. Situación donde un usuario agrega productos al carrito de compras pero no completa la transacción. La tasa promedio de abandono en eCommerce es del 70%.",
    category: "Métricas"
  },
  {
    term: "SKU (Stock Keeping Unit)",
    definition: "Unidad de mantenimiento de stock. Código único que identifica cada producto distinto en inventario, incluyendo variaciones de color, tamaño o modelo.",
    category: "Operaciones"
  },
  {
    term: "Social Commerce",
    definition: "Comercio social. Venta de productos directamente a través de plataformas de redes sociales como Instagram, Facebook o TikTok, sin necesidad de que el usuario salga de la aplicación.",
    category: "Modelos de Negocio"
  },
  {
    term: "Social Media Marketing",
    definition: "Uso de plataformas de redes sociales para conectar con la audiencia, construir marca, aumentar ventas y dirigir tráfico al sitio web. Incluye publicación de contenido, publicidad pagada y engagement.",
    category: "Marketing Digital"
  },
  
  // T
  {
    term: "Target Audience",
    definition: "Audiencia objetivo. Grupo específico de consumidores a los que se dirige una campaña de marketing o producto, definido por características demográficas, psicográficas y comportamentales.",
    category: "Estrategia"
  },
  {
    term: "Transformación Digital",
    definition: "Proceso de integración de tecnología digital en todas las áreas de una empresa, cambiando fundamentalmente cómo opera y entrega valor a los clientes. Requiere cambios culturales y operacionales.",
    category: "Conceptos Básicos"
  },
  
  // U
  {
    term: "Upselling",
    definition: "Técnica de ventas que anima al cliente a comprar una versión más cara o mejorada del producto que está considerando. Ejemplo: ofrecer un modelo premium cuando el cliente mira uno básico.",
    category: "Estrategia"
  },
  {
    term: "User Experience (UX)",
    definition: "Experiencia de usuario. Percepción y respuesta de una persona al usar un producto, sistema o servicio. Incluye aspectos de usabilidad, accesibilidad, diseño y emociones generadas.",
    category: "UX/UI"
  },
  {
    term: "User Interface (UI)",
    definition: "Interfaz de usuario. Punto de interacción entre el usuario y un producto digital. Incluye elementos visuales como botones, iconos, tipografía, colores y layout.",
    category: "UX/UI"
  },
  
  // V
  {
    term: "Viral Marketing",
    definition: "Estrategia de marketing que busca que los usuarios compartan contenido de forma orgánica, generando crecimiento exponencial del alcance. Se basa en crear contenido altamente compartible y memorable.",
    category: "Marketing Digital"
  },
  {
    term: "VTEX",
    definition: "Plataforma de comercio digital cloud-native que ofrece soluciones completas para eCommerce B2C, B2B y marketplaces. Incluye gestión de catálogo, checkout, OMS, CMS y integraciones.",
    category: "Tecnología"
  },
  
  // W
  {
    term: "Warehouse Management System (WMS)",
    definition: "Sistema de gestión de almacenes. Software que controla y optimiza operaciones de almacén desde la entrada de mercancía hasta el envío, incluyendo picking, packing y gestión de inventario.",
    category: "Tecnología"
  },
  {
    term: "Webinar",
    definition: "Seminario web. Presentación, taller o conferencia transmitida en vivo o grabada a través de internet. Herramienta común en marketing B2B para educar prospectos y generar leads.",
    category: "Marketing Digital"
  },
  {
    term: "White Label",
    definition: "Producto o servicio producido por una empresa pero comercializado por otra bajo su propia marca. Común en eCommerce para productos genéricos que se rebrandean.",
    category: "Modelos de Negocio"
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
