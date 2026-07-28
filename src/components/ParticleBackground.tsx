import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles setup - subtle floating neon lime & gold dust
    const particleCount = Math.min(Math.floor(width / 30), 40);
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      pulse: number;
    }> = [];

    const colors = [
      'rgba(163, 230, 53, ',  // EYFI Neon Lime
      'rgba(251, 191, 36, ',  // EYFI Gold
      'rgba(255, 255, 255, ', // Soft White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.15,
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.1;
        const drawAlpha = Math.max(0.05, Math.min(0.6, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${drawAlpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `${p.color}0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Exact EYFI Pure Dark Background */}
      <div className="absolute inset-0 bg-[#09090B]" />
      
      {/* EYFI Signature Dotted Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1.2px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle Ambient Radial Neon Lime Glow */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[15%] w-[600px] h-[600px] bg-[#FF5500]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating 3D EYFI Green Coins (Matching EYFI Brand Screenshots) */}
      <div className="hidden lg:block absolute top-[15%] left-[3%] w-20 h-20 rounded-full bg-gradient-to-br from-[#A3E635] to-[#65A30D] p-1 shadow-2xl shadow-lime-500/20 opacity-30 transform -rotate-12 animate-bounce" style={{ animationDuration: '6s' }}>
        <div className="w-full h-full rounded-full border-4 border-black/30 flex items-center justify-center font-black text-zinc-950 text-2xl">
          ₹
        </div>
      </div>
      <div className="hidden lg:block absolute top-[55%] right-[2%] w-24 h-24 rounded-full bg-gradient-to-br from-[#A3E635] to-[#4D7C0F] p-1 shadow-2xl shadow-lime-500/20 opacity-25 transform rotate-45 animate-bounce" style={{ animationDuration: '8s' }}>
        <div className="w-full h-full rounded-full border-4 border-black/30 flex items-center justify-center font-black text-zinc-950 text-3xl">
          ₹
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-[10%] left-[5%] w-16 h-16 rounded-full bg-gradient-to-br from-[#A3E635] to-[#65A30D] p-1 shadow-2xl shadow-lime-500/20 opacity-20 transform -rotate-45 animate-pulse">
        <div className="w-full h-full rounded-full border-2 border-black/30 flex items-center justify-center font-black text-zinc-950 text-xl">
          ₹
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  );
};

