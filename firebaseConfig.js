// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWs35mwCeA1YGQ3vCaz2MjaFGWB-2yf0I",
  authDomain: "my-vocabulary-92e01.firebaseapp.com",
  projectId: "my-vocabulary-92e01",
  storageBucket: "my-vocabulary-92e01.appspot.com",
  messagingSenderId: "1036738479914",
  appId: "1:1036738479914:web:ef9559de439fc2603bc053",
  measurementId: "G-552WSQE6QM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

//export const usersRef = collection(db, "users");
