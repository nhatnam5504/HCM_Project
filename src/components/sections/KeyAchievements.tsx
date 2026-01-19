import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

interface Achievement {
  id: number;
  icon: string;
  title: string;
  value: number;
  suffix: string;
  description: string;
  color: string;
}

const KeyAchievements: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const achievements: Achievement[] = [
    {
      id: 1,
      icon: "📈",
      title: "Tăng Trưởng GDP",
      value: 7.5,
      suffix: "%",
      description: "Tốc độ tăng trưởng bình quân/năm (1986-1996)",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      icon: "🌾",
      title: "Xuất Khẩu Gạo",
      value: 3,
      suffix: " triệu tấn",
      description: "Từ thiếu lương thực thành nước xuất khẩu gạo",
      color: "from-green-500 to-green-700",
    },
    {
      id: 3,
      icon: "💰",
      title: "Kiểm Soát Lạm Phát",
      value: 10,
      suffix: "%",
      description: "Giảm từ 453% (1986) xuống dưới 10% (1996)",
      color: "from-red-500 to-red-700",
    },
    {
      id: 4,
      icon: "💰",
      title: "Thu Hút FDI",
      value: 8.5,
      suffix: " tỷ USD",
      description: "Vốn đầu tư nước ngoài giai đoạn 1988-1996",
      color: "from-yellow-500 to-yellow-700",
    },
    {
      id: 5,
      icon: "🌍",
      title: "Bình Thường Hóa",
      value: 1995,
      suffix: "",
      description: "Gia nhập ASEAN - Mở rộng quan hệ quốc tế",
      color: "from-purple-500 to-purple-700",
    },
    {
      id: 6,
      icon: "👥",
      title: "Cải Thiện Đời Sống",
      value: 70,
      suffix: "%",
      description: "Tỷ lệ hộ nghèo giảm đáng kể",
      color: "from-pink-500 to-pink-700",
    },
  ];

  return (
    <section
      id="achievements"
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--antique-parchment)" }}
    >
      {/* Vintage Border Decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{ backgroundColor: "var(--vietnam-gold)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-2"
        style={{ backgroundColor: "var(--vietnam-gold)" }}
      />

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
            🏆 Thành Tựu Nổi Bật
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--ink-black)" }}
          >
            10 Năm <span style={{ color: "var(--vietnam-red)" }}>Đổi Mới</span>{" "}
            (1986-1996)
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--ancient-stone)" }}
          >
            Những bước chuyển mình đáng tự hào đưa đất nước thoát khỏi khủng
            hoảng
          </p>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative"
            >
              <div
                className="rounded-2xl shadow-xl p-8 h-full relative overflow-hidden border-4"
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "var(--vietnam-red)"
                      : "var(--royal-burgundy)",
                  borderColor: "var(--vietnam-gold)",
                  color: "var(--vietnam-white)",
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2"
                    style={{ backgroundColor: "var(--vietnam-white)" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-1/2 -translate-x-1/2"
                    style={{ backgroundColor: "var(--vietnam-white)" }}
                  />
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {achievement.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4">
                    {achievement.title}
                  </h3>

                  <motion.div
                    className="text-5xl font-bold mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1 + 0.3,
                    }}
                  >
                    {isInView && (
                      <CountUp
                        end={achievement.value}
                        duration={2.5}
                        suffix={achievement.suffix}
                        separator=","
                      />
                    )}
                  </motion.div>

                  <p className="text-sm opacity-90">
                    {achievement.description}
                  </p>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
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
            className="rounded-2xl shadow-2xl p-8 md:p-12 border-l-8"
            style={{
              backgroundColor: "var(--parchment-dark)",
              borderColor: "var(--vietnam-red)",
            }}
          >
            <div className="flex items-start gap-6">
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💬
              </motion.div>
              <div>
                <p
                  className="text-2xl italic mb-4 leading-relaxed"
                  style={{ color: "var(--sepia)" }}
                >
                  "Đổi mới là con đường duy nhất để cứu đất nước khỏi nguy cơ
                  tụt hậu. Không đổi mới thì đất nước sẽ tiếp tục đói nghèo, lạc
                  hậu."
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "var(--ink-black)" }}
                >
                  - Tổng Bí thư Nguyễn Văn Linh (1986)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyAchievements;
