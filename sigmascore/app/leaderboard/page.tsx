"use client";

import React, { useState } from "react";
import NavBar from "../../components/ui/NavBar";

const LeaderboardPage = () => {
  const [selectedBoard, setSelectedBoard] = useState("sigma");

  const leaderboards = {
    sigma: [
      { name: "Gigachad", auraPoints: 2000, sigmaStreak: 52 },
      { name: "SigmaMaster", auraPoints: 1800, sigmaStreak: 50 },
      { name: "You", auraPoints: 1420, sigmaStreak: 44 },
      { name: "AlphaWolf", auraPoints: 1200, sigmaStreak: 40 },
      { name: "BetaTester", auraPoints: 900, sigmaStreak: 30 },
    ],
    alpha: [
      { name: "AlphaKing", auraPoints: 1500, sigmaStreak: 48 },
      { name: "You", auraPoints: 1250, sigmaStreak: 38 },
      { name: "WolfPack", auraPoints: 1100, sigmaStreak: 35 },
      { name: "BetaBlocker", auraPoints: 950, sigmaStreak: 28 },
      { name: "ChadClone", auraPoints: 850, sigmaStreak: 25 },
    ],
    beta: [
      { name: "DarkHorse", auraPoints: 1750, sigmaStreak: 51 },
      { name: "You", auraPoints: 1600, sigmaStreak: 49 },
      { name: "Underdog", auraPoints: 1300, sigmaStreak: 39 },
      { name: "LastPick", auraPoints: 1000, sigmaStreak: 30 },
      { name: "Survivor", auraPoints: 800, sigmaStreak: 22 },
    ],
    omega: [
      { name: "ShadowWalker", auraPoints: 1700, sigmaStreak: 47 },
      { name: "You", auraPoints: 1600, sigmaStreak: 46 },
      { name: "NightWolf", auraPoints: 1300, sigmaStreak: 35 },
      { name: "Ghost", auraPoints: 1000, sigmaStreak: 30 },
      { name: "LoneWolf", auraPoints: 850, sigmaStreak: 25 },
    ],
    gamma: [
      { name: "Zenith", auraPoints: 1650, sigmaStreak: 45 },
      { name: "You", auraPoints: 1500, sigmaStreak: 43 },
      { name: "Pulse", auraPoints: 1250, sigmaStreak: 36 },
      { name: "Flicker", auraPoints: 980, sigmaStreak: 28 },
      { name: "Ember", auraPoints: 790, sigmaStreak: 20 },
    ],
    delta: [
      { name: "Abyss", auraPoints: 1600, sigmaStreak: 42 },
      { name: "You", auraPoints: 1500, sigmaStreak: 40 },
      { name: "Dusk", auraPoints: 1200, sigmaStreak: 33 },
      { name: "Gloom", auraPoints: 950, sigmaStreak: 27 },
      { name: "Wanderer", auraPoints: 770, sigmaStreak: 19 },
    ],
  };

  const currentLeaderboard = leaderboards[selectedBoard];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <NavBar />
      {/* Glow FX */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-800 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-2xl opacity-20 -z-10" />

      <div className="max-w-5xl mx-auto pt-28 pb-20 px-4">
        <section className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {selectedBoard.charAt(0).toUpperCase() + selectedBoard.slice(1)} Leaderboard
          </h1>
          <select
            className="bg-purple-800/30 text-white px-5 py-2 rounded-xl border border-purple-500/40 shadow-md hover:bg-purple-700/40 transition backdrop-blur-md"
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
          >
            {Object.keys(leaderboards).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Leaderboard
              </option>
            ))}
          </select>
        </section>

        <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-purple-900/80 to-black/80 border border-purple-500/30 shadow-2xl backdrop-blur-md">
          <table className="min-w-full text-left text-white text-lg font-medium">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-6 py-4">🏅 Rank</th>
                <th className="px-6 py-4">👤 Name</th>
                <th className="px-6 py-4">🔮 Aura Points</th>
                <th className="px-6 py-4">🔥 Sigma Streak</th>
              </tr>
            </thead>
            <tbody>
              {currentLeaderboard.map((entry, index) => (
                <tr
                  key={entry.name}
                  className={`transition duration-200 ${
                    entry.name === "You"
                      ? "bg-purple-700/40 font-bold text-white"
                      : "hover:bg-purple-600/20"
                  }`}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{entry.name}</td>
                  <td className="px-6 py-4">{entry.auraPoints}</td>
                  <td className="px-6 py-4">{entry.sigmaStreak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-sm text-purple-300 text-center">
          Last updated:{" "}
          <span className="text-white">
            {new Date().toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
