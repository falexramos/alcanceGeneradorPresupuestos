interface BudgetContentEditorProps {
    introduction?: string;
    setIntroduction: (val: string) => void;
    objectives?: string;
    setObjectives: (val: string) => void;
    marketAnalysis?: string;
    setMarketAnalysis: (val: string) => void;
}

export function BudgetContentEditor({
    introduction, setIntroduction,
    objectives, setObjectives,
    marketAnalysis, setMarketAnalysis
}: BudgetContentEditorProps) {

    const inputClass = "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
    const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-muted-foreground";

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 mb-4">
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Contenido de la Propuesta</h3>

            <div className="space-y-4">
                {/* Introduction */}
                <div>
                    <label className={labelClass}>Introducción</label>
                    <textarea
                        className={`${inputClass} min-h-[120px]`}
                        value={introduction || ''}
                        onChange={e => setIntroduction(e.target.value)}
                        placeholder="Escribe una introducción personalizada para el cliente..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Si lo dejas vacío, se usará un texto predeterminado
                    </p>
                </div>

                {/* Objectives */}
                <div>
                    <label className={labelClass}>Objetivos y Estrategia</label>
                    <textarea
                        className={`${inputClass} min-h-[120px]`}
                        value={objectives || ''}
                        onChange={e => setObjectives(e.target.value)}
                        placeholder="Describe los objetivos y la estrategia del proyecto..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Si lo dejas vacío, se usará un texto predeterminado
                    </p>
                </div>

                {/* Market Analysis */}
                <div>
                    <label className={labelClass}>Análisis de Mercado</label>
                    <textarea
                        className={`${inputClass} min-h-[120px]`}
                        value={marketAnalysis || ''}
                        onChange={e => setMarketAnalysis(e.target.value)}
                        placeholder="Proporciona un análisis del mercado relevante..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Si lo dejas vacío, se usará un texto predeterminado
                    </p>
                </div>
            </div>
        </div>
    );
}
