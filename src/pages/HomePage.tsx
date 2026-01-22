import React from "react";
import HeroHCM from "../components/sections/HeroHCM";
import HistoricalContext from "../components/sections/HistoricalContext";
import JourneyTimeline from "../components/sections/JourneyTimeline";
import IdeologicalAwakening from "../components/sections/IdeologicalAwakening";
import PartyPreparation from "../components/sections/PartyPreparation";
import ReturnToHomeland from "../components/sections/ReturnToHomeland";
import LegacySignificance from "../components/sections/LegacySignificance";

const HomePage: React.FC = () => {
  return (
    <main>
      {/* Hero Section - Theo Dấu Chân Bác Hồ */}
      <HeroHCM />
      
      {/* Phần 1: Bối Cảnh Lịch Sử */}
      <HistoricalContext />
      
      {/* Phần 2: Hành Trình Bôn Ba (1911-1917) */}
      <JourneyTimeline />
      
      {/* Phần 3: Giác Ngộ Lý Tưởng (1917-1924) */}
      <IdeologicalAwakening />
      
      {/* Phần 4: Chuẩn Bị & Thành Lập Đảng (1925-1930) */}
      <PartyPreparation />
      
      {/* Phần 5: Trở Về Tổ Quốc (1930-1941) */}
      <ReturnToHomeland />
      
      {/* Phần 6: Ý Nghĩa & Di Sản */}
      <LegacySignificance />
    </main>
  );
};

export default HomePage;
