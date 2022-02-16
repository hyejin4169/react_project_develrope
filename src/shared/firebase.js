// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBS5DddJhM8ChICjS8hoKo_f5fN6n9LOBI",
  authDomain: "devel-rope.firebaseapp.com",
  projectId: "devel-rope",
  storageBucket: "devel-rope.appspot.com",
  messagingSenderId: "131372662888",
  appId: "1:131372662888:web:a44d2445d3c9ff47e47bdd",
  measurementId: "G-DV4GTQ0VD5",
});

// Initialize Firebase

const apiKey = "AIzaSyBS5DddJhM8ChICjS8hoKo_f5fN6n9LOBI";
const storage = getStorage();

export { apiKey, storage };
