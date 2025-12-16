import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize Canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Star Properties
        const stars: { x: number; y: number; z: number; size: number }[] = [];
        const numStars = window.innerWidth < 768 ? 50 : 200; // Reduced density for mobile
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - centerX,
                y: Math.random() * canvas.height - centerY,
                z: Math.random() * canvas.width,
                size: Math.random() * 2
            });
        }

        // Mouse Parallax
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - centerX) * 0.05;
            mouseY = (e.clientY - centerY) * 0.05;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            // Clear canvas with slight trail effect (optional, or just clear)
            ctx.fillStyle = 'rgba(0, 5, 10, 0.3)'; // Deep space fade

            // Actually, for transparent background over CSS gradient, we should use clearRect
            // But if we want trails, we need fillRect. 
            // The user wants "Interactive Particle Background".
            // Let's use clearRect to keep it clean and overlay on existing CSS backgrounds if any.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            ctx.fillStyle = '#ffffff';

            stars.forEach((star) => {
                // Move stars towards viewer (Z decreases)
                star.z -= 2; // Speed

                // Reset star if it passes the viewer
                if (star.z <= 0) {
                    star.z = canvas.width;
                    star.x = Math.random() * canvas.width - cx;
                    star.y = Math.random() * canvas.height - cy;
                }

                // Project 3D coordinates to 2D
                const x = (star.x - mouseX) * (canvas.width / star.z) + cx;
                const y = (star.y - mouseY) * (canvas.width / star.z) + cy;

                // Size scales with proximity
                const size = (1 - star.z / canvas.width) * 3;

                // Draw Star
                // Check bounds to avoid drawing outside (optional optimization)
                if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
                    // Opacity based on Z
                    const alpha = 1 - (star.z / canvas.width);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Connect nearby stars (Constellation effect - optional, adds "tech" feel)
            // Skipping for "Warp Speed" effect which is cleaner for movement.

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{
                // Ensure it sits behind everything but enables seeing the CSS gradient behind it
                // We'll set mix-blend-mode if needed, but normal transparency is fine.
            }}
        />
    );
};

export default ParticleBackground;
