import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Cursor from './Cursor.tsx';
import ThemeToggle from './ThemeToggle.tsx';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-main-bg text-main-text font-poppins relative overflow-hidden transition-colors duration-300">
            {/* Space Background Layers - Visible mainly in Dark Mode */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="stars-sm absolute inset-0"></div>
                <div className="stars-md absolute inset-0"></div>
                <div className="stars-lg absolute inset-0"></div>
                {/* Optional: Subtle nebula glow */}
                <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] bg-neon-blue/5 rounded-full blur-[100px] dark:opacity-100 opacity-0 transition-opacity duration-500"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[100px] dark:opacity-100 opacity-0 transition-opacity duration-500"></div>
            </div>

            <Cursor />
            
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <main className="container mx-auto px-4 py-4 md:py-8 lg:px-8 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3 lg:col-span-3">
                        <Sidebar />
                    </div>

                    <div className="md:col-span-9 lg:col-span-9 relative">
                        <Navbar />
                        <div className="glass-card mt-4 md:mt-0 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-60px)] relative">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;