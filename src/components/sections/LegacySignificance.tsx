import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LegacyItem {
  id: number;
  icon: string;
  title: string;
  points: string[];
}

const LegacySignificance: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const legacyItems: LegacyItem[] = [
    {
      id: 1,
      icon: "✅",
      title: "GIẢI QUYẾT TRIỆT ĐỂ CUỘC KHỦNG HOẢNG ĐƯỜNG LỐI KÉO DÀI",
      points: [
        "Tìm ra và khẳng định con đường cứu nước duy nhất đúng đắn: Độc lập dân tộc gắn liền với Chủ nghĩa Xã hội",
        'Kết thúc thời kỳ dài "trăm năm đen tối", bế tắc về lý luận và phương hướng đấu tranh',
      ],
    },
    {
      id: 2,
      icon: "✅",
      title: "SÁNG LẬP ĐẢNG CỘNG SẢN VIỆT NAM - NHÂN TỐ THEN CHỐT",
      points: [
        'Tạo ra đội tiên phong chính trị, "là đạo đức, là văn minh", có đủ năng lực lãnh đạo toàn bộ sự nghiệp cách mạng',
        "Đảng ra đời là bước ngoặt vĩ đại, đáp ứng đòi hỏi khách quan của lịch sử, trở thành người tổ chức và lãnh đạo mọi thắng lợi",
      ],
    },
    {
      id: 3,
      icon: "✅",
      title: "ĐỂ LẠI DI SẢN TƯ TƯỞNG HỒ CHÍ MINH - NỀN TẢNG, KIM CHỈ NAM",
      points: [
        "Là sự vận dụng và phát triển sáng tạo Chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam",
        "Trở thành tài sản tinh thần vô giá, hệ tư tưởng chính thức của Đảng, soi đường cho sự nghiệp cách mạng",
      ],
    },
    {
      id: 4,
      icon: "✅",
      title: "MỞ RA THỜI ĐẠI HỒ CHÍ MINH - THỜI ĐẠI RỰC RỠ NHẤT",
      points: [
        "Đánh dấu bước chuyển từ thời đại phong kiến, thuộc địa sang thời đại mới của độc lập, tự do, thống nhất",
        "Dẫn dắt dân tộc tới những thắng lợi vĩ đại: Cách mạng Tháng Tám 1945, kháng chiến chống Pháp, chống Mỹ, thống nhất đất nước",
      ],
    },
    {
      id: 5,
      icon: "✅",
      title: "KẾT NỐI CÁCH MẠNG VIỆT NAM VỚI PHONG TRÀO CÁCH MẠNG THẾ GIỚI",
      points: [
        "Đặt cách mạng giải phóng dân tộc Việt Nam vào dòng chảy chính của cách mạng vô sản thế giới",
        "Góp phần vào cuộc đấu tranh chung của các dân tộc bị áp bức trên toàn thế giới",
      ],
    },
  ];

  return (
    <section
      id="legacy"
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Majestic golden/ceremonial background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1507] via-[#2a2010] to-[#1a1507]" />
      
      {/* Golden radiance from center */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 70%, rgba(139,0,0,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 70%, rgba(139,0,0,0.1) 0%, transparent 40%)
          `
        }}
      />
      
      {/* Trophy/achievement watermarks */}
      <div className="absolute top-20 left-20 text-[120px] text-yellow-500/5 select-none pointer-events-none">🏆</div>
      <div className="absolute bottom-20 right-20 text-[100px] text-yellow-500/5 select-none pointer-events-none">⭐</div>
      
      {/* Central star burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 45, 90, 135].map((rotation) => (
          <div 
            key={rotation}
            className="absolute top-1/2 left-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          />
        ))}
      </div>
      
      {/* Laurel wreath suggestion */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[60px] text-yellow-500/5 select-none pointer-events-none">🏅</div>
      
      {/* Elegant border */}
      <div className="absolute inset-8 border border-yellow-600/20 pointer-events-none" />
      
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
            🏆 Phần 6: Ý Nghĩa & Di Sản
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>
              Kết Quả Vĩ Đại
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Hành trình 30 năm tìm đường cứu nước của Hồ Chí Minh không chỉ thành công 
            trong việc <strong>giải phóng dân tộc</strong> mà còn để lại một{" "}
            <strong style={{ color: "var(--vietnam-red)" }}>
              di sản tư tưởng và thực tiễn vô giá
            </strong>
            , định hình vận mệnh đất nước.
          </p>
        </motion.div>

        {/* Legacy Cards */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {legacyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="rounded-2xl shadow-xl p-6 border-l-8 relative overflow-hidden"
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "var(--vietnam-red)"
                      : "var(--vietnam-white)",
                  borderColor: "var(--vietnam-gold)",
                  color:
                    index % 2 === 0
                      ? "var(--vietnam-white)"
                      : "var(--ink-black)",
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2"
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? "var(--vietnam-white)"
                          : "var(--vietnam-red)",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="text-4xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-4"
                        style={{
                          color:
                            index % 2 === 0
                              ? "var(--vietnam-gold)"
                              : "var(--vietnam-red)",
                        }}
                      >
                        {item.id}. {item.title}
                      </h3>
                      <ul className="space-y-2">
                        {item.points.map((point, pIndex) => (
                          <motion.li
                            key={pIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1 + pIndex * 0.1,
                            }}
                            className="flex items-start gap-2"
                          >
                            <span
                              style={{
                                color:
                                  index % 2 === 0
                                    ? "var(--vietnam-gold)"
                                    : "var(--vietnam-red)",
                              }}
                            >
                              •
                            </span>
                            <span
                              className="text-base leading-relaxed"
                              style={{
                                color:
                                  index % 2 === 0
                                    ? "var(--vietnam-white)"
                                    : "var(--ancient-stone)",
                              }}
                            >
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="rounded-2xl shadow-2xl p-8 md:p-12 border-4"
            style={{
              backgroundColor: "var(--vietnam-red)",
              borderColor: "var(--vietnam-gold)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                className="text-7xl"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌟
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <p
                  className="text-2xl italic mb-4 leading-relaxed"
                  style={{ color: "var(--vietnam-white)" }}
                >
                  "Không có gì quý hơn độc lập, tự do!"
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  - Chủ tịch Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Era Stats */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { icon: "🗓️", value: "1945", label: "Cách mạng Tháng Tám" },
            { icon: "⚔️", value: "1954", label: "Chiến thắng Điện Biên Phủ" },
            { icon: "🎗️", value: "1975", label: "Thống nhất đất nước" },
            { icon: "🚀", value: "1986", label: "Đổi mới toàn diện" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-xl shadow-lg border-2"
              style={{
                backgroundColor: "var(--vietnam-white)",
                borderColor: "var(--vietnam-gold)",
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div
                className="text-3xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.icon}
              </motion.div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--vietnam-red)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--ancient-stone)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LegacySignificance;
