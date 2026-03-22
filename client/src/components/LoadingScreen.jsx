import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-6">
      {/* Loader */}
      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-indigo-500 animate-loading-bar"></div>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-semibold mb-2">🚀 Waking up the server...</h1>

      {/* Message */}
      <p className="text-gray-400 text-sm text-center max-w-md">
        Our backend is hosted on Render's free tier, so it may take a few
        seconds to start. Thanks for your patience 🙏
      </p>

      {/* Animation style */}
      <style>
        {`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-loading-bar {
            animation: loading 2s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
