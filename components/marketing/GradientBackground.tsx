import { useEffect, useRef } from "react";

interface GradientBackgroundProps {
  className?: string;
  colors?: {
    start: string;
    mid: string;
    end: string;
  };
}

export default function GradientBackground({
  className = "",
  colors = {
    start: "#0f172a",
    mid: "#3b82f6",
    end: "#f97316",
  },
}: GradientBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Animate wave paths
    const paths = svg.querySelectorAll("path");
    let time = 0;

    const animate = () => {
      paths.forEach((path, index) => {
        const offset = index * 0.5;
        const phase = (time * 0.01 + offset) % (Math.PI * 2);
        const yOffset = Math.sin(phase) * 10 + Math.cos(phase * 0.5) * 5;
        path.style.transform = `translateY(${yOffset}px)`;
      });

      time++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.start} 0%, ${colors.mid} 50%, ${colors.end} 100%)`,
        }}
      />

      {/* Animated SVG Waves */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        {/* Wave 1 - Slow */}
        <path
          d="M0,300 Q300,250 600,300 T1200,300 L1200,600 L0,600 Z"
          fill="rgba(255,255,255,0.05)"
          style={{
            filter: "blur(2px)",
            transition: "all 0.3s ease-out",
          }}
        />

        {/* Wave 2 - Medium */}
        <path
          d="M0,350 Q300,300 600,350 T1200,350 L1200,600 L0,600 Z"
          fill="rgba(255,255,255,0.08)"
          style={{
            filter: "blur(3px)",
            transition: "all 0.3s ease-out",
          }}
        />

        {/* Wave 3 - Fast */}
        <path
          d="M0,400 Q300,350 600,400 T1200,400 L1200,600 L0,600 Z"
          fill="rgba(255,255,255,0.1)"
          style={{
            filter: "blur(4px)",
            transition: "all 0.3s ease-out",
          }}
        />
      </svg>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 100 + 20 + "px",
              height: Math.random() * 100 + 20 + "px",
              background: `radial-gradient(circle, ${colors.mid}, transparent)`,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + "s",
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
