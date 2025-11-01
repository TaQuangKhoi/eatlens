'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

export default function Home() {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear previous results
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setError(null);

    try {
      // Convert base64 to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'food.jpg');
      formData.append('language', language);

      // Send to API
      const apiResponse = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }

      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the image');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
            {t('appTitle')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('appDescription')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Image Upload Section */}
          <div className="mb-8">
            <label
              htmlFor="imageInput"
              className="block w-full p-8 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <div className="text-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected food"
                    className="max-h-96 mx-auto rounded-lg mb-4"
                  />
                ) : (
                  <>
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400 mb-4"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {t('uploadPrompt')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('uploadHint')}
                    </p>
                  </>
                )}
              </div>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Analyze Button */}
          {selectedImage && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {analyzing ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t('analyzing')}
                </span>
              ) : (
                t('analyzeButton')
              )}
            </button>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-800 dark:text-red-200">{t('error')} {error}</p>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-green-200 dark:border-gray-500">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t('analysisResults')}
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 font-sans">
                  {analysis}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{t('poweredBy')}</p>
          <p className="mt-2">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </main>
  );
}
