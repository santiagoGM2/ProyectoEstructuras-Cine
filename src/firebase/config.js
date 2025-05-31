// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgGd2F7kqCYqYVF5AEmKSqgjH8orbgXKo",
  authDomain: "proyectoaultimahora.firebaseapp.com",
  projectId: "proyectoaultimahora",
  storageBucket: "proyectoaultimahora.firebasestorage.app",
  messagingSenderId: "196499828763",
  appId: "1:196499828763:web:70a6966add00e464a3c8be",
  measurementId: "G-HVJEW0CBKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {app, auth}