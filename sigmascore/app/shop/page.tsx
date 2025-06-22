"use client";
import React, { useState } from "react";
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
  const [userSigma, setUserSigma] = useState(1200);
  const [userAura, setUserAura] = useState(540);

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const handleBuyClick = (item: typeof avatarItems[number]) => {
    setSelectedItem(item);
    setShowBuyModal(true);
  };

  const handleBuyCancel = () => {
    setSelectedItem(null);
    setShowBuyModal(false);
  };

  const handleBuyProceed = () => {
    if (selectedItem && userSigma >= selectedItem.price) {
      setUserSigma(userSigma - selectedItem.price);
    }
    setShowBuyModal(false);
  };

  const handleExchangeClick = () => {
    setShowExchangeModal(true);
  };

  const handleExchangeCancel = () => {
    setShowExchangeModal(false);
  };

  const handleExchangeProceed = () => {
    const exchangeAura = 100;
    const exchangeSigma = 50;

    if (userAura >= exchangeAura) {
      setUserAura(userAura - exchangeAura);
      setUserSigma(userSigma + exchangeSigma);
    }

    setShowExchangeModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6 lg:px-20">
      <NavBar />

      <div className="mb-10">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-orbitron font-bold text-vr-purple">Sigma Shop</h1>
            <div className="flex items-center gap-2 bg-vr-pink px-4 py-2 rounded-xl shadow-lg text-white font-bold">
            💰 <span>{userSigma}</span>
            </div>
        </div>
        <p className="mt-2 text-white/70 text-sm">
            Trade your farmed aura points for sigma coins to invest in avatars as sigma as you.
        </p>
        </div>

      {/* Avatars Section */}
      <section className="relative mb-16 p-6 rounded-2xl border border-white/10 shadow overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[1000px] h-[400px] bg-purple-700 opacity-40 rounded-full blur-3xl z-0" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold font-orbitron text-white mb-6">Avatars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {avatarItems.map((item, index) => (
              <div key={index} className="bg-black/60 border border-white/10 rounded-2xl shadow-md p-4 hover:scale-105 transition-transform">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-contain rounded-xl mb-4 bg-zinc-700"
                />
                <h3 className="text-xl font-semibold text-white/90 mb-1">{item.name}</h3>
                <p className="text-sm text-white/60 mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-vr-pink font-bold">{item.price} Σ</span>
                  <button
                    onClick={() => handleBuyClick(item)}
                    className="bg-vr-pink hover:bg-vr-red transition-colors text-white font-bold px-4 py-1.5 rounded-lg shadow ring-2 ring-vr-pink/50 ring-offset-2 ring-offset-black"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currency Exchange Section */}
      <section className="relative py-12 px-6 rounded-2xl border border-white/10 shadow text-center overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[1000px] h-[450px] bg-purple-700 opacity-40 rounded-full blur-3xl z-0" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-orbitron text-white mb-10">Currency Exchange</h2>

          <div className="flex justify-center mb-4">
            <div className="w-56 h-56 bg-black/80 rounded-full flex flex-col items-center justify-center border-4 border-white shadow-lg">
                <span className="text-5xl font-bold text-white mb-1">{userAura}</span>
                <span className="text-base font-medium text-white/80">Aura Points</span>
            </div>
            </div>


          <p className="text-sm text-white/80 mb-8">100 Aura Points = 50 Sigma Coins</p>

          <button
            onClick={handleExchangeClick}
            className="bg-vr-pink hover:bg-vr-red transition-colors text-white font-bold px-8 py-3 rounded-lg shadow ring-2 ring-white/30 ring-offset-2 ring-offset-black"
          >
            Exchange Now
          </button>
        </div>
      </section>

      {/* Buy Modal */}
      {showBuyModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-white/20 p-6 rounded-2xl w-full max-w-md text-center shadow-lg">
            <h3 className="text-2xl font-bold text-vr-pink mb-4">Confirm Purchase</h3>
            <p className="text-lg text-white mb-2">
              <strong>{selectedItem.name}</strong> for <strong>{selectedItem.price} Σ</strong>
            </p>
            <p className="text-white/70 mb-2">Your Balance: {userSigma} Σ</p>
            <p className="text-white/70 mb-2">
              Transaction: {userSigma} - {selectedItem.price} ={" "}
              <strong>{userSigma - selectedItem.price} Σ</strong>
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleBuyCancel}
                className="px-6 py-2 rounded-lg border border-white/30 text-white hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyProceed}
                className="px-6 py-2 rounded-lg bg-vr-pink hover:bg-vr-red text-white font-bold transition"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exchange Modal */}
      {showExchangeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-white/20 p-6 rounded-2xl w-full max-w-md text-center shadow-lg">
            <h3 className="text-2xl font-bold text-vr-pink mb-4">Confirm Exchange</h3>
            <p className="text-white mb-2">Exchange <strong>100 Aura</strong> for <strong>50 Σ</strong></p>
            <p className="text-white/70 mb-2">
              Aura: {userAura} → <strong>{userAura - 100}</strong>
            </p>
            <p className="text-white/70 mb-4">
              Sigma: {userSigma} → <strong>{userSigma + 50}</strong>
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleExchangeCancel}
                className="px-6 py-2 rounded-lg border border-white/30 text-white hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleExchangeProceed}
                className="px-6 py-2 rounded-lg bg-vr-pink hover:bg-vr-red text-white font-bold transition"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SigmaShop;
