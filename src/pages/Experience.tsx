import TimelineItem from '../components/TimelineItem';
import SEO from '../components/SEO';

const experienceData = [
    {
        date: "Sep 2025 - Present",
        title: "ARQ REC",
        subtitle: "Data Analyst Associate",
        description: "Utilized data visualization tools (Power BI) and SQL/Python for business intelligence reporting and operational efficiency improvements.",
        logo: "/assets/images/experience/arq_rec_logo.jpg",
        link: "https://drive.google.com/file/d/1wcf2VrSWUfjEsIXIQeqzqqbNERYEGGUb/view?usp=sharing",
        side: "right" as const
    },
    {
        date: "Aug 2025 - Present",
        title: "Medium",
        subtitle: "Tech Blogger",
        description: "Research, write, and publish original articles on topics such as data science, statistics, technology, and real-world applications.",
        logo: "/assets/images/experience/medium.png",
        link: "https://medium.com/@prasaznat",
        side: "left" as const
    },
    {
        date: "Sep 2025 - Present",
        title: "Ethics Club REC",
        subtitle: "Board Member",
        description: "Spearheading initiatives to promote ethical practices and awareness within the college community.",
        logo: "/assets/images/experience/ethics_club.png",
        link: "",
        side: "right" as const
    }
];

const Experience = () => {
    return (
        <article className="experience active animate-fade-in" data-page="experience">
            <SEO 
                title="Experience" 
                description="My professional journey, internships, and roles in data analysis and tech communities." 
            />

            <header>
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Experience</h2>
            </header>

            <section className="timeline relative mt-8 md:before:absolute md:before:top-0 md:before:left-1/2 md:before:w-[2px] md:before:h-full md:before:bg-gray-400 md:dark:before:bg-gray-600 md:before:-translate-x-1/2">
                {experienceData.map((item, index) => (
                    <TimelineItem
                        key={index}
                        date={item.date}
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        logo={item.logo}
                        link={item.link}
                        side={item.side}
                    />
                ))}
            </section>
        </article>
    );
};

export default Experience;