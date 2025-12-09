import { Plus } from 'lucide-react';
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

    // UI Utilities
    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Items</h3>
                <button
                    onClick={onAddItem}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2 shadow-sm"
                >
                    <Plus size={16} /> Agregar
                </button>
            </div>

            {/* Desktop Headers */}
            <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_40px] gap-4 mb-4 px-2 text-sm font-medium text-muted-foreground">
                <span>Descripción</span>
                <span>Cant.</span>
                <span>Precio</span>
                <span></span>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={item.id} className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr_40px] gap-3 items-start p-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors">
                        <textarea
                            className={`${inputClass} min-h-[80px] resize-y bg-background`}
                            value={item.description}
                            onChange={e => onUpdateItem(item.id, 'description', e.target.value)}
                            placeholder={`Descripción del item #${index + 1}`}
                            rows={3}
                            autoFocus={index === items.length - 1 && item.description === ''}
                        />

                        <div className="flex gap-3 w-full md:w-auto md:contents">
                            <div className="flex-1 md:flex-none">
                                <label className="md:hidden text-xs text-muted-foreground mb-1 block font-medium">Cant.</label>
                                <input
                                    type="number"
                                    className={`${inputClass} bg-background`}
                                    value={item.quantity}
                                    onChange={e => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
                                    placeholder="1"
                                />
                            </div>

                            <div className="flex-1 md:flex-none">
                                <label className="md:hidden text-xs text-muted-foreground mb-1 block font-medium">Precio</label>
                                <input
                                    type="number"
                                    className={`${inputClass} bg-background`}
                                    value={item.unitPrice}
                                    onChange={e => onUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => onRemoveItem(item.id)}
                            className="inline-flex items-center justify-center 
                            whitespace-nowrap rounded-md text-sm 
                            font-medium transition-colors 
                            focus-visible:outline-none focus-visible:ring-1 
                            focus-visible:ring-ring border border-destructive/30 
                            bg-background hover:bg-destructive/20 
                            hover:text-destructive 
                            hover:border-destructive 
                            h-10 w-full md:w-9 md:h-9 
                            text-destructive"
                            title="Eliminar item"
                        >
                            <span className="md:hidden mr-2">Eliminar</span>
                            <span className="text-xl md:text-lg mb-1 md:mb-0">×</span>
                        </button>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
                        <p>No hay items agregados</p>
                        <p className="text-xs opacity-70 mt-1">Presiona "Agregar" para comenzar</p>
                    </div>
                )}
            </div>

            <div className="mt-6 pt-6 border-t flex justify-between md:justify-end items-center gap-4">
                <span className="text-muted-foreground font-medium">Total Estimado:</span>
                <span className="text-2xl font-bold text-primary">
                    ${formatCurrency(calculateTotal())}
                </span>
            </div>
        </div>
    );
}
