import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBM6Xfv2gzg5G7bWGY-sH-k3yZag7ZSWTo",
  authDomain: "cpgeist-ef1c8.firebaseapp.com",
  projectId: "cpgeist-ef1c8",
  storageBucket: "cpgeist-ef1c8.firebasestorage.app",
  messagingSenderId: "951985443572",
  appId: "1:951985443572:web:84fa62141b854ad78d84a1",
  measurementId: "G-4Q9ZEXWGJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;