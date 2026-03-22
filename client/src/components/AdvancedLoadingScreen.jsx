import React from "react";
import logo from "../assets/logo.png";

// logos
import reactLogo from "../assets/react.png";
import javaLogo from "../assets/java.png";
import pythonLogo from "../assets/python.png";
import firecrawlLogo from "../assets/firecrawl.png";
import socketLogo from "../assets/socket.png";
import dbLogo from "../assets/database.png";

const services = [
  { name: "Frontend Client", logo: reactLogo },
  { name: "Main API Server", logo: javaLogo },
  { name: "RAG Engine", logo: pythonLogo },
  { name: "Vector DB", logo: dbLogo },
  { name: "Firecrawl", logo: firecrawlLogo },
  { name: "Socket.IO", logo: socketLogo },
];

const AdvancedLoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white overflow-hidden">
      <div className="relative w-full max-w-6xl h-105">
        {/* LEFT SIDE SERVICES */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6">
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Logo */}
              <img
                src={service.logo}
                alt={service.name}
                className="w-6 h-6 object-contain"
              />

              {/* Name */}
              <div className="text-sm font-semibold text-gray-200 w-40">
                {service.name}
              </div>

              {/* Dot */}
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
            </div>
          ))}
        </div>

        {/* SVG CURVED LINES */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 420"
          fill="none"
        >
          {services.map((_, i) => {
            const y = 60 + i * 55;

            return (
              <g key={i}>
                {/* Curve */}
                <path
                  d={`M 200 ${y} C 350 ${y} 450 210 600 210`}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  opacity="0.5"
                  fill="none"
                />

                {/* Flow Particle */}
                <circle r="3" fill="white">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.3}s`}
                    path={`M 200 ${y} C 350 ${y} 450 210 600 210`}
                  />
                </circle>
              </g>
            );
          })}

          {/* Gradient */}
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* RIGHT SIDE OUTPUT */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-start">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
            <h1 className="text-3xl font-extrabold tracking-wide">RAG Flow</h1>
          </div>

          {/* Gradient Bar */}
          <div className="h-1 w-52 bg-linear-to-r from-green-400 via-blue-500 to-purple-500 mt-2 rounded-full animate-pulse" />

          {/* Message */}
          <p className="text-gray-400 text-sm mt-3 max-w-xs leading-relaxed">
            Initializing services... <br />
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 backdrop-blur-sm">
              <span className="animate-pulse">⏳</span>
              <span>
                Server is waking up{" "}
                <span className="text-gray-500">(Render free tier)</span>
              </span>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLoadingScreen;
