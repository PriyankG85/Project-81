import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjOitr0nkJZ3Q_YozKe-STGQz5faBINq4",
  authDomain: "spectagram-59f9b.firebaseapp.com",
  projectId: "spectagram-59f9b",
  storageBucket: "spectagram-59f9b.appspot.com",
  messagingSenderId: "979616018436",
  appId: "1:979616018436:web:bf941ea67cf31b90d90551",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const db = getDatabase(app);

export { db, app };
