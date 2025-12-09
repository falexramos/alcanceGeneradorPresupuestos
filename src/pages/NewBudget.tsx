import { useNavigate } from 'react-router-dom';
import { BUDGET_TEMPLATES } from '../utils/templates';
import { Globe, TrendingUp, ShieldCheck, FileText, Share2, ShoppingCart, Plus } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

const IconMap: Record<string, any> = {
    Globe, TrendingUp, ShieldCheck, FileText, Share2, ShoppingCart
};

export function NewBudget() {
    const navigate = useNavigate();
    const customTemplates = useLiveQuery(() => db.templates.toArray());

    const handleSelectTemplate = (templateId: string) => {
        navigate(`/edit/new?template=${templateId}`);
    };

    const handleCreateTemplate = () => {
        navigate('/edit/new?mode=template');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Nuevo Presupuesto</h2>
                <button
                    onClick={handleCreateTemplate}
                    className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Crear Plantilla</span>
                </button>
            </div>

            <p className="text-muted-foreground mb-8 text-lg">
                Elige un tipo de servicio para comenzar con una plantilla predefinida y ahorrar tiempo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Standard Templates */}
                {BUDGET_TEMPLATES.map(template => {
                    const Icon = IconMap[template.icon] || FileText;
                    return (
                        <div
                            key={template.id}
                            onClick={() => handleSelectTemplate(template.id)}
                            className="group relative cursor-pointer rounded-lg border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon size={24} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">{template.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {template.description}
                            </p>
                        </div>
                    );
                })}

                {/* Custom Templates */}
                {customTemplates?.map(template => (
                    <div
                        key={template.id}
                        onClick={() => handleSelectTemplate(template.id)}
                        className="group relative cursor-pointer rounded-lg border bg-muted/30 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary"
                    >
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <FileText size={24} />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {template.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
