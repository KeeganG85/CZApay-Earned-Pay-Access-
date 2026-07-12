import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean;
}

export default function CZApayLogo({ className = "h-9" }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`} id="czapay-logo-container">
      <img 
        src="/czapay-logo.jpg" 
        alt="CZApay Logo" 
        className="h-full w-auto object-contain select-none mix-blend-multiply"
        id="czapay-logo-img"
      />
    </div>
  );
}
