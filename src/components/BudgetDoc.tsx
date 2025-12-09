import { forwardRef } from 'react';
import { type Budget } from '../db/db';
import appLogo from '../assets/logo.png';
import { BudgetCoverPage } from './BudgetCoverPage';
import { BudgetIntroductionPage } from './BudgetIntroductionPage';
import { BudgetObjectivesPage } from './BudgetObjectivesPage';
import { BudgetMarketAnalysisPage } from './BudgetMarketAnalysisPage';
import { BudgetScopePage } from './BudgetScopePage';
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

            {/* Page 2: Introduction */}
            <BudgetIntroductionPage
                introduction={budget.introduction}
                clientName={budget.clientName}
            />

            {/* Page 3: Objectives & Strategy */}
            <BudgetObjectivesPage
                objectives={budget.objectives}
            />

            {/* Page 4: Market Analysis */}
            <BudgetMarketAnalysisPage
                marketAnalysis={budget.marketAnalysis}
            />

            {/* Page 5: Scope/What's Included */}
            <BudgetScopePage
                scopeDetails={budget.scopeDetails}
                projectDescription={budget.projectDescription}
            />

            {/* Page 6: Items & Pricing */}
            <div className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans leading-normal flex flex-col">

                {/* Header */}
                <header className="flex justify-between items-start border-b-2 border-primary/20 pb-8 mb-8">
                    <div className="w-1/2">
                        <img src={appLogo} alt="Company Logo" className="h-16 object-contain mb-4" />
                        <div className="text-sm text-slate-500 space-y-1">
                            <p className="font-semibold text-slate-900">Alcance IT</p>
                            <p>Soluciones Tecnológicas</p>
                            <p>contacto@alcance-it.es</p>
                        </div>
                    </div>
                    <div className="text-right w-1/2">
                        <h1 className="text-3xl font-bold text-primary mb-2">PRESUPUESTO</h1>
                        <div className="text-sm text-slate-500 space-y-1">
                            <p>
                                <span className="font-semibold">Fecha:</span> {new Date(budget.createdAt).toLocaleDateString('es-ES')}
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
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Facturar a</h3>
                        <p className="text-lg font-semibold text-slate-900">{budget.clientName || 'Cliente General'}</p>
                    </div>
                    <div className="w-1/2 text-right">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Preparado por</h3>
                        <p className="text-lg font-semibold text-slate-900">{budget.salesRepName || 'Equipo Comercial'}</p>
                        <p className="text-slate-600">{budget.salesRepPhone || ''}</p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-8 flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-primary/20">Desglose de Servicios</h2>

                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-primary/10 to-primary/5">
                                    <th className="py-4 px-4 text-left text-xs font-bold text-slate-700 uppercase tracking-widest">Descripción</th>
                                    <th className="py-4 px-4 text-center text-xs font-bold text-slate-700 uppercase tracking-widest w-20">Cant.</th>
                                    <th className="py-4 px-4 text-right text-xs font-bold text-slate-700 uppercase tracking-widest w-32">Precio Unit.</th>
                                    <th className="py-4 px-4 text-right text-xs font-bold text-slate-700 uppercase tracking-widest w-32 bg-primary/5">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {budget.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-4 text-slate-700">
                                            <p className="font-medium text-slate-900">{item.description}</p>
                                        </td>
                                        <td className="py-4 px-4 text-center text-slate-600 font-medium">{item.quantity}</td>
                                        <td className="py-4 px-4 text-right text-slate-600">${formatCurrency(item.unitPrice)}</td>
                                        <td className="py-4 px-4 text-right font-semibold text-slate-900 bg-slate-50/50">
                                            ${formatCurrency(item.quantity * item.unitPrice)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gradient-to-r from-primary/5 to-primary/10 border-t-2 border-primary/20">
                                    <td colSpan={3} className="py-5 px-4 text-right">
                                        <span className="text-lg font-bold text-slate-900">TOTAL ESTIMADO</span>
                                    </td>
                                    <td className="py-5 px-4 text-right">
                                        <span className="text-2xl font-bold text-primary">${formatCurrency(calculateTotal())}</span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-auto pt-8 border-t border-slate-100">
                    <p className="text-center text-sm text-slate-400 mb-2">
                        Este presupuesto es válido por {budget.proposalValidity || '15 días'}.
                    </p>
                    <div className="flex justify-center gap-4 text-xs text-slate-300">
                        <span>https://alcance-it.es/</span>
                        <span>•</span>
                        <span>Confidencial</span>
                    </div>
                </footer>

            </div>

            {/* Images Pages */}
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

            {/* Page 7: Contact Info */}
            <div className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Información de Contacto
                    </h2>
                    <div className="w-20 h-1 bg-primary"></div>
                </div>

                {/* Payment Terms */}
                {budget.paymentTerms && (
                    <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Forma de Pago</h3>
                        <p className="text-slate-700 leading-relaxed">{budget.paymentTerms}</p>
                    </div>
                )}

                {/* Additional Notes */}
                {budget.additionalNotes && (
                    <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-3">Notas Importantes</h3>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{budget.additionalNotes}</p>
                    </div>
                )}

                {/* Contact Cards */}
                <div className="mt-auto">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6">
                        ¿Tienes preguntas? Contáctanos
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

                    {/* Footer */}
                    <div className="text-center text-sm text-slate-400 pt-8 border-t">
                        <p>https://alcance-it.es</p>
                    </div>
                </div>

            </div>
        </div>
    );
});

BudgetDocument.displayName = 'BudgetDocument';
