import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../lib/firebase";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showNav, setShowNav] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 lg:px-14 py-4 bg-black/60 backdrop-blur-xl border-b border-white/10 z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'} shadow-lg`} style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}>
      <div className="font-orbitron text-white text-xl lg:text-2xl cursor-pointer select-none" onClick={() => window.location.href = '/'}>
        SigmaScore
      </div>

      {/* 🌐 Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="/" className="text-white/90 hover:text-vr-pink font-semibold transition-colors">Home</a>
        <a href="/dashboard" className="text-white/90 hover:text-vr-pink font-semibold transition-colors">Dashboard</a>
        <a href="/scanner" className="text-white/90 hover:text-vr-pink font-semibold transition-colors">Sigma Scanner</a>
        <a href="/leaderboard" className="text-white/90 hover:text-vr-pink font-semibold transition-colors">Leaderboard</a>
        
        {user ? (
          <div className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)} className="w-10 h-10 rounded-full bg-gradient-to-br from-vr-pink to-vr-red flex items-center justify-center text-white font-bold text-lg ring-4 ring-vr-pink/40 ring-offset-2 ring-offset-black">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl rounded-md shadow-lg py-1 border border-white/10">
                <div className="px-4 py-2 text-white/80 text-sm border-b border-white/10">{user.email}</div>
                <a href="/dashboard" className="block px-4 py-2 text-sm text-white hover:bg-vr-pink/20">Dashboard</a>
                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-vr-pink/20">Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="ml-4 bg-gradient-to-r from-vr-pink to-vr-red text-white text-xs font-bold px-6 py-2.5 rounded shadow hover:scale-105 transition-transform">
            Log In
          </a>
        )}
      </nav>

      {/* 📱 Mobile Navigation */}
      <div className="md:hidden flex items-center">
        <div className="flex items-center gap-2">
          <button
            className="bg-gradient-to-r from-vr-pink to-vr-red text-white text-xs font-bold px-6 py-2.5 rounded"
            onClick={() => window.location.href = '/leaderboard'}
          >
            Leaderboard
          </button>
          
          {user ? (
             <button onClick={() => setShowUserMenu(!showUserMenu)} className="w-10 h-10 rounded-full bg-gradient-to-br from-vr-pink to-vr-red flex items-center justify-center text-white font-bold text-lg">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-vr-pink to-vr-red text-white text-xs font-bold px-6 py-2.5 rounded"
              onClick={() => window.location.href = '/login'}
            >
              Log In
            </button>
          )}

          {/* 🍔 Hamburger Menu Button */}
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

        {/* 📱 Hamburger Dropdown */}
        {menuOpen && (
          <div className="absolute right-4 top-16 bg-black/90 backdrop-blur-xl rounded shadow-lg py-4 px-6 flex flex-col space-y-4 z-30 min-w-[150px] border border-white/10">
            <a href="/" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Home</a>
            <a href="/dashboard" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Dashboard</a>
            <a href="/scanner" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Sigma Scanner</a>
            <a href="/leaderboard" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Leaderboard</a>
            {user ? (
              <button onClick={handleSignOut} className="text-white font-bold text-left hover:text-vr-pink transition-colors">Sign Out</button>
            ) : (
              <a href="/login" className="text-white font-bold text-left hover:text-vr-pink transition-colors">Log In</a>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
