import { db, type Budget } from '../db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

export function Dashboard() {
    // Real-time query to IndexedDB
    const budgets = useLiveQuery(() => db.budgets.orderBy('updatedAt').reverse().toArray());

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Mis Presupuestos</h2>
                    <p className="text-muted-foreground mt-1">Gestiona y organiza tus propuestas comerciales.</p>
                </div>
            </div>

            {budgets?.length === 0 && (
                <div className="rounded-lg border border-dashed p-12 text-center hover:bg-muted/50 transition-colors">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No tienes presupuestos aún</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        Comienza creando tu primera propuesta para un cliente de manera rápida y sencilla.
                    </p>
                    <Link to="/new" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow">
                        <Plus size={18} /> Crear Nuevo
                    </Link>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgets?.map((budget: Budget) => (
                    <Link
                        key={budget.id}
                        to={`/edit/${budget.id}`}
                        className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-lg leading-none tracking-tight group-hover:text-primary transition-colors">
                                {budget.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{budget.clientName}</p>
                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    {new Date(budget.updatedAt || Date.now()).toLocaleDateString()}
                                </span>
                                <span className="text-lg font-bold text-primary">
                                    ${budget.totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
