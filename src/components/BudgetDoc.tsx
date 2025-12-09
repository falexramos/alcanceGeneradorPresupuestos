import { forwardRef } from 'react';
import { type Budget } from '../db/db';
import { BudgetCoverPage } from './BudgetCoverPage';
import { CombinedIntroObjectivesPage } from './CombinedIntroObjectivesPage';
import { CombinedMarketScopePage } from './CombinedMarketScopePage';
import { Phone, Mail } from 'lucide-react';

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
        return val.toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };

    return (
        <div ref={ref}>
            {/* Page 1: Cover Page */}
            <BudgetCoverPage
                title={budget.title}
                clientName={budget.clientName}
                createdAt={budget.createdAt}
            />

            {/* Page 2: Introduction + Objectives (Combined) */}
            <CombinedIntroObjectivesPage
                introduction={budget.introduction}
                objectives={budget.objectives}
                clientName={budget.clientName}
            />

            {/* Page 3: Market Analysis + Scope (Combined) */}
            <CombinedMarketScopePage
                marketAnalysis={budget.marketAnalysis}
                scopeDetails={budget.scopeDetails}
                projectDescription={budget.projectDescription}
            />

            {/* Page 4: Budget Table ONLY - Compact */}
            <div className="bg-white p-6 mx-auto max-w-[21cm] text-slate-800 font-sans flex flex-col">

                <div className="mb-3">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Presupuesto</h2>
                    <div className="w-16 h-1 bg-primary mb-2"></div>

                    <div className="flex justify-between text-xs text-slate-600 mb-3">
                        <div>
                            <p><span className="font-semibold">Cliente:</span> {budget.clientName}</p>
                            <p><span className="font-semibold">Fecha:</span> {new Date(budget.createdAt).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div className="text-right">
                            <p><span className="font-semibold">Ref:</span> #{budget.id.slice(0, 8).toUpperCase()}</p>
                            <p><span className="font-semibold">Preparado por:</span> {budget.salesRepName || 'Equipo Comercial'}</p>
                        </div>
                    </div>
                </div>

                {/* Table Only - Compact */}
                <div className="flex-1">
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-primary/10 to-primary/5">
                                    <th className="py-2 px-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Descripción</th>
                                    <th className="py-2 px-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-16">Cant.</th>
                                    <th className="py-2 px-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider w-28">Precio Unit.</th>
                                    <th className="py-2 px-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider w-28 bg-primary/5">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {budget.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-2 px-3 text-sm text-slate-700">
                                            <p className="font-medium text-slate-900">{item.description}</p>
                                        </td>
                                        <td className="py-2 px-3 text-center text-sm text-slate-600 font-medium">{item.quantity}</td>
                                        <td className="py-2 px-3 text-right text-sm text-slate-600">${formatCurrency(item.unitPrice)}</td>
                                        <td className="py-2 px-3 text-right text-sm font-semibold text-slate-900 bg-slate-50/50">
                                            ${formatCurrency(item.quantity * item.unitPrice)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gradient-to-r from-primary/5 to-primary/10 border-t-2 border-primary/20">
                                    <td colSpan={3} className="py-3 px-3 text-right">
                                        <span className="text-base font-bold text-slate-900">TOTAL ESTIMADO</span>
                                    </td>
                                    <td className="py-3 px-3 text-right">
                                        <span className="text-xl font-bold text-primary">${formatCurrency(calculateTotal())}</span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

            </div>

            {/* Page Break - Force new page for contact info */}
            <div style={{ pageBreakAfter: 'always' }} className="h-0"></div>

            {/* Images Pages (if any) */}
            {customImages && customImages.length > 0 && customImages.map((url, idx) => (
                <div key={idx} className="bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Referencia {idx + 1}</h3>
                    <div className="flex-1 flex items-center justify-center w-full">
                        <img
                            src={url}
                            alt={`Referencia ${idx + 1}`}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>
            ))}

            {/* Last Page: Contact Info - Compact to fit in one page */}
            <div className="bg-white p-6 mx-auto max-w-[21cm] text-slate-800 font-sans flex flex-col">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Información de Contacto
                    </h2>
                    <div className="w-16 h-1 bg-primary"></div>
                </div>

                {/* Payment Terms */}
                {budget.paymentTerms && (
                    <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Forma de Pago</h3>
                        <p className="text-sm text-slate-700 leading-relaxed">{budget.paymentTerms}</p>
                    </div>
                )}

                {/* Additional Notes */}
                {budget.additionalNotes && (
                    <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Notas Importantes</h3>
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{budget.additionalNotes}</p>
                    </div>
                )}

                {/* Contact Cards - Compact */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        ¿Tienes preguntas? Contáctanos
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Sales Rep Card - Compact */}
                        <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                            <div className="mb-3">
                                <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
                                    Tu Asesor Comercial
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                    {budget.salesRepName || 'Equipo Comercial'}
                                </p>
                            </div>

                            <div className="space-y-2">
                                {budget.salesRepPhone && (
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <Phone className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase">Teléfono</p>
                                            <p className="text-sm font-semibold">{budget.salesRepPhone}</p>
                                        </div>
                                    </div>
                                )}
                                {budget.salesRepEmail && (
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <Mail className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase">Email</p>
                                            <p className="text-sm font-semibold break-all">{budget.salesRepEmail}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company Card - Compact */}
                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                            <div className="mb-3">
                                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                                    Empresa
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                    Alcance IT
                                </p>
                                <p className="text-xs text-slate-600">
                                    Soluciones Tecnológicas
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Email</p>
                                        <p className="text-sm font-semibold">contacto@alcance-it.es</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - Integrated in same page */}
                <div className="mt-4 pt-4 border-t text-center">
                    <p className="text-xs text-slate-400 mb-1">
                        Este presupuesto es válido por {budget.proposalValidity || '15 días'}.
                    </p>
                    <p className="text-xs text-slate-400">
                        https://alcance-it.es
                    </p>
                </div>

            </div>
        </div>
    );
});

BudgetDocument.displayName = 'BudgetDocument';
