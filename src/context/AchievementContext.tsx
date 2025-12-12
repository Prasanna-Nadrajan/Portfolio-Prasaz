import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: number;
}

interface AchievementContextType {
    achievements: Record<string, boolean>;
    unlockAchievement: (id: string) => void;
    recentAchievement: Achievement | null;
    clearRecentAchievement: () => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const ACHIEVEMENTS_DATA: customAchievement[] = [
    { id: 'explorer', title: 'Explorer', description: 'Visited 4+ unique pages', icon: '🧭' },
    { id: 'hacker', title: 'Hacker', description: 'Activated God Mode', icon: '👾' },
    { id: 'recruiter', title: 'Recruiter', description: 'Downloaded Resume', icon: '📄' },
];

type customAchievement = {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export const AchievementProvider = ({ children }: { children: ReactNode }) => {
    const [achievements, setAchievements] = useState<Record<string, boolean>>({});
    const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
    const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());
    const location = useLocation();

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('portfolio_achievements');
        if (stored) {
            setAchievements(JSON.parse(stored));
        }

        const storedVisits = localStorage.getItem('portfolio_visited_pages');
        if (storedVisits) {
            setVisitedPages(new Set(JSON.parse(storedVisits)));
        }
    }, []);

    // Track page visits for "Explorer"
    useEffect(() => {
        const path = location.pathname;
        if (!visitedPages.has(path)) {
            const newVisited = new Set(visitedPages);
            newVisited.add(path);
            setVisitedPages(newVisited);
            localStorage.setItem('portfolio_visited_pages', JSON.stringify([...newVisited]));

            if (newVisited.size >= 4) {
                unlockAchievement('explorer');
            }
        }
    }, [location.pathname, visitedPages]);

    const unlockAchievement = (id: string) => {
        if (!achievements[id]) {
            const achievementDef = ACHIEVEMENTS_DATA.find(a => a.id === id);
            if (achievementDef) {
                const newAchievements = { ...achievements, [id]: true };
                setAchievements(newAchievements);
                localStorage.setItem('portfolio_achievements', JSON.stringify(newAchievements));

                setRecentAchievement({ ...achievementDef, unlockedAt: Date.now() });

                // Play a subtle sound? (Optional, maybe later)
            }
        }
    };

    const clearRecentAchievement = () => {
        setRecentAchievement(null);
    };

    return (
        <AchievementContext.Provider value={{ achievements, unlockAchievement, recentAchievement, clearRecentAchievement }}>
            {children}
        </AchievementContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
};
