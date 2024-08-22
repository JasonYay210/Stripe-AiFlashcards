// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // Added this import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPV005iSGtffzsxkvJsbTN-gB5uiw12JU",
  authDomain: "flashcard-saas-740fb.firebaseapp.com",
  projectId: "flashcard-saas-740fb",
  storageBucket: "flashcard-saas-740fb.appspot.com",
  messagingSenderId: "409011037832",
  appId: "1:409011037832:web:f0b80aa2dbfcc1de01213d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };