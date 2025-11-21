import { motion } from 'framer-motion';

// Placeholder data based on your screenshot. 
// You will need to add the actual images to your public/assets/images/badges/ folder.
const badges = [
    { name: 'Oracle Academy', image: '/assets/images/badges/oracle.png' },
    { name: 'Chennai Data Circle', image: '/assets/images/badges/cdc.png' },
    { name: 'AWS Academy', image: '/assets/images/badges/aws.png' },
    { name: 'Celonis', image: '/assets/images/badges/celonis.png' },
    { name: 'MongoDB', image: '/assets/images/badges/mongodb.png' },
    { name: 'Google Dev', image: '/assets/images/badges/google.png' },
    { name: 'ARQ', image: '/assets/images/badges/arq.png' }
    // { name: 'Generic Badge', image: '/assets/images/badges/generic.png' }
];

const Badges = () => {
    return (
        <section className="my-8 overflow-hidden">
            <h3 className="h3 service-title text-xl font-semibold mb-6">Badges</h3>
            
            <div className="flex mask-image-linear-gradient overflow-hidden w-full">
                <motion.div
                    className="flex gap-6 shrink-0 pr-6"
                    animate={{ x: '-100%' }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 25, 
                    }}
                >
                    {[...badges, ...badges].map((badge, index) => (
                        <div 
                            key={index} 
                            className="badge-item w-32 h-32 bg-border-gradient-onyx rounded-2xl p-1 shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 flex items-center justify-center group hover:scale-105 transition-transform duration-300"
                            title={badge.name}
                        >
                            <div className="w-full h-full bg-onyx/50 rounded-xl flex items-center justify-center overflow-hidden p-2">
                                <img 
                                    src={badge.image} 
                                    alt={badge.name} 
                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                                    onError={(e) => {
                                        // Fallback text if image missing
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <span className="hidden text-xs text-center text-light-gray-70 break-words p-1">{badge.name}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex gap-6 shrink-0 pr-6"
                    animate={{ x: '-100%' }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 25, 
                    }}
                >
                    {[...badges, ...badges].map((badge, index) => (
                        <div 
                            key={`dup-${index}`} 
                            className="badge-item w-32 h-32 bg-border-gradient-onyx rounded-2xl p-1 shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 flex items-center justify-center group hover:scale-105 transition-transform duration-300"
                            title={badge.name}
                        >
                            <div className="w-full h-full bg-onyx/50 rounded-xl flex items-center justify-center overflow-hidden p-2">
                                <img 
                                    src={badge.image} 
                                    alt={badge.name} 
                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <span className="hidden text-xs text-center text-light-gray-70 break-words p-1">{badge.name}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Badges;