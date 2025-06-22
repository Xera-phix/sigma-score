"use client";

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Load image from public folder on component mount
  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('/upper body gigachad.jpg'); // Public folder path
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result as string); // Base64 result
      };

      reader.readAsDataURL(blob); // Convert image blob to base64
    };

    fetchImage();
  }, []);

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const response = await fetch('/api/analyzeString', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });

      const data = await response.json();
      setResult(data.text || data.error);
    } catch (err) {
      setResult('Error analyzing image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Image Analysis with Gemini</h1>
      {image && <img src={image} alt="Loaded" style={{ width: '300px', marginTop: '1rem' }} />}
      <button onClick={analyzeImage} disabled={!image || loading}>
        {loading ? 'Analyzing...' : 'Analyze Predefined Image'}
      </button>
      <button
        style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => window.location.href = '/dashboard'}
      >
        Go to Dashboard
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}