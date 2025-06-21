import React, { useState, useEffect, useRef } from "react";

const NavBar = () => {
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
    <header className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 lg:px-14 py-4 bg-black/60 backdrop-blur-xl border-b border-white/10 z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'} shadow-lg`} style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}>
      <div className="font-orbitron text-white text-xl lg:text-2xl cursor-pointer select-none" onClick={() => window.location.href = '/'}>
        SigmaScore
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a href="/" className="text-white/90 hover:text-vr-pink font-semibold transition-colors">Home</a>
        <a href="/dashboard" className="text-white/90 hover:text-vr-pink font-semibold transition-colors">Dashboard</a>
        <a href="/scanner" className="text-white/90 hover:text-vr-pink font-semibold transition-colors">Sigma Scanner</a>
        <a href="/login" className="ml-4 bg-gradient-to-r from-vr-pink to-vr-red text-white text-xs font-bold px-6 py-2.5 rounded shadow hover:scale-105 transition-transform ring-4 ring-vr-pink/40 ring-offset-2 ring-offset-black animate-pulse">Log In</a>
      </nav>
      {/* Hamburger Menu */}
      <div className="md:hidden flex items-center">
      <div className="flex items-center gap-2">
      <button
          className="bg-gradient-to-r from-vr-pink to-vr-red text-white text-xs font-bold px-6 py-2.5 rounded"
          onClick={() => window.location.href = '/leaderboard'}
        >
          Leaderboard
        </button>
        <button
          className="bg-gradient-to-r from-vr-pink to-vr-red text-white text-xs font-bold px-6 py-2.5 rounded"
          onClick={() => window.location.href = '/login'}
        >
          Log In
        </button>
        {/* Hamburger Menu */}
        <button
          className="ml-2 flex flex-col justify-center items-center w-10 h-10 rounded bg-white/20 backdrop-blur-md hover:bg-white/40 shadow-md"
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
        <div className="absolute right-4 top-16 bg-black/90 backdrop-blur-xl rounded shadow-lg py-4 px-6 flex flex-col space-y-4 z-30 min-w-[150px] border border-white/10">
          <a href="/" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Home</a>
          <a href="/dashboard" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Dashboard</a>
          <a href="/scanner" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Sigma Scanner</a>
          <a href="/login" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Log In</a>
        </div>
      )}
    </div>
    {/* End Hamburger Menu */}
  </header>
  );
};

export default NavBar;
