import { Injectable, BadRequestException } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private groq: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('Missing GROQ_API_KEY in .env');
    }
    this.groq = new Groq({
      apiKey: apiKey,
    });
  }

  async summarize(text: string) {
    if (!text || text.trim().length === 0) {
      throw new BadRequestException('Text cannot be empty');
    }

    try {
      // ✅ Current active Groq model (2025)
      const message = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `Summarize the following resume/project text into 3-5 concise bullet points focusing on key achievements and skills. Keep each bullet short and impactful:\n\n${text}`,
          },
        ],
      });

      const summary = message.choices[0]?.message?.content || '';

      if (!summary) {
        throw new BadRequestException('No summary generated');
      }

      return summary.trim();
    } catch (err) {
      console.error('Groq API error:', err.message);
      throw new BadRequestException('AI service error: ' + err.message);
    }
  }
}