import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClYp4VU170-iPVSl1rtWzHA3g7pVE-G0Y",
  authDomain: "wheres-waldo-app-8a838.firebaseapp.com",
  projectId: "wheres-waldo-app-8a838",
  storageBucket: "wheres-waldo-app-8a838.appspot.com",
  messagingSenderId: "786098362777",
  appId: "1:786098362777:web:93b13d091f9df38f63db08"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);