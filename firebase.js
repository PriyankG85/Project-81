import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8omAF-jn5UYq3kl3RY9gCd1aqu0FTS9c",
  authDomain: "story-telling-rn.firebaseapp.com",
  databaseURL: "https://story-telling-rn-default-rtdb.firebaseio.com",
  projectId: "story-telling-rn",
  storageBucket: "story-telling-rn.appspot.com",
  messagingSenderId: "808812086765",
  appId: "1:808812086765:web:c4814c0ebaf68ad70493e4",
  measurementId: "G-SSHNBQYZSK",
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getDatabase(app);

export { db, app };
