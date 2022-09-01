import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
  Timestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHSIR_NVqhjGJcWi2myL1nPwfjtZ4TEEM",
  authDomain: "kakeibo-6dead.firebaseapp.com",
  projectId: "kakeibo-6dead",
  storageBucket: "kakeibo-6dead.appspot.com",
  messagingSenderId: "124195635798",
  appId: "1:124195635798:web:14fa1f0dac487028c2b1f7",
  measurementId: "G-HL82EETQF6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const SignInWithPopup = () => signInWithPopup(auth, googleAuthProvider);
export const SignOut = () => signOut(auth);

const db = getFirestore(app);

export const userRef = (uid) => doc(db, "users", uid);

export const getUser = async (uid) => await getDoc(userRef(uid));

export const userSnapshot = (uid, callback) => {
  onSnapshot(userRef(uid), (doc) => callback(doc));
};

const getTimestamp = () => Timestamp.fromDate(new Date());

export const GuardarIngreso = (documento, uid) => {
  const document = { ...documento, date: getTimestamp() };
  updateDoc(userRef(uid), { "ingresos.operaciones":arrayUnion(document) } );
};

export const BorrarIngreso = (documento,uid) =>{
  updateDoc(userRef(uid), { "ingresos.operaciones": arrayRemove(documento) });
}

export const GuardarGasto = (documento,uid)=>{
  const document ={...documento,date:getTimestamp()}
  updateDoc(userRef(uid),{"gastos.operaciones":arrayUnion(document)})
}

export const BorrarGasto = (documento, uid) =>{
  updateDoc(userRef(uid), { "gastos.operaciones": arrayRemove(documento) });
}

export const CreateInitialData = async (uid) => {
  const ref = userRef(uid);
  const userData = await getDoc(ref);
  if (!userData.data()) {
    await setDoc(ref, {
      ingresos: { operaciones: [] },
      gastos: { operaciones: [] },
      ahorro: 0,
    });
  }
};
