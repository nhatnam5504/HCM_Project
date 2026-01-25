import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabContent {
  id: string;
  title: string;
  icon: string;
  content: string[];
}

const HistoricalContext: React.FC = () => {
  const [activeTab, setActiveTab] = useState("oppression");

  const tabs: TabContent[] = [
    {
      id: "oppression",
      title: "Ách Đô Hộ Thực Dân",
      icon: "🔴",
      content: [
        "🔴 Từ năm 1858, thực dân Pháp cai trị hà khắc, bóc lột triệt để",
        "🔴 Đàn áp văn hóa, tinh thần dân tộc tàn nhẫn",
        "🔴 Mâu thuẫn dân tộc và giai cấp ngày càng gay gắt",
      ],
    },
    {
      id: "movements",
      title: "Các Phong Trào Thất Bại",
      icon: "⚠️",
      content: [
        "⚔️ Cần Vương (1885-1896): Khởi nghĩa vũ trang theo đường lối cũ, thất bại",
        "📚 Đông Du, Duy Tân: Dựa vào Nhật/Pháp - không đúng đắn",
        "🏔️ Yên Thế (1884-1913): Tự phát, thiếu tổ chức vững chắc",
      ],
    },
    {
      id: "crisis",
      title: "Khủng Hoảng Đường Lối",
      icon: "🔴",
      content: [
        "❓ Chưa tìm ra con đường cứu nước đúng đắn",
        "🏛️ Hệ tư tưởng phong kiến bất lực, tư sản không phù hợp",
        "🌟 Nguyễn Tất Thành (sinh 1890) sớm thấm thía nỗi đau mất nước",
      ],
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section
      id="historical-context"
      className="py-20 relative overflow-hidden"
    >
      {/* Solemn Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-[#ede5d8] to-[#f5f0e8]" />

      {/* Traditional Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(139,0,0,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(139,0,0,0.3) 0%, transparent 50%)
          `
        }}
      />

      {/* Decorative lotus pattern */}
      <div className="absolute top-10 left-10 text-[120px] text-red-900/5 select-none pointer-events-none">❀</div>
      <div className="absolute bottom-10 right-10 text-[120px] text-red-900/5 select-none pointer-events-none rotate-180">❀</div>

      {/* Top and Bottom Border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent" />

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
            } as React.CSSProperties}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Phần 1: Bối Cảnh Lịch Sử
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>
              Việt Nam Cuối Thế Kỷ XIX - Đầu Thế Kỷ XX
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Khủng Hoảng Và Bế Tắc - Trước khi Nguyễn Tất Thành ra đi tìm đường cứu nước,{" "}
            <strong>dân tộc Việt Nam đang chìm trong đêm đen nô lệ</strong> và khủng hoảng
            trầm trọng về con đường giải phóng.
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
              } as React.CSSProperties}
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
                    } as React.CSSProperties}
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

        {/* Quote Box */}
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
              borderColor: "var(--vietnam-gold)",
            }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💭
              </motion.div>
              <p
                className="text-xl italic font-medium leading-relaxed"
                style={{ color: "var(--vietnam-white)" }}
              >
                "Thanh niên Nguyễn Tất Thành sinh ra và lớn lên trong bối cảnh ấy,
                sớm thấm thía nỗi đau mất nước và day dứt trước sự thất bại của các bậc tiền bối."
              </p>
              <p
                className="mt-4 font-bold"
                style={{ color: "var(--vietnam-gold)" }}
              >
                - Bối cảnh lịch sử đầu thế kỷ XX
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HistoricalContext;
