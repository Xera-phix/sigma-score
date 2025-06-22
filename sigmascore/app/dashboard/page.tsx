"use client";
// ...existing code from template/pages/Dashboard.tsx...
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import NavBar from "../../components/ui/NavBar";
import { auth } from "../../lib/firebase";
import { getUserData, getLeaderboard } from "../../lib/firestore";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [sigmaScore, setSigmaScore] = useState(0);
  const [sigmaRank, setSigmaRank] = useState("Newbie");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setUserName(user.displayName || "You");
        setUserPhoto(user.photoURL || "/gigachad.gif");
        
        // Fetch user data from Firestore
        const userData = await getUserData(user.uid);
        if (userData) {
          setSigmaScore(userData.sigmaScore);
          setSigmaRank(getRankFromScore(userData.sigmaScore));
        }
        
        // Fetch leaderboard data
        const leaderboardData = await getLeaderboard(5);
        setLeaderboard(leaderboardData);
      } else {
        // Redirect to login if not authenticated
        window.location.href = '/login';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to determine rank based on sigma score
  const getRankFromScore = (score: number): string => {
    if (score >= 80) return "Sigma Legend";
    if (score >= 60) return "Sigma Pro";
    if (score >= 40) return "Sigma Elite";
    if (score >= 20) return "Sigma Warrior";
    if (score >= 10) return "Sigma Initiate";
    return "Newbie";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vr-gradient relative overflow-hidden">
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }
  // Example data
  const sigmaScore = 1420;
  const sigmaRank = "Sigma Pro";
  const leaderboard = [
    { name: "Gigachad", score: 2000 },
    { name: "SigmaMaster", score: 1800 },
    { name: "You", score: sigmaScore },
    { name: "AlphaWolf", score: 1200 },
    { name: "BetaTester", score: 900 },
  ];
  const dailyTasks = [
    { task: "Complete 3 aura challenges", done: false, points: 50 },
    { task: "Log in to Sigma Sanctuary", done: true, points: 10 },
    { task: "Share your score on social media", done: false, points: 25 },
  ];
  // Example images
  const profilePic = "/gigachad.gif";
  const rankImg = "/placeholder.svg";

  // Dynamic background state
  const [glows, setGlows] = useState([
    { x: -32, y: -32, size: 400, color: 'bg-purple-700', blur: 'blur-3xl', opacity: 'opacity-40' },
    { x: 0, y: 0, size: 300, color: 'bg-purple-500', blur: 'blur-2xl', opacity: 'opacity-30' },
    { x: 0, y: 0, size: 200, color: 'bg-purple-900', blur: 'blur-2xl', opacity: 'opacity-20' },
    { x: 0, y: 0, size: 320, color: 'bg-fuchsia-700', blur: 'blur-3xl', opacity: 'opacity-30' },
    { x: 0, y: 0, size: 260, color: 'bg-vr-pink', blur: 'blur-2xl', opacity: 'opacity-20' },
    { x: 0, y: 0, size: 180, color: 'bg-purple-400', blur: 'blur-2xl', opacity: 'opacity-25' },
  ]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Get window size for bounds
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let frame: number;
    let t = 0;
    let running = true;
    function animate() {
      if (!running) return;
      t += 0.018;
      const w = windowSize.width || 1200;
      const h = windowSize.height || 900;
      setGlows([
        {
          x: Math.sin(t / 1.2) * (w * 0.6),
          y: Math.cos(t / 1.5) * (h * 0.5),
          size: 400, color: 'bg-purple-700', blur: 'blur-3xl', opacity: 'opacity-40'
        },
        {
          x: Math.cos(t / 1.7) * (w * 0.45),
          y: Math.sin(t / 1.3) * (h * 0.45),
          size: 300, color: 'bg-purple-500', blur: 'blur-2xl', opacity: 'opacity-30'
        },
        {
          x: Math.sin(t / 2.2 + 1.5) * (w * 0.5),
          y: Math.cos(t / 2.5 + 2.2) * (h * 0.4),
          size: 320, color: 'bg-fuchsia-700', blur: 'blur-3xl', opacity: 'opacity-30'
        },
        {
          x: Math.cos(t / 1.4 + 2.5) * (w * 0.42),
          y: Math.sin(t / 1.6 + 1.2) * (h * 0.38),
          size: 260, color: 'bg-vr-pink', blur: 'blur-2xl', opacity: 'opacity-20'
        },
      ]);
      frame = requestAnimationFrame(animate);
    }
    running = true;
    animate();
    // Fix: also resume animation on scroll
    const onScroll = () => {
      if (!running) {
        running = true;
        animate();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [windowSize]);

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Dynamic Purple Glow Effects */}
      {glows.map((g, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: g.size + 'px',
            height: g.size + 'px',
            top: `calc(50% + ${g.y}px)`,
            left: `calc(50% + ${g.x}px)`,
            borderRadius: '9999px',
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'top 0.18s, left 0.18s',
            transform: 'translate(-50%, -50%)',
          }}
          className={`${g.color} ${g.opacity} ${g.blur}`}
        />
      ))}
      <NavBar />
      <div className="relative z-10 max-w-5xl mx-auto pt-32 pb-16 px-4">
        {/* Sigma Score & Rank - Full Top Row */}
        <section className="bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <img src={userPhoto} alt="Profile" className="w-28 h-28 rounded-full border-4 border-vr-pink object-cover bg-black/30" />
            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full border-4 border-vr-pink object-cover bg-black/30 shadow-xl" />
            <div>
              <h2 className="font-orbitron text-3xl text-white font-bold mb-2">Your Sigma Score</h2>
              <div className="text-6xl font-black text-vr-pink drop-shadow-lg">{sigmaScore}</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl border-4 border-vr-purple bg-gradient-to-br from-vr-purple to-vr-pink flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
          <div className="flex items-center" style={{ marginLeft: '-32px' }}>
            <div>
              <h3 className="font-orbitron text-2xl text-white font-bold mb-2">Rank</h3>
              <div className="text-4xl font-bold text-vr-purple drop-shadow">{sigmaRank}</div>
            </div>
          </div>
        </section>
        {/* Leaderboard & Scanner Side by Side */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <section className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-2xl text-white font-bold">
                Top Sigma Scores
          <section className="flex-1 bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-xl p-8 backdrop-blur-xl">
            <div className="flex items-center mb-6">
              <h2 className="font-orbitron text-2xl text-white font-bold flex-1">
                Sigma Leaderboard
              </h2>
              <button
                className="bg-vr-pink text-white font-bold px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
                onClick={() => window.location.href = '/leaderboard'}
              >
                View All
              </button>
              <div className="flex-1 flex justify-end">
                <button
                  className="bg-gradient-to-r from-vr-purple to-vr-pink text-white font-bold px-4 py-2 rounded-lg shadow ring-2 ring-vr-pink/40 ring-offset-2 ring-offset-black hover:scale-105 transition-transform"
                  onClick={() => window.location.href = '/leaderboard'}
                >
                  Visit Leaderboard
                </button>
              </div>
            </div>
            {leaderboard.length > 0 ? (
              <div className="space-y-3">
                {leaderboard.map((entry, i) => {
                  const getRankIcon = (rank: number) => {
                    if (rank === 1) return "🥇";
                    if (rank === 2) return "🥈";
                    if (rank === 3) return "🥉";
                    return "🏅";
                  };
                  
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        entry.uid === user?.uid
                          ? "bg-vr-pink/30 text-white font-bold border border-vr-pink/50"
                          : "bg-white/5 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getRankIcon(i + 1)}</span>
                        <div>
                          <div className="font-semibold">
                            {entry.displayName || `${entry.firstName} ${entry.lastName}` || "Anonymous"}
                          </div>
                          <div className="text-xs text-white/60">
                            {entry.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-vr-pink">{entry.sigmaScore}</div>
                        <div className="text-xs text-white/60">
                          {getRankFromScore(entry.sigmaScore)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/60 mb-2">No users found in leaderboard</p>
                <p className="text-white/40 text-sm">Be the first to scan and join the rankings!</p>
                <button 
                  className="mt-4 bg-vr-pink text-white px-4 py-2 rounded-lg hover:bg-vr-red transition text-sm"
                  onClick={() => window.location.href = '/scanner'}
                >
                  Start Scanning
                </button>
              </div>
            )}
            <ol className="space-y-3">
              {leaderboard.map((entry, i) => (
                <li
                  key={entry.name}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${
                    entry.name === "You"
                      ? "bg-vr-pink/30 text-white font-bold border-0 shadow"
                      : "bg-white/5 text-white/80 border-0"
                  }`}
                >
                  <span>{i + 1}. {entry.name}</span>
                  <span>{entry.score}</span>
                </li>
              ))}
            </ol>
          </section>
          {/* Scanner Column */}
          <div className="md:w-[340px] w-full flex-shrink-0 mt-10 md:mt-0 flex md:items-center">
            <section className="bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full w-full backdrop-blur-xl">
              <h2 className="font-orbitron text-2xl text-white font-bold mb-4">Sigma Scanner</h2>
              <p className="text-white/80 mb-6 text-center max-w-md">Scan your aura and get personalized sigma insights. Ready to see your true potential?</p>
              <button
                className="bg-gradient-to-r from-purple-500 via-vr-pink to-pink-500 text-white font-bold px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() => window.location.href = '/scanner'}
              >
                Launch Sigma Scanner
              </button>
            </section>
          </div>
        </div>
        {/* Recent Activity */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-10">
          <h2 className="font-orbitron text-2xl text-white font-bold mb-6">Recent Activity</h2>
          <div className="text-center py-8">
            <p className="text-white/60">Your recent scans and achievements will appear here.</p>
            <p className="text-white/40 text-sm mt-2">Start scanning to see your activity!</p>
          </div>
        {/* Daily Tasks */}
        <section className="bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-xl p-8 mb-10 backdrop-blur-xl">
          <h2 className="font-orbitron text-2xl text-white font-bold mb-6">Daily Tasks</h2>
          <ul className="space-y-3">
            {dailyTasks.map((t, i) => (
              <li key={i} className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={t.done} readOnly className="accent-vr-pink w-5 h-5" />
                  <span className={t.done ? "line-through text-white/50" : "text-white"}>{t.task}</span>
                </div>
                <span className="text-vr-pink font-bold text-lg">+{t.points}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
