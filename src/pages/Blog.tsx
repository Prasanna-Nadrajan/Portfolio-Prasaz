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

const Blog = () => {
    return (
        <article className="blog active animate-fade-in" data-page="blog">
            <header>
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Blog</h2>
            </header>

            <section className="blog-posts">
                <ul className="blog-posts-list grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.map((post, index) => (
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
            </section>
        </article>
    );
};

export default Blog;
