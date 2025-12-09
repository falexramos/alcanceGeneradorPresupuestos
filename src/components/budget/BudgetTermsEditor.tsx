import { Plus, X } from 'lucide-react';

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
                    <p className="text-xs text-muted-foreground mt-1">
                        Edita el texto predeterminado según tus necesidades
                    </p>
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
                    <p className="text-xs text-muted-foreground mt-1">
                        Edita el texto predeterminado según tus necesidades
                    </p>
                </div>

                {/* Additional Notes */}
                <div>
                    <label className={labelClass}>Notas Adicionales</label>
                    <textarea
                        className={`${inputClass} min-h-[80px]`}
                        value={additionalNotes || ''}
                        onChange={e => setAdditionalNotes(e.target.value)}
                        placeholder="Notas legales, aclaraciones importantes..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Edita el texto predeterminado según tus necesidades
                    </p>
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
