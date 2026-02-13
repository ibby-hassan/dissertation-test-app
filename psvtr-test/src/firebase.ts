// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNHEG84tqeRPSu-BLO-ZwL9docOdzCrlA",
  authDomain: "psvtr-study.firebaseapp.com",
  projectId: "psvtr-study",
  storageBucket: "psvtr-study.firebasestorage.app",
  messagingSenderId: "931172214065",
  appId: "1:931172214065:web:826d5fd19040130b5cfc10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize the Database
export const db = getFirestore(app);