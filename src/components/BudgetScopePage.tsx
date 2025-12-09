import { forwardRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface BudgetScopePageProps {
    scopeDetails?: string[];
    projectDescription?: string;
}

export const BudgetScopePage = forwardRef<HTMLDivElement, BudgetScopePageProps>(
    ({ scopeDetails, projectDescription }, ref) => {
        // Default scope if none provided
        const defaultScope = [
            'Atención personalizada durante todo el proyecto',
            'Soporte técnico post-entrega',
            'Garantía de satisfacción',
            'Actualizaciones y mejoras incluidas'
        ];

        const scope = scopeDetails && scopeDetails.length > 0 ? scopeDetails : defaultScope;

        return (
            <div ref={ref} className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Alcance del Servicio
                    </h2>
                    <div className="w-20 h-1 bg-primary"></div>
                </div>

                {/* Project Description */}
                {projectDescription && (
                    <div className="mb-12 p-6 bg-slate-50 rounded-lg border-l-4 border-primary">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">
                            Descripción del Proyecto
                        </h3>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {projectDescription}
                        </p>
                    </div>
                )}

                {/* What's Included */}
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                        ¿Qué Incluye?
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        {scope.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-primary/30 transition-colors"
                            >
                                <div className="shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-slate-700 leading-relaxed">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Value Proposition */}
                <div className="mt-16 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">
                        Nuestro Compromiso
                    </h3>
                    <p className="text-slate-700 text-center leading-relaxed">
                        Trabajamos con dedicación y profesionalismo para garantizar que cada proyecto
                        supere las expectativas de nuestros clientes. Tu éxito es nuestro éxito.
                    </p>
                </div>

            </div>
        );
    }
);

BudgetScopePage.displayName = 'BudgetScopePage';
