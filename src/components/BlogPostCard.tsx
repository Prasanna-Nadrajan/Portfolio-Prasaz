import { motion } from 'framer-motion';

interface BlogPostCardProps {
    title: string;
    category: string;
    date: string;
    description: string;
    image: string;
    link: string;
}

const BlogPostCard = ({ title, category, date, description, image, link }: BlogPostCardProps) => {
    return (
        <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="blog-post-item bg-border-gradient-onyx rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 group hover:scale-[1.02] transition-transform duration-300"
        >
            <a href={link} target="_blank" rel="noopener noreferrer" className="block p-4">
                <figure className="blog-banner-box rounded-xl overflow-hidden mb-4 aspect-video">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                </figure>

                <div className="blog-content px-2">
                    <div className="blog-meta flex items-center gap-2 text-light-gray-70 text-xs mb-2">
                        <span className="blog-category bg-onyx px-2 py-1 rounded-md">{category}</span>
                        <span className="dot w-1 h-1 bg-light-gray-70 rounded-full"></span>
                        <time dateTime={date}>{date}</time>
                    </div>

                    <h3 className="h3 blog-item-title text-main-text text-lg font-medium mb-2 group-hover:text-neon-blue transition-colors">
                        {title}
                    </h3>

                    <p className="blog-text text-secondary-text text-sm leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>
            </a>
        </motion.li>
    );
};

export default BlogPostCard;
