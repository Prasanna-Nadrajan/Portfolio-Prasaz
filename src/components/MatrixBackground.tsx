import { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
    className?: string;
    color?: string;
    opacity?: number;
}

const MatrixBackground = ({
    className = "fixed inset-0 w-full h-full pointer-events-none z-0",
    color,
    opacity = 0.3
}: MatrixBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const chars = '01{}[];.<>()'.split('');
        const fontSize = 16;
        let columns = Math.floor(width / fontSize);
        let drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * (height / fontSize);
        }

        const resizeCanvas = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;

            const newColumns = Math.floor(width / fontSize);
            if (newColumns > columns) {
                for (let x = columns; x < newColumns; x++) {
                    drops[x] = Math.random() * (height / fontSize);
                }
            }
            columns = newColumns;
        };

        window.addEventListener('resize', resizeCanvas);

        let animationFrameId: number;
        let lastDrawTime = 0;
        const fps = 30;
        const interval = 1000 / fps;

        const draw = (timestamp: number) => {
            animationFrameId = requestAnimationFrame(draw);

            if (timestamp - lastDrawTime < interval) return;
            lastDrawTime = timestamp;

            // Fade existing trails
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            // Draw new characters
            ctx.globalCompositeOperation = 'source-over';

            let drawColor = color;
            if (!drawColor) {
                const computedStyle = getComputedStyle(document.documentElement);
                drawColor = computedStyle.getPropertyValue('--neon-blue').trim() || '#00BFFF';
            }

            ctx.fillStyle = drawColor;
            ctx.font = `${fontSize}px monospace`;
            ctx.globalAlpha = opacity;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            // Reset global alpha
            ctx.globalAlpha = 1.0;
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, opacity]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            aria-hidden="true"
        />
    );
};

export default MatrixBackground;
