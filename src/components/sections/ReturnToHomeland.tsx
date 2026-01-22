import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  icon: string;
  location: string;
  content: string;
  significance?: string;
  quote?: string;
  quoteAuthor?: string;
  isHighlight?: boolean;
}

const ReturnToHomeland: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      year: "1930-1931",
      title: "Cao Trào Cách Mạng Xô Viết Nghệ Tĩnh",
      icon: "🔥",
      location: "Nghệ An - Hà Tĩnh, Việt Nam",
      content:
        "Sau khi Đảng ra đời, phong trào cách mạng bùng nổ mạnh mẽ. Cao trào Xô Viết Nghệ Tĩnh (1930-1931) - đỉnh cao của phong trào công nông trong thời kỳ này. Lần đầu tiên, chính quyền Xô Viết công nông được thành lập ở một số địa phương.",
      significance:
        "Cuộc diễn tập đầu tiên của cách mạng Việt Nam, khẳng định sức mạnh của quần chúng dưới sự lãnh đạo của Đảng.",
    },
    {
      year: "1931-1933",
      title: "Nguyễn Ái Quốc Bị Bắt Tại Hồng Kông",
      icon: "⚖️",
      location: "Hồng Kông",
      content:
        "Tháng 6/1931, Nguyễn Ái Quốc bị cảnh sát Anh bắt tại Hồng Kông. Nhờ sự giúp đỡ của luật sư tiến bộ Frank Loseby và phong trào quốc tế đấu tranh, Người được trả tự do năm 1933.",
      significance:
        "Trong thời gian này, Đảng Cộng sản Đông Dương chịu tổn thất nặng nề do khủng bố trắng của thực dân. Nhiều lãnh đạo như Trần Phú, Lê Hồng Phong bị bắt hoặc hy sinh.",
    },
    {
      year: "1934-1938",
      title: "Trở Lại Liên Xô - Tiếp Tục Học Tập",
      icon: "🎓",
      location: "Moscow, Liên Xô",
      content:
        "Năm 1934, Nguyễn Ái Quốc trở lại Liên Xô, học tập tại Trường Quốc tế Lênin (1934-1935). Nghiên cứu sâu thêm chủ nghĩa Mác-Lênin, kinh nghiệm xây dựng Đảng và phong trào cộng sản quốc tế.",
      significance:
        "Giai đoạn củng cố lý luận, chờ thời cơ thuận lợi để trở về nước trực tiếp lãnh đạo cách mạng.",
    },
    {
      year: "1938-1940",
      title: "Từ Liên Xô Trở Về Trung Quốc",
      icon: "🚂",
      location: "Diên An → Quế Lâm → Côn Minh, Trung Quốc",
      content:
        "Cuối năm 1938, Nguyễn Ái Quốc rời Liên Xô về Trung Quốc. Hoạt động tại Diên An (căn cứ địa của Đảng Cộng sản Trung Quốc), sau đó di chuyển đến Quế Lâm, Côn Minh để tìm cách bắt liên lạc với Đảng trong nước.",
      significance:
        "Tình hình thế giới biến chuyển - Thế chiến II bùng nổ (1939), Pháp đầu hàng Đức (1940), Nhật xâm nhập Đông Dương - tạo thời cơ mới cho cách mạng Việt Nam.",
    },
    {
      year: "28/1/1941",
      title: "TRỞ VỀ TỔ QUỐC - PÁC BÓ, CAO BẰNG",
      icon: "🏠",
      location: "Pác Bó, xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng",
      content:
        "Sau 30 năm bôn ba tìm đường cứu nước (1911-1941), ngày 28/1/1941 (mùng 2 Tết Tân Tỵ), Nguyễn Ái Quốc - lúc này lấy tên Già Thu - đã bước qua cột mốc 108 biên giới Việt-Trung, đặt chân trở lại Tổ quốc tại Pác Bó, Cao Bằng.",
      quote:
        '"Sáng hồng bên suối in thơ Đảng, Tối lạnh bên đèn dịch sử Đảng..."',
      quoteAuthor: "- Thơ Bác tại hang Pác Bó",
      significance:
        "Đây là thời khắc lịch sử vô cùng quan trọng - Người về nước để TRỰC TIẾP lãnh đạo cách mạng Việt Nam trong giai đoạn quyết định.",
      isHighlight: true,
    },
    {
      year: "5/1941",
      title: "Hội Nghị Trung Ương 8 - Thành Lập Mặt Trận Việt Minh",
      icon: "🚩",
      location: "Khuổi Nậm, Pác Bó, Cao Bằng",
      content:
        "Từ ngày 10-19/5/1941, Hội nghị lần thứ 8 Ban Chấp hành Trung ương Đảng họp tại Khuổi Nậm do Nguyễn Ái Quốc chủ trì. Thành lập Mặt trận Việt Nam Độc lập Đồng minh (gọi tắt là Việt Minh) ngày 19/5/1941.",
      significance:
        "Xác định nhiệm vụ trước mắt: Giải phóng dân tộc là nhiệm vụ bức thiết nhất. Chuẩn bị lực lượng, đón thời cơ khởi nghĩa giành chính quyền.",
    },
    {
      year: "1941-1945",
      title: "Xây Dựng Lực Lượng, Chuẩn Bị Khởi Nghĩa",
      icon: "⚔️",
      location: "Cao Bằng - Việt Bắc",
      content:
        "Xây dựng căn cứ địa cách mạng, phát triển lực lượng vũ trang. Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (22/12/1944) - tiền thân của Quân đội nhân dân Việt Nam. Chuẩn bị mọi điều kiện cho Tổng khởi nghĩa.",
      significance:
        "Từ hang Pác Bó, từ rừng Việt Bắc, ngọn lửa cách mạng lan tỏa khắp cả nước, dẫn đến thắng lợi vĩ đại của Cách mạng Tháng Tám 1945.",
    },
  ];

  return (
    <section
      id="return-homeland"
      className="py-20 relative overflow-hidden"
    >
      {/* Warm homeland background - deep red with golden accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0808] via-[#2d1010] to-[#1a0808]" />
      
      {/* Mountain silhouette overlay in warm tones */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
        style={{
          background: `
            linear-gradient(175deg, transparent 40%, rgba(139,69,19,0.4) 60%),
            linear-gradient(185deg, transparent 50%, rgba(139,69,19,0.3) 70%)
          `
        }}
      />
      
      {/* Vietnamese symbols */}
      <div className="absolute top-10 left-10 text-[120px] text-yellow-500/5 select-none pointer-events-none">🇻🇳</div>
      <div className="absolute bottom-10 right-10 text-[100px] text-yellow-500/5 select-none pointer-events-none">🏔️</div>
      
      {/* Home symbol watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] text-yellow-500/5 select-none pointer-events-none">🏠</div>
      
      {/* Star symbol - representing Vietnam */}
      <div className="absolute top-1/3 right-20 text-[100px] text-red-500/5 select-none pointer-events-none">★</div>
      <div className="absolute bottom-1/3 left-20 text-[80px] text-yellow-500/5 select-none pointer-events-none">⛰️</div>
      
      {/* Border decorations - all red and yellow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />

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
            🏠 Phần 5: Trở Về Tổ Quốc (1930 - 1941)
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>
              Hành Trình Trở Về - Hoàn Thành Sứ Mệnh
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Sau 30 năm bôn ba tìm đường cứu nước qua 3 đại dương, 4 châu lục, 
            Người đã tìm thấy con đường cách mạng đúng đắn và{" "}
            <strong style={{ color: "var(--vietnam-red)" }}>
              trở về Tổ quốc để trực tiếp lãnh đạo nhân dân đấu tranh giành độc lập
            </strong>
            .
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-8"
            >
              {/* Connector Line */}
              {index < timelineEvents.length - 1 && (
                <motion.div
                  className="absolute left-8 top-full h-8 w-1 z-0"
                  style={{ backgroundColor: "var(--vietnam-gold)" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                />
              )}

              {/* Event Card */}
              <motion.div
                className={`rounded-2xl shadow-xl p-6 md:p-8 border-4 relative z-10 ${
                  event.isHighlight ? "transform" : ""
                }`}
                style={{
                  backgroundColor: event.isHighlight
                    ? "var(--vietnam-red)"
                    : "var(--vietnam-white)",
                  borderColor: event.isHighlight
                    ? "var(--vietnam-gold)"
                    : index % 2 === 0
                    ? "var(--vietnam-red)"
                    : "var(--vietnam-gold)",
                  color: event.isHighlight
                    ? "var(--vietnam-white)"
                    : "var(--ink-black)",
                }}
                whileHover={{ scale: event.isHighlight ? 1.02 : 1.01 }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    className="text-4xl md:text-5xl flex-shrink-0"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {event.icon}
                  </motion.div>

                  <div className="flex-1">
                    {/* Year Badge */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <motion.span
                        className="px-4 py-2 rounded-full text-lg font-bold"
                        style={{
                          backgroundColor: event.isHighlight
                            ? "var(--vietnam-gold)"
                            : "var(--vietnam-red)",
                          color: event.isHighlight
                            ? "var(--ink-black)"
                            : "var(--vietnam-white)",
                        }}
                        animate={
                          event.isHighlight ? { scale: [1, 1.05, 1] } : {}
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {event.year}
                      </motion.span>
                      <span
                        className="text-sm"
                        style={{
                          color: event.isHighlight
                            ? "var(--vietnam-gold)"
                            : "var(--ancient-stone)",
                        }}
                      >
                        📍 {event.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl md:text-2xl font-bold mb-3"
                      style={{
                        color: event.isHighlight
                          ? "var(--vietnam-gold)"
                          : "var(--vietnam-red)",
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Content */}
                    <p
                      className="text-base md:text-lg leading-relaxed mb-4"
                      style={{
                        color: event.isHighlight
                          ? "var(--vietnam-white)"
                          : "var(--ancient-stone)",
                      }}
                    >
                      {event.content}
                    </p>

                    {/* Quote if exists */}
                    {event.quote && (
                      <motion.div
                        className="p-4 rounded-xl mb-4"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.15)",
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
                          {event.quote}
                        </p>
                        {event.quoteAuthor && (
                          <p
                            className="mt-2 font-bold"
                            style={{
                              color: event.isHighlight
                                ? "var(--vietnam-white)"
                                : "var(--vietnam-red)",
                            }}
                          >
                            {event.quoteAuthor}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {/* Significance */}
                    {event.significance && (
                      <div
                        className="p-4 rounded-xl"
                        style={{
                          backgroundColor: event.isHighlight
                            ? "rgba(255,255,255,0.1)"
                            : "var(--parchment-dark)",
                        }}
                      >
                        <div
                          className="text-sm font-semibold mb-1 flex items-center gap-2"
                          style={{
                            color: event.isHighlight
                              ? "var(--vietnam-gold)"
                              : "var(--vietnam-red)",
                          }}
                        >
                          <span>⭐</span> Ý nghĩa lịch sử
                        </div>
                        <p
                          className="text-sm md:text-base font-medium leading-relaxed"
                          style={{
                            color: event.isHighlight
                              ? "var(--vietnam-white)"
                              : "var(--ink-black)",
                          }}
                        >
                          {event.significance}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Summary Statistics */}
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
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--vietnam-gold)" }}
              >
                HOÀN THÀNH HÀNH TRÌNH 30 NĂM TÌM ĐƯỜNG CỨU NƯỚC
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-4xl mb-2">🌊</div>
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
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                <div className="text-4xl mb-2">🗺️</div>
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
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              >
                <div className="text-4xl mb-2">🌍</div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  30+
                </div>
                <div style={{ color: "var(--vietnam-white)" }}>Quốc Gia</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <div className="text-4xl mb-2">📅</div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  30
                </div>
                <div style={{ color: "var(--vietnam-white)" }}>Năm (1911-1941)</div>
              </motion.div>
            </div>

            <div className="mt-8 text-center">
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: "var(--vietnam-white)" }}
              >
                Từ ngày 5/6/1911 ra đi tìm đường cứu nước đến ngày 28/1/1941 trở về Tổ quốc, 
                Chủ tịch Hồ Chí Minh đã hoàn thành sứ mệnh lịch sử:{" "}
                <strong style={{ color: "var(--vietnam-gold)" }}>
                  Tìm ra con đường cứu nước đúng đắn cho dân tộc Việt Nam
                </strong>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReturnToHomeland;
