import Dexie, { type Table } from 'dexie';

// Interfaces for our Data Models
export interface Budget {
    id: string; // UUID
    title: string;
    clientName: string;
    type: 'web' | 'consultoria' | 'auditoria' | 'otro';
    status: 'draft' | 'completed';
    totalAmount: number;
    currency: string;
    createdAt: number; // Timestamp
    updatedAt: number; // Timestamp
    items: BudgetItem[];
    themeColor?: string;
    logoBlobId?: string; // Legacy: used to be logo, now deprecated or used for specific overrides
    coverImageBlobId?: string; // Reference to Asset for project image (Legacy/Single)
    projectImageIds?: string[]; // New: Array of images
    projectDescription?: string; // Detailed description of the service
    salesRepName?: string;
    salesRepPhone?: string;
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
