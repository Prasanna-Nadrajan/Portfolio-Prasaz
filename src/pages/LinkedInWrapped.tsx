import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import LinkedInUnwrapped from '../components/LinkedInUnwrapped';
import SEO from '../components/SEO';
import Cursor from '../components/Cursor';
import { useNavigate } from 'react-router-dom';

const LinkedInWrapped = () => {
    const navigate = useNavigate();

    const handleShare = () => {
        // Note: window.location.href might be localhost in dev, but works in prod.
        // For offsite share, LinkedIn requires a public URL. 
        // For feed share with text, we can use the text param.

        window.open(`https://www.linkedin.com/posts/prasannanadrajan_my-wrapped-up-2025-activity-7412189080320610304-hm_A?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE0J_eAB7yG03MXXrYG4SgL18fkJkQAfEVs`);
    };

    return (
        <div className="relative min-h-screen bg-slate-50 cursor-none" style={{ '--cursor-color': '#000000' } as React.CSSProperties}>
            <SEO
                title="LinkedIn Wrapped 2025"
                description="My LinkedIn Year in Review: 254 Posts, 2890 Reactions, and 1 Technical Novel written."
            />
            <Cursor />

            {/* Navigation Bar Override/Overlay */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <button
                    onClick={() => navigate('/')}
                    className="text-slate-600 hover:text-[#0077B5] font-semibold flex items-center gap-2 transition-colors text-sm md:text-base"
                >
                    ← Back to Portfolio
                </button>

                <button
                    onClick={handleShare}
                    className="bg-[#0077B5] hover:bg-[#005582] text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm md:text-base transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    <FaLinkedin className="text-lg" />
                    See Post on LinkedIn
                </button>
            </header>

            {/* Content Padding for Fixed Header */}
            <div className="pt-20 pb-10">
                <LinkedInUnwrapped />
            </div>

            {/* Footer / Credits */}
            <footer className="py-8 text-center text-slate-400 text-sm">
                <p>LinkedIn Wrapped 2025 • Designed with React & Framer Motion</p>
            </footer>
        </div>
    );
};

export default LinkedInWrapped;
