// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'// TODO: Add SDKs for Firebase products that you want to use
import { GoogleAuthProvider } from "firebase/auth";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB82sxraBLyH__N3pE92ZhcVVZ0htDae4",
  authDomain: "hrbot-e8686.firebaseapp.com",
  projectId: "hrbot-e8686",
  storageBucket: "hrbot-e8686.appspot.com",
  messagingSenderId: "862741743565",
  appId: "1:862741743565:web:5eaa1f4351018d855ba684",
  measurementId: "G-ZH7FXXEP7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {analytics,db,auth,provider}