// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
 } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: "AIzaSyCTCo6xGb_MgERIbmwEsuXCq10mAMzE9mA",
  // authDomain: "whatsapp-clone-96398.firebaseapp.com",
  // projectId: "whatsapp-clone-96398",
  // storageBucket: "whatsapp-clone-96398.appspot.com",
  // messagingSenderId: "603846336454",
  // appId: "1:603846336454:web:5fc4072b4d9c749b061cc7"
  apiKey: "AIzaSyBq_9MWqQ4aVas8luP6uIOhUg1JEyjdsTU",
  authDomain: "metaone-ec336.firebaseapp.com",
  projectId: "metaone-ec336",
  storageBucket: "metaone-ec336.appspot.com",
  messagingSenderId: "398112738474",
  appId: "1:398112738474:web:26e5ab11ef5520a3b054d3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth()
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export {auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  provider
}
