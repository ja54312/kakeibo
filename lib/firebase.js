import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDHSIR_NVqhjGJcWi2myL1nPwfjtZ4TEEM",
    authDomain: "kakeibo-6dead.firebaseapp.com",
    projectId: "kakeibo-6dead",
    storageBucket: "kakeibo-6dead.appspot.com",
    messagingSenderId: "124195635798",
    appId: "1:124195635798:web:14fa1f0dac487028c2b1f7",
    measurementId: "G-HL82EETQF6"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const SignInWithPopup = () => signInWithPopup(auth, googleAuthProvider);
export const SignOut = () => signOut(auth);

const db = getFirestore(app);
export const userRef = (uid) => doc(db, "users", uid);
export const userSnapshot = (ref, callback) => {
  onSnapshot(ref, doc => callback(doc));
};