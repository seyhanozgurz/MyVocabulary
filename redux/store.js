import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "../redux/slices/wordsSlice";
import addWordReducer from "../redux/slices/addWordSlice";
export const store = configureStore({
  reducer: {
    words: wordsReducer,
    addWord: addWordReducer,
  },
});
