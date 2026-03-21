import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogin = () => {
    setUser({ name: "User" });
    setMenuOpen(false);
  };

  const handleGetApiKey = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    navigate("/api-keys");
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div ref={menuRef}>
        {/* Navbar */}
        <div
          className="flex items-center justify-between px-6 py-3 rounded-2xl 
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
        >
          {/* Left */}
          <div className="flex items-center gap-6">
            <h1
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="text-white font-semibold text-lg cursor-pointer"
            >
              RAG API
            </h1>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-5">
              <Link to="/" className="text-gray-300 hover:text-white text-sm">
                Docs
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-white text-sm"
              >
                Pricing
              </Link>
              <Link
                to="/try"
                className="text-gray-300 hover:text-white text-sm"
              >
                Playground
              </Link>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 bg-[#a3c8d8] text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
              >
                {/* Google Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.1-5c-2 1.4-4.5 2.1-7.2 2.1-5.2 0-9.6-3.1-11.3-7.5l-6.6 5.1C9.7 39.6 16.3 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.5-6.5 6.9l6.1 5C38.7 36.1 44 30.6 44 24c0-1.3-.1-2.3-.4-3.5z"
                  />
                </svg>
                Sign in with Google
              </button>
            ) : (
              <span className="text-sm text-gray-300">{user.name}</span>
            )}

            <button
              onClick={handleGetApiKey}
              className="bg-linear-to-r from-blue-500 via-indigo-500 to-cyan-400 
              hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm shadow-md"
            >
              Get API Key
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 flex flex-col gap-3 md:hidden transition-all duration-200">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              Docs
            </Link>

            <Link
              to="/pricing"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              Pricing
            </Link>

            <Link to="/try" className="text-gray-300 hover:text-white text-sm">
              Playground
            </Link>

            {!user ? (
              <button
                onClick={handleLogin}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
              >
                Sign in
              </button>
            ) : (
              <span className="text-gray-300">{user.name}</span>
            )}

            <button
              onClick={handleGetApiKey}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Get API Key
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
