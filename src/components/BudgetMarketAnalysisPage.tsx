import { forwardRef } from 'react';
import { BarChart3, TrendingUp, Users2 } from 'lucide-react';

interface BudgetMarketAnalysisPageProps {
    marketAnalysis?: string;
}

export const BudgetMarketAnalysisPage = forwardRef<HTMLDivElement, BudgetMarketAnalysisPageProps>(
    ({ marketAnalysis }, ref) => {

        const defaultAnalysis = `El mercado digital actual presenta oportunidades significativas para empresas que buscan expandir su presencia online y optimizar sus operaciones.

Tendencias Clave:

• Crecimiento sostenido del comercio electrónico y servicios digitales
• Mayor demanda de experiencias de usuario personalizadas
• Importancia crítica de la presencia en redes sociales
• Necesidad de soluciones tecnológicas escalables y seguras

Oportunidades Identificadas:

La transformación digital ya no es opcional sino esencial para mantener la competitividad. Las empresas que invierten en tecnología y presencia digital experimentan un crecimiento promedio 2.5x superior a aquellas que no lo hacen.

Ventaja Competitiva:

Implementar las soluciones propuestas permitirá posicionarse estratégicamente en el mercado, diferenciarse de la competencia y capturar nuevas oportunidades de negocio.`;

        return (
            <div ref={ref} className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Análisis de Mercado
                    </h2>
                    <div className="w-20 h-1 bg-primary"></div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Main Analysis */}
                    <div className="prose prose-slate max-w-none mb-12">
                        <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                            {marketAnalysis || defaultAnalysis}
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary">85%</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600">
                                De los consumidores investigan online antes de comprar
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <Users2 className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-green-600">4.5B</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600">
                                Usuarios activos en redes sociales globalmente
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-orange-600">2.5x</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600">
                                Mayor crecimiento con transformación digital
                            </p>
                        </div>
                    </div>

                    {/* Insight Box */}
                    <div className="p-8 bg-slate-50 rounded-xl border-l-4 border-primary">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">
                            💡 Insight Clave
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                            Las empresas que adoptan soluciones digitales integrales no solo mejoran su eficiencia operativa,
                            sino que también crean experiencias memorables para sus clientes, generando lealtad y
                            recomendaciones orgánicas.
                        </p>
                    </div>
                </div>

                {/* Footer decoration */}
                <div className="mt-auto pt-8">
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

BudgetMarketAnalysisPage.displayName = 'BudgetMarketAnalysisPage';
