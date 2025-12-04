import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { DataModule } from './data/data.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [FirebaseModule, AiModule, DataModule],
})
export class AppModule {}
