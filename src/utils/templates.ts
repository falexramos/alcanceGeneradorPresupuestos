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
        name: 'Web Básico (Financiado)',
        description: 'Diseño y desarrollo web 100% personalizado, moderno y responsive. Incluye SEO básico y Chatbot. (Valor Financiado)',
        icon: 'Globe',
        defaultItems: [
            { description: 'Sitio Web Completo (Concepto, Diseño y Codificación)', quantity: 1, unitPrice: 1500 },
            { description: 'Configuración de email corporativo', quantity: 1, unitPrice: 0 },
            { description: 'Modificación de imágenes', quantity: 1, unitPrice: 0 },
            { description: 'Módulos y Despliegue en internet', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO - Básico', quantity: 1, unitPrice: 0 },
            { description: 'Chat bot Básico (Max 3 preguntas)', quantity: 1, unitPrice: 0 },
            { description: 'Configuración email para notificaciones', quantity: 1, unitPrice: 0 },
            { description: 'Dominio GoDaddy (1 año)', quantity: 1, unitPrice: 0 },
            { description: 'Hosting (1 año)', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'web-basico-contado',
        name: 'Web Básico (Sin Financiar)',
        description: 'Mismas características del plan Web Básico. Precio especial de contado.',
        icon: 'Globe',
        defaultItems: [
            { description: 'Sitio Web Completo (Concepto, Diseño y Codificación)', quantity: 1, unitPrice: 1200 },
            { description: 'Configuración de email corporativo', quantity: 1, unitPrice: 0 },
            { description: 'Modificación de imágenes', quantity: 1, unitPrice: 0 },
            { description: 'Módulos y Despliegue en internet', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO - Básico', quantity: 1, unitPrice: 0 },
            { description: 'Chat bot Básico (Max 3 preguntas)', quantity: 1, unitPrice: 0 },
            { description: 'Configuración email para notificaciones', quantity: 1, unitPrice: 0 },
            { description: 'Dominio GoDaddy (1 año)', quantity: 1, unitPrice: 0 },
            { description: 'Hosting (1 año)', quantity: 1, unitPrice: 0 }
        ]
    },
    {
        id: 'redes-sociales',
        name: 'Redes Sociales',
        description: 'Gestión profesional de Facebook e Instagram, diseño gráfico y campañas publicitarias.',
        icon: 'Share2',
        defaultItems: [
            { description: 'Admon RS Facebook e Instagram', quantity: 1, unitPrice: 400 },
            { description: 'Admin página web (Actualizaciones básicas)', quantity: 1, unitPrice: 0 },
            { description: 'Diseño piezas gráficas para RS', quantity: 4, unitPrice: 0 },
            { description: 'Redacción texto publicación RS', quantity: 4, unitPrice: 0 },
            { description: 'Publicación Ads', quantity: 4, unitPrice: 25 },
            { description: 'Gestión de Pauta Ads', quantity: 4, unitPrice: 0 }
        ]
    },
    {
        id: 'ecommerce',
        name: 'E-Commerce',
        description: 'Tienda virtual completa con carrito, pagos online, inventario y cupones.',
        icon: 'ShoppingCart',
        defaultItems: [
            { description: 'Desarrollo E-Commerce Completo (Diseño y Codificación)', quantity: 1, unitPrice: 3500 },
            { description: 'Configuración de email corporativo', quantity: 1, unitPrice: 0 },
            { description: 'Modificación de imágenes', quantity: 1, unitPrice: 0 },
            { description: 'Módulos y Despliegue', quantity: 1, unitPrice: 0 },
            { description: 'Optimización SEO', quantity: 1, unitPrice: 0 },
            { description: 'Carrito de compras y Pasarela de pagos', quantity: 1, unitPrice: 0 },
            { description: 'Gestión de inventario y Notificaciones', quantity: 1, unitPrice: 0 },
            { description: 'Sistema de Cupones y Descuentos', quantity: 1, unitPrice: 0 }
        ]
    }
];
