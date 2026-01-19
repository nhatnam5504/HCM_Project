import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: number;
  title: string;
  period: string;
  challenge: string;
  solution: string;
  result: string;
  lessons: string[];
  icon: string;
  color: string;
}

const CaseStudyPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: 'Khủng Hoảng Kinh Tế 1975-1985',
      period: '1975 - 1985',
      challenge:
        'Sau thống nhất, nền kinh tế Việt Nam rơi vào khủng hoảng nghiêm trọng với lạm phát cao, thiếu hụt lương thực, và cơ chế kế hoạch hóa tập trung bộc lộ nhiều bất cập.',
      solution:
        'Đảng quyết định thực hiện cải cách giá-lương-tiền (1985) và chuẩn bị cho đổi mới toàn diện. Điều chỉnh chính sách kinh tế, cho phép thành phần kinh tế tư nhân phát triển.',
      result:
        'Lạm phát giảm dần, sản xuất hàng hóa tăng, đời sống người dân cải thiện. Tạo nền tảng cho Đổi Mới 1986.',
      lessons: [
        'Cần linh hoạt trong chính sách kinh tế',
        'Kế hoạch hóa tập trung cứng nhắc không phù hợp',
        'Phải tôn trọng quy luật thị trường',
        'Cải cách phải mạnh dạn và quyết liệt',
      ],
      icon: '💰',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 2,
      title: 'Đổi Mới 1986 - Bước Ngoặt Lịch Sử',
      period: '1986 - 1990',
      challenge:
        'Nền kinh tế trì trệ, bao cấp lạc hậu, người dân thiếu đói, đất nước tụt hậu so với khu vực. Nguy cơ khủng hoảng toàn diện.',
      solution:
        'Đại hội VI (1986) quyết định đổi mới toàn diện: chuyển sang kinh tế thị trường định hướng XHCN, phát triển nhiều thành phần kinh tế, mở cửa hội nhập.',
      result:
        'GDP tăng trưởng trung bình 6-7%/năm. Xuất khẩu gạo tăng mạnh. Thu hút FDI. Đời sống người dân cải thiện rõ rệt.',
      lessons: [
        'Đổi mới tư duy là then chốt',
        'Kinh tế thị trường có thể kết hợp với XHCN',
        'Hội nhập quốc tế là tất yếu',
        'Cải cách phải đồng bộ và toàn diện',
      ],
      icon: '🚀',
      color: 'from-yellow-500 to-red-600',
    },
    {
      id: 3,
      title: 'Hội Nhập WTO 2006',
      period: '2001 - 2007',
      challenge:
        'Để gia nhập WTO, Việt Nam phải đáp ứng hàng trăm cam kết, cải cách thể chế, mở cửa thị trường - nhiều lo ngại về tác động tiêu cực.',
      solution:
        'Đảng lãnh đạo cải cách pháp luật, hiện đại hóa hệ thống quản lý, đào tạo nguồn nhân lực, đàm phán khéo léo để bảo vệ lợi ích quốc gia.',
      result:
        'Chính thức gia nhập WTO (2007). Kim ngạch xuất khẩu tăng gấp 3 lần sau 10 năm. FDI tăng mạnh. Vị thế quốc tế nâng cao.',
      lessons: [
        'Hội nhập là cơ hội không phải thách thức',
        'Cần chuẩn bị kỹ lưỡng trước khi mở cửa',
        'Phải biết kết hợp lợi ích quốc gia và quốc tế',
        'Thể chế tốt thu hút đầu tư',
      ],
      icon: '🌐',
      color: 'from-blue-500 to-green-500',
    },
    {
      id: 4,
      title: 'Khủng Hoảng Tài Chính Toàn Cầu 2008',
      period: '2008 - 2010',
      challenge:
        'Khủng hoảng tài chính toàn cầu làm xuất khẩu giảm, FDI sụt giảm, nhiều doanh nghiệp phá sản, thất nghiệp tăng cao.',
      solution:
        'Chính phủ nhanh chóng triển khai gói kích cầu 120.000 tỷ đồng, hỗ trợ DN, đẩy mạnh đầu tư công, ổn định kinh tế vĩ mô.',
      result:
        'Việt Nam là một trong số ít quốc gia duy trì tăng trưởng dương trong khủng hoảng (5.3% năm 2009). Nhanh chóng phục hồi.',
      lessons: [
        'Phản ứng nhanh là then chốt',
        'Vai trò của Nhà nước trong khủng hoảng',
        'Nền kinh tế đa dạng giúp chống chịu tốt',
        'Hợp tác quốc tế rất quan trọng',
      ],
      icon: '📈',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.case-header', {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power3.out',
      });

      const cards = gsap.utils.toArray<HTMLElement>('.case-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="case-header text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Case Study{' '}
            <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              Lịch Sử
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phân tích chuyên sâu các thời điểm then chốt trong quá trình đổi mới của Đảng và đất nước
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="case-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left - Icon & Info */}
                <div className={`bg-gradient-to-br ${study.color} p-8 text-white`}>
                  <div className="text-6xl mb-4">{study.icon}</div>
                  <h2 className="text-3xl font-bold mb-2">{study.title}</h2>
                  <div className="text-lg opacity-90">{study.period}</div>
                </div>

                {/* Right - Details */}
                <div className="md:col-span-2 p-8">
                  {/* Challenge */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-red-600 mb-2">⚠️ Thách Thức</h3>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-yellow-600 mb-2">💡 Giải Pháp</h3>
                    <p className="text-gray-700">{study.solution}</p>
                  </div>

                  {/* Result */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-green-600 mb-2">✅ Kết Quả</h3>
                    <p className="text-gray-700">{study.result}</p>
                  </div>

                  {/* Lessons */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-3">📚 Bài Học Rút Ra</h3>
                    <ul className="space-y-2">
                      {study.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Tổng Kết{' '}
            <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              Kinh Nghiệm Lãnh Đạo
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-red-600">🎯 Điểm Chung</h3>
              <ul className="space-y-2">
                <li>• Dám đổi mới, dám nghĩ, dám làm</li>
                <li>• Lấy dân làm gốc, vì lợi ích nhân dân</li>
                <li>• Kết hợp sức mạnh dân tộc với thời đại</li>
                <li>• Kiên định mục tiêu, linh hoạt phương pháp</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-yellow-600">💪 Yếu Tố Thành Công</h3>
              <ul className="space-y-2">
                <li>• Lãnh đạo sáng suốt của Đảng</li>
                <li>• Đồng lòng của toàn dân tộc</li>
                <li>• Hội nhập và học hỏi quốc tế</li>
                <li>• Cải cách đồng bộ, toàn diện</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
