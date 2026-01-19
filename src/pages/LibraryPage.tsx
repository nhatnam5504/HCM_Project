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
      src: "https://media.vietnamplus.vn/images/ed1918d4cf848798286fdbd286ae25b49193a1c5d1fb33e969ef22f27d52ae3d4fa848ce7d2b15dcfa2646bd42731b69a74f6b1bfe70b3203772c7979020cefa/ttxvn-nguyen-ai-quoc.jpg",
      alt: "Nguyễn Ái Quốc với nhân dân Moskva (Nga) trên đồi Chim Sẻ, trong thời gian tham dự Đại hội lần thứ V Quốc tế cộng sản (17-6/8-7-1924). Ảnh: Tư liệu/TTXVN - Thể hiện tinh thần quốc tế vô sản.",
    },
    {
      src: "https://file.qdnd.vn/data/images/0/2021/05/29/phucthang/06-hcm01.jpg?dpi=150&quality=100&w=575",
      alt: "Hình ảnh trong chuyến hành trình tìm đường cứu nước của Bác từ ngày 25 đến 30-12-1920, chàng thanh niên yêu nước Nguyễn Ái Quốc (tên của Chủ tịch Hồ Chí Minh trong thời gian hoạt động cách mạng ở Pháp) tham dự Đại hội lần thứ 18 Đảng Xã hội Pháp ở thành phố Tours với tư cách đại biểu Đông Dương.",
    },
    {
      src: "https://media-cdn-v2.laodong.vn/storage/newsportal/2024/3/24/1318919/002.jpg",
      alt: "Chiến thắng Điện Biên Phủ năm 1954 - Biểu tượng cho sức mạnh của ý chí và tinh thần đoàn kết toàn dân tộc.",
    },
    {
      src: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/2-hinh-anh-bac-ho-o-chien-khu-inkythuatso-06-09-42-16.jpg",
      alt: "Hồ Chí Minh với cán bộ, chiến sĩ tại chiến khu Việt Bắc năm 1947 - Thể hiện sự gần gũi với bộ đội và nhân dân.",
    },
    {
      src: "https://tapchigiaothong.qltns.mediacdn.vn/tapchigiaothong.vn/files/Tapchigiay/2021/01/26/bac-ho-0957.jpg",
      alt: "Đại hội Đại biểu toàn quốc lần thứ III của Đảng (1960) - Đánh dấu bước chuyển sang thời kỳ xây dựng chủ nghĩa xã hội.",
    },
    {
      src: "https://imgnvsk.vnanet.vn/MediaUpload/Medium/2023/07/21/capture21-15-55-29.png",
      alt: "Đại hội Đại biểu toàn quốc lần thứ V của Đảng Cộng sản Việt Nam năm 1982 – Đề ra nhiệm vụ ổn định kinh tế - xã hội và mở ra các bước đột phá cải cách 1982–1986.",
    },
    {
      src: "https://th.bing.com/th/id/R.c89bc199a377256fe56dcaf53874b742?rik=XtuJd6brDcL4mA&pid=ImgRaw&r=0",
      alt: "Tiền Việt Nam năm 1985 – Hình ảnh gắn liền với cải cách giá - lương - tiền, nguyên nhân trực tiếp dẫn tới quyết định đổi mới toàn diện tại Đại hội VI năm 1986.",
    },
    {
      src: "https://file3.qdnd.vn/data/images/0/2022/07/20/tranhuyen/01botruongngoaigiaonguyenmanhcam.jpg?dpi=150&quality=100&w=870",
      alt: "Việt Nam gia nhập ASEAN năm 1995 – Thành tựu quan trọng của tiến trình đổi mới, mở rộng quan hệ đối ngoại và hội nhập khu vực.",
    },

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
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
              mode === "dome"
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                : "bg-transparent text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]"
            }`}
            onClick={() => setMode("dome")}
          >
            <FaCube className="text-sm" />
            <span>Tròn</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
              mode === "circular"
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
