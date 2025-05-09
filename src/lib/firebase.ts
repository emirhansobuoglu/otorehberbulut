// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHMSgBvsY7iSKjNDqMqVrUj6Jg1n-yyuU",
  authDomain: "otorehber-9c701.firebaseapp.com",
  projectId: "otorehber-9c701",
  storageBucket: "otorehber-9c701.firebasestorage.app",
  messagingSenderId: "287336877967",
  appId: "1:287336877967:web:741e631a22baadbd7785fa",
  measurementId: "G-EJPJ4FLXYG",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp;
