import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCXxIQD1aNxBvauiY65MMNWuwuXQYeKUn8",
  authDomain: "mini-app-forcouples.firebaseapp.com",
  databaseURL: "https://mini-app-forcouples-default-rtdb.firebaseio.com",
  projectId: "mini-app-forcouples",
  storageBucket: "mini-app-forcouples.firebasestorage.app",
  messagingSenderId: "597378655994",
  appId: "1:597378655994:web:82c08f4e0a81a6894ecb43",
  measurementId: "G-6DM9GWM2QR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export async function authAnon() {
  await signInAnonymously(auth);
}
