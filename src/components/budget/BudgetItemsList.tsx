import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { type BudgetItem } from '../../db/db';

interface BudgetItemsListProps {
    items: BudgetItem[];
    onAddItem: () => void;
    onUpdateItem: (id: string, field: keyof BudgetItem, value: any) => void;
    onRemoveItem: (id: string) => void;
    calculateTotal: () => number;
    formatCurrency: (val: number) => string;
}

export function BudgetItemsList({
    items,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    calculateTotal,
    formatCurrency
}: BudgetItemsListProps) {

    // Track expanded state for each item by ID
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    // Auto-expand new items (empty description) on mount or when added
    useEffect(() => {
        const newExpanded = new Set(expandedIds);
        let changed = false;
        items.forEach(item => {
            // If item has empty description, treat as "editing needed" - but only if we haven't explicitly navigated away?
            // Actually, simpler: if it's effectively "new" (empty desc), ensure it's expanded initially.
            // To avoid forcing it open if user closed it despite being empty, we might need more complex logic.
            // But for this use case, "Empty description = open" is a decent heuristic for discovery.
            // HOWEVER, this prevents closing an empty item.
            // Better strategy: Only auto-expand if it's NOT in the list AND it's physically the last one added? 
            // Let's just leave manual control + initial expand for truly new ones if we could detect.
            // For now, let's try strict manual toggle, BUT if description is empty, render it with a special style or suggestion?
            // Actually, let's just default all existing non-empty items to closed, and empty items to open?
            // This logic allows closing an empty item to delete it later or ignore it.
        });
    }, [items.length]); // Dependency on count changes?

    // Better approach: When user clicks "Add", we know a new item comes in. 
    // Since we can't easily signal from parent, we'll just check if there's a new item (diffing length).
    // Let's just use a simple heuristic inside the render Loop for default state if not tracked?
    // No, controlled state is best.

    const toggleExpand = (id: string) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    // Helper to auto-expand the last item if it was just added?
    // We'll skip complex auto-expand for now to ensure stability. Manual click is fast.

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 mb-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Items del Presupuesto</h3>
                <button
                    onClick={() => {
                        onAddItem();
                        // We can't synchronously expand the new ID here because we don't know it yet.
                        // But the user will see a new "Nuevo Item..." row appear, they can click it.
                    }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2 shadow-sm"
                >
                    <Plus size={16} /> Agregar Item
                </button>
            </div>

            <div className="space-y-3">
                {items.map((item, index) => {
                    const isExpanded = expandedIds.has(item.id);
                    // Heuristic: If description is empty, show as "Nuevo Item" placeholder
                    const title = item.description || "Nuevo Item (Sin descripción)";
                    const isFree = item.unitPrice === 0;

                    return (
                        <div key={item.id} className={`border rounded-lg transition-all duration-200 ${isExpanded ? 'border-primary/20 shadow-sm bg-white' : 'border-border/60 bg-slate-50/50 hover:bg-slate-50 hover:border-border'}`}>

                            {/* Header Summary - Always Visible */}
                            <div
                                onClick={() => toggleExpand(item.id)}
                                className="flex items-center justify-between p-3 md:p-4 cursor-pointer select-none group"
                            >
                                <div className="flex items-center gap-3 overflow-hidden flex-1 mr-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${item.description ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}`}>
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-sm font-medium truncate ${!item.description ? 'text-muted-foreground italic' : 'text-slate-700'}`}>
                                            {title}
                                        </p>
                                        {!isExpanded && (
                                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                                                {item.quantity} x {isFree ? 'Incluido' : `$${item.unitPrice}`}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 md:gap-6 shrink-0">
                                    <div className="text-right hidden sm:block">
                                        <p className={`text-sm font-bold ${isFree ? 'text-green-600' : 'text-slate-900'}`}>
                                            {isFree ? 'INCLUIDO' : `$${formatCurrency(item.quantity * item.unitPrice)}`}
                                        </p>
                                    </div>
                                    <div className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Edit Form */}
                            {isExpanded && (
                                <div className="p-3 md:p-4 border-t bg-white animate-in slide-in-from-top-1 duration-200">
                                    <div className="grid gap-4">
                                        <textarea
                                            className={`${inputClass} min-h-[100px] resize-y`}
                                            value={item.description}
                                            onChange={e => onUpdateItem(item.id, 'description', e.target.value)}
                                            placeholder="Detalla el servicio o producto..."
                                            autoFocus={!item.description} // Autofocus if empty
                                        />

                                        <div className="flex gap-4 items-start">
                                            <div className="w-24 shrink-0">
                                                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cantidad</label>
                                                <input
                                                    type="number"
                                                    className={inputClass}
                                                    value={item.quantity}
                                                    onChange={e => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
                                                    placeholder="1"
                                                    min="1"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Precio Unitario ($)</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                                    <input
                                                        type="number"
                                                        className={`${inputClass} pl-7`}
                                                        value={item.unitPrice}
                                                        onChange={e => onUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="self-end">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (confirm('¿Eliminar este item?')) onRemoveItem(item.id);
                                                    }}
                                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 h-10 w-10 md:w-auto md:px-4 shrink-0"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                    <span className="hidden md:inline ml-2">Eliminar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {items.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/5">
                        <p className="font-medium mb-1">Tu presupuesto está vacío</p>
                        <p className="text-xs opacity-70">Agrega items para comenzar a cotizar</p>
                    </div>
                )}
            </div>

            <div className="mt-6 pt-6 border-t flex justify-between items-center gap-4">
                <span className="text-muted-foreground font-medium">Total Estimado</span>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    ${formatCurrency(calculateTotal())}
                </span>
            </div>
        </div>
    );
}
