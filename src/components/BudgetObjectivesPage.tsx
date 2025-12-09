import { forwardRef } from 'react';
import { Target, TrendingUp, Users } from 'lucide-react';

import { DEFAULT_TEXTS } from '../utils/templates';

interface BudgetObjectivesPageProps {
    objectives?: string;
}

export const BudgetObjectivesPage = forwardRef<HTMLDivElement, BudgetObjectivesPageProps>(
    ({ objectives }, ref) => {

        const defaultObjectives = DEFAULT_TEXTS.objectives.long;

        return (
            <div ref={ref} className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Objetivos y Estrategia
                    </h2>
                    <div className="w-20 h-1 bg-primary"></div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Custom content or default */}
                    <div className="prose prose-slate max-w-none mb-12">
                        <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                            {objectives || defaultObjectives}
                        </p>
                    </div>

                    {/* Key Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Enfoque
                            </h3>
                            <p className="text-sm text-slate-600">
                                Soluciones personalizadas que se adaptan a sus necesidades específicas
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Crecimiento
                            </h3>
                            <p className="text-sm text-slate-600">
                                Estrategias escalables diseñadas para crecer con su negocio
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Colaboración
                            </h3>
                            <p className="text-sm text-slate-600">
                                Trabajo en equipo constante para asegurar el éxito del proyecto
                            </p>
                        </div>
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

BudgetObjectivesPage.displayName = 'BudgetObjectivesPage';
