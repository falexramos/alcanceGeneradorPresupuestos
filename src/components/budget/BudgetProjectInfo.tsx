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

                <div>
                    <label className={labelClass}>Descripción del Servicio</label>
                    <textarea
                        className={`${inputClass} min-h-[80px]`}
                        value={projectDescription}
                        onChange={e => setProjectDescription(e.target.value)}
                        placeholder="Describe el alcance del servicio..."
                    />
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
