// src/firebaseConfig.js
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAUDp-bMu7JrQpf9-ARehJHcDaJhGOjVw",
  authDomain: "clickapp-69a6a.firebaseapp.com",
  projectId: "clickapp-69a6a",
  storageBucket: "clickapp-69a6a.firebasestorage.app",
  messagingSenderId: "932605851798",
  appId: "1:932605851798:web:01bae7dd61935bb7806ab7",
  measurementId: "G-YENBR5FX8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
