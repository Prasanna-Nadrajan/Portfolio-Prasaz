import { useState } from 'react';
import { IoSearchOutline, IoChevronDown } from 'react-icons/io5';
import BlogPostCard from '../components/BlogPostCard';

const blogPosts = [
    {
        title: "Unlocking NLP for Business",
        category: "Machine Learning",
        date: "Nov 20, 2025",
        description: "Sentiment, Topics, and Practical Chatbots",
        image: "/assets/images/blog/b8.png",
        link: "https://medium.com/@prasaznat/unlocking-nlp-for-business-sentiment-topics-and-practical-chatbots-050873872fa1"
    },
    {
        title: "The Rise of Generative AI",
        category: "Data",
        date: "Nov 15, 2025",
        description: "Opportunities and Challenges for Data Pros",
        image: "/assets/images/blog/b7.png",
        link: "https://medium.com/@prasaznat/the-rise-of-generative-ai-opportunities-and-challenges-for-data-pros-0d983f8375db"
    },
    {
        title: "Data StoryTelling",
        category: "Data StoryTelling",
        date: "Nov 6, 2025",
        description: "Turning Analytics into Actionable Narratives",
        image: "/assets/images/blog/b6.png",
        link: "https://medium.com/@prasaznat/data-storytelling-turning-analytics-into-actionable-narratives-138351612cd7"
    },
    {
        title: "From Data to Decisions",
        category: "Data Analytics",
        date: "Nov 2, 2025",
        description: "Building an End-to-End Analytics Pipeline",
        image: "/assets/images/blog/b5.png",
        link: "https://medium.com/@prasaznat/from-data-to-decisions-building-an-end-to-end-analytics-pipeline-3ebb3eb78073"
    },
    {
        title: "Unveiling Business Workflows",
        category: "Data Science",
        date: "Oct 29, 2025",
        description: "My Journey into Process Mining with Celonis",
        image: "/assets/images/blog/b4.png",
        link: "https://medium.com/@prasaznat/unveiling-business-workflows-my-journey-into-process-mining-with-celonis-3ee5f5505893"
    },
    {
        title: "Real-Time Analytics",
        category: "Data Science",
        date: "Oct 25, 2025",
        description: "How Streaming Data Is Transforming Business Decisions",
        image: "/assets/images/blog/b3.png",
        link: "https://medium.com/@prasaznat/real-time-analytics-how-streaming-data-is-transforming-business-decisions-f801da2b165a"
    },
    {
        title: "Data’s Hidden Traps",
        category: "Data Engineering",
        date: "Oct 22, 2025",
        description: "How to Spot and Fix Missing Values, Outliers, and Inconsistent Formats",
        image: "/assets/images/blog/b2.png",
        link: "https://medium.com/@prasaznat/datas-hidden-traps-how-to-spot-and-fix-missing-values-outliers-and-inconsistent-formats-e6501f43fd00"
    },
    {
        title: "Why Correlation lies to You",
        category: "Data Science",
        date: "Oct 19, 2025",
        description: "The Statistical Fallacy Unveiled: Understanding Correlation vs. Causation",
        image: "/assets/images/blog/b1.png",
        link: "https://medium.com/@prasaznat/the-statistical-trap-why-correlation-will-always-lie-to-you-17c4e42aab97"
    }
];

const categories = ["All", "Machine Learning", "Data", "Data StoryTelling", "Data Analytics", "Data Science", "Data Engineering"];

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filter === "All" || post.category === filter;
        return matchesSearch && matchesCategory;
    });

    return (
        <article className="blog active animate-fade-in" data-page="blog">
            <header>
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Blog</h2>
            </header>

            <section className="blog-posts">
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-border-gradient-onyx p-3 pl-10 rounded-xl border border-jet text-main-text focus:outline-none focus:border-neon-blue transition-colors"
                        />
                        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray-70" size={20} />
                    </div>

                    {/* Desktop Filter Buttons */}
                    <ul className="filter-list hidden md:flex flex-wrap justify-end items-center gap-4">
                        {categories.map((category) => (
                            <li key={category} className="filter-item">
                                <button
                                    onClick={() => setFilter(category)}
                                    className={`text-sm transition-colors duration-300 ${filter === category ? 'text-neon-blue font-medium' : 'text-secondary-text hover:text-light-gray-70'
                                        }`}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Filter Select */}
                    <div className="filter-select-box md:hidden relative w-full">
                        <button
                            className={`filter-select w-full bg-border-gradient-onyx p-3 rounded-xl flex justify-between items-center border border-jet text-light-gray-70 text-sm ${isSelectOpen ? 'active' : ''}`}
                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                        >
                            <div className="select-value">{filter}</div>
                            <div className="select-icon">
                                <IoChevronDown className={`transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {isSelectOpen && (
                            <ul className="select-list bg-onyx absolute top-full left-0 w-full p-2 rounded-xl border border-jet shadow-neon z-20 mt-2">
                                {categories.map((category) => (
                                    <li key={category} className="select-item">
                                        <button
                                            onClick={() => {
                                                setFilter(category);
                                                setIsSelectOpen(false);
                                            }}
                                            className="w-full text-left p-2 text-secondary-text text-sm hover:bg-jet rounded-lg transition-colors"
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <ul className="blog-posts-list grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map((post, index) => (
                            <BlogPostCard
                                key={index}
                                title={post.title}
                                category={post.category}
                                date={post.date}
                                description={post.description}
                                image={post.image}
                                link={post.link}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-10 text-secondary-text">
                        <p>No posts found matching your criteria.</p>
                    </div>
                )}
            </section>
        </article>
    );
};

export default Blog;
