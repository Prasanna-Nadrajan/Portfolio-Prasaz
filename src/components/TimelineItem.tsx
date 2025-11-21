import { motion } from 'framer-motion';
// Removed unused IoStar import

interface TimelineItemProps {
    date: string;
    title: string;
    subtitle: string;
    description: string;
    logo: string;
    link: string;
    side: 'left' | 'right';
}

const TimelineItem = ({ date, title, subtitle, description, logo, link, side }: TimelineItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`timeline-event relative mb-8 pl-12 md:pl-0 md:w-1/2 ${side === 'left' ? 'md:pr-8 md:ml-0' : 'md:pl-8 md:ml-auto'}`}
        >
            {/* Timeline Dot */}
            <div className={`absolute top-0 w-4 h-4 bg-neon-blue rounded-full shadow-neon z-10 ${side === 'left' ? 'left-0 md:right-[-9px] md:left-auto' : 'left-0 md:left-[-9px]'}`}>
                <div className="absolute inset-0 bg-neon-blue animate-ping opacity-75 rounded-full"></div>
            </div>

            {/* Date Badge */}
            <div className={`absolute top-0 text-xs font-medium text-neon-blue bg-onyx px-2 py-1 rounded-md mb-2 ${side === 'left' ? 'md:right-8 md:top-[-25px]' : 'md:left-8 md:top-[-25px]'} left-12 top-[-25px]`}>
                {date}
            </div>

            <a href={link} target="_blank" rel="noopener noreferrer" className="experience-card block bg-border-gradient-onyx p-5 rounded-xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-xl before:-z-10 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-4 mb-3">
                    <figure className="logo-box bg-white p-1 rounded-lg shrink-0">
                        <img src={logo} alt={title} width="40" className="rounded" />
                    </figure>
                    <div>
                        <h3 className="h3 title text-main-text text-lg font-medium">{title}</h3>
                        <p className="subtitle text-neon-blue text-sm">{subtitle}</p>
                    </div>
                </div>
                <p className="description text-secondary-text text-sm leading-relaxed">
                    {description}
                </p>
            </a>
        </motion.div>
    );
};

export default TimelineItem;