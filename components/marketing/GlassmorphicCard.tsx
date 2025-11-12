import { ReactNode } from "react";

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg";
  opacity?: number;
  hover?: boolean;
}

export default function GlassmorphicCard({
  children,
  className = "",
  blur = "md",
  opacity = 0.1,
  hover = true,
}: GlassmorphicCardProps) {
  const blurMap = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  };

  return (
    <div
      className={`
        relative rounded-2xl border border-white/20
        ${blurMap[blur]}
        ${hover ? "hover:border-white/40 hover:bg-white/15 transition-all duration-300" : ""}
        ${className}
      `}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0))",
          borderRadius: "inherit",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
