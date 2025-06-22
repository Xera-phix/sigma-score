import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

interface AnalyzeRequestBody {
  image: string;
}

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

export async function POST(request: NextRequest) {
  const { image }: AnalyzeRequestBody = await request.json();

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key missing' }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg',
        },
      },
    ];

    const prompt = `Analyze this image of a person and provide a comprehensive sigma male rating. 

    Please respond in the following JSON format only (no other text):
    
    {
      "faceScores": {
        "chiseledJawline": [0-100],
        "hunterEyes": [0-100], 
        "chinLength": [0-100],
        "pursedLips": [0-100],
        "gonialAngle": [0-100],
        "highCheekbones": [0-100],
        "thickEyebrows": [0-100],
        "healthySigmaHair": [0-100],
        "clearSkin": [0-100]
      },
      "bodyScores": {
        "broadShoulders": [0-100],
        "taperedWaist": [0-100], 
        "posture": [0-100],
        "heightAndProportions": [0-100],
        "lowBodyFatAndMuscular": [0-100]
      },
      "overallSigmaScore": [0-100],
      "sigmaLevel": "Newbie|Sigma Initiate|Sigma Warrior|Sigma Elite|Sigma Pro|Sigma Legend",
      "analysis": "Brief 2-3 sentence analysis of the person's sigma traits and areas for improvement"
    }

    If the image only shows the face, omit the "bodyScores" section entirely.
    
    Rate honestly and objectively based on sigma male aesthetics and looksmaxxing standards.`;
    
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response
    let analysis: SigmaAnalysis;
    try {
      // Clean up the response text to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      // Fallback to basic analysis
      analysis = {
        faceScores: {
          chiseledJawline: 50,
          hunterEyes: 50,
          chinLength: 50,
          pursedLips: 50,
          gonialAngle: 50,
          highCheekbones: 50,
          thickEyebrows: 50,
          healthySigmaHair: 50,
          clearSkin: 50,
        },
        overallSigmaScore: 50,
        sigmaLevel: "Newbie",
        analysis: "Analysis could not be completed. Please try again with a clearer image."
      };
    }

    return NextResponse.json({ 
      text: analysis.analysis,
      analysis: analysis 
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to analyze image.' }, { status: 500 });
  }
}