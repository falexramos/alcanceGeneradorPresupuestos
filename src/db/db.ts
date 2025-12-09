import Dexie, { type Table } from 'dexie';

// Interfaces for our Data Models
export interface Budget {
    id: string;
    title: string;
    clientName: string;
    type: 'web' | 'marketing' | 'ecommerce' | 'otro';
    status: 'draft' | 'sent' | 'approved' | 'rejected';
    totalAmount: number;
    currency: string;
    items: BudgetItem[];
    coverImageBlobId?: string;
    projectImageIds?: string[];
    projectDescription?: string;
    salesRepName?: string;
    salesRepPhone?: string;
    salesRepEmail?: string;
    // New content sections
    introduction?: string; // Introducción
    objectives?: string; // Objetivos y Estrategia
    marketAnalysis?: string; // Análisis de Mercado
    // Commercial terms
    paymentTerms?: string;
    proposalValidity?: string;
    additionalNotes?: string;
    scopeDetails?: string[];
    createdAt: number;
    updatedAt: number;
}

export interface BudgetItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface Asset {
    id: string;
    name: string;
    type: string; // mime type
    blob: Blob;
    createdAt: number;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    items: BudgetItem[];
    createdAt: number;
}

export class MySubClassedDexie extends Dexie {
    budgets!: Table<Budget>;
    assets!: Table<Asset>;
    templates!: Table<Template>;

    constructor() {
        super('BudgetAppDB');
        this.version(1).stores({
            budgets: 'id, createdAt, clientName',
            assets: 'id, createdAt'
        });
        // Version 2 adds templates
        this.version(2).stores({
            templates: 'id, name, createdAt'
        });
        // Version 3 adds updatedAt index to budgets to fix SchemaError
        this.version(3).stores({
            budgets: 'id, createdAt, updatedAt, clientName'
        });
    }
}

export const db = new MySubClassedDexie();
