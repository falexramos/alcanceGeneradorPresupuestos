import type { BudgetItem } from '../db/db';

export interface BudgetTemplate {
    id: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name
    defaultItems: Omit<BudgetItem, 'id'>[];
}

export const BUDGET_TEMPLATES: BudgetTemplate[] = [
    {
        id: 'web-basico-financiado',
        name: 'Sitio Web Profesional',
        description: 'Sitio web moderno y responsive con diseño personalizado, optimización SEO y chatbot inteligente. Incluye dominio y hosting por 1 año.',
        icon: 'Globe',
        defaultItems: [
            { description: 'Diseño y desarrollo web completo (concepto creativo, maquetación UI/UX y programación)', quantity: 1, unitPrice: 1500 },
            { description: 'Edición y optimización de imágenes para web (compresión y formato)', quantity: 1, unitPrice: 0 },
            { description: 'Integración de módulos funcionales y despliegue en servidor', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO básica (meta tags, sitemap, velocidad de carga)', quantity: 1, unitPrice: 0 },
            { description: 'Chatbot sencillo de conversación mínima', quantity: 1, unitPrice: 0 },
            { description: 'Botón flotante de WhatsApp Business para atención directa', quantity: 1, unitPrice: 0 },
            { description: 'Configuración de Google Analytics y Search Console', quantity: 1, unitPrice: 0 },
            { description: 'Favicon personalizado y meta tags Open Graph para redes sociales', quantity: 1, unitPrice: 0 },
            { description: 'Íconos de redes sociales con enlaces directos', quantity: 1, unitPrice: 0 },
            { description: 'Página de política de privacidad y aviso legal', quantity: 1, unitPrice: 0 },
            { description: 'Diseño 100% responsive (móvil, tablet y desktop)', quantity: 1, unitPrice: 0 },
            { description: 'Optimización de velocidad con PageSpeed mínimo 80/100', quantity: 1, unitPrice: 0 },
            { description: 'Exhibición de reseñas destacadas (requiere perfil previamente registrado en Google Business o similar)', quantity: 1, unitPrice: 0 },
            { description: 'Backup inicial del sitio entregado (archivos y base de datos)', quantity: 1, unitPrice: 0 },
            { description: 'Compatibilidad con navegadores principales (Chrome, Safari, Firefox, Edge)', quantity: 1, unitPrice: 0 },
            { description: 'Registro de dominio .com en GoDaddy (renovación anual)', quantity: 1, unitPrice: 0 },
            { description: 'Hosting web con SSL incluido (renovación anual)', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'web-basico-contado',
        name: 'Sitio Web Profesional (Pago Único)',
        description: 'Mismas características del plan profesional con precio especial por pago de contado. Ahorra $300 USD.',
        icon: 'Globe',
        defaultItems: [
            { description: 'Diseño y desarrollo web completo (concepto creativo, maquetación UI/UX y programación)', quantity: 1, unitPrice: 1200 },
            { description: 'Edición y optimización de imágenes para web (compresión y formato)', quantity: 1, unitPrice: 0 },
            { description: 'Integración de módulos funcionales y despliegue en servidor', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO básica (meta tags, sitemap, velocidad de carga)', quantity: 1, unitPrice: 0 },
            { description: 'Chatbot sencillo de conversación mínima', quantity: 1, unitPrice: 0 },
            { description: 'Botón flotante de WhatsApp Business para atención directa', quantity: 1, unitPrice: 0 },
            { description: 'Configuración de Google Analytics y Search Console', quantity: 1, unitPrice: 0 },
            { description: 'Favicon personalizado y meta tags Open Graph para redes sociales', quantity: 1, unitPrice: 0 },
            { description: 'Íconos de redes sociales con enlaces directos', quantity: 1, unitPrice: 0 },
            { description: 'Página de política de privacidad y aviso legal', quantity: 1, unitPrice: 0 },
            { description: 'Diseño 100% responsive (móvil, tablet y desktop)', quantity: 1, unitPrice: 0 },
            { description: 'Optimización de velocidad con PageSpeed mínimo 80/100', quantity: 1, unitPrice: 0 },
            { description: 'Exhibición de reseñas destacadas (requiere perfil previamente registrado en Google Business o similar)', quantity: 1, unitPrice: 0 },
            { description: 'Backup inicial del sitio entregado (archivos y base de datos)', quantity: 1, unitPrice: 0 },
            { description: 'Compatibilidad con navegadores principales (Chrome, Safari, Firefox, Edge)', quantity: 1, unitPrice: 0 },
            { description: 'Registro de dominio .com en GoDaddy (renovación anual)', quantity: 1, unitPrice: 0 },
            { description: 'Hosting web con SSL incluido (renovación anual)', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'redes-esencial',
        name: 'Redes Sociales - Pack Esencial',
        description: 'Gestión básica de 1 red social con contenido estático, diseño de piezas y campaña publicitaria incluida.',
        icon: 'Share2',
        defaultItems: [
            { description: 'Gestión de 1 red social (Instagram, Facebook o TikTok)', quantity: 1, unitPrice: 710 },
            { description: 'Contenido estático mensual (4 posts + 4 historias)', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de piezas gráficas básicas con identidad visual', quantity: 1, unitPrice: 0 },
            { description: 'Redacción directa para publicaciones', quantity: 1, unitPrice: 0 },
            { description: 'Optimización de bio con información básica del negocio', quantity: 1, unitPrice: 0 },
            { description: 'Subida de contenido a la red social', quantity: 1, unitPrice: 0 },
            { description: '1 ronda de cambios por pieza diseñada', quantity: 1, unitPrice: 0 },
            { description: 'Soporte vía email', quantity: 1, unitPrice: 0 },
            { description: 'Inversión en Ads incluida ($100 USD en una red social)', quantity: 1, unitPrice: 0 },
            { description: 'Campaña publicitaria económica directa', quantity: 1, unitPrice: 0 },
            { description: 'Reporte de cierre con resultados básicos', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'redes-crecimiento',
        name: 'Redes Sociales - Pack Crecimiento',
        description: 'Gestión de 2 redes sociales con contenido estático y dinámico, auditoría inicial, estudio de mercado y mayor inversión publicitaria.',
        icon: 'TrendingUp',
        defaultItems: [
            { description: 'Gestión de 2 redes sociales', quantity: 1, unitPrice: 880 },
            { description: 'Contenido estático mensual (6 posts + 6 historias)', quantity: 1, unitPrice: 0 },
            { description: 'Contenido dinámico (1 Reel incluido)', quantity: 1, unitPrice: 0 },
            { description: 'Auditoría de inicio con informe al comenzar', quantity: 1, unitPrice: 0 },
            { description: 'Estudio de mercado para evitar errores comunes', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de piezas gráficas de crecimiento', quantity: 1, unitPrice: 0 },
            { description: 'Aplicación de colores e identidad de marca', quantity: 1, unitPrice: 0 },
            { description: 'Copywriting optimizado para visibilidad', quantity: 1, unitPrice: 0 },
            { description: 'Calendario mensual de temas y pilares de contenido', quantity: 1, unitPrice: 0 },
            { description: 'Gestión de subida en 2 redes sociales', quantity: 1, unitPrice: 0 },
            { description: '1 ronda de cambios por pieza diseñada', quantity: 1, unitPrice: 0 },
            { description: 'Soporte vía email', quantity: 1, unitPrice: 0 },
            { description: 'Inversión en Ads incluida ($150 USD repartidos 50/50 entre redes)', quantity: 1, unitPrice: 0 },
            { description: 'Campaña publicitaria para ganar visibilidad', quantity: 1, unitPrice: 0 },
            { description: 'Informe de cierre con repercusiones finales', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'redes-premium',
        name: 'Redes Sociales - Pack Premium',
        description: 'Gestión integral de 3 redes sociales con contenido premium, análisis profundo, limpieza de perfil, gestión de comunidad y reportes detallados.',
        icon: 'Award',
        defaultItems: [
            { description: 'Gestión de 3 redes sociales (Instagram, Facebook y TikTok)', quantity: 1, unitPrice: 1060 },
            { description: 'Contenido estático mensual (8 posts + 7 historias)', quantity: 1, unitPrice: 0 },
            { description: 'Contenido dinámico (2 Reels incluidos)', quantity: 1, unitPrice: 0 },
            { description: 'Estadística de alcance inicial', quantity: 1, unitPrice: 0 },
            { description: 'Estudio profundo de tendencias del mercado', quantity: 1, unitPrice: 0 },
            { description: 'Análisis detallado de audiencia (ubicación y edad)', quantity: 1, unitPrice: 0 },
            { description: 'Lavado de perfil (archivo de posts sin información relevante)', quantity: 1, unitPrice: 0 },
            { description: 'Creación y organización de Historias Destacadas', quantity: 1, unitPrice: 0 },
            { description: 'Retoque operativo y estético de logo', quantity: 1, unitPrice: 0 },
            { description: 'Renovación completa del feed con estética de máximo rendimiento', quantity: 1, unitPrice: 0 },
            { description: 'Copywriting de alto impacto', quantity: 1, unitPrice: 0 },
            { description: 'Reescritura profesional de bio', quantity: 1, unitPrice: 0 },
            { description: 'Enlaces estratégicos a redes y web', quantity: 1, unitPrice: 0 },
            { description: 'Calendario mensual de orden estratégico', quantity: 1, unitPrice: 0 },
            { description: 'Programación de publicaciones por fechas y horas óptimas', quantity: 1, unitPrice: 0 },
            { description: '1 ronda de cambios por pieza diseñada', quantity: 1, unitPrice: 0 },
            { description: 'Gestión de comunidad (respuesta a mensajes y comentarios)', quantity: 1, unitPrice: 0 },
            { description: 'Asesoramiento humano personalizado', quantity: 1, unitPrice: 0 },
            { description: 'Soporte directo con Community Manager vía chat', quantity: 1, unitPrice: 0 },
            { description: 'Inversión en Ads definida según objetivo de marca', quantity: 1, unitPrice: 0 },
            { description: 'Análisis detallado y gestión de campaña para máximo alcance', quantity: 1, unitPrice: 0 },
            { description: 'Reporte de cierre con estadística de alcance', quantity: 1, unitPrice: 0 },
            { description: 'Seguimiento de métricas de interacción', quantity: 1, unitPrice: 0 },
            { description: 'Control de nuevos seguidores', quantity: 1, unitPrice: 0 },
            { description: 'Reporte de visualizaciones', quantity: 1, unitPrice: 0 },
            { description: 'Informe de repercusión post-publicidad', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'ecommerce-b2c',
        name: 'Tienda Virtual B2C (Venta al Consumidor)',
        description: 'Plataforma e-commerce completa para venta directa al público. Incluye carrito de compras, pasarela de pagos, gestión de inventario e infraestructura profesional.',
        icon: 'ShoppingCart',
        defaultItems: [
            { description: 'Desarrollo completo de tienda virtual B2C (diseño UI/UX, catálogo y programación)', quantity: 1, unitPrice: 2500 },
            { description: 'Edición y optimización de imágenes de productos (fondo blanco, recorte)', quantity: 1, unitPrice: 0 },
            { description: 'Carrito de compras con experiencia de usuario optimizada', quantity: 1, unitPrice: 0 },
            { description: 'Pasarela de pagos integrada (Stripe, PayPal, tarjetas)', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de gestión de inventario con alertas de stock', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de cupones de descuento y promociones', quantity: 1, unitPrice: 0 },
            { description: 'Notificaciones automáticas de pedidos por email', quantity: 1, unitPrice: 0 },
            { description: 'Panel de administración para gestión de productos y pedidos', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO para productos y categorías', quantity: 1, unitPrice: 0 },
            { description: 'Diseño 100% responsive (móvil, tablet y desktop)', quantity: 1, unitPrice: 0 },
            { description: 'Infraestructura cloud profesional (costo mensual recurrente)', quantity: 1, unitPrice: 150 },
            { description: 'Incluido en Infraestructura: Backend API en Railway', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Base de datos en Supabase', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Hosting web en Vercel (Para uso comercial)', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Monitoreo en Better Stack', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Almacenamiento en AWS S3 (uso comercial)', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Buscador MeiliSearch Cloud (para búsqueda instantánea)', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Servicio de emails con Resend (Para mensajeria de email y notificaciones)', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'ecommerce-b2b',
        name: 'Plataforma B2B (Venta entre Empresas)',
        description: 'Sistema de comercio electrónico especializado para ventas entre empresas. Incluye cotizaciones, precios por volumen, gestión de clientes corporativos e infraestructura robusta.',
        icon: 'Building2',
        defaultItems: [
            { description: 'Desarrollo completo de plataforma B2B (diseño UI/UX, catálogo y programación)', quantity: 1, unitPrice: 2500 },
            { description: 'Sistema de cotizaciones y pedidos personalizados', quantity: 1, unitPrice: 0 },
            { description: 'Gestión de precios por volumen y descuentos escalonados', quantity: 1, unitPrice: 0 },
            { description: 'Portal de clientes corporativos con acceso restringido', quantity: 1, unitPrice: 0 },
            { description: 'Catálogo de productos con fichas técnicas detalladas', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de aprobación de pedidos y flujos de autorización', quantity: 1, unitPrice: 0 },
            { description: 'Integración con facturación electrónica', quantity: 1, unitPrice: 0 },
            { description: 'Gestión de inventario con alertas y reportes', quantity: 1, unitPrice: 0 },
            { description: 'Panel de administración avanzado con roles y permisos', quantity: 1, unitPrice: 0 },
            { description: 'Reportes de ventas y análisis de clientes', quantity: 1, unitPrice: 0 },
            { description: 'Diseño 100% responsive (móvil, tablet y desktop)', quantity: 1, unitPrice: 0 },
            { description: 'Infraestructura cloud profesional (costo mensual recurrente)', quantity: 1, unitPrice: 150 },
            { description: 'Incluido en Infraestructura: Backend API en Railway', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Base de datos en Supabase', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Hosting web en Vercel (Para uso comercial)', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Monitoreo en Better Stack', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Almacenamiento en AWS S3 (uso comercial)', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Buscador MeiliSearch Cloud (para búsqueda instantánea)', quantity: 1, unitPrice: 0 },
            { description: 'Incluido en Infraestructura: Servicio de emails con Resend (Para mensajeria de email y notificaciones)', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'diseno-identidad',
        name: 'Identidad Visual Corporativa',
        description: 'Diseño completo de identidad de marca: logotipo, paleta de colores, tipografías y manual de uso. Todo lo necesario para proyectar una imagen profesional.',
        icon: 'Palette',
        defaultItems: [
            { description: 'Diseño de logotipo profesional (3 propuestas + ajustes)', quantity: 1, unitPrice: 350 },
            { description: 'Variaciones del logo (horizontal, vertical, icono, monocromático)', quantity: 1, unitPrice: 0 },
            { description: 'Definición de paleta de colores corporativos (primarios y secundarios)', quantity: 1, unitPrice: 0 },
            { description: 'Selección de tipografías principales y complementarias', quantity: 1, unitPrice: 0 },
            { description: 'Manual de identidad visual básico (uso correcto del logo, colores y tipografías)', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de tarjeta de presentación (ambas caras)', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de firma de correo electrónico', quantity: 1, unitPrice: 0 },
            { description: 'Entrega de archivos en formatos editables (AI, PSD) y exportados (PNG, JPG, PDF, SVG)', quantity: 1, unitPrice: 0 },
            { description: '2 rondas de revisiones incluidas', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'diseno-piezas-basico',
        name: 'Diseño Gráfico - Pack Básico',
        description: 'Paquete de piezas gráficas para redes sociales y uso digital. Ideal para mantener una presencia visual consistente.',
        icon: 'Image',
        defaultItems: [
            { description: 'Diseño de piezas gráficas para redes sociales', quantity: 6, unitPrice: 0 },
            { description: 'Adaptación de diseños a diferentes formatos (feed, historia, portada)', quantity: 1, unitPrice: 0 },
            { description: 'Retoque y optimización de fotografías proporcionadas', quantity: 4, unitPrice: 0 },
            { description: 'Diseño de banner o portada para redes sociales', quantity: 1, unitPrice: 0 },
            { description: 'Uso de identidad visual existente del cliente', quantity: 1, unitPrice: 0 },
            { description: 'Entrega en formatos optimizados para web (JPG, PNG)', quantity: 1, unitPrice: 0 },
            { description: '1 ronda de cambios por pieza', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'diseno-piezas-completo',
        name: 'Diseño Gráfico - Pack Completo',
        description: 'Servicio integral de diseño gráfico: piezas digitales, material impreso, retoque fotográfico profesional y elementos visuales personalizados.',
        icon: 'Sparkles',
        defaultItems: [
            { description: 'Diseño de piezas gráficas para redes sociales', quantity: 12, unitPrice: 0 },
            { description: 'Diseño de historias animadas o carruseles', quantity: 4, unitPrice: 0 },
            { description: 'Adaptación de diseños a múltiples formatos y plataformas', quantity: 1, unitPrice: 0 },
            { description: 'Retoque fotográfico profesional (corrección de color, iluminación, fondo)', quantity: 8, unitPrice: 0 },
            { description: 'Diseño de flyer o volante digital/impreso', quantity: 2, unitPrice: 0 },
            { description: 'Diseño de banner publicitario (web o impreso)', quantity: 2, unitPrice: 0 },
            { description: 'Creación de mockups para presentación de productos', quantity: 3, unitPrice: 0 },
            { description: 'Diseño de plantillas reutilizables para el cliente', quantity: 2, unitPrice: 0 },
            { description: 'Iconografía personalizada o ilustraciones simples', quantity: 1, unitPrice: 0 },
            { description: 'Entrega en formatos editables (PSD, AI) y exportados (PNG, JPG, PDF)', quantity: 1, unitPrice: 0 },
            { description: '2 rondas de cambios por pieza', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'diseno-impreso',
        name: 'Diseño para Material Impreso',
        description: 'Diseño de material gráfico para impresión: brochures, catálogos, papelería corporativa y material promocional.',
        icon: 'FileImage',
        defaultItems: [
            { description: 'Diseño de brochure o folleto (hasta 6 páginas)', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de catálogo de productos (hasta 12 páginas)', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de tarjetas de presentación (ambas caras)', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de hoja membretada y sobre corporativo', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de carpeta corporativa', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de flyer promocional (ambas caras)', quantity: 2, unitPrice: 0 },
            { description: 'Diseño de roll-up o banner para eventos', quantity: 1, unitPrice: 0 },
            { description: 'Preparación de archivos para imprenta (CMYK, sangrado, marcas de corte)', quantity: 1, unitPrice: 0 },
            { description: 'Entrega en formatos editables y PDF listo para impresión', quantity: 1, unitPrice: 0 },
            { description: '2 rondas de revisiones incluidas', quantity: 1, unitPrice: 0 }
        ]
    }
];

export const DEFAULT_TEXTS = {
    introduction: {
        long: (clientName: string) => `Estimado/a cliente,

Nos complace presentarle esta propuesta comercial diseñada específicamente para ${clientName}. En Alcance IT, nos especializamos en ofrecer soluciones tecnológicas innovadoras que impulsan el crecimiento y la transformación digital de nuestros clientes.

Nuestra experiencia y compromiso con la excelencia nos permiten entregar proyectos que no solo cumplen, sino que superan las expectativas. Cada solución está diseñada pensando en las necesidades únicas de su negocio.

Estamos entusiasmados por la oportunidad de trabajar con ustedes y contribuir al éxito de su organización.`,
        short: (clientName: string) => `Nos complace presentarle esta propuesta comercial diseñada específicamente para ${clientName}. En Alcance IT, nos especializamos en ofrecer soluciones tecnológicas innovadoras que impulsan el crecimiento y la transformación digital de nuestros clientes.`
    },
    objectives: {
        long: `Nuestro objetivo principal es proporcionar una solución integral que permita:

• Aumentar la visibilidad y presencia digital de su marca
• Optimizar los procesos operativos mediante tecnología
• Generar un retorno de inversión medible y sostenible
• Establecer una base sólida para el crecimiento futuro

Estrategia de Implementación:

1. Análisis inicial y definición de requerimientos
2. Diseño y planificación detallada
3. Desarrollo e implementación por fases
4. Pruebas exhaustivas y ajustes
5. Lanzamiento y monitoreo continuo
6. Soporte y optimización post-lanzamiento`,
        short: `Nuestro objetivo es proporcionar una solución integral que permita aumentar la visibilidad digital, optimizar procesos operativos y generar un retorno de inversión medible y sostenible.`
    },
    marketAnalysis: {
        long: `El mercado digital actual presenta oportunidades significativas para empresas que buscan expandir su presencia online y optimizar sus operaciones.

Tendencias Clave:

• Crecimiento sostenido del comercio electrónico y servicios digitales
• Mayor demanda de experiencias de usuario personalizadas
• Importancia crítica de la presencia en redes sociales
• Necesidad de soluciones tecnológicas escalables y seguras

Oportunidades Identificadas:

La transformación digital ya no es opcional sino esencial para mantener la competitividad. Las empresas que invierten en tecnología y presencia digital experimentan un crecimiento promedio 2.5x superior a aquellas que no lo hacen.

Ventaja Competitiva:

Implementar las soluciones propuestas permitirá posicionarse estratégicamente en el mercado, diferenciarse de la competencia y capturar nuevas oportunidades de negocio.`,
        short: `El mercado digital presenta oportunidades significativas. La transformación digital es esencial para mantener la competitividad, con empresas que invierten en tecnología experimentando un crecimiento 2.5x superior.`
    },
    scope: [
        'Atención personalizada durante todo el proyecto',
        'Soporte técnico post-entrega',
        'Garantía de satisfacción',
        'Actualizaciones y mejoras incluidas'
    ],
    terms: {
        payment: "50% al inicio del proyecto, 50% contra entrega",
        validity: "15 días a partir de la fecha de emisión"
    }
};
