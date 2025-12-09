import { forwardRef } from 'react';
import { CreditCard, Calendar, FileText, Phone, Mail, Globe } from 'lucide-react';

interface BudgetTermsPageProps {
    paymentTerms?: string;
    proposalValidity?: string;
    additionalNotes?: string;
    salesRepName?: string;
    salesRepPhone?: string;
    salesRepEmail?: string;
}

export const BudgetTermsPage = forwardRef<HTMLDivElement, BudgetTermsPageProps>(
    ({ paymentTerms, proposalValidity, additionalNotes, salesRepName, salesRepPhone, salesRepEmail }, ref) => {

        const defaultPaymentTerms = "50% al inicio del proyecto, 50% contra entrega";
        const defaultValidity = "15 días a partir de la fecha de emisión";

        return (
            <div ref={ref} className="bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Condiciones Comerciales
                    </h2>
                    <div className="w-20 h-1 bg-primary"></div>
                </div>

                {/* Payment Terms */}
                <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            Forma de Pago
                        </h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed ml-13">
                        {paymentTerms || defaultPaymentTerms}
                    </p>
                    <div className="mt-4 ml-13 text-sm text-slate-500">
                        <p>Métodos aceptados: Transferencia bancaria, tarjeta de crédito/débito</p>
                    </div>
                </div>

                {/* Proposal Validity */}
                <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            Vigencia de la Propuesta
                        </h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed ml-13">
                        Esta propuesta es válida por {proposalValidity || defaultValidity}.
                    </p>
                </div>

                {/* Additional Notes */}
                {additionalNotes && (
                    <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900">
                                Notas Importantes
                            </h3>
                        </div>
                        <p className="text-slate-700 leading-relaxed ml-13 whitespace-pre-wrap">
                            {additionalNotes}
                        </p>
                    </div>
                )}

                {/* Contact Section */}
                <div className="mt-auto pt-12 border-t border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6">
                        Información de Contacto
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sales Rep */}
                        <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                            <p className="text-sm uppercase tracking-wider text-slate-500 mb-3">
                                Tu Asesor Comercial
                            </p>
                            <p className="text-lg font-bold text-slate-900 mb-4">
                                {salesRepName || 'Equipo Comercial'}
                            </p>

                            <div className="space-y-2 text-sm text-slate-600">
                                {salesRepPhone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-primary" />
                                        <span>{salesRepPhone}</span>
                                    </div>
                                )}
                                {salesRepEmail && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <span>{salesRepEmail}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company */}
                        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-sm uppercase tracking-wider text-slate-500 mb-3">
                                Alcance IT
                            </p>
                            <p className="text-sm text-slate-700 mb-4">
                                Soluciones Tecnológicas
                            </p>

                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <span>contacto@alcance-it.es</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-primary" />
                                    <span>https://alcance-it.es</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-slate-400">
                    <p>Este documento es confidencial y está destinado únicamente al cliente mencionado.</p>
                </div>

            </div>
        );
    }
);

BudgetTermsPage.displayName = 'BudgetTermsPage';
