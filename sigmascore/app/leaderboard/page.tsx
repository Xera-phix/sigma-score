"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/ui/NavBar";
import { auth } from "../../lib/firebase";
import { getLeaderboard, getUserRank } from "../../lib/firestore";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userRank, setUserRank] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        // Fetch leaderboard data
        const data = await getLeaderboard(50); // Get top 50 users
        setLeaderboardData(data);
        
        // Get user's rank
        const rank = await getUserRank(user.uid);
        setUserRank(rank);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-black font-bold";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold";
    return "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <NavBar />
      {/* Sigma of the Day Section */}


      {/* Glow FX */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-800 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-2xl opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto pt-12 pb-20 px-4">


      <section className="relative mt-20 mb-16 p-6 rounded-2xl border border-white/10 shadow overflow-hidden">

          {/* Background Blob */}
          <div className="absolute -top-32 -left-32 w-[900px] h-[400px] bg-purple-700 opacity-40 rounded-full blur-3xl z-0" />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-vr-pink shadow-lg bg-black/70">
              <img
                src="/avatar-alphawolf.jpg"
                alt="Sigma of the Day"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-white">
              <h2 className="text-3xl font-bold font-orbitron text-center lg:text-left text-white mb-4">Sigma of the Day</h2>
              <div className="bg-black/60 p-4 rounded-xl border border-white/10 shadow space-y-3">
                <p><span className="text-vr-pink font-semibold">Name:</span> Alpha Wolf</p>
                <p><span className="text-vr-pink font-semibold">Age:</span> 29</p>
                <div>
                  <p className="text-vr-pink font-semibold mb-1">Bio:</p>
                  <p className="text-white/70">A lone force of discipline and drive. He hunts success in silence and leads by instinct, not imitation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              Sigma Leaderboard
            </h1>
            <p className="text-white/60">Top {leaderboardData.length} Sigma Warriors</p>
          </div>
          {user && userRank > 0 && (
            <div className="bg-purple-900/50 border border-purple-500/30 rounded-xl p-4 text-center">
              <p className="text-white/80 text-sm">Your Rank</p>
              <p className="text-2xl font-bold text-vr-pink">#{userRank}</p>
            </div>
          )}
        </section>

        <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-purple-900/80 to-black/80 border border-purple-500/30 shadow-2xl backdrop-blur-md">
          <table className="min-w-full text-left text-white text-lg font-medium">
            <thead>
              <tr className="bg-black/50 text-white border-b border-purple-500/30">
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Sigma Score</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Scans</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => {
                const rank = index + 1;
                const getLevel = (score: number) => {
                  if (score >= 80) return "Legend";
                  if (score >= 60) return "Pro";
                  if (score >= 40) return "Elite";
                  if (score >= 20) return "Warrior";
                  if (score >= 10) return "Initiate";
                  return "Newbie";
                };
                
                return (
                  <tr
                    key={entry.id}
                    className={`transition duration-200 border-b border-purple-500/10 ${
                      entry.uid === user?.uid
                        ? "bg-purple-700/40 font-bold text-white"
                        : "hover:bg-purple-600/20"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getRankIcon(rank)}</span>
                        <span className={getRankClass(rank)}>#{rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-vr-pink to-vr-red rounded-full flex items-center justify-center text-white font-bold">
                          {(entry.displayName || entry.firstName || "A").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">
                            {entry.displayName || `${entry.firstName} ${entry.lastName}` || "Anonymous"}
                          </p>
                          <p className="text-white/60 text-sm">{entry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-vr-pink">{entry.sigmaScore}</span>
                        <div className="w-16 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-vr-pink to-vr-red h-2 rounded-full"
                            style={{ width: `${entry.sigmaScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-sm">
                        {getLevel(entry.sigmaScore)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {entry.totalScans || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {entry.createdAt ? new Date(entry.createdAt.toDate()).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {leaderboardData.length === 0 && !user && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No users found. Be the first to join the leaderboard!</p>
            <button 
              className="mt-4 bg-vr-pink text-white px-6 py-2 rounded-lg hover:bg-vr-red transition"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up Now
            </button>
          </div>
        )}

        <div className="mt-12 text-sm text-purple-300 text-center">
          Last updated:{" "}
          <span className="text-white">
            {lastUpdated.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
