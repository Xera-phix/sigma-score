"use client";
import React from "react";
import { DollarSign } from "lucide-react";
import NavBar from "../../components/ui/NavBar";

const avatarItems = [
  {
    name: "Alpha Wolf",
    price: 200,
    image: "/avatar-alphawolf.jpg",
    description: "Unleash your inner lone wolf."
  },
  {
    name: "Lone Samurai",
    price: 250,
    image: "/avatar-lonesamurai.jpg",
    description: "The blade walks alone."
  },
  {
    name: "Patrick Bateman",
    price: 300,
    image: "/patrickbateman.webp",
    description: "Dominance meets neon."
  },
  {
    name: "Moai",
    price: 180,
    image: "/moai.jpg",
    description: "In shadows, we rise."
  }
];

const SigmaShop = () => {
  const userSigma = 1200; // User's current Sigma Coin balance
  const userAura = 540;   // Example Aura Points

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6 lg:px-20">
      <NavBar />

      {/* 💰 Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-orbitron font-bold text-white">Sigma Shop 🛒</h1>
        <div className="flex items-center gap-2 bg-vr-pink px-4 py-2 rounded-xl shadow-lg text-black font-bold">
          💰 <span>{userSigma}</span>
        </div>
      </div>

      {/* 🧑‍🎤 Avatar Section */}
      <section className="mb-16 p-6 rounded-2xl bg-zinc-900 border border-white/10 shadow">
        <h2 className="text-2xl font-bold font-orbitron mb-6">🧑‍🎤 Avatars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {avatarItems.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-zinc-800 to-black border border-white/10 rounded-2xl shadow-md p-4 hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain rounded-xl mb-4 bg-zinc-700"
              />
              <h3 className="text-xl font-semibold text-white/90 mb-1">{item.name}</h3>
              <p className="text-sm text-white/60 mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-vr-pink font-bold">{item.price} Σ</span>
                <button className="bg-vr-pink hover:bg-vr-red transition-colors text-black font-bold px-4 py-1.5 rounded-lg shadow ring-2 ring-vr-pink/50 ring-offset-2 ring-offset-black">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💱 Currency Exchange */}
      <section className="p-6 rounded-2xl bg-zinc-900 border border-white/10 shadow">
        <h2 className="text-2xl font-bold font-orbitron mb-6">💱 Currency Exchange</h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-white/80 mb-1">You have:</p>
            <p className="text-lg font-bold text-vr-pink">{userAura} Aura Points</p>
          </div>
          <div className="text-white/70">
            <p>Exchange Rate:</p>
            <p>100 Aura Points = 50 Sigma Coins</p>
          </div>
          <button className="bg-vr-pink hover:bg-vr-red transition-colors text-black font-bold px-6 py-2 rounded-lg shadow ring-2 ring-vr-pink/40 ring-offset-2 ring-offset-black">
            Exchange Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default SigmaShop;
