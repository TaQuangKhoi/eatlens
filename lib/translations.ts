export const translations = {
  vi: {
    appTitle: '🍽️ EatLens',
    appDescription: 'Tải lên ảnh món ăn của bạn và nhận ước tính calories được hỗ trợ bởi AI',
    uploadPrompt: 'Nhấp để tải lên hoặc kéo thả',
    uploadHint: 'PNG, JPG, JPEG tối đa 10MB',
    analyzeButton: '🔍 Phân Tích Món Ăn & Tính Calories',
    analyzing: 'Đang phân tích...',
    analysisResults: '📊 Kết Quả Phân Tích',
    poweredBy: 'Được hỗ trợ bởi Vercel AI SDK và OpenAI GPT-4 Vision',
    disclaimer: 'Lưu ý: Ước tính calories chỉ mang tính chất tham khảo và chỉ dành cho mục đích thông tin.',
    error: '❌',
    selectLanguage: 'Ngôn ngữ',
  },
  en: {
    appTitle: '🍽️ EatLens',
    appDescription: 'Upload a photo of your food and get AI-powered calorie estimates',
    uploadPrompt: 'Click to upload or drag and drop',
    uploadHint: 'PNG, JPG, JPEG up to 10MB',
    analyzeButton: '🔍 Analyze Food & Calculate Calories',
    analyzing: 'Analyzing...',
    analysisResults: '📊 Analysis Results',
    poweredBy: 'Powered by Vercel AI SDK and OpenAI GPT-4 Vision',
    disclaimer: 'Note: Calorie estimates are approximate and for informational purposes only.',
    error: '❌',
    selectLanguage: 'Language',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.vi;
