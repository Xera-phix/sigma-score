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
  // Daily tasks state
  const [dailyTasks, setDailyTasks] = useState([
    { task: "mew for 10 min, no mouth breathing", done: false, points: 50 },
    { task: "send a mewing selfie (bonus: confused friend)", done: false, points: 25 },
    { task: "rate your jawline in the mirror", done: false, points: 10 },
  ]);

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

  // Handler to toggle task completion
  const handleToggleTask = (idx: number) => {
    setDailyTasks(tasks =>
      tasks.map((t, i) =>
        i === idx ? { ...t, done: !t.done } : t
      )
    );
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
      <div className="relative z-10 max-w-5xl mx-auto pt-32 pb-16 px-4 flex flex-col gap-10">
        {/* Sigma Score & Rank - Full Top Row */}
        <section className="bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full border-4 border-vr-pink object-cover bg-black/30 shadow-xl" />
            <div>
              <h2 className="font-orbitron text-3xl text-white font-bold mb-2">Your Sigma Score</h2>
              <div className="text-6xl font-black text-vr-pink drop-shadow-lg">{sigmaScore}</div>
            </div>
          </div>
          <div className="flex items-center" style={{ marginLeft: '-32px' }}>
            <div>
              <h3 className="font-orbitron text-3xl text-white font-bold mb-2">Rank</h3>
              <div className="text-4xl font-bold text-vr-purple drop-shadow">{sigmaRank}</div>
            </div>
          </div>
        </section>
        {/* Leaderboard & Scanner Side by Side */}
        <div className="flex flex-col md:flex-row gap-8">
          <section className="flex-1 bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-xl p-8 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex items-center mb-6">
              <h2 className="font-orbitron text-3xl text-white font-extrabold tracking-wide flex-1 drop-shadow-lg">
                Leaderboard
              </h2>
              <div className="flex-1 flex justify-end">
                <button
                  className="bg-gradient-to-r from-vr-purple to-vr-pink text-white font-bold px-4 py-2 rounded-lg shadow ring-2 ring-vr-pink/40 ring-offset-2 ring-offset-black hover:scale-105 transition-transform"
                  onClick={() => window.location.href = '/leaderboard'}
                >
                  See All
                </button>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-vr-purple/40 to-black/60 border border-vr-pink/30 shadow-xl p-4 backdrop-blur-md">
              <ol className="space-y-2">
                {leaderboard && leaderboard.length > 0 ? (() => {
                  // Sort and find user index
                  const sorted = [...leaderboard].sort((a, b) => (b.sigmaScore ?? b.score ?? 0) - (a.sigmaScore ?? a.score ?? 0));
                  const userIdx = sorted.findIndex(
                    entry =>
                      entry.displayName === userName ||
                      entry.name === userName ||
                      entry.email === user?.email
                  );
                  let start = Math.max(0, userIdx - 1);
                  let end = Math.min(sorted.length, userIdx + 2);
                  if (userIdx === -1) {
                    start = 0;
                    end = Math.min(sorted.length, 3);
                  }
                  return sorted.slice(start, end).map((entry, i) => {
                    const realRank = sorted.indexOf(entry) + 1;
                    const isUser =
                      entry.displayName === userName ||
                      entry.name === userName ||
                      entry.email === user?.email;
                    // Rank badge
                    let badge = null;
                    if (realRank === 1) badge = <span className="ml-2 text-yellow-400 text-xl">🥇</span>;
                    else if (realRank === 2) badge = <span className="ml-2 text-gray-300 text-xl">🥈</span>;
                    else if (realRank === 3) badge = <span className="ml-2 text-orange-400 text-xl">🥉</span>;
                    return (
                      <li
                        key={entry.id || entry.name || i}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group
                          ${isUser
                            ? "bg-vr-pink/30 text-white font-bold border border-vr-pink/40 shadow-lg ring-2 ring-vr-pink/30"
                            : "bg-white/5 text-white/80 border border-white/10"
                          }
                        `}
                        style={{
                          boxShadow: isUser
                            ? "0 2px 16px 0 #ff5ec7a0"
                            : undefined,
                          position: "relative"
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-orbitron text-lg w-8 text-center text-vr-pink">{realRank}</span>
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg
                            ${isUser ? "bg-vr-pink text-white" : "bg-vr-purple/40 text-white/80"}
                            shadow-md border-2 border-vr-pink/40`}>
                            {(entry.displayName || entry.name || entry.email || "A").charAt(0).toUpperCase()}
                          </div>
                          <span className={`ml-2 ${isUser ? "text-white" : "text-white/90"} font-semibold`}>
                            {entry.displayName || entry.name || entry.email || "Anonymous"}
                            {isUser && (
                              <span className="ml-2 text-vr-pink text-xs font-semibold animate-pulse">(you)</span>
                            )}
                            {badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-vr-pink text-xl">{entry.sigmaScore ?? entry.score ?? 0}</span>
                          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-vr-pink to-vr-purple"
                              style={{
                                width: `${Math.min(100, (entry.sigmaScore ?? entry.score ?? 0))}%`,
                                transition: "width 0.5s"
                              }}
                            ></div>
                          </div>
                        </div>
                      </li>
                    );
                  });
                })() : (
                  <li className="text-white/60 px-4 py-2">no leaderboard data yet</li>
                )}
              </ol>
              {leaderboard && leaderboard.length > 0 && (
                <div className="mt-4 text-xs text-white/60 text-center">
                  showing {Math.min(leaderboard.length, 3)} of {leaderboard.length} users
                </div>
              )}
            </div>
          </section>
          {/* Scanner Column */}
          <div className="md:w-[340px] w-full flex-shrink-0 flex md:items-center">
            <section className="bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full w-full backdrop-blur-xl">
              <h2 className="font-orbitron text-3xl text-white font-bold mb-4">Sigma Scanner</h2>
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
        <section className="bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-xl p-8 backdrop-blur-xl w-full mt-0">
          <h2 className="font-orbitron text-3xl text-white font-bold mb-6">Daily Tasks</h2>
          <ul className="space-y-3">
            {dailyTasks.map((t, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 justify-between transition-all duration-300 ${
                  t.done ? "bg-vr-pink/10" : "bg-white/5"
                } rounded-lg px-3 py-2 group`}
              >
                <div className="flex items-center gap-3">
                  <button
                    aria-label={t.done ? "Mark as incomplete" : "Mark as complete"}
                    onClick={() => handleToggleTask(i)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${t.done ? "border-vr-pink bg-vr-pink/80" : "border-white/40 bg-black/30"}
                      group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-vr-pink`}
                  >
                    {t.done ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : null}
                  </button>
                  <span className={`transition-colors duration-200 ${t.done ? "line-through text-white/50" : "text-white"}`}>
                    {t.task}
                  </span>
                </div>
                <span className={`text-vr-pink font-bold text-lg transition-all duration-200 ${t.done ? "opacity-40" : "opacity-100"}`}>
                  +{t.points}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;