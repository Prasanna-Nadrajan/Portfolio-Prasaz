import type { Project } from '../types';

export const projects: Project[] = [
    {
        title: "Ambulance Detecting Traffic System",
        category: "Python",
        image: "/assets/images/portfolio/Ambulance_detection.png",
        link: "https://github.com/Prasanna-Nadrajan/Ambulance_detecting_traffic_system",
        description: "Developed a Smart Traffic Management System using Computer Vision to detect emergency vehicles in real-time through visual and audio cues. Implemented virtual environment with automated traffic light control.",
        techStack: ["Python", "OpenCV", "YOLO", "PyGame"]
    },
    {
        title: "Code Reviewer for ML-Pipelines",
        category: "Python",
        image: "/assets/images/portfolio/ai-powered-code-reviewer-for-ml-pipelines.png",
        link: "https://github.com/Prasanna-Nadrajan/AI-powered-code-review-for-ML-pipelines",
        description: "Automated code review tool for ML pipelines analyzing best practices and performance bottlenecks.",
        techStack: ["Python", "AST", "Machine Learning", "CI/CD"]
    },
    {
        title: "Loan Eligibility Predictor",
        category: "Python",
        image: "/assets/images/portfolio/loan_eligibilty.png",
        link: "https://github.com/Prasanna-Nadrajan/Loan-Eligibility-Detector",
        description: "Streamlit application predicting loan eligibility using financial and personal data.",
        techStack: ["Python", "Streamlit", "Scikit-learn", "Pandas"]
    },
    {
        title: "eDNA Analyser - using unsupervised learning",
        category: "Python",
        image: "/assets/images/portfolio/eDNA_Pipeline.png",
        link: "https://github.com/Prasanna-Nadrajan/eDNA-VAI-Pipeline",
        description: "Engineered an AI pipeline for deep-sea biodiversity assessment using Variational Autoencoder (VAE) to cluster and analyze environmental DNA sequences.",
        techStack: ["Python", "VAE", "Deep Learning", "Bioinformatics"]
    },
    {
        title: "Space explorer - website using React (Three.js)",
        category: "Frontend",
        image: "/assets/images/portfolio/space_exploration.png",
        link: "",
        description: "A visually stunning space exploration website built with React and Three.js, featuring interactive 3D models of planets and space missions.",
        techStack: ["React", "Three.js", "JavaScript", "CSS"]
    },
    {
        title: "Zenith - Event Management System",
        category: "Full Stack",
        image: "/assets/images/portfolio/zenith_event_management.png",
        link: "https://github.com/Prasanna-Nadrajan/Zenith",
        description: "A full-featured event management system with user registration, event scheduling, and real-time notifications.",
        techStack: ["HTML", "CSS", "JS", "JAVA", "Spring Boot", "MySQL"]
    },
    {
        title: "Retail Management System",
        category: "Full Stack",
        image: "/assets/images/portfolio/retail_management_system.png",
        link: "https://github.com/Prasanna-Nadrajan/Retail-Management-System",
        description: "A comprehensive retail management system with inventory, sales, and customer management features.",
        techStack: ["HTML", "CSS", "JS", "Python", "Flask", "SQLite"]
    },
    {
        title: "Professional Blog",
        category: "Frontend",
        image: "/assets/images/portfolio/blog.png",
        link: "https://github.com/Prasanna-Nadrajan/Portfolio-Prasaz",
        description: "A modern, responsive portfolio website built with React and Tailwind CSS, featuring dark mode, animations, and a clean UI.",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
        title: "Billing Management System",
        category: "Full Stack",
        image: "/assets/images/portfolio/billing_management.png",
        link: "https://github.com/Prasanna-Nadrajan/Billing_Management_System_Using_C",
        description: "CGI-based system with payment processing, customer management, and history tracking.",
        techStack: ["C", "CGI", "HTML/CSS", "File Handling"]
    }
];

export const projectCategories = ["All", "Python", "Frontend", "Full Stack"];
