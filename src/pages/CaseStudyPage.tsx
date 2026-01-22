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
      title: 'Quyết Định Ra Đi Tìm Đường Cứu Nước',
      period: '1911',
      challenge:
        'Đầu thế kỷ XX, Việt Nam chìm trong đêm đen nô lệ. Các phong trào yêu nước (Cần Vương, Duy Tân, Đông Du, Yên Thế) đều thất bại. Dân tộc lâm vào khủng hoảng về đường lối cứu nước - không biết đi theo con đường nào.',
      solution:
        'Ngày 5/6/1911, chàng thanh niên Nguyễn Tất Thành (21 tuổi) quyết định ra đi từ Bến Nhà Rồng, làm phụ bếp trên tàu Amiral Latouche-Tréville với mục đích "muốn đi ra nước ngoài, xem nước Pháp và các nước khác... rồi sẽ trở về giúp đồng bào".',
      result:
        'Mở đầu hành trình 30 năm (1911-1941) qua 3 đại dương, 4 châu lục, hơn 30 quốc gia. Khác biệt với các nhà yêu nước tiền bối: Người đi sang Phương Tây - nơi có nền văn minh hiện đại và cũng là nơi xuất phát của chủ nghĩa thực dân.',
      lessons: [
        'Dám đột phá tư duy, không đi theo lối mòn',
        'Muốn hiểu kẻ thù phải đến tận nơi kẻ thù',
        'Cần kết hợp lý tưởng cao đẹp với hành động thực tiễn',
        'Thanh niên có vai trò tiên phong trong cách mạng',
      ],
      icon: '🚢',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 2,
      title: 'Giác Ngộ Chủ Nghĩa Mác-Lênin',
      period: '1917 - 1920',
      challenge:
        'Sau nhiều năm bôn ba qua Pháp, Mỹ, Anh..., Nguyễn Ái Quốc nhận thấy: cách mạng tư sản không giải phóng triệt để người lao động. Câu hỏi "cứu nước bằng con đường nào?" vẫn chưa có lời giải đáp.',
      solution:
        'Tháng 7/1920, đọc "Luận cương về vấn đề dân tộc và thuộc địa" của Lênin - Người tìm thấy con đường cứu nước. Tháng 12/1920, bỏ phiếu gia nhập Quốc tế III, tham gia sáng lập Đảng Cộng sản Pháp tại Đại hội Tours.',
      result:
        'Từ người yêu nước trở thành người Cộng sản. Xác định con đường cứu nước đúng đắn: Cách mạng vô sản - độc lập dân tộc gắn liền với chủ nghĩa xã hội, gắn cách mạng Việt Nam với cách mạng thế giới.',
      lessons: [
        'Nghiên cứu lý luận là nền tảng cho hành động cách mạng',
        'Cần đứng trên lập trường giai cấp công nhân',
        'Cách mạng thuộc địa là bộ phận của cách mạng thế giới',
        'Độc lập dân tộc phải gắn với giải phóng giai cấp',
      ],
      icon: '📖',
      color: 'from-yellow-500 to-red-600',
    },
    {
      id: 3,
      title: 'Chuẩn Bị Về Tư Tưởng, Tổ Chức, Cán Bộ',
      period: '1921 - 1929',
      challenge:
        'Đã tìm thấy con đường cứu nước, nhưng cách mạng Việt Nam thiếu 3 yếu tố then chốt: đường lối lý luận (tư tưởng), tổ chức cách mạng (đảng), và đội ngũ cán bộ nòng cốt.',
      solution:
        'Hoạt động tại Pháp, Liên Xô, Trung Quốc. Thành lập Hội Việt Nam Cách mạng Thanh niên (6/1925). Mở lớp huấn luyện cán bộ. Xuất bản "Đường Kách mệnh" (1927). Ra báo "Thanh niên".',
      result:
        'Đào tạo hàng trăm cán bộ nòng cốt (Trần Phú, Lê Hồng Phong, Hồ Tùng Mậu...). Truyền bá chủ nghĩa Mác-Lênin vào Việt Nam. Xuất hiện 3 tổ chức cộng sản năm 1929 - đòi hỏi cấp bách phải thống nhất.',
      lessons: [
        'Chuẩn bị kỹ lưỡng là điều kiện tiên quyết cho thắng lợi',
        'Đào tạo cán bộ là "gốc của mọi công việc"',
        'Lý luận phải gắn với thực tiễn Việt Nam',
        'Báo chí là vũ khí sắc bén của cách mạng',
      ],
      icon: '🎓',
      color: 'from-blue-500 to-green-500',
    },
    {
      id: 4,
      title: 'Thành Lập Đảng Cộng Sản Việt Nam',
      period: '3/2/1930',
      challenge:
        'Năm 1929, ở Việt Nam xuất hiện 3 tổ chức cộng sản hoạt động riêng rẽ (Đông Dương CS Đảng, An Nam CS Đảng, Đông Dương CS Liên đoàn). Sự chia rẽ đe dọa phong trào cách mạng.',
      solution:
        'Nguyễn Ái Quốc được Quốc tế Cộng sản giao nhiệm vụ thống nhất. Từ 6/1-7/2/1930, Người chủ trì Hội nghị hợp nhất tại Cửu Long (Hồng Kông), thành lập Đảng Cộng sản Việt Nam.',
      result:
        'Đảng ra đời với Cương lĩnh chính trị đầu tiên (Chính cương vắn tắt, Sách lược vắn tắt). CHẤM DỨT CUỘC KHỦNG HOẢNG ĐƯỜNG LỐI KÉO DÀI GẦN MỘT THẾ KỶ. Tạo nhân tố quyết định cho mọi thắng lợi.',
      lessons: [
        'Đoàn kết, thống nhất là sức mạnh vô địch',
        'Đảng là nhân tố quyết định thắng lợi của cách mạng',
        'Cương lĩnh đúng đắn là kim chỉ nam cho hành động',
        'Lãnh tụ có vai trò quyết định trong thời điểm then chốt',
      ],
      icon: '🚩',
      color: 'from-red-600 to-red-800',
    },
    {
      id: 5,
      title: 'Trở Về Tổ Quốc - Hoàn Thành Sứ Mệnh',
      period: '28/1/1941',
      challenge:
        'Thế chiến II bùng nổ (1939), Pháp đầu hàng Đức (1940), Nhật xâm nhập Đông Dương. Tình hình thế giới và trong nước biến chuyển nhanh - thời cơ cách mạng đang đến gần, cần người lãnh đạo trực tiếp.',
      solution:
        'Sau 30 năm xa Tổ quốc, ngày 28/1/1941, Nguyễn Ái Quốc (lấy tên Già Thu) vượt biên giới trở về nước tại Pác Bó, Cao Bằng. Tháng 5/1941, chủ trì Hội nghị TW 8, thành lập Mặt trận Việt Minh.',
      result:
        'Hoàn thành hành trình 30 năm tìm đường cứu nước. Trực tiếp lãnh đạo cách mạng, chuẩn bị lực lượng. Dẫn đến thắng lợi vĩ đại: Cách mạng Tháng Tám 1945, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
      lessons: [
        'Nắm bắt thời cơ là nghệ thuật của cách mạng',
        'Lãnh tụ phải gắn bó với nhân dân, với Tổ quốc',
        'Kết hợp sức mạnh dân tộc với sức mạnh thời đại',
        'Kiên trì mục tiêu, linh hoạt phương pháp',
      ],
      icon: '🏠',
      color: 'from-green-500 to-emerald-600',
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
              Hành Trình Cứu Nước
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phân tích chuyên sâu 5 bước ngoặt then chốt trong hành trình 30 năm tìm đường cứu nước của Chủ tịch Hồ Chí Minh (1911-1941)
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
              Hành Trình 30 Năm
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-red-600">🎯 Ý Nghĩa Lịch Sử</h3>
              <ul className="space-y-2">
                <li>• Tìm ra con đường cứu nước đúng đắn cho dân tộc</li>
                <li>• Giải quyết cuộc khủng hoảng đường lối kéo dài gần 100 năm</li>
                <li>• Sáng lập Đảng Cộng sản Việt Nam - nhân tố quyết định</li>
                <li>• Để lại di sản tư tưởng Hồ Chí Minh bất diệt</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-yellow-600">💪 Bài Học Cho Hôm Nay</h3>
              <ul className="space-y-2">
                <li>• Dám đổi mới tư duy, không đi theo lối mòn</li>
                <li>• Kết hợp sức mạnh dân tộc với sức mạnh thời đại</li>
                <li>• Kiên trì mục tiêu, linh hoạt phương pháp</li>
                <li>• Thanh niên phải là lực lượng tiên phong</li>
              </ul>
            </div>
          </div>
          
          {/* Quote */}
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-red-600 to-yellow-600 rounded-xl text-white">
            <p className="text-2xl italic mb-4">
              "Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn, đấy là tất cả những điều tôi hiểu."
            </p>
            <p className="font-bold text-lg">— Nguyễn Ái Quốc, 1923</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
