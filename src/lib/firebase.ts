import { initializeApp } from 'firebase/app';
// getAnalytics only works on the web platform out-of-the-box, so we'll skip it for mobile to avoid crashes
// import { getAnalytics } from "firebase/analytics"; 

const firebaseConfig = {
  apiKey: "AIzaSyD2sLSmHUlzB-UfwNBh0p7NPc-x4bQvy5Y",
  authDomain: "ffarm-9b2c1.firebaseapp.com",
  projectId: "ffarm-9b2c1",
  storageBucket: "ffarm-9b2c1.firebasestorage.app",
  messagingSenderId: "63151641335",
  appId: "1:63151641335:web:e98536dbc483db9ed0f9f2",
  measurementId: "G-T0BG4YL82D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
import { getAuth } from 'firebase/auth';
export const auth = getAuth(app);
