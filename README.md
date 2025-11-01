# 🍽️ EatLens - AI-Powered Calorie Calculator

A web application that uses AI to calculate calories from food images. Built with Next.js, Vercel AI SDK, and OpenAI's GPT-4 Vision.

## ✨ Features

- 📸 Upload food images
- 🤖 AI-powered calorie estimation using GPT-4 Vision
- 📊 Detailed nutritional breakdown
- 🎨 Modern, responsive UI with Tailwind CSS
- ☁️ Deployable on Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eatlens
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your-api-key-here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Deployment on Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the `OPENAI_API_KEY` environment variable in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **AI**: Vercel AI SDK + OpenAI GPT-4 Vision
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📝 How It Works

1. User uploads a food image
2. Image is sent to the API route (`/api/analyze`)
3. The API converts the image to base64 and sends it to GPT-4 Vision
4. GPT-4 Vision analyzes the food and provides:
   - List of identified food items
   - Portion size estimates
   - Calorie estimates per item
   - Total calories
   - Nutritional information
5. Results are displayed to the user

## ⚠️ Disclaimer

Calorie estimates are approximate and for informational purposes only. For accurate dietary information, consult a nutritionist or use certified calorie tracking tools.

## 📄 License

ISC
