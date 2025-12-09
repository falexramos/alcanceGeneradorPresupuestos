import { forwardRef } from 'react';
import appLogo from '../assets/logo.png';

interface BudgetCoverPageProps {
    title: string;
    clientName: string;
    createdAt: number;
}

export const BudgetCoverPage = forwardRef<HTMLDivElement, BudgetCoverPageProps>(
    ({ title, clientName, createdAt }, ref) => {
        const formatDate = (timestamp: number) => {
            return new Date(timestamp).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        return (
            <div ref={ref} className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 min-h-[297mm] flex flex-col items-center justify-center p-12 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center max-w-2xl">
                    {/* Logo */}
                    <img
                        src={appLogo}
                        alt="Alcance IT"
                        className="h-24 mx-auto mb-12 drop-shadow-lg"
                    />

                    {/* Title */}
                    <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        PROPUESTA COMERCIAL
                    </h1>

                    <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>

                    {/* Subtitle */}
                    <h2 className="text-3xl font-semibold text-slate-700 mb-12">
                        {title}
                    </h2>

                    {/* Client info */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-100">
                        <p className="text-sm uppercase tracking-widest text-slate-500 mb-2">
                            Preparado para
                        </p>
                        <p className="text-2xl font-bold text-primary mb-6">
                            {clientName}
                        </p>
                        <p className="text-sm text-slate-600">
                            {formatDate(createdAt)}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-slate-400 text-sm">
                        <p className="font-semibold">Alcance IT</p>
                        <p>Soluciones Tecnológicas</p>
                        <p className="mt-2">https://alcance-it.es</p>
                    </div>
                </div>
            </div>
        );
    }
);

BudgetCoverPage.displayName = 'BudgetCoverPage';
