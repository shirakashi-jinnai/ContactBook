//utilsの中にあるfileは共通関数を記述
import 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export const firebaseConfig = initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: process.env.FIREBASE_DATABASE,
  storageBucket: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_SENDER_ID,
  measurementId: process.env.FIREBASE_APPID,
})

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
