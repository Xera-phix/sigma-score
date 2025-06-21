"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, Camera, AlertCircle, Star, TrendingUp } from "lucide-react"
import Image from "next/image"

interface FeatureScore {
  name: string
  score: number
  description: string
  icon: string
}

interface AnalysisResult {
  features: FeatureScore[]
  overallScore: number
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  // Simulate AI analysis
  const analyzeImage = useCallback(async (): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const features: FeatureScore[] = [
      {
        name: "Eyes",
        score: Math.floor(Math.random() * 30) + 70,
        description: "Eye shape, symmetry, and expressiveness",
        icon: "👁️",
      },
      {
        name: "Smile",
        score: Math.floor(Math.random() * 30) + 70,
        description: "Smile symmetry and appeal",
        icon: "😊",
      },
      {
        name: "Jawline",
        score: Math.floor(Math.random() * 30) + 70,
        description: "Jaw definition and structure",
        icon: "🦴",
      },
      {
        name: "Nose",
        score: Math.floor(Math.random() * 30) + 70,
        description: "Nose shape and proportion",
        icon: "👃",
      },
      {
        name: "Eyebrows",
        score: Math.floor(Math.random() * 30) + 70,
        description: "Eyebrow shape and fullness",
        icon: "🤨",
      },
      {
        name: "Cheekbones",
        score: Math.floor(Math.random() * 30) + 70,
        description: "Cheekbone definition and prominence",
        icon: "💎",
      },
    ].sort((a, b) => b.score - a.score)

    const overallScore = Math.floor(features.reduce((sum, f) => sum + f.score, 0) / features.length)

    return { features, overallScore }
  }, [])

  const handleFileUpload = useCallback(
    async (file: File) => {
      setError(null)

      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        setError("Please upload a JPG or PNG image file.")
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB.")
        return
      }

      // Create image preview
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string
        setUploadedImage(imageUrl)
        setAnalysisResult(null)

        // Start analysis
        setIsAnalyzing(true)
        try {
          const result = await analyzeImage()
          setAnalysisResult(result)
        } catch (err) {
          setError("Failed to analyze image. Please try again.")
        } finally {
          setIsAnalyzing(false)
        }
      }
      reader.readAsDataURL(file)
    },
    [analyzeImage],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  const resetAnalysis = useCallback(() => {
    setUploadedImage(null)
    setAnalysisResult(null)
    setError(null)
    setIsAnalyzing(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Sigma Scorer</h1>
          <p className="text-lg text-gray-600 font-medium">AI Feature Ranking Application</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {!uploadedImage ? (
            /* Upload Area */
            <div
              className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-200 ${
                isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Camera className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Photo</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your image here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports JPG and PNG files up to 10MB</p>
                </div>
                <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileInput}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          ) : (
            /* Analysis Section */
            <div className="space-y-6">
              {/* Uploaded Image */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="w-full mt-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Upload New Photo
                  </button>
                </div>

                {/* Analysis Results */}
                <div className="md:w-2/3">
                  {isAnalyzing ? (
                    /* Loading State */
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Features</h3>
                      <p className="text-gray-600 text-center">Our AI is carefully examining your facial features...</p>
                    </div>
                  ) : analysisResult ? (
                    /* Results */
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="w-6 h-6 text-yellow-500 mr-2" />
                          <h3 className="text-2xl font-bold text-gray-900">Overall Score</h3>
                        </div>
                        <div className="text-4xl font-bold text-blue-600 mb-1">{analysisResult.overallScore}/100</div>
                        <p className="text-gray-600">Based on facial feature analysis</p>
                      </div>

                      {/* Feature Rankings */}
                      <div>
                        <div className="flex items-center mb-4">
                          <TrendingUp className="w-5 h-5 text-gray-700 mr-2" />
                          <h3 className="text-xl font-semibold text-gray-900">Feature Rankings</h3>
                        </div>
                        <div className="space-y-4">
                          {analysisResult.features.map((feature, index) => (
                            <div key={feature.name} className="flex items-center p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center min-w-0 flex-1">
                                <div className="text-2xl mr-3" role="img" aria-label={feature.name}>
                                  {feature.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-gray-900">
                                      #{index + 1} {feature.name}
                                    </h4>
                                    <span className="font-bold text-lg text-blue-600">{feature.score}/100</span>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                                      style={{ width: `${feature.score}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>This is a demo application. Results are simulated for demonstration purposes.</p>
        </div>
      </div>
    </div>
  )
}
