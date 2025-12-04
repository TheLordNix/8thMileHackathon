import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './candidate/candidate.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [CandidateModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
