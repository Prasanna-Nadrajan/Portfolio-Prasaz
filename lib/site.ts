import type { SpriteName } from "@/components/art/sprites";

export const site = {
  name: "Prasanna",
  tagline: "Portfolio of Prasanna Nadrajan R.: ML projects, skills, experience and how to reach me",
  // Set NEXT_PUBLIC_SITE_URL for a custom domain; Vercel fills in its own production URL otherwise.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://prasazx.tech"),
  author: "Prasanna Nadrajan R.",
  email: "prasannanadrajan.r@gmail.com",
  resume: "/Prasanna_Nadrajan_Resume.pdf",
  // Decorative only: no live server data is connected.
  gameVersion: "26.11",
};

export const nav: { label: string; href: string; icon: SpriteName; key: string }[] = [
  { label: "Home", href: "/", icon: "grass", key: "1" },
  { label: "Projects", href: "/projects", icon: "chest", key: "2" },
  { label: "Skills", href: "/skills", icon: "enchantedBook", key: "3" },
  { label: "About", href: "/about", icon: "player", key: "4" },
  { label: "Contact", href: "/contact", icon: "writableBook", key: "5" },
];

export const socials: { label: string; href: string; icon: SpriteName; lore: string }[] = [
  { label: "GitHub", href: "https://github.com/Prasanna-Nadrajan", icon: "writableBook", lore: "Code for the projects here." },
  { label: "LinkedIn", href: "https://linkedin.com/in/prasannanadrajan", icon: "sign", lore: "Work history and connections." },
  { label: "Medium", href: "https://medium.com/@prasaznat", icon: "book", lore: "ML and computer vision write-ups." },
  { label: "LeetCode", href: "https://leetcode.com/u/Prasanna_Nadrajan/", icon: "pickaxe", lore: "Daily problem-solving practice." },
];

export const profile = {
  username: "Prasaz",
  title: "Data Scientist & AI Systems Engineer",
  location: "Chennai, India",
  study: "B.Tech AI & Data Science",
  cgpa: "8.87 / 10",
  now: "AI Engineer Intern, Hyundai",
  languages: "English, Tamil, Japanese",
};

export type SkillGroup = { title: string; icon: SpriteName; skills: Skill[] };
export type Skill = {
  name: string;
  icon: SpriteName;
  /** 0 to 1 */
  value: number;
  level: number;
  /** Shown like an enchantment line in the tooltip. */
  enchant: string;
  lore: string;
};

const sk = (name: string, icon: SpriteName, value: number, enchant: string, lore: string): Skill => ({
  name, icon, value, level: Math.round(value * 40), enchant, lore,
});

// Bar values are self-assessed: adjust them to taste.
export const skillGroups: SkillGroup[] = [
  {
    title: "Machine Learning",
    icon: "diamond",
    skills: [
      sk("Deep Learning", "diamond", 0.85, "Sharpness V", "TensorFlow, Keras and PyTorch models."),
      sk("Classical ML", "emerald", 0.88, "Efficiency V", "Random Forest, gradient boosting, SVM."),
      sk("Time-series Forecasting", "clock", 0.82, "Protection IV", "Sequential models and calibration."),
      sk("Computer Vision", "spyglass", 0.78, "Looting III", "OpenCV, YOLO, satellite imagery."),
      sk("NLP", "enchantedBook", 0.6, "Fortune II", "Text modelling fundamentals."),
    ],
  },
  {
    title: "Data & BI",
    icon: "chest",
    skills: [
      sk("Python & Pandas", "emerald", 0.9, "Mending", "NumPy, SciPy, Matplotlib, Seaborn."),
      sk("SQL", "chest", 0.82, "Unbreaking III", "MySQL and PostgreSQL."),
      sk("Power BI & DAX", "redstone", 0.8, "Efficiency IV", "Dashboards and automated reports."),
      sk("Geospatial", "map", 0.72, "Silk Touch", "QGIS, ArcGIS, Google Earth Engine."),
    ],
  },
  {
    title: "Engineering",
    icon: "pickaxe",
    skills: [
      sk("FastAPI & Docker", "pearl", 0.75, "Feather Falling IV", "Containerised low-latency services."),
      sk("CI/CD & Git", "compass", 0.78, "Swift Sneak III", "Pipelines and Python AST checks."),
      sk("Java & Spring Boot", "brick", 0.7, "Protection III", "OOP, DSA and backend apps."),
      sk("React & TypeScript", "book", 0.65, "Aqua Affinity", "Front ends like StreamVerse."),
      sk("AWS", "feather", 0.65, "Respiration II", "Cloud and AI Practitioner certified."),
    ],
  },
];

export const timeline: { year: string; title: string; text: string; icon: SpriteName }[] = [
  { year: "2022", title: "Stone Age", text: "Finished Class 10 with 82.67% and started higher secondary at The Hindu Senior Secondary School.", icon: "pickaxe" },
  { year: "2024", title: "Getting an Upgrade", text: "Scored 89.60% in Class 12, began B.Tech in AI & Data Science at REC, and earned two AWS certifications and JLPT N5.", icon: "brick" },
  { year: "2025", title: "Diamonds!", text: "Started writing on Medium and took on data roles at ARQ REC, Evo Astra Ventures and the Indian Space Academy.", icon: "diamond" },
  { year: "2026", title: "Into the Nether", text: "Joined Hyundai Motor India as an AI Engineer Intern, working with vehicle telemetry.", icon: "netherrack" },
];

export const experience: { when: string; title: string; text: string; icon: SpriteName }[] = [
  { when: "Aug 2026 to now", title: "AI Engineer Intern, Hyundai Motor India", text: "Predictive models and scalable ML components for automotive telemetry analytics.", icon: "redstone" },
  { when: "Sep 2025 to now", title: "Data Analyst Associate, ARQ REC", text: "3 predictive models at 85%+ accuracy, 2 dashboards, and hackathons and workshops for 150+ peers.", icon: "emerald" },
  { when: "Dec 2025 to Jan 2026", title: "Data Science Intern, Evo Astra Ventures", text: "Predictive models and automated ETL pipelines to support product decisions.", icon: "chest" },
  { when: "Dec 2025 to now", title: "Geospatial Computer Vision Trainee, Indian Space Academy", text: "50+ satellite scenes over 500+ sq km, mapped with 95% land-use accuracy.", icon: "map" },
];
