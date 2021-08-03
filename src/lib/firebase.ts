//utilsの中にあるfileは共通関数を記述
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_DATABASE,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};



//initializeを複数回走らせない
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();

export const auth = firebase.auth();
export const db = firebase.firestore()

