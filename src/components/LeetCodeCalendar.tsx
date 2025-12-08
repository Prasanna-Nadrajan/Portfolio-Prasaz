import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Interface for the API response
interface LeetCodeData {
    status: string;
    message: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
    submissionCalendar: { [timestamp: string]: number };
}

const LeetCodeCalendar = () => {
    const [calendarData, setCalendarData] = useState<{ date: string; count: number }[]>([]);
    const [stats, setStats] = useState<{ total: number; easy: number; medium: number; hard: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Replace with your actual LeetCode username if different
    const username = 'Prasanna_Nadrajan';

    useEffect(() => {
        const fetchLeetCodeData = async () => {
            try {
                // Using a public proxy API to fetch LeetCode stats
                // Note: This API might have cold start times (takes a few seconds to wake up)
                const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch LeetCode data');
                }

                const data: LeetCodeData = await response.json();

                if (data.status === 'error') {
                    throw new Error(data.message);
                }

                setStats({
                    total: data.totalSolved,
                    easy: data.easySolved,
                    medium: data.mediumSolved,
                    hard: data.hardSolved
                });

                // Process submission calendar (timestamps -> array of days)
                // The API returns submissionCalendar as a JSON object where keys are unix timestamps
                const rawCalendar = data.submissionCalendar;
                const processedData: { [date: string]: number } = {};

                // Convert timestamps to YYYY-MM-DD
                Object.keys(rawCalendar).forEach(timestamp => {
                    const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
                    processedData[date] = rawCalendar[timestamp];
                });

                // Generate last 364 days to fill the grid
                const today = new Date();
                const fullYearData = [];
                for (let i = 364; i >= 0; i--) {
                    const d = new Date(today);
                    d.setDate(d.getDate() - i);
                    const dateStr = d.toISOString().split('T')[0];
                    fullYearData.push({
                        date: dateStr,
                        count: processedData[dateStr] || 0
                    });
                }

                setCalendarData(fullYearData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching LeetCode data:", err);
                setError("Could not load LeetCode activity. (User might not exist or API busy)");
                setLoading(false);
            }
        };

        fetchLeetCodeData();
    }, []);

    // LeetCode Orange Colors
    const getColor = (count: number) => {
        if (count === 0) return 'bg-jet/50';
        if (count <= 2) return 'bg-[#faca15]'; // Yellow-400
        if (count <= 4) return 'bg-[#eab308]'; // Yellow-500
        return 'bg-[#ca8a04]'; // Yellow-600 (Darker Orange/Gold)
    };

    // Group into weeks for grid
    const getWeeks = () => {
        const weeks = [];
        for (let i = 0; i < calendarData.length; i += 7) {
            weeks.push(calendarData.slice(i, i + 7));
        }
        return weeks;
    };

    const weeks = getWeeks();

    return (
        <section className="leetcode-calendar my-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="h3 service-title text-xl font-semibold flex items-center gap-2">
                    LeetCode Activity
                </h3>
                {stats && (
                    <div className="hidden md:flex gap-4 text-xs font-medium">
                        <span className="text-secondary-text">Total: <span className="text-main-text">{stats.total}</span></span>
                        <span className="text-teal-400">Easy: {stats.easy}</span>
                        <span className="text-yellow-400">Med: {stats.medium}</span>
                        <span className="text-red-400">Hard: {stats.hard}</span>
                    </div>
                )}
            </div>

            <div className="bg-border-gradient-onyx p-5 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 overflow-x-auto w-fit max-w-full mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-32 text-sm text-secondary-text">
                        Loading LeetCode Stats...
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-32 text-sm text-red-400 text-center px-4">
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
                                            transition={{ delay: (weekIndex * 7 + dayIndex) * 0.0005 }}
                                            className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
                                            title={`${day.count} submissions on ${day.date}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-secondary-text">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-jet/50"></div>
                                <div className="w-3 h-3 rounded-sm bg-[#faca15]"></div>
                                <div className="w-3 h-3 rounded-sm bg-[#eab308]"></div>
                                <div className="w-3 h-3 rounded-sm bg-[#ca8a04]"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default LeetCodeCalendar;