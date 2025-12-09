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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Nuevo Presupuesto</h2>
                <button
                    onClick={handleCreateTemplate}
                    className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto justify-center"
                >
                    <Plus size={18} />
                    <span>Crear Plantilla</span>
                </button>
            </div>

            <p className="text-muted-foreground mb-8 text-lg">
                Elige un tipo de servicio para comenzar con una plantilla predefinida y ahorrar tiempo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Standard Templates */}
                {/* Standard Templates */}
                {BUDGET_TEMPLATES.map((template, index) => {
                    const Icon = IconMap[template.icon] || FileText;

                    // Assign unique, vibrant color styles for each template card
                    const styles = [
                        "bg-blue-50 border-blue-200 text-blue-900 hover:border-blue-400 group-hover:shadow-blue-100",
                        "bg-emerald-50 border-emerald-200 text-emerald-900 hover:border-emerald-400 group-hover:shadow-emerald-100",
                        "bg-purple-50 border-purple-200 text-purple-900 hover:border-purple-400 group-hover:shadow-purple-100",
                        "bg-amber-50 border-amber-200 text-amber-900 hover:border-amber-400 group-hover:shadow-amber-100",
                    ];

                    const iconStyles = [
                        "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
                        "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
                        "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
                        "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
                    ];

                    const styleIndex = index % styles.length;
                    const cardStyle = styles[styleIndex];
                    const iconStyle = iconStyles[styleIndex];

                    return (
                        <div
                            key={template.id}
                            onClick={() => handleSelectTemplate(template.id)}
                            className={`group relative cursor-pointer rounded-xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${cardStyle} h-full flex flex-col justify-center items-center text-center`}
                        >
                            <div className={`mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${iconStyle} shadow-sm`}>
                                <Icon size={28} />
                            </div>
                            <h3 className="text-lg font-bold tracking-tight">{template.name}</h3>
                            {/* Description hidden as requested for mobile optimization */}
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
