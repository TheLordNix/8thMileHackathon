import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summarize')
  async summarize(@Body() body: { text: string }) {
    if (!body.text) {
      throw new BadRequestException('Text is required');
    }
    const summary = await this.aiService.summarize(body.text);
    return { summary };
  }

  @Post('score')
  async score(@Body() body: { resumeText: string; jobKeywords: string }) {
    if (!body.resumeText || !body.jobKeywords) {
      throw new BadRequestException('resumeText and jobKeywords are required');
    }
    const result = await this.aiService.summarizeAndScore(
      body.resumeText,
      body.jobKeywords,
    );
    return result;
  }
}