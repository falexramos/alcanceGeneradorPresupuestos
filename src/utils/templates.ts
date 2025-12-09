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
