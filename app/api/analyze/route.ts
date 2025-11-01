import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

const prompts = {
  vi: `Phân tích hình ảnh món ăn này và cung cấp ước tính chi tiết về lượng calories. Vui lòng bao gồm:
1. Danh sách các món ăn bạn có thể nhận diện
2. Ước tính khẩu phần ăn
3. Ước tính calories cho từng món
4. Tổng số calories ước tính
5. Ghi chú dinh dưỡng ngắn gọn (protein, carbs, chất béo nếu có thể)

Định dạng câu trả lời của bạn một cách rõ ràng và có cấu trúc.`,
  en: `Analyze this food image and provide a detailed calorie estimate. Please include:
1. List of food items you can identify
2. Estimated portion sizes
3. Estimated calories for each item
4. Total estimated calories
5. Brief nutritional notes (protein, carbs, fats if possible)

Format your response in a clear, structured way.`,
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const language = (formData.get('language') as string) || 'vi';

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const mimeType = image.type;

    // Use GPT-4 Vision to analyze the image
    const prompt = prompts[language as keyof typeof prompts] || prompts.vi;
    const { text } = await generateText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'image',
              image: `data:${mimeType};base64,${base64Image}`,
            },
          ],
        },
      ],
    });

    return NextResponse.json({ analysis: text });
  } catch (error: any) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
