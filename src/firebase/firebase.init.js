import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv-4zqlXTEochMvVSKVk98zluxlSk9lj4",
  authDomain: "task-management-e0b42.firebaseapp.com",
  projectId: "task-management-e0b42",
  storageBucket: "task-management-e0b42.firebasestorage.app",
  messagingSenderId: "393876574732",
  appId: "1:393876574732:web:f0ca68841befb86c4d9429"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);