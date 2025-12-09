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
            { description: 'Configuración de correo corporativo profesional (@tuempresa.com)', quantity: 1, unitPrice: 0 },
            { description: 'Edición y optimización de imágenes para web (compresión y formato)', quantity: 1, unitPrice: 0 },
            { description: 'Integración de módulos funcionales y despliegue en servidor', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO básica (meta tags, sitemap, velocidad de carga)', quantity: 1, unitPrice: 0 },
            { description: 'Chatbot inteligente con hasta 3 flujos de conversación', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de notificaciones automáticas por email', quantity: 1, unitPrice: 0 },
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
            { description: 'Configuración de correo corporativo profesional (@tuempresa.com)', quantity: 1, unitPrice: 0 },
            { description: 'Edición y optimización de imágenes para web (compresión y formato)', quantity: 1, unitPrice: 0 },
            { description: 'Integración de módulos funcionales y despliegue en servidor', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO básica (meta tags, sitemap, velocidad de carga)', quantity: 1, unitPrice: 0 },
            { description: 'Chatbot inteligente con hasta 3 flujos de conversación', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de notificaciones automáticas por email', quantity: 1, unitPrice: 0 },
            { description: 'Registro de dominio .com en GoDaddy (renovación anual)', quantity: 1, unitPrice: 0 },
            { description: 'Hosting web con SSL incluido (renovación anual)', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'redes-sociales',
        name: 'Gestión de Redes Sociales',
        description: 'Administración profesional de Facebook e Instagram con contenido diseñado, copywriting y campañas publicitarias mensuales.',
        icon: 'Share2',
        defaultItems: [
            { description: 'Gestión integral de Facebook e Instagram (publicaciones, engagement, análisis)', quantity: 1, unitPrice: 400 },
            { description: 'Mantenimiento y actualización de contenido en sitio web', quantity: 1, unitPrice: 0 },
            { description: 'Diseño de piezas gráficas profesionales para redes sociales', quantity: 4, unitPrice: 0 },
            { description: 'Redacción de textos optimizados para cada publicación (copywriting)', quantity: 4, unitPrice: 0 },
            { description: 'Campañas publicitarias en Facebook/Instagram Ads (inversión no incluida)', quantity: 4, unitPrice: 25 },
            { description: 'Configuración, monitoreo y optimización de campañas publicitarias', quantity: 4, unitPrice: 0 }
        ]
    },
    {
        id: 'ecommerce',
        name: 'Tienda Virtual E-Commerce',
        description: 'Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos, gestión de inventario y sistema de cupones.',
        icon: 'ShoppingCart',
        defaultItems: [
            { description: 'Desarrollo completo de tienda virtual (diseño UI/UX, catálogo de productos y programación)', quantity: 1, unitPrice: 3500 },
            { description: 'Configuración de correo corporativo profesional (@tuempresa.com)', quantity: 1, unitPrice: 0 },
            { description: 'Edición y optimización de imágenes de productos (fondo blanco, recorte)', quantity: 1, unitPrice: 0 },
            { description: 'Integración de módulos de e-commerce y despliegue en servidor', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO para productos y categorías (meta tags, URLs amigables)', quantity: 1, unitPrice: 0 },
            { description: 'Carrito de compras y pasarela de pagos (Stripe, PayPal, tarjetas)', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de gestión de inventario y notificaciones automáticas de pedidos', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de cupones de descuento y promociones programables', quantity: 1, unitPrice: 0 }
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
