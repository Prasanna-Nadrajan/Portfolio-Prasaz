import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import SkillVisualization from '../components/SkillVisualization';
import Badges from '../components/Badges';
import TestimonialModal from '../components/TestimonialModal';
import SEO from '../components/SEO';

// Updated Services Data
const services = [
    {
        title: "Data Analytics",
        description: "Uncovering insights to drive impactful, data-driven decisions",
        icon: "/assets/images/mp_da.png"
    },
    {
        title: "MERN Stack",
        description: "Building scalable full-stack web applications using MongoDB, Express, React, and Node.js.",
        icon: "/assets/images/mp_mern.jpg"
    },
    {
        title: "Business Intelligence",
        description: "Crafting dashboards that empower business choices",
        icon: "/assets/images/mp_bi.png"
    },
    {
        title: "Machine Learning",
        description: "Developing intelligent models to predict trends and automate complex tasks.",
        icon: "/assets/images/mp_ml.jpg"
    }
];

// Testimonials Data (Events)
const testimonials = [
    {
        name: "Chennai Data Circle - AI In BI (Boon Or Bane)?",
        date: "Sep 25, 2025",
        avatar: "/assets/images/events/cdc_meeetup.png",
        text: "Participated in an insightful session discussing the impact of Artificial Intelligence on Business Intelligence, exploring whether it's a boon or a bane for the industry.",
        link: "https://www.linkedin.com/posts/prasannanadrajan_chennai-data-circles-long-awaited-exclusive-activity-7377932101142114304-GKsu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE0J_eAB7yG03MXXrYG4SgL18fkJkQAfEVs"
    },
    {
        name: "CII Connect 2024",
        date: "Dec 17, 2024",
        avatar: "/assets/images/events/cii_connect_2024.jpg",
        text: "Attended CII Connect 2024, a premier event bringing together industry leaders and technology experts to discuss the future of digital transformation and innovation.",
        link: "https://www.linkedin.com/prasannanadrajan"
    },
    {
        name: "Investiture Ceremony ARQ REC",
        date: "Oct 10, 2025",
        avatar: "/assets/images/events/investiture.png",
        text: "Honored to be part of the Investiture Ceremony at ARQ REC, marking the beginning of a new leadership journey and commitment to excellence.",
        link: "https://www.linkedin.com/posts/prasannanadrajan_arq-investitureceremony-ai-activity-7383012424318177280-G9Ur?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE0J_eAB7yG03MXXrYG4SgL18fkJkQAfEVs"
    },
    {
        name: "CodeSapiens - Students Community (Meetup)",
        date: "Oct 15, 2025",
        avatar: "/assets/images/events/codesapiens_meetup.png",
        text: "Joined fellow student developers at the CodeSapiens meetup to share knowledge, collaborate on projects, and build a strong tech community.",
        link: "https://www.linkedin.com/posts/prasannanadrajan_codesapiens-makoitlabs-techmeetup-activity-7382843878275534848-IpmF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE0J_eAB7yG03MXXrYG4SgL18fkJkQAfEVs"
    },
    {
        name: "Chennai Data Circle - Agentic AI 2026",
        date: "Jan 10, 2026",
        avatar: "/assets/images/events/cdc_agentic_ai.png",
        text: "Participated in the Genesis X Chennai Data Circle's Agentic AI 2026 event, where I explored the latest trends and applications of AI in data analysis and business intelligence.",
        link: "https://www.linkedin.com/posts/prasannanadrajan_agenticai2026-chennaidatacircle-genesys-activity-7416147428317384704-3sU2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE0J_eAB7yG03MXXrYG4SgL18fkJkQAfEVs"
    }
];

const About = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);

    const openModal = (testimonial: typeof testimonials[0]) => {
        setSelectedTestimonial(testimonial);
        setModalOpen(true);
    };

    return (
        <article className="about active animate-fade-in" data-page="about">
            <SEO
                title="About"
                description="Learn about Prasanna Nadrajan, a Data Analyst and MERN Stack Developer specializing in AI, BI, and Data Science."
            />

            <header>
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">About me</h2>
            </header>

            <section className="about-text text-secondary-text leading-relaxed mb-8">
                <p className="mb-4 text-justify">
                    Hey! I work with data. Essentially, I'm a bit of a data detective—I spend my time digging through numbers and information to find hidden patterns and stories. It’s amazing what you can uncover; you might find the real reason a certain campaign took off, or pinpoint the exact moment a process starts to slow down. But it's not just about finding these interesting facts for their own sake. I then use what I find to help make better, smarter decisions.
                </p>
                <p className="mb-4 text-justify">
                    My role is to translate all that complex information into a clear and simple recommendation, so instead of just having a pile of numbers, we have a solid next step. Ultimately, I help the team move forward with confidence, knowing our choices are backed by actual evidence, not just guesswork.
                </p>
            </section>

            <section className="service mb-8">
                <h3 className="h3 service-title text-xl font-semibold mb-5">What i'm doing</h3>
                <div className="service-list grid grid-cols-1 md:grid-cols-2 gap-5">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                        />
                    ))}
                </div>
            </section>

            <SkillVisualization />
            <Badges />

            <section className="testimonials mb-8">
                <h3 className="h3 testimonials-title text-xl font-semibold mb-5">Favourites</h3>
                <ul className="testimonials-list grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((item, index) => (
                        <li
                            key={index}
                            data-cursor="hover"
                            className="testimonials-item bg-border-gradient-onyx p-5 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 cursor-pointer hover:scale-[1.02] transition-transform duration-300 h-full"
                            onClick={() => openModal(item)}
                        >
                            <div className="content-card flex flex-col h-full">
                                <figure className="testimonials-avatar-box w-full h-48 rounded-xl overflow-hidden mb-4 shadow-neon shrink-0">
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Event";
                                        }}
                                    />
                                </figure>

                                <div className="testimonials-content flex flex-col flex-grow">
                                    <time className="text-xs text-neon-blue font-medium mb-2 block">{item.date}</time>
                                    <h4 className="h4 testimonials-item-title text-lg font-medium text-main-text mb-2 leading-snug">{item.name}</h4>
                                    <div className="testimonials-text text-secondary-text text-sm line-clamp-2">
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <TestimonialModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                data={selectedTestimonial}
            />
        </article>
    );
};

export default About;