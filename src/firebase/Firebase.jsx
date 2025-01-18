// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6yjQIm_ny-bHyeBC-O3EGyOGpiwWcOI4",
  authDomain: "e-commerce-fdfc9.firebaseapp.com",
  databaseURL: "https://e-commerce-fdfc9-default-rtdb.firebaseio.com",
  projectId: "e-commerce-fdfc9",
  storageBucket: "e-commerce-fdfc9.firebasestorage.app",
  messagingSenderId: "430636310650",
  appId: "1:430636310650:web:d1c1fcddaa2934d79fdbc3",
  measurementId: "G-6FMSESSH3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();

export default app;