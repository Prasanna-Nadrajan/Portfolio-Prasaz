import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Cursor from './Cursor.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-main-bg text-main-text font-poppins relative overflow-hidden transition-colors duration-300 flex flex-col">
            {/* Space Background Layers - Visible mainly in Dark Mode */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="stars-sm absolute inset-0"></div>
                <div className="stars-md absolute inset-0"></div>
                <div className="stars-lg absolute inset-0"></div>

                {/* Asteroids - Visible mainly in Dark Mode (handled by CSS opacity/visibility if needed, or just blend in) */}
                <div className="asteroid w-8 h-8 top-10 left-10 animate-[float-asteroid_20s_linear_infinite] delay-0 hidden dark:block"></div>
                <div className="asteroid w-6 h-6 top-1/3 left-[-20px] animate-[float-asteroid_25s_linear_infinite] delay-[5s] hidden dark:block"></div>
                <div className="asteroid w-10 h-10 bottom-1/4 right-[-30px] animate-[float-asteroid_30s_linear_infinite_reverse] delay-[2s] hidden dark:block"></div>

                {/* Optional: Subtle nebula glow */}
                <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] bg-neon-blue/5 rounded-full blur-[100px] dark:opacity-100 opacity-0 transition-opacity duration-500"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[100px] dark:opacity-100 opacity-0 transition-opacity duration-500"></div>
            </div>

            <Cursor />

            <div className="fixed top-4 right-4 z-50 hidden md:block">
                <ThemeToggle />
            </div>

            <main className="container mx-auto px-4 py-4 pt-20 md:py-8 lg:px-4 max-w-[95%] relative z-10 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3 lg:col-span-3">
                        <Sidebar />
                    </div>

                    <div className="md:col-span-9 lg:col-span-9 relative">
                        <Navbar />
                        <div className="glass-card mt-4 md:mt-0 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-60px)] relative flex flex-col">
                            <div className="flex-grow">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="relative z-10">
                <Footer />
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Layout;