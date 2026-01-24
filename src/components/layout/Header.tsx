"use client";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Ship } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  children?: NavItem[];
};

const navigation: NavItem[] = [
  { name: "Trang Chủ", href: "/" },
  { name: "Thư Viện", href: "/thu-vien" },
  {
    name: "Hành Trình",
    href: "/#historical-context",
    children: [
      { name: "📜 Bối Cảnh Lịch Sử (Cuối TK XIX - Đầu TK XX)", href: "#historical-context" },
      { name: "🚢 Ra Đi Tìm Đường (5/6/1911)", href: "#journey" },
      { name: "💡 Giác Ngộ Chủ Nghĩa Mác-Lênin (1917-1924)", href: "#awakening" },
      { name: "🎓 Chuẩn Bị Thành Lập Đảng (1925-1929)", href: "#preparation" },
      { name: "🚩 Thành Lập Đảng CSVN (3/2/1930)", href: "#preparation" },
      { name: "🏠 Trở Về Tổ Quốc (28/1/1941)", href: "#return-homeland" },
      { name: "⭐ Ý Nghĩa & Di Sản", href: "#legacy" },
    ],
  },
  { name: "🎮 Game Hành Trình", href: "/quiz" },
  { name: "Game Nhóm", href: "/minigame" },
  { name: "🗺️ Game Chiến Lược", href: "/hcm-strategy" },
  { name: "AI Hỗ Trợ", href: "/ai-ho-tro" },
  { name: "Case Study", href: "/case-study" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle anchor link navigation
  const handleAnchorClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(null);
    setMobileMenuOpen(false);

    // If it's an anchor link (starts with #)
    if (href.startsWith('#')) {
      const sectionId = href.substring(1); // Remove the # symbol

      // Check if we're on the home page
      if (window.location.pathname === '/') {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to home page first, then scroll
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      // Regular navigation
      navigate(href);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-lg"
      style={{ backgroundColor: "var(--vietnam-red)" }}
    >
      {/* Top decorative bar - vintage gold stripe */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--vietnam-red), var(--vietnam-gold), var(--vietnam-red))",
        }}
      ></div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-[#8B1A1A] rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
              {/* Logo container */}
              <div
                className="relative w-11 h-11 rounded-lg flex items-center justify-center border-2 border-[#FFD700] shadow-lg overflow-hidden"
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
                <Ship
                  className="w-6 h-6 text-[#FFD700] drop-shadow-md relative z-10"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span
                  className="text-white font-bold text-lg group-hover:text-[#FFD700] transition-colors tracking-wide"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  Theo Dấu Chân Bác
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-[#C9A227]/50"></div>
                <span
                  className="text-[#FFD700] text-xs tracking-[0.2em] font-medium"
                  style={{ color: "#FFD700" }}
                >
                  1911 — 1941
                </span>
                <div className="w-4 h-px bg-[#FFD700]/50"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                      className="px-4 py-3 text-[#FFD700] hover:text-[#FFFFFF] hover:bg-[#8B1A1A] rounded-lg transition-colors text-sm font-semibold flex items-center gap-2 tracking-wide"
                      style={{ color: "#FFD700" }}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${dropdownOpen === item.name ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === item.name && (
                      <>
                        {/* Backdrop to close dropdown when clicking outside */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setDropdownOpen(null)}
                        />
                        <div
                          className="absolute top-full left-0 mt-2 w-80 rounded-xl shadow-2xl overflow-hidden border-2 border-[#FFD700]/50 z-20"
                          style={{ backgroundColor: "#FFFDF8" }}
                        >
                          {item.children.map((child) => (
                            <a
                              key={child.name}
                              href={child.href}
                              onClick={(e) => handleAnchorClick(child.href, e)}
                              className="block px-5 py-4 text-sm text-[#0F1C3F] hover:bg-[#AC0705] hover:text-white transition-colors border-l-4 border-transparent hover:border-[#FFD700] font-medium cursor-pointer"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="px-4 py-2 text-[#FFD700] hover:text-[#FFFFFF] transition-colors text-sm font-semibold tracking-wide"
                    style={{ color: "#FFD700" }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[#FFD700] hover:text-[#FFFFFF] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#C9A227]/30">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <>
                    <div className="px-4 py-2 text-[#FFD700] font-semibold text-sm tracking-wide uppercase">
                      {item.name}
                    </div>
                    {item.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        className="block px-6 py-2 text-[#FFD700] hover:text-[#FFFFFF] hover:bg-[#1A2D5A] transition-colors text-sm cursor-pointer"
                        onClick={(e) => handleAnchorClick(child.href, e)}
                      >
                        {child.name}
                      </a>
                    ))}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-4 py-2 text-[#FFD700] hover:text-[#FFFFFF] hover:bg-[#1A2D5A] transition-colors text-sm font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
