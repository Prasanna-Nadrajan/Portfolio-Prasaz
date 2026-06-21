import React, { useRef, useEffect } from 'react';

const NetworkGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Optimize canvas context
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Theme tracking for responsive colors
    let isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    const observer = new MutationObserver(() => {
      isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Set internal canvas resolution
    const width = 1200;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;

    const radius = 500; // Sphere radius
    const numNodes = 1000; // Denser nodes for structured mesh
    const nodes: { id: number, x: number, y: number, z: number }[] = [];
    const connections: [number, number][] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle for Fibonacci sphere

    // Initialize nodes with Fibonacci sphere distribution
    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({
        id: i,
        x: x * radius,
        y: y * radius,
        z: z * radius
      });
    }

    // Pre-calculate connections based on 3D distance
    // Average distance between nodes is ~70 for 700 nodes at 500 radius. 
    // Setting maxDistance to 85 connects closest neighbors into triangles.
    const maxDistance = 85;
    const maxDistSq = maxDistance * maxDistance;

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq) {
          connections.push([i, j]);
        }
      }
    }

    let angleX = 0;
    let angleY = 0;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth slow rotation
      angleX += 0.0003;
      angleY += 0.0012;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project nodes from 3D to 2D
      const projectedNodes = nodes.map(node => {
        // Rotate around X axis
        const y1 = node.y * cosX - node.z * sinX;
        const z1 = node.y * sinX + node.z * cosX;

        // Rotate around Y axis
        const x2 = node.x * cosY + z1 * sinY;
        const z2 = -node.x * sinY + z1 * cosY;
        const y2 = y1;

        // Perspective projection
        const focalLength = 1200;
        const perspective = focalLength / (focalLength + z2);

        return {
          id: node.id,
          x: (x2 * perspective) + width / 2,
          y: (y2 * perspective) + height / 2,
          z: z2,
          scale: perspective,
          // Strong depth-fading: 1 at front (-radius), drops to 0 halfway through back
          alpha: Math.max(0, 1 - (z2 + radius) / (1.6 * radius))
        };
      });

      // Fast lookup for drawing connections
      const projectedNodesMap = new Map();
      for (let i = 0; i < projectedNodes.length; i++) {
        projectedNodesMap.set(projectedNodes[i].id, projectedNodes[i]);
      }

      // Draw connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < connections.length; i++) {
        const [id1, id2] = connections[i];
        const n1 = projectedNodesMap.get(id1);
        const n2 = projectedNodesMap.get(id2);

        const avgAlpha = (n1.alpha + n2.alpha) / 2;

        // Skip drawing if lines are faded out (performance & aesthetics)
        if (avgAlpha > 0.05) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          
          // Theme-aware line color: Pale cyan in dark mode, Deep teal in light mode
          const r = isLightMode ? 15 : 45;
          const g = isLightMode ? 118 : 212;
          const b = isLightMode ? 110 : 191;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${avgAlpha * 0.4})`;
          ctx.stroke();
        }
      }

      // Draw nodes
      // Sort by Z depth so front nodes draw over back nodes
      projectedNodes.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projectedNodes.length; i++) {
        const node = projectedNodes[i];
        if (node.alpha > 0.05) {
          // Sharp inner core
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2 * node.scale, 0, Math.PI * 2);
          
          // Theme-aware node color: White in dark mode, Dark grey/black in light mode
          const nr = isLightMode ? 12 : 255;
          const ng = isLightMode ? 12 : 255;
          const nb = isLightMode ? 11 : 255;
          ctx.fillStyle = `rgba(${nr}, ${ng}, ${nb}, ${node.alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '0%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '1200px',
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
};

export default NetworkGlobe;
