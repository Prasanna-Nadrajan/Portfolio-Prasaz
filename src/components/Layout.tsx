import { useState, useEffect, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Cursor from './Cursor.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CelebrationModal from './CelebrationModal';
import ParticleBackground from './ParticleBackground';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showCelebration, setShowCelebration] = useState(false);
    const [viewCount, setViewCount] = useState(0);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const namespace = 'portfolio-prasanna-nadrajan';
                const key = 'visits';
                // Using 'up' endpoint to increment and get count
                const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setViewCount(data.count);
            } catch (error) {
                console.error("Error fetching visitor count:", error);
                // Fallback or leave at 0, or read from localStorage if you wanted to implement that
                setViewCount(400); // Default fallback matching previous hardcoded value
            }
        };

        fetchCount();
        // logic to prevent double counting in strict mode could be added, 
        // but for this simple implementation just running it on mount is standard. 
        // Note: In React 18 Strict Mode dev, this might run twice. 
    }, []);

    return (
        <div className="min-h-screen bg-main-bg text-main-text font-poppins relative overflow-x-hidden transition-colors duration-300 flex flex-col">
            <CelebrationModal isOpen={showCelebration} onClose={() => setShowCelebration(false)} viewCount={viewCount} />

            {/* Interactive Particle Background */}
            <ParticleBackground />

            <Cursor />

            <div className="fixed top-6 right-6 z-50 hidden md:block">
                <ThemeToggle />
            </div>

            <main className="container mx-auto px-4 py-6 pt-20 md:px-16 md:pt-28 md:pb-12 relative z-10 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Sidebar Column: Hidden in DOM if isSidebarOpen is false on Desktop */}
                    <div className={`md:col-span-3 lg:col-span-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                        <Sidebar onShowUpdate={() => setShowCelebration(true)} viewCount={viewCount} />
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
                <Footer viewCount={viewCount} />
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Layout;