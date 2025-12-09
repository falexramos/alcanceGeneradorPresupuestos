import { forwardRef } from 'react';
import { BarChart3, TrendingUp, Users2, CheckCircle2 } from 'lucide-react';

interface CombinedMarketScopePageProps {
    marketAnalysis?: string;
    scopeDetails?: string[];
    projectDescription?: string;
}

export const CombinedMarketScopePage = forwardRef<HTMLDivElement, CombinedMarketScopePageProps>(
    ({ marketAnalysis, scopeDetails, projectDescription }, ref) => {

        const defaultAnalysis = `El mercado digital presenta oportunidades significativas. La transformación digital es esencial para mantener la competitividad, con empresas que invierten en tecnología experimentando un crecimiento 2.5x superior.`;

        const defaultScope = [
            'Atención personalizada durante todo el proyecto',
            'Soporte técnico post-entrega',
            'Garantía de satisfacción',
            'Actualizaciones y mejoras incluidas'
        ];

        const scope = scopeDetails && scopeDetails.length > 0 ? scopeDetails : defaultScope;

        return (
            <div ref={ref} className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                {/* Market Analysis Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                        Análisis de Mercado
                    </h2>
                    <div className="w-16 h-1 bg-primary mb-4"></div>

                    <p className="text-base leading-relaxed text-slate-700 mb-6">
                        {marketAnalysis || defaultAnalysis}
                    </p>

                    {/* Stats Cards - Compact */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <p className="text-2xl font-bold text-primary">85%</p>
                            </div>
                            <p className="text-xs text-slate-600">
                                Investigan online antes de comprar
                            </p>
                        </div>

                        <div className="p-3 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Users2 className="w-4 h-4 text-green-600" />
                                <p className="text-2xl font-bold text-green-600">4.5B</p>
                            </div>
                            <p className="text-xs text-slate-600">
                                Usuarios en redes sociales
                            </p>
                        </div>

                        <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 mb-1">
                                <BarChart3 className="w-4 h-4 text-orange-600" />
                                <p className="text-2xl font-bold text-orange-600">2.5x</p>
                            </div>
                            <p className="text-xs text-slate-600">
                                Mayor crecimiento digital
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scope Section */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                        Alcance del Servicio
                    </h2>
                    <div className="w-16 h-1 bg-primary mb-4"></div>

                    {projectDescription && (
                        <div className="mb-4 p-4 bg-slate-50 rounded-lg border-l-4 border-primary">
                            <p className="text-sm text-slate-700 leading-relaxed">{projectDescription}</p>
                        </div>
                    )}

                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        ¿Qué Incluye?
                    </h3>

                    <div className="grid grid-cols-1 gap-2">
                        {scope.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200"
                            >
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p className="text-sm text-slate-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer decoration */}
                <div className="mt-6 pt-6">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span>Alcance IT</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                    </div>
                </div>

            </div>
        );
    }
);

CombinedMarketScopePage.displayName = 'CombinedMarketScopePage';
