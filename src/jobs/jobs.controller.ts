import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import admin from '../firebase/firebase-admin';

@Controller('jobs')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class JobsController {
  @Post()
  @Roles('hr')
  async createJob(@Req() req, @Body() body) {
    const ref = admin.firestore().collection('jobs').doc();
    await ref.set({
      ...body,
      createdBy: req.user.uid,
      createdAt: Date.now(),
    });
    return { jobId: ref.id };
  }

  @Get()
  async listJobs() {
    const snap = await admin.firestore().collection('jobs').get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
}
