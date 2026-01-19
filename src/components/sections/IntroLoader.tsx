"use client";

import { useState, useEffect, useCallback } from "react";

const introQuotes = [
  {
    line1: "Lịch sử không chỉ để nhớ…",
    line2: "Mà để tiếp lửa – dựng xây ngày mai.",
  },
  {
    line1: "1986–1996: Hai miền – Một ý chí",
    line2: "Dưới ngọn cờ Đảng – dân tộc kiên cường đi tới.",
  },
  {
    line1: "Một dân tộc – một dòng máu Việt",
    line2: "Có Đảng – có đường đi trong bão lửa.",
  },
];

export default function IntroLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<
    "loading" | "text1" | "text2" | "fadeOut" | "flag" | "complete"
  >("loading");
  const [currentQuote] = useState(
    () => introQuotes[Math.floor(Math.random() * introQuotes.length)]
  );
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [flagProgress, setFlagProgress] = useState(0);

  // Typewriter effect for line 1
  const typeText1 = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < currentQuote.line1.length) {
        setText1(currentQuote.line1.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setShowCursor1(false);
        setTimeout(() => {
          setPhase("text2");
          setShowCursor2(true);
        }, 300);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [currentQuote.line1]);

  // Typewriter effect for line 2
  const typeText2 = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < currentQuote.line2.length) {
        setText2(currentQuote.line2.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setShowCursor2(false);
        setTimeout(() => {
          setPhase("fadeOut");
        }, 1000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [currentQuote.line2]);

  useEffect(() => {
    // Initial loading phase
    const timer = setTimeout(() => {
      setPhase("text1");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "text1") {
      return typeText1();
    }
  }, [phase, typeText1]);

  useEffect(() => {
    if (phase === "text2") {
      return typeText2();
    }
  }, [phase, typeText2]);

  useEffect(() => {
    if (phase === "fadeOut") {
      // Fade out text
      const fadeInterval = setInterval(() => {
        setTextOpacity((prev) => {
          if (prev <= 0) {
            clearInterval(fadeInterval);
            setPhase("flag");
            return 0;
          }
          return prev - 0.05;
        });
      }, 30);
      return () => clearInterval(fadeInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "flag") {
      // Flag wipe animation
      const flagInterval = setInterval(() => {
        setFlagProgress((prev) => {
          if (prev >= 100) {
            clearInterval(flagInterval);
            setTimeout(() => {
              setPhase("complete");
              onComplete();
            }, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 20);
      return () => clearInterval(flagInterval);
    }
  }, [phase, onComplete]);

  if (phase === "complete") return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Main dark background with grain */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundColor: "#0b0b0b",
          opacity: phase === "flag" ? 1 - flagProgress / 100 : 1,
        }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle red gradient spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139, 26, 26, 0.3) 0%, transparent 70%)",
          }}
        />

        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />
      </div>

      {/* Text content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: textOpacity }}
      >
        {/* Decorative top element */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#C9A227]" />
          <div className="w-2 h-2 rotate-45 border border-[#C9A227]" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#C9A227]" />
        </div>

        {/* Star icon */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-[#C9A227] blur-xl opacity-30 animate-pulse" />
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-[#C9A227] relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Line 1 */}
        <div className="text-center mb-4 min-h-[2rem] md:min-h-[3rem]">
          <p
            className="text-xl md:text-3xl lg:text-4xl text-white/90 tracking-wide"
            style={{
              fontFamily: "var(--font-playfair), 'Times New Roman', serif",
              textShadow: "0 0 40px rgba(201, 162, 39, 0.3)",
            }}
          >
            {text1}
            {showCursor1 && (
              <span className="animate-pulse text-[#C9A227]">|</span>
            )}
          </p>
        </div>

        {/* Line 2 */}
        <div className="text-center min-h-[2rem] md:min-h-[3rem]">
          <p
            className="text-lg md:text-2xl lg:text-3xl text-[#C9A227] tracking-wide italic"
            style={{
              fontFamily: "var(--font-playfair), 'Times New Roman', serif",
              textShadow: "0 0 30px rgba(201, 162, 39, 0.4)",
            }}
          >
            {text2}
            {showCursor2 && <span className="animate-pulse text-white">|</span>}
          </p>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-8 flex items-center gap-4">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#C9A227]" />
          <div className="w-2 h-2 rotate-45 border border-[#C9A227]" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#C9A227]" />
        </div>

        {/* Year badge */}
        <div className="mt-12 px-6 py-2 border border-[#C9A227]/30 rounded-full">
          <span className="text-[#C9A227]/70 text-sm md:text-base tracking-[0.3em] font-light">
            1986 — 1996
          </span>
        </div>
      </div>

      {/* Flag wipe transition */}
      {phase === "flag" && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `polygon(0 0, ${flagProgress}% 0, ${flagProgress}% 100%, 0 100%)`,
          }}
        >
          {/* Red flag background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#DA251D",
              backgroundImage: `
                linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)
              `,
              backgroundSize: "60px 60px",
            }}
          >
            {/* Waving effect overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(90deg, 
                    rgba(0,0,0,0.2) 0%, 
                    rgba(255,255,255,0.1) 20%, 
                    rgba(0,0,0,0.15) 40%,
                    rgba(255,255,255,0.1) 60%,
                    rgba(0,0,0,0.2) 80%,
                    rgba(255,255,255,0.05) 100%
                  )
                `,
                animation: "wave 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* Yellow star */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 text-[#FFCD00] drop-shadow-2xl"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                filter: "drop-shadow(0 0 30px rgba(255, 205, 0, 0.5))",
                animation: "starPulse 1.5s ease-in-out infinite",
              }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          {/* Grain overlay on flag */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      {/* Loading indicator */}
      {phase === "loading" && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#C9A227] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
