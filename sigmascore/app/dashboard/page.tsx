"use client";
// ...existing code from template/pages/Dashboard.tsx...
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
  // Dynamic background state
  const [glows, setGlows] = useState([
    { x: -32, y: -32, size: 400, color: 'bg-purple-700', blur: 'blur-3xl', opacity: 'opacity-40' },
    { x: 0, y: 0, size: 300, color: 'bg-purple-500', blur: 'blur-2xl', opacity: 'opacity-30' },
    { x: 0, y: 0, size: 320, color: 'bg-fuchsia-700', blur: 'blur-3xl', opacity: 'opacity-30' },
    { x: 0, y: 0, size: 260, color: 'bg-vr-pink', blur: 'blur-2xl', opacity: 'opacity-20' },
  ]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // Daily tasks example
  const dailyTasks = [
    { task: "Complete 3 aura challenges", done: false, points: 50 },
    { task: "Log in to Sigma Sanctuary", done: true, points: 10 },
    { task: "Share your score on social media", done: false, points: 25 },
  ];

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

  // Example images
  const profilePic = userPhoto || "/gigachad.gif";

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
            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full border-4 border-vr-pink object-cover bg-black/30 shadow-xl" />
            <div>
              <h2 className="font-orbitron text-3xl text-white font-bold mb-2">Your Sigma Score</h2>
              <div className="text-6xl font-black text-vr-pink drop-shadow-lg">{sigmaScore}</div>
            </div>
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
          <section className="flex-1 bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-xl p-8 backdrop-blur-xl">
            <div className="flex items-center mb-6">
              <h2 className="font-orbitron text-2xl text-white font-bold flex-1">
                Sigma Leaderboard
              </h2>
              <div className="flex-1 flex justify-end">
                <button
                  className="bg-gradient-to-r from-vr-purple to-vr-pink text-white font-bold px-4 py-2 rounded-lg shadow ring-2 ring-vr-pink/40 ring-offset-2 ring-offset-black hover:scale-105 transition-transform"
                  onClick={() => window.location.href = '/leaderboard'}
                >
                  Visit Leaderboard
                </button>
              </div>
            </div>
            <ol className="space-y-3">
              {leaderboard.map((entry, i) => (
                <li
                  key={entry.id || entry.name || i}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${
                    entry.name === userName
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
