import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import admin from '../firebase/firebase-admin';

@Controller('candidate')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class CandidateController {
  @Post('profile')
  @Roles('candidate')
  async updateProfile(@Req() req, @Body() body) {
    await admin
      .firestore()
      .collection('candidateProfiles')
      .doc(req.user.uid)
      .set(body, { merge: true });
    return { message: 'Profile updated' };
  }
}
