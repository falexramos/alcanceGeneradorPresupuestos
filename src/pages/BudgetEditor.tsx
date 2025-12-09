import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { db, type Budget, type BudgetItem } from '../db/db';
import { BUDGET_TEMPLATES } from '../utils/templates';
import { BudgetDocument } from '../components/BudgetDoc';
import { generatePDF } from '../utils/pdfGenerator';
import { Save, ArrowLeft, Printer } from 'lucide-react';

// Sub-components
import { BudgetProjectInfo } from '../components/budget/BudgetProjectInfo';
import { BudgetItemsList } from '../components/budget/BudgetItemsList';
import { BudgetImageGallery } from '../components/budget/BudgetImageGallery';
import { BudgetTermsEditor } from '../components/budget/BudgetTermsEditor';
import { BudgetContentEditor } from '../components/budget/BudgetContentEditor';

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

    // New content sections - empty by default, will use defaults in PDF if empty
    const [introduction, setIntroduction] = useState('');
    const [objectives, setObjectives] = useState('');
    const [marketAnalysis, setMarketAnalysis] = useState('');
    const [salesRepEmail, setSalesRepEmail] = useState('');

    // Commercial terms fields - WITH DEFAULT VALUES
    const [paymentTerms, setPaymentTerms] = useState('50% al inicio del proyecto, 50% contra entrega');
    const [proposalValidity, setProposalValidity] = useState('15 días');
    const [additionalNotes, setAdditionalNotes] = useState('Los precios no incluyen IVA. Una vez aceptada la propuesta, se procederá con la firma del contrato y el inicio del proyecto.');
    const [scopeDetails, setScopeDetails] = useState<string[]>([
        'Atención personalizada durante todo el proyecto',
        'Soporte técnico post-entrega',
        'Garantía de satisfacción',
        'Actualizaciones y mejoras incluidas'
    ]);

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
                        setSalesRepEmail(existing.salesRepEmail || '');
                        setItems(existing.items);

                        // Load content sections
                        setIntroduction(existing.introduction || '');
                        setObjectives(existing.objectives || '');
                        setMarketAnalysis(existing.marketAnalysis || '');

                        // Load commercial terms - keep defaults if not set
                        setPaymentTerms(existing.paymentTerms || '50% al inicio del proyecto, 50% contra entrega');
                        setProposalValidity(existing.proposalValidity || '15 días');
                        setAdditionalNotes(existing.additionalNotes || 'Los precios no incluyen IVA. Una vez aceptada la propuesta, se procederá con la firma del contrato y el inicio del proyecto.');
                        setScopeDetails(existing.scopeDetails || [
                            'Atención personalizada durante todo el proyecto',
                            'Soporte técnico post-entrega',
                            'Garantía de satisfacción',
                            'Actualizaciones y mejoras incluidas'
                        ]);

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
            salesRepEmail,
            // Content sections
            introduction,
            objectives,
            marketAnalysis,
            // Commercial terms
            paymentTerms,
            proposalValidity,
            additionalNotes,
            scopeDetails,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        await db.budgets.put(budgetData);
        navigate('/');
    };

    // Handle PDF generation using jsPDF + html2canvas
    const handlePrint = async () => {
        if (!componentRef.current) {
            alert('Error: No se pudo generar el PDF');
            return;
        }

        const filename = `Presupuesto-${clientName || 'Borrador'}.pdf`;
        await generatePDF(componentRef.current, filename);
    };

    const formatCurrency = (val: number) => {
        return val.toLocaleString('es-ES', { minimumFractionDigits: 0 });
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;

    return (
        <div className="container mx-auto pb-32 px-0 md:px-4 max-w-4xl pt-2 md:pt-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-8 px-4 md:px-0">
                <div className="flex items-center gap-3 w-full">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 shrink-0">
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-lg md:text-2xl font-bold tracking-tight flex-1 truncate">
                        {isTemplateMode ? 'Editor de Plantilla' : (id === 'new' ? 'Nuevo Presupuesto' : 'Editando')}
                    </h1>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-2 w-auto justify-end">
                    {!isTemplateMode && (
                        <button onClick={() => handlePrint()} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
                            <Printer size={18} /> Imprimir
                        </button>
                    )}
                    <button onClick={handleSave} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
                        <Save size={18} /> Guardar
                    </button>
                </div>
            </div>

            {/* Components */}
            <BudgetProjectInfo
                title={title} setTitle={setTitle}
                projectDescription={projectDescription} setProjectDescription={setProjectDescription}
                clientName={clientName} setClientName={setClientName}
                salesRepName={salesRepName} setSalesRepName={setSalesRepName}
                salesRepPhone={salesRepPhone} setSalesRepPhone={setSalesRepPhone}
                isTemplateMode={isTemplateMode}
            />

            <BudgetItemsList
                items={items}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
                onUpdateItem={handleUpdateItem}
                calculateTotal={calculateTotal}
                formatCurrency={formatCurrency}
            />

            <BudgetContentEditor
                introduction={introduction}
                setIntroduction={setIntroduction}
                objectives={objectives}
                setObjectives={setObjectives}
                marketAnalysis={marketAnalysis}
                setMarketAnalysis={setMarketAnalysis}
                clientName={clientName}
            />

            <BudgetTermsEditor
                salesRepEmail={salesRepEmail}
                setSalesRepEmail={setSalesRepEmail}
                paymentTerms={paymentTerms}
                setPaymentTerms={setPaymentTerms}
                proposalValidity={proposalValidity}
                setProposalValidity={setProposalValidity}
                additionalNotes={additionalNotes}
                setAdditionalNotes={setAdditionalNotes}
                scopeDetails={scopeDetails}
                setScopeDetails={setScopeDetails}
            />

            <BudgetImageGallery
                images={imagePreviews}
                onRemoveImage={handleRemoveImage}
                onImageUpload={handleImageUpload}
            />

            {/* Mobile Sticky Action Bar */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border border-border/40 shadow-xl rounded-full p-2 flex items-center justify-around z-50 ring-1 ring-black/5">
                {!isTemplateMode && (
                    <button
                        onClick={() => handlePrint()}
                        className="flex flex-col items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors w-16"
                        title="Imprimir"
                    >
                        <Printer size={20} />
                        <span className="text-[10px] font-medium mt-0.5">Imprimir</span>
                    </button>
                )}

                <div className="w-px h-8 bg-border/60 mx-1"></div>

                <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 p-2 px-6 bg-primary text-primary-foreground rounded-full shadow-sm hover:bg-primary/90 transition-all active:scale-95 flex-1"
                >
                    <Save size={18} />
                    <span className="text-sm font-bold tracking-wide">GUARDAR</span>
                </button>
            </div>

            {/* PDF Component - Positioned off-screen for html2canvas */}
            <div style={{
                position: 'fixed',
                left: '-9999px',
                top: 0,
                width: '794px', // A4 width at 96 DPI
                zIndex: -1
            }}>
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
                        salesRepEmail,
                        introduction,
                        objectives,
                        marketAnalysis,
                        paymentTerms,
                        proposalValidity,
                        additionalNotes,
                        scopeDetails,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }}
                    customImages={imagePreviews.map(p => p.url)}
                />
            </div>
        </div>
    );
}
