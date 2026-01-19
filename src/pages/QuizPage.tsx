import React, { useEffect, useRef } from 'react';
import InteractiveQuiz from '../components/sections/InteractiveQuiz';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QuizPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.quiz-header', {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.quiz-content', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="quiz-header text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Kiểm Tra Kiến Thức{' '}
            <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              Lịch Sử Đảng
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hãy thử thách kiến thức của bạn về giai đoạn đổi mới 1975-2018 thông qua các câu hỏi
            tương tác thú vị!
          </p>
        </div>

        {/* Quiz Component */}
        <div className="quiz-content">
          <InteractiveQuiz />
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">10+</div>
              <div className="text-gray-700">Câu Hỏi Thú Vị</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">5</div>
              <div className="text-gray-700">Cấp Độ Khó</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">∞</div>
              <div className="text-gray-700">Lần Làm Lại</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
