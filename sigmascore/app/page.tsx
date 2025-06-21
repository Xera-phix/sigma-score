"use client";

import { useEffect, useState } from "react";

const dynamicTexts = [
  "Welcome to SigmaScore!",
  "Build your aura.",
  "Unlock your sigma potential.",
  "Join the leaderboard.",
  "Scan your aura now!",
];

export default function LandingPage() {
  const [currentText, setCurrentText] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
        setFade(true);
      }, 500);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl p-8 gap-16">
        {/* Left: Dynamic Text & CTA */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1
            className={`text-4xl md:text-6xl font-extrabold text-white mb-8 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{ minHeight: '3.5em' }}
          >
            {dynamicTexts[currentText]}
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-lg mb-10">
            Experience the next generation of aura analysis and leaderboard competition. Upload your image, analyze your aura, and see how you rank among the best!
          </p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-vr-purple via-vr-pink to-vr-coral text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-vr-pink transition-transform text-lg"
          >
            Get Started
          </a>
        </div>
        {/* Right: Animated GIF Card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative bg-gradient-to-br from-purple-500 via-blue-500 to-blue-300 rounded-3xl p-4 md:p-8 shadow-2xl border-2 border-vr-purple/30">
            <img
              src="/gigachad.gif"
              alt="SigmaScore Hero"
              className="w-80 h-80 object-cover rounded-2xl shadow-xl border-4 border-vr-pink/30 bg-black/30"
              style={{ maxWidth: '100%', maxHeight: '350px' }}
            />
          </div>
        </div>
      </div>
      <style>{`
        /* Only keep float keyframes if used elsewhere */
      `}</style>
    </div>
  );
}