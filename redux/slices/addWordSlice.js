import { createSlice } from "@reduxjs/toolkit";
import { addWordThunk } from "../thunks/addWordThunk";

const initialState = {
  word: {},
  loading: false,
  error: null,
};
const addWordSlice = createSlice({
  name: "addWord",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWordThunk.pending, (state) => {
        state.loading = true;
        //console.log("pending");
      })
      .addCase(addWordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.word = action.payload;
        //console.log("fulfilled");
      })
      .addCase(addWordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        //console.log("rejected");
      });
  },
});

export default addWordSlice.reducer;
