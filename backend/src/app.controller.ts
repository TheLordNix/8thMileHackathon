import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './auth/firebase-auth.guard';

@Controller()
export class AppController {
  
  @UseGuards(FirebaseAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return {
      uid: req.user.uid,
      email: req.user.email,
    };
  }

}
