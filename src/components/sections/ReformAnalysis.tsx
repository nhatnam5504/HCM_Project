import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabContent {
  id: string;
  title: string;
  icon: string;
  image: string | null;
  content: string[];
}

const ReformAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState("context");

  const tabs: TabContent[] = [
    {
      id: "context",
      title: "Bối Cảnh Trước 1986",
      icon: "📊",
      image: null,
      content: [
        "🔴 Lạm phát tăng cao (453% năm 1986)",
        "🔴 Sản xuất đình trệ, thiếu hụt hàng hóa trầm trọng",
        "🔴 Thâm hụt ngân sách, nợ công gia tăng",
        "🔴 Đời sống nhân dân khó khăn, tiền lương mất giá",
        "🔴 Cải cách giá-lương-tiền 1985 thất bại",
      ],
    },
    {
      id: "reform",
      title: "Đại Hội VI - 1986",
      icon: "🚀",
      image: "/img/daihoiVI_color.jpg",
      content: [
        "✨ Đổi mới tư duy kinh tế: Từ kế hoạch hóa sang thị trường",
        "✨ Công nhận nhiều thành phần kinh tế",
        "✨ Đổi mới cơ chế quản lý kinh tế",
        "✨ Mở cửa, hội nhập kinh tế quốc tế",
        "✨ Đổi mới chính trị, xã hội, văn hóa",
      ],
    },
    {
      id: "impact",
      title: "Thành Tựu 1986-1996",
      icon: "⚡",
      image: "/img/chutruongdoimoi.png",
      content: [
        "✅ GDP tăng trưởng bình quân 7-8%/năm",
        "✅ Lạm phát giảm xuống dưới 10%",
        "✅ Xuất khẩu tăng nhanh, đặc biệt gạo và dầu khí",
        "✅ Đời sống nhân dân cải thiện rõ rệt",
        "✅ Đất nước thoát khỏi khủng hoảng kinh tế - xã hội",
      ],
    },
    {
      id: "lesson",
      title: "Bài Học Kinh Nghiệm",
      icon: "📚",
      image: null,
      content: [
        "💡 Đổi mới tư duy: Từ kế hoạch hóa sang kinh tế thị trường",
        "💡 Đồng bộ hóa: Cải cách kinh tế - chính trị - xã hội",
        "💡 Kiên trì: Không ngừng đổi mới, hoàn thiện chính sách",
        "💡 Mở cửa: Hội nhập kinh tế quốc tế là tất yếu",
        "💡 Lấy dân làm gốc: Nâng cao đời sống nhân dân",
      ],
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section
      id="reform-analysis"
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--off-white)" }}
    >
      {/* Vintage Border Decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: "var(--vietnam-red)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: "var(--vietnam-red)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
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
            Phần 3.2.1 - Thuyết Trình
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>
              Đổi Mới Toàn Diện 1986 - 1996
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Đưa đất nước ra khỏi <strong>khủng hoảng kinh tế - xã hội</strong>,
            đẩy mạnh <strong>công nghiệp hóa, hiện đại hóa</strong> và{" "}
            <strong>hội nhập quốc tế</strong>
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all border-2 ${activeTab === tab.id ? "shadow-xl" : "shadow-md"
                }`}
              style={{
                backgroundColor:
                  activeTab === tab.id
                    ? "var(--vietnam-red)"
                    : "var(--vietnam-white)",
                color:
                  activeTab === tab.id
                    ? "var(--vietnam-white)"
                    : "var(--ancient-stone)",
                borderColor:
                  activeTab === tab.id
                    ? "var(--vietnam-gold)"
                    : "var(--ancient-stone)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <div
              className="shadow-xl rounded-2xl p-8 border-4"
              style={{
                backgroundColor: "var(--vietnam-white)",
                borderColor: "var(--vietnam-gold)",
              }}
            >
              {/* Image Display - Show when tab has image */}
              {currentTab.image && (
                <motion.div
                  className="mb-8 relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Vietnamese pattern background */}
                  <div
                    className="absolute -inset-4 rounded-2xl opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffd700' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Double gold frame */}
                  <div
                    className="relative rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      border: "4px solid var(--vietnam-gold)",
                      boxShadow: "0 0 0 2px var(--vietnam-red), 0 0 0 6px var(--vietnam-gold), 0 20px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    <motion.img
                      src={currentTab.image}
                      alt={currentTab.title}
                      className="w-full h-72 md:h-96 object-cover object-center"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      whileHover={{ scale: 1.02 }}
                    />

                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Image caption with gold accent */}
                  <div
                    className="mt-3 py-3 px-6 text-center font-semibold rounded-lg shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, var(--vietnam-red) 0%, #8b1a1a 100%)",
                      color: "var(--vietnam-white)",
                      borderLeft: "4px solid var(--vietnam-gold)",
                      borderRight: "4px solid var(--vietnam-gold)",
                    }}
                  >
                    {currentTab.id === "reform"
                      ? "Đại hội VI của Đảng Cộng sản Việt Nam - Tháng 12/1986"
                      : "Chủ trương đường lối Đổi mới toàn diện đất nước"}
                  </div>
                </motion.div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="text-5xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentTab.icon}
                </motion.div>
                <h3
                  className="text-3xl font-bold"
                  style={{ color: "var(--ink-black)" }}
                >
                  {currentTab.title}
                </h3>
              </div>

              <div className="space-y-4">
                {currentTab.content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl hover:shadow-md transition-all border-2"
                    style={{
                      backgroundColor: "var(--vietnam-white)",
                      borderColor: "var(--parchment-dark)",
                    }}
                  >
                    <motion.div
                      className="text-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      {item.split(" ")[0]}
                    </motion.div>
                    <p
                      className="text-lg flex-1"
                      style={{ color: "var(--ancient-stone)" }}
                    >
                      {item.split(" ").slice(1).join(" ")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Summary Box */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="rounded-2xl shadow-2xl p-8 border-4"
            style={{
              backgroundColor: "var(--vietnam-red)",
              color: "var(--vietnam-white)",
              borderColor: "var(--vietnam-gold)",
            }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🎯</span>Ý Nghĩa Lịch Sử
            </h3>
            <p className="text-lg leading-relaxed">
              Giai đoạn 1986-1996 đánh dấu <strong>bước ngoặt lịch sử</strong>{" "}
              của đất nước, khi Đảng dũng cảm đổi mới tư duy, từ bỏ cơ chế kế
              hoạch hóa tập trung sang
              <strong> kinh tế thị trường định hướng xã hội chủ nghĩa</strong>.
              10 năm đổi mới đã đưa Việt Nam thoát khỏi khủng hoảng, mở đường
              cho sự phát triển bền vững và hội nhập quốc tế sau này.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReformAnalysis;
