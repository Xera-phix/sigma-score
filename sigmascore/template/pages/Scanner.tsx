import React, { useState } from "react";
import NavBar from "../components/ui/NavBar";

const Scanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setImage(base64);
        setLoading(true);
        setError(null);
        setResultText(null);
        try {
          const res = await fetch("/api/analyzeString", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });
          const text = await res.text();
          if (!res.ok) throw new Error(text || "Server error");
          setResultText(text);
        } catch (err: any) {
          setError(err.message || "Failed to analyze image.");
          setResultText(null);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-vr-gradient relative overflow-hidden">
      <NavBar />
      <div className="max-w-5xl mx-auto pt-32 pb-16 px-4 flex flex-col md:flex-row gap-12 items-start">
        {/* Left: Image upload and preview */}
        <div className="flex-1 flex flex-col items-center">
          {image ? (
            <img src={image} alt="Uploaded" className="w-full max-w-xs h-auto rounded-2xl shadow-2xl mb-6 object-cover" />
          ) : (
            <div className="w-full max-w-xs h-72 bg-white/10 rounded-2xl flex items-center justify-center text-white/50 mb-6 text-lg shadow-2xl">
              No image selected
            </div>
          )}
          <label className="block w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="cursor-pointer bg-gradient-to-r from-vr-purple via-vr-red to-vr-coral text-white font-bold px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform block text-center">
              Upload Image
            </span>
          </label>
          {loading && <div className="text-white mt-4">Analyzing image...</div>}
          {error && <div className="text-red-400 mt-4">{error}</div>}
        </div>
        {/* Right: Raw result text */}
        <div className="flex-1 flex flex-col items-center md:items-start w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full flex flex-col items-center">
            <h2 className="font-orbitron text-2xl text-white font-bold mb-4">Analysis Result</h2>
            <pre className="whitespace-pre-wrap text-white text-lg w-full min-h-[120px]">
              {resultText ? resultText : <span className="text-white/40">No result yet.</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
