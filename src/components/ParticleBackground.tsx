import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Skip canvas entirely on mobile — CSS star layers already handle it,
        // and canvas on mobile is a significant battery/GPU drain.
        if (window.innerWidth < 768) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- Cached geometry (only updated on resize, never inside rAF) ---
        let canvasW = window.innerWidth;
        let canvasH = window.innerHeight;
        let cx = canvasW / 2;
        let cy = canvasH / 2;

        const resizeCanvas = () => {
            canvasW = window.innerWidth;
            canvasH = window.innerHeight;
            cx = canvasW / 2;
            cy = canvasH / 2;
            canvas.width = canvasW;
            canvas.height = canvasH;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        // --- Stars ---
        const numStars = 150; // fixed count — mobile already returns early
        const stars: { x: number; y: number; z: number }[] = [];

        const resetStar = (star: typeof stars[0]) => {
            star.x = Math.random() * canvasW - cx;
            star.y = Math.random() * canvasH - cy;
            star.z = Math.random() * canvasW;
        };

        for (let i = 0; i < numStars; i++) {
            const star = { x: 0, y: 0, z: 0 };
            resetStar(star);
            stars.push(star);
        }

        // --- Mouse parallax (throttled via rAF flag) ---
        let mouseX = 0;
        let mouseY = 0;
        let mousePending = false;
        let pendingX = 0;
        let pendingY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            pendingX = (e.clientX - cx) * 0.05;
            pendingY = (e.clientY - cy) * 0.05;
            mousePending = true;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // --- Animation loop ---
        let animationFrameId: number;

        const animate = () => {
            // Consume pending mouse update once per frame (avoids thrashing)
            if (mousePending) {
                mouseX = pendingX;
                mouseY = pendingY;
                mousePending = false;
            }

            ctx.clearRect(0, 0, canvasW, canvasH);

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                // Move star toward viewer
                star.z -= 2;
                if (star.z <= 0) {
                    resetStar(star);
                    star.z = canvasW;
                }

                // Project 3D → 2D
                const scale = canvasW / star.z;
                const x = (star.x - mouseX) * scale + cx;
                const y = (star.y - mouseY) * scale + cy;

                // Skip out-of-bounds stars (avoids wasted drawing)
                if (x < 0 || x > canvasW || y < 0 || y > canvasH) continue;

                const alpha = 1 - star.z / canvasW;
                const size = alpha * 2.5;

                // Set style per-star (alpha changes), but keep it minimal
                ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

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
                // Promote to own compositor layer — prevents layout-triggered repaints
                willChange: 'transform',
            }}
            aria-hidden="true"
        />
    );
};

export default ParticleBackground;
