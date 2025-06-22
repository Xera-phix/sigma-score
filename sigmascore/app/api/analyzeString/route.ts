import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

interface AnalyzeRequestBody {
  image: string;
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

    const prompt = `Given the image of a person, rate their looksmaxxing and how sigma male they are based on the given criteria.

      Evaluate each of the criteria from a score of 0-100.
      Do not include any justification for your rating, only include the number.

      There will be two types of images:

      If the image is only of a person's face, please use only the following criteria:
      - chiseled jawline
      - hunter eyes
      - chin length
      - pursed lips
      - gonial angle
      - high cheekbones
      - thick eyebrows
      - healthy sigma hair
      - clear skin

      If the image includes some body portions apart from the face, also consider the following criteria:
      - broad shoulders
      - tapered waist
      - posture
      - height and body proportions
      - low body fat and muscular build

    `;
    
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to analyze image.' }, { status: 500 });
  }
}