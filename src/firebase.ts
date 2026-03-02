// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW8zrMBYGo7MqtcHtOv2BVlS4AKicwPRk",
  authDomain: "simba-calendar-9b2ef.firebaseapp.com",
  projectId: "simba-calendar-9b2ef",
  storageBucket: "simba-calendar-9b2ef.firebasestorage.app",
  messagingSenderId: "228475801503",
  appId: "1:228475801503:web:7eec0d400f185047e1b7aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
