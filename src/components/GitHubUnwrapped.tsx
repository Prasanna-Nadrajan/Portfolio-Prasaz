import { useState } from 'react';
import { motion } from 'framer-motion';

const GitHubUnwrapped = () => {
    const images = [
        "/assets/images/gitHubUnwrapped2025/m1.png",
        "/assets/images/gitHubUnwrapped2025/m2.png",
        "/assets/images/gitHubUnwrapped2025/m3.png",
        "/assets/images/gitHubUnwrapped2025/m4.png",
        "/assets/images/gitHubUnwrapped2025/m5.png",
        "/assets/images/gitHubUnwrapped2025/m6.png",
        "/assets/images/gitHubUnwrapped2025/m7.png",
    ];

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="mb-10 animate-fade-in">
            <h3 className="h3 service-title text-xl font-semibold mb-6 flex items-center gap-2">
                GitHub Unwrapped! 🎁🚀
                <span className="text-xs font-normal text-neon-blue border border-neon-blue px-2 py-0.5 rounded-full bg-neon-blue/10">
                    2024-2025
                </span>
            </h3>

            <div className="bg-border-gradient-onyx p-[1px] rounded-2xl shadow-neon relative z-10">
                <div className="bg-container-bg rounded-2xl p-6 relative z-20">

                    {/* Video Section */}
                    <div className="mb-8">
                        <h4 className="text-lg font-medium text-main-text mb-4 border-l-4 border-neon-blue pl-3">
                            System Recap Protocol
                        </h4>
                        <div className="relative w-full max-w-md mx-auto aspect-square rounded-xl overflow-hidden border border-jet shadow-lg group">
                            <video
                                className="w-full h-full object-cover"
                                controls
                                poster="/assets/images/gitHubUnwrapped2025/m1.png" // Use first image as poster
                            >
                                <source src="/assets/videos/github-wrapped-2025.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Fallback / Download Prompt if video is missing (User needs to place it) */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <p className="text-white text-sm font-light">
                                    System Video Log
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 text-right">
                            <a
                                href="https://drive.google.com/file/d/1u_i5Necuc5Fp9MVbzkGbHKE_eve3V4LU/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-neon-blue hover:underline"
                            >
                                [ACCESS EXTERNAL ARCHIVE]
                            </a>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <h4 className="text-lg font-medium text-main-text mb-4 border-l-4 border-neon-blue pl-3">
                        Performance Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <motion.div
                                key={index}
                                className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-neon-blue transition-colors group"
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`GitHub Metric ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                    <span className="text-xs text-neon-blue font-mono">DATA_LOG_0{index + 1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox for Images */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={selectedImage}
                        alt="Expanded Metric"
                        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-neon-blue"
                    />
                    <button
                        className="absolute top-4 right-4 text-white hover:text-neon-blue transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
};

export default GitHubUnwrapped;
