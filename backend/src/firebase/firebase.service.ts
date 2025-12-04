// src/firebase/firebase.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public db: admin.database.Database;

  onModuleInit() {
    if (!admin.apps.length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
        databaseURL: process.env.FIREBASE_DB_URL!,
      });
    }
    this.db = admin.database();
  }

  verifyToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }
}
