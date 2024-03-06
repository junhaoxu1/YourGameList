import { initializeApp } from "firebase/app";
import {
  CollectionReference,
  getFirestore,
  DocumentData,
  collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { UserInfo } from "../types/User.types";
import { GameTitle } from "../types/Game.types";
import { Review } from "../types/Review.types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const gamesCol = createCollection<GameTitle>("games");

export const usersCol = createCollection<UserInfo>("users");

export const reviewsCol = createCollection<Review>("reviews");

export default app;
