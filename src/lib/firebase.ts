//utilsの中にあるfileは共通関数を記述
import firebase from 'firebase'
import 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'

export const firebaseConfig = initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: process.env.FIREBASE_DATABASE,
  storageBucket: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_SENDER_ID,
  measurementId: process.env.FIREBASE_APPID,
})

//initializeを複数回走らせない
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = getAuth()
export const db = getFirestore()
export const storage = firebase.storage()
