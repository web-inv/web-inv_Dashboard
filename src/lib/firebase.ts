import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXoL0aeWlL-2dVH1CG-vkEVg9lSircric",
  authDomain: "web-inv-3083c.firebaseapp.com",
  projectId: "web-inv-3083c",
  storageBucket: "web-inv-3083c.firebasestorage.app",
  messagingSenderId: "713962396136",
  appId: "1:713962396136:web:402346ed6597eee13cec5d",
  measurementId: "G-8R5B4RVJZ5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firebaseConfigured = true;

export default app;
