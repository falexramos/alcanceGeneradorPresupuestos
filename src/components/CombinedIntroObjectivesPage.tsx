import { forwardRef } from 'react';
import { Target, TrendingUp, Users } from 'lucide-react';

interface CombinedIntroObjectivesPageProps {
    introduction?: string;
    objectives?: string;
    clientName: string;
}

export const CombinedIntroObjectivesPage = forwardRef<HTMLDivElement, CombinedIntroObjectivesPageProps>(
    ({ introduction, objectives, clientName }, ref) => {

        const defaultIntroduction = `Nos complace presentarle esta propuesta comercial diseñada específicamente para ${clientName}. En Alcance IT, nos especializamos en ofrecer soluciones tecnológicas innovadoras que impulsan el crecimiento y la transformación digital de nuestros clientes.`;

        const defaultObjectives = `Nuestro objetivo es proporcionar una solución integral que permita aumentar la visibilidad digital, optimizar procesos operativos y generar un retorno de inversión medible y sostenible.`;

        return (
            <div ref={ref} className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 min-h-[29.7cm] mx-auto max-w-[21cm] relative overflow-hidden p-12 text-slate-800 font-sans flex flex-col">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col flex-1">


                    {/* Introducción Section */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            Introducción
                        </h2>
                        <div className="w-16 h-1 bg-amber-400 mb-4"></div>
                        <p className="text-base leading-relaxed text-slate-700">
                            {introduction || defaultIntroduction}
                        </p>
                    </div>

                    {/* Objetivos y Estrategia Section */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            Objetivos y Estrategia
                        </h2>
                        <div className="w-16 h-1 bg-amber-400 mb-6"></div>

                        <p className="text-base leading-relaxed text-slate-700 mb-8">
                            {objectives || defaultObjectives}
                        </p>

                        {/* Key Pillars - Compact Version */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-3 mx-auto">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 mb-1 text-center">
                                    Enfoque
                                </h3>
                                <p className="text-xs text-slate-600 text-center">
                                    Soluciones personalizadas
                                </p>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg border border-green-200">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-3 mx-auto">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 mb-1 text-center">
                                    Crecimiento
                                </h3>
                                <p className="text-xs text-slate-600 text-center">
                                    Estrategias escalables
                                </p>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-200">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mb-3 mx-auto">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 mb-1 text-center">
                                    Colaboración
                                </h3>
                                <p className="text-xs text-slate-600 text-center">
                                    Trabajo en equipo
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer decoration */}
                    <div className="mt-8 pt-6">
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex-1 h-px bg-slate-200"></div>
                            <span>Alcance IT</span>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
);

CombinedIntroObjectivesPage.displayName = 'CombinedIntroObjectivesPage';
