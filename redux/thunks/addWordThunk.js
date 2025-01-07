import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { getWordsRef } from "../services/firebaseRefs";

export const addWordThunk = createAsyncThunk(
  "thunks/addWordThunk",
  async ({ word, definition, examples,imageLink }) => {
    const wordsRef = await getWordsRef();
    try {
      await addDoc(wordsRef, {
        word,
        definition,
        examples,
        imageLink,
        time:serverTimestamp(),
      });
      console.log("eklendi",word, examples);
    } catch (error) {
      console.log("error:", error);
    }
  }
);
