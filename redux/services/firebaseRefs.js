import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebaseConfig";
import { collection } from "firebase/firestore";
export const getWordsRef = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const wordsRef = collection(db, `users/${user.uid}/words`);
        resolve(wordsRef);
      }
    });
  });
};
