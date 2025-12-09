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
            <div ref={ref} className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 min-h-[297mm] flex flex-col items-center justify-center p-12 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center max-w-2xl">
                    {/* Logo */}
                    <img
                        src={appLogo}
                        alt="Alcance IT"
                        className="h-24 mx-auto mb-12 drop-shadow-xl"
                    />

                    {/* Title */}
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        PROPUESTA COMERCIAL
                    </h1>

                    <div className="w-24 h-2 bg-amber-400 mx-auto mb-10 rounded-full"></div>

                    {/* Subtitle */}
                    <h2 className="text-3xl font-bold text-slate-700 mb-12">
                        {title}
                    </h2>

                    {/* Client info */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-10 shadow-2xl shadow-amber-900/5 border border-amber-100">
                        <p className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-semibold">
                            Preparado para
                        </p>
                        <p className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                            {clientName}
                        </p>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200">
                            <p className="text-sm font-semibold text-amber-800">
                                {formatDate(createdAt)}
                            </p>
                        </div>
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
