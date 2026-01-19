import React from "react";
import { Hero } from "../components/sections/Hero";
import ReformAnalysis from "../components/sections/ReformAnalysis";
import KeyAchievements from "../components/sections/KeyAchievements";

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <ReformAnalysis />
      <KeyAchievements />
    </main>
  );
};

export default HomePage;
