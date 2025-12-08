import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Interface for the API response
interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface APIResponse {
    total: {
        [year: string]: number;
        lastYear: number;
    };
    contributions: Array<{
        date: string;
        count: number;
        level: 0 | 1 | 2 | 3 | 4;
    }>;
}

const GitHubCalendar = () => {
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const username = 'Prasanna-Nadrajan'; // Replace with your actual GitHub username

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                // Using a public API proxy to fetch GitHub contribution data
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);

                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub data');
                }

                const data: APIResponse = await response.json();

                // The API returns all days. We need to ensure we have the last 365 days or similar.
                // This API returns 'contributions' as an array of days.
                setContributions(data.contributions);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching GitHub data:", err);
                setError("Could not load contributions.");
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    // Function to map contribution level to tailwind color classes
    const getColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-jet/50';       // 0 contributions
            case 1: return 'bg-[#0e4429]';    // Low
            case 2: return 'bg-[#006d32]';    // Medium
            case 3: return 'bg-[#26a641]';    // High
            case 4: return 'bg-[#39d353]';    // Very High
            default: return 'bg-jet/50';
        }
    };

    // Group days into weeks for the grid layout (column-major order)
    const getWeeks = () => {
        const weeks = [];
        // We want to show roughly the last year (52 weeks)
        // The API returns a flat array. We need to chunk it or arrange it.
        // Usually, GitHub graph starts on a Sunday.

        // Let's grab the last ~364 days to fill the grid nicely (52 weeks * 7 days)
        const lastYearData = contributions.slice(-364);

        for (let i = 0; i < lastYearData.length; i += 7) {
            weeks.push(lastYearData.slice(i, i + 7));
        }
        return weeks;
    };

    const weeks = getWeeks();

    return (
        <section className="github-calendar my-8">
            <h3 className="h3 service-title text-xl font-semibold mb-6 flex items-center gap-2">
                GitHub Contributions
                <span className="text-xs font-normal text-secondary-text ml-auto">Last Year</span>
            </h3>

            <div className="bg-border-gradient-onyx p-5 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 overflow-x-auto w-fit max-w-full mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-32 text-sm text-secondary-text">
                        Loading GitHub Activity...
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-32 text-sm text-red-400">
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="flex gap-1 min-w-fit">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((day, dayIndex) => (
                                        <motion.div
                                            key={day.date}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (weekIndex * 7 + dayIndex) * 0.0005 }} // Faster stagger
                                            className={`w-3 h-3 rounded-sm ${getColor(day.level)}`}
                                            title={`${day.count} contributions on ${day.date}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-secondary-text">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-jet/50" title="0 contributions"></div>
                                <div className="w-3 h-3 rounded-sm bg-[#0e4429]" title="1-2 contributions"></div>
                                <div className="w-3 h-3 rounded-sm bg-[#006d32]" title="3-5 contributions"></div>
                                <div className="w-3 h-3 rounded-sm bg-[#26a641]" title="6-9 contributions"></div>
                                <div className="w-3 h-3 rounded-sm bg-[#39d353]" title="10+ contributions"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default GitHubCalendar;