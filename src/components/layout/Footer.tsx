import { Link } from "react-router-dom";
import { Star, Ship, MapPin, Flag, BookOpen, Home, Library, Gamepad2, Sparkles } from "lucide-react";

const footerLinks = [
  {
    title: "Hành Trình Lịch Sử",
    icon: Ship,
    links: [
      { name: "Trang Chủ", href: "/", icon: Home },
      { name: "Bối Cảnh Lịch Sử", href: "/#historical-context" },
      { name: "Hành Trình Bôn Ba", href: "/#journey" },
      { name: "Giác Ngộ Lý Tưởng", href: "/#awakening" },
    ],
  },
  {
    title: "Nội Dung Chính",
    icon: BookOpen,
    links: [
      { name: "Thành Lập Đảng", href: "/#preparation" },
      { name: "Trở Về Tổ Quốc", href: "/#return-homeland" },
      { name: "Ý Nghĩa Di Sản", href: "/#legacy" },
      { name: "Case Study", href: "/case-study" },
    ],
  },
  {
    title: "Tương Tác & Game",
    icon: Gamepad2,
    links: [
      { name: "Thư Viện Hình Ảnh", href: "/thu-vien", icon: Library },
      { name: "Quiz Kiến Thức", href: "/quiz" },
      { name: "Mini Game Mèo Nổ", href: "/minigame" },
      { name: "Game Chiến Lược", href: "/hcm-strategy", icon: Sparkles },
      { name: "AI Hỗ Trợ", href: "/ai-ho-tro" },
    ],
  },
];

const features = [
  { icon: Ship, label: "Ra Đi 1911", color: "from-blue-500 to-cyan-500" },
  { icon: BookOpen, label: "Giác Ngộ", color: "from-purple-500 to-pink-500" },
  { icon: Flag, label: "Lập Đảng", color: "from-red-500 to-orange-500" },
  { icon: MapPin, label: "Trở Về 1941", color: "from-green-500 to-emerald-500" },
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
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Khám phá hành trình 30 năm bôn ba tìm đường cứu nước của Chủ tịch 
              Hồ Chí Minh - từ Bến Nhà Rồng (5/6/1911) đến ngày trở về Tổ quốc 
              tại Pác Bó, Cao Bằng (28/1/1941).
            </p>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-[#FFD700]/20"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.color} shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/90 font-medium text-center">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-[#FFD700]/20">
                    <SectionIcon className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <h3 className="font-bold text-[#FFD700] text-sm uppercase tracking-widest">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {section.links.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="flex items-center gap-2 text-[#FFD700] hover:text-white transition-all text-sm font-medium group"
                          style={{ color: "#FFD700" }}
                        >
                          {LinkIcon && (
                            <LinkIcon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                          )}
                          <span className="group-hover:translate-x-1 transition-transform inline-block">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#FFD700]/20 relative z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-row justify-between items-center gap-3 overflow-hidden">
            <p className="text-white/90 text-[10px] md:text-xs text-left whitespace-nowrap flex-shrink-0">
              © 2026 Hành Trình 30 Năm Tìm Đường Cứu Nước (1911-1941) - Chủ Tịch Hồ Chí Minh
            </p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-white/80 text-[9px] md:text-[10px] whitespace-nowrap">
                Nhật Nam • Thành Tâm • Thanh Trường • Anh Thư
              </span>
              <span className="text-[#FFD700] text-xs">⭐</span>
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
