"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/ui/NavBar";

const dynamicText = "Unlock your sigma potential.";

const featureCards = [
	{
		title: "AI-Powered Sigma Analysis",
		desc: "Leverage advanced AI to analyze your rizz and receive actionable feedback to boost your sigma potential.",
		icon: "🤖",
	},
	{
		title: "Personal Dashboard",
		desc: "Track your progress, view your sigma history, and unlock achievements as you level up your aura.",
		icon: "📈",
	},
	{
		title: "Sigma Scanner",
		desc: "Instantly scan and score your content for sigma traits. Get a detailed breakdown and tips to improve.",
		icon: "🔍",
	},
	{
		title: "Secure & Private",
		desc: "Your data is encrypted and never shared. Enjoy peace of mind while you become your best self.",
		icon: "🔒",
	},
	{
		title: "Modern UI",
		desc: "Experience a beautiful, responsive, and intuitive interface designed for the modern sigma.",
		icon: "✨",
	},
	{
		title: "Community Features",
		desc: "Connect with other sigma users, share your scores, and compete in the leaderboard to be the ultimate Gigachad.",
		icon: "🌐",
	},
];

export default function LandingPage() {
	const [fade, setFade] = useState(false);
	const [cardIndex, setCardIndex] = useState(0);
	const [cardsFade, setCardsFade] = useState(true);

	useEffect(() => {
		setFade(true);
		const interval = setInterval(() => {
			setCardsFade(false);
			setTimeout(() => {
				const nextIndex = (cardIndex + 2) % featureCards.length;
				setCardIndex(nextIndex);
				setTimeout(() => setCardsFade(true), 50);
			}, 400); // match transition duration
		}, 3500);
		return () => clearInterval(interval);
	}, [cardIndex]);

	return (
		<div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
			<NavBar />
			<main className="flex-1 flex items-center justify-center">
				{/* Purple Glow Effects */}
				<div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-700 opacity-40 rounded-full blur-3xl z-0" />
				<div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-2xl z-0" />
				<div
					className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-purple-900 opacity-20 rounded-full blur-2xl z-0"
					style={{ transform: "translate(-50%, -50%)" }}
				/>
				{/* Main Content */}
				<div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-5xl p-8 gap-16 mt-24">
					{/* Left: Dynamic Text & CTA */}
					<div className="flex-1 min-w-[22rem] md:min-w-[28rem] lg:min-w-[32rem] flex flex-col items-start justify-center">
						<h1
							className={`text-4xl md:text-6xl font-extrabold text-white mb-1 transition-opacity duration-700 ${
								fade ? "opacity-100" : "opacity-0"
							}`}
							style={{ minHeight: "3.5em" }}
						>
							{dynamicText}
						</h1>
						<p className="text-base md:text-lg text-white/80 max-w-2xl mb-10">
							Looksmax like Gigachad, farm aura, and transform into a true sigma with
							SigmaScore, powered by A.I technology
						</p>
						<a
							href="/login"
							className="inline-block bg-gradient-to-r from-vr-purple via-vr-pink to-vr-coral text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-vr-pink transition-transform text-lg ring-4 ring-vr-pink/40 ring-offset-2 ring-offset-black animate-pulse"
						>
							Get Started
						</a>
					</div>
					{/* Right: Animated GIF Card */}
					<div className="flex-1 flex items-center justify-center md:ml-24 lg:ml-40">
						<div className="relative bg-gradient-to-b from-purple-900 to-purple-400 rounded-3xl p-2 md:p-4 shadow-2xl w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] flex items-center justify-center">
							<img
								src="/gigachad.gif"
								alt="SigmaScore Hero"
								className="w-[16rem] h-[16rem] md:w-[20rem] md:h-[20rem] object-cover rounded-2xl shadow-xl bg-black/30"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</div>
					</div>
				</div>
			</main>
			{/* Feature Cards Section */}
			<section className="w-full flex flex-col items-center justify-center mt-16 mb-24 px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
					{[0, 1].map((offset) => {
						const i = (cardIndex + offset) % featureCards.length;
						const card = featureCards[i];
						const uniqueKey = `${i}-${cardIndex}`;
						return (
							<div
								key={uniqueKey}
								className={`bg-gradient-to-br from-purple-800/80 to-black/80 border border-purple-500/30 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-500 ${cardsFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
								style={{ willChange: 'opacity, transform' }}
							>
								<div className="text-5xl mb-4 animate-bounce-slow">{card.icon}</div>
								<h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
								<p className="text-white/80 text-base">{card.desc}</p>
							</div>
						);
					})}
				</div>
			</section>
			{/* Community Stats Section */}
			<section className="w-full flex flex-col items-center justify-center mb-24 px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
					Join the Sigma Community
				</h2>
				<div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-gradient-to-br from-purple-900/80 to-black/80 border border-purple-500/30 rounded-2xl shadow-lg p-6 text-center">
						<div className="text-4xl mb-2">🚀</div>
						<h3 className="text-xl font-bold text-white mb-2">Start Your Journey</h3>
						<p className="text-white/80">Create your account and begin your sigma transformation today.</p>
					</div>
					<div className="bg-gradient-to-br from-purple-900/80 to-black/80 border border-purple-500/30 rounded-2xl shadow-lg p-6 text-center">
						<div className="text-4xl mb-2">📊</div>
						<h3 className="text-xl font-bold text-white mb-2">Track Progress</h3>
						<p className="text-white/80">Monitor your sigma score and see your growth over time.</p>
					</div>
					<div className="bg-gradient-to-br from-purple-900/80 to-black/80 border border-purple-500/30 rounded-2xl shadow-lg p-6 text-center">
						<div className="text-4xl mb-2">🏆</div>
						<h3 className="text-xl font-bold text-white mb-2">Compete & Win</h3>
						<p className="text-white/80">Climb the leaderboard and compete with other sigma warriors.</p>
				<div className="w-full max-w-5xl overflow-x-auto hide-scrollbar">
					<div
						className="flex gap-8 snap-x snap-mandatory px-2"
						style={{ scrollbarWidth: "thin" }}
					>
						{[
							{
								name: "Alex J.",
								avatar: "https://randomuser.me/api/portraits/men/32.jpg",
								quote: "SigmaScore changed me from a puny beta male to an alpha chad. My aura is off the charts!",
							},
							{
								name: "Maya S.",
								avatar: "https://randomuser.me/api/portraits/women/44.jpg",
								quote: "The AI feedback is so on point. I feel more sigma every day.",
							},
							{
								name: "Chris P.",
								avatar: "https://randomuser.me/api/portraits/men/65.jpg",
								quote: "Lookmaxxing like how this sexy dashboard is lookmaxxed.",
							},
							{
								name: "Lina M.",
								avatar: "https://randomuser.me/api/portraits/women/68.jpg",
								quote: "I never thought tracking my sigma would be this fun.",
							},
							{
								name: "Jordan K.",
								avatar: "https://randomuser.me/api/portraits/men/77.jpg",
								quote: "Aura farming with the homies is fire.",
							},
						].map((t, idx) => (
							<div
								key={idx}
								className="min-w-[320px] max-w-xs bg-gradient-to-br from-purple-900/80 to-black/80 border border-purple-500/30 rounded-2xl shadow-lg p-6 flex flex-col items-center snap-center transition-transform hover:scale-105 duration-300"
							>
								<img
									src={t.avatar}
									alt={t.name}
									className="w-16 h-16 rounded-full border-2 border-purple-500 mb-4 shadow-md object-cover"
								/>
								<p className="text-white/90 text-lg italic mb-3">
									“{t.quote}”
								</p>
								<span className="text-purple-300 font-semibold">{t.name}</span>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Footer Section */}
			<footer className="w-full border-t border-purple-900/40 bg-black/60 backdrop-blur-md py-8 px-4 ring-4 ring-vr-pink/40 ring-offset-2 ring-offset-black">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 w-full">
					<div className="flex items-center gap-3">
						<img src="/next.svg" alt="SigmaScore Logo" className="w-8 h-8" />
						<span className="text-white text-lg font-bold tracking-wide">SigmaScore</span>
					</div>
					<div className="flex gap-6 text-purple-300 text-sm font-medium flex-wrap justify-center">
						<a href="/" className="hover:text-white transition">Home</a>
						<a href="/dashboard" className="hover:text-white transition">Dashboard</a>
						<a href="/login" className="hover:text-white transition">Login</a>
						<a href="/signup" className="hover:text-white transition">Sign Up</a>
					</div>
					<div className="flex gap-4">
						<a href="#" aria-label="Twitter" className="hover:scale-110 transition">
							<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 5.924c-.793.352-1.646.59-2.54.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.485 0-4.5 2.015-4.5 4.5 0 .353.04.697.116 1.027C7.728 9.37 4.1 7.6 1.67 4.905a4.48 4.48 0 0 0-.61 2.264c0 1.563.796 2.942 2.008 3.75a4.48 4.48 0 0 1-2.037-.563v.057c0 2.183 1.553 4.005 3.617 4.422a4.48 4.48 0 0 1-2.03.077c.573 1.788 2.24 3.09 4.213 3.125A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.13 9.13 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z"/></svg>
						</a>
						<a href="#" aria-label="GitHub" className="hover:scale-110 transition">
							<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.34-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.338 4.695-4.566 4.944.36.31.68.92.68 1.855 0 1.338-.012 2.42-.012 2.75 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.02 22 6.484 17.523 2 12 2z"/></svg>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}