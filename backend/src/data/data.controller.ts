import { Body, Controller, Post, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  async create(@Req() req, @Body() body: { text: string }) {
    const uid = req.user?.uid;
    const text = body.text ?? '';

    if (!uid) {
      throw new BadRequestException('User ID not found in token');
    }

    if (!text.trim()) {
      throw new BadRequestException('Text cannot be empty');
    }

    return this.dataService.saveAndSummarize(uid, text);
  }
}