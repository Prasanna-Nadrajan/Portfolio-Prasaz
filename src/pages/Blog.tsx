import { useState, useEffect } from 'react';
import { IoSearchOutline, IoChevronDown, IoReloadOutline } from 'react-icons/io5';
import BlogPostCard from '../components/BlogPostCard';
import SEO from '../components/SEO';

// Interface for the Medium RSS to JSON response items
interface MediumPost {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    categories: string[];
}

const Blog = () => {
    const [posts, setPosts] = useState<MediumPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    // Your Medium Username
    const mediumUsername = '@prasaznat';
    const rssUrl = `https://medium.com/feed/${mediumUsername}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    // Updated: Single placeholder image path as per your request
    const placeholderImage = "/assets/images/blog/Medium-Emblem.png";

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 'ok') {
                const fetchedPosts: MediumPost[] = data.items;
                setPosts(fetchedPosts);

                // Extract unique categories dynamically from the posts
                const allCategories = fetchedPosts.flatMap(post => post.categories);
                const uniqueCategories = ["All", ...new Set(allCategories)];
                setCategories(uniqueCategories);
            } else {
                throw new Error("Failed to fetch blog posts.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not load blog posts. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Function to clean up HTML descriptions for display
    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    // Helper to extract image from content with strict filtering
    const getPostImage = (post: MediumPost) => {
        // Helper to check if a URL is a valid content image (not a tracking pixel)
        const isValidImage = (url: string) => {
            return url && 
                   url.startsWith('http') && 
                   !url.includes('medium.com/_/stat') && // Block Medium tracking pixels
                   !url.includes('medium.com/m/global'); // Block generic Medium icons
        };

        // 1. Check thumbnail field
        if (isValidImage(post.thumbnail)) {
            return post.thumbnail;
        }

        // 2. Parse content for the first valid <img>
        const doc = new DOMParser().parseFromString(post.description || post.content, 'text/html');
        const images = doc.querySelectorAll('img');
        
        for (let i = 0; i < images.length; i++) {
            if (isValidImage(images[i].src)) {
                return images[i].src;
            }
        }

        // 3. Fallback: Return the single local placeholder image
        return placeholderImage;
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stripHtml(post.description).toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = filter === "All" || post.categories.includes(filter);
        
        return matchesSearch && matchesCategory;
    });

    // Format date helper
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <article className="blog active animate-fade-in" data-page="blog">
            <SEO 
                title="Blog" 
                description="Read my latest articles on Data Science, Machine Learning, and Business Intelligence on Medium." 
            />

            <header className="flex justify-between items-center mb-4 border-b-2 border-neon-blue w-full pb-1">
                <h2 className="h2 article-title text-2xl font-semibold">Blog</h2>
                <button 
                    onClick={fetchPosts} 
                    className="text-secondary-text hover:text-neon-blue transition-colors p-2"
                    title="Refresh posts"
                >
                    <IoReloadOutline className={loading ? "animate-spin" : ""} size={20}/>
                </button>
            </header>

            <section className="blog-posts">
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 mt-6">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-border-gradient-onyx p-3 pl-10 rounded-xl border border-jet text-main-text focus:outline-none focus:border-neon-blue transition-colors shadow-neon"
                        />
                        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray-70" size={20} />
                    </div>

                    {/* Desktop Filter Buttons */}
                    <ul className="filter-list hidden md:flex flex-wrap justify-end items-center gap-3">
                        {categories.slice(0, 6).map((category) => (
                            <li key={category} className="filter-item">
                                <button
                                    onClick={() => setFilter(category)}
                                    className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-300 border border-transparent ${
                                        filter === category 
                                        ? 'text-neon-blue font-medium bg-jet border-neon-blue/30' 
                                        : 'text-secondary-text hover:text-light-gray-70 hover:bg-jet/50'
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
                            <div className="select-value capitalize">{filter}</div>
                            <div className="select-icon">
                                <IoChevronDown className={`transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {isSelectOpen && (
                            <ul className="select-list bg-onyx absolute top-full left-0 w-full p-2 rounded-xl border border-jet shadow-neon z-20 mt-2 max-h-60 overflow-y-auto">
                                {categories.map((category) => (
                                    <li key={category} className="select-item">
                                        <button
                                            onClick={() => {
                                                setFilter(category);
                                                setIsSelectOpen(false);
                                            }}
                                            className="w-full text-left p-2 text-secondary-text text-sm hover:bg-jet rounded-lg transition-colors capitalize"
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-jet border-t-neon-blue rounded-full animate-spin mb-4"></div>
                        <p className="text-secondary-text animate-pulse">Fetching latest articles from Medium...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 bg-border-gradient-onyx rounded-xl border border-red-500/30">
                        <p className="text-red-400 mb-2">{error}</p>
                        <button onClick={fetchPosts} className="text-neon-blue hover:underline text-sm">Try Again</button>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <ul className="blog-posts-list grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map((post, index) => (
                            <BlogPostCard
                                key={post.guid || index}
                                title={post.title}
                                category={post.categories[0] || "Tech"}
                                date={formatDate(post.pubDate)}
                                description={stripHtml(post.description).substring(0, 150) + "..."}
                                image={getPostImage(post)} // Fallback will now return Medium-Emblem.png
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