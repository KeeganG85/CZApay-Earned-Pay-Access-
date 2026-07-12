import React from "react";
import LandingPage from "./components/LandingPage";

export default function App() {
  const handleNavigateToPortal = () => {
    const el = document.getElementById("ewa-playground");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingPage onNavigateToPortal={handleNavigateToPortal} />
    </div>
  );
}
