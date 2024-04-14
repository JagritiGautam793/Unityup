// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3k3Wj28speoj4v9glGpyDQwaSYu4Tjd0",
  authDomain: "marketup-88d5e.firebaseapp.com",
  projectId: "marketup-88d5e",
  storageBucket: "marketup-88d5e.appspot.com",
  messagingSenderId: "940011143978",
  appId: "1:940011143978:web:a797b4307fe55a12dd5453",
  measurementId: "G-8PDE6J9WWH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
