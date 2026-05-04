// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-cv_x1EwE9VAOOdOUgDNARXOEfWzljBE",
  authDomain: "autenticartds2b.firebaseapp.com",
  projectId: "autenticartds2b",
  storageBucket: "autenticartds2b.firebasestorage.app",
  messagingSenderId: "218388599438",
  appId: "1:218388599438:web:ec48c6503a3320c1186fdf",
  measurementId: "G-535NTZX0FW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const autenticacao = getAuth(app);