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
  const [sigmaScore, setSigmaScore] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [analysis, setAnalysis] = useState<SigmaAnalysis | null>(null);

  // Check authentication and load user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userData = await getUserData(user.uid);
        if (userData) {
          setSigmaScore(userData.sigmaScore);
        }
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

      const data = await response.json();
      
      if (data.error) {
        setResult('Error analyzing image: ' + data.error);
        return;
      }

      const analyzedText = data.text || data.error;
      const analysisData = data.analysis;
      
      setResult(analyzedText);
      setAnalysis(analysisData);

      // Calculate current sigma score based on AI analysis (not cumulative)
      const currentSigmaScore = calculateSigmaScore(analysisData);
      
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
      setSigmaScore(currentSigmaScore);

      // Update all rankings
      await updateAllRankings();

    } catch (err) {
      setResult('Error analyzing image.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vr-gradient relative overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-white/20">
          <h1 className="font-orbitron text-3xl font-bold text-center text-white mb-6">Sigma Scanner</h1>
          
          <div className="text-center mb-6">
            <p className="text-white/80 mb-2">Current Sigma Score:</p>
            <p className="text-4xl font-bold text-vr-pink">{sigmaScore}</p>
            <p className="text-white/60 text-sm mt-1">Based on your latest analysis</p>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">Upload Your Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-vr-pink"
            />
          </div>

          {selectedImage && (
            <div className="flex justify-center mb-6">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="rounded-lg shadow-lg max-w-sm" 
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button 
              onClick={analyzeImage} 
              disabled={!selectedImage || loading}
              className="bg-gradient-to-r from-vr-pink to-vr-red text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze My Sigma Potential'}
            </button>

            <button
              className="bg-white/20 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/30 transition"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </button>
          </div>

          {result && (
            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <h2 className="text-white font-bold mb-2">Analysis Result:</h2>
              <p className="text-white/90 mb-4">{result}</p>
              
              {analysis && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">AI Sigma Score:</span>
                    <span className="text-vr-pink font-bold">{analysis.overallSigmaScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Sigma Level:</span>
                    <span className="text-vr-purple font-bold">{analysis.sigmaLevel}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Your Current Score:</span>
                    <span className="text-vr-pink font-bold">{sigmaScore}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-vr-pink to-vr-red h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysis.overallSigmaScore}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}