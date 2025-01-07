import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, orderBy,query } from "firebase/firestore";
import { getWordsRef } from "../services/firebaseRefs";
export const fetchThunk = createAsyncThunk("thunks/fetchThunk", async () => {
  try {
    const wordsRef = await getWordsRef();
    const wordsQuery = query(wordsRef, orderBy("time"));
    const querySnapshot = await getDocs(wordsQuery);
    const words = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      words.push({ id: doc.id, ...data, time: data.time.toMillis() });
    });
    return words.reverse();
  } catch (error) {
    console.log("error:", error);
  }
});
