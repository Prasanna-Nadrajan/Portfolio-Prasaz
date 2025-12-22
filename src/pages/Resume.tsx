import { IoDownloadOutline } from 'react-icons/io5';
import SEO from '../components/SEO';

const Resume = () => {
    return (
        <article className="resume active animate-fade-in" data-page="resume">
            <SEO
                title="Resume"
                description="View and download my professional resume."
            />

            <header className="flex justify-between items-center mb-6">
                <h2 className="h2 article-title text-2xl font-semibold border-b-2 border-neon-blue w-max pb-1">Resume</h2>
                <div className="flex gap-4">
                    <a
                        href="/assets/Prasanna_Nadrajan_Resume.pdf"
                        download="Prasanna_Nadrajan_Resume.pdf"
                        className="flex items-center gap-2 bg-border-gradient-onyx px-4 py-2 rounded-lg text-neon-blue hover:text-white transition-colors shadow-neon"
                    >
                        <IoDownloadOutline />
                        <span className="hidden md:inline">Download CV</span>
                    </a>
                </div>
            </header>

            <div className="resume-content bg-white text-black p-8 rounded-xl shadow-2xl max-w-4xl mx-auto overflow-hidden print:shadow-none print:p-0 print:max-w-none">
                {/* Header */}
                <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">Prasanna Nadrajan R</h1>
                    <p className="text-lg font-medium">B.Tech - Artificial Intelligence and Data Science</p>
                    <div className="flex justify-center gap-4 text-sm mt-2 flex-wrap">
                        <span>+91-8667687297</span>
                        <span>|</span>
                        <a href="mailto:prasannanadrajan.r@gmail.com" className="hover:underline">prasannanadrajan@gmail.com</a>
                        <span>|</span>
                        <a href="https://github.com/Prasanna-Nadrajan" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                        <span>|</span>
                        <a href="https://linkedin.com/in/prasanna-nadrajan" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    </div>
                    <p className="text-sm mt-1">Rajalakshmi Engineering College, Chennai</p>
                </div>

                {/* Education */}
                <section className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">Education</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-1 font-bold">Degree</th>
                                    <th className="py-1 font-bold">Institute/Board</th>
                                    <th className="py-1 font-bold">CGPA/Percentage</th>
                                    <th className="py-1 font-bold text-right">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1">Bachelor of Technology</td>
                                    <td className="py-1">Rajalakshmi Engineering College, Chennai</td>
                                    <td className="py-1">8.87/10 (Current)</td>
                                    <td className="py-1 text-right">2024-Present</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1">Senior Secondary</td>
                                    <td className="py-1">The Hindu Senior Secondary School</td>
                                    <td className="py-1">89.60%</td>
                                    <td className="py-1 text-right">2024</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Secondary</td>
                                    <td className="py-1">The Hindu Senior Secondary School</td>
                                    <td className="py-1">82.67%</td>
                                    <td className="py-1 text-right">2022</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Work Experience */}
                <section className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">Work Experience</h3>
                    <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-lg">Analyse Research Quant (ARQ)</h4>
                            <span className="text-sm italic">Sep 2024 - Present</span>
                        </div>
                        <div className="flex justify-between items-baseline mb-2">
                            <span className="italic font-medium">Data Analyst Associate</span>
                            <span className="text-sm">Chennai, Tamil Nadu</span>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                            <li>Analyzed customer datasets using SQL and Python, generating insights that improved campaign targeting by 25%.</li>
                            <li>Developed automated ETL pipelines consolidating multi-source data, reducing manual reporting time by 40%.</li>
                            <li>Created Power BI dashboards to present KPIs and support data-driven decision making for stakeholders.</li>
                        </ul>
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">Projects</h3>

                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold">AMBULANCE DETECTING TRAFFIC SYSTEM</h4>
                            <span className="text-sm italic">Sep 2024</span>
                        </div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-sm italic">Self Guided Project</span>
                            <a href="#" className="text-sm font-bold hover:underline">[Github]</a>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                            <li>Developed a Smart Traffic Management System using Computer Vision to detect emergency vehicles in real-time through visual and audio cues.</li>
                            <li>Implemented virtual environment with automated traffic light control.</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold">eDNA-VAI-PIPELINE</h4>
                            <span className="text-sm italic">Sep 2024</span>
                        </div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-sm italic">Self Guided Project</span>
                            <a href="#" className="text-sm font-bold hover:underline">[Github]</a>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                            <li>Engineered an AI pipeline for deep-sea biodiversity assessment using Variational Autoencoder (VAE) to cluster and analyze environmental DNA sequences.</li>
                            <li>Enabled computational discovery and classification of novel taxa and biodiversity patterns from oceanic samples.</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold">OTHER PROJECTS</h4>
                            <span className="text-sm italic">Jun 2024 - Present</span>
                        </div>
                        <div className="mb-1">
                            <span className="text-sm italic">Self Guided Projects</span>
                        </div>
                        <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                            <li><span className="font-semibold">AI-powered Code Review for ML Pipelines:</span> Automated code review tool for ML pipelines analyzing best practices and performance bottlenecks. <a href="#" className="font-bold hover:underline">[Github]</a></li>
                            <li><span className="font-semibold">Loan Eligibility Detector:</span> Streamlit application predicting loan eligibility using financial and personal data. <a href="#" className="font-bold hover:underline">[Github]</a></li>
                            <li><span className="font-semibold">Billing Management System:</span> CGI-based system with payment processing, customer management, and history tracking. <a href="#" className="font-bold hover:underline">[Github]</a></li>
                        </ul>
                    </div>
                </section>

                {/* Technical Skills */}
                <section className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">Technical Skills</h3>
                    <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                        <li>
                            <span className="font-bold">Competitive Programming:</span>
                            <ol className="list-decimal list-outside ml-5 mt-1 space-y-1">
                                <li><span className="font-semibold">HackerRank:</span> 5*Star rated coder in Python, C, Java, SQL and Problem Solving. <span className="font-bold">[prasannanadraj07]</span></li>
                                <li><span className="font-semibold">LeetCode:</span> Expert at problem solving and DSA and solved over 100 problems. <span className="font-bold">[Prasanna_Nadrajan]</span></li>
                            </ol>
                        </li>
                        <li><span className="font-bold">Programming Languages:</span> Python, C, Java</li>
                        <li><span className="font-bold">DataBases:</span> SQL, MongoDB</li>
                        <li><span className="font-bold">Software/Tools:</span> Visual Studio, Git, GitHub, Jupyter, Google Colab</li>
                        <li><span className="font-bold">Libraries:</span> Pandas, Numpy, Dask, Seaborn, Scipy, OpenCV, Flask</li>
                        <li><span className="font-bold">Cloud:</span> Google Cloud Platform</li>
                        <li><span className="font-bold">Soft Skills:</span> Communication, Leadership, Teamwork, Creativity, Accountability</li>
                    </ul>
                </section>

                {/* Key Courses Taken */}
                <section className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">Key Courses Taken</h3>
                    <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                        <li><span className="font-bold">ComputerScience Courses:</span> Data Structure & Algorithm, Object Oriented Programming, DBMS, Java</li>
                        <li><span className="font-bold">DataScience Courses:</span> Machine Learning, Data Analytics</li>
                    </ul>
                </section>

                {/* Miscellaneous */}
                <section>
                    <h3 className="text-xl font-bold uppercase border-b border-gray-400 mb-3">Miscellaneous</h3>
                    <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                        <li className="flex justify-between">
                            <span>Board Member in <span className="font-bold">Ethics Club REC</span>, Promote ethical practices and awareness within the college community</span>
                            <span className="italic">2025</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Completed <span className="font-bold">100 days of Coding Challenge</span>, currently progressing through a 200-day DSA roadmap.</span>
                            <span className="italic">2025</span>
                        </li>
                        <li className="flex justify-between">
                            <span>CodeSapiens Git-in-Kadhai, Secured <span className="font-bold">3rd position</span>, among many participants.</span>
                            <span className="italic">2025</span>
                        </li>
                    </ul>
                </section>
            </div>
        </article>
    );
};

export default Resume;
