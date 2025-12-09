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
            <div className="pdf-page bg-white p-8 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Presupuesto</h2>
                    <div className="w-16 h-1 bg-primary mb-3"></div>

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

            {/* Images Pages (if any) */}
            {customImages && customImages.length > 0 && customImages.map((url, idx) => (
                <div key={idx} className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col items-center justify-center">
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

            {/* Last Page: Contact Info - NO separate footer page */}
            <div className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                {/* Header */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Información de Contacto
                    </h2>
                    <div className="w-20 h-1 bg-primary"></div>
                </div>

                {/* Payment Terms */}
                {budget.paymentTerms && (
                    <div className="mb-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Forma de Pago</h3>
                        <p className="text-slate-700 leading-relaxed">{budget.paymentTerms}</p>
                    </div>
                )}

                {/* Additional Notes */}
                {budget.additionalNotes && (
                    <div className="mb-6 p-6 bg-amber-50 rounded-lg border border-amber-200">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-3">Notas Importantes</h3>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{budget.additionalNotes}</p>
                    </div>
                )}

                {/* Contact Cards */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6">
                        ¿Tienes preguntas? Contáctanos
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sales Rep Card */}
                        <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
                            <div className="mb-4">
                                <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                                    Tu Asesor Comercial
                                </p>
                                <p className="text-2xl font-bold text-slate-900 mb-1">
                                    {budget.salesRepName || 'Equipo Comercial'}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {budget.salesRepPhone && (
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <Phone className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Teléfono</p>
                                            <p className="font-semibold">{budget.salesRepPhone}</p>
                                        </div>
                                    </div>
                                )}
                                {budget.salesRepEmail && (
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                                            <p className="font-semibold break-all">{budget.salesRepEmail}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company Card */}
                        <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200">
                            <div className="mb-4">
                                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">
                                    Empresa
                                </p>
                                <p className="text-2xl font-bold text-slate-900 mb-1">
                                    Alcance IT
                                </p>
                                <p className="text-sm text-slate-600">
                                    Soluciones Tecnológicas
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                                        <p className="font-semibold">contacto@alcance-it.es</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - Integrated in same page */}
                <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-sm text-slate-400 mb-2">
                        Este presupuesto es válido por {budget.proposalValidity || '15 días'}.
                    </p>
                    <p className="text-sm text-slate-400">
                        https://alcance-it.es
                    </p>
                </div>

            </div>
        </div>
    );
});

BudgetDocument.displayName = 'BudgetDocument';
