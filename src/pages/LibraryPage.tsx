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
      src: "https://i.ibb.co/chF8QtjR/hcm1.jpg",
      alt: "Tháng 6/1919, với bút danh Nguyễn Ái Quốc, Người đã thay mặt những người yêu nước Việt Nam soạn thảo và gửi tới Hội nghị Hòa bình Versailles bản Yêu sách của nhân dân An Nam gồm 8 điểm. Bản yêu sách đòi chính quyền thực dân Pháp phải công nhận các quyền tự do, dân chủ cơ bản và quyền bình đẳng về pháp lý cho người Việt. Dù không được Hội nghị chấp nhận, hành động này đã đánh dấu lần đầu tiên vấn đề độc lập, tự quyết của Việt Nam được chính thức đưa ra trước cộng đồng quốc tế, mở đầu cho một giai đoạn đấu tranh chính trị công khai của Người.",
    },
    {
      src: "https://i.ibb.co/tPCt7btN/hcm2.jpg",
      alt: "Khoảng năm 1913-1917, để kiếm sống và có điều kiện quan sát thế giới, Người đã làm việc tại bếp của khách sạn Carlton danh tiếng ở London, Anh. Công việc của một phụ bếp (commis de cuisine) vô cùng vất vả, với những giờ làm dài, công việc nặng nhọc trong không gian nóng bức. Nhưng chính tại nơi đây, từ góc nhìn của người lao động, Người đã tận mắt chứng kiến sự phân hóa giàu nghèo, học được tác phong làm việc kỷ luật và ngăn nắp của phương Tây. Những năm tháng này không chỉ để mưu sinh, mà còn là quá trình tự học hỏi, tích lũy hiểu biết về xã hội và văn hóa, từng bước hình thành nên tư duy và quyết tâm tìm ra con đường giải phóng cho dân tộc khỏi ách thực dân.",
    },
    {
      src: "https://i.ibb.co/q3ZTXkGt/hcm3.jpg",
      alt: "Ngày 26 tháng 12 năm 1920, tại Đại hội lần thứ 18 của Đảng Xã hội Pháp ở thành phố Tours, Người đã có bài phát biểu đầy xúc động và sắc bén. Người nói bằng giọng điệu của một người con từ xứ thuộc địa, vạch trần chính sách tàn bạo của chủ nghĩa thực dân và khẳng định: Chúng tôi tin rằng Quốc tế III sẽ chú ý đến số phận các dân tộc bị áp bức... và chỉ có Quốc tế Cộng sản mới giúp chúng tôi giành lại tự do và độc lập. Bài phát biểu đó là tiếng nói ủng hộ mạnh mẽ Luận cương về các vấn đề dân tộc và thuộc địa của Lênin - văn kiện đã chỉ cho Người thấy ánh sáng của con đường giải phóng dân tộc gắn liền với cách mạng vô sản. Cùng ngày hôm đó, Nguyễn Ái Quốc đã bỏ phiếu tán thành gia nhập Quốc tế Cộng sản, tách khỏi Đảng Xã hội và tham gia sáng lập nên Đảng Cộng sản Pháp. Bước đi lịch sử này không chỉ đánh dấu Người trở thành người cộng sản đầu tiên của Việt Nam, mà còn là lời tuyên bố chính thức rằng cuộc đấu tranh của nhân dân Việt Nam sẽ đi theo ngọn cờ của chủ nghĩa Mác - Lênin và phong trào cách mạng thế giới."
    },
    {
      src: "https://i.ibb.co/LXhTj6Qj/hcm4.jpg",
      alt: "Ngày 5 tháng 6 năm 1911, dưới cái tên Văn Ba, người thanh niên Nguyễn Tất Thành với tấm lòng yêu nước nồng nàn và nỗi đau trước cảnh nước mất, nhà tan, đã bước lên con tàu buôn Pháp mang tên Amiral Latouche-Tréville, rời bến cảng Nhà Rồng ở Sài Gòn để bắt đầu một hành trình dài và đầy thử thách. Người xin làm phụ bếp trên tàu với mục đích chính: được sang các nước phương Tây, xem họ làm thế nào rồi trở về giúp đồng bào mình. Chuyến ra đi này không có tiền đồ cụ thể, nhưng tràn đầy khát vọng tìm đường giải phóng dân tộc. Đây không chỉ là bước đi đầu tiên của một vĩ nhân, mà còn là sự kiện mở màn cho một cuộc hành trình 30 năm bôn ba qua nhiều quốc gia, lục địa, vừa lao động, học tập, vừa hình thành nên con đường cách mạng đúng đắn, dẫn lối cho dân tộc Việt Nam đi tới độc lập, tự do.",
    },
    {
      src: "https://i.ibb.co/XxP5sPW2/hcm5.jpg",
      alt: "Mùa hè năm 1924, đồng chí Nguyễn Ái Quốc có mặt tại Moskva để tham dự Đại hội lần thứ V của Quốc tế Cộng sản với tư cách là đại biểu chính thức - một sự kiện đánh dấu bước trưởng thành vượt bậc trên con đường hoạt động cách mạng quốc tế. Trong phiên họp ngày 1 tháng 7, Nguyễn Ái Quốc đã có bài phát biểu nổi tiếng, thẳng thắn chỉ trích thái độ thờ ơ của một số đảng cộng sản đối với vấn đề thuộc địa và khẳng định: Chủ nghĩa tư bản là một con đỉa có một cái vòi bám vào giai cấp vô sản ở chính quốc, và một cái vòi khác bám vào giai cấp vô sản ở các thuộc địa. Nếu muốn giết con vật ấy, người ta phải đồng thời cắt cả hai cái vòi. Bài phát biểu đó đã gây tiếng vang lớn, thể hiện tầm nhìn chiến lược và khẳng định vị thế của Người. Những ngày ở Moskva, Người không chỉ tham gia các phiên họp mà còn dành thời gian học tập, nghiên cứu tại Đại học Phương Đông, gặp gỡ các nhà lãnh đạo như Dimitrov, và đặc biệt là chuẩn bị cho nhiệm vụ lịch sử sắp tới: về Quảng Châu (Trung Quốc) để trực tiếp huấn luyện, đào tạo cán bộ và chuẩn bị cho sự ra đời của một tổ chức tiền thân của Đảng Cộng sản Việt Nam.",
    },
    { //
      src: "https://i.ibb.co/FLr7vZBJ/hcm6.jpg",
      alt: "Trong những năm tháng hoạt động sôi nổi tại Liên Xô, đồng chí Nguyễn Ái Quốc (đứng ở vị trí thứ hai từ trái sang) đã chụp bức ảnh này cùng các chiến sĩ cách mạng đến từ châu Phi. Đây không chỉ là một kỷ niệm cá nhân thông thường, mà còn là một minh chứng sống động cho tầm nhìn quốc tế và mối liên hệ đoàn kết sâu sắc mà Người đã chủ động xây dựng.Tại các diễn đàn quốc tế và trong môi trường học tập ở Moskva, Nguyễn Ái Quốc không chỉ đơn thuần là một học viên.Người đã trở thành một cầu nối, một người đồng chí nhiệt thành, tích cực trao đổi, chia sẻ kinh nghiệm đấu tranh chống chủ nghĩa thực dân với những người yêu nước từ khắp các dân tộc bị áp bức.Bức ảnh này, với những gương mặt đầy quyết tâm đến từ các vùng đất xa xôi, là biểu tượng cho sự đoàn kết đó.Nó cho thấy, ngay từ rất sớm, tư tưởng của Người đã vượt ra khỏi biên giới dân tộc, xác định rằng con đường giải phóng của Việt Nam phải gắn liền và nhận được sự ủng hộ từ phong trào cách mạng chung của nhân dân các nước thuộc địa trên toàn thế giới.",
    },
    { //
      src: "https://i.ibb.co/xcKsFqT/hcm7.jpg",
      alt: "Khoảng năm 1928, tại vùng Đông Bắc Xiêm (nay là Thái Lan), một nhà cách mạng Việt Nam được bà con nơi đây yêu mến gọi bằng cái tên thân thương: Thầu Chín (Ông Chín). Đó chính là lãnh tụ Nguyễn Ái Quốc trong một giai đoạn hoạt động bí mật và đầy hiệu quả. Trong bức ảnh này, Thầu Chín (ngồi hàng đầu, thứ hai từ phải sang) hiện lên giản dị, gần gũi giữa các đồng chí và có thể là những người dân địa phương. Giai đoạn ở Xiêm (1928-1929) là một chương đặc biệt trong hành trình cách mạng của Người. Không chỉ đơn thuần là nơi trú ẩn, đây là một căn cứ địa được Người chủ động xây dựng. Với vỏ bọc là một thầy giáo, một thầy lang, Thầu Chín đã sống và hòa mình vào cộng đồng Việt kiều và cả người dân Thái-Lào. Người dạy chữ quốc ngữ, chữa bệnh bằng thuốc nam, đồng thời âm thầm dịch các tác phẩm lý luận cách mạng, viết báo và tổ chức những lớp huấn luyện chính trị ngắn ngày ngay trong những căn nhà sàn đơn sơ. Cách tiếp cận vừa đánh trống, vừa ăn cướp tinh tế này đã giúp Người vừa xây dựng được cơ sở quần chúng vững chắc, vừa đào tạo được một lớp cán bộ nòng cốt, tạo ra một mạng lưới liên lạc an toàn nối giữa hải ngoại và trong nước. Những công việc tưởng chừng nhỏ bé ấy chính là những viên gạch nền móng vô cùng quan trọng, góp phần trực tiếp vào việc chuẩn bị về tổ chức và nhân sự cho sự ra đời của Đảng Cộng sản Việt Nam vào tháng 2 năm 1930."
    },
    { //
      src: "https://i.ibb.co/0yyQ9gx6/hcm8.jpg",
      alt: "Nhà tù Victoria (Victoria Gaol) tại Hồng Kông là nơi đã giam cầm nhà cách mạng Nguyễn Ái Quốc trong một thử thách cực kỳ nguy hiểm và cam go. Dưới cái tên giả Tống Văn Sơ, Người bị chính quyền thuộc địa Anh bắt giam từ ngày 6 tháng 6 năm 1931. Trong gần 20 tháng bị cầm tù (cho đến ngày 22 tháng 1 năm 1933), Người không chỉ phải đối mặt với điều kiện sống khắc nghiệt, bệnh tật mà còn đứng trước nguy cơ bị dẫn độ về Đông Dương, nơi bản án tử hình chắc chắn đang chờ đợi. Tuy nhiên, bằng trí tuệ, bản lĩnh phi thường và đặc biệt là nhờ sự giúp đỡ tận tình của luật sư tiến bộ người Anh Francis Henry Loseby, Người đã biến phiên tòa thành nơi tố cáo tội ác thực dân và giành chiến thắng pháp lý ngoạn mục. Việc được trả tự do không chỉ là một kỳ tích cá nhân mà còn là một thắng lợi có ý nghĩa lịch sử to lớn, bảo toàn được lãnh tụ tương lai của cách mạng Việt Nam và trở thành một biểu tượng sáng ngời về ý chí kiên cường, bất khuất.",
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
