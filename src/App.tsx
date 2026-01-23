import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";

import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import QuizAdminPage from "./pages/QuizAdminPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import LibraryPage from "./pages/LibraryPage";
import MiniGamePage from "./pages/MiniGamePage";
import HCMStrategyPage from "./pages/HCMStrategyPage";
import AIUsagePage from "./pages/AIUsagePage";
import YNghiaPage from "./pages/YNghiaPage";
import VideoExplanationPage from "./pages/VideoExplanationPage";
import IntroLoader from "./components/sections/IntroLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if intro has been shown in this session
    const introShown = sessionStorage.getItem("introShown");
    if (introShown) {
      setShowIntro(false);
      setShowContent(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowContent(true);
    // Mark intro as shown for this session
    sessionStorage.setItem("introShown", "true");
  };

  useEffect(() => {
    // DISABLED ScrollSmoother - it was blocking scroll events for ScrollToTop button
    // Using normal scroll with ScrollTrigger instead

    // Advanced scroll animations with stagger
    const sections = gsap.utils.toArray<HTMLElement>(".animate-section");
    sections.forEach((section) => {
      const elements = section.querySelectorAll(".animate-item");

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    });

    // Parallax backgrounds
    gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((bg) => {
      gsap.to(bg, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: bg,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {showIntro && <IntroLoader onComplete={handleIntroComplete} />}

      <div
        className={`transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"
          }`}
        style={{ visibility: showContent ? "visible" : "hidden" }}
      >
        <Router>


          <Routes>
            {/* Library page with its own layout (no header/footer wrapper) */}
            <Route path="/thu-vien" element={<LibraryPage />} />

            {/* All other pages with standard layout */}
            <Route
              path="*"
              element={
                <div
                  ref={smoothWrapper}
                  id="smooth-wrapper"
                  className="min-h-screen"
                >
                  <div ref={smoothContent} id="smooth-content">
                    <div className="bg-gradient-to-br from-red-50 via-yellow-50 to-white">
                      <Header />
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/quiz" element={<QuizPage />} />
                        <Route path="/quiz-admin" element={<QuizAdminPage />} />
                        <Route path="/case-study" element={<CaseStudyPage />} />
                        <Route path="/minigame" element={<MiniGamePage />} />
                        <Route path="/hcm-strategy" element={<HCMStrategyPage />} />
                        <Route path="/y-nghia" element={<YNghiaPage />} />
                        <Route
                          path="/video-giai-thich"
                          element={<VideoExplanationPage />}
                        />
                        <Route path="/ai-ho-tro" element={<AIUsagePage />} />
                      </Routes>
                      <Footer />
                      <ScrollToTop />
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
