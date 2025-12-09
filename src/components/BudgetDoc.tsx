import { forwardRef } from 'react';
import { type Budget } from '../db/db';
import appLogo from '../assets/logo.png';

interface BudgetDocProps {
    budget: Budget;
    customImages?: string[];
}

export const BudgetDocument = forwardRef<HTMLDivElement, BudgetDocProps>((props, ref) => {
    const { budget, customImages } = props;

    const calculateTotal = () => {
        return budget.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    };

    const formatCurrency = (val: number) => {
        return val.toLocaleString('es-ES', { minimumFractionDigits: 0 });
    };

    return (
        <div ref={ref} className="bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans leading-normal">

            {/* Header */}
            <header className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                <div className="w-1/2">
                    <img src={appLogo} alt="Company Logo" className="h-16 object-contain mb-4" />
                    <div className="text-sm text-slate-500 space-y-1">
                        <p className="font-semibold text-slate-900">Alcance Digital</p>
                        <p>Soluciones Tecnológicas</p>
                        <p>contacto@alcancedigital.com</p>
                    </div>
                </div>
                <div className="text-right w-1/2">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">PRESUPUESTO</h1>
                    <div className="text-sm text-slate-500 space-y-1">
                        <p>
                            <span className="font-semibold">Fecha:</span> {new Date(budget.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-semibold">Referencia:</span> #{budget.id.slice(0, 8).toUpperCase()}
                        </p>
                    </div>
                </div>
            </header>

            {/* Client Info */}
            <div className="mb-12 flex justify-between gap-8">
                <div className="w-1/2">
                    <h3 className="text-xs font-bold uppercase trackin-wider text-slate-400 mb-2">Facturar a</h3>
                    <p className="text-lg font-semibold text-slate-900">{budget.clientName || 'Cliente General'}</p>
                </div>
                <div className="w-1/2 text-right">
                    <h3 className="text-xs font-bold uppercase trackin-wider text-slate-400 mb-2">Preparado por</h3>
                    <p className="text-lg font-semibold text-slate-900">{budget.salesRepName || 'Equipo Comercial'}</p>
                    <p className="text-slate-600">{budget.salesRepPhone || ''}</p>
                </div>
            </div>

            {/* Description */}
            {budget.projectDescription && (
                <div className="mb-8 p-6 bg-slate-50 rounded-lg border-l-4 border-primary">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Descripción del Proyecto</h3>
                    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                        {budget.projectDescription}
                    </p>
                </div>
            )}

            {/* Items Table */}
            <div className="mb-8">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-200">
                            <th className="py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-widest w-1/2">Descripción</th>
                            <th className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Cant.</th>
                            <th className="py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Precio Unit.</th>
                            <th className="py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {budget.items.map((item, index) => (
                            <tr key={index}>
                                <td className="py-4 text-slate-700">
                                    <p className="font-medium text-slate-900">{item.description}</p>
                                </td>
                                <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                                <td className="py-4 text-right text-slate-600">${formatCurrency(item.unitPrice)}</td>
                                <td className="py-4 text-right font-medium text-slate-900">
                                    ${formatCurrency(item.quantity * item.unitPrice)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-12">
                <div className="w-1/2 md:w-1/3">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-semibold text-slate-900">${formatCurrency(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between py-4">
                        <span className="text-lg font-bold text-slate-900">Total Estimado</span>
                        <span className="text-2xl font-bold text-primary">${formatCurrency(calculateTotal())}</span>
                    </div>
                </div>
            </div>

            {/* Custom / Reference Images */}
            {customImages && customImages.length > 0 && (
                <div className="mb-12 break-inside-avoid">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 border-b pb-2">Referencias / Anexos</h3>
                    <div className="flex flex-col gap-6">
                        {customImages.map((url, idx) => (
                            <div key={idx} className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-2">
                                <img
                                    src={url}
                                    alt={`Referencia ${idx + 1}`}
                                    className="w-full h-auto object-contain max-h-[500px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="tex-center pt-8 border-t border-slate-100 mt-auto">
                <p className="text-center text-sm text-slate-400 mb-2">
                    Este presupuesto es válido por 15 días a partir de la fecha de emisión.
                </p>
                <div className="flex justify-center gap-4 text-xs text-slate-300">
                    <span>www.alcancedigital.com</span>
                    <span>•</span>
                    <span>Confidencial</span>
                </div>
            </footer>

        </div>
    );
});

BudgetDocument.displayName = 'BudgetDocument';
