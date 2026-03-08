import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CalendarDay {
  date: string;
  count: number;
}

interface Stats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

// ─── Hardcoded fallback so the UI is never broken ───────────────────────────
const FALLBACK_STATS: Stats = {
  total: 149,
  easy: 80,
  medium: 58,
  hard: 11,
};

const USERNAME = "Prasanna_Nadrajan";

/** Build a full-year skeleton so the grid is always 52 cols × 7 rows */
const buildYearGrid = (
  submissionMap: Record<string, number> = {},
): CalendarDay[] => {
  const today = new Date();
  const days: CalendarDay[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({ date: dateStr, count: submissionMap[dateStr] ?? 0 });
  }
  return days;
};

/** Try multiple public proxy APIs in order */
const fetchWithFallbacks = async (
  username: string,
): Promise<{ stats: Stats; calMap: Record<string, number> }> => {
  // ── Attempt 1 : alfa-leetcode-api (most reliable) ──────────────────────
  try {
    const [profileRes, calRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
        signal: AbortSignal.timeout(8000),
      }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, {
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    if (profileRes.ok && calRes.ok) {
      const profile = await profileRes.json();
      const calData = await calRes.json();

      const stats: Stats = {
        total: profile.totalSolved ?? 0,
        easy: profile.easySolved ?? 0,
        medium: profile.mediumSolved ?? 0,
        hard: profile.hardSolved ?? 0,
      };

      // submissionCalendar can be a JSON string or an object
      let rawCal: Record<string, number> = {};
      const raw = calData.submissionCalendar ?? calData.calendar ?? "{}";
      try {
        rawCal = typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        /* ignore parse error */
      }

      // Keys may be unix timestamps → convert to YYYY-MM-DD
      const calMap: Record<string, number> = {};
      for (const [key, val] of Object.entries(rawCal)) {
        const ts = parseInt(key, 10);
        const dateStr = isNaN(ts)
          ? key // already a date string
          : new Date(ts * 1000).toISOString().split("T")[0];
        calMap[dateStr] = (calMap[dateStr] ?? 0) + (val as number);
      }

      return { stats, calMap };
    }
  } catch {
    /* fall through */
  }

  // ── Attempt 2 : leetcode-stats-api.herokuapp.com ───────────────────────
  try {
    const res = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (res.ok) {
      const data = await res.json();
      if (data.status !== "error") {
        const stats: Stats = {
          total: data.totalSolved ?? 0,
          easy: data.easySolved ?? 0,
          medium: data.mediumSolved ?? 0,
          hard: data.hardSolved ?? 0,
        };
        const rawCal: Record<string, number> = data.submissionCalendar ?? {};
        const calMap: Record<string, number> = {};
        for (const [key, val] of Object.entries(rawCal)) {
          const ts = parseInt(key, 10);
          const dateStr = isNaN(ts)
            ? key
            : new Date(ts * 1000).toISOString().split("T")[0];
          calMap[dateStr] = (calMap[dateStr] ?? 0) + (val as number);
        }
        return { stats, calMap };
      }
    }
  } catch {
    /* fall through */
  }

  // ── All APIs failed → return hardcoded stats, empty calendar ───────────
  throw new Error("All APIs failed");
};

// ─────────────────────────────────────────────────────────────────────────────

const LeetCodeCalendar = () => {
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const { stats: s, calMap } = await fetchWithFallbacks(USERNAME);
        if (!cancelled) {
          setStats(s);
          setCalendarData(buildYearGrid(calMap));
        }
      } catch {
        if (!cancelled) {
          // Graceful degradation — show known stats, empty grid
          setStats(FALLBACK_STATS);
          setCalendarData(buildYearGrid());
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return "bg-jet/50";
    if (count <= 2) return "bg-[#faca15]";
    if (count <= 4) return "bg-[#eab308]";
    return "bg-[#ca8a04]";
  };

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  return (
    <section className="leetcode-calendar my-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h3 className="h3 service-title text-xl font-semibold flex items-center gap-2">
          LeetCode Activity
          {usingFallback && (
            <span className="text-[10px] font-mono text-yellow-400 border border-yellow-400/30 bg-yellow-400/10 px-2 py-0.5 rounded-full">
              cached
            </span>
          )}
        </h3>

        {stats && (
          <div className="flex gap-4 text-xs font-medium flex-wrap">
            <span className="text-secondary-text">
              Total:{" "}
              <span className="text-main-text font-bold">{stats.total}</span>
            </span>
            <span className="text-teal-400">
              Easy: <span className="font-bold">{stats.easy}</span>
            </span>
            <span className="text-yellow-400">
              Med: <span className="font-bold">{stats.medium}</span>
            </span>
            <span className="text-red-400">
              Hard: <span className="font-bold">{stats.hard}</span>
            </span>
          </div>
        )}
      </div>

      <div className="bg-border-gradient-onyx p-5 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 overflow-x-auto w-fit max-w-full mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-32 gap-3">
            <div className="w-6 h-6 border-2 border-jet border-t-yellow-400 rounded-full animate-spin" />
            <span className="text-sm text-secondary-text animate-pulse">
              Loading LeetCode stats…
            </span>
          </div>
        ) : (
          <>
            <div className="flex gap-1 min-w-fit">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (wi * 7 + di) * 0.0005 }}
                      className={`w-3 h-3 rounded-sm ${getColor(day.count)} hover:ring-1 hover:ring-yellow-400/50 transition-all`}
                      title={`${day.count} submission${day.count !== 1 ? "s" : ""} on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-secondary-text">
              <span>Less</span>
              <div className="flex gap-1">
                <div
                  className="w-3 h-3 rounded-sm bg-jet/50"
                  title="0 submissions"
                />
                <div
                  className="w-3 h-3 rounded-sm bg-[#faca15]"
                  title="1–2 submissions"
                />
                <div
                  className="w-3 h-3 rounded-sm bg-[#eab308]"
                  title="3–4 submissions"
                />
                <div
                  className="w-3 h-3 rounded-sm bg-[#ca8a04]"
                  title="5+ submissions"
                />
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
