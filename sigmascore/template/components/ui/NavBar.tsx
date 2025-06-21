import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) {
        setShowNav(true);
      } else if (window.scrollY > lastScrollY.current) {
        setShowNav(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 lg:px-14 py-6 bg-vr-gradient/80 backdrop-blur-md z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="font-orbitron text-white text-xl lg:text-2xl cursor-pointer" onClick={() => window.location.href = '/'}>
        SigmaScore
      </div>
      <div className="flex items-center gap-2">
        {!isLoginPage && (
          <button
            className="bg-gradient-to-r from-vr-pink to-vr-red text-white text-xs font-bold px-6 py-2.5 rounded"
            onClick={() => window.location.href = '/login'}
          >
            Log In
          </button>
        )}
        {/* Hamburger Menu */}
        <button
          className="ml-2 flex flex-col justify-center items-center w-10 h-10 rounded bg-white/30 backdrop-blur-md hover:bg-white/50 shadow-md"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <span className={`block w-6 h-0.5 bg-vr-deep mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-vr-deep mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-vr-deep transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
      {/* Hamburger Dropdown */}
      {menuOpen && (
        <div className="absolute right-4 top-16 bg-black/90 backdrop-blur-md rounded shadow-lg py-4 px-6 flex flex-col space-y-4 z-30 min-w-[150px]">
          <button className="text-white font-bold text-left hover:text-vr-pink" onClick={() => window.location.href = '/'}>Home</button>
          <button className="text-white font-bold text-left hover:text-vr-pink" onClick={() => window.location.href = '/dashboard'}>Dashboard</button>
          <button className="text-white font-bold text-left hover:text-vr-pink" onClick={() => window.location.href = '/scanner'}>Sigma Scanner</button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
