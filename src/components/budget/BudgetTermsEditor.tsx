import { useState, useEffect } from 'react';
import { Plus, X, Pencil, Check } from 'lucide-react';
import { DEFAULT_TEXTS } from '../../utils/templates';

interface BudgetTermsEditorProps {
    salesRepEmail?: string;
    setSalesRepEmail: (val: string) => void;
    paymentTerms?: string;
    setPaymentTerms: (val: string) => void;
    proposalValidity?: string;
    setProposalValidity: (val: string) => void;
    additionalNotes?: string;
    setAdditionalNotes: (val: string) => void;
    scopeDetails?: string[];
    setScopeDetails: (val: string[]) => void;
}

export function BudgetTermsEditor({
    salesRepEmail, setSalesRepEmail,
    paymentTerms, setPaymentTerms,
    proposalValidity, setProposalValidity,
    additionalNotes, setAdditionalNotes,
    scopeDetails = [], setScopeDetails
}: BudgetTermsEditorProps) {

    const defaultNotes = DEFAULT_TEXTS.introduction.long("").includes("IVA") ? "" : 'Los precios no incluyen IVA. Una vez aceptada la propuesta, se procederá con la firma del contrato y el inicio del proyecto.'; // Hardcoded default from BudgetEditor initial state for detection

    const [editNotes, setEditNotes] = useState(false);

    useEffect(() => {
        // If notes are different from the hardcoded default or empty, show editor
        if (additionalNotes && additionalNotes !== 'Los precios no incluyen IVA. Una vez aceptada la propuesta, se procederá con la firma del contrato y el inicio del proyecto.') {
            setEditNotes(true);
        }
    }, []);

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
    const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-muted-foreground";

    const handleAddScopeItem = () => {
        setScopeDetails([...scopeDetails, '']);
    };

    const handleUpdateScopeItem = (index: number, value: string) => {
        const updated = [...scopeDetails];
        updated[index] = value;
        setScopeDetails(updated);
    };

    const handleRemoveScopeItem = (index: number) => {
        setScopeDetails(scopeDetails.filter((_, i) => i !== index));
    };

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 mb-4">
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Términos Comerciales</h3>

            <div className="space-y-4">
                {/* Sales Rep Email */}
                <div>
                    <label className={labelClass}>Email del Comercial</label>
                    <input
                        className={inputClass}
                        type="email"
                        value={salesRepEmail || ''}
                        onChange={e => setSalesRepEmail(e.target.value)}
                        placeholder="comercial@alcance-it.es"
                    />
                </div>

                {/* Payment Terms */}
                <div>
                    <label className={labelClass}>Forma de Pago</label>
                    <input
                        className={inputClass}
                        value={paymentTerms || ''}
                        onChange={e => setPaymentTerms(e.target.value)}
                        placeholder="Ej: 50% al inicio, 50% contra entrega"
                    />
                </div>

                {/* Proposal Validity */}
                <div>
                    <label className={labelClass}>Vigencia de la Propuesta</label>
                    <input
                        className={inputClass}
                        value={proposalValidity || ''}
                        onChange={e => setProposalValidity(e.target.value)}
                        placeholder="Ej: 15 días"
                    />
                </div>

                {/* Additional Notes Toggle */}
                <div className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-300">
                    <div className="bg-slate-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${editNotes ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                                {editNotes ? <Pencil size={14} /> : <Check size={14} />}
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-slate-700 text-sm truncate">Notas Adicionales</p>
                                <p className="text-xs text-slate-500 truncate">
                                    {editNotes ? 'Editando notas' : 'Usando notas estándar'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (editNotes) {
                                    setAdditionalNotes(''); // Revert to empty (which might mean default in some contexts, but here explicitly empty string if disabled?) 
                                    // Actually, let's keep the logic consistent: Disabled = Default. Enabled = Custom.
                                    // But BudgetEditor initializes with a default string. 
                                    // So if we disable, we probably want to reset it to that default string.
                                    setAdditionalNotes('Los precios no incluyen IVA. Una vez aceptada la propuesta, se procederá con la firma del contrato y el inicio del proyecto.');
                                    setEditNotes(false);
                                } else {
                                    // If enabling, and it's currently the default, leave it as is so they can edit it.
                                    setEditNotes(true);
                                }
                            }}
                            className={`ml-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${editNotes ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                        >
                            {editNotes ? 'Deshacer' : 'Personalizar'}
                        </button>
                    </div>

                    {editNotes && (
                        <div className="p-4 bg-white animate-in slide-in-from-top-2 duration-200">
                            <textarea
                                className={`${inputClass} min-h-[100px]`}
                                value={additionalNotes || ''}
                                onChange={e => setAdditionalNotes(e.target.value)}
                                placeholder="Notas legales, aclaraciones importantes..."
                            />
                        </div>
                    )}
                </div>

                {/* Scope Details */}
                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                        <label className={labelClass + " mb-0"}>Qué Incluye (Beneficios)</label>
                        <button
                            onClick={handleAddScopeItem}
                            className="inline-flex items-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2"
                        >
                            <Plus size={14} /> Agregar
                        </button>
                    </div>

                    <div className="space-y-2">
                        {scopeDetails.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <span className="text-primary font-bold shrink-0">✓</span>
                                <input
                                    className={`${inputClass} flex-1`}
                                    value={item}
                                    onChange={e => handleUpdateScopeItem(index, e.target.value)}
                                    placeholder={`Beneficio #${index + 1}`}
                                />
                                <button
                                    onClick={() => handleRemoveScopeItem(index)}
                                    className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {scopeDetails.length === 0 && (
                            <p className="text-sm text-muted-foreground italic py-4 text-center border-2 border-dashed rounded-lg">
                                Los beneficios predeterminados se mostrarán en la propuesta
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
