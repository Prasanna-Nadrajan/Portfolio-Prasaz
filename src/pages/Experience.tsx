import TimelineItem from '../components/TimelineItem';
import SEO from '../components/SEO';
import { experienceData, volunteeringData, educationData } from '../data/experience';



const Experience = () => {
    return (
        <article className="experience active animate-fade-in" data-page="experience">
            <SEO
                title="Experience"
                description="My professional journey and academic background."
            />



            <header>
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Experience</h2>
            </header>

            <section className="timeline relative mt-8 md:before:absolute md:before:top-0 md:before:left-1/2 md:before:w-[2px] md:before:h-full md:before:bg-gray-400 md:dark:before:bg-gray-600 md:before:-translate-x-1/2 group/timeline">
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

            <header className="mt-12">
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Education</h2>
            </header>

            <section className="timeline relative mt-8 md:before:absolute md:before:top-0 md:before:left-1/2 md:before:w-[2px] md:before:h-full md:before:bg-gray-400 md:dark:before:bg-gray-600 md:before:-translate-x-1/2 group/timeline">
                {educationData.map((item, index) => (
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

            <header className="mt-12">
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Volunteering</h2>
            </header>

            <section className="timeline relative mt-8 md:before:absolute md:before:top-0 md:before:left-1/2 md:before:w-[2px] md:before:h-full md:before:bg-gray-400 md:dark:before:bg-gray-600 md:before:-translate-x-1/2 group/timeline">
                {volunteeringData.map((item, index) => (
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