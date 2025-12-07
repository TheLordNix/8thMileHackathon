// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase configuration

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Realtime Database
export const db = getDatabase(app);

// Firebase Authentication
export const auth = getAuth(app);
