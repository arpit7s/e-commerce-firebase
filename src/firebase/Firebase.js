import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6yjQIm_ny-bHyeBC-O3EGyOGpiwWcOI4",
  authDomain: "e-commerce-fdfc9.firebaseapp.com",
  databaseURL: "https://e-commerce-fdfc9-default-rtdb.firebaseio.com",
  projectId: "e-commerce-fdfc9",
  storageBucket: "e-commerce-fdfc9.appspot.com", 
  messagingSenderId: "430636310650",
  appId: "1:430636310650:web:d1c1fcddaa2934d79fdbc3",
  measurementId: "G-6FMSESSH3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 

// Initialize Analytics (Optional)
const analytics = getAnalytics(app);

export default app;
