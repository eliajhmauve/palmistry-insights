import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 600);
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-cosmos-gradient transition-opacity duration-600 ${exiting ? "animate-splash-exit" : ""}`}
      style={{ background: "radial-gradient(ellipse at 20% 30%, hsl(230 60% 15%), transparent 50%), radial-gradient(ellipse at 80% 70%, hsl(280 40% 12%), transparent 50%), hsl(var(--cosmos))" }}
    >
      {/* Floating particles */}
      <Particles />

      {/* Main palm SVG */}
      <div className="relative animate-palm-glow">
        <svg
          viewBox="0 0 220 280"
          width="200"
          height="260"
          className="relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Palm outline */}
          <path
            d="M70 240 C50 240 35 220 35 200 L35 130 C35 118 44 110 56 110 C60 110 64 112 67 115 L67 80 C67 68 76 60 88 60 C94 60 99 63 103 68 L103 55 C103 43 112 35 124 35 C136 35 145 43 145 55 L145 68 C149 63 154 60 160 60 C172 60 181 68 181 80 L181 115 C184 112 188 110 192 110 C204 110 213 118 213 130 L213 200 C213 220 198 240 178 240 Z"
            stroke="hsl(43 96% 48%)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="hsl(43 96% 8% / 0.3)"
          />
          {/* Life line */}
          <path
            d="M78 170 Q65 150 68 120 Q72 95 88 80"
            stroke="hsl(43 96% 65%)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-line-draw"
            fill="none"
          />
          {/* Head line */}
          <path
            d="M75 155 Q110 148 150 155 Q165 158 175 165"
            stroke="hsl(210 100% 65%)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-line-draw-delay"
            fill="none"
          />
          {/* Heart line */}
          <path
            d="M80 135 Q110 125 145 128 Q165 130 178 138"
            stroke="hsl(0 85% 65%)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-line-draw-delay2"
            fill="none"
          />
          {/* Fate line */}
          <path
            d="M124 230 Q122 200 124 170 Q126 145 128 120"
            stroke="hsl(155 60% 55%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-line-draw"
            fill="none"
            style={{ animationDelay: "0.4s" }}
          />
          {/* Wrist lines */}
          <path
            d="M65 248 Q124 242 183 248"
            stroke="hsl(43 96% 48%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-line-draw"
            fill="none"
            style={{ animationDelay: "0.8s" }}
          />
          <path
            d="M60 258 Q124 252 188 258"
            stroke="hsl(43 96% 48% / 0.5)"
            strokeWidth="1"
            strokeLinecap="round"
            className="animate-line-draw"
            fill="none"
            style={{ animationDelay: "1s" }}
          />
          {/* Energy glow points */}
          {[
            [88, 80], [124, 55], [160, 60], [192, 110],
            [78, 170], [124, 200]
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              fill="hsl(43 96% 70%)"
              opacity="0"
              className="animate-fade-in-slow"
              style={{ animationDelay: `${0.8 + i * 0.1}s`, animationFillMode: "forwards" }}
            />
          ))}
        </svg>

        {/* Glow behind palm */}
        <div
          className="absolute inset-0 rounded-full opacity-30 animate-pulse-gold"
          style={{
            background: "radial-gradient(circle, hsl(43 96% 48% / 0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Title */}
      <div className="mt-8 text-center animate-fade-up" style={{ animationDelay: "0.8s", animationFillMode: "both", opacity: 0 }}>
        <p className="text-glow-gold text-2xl font-black tracking-[0.2em] mb-1">掌紋命運觀測站</p>
        <p className="text-gold-light text-sm tracking-[0.4em] opacity-80">PALM DESTINY OBSERVATORY</p>
      </div>

      {/* Subtitle */}
      <div className="mt-4 animate-fade-up" style={{ animationDelay: "1.2s", animationFillMode: "both", opacity: 0 }}>
        <p className="text-gold-light/60 text-xs tracking-widest">福青施老師 · 解讀掌中的生命軌跡</p>
      </div>
    </div>
  );
}

function Particles() {
  const particles = [
    { x: "10%", y: "20%", size: 3, delay: "0s" },
    { x: "85%", y: "15%", size: 2, delay: "0.3s" },
    { x: "20%", y: "75%", size: 4, delay: "0.6s" },
    { x: "75%", y: "80%", size: 2, delay: "0.9s" },
    { x: "50%", y: "10%", size: 3, delay: "1.2s" },
    { x: "90%", y: "55%", size: 2, delay: "0.4s" },
    { x: "5%", y: "50%", size: 3, delay: "0.7s" },
    { x: "40%", y: "90%", size: 2, delay: "1s" },
    { x: "60%", y: "30%", size: 2, delay: "0.2s" },
    { x: "30%", y: "40%", size: 3, delay: "0.8s" },
    { x: "70%", y: "65%", size: 2, delay: "1.1s" },
    { x: "15%", y: "88%", size: 4, delay: "0.5s" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: p.x,
            top: p.y,
            width: p.size * 2,
            height: p.size * 2,
            background: i % 3 === 0
              ? "hsl(43 96% 65%)"
              : i % 3 === 1
              ? "hsl(210 100% 70%)"
              : "hsl(0 85% 65%)",
            boxShadow: `0 0 ${p.size * 4}px currentColor`,
            animationDelay: p.delay,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
