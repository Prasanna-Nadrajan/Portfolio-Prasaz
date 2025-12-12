import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Cursor from './Cursor.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CelebrationModal from './CelebrationModal';
import AchievementToast from './AchievementToast';
import SystemHUD from './SystemHUD';

import CommandPalette from './CommandPalette';
import KonamiCode from './KonamiCode';
import ParticleBackground from './ParticleBackground';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showCelebration, setShowCelebration] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-main-bg text-main-text font-poppins relative overflow-x-hidden transition-colors duration-300 flex flex-col">
            <SystemHUD />
            <CommandPalette />
            <KonamiCode />
            <CelebrationModal isOpen={showCelebration} onClose={() => setShowCelebration(false)} />
            <AchievementToast />

            {/* Interactive Particle Background */}
            <ParticleBackground />

            <Cursor />

            <div className="fixed top-18 right-2 z-50 hidden md:block">
                <ThemeToggle />
            </div>

            <main className="container mx-auto px-4 py-4 pt-20 md:py-8 lg:px-4 max-w-[95%] relative z-10 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Sidebar Column: Hidden in DOM if isSidebarOpen is false on Desktop */}
                    <div className={`md:col-span-3 lg:col-span-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                        <Sidebar onShowUpdate={() => setShowCelebration(true)} />
                    </div>

                    {/* Main Content Column: Expands to 12 if sidebar closed */}
                    <div className={`relative ${isSidebarOpen ? 'md:col-span-9 lg:col-span-9' : 'md:col-span-12 lg:col-span-12'}`}>
                        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} onShowUpdate={() => setShowCelebration(true)} />
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