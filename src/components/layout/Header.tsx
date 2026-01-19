"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Star } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  children?: NavItem[];
};

const navigation: NavItem[] = [
  { name: "Trang Chủ", href: "/" },
  { name: "Thư Viện 3D", href: "/thu-vien" },
  {
    name: "Ý Nghĩa",
    href: "/y-nghia",
    children: [
      { name: "📜 Timeline Lịch Sử", href: "/y-nghia" },
      { name: "🎥 Video Giải Thích", href: "/video-giai-thich" },
    ],
  },
  { name: "Quiz", href: "/quiz" },
  { name: "Mini Game", href: "/minigame" },
  { name: "AI Hỗ Trợ", href: "/ai-ho-tro" },
  { name: "Case Study", href: "/case-study" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

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
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span
                  className="text-white font-bold text-lg group-hover:text-[#FFD700] transition-colors tracking-wide"
                  style={{ color: "var(--vietnam-gold)" }}
                >
                  Lịch Sử Đảng
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-[#C9A227]/50"></div>
                <span
                  className="text-[#FFD700] text-xs tracking-[0.2em] font-medium"
                  style={{ color: "#FFD700" }}
                >
                  1986 — 1996
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
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(item.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button
                      className="px-4 py-2 text-[#FFD700] hover:text-[#FFFFFF] transition-colors text-sm font-semibold flex items-center gap-1 tracking-wide"
                      style={{ color: "#FFD700" }}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          dropdownOpen === item.name ? "rotate-180" : ""
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
                      <div
                        className="absolute top-full left-0 mt-1 w-72 rounded-lg shadow-2xl overflow-hidden border border-[#C9A227]/30"
                        style={{ backgroundColor: "#FFFDF8" }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-3 text-sm text-[#0F1C3F] hover:bg-[#F5EDE0] hover:text-[#8B1A1A] transition-colors border-l-4 border-transparent hover:border-[#C9A227] font-medium"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
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
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-6 py-2 text-[#FFD700] hover:text-[#FFFFFF] hover:bg-[#1A2D5A] transition-colors text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
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
