import { LayoutDashboard, PlusCircle } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import logoWhite from '../assets/logo.png';

export function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-muted/20">

            {/* Header / Mobile Nav */}
            <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <img src={logoWhite} alt="Logo" className="h-8" />
                        <h1 className="text-xl font-bold tracking-tight">Alcance</h1>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                        >
                            <LayoutDashboard size={18} />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <Link
                            to="/new"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow transition-colors"
                        >
                            <PlusCircle size={18} />
                            <span className="hidden sm:inline">Nuevo</span>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 container py-6 md:py-10 px-4">
                <Outlet />
            </main>

        </div>
    );
}
