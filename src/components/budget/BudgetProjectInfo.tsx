import { useState, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';

interface BudgetProjectInfoProps {
    title: string;
    setTitle: (val: string) => void;
    projectDescription: string;
    setProjectDescription: (val: string) => void;
    clientName: string;
    setClientName: (val: string) => void;
    salesRepName: string;
    setSalesRepName: (val: string) => void;
    salesRepPhone: string;
    setSalesRepPhone: (val: string) => void;
    isTemplateMode: boolean;
}

export function BudgetProjectInfo({
    title, setTitle,
    projectDescription, setProjectDescription,
    clientName, setClientName,
    salesRepName, setSalesRepName,
    salesRepPhone, setSalesRepPhone,
    isTemplateMode
}: BudgetProjectInfoProps) {

    // Capture the initial default description (e.g. from template) 
    // This allows us to treat the template's description as "Standard" and revert to it.
    const [defaultDescription, setDefaultDescription] = useState(projectDescription);
    const [hasCapturedDefault, setHasCapturedDefault] = useState(false);

    useEffect(() => {
        // Only capture once when we have a value
        if (!hasCapturedDefault && projectDescription) {
            setDefaultDescription(projectDescription);
            setHasCapturedDefault(true);
        }
    }, [projectDescription, hasCapturedDefault]);

    // UI State: Always start collapsed to be clean, unless we determine it's significantly different 
    // from the captured default later (optional complexity). 
    // For now, adhering to user request: "cargar por defecto [collapsed]" like others.
    const [editDescription, setEditDescription] = useState(false);

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
    const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-muted-foreground";

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 mb-4">
            <div className="space-y-4">
                <div>
                    <label className={labelClass}>
                        {isTemplateMode ? 'Nombre de la Plantilla' : 'Título del Proyecto'}
                    </label>
                    <input
                        className={inputClass}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={isTemplateMode ? "Ej: Servicio Web Premium" : "Ej: Desarrollo Web Corp"}
                    />
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-300">
                    <div className="bg-slate-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${editDescription ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                                {editDescription ? <Pencil size={14} /> : <Check size={14} />}
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-slate-700 text-sm truncate">Descripción del Servicio</p>
                                <p className="text-xs text-slate-500 truncate">
                                    {editDescription ? 'Editando descripción' : 'Usando descripción estándar'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (editDescription) {
                                    // Revert to the captured default
                                    if (defaultDescription) setProjectDescription(defaultDescription);
                                    setEditDescription(false);
                                } else {
                                    setEditDescription(true);
                                }
                            }}
                            className={`ml-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${editDescription ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                        >
                            {editDescription ? 'Deshacer' : 'Personalizar'}
                        </button>
                    </div>

                    {editDescription && (
                        <div className="p-4 bg-white animate-in slide-in-from-top-2 duration-200">
                            <textarea
                                className={`${inputClass} min-h-[100px] h-auto`}
                                value={projectDescription}
                                onChange={e => setProjectDescription(e.target.value)}
                                placeholder="Describe el alcance del servicio..."
                            />
                        </div>
                    )}
                </div>

                {!isTemplateMode && (
                    <>
                        <div className="pt-2 border-t mt-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Información del Cliente</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Cliente / Empresa</label>
                                    <input
                                        className={inputClass}
                                        value={clientName}
                                        onChange={e => setClientName(e.target.value)}
                                        placeholder="Nombre del Cliente"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Comercial</label>
                                        <input
                                            className={inputClass}
                                            value={salesRepName}
                                            onChange={e => setSalesRepName(e.target.value)}
                                            placeholder="Nombre Comercial"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Teléfono</label>
                                        <input
                                            className={inputClass}
                                            value={salesRepPhone}
                                            onChange={e => setSalesRepPhone(e.target.value)}
                                            placeholder="Tel / Whatsapp"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
