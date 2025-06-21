"use client";

import React, { useState } from "react";
import NavBar from "../../components/ui/NavBar"; // Adjust path if needed

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
      { name: "DarkHorse", auraPoints: 1750, sigmaStreak: 51 },
      { name: "You", auraPoints: 1600, sigmaStreak: 49 },
      { name: "Underdog", auraPoints: 1300, sigmaStreak: 39 },
      { name: "LastPick", auraPoints: 1000, sigmaStreak: 30 },
      { name: "Survivor", auraPoints: 800, sigmaStreak: 22 },
    ],
    gamma: [
        { name: "DarkHorse", auraPoints: 1750, sigmaStreak: 51 },
        { name: "You", auraPoints: 1600, sigmaStreak: 49 },
        { name: "Underdog", auraPoints: 1300, sigmaStreak: 39 },
        { name: "LastPick", auraPoints: 1000, sigmaStreak: 30 },
        { name: "Survivor", auraPoints: 800, sigmaStreak: 22 },
      ],
    delta: [
    { name: "DarkHorse", auraPoints: 1750, sigmaStreak: 51 },
    { name: "You", auraPoints: 1600, sigmaStreak: 49 },
    { name: "Underdog", auraPoints: 1300, sigmaStreak: 39 },
    { name: "LastPick", auraPoints: 1000, sigmaStreak: 30 },
    { name: "Survivor", auraPoints: 800, sigmaStreak: 22 },
    ],
  };

  const currentLeaderboard = leaderboards[selectedBoard];

  return (
    <div className="min-h-screen bg-vr-gradient relative overflow-hidden">
      <NavBar />
      <div className="max-w-5xl mx-auto pt-32 pb-16 px-4">
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-10">
          
          {/* Title + Dropdown */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-orbitron text-4xl text-white font-bold">
              {selectedBoard.charAt(0).toUpperCase() + selectedBoard.slice(1)} Leaderboard
            </h1>
            <select
              className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-md border border-white/30"
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
            >
              <option value="sigma">Sigma Leaderboard</option>
              <option value="alpha">Alpha Leaderboard</option>
              <option value="beta">Beta Leaderboard</option>
              <option value="omega">Omega Leaderboard</option>
              <option value="gamma">Gamma Leaderboard</option>
              <option value="delta">Delta Leaderboard</option>
            </select>
          </div>

          {/* Table Headers */}
          <div
            className="grid px-6 py-2 text-white/70 font-bold text-lg border-b border-white/20 mb-4"
            style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
          >
            <span>Name</span>
            <span className="text-right">Aura Points</span>
            <span className="text-right">Sigma Streak</span>
          </div>

          {/* Leaderboard Entries */}
          <ol className="space-y-2">
            {currentLeaderboard.map((entry, index) => (
              <li
                key={entry.name}
                className={`grid items-center px-6 py-3 rounded-xl text-lg ${
                    entry.name === "You"
                      ? "bg-gradient-to-br from-purple-400 via-blue-300 to-blue-200 text-vr-purple font-bold shadow-md"
                      : "bg-white/5 text-white/80"
                  }`}                  
                  
                style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
              >
                <span>{index + 1}. {entry.name}</span>
                <span className="text-right">{entry.auraPoints}</span>
                <span className="text-right">{entry.sigmaStreak}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default LeaderboardPage;
