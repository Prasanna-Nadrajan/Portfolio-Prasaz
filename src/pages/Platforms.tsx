import GitHubCalendar from '../components/GitHubCalendar';
import LeetCodeCalendar from '../components/LeetCodeCalendar';

const platforms = [
    {
        title: "HackerRank",
        description: "Solved 500+ problems. 5 Star in Python.",
        link: "https://www.hackerrank.com/profile/prasannanadraj07",
        icon: "/assets/images/hackerrank.png" // Placeholder path
    },
    {
        title: "LeetCode",
        description: "Consistent problem solver. Top 10% in contests.",
        link: "https://leetcode.com/u/Prasanna_Nadrajan",
        icon: "/assets/images/contact_me/code.png"
    },
    {
        title: "GitHub",
        description: "Active contributor to open source projects.",
        link: "https://github.com/Prasanna-Nadrajan",
        icon: "/assets/images/contact_me/github.png"
    },
    {
        title: "Kaggle",
        description: "Participated in various Data Science competitions.",
        link: "https://www.kaggle.com/prasannanadrajan",
        icon: "/assets/images/contact_me/k.png"
    }
];

const Platforms = () => {
    return (
        <article className="platforms active animate-fade-in" data-page="platforms">
            <header>
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Platforms</h2>
            </header>

            {/* Added GitHub Calendar at the top of Platforms page */}
            <GitHubCalendar />
            <LeetCodeCalendar />

            <section className="platforms-list">
                <h3 className="h3 service-title text-xl font-semibold mb-6">Coding Profiles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {platforms.map((platform, index) => (
                        <a 
                            key={index} 
                            href={platform.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="platform-item bg-border-gradient-onyx p-6 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 hover:scale-[1.02] transition-transform duration-300 flex items-center gap-4"
                        >
                            <div className="platform-icon bg-onyx p-3 rounded-xl shadow-neon shrink-0">
                                {/* Using a placeholder generic icon or image */}
                                <img 
                                    src={platform.icon} 
                                    alt={platform.title} 
                                    className="w-10 h-10 object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                    }} 
                                />
                                <div className="hidden w-10 h-10 bg-jet rounded-lg flex items-center justify-center text-xs text-secondary-text">IMG</div>
                            </div>
                            
                            <div className="platform-content">
                                <h3 className="text-main-text text-lg font-medium mb-1">{platform.title}</h3>
                                <p className="text-secondary-text text-sm">{platform.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </article>
    );
};

export default Platforms;