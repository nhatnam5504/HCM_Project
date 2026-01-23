import { useState, useEffect } from "react";
import CircularGallery from "../components/CircularGallery/CircularGallery";
import DomeGallery from "../components/DomeGallery/DomeGallery";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import { FaImages, FaCube } from "react-icons/fa";

export default function LibraryPage() {
  const [mode, setMode] = useState<"dome" | "circular">("dome");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Historical images from DomeGallery with additional ones
  const domeImages = [
    {
      src: "https://i.ibb.co/gbs8Xv1B/images2285462-image004.jpg",
      alt: "Vào đầu những năm 1910, một thanh niên Việt Nam rời quê hương với khát vọng tìm con đường giải phóng dân tộc. Trên hành trình bôn ba khắp thế giới, ông đã đến Pháp và phải lao động bằng nhiều nghề khác nhau để sinh sống, trong đó có nghề phụ bếp/đầu bếp tại các nhà hàng, khách sạn. Ở Paris, công việc trong bếp rất vất vả: dậy từ rất sớm, làm việc nhiều giờ liền, công việc nặng nhọc, lương thấp, sống trong những căn phòng chật hẹp của người lao động nhập cư. Nhưng chính trong những căn bếp nóng nực ấy, ông học được tác phong kỷ luật, ngăn nắp, quan sát xã hội Pháp, sự phân hóa giàu nghèo, đời sống công nhân, tiếp cận tư tưởng tiến bộ, tham gia các cuộc thảo luận chính trị, đọc báo, viết bài. Ban ngày lao động kiếm sống, ban đêm ông học tập và viết, từng bước hình thành tư duy cách mạng. Từ một người làm bếp vô danh, ông dần trở thành một nhà hoạt động chính trị, rồi sau này là lãnh tụ của phong trào giải phóng dân tộc Việt Nam.",
    },
    {
      src: "https://i.ibb.co/Z4TZd1j/congly-vn-bachovoinuocnga8.jpg",
      alt: `Sau Hiệp định Giơnevơ 1954, Chủ tịch Hồ Chí Minh xác định đấu tranh thực hiện hòa bình, thống nhất đất nước là lâu dài và gian khổ, trong đó đấu tranh ngoại giao và tranh thủ sự ủng hộ quốc tế giữ vai trò rất quan trọng. Xuất phát từ nhận thức đó, năm 1955, Người dẫn đầu đoàn đại biểu Chính phủ Việt Nam Dân chủ Cộng hòa đi thăm hữu nghị Liên Xô, Trung Quốc và Mông Cổ.
Chuyến thăm nhằm củng cố tình đoàn kết với các nước xã hội chủ nghĩa anh em, tranh thủ sự ủng hộ quốc tế cho sự nghiệp hòa bình, thống nhất và xây dựng đất nước. Trong các cuộc gặp gỡ và tuyên bố chung, các nước đều bày tỏ sự ủng hộ mạnh mẽ đối với Việt Nam, đặc biệt là việc thực hiện hiệp thương, tổng tuyển cử theo Hiệp định Giơnevơ.
Kết quả, Việt Nam nhận được sự giúp đỡ to lớn về chính trị, kinh tế, kỹ thuật, đào tạo cán bộ và hợp tác văn hóa – giáo dục. Chủ tịch Hồ Chí Minh khẳng định chuyến đi đã hoàn toàn đạt mục đích, góp phần nâng cao uy tín quốc tế của Việt Nam, củng cố mặt trận đoàn kết quốc tế, tạo cơ sở cho cuộc đấu tranh thống nhất và phát triển đất nước sau này.`,
    },
    {
      src: "https://i.ibb.co/BVcw2k89/Bac-Ho-tham-dao-Titop.jpg",
      alt: "Tháng 01 năm 1962, trong chuyến thăm Việt Nam, anh hùng phi công vũ trụ Liên Xô Gherman Titov đã có dịp cùng Chủ tịch Hồ Chí Minh tham quan vịnh Hạ Long, một thắng cảnh nổi tiếng của đất nước Việt Nam, trên con tàu lướt nhẹ giữa làn nước xanh biếc và những đảo đá trùng điệp, Bác Hồ với phong thái giản dị, thân tình đã trò chuyện cởi mở với Titov và các bạn Liên Xô, hỏi thăm về chuyến bay vào vũ trụ, về khoa học kỹ thuật hiện đại, đồng thời kể cho bạn bè quốc tế nghe về thiên nhiên, con người và khát vọng hòa bình của nhân dân Việt Nam, Bác ví tình hữu nghị Việt Nam – Liên Xô như những hòn đảo vững chãi giữa biển khơi, dù sóng gió vẫn bền chặt và gắn bó, còn Titov thì bày tỏ sự khâm phục trước ý chí kiên cường của dân tộc Việt Nam và vẻ đẹp kỳ vĩ của vịnh Hạ Long, cuộc trò chuyện diễn ra trong không khí ấm áp, chan hòa, thể hiện sâu sắc tình đoàn kết quốc tế, sự giao thoa giữa trí tuệ khoa học tiên tiến của nhân loại với tâm hồn yêu nước, yêu hòa bình của vị lãnh tụ Việt Nam, để lại một kỷ niệm đẹp về tình bạn thủy chung giữa hai dân tộc Việt Nam và Liên Xô.",
    },
    {
      src: "https://i.ibb.co/SDvsHmz0/ae8080ce0a7550c9538ababaf43a33e1bac-ho-voi-nuoc-duc.jpg",
      alt: "Những năm 1980, khi công nhân Việt Nam sang lao động tại Cộng hòa Dân chủ Đức, hình ảnh Chủ tịch Hồ Chí Minh đã trở thành sợi dây gắn kết đặc biệt giữa người Việt và người Đức, bởi chỉ cần nhắc đến tên Bác là nhận được sự trân trọng, thân thiện và giúp đỡ chân thành, thể hiện qua việc nhiều người Đức hiểu biết, kính trọng Bác, nhiều đội thiếu niên, khu phố, công trình mang tên Hồ Chí Minh, bắt nguồn từ tình hữu nghị Việt Nam – Đức được Người đặt nền móng trong chuyến thăm năm 1957 và từ tấm gương đạo đức, nhân cách lớn lao của Bác được bạn bè quốc tế yêu mến.",
    },
    {
      src: "https://i.ibb.co/1tdmDrms/b1-hinh-anh-bac-ho.jpg",
      alt: "Sự kiện Chủ tịch Hồ Chí Minh giao lưu với thiếu nhi nước ngoài thể hiện rõ tình yêu thương con người và phong cách ngoại giao nhân dân của Người. Qua những cuộc gặp gỡ thân mật, giản dị, Bác gửi gắm thông điệp đoàn kết, hữu nghị và hòa bình giữa các dân tộc, góp phần xây dựng hình ảnh Việt Nam nhân ái, yêu chuộng hòa bình và thắt chặt tình hữu nghị quốc tế ngay từ thế hệ trẻ.",
    },
    { // 
      src: "https://i.ibb.co/vvTxMZY0/congly-vn-bachovoinuocnga3.jpg",
      alt: "Trong Chiến dịch Điện Biên Phủ năm 1954, Chủ tịch Hồ Chí Minh đã gặp gỡ và trao đổi với nhà làm phim nổi tiếng Liên Xô Roman Karmen, người trực tiếp ghi lại bằng ống kính điện ảnh chân thực và sinh động cuộc chiến đấu anh dũng của quân và dân Việt Nam, góp phần đưa chiến thắng lịch sử Điện Biên Phủ ra trước dư luận tiến bộ và yêu chuộng hòa bình trên toàn thế giới.",
    },
    { // 
      src: "https://i.ibb.co/27kdn2sG/congly-vn-bachovoinuocnga12.jpg",
      alt: "Năm 1962, Chủ tịch Hồ Chí Minh đã có cuộc gặp gỡ thân thiết với phi hành gia Liên Xô German Titov, thể hiện tình hữu nghị sâu sắc giữa Việt Nam và Liên Xô, đồng thời bày tỏ sự trân trọng của Bác đối với những thành tựu khoa học vũ trụ của nhân loại và tinh thần đoàn kết quốc tế vì hòa bình.",
    },
    { //
      src: "https://i.ibb.co/XrFFBw4f/congly-vn-bachovoinuocnga10.jpg",
      alt: "Năm 1959, trong chuyến thăm Liên Xô, Chủ tịch Hồ Chí Minh đã tới nhà hát Bolshoi ở Moscow, thể hiện sự trân trọng của Người đối với nền văn hóa, nghệ thuật Nga và tình hữu nghị bền chặt giữa Việt Nam và Liên Xô.",
    }

    // ========================================================================
  ];

  // Transform for CircularGallery (text hidden to avoid overlap)
  const ethnicImages = domeImages.map((img) => ({
    image: img.src,
    text: "",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white">
      {/* Header */}
      <Header />

      {/* Mode Toggle Bar - Right aligned */}
      <div className="fixed top-20 right-6 z-[60] flex items-center gap-3">
        <span className="text-[#FFD700] text-sm font-semibold hidden md:inline">
          Chế độ xem:
        </span>
        <div className="flex gap-2 bg-[rgba(139,26,26,0.9)] p-1 rounded-full border-2 border-[#FFD700]/40 shadow-[0_0_20px_rgba(255,215,0,0.2)] backdrop-blur-md">
          <button
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${mode === "dome"
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                : "bg-transparent text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]"
              }`}
            onClick={() => setMode("dome")}
          >
            <FaCube className="text-sm" />
            <span>Tròn</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${mode === "circular"
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                : "bg-transparent text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]"
              }`}
            onClick={() => setMode("circular")}
          >
            <FaImages className="text-sm" />
            <span>Ngang</span>
          </button>
        </div>
      </div>

      {/* Gallery Container */}
      <div className="relative w-full" style={{ height: "calc(100vh - 73px)" }}>
        {mode === "dome" ? (
          <div className="w-full h-full">
            <DomeGallery
              images={domeImages}
              fit={0.65}
              fitBasis="auto"
              minRadius={400}
              maxRadius={900}
              dragSensitivity={20}
              enlargeTransitionMs={300}
              segments={20}
              dragDampening={1.5}
              openedImageWidth="500px"
              openedImageHeight="500px"
              imageBorderRadius="15px"
              openedImageBorderRadius="25px"
              grayscale={false}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <CircularGallery
              items={ethnicImages}
              bend={3}
              textColor="#d4af37"
              borderRadius={0.08}
              font="bold 28px 'Playfair Display', serif"
              scrollSpeed={1}
              scrollEase={0.08}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
