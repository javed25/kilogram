// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTb4euSJyfTvS-xXOVKR0ilVpEnnEb4nI",
  authDomain: "kilogram-4cc0d.firebaseapp.com",
  projectId: "kilogram-4cc0d",
  storageBucket: "kilogram-4cc0d.appspot.com",
  messagingSenderId: "1098417819833",
  appId: "1:1098417819833:web:e0415af53a617d417d0b68"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage};