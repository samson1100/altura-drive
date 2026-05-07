import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCfgRWLIoUIiNSHjwyccxKTROFFrd94cIc",
  authDomain: "altura-drive.firebaseapp.com",
  projectId: "altura-drive",
  storageBucket: "altura-drive.firebasestorage.app",
  messagingSenderId: "974604453076",
  appId: "1:974604453076:web:0be1958509a12d576f6741"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
