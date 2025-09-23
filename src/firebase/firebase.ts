import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDX53Hkmf3LoSv7XuqK0WsD2cfIwm0l3I0",
  authDomain: "clothes-shop-3b730.firebaseapp.com",
  projectId: "clothes-shop-3b730",
  storageBucket: "clothes-shop-3b730.firebasestorage.app",
  messagingSenderId: "61301699821",
  appId: "1:61301699821:web:5865b77455210c69b808e4",
  measurementId: "G-2657J59MCR"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDb = getFirestore(FirebaseApp);