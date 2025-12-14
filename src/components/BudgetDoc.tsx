import { forwardRef } from 'react';
import { type Budget } from '../db/db';
import { BudgetCoverPage } from './BudgetCoverPage';
import { CombinedIntroObjectivesPage } from './CombinedIntroObjectivesPage';
import { CombinedMarketScopePage } from './CombinedMarketScopePage';
import { Phone, Mail, Globe } from 'lucide-react';

interface BudgetDocProps {
    budget: Budget;
    customImages?: string[];
}

// Custom WhatsApp Icon since it's not in Lucide
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.374-5.03c0-5.445 4.431-9.873 9.873-9.873 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.445-4.437 9.87-9.88 9.87M12.05 2.81c-5.118 0-9.28 4.162-9.28 9.28 0 2.019.66 3.916 1.795 5.485L3.43 21.03l3.565-1.11c1.47.8 3.12 1.26 4.905 1.26 5.118 0 9.28-4.163 9.28-9.28 0-2.478-.966-4.808-2.718-6.56A9.22 9.22 0 0012.05 2.81" />
    </svg>
);

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
            <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 relative overflow-hidden p-6 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col flex-1">

                    <div className="mb-3">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Presupuesto</h2>
                        <div className="w-16 h-1 bg-amber-400 mb-2"></div>

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
                        <div className="rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-amber-400 text-slate-900">
                                        <th className="py-3 px-4 text-left text-sm font-extrabold uppercase tracking-wide border-r border-amber-500/10">Descripción</th>
                                        <th className="py-3 px-4 text-center text-sm font-extrabold uppercase tracking-wide w-20 border-r border-amber-500/10">Cant.</th>
                                        <th className="py-3 px-4 text-right text-sm font-extrabold uppercase tracking-wide w-32">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {budget.items.map((item, index) => (
                                        <tr key={index} className="border-b border-slate-200 last:border-none hover:bg-amber-50/30 transition-colors">
                                            <td className="py-3 px-4 text-sm text-slate-700 align-top">
                                                <p className="font-bold text-slate-900 mb-1">{item.description}</p>
                                            </td>
                                            <td className="py-3 px-4 text-center text-sm font-semibold text-slate-600 align-top">
                                                {item.quantity}
                                            </td>
                                            <td className="py-3 px-4 text-right text-sm font-bold text-slate-900 align-top">
                                                ${formatCurrency(item.quantity * item.unitPrice)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-amber-400 text-slate-900 border-t-2 border-amber-500/20">
                                        <td colSpan={2} className="py-4 px-4 text-right">
                                            <span className="text-lg font-extrabold uppercase tracking-wide">Total Estimado</span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="text-2xl font-black">${formatCurrency(calculateTotal())}</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* Page Break - Force new page for contact info */}
            <div style={{ pageBreakAfter: 'always' }} className="h-0"></div>

            {/* Images Pages (if any) */}
            {customImages && customImages.length > 0 && customImages.map((url, idx) => (
                <div key={idx} className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 relative overflow-hidden p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col items-center justify-center">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">Referencia {idx + 1}</h3>
                        <div className="flex-1 flex items-center justify-center w-full">
                            <img
                                src={url}
                                alt={`Referencia ${idx + 1}`}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-lg border border-amber-100"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Last Page: Contact Info - Compact to fit in one page */}
            <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 relative overflow-hidden p-6 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col flex-1">

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Información de Contacto
                        </h2>
                        <div className="w-16 h-1 bg-amber-400"></div>
                    </div>

                    {/* Payment Terms */}
                    {/* Payment Terms */}
                    <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Forma de Pago</h3>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed mb-3">{budget.paymentTerms || "50% al inicio, 50% contra entrega"}</p>

                        <div className="p-3 bg-white rounded border border-slate-200 text-sm">
                            <p className="font-semibold text-slate-800 text-xs mb-1">Pago con Tarjeta:</p>
                            <p className="text-xs text-slate-600 mb-2">
                                Aceptamos pagos seguros en línea. Nota: Aplica cargo del 3% por procesamientos con tarjeta de crédito.
                            </p>
                            <a
                                href="https://buy.stripe.com/5kQ9AS39M4bl3Pe7HHaMU01"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline break-all font-medium flex items-center gap-1 text-xs"
                            >
                                <Globe size={12} />
                                https://buy.stripe.com/5kQ9AS39M4bl3Pe7HHaMU01
                            </a>
                        </div>
                    </div>

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
                            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg border border-amber-200">
                                <div className="mb-3">
                                    <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1">
                                        Tu Asesor Comercial
                                    </p>
                                    <p className="text-lg font-bold text-slate-900">
                                        {budget.salesRepName || 'Equipo Comercial'}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {budget.salesRepPhone && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                                <Phone className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase">Teléfono</p>
                                                <p className="text-sm font-semibold">{budget.salesRepPhone}</p>
                                            </div>
                                        </div>
                                    )}
                                    {budget.salesRepPhone && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <WhatsAppIcon className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase">WhatsApp</p>
                                                <p className="text-sm font-semibold">{budget.salesRepPhone}</p>
                                            </div>
                                        </div>
                                    )}
                                    {budget.salesRepEmail && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                                <Mail className="w-4 h-4 text-amber-600" />
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
        </div>
    );
});

BudgetDocument.displayName = 'BudgetDocument';
