import { Link } from "react-router-dom";
import { Star, Ship, MapPin, Flag, BookOpen } from "lucide-react";

const footerLinks = [
  {
    title: "Hành Trình Lịch Sử",
    links: [
      { name: "Trang Chủ", href: "/" },
      { name: "Bối Cảnh Lịch Sử", href: "/#historical-context" },
      { name: "Hành Trình Bôn Ba", href: "/#journey" },
      { name: "Giác Ngộ Lý Tưởng", href: "/#awakening" },
    ],
  },
  {
    title: "Nội Dung Chính",
    links: [
      { name: "Thành Lập Đảng", href: "/#preparation" },
      { name: "Trở Về Tổ Quốc", href: "/#return-homeland" },
      { name: "Ý Nghĩa Di Sản", href: "/#legacy" },
      { name: "Case Study", href: "/case-study" },
    ],
  },
  {
    title: "Tương Tác",
    links: [
      { name: "Thư Viện Hình Ảnh", href: "/thu-vien" },
      { name: "Quiz Kiến Thức", href: "/quiz" },
      { name: "AI Hỗ Trợ", href: "/ai-ho-tro" },
      { name: "Mini Game", href: "/minigame" },
    ],
  },
];

const features = [
  { icon: Ship, label: "Ra Đi 1911" },
  { icon: BookOpen, label: "Giác Ngộ" },
  { icon: Flag, label: "Lập Đảng" },
  { icon: MapPin, label: "Trở Về 1941" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundImage:
          "url('https://file3.qdnd.vn/data/images/0/2025/06/04/upload_2049/tau1.jpg?dpi=150&quality=100&w=870')",
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
                  Hành Trình Cứu Nước
                </span>
                <span className="text-white text-xs block tracking-widest">
                  1911 - 1941
                </span>
              </div>
            </Link>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Khám phá hành trình 30 năm bôn ba tìm đường cứu nước của Chủ tịch 
              Hồ Chí Minh - từ Bến Nhà Rồng (5/6/1911) đến ngày trở về Tổ quốc 
              tại Pác Bó, Cao Bằng (28/1/1941).
            </p>
            <div className="flex gap-3">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(172, 7, 5, 0.5)" }}
                  >
                    <feature.icon className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <span className="text-xs text-white/80">{feature.label}</span>
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
            <p className="text-white/90 text-sm text-center md:text-left">
              © 2026 Hành Trình 30 Năm Tìm Đường Cứu Nước (1911-1941) - Chủ Tịch Hồ Chí Minh
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-xs">
                Nhật Nam • Thành Tâm • Thanh Trường • Anh Thư
              </span>
              <span className="text-[#FFD700]">⭐</span>
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
