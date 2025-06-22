import React, { useState } from "react";
import NavBar from "../components/ui/NavBar";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
  const profilePic = "/gigachad.gif"; // Use your own avatar if available
  const rankImg = "/placeholder.svg"; // Replace with a real rank image if available

  return (
    <div className="min-h-screen bg-vr-gradient relative overflow-hidden">
      <NavBar />
      <div className="max-w-5xl mx-auto pt-32 pb-16 px-4">
        {/* Sigma Score & Rank */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full border-4 border-vr-pink object-cover bg-black/30" />
            <div>
              <h2 className="font-orbitron text-3xl text-white font-bold mb-2">Your Sigma Score</h2>
              <div className="text-6xl font-black text-vr-pink">{sigmaScore}</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <img src={rankImg} alt="Rank" className="w-24 h-24 rounded-2xl border-4 border-vr-purple object-cover bg-black/30" />
            <div>
              <h3 className="font-orbitron text-2xl text-white font-bold mb-2">Rank</h3>
              <div className="text-4xl font-bold text-vr-purple">{sigmaRank}</div>
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-10">
          <h2 className="font-orbitron text-2xl text-white font-bold mb-6">Leaderboard</h2>
          <ol className="space-y-3">
            {leaderboard.map((entry, i) => (
              <li key={entry.name} className={`flex items-center justify-between px-4 py-2 rounded-lg ${entry.name === "You" ? "bg-vr-pink/30 text-white font-bold" : "bg-white/5 text-white/80"}`}>
                <span>{i + 1}. {entry.name}</span>
                <span>{entry.score}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Daily Tasks */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-10">
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

        {/* Sigma Scanner */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h2 className="font-orbitron text-2xl text-white font-bold mb-4">Sigma Scanner</h2>
          <p className="text-white/80 mb-6 text-center max-w-md">Scan your aura and get personalized sigma insights. Ready to see your true potential?</p>
          <button
            className="bg-gradient-to-r from-vr-purple via-vr-red to-vr-coral text-white font-bold px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => window.location.href = '/scanner'}
          >
            Launch Sigma Scanner
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
