import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean;
}

export default function CZApayLogo({ className = "h-9", showText = true, lightText = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`} id="czapay-logo-container">
      {/* High-Fidelity SVG Brand Logo matching the uploaded design */}
      <svg
        viewBox="0 0 180 100"
        className="h-full w-auto select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CZApay"
        id="czapay-logo-svg"
      >
        <title>CZApay Logo</title>
        <defs>
          {/* Left Circle: Beautiful sky-to-royal blue gradient */}
          <linearGradient id="logoLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="40%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          
          {/* Right Circle: Rich royal-to-deep blue gradient */}
          <linearGradient id="logoRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="70%" stopColor="#111827" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          {/* Smooth shadow effect for depth between the circles */}
          <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Right Circle (Behind / Back layer) */}
        <circle 
          cx="116" 
          cy="50" 
          r="42" 
          fill="url(#logoRightGrad)" 
          id="logo-circle-right"
        />

        {/* Left Circle (Front layer with shadow to create modern depth) */}
        <circle 
          cx="64" 
          cy="50" 
          r="42" 
          fill="url(#logoLeftGrad)" 
          filter="url(#logoShadow)"
          id="logo-circle-left"
        />

        {/* Intersecting central highlight to match the smooth 3D blend of the uploaded logo */}
        <circle 
          cx="90" 
          cy="50" 
          r="18" 
          fill="#38BDF8" 
          opacity="0.15" 
          id="logo-circle-overlap"
        />

        {/* Centered White "CZApay" text overlay */}
        {showText && (
          <text
            x="90"
            y="57"
            fill="#FFFFFF"
            fontSize="23"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            fontWeight="800"
            textAnchor="middle"
            letterSpacing="-0.04em"
            dominantBaseline="middle"
            id="czapay-logo-text"
          >
            CZApay
          </text>
        )}
      </svg>
    </div>
  );
}
