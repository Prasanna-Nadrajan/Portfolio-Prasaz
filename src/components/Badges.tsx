import { motion } from 'framer-motion';

const badges = [
    { name: 'Oracle Academy',   image: '/assets/images/badges/oracle.png' },
    { name: 'Chennai Data Circle', image: '/assets/images/badges/cdc.png' },
    { name: 'AWS Academy',      image: '/assets/images/badges/aws.png' },
    { name: 'Celonis',          image: '/assets/images/badges/celonis.png' },
    { name: 'MongoDB',          image: '/assets/images/badges/mongodb.png' },
    { name: 'Google Dev',       image: '/assets/images/badges/google.png' },
    { name: 'ARQ',              image: '/assets/images/badges/arq.png' },
];

// Duplicate once so the seamless loop works: […badges, …badges]
// One motion.div is enough — the second copy that existed before was redundant and doubled animation cost.
const marqueeItems = [...badges, ...badges];

const BadgeItem = ({ badge }: { badge: typeof badges[0] }) => (
    <div
        className="badge-item flex-shrink-0 w-32 h-32 bg-border-gradient-onyx rounded-2xl p-1 shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 flex items-center justify-center group hover:scale-105 transition-transform duration-300"
        title={badge.name}
    >
        <div className="w-full h-full bg-onyx/50 rounded-xl flex items-center justify-center overflow-hidden p-2">
            <img
                src={badge.image}
                alt={badge.name}
                width={96}
                height={96}
                loading="lazy"
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
            />
            <span className="hidden text-xs text-center text-light-gray-70 break-words p-1">{badge.name}</span>
        </div>
    </div>
);

const Badges = () => {
    return (
        <section className="my-8 overflow-hidden">
            <h3 className="h3 service-title text-xl font-semibold mb-6">Badges</h3>

            {/* Single marquee row — mask fades edges for a polished look */}
            <div className="flex mask-image-linear-gradient overflow-hidden w-full">
                <motion.div
                    className="flex gap-6 shrink-0 pr-6"
                    animate={{ x: '-50%' }}
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 25,
                    }}
                >
                    {marqueeItems.map((badge, index) => (
                        <BadgeItem key={index} badge={badge} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Badges;