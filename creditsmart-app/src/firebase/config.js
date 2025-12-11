import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjO_7Q0U7C3lV-tOQUn7459i90oxZ-H9c",
  authDomain: "credismart-7aa45.firebaseapp.com",
  projectId: "credismart-7aa45",
  storageBucket: "credismart-7aa45.firebasestorage.app",
  messagingSenderId: "130105417116",
  appId: "1:130105417116:web:795ba6ab0a0ec63a783c59"
};

const app = initializeApp(firebaseConfig);

// Exportamos la referencia a Firestore
export const db = getFirestore(app);