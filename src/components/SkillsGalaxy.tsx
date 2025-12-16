import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Skills data - could be moved to a separate data file
const SKILLS = [
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Python', color: '#3776ab' },
    { name: 'Three.js', color: '#000000' },
    { name: 'Tailwind', color: '#38b2ac' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'PostgreSQL', color: '#336791' },
];

const Planet = ({ skill, radius, speed, offset, onHover }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock }) => {
        if (meshRef.current && !hovered) {
            const t = clock.getElapsedTime() * speed + offset;
            meshRef.current.position.x = Math.cos(t) * radius;
            meshRef.current.position.z = Math.sin(t) * radius;
        }
    });

    return (
        <group>
            <mesh
                ref={meshRef}
                onPointerOver={() => {
                    setHovered(true);
                    onHover(skill.name);
                }}
                onPointerOut={() => {
                    setHovered(false);
                    onHover(null);
                }}
            >
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.5} />
                <Html distanceFactor={10}>
                    <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap border border-cyan-500/50 backdrop-blur-sm">
                        {skill.name}
                    </div>
                </Html>
            </mesh>
            {/* Orbit path visual */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

const Sun = () => {
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
            <pointLight intensity={2} distance={20} decay={2} color="#fbbf24" />
        </mesh>
    );
};

const GalaxyScene = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const planets = useMemo(() => {
        return SKILLS.map((skill, index) => ({
            skill,
            radius: 3 + index * 1.2,
            speed: 0.5 - index * 0.03, // Inner planets move faster
            offset: Math.random() * Math.PI * 2,
        }));
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Sun />
            {planets.map((planet, i) => (
                <Planet
                    key={i}
                    {...planet}
                    onHover={setHoveredSkill}
                />
            ))}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={!hoveredSkill} autoRotateSpeed={0.5} />
            <Stars />
        </>
    );
};

const Stars = () => {
    const count = 500;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 20 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.8} />
        </points>
    )
}

export default function SkillsGalaxy() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="w-full p-4 rounded-xl bg-black/40 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <div className="flex flex-wrap gap-2 justify-center">
                    {SKILLS.map((skill) => (
                        <div
                            key={skill.name}
                            className="px-3 py-1 bg-jet/50 rounded-full text-white text-sm border border-cyan-500/30 flex items-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }}></span>
                            {skill.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden bg-black/40 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Canvas camera={{ position: [0, 10, 15], fov: 45 }}>
                <GalaxyScene />
            </Canvas>
        </div>
    );
}
