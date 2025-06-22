"use client";

import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { saveScan, updateUserSigmaScore, getUserData, calculateSigmaScore, updateAllRankings } from '../../lib/firestore';
import NavBar from '../../components/ui/NavBar';

interface SigmaAnalysis {
  faceScores: {
    chiseledJawline: number;
    hunterEyes: number;
    chinLength: number;
    pursedLips: number;
    gonialAngle: number;
    highCheekbones: number;
    thickEyebrows: number;
    healthySigmaHair: number;
    clearSkin: number;
  };
  bodyScores?: {
    broadShoulders: number;
    taperedWaist: number;
    posture: number;
    heightAndProportions: number;
    lowBodyFatAndMuscular: number;
  };
  overallSigmaScore: number;
  sigmaLevel: string;
  analysis: string;
}

export default function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sigmaScore, setSigmaScore] = useState<number>(0); // Always start at 0
  const [user, setUser] = useState<any>(null);
  const [analysis, setAnalysis] = useState<SigmaAnalysis | null>(null);

  // Check authentication and load user data
  useEffect(() => {
    setSigmaScore(0); // Reset score to 0 on mount/reopen
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        // Do not setSigmaScore here, always start at 0
      } else {
        // Redirect to login if not authenticated
        window.location.href = '/login';
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage || !user) return;

    setLoading(true);
    try {
      const response = await fetch('/api/analyzeString', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      if (data.error) {
        setLoading(false);
        return;
      }

      const analyzedText = data.text || data.error;
      const analysisData = data.analysis;
      
      setResult(analyzedText);
      setAnalysis(analysisData);

      // Calculate current sigma score based on AI analysis (not cumulative)
      const currentSigmaScore = calculateSigmaScore(analysisData);
      setSigmaScore(currentSigmaScore); // <-- Update score immediately in UI
      
      // Save scan data to Firestore
      await saveScan({
        userId: user.uid,
        text: analyzedText,
        sigmaScore: currentSigmaScore,
        timestamp: new Date(),
        analysis: {
          sentiment: 'positive',
          confidence: analysisData.overallSigmaScore / 100,
          keywords: analysisData.sigmaLevel.toLowerCase().split(' ').concat(['sigma', 'analysis']),
          aiScore: analysisData.overallSigmaScore,
          sigmaLevel: analysisData.sigmaLevel,
          faceScores: analysisData.faceScores,
          bodyScores: analysisData.bodyScores
        }
      });
      
      // Update user's sigma score to current assessment
      await updateUserSigmaScore(user.uid, currentSigmaScore);

      // Update all rankings
      await updateAllRankings();

    } catch (err) {
      console.error('Error analyzing image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-visible">
      {/* Dynamic Purple Glow Effects - Debug: Higher z-index, opacity, and standard colors */}
      <div className="absolute top-0 left-0 w-[340px] h-[340px] bg-purple-400 rounded-full blur-[160px] opacity-80 z-0 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-300 rounded-full blur-[160px] opacity-70 z-0 animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-[360px] h-[360px] bg-fuchsia-400 rounded-full blur-[160px] opacity-70 z-0 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-pink-400 rounded-full blur-[120px] opacity-60 z-0 animate-pulse" />
      {/* If you see these, revert z-0 to -z-10 and lower opacity as needed */}
      <NavBar />
      <div className="relative z-10 max-w-3xl mx-auto pt-32 pb-16 px-4">
        <section className="bg-gradient-to-b from-[#2a003f] to-vr-purple border-0 rounded-2xl shadow-2xl p-8 mb-10 flex flex-col items-center gap-8 backdrop-blur-xl">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-center text-white mb-6 drop-shadow">Sigma Scanner</h1>
          <div className="text-center mb-6">
            <p className="text-white/80 mb-2">Current Sigma Score:</p>
            <p className="text-4xl font-black text-vr-pink drop-shadow-lg">{sigmaScore}</p>
            <p className="text-white/60 text-sm mt-1">Based on your latest analysis</p>
          </div>
          <div className="mb-6 w-full max-w-md flex flex-col md:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <label className="block text-white text-sm font-medium mb-2">Upload Your Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-vr-pink"
              />
            </div>
            <div className="flex items-end h-full">
              <button
                type="button"
                onClick={async () => {
                  if (typeof window === "undefined" || typeof navigator === "undefined") {
                    alert("Camera only available in browser.");
                    return;
                  }
                  try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.play();
                    const modal = document.createElement('div');
                    modal.style.position = 'fixed';
                    modal.style.top = '0';
                    modal.style.left = '0';
                    modal.style.width = '100vw';
                    modal.style.height = '100vh';
                    modal.style.background = 'rgba(0,0,0,0.8)';
                    modal.style.display = 'flex';
                    modal.style.alignItems = 'center';
                    modal.style.justifyContent = 'center';
                    modal.style.zIndex = '9999';
                    video.style.maxWidth = '90vw';
                    video.style.maxHeight = '70vh';
                    modal.appendChild(video);
                    const snapBtn = document.createElement('button');
                    snapBtn.innerText = 'Take Photo';
                    snapBtn.style.position = 'absolute';
                    snapBtn.style.bottom = '10%';
                    snapBtn.style.left = '50%';
                    snapBtn.style.transform = 'translateX(-50%)';
                    snapBtn.style.padding = '1rem 2rem';
                    snapBtn.style.background = '#a259f7';
                    snapBtn.style.color = 'white';
                    snapBtn.style.fontWeight = 'bold';
                    snapBtn.style.border = 'none';
                    snapBtn.style.borderRadius = '0.5rem';
                    snapBtn.style.fontSize = '1.2rem';
                    snapBtn.style.cursor = 'pointer';
                    modal.appendChild(snapBtn);
                    document.body.appendChild(modal);
                    snapBtn.onclick = () => {
                      const canvas = document.createElement('canvas');
                      canvas.width = video.videoWidth;
                      canvas.height = video.videoHeight;
                      const ctx = canvas.getContext('2d');
                      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
                      const dataUrl = canvas.toDataURL('image/png');
                      setSelectedImage(dataUrl);
                      stream.getTracks().forEach(track => track.stop());
                      document.body.removeChild(modal);
                    };
                    // Allow closing modal by clicking outside video
                    modal.onclick = (e) => {
                      if (e.target === modal) {
                        stream.getTracks().forEach(track => track.stop());
                        document.body.removeChild(modal);
                      }
                    };
                  } catch (err) {
                    alert('Could not access camera.');
                  }
                }}
                className="w-full md:w-auto px-4 py-2 rounded bg-vr-pink text-white font-bold shadow hover:bg-vr-purple transition border border-vr-pink/40"
              >
                Take a Photo
              </button>
            </div>
          </div>
          {selectedImage && (
            <div className="flex justify-center mb-6">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="rounded-lg shadow-lg max-w-sm border-4 border-vr-pink bg-black/30" 
              />
            </div>
          )}
          <div className="flex flex-col gap-4 w-full max-w-md">
            <button 
              onClick={analyzeImage} 
              disabled={!selectedImage || loading}
              className="relative font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-vr-pink/40 group"
              style={{
                background: 'rgba(30, 0, 50, 0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid',
                borderImage: 'linear-gradient(90deg, #ff4ecd, #a259f7, #ff4e6b, #ff4ecd) 1',
              }}
            >
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-vr-pink via-vr-purple to-vr-red drop-shadow-lg group-hover:from-yellow-400 group-hover:to-pink-500 animate-gradient-x"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #ff4ecd, #a259f7, #ff4e6b, #ff4ecd)',
                  backgroundSize: '200% 200%',
                  backgroundPosition: '0% 50%',
                  transition: 'background-position 0.5s',
                  display: 'inline-block',
                }}
              >
                {loading ? 'Analyzing...' : 'Analyze My Sigma Potential'}
              </span>
            </button>
            <button
              className="bg-white/10 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/20 transition border border-white/20 shadow"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </button>
          </div>
          {result && (
            <div className="mt-8 p-4 bg-white/10 rounded-2xl shadow-xl w-full max-w-lg border border-white/20 backdrop-blur-lg">
              <h2 className="text-white font-bold mb-2 text-xl font-orbitron">Analysis Result:</h2>
              <p className="text-white/90 mb-4">{result}</p>
              {analysis && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Sigma Level:</span>
                    <span className="text-vr-purple font-bold">{analysis.sigmaLevel}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-vr-pink to-vr-red h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysis.overallSigmaScore}%` }}
                    ></div>
                  </div>
                  {/* Individual Face Metrics */}
                  <div className="mt-6">
                    <h3 className="text-white font-bold mb-2 text-lg">Face Metrics</h3>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-white/90 text-sm">
                      {Object.entries(analysis.faceScores).map(([metric, value]) => (
                        <li key={metric} className="flex justify-between">
                          <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-bold text-vr-pink">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Individual Body Metrics (if present) */}
                  {analysis.bodyScores && (
                    <div className="mt-6">
                      <h3 className="text-white font-bold mb-2 text-lg">Body Metrics</h3>
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-white/90 text-sm">
                        {Object.entries(analysis.bodyScores).map(([metric, value]) => (
                          <li key={metric} className="flex justify-between">
                            <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-bold text-vr-pink">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}