import { useState, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';
import { DEFAULT_TEXTS } from '../../utils/templates';

interface BudgetContentEditorProps {
    introduction?: string;
    setIntroduction: (val: string) => void;
    objectives?: string;
    setObjectives: (val: string) => void;
    marketAnalysis?: string;
    setMarketAnalysis: (val: string) => void;
    clientName?: string; // Add clientName prop to generate default text correctly
}

export function BudgetContentEditor({
    introduction, setIntroduction,
    objectives, setObjectives,
    marketAnalysis, setMarketAnalysis,
    clientName = "Cliente"
}: BudgetContentEditorProps) {

    // Default states logic
    // If the field has a value that is NOT empty and NOT the default one, consider it customized
    const isCustomized = (currentValue: string | undefined, defaultValue: string) => {
        return !!currentValue && currentValue !== defaultValue;
    };

    const defaultIntroText = DEFAULT_TEXTS.introduction.long(clientName);
    const defaultObjectivesText = DEFAULT_TEXTS.objectives.long;
    const defaultAnalysisText = DEFAULT_TEXTS.marketAnalysis.long;

    const [editIntro, setEditIntro] = useState(false);
    const [editObjectives, setEditObjectives] = useState(false);
    const [editAnalysis, setEditAnalysis] = useState(false);

    // Initial check to see if we should show the editor open (if already customized)
    useEffect(() => {
        if (isCustomized(introduction, defaultIntroText)) setEditIntro(true);
        if (isCustomized(objectives, defaultObjectivesText)) setEditObjectives(true);
        if (isCustomized(marketAnalysis, defaultAnalysisText)) setEditAnalysis(true);
    }, []); // Run once on mount

    const inputClass = "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

    // Reusable Section Component
    const ContentSection = ({
        title,
        isEditing,
        onToggle,
        value,
        onChange,
        defaultValue,
        placeholder
    }: {
        title: string;
        isEditing: boolean;
        onToggle: () => void;
        value: string | undefined;
        onChange: (val: string) => void;
        defaultValue: string;
        placeholder: string;
    }) => (
        <div className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-300">
            <div className="bg-slate-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isEditing ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        {isEditing ? <Pencil size={14} /> : <Check size={14} />}
                    </div>
                    <div className="min-w-0">
                        <p className="font-medium text-slate-700 text-sm truncate">{title}</p>
                        <p className="text-xs text-slate-500 truncate">
                            {isEditing ? 'Editando contenido personalizado' : 'Usando contenido predeterminado'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        // If turning OFF editing, revert to empty/default (or keep custom? usually simplify implies revert)
                        // But better UX: just toggle visibility. If OFF, we visually imply "Default", but value persists?
                        // Let's stick to Propuesta 1 strictly:
                        // Toggle ON: Show Textarea (prefill with default if empty)
                        // Toggle OFF: Hide Textarea (clear value to use system default)

                        if (isEditing) {
                            // Turning OFF -> Revert to default logic (clear field)
                            onChange('');
                            onToggle();
                        } else {
                            // Turning ON -> Prefill with default if empty so they can edit
                            if (!value) onChange(defaultValue);
                            onToggle();
                        }
                    }}
                    className={`ml-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${isEditing ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                >
                    {isEditing ? 'Deshacer' : 'Personalizar'}
                </button>
            </div>

            {isEditing && (
                <div className="p-4 bg-white animate-in slide-in-from-top-2 duration-200">
                    <textarea
                        className={`${inputClass} min-h-[200px] leading-relaxed resize-y`}
                        value={value || defaultValue}
                        onChange={e => onChange(e.target.value)}
                        placeholder={placeholder}
                    />
                    <p className="text-xs text-slate-400 mt-2 text-right">
                        Puedes usar Markdown básico
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 mb-4">
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-4 text-slate-900">Contenido de la Propuesta</h3>
            <p className="text-sm text-slate-500 mb-6">
                Personaliza los textos principales del documento o utiliza las versiones predeterminadas optimizadas.
            </p>

            <div className="space-y-4">
                <ContentSection
                    title="Introducción"
                    isEditing={editIntro}
                    onToggle={() => setEditIntro(!editIntro)}
                    value={introduction}
                    onChange={setIntroduction}
                    defaultValue={defaultIntroText}
                    placeholder="Escribe una introducción personalizada..."
                />

                <ContentSection
                    title="Objetivos y Estrategia"
                    isEditing={editObjectives}
                    onToggle={() => setEditObjectives(!editObjectives)}
                    value={objectives}
                    onChange={setObjectives}
                    defaultValue={defaultObjectivesText}
                    placeholder="Describe los objetivos..."
                />

                <ContentSection
                    title="Análisis de Mercado"
                    isEditing={editAnalysis}
                    onToggle={() => setEditAnalysis(!editAnalysis)}
                    value={marketAnalysis}
                    onChange={setMarketAnalysis}
                    defaultValue={defaultAnalysisText}
                    placeholder="Análisis de mercado..."
                />
            </div>
        </div>
    );
}
