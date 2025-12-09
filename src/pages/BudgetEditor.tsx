import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { db, type Budget, type BudgetItem } from '../db/db';
import { BUDGET_TEMPLATES } from '../utils/templates';
import { BudgetDocument } from '../components/BudgetDoc';
import { Save, Trash2, Plus, ArrowLeft, Image as ImageIcon, Printer, X } from 'lucide-react';

export function BudgetEditor() {
    const { id } = useParams<{ id: string }>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);
    const templateId = searchParams.get('template');
    const isTemplateMode = searchParams.get('mode') === 'template';

    const [loading, setLoading] = useState(true);

    // Form State
    const [title, setTitle] = useState('');
    const [clientName, setClientName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [salesRepName, setSalesRepName] = useState('Hans Latorre');
    const [salesRepPhone, setSalesRepPhone] = useState('(404) 276 - 6484');
    const [items, setItems] = useState<BudgetItem[]>([]);

    // Multi-image state
    const [projectImageIds, setProjectImageIds] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<{ id: string, url: string }[]>([]);

    // Helper for safe UUID generation
    const safeUUID = () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    // Load Logic
    useEffect(() => {
        const loadData = async () => {
            try {
                if (isTemplateMode) {
                    setTitle('Nueva Plantilla Personalizada');
                    setClientName('Plantilla');
                    setItems([]);
                } else if (id === 'new') {
                    const template = BUDGET_TEMPLATES.find(t => t.id === templateId);
                    if (template) {
                        setTitle(`Presupuesto: ${template.name}`);
                        setProjectDescription(template.description);
                        setClientName('Cliente Generico');
                        setItems(template.defaultItems.map(item => ({ ...item, id: safeUUID() })));
                    } else {
                        const customTemplate = await db.templates.get(templateId || '');
                        if (customTemplate) {
                            setTitle(`Presupuesto: ${customTemplate.name}`);
                            setClientName('Cliente Generico');
                            setProjectDescription(customTemplate.description);
                            setItems(customTemplate.items.map(item => ({ ...item, id: safeUUID() })));
                        } else {
                            setTitle('Nuevo Presupuesto');
                            setItems([]);
                        }
                    }
                } else if (id) {
                    const existing = await db.budgets.get(id);
                    if (existing) {
                        setTitle(existing.title);
                        setClientName(existing.clientName);
                        setProjectDescription(existing.projectDescription || '');
                        setSalesRepName(existing.salesRepName || 'Hans Latorre');
                        setSalesRepPhone(existing.salesRepPhone || '(404) 276 - 6484');
                        setItems(existing.items);

                        const ids = existing.projectImageIds || [];
                        if (ids.length === 0 && existing.coverImageBlobId) {
                            ids.push(existing.coverImageBlobId);
                        }

                        setProjectImageIds(ids);

                        const previews = [];
                        for (const imgId of ids) {
                            const asset = await db.assets.get(imgId);
                            if (asset) {
                                previews.push({ id: imgId, url: URL.createObjectURL(asset.blob) });
                            }
                        }
                        setImagePreviews(previews);
                    }
                }
            } catch (error) {
                console.error("Error loading budget data:", error);
                alert("Error cargando los datos. Por favor intenta recargar.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, templateId, isTemplateMode]);

    // Handlers
    const handleAddItem = () => {
        setItems([...items, { id: safeUUID(), description: '', quantity: 1, unitPrice: 0 }]);
        // Auto-scroll to bottom after render
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    };

    const handleUpdateItem = (itemId: string, field: keyof BudgetItem, value: any) => {
        setItems(items.map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
        ));
    };

    const handleRemoveItem = (itemId: string) => {
        setItems(items.filter(item => item.id !== itemId));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newIds: string[] = [];
        const newPreviews: { id: string, url: string }[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const assetId = safeUUID();
            await db.assets.add({
                id: assetId,
                name: file.name,
                type: file.type,
                blob: file,
                createdAt: Date.now()
            });
            newIds.push(assetId);
            newPreviews.push({ id: assetId, url: URL.createObjectURL(file) });
        }

        setProjectImageIds([...projectImageIds, ...newIds]);
        setImagePreviews([...imagePreviews, ...newPreviews]);
    };

    const handleRemoveImage = (imgId: string) => {
        setProjectImageIds(projectImageIds.filter(id => id !== imgId));
        setImagePreviews(imagePreviews.filter(p => p.id !== imgId));
    };

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    };

    const handleSave = async () => {
        if (isTemplateMode) {
            await db.templates.put({
                id: safeUUID(),
                name: title,
                description: projectDescription || 'Plantilla Personalizada',
                items,
                createdAt: Date.now()
            });
            navigate('/new');
            return;
        }

        const total = calculateTotal();
        const budgetData: Budget = {
            id: id === 'new' ? safeUUID() : id!,
            title,
            clientName,
            type: (templateId as any) || 'otro',
            status: 'draft',
            totalAmount: total,
            currency: 'USD',
            items,
            projectImageIds,
            projectDescription,
            salesRepName,
            salesRepPhone,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        await db.budgets.put(budgetData);
        navigate('/');
    };

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Presupuesto-${clientName || 'Borrador'}`,
    });

    const formatCurrency = (val: number) => {
        return val.toLocaleString('es-ES', { minimumFractionDigits: 0 });
    };

    // UI Utilities
    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block";
    const cardClass = "rounded-lg border bg-card text-card-foreground shadow-sm p-6";

    if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;

    return (
        <div className="container mx-auto pb-24 px-4 max-w-4xl pt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="flex items-center gap-4 w-full">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight flex-1 truncate">
                        {isTemplateMode ? 'Plantilla' : (id === 'new' ? 'Nuevo' : 'Editar')}
                    </h1>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-2 w-auto justify-end">
                    {!isTemplateMode && (
                        <button onClick={() => handlePrint()} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
                            <Printer size={18} /> Imprimir
                        </button>
                    )}
                    <button onClick={handleSave} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
                        <Save size={18} /> Guardar
                    </button>
                </div>
            </div>

            <div className={`${cardClass} mb-6`}>
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
                            <div>
                                <label className={labelClass}>Cliente</label>
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
                        </>
                    )}
                </div>
            </div>

            <div className={`${cardClass} mb-6`}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold leading-none tracking-tight">Items</h3>
                    <button onClick={handleAddItem} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2">
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
                        <div key={item.id} className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr_40px] gap-4 items-center bg-secondary/50 p-4 rounded-lg border border-border shadow-sm">
                            <textarea
                                className={`${inputClass} min-h-[60px] resize-y bg-background border-input`}
                                value={item.description}
                                onChange={e => handleUpdateItem(item.id, 'description', e.target.value)}
                                placeholder={`Descripción del item #${index + 1}`}
                                rows={2}
                                autoFocus={index === items.length - 1 && item.description === ''}
                            />

                            <div className="flex gap-4 w-full md:w-auto md:contents">
                                <div className="flex-1 md:flex-none">
                                    <label className="md:hidden text-xs text-muted-foreground mb-1 block font-medium">Cant.</label>
                                    <input
                                        type="number"
                                        className={`${inputClass} bg-background border-input`}
                                        value={item.quantity}
                                        onChange={e => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                                        placeholder="1"
                                    />
                                </div>

                                <div className="flex-1 md:flex-none">
                                    <label className="md:hidden text-xs text-muted-foreground mb-1 block">Precio</label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        value={item.unitPrice}
                                        onChange={e => handleUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-destructive hover:text-destructive-foreground h-10 w-10 md:h-9 md:w-9 self-end md:self-auto text-destructive"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No hay items agregados
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end items-center gap-4">
                    <span className="text-muted-foreground font-medium">Total Estimado:</span>
                    <span className="text-2xl font-bold text-primary">
                        ${formatCurrency(calculateTotal())}
                    </span>
                </div>
            </div>

            {/* Images Section */}
            <div className={cardClass}>
                <h3 className="text-lg font-semibold leading-none tracking-tight mb-2">Imágenes del Proyecto</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Estas imágenes aparecerán al final del documento PDF.
                </p>

                <div className="flex flex-wrap gap-4">
                    {imagePreviews.map(img => (
                        <div key={img.id} className="relative w-28 h-28 border rounded-lg overflow-hidden group">
                            <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleRemoveImage(img.id)}
                                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <label className="w-28 h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                        <ImageIcon size={24} className="mb-2" />
                        <span className="text-xs font-medium">Agregar</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 bg-background border border-border shadow-lg rounded-full p-2 flex items-center justify-around z-50">
                {!isTemplateMode && (
                    <button
                        onClick={() => handlePrint()}
                        className="flex flex-col items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Imprimir"
                    >
                        <Printer size={20} />
                        <span className="text-[10px] font-medium mt-1">Imprimir</span>
                    </button>
                )}

                <div className="w-px h-8 bg-border mx-2"></div>

                <button
                    onClick={handleSave}
                    className="flex flex-col items-center justify-center p-2 text-primary font-bold hover:text-primary/80 transition-colors flex-1"
                >
                    <Save size={24} className="mb-1" />
                    <span className="text-xs">GUARDAR</span>
                </button>
            </div>

            {/* Hidden Print Component */}
            <div className="hidden">
                <BudgetDocument
                    ref={componentRef}
                    budget={{
                        id: id || safeUUID(),
                        title,
                        clientName,
                        type: (templateId as any) || 'otro',
                        status: 'draft',
                        totalAmount: calculateTotal(),
                        currency: 'USD',
                        items,
                        projectImageIds,
                        projectDescription,
                        salesRepName,
                        salesRepPhone,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }}
                    customImages={imagePreviews.map(p => p.url)}
                />
            </div>
        </div>
    );
}
