import { createPortal } from 'react-dom';
import { IoCloseOutline, IoLogoLinkedin } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        name: string;
        avatar: string;
        text: string;
        date?: string;
        link?: string;
    } | null;
}

const TestimonialModal = ({ isOpen, onClose, data }: TestimonialModalProps) => {
    if (!isOpen || !data) return null;

    // Use createPortal to render the modal at the end of document.body
    // This ensures 'fixed' positioning is relative to the viewport, not the parent container
    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                
                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative bg-onyx border border-jet p-0 rounded-2xl shadow-neon max-w-2xl w-full z-10 overflow-hidden flex flex-col max-h-[90vh]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-white hover:text-neon-blue transition-colors backdrop-blur-md"
                    >
                        <IoCloseOutline size={24} />
                    </button>

                    {/* Large Image Section */}
                    <figure className="w-full h-64 sm:h-80 bg-bg-gradient-onyx shrink-0">
                        <img 
                            src={data.avatar} 
                            alt={data.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=Event";
                            }}
                        />
                    </figure>

                    <div className="p-6 overflow-y-auto">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-main-text mb-1">{data.name}</h3>
                            {data.date && <time className="text-neon-blue text-sm font-medium">{data.date}</time>}
                        </div>

                        <p className="text-secondary-text leading-relaxed text-base mb-6">
                            {data.text}
                        </p>

                        {/* LinkedIn Button */}
                        {data.link && (
                            <a 
                                href={data.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#0077b5] text-white px-5 py-2.5 rounded-xl hover:bg-[#006396] transition-colors font-medium text-sm"
                            >
                                <IoLogoLinkedin size={18} />
                                View Post on LinkedIn
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default TestimonialModal;