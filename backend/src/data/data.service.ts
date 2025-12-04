// src/data/data.service.ts
import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class DataService {
  constructor(
    private readonly firebase: FirebaseService,
    private readonly ai: AiService,
  ) {}

  async saveAndSummarize(uid: string, text: string) {
    const summary = await this.ai.summarize(text);

    const ref = this.firebase.db.ref(`summaries/${uid}`);
    const pushedRef = await ref.push({
      text,
      summary,
      createdAt: new Date().toISOString(),
    });

    return {
      id: pushedRef.key,
      summary,
    };
  }
}
