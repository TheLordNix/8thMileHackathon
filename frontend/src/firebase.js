// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzyiqB9HMNE-nwzqRD9jbfiVc4zFZQL34",
  authDomain: "thmile-3d308.firebaseapp.com",
  projectId: "thmile-3d308",
  storageBucket: "thmile-3d308.firebasestorage.app",
  messagingSenderId: "914372109190",
  appId: "1:914372109190:web:767439b980b5485abc8207",
  measurementId: "G-F0KXZFCTQ7",
  databaseURL: "https://thmile-3d308-default-rtdb.firebaseio.com/",
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Realtime Database
export const db = getDatabase(app);

// Firebase Authentication
export const auth = getAuth(app);
