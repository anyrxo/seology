import { useEffect, useRef } from "react";

interface AnimatedBlobProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function AnimatedBlob({
  className = "",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316"],
  speed = 8,
}: AnimatedBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let time = 0;
    const blobs = [
      {
        x: canvas.width / (2 * window.devicePixelRatio) * 0.3,
        y: canvas.height / (2 * window.devicePixelRatio) * 0.3,
        radius: 150,
        color: colors[0],
        offsetX: 0,
        offsetY: 0,
      },
      {
        x: canvas.width / (2 * window.devicePixelRatio) * 0.7,
        y: canvas.height / (2 * window.devicePixelRatio) * 0.4,
        radius: 120,
        color: colors[1],
        offsetX: 0,
        offsetY: 0,
      },
      {
        x: canvas.width / (2 * window.devicePixelRatio) * 0.5,
        y: canvas.height / (2 * window.devicePixelRatio) * 0.7,
        radius: 140,
        color: colors[2],
        offsetX: 0,
        offsetY: 0,
      },
      {
        x: canvas.width / (2 * window.devicePixelRatio) * 0.2,
        y: canvas.height / (2 * window.devicePixelRatio) * 0.6,
        radius: 100,
        color: colors[3],
        offsetX: 0,
        offsetY: 0,
      },
    ];

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      color: string,
      offsetX: number,
      offsetY: number
    ) => {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6;

      const points = 8;
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const distance =
          radius +
          Math.sin(time * 0.001 * speed + angle * 3) * 30 +
          Math.sin(time * 0.0005 * speed + angle) * 20;

        const px = x + Math.cos(angle) * distance + offsetX;
        const py = y + Math.sin(angle) * distance + offsetY;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      ctx.fillRect(
        0,
        0,
        canvas.width / window.devicePixelRatio,
        canvas.height / window.devicePixelRatio
      );

      // Update blob positions
      blobs.forEach((blob, index) => {
        blob.offsetX = Math.sin(time * 0.0003 * speed + index) * 40;
        blob.offsetY = Math.cos(time * 0.0004 * speed + index) * 40;

        drawBlob(
          blob.x,
          blob.y,
          blob.radius,
          blob.color,
          blob.offsetX,
          blob.offsetY
        );
      });

      // Apply blur filter
      ctx.filter = "blur(40px)";
      ctx.globalCompositeOperation = "screen";

      time++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ filter: "blur(40px)" }}
    />
  );
}
