import { db } from "@/app/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const createUserProfile = async (user: any) => {
  const userRef = doc(db, "USERS", user.uid);
  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  };

  await setDoc(userRef, userData, { merge: true });
};

export const updateUserLastLogin = async (uid: string) => {
  const userRef = doc(db, "USERS", uid);
  await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
};
