import { IoCodeSlash, IoGitCommitOutline, IoLaptopOutline } from 'react-icons/io5';

const LiveStatus = () => {
    return (
        <div className="w-full bg-container-bg border border-border-color rounded-2xl p-5 shadow-neon mt-6 relative overflow-hidden group">

            {/* Header with Pulse */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-light-gray-70 text-xs font-bold uppercase tracking-wider">Live Status</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-neon-blue text-[10px] font-mono">ONLINE</span>
                </div>
            </div>

            {/* Status Items */}
            <div className="space-y-4">
                {/* Editor */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-onyx flex items-center justify-center text-neon-blue">
                        <IoLaptopOutline />
                    </div>
                    <div>
                        <p className="text-[10px] text-light-gray-70 uppercase">Editor</p>
                        <p className="text-main-text text-sm font-medium">VS Code</p>
                    </div>
                </div>

                {/* Language */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-onyx flex items-center justify-center text-yellow-500">
                        <IoCodeSlash />
                    </div>
                    <div>
                        <p className="text-[10px] text-light-gray-70 uppercase">Working on</p>
                        <p className="text-main-text text-sm font-medium">Portfolio-v2</p>
                    </div>
                </div>

                {/* Commit */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-onyx flex items-center justify-center text-purple-400">
                        <IoGitCommitOutline />
                    </div>
                    <div>
                        <p className="text-[10px] text-light-gray-70 uppercase">Last Commit</p>
                        <p className="text-main-text text-xs font-medium truncate w-[140px]" title="Refactoring Sidebar Components">Refactoring Sidebar...</p>
                    </div>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-neon-blue/5 rounded-full blur-2xl pointer-events-none group-hover:bg-neon-blue/10 transition-colors"></div>
        </div>
    );
};

export default LiveStatus;
