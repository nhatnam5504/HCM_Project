import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const HeroHCM: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate title with SplitText effect
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        if (words && words.length > 0) {
          tl.fromTo(
            words,
            { opacity: 0, y: 100, rotationX: -90 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              stagger: 0.1,
            },
            0.3
          );
        }
      }

      // Animate paragraph
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.6
        );
      }

      // Animate buttons with elastic effect
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll("button, a");
        if (buttons && buttons.length > 0) {
          tl.fromTo(
            buttons,
            { opacity: 0, scale: 0, rotation: -45 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            0.9
          );
        }
      }

      // Animate stats with counter
      if (statsRef.current && statsRef.current.children.length > 0) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          1.2
        );
      }

      // Continuous animations
      // 3D Floating star with morphing
      if (starRef.current) {
        gsap.to(starRef.current, {
          y: -30,
          rotation: 360,
          scale: 1.1,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Add subtle 3D rotation
        gsap.to(starRef.current, {
          rotationY: 360,
          duration: 10,
          repeat: -1,
          ease: "none",
        });
      }

      // Ship wave animation
      if (shipRef.current) {
        gsap.to(shipRef.current, {
          x: 20,
          y: -15,
          rotation: 3,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Add wave motion
        gsap.to(shipRef.current, {
          skewX: 2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Floating elements parallax
      if (floatingElementsRef.current) {
        const elements =
          floatingElementsRef.current.querySelectorAll(".floating-item");
        if (elements && elements.length > 0) {
          elements.forEach((elem, i) => {
            gsap.to(elem, {
              y: `${(i + 1) * -20}`,
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          });
        }
      }

      // Background blobs animation
      const blobs = document.querySelectorAll(".blob");
      if (blobs && blobs.length > 0) {
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            x: `${Math.sin(i) * 50}`,
            y: `${Math.cos(i) * 50}`,
            scale: 1.2,
            duration: 8 + i * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // Sparkles animation
      const sparkles = document.querySelectorAll(".sparkle");
      if (sparkles && sparkles.length > 0) {
        sparkles.forEach((sparkle, i) => {
          gsap.to(sparkle, {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            delay: i * 0.3,
            ease: "power2.inOut",
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 animate-section"
      data-speed="0.5"
    >
      {/* Solemn Dark Red Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#2d0a0a] to-[#1a0000]" />
      
      {/* Traditional Vietnamese Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(212,175,55,0.1) 20px,
              rgba(212,175,55,0.1) 21px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(212,175,55,0.1) 20px,
              rgba(212,175,55,0.1) 21px
            )
          `
        }}
      />

      {/* Subtle radial glow from center */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/30 via-transparent to-transparent" />

      {/* Gold border frame */}
      <div className="absolute inset-4 md:inset-8 border-2 border-yellow-600/30 pointer-events-none" />
      <div className="absolute inset-6 md:inset-10 border border-yellow-600/20 pointer-events-none" />
      
      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-l-4 border-t-4 border-yellow-500/50" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-r-4 border-t-4 border-yellow-500/50" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-l-4 border-b-4 border-yellow-500/50" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-r-4 border-b-4 border-yellow-500/50" />

      {/* Star symbol watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          ref={starRef}
          className="text-[300px] md:text-[500px] text-yellow-500/5 select-none"
          style={{ fontFamily: 'serif' }}
        >
          ★
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Top Badge */}
          <div className="mb-8 animate-item">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-600/20 via-yellow-500/30 to-yellow-600/20 border border-yellow-500/50 backdrop-blur-sm">
              <span className="text-2xl">🇻🇳</span>
              <span className="text-yellow-400 font-semibold tracking-widest text-sm uppercase">
                Hành Trình 30 Năm Tìm Đường Cứu Nước
              </span>
              <span className="text-2xl">🇻🇳</span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-item"
            style={{ 
              fontFamily: "'Times New Roman', serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            <span className="word inline-block text-white">Theo</span>{" "}
            <span className="word inline-block text-white">Dấu</span>{" "}
            <span className="word inline-block text-white">Chân</span>
            <br />
            <span 
              className="word inline-block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
            >
              Bác Hồ
            </span>
          </h1>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-item">
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-yellow-500" />
            <div className="text-yellow-500 text-2xl">★</div>
            <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-yellow-500" />
          </div>

          {/* Quote */}
          <div
            ref={textRef}
            className="text-xl md:text-2xl mb-10 leading-relaxed animate-item max-w-3xl mx-auto"
          >
            <span className="text-yellow-400 text-4xl leading-none">"</span>
            <span className="text-yellow-300 font-medium italic">
              Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi
            </span>
            <span className="text-yellow-400 text-4xl leading-none">"</span>
            <p className="text-gray-300 mt-4 text-lg font-light">
              Hành trình vạn dặm từ Bến Nhà Rồng đến ánh sáng của Chủ nghĩa Mác-Lênin
            </p>
          </div>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-6 mb-16 animate-item">
            <a
              href="#historical-context"
              className="group px-10 py-4 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white font-semibold shadow-xl hover:shadow-red-500/30 transition-all duration-300 border-2 border-yellow-500/50 hover:border-yellow-400"
            >
              <span className="flex items-center gap-3">
                <span>Khám Phá Hành Trình</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
            <a
              href="#legacy"
              className="group px-10 py-4 bg-transparent text-yellow-400 font-semibold transition-all duration-300 border-2 border-yellow-500/50 hover:border-yellow-400 hover:bg-yellow-400/10"
            >
              <span className="flex items-center gap-3">
                <span>Ý Nghĩa Di Sản</span>
                <span className="group-hover:translate-x-1 transition-transform">☆</span>
              </span>
            </a>
          </div>

          {/* Timeline Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto animate-item">
            <div className="text-center p-6 bg-gradient-to-b from-white/5 to-transparent border border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'serif' }}>
                1911
              </div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">
                Ra Đi Tìm Đường
              </div>
              <div className="mt-2 text-2xl">🚢</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-white/5 to-transparent border border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'serif' }}>
                1920
              </div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">
                Giác Ngộ Lý Tưởng
              </div>
              <div className="mt-2 text-2xl">📜</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-white/5 to-transparent border border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'serif' }}>
                1930
              </div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">
                Thành Lập Đảng
              </div>
              <div className="mt-2 text-2xl">⭐</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-white/5 to-transparent border border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'serif' }}>
                1941
              </div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">
                Trở Về Tổ Quốc
              </div>
              <div className="mt-2 text-2xl">🏠</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-item">
        <div className="text-center">
          <div className="text-sm mb-3 text-gray-400 tracking-wider uppercase">
            Cuộn xuống để khám phá
          </div>
          <div className="w-6 h-10 border-2 border-yellow-500/50 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-yellow-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Hidden floating elements for animation refs */}
      <div ref={floatingElementsRef} className="hidden">
        <div className="floating-item" />
      </div>
      <div ref={shipRef} className="hidden" />
    </section>
  );
};

export default HeroHCM;
