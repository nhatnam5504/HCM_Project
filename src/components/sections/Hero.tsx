import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin, DrawSVGPlugin);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const flagRef = useRef<HTMLDivElement>(null);
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

      // Flag wave with realistic physics
      if (flagRef.current) {
        gsap.to(flagRef.current, {
          x: 20,
          y: -20,
          rotation: 5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Add ripple effect
        gsap.to(flagRef.current, {
          skewX: 5,
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

      // Background blobs animation - only if elements exist
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

      // Sparkles animation - only if elements exist
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
      style={{ backgroundColor: "var(--antique-parchment)" }}
    >
      {/* Animated Banner Background with slow zoom */}
      <div
        className="absolute inset-0 hero-banner-bg"
        style={{
          backgroundImage: "url('/img/bannner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Red to Gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/60 to-yellow-900/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Vintage Border Decoration */}
      <div className="absolute inset-0 overflow-hidden parallax-bg">
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: "var(--vietnam-red)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ backgroundColor: "var(--vietnam-red)" }}
        />
        <div
          className="absolute top-0 left-0 bottom-0 w-2"
          style={{ backgroundColor: "var(--vietnam-red)" }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-2"
          style={{ backgroundColor: "var(--vietnam-red)" }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-item">
              <div
                className="inline-block mb-6 px-4 py-2 text-sm font-semibold shadow-lg border-2"
                style={{
                  backgroundColor: "var(--vietnam-red)",
                  color: "var(--vietnam-white)",
                  borderColor: "var(--vietnam-gold)",
                }}
              >
                🇻🇳 Chương 3: Đảng lãnh đạo cả nước quá độ lên CNXH và tiến hành
                công cuộc đổi mới
              </div>

              <h1
                ref={titleRef}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg"
                style={{ color: "var(--vietnam-white)" }}
              >
                <span className="word inline-block">Đổi</span>{" "}
                <span className="word inline-block">Mới</span>{" "}
                <span className="word inline-block">Toàn</span>{" "}
                <span className="word inline-block">Diện</span>{" "}
                <span
                  className="word inline-block"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  1986 - 1996
                </span>
              </h1>

              <p
                ref={textRef}
                className="text-xl mb-8 leading-relaxed font-medium drop-shadow-md"
                style={{ color: "var(--vietnam-white)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  3.2.1.
                </span>{" "}
                Đưa đất nước ra khỏi khủng hoảng kinh tế - xã hội, đẩy mạnh công
                nghiệp hóa, hiện đại hóa và hội nhập quốc tế
              </p>

              <div ref={buttonsRef} className="flex flex-wrap gap-4">
                <a
                  href="#reform-analysis"
                  className="px-8 py-4 font-semibold shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-block border-2"
                  style={{
                    backgroundColor: "var(--vietnam-red)",
                    color: "var(--vietnam-white)",
                    borderColor: "var(--vietnam-gold)",
                  }}
                >
                  Tìm Hiểu Đổi Mới →
                </a>
                <a
                  href="#achievements"
                  className="px-8 py-4 border-2 font-semibold transition-all cursor-pointer inline-block"
                  style={{
                    backgroundColor: "var(--vietnam-white)",
                    borderColor: "var(--vietnam-red)",
                    color: "var(--vietnam-red)",
                  }}
                >
                  Thành Tựu
                </a>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center animate-item bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div
                    className="text-3xl font-bold drop-shadow-lg"
                    style={{ color: "var(--vietnam-gold)" }}
                  >
                    1986
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--vietnam-white)" }}
                  >
                    Đại Hội VI - Khởi Đầu Đổi Mới
                  </div>
                </div>
                <div className="text-center animate-item bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div
                    className="text-3xl font-bold drop-shadow-lg"
                    style={{ color: "var(--vietnam-gold)" }}
                  >
                    1996
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--vietnam-white)" }}
                  >
                    Ra Khỏi Khủng Hoảng
                  </div>
                </div>
                <div className="text-center animate-item bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div
                    className="text-3xl font-bold drop-shadow-lg"
                    style={{ color: "var(--vietnam-gold)" }}
                  >
                    10 Năm
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--vietnam-white)" }}
                  >
                    Đổi Mới Toàn Diện
                  </div>
                </div>
              </div>
            </div>

            {/* Right - 3D Floating Elements */}
            <div
              ref={floatingElementsRef}
              className="relative h-[600px] animate-item"
            >
              {/* Floating Star */}
              <div
                ref={starRef}
                className="floating-item absolute top-20 left-20 z-10"
              >
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    backgroundColor: "var(--vietnam-gold)",
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                >
                  <span className="text-4xl">⭐</span>
                </div>
              </div>

              {/* Flag */}
              <div
                ref={flagRef}
                className="floating-item absolute top-40 right-20"
              >
                <div
                  className="w-48 h-32 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: "var(--vietnam-red)" }}
                >
                  <span className="text-6xl relative z-10">🇻🇳</span>
                </div>
              </div>

              {/* Floating Documents */}
              <div
                className="floating-item absolute bottom-40 left-10 w-40 h-48 shadow-2xl p-4 border-2"
                style={{
                  backgroundColor: "var(--parchment-dark)",
                  borderColor: "var(--sepia)",
                }}
              >
                <div
                  className="w-full h-full rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--antique-parchment)" }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📜</div>
                    <div
                      className="text-xs font-semibold"
                      style={{ color: "var(--sepia)" }}
                    >
                      Đại Hội VI
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--ancient-stone)" }}
                    >
                      1986
                    </div>
                  </div>
                </div>
              </div>

              {/* Gear Animation */}
              <div className="floating-item absolute bottom-20 right-10">
                <div
                  className="w-24 h-24 border-8 rounded-full flex items-center justify-center"
                  style={{ borderColor: "var(--vietnam-red)" }}
                >
                  <div className="text-3xl">⚙️</div>
                </div>
              </div>

              {/* Sparkles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="sparkle absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "var(--vietnam-gold)",
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-item">
        <div className="text-center">
          <div
            className="text-sm mb-2 drop-shadow-md"
            style={{ color: "var(--vietnam-white)" }}
          >
            Cuộn xuống để khám phá
          </div>
          <div className="text-2xl text-white drop-shadow-lg">↓</div>
        </div>
      </div>
    </section>
  );
};
