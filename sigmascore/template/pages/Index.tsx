import React from "react";
import NavBar from "../components/ui/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-vr-gradient relative overflow-hidden">
      <NavBar />
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Left radial gradient */}
        <div
          className="absolute w-[300px] md:w-[676px] h-[300px] md:h-[651px] rounded-full opacity-60"
          style={{
            left: "-150px",
            top: "150px",
            background:
              "radial-gradient(40.17% 39.79% at 50% 50%, rgba(170, 20, 240, 0.31) 0%, rgba(170, 20, 240, 0.00) 100%)",
          }}
        />

        {/* Right radial gradient */}
        <div
          className="absolute w-[300px] md:w-[668px] h-[300px] md:h-[644px] rounded-full opacity-60"
          style={{
            right: "-150px",
            top: "200px",
            background:
              "radial-gradient(40.17% 39.79% at 50% 50%, rgba(170, 20, 240, 0.31) 0%, rgba(170, 20, 240, 0.00) 100%)",
          }}
        />

        {/* Top radial gradient */}
        <div
          className="absolute w-[400px] md:w-[573px] h-[300px] md:h-[552px] rounded-full opacity-60"
          style={{
            left: "-100px",
            top: "-150px",
            background:
              "radial-gradient(40.17% 39.79% at 50% 50%, rgba(170, 20, 240, 0.31) 0%, rgba(170, 20, 240, 0.00) 100%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="pt-24"></div>

        {/* Hero Section */}
        <section className="px-6 lg:px-14 pb-16">
          <div className="grid xl:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="font-orbitron font-black text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                It's Time
                <br />
                To Start
                <br />
                Building Aura
              </h1>

              <p className="text-white/85 text-sm lg:text-base max-w-lg leading-relaxed">
                With A.I. technology you can gain aura and feel more
                sigma and you can live with a new style.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-gradient-to-r from-vr-purple via-vr-red to-vr-coral text-white text-xs font-bold px-6 py-3 rounded"
                  onClick={() => window.location.href = '/login'}
                >
                  Start Today
                </button>
                <button
                  className="text-white text-xs font-bold px-6 py-3 border border-white/20 rounded hover:bg-white/10 transition-colors"
                  onClick={() => {
                    // Check if logged in (simple check for demo)
                    if (localStorage.getItem('isLoggedIn') === 'true') {
                      window.location.href = '/dashboard';
                    } else {
                      window.location.href = '/login';
                    }
                  }}
                >
                  Dashboard
                </button>
              </div>

              {/* User Avatars */}
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-red-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-2 border-white"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <span className="text-white text-xs font-semibold">
                    400k people online
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - VR Device */}
            <div className="relative order-first xl:order-last">
              {/* Stars decoration */}
              <div className="absolute top-4 right-8 space-y-2 z-10">
                <div className="text-white text-lg">✦</div>
                <div className="text-white text-sm ml-4">✦</div>
                <div className="text-white text-xs ml-8">✦</div>
              </div>

              {/* VR Device Card */}
              <div className="relative bg-gradient-to-b from-purple-900/30 to-purple-800/50 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-purple-500/20 shadow-2xl">
                <div className="space-y-6">
                  {/* Device Image Area */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                    <img src="/gigachad.gif" alt="Device" className="w-full h-full object-cover" />
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="font-orbitron font-bold text-white text-lg lg:text-xl">
                      This Could Be You
                    </h3>
                    <div className="w-full h-px bg-white/30"></div>
                    <p className="text-white/85 text-sm leading-relaxed">
                      Let's be the best for more real and effective results and
                      ready to explore the limitless world that we have prepared
                      for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="px-6 lg:px-14 pt-16">
          <div className="grid xl:grid-cols-2 gap-16 items-center">
            {/* Left Side - VR Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {/* Left VR Image */}
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl border-2 border-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="text-white text-3xl relative z-10">👤</div>
                  </div>
                </div>

                {/* Right VR Image */}
                <div className="relative mt-8 lg:mt-12">
                  <div className="aspect-[3/4] bg-gradient-to-br from-red-600 to-purple-600 rounded-2xl border-2 border-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="text-white text-3xl relative z-10">👤</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6 order-first xl:order-last">
              <h2 className="font-orbitron font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
                New Experience In
                <br />
                Playing Game
              </h2>

              <p className="text-white/85 text-sm lg:text-base leading-relaxed max-w-lg">
                You can try playing the game with a new style and of course a
                more real feel, like you are the main character in your game and
                adventure in this new digital world.
              </p>

              <button className="bg-gradient-to-r from-vr-purple via-vr-red to-vr-coral text-white text-xs font-bold px-6 py-3 rounded">
                Get it Now
              </button>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="pb-16"></div>
        {/* Footer Section */}
        <footer className="bg-gradient-to-r from-vr-magenta to-vr-deep py-10 text-center rounded-t-3xl shadow-2xl">
          <div className="max-w-4xl mx-auto px-4">
            <h4 className="font-orbitron font-bold text-white text-2xl mb-2">Thank you for visiting SigmaScore!</h4>
            <p className="text-white/80 mb-4">Empowering you to build your aura and unlock your sigma potential. Stay tuned for more updates and features.</p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-white hover:text-vr-pink transition-colors font-bold">Contact</a>
              <a href="#" className="text-white hover:text-vr-pink transition-colors font-bold">Privacy</a>
              <a href="#" className="text-white hover:text-vr-pink transition-colors font-bold">Terms</a>
            </div>
            <div className="text-white/60 text-xs">&copy; {new Date().getFullYear()} SigmaScore. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
