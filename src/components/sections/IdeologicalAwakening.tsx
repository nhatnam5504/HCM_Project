import React from "react";
import { motion } from "framer-motion";

const IdeologicalAwakening: React.FC = () => {
  const flowSteps = [
    {
      id: 1,
      icon: "🔥",
      title: "1917: Ảnh Hưởng Từ Cách Mạng Tháng Mười Nga",
      content:
        "Ngày 7/11/1917, cuộc cách mạng do Lênin lãnh đạo đã lật đổ chế độ Nga Hoàng, thành lập nhà nước Xô Viết - nhà nước công nông đầu tiên trên thế giới. Sự kiện này 'như tiếng sét' làm thức tỉnh phong trào cách mạng trên toàn thế giới, thu hút sự chú ý của Nguyễn Ái Quốc đang hoạt động tại Paris.",
      color: "var(--vietnam-red)",
      isHighlight: false,
    },
    {
      id: 2,
      icon: "📝",
      title: "1919: Bản Yêu Sách 8 Điểm Gửi Hội Nghị Versailles",
      content:
        "Tháng 6/1919, thay mặt nhóm người Việt Nam yêu nước tại Pháp, Nguyễn Ái Quốc gửi 'Bản yêu sách của nhân dân An Nam' đến Hội nghị Versailles, đòi các quyền tự do, dân chủ cho nhân dân Việt Nam. Dù không được đáp ứng, sự kiện này khẳng định tên tuổi Nguyễn Ái Quốc trên chính trường quốc tế và cho Người bài học: Không thể trông chờ vào lòng tốt của đế quốc.",
      color: "var(--vietnam-gold)",
      isHighlight: false,
    },
    {
      id: 3,
      icon: "📖",
      title: "Mùa Hè 1920: Đọc Luận Cương Của Lênin - Bước Ngoặt Lịch Sử",
      content:
        'Tháng 7/1920, Nguyễn Ái Quốc đọc "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa" của Lênin đăng trên báo L\'Humanité. Luận cương khẳng định cách mạng thuộc địa là bộ phận không thể tách rời của cách mạng vô sản thế giới.',
      quote:
        '"Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao!... Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!"',
      quoteAuthor: "- Hồ Chí Minh",
      color: "var(--vietnam-gold)",
      isHighlight: true,
    },
    {
      id: 4,
      icon: "🎯",
      title: "Tháng 12/1920: Sáng Lập Đảng Cộng Sản Pháp Tại Tours",
      content:
        "Tại Đại hội Đảng Xã hội Pháp ở thành phố Tours (25-30/12/1920), Nguyễn Ái Quốc bỏ phiếu tán thành gia nhập Quốc tế Cộng sản (Quốc tế III) và tham gia sáng lập Đảng Cộng sản Pháp. Sự kiện này đánh dấu Người trở thành một trong những người Cộng sản đầu tiên của Việt Nam.",
      color: "var(--vietnam-red)",
      isHighlight: false,
    },
    {
      id: 5,
      icon: "🏛️",
      title: "1921-1923: Hoạt Động Tại Pháp",
      content:
        "Sáng lập Hội Liên hiệp Thuộc địa (1921). Làm chủ bút báo 'Le Paria' (Người cùng khổ). Viết nhiều bài báo tố cáo tội ác thực dân, tuyên truyền chủ nghĩa Mác-Lênin. Tham gia Đại hội V Quốc tế Cộng sản (Moscow, 1924) - trình bày về phương Đông và cách mạng thuộc địa.",
      color: "var(--vietnam-gold)",
      isHighlight: false,
    },
    {
      id: 6,
      icon: "🇷🇺",
      title: "1923-1924: Hoạt Động Tại Liên Xô - Đào Tạo Lý Luận",
      content:
        "Tháng 6/1923, Nguyễn Ái Quốc tới Moscow (Liên Xô). Học tập tại Trường Đại học Phương Đông - nơi đào tạo cán bộ cách mạng cho các nước thuộc địa. Nghiên cứu sâu chủ nghĩa Mác-Lênin, kinh nghiệm xây dựng Đảng, lãnh đạo cách mạng. Hoạt động trong Quốc tế Cộng sản, Ban Phương Đông.",
      color: "var(--vietnam-red)",
      isHighlight: false,
    },
    {
      id: 7,
      icon: "🌟",
      title: "Kết Luận: Xác Định Con Đường Cứu Nước Đúng Đắn",
      content:
        "Từ đây, Người khẳng định: Con đường duy nhất đúng đắn để giải phóng dân tộc Việt Nam là con đường Cách mạng Vô sản - tức là tiến hành cuộc cách mạng do giai cấp công nhân lãnh đạo, kết hợp độc lập dân tộc với Chủ nghĩa Xã hội, gắn cách mạng Việt Nam với cách mạng thế giới.",
      color: "var(--vietnam-gold)",
      isHighlight: false,
    },
  ];

  return (
    <section
      id="awakening"
      className="py-20 relative overflow-hidden"
    >
      {/* Enlightenment-themed background - dawn colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6e3] via-[#fff8e7] to-[#fef3cd]" />
      
      {/* Radiant light effect from center */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(255,200,0,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(185,28,28,0.1) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Book/Document watermarks */}
      <div className="absolute top-20 left-20 text-[150px] text-amber-600/5 select-none pointer-events-none">📜</div>
      <div className="absolute bottom-20 right-20 text-[120px] text-red-800/5 select-none pointer-events-none">💡</div>
      
      {/* Star burst pattern - enlightenment symbol */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[600px] rounded-full border border-amber-300/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-300/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-amber-300/10" />
      </div>
      
      {/* Border decorations */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 text-sm font-semibold mb-4 border-2"
            style={{
              backgroundColor: "var(--parchment-dark)",
              color: "var(--vietnam-red)",
              borderColor: "var(--vietnam-red)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡 Phần 3: Giác Ngộ Lý Tưởng (1917 - 1924)
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>Bước Ngoặt Tư Tưởng</span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Tại Paris - trung tâm văn hóa, chính trị châu Âu, Nguyễn Ái Quốc đã tiếp cận và 
            say mê nghiên cứu lý luận cách mạng tiên tiến nhất thời đại, tìm thấy{" "}
            <strong style={{ color: "var(--vietnam-red)" }}>"cẩm nang thần kỳ"</strong> cho 
            con đường giải phóng dân tộc.
          </p>
        </motion.div>

        {/* Flow Chart */}
        <div className="max-w-4xl mx-auto">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative mb-8"
            >
              {/* Connector Line */}
              {index < flowSteps.length - 1 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-1 z-0"
                  style={{ backgroundColor: "var(--vietnam-gold)" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.3, delay: index * 0.15 + 0.3 }}
                />
              )}

              {/* Step Card */}
              <motion.div
                className={`rounded-2xl shadow-xl p-8 border-4 relative z-10 ${
                  step.isHighlight ? "transform scale-105" : ""
                }`}
                style={{
                  backgroundColor: step.isHighlight
                    ? "var(--vietnam-red)"
                    : "var(--vietnam-white)",
                  borderColor: step.color,
                  color: step.isHighlight
                    ? "var(--vietnam-white)"
                    : "var(--ink-black)",
                }}
                whileHover={{ scale: step.isHighlight ? 1.07 : 1.02 }}
              >
                {/* Step Number Badge */}
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg"
                  style={{
                    backgroundColor: step.isHighlight
                      ? "var(--vietnam-gold)"
                      : "var(--vietnam-red)",
                    color: step.isHighlight
                      ? "var(--ink-black)"
                      : "var(--vietnam-white)",
                  }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  {step.icon}
                </motion.div>

                <div className="ml-8">
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      color: step.isHighlight
                        ? "var(--vietnam-gold)"
                        : "var(--vietnam-red)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed mb-4"
                    style={{
                      color: step.isHighlight
                        ? "var(--vietnam-white)"
                        : "var(--ancient-stone)",
                    }}
                  >
                    {step.content}
                  </p>

                  {/* Quote if exists */}
                  {step.quote && (
                    <motion.div
                      className="mt-6 p-4 rounded-xl"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderLeft: "4px solid var(--vietnam-gold)",
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <p
                        className="text-lg italic font-medium"
                        style={{ color: "var(--vietnam-gold)" }}
                      >
                        {step.quote}
                      </p>
                      <p
                        className="mt-2 font-bold"
                        style={{ color: "var(--vietnam-white)" }}
                      >
                        {step.quoteAuthor}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Arrow Indicator */}
              {index < flowSteps.length - 1 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-3xl z-20"
                  style={{ color: "var(--vietnam-gold)" }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ↓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Insight Box */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="rounded-2xl shadow-2xl p-8 text-center border-4"
            style={{
              backgroundColor: "var(--parchment-dark)",
              borderColor: "var(--vietnam-red)",
            }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--vietnam-red)" }}
            >
              Bước Ngoặt Lịch Sử
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--ancient-stone)" }}
            >
              Từ một thanh niên yêu nước mang hoài bão tìm đường cứu nước, 
              Nguyễn Ái Quốc đã trở thành <strong>người Cộng sản</strong>, 
              tìm thấy <strong>con đường giải phóng dân tộc</strong> đúng đắn - 
              <span style={{ color: "var(--vietnam-red)" }}> Con đường Cách mạng Vô sản</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IdeologicalAwakening;
