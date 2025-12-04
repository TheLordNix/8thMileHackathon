// src/data/data.module.ts
import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [FirebaseModule, AiModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
