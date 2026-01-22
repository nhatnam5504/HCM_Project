import React from "react";
import { motion } from "framer-motion";

interface PrepCard {
  year: string;
  title: string;
  icon: string;
  event: string;
  location?: string;
  coreContent?: string;
  document?: string;
  activity?: string;
  role?: string;
  result?: string;
  color: string;
}

const PartyPreparation: React.FC = () => {
  const prepCards: PrepCard[] = [
    {
      year: "11/1924",
      title: "ĐẺN QUẢNG CHÂU",
      icon: "🇨🇳",
      event: "Nguyễn Ái Quốc tới Quảng Châu (Trung Quốc) - trung tâm cách mạng Phương Đông lúc bấy giờ",
      location: "Quảng Châu, Trung Quốc",
      activity:
        "Liên lạc với các nhà cách mạng Việt Nam lưu vong, chuẩn bị điều kiện thành lập tổ chức cách mạng.",
      color: "var(--vietnam-gold)",
    },
    {
      year: "6/1925",
      title: "THÀNH LẬP HỘI VIỆT NAM CÁCH MẠNG THANH NIÊN",
      icon: "🏛️",
      event: "Thành lập Hội Việt Nam Cách mạng Thanh niên - tổ chức tiền thân của Đảng",
      location: "Quảng Châu (Trung Quốc)",
      activity:
        'Mở các lớp huấn luyện chính trị, đào tạo cán bộ nòng cốt (như Lê Hồng Phong, Hồ Tùng Mậu, Trần Phú...). Ra báo "Thanh niên" - cơ quan ngôn luận của Hội (21/6/1925). Đưa người về nước hoạt động bí mật.',
      color: "var(--vietnam-red)",
    },
    {
      year: "1927",
      title: "SOẠN THẢO 'ĐƯỜNG KÁCH MỆNH'",
      icon: "📖",
      event:
        'Xuất bản tác phẩm "Đường Kách mệnh" - tập hợp các bài giảng cho các lớp huấn luyện',
      coreContent:
        "Vạch ra đường lối cơ bản của cách mạng Việt Nam: (1) Cách mạng là sự nghiệp của quần chúng; (2) Cách mạng trước hết phải có đảng cách mạng; (3) Cách mạng Việt Nam là một bộ phận của cách mạng thế giới.",
      role:
        "Trở thành cuốn cẩm nang lý luận chính trị đầu tiên, trang bị thế giới quan, phương pháp cách mạng cho một thế hệ thanh niên yêu nước, chuẩn bị về tư tưởng.",
      color: "var(--vietnam-gold)",
    },
    {
      year: "1929",
      title: "SỰ PHÂN HÓA VÀ XU THẾ THỐNG NHẤT",
      icon: "⚖️",
      event:
        "Phong trào công nhân và phong trào yêu nước phát triển mạnh mẽ. Xuất hiện 3 tổ chức cộng sản:",
      activity:
        "• Đông Dương Cộng sản Đảng (6/1929 - Bắc Kỳ)\n• An Nam Cộng sản Đảng (8/1929 - Nam Kỳ)\n• Đông Dương Cộng sản Liên đoàn (9/1929 - Trung Kỳ)",
      result:
        "Sự tồn tại 3 tổ chức cộng sản riêng rẽ gây nguy cơ chia rẽ phong trào. Quốc tế Cộng sản giao Nguyễn Ái Quốc nhiệm vụ thống nhất các tổ chức này.",
      color: "var(--vietnam-red)",
    },
    {
      year: "3/2/1930",
      title: "THÀNH LẬP ĐẢNG CỘNG SẢN VIỆT NAM",
      icon: "🚩",
      event:
        "Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản tại Cửu Long (Hồng Kông), thành lập Đảng Cộng sản Việt Nam",
      location: "Cửu Long, Hồng Kông (Trung Quốc)",
      document:
        "Thông qua Chính cương vắn tắt, Sách lược vắn tắt (do Nguyễn Ái Quốc soạn thảo) - là Cương lĩnh chính trị đầu tiên của Đảng. Xác định đường lối chiến lược: Làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản.",
      result:
        "CHẤM DỨT CUỘC KHỦNG HOẢNG VỀ ĐƯỜNG LỐI VÀ TỔ CHỨC LÃNH ĐẠO KÉO DÀI GẦN MỘT THẾ KỶ. Tạo ra nhân tố quyết định cho mọi thắng lợi của cách mạng Việt Nam sau này.",
      color: "var(--vietnam-red)",
    },
  ];

  return (
    <section
      id="preparation"
      className="py-20 relative overflow-hidden"
    >
      {/* Revolutionary red background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d0a0a] via-[#3d1212] to-[#2d0a0a]" />
      
      {/* Flag wave pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              transparent,
              transparent 50px,
              rgba(212,175,55,0.1) 50px,
              rgba(212,175,55,0.1) 51px
            )
          `
        }}
      />
      
      {/* Star centerpiece */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[350px] text-yellow-500/5 select-none pointer-events-none">★</div>
      
      {/* Flag symbols */}
      <div className="absolute top-20 left-10 text-[100px] text-yellow-500/5 select-none pointer-events-none">🚩</div>
      <div className="absolute bottom-20 right-10 text-[80px] text-yellow-500/5 select-none pointer-events-none">⭐</div>
      
      {/* Gold corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-yellow-500/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-yellow-500/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-yellow-500/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-yellow-500/30" />
      
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

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
            🚩 Phần 4: Chuẩn Bị & Thành Lập Đảng (1925 - 1930)
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>
              Hiện Thực Hóa Lý Luận
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Sau khi tìm thấy chân lý, Người chuyển từ nghiên cứu lý luận sang hoạt động thực tiễn:{" "}
            <strong>đào tạo cán bộ</strong>, <strong>truyền bá tư tưởng</strong> và cuối cùng là{" "}
            <strong style={{ color: "var(--vietnam-red)" }}>
              sáng lập chính đảng của giai cấp vô sản Việt Nam
            </strong>
            .
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {prepCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="h-full"
            >
              <div
                className="rounded-2xl shadow-xl h-full overflow-hidden border-4"
                style={{
                  backgroundColor: "var(--vietnam-white)",
                  borderColor: card.color,
                }}
              >
                {/* Card Header */}
                <div
                  className="p-6 text-center"
                  style={{
                    backgroundColor: card.color,
                    color: "var(--vietnam-white)",
                  }}
                >
                  <motion.div
                    className="text-5xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {card.icon}
                  </motion.div>
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "var(--vietnam-gold)" }}
                  >
                    {card.year}
                  </div>
                  <h3 className="text-xl font-bold mt-2">{card.title}</h3>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Event */}
                  <div>
                    <div
                      className="text-sm font-semibold mb-1 flex items-center gap-2"
                      style={{ color: card.color }}
                    >
                      <span>📌</span> Sự kiện
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--ancient-stone)" }}
                    >
                      {card.event}
                    </p>
                  </div>

                  {/* Location if exists */}
                  {card.location && (
                    <div>
                      <div
                        className="text-sm font-semibold mb-1 flex items-center gap-2"
                        style={{ color: "var(--vietnam-gold)" }}
                      >
                        <span>📍</span> Địa điểm
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: "var(--ancient-stone)" }}
                      >
                        {card.location}
                      </p>
                    </div>
                  )}

                  {/* Core Content if exists */}
                  {card.coreContent && (
                    <div>
                      <div
                        className="text-sm font-semibold mb-1 flex items-center gap-2"
                        style={{ color: "var(--vietnam-red)" }}
                      >
                        <span>🎯</span> Nội dung cốt lõi
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ancient-stone)" }}
                      >
                        {card.coreContent}
                      </p>
                    </div>
                  )}

                  {/* Document if exists */}
                  {card.document && (
                    <div>
                      <div
                        className="text-sm font-semibold mb-1 flex items-center gap-2"
                        style={{ color: "var(--vietnam-gold)" }}
                      >
                        <span>📜</span> Văn kiện lịch sử
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ancient-stone)" }}
                      >
                        {card.document}
                      </p>
                    </div>
                  )}

                  {/* Activity if exists */}
                  {card.activity && (
                    <div>
                      <div
                        className="text-sm font-semibold mb-1 flex items-center gap-2"
                        style={{ color: "var(--vietnam-red)" }}
                      >
                        <span>👥</span> Hoạt động chính
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ancient-stone)" }}
                      >
                        {card.activity}
                      </p>
                    </div>
                  )}

                  {/* Role if exists */}
                  {card.role && (
                    <div>
                      <div
                        className="text-sm font-semibold mb-1 flex items-center gap-2"
                        style={{ color: "var(--vietnam-gold)" }}
                      >
                        <span>🌟</span> Vai trò
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ancient-stone)" }}
                      >
                        {card.role}
                      </p>
                    </div>
                  )}

                  {/* Result if exists */}
                  {card.result && (
                    <div
                      className="mt-4 p-3 rounded-lg"
                      style={{ backgroundColor: "var(--parchment-dark)" }}
                    >
                      <div
                        className="text-sm font-semibold mb-1 flex items-center gap-2"
                        style={{ color: "var(--vietnam-red)" }}
                      >
                        <span>✅</span> Kết quả
                      </div>
                      <p
                        className="text-sm font-medium leading-relaxed"
                        style={{ color: "var(--ink-black)" }}
                      >
                        {card.result}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Arrow */}
        <motion.div
          className="flex justify-center items-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--vietnam-red)" }}
          >
            1925
          </div>
          <motion.div
            className="flex-1 max-w-md h-2 rounded-full relative overflow-hidden"
            style={{ backgroundColor: "var(--parchment-dark)" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "var(--vietnam-gold)" }}
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--vietnam-red)" }}
          >
            1930
          </div>
        </motion.div>

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
            <div className="text-center">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h3
                className="text-3xl font-bold mb-4"
                style={{ color: "var(--vietnam-gold)" }}
              >
                3/2/1930 - Ngày Thành Lập Đảng Cộng Sản Việt Nam
              </h3>
              <p
                className="text-xl leading-relaxed"
                style={{ color: "var(--vietnam-white)" }}
              >
                Đánh dấu bước ngoặt vĩ đại trong lịch sử dân tộc, chấm dứt gần một thế kỷ 
                khủng hoảng về đường lối và tổ chức lãnh đạo cách mạng Việt Nam.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartyPreparation;
