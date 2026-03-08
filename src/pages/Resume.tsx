import { IoDownloadOutline, IoOpenOutline } from "react-icons/io5";
import SEO from "../components/SEO";

const Resume = () => {
  return (
    <article className="resume active animate-fade-in" data-page="resume">
      <SEO
        title="Resume"
        description="View and download my professional resume."
      />

      <header className="flex justify-between items-center mb-6">
        <h2 className="h2 article-title text-2xl font-semibold border-b-2 border-neon-blue w-max pb-1">
          Resume
        </h2>
        <a
          href="/assets/Prasanna_Nadrajan_Resume.pdf"
          download="Prasanna_Nadrajan_Resume.pdf"
          className="flex items-center gap-2 bg-border-gradient-onyx px-4 py-2 rounded-lg text-neon-blue hover:text-white transition-colors shadow-neon"
        >
          <IoDownloadOutline />
          <span className="hidden md:inline">Download CV</span>
        </a>
      </header>

      <div className="resume-content bg-white text-black p-6 md:p-10 rounded-xl shadow-2xl max-w-4xl mx-auto overflow-hidden print:shadow-none">
        {/* ── HEADER ── */}
        <div className="border-b-2 border-gray-800 pb-5 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-1">
                Prasanna Nadrajan R
              </h1>
              <p className="text-sm font-medium text-gray-600">
                B.Tech – Artificial Intelligence and Data Science
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                Rajalakshmi Engineering College, Chennai
              </p>
            </div>
            <div className="text-sm text-gray-700 space-y-1 md:text-right shrink-0">
              <p>+91-8667687297</p>
              <a
                href="mailto:prasannanadrajan.r@gmail.com"
                className="block hover:underline hover:text-blue-600"
              >
                prasannanadrajan.r@gmail.com
              </a>
              <div className="flex gap-3 md:justify-end flex-wrap">
                <a
                  href="https://prasazx.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-600 flex items-center gap-1"
                >
                  Portfolio <IoOpenOutline className="text-xs" />
                </a>
                <a
                  href="https://github.com/Prasanna-Nadrajan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-600 flex items-center gap-1"
                >
                  GitHub <IoOpenOutline className="text-xs" />
                </a>
                <a
                  href="https://linkedin.com/in/prasanna-nadrajan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-600 flex items-center gap-1"
                >
                  LinkedIn <IoOpenOutline className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROFESSIONAL SUMMARY ── */}
        <section className="mb-6">
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Aspiring AI and Data Science professional with hands-on experience
            in Machine Learning, Computer Vision, and Data Analytics. Proficient
            in Python, SQL, and cloud technologies with a proven track record of
            building impactful projects. Strong problem-solving skills with 100+
            coding challenges completed and active participation in hackathons
            and technical workshops.
          </p>
        </section>

        {/* ── EDUCATION ── */}
        <section className="mb-6">
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">
            Education
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-1.5 font-bold">Degree</th>
                  <th className="py-1.5 font-bold">Institute / Board</th>
                  <th className="py-1.5 font-bold">CGPA / %</th>
                  <th className="py-1.5 font-bold text-right">Year</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    degree: "Bachelor of Technology",
                    institute: "Rajalakshmi Engineering College, Chennai",
                    score: "8.87 / 10 (Current)",
                    year: "2024 – Present",
                  },
                  {
                    degree: "Senior Secondary",
                    institute: "The Hindu Senior Secondary School",
                    score: "89.60%",
                    year: "2024",
                  },
                  {
                    degree: "Secondary",
                    institute: "The Hindu Senior Secondary School",
                    score: "82.67%",
                    year: "2022",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-1.5">{row.degree}</td>
                    <td className="py-1.5">{row.institute}</td>
                    <td className="py-1.5">{row.score}</td>
                    <td className="py-1.5 text-right whitespace-nowrap">
                      {row.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── WORK EXPERIENCE ── */}
        <section className="mb-6">
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-4">
            Work Experience
          </h3>
          {[
            {
              org: "Evo Astra Ventures Private Limited",
              role: "Data Science Intern",
              location: "Remote",
              period: "Dec 2025 – Jan 2026",
              points: [
                "Developed and implemented data science solutions to drive business insights and decision-making.",
                "Analyzed large datasets and built machine learning models for predictive analytics.",
                "Collaborated with cross-functional teams to deliver data-driven recommendations.",
              ],
            },
            {
              org: "Indian Space Academy",
              role: "Intern Trainee",
              location: "Remote",
              period: "Dec 2025 – Present",
              points: [
                "Gained hands-on experience in Remote Sensing and GIS technologies, analyzing 50+ satellite images for spatial data analysis.",
                "Processed and interpreted geospatial datasets covering 500+ sq km of terrain for environmental studies.",
                "Applied GIS tools including QGIS and ArcGIS to map and interpret spatial patterns with 95% accuracy.",
              ],
            },
            {
              org: "Analyse Research Quant (ARQ)",
              role: "Data Analyst Associate",
              location: "Chennai, Tamil Nadu",
              period: "Sep 2025 – Present",
              points: [
                "Led hackathons with 50+ participants, applying Python, R, and ML to solve real-world data problems.",
                "Built 3 predictive models achieving 85%+ accuracy and 2 interactive dashboards for data-driven decision making.",
                "Organized technical workshops for 100+ peers, simplifying complex data science and ML concepts.",
              ],
            },
          ].map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-baseline flex-wrap gap-1 mb-0.5">
                <h4 className="font-bold text-base">{exp.org}</h4>
                <span className="text-sm italic text-gray-500 shrink-0">
                  {exp.period}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="italic font-medium text-gray-700 text-sm">
                  {exp.role}
                </span>
                <span className="text-sm text-gray-500">{exp.location}</span>
              </div>
              <div className="text-sm text-gray-700 space-y-1 pl-1">
                {exp.points.map((pt, j) => (
                  <p key={j}>{pt}</p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ── PROJECTS ── */}
        <section className="mb-6">
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-4">
            Projects
          </h3>

          {[
            {
              title: "AI-Driven Land Use and Land Cover Classification",
              tag: "Intern Project",
              status: "Working",
              period: "Jan 2026",
              points: [
                "Developed an AI-based LULC mapping system using supervised ML algorithms (Random Forest, SVM) on Sentinel-2 and Landsat-8 multispectral satellite imagery.",
                "Implemented geospatial analysis workflows in QGIS and Google Earth Engine for classification, achieving accurate land cover mapping with post-classification refinement.",
              ],
            },
            {
              title: "Ambulance Detecting Traffic System",
              tag: "Self Guided Project",
              status: null,
              period: "Sep 2025",
              points: [
                "Developed a Smart Traffic Management System using Computer Vision to detect emergency vehicles in real-time through visual and audio cues.",
                "Implemented virtual environment with automated traffic light control.",
              ],
            },
            {
              title: "Island Rescue Mission",
              tag: "DataXscape Hackathon Project",
              status: null,
              period: "Jan 2026",
              points: [
                "Developed a Power BI dashboard for crisis management simulation, processing SOS signals and environmental data to coordinate rescue operations.",
                "Implemented geospatial mapping, DAX measures for distance calculations, and interactive visualizations using Python and ML for data analysis.",
              ],
            },
            {
              title: "eDNA-VAI-Pipeline",
              tag: "Smart India Hackathon Project",
              status: null,
              period: "Sep 2025",
              points: [
                "Engineered an AI pipeline for deep-sea biodiversity assessment using Variational Autoencoder (VAE) to cluster and analyze environmental DNA sequences.",
                "Enabled computational discovery and classification of novel taxa and biodiversity patterns from oceanic samples.",
              ],
            },
            {
              title: "Professional Portfolio",
              tag: "Self Guided Project",
              status: null,
              period: "Oct 2025",
              points: [
                "Built a modern, responsive developer portfolio website using TypeScript and React with dynamic animations.",
                "Implemented dark/light theme, interactive UI components, and optimized for SEO and performance.",
              ],
            },
          ].map((proj, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-baseline flex-wrap gap-1 mb-0.5">
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  {proj.title}
                  {proj.status && (
                    <span className="ml-2 text-xs font-semibold text-blue-600 border border-blue-300 rounded px-1.5 py-0.5 normal-case">
                      {proj.status}
                    </span>
                  )}
                </h4>
                <span className="text-sm italic text-gray-500 shrink-0">
                  {proj.period}
                </span>
              </div>
              <p className="text-xs text-gray-500 italic mb-1.5">{proj.tag}</p>
              <div className="text-sm text-gray-700 space-y-1 pl-1">
                {proj.points.map((pt, j) => (
                  <p key={j}>{pt}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Other Projects */}
          <div className="mb-2">
            <div className="flex justify-between items-baseline mb-0.5">
              <h4 className="font-bold text-sm uppercase tracking-wide">
                Other Projects
              </h4>
              <span className="text-sm italic text-gray-500">
                Sep 2024 – Present
              </span>
            </div>
            <p className="text-xs text-gray-500 italic mb-2">
              Self Guided Projects
            </p>
            <div className="text-sm text-gray-700 space-y-1.5 pl-1">
              {[
                "StreamVerse – OTT WebApp: Modern, responsive streaming platform built with React and Vite, featuring authentication flow, TMDb API integration, and watchlist with local storage persistence.",
                "AI-Powered Code Review for ML Pipelines: Automated code review tool for ML pipelines analyzing best practices and performance bottlenecks.",
                "Loan Eligibility Detector: Streamlit application predicting loan eligibility using financial and personal data via a Random Forest model.",
                "Retail Management System: Full-stack RMS with FastAPI backend, MySQL database, and vanilla JS frontend featuring POS interface, inventory management, and real-time reporting.",
                "Zenith – Event Management System: Full-stack application built with Java 17, Spring Boot, MySQL, and HTML5/CSS3/JavaScript frontend.",
                "Billing Management System: CGI-based system with payment processing, customer management, and history tracking.",
              ].map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNICAL SKILLS ── */}
        <section className="mb-6">
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">
            Technical Skills
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            {[
              {
                label: "Competitive Programming",
                value:
                  "HackerRank – 5-Star in Python, C, Java, SQL & Problem Solving [prasannanadraj07]  ·  LeetCode – 100+ problems, DSA focus [Prasanna_Nadrajan]",
              },
              {
                label: "Programming Languages",
                value: "Python, C, Java, R, JavaScript",
              },
              {
                label: "Machine Learning",
                value:
                  "Supervised / Unsupervised Learning, Neural Networks, Deep Learning, NLP, Computer Vision, Model Evaluation",
              },
              { label: "Databases", value: "MySQL, MongoDB" },
              {
                label: "Data Science Libraries",
                value:
                  "Pandas, NumPy, Scikit-learn, TensorFlow, Keras, OpenCV, SciPy",
              },
              {
                label: "Software / Tools",
                value:
                  "VS Code, Git, GitHub, Jupyter Notebook, Google Colab, Docker",
              },
              {
                label: "Data Visualization & BI",
                value: "Matplotlib, Seaborn, Plotly, Power BI",
              },
              {
                label: "Web Development (MERN)",
                value: "MongoDB, Express.js, React, Node.js",
              },
              { label: "Cloud Platforms", value: "AWS (Basic)" },
              {
                label: "Soft Skills",
                value:
                  "Communication, Leadership, Teamwork, Creativity, Accountability",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-2 flex-wrap">
                <span className="font-bold shrink-0">{label}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY COURSES ── */}
        <section className="mb-6">
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">
            Key Courses Taken
          </h3>
          <div className="text-sm text-gray-700 space-y-1.5">
            <div className="flex gap-2 flex-wrap">
              <span className="font-bold shrink-0">Computer Science:</span>
              <span className="text-gray-600">
                Data Structures & Algorithms, Object-Oriented Programming, DBMS,
                Java
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="font-bold shrink-0">Data Science:</span>
              <span className="text-gray-600">
                Machine Learning, Data Analytics
              </span>
            </div>
          </div>
        </section>

        {/* ── MISCELLANEOUS ── */}
        <section className="mb-6">
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">
            Miscellaneous
          </h3>
          <div className="text-sm text-gray-700 space-y-1.5">
            {[
              {
                text: "Board Member – Ethics Club REC: Promotes ethical practices and awareness within the college community.",
                year: "2025",
              },
              {
                text: "Completed 100+ days of Coding Challenge, currently progressing through a 200-day DSA roadmap.",
                year: "2025",
              },
              {
                text: "CodeSapiens Git-in-Kadhai: Secured 3rd position among many participants.",
                year: "2025",
              },
              {
                text: "Volunteer – CII Connect 2024, Tech Meetup in Tamil Nadu.",
                year: "2024",
              },
            ].map(({ text, year }, i) => (
              <div key={i} className="flex justify-between gap-4">
                <p>{text}</p>
                <span className="text-gray-400 shrink-0 italic">{year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── LANGUAGES ── */}
        <section>
          <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">
            Languages
          </h3>
          <div className="flex gap-8 text-sm text-gray-700">
            <span>
              English <span className="text-gray-400">(Fluent)</span>
            </span>
            <span>
              Tamil <span className="text-gray-400">(Native)</span>
            </span>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Resume;
