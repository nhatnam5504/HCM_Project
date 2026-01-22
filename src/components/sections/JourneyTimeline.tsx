import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  location: string;
  work: string;
  insight: string;
}

const JourneyTimeline: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      year: "5/6/1911",
      location: "Bến Nhà Rồng, Sài Gòn → Marseille (Pháp)",
      work: "Làm phụ bếp trên tàu Amiral Latouche-Tréville với tên Văn Ba",
      insight: "Khởi đầu lịch sử: Chàng thanh niên 21 tuổi Nguyễn Tất Thành rời Tổ quốc với quyết tâm 'muốn đi ra nước ngoài, xem nước Pháp và các nước khác... rồi sẽ trở về giúp đồng bào'. Đây là bước ngoặt đầu tiên trong hành trình 30 năm tìm đường cứu nước.",
    },
    {
      year: "1911-1912",
      location: "Marseille → Le Havre → Các cảng biển Pháp, Bắc Phi, Tây Ban Nha",
      work: "Tiếp tục làm phụ bếp trên các tàu buôn, đi qua nhiều nước thuộc địa của Pháp",
      insight: "Chứng kiến thực tế đời sống nhân dân thuộc địa ở nhiều nơi: Algeria, Tunisia, Congo, Dahomey, Senegal... Nhận ra sự bóc lột tàn bạo của chủ nghĩa thực dân không chỉ ở Việt Nam mà trên toàn thế giới.",
    },
    {
      year: "1912-1913",
      location: "Hoa Kỳ (New York, Boston)",
      work: "Làm đủ nghề: cào tuyết, bồi bàn, làm vườn, phụ bếp trong khách sạn",
      insight: "Nghiên cứu lịch sử Mỹ, tìm hiểu Tuyên ngôn Độc lập 1776. Tại đây, Người nhận thấy: 'Dù sao thì cách mạng Mỹ cũng chỉ giải phóng cho một bộ phận dân cư'. Người da đen vẫn bị phân biệt đối xử, người lao động vẫn khổ cực.",
    },
    {
      year: "1913-1914",
      location: "Anh quốc (London)",
      work: "Làm thợ đốt lò, quét tuyết, rửa bát trong khách sạn Carlton",
      insight: "Trải nghiệm cuộc sống cực khổ của giai cấp công nhân ngay tại 'trái tim' của đế quốc tư bản hùng mạnh nhất. Người đọc nhiều sách báo, học tiếng Anh. Kết luận quan trọng: Cách mạng tư sản không giải phóng triệt để người lao động.",
    },
    {
      year: "1914-1917",
      location: "London → Paris (khi Thế chiến I bùng nổ)",
      work: "Tiếp tục lao động, quan sát chiến tranh đế quốc",
      insight: "Chứng kiến Đại chiến Thế giới lần I - cuộc chiến tranh giữa các nước đế quốc. Nhận thức: Chiến tranh là sản phẩm của chủ nghĩa tư bản, gây đau khổ cho nhân dân lao động các nước.",
    },
    {
      year: "1917",
      location: "Paris, Pháp",
      work: "Tham gia nhóm người Việt yêu nước, viết báo, tham gia Đảng Xã hội Pháp",
      insight: "Tiếp nhận thông tin về Cách mạng Tháng Mười Nga (7/11/1917) thắng lợi. Sự kiện này mở ra cho Người hướng đi mới - con đường cách mạng vô sản, khác với các cuộc cách mạng tư sản mà Người đã nghiên cứu trước đó.",
    },
  ];

  const destinations = [
    { name: "Bến Nhà Rồng", flag: "vn", year: "5/6/1911" },
    { name: "Marseille", flag: "fr", year: "1911" },
    { name: "Dakar", flag: "sn", year: "1911" },
    { name: "Algeria", flag: "dz", year: "1911-1912" },
    { name: "New York", flag: "us", year: "1912-1913" },
    { name: "Boston", flag: "us", year: "1913" },
    { name: "London", flag: "gb", year: "1913-1917" },
    { name: "Paris", flag: "fr", year: "1917" },
  ];

  return (
    <section
      id="journey"
      className="py-20 relative overflow-hidden"
    >
      {/* Warm sepia/parchment background for the journey */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1810] via-[#3d2517] to-[#2a1810]" />
      
      {/* Vintage map pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(212,175,55,0.15) 40px,
              rgba(212,175,55,0.15) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(212,175,55,0.08) 40px,
              rgba(212,175,55,0.08) 41px
            )
          `
        }}
      />
      
      {/* Ship silhouettes */}
      <div className="absolute top-20 right-20 text-[100px] text-yellow-500/10 select-none pointer-events-none">🚢</div>
      <div className="absolute bottom-40 left-10 text-[80px] text-yellow-500/10 select-none pointer-events-none">⚓</div>
      
      {/* Compass rose watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] text-yellow-500/5 select-none pointer-events-none">✦</div>
      
      {/* World map suggestion */}
      <div className="absolute top-1/3 left-1/4 text-[150px] text-yellow-600/5 select-none pointer-events-none">🌍</div>
      
      {/* Gold border decorations */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-yellow-500 to-red-800" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-yellow-500 to-red-800" />

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
            🚢 Phần 2: Hành Trình Bôn Ba (1911 - 1917)
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>
              Vạn Dặm Xa Khơi
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Với khát vọng cháy bỏng{" "}
            <strong style={{ color: "var(--vietnam-red)" }}>
              "Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi"
            </strong>
            , chàng thanh niên 21 tuổi đã làm phụ bếp trên tàu buôn, bắt đầu hành trình 
            qua ba đại dương, bốn châu lục.
          </p>
        </motion.div>

        {/* Interactive Map - Destination Cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -10 }}
              className="px-6 py-4 rounded-xl shadow-lg border-2 cursor-pointer"
              style={{
                backgroundColor: index === 0 ? "var(--vietnam-red)" : "var(--vietnam-white)",
                color: index === 0 ? "var(--vietnam-white)" : "var(--ink-black)",
                borderColor: "var(--vietnam-gold)",
              }}
            >
              <div className="text-center">
                <span className={`fi fi-${dest.flag} text-3xl mb-2`}></span>
                <div className="font-bold">{dest.name}</div>
                <div className="text-sm opacity-70">{dest.year}</div>
              </div>
            </motion.div>
          ))}
          
          {/* Animated connecting line */}
          <motion.div
            className="hidden lg:flex items-center gap-2 absolute top-24 left-1/2 -translate-x-1/2 text-4xl"
            style={{ color: "var(--vietnam-gold)" }}
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            →→→→→
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative mb-8"
            >
              <div
                className="rounded-2xl shadow-xl p-6 border-l-8"
                style={{
                  backgroundColor: "var(--vietnam-white)",
                  borderColor: index % 2 === 0 ? "var(--vietnam-red)" : "var(--vietnam-gold)",
                }}
              >
                <div className="grid md:grid-cols-4 gap-4">
                  {/* Year */}
                  <div className="text-center md:text-left">
                    <motion.div
                      className="text-3xl font-bold"
                      style={{ color: "var(--vietnam-red)" }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {item.year}
                    </motion.div>
                    <div
                      className="text-sm font-semibold mt-1"
                      style={{ color: "var(--ancient-stone)" }}
                    >
                      📍 {item.location}
                    </div>
                  </div>

                  {/* Work */}
                  <div className="md:col-span-1">
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--vietnam-gold)" }}
                    >
                      💼 Công Việc
                    </div>
                    <p style={{ color: "var(--ancient-stone)" }}>
                      {item.work}
                    </p>
                  </div>

                  {/* Insight */}
                  <div className="md:col-span-2">
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--vietnam-red)" }}
                    >
                      💡 Nhận Thức / Sự Kiện Quan Trọng
                    </div>
                    <p
                      className="font-medium"
                      style={{ color: "var(--ink-black)" }}
                    >
                      {item.insight}
                    </p>
                  </div>
                </div>

                {/* Decorative icon */}
                <motion.div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-4xl hidden md:block"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {index === 0 ? "🚢" : index === 1 ? "🌍" : index === 2 ? "💼" : "📰"}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Box */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
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
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-5xl mb-2">🌊</div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  3
                </div>
                <div style={{ color: "var(--vietnam-white)" }}>Đại Dương</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <div className="text-5xl mb-2">🗺️</div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  4
                </div>
                <div style={{ color: "var(--vietnam-white)" }}>Châu Lục</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <div className="text-5xl mb-2">💪</div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  6+
                </div>
                <div style={{ color: "var(--vietnam-white)" }}>Nghề Nghiệp</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
