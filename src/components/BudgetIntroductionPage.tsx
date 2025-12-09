import { forwardRef } from 'react';
import { DEFAULT_TEXTS } from '../utils/templates';

interface BudgetIntroductionPageProps {
    introduction?: string;
    clientName: string;
}

export const BudgetIntroductionPage = forwardRef<HTMLDivElement, BudgetIntroductionPageProps>(
    ({ introduction, clientName }, ref) => {

        const defaultIntroduction = DEFAULT_TEXTS.introduction.long(clientName);

        return (
            <div ref={ref} className="pdf-page bg-white p-12 mx-auto max-w-[21cm] min-h-[29.7cm] text-slate-800 font-sans flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Introducción
                    </h2>
                    <div className="w-20 h-1 bg-primary"></div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                            {introduction || defaultIntroduction}
                        </p>
                    </div>

                    {/* Decorative Quote */}
                    <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border-l-4 border-primary">
                        <p className="text-xl italic text-slate-700 text-center">
                            "La tecnología es mejor cuando acerca a las personas"
                        </p>
                        <p className="text-sm text-slate-500 text-center mt-2">
                            — Matt Mullenweg
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

BudgetIntroductionPage.displayName = 'BudgetIntroductionPage';
