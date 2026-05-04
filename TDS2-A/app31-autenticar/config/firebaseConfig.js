// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANXjL5YcNKzqK3sdGDnI5s_43yPXWheJQ",
  authDomain: "autenticar-tds2-a-27018.firebaseapp.com",
  projectId: "autenticar-tds2-a-27018",
  storageBucket: "autenticar-tds2-a-27018.firebasestorage.app",
  messagingSenderId: "600143092034",
  appId: "1:600143092034:web:d221ca2022da03b69c50db",
  measurementId: "G-Y5XG11C38K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const autenticacao = getAuth(app);