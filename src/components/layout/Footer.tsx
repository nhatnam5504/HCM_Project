import { Link } from "react-router-dom";
import { Star, Book, Users, Award } from "lucide-react";

const footerLinks = [
  {
    title: "Nội Dung Chính",
    links: [
      { name: "Trang Chủ", href: "/" },
      { name: "Phân Tích Đổi Mới", href: "/#reform-analysis" },
      { name: "Thành Tựu 1986-1996", href: "/#achievements" },
    ],
  },
  {
    title: "Tài Nguyên",
    links: [
      { name: "Thư Viện Hình Ảnh 3D", href: "/thu-vien" },
      { name: "Ý Nghĩa Lịch Sử", href: "/y-nghia" },
      { name: "Video Giải Thích", href: "/video-giai-thich" },
      { name: "Quiz Kiến Thức", href: "/quiz" },
    ],
  },
  {
    title: "Tương Tác",
    links: [
      { name: "Mini Game", href: "/minigame" },
      { name: "AI Chatbot Hỗ Trợ", href: "/ai-ho-tro" },
      { name: "Case Study", href: "/case-study" },
    ],
  },
];

const features = [
  { icon: Book, label: "Đổi Mới" },
  { icon: Users, label: "Dân Tộc" },
  { icon: Award, label: "Thành Tựu" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundImage:
          "url('https://special.nhandan.vn/khang_chien_chong_my_cuu_nuoc_thang_loi_vi_dai_cua_Viet_Nam/assets/okFC5DldAK/thanh-nien-xung-phong-thanh-pho-ho-chi-minh-di-xay-dung-cac-khu-kinh-te-moi-san-sang-hoan-thanh-xuat-sac-moi-nhiem-vu-dang-va-nhan-dan-giao-pho-.-1900x1239.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="text-white relative"
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-[#AC0705]/80"></div>
      {/* Decorative top border */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg, #AC0705, #FFD700, #AC0705)",
        }}
      ></div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded flex items-center justify-center border-2 border-[#FFD700]"
                style={{
                  backgroundColor: "#AC0705",
                }}
              >
                <div className="relative">
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 bg-[#8B1A1A] rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  {/* Logo container */}
                  <div
                    className="relative w-11 h-11 rounded-lg flex items-center justify-center border-2 border-[#8B1A1A] shadow-lg overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #8B1A1A 0%, #B22222 50%, #DC143C 100%)",
                    }}
                  >
                    {/* Inner pattern */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                      }}
                    ></div>
                    <Star
                      className="w-5 h-5 text-[#C9A227] drop-shadow-md relative z-10"
                      fill="#C9A227"
                    />
                  </div>
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-[#FFD700]">
                  Đổi Mới 1986-1996
                </span>
                <span className="text-white text-xs block tracking-widest">
                  LỊCH SỬ ĐẢNG CSVN
                </span>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Khám phá hành trình 10 năm đổi mới toàn diện của Đảng, đưa đất
              nước ra khỏi khủng hoảng kinh tế - xã hội, hướng tới công nghiệp
              hóa, hiện đại hóa và hội nhập quốc tế.
            </p>
            <div className="flex gap-4">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(172, 7, 5, 0.3)" }}
                  >
                    <feature.icon className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <span className="text-xs text-white/70">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-[#FFD700] mb-4 text-sm uppercase tracking-widest">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[#FFD700] hover:text-white transition-colors text-sm font-medium"
                      style={{ color: "#FFD700" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#FFD700]/20 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © 2025 Đổi Mới Toàn Diện 1986-1996 - Lịch Sử Đảng CSVN. Dự án học
              tập.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-xs">
                Được xây dựng bởi Nhóm 9
              </span>
              <span className="text-[#FFD700]">❤</span>
              <span className="text-white/70 text-xs">VNR_3W_06</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg, #AC0705, #FFD700, #AC0705)",
        }}
      ></div>
    </footer>
  );
}
