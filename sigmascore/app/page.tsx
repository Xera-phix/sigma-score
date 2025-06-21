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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-vr-purple via-vr-red to-vr-coral">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl p-8 gap-12">
        {/* Left: Dynamic Text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1
            className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            style={{ minHeight: "3.5em" }}
          >
            {dynamicTexts[currentText]}
          </h1>
          <p className="text-lg text-white/80 max-w-md mb-8">
            Experience the next generation of aura analysis and leaderboard
            competition. Upload your image, analyze your aura, and see how you
            rank among the best!
          </p>
          <a
            href="/login"
            className="inline-block bg-white text-vr-purple font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-vr-pink hover:text-white transition-colors"
          >
            Get Started
          </a>
        </div>
        {/* Right: GIF */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/gigachad.gif"
            alt="SigmaScore Hero"
            className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/20 bg-black/30"
            style={{ maxWidth: "100%", maxHeight: "350px" }}
          />
        </div>
      </div>
    </div>
  );
}