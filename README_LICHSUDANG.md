# 🇻🇳 Landing Page Lịch Sử Đảng Cộng Sản Việt Nam

## 📚 Sản Phẩm Sáng Tạo - Đổi Mới Toàn Diện (1975-2018)

### 🎯 Mục Đích
Sản phẩm website interactive về Lịch sử Đảng CSVN, trả lời câu hỏi chủ đề về cải cách giá-lương-tiền 1985 và vai trò của nó trong quyết định đổi mới toàn diện tại Đại hội VI.

---

## ✨ Tính Năng Nổi Bật

### 1. 🎨 **Hero Section với 3D Animations**
- Floating elements (ngôi sao, cờ VN, tài liệu)
- GSAP animations mượt mà
- Framer Motion parallax effects
- Background gradients động

### 2. ⏰ **Timeline Interactive**
- 8 mốc lịch sử quan trọng (1975-2018)
- Scroll-triggered animations
- Hover effects cho từng sự kiện
- Icon và màu sắc phân biệt rõ ràng

### 3. 💰 **Phân Tích Cải Cách Giá-Lương-Tiền**
- Tab navigation với 4 phần: Bối cảnh, Nội dung, Tác động, Bài học
- Smooth transitions giữa các tabs
- Animated icons và cards
- Kết luận chi tiết về nguyên nhân đổi mới

### 4. 🏆 **Thành Tựu Đổi Mới**
- 6 thẻ thống kê với CountUp animations
- Gradient backgrounds động
- Shine effects khi hover
- Quote của lãnh đạo Đảng

### 5. 🎮 **Quiz Tương Tác**
- 5 câu hỏi trắc nghiệm
- Real-time feedback với animations
- Progress bar và scoring system
- Giải thích chi tiết sau mỗi câu

### 6. 🌍 **Bối Cảnh Hiện Đại**
- Liên kết với thực tiễn hiện nay
- Case study COVID-19
- 3 xu hướng chính (4.0, Phát triển bền vững, Hội nhập)

### 7. 🤖 **AI Usage Report**
- Minh bạch 100% việc sử dụng AI
- 4 trụ cột: Minh bạch, Có trách nhiệm, Sáng tạo, Liêm chính
- Chi tiết từng tool AI (ChatGPT, Copilot, Claude)
- Cam kết học thuật rõ ràng

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend Framework
- **React 18** + **TypeScript**
- **Vite** (build tool siêu nhanh)

### Animation Libraries
- **GSAP** (GreenSock Animation Platform) - Professional animations
- **Framer Motion** - React animation library
- **React Intersection Observer** - Scroll-triggered effects
- **React CountUp** - Animated numbers

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Custom gradients** - Màu cờ VN (đỏ-vàng)

---

## 🚀 Cài Đặt & Chạy

### Prerequisites
```bash
Node.js >= 16.x
npm >= 7.x
```

### Bước 1: Clone/Download Project
```bash
cd d:\ki8fpt\vnr
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Chạy Development Server
```bash
npm run dev
```

### Bước 4: Mở Browser
Truy cập: `http://localhost:5173`

### Bước 5: Build Production
```bash
npm run build
npm run preview
```

---

## 📋 Cấu Trúc Project

```
vnr/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navigation bar
│   │   │   ├── Footer.tsx          # Footer
│   │   │   └── ScrollToTop.tsx     # Scroll to top button
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # 3D floating hero section
│   │   │   ├── HistoryTimeline.tsx # Timeline với GSAP
│   │   │   ├── ReformAnalysis.tsx  # Phân tích cải cách
│   │   │   ├── KeyAchievements.tsx # Thành tựu với CountUp
│   │   │   ├── InteractiveQuiz.tsx # Quiz game
│   │   │   ├── ModernContext.tsx   # Bối cảnh hiện đại
│   │   │   ├── AIUsage.tsx         # AI transparency report
│   │   │   └── CTA.tsx             # Call to action
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       └── StarIcon.tsx
│   ├── App.tsx                      # Main app với GSAP setup
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🎓 Nội Dung Học Thuật

### Câu Hỏi Chủ Đề
**"Vì sao công cuộc cải cách về giá-lương-tiền lại là nguyên nhân trực tiếp dẫn tới quyết định đổi mới toàn diện nền kinh tế Việt Nam tại Đại hội Đảng VI? Bài học gì rút ra từ cuộc cải cách xương máu này?"**

### Trả Lời (Tóm Tắt)

#### 1. **Bối Cảnh** (1985)
- Lạm phát 453% (1986)
- Sản xuất đình trệ
- Thiếu hụt hàng hóa
- Tiền lương mất giá
- Cơ chế kế hoạch hóa tập trung cứng nhắc

#### 2. **Nội Dung Cải Cách**
- Phá giá: 10 đồng cũ = 1 đồng mới
- Tăng lương 7-10 lần
- Điều chỉnh giá sát thị trường
- Bãi bỏ bao cấp
- Thống nhất giá nội địa/xuất khẩu

#### 3. **Kết Quả & Tác Động**
- ❌ Thất bại ngắn hạn: Lạm phát tiếp tục tăng
- ✅ Thành công dài hạn: Mở đường cho đổi mới toàn diện
- ✅ Đảng nhận ra: Không thể cải cách cục bộ

#### 4. **Bài Học**
1. Phải đổi mới toàn diện, không cục bộ
2. Thay đổi tư duy từ kế hoạch hóa → thị trường
3. Đồng bộ chính sách kinh tế - xã hội
4. Tôn trọng quy luật khách quan
5. Dám nghĩ, dám làm, dám chịu trách nhiệm

---

## 🤖 Sử Dụng AI Có Trách Nhiệm

### 1. **ChatGPT-4** (OpenAI)
- **Mục đích**: Nghiên cứu nội dung lịch sử
- **Prompt**: "Phân tích cải cách giá-lương-tiền 1985..."
- **Chỉnh sửa**: Đối chiếu giáo trình, bổ sung dẫn chứng
- **Kiểm chứng**: Giáo trình Lịch sử Đảng CSVN (NXB Chính trị 2021)

### 2. **GitHub Copilot**
- **Mục đích**: Hỗ trợ code React components
- **Prompt**: "Create Hero section with GSAP..."
- **Chỉnh sửa**: Tùy chỉnh màu sắc, nội dung, timing
- **Kiểm chứng**: Test browser, performance check

### 3. **Claude Sonnet 4.5**
- **Mục đích**: Thiết kế quiz và logic
- **Prompt**: "Tạo 5 câu hỏi về Đổi mới 1986..."
- **Chỉnh sửa**: Đối chiếu giáo trình, điều chỉnh độ khó
- **Kiểm chứng**: Nghị quyết Đại hội VI

### 4. **Cam Kết Liêm Chính**
✅ Không để AI làm thay hoàn toàn  
✅ Kiểm chứng mọi thông tin với nguồn chính thống  
✅ Chịu trách nhiệm về nội dung học thuật  
✅ AI chỉ hỗ trợ công cụ, không thay thế tư duy  

---

## 📊 Đánh Giá Theo Rubric

### Phần I - Sản Phẩm Sáng Tạo (20%)

#### 1. Chiều sâu học thuật & Liên kết lý thuyết (3đ)
✅ Vận dụng đúng lý thuyết từ giáo trình  
✅ Phân tích logic 4 phần: Bối cảnh → Cải cách → Tác động → Bài học  
✅ Gắn kết với LO về tư duy phản biện lịch sử  

#### 2. Sáng tạo, Hình thức & Tính trình bày (2đ)
✅ Website interactive (không phải slide)  
✅ Animations 3D, parallax, scroll effects  
✅ Thiết kế rõ ràng, dễ tương tác  

#### 3. Tính tương tác (2đ)
✅ Quiz game 5 câu hỏi  
✅ Tab navigation  
✅ Hover effects, click animations  
✅ Scroll-triggered reveals  

#### 4. Ứng dụng AI (2đ)
✅ 0.5đ - Phụ lục AI Usage minh bạch  
✅ 0.5đ - Kiểm chứng nguồn chính thống  
✅ 0.5đ - Cam kết liêm chính  
✅ 0.5đ - Ứng dụng sáng tạo (animations, quiz, layout)  

#### 5. Tính cập nhật & Gắn kết thực tiễn (1đ)
✅ Case study COVID-19  
✅ Cách mạng 4.0, phát triển bền vững  
✅ Hội nhập WTO, FTA  

---

## 📖 Nguồn Tham Khảo

### Chính Thống
1. **Giáo trình Lịch sử Đảng Cộng sản Việt Nam** (NXB Chính trị Quốc gia, 2021)
   - Trang 251-260: Đại hội V và cải cách 1982-1986
   - Trang 260-285: Đại hội VI và đổi mới 1986-1996

2. **Nghị quyết Đại hội VI** (12/1986)

3. **Văn kiện Đảng** các kỳ Đại hội

### Hỗ Trợ
- FlyonUI Templates (tham khảo animations)
- GSAP Documentation
- Framer Motion Docs
- React TypeScript Handbook

---

## 🎯 Hướng Dẫn Thuyết Trình

### Chuẩn Bị (Trước buổi thuyết trình)
1. ✅ Kiểm tra laptop, internet
2. ✅ Clone project về máy cá nhân
3. ✅ Run `npm install` và `npm run dev`
4. ✅ Test toàn bộ tính năng (quiz, scroll, animations)
5. ✅ Chuẩn bị script thuyết trình 10-15 phút

### Nội Dung Thuyết Trình (10-20 phút)
1. **Giới thiệu** (2 phút)
   - Mục đích sản phẩm
   - Câu hỏi chủ đề

2. **Demo Hero & Timeline** (3 phút)
   - Showcase 3D animations
   - Scroll qua timeline 1975-2018

3. **Trả lời câu hỏi chủ đề** (5 phút)
   - Demo tab navigation
   - Giải thích 4 phần

4. **Tương tác Quiz** (3 phút)
   - Mời 1-2 người chơi quiz
   - Show scoring system

5. **AI Usage Report** (3 phút)
   - Minh bạch việc dùng AI
   - Cam kết liêm chính

6. **Q&A** (5 phút)

### Phản Biện (20 phút)
- Trả lời câu hỏi từ giảng viên và sinh viên
- Bảo vệ quan điểm học thuật
- Giải thích lựa chọn thiết kế

---

## 👨‍💻 Sinh Viên Thực Hiện

**Họ tên**: [Điền tên]  
**MSSV**: [Điền mã]  
**Lớp**: [Điền lớp]  
**Môn**: Lịch sử Đảng Cộng sản Việt Nam  
**Giảng viên hướng dẫn**: [Điền tên GV]  

---

## 📝 License & Credits

### Frameworks & Libraries
- React, Vite, TypeScript (MIT License)
- GSAP (Commercial-friendly license)
- Framer Motion (MIT License)
- Tailwind CSS (MIT License)

### Inspiration
- FlyonUI AI Tool Landing Page (design reference)

### Content Source
- Giáo trình chính thống của Bộ GD&ĐT
- Văn kiện Đảng CSVN

---

## 🔧 Troubleshooting

### Lỗi thường gặp

**1. Cannot find module 'gsap'**
```bash
npm install gsap framer-motion react-intersection-observer react-countup
```

**2. Port 5173 already in use**
```bash
# Kill existing process
Get-Process -Name node | Stop-Process -Force
npm run dev
```

**3. Animations không chạy**
- Clear browser cache (Ctrl+Shift+R)
- Check console for errors
- Restart dev server

---

## 📞 Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề kỹ thuật hoặc cần giải thích thêm về nội dung học thuật, vui lòng liên hệ:

- **Email**: [Điền email]
- **Facebook**: [Điền link]
- **Zalo**: [Điền số]

---

**🇻🇳 Xây dựng Việt Nam ngày càng giàu mạnh, dân chủ, văn minh! 🇻🇳**
